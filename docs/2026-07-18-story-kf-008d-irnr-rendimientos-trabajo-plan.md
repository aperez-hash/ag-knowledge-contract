# IRNR Rendimientos del Trabajo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `IRNR - Rendimientos del Trabajo` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers, or architecture.

**Architecture:** Reuse the certified Knowledge Factory production pattern already used by `Modelo 151`, `CDI`, `Residencia Fiscal`, `Modelo 714`, `Modelo 720`, and `Modelo 721`: one canonical JSON object, one story-specific helper module, one artifact builder, one validator, one focused test file, and one validation report. The object remains material-operational, focused on telework and hybrid cross-border work, with retentions inside the operational core but without expanding into a full `Modelo 210` procedural manual.

**Tech Stack:** Canonical JSON documents, Node.js ESM scripts, built-in `node:test`, existing package scripts in `package.json`, and the published contract `@ag/knowledge-contract@1.0.0`.

---

## File Structure

### New files to create

- `docs/research/2026-07-18-irnr-rendimientos-trabajo-primary-sources.md`
  - Primary-source research dossier for IRNR work income.
- `examples/irnr-rendimientos-trabajo.json`
  - Canonical Knowledge Object for the story.
- `scripts/lib/knowledge-object-story-kf-008d.mjs`
  - Story-specific loader, semantic validator, and derived-view builder.
- `scripts/build-story-kf-008d-artifacts.mjs`
  - Artifact generator for Planner, Web, AI, Checklist, FAQ, Client Response, validation report, and incident log.
- `scripts/validate-story-kf-008d.mjs`
  - Consolidated validation entrypoint for the story.
- `tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs`
  - Focused automated coverage for the object and all derived outputs.
- `docs/2026-07-18-story-kf-008d-validation-report.md`
  - Human-readable validation summary.
- `docs/2026-07-18-story-kf-008d-pr-draft.md`
  - Draft PR body text for publication.

### Existing files to modify

- `README.md`
  - Add the new object, scripts, tests, and usage notes.
- `CHANGELOG.md`
  - Record `STORY-KF-008D` and `IRNR - Rendimientos del Trabajo`.
- `package.json`
  - Add story-specific scripts and export entry if needed.
- `scripts/check.mjs`
  - Include story validator and focused tests in the package-wide check path.

### Derived files expected from the builder

- `examples/derived/irnr-rendimientos-trabajo-planner-view.json`
- `examples/derived/irnr-rendimientos-trabajo-web-view.json`
- `examples/derived/irnr-rendimientos-trabajo-ai-context.json`
- `examples/derived/irnr-rendimientos-trabajo-checklist.json`
- `examples/derived/irnr-rendimientos-trabajo-faq.json`
- `examples/derived/irnr-rendimientos-trabajo-client-response.json`
- `examples/derived/irnr-rendimientos-trabajo-validation-report.json`
- `examples/derived/irnr-rendimientos-trabajo-incident-log.json`

---

### Task 1: Create the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-irnr-rendimientos-trabajo-primary-sources.md`

- [ ] **Step 1: Write the research dossier structure**

```md
# IRNR - Rendimientos del Trabajo

Fecha: 2026-07-18
Estado: dossier primario para STORY-KF-008D

## Fuentes normativas principales

## Fuentes AEAT

## Doctrina administrativa relevante

## Jurisprudencia con impacto operativo

## Criterios de uso para el objeto
```

- [ ] **Step 2: Populate the mandatory primary sources**

Include, at minimum:

```md
- Texto Refundido de la Ley del Impuesto sobre la Renta de no Residentes.
- Reglamento del Impuesto sobre la Renta de no Residentes.
- Ley General Tributaria.
- Ley del IRPF, solo cuando sea necesaria para conceptos comunes.
- AEAT: Modelo 210 e instrucciones oficiales.
- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Modelo OCDE como referencia interpretativa general.
```

- [ ] **Step 3: Add doctrine and jurisprudence screening criteria**

```md
## Criterios de seleccion

- Solo consultas vinculantes con impacto operativo real.
- Solo criterios administrativos consolidados.
- Solo jurisprudencia que altere o confirme de forma util la localizacion
  de la renta, la potestad tributaria o el encuadre practico del caso.
- No usar resenas secundarias como fuente principal del criterio.
```

