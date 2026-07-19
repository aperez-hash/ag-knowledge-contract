# IRNR Ganancias Patrimoniales Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `IRNR - Ganancias Patrimoniales` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers, or architecture.

**Architecture:** Reuse the certified Knowledge Factory production pattern already used by `Residencia Fiscal`, `CDI`, `Modelo 151`, `IRNR - Rendimientos del Trabajo`, `IRNR - Rendimientos del Capital Inmobiliario`, and `IRNR - Dividendos, Intereses y Canones`: one canonical JSON object, one story-specific helper module, one artifact builder, one validator, one focused test file, one validation report, and one PR draft. The object remains material-operational, focused on capital gains under `IRNR`, with doctrinal dependence on `Residencia Fiscal`, `CDI`, and `Modelo 210`, but without becoming a full treaty-by-treaty manual or a full `Modelo 210` procedural guide.

**Tech Stack:** Canonical JSON documents, Node.js ESM scripts, built-in `node:test`, existing package scripts in `package.json`, and the published contract `@ag/knowledge-contract@1.0.0`.

---

## File Structure

### New files to create

- `docs/research/2026-07-18-irnr-ganancias-patrimoniales-primary-sources.md`
  - Primary-source research dossier for `IRNR` capital gains.
- `examples/irnr-ganancias-patrimoniales.json`
  - Canonical Knowledge Object for the story.
- `scripts/lib/knowledge-object-story-kf-010c.mjs`
  - Story-specific loader, semantic validator, and derived-view builder.
- `scripts/build-story-kf-010c-artifacts.mjs`
  - Artifact generator for Planner, Web, AI, Checklist, FAQ, Client Response, validation report, and incident log.
- `scripts/validate-story-kf-010c.mjs`
  - Consolidated validation entrypoint for the story.
- `tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs`
  - Focused automated coverage for the object and all derived outputs.
- `docs/2026-07-18-story-kf-010c-validation-report.md`
  - Human-readable validation summary.
- `docs/2026-07-18-story-kf-010c-pr-draft.md`
  - Draft PR body text for publication.

### Existing files to modify

- `README.md`
  - Add the new object, scripts, tests, and usage notes.
- `CHANGELOG.md`
  - Record `STORY-KF-010C` and `IRNR - Ganancias Patrimoniales`.
- `package.json`
  - Add story-specific scripts and export entry if needed.
- `scripts/check.mjs`
  - Include story validator and focused tests in the package-wide check path.

### Derived files expected from the builder

- `examples/derived/irnr-ganancias-patrimoniales-planner-view.json`
- `examples/derived/irnr-ganancias-patrimoniales-web-view.json`
- `examples/derived/irnr-ganancias-patrimoniales-ai-context.json`
- `examples/derived/irnr-ganancias-patrimoniales-checklist.json`
- `examples/derived/irnr-ganancias-patrimoniales-faq.json`
- `examples/derived/irnr-ganancias-patrimoniales-client-response.json`
- `examples/derived/irnr-ganancias-patrimoniales-validation-report.json`
- `examples/derived/irnr-ganancias-patrimoniales-incident-log.json`

---

### Task 1: Create the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-irnr-ganancias-patrimoniales-primary-sources.md`

- [ ] **Step 1: Write the research dossier structure**

```md
# IRNR - Ganancias Patrimoniales

Fecha: 2026-07-18
Estado: dossier primario para STORY-KF-010C

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
- Ley del IRPF solo cuando ayude a interpretar conceptos comunes de ganancia.
- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Modelo OCDE y Comentarios como referencia interpretativa general.
- AEAT: Modelo 210, instrucciones oficiales y ayuda tecnica sobre ganancias patrimoniales de no residentes.
```

- [ ] **Step 3: Add doctrine and jurisprudence screening criteria**

```md
## Criterios de seleccion

- Solo consultas vinculantes con impacto operativo real sobre localizacion de la ganancia,
  `CDI`, retencion, exencion, no sujecion o declaracion.
- Solo criterios administrativos consolidados.
- Solo jurisprudencia con efecto practico sobre transmisiones patrimoniales de no residentes.
- No usar resenas secundarias como fuente principal del criterio.
```

