# STORY-KF-008A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `Residencia Fiscal en Espana` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract or architecture.

**Architecture:** Reuse the certified Knowledge Factory v1 pipeline exactly as it exists on `main`: one canonical source object, one story-specific validation layer, one derived-artifact builder, one focused test file, and one validation report. The object remains doctrinally transversal, with a full Spanish-residency core and only a general international double-residency layer.

**Tech Stack:** JSON canonical Knowledge Objects, Node.js scripts, Ajv schema validation, Node test runner, existing derived-artifact helpers, Markdown research and validation docs.

---

## File map

- Create: `examples/residencia-fiscal-espana.json`
  - Canonical source object for the story.
- Create: `docs/research/2026-07-18-residencia-fiscal-primary-sources.md`
  - Primary-source legal and doctrinal dossier.
- Create: `scripts/lib/knowledge-object-story-kf-008a.mjs`
  - Story-specific semantic validation and derived-view helpers.
- Create: `scripts/build-story-kf-008a-artifacts.mjs`
  - Artifact generation entrypoint for Planner, Web, AI, checklist, FAQ and client response.
- Create: `scripts/validate-story-kf-008a.mjs`
  - Story-level validation entrypoint.
- Create: `tests/residencia-fiscal-story-kf-008a.test.mjs`
  - Focused automated coverage for the new object.
- Create: `docs/2026-07-18-story-kf-008a-validation-report.md`
  - Human-readable validation report.
- Create: `docs/2026-07-18-story-kf-008a-pr-draft.md`
  - Draft PR body.
- Modify: `package.json`
  - Add story-specific build/validate scripts and exports if needed.
- Modify: `scripts/check.mjs`
  - Include the new story validation and focused test in the package check flow.
- Modify: `README.md`
  - Update official object inventory and validation usage if materially needed.
- Modify: `CHANGELOG.md`
  - Record the new transversal Knowledge Object and story validation support.

### Task 1: Add the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-residencia-fiscal-primary-sources.md`
- Modify: `docs/2026-07-18-story-kf-008a-residencia-fiscal-design.md`

- [ ] **Step 1: Create the dossier skeleton**

Create `docs/research/2026-07-18-residencia-fiscal-primary-sources.md` with:

```md
# Residencia Fiscal en Espana - Fuentes primarias

Fecha de corte: 2026-07-18

## Normativa principal

## Doctrina administrativa relevante

## Jurisprudencia con impacto operativo

## Observaciones de uso para el Knowledge Object
```

- [ ] **Step 2: Populate the legal source sections**

Add at least:

```md
## Normativa principal

- Ley 35/2006, articulo 9.
- Reglamento del IRPF, en lo que ayude a interpretar residencia de personas fisicas.
- Ley General Tributaria, solo cuando aporte marco probatorio o procedimental relevante.
- Modelo OCDE, para explicar la logica general de tie-breaker.
```

- [ ] **Step 3: Populate doctrine and case-law sections**

Add:

```md
## Doctrina administrativa relevante

- Consultas DGT con impacto operativo sobre 183 dias, ausencias esporadicas, intereses economicos y certificados de residencia.

## Jurisprudencia con impacto operativo

- Solo resoluciones que cambien de verdad el criterio util para expedientes.
```

- [ ] **Step 4: Add explicit content guardrails**

Add:

```md
## Observaciones de uso para el Knowledge Object

- No convertir este objeto en un catalogo de convenios pais por pais.
- No desarrollar la liquidacion del IRPF o del IRNR.
- Mantener el foco en la decision de residencia fiscal y su evidencia documental.
```

- [ ] **Step 5: Review dossier coherence**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-residencia-fiscal-primary-sources.md
```

Expected: the dossier reads as a primary-source pack, not as derived editorial content.

- [ ] **Step 6: Commit the dossier**

```bash
git add docs/research/2026-07-18-residencia-fiscal-primary-sources.md
git commit -m "docs(knowledge): add residencia fiscal primary source dossier"
```

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/residencia-fiscal-espana.json`
- Reference: `examples/modelo-721-monedas-virtuales.json`
- Reference: `examples/modelo-714-impuesto-patrimonio.json`

- [ ] **Step 1: Create the object skeleton**

Start from the existing canonical shape:

```json
{
  "identity": {},
  "governance": {},
  "classification": {},
  "channelPolicy": {},
  "executiveSummary": "",
  "affectedTaxModels": [],
  "affectedForms": [],
  "blocks": [],
  "relations": [],
  "auditMetadata": {}
}
```