- [ ] **Step 4: Run a quick content sanity check**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-irnr-rendimientos-trabajo-primary-sources.md
```

Expected: the dossier lists the legal, AEAT, doctrine, and jurisprudence sections without placeholders.

- [ ] **Step 5: Commit**

```bash
git add docs/research/2026-07-18-irnr-rendimientos-trabajo-primary-sources.md
git commit -m "docs(knowledge): add irnr work income primary source dossier"
```

---

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/irnr-rendimientos-trabajo.json`
- Read before editing:
  - `examples/modelo-151-regimen-trabajadores-desplazados.json`
  - `examples/convenios-doble-imposicion-cdi.json`
  - `examples/residencia-fiscal-espana.json`

- [ ] **Step 1: Copy the structure of an existing certified object**

Use `examples/modelo-151-regimen-trabajadores-desplazados.json` as the closest structural template:

```bash
cp examples/modelo-151-regimen-trabajadores-desplazados.json \
  examples/irnr-rendimientos-trabajo.json
```

Expected: a new canonical object exists with the same contract-compliant top-level shape.

- [ ] **Step 2: Replace identity and governance metadata**

Set fields to values equivalent to:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_irnr_rendimientos_trabajo_es_001",
    "stableKey": "irnr-rendimientos-trabajo",
    "title": "IRNR - Rendimientos del Trabajo",
    "slug": "irnr-rendimientos-trabajo"
  }
}
```

And keep governance compatible with the contract, using:

```json
{
  "governance": {
    "status": "validado",
    "version": "1.0.0"
  }
}
```

- [ ] **Step 3: Set classification, affected models, and affected forms**

Use a materially international tax profile centered on work income:

```json
{
  "affectedTaxModels": ["210"],
  "affectedForms": ["modelo_210"]
}
```

And reflect in classification that this is a material-operational international tax object.

- [ ] **Step 4: Write the executive summary with the approved scope**

The summary must explicitly cover:

```text
- when a non-resident may be taxed in Spain for work income;
- why residence is analyzed first;
- when a CDI matters;
- why territorial sourcing, retentions, and minimum formal duties matter;
- that this object does not replace the full Modelo 210 procedural object.
```

- [ ] **Step 5: Write the legal basis block**

Ensure the block addresses:

```text
- nature of IRNR on work income;
- sourcing rule for Spanish territory;
- hierarchy between internal law and CDI;
- auxiliary role of IRPF for shared concepts;
- connection to retentions and formal compliance.
```

- [ ] **Step 6: Write the technical development block around the decision chain**

The block must include these sections in order:

```text
1. non-resident status
2. work income concept
3. territorial sourcing
4. work fully performed in Spain
5. work partially performed in Spain
6. international telework and hybrid models
7. Spanish vs foreign employer
8. CDI and taxing rights
9. retentions
10. minimum operational obligations and frequent errors
```

It must explicitly include the approved logic:

```text
- internal law first;
- CDI second;
- retentions and formal duties last.
```

- [ ] **Step 7: Add the Decision Gateway inside the technical content**

Embed this exact gateway in the block narrative:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe rendimiento del trabajo?
        ↓
Se considera obtenido en Espana?
        ↓
Hay trabajo total, parcial o remoto con conexion espanola relevante?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva potestad tributaria?
        ↓
Existe obligacion de retener o declarar?
        ↓
Tributacion IRNR por rendimientos del trabajo
```

- [ ] **Step 8: Write the procedure block**

The procedure steps must include all of these:

```text
1. Determinar residencia fiscal.
2. Identificar el rendimiento.
3. Localizar la renta.
4. Verificar la normativa interna.
5. Analizar el CDI aplicable.
6. Determinar la potestad tributaria.
7. Calcular la tributacion cuando proceda.
8. Verificar obligaciones formales.
9. Presentar declaracion si corresponde.
10. Archivar evidencias.
```

- [ ] **Step 9: Write checklist, FAQ, risk, required documentation, and evidence matrix**

Requirements:

```text
- checklist split into obligatorio / recomendable;
- FAQ must include temporary work in Spain, telework from Spain for a foreign employer, CDI limitation, Modelo 210 obligation, and who must retain;
- risks must include residence, sourcing, CDI misuse, improper retentions, and omitted formal duties;
- required documents must include contract, residence certificate, travel evidence, payroll, retention certificate, and employer documentation;
- evidence matrix must classify purpose, evidentiary strength, and time of use.
```

