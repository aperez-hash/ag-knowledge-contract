## Summary

Authors the canonical Knowledge Object for:

**Modelo 151 - Regimen especial aplicable a los trabajadores, profesionales, emprendedores e inversores desplazados a territorio espanol**

The story reuses the certified Knowledge Factory v1 pipeline without modifying
the contract, schema, generated types, rule engine, consumers or architecture.

## Included

- Primary-source legal dossier for `Modelo 151`.
- Canonical object:
  `examples/modelo-151-regimen-trabajadores-desplazados.json`
- Story helper, builder and validator:
  - `scripts/lib/knowledge-object-story-kf-008c.mjs`
  - `scripts/build-story-kf-008c-artifacts.mjs`
  - `scripts/validate-story-kf-008c.mjs`
- Focused automated coverage:
  `tests/modelo-151-story-kf-008c.test.mjs`
- Derived artifacts in `examples/derived/`.
- Validation report and package documentation updates.

## Validation

- `validate-story-kf-008c`: `PASS`
- derived artifact build: `PASS`
- focused tests: `10/10 PASS`
- JSON canonical object parse: `PASS`

## Architecture

This PR does not modify:

- JSON Schema contract;
- generated types;
- block types;
- enums;
- taxonomies;
- rule engine;
- consumers;
- platform architecture.

The object keeps the approved design:

- regime-centered, not form-centered;
- `Modelo 149` as entry gate;
- `Modelo 151` as annual management output;
- explicit split between access and permanence;
- family layer as core domain;
- delegated analysis to `Residencia Fiscal` and `CDI`.

## Certification

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
Structural Changes ......... NO

STATUS

KNOWLEDGE OBJECT READY
```
