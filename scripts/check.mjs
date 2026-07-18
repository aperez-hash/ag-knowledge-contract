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
run("test", ["--test", "tests/knowledge-object.schema.test.mjs"]);