- [ ] **Step 10: Write the case studies**

Add at least these five cases:

```text
1. Trabajador desplazado temporalmente a Espana.
2. Teletrabajador internacional.
3. Trabajador de empresa extranjera con actividad parcial en Espana.
4. Aplicacion de un CDI que limita la tributacion espanola.
5. Error de residencia con consecuencias en IRNR.
```

Each case must end with an explicit line explaining why Spain does or does not retain taxing rights.

- [ ] **Step 11: Set relations**

Add direct relations to:

```text
- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
- Modelo 151
- IRPF (future)
- Establecimiento Permanente (future)
```

And include rationale entries equivalent to:

```text
Consumes Doctrine From:
- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
```

Also ensure relations support its future provider role to:

```text
- IRNR (otras categorias de renta)
- IRPF Internacional
- fiscalidad del teletrabajo internacional
- fiscalidad de trabajadores desplazados
```

- [ ] **Step 12: Run a JSON parse check**

Run:

```bash
node -e "JSON.parse(require('fs').readFileSync('examples/irnr-rendimientos-trabajo.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 13: Commit**

```bash
git add examples/irnr-rendimientos-trabajo.json
git commit -m "feat(knowledge): author canonical irnr work income object"
```

---

### Task 3: Create the story helper and validator

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-008d.mjs`
- Create: `scripts/validate-story-kf-008d.mjs`
- Read before editing:
  - `scripts/lib/knowledge-object-story-kf-008c.mjs`
  - `scripts/validate-story-kf-008c.mjs`

- [ ] **Step 1: Copy the `008C` helper as the base**

```bash
cp scripts/lib/knowledge-object-story-kf-008c.mjs \
  scripts/lib/knowledge-object-story-kf-008d.mjs
cp scripts/validate-story-kf-008c.mjs \
  scripts/validate-story-kf-008d.mjs
```

Expected: the new story files exist and mirror the validated architecture.

- [ ] **Step 2: Update file paths and story identifiers**

Replace all `008c` and `modelo-151-*` constants with `008d` and `irnr-rendimientos-trabajo-*`.

The helper must point to:

```js
const KNOWLEDGE_OBJECT_PATH = new URL("../../examples/irnr-rendimientos-trabajo.json", import.meta.url);
```

And all derived file paths must follow:

```text
examples/derived/irnr-rendimientos-trabajo-<artifact>.json
```

- [ ] **Step 3: Replace story-specific semantic rules**

The semantic validator must enforce, at minimum:

```text
- object title is "IRNR - Rendimientos del Trabajo";
- affectedTaxModels includes "210";
- Decision Gateway is present;
- technical development includes teletrabajo or remoto;
- technical development includes retenciones;
- technical development includes CDI;
- procedure includes formal duties and evidence archiving;
- required documentation includes residence certificate and employer documentation;
- relations include Residencia Fiscal, CDI, and Modelo 210;
- client_response stays in derived_only mode.
```

- [ ] **Step 4: Keep all channel-policy guard logic intact**

Do not redesign the existing helper. Preserve:

```text
- root obsolete exclusion;
- root blocked exclusion;
- block blocked exclusion;
- derived_only protection;
- internal_reference exclusion for Planner/Web;
- restricted exclusion rules.
```

- [ ] **Step 5: Run the validator script directly**

Run:

```bash
node scripts/validate-story-kf-008d.mjs
```

Expected: JSON output with story `STORY-KF-008D` and all sections in `PASS`.

- [ ] **Step 6: Commit**

```bash
git add \
  scripts/lib/knowledge-object-story-kf-008d.mjs \
  scripts/validate-story-kf-008d.mjs
git commit -m "feat(knowledge): add irnr work income story validator"
```

---

### Task 4: Build derived artifacts and validation reports

**Files:**
- Create: `scripts/build-story-kf-008d-artifacts.mjs`
- Create:
  - `examples/derived/irnr-rendimientos-trabajo-planner-view.json`
  - `examples/derived/irnr-rendimientos-trabajo-web-view.json`
  - `examples/derived/irnr-rendimientos-trabajo-ai-context.json`
  - `examples/derived/irnr-rendimientos-trabajo-checklist.json`
  - `examples/derived/irnr-rendimientos-trabajo-faq.json`
  - `examples/derived/irnr-rendimientos-trabajo-client-response.json`
  - `examples/derived/irnr-rendimientos-trabajo-validation-report.json`
  - `examples/derived/irnr-rendimientos-trabajo-incident-log.json`
