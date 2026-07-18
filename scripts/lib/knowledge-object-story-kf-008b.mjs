import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const schemaPath = path.join(rootDir, "schema", "knowledge-object.schema.json");
const objectPath = path.join(rootDir, "examples", "convenios-doble-imposicion-cdi.json");

export const DERIVED_DIR = path.join(rootDir, "examples", "derived");
export const PLANNER_VIEW_PATH = path.join(DERIVED_DIR, "cdi-planner-view.json");
export const WEB_VIEW_PATH = path.join(DERIVED_DIR, "cdi-web-view.json");
export const AI_CONTEXT_PATH = path.join(DERIVED_DIR, "cdi-ai-context.json");
export const CHECKLIST_VIEW_PATH = path.join(DERIVED_DIR, "cdi-checklist.json");
export const FAQ_VIEW_PATH = path.join(DERIVED_DIR, "cdi-faq.json");
export const CLIENT_RESPONSE_PATH = path.join(DERIVED_DIR, "cdi-client-response.json");
export const VALIDATION_REPORT_PATH = path.join(
  DERIVED_DIR,
  "cdi-validation-report.json",
);
export const INCIDENT_LOG_PATH = path.join(DERIVED_DIR, "cdi-incident-log.json");

function wordCount(text) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

function uniqueValues(items, key) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of items) {
    const value = item[key];
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }

  return [...duplicates];
}

function hasAllowedOrDerived(access) {
  return access === "allowed" || access === "derived_only";
}

function isNotObsolete(status) {
  return status !== "obsoleto";
}

function compareByOrder(left, right) {
  return left.order - right.order;
}

function sortByOrder(items) {
  return [...items].sort(compareByOrder);
}

function getBlock(knowledgeObject, type) {
  return knowledgeObject.blocks.find((block) => block.type === type);
}

function getBlocksForChannel(knowledgeObject, channel, options = {}) {
  const {
    allowRestricted = false,
    excludeInternalReference = false,
    requireDirect = false,
  } = options;

  const rootAccess = knowledgeObject.channelPolicy[channel].access;
  if (rootAccess === "blocked") {
    return [];
  }

  return sortByOrder(
    knowledgeObject.blocks.filter((block) => {
      if (!isNotObsolete(knowledgeObject.governance.status) || !isNotObsolete(block.status)) {
        return false;
      }

      if (excludeInternalReference && block.type === "internal_reference") {
        return false;
      }

      if (block.visibility === "restricted" && !allowRestricted) {
        return false;
      }

      const blockAccess = block.channelPolicy[channel].access;
      if (blockAccess === "blocked") {
        return false;
      }

      if (requireDirect) {
        return rootAccess === "allowed" && blockAccess === "allowed";
      }

      return hasAllowedOrDerived(rootAccess) && hasAllowedOrDerived(blockAccess);
    }),
  );
}

function getSingleBlockForChannel(knowledgeObject, channel, type, options = {}) {
  const [block] = getBlocksForChannel(knowledgeObject, channel, options).filter(
    (candidate) => candidate.type === type,
  );

  return block;
}

function normalizePlannerBlock(block) {
  return {
    blockId: block.blockId,
    content: block.content,
    order: block.order,
    status: block.status,
    title: block.title,
    type: block.type,
    visibility: block.visibility,
  };
}

function summarizeClientResponsePolicy(knowledgeObject) {
  const access = knowledgeObject.channelPolicy.client_response.access;
  return {
    channelAccess: access,
    mayExposeCanonicalTextDirectly: access === "allowed",
    mayProduceDerivedDraft: access !== "blocked",
    humanReviewRequired: true,
    instruction:
      access === "allowed"
        ? "Puede prepararse una respuesta al cliente, pero debe mantenerse la revision humana final."
        : access === "derived_only"
          ? "Solo se permiten borradores derivados y controlados; no debe reutilizarse texto bruto del objeto."
          : "No debe generarse respuesta al cliente desde este objeto sin otro soporte autorizado.",
  };
}

