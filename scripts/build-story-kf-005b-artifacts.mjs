import { mkdir, writeFile } from "node:fs/promises";

import {
  AI_CONTEXT_PATH,
  CHECKLIST_VIEW_PATH,
  CLIENT_RESPONSE_PATH,
  DERIVED_DIR,
  FAQ_VIEW_PATH,
  INCIDENT_LOG_PATH,
  PLANNER_VIEW_PATH,
  VALIDATION_REPORT_PATH,
  WEB_VIEW_PATH,
  buildStoryArtifacts,
} from "./lib/knowledge-object-story-kf-005b.mjs";

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function main() {
  const artifacts = await buildStoryArtifacts();

  await mkdir(DERIVED_DIR, { recursive: true });

  if (
    !artifacts.plannerView.ok ||
    !artifacts.webView.ok ||
    !artifacts.aiContext.ok ||
    !artifacts.checklistView.ok ||
    !artifacts.faqView.ok ||
    !artifacts.clientResponse.ok
  ) {
    throw new Error("No se pueden generar los artefactos derivados porque alguna validacion ha fallado.");
  }

  await Promise.all([
    writeFile(PLANNER_VIEW_PATH, formatJson(artifacts.plannerView.data), "utf8"),
    writeFile(WEB_VIEW_PATH, formatJson(artifacts.webView.data), "utf8"),
    writeFile(AI_CONTEXT_PATH, formatJson(artifacts.aiContext.data), "utf8"),
    writeFile(CHECKLIST_VIEW_PATH, formatJson(artifacts.checklistView.data), "utf8"),
    writeFile(FAQ_VIEW_PATH, formatJson(artifacts.faqView.data), "utf8"),
    writeFile(CLIENT_RESPONSE_PATH, formatJson(artifacts.clientResponse.data), "utf8"),
    writeFile(VALIDATION_REPORT_PATH, formatJson(artifacts.validationReport), "utf8"),
    writeFile(INCIDENT_LOG_PATH, formatJson(artifacts.incidentLog), "utf8"),
  ]);

  console.log(
    JSON.stringify(
      {
        ok: true,
        derivedArtifacts: 8,
        incidentCount: artifacts.incidentLog.incidents.length,
        validationReport: artifacts.validationReport,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
