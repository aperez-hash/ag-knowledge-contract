# STORY-KF-006 - Modelo 721 Controlled Review

## Estado

`STATUS: CERTIFIED`

## Specification

`KF-006` revisa el Knowledge Object existente del Modelo 721 como revision controlada, no como objeto duplicado. El objeto conserva:

- `knowledgeObjectId`: `ko_es_modelo721_monedas_virtuales_001`;
- `stableKey`: `modelo-721-monedas-virtuales-extranjero`;
- contrato publico y schema sin cambios;
- derivaciones existentes para Planner, Web, IA, checklist, FAQ y client response.

La version canonica pasa de `1.0.0` a `1.1.0`.

## Knowledge Object Design

La revision refuerza cuatro zonas:

- base legal: incorpora referencia expresa a la disposicion adicional decimoctava LGT y a la Orden HAC/1504/2024;
- desarrollo tecnico: explicita exenciones reglamentarias, informacion individualizada por moneda virtual y separacion entre dinero fiduciario y Modelo 721;
- procedimiento: fija el plazo operativo vigente del 1 de enero al 31 de marzo y la extension tecnica AEAT cuando proceda;
- ejemplos: anade caso de saldo fiduciario en exchange extranjero para evitar arrastrarlo indebidamente al Modelo 721.

## Implementation

Ficheros principales:

- `examples/modelo-721-monedas-virtuales.json`;
- `tests/modelo-721-story-kf-006.test.mjs`;
- `scripts/validate-story-kf-006.mjs`;
- `scripts/check.mjs`;
- `docs/research/2026-07-21-modelo-721-kf-006-primary-sources.md`;
- `docs/2026-07-21-story-kf-006-validation-report.md`.

No se han modificado:

- `schema/knowledge-object.schema.json`;
- `generated/knowledge-object.generated.ts`;
- contratos publicos;
- Planner;
- Decision Engine;
- Knowledge Resolver;
- consumidores especificos.

## Examples

El objeto mantiene los casos anteriores y anade `case721-005`:

- saldo fiduciario en exchange extranjero;
- no declaracion en Modelo 721 por no ser moneda virtual;
- apertura, si procede, de analisis separado del Modelo 720.

## Tests

`KF-006` queda cubierto por:

- validacion JSON Schema;
- reglas semanticas heredadas del objeto Modelo 721;
- pruebas especificas de versionado, trazabilidad normativa 2026, exenciones, dinero fiduciario y derivaciones;
- chequeo general `scripts/check.mjs`.

## Certification

El objeto queda certificado como revision controlada porque:

- normativa identificada;
- aplicabilidad determinista;
- ejemplos representativos ampliados;
- tests en PASS;
- documentacion completa;
- trazabilidad normativa reforzada;
- arquitectura sin cambios.