- Create: `docs/2026-07-18-story-kf-008d-validation-report.md`
- Create: `docs/2026-07-18-story-kf-008d-pr-draft.md`
- Read before editing:
  - `scripts/build-story-kf-008c-artifacts.mjs`
  - `docs/2026-07-18-story-kf-008c-validation-report.md`
  - `docs/2026-07-18-story-kf-008c-pr-draft.md`

- [ ] **Step 1: Copy the existing artifact builder**

```bash
cp scripts/build-story-kf-008c-artifacts.mjs \
  scripts/build-story-kf-008d-artifacts.mjs
```

Expected: the new builder exists with the same output pattern.

- [ ] **Step 2: Update the builder to use the `008D` helper**

Change the import to:

```js
import { buildStoryArtifacts } from "./lib/knowledge-object-story-kf-008d.mjs";
```

And ensure all written file names use the `irnr-rendimientos-trabajo-*` prefix.

- [ ] **Step 3: Run the artifact builder**

Run:

```bash
node scripts/build-story-kf-008d-artifacts.mjs
```

Expected: the builder writes all eight derived JSON files with zero incident count.

- [ ] **Step 4: Write the human-readable validation report**

The report must include:

```md
# STORY-KF-008D Validation Report

- Schema Validation: PASS
- Rule Engine: PASS
- Planner View: PASS
- Web View: PASS
- AI Context: PASS
- Checklist: PASS
- FAQ: PASS
- Client Response: PASS
- Structural Changes Required: NO
```

Also include a short note explaining:

```text
- material-operational focus;
- telework/hybrid priority;
- retentions inside the operational core;
- no contract or architecture changes.
```

- [ ] **Step 5: Write the PR draft**

The PR draft must include:

```md
## Summary

Authors the canonical Knowledge Object for:

**IRNR - Rendimientos del Trabajo**
```

And explicitly state:

```text
- uses the published contract unchanged;
- consumes Residencia Fiscal, CDI, and Modelo 210 doctrine;
- focuses on telework and hybrid cross-border work;
- includes retentions and minimum formal duties without turning into a Modelo 210 manual.
```

- [ ] **Step 6: Commit**

```bash
git add \
  scripts/build-story-kf-008d-artifacts.mjs \
  examples/derived/irnr-rendimientos-trabajo-*.json \
  docs/2026-07-18-story-kf-008d-validation-report.md \
  docs/2026-07-18-story-kf-008d-pr-draft.md
git commit -m "docs(knowledge): add irnr work income derived artifacts"
```

---

### Task 5: Add focused automated coverage

**Files:**
- Create: `tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs`
- Read before editing:
  - `tests/modelo-151-story-kf-008c.test.mjs`

- [ ] **Step 1: Copy the `008C` focused test file**

```bash
cp tests/modelo-151-story-kf-008c.test.mjs \
  tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs
```

Expected: the new test file exists with the same base structure.

- [ ] **Step 2: Replace imports and fixture names**

Update the test file to import from:

```js
../scripts/lib/knowledge-object-story-kf-008d.mjs
```

And read derived files with the `irnr-rendimientos-trabajo-*` prefix.

- [ ] **Step 3: Replace assertions with story-specific checks**

The focused test suite must cover:

```text
1. schema validation passes;
2. semantic validation passes;
3. Planner view includes procedure, checklist, documentation, and risks;
4. Web view excludes internal references and internal risks;
5. AI context includes telework, CDI, retentions, and taxing-rights logic;
6. client response remains derived_only and human-review gated;
7. Decision Gateway is present;
8. relations consume Residencia Fiscal, CDI, and Modelo 210;
9. case studies are five and end with taxing-rights rationale;
10. generated files match the helper output.
```

- [ ] **Step 4: Run the focused test file**

Run:

```bash
node --test tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs
```

Expected: all focused tests pass with zero failures.

- [ ] **Step 5: Commit**

```bash
git add tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs
git commit -m "test(knowledge): cover irnr work income object"
```

---

### Task 6: Integrate the story into package scripts and docs

**Files:**
- Modify: `package.json`
- Modify: `scripts/check.mjs`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Add package scripts**

Add the following entries to `package.json`:

```json
{
  "scripts": {
    "build:story-kf-008d": "node scripts/build-story-kf-008d-artifacts.mjs",
    "validate:story-kf-008d": "node scripts/validate-story-kf-008d.mjs"
  }
}
```

- [ ] **Step 2: Add the object export if package exports enumerate examples**

If `package.json` currently exports canonical examples explicitly, add:

```json
"./examples/irnr-rendimientos-trabajo.json": "./examples/irnr-rendimientos-trabajo.json"
```

- [ ] **Step 3: Extend the package-wide check**

In `scripts/check.mjs`, add:

```text
- validate:story-kf-008d
- tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs
```

Keep the existing order and style used by the previous story integrations.

- [ ] **Step 4: Update the README**

Add:

```text
- the new canonical object;
- the new build and validate commands;
- the fact that IRNR work income is the first material international tax object in cycle 2;
- the telework/hybrid and retentions focus.
```

- [ ] **Step 5: Update the CHANGELOG**

Add an entry that records:

```text
- new object: IRNR - Rendimientos del Trabajo;
- new derived artifacts;
- new validator and focused tests;
- no structural contract changes.
```

- [ ] **Step 6: Run a docs diff sanity check**

Run:

```bash
git diff -- README.md CHANGELOG.md package.json scripts/check.mjs
```

Expected: only `008D`-specific integration changes are present.

- [ ] **Step 7: Commit**

```bash
git add README.md CHANGELOG.md package.json scripts/check.mjs
git commit -m "chore(knowledge): integrate irnr work income story"
```

---

### Task 7: Run the full validation gate

**Files:**
- Verify:
  - `examples/irnr-rendimientos-trabajo.json`
  - `scripts/lib/knowledge-object-story-kf-008d.mjs`
  - `scripts/build-story-kf-008d-artifacts.mjs`
  - `scripts/validate-story-kf-008d.mjs`
  - `tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs`
  - `README.md`
  - `CHANGELOG.md`
  - `package.json`
  - `scripts/check.mjs`

- [ ] **Step 1: Run story validation**

Run:

```bash
npm run validate:story-kf-008d
```

Expected: full story report with all sections in `PASS`.

- [ ] **Step 2: Run derived artifact generation**

Run:

```bash
npm run build:story-kf-008d
```

Expected: all derived files regenerate cleanly with zero incidents.

- [ ] **Step 3: Run focused tests**

Run:

```bash
node --test tests/irnr-rendimientos-trabajo-story-kf-008d.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 4: Run the package-wide check**

Run:

```bash
node scripts/check.mjs
```

Expected: full package check passes, including all prior certified stories plus `008D`.

- [ ] **Step 5: Run git diff hygiene check**

Run:

```bash
git diff --check
```

Expected: no whitespace, newline, or patch-format issues.

- [ ] **Step 6: Capture the final implementation status in the validation report**

Ensure `docs/2026-07-18-story-kf-008d-validation-report.md` includes the final evidence:

```text
Schema Validation ........... PASS
Rule Engine ................. PASS
Planner View ................ PASS
Web View .................... PASS
AI Context .................. PASS
Checklist ................... PASS
FAQ ......................... PASS
Client Response ............. PASS
Structural Changes ......... NO
```

- [ ] **Step 7: Commit**

```bash
git add \
  docs/2026-07-18-story-kf-008d-validation-report.md \
  docs/2026-07-18-story-kf-008d-pr-draft.md \
  examples/derived/irnr-rendimientos-trabajo-*.json
git commit -m "docs(knowledge): finalize irnr work income validation"
```

---

## Self-Review

- Spec coverage check:
  - contract unchanged: covered in Tasks 2, 3, 6, and 7.
  - telework/hybrid focus: covered in Task 2 and tested in Task 5.
  - retentions inside core: covered in Task 2 and tested in Task 5.
  - dependence on Residencia Fiscal, CDI, and Modelo 210: covered in Tasks 2, 3, and 5.
  - no full Modelo 210 procedural takeover: enforced in Task 2 and reflected in validation docs in Task 4 and Task 7.
- Placeholder scan:
  - no `TBD`, `TODO`, or “similar to previous task” placeholders remain.
- Type and naming consistency:
  - all files use the `story-kf-008d` and `irnr-rendimientos-trabajo` naming pattern consistently.

## Execution Handoff

Plan complete and saved to `docs/2026-07-18-story-kf-008d-irnr-rendimientos-trabajo-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
