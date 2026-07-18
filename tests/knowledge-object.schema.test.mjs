import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "schema", "knowledge-object.schema.json");
const examplePath = path.join(rootDir, "examples", "modelo-210-imputacion-rentas.json");
const generatorPath = path.join(rootDir, "scripts", "generate-types.mjs");

async function loadSchema() {
  return JSON.parse(await readFile(schemaPath, "utf8"));
}

async function loadExample() {
  return JSON.parse(await readFile(examplePath, "utf8"));
}

function createStrictValidator(schema) {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true
  });
  addFormats(ajv);
  return ajv.compile(schema);
}

function findBlock(example, blockId) {
  return example.blocks.find((block) => block.blockId === blockId);
}

test("compila el schema canónico original con Ajv 2020-12 en modo estricto", async () => {
  const schema = await loadSchema();
  assert.doesNotThrow(() => createStrictValidator(schema));
});

test("no muta el schema canónico durante la compilación", async () => {
  const schema = await loadSchema();
  const before = JSON.stringify(schema);
  createStrictValidator(schema);
  assert.equal(JSON.stringify(schema), before);
});

test("valida el ejemplo canónico completo contra el schema original", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), true);
});

test("acepta LegalBasisBlock con sourceRefs válidas", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const block = findBlock(example, "kb-legal-001");
  assert.equal(block?.type, "legal_basis");
  block.sourceRefs = [
    ...(block.sourceRefs ?? []),
    {
      referenceId: "src-legal-extra",
      type: "guidance",
      label: "Consulta interna"
    }
  ];
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), true);
});

test("acepta TechnicalDevelopmentBlock con summary y sourceRefs válidas", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const block = findBlock(example, "kb-tech-001");
  assert.equal(block?.type, "technical_development");
  block.summary = "Resumen operativo ampliado";
  block.sourceRefs = [
    {
      referenceId: "src-tech-001",
      type: "guidance",
      label: "Nota técnica"
    }
  ];
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), true);
});

test("acepta RiskBlock con summary y sourceRefs válidas", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const block = findBlock(example, "kb-risk-001");
  assert.equal(block?.type, "risk");
  block.summary = "Resumen del riesgo principal";
  block.sourceRefs = [
    {
      referenceId: "src-risk-001",
      type: "internal_policy",
      label: "Criterio interno de mitigación"
    }
  ];
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), true);
});

test("acepta CaseStudyBlock con summary y sourceRefs válidas", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const block = findBlock(example, "kb-case-001");
  assert.equal(block?.type, "case_study");
  block.summary = "Resumen del caso práctico";
  block.sourceRefs = [
    ...(block.sourceRefs ?? []),
    {
      referenceId: "src-case-001",
      type: "other",
      label: "Caso anonimizado"
    }
  ];
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), true);
});

test("rechaza campos inesperados en un bloque final", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  example.blocks[0].unexpectedField = true;
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), false);
  assert.equal(
    validate.errors?.some(
      (error) =>
        error.keyword === "unevaluatedProperties" &&
        String(error.params.unevaluatedProperty) === "unexpectedField"
    ),
    true
  );
});

test("rechaza un campo propio de otro subtipo cuando no está declarado", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  const block = findBlock(example, "kb-faq-001");
  assert.equal(block?.type, "faq");
  block.sourceRefs = [
    {
      referenceId: "src-faq-001",
      type: "guidance",
      label: "No permitido en FAQ"
    }
  ];
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), false);
  assert.equal(
    validate.errors?.some(
      (error) =>
        error.keyword === "unevaluatedProperties" &&
        String(error.params.unevaluatedProperty) === "sourceRefs"
    ),
    true
  );
});

test("rechaza content incompatible con el discriminador del bloque", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  example.blocks[0] = {
    ...example.blocks[0],
    type: "legal_basis",
    content: {
      items: [
        {
          itemId: "chk-001",
          label: "contenido de checklist"
        }
      ]
    }
  };
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), false);
  assert.equal(
    validate.errors?.some((error) => error.keyword === "oneOf" || error.keyword === "required"),
    true
  );
});

test("rechaza tipos de bloque desconocidos", async () => {
  const schema = await loadSchema();
  const example = await loadExample();
  example.blocks[0] = {
    ...example.blocks[0],
    type: "bloque-desconocido"
  };
  const validate = createStrictValidator(schema);
  assert.equal(validate(example), false);
  assert.equal(
    validate.errors?.some(
      (error) =>
        error.keyword === "oneOf" ||
        error.keyword === "enum" ||
        error.keyword === "const"
    ),
    true
  );
});

test("el generador mantiene sincronía entre schema y tipos derivados", () => {
  const result = spawnSync(process.execPath, [generatorPath, "--check"], {
    cwd: rootDir,
    encoding: "utf8"
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /está sincronizado con el schema/);
});
