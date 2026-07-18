## Summary

Authors the second transversal Knowledge Object of Knowledge Factory cycle 2:

**Convenios para Evitar la Doble Imposicion (CDI)**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the contract, the schema, generated types, block taxonomy, rule engine or consumer architecture.

## Included

- Primary-source dossier for CDI:
  - `docs/research/2026-07-18-cdi-primary-sources.md`
- Canonical Knowledge Object:
  - `examples/convenios-doble-imposicion-cdi.json`
- Derived artifacts in `examples/derived/`
- Story-level validator and build scripts
- Focused automated coverage for STORY-KF-008B
- Validation report
- Package exports, scripts and documentation updates

## Validation

- `validate-story-kf-008b`: `PASS`
- focused tests: `11/11 PASS`
- full package check: `69/69 PASS`
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

This PR only introduces the canonical general-purpose CDI Knowledge Object and its derived outputs.

It does not include:

- contract changes
- new consumers
- UI
- Web-specific logic
- AI service logic
- country-by-country treaty analysis
- material income-category doctrine
- full permanent-establishment analysis
- downstream tax-liquidation logic

## Certification

```text
STORY-KF-008B

Knowledge Object: Convenios para Evitar la Doble Imposicion (CDI)
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
