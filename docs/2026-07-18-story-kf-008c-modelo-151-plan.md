# STORY-KF-008C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the canonical `Modelo 151 - Regimen especial aplicable a los trabajadores, profesionales, emprendedores e inversores desplazados a territorio espanol` Knowledge Object and all required derived artifacts without changing the Knowledge Factory contract, consumers or architecture.

**Architecture:** Reuse the certified Knowledge Factory pipeline already used by `Modelo 714`, `Modelo 721`, `Residencia Fiscal` and `CDI`: one canonical source object, one story-specific validation helper, one derived-artifact builder, one focused test file, and one human-readable validation report. The object remains centered on the special regime itself, with `Modelo 149` as the entry gate, `Modelo 151` as annual management output, and explicit doctrinal delegation to `Residencia Fiscal` and `CDI`.

**Tech Stack:** JSON canonical Knowledge Objects, Node.js scripts, Ajv schema validation, Node test runner, existing derived-artifact helper pattern, Markdown research and validation docs.

---

## File map

- Create: `docs/research/2026-07-18-modelo-151-primary-sources.md`
  - dossier juridico primario del regimen especial.
- Create: `examples/modelo-151-regimen-trabajadores-desplazados.json`
  - objeto canonico de la historia.
- Create: `scripts/lib/knowledge-object-story-kf-008c.mjs`
  - helper semantico de historia y soporte a derivaciones.
- Create: `scripts/build-story-kf-008c-artifacts.mjs`
  - builder de `Planner`, `Web`, `AI`, `Checklist`, `FAQ`, `Client Response`, `incident log` y `validation report`.
- Create: `scripts/validate-story-kf-008c.mjs`
  - entrada de validacion de historia.
- Create: `tests/modelo-151-story-kf-008c.test.mjs`
  - bateria focal automatizada del objeto y sus derivadas.
- Create: `docs/2026-07-18-story-kf-008c-validation-report.md`
  - informe humano de validacion y cierre.
- Create: `docs/2026-07-18-story-kf-008c-pr-draft.md`
  - borrador de PR.
- Modify: `package.json`
  - scripts `build` / `validate` de `008C` y export del nuevo ejemplo.
- Modify: `scripts/check.mjs`
  - integrar la validacion de `008C` en el chequeo global.
- Modify: `README.md`
  - registrar el nuevo objeto oficial y su posicion en la biblioteca.
- Modify: `CHANGELOG.md`
  - registrar el corte `STORY-KF-008C`.

---

### Task 1: Confirmar base limpia de STORY-KF-008C

**Files:**
- Modify: ninguno
- Test: estado del repo y de la rama

- [ ] **Step 1: Confirmar el estado actual del worktree**

Run: `git status -sb`
Expected: rama `story/kf-008c-modelo-151-knowledge-object` sin residuos no relacionados.

- [ ] **Step 2: Confirmar que la base ya incluye CDI**

Run: `git log --oneline --decorate -5`
Expected: `origin/main` ya incorpora el merge de `STORY-KF-008B`.

- [ ] **Step 3: Confirmar rama activa**

Run: `git branch --show-current`
Expected: `story/kf-008c-modelo-151-knowledge-object`

- [ ] **Step 4: Confirmar diff inicial controlado**

Run: `git diff --name-only origin/main...HEAD`
Expected: solo docs de diseno y plan antes de empezar la implementacion.

---

### Task 2: Construir el dossier juridico primario

**Files:**
- Create: `docs/research/2026-07-18-modelo-151-primary-sources.md`
- Reference: `docs/2026-07-18-story-kf-008c-modelo-151-design.md`

- [ ] **Step 1: Crear el esqueleto del dossier**

Crear `docs/research/2026-07-18-modelo-151-primary-sources.md` con:

```md
# Modelo 151 - Primary Sources Dossier

Fecha de corte: 2026-07-18

## Scope

## Normativa principal

## AEAT

## Doctrina administrativa relevante

## Jurisprudencia con impacto operativo

## Criterios consolidados para el Knowledge Object
```

- [ ] **Step 2: Incorporar las fuentes primarias autorizadas**

Anadir al dossier, como minimo:

```md
## Normativa principal

- Ley 35/2006 del IRPF, articulo 93 en su redaccion vigente.
- Reglamento del IRPF sobre el regimen especial.
- Ordenes vigentes relativas a Modelo 149 y Modelo 151.

## AEAT

- Pagina oficial del regimen especial.
- Procedimiento y ayuda oficial del Modelo 149.
- Procedimiento y ayuda oficial del Modelo 151.
- FAQ o manuales practicos oficiales cuando sean utiles.
```

- [ ] **Step 3: Fijar criterios operativos base**

Anadir una seccion de criterios consolidados con frases del tipo:

```md
## Criterios consolidados para el Knowledge Object

- El objeto responde a si existe acceso valido al regimen y como se mantiene durante su vigencia.
- Modelo 149 es la compuerta de opcion inicial.
- Modelo 151 es la pieza anual de gestion del regimen, no el centro doctrinal del objeto.
- La residencia fiscal se delega en el objeto transversal correspondiente.
- El analisis internacional general y los conflictos de doble residencia se delegan en CDI cuando proceda.
- La capa de familiares forma parte del nucleo decisional, no de un anexo.
```

- [ ] **Step 4: Revisar coherencia del dossier**

Run: `sed -n '1,240p' docs/research/2026-07-18-modelo-151-primary-sources.md`
Expected: estructura completa, sin placeholders y sin derivar en guia editorial.

- [ ] **Step 5: Commit del dossier**

```bash
git add docs/research/2026-07-18-modelo-151-primary-sources.md
git commit -m "docs(knowledge): add modelo 151 primary source dossier"
```

---

### Task 3: Autorar el Knowledge Object canonico

**Files:**
- Create: `examples/modelo-151-regimen-trabajadores-desplazados.json`
- Reference: `examples/residencia-fiscal-espana.json`
- Reference: `examples/convenios-doble-imposicion-cdi.json`
- Reference: `examples/modelo-721-monedas-virtuales.json`

- [ ] **Step 1: Crear la cabecera raiz del objeto**

Crear `examples/modelo-151-regimen-trabajadores-desplazados.json` con esta forma inicial:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_irpf_modelo151_regimen_desplazados_001",
    "stableKey": "modelo-151-regimen-trabajadores-desplazados",
    "title": "Modelo 151 - Regimen especial aplicable a los trabajadores, profesionales, emprendedores e inversores desplazados a territorio espanol",
    "slug": "modelo-151-regimen-trabajadores-desplazados",
    "language": "es",
    "jurisdiction": "ES"
  },
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

- [ ] **Step 2: Completar `governance`, `classification`, `channelPolicy`, `executiveSummary`, `affectedTaxModels` y `affectedForms`**

Usar el mismo patron de politicas que en `Residencia Fiscal` y `CDI`, con contenido nuevo. Debe quedar fijado:

```json
"classification": {
  "domain": "fiscal",
  "topic": "regimenes-especiales",
  "subtopic": "modelo-151-regimen-trabajadores-desplazados",
  "audience": "advisor",
  "sensitivity": "high",
  "keywords": [
    "modelo 151",
    "modelo 149",
    "trabajadores desplazados",
    "articulo 93",
    "regimen especial"
  ]
}
```

Y las relaciones raiz minimas:

```json
"affectedTaxModels": [
  {
    "modelCode": "149",
    "modelName": "Comunicacion de la opcion por el regimen especial",
    "relationType": "entry_gate"
  },
  {
    "modelCode": "151",
    "modelName": "Declaracion anual del regimen especial",
    "relationType": "primary"
  }
]
```

- [ ] **Step 3: Crear los bloques obligatorios**

Rellenar en `blocks` los tipos:

```json
[
  { "type": "legal_basis" },
  { "type": "technical_development" },
  { "type": "procedure" },
  { "type": "checklist" },
  { "type": "faq" },
  { "type": "risk" },
  { "type": "required_documentation" },
  { "type": "case_study" },
  { "type": "internal_reference" }
]
```

con foco en:

- acceso del contribuyente principal;
- acceso de familiares;
- permanencia del regimen;
- exclusion inicial y exclusion sobrevenida;
- cronologia operativa;
- relacion practica `149` / `151`.

- [ ] **Step 4: Codificar el `Decision Gateway` y la cronologia**

Reflejar de forma visible en `technical_development` y `procedure` estas dos piezas:

```text
Decision Gateway

Existe desplazamiento a Espana
Se adquiere residencia fiscal
El contribuyente principal puede optar
Existe causa de exclusion
Existen familiares elegibles
Cumplen sus requisitos
Determinacion del regimen aplicable a cada miembro
Opcion inicial y gestion anual
```

```text
Cronologia operativa

Desplazamiento
Adquisicion de residencia
Plazo para ejercer la opcion
Aplicacion del regimen
Control anual
Finalizacion o perdida
```

- [ ] **Step 5: Declarar dependencias doctrinales y analisis delegado**

Anadir en `relations` y en el contenido del objeto:

```text
Consumes Doctrine From:
- Residencia Fiscal
- Convenios de Doble Imposicion

Delegated Analysis:
- Residencia Fiscal -> determinacion de la residencia.
- CDI -> resolucion de conflictos internacionales cuando proceda.
```

Junto con relaciones funcionales a:

```text
Residencia Fiscal
Convenios de Doble Imposicion
Modelo 210
IRPF
IRNR
Fiscalidad Internacional
```

