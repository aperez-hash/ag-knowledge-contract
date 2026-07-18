# STORY-KF-005A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el Knowledge Object canónico de `Modelo 720` y demostrar que genera todas las vistas derivadas requeridas sin cambiar el contrato ni la arquitectura.

**Architecture:** Reutilizar el armazón certificado en `STORY-KF-004A`, desacoplando el pipeline para soportar un segundo objeto real y nuevas derivaciones (`Checklist`, `FAQ`, `Client Response`) sin tocar `schema`, tipos generados ni consumidores. Todo el contenido debe vivir en un único `KnowledgeObject`, y todas las vistas se derivan desde él.

**Tech Stack:** JSON Schema Draft 2020-12, TypeScript generado, Node.js ESM, Ajv 8 strict, node:test, GitHub repo `ag-knowledge-contract`.

---

## File Structure

### Existing files to modify

- Modify: `docs/2026-07-18-story-kf-005a-modelo-720-design.md`
  - Referencia funcional ya aprobada; mantenerla como spec de apoyo si hace falta ajustar una nota menor tras la investigación.
- Modify: `README.md`
  - Reflejar que el repo ya soporta más de un objeto real y más de una derivación.
- Modify: `CHANGELOG.md`
  - Registrar el alta del objeto `Modelo 720` y del pipeline derivado ampliado.
- Modify: `package.json`
  - Añadir scripts específicos o generalizados para validar y derivar `Modelo 720`.
- Modify: `scripts/check.mjs`
  - Incluir la validación de `STORY-KF-005A` en el chequeo completo del repo.
- Modify: `scripts/lib/knowledge-object-story-kf-004a.mjs`
  - Extraer o generalizar lo mínimo para soportar un segundo objeto y derivaciones nuevas sin acoplarse a `Modelo 210`.
- Modify: `tests/modelo-210-story-kf-004a.test.mjs`
  - Ajustar solo si la generalización del pipeline requiere pequeñas adaptaciones no funcionales.

### New files to create

- Create: `docs/research/2026-07-18-modelo-720-primary-sources.md`
  - Dossier técnico de fuentes primarias usadas.
- Create: `examples/modelo-720-bienes-extranjero.json`
  - Segundo Knowledge Object oficial.
- Create: `examples/derived/modelo-720-planner-view.json`
- Create: `examples/derived/modelo-720-web-view.json`
- Create: `examples/derived/modelo-720-ai-context.json`
- Create: `examples/derived/modelo-720-checklist.json`
- Create: `examples/derived/modelo-720-faq.json`
- Create: `examples/derived/modelo-720-client-response.json`
- Create: `examples/derived/modelo-720-validation-report.json`
- Create: `examples/derived/modelo-720-incident-log.json`
- Create: `scripts/build-story-kf-005a-artifacts.mjs`
  - Builder reproducible de artefactos del Modelo 720.
- Create: `scripts/validate-story-kf-005a.mjs`
  - Validación consolidada de la historia.
- Create: `tests/modelo-720-story-kf-005a.test.mjs`
  - Cobertura focal del objeto y sus derivaciones.

### Files that must not change

- Do not modify: `schema/knowledge-object.schema.json`
- Do not modify: `generated/knowledge-object.generated.ts`
- Do not modify: contrato publicado o enums
- Do not modify: consumidores de `Planner`, `Web` o `AI` fuera del repo neutral

---

### Task 1: Preparar rama y baseline limpio

**Files:**
- Modify: none
- Verify: `git status`, `git branch --show-current`

- [ ] **Step 1: Confirmar rama de trabajo única**

Run:

```bash
git branch --show-current
```

Expected: una rama dedicada a `STORY-KF-005A`; si aún no existe, crearla después de revisar el baseline.

- [ ] **Step 2: Verificar baseline limpio**

Run:

```bash
git status --short --branch
git diff --check
```

Expected: sin cambios ajenos pendientes que puedan contaminar la historia.

- [ ] **Step 3: Commit**

No commit en esta tarea si el baseline ya está limpio.

---

### Task 2: Investigación documental primaria

**Files:**
- Create: `docs/research/2026-07-18-modelo-720-primary-sources.md`
- Reference: `docs/2026-07-18-story-kf-005a-modelo-720-design.md`

- [ ] **Step 1: Reunir y registrar fuentes primarias**

Documentar en el dossier:

```md
# Modelo 720 - Fuentes primarias

## AEAT
- pagina principal del Modelo 720
- instrucciones oficiales
- ayuda técnica

## Legislación
- LGT, disposición adicional 18.ª
- RD 1065/2007, arts. 42 bis, 42 ter y 54 bis
- Orden HAP/72/2013 y cambios vigentes

## Jurisprudencia
- TJUE, asunto C-788/19 y efectos prácticos sobre el régimen sancionador

## Notas de uso
- qué parte se usa para obligación
- qué parte se usa para umbrales
- qué parte se usa para pérdida de obligación
```

