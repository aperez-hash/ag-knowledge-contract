# STORY-KF-005B - Validation report

Fecha: 2026-07-21
Historia: `STORY-KF-005B - Modelo 714 Knowledge Object`
Objeto: `Modelo 714 - Impuesto sobre el Patrimonio`

## Resultado

```text
STORY-KF-005B

Knowledge Object:
Modelo 714

Research .................... PASS
Knowledge Object ............ PASS
Schema Validation ........... PASS
Rule Engine ................. PASS
Planner View ............... PASS
Web View ................... PASS
AI Context ................. PASS
Checklist .................. PASS
FAQ ........................ PASS
Client Response ............ PASS
Quality Gate ............... PASS
Structural Changes ......... NO

STATUS

KNOWLEDGE OBJECT READY
```

## Evidencia tecnica

- `examples/modelo-714-impuesto-patrimonio.json` valida contra `@ag/knowledge-contract@1.0.0`.
- El dossier juridico de soporte queda actualizado y contrastado a `2026-07-21` en `docs/research/2026-07-18-modelo-714-primary-sources.md`.
- No se ha modificado:
  - `schema/knowledge-object.schema.json`
  - `generated/knowledge-object.generated.ts`
  - enums
  - bloques
  - Rule Engine canónico
  - consumidores
  - arquitectura
- Artefactos derivados generados:
  - `examples/derived/modelo-714-planner-view.json`
  - `examples/derived/modelo-714-web-view.json`
  - `examples/derived/modelo-714-ai-context.json`
  - `examples/derived/modelo-714-checklist.json`
  - `examples/derived/modelo-714-faq.json`
  - `examples/derived/modelo-714-client-response.json`
  - `examples/derived/modelo-714-validation-report.json`
  - `examples/derived/modelo-714-incident-log.json`

## Validaciones ejecutadas

- `node scripts/validate-story-kf-005b.mjs`
- `node scripts/build-story-kf-005b-artifacts.mjs`
- `node --test tests/modelo-714-story-kf-005b.test.mjs`
- `git diff --check`

## Resultado observado en esta validacion

- `validate-story-kf-005b`: `PASS`
- build de artefactos derivados `005B`: `PASS`
- test focal `tests/modelo-714-story-kf-005b.test.mjs`: `10/10 PASS`
- `incidentCount`: `0`
- `structuralChangesRequired`: `NO`

## Notas de alcance

- El objeto cubre exclusivamente el `Modelo 714 - Impuesto sobre el Patrimonio`.
- `ITSGF` solo se trata como relacion operativa conectada, no como objeto absorbido.
- `Modelo 720`, `Modelo 721`, `CRS`, `FATCA`, cumplimentacion de casillas AEAT, planificacion patrimonial internacional y regularizaciones inspectoras quedan fuera de alcance.
- La normativa autonómica se incorpora como criterio operativo profundo para identificar la regla aplicable, sin convertir el objeto en un catalogo exhaustivo por Comunidades Autónomas.
- La interaccion con expedientes por obligacion real queda reforzada con la referencia operativa a la doctrina reciente sobre el articulo `31.1` recogida por la `Orden HAC/277/2026`.