- [ ] **Step 6: Incluir el caso practico familiar obligatorio**

Dentro de `case_study`, crear como minimo este caso:

```text
Desplazamiento del trabajador con incorporacion posterior del conyuge e hijos:
- requisitos individuales
- momento de incorporacion
- efectos sobre la duracion
- documentacion necesaria
```

- [ ] **Step 7: Validar el JSON completo**

Run:

```bash
node -e "JSON.parse(require('node:fs').readFileSync('examples/modelo-151-regimen-trabajadores-desplazados.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 8: Commit del objeto canonico**

```bash
git add examples/modelo-151-regimen-trabajadores-desplazados.json
git commit -m "feat(knowledge): author canonical modelo 151 knowledge object"
```
---

### Task 4: Crear helper de historia y builder de artefactos

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-008c.mjs`
- Create: `scripts/build-story-kf-008c-artifacts.mjs`
- Reference: `scripts/lib/knowledge-object-story-kf-008b.mjs`
- Reference: `scripts/build-story-kf-008b-artifacts.mjs`

- [ ] **Step 1: Crear el esqueleto del helper de historia**

Crear `scripts/lib/knowledge-object-story-kf-008c.mjs` exportando al menos:

```js
export function validateStoryKf008cObject(knowledgeObject) {
  return { ok: true, issues: [] };
}

export function buildStoryKf008cArtifacts(knowledgeObject) {
  return {
    plannerView: null,
    webView: null,
    aiContext: null,
    checklist: null,
    faq: null,
    clientResponse: null,
    validationReport: null,
    incidentLog: null
  };
}
```

- [ ] **Step 2: Implementar reglas semanticas de historia**

El helper debe fallar si falta cualquiera de estas piezas:

```text
- separacion acceso / permanencia
- Decision Gateway
- cronologia operativa
- capa de familiares como dominio nuclear
- referencias funcionales a Modelo 149 y Modelo 151
- delegated analysis a Residencia Fiscal y CDI
```

- [ ] **Step 3: Crear el builder de artefactos**

Crear `scripts/build-story-kf-008c-artifacts.mjs` con patron equivalente a historias previas:

```js
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { buildStoryKf008cArtifacts } from "./lib/knowledge-object-story-kf-008c.mjs";

const objectPath = resolve("examples/modelo-151-regimen-trabajadores-desplazados.json");
const outputDir = resolve("examples/derived");
mkdirSync(outputDir, { recursive: true });

const knowledgeObject = JSON.parse(readFileSync(objectPath, "utf8"));
const artifacts = buildStoryKf008cArtifacts(knowledgeObject);
```

- [ ] **Step 4: Generar las salidas derivadas esperadas**

El builder debe escribir como minimo:

```text
examples/derived/modelo-151-planner-view.json
examples/derived/modelo-151-web-view.json
examples/derived/modelo-151-ai-context.json
examples/derived/modelo-151-checklist.json
examples/derived/modelo-151-faq.json
examples/derived/modelo-151-client-response.json
examples/derived/modelo-151-validation-report.json
examples/derived/modelo-151-incident-log.json
```

- [ ] **Step 5: Ejecutar build focal**

Run: `node scripts/build-story-kf-008c-artifacts.mjs`
Expected: artefactos derivados creados sin tocar contrato ni consumidores.

---

### Task 5: Crear validador de historia y pruebas focales

**Files:**
- Create: `scripts/validate-story-kf-008c.mjs`
- Create: `tests/modelo-151-story-kf-008c.test.mjs`
- Reference: `tests/cdi-story-kf-008b.test.mjs`

- [ ] **Step 1: Crear el validador de historia**

Crear `scripts/validate-story-kf-008c.mjs` con patron equivalente:

```js
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateStoryKf008cObject } from "./lib/knowledge-object-story-kf-008c.mjs";

const objectPath = resolve("examples/modelo-151-regimen-trabajadores-desplazados.json");
const knowledgeObject = JSON.parse(readFileSync(objectPath, "utf8"));
const result = validateStoryKf008cObject(knowledgeObject);

if (!result.ok) {
  console.error(result.issues);
  process.exit(1);
}

console.log("validate-story-kf-008c: PASS");
```

- [ ] **Step 2: Crear la bateria focal de pruebas**

Crear `tests/modelo-151-story-kf-008c.test.mjs` cubriendo al menos:

```js
test("valida el objeto canonico de Modelo 151", () => {});
test("incluye separacion entre acceso y permanencia", () => {});
test("incluye Decision Gateway reutilizable", () => {});
test("incluye cronologia operativa reutilizable", () => {});
test("trata familiares como dominio nuclear", () => {});
test("declara delegated analysis a Residencia Fiscal y CDI", () => {});
test("genera Planner View coherente", () => {});
test("genera FAQ y checklist sin duplicacion estructural", () => {});
```

