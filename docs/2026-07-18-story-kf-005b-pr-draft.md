# Draft PR - STORY-KF-005B

Base prevista: `main`
Head prevista: `story/kf-005b-modelo-714-knowledge-object`
Fecha: `2026-07-21`

## Titulo recomendado

`feat(knowledge): author canonical Modelo 714 knowledge object`

## Cuerpo recomendado

## Summary

Authors the third official Knowledge Object in the A&G Knowledge Library:

**Modelo 714 - Impuesto sobre el Patrimonio**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the architecture, the canonical contract, generated types or consumers.

## Included

- Primary-source research dossier for Modelo 714.
- Canonical Knowledge Object: `examples/modelo-714-impuesto-patrimonio.json`.
- Derived artifacts in `examples/derived/`.
- Story-level semantic validations.
- Focused tests.
- Validation report.
- README, CHANGELOG and package metadata updates.

## Validation

- `validate-story-kf-005b`: PASS
- Derived artifact build: PASS
- Focused STORY-KF-005B tests: 10/10 PASS
- `git diff --check`: PASS

## Architecture

This PR does not modify:

- JSON Schema contract
- generated types
- enums
- block taxonomy
- Rule Engine
- consumers
- platform architecture

## Scope

This PR authors the canonical Knowledge Object for Modelo 714, refreshes its primary-source dossier and leaves the derived outputs synchronized with the validated runtime.

It does not add:

- contract changes
- new block types
- new consumers
- UI
- web features
- AI orchestration
- procedural AEAT form-filling guidance

## Certification

```text
STORY-KF-005B

Knowledge Object: Modelo 714

Research: PASS
Schema Validation: PASS
Rule Engine: PASS
Planner View: PASS
Web View: PASS
AI Context: PASS
Checklist: PASS
FAQ: PASS
Client Response: PASS
Quality Gate: PASS
Structural Changes Required: NO

KNOWLEDGE OBJECT READY
```
