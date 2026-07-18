# Modelo 721 Knowledge Object Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Producir el `Knowledge Object` canonico del `Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero`, validado contra `@ag/knowledge-contract@1.0.0`, con todas sus derivaciones y sin modificar contrato ni arquitectura.

**Architecture:** El trabajo reutiliza exactamente el armazon ya certificado de `Modelo 210`, `Modelo 720` y `Modelo 714`: dossier de fuentes primarias, objeto canonico en `examples/`, libreria de historia en `scripts/lib/`, scripts de build y validacion, test focal y artefactos derivados en `examples/derived/`. No se toca `schema`, `generated`, `Rule Engine`, taxonomias ni consumidores.

**Tech Stack:** JSON canonico validado contra `@ag/knowledge-contract@1.0.0`, scripts Node `.mjs`, Node test runner, pipeline local del repo `ag-knowledge-contract`.

---

## File structure

- Create: `docs/research/2026-07-18-modelo-721-primary-sources.md`
  - dossier juridico de fuentes primarias y criterio operativo base.
- Create: `examples/modelo-721-monedas-virtuales-extranjero.json`
  - `Knowledge Object` canonico del Modelo 721.
- Create: `scripts/lib/knowledge-object-story-kf-005c.mjs`
  - helper de historia para derivaciones y validaciones especificas.
- Create: `scripts/build-story-kf-005c-artifacts.mjs`
  - genera `Planner View`, `Web View`, `AI Context`, `Checklist`, `FAQ`, `Client Response`, `validation report` e `incident log`.
- Create: `scripts/validate-story-kf-005c.mjs`
  - valida el objeto y ejecuta el quality gate de historia.
- Create: `tests/modelo-721-story-kf-005c.test.mjs`
  - bateria focal de pruebas del objeto y de las derivaciones.
- Create: `docs/2026-07-18-story-kf-005c-validation-report.md`
  - informe humano de validacion y cierre.
- Create: `docs/2026-07-18-story-kf-005c-pr-draft.md`
  - borrador de PR.
- Modify: `examples/derived/`
  - incorporar los artefactos derivados del Modelo 721.
- Modify: `README.md`
  - registrar el nuevo objeto oficial y las derivaciones disponibles.
- Modify: `CHANGELOG.md`
  - registrar el corte de `STORY-KF-005C`.
- Modify: `package.json`
  - exportar el nuevo ejemplo y anadir scripts `build` / `validate` de `005C`.
- Modify: `scripts/check.mjs`
  - incluir la validacion de la historia en el chequeo global.

---

### Task 1: Confirmar base limpia de STORY-KF-005C

**Files:**
- Modify: ninguno
- Test: estado del repo y rama

- [ ] **Step 1: Confirmar el estado actual del worktree**

Run: `git status -sb`
Expected: rama `story/kf-005c-modelo-721-knowledge-object` sin residuos no relacionados.

- [ ] **Step 2: Verificar que la base ya incluye Modelo 714**

Run: `git log --oneline --decorate -5`
Expected: `origin/main` ya incorpora el merge de `STORY-KF-005B`.

- [ ] **Step 3: Confirmar rama activa**

Run: `git branch --show-current`
Expected: `story/kf-005c-modelo-721-knowledge-object`

- [ ] **Step 4: Verificar que no se toca contrato**

Run: `git diff --name-only origin/main...HEAD`
Expected: vacio o solo docs de diseno/plan antes de empezar a implementar.

---

### Task 2: Construir el dossier juridico primario

**Files:**
- Create: `docs/research/2026-07-18-modelo-721-primary-sources.md`
- Test: contraste entre fuentes y criterios del spec

- [ ] **Step 1: Escribir el esqueleto del dossier**

Crear `docs/research/2026-07-18-modelo-721-primary-sources.md` con esta estructura:

```md
# Modelo 721 - Primary Sources Dossier

## Scope

## AEAT

## Ley General Tributaria y Ley 11/2021

## RD 1065/2007

## Orden ministerial del Modelo 721

## FAQ y ayuda tecnica AEAT

## Jurisprudencia con impacto operativo

## Criterios consolidados para el Knowledge Object
```

- [ ] **Step 2: Incorporar fuentes primarias autorizadas**

Añadir al dossier, como minimo:

```md
- AEAT - Modelo 721, instrucciones oficiales, FAQ y ayuda tecnica.
- Ley 11/2021, de medidas de prevencion y lucha contra el fraude fiscal.
- Ley General Tributaria y la disposicion adicional decimoctava cuando resulte aplicable.
- RD 1065/2007 sobre obligaciones informativas relativas a monedas virtuales.
- Orden ministerial reguladora del Modelo 721.
```

- [ ] **Step 3: Fijar criterios operativos base**

Añadir una seccion de criterios consolidados con frases del tipo:

```md
- El objeto responde a si existe obligacion de presentar el Modelo 721.
- La residencia fiscal abre el analisis.
- La custodia y la plataforma extranjera son el nucleo operativo.
- El objeto no cubre tributacion de operaciones con criptoactivos.
- La diferencia con Modelo 720 debe quedar explicitada para evitar clasificaciones erróneas.
```

- [ ] **Step 4: Revisar coherencia del dossier**

Run: `sed -n '1,220p' docs/research/2026-07-18-modelo-721-primary-sources.md`
Expected: estructura completa, sin placeholders.

- [ ] **Step 5: Commit del dossier**

```bash
git add docs/research/2026-07-18-modelo-721-primary-sources.md
git commit -m "docs(knowledge): add modelo 721 primary source dossier"
```

---

### Task 3: Autorar el Knowledge Object canónico

**Files:**
- Create: `examples/modelo-721-monedas-virtuales-extranjero.json`
- Test: lectura estructural del JSON

- [ ] **Step 1: Crear la cabecera raíz del objeto**