- [ ] **Step 3: Ejecutar validacion focal**

Run: `node scripts/validate-story-kf-008c.mjs`
Expected: `validate-story-kf-008c: PASS`

- [ ] **Step 4: Ejecutar test focal**

Run: `node --test tests/modelo-151-story-kf-008c.test.mjs`
Expected: suite focal completa en verde.

---

### Task 6: Integrar STORY-KF-008C en el paquete

**Files:**
- Modify: `package.json`
- Modify: `scripts/check.mjs`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Anadir scripts en `package.json`**

Anadir entradas equivalentes a:

```json
"build-story-kf-008c-artifacts": "node scripts/build-story-kf-008c-artifacts.mjs",
"validate-story-kf-008c": "node scripts/validate-story-kf-008c.mjs"
```

- [ ] **Step 2: Integrar `008C` en `scripts/check.mjs`**

Incorporar la ejecucion de:

```text
validate-story-kf-008c
tests/modelo-151-story-kf-008c.test.mjs
```

siguiendo exactamente el patron de `008A` y `008B`.

- [ ] **Step 3: Actualizar inventario en `README.md`**

Registrar el nuevo objeto dentro del patron ya visible:

```text
Objetos doctrinales transversales
Objetos de obligaciones tributarias
Objetos de regimenes especiales
```

con `Modelo 151` dentro del tercer grupo.

- [ ] **Step 4: Actualizar `CHANGELOG.md`**

Anadir una entrada breve del corte:

```md
- STORY-KF-008C: nuevo Knowledge Object canonico del regimen especial de trabajadores desplazados, con derivadas y validacion focal.
```

---

### Task 7: Generar informe de validacion y borrador de PR

**Files:**
- Create: `docs/2026-07-18-story-kf-008c-validation-report.md`
- Create: `docs/2026-07-18-story-kf-008c-pr-draft.md`

- [ ] **Step 1: Redactar el informe de validacion**

Crear `docs/2026-07-18-story-kf-008c-validation-report.md` con esta estructura:

```md
# STORY-KF-008C Validation Report

## Scope

## Canonical object

## Derived artifacts

## Automated validation

## Residual risks

## Certification
```

- [ ] **Step 2: Redactar el borrador de PR**

Crear `docs/2026-07-18-story-kf-008c-pr-draft.md` con secciones:

```md
## Summary

## Included

## Validation

## Architecture

## Certification
```

- [ ] **Step 3: Reflejar la certificacion final esperada**

Incluir al cierre del borrador algo equivalente a:

```text
STORY-KF-008C

Knowledge Object: Modelo 151

Schema Validation ........... PASS
Rule Engine ................. PASS
Planner View ................ PASS
Web View .................... PASS
AI Context .................. PASS
Checklist ................... PASS
FAQ ......................... PASS
Client Response ............. PASS
Structural Changes .......... NO

STATUS

KNOWLEDGE OBJECT READY
```

---

### Task 8: Ejecutar quality gate final

**Files:**
- Modify: ninguno adicional
- Test: validacion completa del corte

- [ ] **Step 1: Ejecutar el builder de artefactos**

Run: `node scripts/build-story-kf-008c-artifacts.mjs`
Expected: todas las derivadas se regeneran correctamente.

- [ ] **Step 2: Ejecutar la validacion de historia**

Run: `node scripts/validate-story-kf-008c.mjs`
Expected: `PASS`

- [ ] **Step 3: Ejecutar el test focal**

Run: `node --test tests/modelo-151-story-kf-008c.test.mjs`
Expected: toda la suite focal en verde.

- [ ] **Step 4: Ejecutar el chequeo completo**

Run: `node scripts/check.mjs`
Expected: chequeo completo del paquete en verde sin regresiones.

- [ ] **Step 5: Ejecutar control final del diff**

Run: `git diff --check`
Expected: sin errores de espacios ni conflictos ocultos.

- [ ] **Step 6: Commit final del corte**

```bash
git add \
  docs/research/2026-07-18-modelo-151-primary-sources.md \
  examples/modelo-151-regimen-trabajadores-desplazados.json \
  scripts/lib/knowledge-object-story-kf-008c.mjs \
  scripts/build-story-kf-008c-artifacts.mjs \
  scripts/validate-story-kf-008c.mjs \
  tests/modelo-151-story-kf-008c.test.mjs \
  docs/2026-07-18-story-kf-008c-validation-report.md \
  docs/2026-07-18-story-kf-008c-pr-draft.md \
  package.json \
  scripts/check.mjs \
  README.md \
  CHANGELOG.md
git commit -m "feat(knowledge): author canonical modelo 151 knowledge object"
```
