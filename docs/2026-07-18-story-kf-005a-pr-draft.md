# Draft PR - STORY-KF-005A

Base prevista: `main`
Head prevista: `story/kf-005a-modelo-720-knowledge-object`
Fecha: `2026-07-18`

## Importante sobre el alcance real

La rama `main` del repositorio neutral sigue en el commit inicial `67ad06a`.

Por tanto, una PR abierta hoy desde `story/kf-005a-modelo-720-knowledge-object`
contra `main` no mostrara un diff limitado solo a `STORY-KF-005A`.

Mostrara, en la misma compare:

- la publicacion del contrato canónico versionado;
- el primer Knowledge Object real (`Modelo 210`);
- la certificacion documental de `Knowledge Factory v1.0`;
- el dossier y la implementacion de `STORY-KF-005A - Modelo 720`.

Si se desea una PR estrictamente aislada de `005A`, antes haria falta:

1. fusionar a `main` el corte fundacional previo; o
2. reordenar la estrategia en PRs apiladas.

Mientras `main` no incorpore esos cortes, la PR correcta es funcionalmente valida,
pero su alcance real es acumulado.

## Titulo recomendado

`feat(knowledge): author canonical Modelo 720 knowledge object`

## Cuerpo recomendado

## Summary

Authors the second official Knowledge Object in the A&G Knowledge Library:

**Modelo 720 — Declaración informativa sobre bienes y derechos situados en el extranjero**

The implementation reuses the certified Knowledge Factory v1.0 pipeline without changing the architecture or contract.

## Included

- Primary-source research dossier for Modelo 720.
- Canonical Knowledge Object: `examples/modelo-720-bienes-extranjero.json`.
- Derived artifacts in `examples/derived/`.
- Story-level semantic validations.
- Focused tests.
- Validation report.
- README and CHANGELOG updates.

## Validation

- `validate-story-kf-005a`: PASS
- Derived artifact build: PASS
- Focused STORY-KF-005A tests: 8/8 PASS
- Full package tests: 27/27 PASS
- `git diff --check`: PASS

## Architecture

This PR does not modify:

- JSON Schema contract;
- generated types;
- enums;
- block types;
- Rule Engine;
- consumers;
- platform architecture.

## Certification

STORY-KF-005A

Knowledge Object: Modelo 720

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

## Scope note

Because `main` is still at the repository bootstrap commit, this compare also includes the previously prepared contract foundation and earlier Knowledge Factory assets required for the new object to exist in the neutral repository.
