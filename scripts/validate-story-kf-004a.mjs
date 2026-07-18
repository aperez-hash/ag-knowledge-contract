import { buildStoryArtifacts } from "./lib/knowledge-object-story-kf-004a.mjs";

async function main() {
  const artifacts = await buildStoryArtifacts();

  console.log(
    JSON.stringify(
      {
        story: artifacts.validationReport.story,
        knowledgeObject: artifacts.validationReport.knowledgeObject,
        schemaValidation: artifacts.validationReport.schemaValidation,
        ruleEngine: artifacts.validationReport.ruleEngine,
        plannerView: artifacts.validationReport.plannerView,
        webView: artifacts.validationReport.webView,
        aiContext: artifacts.validationReport.aiContext,
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
    artifacts.validationReport.aiContext !== "PASS"
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
