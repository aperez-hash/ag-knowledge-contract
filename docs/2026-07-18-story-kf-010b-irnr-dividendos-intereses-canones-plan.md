# IRNR Dividendos, Intereses y Canones Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `IRNR - Dividendos, Intereses y Canones` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers, or architecture.

**Architecture:** Reuse the certified Knowledge Factory production pattern already used by `CDI`, `Residencia Fiscal`, `Modelo 210`, `IRNR - Rendimientos del Trabajo`, and `IRNR - Rendimientos del Capital Inmobiliario`: one canonical JSON object, one story-specific helper module, one artifact builder, one validator, one focused test file, one validation report, and one PR draft. The object remains material-operational, focused on passive cross-border income categories under `IRNR`, with doctrinal dependence on `Residencia Fiscal`, `CDI`, and `Modelo 210`, but without becoming a full treaty catalog or a full `Modelo 210` procedural manual.

**Tech Stack:** Canonical JSON documents, Node.js ESM scripts, built-in `node:test`, existing package scripts in `package.json`, and the published contract `@ag/knowledge-contract@1.0.0`.

---

## File Structure

### New files to create

- `docs/research/2026-07-18-irnr-dividendos-intereses-canones-primary-sources.md`
  - Primary-source research dossier for passive `IRNR` income categories.
- `examples/irnr-dividendos-intereses-canones.json`
  - Canonical Knowledge Object for the story.
- `scripts/lib/knowledge-object-story-kf-010b.mjs`
  - Story-specific loader, semantic validator, and derived-view builder.
- `scripts/build-story-kf-010b-artifacts.mjs`
  - Artifact generator for Planner, Web, AI, Checklist, FAQ, Client Response, validation report, and incident log.
- `scripts/validate-story-kf-010b.mjs`
  - Consolidated validation entrypoint for the story.
- `tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs`
  - Focused automated coverage for the object and all derived outputs.
- `docs/2026-07-18-story-kf-010b-validation-report.md`
  - Human-readable validation summary.
- `docs/2026-07-18-story-kf-010b-pr-draft.md`
  - Draft PR body text for publication.

### Existing files to modify

- `README.md`
  - Add the new object, scripts, tests, and usage notes.
- `CHANGELOG.md`
  - Record `STORY-KF-010B` and `IRNR - Dividendos, Intereses y Canones`.
- `package.json`
  - Add story-specific scripts and export entry if needed.
- `scripts/check.mjs`
  - Include story validator and focused tests in the package-wide check path.

### Derived files expected from the builder

- `examples/derived/irnr-dividendos-intereses-canones-planner-view.json`
- `examples/derived/irnr-dividendos-intereses-canones-web-view.json`
- `examples/derived/irnr-dividendos-intereses-canones-ai-context.json`
- `examples/derived/irnr-dividendos-intereses-canones-checklist.json`
- `examples/derived/irnr-dividendos-intereses-canones-faq.json`
- `examples/derived/irnr-dividendos-intereses-canones-client-response.json`
- `examples/derived/irnr-dividendos-intereses-canones-validation-report.json`
- `examples/derived/irnr-dividendos-intereses-canones-incident-log.json`

---

### Task 1: Create the primary-source dossier

**Files:**
- Create: `docs/research/2026-07-18-irnr-dividendos-intereses-canones-primary-sources.md`

- [ ] **Step 1: Write the research dossier structure**

```md
# IRNR - Dividendos, Intereses y Canones

Fecha: 2026-07-18
Estado: dossier primario para STORY-KF-010B

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
- Ley del IRPF y normativa de retenciones solo cuando ayuden a conceptos
  compartidos.
- Convenios para Evitar la Doble Imposicion suscritos por Espana.
- Modelo OCDE y Comentarios como referencia interpretativa general.
- AEAT: Modelo 210, instrucciones oficiales y paginas de no residentes sobre
  dividendos, intereses y canones cuando existan.
```

- [ ] **Step 3: Add doctrine and jurisprudence screening criteria**

```md
## Criterios de seleccion

- Solo consultas vinculantes con impacto operativo real sobre fuente,
  retencion, `CDI`, exencion o declaracion.
- Solo criterios administrativos consolidados.
- Solo jurisprudencia con efecto practico sobre la tributacion de rentas
  pasivas de no residentes.
- No usar resenas secundarias como fuente principal del criterio.
```

- [ ] **Step 4: Run a quick content sanity check**

Run:

```bash
sed -n '1,220p' docs/research/2026-07-18-irnr-dividendos-intereses-canones-primary-sources.md
```

Expected: the dossier lists legal, AEAT, doctrine, and jurisprudence sections without placeholders.

