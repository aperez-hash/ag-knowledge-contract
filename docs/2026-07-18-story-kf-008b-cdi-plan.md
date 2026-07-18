# STORY-KF-008B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `Convenios para Evitar la Doble Imposicion (CDI)` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers or architecture.

**Architecture:** Reuse the certified Knowledge Factory pipeline already used by `Modelo 714`, `Modelo 721` and `Residencia Fiscal`: one canonical source object, one story-specific validation helper, one derived-artifact builder, one focused test file, and one human-readable validation report. The new object remains doctrinally transversal and stays at the general methodological level, without country-by-country treaty analysis and without category-specific treaty articles.

**Tech Stack:** JSON canonical Knowledge Objects, Node.js scripts, Ajv schema validation, Node test runner, existing derived-artifact helper pattern, Markdown research and validation docs.

---

## File map

- Create: `docs/research/2026-07-18-cdi-primary-sources.md`
  - Primary-source research dossier for CDI doctrine.
- Create: `examples/convenios-doble-imposicion-cdi.json`
  - Canonical source object for the story.
- Create: `scripts/lib/knowledge-object-story-kf-008b.mjs`
  - Story-specific semantic validation and derived-view helpers.
- Create: `scripts/build-story-kf-008b-artifacts.mjs`
  - Builder for Planner, Web, AI, checklist, FAQ and client response artifacts.
- Create: `scripts/validate-story-kf-008b.mjs`
  - Story-level validation entrypoint.
- Create: `tests/cdi-story-kf-008b.test.mjs`
  - Focused automated coverage for the new object.
- Create: `docs/2026-07-18-story-kf-008b-validation-report.md`
  - Human-readable validation report.
- Create: `docs/2026-07-18-story-kf-008b-pr-draft.md`
  - Draft PR body.
- Modify: `docs/2026-07-18-story-kf-008b-cdi-design.md`
  - Final spec alignment only if implementation reveals a real ambiguity.
- Modify: `package.json`
  - Add story-specific build/validate scripts and export for the new example.
- Modify: `scripts/check.mjs`
  - Include the new story validation and focused test in the package check flow.
- Modify: `README.md`
  - Add the new transversal object to the official library inventory.
- Modify: `CHANGELOG.md`
  - Record the new object and validation support.

### Task 1: Build the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-cdi-primary-sources.md`
- Reference: `docs/2026-07-18-story-kf-008b-cdi-design.md`

- [ ] **Step 1: Create the dossier skeleton**

Create `docs/research/2026-07-18-cdi-primary-sources.md` with:

```md
# Convenios para Evitar la Doble Imposicion - Fuentes primarias

Fecha de corte: 2026-07-18

## Normativa principal

## Marco interpretativo

## Jurisprudencia con impacto operativo

## Doctrina administrativa relevante

## Observaciones de uso para el Knowledge Object
```

- [ ] **Step 2: Populate the normative sources**

Add at least:

```md
## Normativa principal

- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Ley del IRPF.
- Ley del IRNR.
- Ley General Tributaria.
```

- [ ] **Step 3: Populate the interpretative layer**

Add:

```md
## Marco interpretativo

- Modelo de Convenio de la OCDE.
- Comentarios al Modelo OCDE cuando tengan valor interpretativo operativo.
- Nota expresa: el Modelo OCDE y sus Comentarios no sustituyen el texto del convenio concreto aplicable.
```

- [ ] **Step 4: Add content guardrails**

Add:

```md
## Observaciones de uso para el Knowledge Object

- No desarrollar categorias materiales como dividendos, intereses o canones.
- No hacer analisis pais por pais.
- No desarrollar todavia los tests materiales de establecimiento permanente.
- Mantener separadas aplicabilidad e interpretacion del CDI.
```

