# IRNR Establecimientos Permanentes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `IRNR - Establecimientos Permanentes` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers, or architecture.

**Architecture:** Reuse the certified Knowledge Factory production pattern already used by `Residencia Fiscal`, `CDI`, `Modelo 151`, and the four previous `IRNR` objects: one canonical JSON object, one story-specific helper module, one artifact builder, one validator, one focused test file, one validation report, and one PR draft. The object remains methodological-operational, focused on identifying whether a non-resident has a `PE` in Spain and what general operational consequences follow, without expanding into benefit attribution, accounting, transfer pricing, or full corporate taxation.

**Tech Stack:** Canonical JSON documents, Node.js ESM scripts, built-in `node:test`, existing package scripts in `package.json`, and the published contract `@ag/knowledge-contract@1.0.0`.

---

## File Structure

### New files to create

- `docs/research/2026-07-19-irnr-establecimientos-permanentes-primary-sources.md`
  - Primary-source research dossier for `IRNR` permanent establishments.
- `examples/irnr-establecimientos-permanentes.json`
  - Canonical Knowledge Object for the story.
- `scripts/lib/knowledge-object-story-kf-010d.mjs`
  - Story-specific loader, semantic validator, and derived-view builder.
- `scripts/build-story-kf-010d-artifacts.mjs`
  - Artifact generator for Planner, Web, AI, Checklist, FAQ, Client Response, validation report, and incident log.
- `scripts/validate-story-kf-010d.mjs`
  - Consolidated validation entrypoint for the story.
- `tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs`
  - Focused automated coverage for the object and all derived outputs.
- `docs/2026-07-19-story-kf-010d-validation-report.md`
  - Human-readable validation summary.
- `docs/2026-07-19-story-kf-010d-pr-draft.md`
  - Draft PR body text for publication.

### Existing files to modify

- `README.md`
  - Add the new object, scripts, tests, and usage notes.
- `CHANGELOG.md`
  - Record `STORY-KF-010D` and `IRNR - Establecimientos Permanentes`.
- `package.json`
  - Add story-specific scripts and export entry if needed.
- `scripts/check.mjs`
  - Include story validator and focused tests in the package-wide check path.

### Derived files expected from the builder

- `examples/derived/irnr-establecimientos-permanentes-planner-view.json`
- `examples/derived/irnr-establecimientos-permanentes-web-view.json`
- `examples/derived/irnr-establecimientos-permanentes-ai-context.json`
- `examples/derived/irnr-establecimientos-permanentes-checklist.json`
- `examples/derived/irnr-establecimientos-permanentes-faq.json`
- `examples/derived/irnr-establecimientos-permanentes-client-response.json`
- `examples/derived/irnr-establecimientos-permanentes-validation-report.json`
- `examples/derived/irnr-establecimientos-permanentes-incident-log.json`

---

### Task 1: Create the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-19-irnr-establecimientos-permanentes-primary-sources.md`

- [ ] **Step 1: Write the research dossier structure**

```md
# IRNR - Establecimientos Permanentes

Fecha: 2026-07-19
Estado: dossier primario para STORY-KF-010D

## Fuentes normativas principales

## Convenios y referencias interpretativas

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
- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Modelo OCDE.
- Comentarios al Modelo OCDE cuando su uso interpretativo sea operativo.
- AEAT o fuentes institucionales equivalentes sobre no residentes y establecimientos permanentes.
```

- [ ] **Step 3: Add doctrine and jurisprudence screening criteria**

```md
## Criterios de seleccion

- Solo consultas vinculantes o criterios administrativos con impacto operativo real
  sobre lugar fijo de negocios, agentes, permanencia, actividad preparatoria o
  auxiliar, `CDI` o consecuencias generales de la calificacion.
- Solo jurisprudencia con efecto practico sobre la identificacion de `EP`.
- No usar resenas secundarias como fuente principal del criterio.
```

- [ ] **Step 4: Run a quick content sanity check**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-19-irnr-establecimientos-permanentes-primary-sources.md
```

Expected: the dossier lists legal, treaty, doctrine, and jurisprudence sections without placeholders.

- [ ] **Step 5: Commit**

```bash
git add docs/research/2026-07-19-irnr-establecimientos-permanentes-primary-sources.md
git commit -m "docs(knowledge): add irnr permanent establishment primary source dossier"
```

---

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/irnr-establecimientos-permanentes.json`
- Read before editing:
  - `examples/irnr-rendimientos-trabajo.json`
  - `examples/irnr-rendimientos-capital-inmobiliario.json`
  - `examples/irnr-ganancias-patrimoniales.json`

- [ ] **Step 1: Copy the structure of the closest certified object**

Use `examples/irnr-ganancias-patrimoniales.json` as the nearest structural template:

```bash
cp examples/irnr-ganancias-patrimoniales.json \
  examples/irnr-establecimientos-permanentes.json
```

Expected: a new canonical object exists with the same contract-compliant top-level shape.

- [ ] **Step 2: Replace identity and governance metadata**

Set fields equivalent to:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_irnr_establecimientos_permanentes_001",
    "stableKey": "irnr-establecimientos-permanentes",
    "title": "IRNR - Establecimientos Permanentes",
    "slug": "irnr-establecimientos-permanentes"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0"
  }
}
```

- [ ] **Step 3: Set classification, affected models, and affected forms**

Use an `IRNR` permanent-establishment profile:

```json
{
  "classification": {
    "domain": "fiscal",
    "topic": "irnr",
    "subtopic": "establecimientos-permanentes",
    "audience": "advisor"
  },
  "affectedTaxModels": [
    { "modelCode": "200", "relationType": "secondary" },
    { "modelCode": "202", "relationType": "informative" },
    { "modelCode": "206", "relationType": "informative" }
  ],
  "affectedForms": [
    { "formCode": "200", "relationType": "informative" }
  ]
}
```

- [ ] **Step 4: Write the executive summary with the approved scope**

The summary must explicitly cover:

```text
- what a permanent establishment is;
- when it may exist in Spain;
- why it changes the tax framework;
- general differences between IRNR with and without `EP`;
- practical operational consequences.
```

- [ ] **Step 5: Write the legal basis block**

Ensure the block addresses:

```text
- legal basis of `EP` under internal law;
- interaction between internal law and `CDI`;
- interpretive role of the OECD Model and its Commentaries;
- general criteria of interpretation;
- no verbatim legislation.
```

- [ ] **Step 6: Write the technical development block around the approved structure**

The block must include these sections in order:

```text
1. concepto general de establecimiento permanente
2. lugar fijo de negocios
3. agentes dependientes
4. agentes independientes
5. permanencia
6. actividad empresarial
7. exclusiones generales
8. consecuencias juridicas generales de la existencia de un EP
9. diferencias entre IRNR con y sin EP
10. interaccion con CDI
```

It must explicitly include:

```text
- actividad preparatoria o auxiliar como frontera critica;
- separacion entre analisis interno y analisis convencional;
- consecuencias generales, sin entrar en atribucion detallada de beneficios;
- alertas de escalado doctrinal a `IS` o `Precios de Transferencia`.
```

- [ ] **Step 7: Add the Decision Gateway inside the technical content**

Embed this exact gateway in the block narrative:

```text
Existe actividad economica en Espana?
        ↓
Existe lugar fijo de negocios?
        ↓
Existe agente con capacidad relevante?
        ↓
Concurren los requisitos generales de EP?
        ↓
Existe CDI aplicable?
        ↓
El CDI modifica el analisis?
        ↓
Calificacion final

EP
o
No EP
```

- [ ] **Step 8: Write the procedure block**

Translate the approved flow into ordered steps:

```text
1. Identificar actividad.
2. Analizar presencia fisica.
3. Analizar agentes.
4. Revisar permanencia.
5. Verificar exclusiones.
6. Analizar CDI.
7. Determinar existencia del EP.
8. Identificar consecuencias tributarias generales.
9. Documentar la conclusion.
10. Archivar evidencias.
```

- [ ] **Step 9: Write checklist, FAQ, risk, documentation, and case blocks**

The object must include:

```text
- Checklist with obligatorio / recomendable split.
- FAQ answering at least:
  * Que es un establecimiento permanente?
  * Basta con tener una oficina?
  * Puede existir un EP sin empleados?
  * Como influye un CDI?
  * Que cambia si existe un EP?
- Risk categories:
  * cumplimiento
  * internacional
  * interpretativo
  * documental
  * procedimental
- Required documentation with evidence matrix.
- At least 5 case studies:
  * oficina permanente en Espana
  * agente dependiente con capacidad de contratacion
  * actividad auxiliar sin EP
  * prestacion continuada de servicios
  * CDI que modifica el analisis del EP
```

- [ ] **Step 10: Set relations exactly to the approved doctrinal map**

Ensure relations include:

```text
Consumes Doctrine From:
- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion

Provides Doctrine To:
- Impuesto sobre Sociedades
- Precios de Transferencia
- Fiscalidad Internacional Empresarial
```

Also relate to the four existing `IRNR` objects already merged.

- [ ] **Step 11: Run a structural sanity check**

Run:

```bash
sed -n '1,260p' examples/irnr-establecimientos-permanentes.json
```

Expected: the object has the correct top-level sections and no leftover references to prior stories.

- [ ] **Step 12: Commit**

```bash
git add examples/irnr-establecimientos-permanentes.json
git commit -m "feat(knowledge): author canonical irnr permanent establishment object"
```

---

### Task 3: Create the story helper and semantic validator

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-010d.mjs`
- Read before editing:
  - `scripts/lib/knowledge-object-story-kf-010c.mjs`

