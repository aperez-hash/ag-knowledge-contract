# IRNR Rendimientos del Capital Inmobiliario Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `IRNR - Rendimientos del Capital Inmobiliario` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers, or architecture.

**Architecture:** Reuse the certified Knowledge Factory production pattern already used by `Modelo 151`, `CDI`, `Residencia Fiscal`, `Modelo 714`, `Modelo 720`, `Modelo 721`, and `IRNR - Rendimientos del Trabajo`: one canonical JSON object, one story-specific helper module, one artifact builder, one validator, one focused test file, one validation report, and one PR draft. The object remains material-operational, focused on rental and accessory real-estate income within `IRNR`, with doctrinal dependence on `Residencia Fiscal`, `CDI`, and `Modelo 210`, but without turning into a full procedural manual.

**Tech Stack:** Canonical JSON documents, Node.js ESM scripts, built-in `node:test`, existing package scripts in `package.json`, and the published contract `@ag/knowledge-contract@1.0.0`.

---

## File Structure

### New files to create

- `docs/research/2026-07-18-irnr-capital-inmobiliario-primary-sources.md`
  - Primary-source research dossier for rental real-estate income in `IRNR`.
- `examples/irnr-rendimientos-capital-inmobiliario.json`
  - Canonical Knowledge Object for the story.
- `scripts/lib/knowledge-object-story-kf-010a.mjs`
  - Story-specific loader, semantic validator, and derived-view builder.
- `scripts/build-story-kf-010a-artifacts.mjs`
  - Artifact generator for Planner, Web, AI, Checklist, FAQ, Client Response, validation report, and incident log.
- `scripts/validate-story-kf-010a.mjs`
  - Consolidated validation entrypoint for the story.
- `tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs`
  - Focused automated coverage for the object and all derived outputs.
- `docs/2026-07-18-story-kf-010a-validation-report.md`
  - Human-readable validation summary.
- `docs/2026-07-18-story-kf-010a-pr-draft.md`
  - Draft PR body text for publication.

### Existing files to modify

- `README.md`
  - Add the new object, scripts, tests, and usage notes.
- `CHANGELOG.md`
  - Record `STORY-KF-010A` and `IRNR - Rendimientos del Capital Inmobiliario`.
- `package.json`
  - Add story-specific scripts and export entry if needed.
- `scripts/check.mjs`
  - Include story validator and focused tests in the package-wide check path.

### Derived files expected from the builder

- `examples/derived/irnr-rendimientos-capital-inmobiliario-planner-view.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-web-view.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-ai-context.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-checklist.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-faq.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-client-response.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-validation-report.json`
- `examples/derived/irnr-rendimientos-capital-inmobiliario-incident-log.json`

---

### Task 1: Create the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-irnr-capital-inmobiliario-primary-sources.md`

- [ ] **Step 1: Write the research dossier structure**

```md
# IRNR - Rendimientos del Capital Inmobiliario

Fecha: 2026-07-18
Estado: dossier primario para STORY-KF-010A

## Fuentes normativas principales

## Fuentes AEAT

## Doctrina administrativa relevante

## Jurisprudencia con impacto operativo

## Criterios de uso para el objeto
```

- [ ] **Step 2: Populate the mandatory primary sources**

Include, at minimum:

```md
- Texto Refundido de la Ley del IRNR.
- Reglamento del IRNR.
- Ley General Tributaria.
- Ley del IRPF, solo para interpretar conceptos compartidos cuando sea necesario.
- Normativa vigente sobre deducibilidad de gastos para residentes UE/EEE cuando proceda.
- AEAT: Modelo 210, instrucciones oficiales y ayuda tecnica de rentas inmobiliarias.
- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Modelo OCDE como referencia interpretativa general.
```

- [ ] **Step 3: Add doctrine and jurisprudence screening criteria**

```md
## Criterios de seleccion

- Solo consultas vinculantes con impacto operativo real sobre localizacion,
  deducibilidad, `CDI`, periodicidad o copropiedad.
- Solo criterios administrativos consolidados.
- Solo jurisprudencia con efecto practico sobre la tributacion de rentas
  inmobiliarias de no residentes.
- No usar resenas secundarias como fuente principal del criterio.
```

