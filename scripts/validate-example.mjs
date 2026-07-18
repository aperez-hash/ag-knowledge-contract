import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "schema", "knowledge-object.schema.json");
const examplePath = path.join(rootDir, "examples", "modelo-210-imputacion-rentas.json");

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function main() {
  const [schemaRaw, exampleRaw] = await Promise.all([
    readFile(schemaPath, "utf8"),
    readFile(examplePath, "utf8")
  ]);

  const schema = JSON.parse(schemaRaw);
  const example = JSON.parse(exampleRaw);
  const schemaBeforeCompile = JSON.stringify(schema);
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true
  });

  addFormats(ajv);

  invariant(schema.title === "KnowledgeObject", "El schema canónico debe llamarse KnowledgeObject");
  invariant(schema.$defs?.KnowledgeBlock, "El schema debe declarar KnowledgeBlock en $defs");

  const validate = ajv.compile(schema);
  invariant(schemaBeforeCompile === JSON.stringify(schema), "Ajv no debe mutar el schema canónico durante la compilación");

  const valid = validate(example);
  if (!valid) {
    throw new Error(JSON.stringify(validate.errors, null, 2));
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        validatedExample: path.basename(examplePath),
        blockCount: example.blocks.length,
        relationCount: example.relations.length
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