- [ ] **Step 1: Copy the nearest story helper**

```bash
cp scripts/lib/knowledge-object-story-kf-010c.mjs \
  scripts/lib/knowledge-object-story-kf-010d.mjs
```

- [ ] **Step 2: Replace file paths and artifact names**

Update constants so they point to:

```text
examples/irnr-establecimientos-permanentes.json
examples/derived/irnr-establecimientos-permanentes-*.json
```

- [ ] **Step 3: Replace the semantic rule set with `EP`-specific checks**

The semantic validator must require, at minimum:

```text
- governance.status = validado
- executive summary in the expected word band
- required blocks present
- sourceRefs in legal_basis, technical_development, procedure, risk, case_study
- relations to residencia, CDI, existing IRNR objects, IS future, transfer pricing future
- technical development mentions:
  * establecimiento permanente
  * lugar fijo de negocios
  * agente dependiente
  * actividad preparatoria o auxiliar
  * CDI
  * IRNR con EP / sin EP
```

- [ ] **Step 4: Keep the existing derivation pattern**

Preserve these builders:

```text
- buildPlannerView
- buildWebView
- buildAiContext
- buildChecklistView
- buildFaqView
- buildClientResponse
- buildStoryArtifacts
```

Only adapt their story metadata and validation logic to `010D`.

- [ ] **Step 5: Run a quick helper sanity check**

Run:

```bash
rg -n "010c|ganancias patrimoniales|capital inmobiliario" scripts/lib/knowledge-object-story-kf-010d.mjs
```

Expected: no stale references remain.

- [ ] **Step 6: Commit**

```bash
git add scripts/lib/knowledge-object-story-kf-010d.mjs
git commit -m "feat(knowledge): add irnr permanent establishment story helper"
```

---

### Task 4: Add builder and validator entrypoints

**Files:**
- Create: `scripts/build-story-kf-010d-artifacts.mjs`
- Create: `scripts/validate-story-kf-010d.mjs`

- [ ] **Step 1: Copy the existing entrypoints**

```bash
cp scripts/build-story-kf-010c-artifacts.mjs scripts/build-story-kf-010d-artifacts.mjs
cp scripts/validate-story-kf-010c.mjs scripts/validate-story-kf-010d.mjs
```

- [ ] **Step 2: Repoint both files to the new helper**

Both files must import:

```js
./lib/knowledge-object-story-kf-010d.mjs
```

- [ ] **Step 3: Run a stale-reference check**

Run:

```bash
rg -n "010c|ganancias patrimoniales" scripts/build-story-kf-010d-artifacts.mjs scripts/validate-story-kf-010d.mjs
```

Expected: no stale references remain.

- [ ] **Step 4: Commit**

```bash
git add scripts/build-story-kf-010d-artifacts.mjs scripts/validate-story-kf-010d.mjs
git commit -m "feat(knowledge): add irnr permanent establishment build entrypoints"
```

---

### Task 5: Add focused tests

**Files:**
- Create: `tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs`
- Read before editing:
  - `tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs`

- [ ] **Step 1: Copy the nearest focused test**

```bash
cp tests/irnr-ganancias-patrimoniales-story-kf-010c.test.mjs \
  tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs
```

- [ ] **Step 2: Repoint imports to the new helper**

The test file must import from:

```js
../scripts/lib/knowledge-object-story-kf-010d.mjs
```

- [ ] **Step 3: Replace assertions with `EP`-specific expectations**

The focused test suite must cover:

```text
1. schema validation passes
2. semantic rules pass
3. planner view exposes the operational blocks
4. web view excludes internal-only content
5. AI context contains criterion, procedure, risks, and restrictions
6. checklist / FAQ / client response derive correctly
7. technical block mentions:
   - establecimiento permanente
   - lugar fijo de negocios
   - agente dependiente
   - actividad preparatoria o auxiliar
   - CDI
8. validation report is full PASS
9. generated files stay synchronized with the builder output
```

- [ ] **Step 4: Run the focused test**

Run:

```bash
node --test tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs
git commit -m "test(knowledge): cover irnr permanent establishment object"
```

---

### Task 6: Generate derived artifacts and supporting docs