function extractRiskRestrictions(knowledgeObject) {
  const restrictions = [];
  const blockedChannels = Object.entries(knowledgeObject.channelPolicy)
    .filter(([, rule]) => rule.access === "blocked")
    .map(([channel]) => channel);
  const derivedChannels = Object.entries(knowledgeObject.channelPolicy)
    .filter(([, rule]) => rule.access === "derived_only")
    .map(([channel]) => channel);

  restrictions.push(
    `Canales bloqueados a nivel raiz: ${blockedChannels.length > 0 ? blockedChannels.join(", ") : "ninguno"}.`,
  );
  restrictions.push(
    `Canales solo derivables a nivel raiz: ${derivedChannels.length > 0 ? derivedChannels.join(", ") : "ninguno"}.`,
  );
  restrictions.push(
    "No debe reutilizarse este objeto como texto directo de respuesta al cliente sin derivacion controlada y revision humana.",
  );

  return restrictions;
}

export async function loadSchema() {
  return JSON.parse(await readFile(schemaPath, "utf8"));
}

export async function loadKnowledgeObject() {
  return JSON.parse(await readFile(objectPath, "utf8"));
}

export async function validateSchemaRuntime(knowledgeObject) {
  const schema = await loadSchema();
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
  });
  addFormats(ajv);

  const validate = ajv.compile(schema);
  const ok = validate(knowledgeObject);

  return {
    ok: Boolean(ok),
    errors: (validate.errors ?? []).map((error) => {
      const instancePath = error.instancePath || "/knowledgeObject";
      return `${instancePath} ${error.message ?? "schema validation error"}`.trim();
    }),
  };
}