Crear `examples/modelo-721-monedas-virtuales-extranjero.json` siguiendo el mismo patron de `Modelo 720` y `Modelo 714`, con esta forma inicial:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_modelo721_monedas_virtuales_extranjero_001",
    "stableKey": "modelo-721-monedas-virtuales-extranjero",
    "title": "Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero",
    "slug": "modelo-721-monedas-virtuales-situadas-en-el-extranjero",
    "language": "es",
    "jurisdiction": "ES"
  },
  "governance": {
    "status": "validado",
    "version": "1.0.0",
    "owner": "equipo-fiscal-activos-digitales",
    "approvedBy": "direccion-tecnica-fiscal",
    "reviewedAt": "2026-07-18T21:00:00Z",
    "changeReason": "Cuarto Knowledge Object productivo, dedicado a la obligacion informativa del Modelo 721"
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

Usar el mismo patron de politicas que en `Modelo 720` y `Modelo 714`, con contenido doctrinal nuevo y sin copiar texto. Deben quedar fijados:

```json
"classification": {
  "domain": "fiscal",
  "topic": "obligaciones-informativas",
  "subtopic": "modelo-721-monedas-virtuales-extranjero",
  "audience": "advisor",
  "sensitivity": "high",
  "keywords": [
    "modelo 721",
    "monedas virtuales",
    "custodia",
    "exchange extranjero",
    "obligacion informativa"
  ]
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
  { "type": "required_documentation" },
  { "type": "case_study" },
  { "type": "internal_reference" }
]
```

con:
- foco en residencia fiscal, sujeto obligado y custodia;
- diferencia entre plataformas extranjeras y españolas;
- umbral, primera obligacion, obligaciones posteriores y perdida de obligacion;
- diferencias practicas respecto al `Modelo 720`;
- cuatro casos practicos minimos, incluyendo cambio de residencia y varias plataformas.

- [ ] **Step 4: Completar `relations` y `auditMetadata`**

Añadir relaciones solo con objetos reales o planificados oficialmente:

```json
[
  { "relationType": "related", "targetStableKey": "residencia-fiscal" },
  { "relationType": "related", "targetStableKey": "modelo-720-bienes-derechos-extranjero" },
  { "relationType": "related", "targetStableKey": "modelo-714-impuesto-patrimonio" },
  { "relationType": "related", "targetStableKey": "irpf-ganancias-patrimoniales-criptoactivos" },
  { "relationType": "related", "targetStableKey": "convenios-doble-imposicion" }
]
```

- [ ] **Step 5: Revisar el JSON completo**

Run: `sed -n '1,260p' examples/modelo-721-monedas-virtuales-extranjero.json`
Expected: estructura completa, sin placeholders, consistente con el contrato.

- [ ] **Step 6: Commit del objeto canónico**

```bash
git add examples/modelo-721-monedas-virtuales-extranjero.json
git commit -m "feat(knowledge): author canonical modelo 721 knowledge object"
```

---

### Task 4: Crear helpers de derivación específicos de la historia

**Files:**
- Create: `scripts/lib/knowledge-object-story-kf-005c.mjs`
- Create: `scripts/build-story-kf-005c-artifacts.mjs`
- Create: `scripts/validate-story-kf-005c.mjs`
- Test: lectura de exports y validacion story

- [ ] **Step 1: Clonar la estructura de STORY-KF-005B**

Crear estos ficheros tomando como base el patron de `005B`:

```text
scripts/lib/knowledge-object-story-kf-005c.mjs
scripts/build-story-kf-005c-artifacts.mjs
scripts/validate-story-kf-005c.mjs
```

Reemplazos obligatorios:

```text
modelo-714 -> modelo-721
STORY-KF-005B -> STORY-KF-005C
Modelo 714 -> Modelo 721
```

- [ ] **Step 2: Fijar el helper al nuevo objeto**

En `scripts/lib/knowledge-object-story-kf-005c.mjs`, ajustar:

```js
const objectPath = path.join(
  rootDir,
  "examples",
  "modelo-721-monedas-virtuales-extranjero.json",
);
```

y las salidas derivadas:

```js
export const PLANNER_VIEW_PATH = path.join(DERIVED_DIR, "modelo-721-planner-view.json");
export const WEB_VIEW_PATH = path.join(DERIVED_DIR, "modelo-721-web-view.json");
export const AI_CONTEXT_PATH = path.join(DERIVED_DIR, "modelo-721-ai-context.json");
export const CHECKLIST_VIEW_PATH = path.join(DERIVED_DIR, "modelo-721-checklist.json");
export const FAQ_VIEW_PATH = path.join(DERIVED_DIR, "modelo-721-faq.json");
export const CLIENT_RESPONSE_PATH = path.join(DERIVED_DIR, "modelo-721-client-response.json");
export const VALIDATION_REPORT_PATH = path.join(DERIVED_DIR, "modelo-721-validation-report.json");
export const INCIDENT_LOG_PATH = path.join(DERIVED_DIR, "modelo-721-incident-log.json");
```

- [ ] **Step 3: Ajustar reglas semánticas de STORY-KF-005C**

La validacion semantica debe exigir, como minimo:

```text
- affectedTaxModels incluye 721 como modelo primario;
- affectedForms incluye 721;
- existe bloque faq con al menos 5 items;
- existe bloque risk con al menos 5 riesgos;
- existe bloque case_study con al menos 4 casos;
- hay relacion expresa con Modelo 720;
- hay relacion expresa con Modelo 714;
- el desarrollo tecnico menciona residencia fiscal;
- el desarrollo tecnico menciona custodia;
- el desarrollo tecnico menciona exchange extranjero o plataforma extranjera;
- el desarrollo tecnico menciona umbral;
- el desarrollo tecnico menciona presentaciones posteriores.
```

- [ ] **Step 4: Validar el helper**

Run: `sed -n '1,260p' scripts/lib/knowledge-object-story-kf-005c.mjs`
Expected: rutas, mensajes y reglas ya alineados con `Modelo 721`.

---

### Task 5: Añadir la batería focal de pruebas

**Files:**
- Create: `tests/modelo-721-story-kf-005c.test.mjs`
- Test: `node --test tests/modelo-721-story-kf-005c.test.mjs`

- [ ] **Step 1: Crear el test focal copiando el patrón de STORY-KF-005B**

Crear `tests/modelo-721-story-kf-005c.test.mjs` usando como base la bateria de `005B` y ajustando imports al helper `005C`.

- [ ] **Step 2: Adaptar expectativas al contenido del Modelo 721**

Añadir o ajustar expectativas para comprobar:

```text
- validacion schema del Modelo 721;
- validacion semantica `STORY-KF-005C`;
- Planner View con bloques operativos permitidos;
- Web View sin riesgos internos ni referencias internas;
- AI Context con criterio, procedimiento, riesgos y restricciones;
- checklist, faq y client response derivados;
- existencia de un caso practico de varias plataformas o cambio de residencia;
- informe final en PASS;
- sincronizacion de los ficheros derivados.
```

- [ ] **Step 3: Ejecutar el test focal**

Run: `node --test tests/modelo-721-story-kf-005c.test.mjs`
Expected: toda la bateria en verde, sin fallos.

---

### Task 6: Integrar STORY-KF-005C en el paquete

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `scripts/check.mjs`
- Test: lectura y chequeo global

- [ ] **Step 1: Exportar el nuevo ejemplo y scripts en `package.json`**

Añadir:

```json
"./examples/modelo-721-monedas-virtuales-extranjero.json": "./examples/modelo-721-monedas-virtuales-extranjero.json"
```

y scripts:

```json
"build:story-kf-005c": "node scripts/build-story-kf-005c-artifacts.mjs",
"validate:story-kf-005c": "node scripts/validate-story-kf-005c.mjs"
```

- [ ] **Step 2: Registrar STORY-KF-005C en `scripts/check.mjs`**

Añadir:

```js
run("validate:story-kf-005c", ["scripts/validate-story-kf-005c.mjs"]);
```

y el test focal:

```js
"tests/modelo-721-story-kf-005c.test.mjs",
```

- [ ] **Step 3: Actualizar `README.md`**

Registrar:

```text
- nuevo ejemplo `modelo-721-monedas-virtuales-extranjero.json`;
- nuevos scripts de build y validate;
- nuevo test focal de STORY-KF-005C.
```

- [ ] **Step 4: Actualizar `CHANGELOG.md`**

Añadir en `Unreleased`:

```text
- Fourth real Knowledge Object for `Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero`.
- Derived checklist, FAQ and client response outputs plus focused automated coverage for `STORY-KF-005C`.
```

- [ ] **Step 5: Revisar el diff integrado**

Run: `git diff --stat`
Expected: solo cambios de `005C` y metadatos compartidos del paquete.

---

### Task 7: Generar artefactos derivados y cerrar validación técnica

**Files:**
- Modify: `examples/derived/`
- Test: build story, validate story, check completo

- [ ] **Step 1: Generar artefactos derivados**

Run: `node scripts/build-story-kf-005c-artifacts.mjs`
Expected: se crean:

```text
examples/derived/modelo-721-planner-view.json
examples/derived/modelo-721-web-view.json
examples/derived/modelo-721-ai-context.json
examples/derived/modelo-721-checklist.json
examples/derived/modelo-721-faq.json
examples/derived/modelo-721-client-response.json
examples/derived/modelo-721-validation-report.json
examples/derived/modelo-721-incident-log.json
```

- [ ] **Step 2: Ejecutar la validación consolidada de la historia**

Run: `node scripts/validate-story-kf-005c.mjs`
Expected:

```json
{
  "story": "STORY-KF-005C",
  "qualityGate": "PASS",
  "structuralChangesRequired": "NO",
  "incidents": []
}
```

- [ ] **Step 3: Ejecutar el chequeo completo del paquete**

Run: `node scripts/check.mjs`
Expected: todas las historias y pruebas del repo en verde.

- [ ] **Step 4: Ejecutar comprobación de espacios y formato**

Run: `git diff --check`
Expected: sin errores de whitespace ni conflictos.

---

### Task 8: Documentar cierre y preparar la Draft PR

**Files:**
- Create: `docs/2026-07-18-story-kf-005c-validation-report.md`
- Create: `docs/2026-07-18-story-kf-005c-pr-draft.md`
- Test: lectura de docs

- [ ] **Step 1: Crear informe de validación**

Crear `docs/2026-07-18-story-kf-005c-validation-report.md` con esta estructura:

```md
# STORY-KF-005C - Validation report

Fecha: 2026-07-18
Historia: `STORY-KF-005C - Modelo 721 Knowledge Object`
Objeto: `Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero`

## Resultado

## Evidencia tecnica

## Validaciones ejecutadas

## Notas de alcance
```

- [ ] **Step 2: Crear borrador de PR**

Crear `docs/2026-07-18-story-kf-005c-pr-draft.md` con:

```md
# Draft PR - STORY-KF-005C

Base prevista: `main`
Head prevista: `story/kf-005c-modelo-721-knowledge-object`
Fecha: `2026-07-18`

## Titulo recomendado

`feat(knowledge): author canonical Modelo 721 knowledge object`
```

y cuerpo completo equivalente al de `005B`, pero referido a `Modelo 721`.

- [ ] **Step 3: Revisar ambos documentos**

Run: `sed -n '1,220p' docs/2026-07-18-story-kf-005c-validation-report.md`
Expected: informe completo y sin placeholders.

Run: `sed -n '1,220p' docs/2026-07-18-story-kf-005c-pr-draft.md`
Expected: borrador utilizable para GitHub sin ediciones de fondo.

---

### Task 9: Cerrar rama y publicar para PR

**Files:**
- Modify: todos los del corte
- Test: estado final de rama

- [ ] **Step 1: Revisar staging final**

Run: `git status --short`
Expected: solo archivos de `STORY-KF-005C`.

- [ ] **Step 2: Commit de cierre del microcorte**

```bash
git add .
git commit -m "feat(knowledge): author canonical modelo 721 knowledge object"
```

Si ya hubo varios commits intermedios, mantener historia trazable y no reescribirla salvo necesidad real.

- [ ] **Step 3: Publicar rama**

Run: `git push -u origin story/kf-005c-modelo-721-knowledge-object`
Expected: rama remota disponible.

- [ ] **Step 4: Revisar el diff aislado**

Run: `git diff --stat origin/main...HEAD`
Expected: diff acotado a `Modelo 721`.

- [ ] **Step 5: Abrir la Draft PR**

Base: `main`
Head: `story/kf-005c-modelo-721-knowledge-object`
Title: `feat(knowledge): author canonical Modelo 721 knowledge object`

- [ ] **Step 6: Verificar contenido de la PR**

Checklist final:

```text
- sin cambios de contrato;
- sin cambios de schema;
- sin cambios de generated;
- sin cambios de Rule Engine;
- sin cambios de consumidores;
- diff limitado a STORY-KF-005C;
- validacion local completa en verde.
```

---

## Self-review

- Cobertura de spec: el plan cubre dossier, objeto canonico, derivaciones, validadores, test focal, integracion en paquete, artefactos, informe y Draft PR.
- Placeholder scan: no quedan `TODO`, `TBD` ni referencias vacias.
- Consistencia: nombres de archivos, rama, helper, scripts y outputs quedan alineados con `STORY-KF-005C` y `modelo-721`.
