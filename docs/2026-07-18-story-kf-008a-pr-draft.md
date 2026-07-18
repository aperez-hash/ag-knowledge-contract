## Summary

Authors the first transversal Knowledge Object of Knowledge Factory cycle 2:

**Residencia Fiscal en Espana**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the contract, the schema, generated types, block taxonomy, rule engine or consumer architecture.

## Included

- Primary-source dossier for Residencia Fiscal:
  - `docs/research/2026-07-18-residencia-fiscal-primary-sources.md`
- Canonical Knowledge Object:
  - `examples/residencia-fiscal-espana.json`
- Derived artifacts in `examples/derived/`
- Story-level validator and build scripts
- Focused automated coverage for STORY-KF-008A
- Validation report
- Package exports, scripts and documentation updates

## Validation

- `validate-story-kf-008a`: `PASS`
- focused tests: `10/10 PASS`
- full package check: `58/58 PASS`
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

This PR only introduces the canonical `Residencia Fiscal en Espana` Knowledge Object and its derived outputs.

It does not include:

- contract changes
- new consumers
- UI
- Web-specific logic
- AI service logic
- tax calculation engines
- treaty-by-treaty analysis
- downstream tax-liquidation logic

## Certification

```text
STORY-KF-008A

Knowledge Object: Residencia Fiscal en Espana
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
