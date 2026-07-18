import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function run(label, args) {
  const result = spawnSync(process.execPath, args, {
    cwd: rootDir,
    encoding: "utf8"
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status ?? 1}`);
  }
}

run("generate:check", ["scripts/generate-types.mjs", "--check"]);
run("validate:example", ["scripts/validate-example.mjs"]);
run("validate:story-kf-004a", ["scripts/validate-story-kf-004a.mjs"]);
run("validate:story-kf-005a", ["scripts/validate-story-kf-005a.mjs"]);
run("validate:story-kf-005b", ["scripts/validate-story-kf-005b.mjs"]);
run("validate:story-kf-005c", ["scripts/validate-story-kf-005c.mjs"]);
run("validate:story-kf-008a", ["scripts/validate-story-kf-008a.mjs"]);
run("validate:story-kf-008b", ["scripts/validate-story-kf-008b.mjs"]);
run("test", [
  "--test",
  "tests/knowledge-object.schema.test.mjs",
  "tests/modelo-210-story-kf-004a.test.mjs",
  "tests/modelo-720-story-kf-005a.test.mjs",
  "tests/modelo-714-story-kf-005b.test.mjs",
  "tests/modelo-721-story-kf-005c.test.mjs",
  "tests/residencia-fiscal-story-kf-008a.test.mjs",
  "tests/cdi-story-kf-008b.test.mjs",
]);
