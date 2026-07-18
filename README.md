# A&G Knowledge Contract

Soporte neutral y versionado del contrato canónico de Knowledge Factory.

## Propósito

Este paquete existe para que `Planner`, `Web` y futuros consumidores de `IA`
compartan exactamente el mismo contrato sin duplicar modelos ni depender de
rutas locales del workspace.

La fuente canónica única es:

`schema/knowledge-object.schema.json`

Regla de gobierno:

```text
JSON Schema
    ↓
TypeScript generado
    ↓
Consumidores
```

## Qué contiene

- `schema/knowledge-object.schema.json`: contrato estructural canónico.
- `generated/knowledge-object.generated.ts`: tipos TypeScript derivados.
- `examples/modelo-210-imputacion-rentas.json`: ejemplo técnico canónico.
- `scripts/generate-types.mjs`: generación reproducible de tipos.
- `scripts/validate-example.mjs`: validación estricta del ejemplo.
- `tests/knowledge-object.schema.test.mjs`: pruebas del contrato.
- `docs/SCHEMA_ERROR_2026-07-18.md`: explicación del defecto corregido.

## Principios

- El schema JSON manda.
- Los tipos generados no se editan manualmente.
- `Ajv 8` compila el schema directamente en modo estricto.
- No se usan transformaciones runtime, `merge-allof` ni reinterpretaciones de
  `additionalProperties`.

## Uso

### Generar tipos

```bash
npm run generate
```

### Verificar sincronía schema -> tipos

```bash
npm run generate:check
```

### Validar el ejemplo canónico

```bash
npm run validate:example
```

### Ejecutar pruebas del contrato

```bash
npm test
```

### Ejecutar la comprobación completa

```bash
npm run check
```

## Consumo desde otros repositorios

Este paquete está pensado para ser consumido desde un soporte versionado:

- dependencia Git versionada;
- paquete `workspace:*` en un monorepo real;
- artefacto versionado.

No deben usarse:

- rutas absolutas;
- `file:/Users/...`;
- copias manuales sin trazabilidad;
- symlinks locales como solución definitiva.

## Compatibilidad

- `Planner`: consumidor operativo interno con filtrado por canal.
- `Web`: futuro consumidor derivado.
- `IA`: futuro consumidor con las mismas restricciones del contrato.

El contrato no pertenece a ninguno de esos consumidores; todos dependen de él.

## Política de cambios

- Cualquier cambio del schema requiere PR propia.
- El cambio del schema obliga a regenerar `generated/`.
- Los consumidores no pueden añadir campos canónicos por su cuenta.
- La lógica de negocio y permisos avanzados vive fuera del schema estructural.

## Versionado

La versión `1.0.0` es la primera versión ejecutable certificada del contrato
canónico en soporte Git neutral.

## No editar manualmente

No editar manualmente:

`generated/knowledge-object.generated.ts`

Debe regenerarse siempre desde:

`schema/knowledge-object.schema.json`
