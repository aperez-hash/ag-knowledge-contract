## Summary

Authors the fourth official Knowledge Object in the A&G Knowledge Library:

**Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the contract, the schema, generated types, block taxonomy, rule engine or consumer architecture.

## Included

- Primary-source dossier for Modelo 721:
  - `docs/research/2026-07-18-modelo-721-primary-sources.md`
- Canonical Knowledge Object:
  - `examples/modelo-721-monedas-virtuales.json`
- Derived artifacts in `examples/derived/`
- Story-level validator and build scripts
- Focused automated coverage for STORY-KF-005C
- Validation report
- Package exports, scripts and documentation updates

## Validation

- `validate-story-kf-005c`: `PASS`
- focused tests: `10/10 PASS`
- full package check: `48/48 PASS`
- `git diff --check`: `PASS`

## Architecture

This PR does not modify:

- JSON Schema contract
- generated types
- enums
- block types
- taxonomies
- rule engine
- Planner consumer
- platform architecture

## Scope

This PR only introduces the canonical Modelo 721 Knowledge Object and its derived outputs.

It does not include:

- contract changes
- new consumers
- UI
- Web-specific logic
- AI service logic
- tax calculation engines
- non-721 cripto taxation content

## Certification

```text
STORY-KF-005C

Knowledge Object: Modelo 721
Schema Validation: PASS
Rule Engine: PASS
Planner View: PASS
Web View: PASS
AI Context: PASS
Checklist: PASS
FAQ: PASS
Client Response: PASS
Structural Changes Required: NO

KNOWLEDGE OBJECT READY
```
