import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAiContext,
  buildPlannerView,
  buildWebView,
  loadKnowledgeObject,
  validateSchemaRuntime,
  validateStorySemanticRules,
} from "../scripts/lib/knowledge-object-story-kf-005c.mjs";

function getBlock(knowledgeObject, type) {
  return knowledgeObject.blocks.find((block) => block.type === type);
}

function sourceReferenceIds(block) {
  return (block.sourceRefs ?? []).map((sourceRef) => sourceRef.referenceId);
}

test("KF-006 mantiene identidad estable y versiona la revision controlada del Modelo 721", async () => {
  const knowledgeObject = await loadKnowledgeObject();

  assert.equal(knowledgeObject.identity.knowledgeObjectId, "ko_es_modelo721_monedas_virtuales_001");
  assert.equal(knowledgeObject.identity.stableKey, "modelo-721-monedas-virtuales-extranjero");
  assert.equal(knowledgeObject.governance.version, "1.1.0");
  assert.equal(knowledgeObject.auditMetadata.revisionCount, 2);
  assert.match(knowledgeObject.governance.changeReason, /STORY-KF-006/u);
});

test("KF-006 conserva compatibilidad contractual y reglas semanticas existentes", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const schemaValidation = await validateSchemaRuntime(knowledgeObject);
  const semanticValidation = validateStorySemanticRules(knowledgeObject);

  assert.equal(schemaValidation.ok, true, JSON.stringify(schemaValidation.errors, null, 2));
  assert.equal(semanticValidation.ok, true, JSON.stringify(semanticValidation.errors, null, 2));
});

test("KF-006 refuerza trazabilidad normativa 2026 sin modificar Planner ni consumidores", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const legalBlock = getBlock(knowledgeObject, "legal_basis");
  const technicalBlock = getBlock(knowledgeObject, "technical_development");
  const procedureBlock = getBlock(knowledgeObject, "procedure");
  const internalReferenceBlock = getBlock(knowledgeObject, "internal_reference");

  assert.ok(sourceReferenceIds(legalBlock).includes("src721-orden-hac15042024"));
  assert.ok(sourceReferenceIds(technicalBlock).includes("src721-aeat-informacion"));
  assert.ok(sourceReferenceIds(procedureBlock).includes("src721-aeat-plazo"));
  assert.match(technicalBlock.content.development, /exenciones reglamentarias/u);
  assert.match(technicalBlock.content.development, /dinero fiduciario/u);
  assert.match(procedureBlock.content.steps.at(-1).text, /1 de enero y el 31 de marzo/u);
  assert.ok(
    internalReferenceBlock.content.items.some((item) => item.referenceId === "intref721-004"),
  );
});

test("KF-006 genera vistas derivadas reutilizables sin exponer referencias internas", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const plannerView = buildPlannerView(knowledgeObject);
  const webView = buildWebView(knowledgeObject);
  const aiContext = buildAiContext(knowledgeObject);

  assert.equal(plannerView.ok, true);
  assert.equal(webView.ok, true);
  assert.equal(aiContext.ok, true);
  assert.equal(plannerView.data.source.version, "1.1.0");
  assert.equal(webView.data.faq.length, 6);
  assert.equal(webView.data.caseStudies.length, 5);
  assert.equal(
    plannerView.data.plannerBlocks.some((block) => block.type === "internal_reference"),
    false,
  );
});