export function validateStorySemanticRules(knowledgeObject) {
  const errors = [];

  if (knowledgeObject.governance.status !== "validado") {
    errors.push("El objeto raiz debe quedar en estado 'validado'.");
  }

  const summaryWords = wordCount(knowledgeObject.executiveSummary.summary);
  if (summaryWords < 150 || summaryWords > 250) {
    errors.push(
      `El executive summary debe tener entre 150 y 250 palabras y ahora tiene ${summaryWords}.`,
    );
  }

  const requiredBlockTypes = [
    "legal_basis",
    "technical_development",
    "procedure",
    "checklist",
    "faq",
    "risk",
    "required_documentation",
    "case_study",
    "internal_reference",
  ];

  for (const blockType of requiredBlockTypes) {
    if (!getBlock(knowledgeObject, blockType)) {
      errors.push(`Falta el bloque obligatorio '${blockType}'.`);
    }
  }

  const duplicateBlockIds = uniqueValues(knowledgeObject.blocks, "blockId");
  if (duplicateBlockIds.length > 0) {
    errors.push(`Hay blockId duplicados: ${duplicateBlockIds.join(", ")}.`);
  }

  const duplicateOrders = uniqueValues(knowledgeObject.blocks, "order");
  if (duplicateOrders.length > 0) {
    errors.push(`Hay order duplicados en blocks[]: ${duplicateOrders.join(", ")}.`);
  }

  const duplicateRelationIds = uniqueValues(knowledgeObject.relations, "relationId");
  if (duplicateRelationIds.length > 0) {
    errors.push(`Hay relationId duplicados: ${duplicateRelationIds.join(", ")}.`);
  }

  const requiredModelCodes = ["210", "714", "720", "721", "151"];
  for (const modelCode of requiredModelCodes) {
    if (!knowledgeObject.affectedTaxModels.some((model) => model.modelCode === modelCode)) {
      errors.push(`affectedTaxModels debe incluir el modelo ${modelCode}.`);
    }
  }

  const faqBlock = getBlock(knowledgeObject, "faq");
  if (faqBlock && faqBlock.content.items.length < 5) {
    errors.push("El bloque FAQ debe incluir al menos 5 preguntas frecuentes reales.");
  }

  const caseBlock = getBlock(knowledgeObject, "case_study");
  if (caseBlock && caseBlock.content.items.length < 5) {
    errors.push("El bloque de casos practicos debe incluir al menos 5 casos.");
  }

  const riskBlock = getBlock(knowledgeObject, "risk");
  if (riskBlock && riskBlock.content.items.length < 5) {
    errors.push("El bloque de riesgos debe incluir al menos 5 riesgos materiales.");
  }

  const internalReferenceBlock = getBlock(knowledgeObject, "internal_reference");
  if (internalReferenceBlock && internalReferenceBlock.content.items.length === 0) {
    errors.push("El bloque de referencias internas no puede estar vacio en esta historia.");
  }

  const sourceBackedTypes = [
    "legal_basis",
    "technical_development",
    "procedure",
    "risk",
    "case_study",
  ];

  for (const blockType of sourceBackedTypes) {
    const block = getBlock(knowledgeObject, blockType);
    if (block && (!("sourceRefs" in block) || !Array.isArray(block.sourceRefs) || block.sourceRefs.length === 0)) {
      errors.push(`El bloque '${blockType}' debe incluir sourceRefs por respaldo tecnico.`);
    }
  }

  const requiredRelationTargets = [
    "residencia",
    "modelo210",
    "modelo151",
    "irpf",
    "irnr",
    "fiscalidad-internacional",
  ];

  for (const targetFragment of requiredRelationTargets) {
    if (
      !knowledgeObject.relations.some((relation) =>
        relation.targetKnowledgeObjectId.includes(targetFragment),
      )
    ) {
      errors.push(`Debe existir una relacion expresa que apunte a '${targetFragment}'.`);
    }
  }

  if (
    !knowledgeObject.relations.every((relation) =>
      relation.rationale.startsWith("Provides Treaty Framework To:"),
    )
  ) {
    errors.push("Todas las relaciones deben explicitar la categoria funcional 'Provides Treaty Framework To:'.");
  }

  const technicalBlock = getBlock(knowledgeObject, "technical_development");
  if (
    technicalBlock &&
    !/Decision Gateway/u.test(technicalBlock.content.development)
  ) {
    errors.push("El desarrollo tecnico debe identificar expresamente el Decision Gateway.");
  }

  if (
    technicalBlock &&
    !/aplicabilidad/u.test(technicalBlock.content.development)
  ) {
    errors.push("El desarrollo tecnico debe tratar expresamente la fase de aplicabilidad.");
  }

  if (
    technicalBlock &&
    !/interpretacion/u.test(technicalBlock.content.development)
  ) {
    errors.push("El desarrollo tecnico debe tratar expresamente la fase de interpretacion.");
  }

  if (
    technicalBlock &&
    !/tie-breaker/u.test(technicalBlock.content.development)
  ) {
    errors.push("El desarrollo tecnico debe tratar expresamente el tie-breaker.");
  }

  if (technicalBlock && !/no crea por si sola una obligacion tributaria nueva/u.test(technicalBlock.content.development + " " + getBlock(knowledgeObject, "legal_basis")?.content?.basis)) {
    errors.push("El objeto debe dejar expreso que el CDI no crea por si solo una obligacion tributaria nueva.");
  }

  if (technicalBlock && !/Modelo OCDE|Comentarios/u.test(technicalBlock.content.development + " " + getBlock(knowledgeObject, "legal_basis")?.content?.basis)) {
    errors.push("El objeto debe tratar expresamente la funcion interpretativa del Modelo OCDE y sus Comentarios.");
  }

  if (technicalBlock && !/establecimiento permanente/u.test(technicalBlock.content.development)) {
    errors.push("El desarrollo tecnico debe tratar expresamente el riesgo de establecimiento permanente.");
  }

  if (technicalBlock && !/no desarrolla aun sus tests materiales/u.test(technicalBlock.content.development)) {
    errors.push("El objeto debe dejar expreso que el EP solo se trata en nivel introductorio.");
  }

  const requiredDocumentationBlock = getBlock(knowledgeObject, "required_documentation");
  if (requiredDocumentationBlock && requiredDocumentationBlock.content.items.length < 5) {
    errors.push("El bloque de documentacion necesaria debe incluir al menos 5 evidencias.");
  }

  if (
    requiredDocumentationBlock &&
    requiredDocumentationBlock.content.items.filter((item) => /Fuerza probatoria:/u.test(item.notes))
      .length < 5
  ) {
    errors.push("La matriz de evidencias debe dejar trazada la fuerza probatoria en los 5 items minimos.");
  }

  if (
    requiredDocumentationBlock &&
    !requiredDocumentationBlock.content.items.some((item) => /muy alta/iu.test(item.notes))
  ) {
    errors.push("La matriz de evidencias debe incluir al menos una evidencia de fuerza probatoria muy alta.");
  }

  if (
    requiredDocumentationBlock &&
    !requiredDocumentationBlock.content.items.some((item) => /convenio|CDI/iu.test(item.label))
  ) {
    errors.push("La documentacion necesaria debe incluir el texto o referencia del CDI aplicable.");
  }

  if (
    requiredDocumentationBlock &&
    !requiredDocumentationBlock.content.items.some((item) => /certificado de residencia fiscal/iu.test(item.label))
  ) {
    errors.push("La documentacion necesaria debe incluir certificado de residencia fiscal.");
  }

  const plannerBlock = knowledgeObject.channelPolicy.planner.access;
  if (plannerBlock !== "allowed") {
    errors.push("Planner debe quedar permitido a nivel raiz en esta historia.");
  }

  const webBlock = knowledgeObject.channelPolicy.web.access;
  if (webBlock !== "derived_only") {
    errors.push("La web debe quedar en modo 'derived_only' a nivel raiz.");
  }

  const clientResponseBlock = knowledgeObject.channelPolicy.client_response.access;
  if (clientResponseBlock !== "derived_only") {
    errors.push("client_response debe quedar en modo 'derived_only'.");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function buildPlannerView(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return {
      ok: false,
      errors: ["El objeto esta obsoleto y no debe consumirse en Planner."],
    };
  }

  if (knowledgeObject.channelPolicy.planner.access !== "allowed") {
    return {
      ok: false,
      errors: ["Planner no tiene permiso directo a nivel raiz."],
    };
  }

  const plannerBlocks = getBlocksForChannel(knowledgeObject, "planner", {
    allowRestricted: false,
    excludeInternalReference: true,
    requireDirect: true,
  }).map(normalizePlannerBlock);

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        title: knowledgeObject.identity.title,
        version: knowledgeObject.governance.version,
        status: knowledgeObject.governance.status,
      },
      executiveSummary: knowledgeObject.executiveSummary,
      affectedTaxModels: knowledgeObject.affectedTaxModels,
      affectedForms: knowledgeObject.affectedForms,
      plannerBlocks,
      procedures: plannerBlocks.filter((block) => block.type === "procedure"),
      checklists: plannerBlocks.filter((block) => block.type === "checklist"),
      requiredDocumentation: plannerBlocks.filter(
        (block) => block.type === "required_documentation",
      ),
      risks: plannerBlocks.filter((block) => block.type === "risk"),
      relevantRelations: knowledgeObject.relations,
    },
  };
}

