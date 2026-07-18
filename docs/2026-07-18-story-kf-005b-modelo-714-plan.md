# Modelo 714 Knowledge Object Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Producir el `Knowledge Object` canonico del `Modelo 714 - Impuesto sobre el Patrimonio`, validado contra `@ag/knowledge-contract@1.0.0`, con todas sus derivaciones y sin modificar contrato ni arquitectura.

**Architecture:** El trabajo reutiliza exactamente el armazon ya certificado de `Modelo 210` y `Modelo 720`: dossier de fuentes primarias, objeto canonico en `examples/`, libreria de historia en `scripts/lib/`, scripts de build y validacion, test focal y artefactos derivados en `examples/derived/`. No se toca `schema`, `generated`, `Rule Engine`, taxonomias ni consumidores.

**Tech Stack:** JSON canonico validado contra `@ag/knowledge-contract@1.0.0`, scripts Node `.mjs`, Node test runner, pipeline local del repo `ag-knowledge-contract`.

---

## File structure

- Create: `docs/research/2026-07-18-modelo-714-primary-sources.md`
  - dossier juridico de fuentes primarias y criterio operativo base.
- Create: `examples/modelo-714-impuesto-patrimonio.json`
  - `Knowledge Object` canonico del Modelo 714.
- Create: `scripts/lib/knowledge-object-story-kf-005b.mjs`
  - helper de historia para derivaciones y validaciones especificas.
- Create: `scripts/build-story-kf-005b-artifacts.mjs`
  - genera `Planner View`, `Web View`, `AI Context`, `Checklist`, `FAQ`, `Client Response`, `validation report` e `incident log`.
- Create: `scripts/validate-story-kf-005b.mjs`
  - valida el objeto y ejecuta el quality gate de historia.
- Create: `tests/modelo-714-story-kf-005b.test.mjs`
  - bateria focal de pruebas del objeto y de las derivaciones.
- Create: `docs/2026-07-18-story-kf-005b-validation-report.md`
  - informe humano de validacion y cierre.
- Create: `docs/2026-07-18-story-kf-005b-pr-draft.md`
  - borrador de PR.
- Modify: `examples/derived/`
  - incorporar los artefactos derivados del Modelo 714.
- Modify: `README.md`
  - registrar el nuevo objeto oficial y las derivaciones disponibles.
- Modify: `CHANGELOG.md`
  - registrar el corte de `STORY-KF-005B`.
- Modify: `scripts/check.mjs`
  - incluir la validacion de la historia en el chequeo global si sigue el patron de `005A`.

---

### Task 1: Preparar la rama y verificar base limpia

**Files:**
- Modify: ninguno
- Test: estado del repo y rama

- [ ] **Step 1: Confirmar estado actual del repo**

Run: `git status -sb`
Expected: ver la rama activa y cualquier residuo no relacionado antes de empezar.

- [ ] **Step 2: Verificar que `main` ya contiene baseline + Modelo 720**

Run: `git log --oneline --decorate -10`
Expected: `main` ya incorpora el baseline fundacional y el merge de `STORY-KF-005A`.

- [ ] **Step 3: Crear o cambiar a la rama unica de la historia**

Run: `git switch -c story/kf-005b-modelo-714-knowledge-object`
Expected: nueva rama aislada para este microcorte.

- [ ] **Step 4: Confirmar rama activa**

Run: `git branch --show-current`
Expected: `story/kf-005b-modelo-714-knowledge-object`

- [ ] **Step 5: Commit de control al final del bloque, solo si hubo ajuste preparatorio**

Run: `git status --short`
Expected: sin cambios si solo se ha preparado la rama.

---

### Task 2: Construir el dossier juridico primario

**Files:**
- Create: `docs/research/2026-07-18-modelo-714-primary-sources.md`
- Test: contraste entre fuentes y criterios del spec

- [ ] **Step 1: Escribir el esqueleto del dossier**

Crear `docs/research/2026-07-18-modelo-714-primary-sources.md` con esta estructura:

```md
# Modelo 714 - Primary Sources Dossier

## Scope

## AEAT

## Ley 19/1991

## Normativa complementaria estatal

## Normativa autonómica - criterio operativo

## ITSGF - interacción operativa

## Jurisprudencia con impacto operativo

## Criterios consolidados para el Knowledge Object
```

- [ ] **Step 2: Incorporar fuentes primarias autorizadas**

Añadir al dossier, como minimo:

```md
- AEAT - Modelo 714 e instrucciones oficiales vigentes.
- Ley 19/1991, del Impuesto sobre el Patrimonio.
- Normativa estatal complementaria con incidencia real en minimos, exenciones o coordinación.
- Normativa del ITSGF cuando afecte al orden de análisis.
- Referencias de normativa autonómica solo a nivel de criterio operativo, no de catálogo exhaustivo.
```

- [ ] **Step 3: Fijar criterios operativos base**

Añadir una seccion de criterios consolidados con frases del tipo:

```md
- El objeto es analítico y responde a si existe obligación de presentar y cómo se determina.
- La residencia fiscal abre el análisis.
- La obligación personal y real deben separarse expresamente.
- La normativa autonómica se trata en nivel operativo profundo, sin inventario exhaustivo por CCAA.
- ITSGF se analiza en bloque separado pero conectado.
```

- [ ] **Step 4: Revisar coherencia del dossier**

Run: `sed -n '1,220p' docs/research/2026-07-18-modelo-714-primary-sources.md`
Expected: estructura completa, sin placeholders.

- [ ] **Step 5: Commit del dossier**

```bash
git add docs/research/2026-07-18-modelo-714-primary-sources.md
git commit -m "docs(knowledge): add modelo 714 primary source dossier"
```

---

### Task 3: Autorar el Knowledge Object canónico

**Files:**
- Create: `examples/modelo-714-impuesto-patrimonio.json`
- Test: lectura estructural del JSON

- [ ] **Step 1: Crear la cabecera raíz del objeto**

Crear `examples/modelo-714-impuesto-patrimonio.json` siguiendo el mismo patron de `Modelo 720`, con esta forma inicial:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_modelo714_impuesto_patrimonio_001",
    "stableKey": "modelo-714-impuesto-patrimonio",
    "title": "Modelo 714 - Impuesto sobre el Patrimonio",
    "slug": "modelo-714-impuesto-sobre-el-patrimonio",
    "language": "es",
    "jurisdiction": "ES"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0",
    "owner": "equipo-fiscal-patrimonio",
    "approvedBy": "direccion-tecnica-fiscal",
    "reviewedAt": "2026-07-18T20:00:00Z",
    "changeReason": "Tercer Knowledge Object productivo, dedicado al Impuesto sobre el Patrimonio"
  },
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

- [ ] **Step 2: Completar `classification`, `channelPolicy`, `executiveSummary`, `affectedTaxModels` y `affectedForms`**

Usar el mismo patron de políticas que en `Modelo 720`, con contenido doctrinal nuevo y sin copiar texto. Deben quedar fijados:

```json
"classification": {
  "domain": "fiscal",
  "topic": "patrimonio",
  "subtopic": "modelo-714-impuesto-patrimonio",
  "audience": "advisor",
  "sensitivity": "high",
  "keywords": ["modelo 714", "impuesto sobre el patrimonio", "obligacion personal", "obligacion real", "itsgf"]
}
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
  { "type": "required_document" },
  { "type": "case_study" },
  { "type": "internal_reference" }
]
```

con:
- foco en residencia, obligación personal/real y obligación de declarar;
- normativa autonómica en nivel operativo;
- ITSGF en bloque conectado;
- valoración tipológica de activos;
- supuestos de obligación sin cuota;
- cuatro casos prácticos mínimos, incluyendo no residente por obligación real.

- [ ] **Step 4: Completar `relations` y `auditMetadata`**

Añadir relaciones solo con objetos reales o planificados oficialmente:

```json
[
  { "relationType": "related", "targetStableKey": "residencia-fiscal" },
  { "relationType": "related", "targetStableKey": "modelo-720-bienes-derechos-extranjero" },
  { "relationType": "related", "targetStableKey": "modelo-721-monedas-virtuales-extranjero" },
  { "relationType": "related", "targetStableKey": "itsgf-impuesto-solidaridad-grandes-fortunas" }
]
```

- [ ] **Step 5: Revisar el JSON completo**

Run: `sed -n '1,260p' examples/modelo-714-impuesto-patrimonio.json`
Expected: estructura completa, sin placeholders, consistente con el contrato.

- [ ] **Step 6: Commit del objeto canónico**

```bash
git add examples/modelo-714-impuesto-patrimonio.json
git commit -m "feat(knowledge): author canonical modelo 714 knowledge object"
```

---