- [ ] **Step 4: Run a quick content sanity check**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-irnr-capital-inmobiliario-primary-sources.md
```

Expected: the dossier lists legal, AEAT, doctrine, and jurisprudence sections without placeholders.

- [ ] **Step 5: Commit**

```bash
git add docs/research/2026-07-18-irnr-capital-inmobiliario-primary-sources.md
git commit -m "docs(knowledge): add irnr rental income primary source dossier"
```

---

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/irnr-rendimientos-capital-inmobiliario.json`
- Read before editing:
  - `examples/modelo-210-imputacion-rentas.json`
  - `examples/irnr-rendimientos-trabajo.json`
  - `examples/convenios-doble-imposicion-cdi.json`

- [ ] **Step 1: Copy the structure of the closest certified object**

Use `examples/irnr-rendimientos-trabajo.json` as the nearest structural template:

```bash
cp examples/irnr-rendimientos-trabajo.json \
  examples/irnr-rendimientos-capital-inmobiliario.json
```

Expected: a new canonical object exists with the same contract-compliant top-level shape.

- [ ] **Step 2: Replace identity and governance metadata**

Set fields equivalent to:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_irnr_rendimientos_capital_inmobiliario_001",
    "stableKey": "irnr-rendimientos-capital-inmobiliario",
    "title": "IRNR - Rendimientos del Capital Inmobiliario",
    "slug": "irnr-rendimientos-capital-inmobiliario"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0"
  }
}
```

- [ ] **Step 3: Set classification, affected models, and affected forms**

Use an `IRNR` real-estate income profile:

```json
{
  "classification": {
    "domain": "fiscal",
    "topic": "irnr",
    "subtopic": "rendimientos-capital-inmobiliario",
    "audience": "advisor"
  },
  "affectedTaxModels": [
    { "modelCode": "210", "relationType": "primary" }
  ],
  "affectedForms": [
    { "formCode": "210", "relationType": "required" }
  ]
}
```

- [ ] **Step 4: Write the executive summary with the approved scope**

The summary must explicitly cover:

```text
- when a non-resident is taxed in Spain on rental or accessory real-estate income;
- what income remains capital inmobiliario and what falls outside the object;
- how `UE/EEE` and third-State treatment may diverge for deductibility;
- when a `CDI` matters;
- why this object reaches only minimum operational compliance.
```

- [ ] **Step 5: Write the legal basis block**

Ensure the block addresses:

```text
- nature of capital inmobiliario income in `IRNR`;
- Spanish territorial sourcing for real-estate income;
- hierarchy between internal law and `CDI`;
- auxiliary use of `IRPF` concepts where required;
- legal frame for deductibility when applicable.
```

- [ ] **Step 6: Write the technical development block around the approved decision chain**

The block must include these sections in order:

```text
1. non-resident status
2. property located in Spain
3. income obtained from the property
4. capital inmobiliario vs economic activity
5. territorial sourcing
6. Spanish taxing right under internal law
7. `CDI` review
8. `UE/EEE` vs third-State deductibility
9. co-ownership
10. minimum operational compliance
```

It must explicitly include the approved logic:

```text
- internal law first;
- `CDI` second;
- compliance consequences last.
```

- [ ] **Step 7: Add the Decision Gateway inside the technical content**

Embed this exact gateway in the block narrative:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe un inmueble situado en Espana?
        ↓
Se obtienen rendimientos del inmueble?
        ↓
El rendimiento sigue siendo capital inmobiliario y no actividad economica?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva la potestad tributaria?
        ↓
Existe derecho a deducir gastos?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

- [ ] **Step 8: Write the procedure, checklist, FAQ, risk, documentation, cases, references, and relations**

The object must include, at minimum:

```text
- ProcedureBlock with the 10-step operational sequence from the approved spec
- ChecklistBlock split into Obligatorio and Recomendable
- FaqBlock covering deductibility, `UE/EEE`, `CDI`, `Modelo 210`, and co-ownership
- RiskBlock with cumplimiento, documental, interpretativo, internacional, procedimental
- RequiredDocumentBlock split into Obligatorios and Recomendables
- Evidence Matrix with document, finalidad, fuerza probatoria, momento de uso
- CaseStudyBlock with five approved cases
- Relations:
  Consumes Doctrine From:
  - Residencia Fiscal
  - Convenios para Evitar la Doble Imposicion
  - Modelo 210
```

- [ ] **Step 9: Run schema-level smoke validation via visual inspection**

Run:

```bash
sed -n '1,260p' examples/irnr-rendimientos-capital-inmobiliario.json
```

Expected: the object is fully populated, with no copied references to work-income doctrine left behind.

- [ ] **Step 10: Commit**

```bash
git add examples/irnr-rendimientos-capital-inmobiliario.json
git commit -m "feat(knowledge): author canonical irnr rental income object"
```

---

### Task 3: Add the story helper module

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-010a.mjs`
- Read before editing:
  - `scripts/lib/knowledge-object-story-kf-008d.mjs`
  - `scripts/lib/knowledge-object-story-kf-005b.mjs`