**Files:**
- Create:
  - `examples/derived/irnr-establecimientos-permanentes-planner-view.json`
  - `examples/derived/irnr-establecimientos-permanentes-web-view.json`
  - `examples/derived/irnr-establecimientos-permanentes-ai-context.json`
  - `examples/derived/irnr-establecimientos-permanentes-checklist.json`
  - `examples/derived/irnr-establecimientos-permanentes-faq.json`
  - `examples/derived/irnr-establecimientos-permanentes-client-response.json`
  - `examples/derived/irnr-establecimientos-permanentes-validation-report.json`
  - `examples/derived/irnr-establecimientos-permanentes-incident-log.json`
  - `docs/2026-07-19-story-kf-010d-validation-report.md`
  - `docs/2026-07-19-story-kf-010d-pr-draft.md`

- [ ] **Step 1: Build the artifacts**

Run:

```bash
node scripts/build-story-kf-010d-artifacts.mjs
```

Expected: `ok: true`, `derivedArtifacts: 8`, `incidentCount: 0`.

- [ ] **Step 2: Write the validation report**

Use the established format:

```md
# STORY-KF-010D Validation Report

- Story: `STORY-KF-010D`
- Knowledge Object: `IRNR - Establecimientos Permanentes`
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

- [ ] **Step 3: Write the PR draft**

The PR draft must include:

```text
- summary of the new object
- included files
- validation summary
- architecture unchanged
- certification block
```

- [ ] **Step 4: Commit**

```bash
git add examples/derived/irnr-establecimientos-permanentes-*.json docs/2026-07-19-story-kf-010d-validation-report.md docs/2026-07-19-story-kf-010d-pr-draft.md
git commit -m "docs(knowledge): finalize irnr permanent establishment story artifacts"
```

---

### Task 7: Wire the story into the package

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `package.json`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Add package exports and scripts**

Add to `package.json`:

```json
"./examples/irnr-establecimientos-permanentes.json": "./examples/irnr-establecimientos-permanentes.json"
```

and scripts:

```json
"build:story-kf-010d": "node scripts/build-story-kf-010d-artifacts.mjs",
"validate:story-kf-010d": "node scripts/validate-story-kf-010d.mjs"
```

- [ ] **Step 2: Add README entries**

Document:

```text
- the new IRNR object
- the new builder and validator scripts
- the new focused test
```

- [ ] **Step 3: Update changelog**

Add an unreleased entry for:

```text
- Seventh second-cycle Knowledge Object for `IRNR - Establecimientos Permanentes`.
- Derived checklist, FAQ and client response outputs plus focused automated coverage for `STORY-KF-010D`.
```

- [ ] **Step 4: Extend the package-wide check**

Add to `scripts/check.mjs`:

```js
run("validate:story-kf-010d", ["scripts/validate-story-kf-010d.mjs"]);
```

and include:

```text
tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs
```

- [ ] **Step 5: Run a wiring sanity check**

Run:

```bash
rg -n "010d|irnr-establecimientos-permanentes" README.md CHANGELOG.md package.json scripts/check.mjs
```

Expected: all four files reference the new story consistently.

- [ ] **Step 6: Commit**

```bash
git add README.md CHANGELOG.md package.json scripts/check.mjs
git commit -m "chore(knowledge): wire irnr permanent establishment story into package"
```

---

### Task 8: Run final validation and prepare publication

**Files:**
- Validate the whole worktree state

- [ ] **Step 1: Run the story validator**

Run:

```bash
node scripts/validate-story-kf-010d.mjs
```

Expected: all story checks report `PASS`.

- [ ] **Step 2: Run the focused test suite**

Run:

```bash
node --test tests/irnr-establecimientos-permanentes-story-kf-010d.test.mjs
```

Expected: all focused tests pass.

- [ ] **Step 3: Run the package-wide check**

Run:

```bash
node scripts/check.mjs
```

Expected: the full package check remains green with the new story included.

- [ ] **Step 4: Run diff hygiene**

Run:

```bash
git diff --check
git status --short
git diff --stat origin/main...HEAD
```

Expected:

```text
- no whitespace errors
- only STORY-KF-010D files and package wiring changes
- clean or intentionally staged worktree
```

- [ ] **Step 5: Push and prepare the draft PR**

Run:

```bash
git push -u origin story/kf-010d-irnr-establecimientos-permanentes
```

Then open a draft PR against `main` with:

```text
Title:
feat(knowledge): author canonical irnr permanent establishment object
```

Use `docs/2026-07-19-story-kf-010d-pr-draft.md` as the PR body.

- [ ] **Step 6: Commit if any final doc-only adjustment is needed**

```bash
git add .
git commit -m "docs(knowledge): finalize story-kf-010d publication" || true
```

---

## Self-Review

- The plan covers research, canonical object authoring, helper creation, derivation, testing, package wiring, and publication.
- No step requires contract or architecture changes.
- The object remains strictly within the approved methodological-operational scope.
- The riskiest drift point is accidental expansion into benefit attribution or transfer pricing; every task keeps that material out of scope.
