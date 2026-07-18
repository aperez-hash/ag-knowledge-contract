## Summary

Authors the canonical Knowledge Object for:

**IRNR - Rendimientos del Trabajo**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the contract, the schema, generated types, block taxonomy, rule engine or consumer architecture.

## Included

- Primary-source dossier for IRNR work income:
  - `docs/research/2026-07-18-irnr-rendimientos-trabajo-primary-sources.md`
- Canonical Knowledge Object:
  - `examples/irnr-rendimientos-trabajo.json`
- Derived artifacts in `examples/derived/`
- Story-level validator and build scripts
- Focused automated coverage for STORY-KF-008D
- Validation report
- Package exports, scripts and documentation updates

## Validation

- `validate-story-kf-008d`: `PASS`
- focused tests: `10/10 PASS`
- full package check: `79/79 PASS`
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

This PR only introduces the canonical IRNR work-income Knowledge Object and its derived outputs.

It does not include:

- contract changes
- new consumers
- UI
- Web-specific logic
- AI service logic
- full Modelo 210 completion guidance
- other IRNR categories of income
- downstream tax-liquidation logic

## Certification

```text
STORY-KF-008D

Knowledge Object: IRNR - Rendimientos del Trabajo
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