- [ ] **Step 1: Copy the closest helper skeleton**

Use the `008D` helper as a template:

```bash
cp scripts/lib/knowledge-object-story-kf-008d.mjs \
  scripts/lib/knowledge-object-story-kf-010a.mjs
```

Expected: the new helper exposes the same kinds of exports as the existing stories.

- [ ] **Step 2: Repoint paths and derived artifact names**

Update constants to the new object and derived files:

```js
const objectPath = path.join(rootDir, "examples", "irnr-rendimientos-capital-inmobiliario.json");
export const PLANNER_VIEW_PATH = path.join(DERIVED_DIR, "irnr-rendimientos-capital-inmobiliario-planner-view.json");
```

Repeat for web, AI, checklist, FAQ, client response, validation report, and incident log.

- [ ] **Step 3: Adapt semantic rules to the approved scope**

The semantic validator must enforce at least:

```js
const requiredRelationTargets = [
  ["residencia"],
  ["convenios", "cdi"],
  ["modelo210"],
  ["ganancias"],
  ["irpf"]
];
```

And it must validate that the technical content mentions:

```text
- inmueble situado en Espana
- capital inmobiliario
- actividad economica
- UE/EEE
- terceros Estados
- gastos deducibles
- copropiedad
- Modelo 210
```

- [ ] **Step 4: Keep channel filtering logic unchanged**

Retain the same helper patterns for:

```js
getBlocksForChannel(...)
normalizePlannerBlock(...)
validateSchemaRuntime(...)
```

Expected: the helper reuses the existing contract-governed channel logic, not a new one.

- [ ] **Step 5: Run a quick module sanity check**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node --check scripts/lib/knowledge-object-story-kf-010a.mjs
```

Expected: no syntax errors.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/knowledge-object-story-kf-010a.mjs
git commit -m "feat(knowledge): add irnr rental income story helper"
```

---

### Task 4: Add builder and validator entrypoints

**Files:**
- Create: `scripts/build-story-kf-010a-artifacts.mjs`
- Create: `scripts/validate-story-kf-010a.mjs`
- Modify: `package.json`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Copy the builder and validator entrypoints from 008D**

```bash
cp scripts/build-story-kf-008d-artifacts.mjs \
  scripts/build-story-kf-010a-artifacts.mjs
cp scripts/validate-story-kf-008d.mjs \
  scripts/validate-story-kf-010a.mjs
```

Expected: the new scripts exist and only need story-specific rewiring.

- [ ] **Step 2: Rewire imports to the 010A helper**

Update both files so they import from:

```js
import {
  ...
} from "./lib/knowledge-object-story-kf-010a.mjs";
```

- [ ] **Step 3: Add package scripts**

Add these commands to `package.json`:

```json
{
  "build:story-kf-010a": "node scripts/build-story-kf-010a-artifacts.mjs",
  "validate:story-kf-010a": "node scripts/validate-story-kf-010a.mjs"
}
```

- [ ] **Step 4: Add the story to the global check path**

Append to `scripts/check.mjs`:

```js
run("validate:story-kf-010a", ["scripts/validate-story-kf-010a.mjs"]);
```

And include its focused test file in the test run list:

```js
"tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs",
```

- [ ] **Step 5: Run the story validator**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node scripts/validate-story-kf-010a.mjs
```

Expected: either a full PASS report or precise semantic failures to fix next.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-story-kf-010a-artifacts.mjs scripts/validate-story-kf-010a.mjs package.json scripts/check.mjs
git commit -m "feat(knowledge): wire irnr rental income build and validation"
```

---

### Task 5: Add focused automated tests

**Files:**
- Create: `tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs`
- Read before editing:
  - `tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs`
  - `tests/modelo-210-story-kf-004a.test.mjs`

- [ ] **Step 1: Copy the nearest focused test structure**

```bash
cp tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs \
  tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs
```

Expected: the new test file contains the same harness shape as `008D`.

- [ ] **Step 2: Replace story assertions with 010A-specific expectations**

Cover, at minimum:

```js
test("el Knowledge Object de IRNR sobre capital inmobiliario valida contra el schema publicado", ...)
test("el objeto cumple las reglas semanticas de STORY-KF-010A", ...)
test("la vista de Planner mantiene el contenido operativo permitido", ...)
test("la vista web expone FAQ, documentacion y casos publicos sin riesgos internos", ...)
test("el contexto IA incluye criterio, procedimiento, riesgos y restricciones", ...)
test("las derivaciones de checklist, FAQ y client response se generan sin duplicar contenido bruto", ...)
test("el objeto distingue UE/EEE, terceros Estados y copropiedad", ...)
test("las derivaciones auxiliares respetan politicas de canal y estado", ...)
test("el informe de validacion queda certificado completamente en PASS", ...)
test("los ficheros generados quedan sincronizados con la derivacion actual", ...)
```

- [ ] **Step 3: Run the focused story test**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node --test tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs
```

Expected: PASS after the helper and object are correct.

- [ ] **Step 4: Commit**

```bash
git add tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs
git commit -m "test(knowledge): add irnr rental income focused coverage"
```

---

### Task 6: Generate artifacts and write human-readable docs

**Files:**
- Create: `docs/2026-07-18-story-kf-010a-validation-report.md`
- Create: `docs/2026-07-18-story-kf-010a-pr-draft.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Generate the derived artifacts**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node scripts/build-story-kf-010a-artifacts.mjs
```

Expected: the eight derived files appear under `examples/derived/`.

- [ ] **Step 2: Write the validation report**

Create `docs/2026-07-18-story-kf-010a-validation-report.md` with this structure:

```md
# STORY-KF-010A Validation Report

- Schema Validation: PASS / FAIL
- Rule Engine: PASS / FAIL
- Planner View: PASS / FAIL
- Web View: PASS / FAIL
- AI Context: PASS / FAIL
- Checklist: PASS / FAIL
- FAQ: PASS / FAIL
- Client Response: PASS / FAIL
- Structural Changes Required: NO
```

- [ ] **Step 3: Write the PR draft**

Create `docs/2026-07-18-story-kf-010a-pr-draft.md` with sections:

```md
## Summary
## Included
## Validation
## Architecture
## Certification
```

- [ ] **Step 4: Update the public package docs**

Add to `README.md` and `CHANGELOG.md` references to:

```text
- IRNR - Rendimientos del Capital Inmobiliario
- build:story-kf-010a
- validate:story-kf-010a
- focused automated coverage
```

- [ ] **Step 5: Commit**

```bash
git add docs/2026-07-18-story-kf-010a-validation-report.md docs/2026-07-18-story-kf-010a-pr-draft.md README.md CHANGELOG.md examples/derived
git commit -m "docs(knowledge): document irnr rental income validation"
```

---

### Task 7: Run the full story gate and final package verification

**Files:**
- Verify: all files touched in Tasks 1-6

- [ ] **Step 1: Run the focused story validator**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node scripts/validate-story-kf-010a.mjs
```

Expected: PASS with no incidents.

- [ ] **Step 2: Run the focused story test**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node --test tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs
```

Expected: PASS.

- [ ] **Step 3: Run the package-wide check**

Run:

```bash
PATH='/Users/alejandro.perez/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin':"$PATH" \
node scripts/check.mjs
```

Expected: PASS, including the new story.

- [ ] **Step 4: Run diff hygiene**

Run:

```bash
git diff --check
```

Expected: no whitespace or patch-format errors.

- [ ] **Step 5: Final commit if needed**

```bash
git status --short
```

Expected: clean working tree. If not clean, commit the final fixes:

```bash
git add .
git commit -m "chore(knowledge): finalize irnr rental income object"
```

---

## Self-Review

### Spec coverage

The plan covers:

- primary-source research;
- canonical Knowledge Object authoring;
- `Decision Gateway`;
- `UE/EEE` vs third-State deductibility;
- co-ownership with minimum operational implications;
- minimum compliance linked to `Modelo 210`;
- all required derivations;
- focused validation and package-wide checks.

### Placeholder scan

No `TODO`, `TBD`, or deferred implementation markers are left in the plan. Every task names exact files and exact commands.

### Type consistency

The plan keeps one consistent object naming line:

- story: `STORY-KF-010A`
- object key: `irnr-rendimientos-capital-inmobiliario`
- helper: `knowledge-object-story-kf-010a.mjs`
- test: `irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs`

## Execution Handoff

Plan complete and saved to `docs/2026-07-18-story-kf-010a-irnr-capital-inmobiliario-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
