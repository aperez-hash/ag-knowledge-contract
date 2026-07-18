import { buildStoryArtifacts } from "./lib/knowledge-object-story-kf-008c.mjs";

async function main() {
  const artifacts = await buildStoryArtifacts();

  console.log(
    JSON.stringify(
      {
        story: artifacts.validationReport.story,
        knowledgeObject: artifacts.validationReport.knowledgeObject,
        research: artifacts.validationReport.research,
        schemaValidation: artifacts.validationReport.schemaValidation,
        ruleEngine: artifacts.validationReport.ruleEngine,
        plannerView: artifacts.validationReport.plannerView,
        webView: artifacts.validationReport.webView,
        aiContext: artifacts.validationReport.aiContext,
        checklist: artifacts.validationReport.checklist,
        faq: artifacts.validationReport.faq,
        clientResponse: artifacts.validationReport.clientResponse,
        qualityGate: artifacts.validationReport.qualityGate,
        structuralChangesRequired: artifacts.validationReport.structuralChangesRequired,
        incidents: artifacts.incidentLog.incidents,
      },
      null,
      2,
    ),
  );

  if (
    artifacts.validationReport.schemaValidation !== "PASS" ||
    artifacts.validationReport.ruleEngine !== "PASS" ||
    artifacts.validationReport.plannerView !== "PASS" ||
    artifacts.validationReport.webView !== "PASS" ||
    artifacts.validationReport.aiContext !== "PASS" ||
    artifacts.validationReport.checklist !== "PASS" ||
    artifacts.validationReport.faq !== "PASS" ||
    artifacts.validationReport.clientResponse !== "PASS" ||
    artifacts.validationReport.qualityGate !== "PASS"
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
