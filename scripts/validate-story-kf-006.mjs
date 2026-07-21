import {
  buildAiContext,
  buildChecklistView,
  buildClientResponse,
  buildFaqView,
  buildPlannerView,
  buildWebView,
  loadKnowledgeObject,
  validateSchemaRuntime,
  validateStorySemanticRules,
} from "./lib/knowledge-object-story-kf-005c.mjs";

function getBlock(knowledgeObject, type) {
  return knowledgeObject.blocks.find((block) => block.type === type);
}

function hasSourceRef(block, referenceId) {
  return (block.sourceRefs ?? []).some((sourceRef) => sourceRef.referenceId === referenceId);
}

async function main() {
  const knowledgeObject = await loadKnowledgeObject();
  const schemaValidation = await validateSchemaRuntime(knowledgeObject);
  const semanticValidation = validateStorySemanticRules(knowledgeObject);
  const plannerView = buildPlannerView(knowledgeObject);
  const webView = buildWebView(knowledgeObject);
  const aiContext = buildAiContext(knowledgeObject);
  const checklistView = buildChecklistView(knowledgeObject);
  const faqView = buildFaqView(knowledgeObject);
  const clientResponse = buildClientResponse(knowledgeObject);

  const legalBlock = getBlock(knowledgeObject, "legal_basis");
  const technicalBlock = getBlock(knowledgeObject, "technical_development");
  const procedureBlock = getBlock(knowledgeObject, "procedure");
  const internalReferenceBlock = getBlock(knowledgeObject, "internal_reference");

  const errors = [
    ...schemaValidation.errors,
    ...semanticValidation.errors,
  ];

  if (knowledgeObject.governance.version !== "1.1.0") {
    errors.push("KF-006 debe publicar la revision controlada como version 1.1.0.");
  }

  if (knowledgeObject.auditMetadata.revisionCount !== 2) {
    errors.push("KF-006 debe incrementar auditMetadata.revisionCount a 2.");
  }

  if (!/STORY-KF-006/u.test(knowledgeObject.governance.changeReason)) {
    errors.push("KF-006 debe quedar trazada en governance.changeReason.");
  }

  if (!hasSourceRef(legalBlock, "src721-orden-hac15042024")) {
    errors.push("KF-006 debe incluir la Orden HAC/1504/2024 en la base legal.");
  }

  if (!hasSourceRef(technicalBlock, "src721-aeat-informacion")) {
    errors.push("KF-006 debe incluir la FAQ AEAT de informacion a suministrar.");
  }

  if (!hasSourceRef(procedureBlock, "src721-aeat-plazo")) {
    errors.push("KF-006 debe mantener referencia operativa al plazo AEAT 2026.");
  }

  if (!/exenciones reglamentarias/u.test(technicalBlock.content.development)) {
    errors.push("KF-006 debe describir expresamente las exenciones reglamentarias.");
  }

  if (!/dinero fiduciario/u.test(technicalBlock.content.development)) {
    errors.push("KF-006 debe separar dinero fiduciario en exchange extranjero del Modelo 721.");
  }

  if (!internalReferenceBlock.content.items.some((item) => item.referenceId === "intref721-004")) {
    errors.push("KF-006 debe quedar registrado como referencia interna del objeto revisado.");
  }

  for (const [label, result] of [
    ["plannerView", plannerView],
    ["webView", webView],
    ["aiContext", aiContext],
    ["checklist", checklistView],
    ["faq", faqView],
    ["clientResponse", clientResponse],
  ]) {
    if (!result.ok) {
      errors.push(`${label} debe generarse correctamente en KF-006.`);
    }
  }

  console.log(
    JSON.stringify(
      {
        story: "STORY-KF-006",
        knowledgeObject: knowledgeObject.identity.title,
        version: knowledgeObject.governance.version,
        schemaValidation: schemaValidation.ok ? "PASS" : "FAIL",
        semanticValidation: semanticValidation.ok ? "PASS" : "FAIL",
        derivedViews: errors.length === 0 ? "PASS" : "CHECK",
        qualityGate: errors.length === 0 ? "PASS" : "FAIL",
        errors,
      },
      null,
      2,
    ),
  );

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