### Task 4: Crear helpers de derivación específicos de la historia

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-005b.mjs`
- Test: lectura de exports

- [ ] **Step 1: Crear el módulo helper**

Crear `scripts/lib/knowledge-object-story-kf-005b.mjs` reaprovechando el patrón de `scripts/lib/knowledge-object-story-kf-005a.mjs`.

Debe exportar al menos:

```js
export function loadModelo714KnowledgeObject() {}
export function buildModelo714PlannerView() {}
export function buildModelo714WebView() {}
export function buildModelo714AiContext() {}
export function buildModelo714ChecklistView() {}
export function buildModelo714FaqView() {}
export function buildModelo714ClientResponse() {}
export function validateModelo714Story() {}
```

- [ ] **Step 2: Reutilizar la lógica de canal ya existente**

Tomar como referencia las funciones de `005A` para:

```js
- filtrar por channel policy;
- excluir objetos o bloques obsolete;
- excluir blocked;
- excluir derived_only del consumo directo;
- derivar checklist, faq y client_response con guardas consistentes.
```

- [ ] **Step 3: Aislar el contenido doctrinal del `Modelo 714`**

Confirmar que el helper solo transforma y deriva, y no introduce otro modelo alternativo.

Run: `sed -n '1,260p' scripts/lib/knowledge-object-story-kf-005b.mjs`
Expected: responsabilidad única, sin mezcla de arquitectura.

- [ ] **Step 4: Commit del helper**

```bash
git add scripts/lib/knowledge-object-story-kf-005b.mjs
git commit -m "feat(knowledge): add modelo 714 derivation helpers"
```

---

### Task 5: Generar build y validación de historia

**Files:**
- Create: `scripts/build-story-kf-005b-artifacts.mjs`
- Create: `scripts/validate-story-kf-005b.mjs`
- Modify: `scripts/check.mjs`
- Test: comandos de build y validate

- [ ] **Step 1: Crear el script de build de artefactos**

Crear `scripts/build-story-kf-005b-artifacts.mjs` con el mismo patrón que `build-story-kf-005a-artifacts.mjs`, generando:

```text
examples/derived/modelo-714-planner-view.json
examples/derived/modelo-714-web-view.json
examples/derived/modelo-714-ai-context.json
examples/derived/modelo-714-checklist.json
examples/derived/modelo-714-faq.json
examples/derived/modelo-714-client-response.json
examples/derived/modelo-714-validation-report.json
examples/derived/modelo-714-incident-log.json
```

- [ ] **Step 2: Crear el script de validación**

Crear `scripts/validate-story-kf-005b.mjs` para ejecutar:

```js
- validación contra schema;
- domain/rule checks existentes;
- build de Planner/Web/AI/Checklist/FAQ/Client Response;
- comprobaciones mínimas de contenido esperado.
```

- [ ] **Step 3: Registrar la historia en el chequeo global**

Actualizar `scripts/check.mjs` para incluir `validate-story-kf-005b` si el patrón existente ya agrega historias productivas.

- [ ] **Step 4: Ejecutar build de artefactos**

Run: `node scripts/build-story-kf-005b-artifacts.mjs`
Expected: artefactos generados sin tocar contrato.

- [ ] **Step 5: Ejecutar validación de historia**

Run: `node scripts/validate-story-kf-005b.mjs`
Expected: `PASS`

- [ ] **Step 6: Commit de scripts de historia**

```bash
git add scripts/build-story-kf-005b-artifacts.mjs scripts/validate-story-kf-005b.mjs scripts/check.mjs examples/derived
git commit -m "feat(knowledge): add modelo 714 validation pipeline"
```

---

### Task 6: Añadir pruebas focales

**Files:**
- Create: `tests/modelo-714-story-kf-005b.test.mjs`
- Test: node test focal

- [ ] **Step 1: Crear la batería de tests**

Crear `tests/modelo-714-story-kf-005b.test.mjs` cubriendo como mínimo:

```js
import test from "node:test";
import assert from "node:assert/strict";
```

Casos mínimos:

```text
- el objeto valida contra el contrato;
- Planner View se genera;
- Web View se genera;
- AI Context se genera;
- Checklist derivada se genera;
- FAQ derivada se genera;
- Client Response derivada se genera;
- no se requieren cambios estructurales;
- la relación con ITSGF aparece como bloque conectado y no invade el núcleo completo;
- existe caso práctico de obligación real.
```

- [ ] **Step 2: Ejecutar el test focal**

Run: `node --test tests/modelo-714-story-kf-005b.test.mjs`
Expected: toda la suite focal en verde.

- [ ] **Step 3: Commit de las pruebas**

```bash
git add tests/modelo-714-story-kf-005b.test.mjs
git commit -m "test(knowledge): cover modelo 714 story outputs"
```

---

### Task 7: Redactar informe de validación y actualizar documentación

**Files:**
- Create: `docs/2026-07-18-story-kf-005b-validation-report.md`
- Create: `docs/2026-07-18-story-kf-005b-pr-draft.md`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Escribir el informe de validación**

Crear `docs/2026-07-18-story-kf-005b-validation-report.md` con este esquema:

```md
# STORY-KF-005B Validation Report