- [ ] **Step 5: Commit**

```bash
git add docs/research/2026-07-18-irnr-dividendos-intereses-canones-primary-sources.md
git commit -m "docs(knowledge): add irnr passive income primary source dossier"
```

---

### Task 2: Author the canonical Knowledge Object

**Files:**
- Create: `examples/irnr-dividendos-intereses-canones.json`
- Read before editing:
  - `examples/irnr-rendimientos-trabajo.json`
  - `examples/irnr-rendimientos-capital-inmobiliario.json`
  - `examples/convenios-doble-imposicion-cdi.json`

- [ ] **Step 1: Copy the structure of the closest certified object**

Use `examples/irnr-rendimientos-trabajo.json` as the nearest structural template:

```bash
cp examples/irnr-rendimientos-trabajo.json \
  examples/irnr-dividendos-intereses-canones.json
```

Expected: a new canonical object exists with the same contract-compliant top-level shape.

- [ ] **Step 2: Replace identity and governance metadata**

Set fields equivalent to:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_irnr_dividendos_intereses_canones_001",
    "stableKey": "irnr-dividendos-intereses-canones",
    "title": "IRNR - Dividendos, Intereses y Canones",
    "slug": "irnr-dividendos-intereses-canones"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0"
  }
}
```

- [ ] **Step 3: Set classification, affected models, and affected forms**

Use an `IRNR` passive-income profile:

```json
{
  "classification": {
    "domain": "fiscal",
    "topic": "irnr",
    "subtopic": "dividendos-intereses-canones",
    "audience": "advisor"
  },
  "affectedTaxModels": [
    { "modelCode": "210", "relationType": "primary" },
    { "modelCode": "216", "relationType": "secondary" }
  ],
  "affectedForms": [
    { "formCode": "210", "relationType": "required" },
    { "formCode": "216", "relationType": "informative" }
  ]
}
```

- [ ] **Step 4: Write the executive summary with the approved scope**

The summary must explicitly cover:

```text
- what the object includes: dividends, interest, and royalties;
- why passive income under `IRNR` must be analyzed category by category;
- when a `CDI` is especially decisive;
- why retentions and declaration are downstream consequences, not the starting point;
- that this object does not replace a full treaty-by-treaty or Modelo 210 procedural manual.
```

- [ ] **Step 5: Write the legal basis block**

Ensure the block addresses:

```text
- passive income categories in `IRNR`;
- territorial source under Spanish internal law;
- hierarchy between internal law and `CDI`;
- interpretive support from OECD Model / Commentaries without replacing the actual treaty;
- connection to retentions and minimum compliance.
```

- [ ] **Step 6: Write the technical development block around the approved decision chain**

The block must include these sections in order:

```text
1. non-resident status
2. identification of the passive income category
3. dividends
4. interest
5. royalties
6. source and localization in Spain
7. internal Spanish taxing right
8. `CDI` review
9. retentions and declaration
10. frequent errors and escalation boundaries
```

It must explicitly include the approved logic:

```text
- internal law first;
- `CDI` second;
- retentions and declaration last.
```

- [ ] **Step 7: Add the Decision Gateway inside the technical content**

Embed this exact gateway in the block narrative:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe una renta pasiva de dividendos, intereses o canones?
        ↓
La renta se considera obtenida en Espana por norma interna?
        ↓
Existe CDI aplicable?
        ↓
El CDI limita, reduce o excluye la potestad espanola?
        ↓
Existe retencion o ingreso a cuenta?
        ↓
Existe obligacion de declarar?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

- [ ] **Step 8: Write the procedure block**

The procedure must follow this operational order:

```text
1. identify the non-resident taxpayer
2. classify the income category
3. confirm Spanish-source treatment under internal law
4. locate the applicable `CDI`
5. verify documentary support for treaty treatment
6. decide retention and declaration
7. close the file with the minimum operational outcome
```

- [ ] **Step 9: Write the checklist block**

The checklist must let an advisor verify:

```text
- non-resident condition
- income category
- payer / source connection with Spain
- treaty review
- certificate of tax residence
- retention analysis
- declaration analysis
```

- [ ] **Step 10: Write the FAQ block with real client questions**

Include at least these question themes:

```text
- Do all dividends paid from Spain always tax in Spain?
- Does an interest payment by a Spanish resident always require withholding?
- Can a royalty be limited by treaty?
- Is withholding enough to avoid filing?
- What proof is needed to apply treaty benefits?
```

- [ ] **Step 11: Write the risk block**

Include at least these risks:

```text
- wrong income classification
- automatic and incorrect treaty application
- missing tax residence certificate
- incorrect withholding
- wrong closure by confusing exemption, treaty limitation, and non-taxability
```

Each risk must include severity, impact, and mitigation.

- [ ] **Step 12: Write the required documentation block**

Add an evidence matrix that distinguishes:

```text
- tax residence certificate
- contract or agreement
- beneficial ownership support when relevant
- payment support
- withholding evidence
- treaty support
```

The block must include practical notes about evidentiary strength and usual use.

- [ ] **Step 13: Write the case study block**

Include at least four practical cases:

```text
1. dividend paid to a resident of a treaty jurisdiction
2. interest paid to a non-resident with treaty limitation
3. royalty with possible source taxation in Spain
4. missing documentation that blocks favorable treaty treatment
```

- [ ] **Step 14: Write the internal reference block**

Only include real internal references already present in the repository. If no specific reference exists, leave the block structurally valid but minimal.

- [ ] **Step 15: Set the relations block**

Include at least these outbound relations:

```text
- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
- IRNR - Ganancias patrimoniales (future-facing if already allowed by local relation pattern)
- IRPF Internacional (future-facing if already allowed by local relation pattern)
```

Use the canonical relation shape already used in `IRNR - Rendimientos del Trabajo`.

- [ ] **Step 16: Normalize audit metadata**

Ensure `auditMetadata` uses the same stable shape already accepted by the schema and recent stories.

- [ ] **Step 17: Run a JSON parse check**

Run:

```bash
node -e 'JSON.parse(require(\"fs\").readFileSync(\"examples/irnr-dividendos-intereses-canones.json\", \"utf8\")); console.log(\"ok\")'
```

Expected: `ok`

- [ ] **Step 18: Commit**

```bash
git add examples/irnr-dividendos-intereses-canones.json
git commit -m "feat(knowledge): author canonical irnr passive income object"
```

---

### Task 3: Implement the story helper and builder scripts

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-010b.mjs`
- Create: `scripts/build-story-kf-010b-artifacts.mjs`
- Create: `scripts/validate-story-kf-010b.mjs`
- Read before editing:
  - `scripts/lib/knowledge-object-story-kf-010a.mjs`
  - `scripts/build-story-kf-010a-artifacts.mjs`
  - `scripts/validate-story-kf-010a.mjs`

