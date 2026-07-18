import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "schema", "knowledge-object.schema.json");
const outputPath = path.join(rootDir, "generated", "knowledge-object.generated.ts");
const canonicalSourceLabel = "schema/knowledge-object.schema.json";

function refName(ref) {
  return ref.split("/").at(-1);
}

function literal(value) {
  return JSON.stringify(value);
}

function indent(text, level = 1) {
  const prefix = "  ".repeat(level);
  return text
    .split("\n")
    .map((line) => (line.length ? `${prefix}${line}` : line))
    .join("\n");
}

function renderEnum(values) {
  return values.map((value) => literal(value)).join(" | ");
}

function renderArrayType(node) {
  return `${renderType(node.items)}[]`;
}

function renderInlineObject(node) {
  const required = new Set(node.required ?? []);
  const entries = Object.entries(node.properties ?? {});
  if (entries.length === 0) {
    return "Record<string, unknown>";
  }

  return [
    "{",
    ...entries.map(([key, value]) => {
      const optional = required.has(key) ? "" : "?";
      return `  ${key}${optional}: ${renderType(value)};`;
    }),
    "}"
  ].join("\n");
}

function renderType(node) {
  if (!node) {
    return "unknown";
  }

  if (node.$ref) {
    return refName(node.$ref);
  }

  if (Object.prototype.hasOwnProperty.call(node, "const")) {
    return literal(node.const);
  }

  if (node.enum) {
    return renderEnum(node.enum);
  }

  if (node.oneOf) {
    return node.oneOf.map((item) => renderType(item)).join(" | ");
  }

  if (node.type === "array") {
    return renderArrayType(node);
  }

  if (node.type === "integer" || node.type === "number") {
    return "number";
  }

  if (node.type === "boolean") {
    return "boolean";
  }

  if (node.type === "string") {
    return "string";
  }

  if (node.type === "object") {
    return renderInlineObject(node);
  }

  return "unknown";
}

function renderObjectInterface(name, node) {
  const required = new Set(node.required ?? []);
  const entries = Object.entries(node.properties ?? {});
  const lines = entries.map(([key, value]) => {
    const optional = required.has(key) ? "" : "?";
    return `${key}${optional}: ${renderType(value)};`;
  });

  return `export interface ${name} {\n${indent(lines.join("\n"))}\n}`;
}

function renderBaseKnowledgeBlock() {
  return [
    "export interface BaseKnowledgeBlock<TType extends KnowledgeBlockType, TContent> {",
    indent("blockId: NonEmptyString;"),
    indent("type: TType;"),
    indent("title: NonEmptyString;"),
    indent("order: number;"),
    indent("status: BlockStatus;"),
    indent("visibility: BlockVisibility;"),
    indent("channelPolicy: BlockChannelPolicy;"),
    indent("lastReviewedAt?: string;"),
    indent("changeNote?: string;"),
    indent("content: TContent;"),
    "}"
  ].join("\n");
}

function renderBlockAlias(name, node) {
  const refs = [];
  const extras = [];

  for (const entry of node.allOf ?? []) {
    if (entry.$ref) {
      refs.push(refName(entry.$ref));
      continue;
    }

    for (const [key, value] of Object.entries(entry.properties ?? {})) {
      extras.push([key, value]);
    }
  }

  const typeValue = extras.find(([key]) => key === "type")?.[1]?.const;
  const contentRef = extras.find(([key]) => key === "content")?.[1]?.$ref;
  const optionalExtras = extras.filter(([key]) => !["type", "content"].includes(key));

  const rewrittenRefs = refs.map((ref) => {
    if (ref !== "BaseKnowledgeBlock") {
      return ref;
    }

    if (!typeValue || !contentRef) {
      return ref;
    }

    return `BaseKnowledgeBlock<${literal(typeValue)}, ${refName(contentRef)}>`;
  });

  const parts = [...rewrittenRefs];

  if (optionalExtras.length > 0) {
    const lines = optionalExtras.map(([key, value]) => `${key}?: ${renderType(value)};`);
    parts.push(`{\n${indent(lines.join("\n"))}\n}`);
  }

  return `export type ${name} = ${parts.join(" & ")};`;
}

