## Summary

Authors the canonical Knowledge Object for:

**IRNR - Ganancias Patrimoniales**

The implementation reuses the certified Knowledge Factory v1.0 contract and production pattern without changing the schema, generated types, block taxonomy, Rule Engine, consumers or platform architecture.

## Included

- Primary-source dossier for `IRNR - Ganancias Patrimoniales`.
- Canonical Knowledge Object: `examples/irnr-ganancias-patrimoniales.json`.
- Story helper: `scripts/lib/knowledge-object-story-kf-010c.mjs`.
- Artifact builder and validator entrypoints for `STORY-KF-010C`.
- Focused automated coverage for the new object and its derivations.
- Derived artifacts for Planner, Web, AI, Checklist, FAQ and Client Response.
- Validation report and story-level PR draft.
- README, changelog and package wiring updates.

## Validation

- `validate:story-kf-010c`: PASS
- Focused tests: `10/10 PASS`
- Derived artifact build: PASS

## Architecture

This PR does not modify:

- canonical JSON Schema;
- generated TypeScript types;
- enums;
- block types;
- Rule Engine;
- consumers;
- platform architecture.

## Certification

```text
STORY-KF-010C

Knowledge Object: IRNR - Ganancias Patrimoniales

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