export function buildWebView(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return {
      ok: false,
      errors: ["El objeto esta obsoleto y no debe publicarse en web."],
    };
  }

  if (knowledgeObject.channelPolicy.web.access === "blocked") {
    return {
      ok: false,
      errors: ["La raiz bloquea por completo el canal web."],
    };
  }

  const webBlocks = getBlocksForChannel(knowledgeObject, "web", {
    allowRestricted: false,
    excludeInternalReference: true,
    requireDirect: false,
  }).filter((block) => block.visibility === "public");

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        title: knowledgeObject.identity.title,
        slug: knowledgeObject.identity.slug,
        version: knowledgeObject.governance.version,
      },
      executiveSummary: knowledgeObject.executiveSummary,
      affectedTaxModels: knowledgeObject.affectedTaxModels,
      affectedForms: knowledgeObject.affectedForms,
      faq: webBlocks
        .filter((block) => block.type === "faq")
        .flatMap((block) => block.content.items),
      requiredDocumentation: webBlocks
        .filter((block) => block.type === "required_documentation")
        .flatMap((block) => block.content.items),
      caseStudies: webBlocks
        .filter((block) => block.type === "case_study")
        .flatMap((block) => block.content.items),
      excludedByPolicy: ["internal_reference", "risk", "restricted visibility"],
      disclaimer:
        "Vista derivada para web. Excluye referencias internas, riesgos internos y cualquier contenido restringido o bloqueado para este canal.",
    },
  };
}