- [ ] **Step 2: Fill root metadata as a transversal object**

Use stable root metadata aligned with the story:

```json
{
  "identity": {
    "knowledgeObjectId": "residencia-fiscal-espana",
    "stableKey": "residencia-fiscal-espana",
    "title": "Residencia Fiscal en Espana"
  }
}
```

Ensure the rest of the root fields follow existing real-object patterns from `Modelo 714` and `Modelo 721`.

- [ ] **Step 3: Write the executive summary**

The summary must directly explain:

```text
que es la residencia fiscal, por que condiciona el analisis tributario de personas fisicas, cuales son los criterios principales de determinacion, cuando entra en juego la doble residencia y por que la prueba documental es decisiva.
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

The `technical_development` block must include the explicit hierarchy of criteria:

```text
1. permanencia > 183 dias
2. centro de intereses economicos
3. presuncion familiar
4. tie-breaker solo si existe doble residencia real
```

- [ ] **Step 5: Add the evidence matrix inside required documentation**

Represent these entries in the block content:

```text
Certificado de residencia fiscal | Muy alta | Doble residencia
Registro de entradas y salidas | Alta | Computo de dias
Contratos de trabajo | Media | Centro de intereses
Contratos de arrendamiento | Media | Residencia efectiva
Consumos, escolarizacion y pruebas de vida efectiva | Complementaria | Refuerzo probatorio
```

- [ ] **Step 6: Add the enriched relations**

The relations must include:

```text
Provides Residency Decision To:
- Modelo 210
- Modelo 714
- Modelo 720
- Modelo 721
- Modelo 151
- IRPF
- IRNR
- Convenios de Doble Imposicion
```

- [ ] **Step 7: Validate JSON formatting and readability**

Run:

```bash
node -e "JSON.parse(require('node:fs').readFileSync('examples/residencia-fiscal-espana.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 8: Commit the canonical object**

```bash
git add examples/residencia-fiscal-espana.json
git commit -m "feat(knowledge): author canonical residencia fiscal object"
```

### Task 3: Add story-specific validation helpers

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-008a.mjs`
- Reference: `scripts/lib/knowledge-object-story-kf-005a.mjs`

- [ ] **Step 1: Copy the existing story-helper pattern**

Base the new helper on the same structure used by earlier stories:

```js
export function validateStoryKf008aObject(knowledgeObject) {}
export function buildStoryKf008aArtifacts(knowledgeObject) {}
```

- [ ] **Step 2: Implement semantic checks**

Add explicit checks for:

```text
- transversal title and stable key
- hierarchy of criteria present
- evidence matrix present
- five minimum case studies
- five minimum risk categories
- enriched "Provides Residency Decision To" relation
- international layer kept at general tie-breaker level
```

- [ ] **Step 3: Return understandable errors**

Use a stable shape such as:

```js
return {
  ok: false,
  errors: ["Missing evidence matrix in required documentation block"]
};
```

- [ ] **Step 4: Add artifact-building wrappers**

Expose artifact builders that reuse existing package logic instead of re-implementing channel rules.

- [ ] **Step 5: Smoke-test the helper import**

Run:

```bash
node --input-type=module -e "import('./scripts/lib/knowledge-object-story-kf-008a.mjs').then(() => console.log('ok'))"
```

Expected: `ok`

- [ ] **Step 6: Commit the helper**

```bash
git add scripts/lib/knowledge-object-story-kf-008a.mjs
git commit -m "feat(knowledge): add residencia fiscal story helper"
```

### Task 4: Add build and validation entrypoints

**Files:**
- Create: `scripts/build-story-kf-008a-artifacts.mjs`
- Create: `scripts/validate-story-kf-008a.mjs`
- Modify: `package.json`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Create the build entrypoint**

Implement a thin entrypoint that:

```js
import { buildStoryKf008aArtifacts } from "./lib/knowledge-object-story-kf-008a.mjs";
```

and writes the derived artifacts for:

```text
planner-view
web-view
ai-context
checklist
faq
client-response
validation-report
incident-log
```

- [ ] **Step 2: Create the validation entrypoint**

Implement a thin validator that:

```js
import { validateStoryKf008aObject } from "./lib/knowledge-object-story-kf-008a.mjs";
```

and exits non-zero on failure with human-readable output.

- [ ] **Step 3: Register scripts in package.json**

Add:

```json
"build:story-kf-008a": "node scripts/build-story-kf-008a-artifacts.mjs",
"validate:story-kf-008a": "node scripts/validate-story-kf-008a.mjs"
```

- [ ] **Step 4: Extend the package check flow**

Add the new validation and focused test to `scripts/check.mjs`.

- [ ] **Step 5: Run the story validation**

Run:

```bash
pnpm run validate:story-kf-008a
```

Expected: PASS with no structural changes required.

- [ ] **Step 6: Commit the story entrypoints**

```bash
git add scripts/build-story-kf-008a-artifacts.mjs scripts/validate-story-kf-008a.mjs package.json scripts/check.mjs
git commit -m "feat(knowledge): add residencia fiscal validation pipeline"
```

### Task 5: Add focused automated coverage

**Files:**
- Create: `tests/residencia-fiscal-story-kf-008a.test.mjs`
- Reference: `tests/modelo-721-story-kf-005c.test.mjs`

- [ ] **Step 1: Write the focused tests**

Cover at minimum:

```text
- canonical object validates
- hierarchy of criteria is present
- evidence matrix is present
- "Provides Residency Decision To" relation is present
- planner view builds
- web view builds
- ai context builds
- no structural changes are required
```

- [ ] **Step 2: Run the focused test first**

Run:

```bash
node --test tests/residencia-fiscal-story-kf-008a.test.mjs
```

Expected: FAIL initially until the helper and object are complete.

- [ ] **Step 3: Iterate until the focused test passes**

Re-run:

```bash
node --test tests/residencia-fiscal-story-kf-008a.test.mjs
```

Expected: PASS

- [ ] **Step 4: Commit the focused tests**

```bash
git add tests/residencia-fiscal-story-kf-008a.test.mjs
git commit -m "test(knowledge): cover residencia fiscal story"
```

### Task 6: Generate derived artifacts and reports

**Files:**
- Modify or create under: `examples/derived/`
- Create: `docs/2026-07-18-story-kf-008a-validation-report.md`
- Create: `docs/2026-07-18-story-kf-008a-pr-draft.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Generate the derived artifacts**

