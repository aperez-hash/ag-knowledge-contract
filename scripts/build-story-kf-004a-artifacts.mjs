import { mkdir, writeFile } from "node:fs/promises";

import {
  AI_CONTEXT_PATH,
  DERIVED_DIR,
  INCIDENT_LOG_PATH,
  PLANNER_VIEW_PATH,
  VALIDATION_REPORT_PATH,
  WEB_VIEW_PATH,
  buildStoryArtifacts,
} from "./lib/knowledge-object-story-kf-004a.mjs";

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function main() {
  const artifacts = await buildStoryArtifacts();

  await mkdir(DERIVED_DIR, { recursive: true });

  if (!artifacts.plannerView.ok || !artifacts.webView.ok || !artifacts.aiContext.ok) {
    throw new Error("No se pueden generar los artefactos derivados porque alguna validacion ha fallado.");
  }

  await Promise.all([
    writeFile(PLANNER_VIEW_PATH, formatJson(artifacts.plannerView.data), "utf8"),
    writeFile(WEB_VIEW_PATH, formatJson(artifacts.webView.data), "utf8"),
    writeFile(AI_CONTEXT_PATH, formatJson(artifacts.aiContext.data), "utf8"),
    writeFile(VALIDATION_REPORT_PATH, formatJson(artifacts.validationReport), "utf8"),
    writeFile(INCIDENT_LOG_PATH, formatJson(artifacts.incidentLog), "utf8"),
  ]);

  console.log(
    JSON.stringify(
      {
        ok: true,
        derivedArtifacts: 5,
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
