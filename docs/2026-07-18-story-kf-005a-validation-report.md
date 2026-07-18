# STORY-KF-005A - Validation report

Fecha: 2026-07-18
Historia: `STORY-KF-005A - Modelo 720 Knowledge Object`
Objeto: `Modelo 720 - Declaracion informativa sobre bienes y derechos situados en el extranjero`

## Resultado

```text
STORY-KF-005A

Knowledge Object:
Modelo 720

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

- `examples/modelo-720-bienes-extranjero.json` valida contra `@ag/knowledge-contract@1.0.0`.
- No se ha modificado:
  - `schema/knowledge-object.schema.json`
  - `generated/knowledge-object.generated.ts`
  - enums
  - bloques
  - Rule Engine canónico
  - consumidores
  - arquitectura
- Artefactos derivados generados:
  - `examples/derived/modelo-720-planner-view.json`
  - `examples/derived/modelo-720-web-view.json`
  - `examples/derived/modelo-720-ai-context.json`
  - `examples/derived/modelo-720-checklist.json`
  - `examples/derived/modelo-720-faq.json`
  - `examples/derived/modelo-720-client-response.json`
  - `examples/derived/modelo-720-validation-report.json`
  - `examples/derived/modelo-720-incident-log.json`

## Validaciones ejecutadas

- `node scripts/validate-story-kf-005a.mjs`
- `node scripts/build-story-kf-005a-artifacts.mjs`
- `node --test tests/modelo-720-story-kf-005a.test.mjs`
- `node scripts/check.mjs`
- `git diff --check`

## Notas de alcance

- El objeto cubre exclusivamente el `Modelo 720`.
- `Modelo 721`, `CRS`, `FATCA`, `Modelo 714`, regularizaciones inspectoras y delito fiscal quedan fuera de alcance.
- La sentencia del `TJUE C-788/19` se usa solo para explicar el efecto practico del marco vigente y evitar describir como actual un regimen sancionador ya corregido.