- [ ] **Step 5: Review the dossier for doctrinal purity**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-cdi-primary-sources.md
```

Expected: the dossier reads as a doctrinal source pack and not as a treaty-category manual.

- [ ] **Step 6: Commit the dossier**

```bash
git add docs/research/2026-07-18-cdi-primary-sources.md
git commit -m "docs(knowledge): add cdi primary source dossier"
```

### Task 2: Author the canonical CDI Knowledge Object

**Files:**
- Create: `examples/convenios-doble-imposicion-cdi.json`
- Reference: `examples/residencia-fiscal-espana.json`
- Reference: `examples/modelo-721-monedas-virtuales.json`

- [ ] **Step 1: Create the canonical object skeleton**

Use the same real-object root shape:

```json
{
  "identity": {},
  "governance": {},
  "classification": {},
  "channelPolicy": {},
  "executiveSummary": {},
  "affectedTaxModels": [],
  "affectedForms": [],
  "blocks": [],
  "relations": [],
  "auditMetadata": {}
}
```

- [ ] **Step 2: Fill root metadata as a transversal doctrinal object**

Use root metadata aligned with the story:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_cdi_marco_general_001",
    "stableKey": "convenios-doble-imposicion-cdi",
    "title": "Convenios para Evitar la Doble Imposicion (CDI)",
    "slug": "convenios-doble-imposicion-cdi",
    "language": "es",
    "jurisdiction": "ES"
  }
}
```

- [ ] **Step 3: Write the executive summary**

The summary must directly explain:

```text
que es un CDI, para que sirve, cuando resulta aplicable, como interactua con la normativa espanola, como distribuye o limita potestades tributarias y como evita la doble imposicion sin crear por si mismo una obligacion tributaria nueva.
```

- [ ] **Step 4: Author the doctrinal blocks**

Populate these blocks:

```text
legal_basis
technical_development
procedure
checklist
faq
risk
required_documentation
case_study
internal_reference
```

The `technical_development` block must explicitly include:

```text
- separacion entre aplicabilidad e interpretacion;
- funcion interpretativa del Modelo OCDE;
- tie-breaker;
- metodo general de distribucion de potestades;
- metodos para eliminar la doble imposicion;
- EP solo como deteccion y derivacion futura.
```

- [ ] **Step 5: Encode the Decision Gateway**

Represent this logical sequence clearly inside `technical_development` and `procedure`:

```text
Existe elemento internacional
Existe CDI vigente
Ambito subjetivo
Ambito objetivo
Aplicar reglas generales del convenio
```

- [ ] **Step 6: Add the dependency matrix**

The object must declare doctrinal dependencies under:

```text
Provides Treaty Framework To:
- Residencia Fiscal
- Modelo 210
- Modelo 151
- IRPF
- IRNR
- Fiscalidad Internacional
```

Also add additional relations for `Modelo 714`, `Modelo 720`, `Modelo 721`, `Establecimiento Permanente` and `Rentas internacionales` if they match the existing relation model.

- [ ] **Step 7: Validate JSON formatting**

Run:

```bash
node -e "JSON.parse(require('node:fs').readFileSync('examples/convenios-doble-imposicion-cdi.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 8: Commit the canonical object**

```bash
git add examples/convenios-doble-imposicion-cdi.json
git commit -m "feat(knowledge): author canonical cdi object"
```

### Task 3: Add story-specific validation helpers

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-008b.mjs`
- Reference: `scripts/lib/knowledge-object-story-kf-008a.mjs`

- [ ] **Step 1: Copy the proven helper pattern**

Base the new helper on the structure already used in `scripts/lib/knowledge-object-story-kf-008a.mjs`.

- [ ] **Step 2: Implement semantic checks**

Add explicit checks for:

```text
- transversal CDI title and stable key;
- root status = validado;
- executive summary reused by Planner/Web/AI;
- explicit statement that the CDI does not create a new tax obligation;
- explicit separation between aplicabilidad and interpretacion;
- explicit Decision Gateway;
- explicit interpretative role of the Modelo OCDE;
- EP treated only at introductory level;
- minimum required relations under Provides Treaty Framework To;
- no category-specific treaty development.
```

- [ ] **Step 3: Implement derived-view builders**

Reuse the same builder surface as the previous transversal object:

```text
buildPlannerView
buildWebView
buildAiContext
buildChecklistView
buildFaqView
buildClientResponse
buildStoryArtifacts
```

- [ ] **Step 4: Keep channel enforcement conservative**

Ensure the helpers exclude:

```text
- blocked content
- obsolete content
- restricted content where the channel does not allow it
- internal references from public-like views
```

- [ ] **Step 5: Review helper coherence**

Run:

```bash
sed -n '1,320p' scripts/lib/knowledge-object-story-kf-008b.mjs
```

Expected: helper names, constants and story identifiers all consistently say `kf-008b`.

- [ ] **Step 6: Commit the helper**

```bash
git add scripts/lib/knowledge-object-story-kf-008b.mjs
git commit -m "test(knowledge): add cdi story semantic validator"
```

### Task 4: Add artifact builder and story validator

**Files:**
- Create: `scripts/build-story-kf-008b-artifacts.mjs`
- Create: `scripts/validate-story-kf-008b.mjs`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Create the artifact builder**

Create `scripts/build-story-kf-008b-artifacts.mjs` following the existing story pattern and generate:

```text
examples/derived/cdi-planner-view.json
examples/derived/cdi-web-view.json
examples/derived/cdi-ai-context.json
examples/derived/cdi-checklist.json
examples/derived/cdi-faq.json
examples/derived/cdi-client-response.json
examples/derived/cdi-validation-report.json
examples/derived/cdi-incident-log.json
```

- [ ] **Step 2: Create the validator entrypoint**

Create `scripts/validate-story-kf-008b.mjs` to print:

```json
{
  "story": "STORY-KF-008B",
  "schemaValidation": "PASS|FAIL",
  "ruleEngine": "PASS|FAIL",
  "plannerView": "PASS|FAIL",
  "webView": "PASS|FAIL",
  "aiContext": "PASS|FAIL",
  "checklist": "PASS|FAIL",
  "faq": "PASS|FAIL",
  "clientResponse": "PASS|FAIL",
  "qualityGate": "PASS|FAIL",
  "structuralChangesRequired": "NO"
}
```

- [ ] **Step 3: Wire the story into package scripts**

Update `package.json` with:

```json
"build:story-kf-008b": "node scripts/build-story-kf-008b-artifacts.mjs",
"validate:story-kf-008b": "node scripts/validate-story-kf-008b.mjs"
```

Also export the new example if the package export pattern continues to list canonical objects.

- [ ] **Step 4: Extend the global check flow**

Update `scripts/check.mjs` so it runs:

```text
validate:story-kf-008b
tests/cdi-story-kf-008b.test.mjs
```

- [ ] **Step 5: Run builder and validator**

Run:

```bash
node scripts/build-story-kf-008b-artifacts.mjs
node scripts/validate-story-kf-008b.mjs
```

Expected: derived files appear and the validator reports `PASS` across the story gates.

- [ ] **Step 6: Commit artifact infrastructure**

```bash
git add scripts/build-story-kf-008b-artifacts.mjs scripts/validate-story-kf-008b.mjs scripts/check.mjs package.json examples/derived
git commit -m "feat(knowledge): add cdi derived artifact pipeline"
```

### Task 5: Add focused automated tests

**Files:**
- Create: `tests/cdi-story-kf-008b.test.mjs`
- Reference: `tests/residencia-fiscal-story-kf-008a.test.mjs`

- [ ] **Step 1: Create the focused test file**

Cover at least:

```text
- schema validation passes;
- story semantic rules pass;
- Planner view includes operational treaty content and excludes blocked content;
- Web view exposes only derived-safe material;
- AI context keeps doctrinal restrictions visible;
- client response stays derived_only;
- Decision Gateway is present;
- aplicabilidad and interpretacion are both visible and distinct;
- treaty dependency relations exist;
- generated files match current artifact output.
```

- [ ] **Step 2: Add one negative-policy test**

Add a test where:

```text
- root client_response is blocked -> derived response fails
or
- object status becomes obsoleto -> derived outputs fail
```

