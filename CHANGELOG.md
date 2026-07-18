# Changelog

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