## Scope
## Evidence
## Schema Validation
## Rule Engine
## Derived Outputs
## Risks
## Final Status
```

- [ ] **Step 2: Escribir el borrador de PR**

Crear `docs/2026-07-18-story-kf-005b-pr-draft.md` con:

```md
## Summary
## Included
## Validation
## Architecture
## Certification
```

- [ ] **Step 3: Actualizar `README.md`**

Añadir referencia al nuevo objeto oficial `Modelo 714` y a sus derivaciones disponibles.

- [ ] **Step 4: Actualizar `CHANGELOG.md`**

Registrar `STORY-KF-005B` como tercer objeto productivo del repositorio.

- [ ] **Step 5: Commit de documentación**

```bash
git add docs/2026-07-18-story-kf-005b-validation-report.md docs/2026-07-18-story-kf-005b-pr-draft.md README.md CHANGELOG.md
git commit -m "docs(knowledge): document modelo 714 validation and pr draft"
```

---

### Task 8: Ejecutar el quality gate final

**Files:**
- Modify: ninguno adicional salvo ajustes si algo falla
- Test: validación final completa

- [ ] **Step 1: Ejecutar validación de historia**

Run: `node scripts/validate-story-kf-005b.mjs`
Expected: `PASS`

- [ ] **Step 2: Ejecutar test focal**

Run: `node --test tests/modelo-714-story-kf-005b.test.mjs`
Expected: `PASS`

- [ ] **Step 3: Ejecutar suite completa del paquete**

Run: `node scripts/check.mjs`
Expected: `PASS`

- [ ] **Step 4: Verificar sincronía y diff**

Run: `git diff --check`
Expected: `PASS`

- [ ] **Step 5: Revisar el alcance final del diff**

Run: `git diff --stat origin/main...HEAD`
Expected: solo archivos de `STORY-KF-005B` y actualizaciones compartidas mínimas (`README`, `CHANGELOG`, `scripts/check.mjs`, derivados).

---

### Task 9: Publicar rama y preparar Draft PR

**Files:**
- Modify: ninguno
- Test: rama remota y PR draft

- [ ] **Step 1: Verificar últimos commits**

Run: `git log --oneline -8`
Expected: secuencia limpia de dossier, objeto, helpers, validación, tests y docs.

- [ ] **Step 2: Publicar la rama**

Run: `git push -u origin story/kf-005b-modelo-714-knowledge-object`
Expected: rama remota disponible.

- [ ] **Step 3: Revisar el diff aislado**

Run: `git diff --stat origin/main...HEAD`
Expected: diff acotado a `Modelo 714`.

- [ ] **Step 4: Abrir la Draft PR**

Base: `main`
Head: `story/kf-005b-modelo-714-knowledge-object`
Title: `feat(knowledge): author canonical Modelo 714 knowledge object`

- [ ] **Step 5: Verificar contenido de la PR**

Checklist final:

```text
- sin cambios de contrato;
- sin cambios de arquitectura;
- sin cambios de consumidores;
- objeto canonico validado;
- derivaciones generadas;
- dossier juridico incluido;
- informe de validacion incluido;
- una unica historia, una unica rama, una unica Draft PR.
```

---

## Self-review

- Cobertura del spec: el plan cubre investigacion, objeto, derivaciones, validacion, pruebas, documentacion y PR unica.
- Placeholder scan: no quedan `TODO`, `TBD` ni referencias vagas; los nombres de archivo y comandos son concretos.
- Consistencia: todos los artefactos siguen el mismo patron de `005A`, pero con alcance doctrinal nuevo para `Modelo 714`.

## Execution handoff

Plan completo y guardado en `docs/2026-07-18-story-kf-005b-modelo-714-plan.md`.

Dos opciones de ejecución:

**1. Subagent-Driven (recomendada)** - vamos tarea por tarea, con revisión entre bloques.

**2. Inline Execution** - ejecuto el plan en esta sesión, por bloques más largos y con checkpoints.