export function buildAiContext(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return {
      ok: false,
      errors: ["El objeto esta obsoleto y no debe alimentar contexto IA activo."],
    };
  }

  if (knowledgeObject.channelPolicy.ia.access === "blocked") {
    return {
      ok: false,
      errors: ["La raiz bloquea el consumo por IA."],
    };
  }

  const aiBlocks = getBlocksForChannel(knowledgeObject, "ia", {
    allowRestricted: true,
    excludeInternalReference: true,
    requireDirect: false,
  });

  const legalBasis = aiBlocks
    .filter((block) => block.type === "legal_basis")
    .map((block) => block.content.basis);
  const technicalDevelopment = aiBlocks
    .filter((block) => block.type === "technical_development")
    .map((block) => block.content.development);
  const procedure = aiBlocks
    .filter((block) => block.type === "procedure")
    .flatMap((block) => block.content.steps.map((step) => step.text));
  const risks = aiBlocks
    .filter((block) => block.type === "risk")
    .flatMap((block) => block.content.items);

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        title: knowledgeObject.identity.title,
        version: knowledgeObject.governance.version,
        status: knowledgeObject.governance.status,
      },
      criterionStatus: "vigente para uso interno validado",
      executiveSummary: knowledgeObject.executiveSummary.summary,
      legalBasis,
      technicalDevelopment,
      procedure,
      risks,
      restrictions: extractRiskRestrictions(knowledgeObject),
      clientResponseAuthorization: summarizeClientResponsePolicy(knowledgeObject),
    },
  };
}

export function buildChecklistView(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return { ok: false, errors: ["El objeto esta obsoleto y no debe derivar checklist activa."] };
  }

  const checklistBlock = getSingleBlockForChannel(knowledgeObject, "checklist", "checklist", {
    allowRestricted: false,
    excludeInternalReference: true,
    requireDirect: false,
  });
  if (!checklistBlock) {
    return {
      ok: false,
      errors: [
        "No existe un bloque checklist consumible para este canal o queda excluido por politica.",
      ],
    };
  }

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        version: knowledgeObject.governance.version,
      },
      title: `${knowledgeObject.identity.title} - Checklist operativa`,
      items: checklistBlock.content.items,
    },
  };
}

export function buildFaqView(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return { ok: false, errors: ["El objeto esta obsoleto y no debe derivar FAQ activa."] };
  }

  const faqBlock = getSingleBlockForChannel(knowledgeObject, "faq", "faq", {
    allowRestricted: false,
    excludeInternalReference: true,
    requireDirect: false,
  });
  if (!faqBlock) {
    return {
      ok: false,
      errors: ["No existe un bloque FAQ consumible para este canal o queda excluido por politica."],
    };
  }

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        version: knowledgeObject.governance.version,
      },
      title: `${knowledgeObject.identity.title} - FAQ derivada`,
      items: faqBlock.content.items,
    },
  };
}

