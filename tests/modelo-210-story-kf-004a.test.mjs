import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  AI_CONTEXT_PATH,
  INCIDENT_LOG_PATH,
  PLANNER_VIEW_PATH,
  VALIDATION_REPORT_PATH,
  WEB_VIEW_PATH,
  buildAiContext,
  buildPlannerView,
  buildStoryArtifacts,
  buildWebView,
  loadKnowledgeObject,
  validateSchemaRuntime,
  validateStorySemanticRules,
} from "../scripts/lib/knowledge-object-story-kf-004a.mjs";

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

test("el Knowledge Object real valida contra el schema publicado", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = await validateSchemaRuntime(knowledgeObject);

  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
});

test("el objeto cumple las reglas semanticas de STORY-KF-004A", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = validateStorySemanticRules(knowledgeObject);

  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
});

test("la vista de Planner mantiene solo contenido operativo permitido", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildPlannerView(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.risks.length, 1);
  assert.equal(result.data.procedures.length, 1);
  assert.equal(
    result.data.plannerBlocks.some((block) => block.type === "internal_reference"),
    false,
  );
});

test("la vista web excluye riesgos internos y referencias internas", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildWebView(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.faq.length >= 4, true);
  assert.equal(result.data.caseStudies.length, 3);
  assert.deepEqual(result.data.excludedByPolicy, [
    "internal_reference",
    "risk",
    "restricted visibility",
  ]);
});

test("el contexto IA incluye criterio, procedimiento, riesgos y autorizacion", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildAiContext(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.legalBasis.length, 1);
  assert.equal(result.data.procedure.length >= 8, true);
  assert.equal(result.data.risks.length, 5);
  assert.equal(result.data.clientResponseAuthorization.channelAccess, "derived_only");
  assert.equal(result.data.clientResponseAuthorization.humanReviewRequired, true);
});

test("los artefactos derivados y el informe quedan certificados en PASS", async () => {
  const artifacts = await buildStoryArtifacts();

  assert.equal(artifacts.validationReport.schemaValidation, "PASS");
  assert.equal(artifacts.validationReport.ruleEngine, "PASS");
  assert.equal(artifacts.validationReport.plannerView, "PASS");
  assert.equal(artifacts.validationReport.webView, "PASS");
  assert.equal(artifacts.validationReport.aiContext, "PASS");
  assert.equal(artifacts.validationReport.structuralChangesRequired, "NO");
  assert.deepEqual(artifacts.incidentLog.incidents, []);
});

test("los ficheros generados quedan sincronizados con la derivacion actual", async () => {
  const artifacts = await buildStoryArtifacts();
  const [plannerView, webView, aiContext, validationReport, incidentLog] = await Promise.all([
    readJson(PLANNER_VIEW_PATH),
    readJson(WEB_VIEW_PATH),
    readJson(AI_CONTEXT_PATH),
    readJson(VALIDATION_REPORT_PATH),
    readJson(INCIDENT_LOG_PATH),
  ]);

  assert.deepEqual(plannerView, artifacts.plannerView.data);
  assert.deepEqual(webView, artifacts.webView.data);
  assert.deepEqual(aiContext, artifacts.aiContext.data);
  assert.equal(validationReport.story, "STORY-KF-004A");
  assert.equal(validationReport.schemaValidation, "PASS");
  assert.deepEqual(incidentLog.incidents, []);
});
