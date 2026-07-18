# SCHEMA_ERROR corregido - 2026-07-18

## Resumen

El contrato canónico fallaba al compilar directamente con `Ajv 8` en modo
estricto bajo `JSON Schema Draft 2020-12`.

## Causa

La composición de bloques combinaba:

- `allOf`;
- cierres demasiado agresivos en niveles base;
- miembros compuestos sin tipado explícito de objeto.

Eso obligaba a introducir transformaciones runtime en los consumidores, algo
arquitectónicamente incorrecto para un contrato canónico.

## Corrección aplicada

- Se elimina el cierre base problemático.
- Se traslada el cierre efectivo al subtipo final con
  `unevaluatedProperties: false`.
- Se añade `type: object` en los miembros compuestos que definen propiedades.
- Se mantienen mixins explícitos (`WithSourceRefs`, `WithSummary`) en los
  bloques autorizados.

## Resultado esperado

- El schema compila directamente con `Ajv` estricto.
- El ejemplo canónico valida sin transformaciones previas.
- Los consumidores pueden depender del contrato sin reinterpretarlo.
