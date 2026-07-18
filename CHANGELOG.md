# Changelog

## Unreleased

### Added

- First real Knowledge Object for `Modelo 210 - Imputacion de rentas inmobiliarias de no residentes`.
- Second real Knowledge Object for `Modelo 720 - Declaracion informativa sobre bienes y derechos situados en el extranjero`.
- Third real Knowledge Object for `Modelo 714 - Impuesto sobre el Patrimonio`.
- Derived certified artifacts for Planner, Web and IA under `examples/derived/`.
- Story-level semantic validation and focused automated coverage for `STORY-KF-004A`.
- Derived checklist, FAQ and client response outputs plus focused automated coverage for `STORY-KF-005A`.
- Derived checklist, FAQ and client response outputs plus focused automated coverage for `STORY-KF-005B`.
- Official governance certification document for `Knowledge Factory v1.0`.

## 1.0.0 - 2026-07-18

### Added

- First neutral Git-backed package for the canonical Knowledge Factory contract.
- Reproducible type generation from the canonical JSON Schema.
- Strict example validation with Ajv 8 / Draft 2020-12.
- Contract-focused automated tests and schema error documentation.

### Fixed

- Corrected block composition under JSON Schema Draft 2020-12.
- Replaced base-level `additionalProperties: false` with final subtype closure using `unevaluatedProperties: false`.
- Added explicit object typing to composed schema members.
- Enabled direct strict Ajv compilation without runtime schema transformation.
