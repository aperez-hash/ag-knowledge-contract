import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  AI_CONTEXT_PATH,
  CHECKLIST_VIEW_PATH,
  CLIENT_RESPONSE_PATH,
  FAQ_VIEW_PATH,
  INCIDENT_LOG_PATH,
  PLANNER_VIEW_PATH,
  VALIDATION_REPORT_PATH,
  WEB_VIEW_PATH,
  buildAiContext,
  buildChecklistView,
  buildClientResponse,
  buildFaqView,
  buildPlannerView,
  buildStoryArtifacts,
  buildWebView,
  loadKnowledgeObject,
  validateSchemaRuntime,
  validateStorySemanticRules,
} from "../scripts/lib/knowledge-object-story-kf-010d.mjs";

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function getRequiredDocumentationLabels(knowledgeObject) {
  return knowledgeObject.blocks
    .find((block) => block.type === "required_documentation")
    .content.items.map((item) => item.label);
}

test("el Knowledge Object de IRNR sobre establecimientos permanentes valida contra el schema publicado", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = await validateSchemaRuntime(knowledgeObject);

  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
});

test("el objeto cumple las reglas semanticas de STORY-KF-010D", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = validateStorySemanticRules(knowledgeObject);

  assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
});

test("la vista de Planner mantiene el contenido operativo permitido", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildPlannerView(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.risks.length, 1);
  assert.equal(result.data.procedures.length, 1);
  assert.equal(result.data.checklists.length, 1);
  assert.equal(result.data.requiredDocumentation.length, 1);
  assert.equal(result.data.relevantRelations.length, 5);
  assert.equal(
    result.data.plannerBlocks.some((block) => block.type === "internal_reference"),
    false,
  );
  assert.equal(
    result.data.relevantRelations.some((relation) =>
      relation.rationale.startsWith("Consumes Doctrine From:"),
    ),
    true,
  );
  assert.equal(
    result.data.relevantRelations.some((relation) =>
      relation.rationale.startsWith("Provides Doctrine To:"),
    ),
    true,
  );
});

test("la vista web expone FAQ, documentacion y casos publicos sin riesgos internos", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildWebView(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.faq.length, 6);
  assert.equal(result.data.requiredDocumentation.length, 6);
  assert.equal(result.data.caseStudies.length, 5);
  assert.deepEqual(result.data.excludedByPolicy, [
    "internal_reference",
    "risk",
    "restricted visibility",
  ]);
});

test("el contexto IA incluye criterio, procedimiento, riesgos y restricciones", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const result = buildAiContext(knowledgeObject);

  assert.equal(result.ok, true);
  assert.equal(result.data.legalBasis.length, 1);
  assert.equal(result.data.procedure.length >= 10, true);
  assert.equal(result.data.risks.length, 5);
  assert.equal(result.data.clientResponseAuthorization.channelAccess, "derived_only");
});

test("las derivaciones de checklist, FAQ y client response se generan sin duplicar contenido bruto", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const checklist = buildChecklistView(knowledgeObject);
  const faq = buildFaqView(knowledgeObject);
  const clientResponse = buildClientResponse(knowledgeObject);

  assert.equal(checklist.ok, true);
  assert.equal(checklist.data.items.length, 10);
  assert.equal(faq.ok, true);
  assert.equal(faq.data.items.length, 6);
  assert.equal(clientResponse.ok, true);
  assert.equal(clientResponse.data.responseType, "derived_draft");
  assert.equal(clientResponse.data.humanReviewRequired, true);
  assert.equal(clientResponse.data.summary, knowledgeObject.executiveSummary.problemSolved);
  assert.deepEqual(
    clientResponse.data.nextSteps,
    getRequiredDocumentationLabels(knowledgeObject).slice(0, 4),
  );
  assert.equal(clientResponse.data.documentationHighlights.length >= 4, true);
});