- [ ] **Step 2: Revisar que no entren fuentes secundarias innecesarias**

Run a manual check on the draft file.

Expected: solo fuentes primarias y jurisprudencia determinante.

- [ ] **Step 3: Commit**

```bash
git add docs/research/2026-07-18-modelo-720-primary-sources.md
git commit -m "docs(knowledge): add modelo 720 primary source dossier"
```

---

### Task 3: Modelar el Knowledge Object canónico

**Files:**
- Create: `examples/modelo-720-bienes-extranjero.json`
- Reference: `examples/modelo-210-imputacion-rentas.json`
- Reference: `docs/research/2026-07-18-modelo-720-primary-sources.md`

- [ ] **Step 1: Escribir el objeto raíz completo**

Crear el fichero con esta estructura mínima:

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

- [ ] **Step 2: Completar identidad, gobierno, clasificación y políticas**

Rellenar:

```json
{
  "identity": {
    "knowledgeObjectId": "ko_es_modelo720_bienes_extranjero_001",
    "stableKey": "modelo-720-bienes-extranjero",
    "title": "Modelo 720 - Declaracion informativa sobre bienes y derechos situados en el extranjero",
    "slug": "modelo-720-bienes-derechos-situados-extranjero",
    "language": "es",
    "jurisdiction": "ES"
  }
}
```

Mantener `governance.status` en `validado`.

- [ ] **Step 3: Completar todos los bloques obligatorios**

Incluir al menos:

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

Expected: sin bloques nuevos, sin inventar tipos.

- [ ] **Step 4: Validar manualmente cobertura mínima del contenido**

Checklist de cobertura:

```text
finalidad del 720
sujetos obligados
bienes incluidos
bienes excluidos
tres bloques
umbral 50.000
regla 20.000
primera presentación
presentaciones posteriores
pérdida de obligación
exoneraciones
cotitularidad
residencia fiscal
efecto práctico TJUE
errores frecuentes
documentación
procedimiento completo
```

- [ ] **Step 5: Commit**

```bash
git add examples/modelo-720-bienes-extranjero.json
git commit -m "feat(knowledge): add canonical modelo 720 knowledge object"
```

---

### Task 4: Generalizar el pipeline derivado sin tocar arquitectura

**Files:**
- Modify: `scripts/lib/knowledge-object-story-kf-004a.mjs`
- Create: `scripts/build-story-kf-005a-artifacts.mjs`
- Create: `scripts/validate-story-kf-005a.mjs`

- [ ] **Step 1: Extraer helpers reutilizables del pipeline actual**

Mover a funciones neutras lo que hoy esté acoplado a `Modelo 210`:

```js
loadKnowledgeObject(...)
validateSchemaRuntime(...)
buildPlannerView(...)
buildWebView(...)
buildAiContext(...)
```

Expected: el armazón sirve tanto para `Modelo 210` como para `Modelo 720`.

- [ ] **Step 2: Añadir derivaciones nuevas**

Implementar salidas adicionales:

```js
buildChecklistView(...)
buildFaqView(...)
buildClientResponseView(...)
```

Rules:
- `Checklist`: solo salida derivada del bloque `checklist`
- `FAQ`: solo salida derivada del bloque `faq`
- `Client Response`: borrador derivado, nunca texto bruto canónico

- [ ] **Step 3: Crear builder específico de STORY-KF-005A**

El script debe generar:

```text
modelo-720-planner-view.json
modelo-720-web-view.json
modelo-720-ai-context.json
modelo-720-checklist.json
modelo-720-faq.json
modelo-720-client-response.json
modelo-720-validation-report.json
modelo-720-incident-log.json
```

- [ ] **Step 4: Crear validador consolidado de STORY-KF-005A**

Debe devolver:

```json
{
  "story": "STORY-KF-005A",
  "schemaValidation": "PASS",
  "ruleEngine": "PASS",
  "plannerView": "PASS",
  "webView": "PASS",
  "aiContext": "PASS",
  "checklist": "PASS",
  "faq": "PASS",
  "clientResponse": "PASS",
  "structuralChangesRequired": "NO"
}
```

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/knowledge-object-story-kf-004a.mjs scripts/build-story-kf-005a-artifacts.mjs scripts/validate-story-kf-005a.mjs
git commit -m "feat(knowledge): derive modelo 720 knowledge artifacts"
```

---

### Task 5: Añadir reglas semánticas de STORY-KF-005A

**Files:**
- Modify: `scripts/lib/knowledge-object-story-kf-004a.mjs`
- Test: `tests/modelo-720-story-kf-005a.test.mjs`

- [ ] **Step 1: Codificar validación semántica específica**

La historia debe exigir:

```text
4 casos mínimo
FAQ reales
separación de documentación obligatoria / recomendable
riesgos con categorías obligatorias
relaciones solo reales o planificadas oficialmente
sin cambios estructurales
```

- [ ] **Step 2: Resolver las categorías de riesgo sin tocar contrato**

Representar `categoria` y `condicion de activacion` dentro del contenido del
riesgo y validar esa presencia en la capa de historia.

Expected: no se modifica `RiskItem` del contrato.

- [ ] **Step 3: Commit**

```bash
git add scripts/lib/knowledge-object-story-kf-004a.mjs
git commit -m "test(knowledge): enforce modelo 720 semantic rules"
```

---

### Task 6: Generar artefactos derivados

**Files:**
- Create: `examples/derived/modelo-720-*.json`

- [ ] **Step 1: Ejecutar builder de STORY-KF-005A**

Run:

```bash
node scripts/build-story-kf-005a-artifacts.mjs
```

Expected: los ocho artefactos derivados aparecen en `examples/derived/`.

- [ ] **Step 2: Verificar informe e incident log**

Run:

```bash
sed -n '1,220p' examples/derived/modelo-720-validation-report.json
sed -n '1,220p' examples/derived/modelo-720-incident-log.json
```

Expected: `PASS` general e incidentes vacíos o justificados.

- [ ] **Step 3: Commit**

```bash
git add examples/derived/modelo-720-*.json
git commit -m "feat(knowledge): publish modelo 720 derived artifacts"
```

---

### Task 7: Cobertura automatizada focal

**Files:**
- Create: `tests/modelo-720-story-kf-005a.test.mjs`
- Modify: `package.json`
- Modify: `scripts/check.mjs`

- [ ] **Step 1: Escribir pruebas focales**

Cubrir como mínimo:

```text
schema validation
semantic rule validation
planner derivation
web derivation
ai context derivation
checklist derivation
faq derivation
client response derivation
validation report PASS
incident log vacío
```

- [ ] **Step 2: Añadir scripts del paquete**

Incluir comandos tipo:

```json
{
  "scripts": {
    "build:story-kf-005a": "...",
    "validate:story-kf-005a": "..."
  }
}
```

- [ ] **Step 3: Integrar la historia en `scripts/check.mjs`**

Expected: el chequeo completo también valida `Modelo 720`.

- [ ] **Step 4: Commit**

```bash
git add tests/modelo-720-story-kf-005a.test.mjs package.json scripts/check.mjs
git commit -m "test(knowledge): cover modelo 720 story flow"
```

---

### Task 8: Quality Gate técnico y editorial

**Files:**
- Modify: none unless bugs are found
- Verify: generated artifacts and source object

- [ ] **Step 1: Ejecutar validación consolidada**

Run:

```bash
node scripts/validate-story-kf-005a.mjs
```

Expected: todo en `PASS`.

- [ ] **Step 2: Ejecutar suite del repo**

Run:

```bash
node scripts/check.mjs
```

Expected: chequeo global en verde sin modificar contrato.

- [ ] **Step 3: Revisión editorial manual**

Verificar:

```text
precisión jurídica
coherencia interna
ausencia de contradicciones
trazabilidad normativa
neutralidad de canal
sin duplicaciones doctrinales
```

- [ ] **Step 4: Commit de cierre si hubo ajustes**

```bash
git add -A
git commit -m "fix(knowledge): close modelo 720 quality gate"
```

---

### Task 9: Cierre de rama y Draft PR única

**Files:**
- Modify: optional PR draft markdown if repository convention requires it

- [ ] **Step 1: Verificar diff final**

Run:

```bash
git status --short
git diff --stat origin/story/kf-004a-modelo-210-knowledge-object...HEAD
git diff --check
```

Expected: diff limitado a `STORY-KF-005A`.

- [ ] **Step 2: Publicar rama**

Run:

```bash
git push -u origin <branch-name>
```

Expected: rama remota disponible.

- [ ] **Step 3: Abrir una única Draft PR**

Base recomendada:

```text
story/kf-004a-modelo-210-knowledge-object
```

Solo cambiar a `main` cuando la secuencia de ramas previas ya esté integrada y
la compare quede limpia.

- [ ] **Step 4: No iniciar el siguiente Knowledge Object**

Expected: `Modelo 720` queda completamente certificado antes de abrir el
siguiente objeto.

---

## Self-Review

- La spec funcional queda cubierta por investigación, modelado, derivaciones,
  validación y quality gate.
- No hay placeholders estructurales.
- El plan mantiene congelado el contrato y toda la arquitectura.
- La generalización del pipeline está acotada a soportar un segundo objeto y
  nuevas derivaciones, sin rediseño de plataforma.

## Execution Handoff

Plan complete and saved to `docs/2026-07-18-story-kf-005a-modelo-720-plan.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