Run:

```bash
pnpm run build:story-kf-008a
```

Expected: all story artifacts are regenerated successfully.

- [ ] **Step 2: Write the validation report**

Create a report with this structure:

```md
# STORY-KF-008A Validation Report

- Schema Validation: PASS / FAIL
- Rule Engine: PASS / FAIL
- Planner View: PASS / FAIL
- Web View: PASS / FAIL
- AI Context: PASS / FAIL
- Checklist: PASS / FAIL
- FAQ: PASS / FAIL
- Client Response: PASS / FAIL
- Structural Changes: NO
```

- [ ] **Step 3: Write the PR draft**

Create a concise draft body covering:

```text
summary
included files
validation evidence
feature freeze respected
no architectural changes
```

- [ ] **Step 4: Update README and CHANGELOG only if needed**

Update the official inventory and usage examples only if the repo already uses those files as the public index of available objects.

- [ ] **Step 5: Commit the docs and artifacts**

```bash
git add examples/derived docs/2026-07-18-story-kf-008a-validation-report.md docs/2026-07-18-story-kf-008a-pr-draft.md README.md CHANGELOG.md
git commit -m "docs(knowledge): add residencia fiscal validation artifacts"
```

### Task 7: Run the full quality gate

**Files:**
- Verify all files touched in the story

- [ ] **Step 1: Run story validation**

```bash
pnpm run validate:story-kf-008a
```

Expected: PASS

- [ ] **Step 2: Run focused tests**

```bash
node --test tests/residencia-fiscal-story-kf-008a.test.mjs
```

Expected: PASS

- [ ] **Step 3: Run the full package check**

```bash
pnpm run check
```

Expected: PASS

- [ ] **Step 4: Run diff hygiene**

```bash
git diff --check
```

Expected: no output

- [ ] **Step 5: Inspect final story diff**

Run:

```bash
git diff --stat origin/main...HEAD
```

Expected: only STORY-KF-008A files and minimal inventory/check wiring changes.

- [ ] **Step 6: Final story commit if needed**

If any quality-gate fixes were required:

```bash
git add -A
git commit -m "chore(knowledge): finalize residencia fiscal quality gate"
```