test("el objeto mantiene el foco en EP, CDI, modelos 200-202-206 y matriz de evidencias", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const technicalBlock = knowledgeObject.blocks.find((block) => block.type === "technical_development");
  const requiredDocumentationBlock = knowledgeObject.blocks.find(
    (block) => block.type === "required_documentation",
  );

  assert.equal(/establecimiento permanente|\bEP\b/iu.test(technicalBlock.content.development), true);
  assert.equal(/lugar fijo|agente/iu.test(technicalBlock.content.development), true);
  assert.equal(/preparatoria o auxiliar|preparatorio o auxiliar/iu.test(technicalBlock.content.development), true);
  assert.equal(/CDI|convenio/u.test(technicalBlock.content.development), true);
  assert.equal(/Modelo 200|modelo 200/u.test(technicalBlock.content.development), true);
  assert.equal(/Modelo 202|modelo 202/u.test(technicalBlock.content.development), true);
  assert.equal(/Modelo 206|modelo 206/u.test(technicalBlock.content.development), true);
  assert.equal(
    requiredDocumentationBlock.content.items.filter((item) => /Fuerza probatoria:/u.test(item.notes))
      .length >= 5,
    true,
  );
  assert.equal(
    requiredDocumentationBlock.content.items.some((item) =>
      /certificado de residencia fiscal/iu.test(item.label),
    ),
    true,
  );
  assert.equal(
    requiredDocumentationBlock.content.items.some((item) =>
      /poderes|agente|contratar/iu.test(item.label + item.notes),
    ),
    true,
  );
});

test("las derivaciones auxiliares respetan politicas de canal y estado", async () => {
  const knowledgeObject = await loadKnowledgeObject();
  const blockedClientResponse = structuredClone(knowledgeObject);
  blockedClientResponse.channelPolicy.client_response.access = "blocked";

  const obsoleteChecklist = structuredClone(knowledgeObject);
  obsoleteChecklist.governance.status = "obsoleto";

  const blockedFaq = structuredClone(knowledgeObject);
  const faqBlock = blockedFaq.blocks.find((block) => block.type === "faq");
  faqBlock.channelPolicy.faq.access = "blocked";

  const blockedChecklist = structuredClone(knowledgeObject);
  const checklistBlock = blockedChecklist.blocks.find((block) => block.type === "checklist");
  checklistBlock.channelPolicy.checklist.access = "blocked";

  assert.equal(buildClientResponse(blockedClientResponse).ok, false);
  assert.equal(buildChecklistView(obsoleteChecklist).ok, false);
  assert.equal(buildFaqView(blockedFaq).ok, false);
  assert.equal(buildChecklistView(blockedChecklist).ok, false);
});

test("el informe de validacion queda certificado completamente en PASS", async () => {
  const artifacts = await buildStoryArtifacts();

  assert.equal(artifacts.validationReport.story, "STORY-KF-010D");
  assert.equal(artifacts.validationReport.research, "PASS");
  assert.equal(artifacts.validationReport.schemaValidation, "PASS");
  assert.equal(artifacts.validationReport.ruleEngine, "PASS");
  assert.equal(artifacts.validationReport.plannerView, "PASS");
  assert.equal(artifacts.validationReport.webView, "PASS");
  assert.equal(artifacts.validationReport.aiContext, "PASS");
  assert.equal(artifacts.validationReport.checklist, "PASS");
  assert.equal(artifacts.validationReport.faq, "PASS");
  assert.equal(artifacts.validationReport.clientResponse, "PASS");
  assert.equal(artifacts.validationReport.qualityGate, "PASS");
  assert.equal(artifacts.validationReport.structuralChangesRequired, "NO");
  assert.deepEqual(artifacts.incidentLog.incidents, []);
});

test("los ficheros generados quedan sincronizados con la derivacion actual", async () => {
  const artifacts = await buildStoryArtifacts();
  const [
    plannerView,
    webView,
    aiContext,
    checklistView,
    faqView,
    clientResponse,
    validationReport,
    incidentLog,
  ] = await Promise.all([
    readJson(PLANNER_VIEW_PATH),
    readJson(WEB_VIEW_PATH),
    readJson(AI_CONTEXT_PATH),
    readJson(CHECKLIST_VIEW_PATH),
    readJson(FAQ_VIEW_PATH),
    readJson(CLIENT_RESPONSE_PATH),
    readJson(VALIDATION_REPORT_PATH),
    readJson(INCIDENT_LOG_PATH),
  ]);

  assert.deepEqual(plannerView, artifacts.plannerView.data);
  assert.deepEqual(webView, artifacts.webView.data);
  assert.deepEqual(aiContext, artifacts.aiContext.data);
  assert.deepEqual(checklistView, artifacts.checklistView.data);
  assert.deepEqual(faqView, artifacts.faqView.data);
  assert.deepEqual(clientResponse, artifacts.clientResponse.data);
  assert.equal(validationReport.story, "STORY-KF-010D");
  assert.equal(validationReport.qualityGate, "PASS");
  assert.deepEqual(incidentLog.incidents, []);
});