function renderDef(name, node) {
  if (name === "BaseKnowledgeBlock") {
    return renderBaseKnowledgeBlock();
  }

  if (node.enum) {
    return `export type ${name} = ${renderEnum(node.enum)};`;
  }

  if (node.oneOf) {
    return `export type ${name} = ${node.oneOf.map((item) => renderType(item)).join(" | ")};`;
  }

  if (node.allOf) {
    return renderBlockAlias(name, node);
  }

  if (node.type === "object") {
    return renderObjectInterface(name, node);
  }

  return `export type ${name} = ${renderType(node)};`;
}

async function buildOutput() {
  const schema = JSON.parse(await readFile(schemaPath, "utf8"));
  const defs = schema.$defs ?? {};

  const order = [
    "KnowledgeObjectStatus",
    "BlockStatus",
    "BlockVisibility",
    "Channel",
    "ChannelAccessPolicy",
    "AudienceType",
    "SensitivityLevel",
    "TaxRelationType",
    "FormRelationType",
    "RelationType",
    "SourceReferenceType",
    "RiskSeverity",
    "RiskLikelihood",
    "KnowledgeBlockType",
    "NonEmptyString",
    "LocalizedText",
    "SourceReference",
    "ChannelRule",
    "KnowledgeChannelPolicy",
    "BlockChannelPolicy",
    "KnowledgeIdentity",
    "KnowledgeGovernance",
    "KnowledgeClassification",
    "KnowledgeExecutiveSummary",
    "AffectedTaxModelRef",
    "AffectedFormRef",
    "KnowledgeRelation",
    "KnowledgeAuditMetadata",
    "BaseKnowledgeBlock",
    "WithSourceRefs",
    "WithSummary",
    "ChecklistItem",
    "FaqItem",
    "RiskItem",
    "RequiredDocumentItem",
    "CaseStudyItem",
    "ReferenceItem",
    "LegalBasisContent",
    "TechnicalDevelopmentContent",
    "ProcedureContent",
    "ChecklistContent",
    "FaqContent",
    "RiskContent",
    "RequiredDocumentationContent",
    "CaseStudyContent",
    "InternalReferenceContent",
    "LegalBasisBlock",
    "TechnicalDevelopmentBlock",
    "ProcedureBlock",
    "ChecklistBlock",
    "FaqBlock",
    "RiskBlock",
    "RequiredDocumentBlock",
    "CaseStudyBlock",
    "InternalReferenceBlock",
    "KnowledgeBlock"
  ];

  const renderedDefs = order
    .filter((name) => defs[name])
    .map((name) => renderDef(name, defs[name]));

  const rootInterface = renderObjectInterface("KnowledgeObject", {
    type: "object",
    required: schema.required,
    properties: schema.properties
  });

  return [
    "/*",
    " * GENERATED ARTIFACT",
    " *",
    ` * Canonical source: ${canonicalSourceLabel}`,
    " * Generated by: scripts/generate-types.mjs",
    " *",
    " * No editar manualmente este archivo.",
    " */",
    "",
    ...renderedDefs,
    "",
    rootInterface,
    ""
  ].join("\n");
}

async function main() {
  const mode = process.argv.includes("--check") ? "check" : "write";
  const output = await buildOutput();

  if (mode === "check") {
    const current = await readFile(outputPath, "utf8");
    if (current !== output) {
      throw new Error("knowledge-object.generated.ts no está sincronizado con el schema");
    }
    console.log("knowledge-object.generated.ts está sincronizado con el schema");
    return;
  }

  await writeFile(outputPath, output, "utf8");
  console.log(path.basename(outputPath));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