- [ ] **Step 4: Run a quick content sanity check**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-irnr-ganancias-patrimoniales-primary-sources.md
```

Expected: the dossier lists legal, AEAT, doctrine, and jurisprudence sections without placeholders.

- [ ] **Step 5: Commit**

```bash
git add docs/research/2026-07-18-irnr-ganancias-patrimoniales-primary-sources.md
git commit -m "docs(knowledge): add irnr capital gains primary source dossier"
```

---

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/irnr-ganancias-patrimoniales.json`
- Read before editing:
  - `examples/irnr-rendimientos-capital-inmobiliario.json`
  - `examples/irnr-dividendos-intereses-canones.json`
  - `examples/modelo-210-imputacion-rentas.json`

- [ ] **Step 1: Copy the structure of the closest certified object**

Use `examples/irnr-rendimientos-capital-inmobiliario.json` as the nearest structural template:

```bash
cp examples/irnr-rendimientos-capital-inmobiliario.json \
  examples/irnr-ganancias-patrimoniales.json
```

Expected: a new canonical object exists with the same contract-compliant top-level shape.

- [ ] **Step 2: Replace identity and governance metadata**

Set fields equivalent to:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_irnr_ganancias_patrimoniales_001",
    "stableKey": "irnr-ganancias-patrimoniales",
    "title": "IRNR - Ganancias Patrimoniales",
    "slug": "irnr-ganancias-patrimoniales"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0"
  }
}
```

- [ ] **Step 3: Set classification, affected models, and affected forms**

Use an `IRNR` capital-gains profile:

```json
{
  "classification": {
    "domain": "fiscal",
    "topic": "irnr",
    "subtopic": "ganancias-patrimoniales",
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
- when capital gains of non-residents are taxed in Spain;
- which assets matter operationally;
- the role of `CDI`;
- the practical significance of the 3% withholding in Spanish real-estate transfers;
- that this object does not replace a full `Modelo 210` procedural manual.
```

- [ ] **Step 5: Write the legal basis block**

Ensure the block addresses:

```text
- capital gains under `IRNR`;
- Spanish-source analysis under internal law;
- distinction between no sujecion and exencion;
- hierarchy between internal law and `CDI`;
- connection to withholding and minimum compliance.
```

- [ ] **Step 6: Write the technical development block around the approved structure**

The block must include these sections in order:

```text
1. inmuebles situados en Espana
2. acciones y participaciones
3. otros activos patrimoniales
4. no sujeciones relevantes
5. exenciones relevantes
6. `CDI`
7. retencion del 3%
8. cumplimiento operativo minimo
```

It must explicitly include:

```text
- bifurcacion por tipo de activo;
- separacion conceptual entre no sujecion y exencion;
- copropiedad como regla transversal;
- alerta de escalado para casuistica societaria fina.
```

- [ ] **Step 7: Add the Decision Gateway inside the technical content**

Embed this exact gateway in the block narrative:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe una transmision patrimonial?
        ↓
Existe una ganancia patrimonial?
        ↓
El activo tiene conexion con Espana?
        ↓
Que activo se transmite?
  - inmueble en Espana
  - acciones/participaciones
  - otro activo
        ↓
La ganancia se considera obtenida en Espana?
        ↓
Existe no sujecion relevante?
        ↓
Existe exencion relevante?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva la potestad tributaria?
        ↓
Existe obligacion de retener?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

- [ ] **Step 8: Write the procedure block with the approved operational flow**

The procedure must cover:

```text
1. determinar residencia fiscal
2. confirmar que existe transmision y ganancia patrimonial
3. identificar el activo transmitido
4. localizar la ganancia
5. verificar la normativa interna
6. separar no sujecion de exencion
7. analizar el `CDI`
8. determinar la potestad tributaria
9. verificar retenciones cuando procedan
10. determinar obligaciones formales
11. presentar declaracion cuando corresponda
12. archivar evidencias
```

- [ ] **Step 9: Write checklist, FAQ, risk, required documentation, case studies, and internal references**

Ensure, at minimum:

```text
- checklist with obligatory and recommended items;
- at least 5 FAQ entries;
- at least 5 risks across cumplimiento, documental, interpretativo,
  internacional and procedimental;
- evidence matrix inside required documentation;
- at least 5 case studies including inmueble, participaciones, exenta,
  copropiedad, and residencia mal determinada;
- internal references pointing only to real internal artifacts.
```

- [ ] **Step 10: Add doctrinal relations**

Ensure the object points to:

```text
- Residencia Fiscal
- CDI
- Modelo 210
- IRNR - Rendimientos del Trabajo
- IRNR - Rendimientos del Capital Inmobiliario
- IRNR - Dividendos, Intereses y Canones
- Establecimientos Permanentes (futuro)
```

And explicitly includes:

```text
Consumes Doctrine From:
- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
```

- [ ] **Step 11: Validate JSON syntax**

Run:

```bash
jq empty examples/irnr-ganancias-patrimoniales.json
```

Expected: no output and exit code `0`.

- [ ] **Step 12: Commit**

```bash
git add examples/irnr-ganancias-patrimoniales.json
git commit -m "feat(knowledge): author canonical irnr capital gains object"
```

---

### Task 3: Implement the story helper and semantic validator

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-010c.mjs`
- Read before editing:
  - `scripts/lib/knowledge-object-story-kf-010a.mjs`
  - `scripts/lib/knowledge-object-story-kf-010b.mjs`

- [ ] **Step 1: Copy the nearest helper**

```bash
cp scripts/lib/knowledge-object-story-kf-010a.mjs \
  scripts/lib/knowledge-object-story-kf-010c.mjs
```

- [ ] **Step 2: Replace file paths and artifact names**

Update constants to:

```js
const objectPath = path.join(rootDir, "examples", "irnr-ganancias-patrimoniales.json");
export const PLANNER_VIEW_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-planner-view.json");
export const WEB_VIEW_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-web-view.json");
export const AI_CONTEXT_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-ai-context.json");
export const CHECKLIST_VIEW_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-checklist.json");
export const FAQ_VIEW_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-faq.json");
export const CLIENT_RESPONSE_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-client-response.json");
export const VALIDATION_REPORT_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-validation-report.json");
export const INCIDENT_LOG_PATH = path.join(DERIVED_DIR, "irnr-ganancias-patrimoniales-incident-log.json");
const STORY_GENERATED_AT = "2026-07-18T23:59:00Z";
```

- [ ] **Step 3: Replace semantic rules with `010C`-specific checks**

The validator must enforce, at minimum:

```text
- governance status is `validado`;
- executive summary length within the same approved range;
- required block types exist;
- no duplicate block ids, orders, or relation ids;
- `affectedTaxModels` includes `210`;
- FAQ, risk, and case-study minimum counts;
- source-backed blocks include `sourceRefs`;
- relations include residencia, cdi, modelo210, trabajo, capital-inmobiliario, dividendos-intereses-canones;
- technical development mentions inmuebles, acciones/participaciones, no sujecion, exencion, `CDI`, retencion del 3%, `Modelo 210`, and copropiedad;
- required documentation includes certificado de residencia fiscal, valor de adquisicion, valor de transmision, and retencion when applicable;
- root `planner` is `allowed`;
- root `web` and `client_response` remain `derived_only`.
```

- [ ] **Step 4: Keep derived builders aligned with the existing package pattern**

Preserve helper functions and builder responsibilities equivalent to:

```text
- buildPlannerView
- buildWebView
- buildAiContext
- buildChecklistView
- buildFaqView
- buildClientResponse
- buildStoryArtifacts
```

No contract or consumer changes are allowed.

- [ ] **Step 5: Run a syntax check**

Run:

```bash
node --check scripts/lib/knowledge-object-story-kf-010c.mjs
```

Expected: no output and exit code `0`.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/knowledge-object-story-kf-010c.mjs
git commit -m "feat(knowledge): add irnr capital gains story helpers"
```

---

### Task 4: Add build and validation entrypoints

**Files:**
- Create: `scripts/build-story-kf-010c-artifacts.mjs`
- Create: `scripts/validate-story-kf-010c.mjs`

- [ ] **Step 1: Copy the nearest story scripts**

```bash
cp scripts/build-story-kf-010a-artifacts.mjs \
  scripts/build-story-kf-010c-artifacts.mjs
cp scripts/validate-story-kf-010a.mjs \
  scripts/validate-story-kf-010c.mjs
```

- [ ] **Step 2: Replace imports to point to the new helper**

The scripts must import:

```js
from "./lib/knowledge-object-story-kf-010c.mjs"
```

- [ ] **Step 3: Keep validation gates aligned**

The validator must fail if any of these are not `PASS`:

```text
- schemaValidation
- ruleEngine
- plannerView
- webView
- aiContext
- checklist
- faq
- clientResponse
- qualityGate
```

- [ ] **Step 4: Run both entrypoints**

Run:

```bash
node scripts/validate-story-kf-010c.mjs
node scripts/build-story-kf-010c-artifacts.mjs
```

Expected: both commands exit `0`; the builder reports `derivedArtifacts: 8`.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-story-kf-010c-artifacts.mjs scripts/validate-story-kf-010c.mjs
git commit -m "feat(knowledge): add irnr capital gains story scripts"
```

---

### Task 5: Add focused automated tests

**Files:**
- Create: `tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs`
- Read before editing:
  - `tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs`
  - `tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs`

- [ ] **Step 1: Copy the nearest focused test**

```bash
cp tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs \
  tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs
```

- [ ] **Step 2: Replace imports and story labels**

The test file must import from:

```js
../scripts/lib/knowledge-object-story-kf-010c.mjs
```

and assert:

```text
STORY-KF-010C
IRNR - Ganancias Patrimoniales
```

- [ ] **Step 3: Adjust the assertions to the new object**

At minimum, cover:

```text
- schema validation passes;
- story semantic rules pass;
- planner view keeps the operational blocks and excludes `internal_reference`;
- web view exposes FAQ, required documentation, and public cases;
- AI context includes legal basis, procedure, risks, and client-response restrictions;
- client response remains derived only;
- technical block mentions inmueble, participaciones, no sujecion, exencion, CDI, retencion del 3%, and copropiedad;
- required documentation includes residence certificate, acquisition value, transfer value, and retention evidence;
- validation report is fully PASS;
- generated files stay synchronized with the current derivation.
```

- [ ] **Step 4: Run the focused tests**

Run:

```bash
node --test tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs
git commit -m "test(knowledge): cover irnr capital gains object"
```

---

### Task 6: Generate all derived artifacts and documentation

**Files:**
- Create:
  - `examples/derived/irnr-ganancias-patrimoniales-planner-view.json`
  - `examples/derived/irnr-ganancias-patrimoniales-web-view.json`
  - `examples/derived/irnr-ganancias-patrimoniales-ai-context.json`
  - `examples/derived/irnr-ganancias-patrimoniales-checklist.json`
  - `examples/derived/irnr-ganancias-patrimoniales-faq.json`
  - `examples/derived/irnr-ganancias-patrimoniales-client-response.json`
  - `examples/derived/irnr-ganancias-patrimoniales-validation-report.json`
  - `examples/derived/irnr-ganancias-patrimoniales-incident-log.json`
  - `docs/2026-07-18-story-kf-010c-validation-report.md`
  - `docs/2026-07-18-story-kf-010c-pr-draft.md`

- [ ] **Step 1: Build the story artifacts**

Run:

```bash
node scripts/build-story-kf-010c-artifacts.mjs
```

Expected:

```json
{
  "ok": true,
  "derivedArtifacts": 8,
  "incidentCount": 0
}
```

- [ ] **Step 2: Write the human-readable validation report**

Use this structure:

```md
# STORY-KF-010C Validation Report

- Schema Validation: PASS
- Rule Engine: PASS
- Planner View: PASS
- Web View: PASS
- AI Context: PASS
- Checklist: PASS
- FAQ: PASS
- Client Response: PASS
- Quality Gate: PASS
- Structural Changes Required: NO
```

- [ ] **Step 3: Write the PR draft document**

Use this structure:

```md
## Summary

Authors the canonical Knowledge Object for:

**IRNR - Ganancias Patrimoniales**

## Included

- Primary-source research dossier.
- Canonical object.
- Derived artifacts.
- Story-level helper and validation scripts.
- Focused tests.

## Validation

- `validate:story-kf-010c`: PASS
- Focused STORY-KF-010C tests: PASS
- Full package tests: PASS
- `generate-types --check`: PASS
- `git diff --check`: PASS
```

- [ ] **Step 4: Commit**

```bash
git add examples/derived/irnr-ganancias-patrimoniales-*.json \
  docs/2026-07-18-story-kf-010c-validation-report.md \
  docs/2026-07-18-story-kf-010c-pr-draft.md
git commit -m "docs(knowledge): add irnr capital gains validation artifacts"
```

---

### Task 7: Register the story in package metadata and package-wide checks

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `package.json`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Add the object and scripts to `README.md`**

Add entries equivalent to:

```md
- `examples/irnr-ganancias-patrimoniales.json`: sexto Knowledge Object del segundo ciclo, dedicado al IRNR sobre ganancias patrimoniales con foco en localizacion, CDI, retencion del 3% y cumplimiento minimo.
- `scripts/build-story-kf-010c-artifacts.mjs`: generacion reproducible de artefactos derivados de IRNR - Ganancias Patrimoniales.
- `scripts/validate-story-kf-010c.mjs`: validacion consolidada de STORY-KF-010C.
- `tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs`: pruebas del objeto IRNR sobre ganancias patrimoniales y de sus derivaciones.
```

- [ ] **Step 2: Add package scripts and export in `package.json`**

Add:

```json
"./examples/irnr-ganancias-patrimoniales.json": "./examples/irnr-ganancias-patrimoniales.json"
```

and:

```json
"build:story-kf-010c": "node scripts/build-story-kf-010c-artifacts.mjs",
"validate:story-kf-010c": "node scripts/validate-story-kf-010c.mjs"
```

- [ ] **Step 3: Update `scripts/check.mjs`**

Include `STORY-KF-010C` in the same pattern as the existing stories so the package-wide check runs:

```text
- build-story-kf-010c
- validate-story-kf-010c
- focused STORY-KF-010C tests when applicable in the current structure
```

- [ ] **Step 4: Update `CHANGELOG.md`**

Add entries equivalent to:

```md
- Sixth second-cycle Knowledge Object for `IRNR - Ganancias Patrimoniales`.
- Derived checklist, FAQ and client response outputs plus focused automated coverage for `STORY-KF-010C`.
```

- [ ] **Step 5: Run a metadata sanity check**

Run:

```bash
cat package.json
sed -n '1,260p' README.md
sed -n '1,120p' CHANGELOG.md
```

Expected: the new object, scripts, and tests appear exactly once.

- [ ] **Step 6: Commit**

```bash
git add README.md CHANGELOG.md package.json scripts/check.mjs
git commit -m "chore(knowledge): register irnr capital gains story"
```

---

### Task 8: Run the final quality gate and publish the branch

**Files:**
- Modify only if validation reveals real defects:
  - `examples/irnr-ganancias-patrimoniales.json`
  - `scripts/lib/knowledge-object-story-kf-010c.mjs`
  - `tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs`
  - metadata/docs files already touched above

- [ ] **Step 1: Run the story validator**

Run:

```bash
node scripts/validate-story-kf-010c.mjs
```

Expected:

```json
{
  "story": "STORY-KF-010C",
  "schemaValidation": "PASS",
  "ruleEngine": "PASS",
  "plannerView": "PASS",
  "webView": "PASS",
  "aiContext": "PASS",
  "checklist": "PASS",
  "faq": "PASS",
  "clientResponse": "PASS",
  "qualityGate": "PASS",
  "structuralChangesRequired": "NO"
}
```

- [ ] **Step 2: Run the focused tests**

Run:

```bash
node --test tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 3: Run the full package tests**

Run:

```bash
node --test tests/*.test.mjs
```

Expected: all package tests pass.

- [ ] **Step 4: Check schema/type synchronization**

Run:

```bash
node scripts/generate-types.mjs --check
```

Expected:

```text
knowledge-object.generated.ts está sincronizado con el schema
```

- [ ] **Step 5: Run whitespace and patch hygiene**

Run:

```bash
git diff --check
```

Expected: no output.

- [ ] **Step 6: Push the branch**

Run:

```bash
git push -u origin story/kf-010c-irnr-ganancias-patrimoniales
```

Expected: branch published successfully.

- [ ] **Step 7: Open the Draft PR**

Use:

```text
Base: main
Head: story/kf-010c-irnr-ganancias-patrimoniales
Title: feat(knowledge): author canonical irnr capital gains knowledge object
Body: docs/2026-07-18-story-kf-010c-pr-draft.md
```

- [ ] **Step 8: Final commit if validation fixes were required**

If and only if Steps 1-5 required fixes:

```bash
git add <resolved-files>
git commit -m "fix(knowledge): finalize irnr capital gains object"
git push
```

---

## Self-Review

- Spec coverage:
  - the plan covers dossier, canonical object, semantic validator, builders,
    focused tests, derived artifacts, validation report, PR draft, metadata,
    package-wide check integration, final validation, and branch publication;
  - the approved design decisions are reflected explicitly: bifurcation by
    asset type, separation of no sujecion vs exencion, retencion del `3%` as
    a nuclear concept, and copropiedad as a transversal rule.
- Placeholder scan:
  - no `TBD`, `TODO`, or unresolved placeholders remain;
  - each task includes exact file paths, commands, and expected outputs.
- Type consistency:
  - all filenames, helper names, story labels, and derived artifact names use
    the `kf-010c / irnr-ganancias-patrimoniales` pattern consistently.