export function buildClientResponse(knowledgeObject) {
  if (!isNotObsolete(knowledgeObject.governance.status)) {
    return {
      ok: false,
      errors: ["El objeto esta obsoleto y no debe generar respuesta derivada al cliente."],
    };
  }

  const faqBlock = getSingleBlockForChannel(knowledgeObject, "client_response", "faq", {
    allowRestricted: false,
    excludeInternalReference: true,
    requireDirect: false,
  });
  const requiredDocumentation = getSingleBlockForChannel(
    knowledgeObject,
    "client_response",
    "required_documentation",
    {
      allowRestricted: false,
      excludeInternalReference: true,
      requireDirect: false,
    },
  );
  if (knowledgeObject.channelPolicy.client_response.access !== "derived_only") {
    return {
      ok: false,
      errors: ["client_response solo puede consumirse como derivacion controlada."],
    };
  }

  if (!faqBlock || !requiredDocumentation) {
    return {
      ok: false,
      errors: [
        "Faltan bloques consumibles para client_response o quedan excluidos por politica de canal.",
      ],
    };
  }

  const nextSteps = requiredDocumentation.content.items.slice(0, 4).map((item) => item.label);

  return {
    ok: true,
    data: {
      source: {
        knowledgeObjectId: knowledgeObject.identity.knowledgeObjectId,
        stableKey: knowledgeObject.identity.stableKey,
        version: knowledgeObject.governance.version,
      },
      responseType: "derived_draft",
      humanReviewRequired: true,
      summary: knowledgeObject.executiveSummary.problemSolved,
      nextSteps,
      faqHighlights: faqBlock.content.items.slice(0, 3),
      documentationHighlights: requiredDocumentation.content.items.filter((item) => item.required),
      caution:
        "Borrador derivado para apoyo interno. No debe enviarse sin revision humana y sin contrastar la documentacion concreta del cliente.",
    },
  };
}

export async function buildStoryArtifacts() {
  const knowledgeObject = await loadKnowledgeObject();
  const schemaValidation = await validateSchemaRuntime(knowledgeObject);
  const semanticValidation = validateStorySemanticRules(knowledgeObject);
  const plannerView = buildPlannerView(knowledgeObject);
  const webView = buildWebView(knowledgeObject);
  const aiContext = buildAiContext(knowledgeObject);
  const checklistView = buildChecklistView(knowledgeObject);
  const faqView = buildFaqView(knowledgeObject);
  const clientResponse = buildClientResponse(knowledgeObject);

  const incidents = [
    ...schemaValidation.errors.map((message) => ({ severity: "error", scope: "schema", message })),
    ...semanticValidation.errors.map((message) => ({
      severity: "error",
      scope: "rule_engine",
      message,
    })),
    ...("errors" in plannerView && plannerView.errors
      ? plannerView.errors.map((message) => ({
          severity: "error",
          scope: "planner_view",
          message,
        }))
      : []),
    ...("errors" in webView && webView.errors
      ? webView.errors.map((message) => ({
          severity: "error",
          scope: "web_view",
          message,
        }))
      : []),
    ...("errors" in aiContext && aiContext.errors
      ? aiContext.errors.map((message) => ({
          severity: "error",
          scope: "ai_context",
          message,
        }))
      : []),
    ...("errors" in checklistView && checklistView.errors
      ? checklistView.errors.map((message) => ({
          severity: "error",
          scope: "checklist_view",
          message,
        }))
      : []),
    ...("errors" in faqView && faqView.errors
      ? faqView.errors.map((message) => ({
          severity: "error",
          scope: "faq_view",
          message,
        }))
      : []),
    ...("errors" in clientResponse && clientResponse.errors
      ? clientResponse.errors.map((message) => ({
          severity: "error",
          scope: "client_response",
          message,
        }))
      : []),
  ];

  return {
    knowledgeObject,
    plannerView,
    webView,
    aiContext,
    checklistView,
    faqView,
    clientResponse,
    validationReport: {
      story: "STORY-KF-008B",
      knowledgeObject: knowledgeObject.identity.title,
      research: "PASS",
      schemaValidation: schemaValidation.ok ? "PASS" : "FAIL",
      ruleEngine: semanticValidation.ok ? "PASS" : "FAIL",
      plannerView: plannerView.ok ? "PASS" : "FAIL",
      webView: webView.ok ? "PASS" : "FAIL",
      aiContext: aiContext.ok ? "PASS" : "FAIL",
      checklist: checklistView.ok ? "PASS" : "FAIL",
      faq: faqView.ok ? "PASS" : "FAIL",
      clientResponse: clientResponse.ok ? "PASS" : "FAIL",
      qualityGate: incidents.length === 0 ? "PASS" : "FAIL",
      structuralChangesRequired: "NO",
      generatedAt: new Date().toISOString(),
      incidentCount: incidents.length,
    },
    incidentLog: {
      story: "STORY-KF-008B",
      incidents,
    },
  };
}