- [ ] **Step 1: Copy the nearest story helper**

```bash
cp scripts/lib/knowledge-object-story-kf-010a.mjs \
  scripts/lib/knowledge-object-story-kf-010b.mjs
cp scripts/build-story-kf-010a-artifacts.mjs \
  scripts/build-story-kf-010b-artifacts.mjs
cp scripts/validate-story-kf-010a.mjs \
  scripts/validate-story-kf-010b.mjs
```

Expected: the new files exist and still reference `010A` values that will be replaced.

- [ ] **Step 2: Replace story identifiers and file names**

Update the helper constants to:

```text
STORY-KF-010B
irnr-dividendos-intereses-canones
IRNR - Dividendos, Intereses y Canones
```

- [ ] **Step 3: Rewrite semantic rules for the new doctrinal scope**

The helper must assert at least:

```text
- passive income category coverage for dividends, interest, and royalties;
- internal-law-first analysis;
- explicit `CDI` modulation;
- retention / declaration closure;
- dependence on `Residencia Fiscal`, `CDI`, and `Modelo 210`;
- evidence matrix support;
- case coverage for the four approved scenarios.
```

- [ ] **Step 4: Keep derived-view generation structurally identical**

Reuse the same output shape and channel policy behavior already accepted in `010A`, changing only story-specific labels, checks, and derived file names.

- [ ] **Step 5: Run the validator entrypoint once**

Run:

```bash
node scripts/validate-story-kf-010b.mjs
```

Expected before finishing the story: a structured JSON report with `PASS` statuses and no structural changes required.

- [ ] **Step 6: Commit**

```bash
git add \
  scripts/lib/knowledge-object-story-kf-010b.mjs \
  scripts/build-story-kf-010b-artifacts.mjs \
  scripts/validate-story-kf-010b.mjs
git commit -m "feat(knowledge): add irnr passive income story scripts"
```

---

### Task 4: Add focused automated coverage

**Files:**
- Create: `tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs`
- Read before editing:
  - `tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs`

- [ ] **Step 1: Copy the nearest focused test**

```bash
cp tests/irnr-rendimientos-capital-inmobiliario-story-kf-010a.test.mjs \
  tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs
```

Expected: the new test file exists and still references `010A` values that will be replaced.

- [ ] **Step 2: Update the tests to the new story contract**

The focused suite must cover at least:

```text
1. the canonical object validates against the published schema
2. the object satisfies STORY-KF-010B semantic rules
3. Planner view keeps only allowed operational content
4. Web view exposes only public-safe derived content
5. AI context includes doctrine, procedure, risks, and restrictions
6. checklist, FAQ, and client response derive without duplicating raw content
7. the object keeps the internal-law -> CDI -> retention -> declaration sequence
8. required documentation includes the evidence matrix
9. validation report remains fully PASS
10. derived files stay synchronized with current derivation output
```

- [ ] **Step 3: Run the focused tests**

Run:

```bash
node --test tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs
```

Expected: all focused tests pass with zero failures.

- [ ] **Step 4: Commit**

```bash
git add tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs
git commit -m "test(knowledge): cover irnr passive income object"
```

---

### Task 5: Generate artifacts, wire the package, and document the story

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `package.json`
- Modify: `scripts/check.mjs`
- Create: `docs/2026-07-18-story-kf-010b-validation-report.md`
- Create: `docs/2026-07-18-story-kf-010b-pr-draft.md`
- Create/refresh:
  - `examples/derived/irnr-dividendos-intereses-canones-planner-view.json`
  - `examples/derived/irnr-dividendos-intereses-canones-web-view.json`
  - `examples/derived/irnr-dividendos-intereses-canones-ai-context.json`
  - `examples/derived/irnr-dividendos-intereses-canones-checklist.json`
  - `examples/derived/irnr-dividendos-intereses-canones-faq.json`
  - `examples/derived/irnr-dividendos-intereses-canones-client-response.json`
  - `examples/derived/irnr-dividendos-intereses-canones-validation-report.json`
  - `examples/derived/irnr-dividendos-intereses-canones-incident-log.json`

- [ ] **Step 1: Add package wiring**

Update `package.json` with story scripts equivalent to:

```json
{
  "scripts": {
    "build:story-kf-010b": "node scripts/build-story-kf-010b-artifacts.mjs",
    "validate:story-kf-010b": "node scripts/validate-story-kf-010b.mjs"
  }
}
```

And export the canonical example if the package already exports story examples explicitly.

- [ ] **Step 2: Register the story in `scripts/check.mjs`**

Add `STORY-KF-010B` to the global check flow by following the same pattern already used for `010A`.

- [ ] **Step 3: Build the derived artifacts**

Run:

```bash
node scripts/build-story-kf-010b-artifacts.mjs
```

Expected: a successful JSON summary with:

```text
ok: true
derivedArtifacts: 8
incidentCount: 0
```

- [ ] **Step 4: Write the validation report**

Create `docs/2026-07-18-story-kf-010b-validation-report.md` with the same format already used in `010A`, but updated to:

```text
STORY-KF-010B
Knowledge Object: IRNR - Dividendos, Intereses y Canones
```

- [ ] **Step 5: Write the PR draft**

Create `docs/2026-07-18-story-kf-010b-pr-draft.md` covering:

```text
- summary
- included files
- validation evidence
- architecture freeze
- certification block
```

- [ ] **Step 6: Update README and changelog**

Add the new object, scripts, and focused test to `README.md` and record the story in `CHANGELOG.md`.

- [ ] **Step 7: Run the global story validation set**

Run:

```bash
node scripts/validate-story-kf-010b.mjs
node --test tests/irnr-dividendos-intereses-canones-story-kf-010b.test.mjs
node scripts/check.mjs
git diff --check
```

Expected:

```text
validate-story-kf-010b: PASS
focused tests: all PASS
scripts/check.mjs: PASS
git diff --check: no output
```

- [ ] **Step 8: Commit**

```bash
git add \
  README.md \
  CHANGELOG.md \
  package.json \
  scripts/check.mjs \
  docs/2026-07-18-story-kf-010b-validation-report.md \
  docs/2026-07-18-story-kf-010b-pr-draft.md \
  examples/derived/irnr-dividendos-intereses-canones-*.json
git commit -m "chore(knowledge): wire irnr passive income validation"
```

---

## Spec Coverage Check

- Covered: canonical object, research dossier, semantic helper, validator, builder, focused tests, derived artifacts, validation report, PR draft, package wiring, and story-level validation.
- Covered: doctrinal dependence on `Residencia Fiscal`, `CDI`, and `Modelo 210`.
- Covered: unified treatment of `dividendos`, `intereses`, and `canones`.
- Covered: evidence matrix, `Decision Gateway`, and the mandatory analytical order `norma interna -> CDI -> retencion -> declaracion`.
- Covered: explicit architectural freeze and no structural changes.
- No gaps identified against the approved design.