- [ ] **Step 3: Run the focused test**

Run:

```bash
node --test tests/cdi-story-kf-008b.test.mjs
```

Expected: all tests pass with zero failures.

- [ ] **Step 4: Commit the focused tests**

```bash
git add tests/cdi-story-kf-008b.test.mjs
git commit -m "test(knowledge): cover cdi story artifacts"
```

### Task 6: Add validation docs and PR draft

**Files:**
- Create: `docs/2026-07-18-story-kf-008b-validation-report.md`
- Create: `docs/2026-07-18-story-kf-008b-pr-draft.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Write the validation report**

Create `docs/2026-07-18-story-kf-008b-validation-report.md` with this structure:

```md
# STORY-KF-008B - Validation Report

## Knowledge Object

Convenios para Evitar la Doble Imposicion (CDI)

## Results

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

- [ ] **Step 2: Write the draft PR body**

Create `docs/2026-07-18-story-kf-008b-pr-draft.md` including:

```md
## Summary

Authors the transversal doctrinal Knowledge Object for Convenios para Evitar la Doble Imposicion (CDI).

## Included

- canonical object
- source dossier
- semantic validator
- derived artifacts
- focused tests
- validation report

## Architecture

No contract changes.
No consumer changes.
No category-specific treaty expansion.
```

- [ ] **Step 3: Update inventory docs**

Add the new object to `README.md` and `CHANGELOG.md` using the same tone and structure as the most recent published objects.

- [ ] **Step 4: Commit documentation updates**

```bash
git add docs/2026-07-18-story-kf-008b-validation-report.md docs/2026-07-18-story-kf-008b-pr-draft.md README.md CHANGELOG.md
git commit -m "docs(knowledge): add cdi validation and pr draft"
```

### Task 7: Run the final story gate

**Files:**
- Verify: `examples/convenios-doble-imposicion-cdi.json`
- Verify: `scripts/validate-story-kf-008b.mjs`
- Verify: `tests/cdi-story-kf-008b.test.mjs`
- Verify: `docs/2026-07-18-story-kf-008b-validation-report.md`

- [ ] **Step 1: Run the story validator**

```bash
node scripts/validate-story-kf-008b.mjs
```

Expected: all story gates report `PASS` and `Structural Changes Required` reports `NO`.

- [ ] **Step 2: Run the focused tests**

```bash
node --test tests/cdi-story-kf-008b.test.mjs
```

Expected: zero failures.

- [ ] **Step 3: Run the full package check**

```bash
pnpm run check
```

Expected: package-wide validation remains green and now includes `STORY-KF-008B`.

- [ ] **Step 4: Run diff hygiene**

```bash
git diff --check
```

Expected: no whitespace or patch-format errors.

- [ ] **Step 5: Write the final story certification block into the validation report**

Append:

```md
STORY-KF-008B

Knowledge Object: Convenios para Evitar la Doble Imposicion (CDI)

Schema Validation ........... PASS
Rule Engine ................. PASS
Planner View ............... PASS
Web View ................... PASS
AI Context ................. PASS
Checklist .................. PASS
FAQ ........................ PASS
Client Response ............ PASS
Structural Changes ......... NO

STATUS

KNOWLEDGE OBJECT READY
```

- [ ] **Step 6: Commit the final gate closure**

```bash
git add docs/2026-07-18-story-kf-008b-validation-report.md
git commit -m "docs(knowledge): certify cdi story validation"
```

## Self-review checklist

- [ ] The plan preserves the doctrinal-general scope and does not reintroduce category-specific treaty articles.
- [ ] The plan keeps `aplicabilidad` and `interpretacion` separated in both content and validation.
- [ ] The Decision Gateway is explicitly implemented and tested.
- [ ] The dependency matrix `Provides Treaty Framework To:` is explicitly implemented and tested.
- [ ] No task changes contract, schema, generated types, consumers or architecture.

Plan complete and saved to `docs/2026-07-18-story-kf-008b-cdi-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
