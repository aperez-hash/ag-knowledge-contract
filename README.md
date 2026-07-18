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
- `examples/modelo-210-imputacion-rentas.json`: primer Knowledge Object real de referencia.
- `examples/modelo-720-bienes-extranjero.json`: segundo Knowledge Object real de referencia.
- `examples/modelo-714-impuesto-patrimonio.json`: tercer Knowledge Object real de referencia.
- `examples/modelo-721-monedas-virtuales.json`: cuarto Knowledge Object real de referencia.
- `examples/residencia-fiscal-espana.json`: primer Knowledge Object transversal del segundo ciclo, dedicado a la residencia fiscal de personas fisicas en Espana.
- `examples/derived/`: salidas derivadas certificadas para Planner, Web e IA.
- `scripts/generate-types.mjs`: generación reproducible de tipos.
- `scripts/validate-example.mjs`: validación estricta del ejemplo.
- `scripts/build-story-kf-004a-artifacts.mjs`: generación reproducible de artefactos derivados.
- `scripts/validate-story-kf-004a.mjs`: validación consolidada de STORY-KF-004A.
- `scripts/build-story-kf-005a-artifacts.mjs`: generación reproducible de artefactos derivados del Modelo 720.
- `scripts/validate-story-kf-005a.mjs`: validación consolidada de STORY-KF-005A.
- `scripts/build-story-kf-005b-artifacts.mjs`: generación reproducible de artefactos derivados del Modelo 714.
- `scripts/validate-story-kf-005b.mjs`: validación consolidada de STORY-KF-005B.
- `scripts/build-story-kf-005c-artifacts.mjs`: generación reproducible de artefactos derivados del Modelo 721.
- `scripts/validate-story-kf-005c.mjs`: validación consolidada de STORY-KF-005C.
- `scripts/build-story-kf-008a-artifacts.mjs`: generación reproducible de artefactos derivados de Residencia Fiscal en Espana.
- `scripts/validate-story-kf-008a.mjs`: validación consolidada de STORY-KF-008A.
- `tests/knowledge-object.schema.test.mjs`: pruebas del contrato.
- `tests/modelo-210-story-kf-004a.test.mjs`: pruebas del primer objeto real y de sus derivaciones.
- `tests/modelo-720-story-kf-005a.test.mjs`: pruebas del segundo objeto real y de sus derivaciones.
- `tests/modelo-714-story-kf-005b.test.mjs`: pruebas del tercer objeto real y de sus derivaciones.
- `tests/modelo-721-story-kf-005c.test.mjs`: pruebas del cuarto objeto real y de sus derivaciones.
- `tests/residencia-fiscal-story-kf-008a.test.mjs`: pruebas del primer objeto transversal y de sus derivaciones.
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

### Generar artefactos derivados del Modelo 210

```bash
npm run build:story-kf-004a
```

### Validar STORY-KF-004A de extremo a extremo

```bash
npm run validate:story-kf-004a
```

### Generar artefactos derivados del Modelo 720

```bash
npm run build:story-kf-005a
```

### Validar STORY-KF-005A de extremo a extremo

```bash
npm run validate:story-kf-005a
```

### Generar artefactos derivados del Modelo 714

```bash
npm run build:story-kf-005b
```

### Validar STORY-KF-005B de extremo a extremo

```bash
npm run validate:story-kf-005b
```

### Generar artefactos derivados del Modelo 721

```bash
npm run build:story-kf-005c
```

### Validar STORY-KF-005C de extremo a extremo

```bash
npm run validate:story-kf-005c
```

### Ejecutar pruebas del contrato

### Generar artefactos derivados de Residencia Fiscal en Espana

```bash
npm run build:story-kf-008a
```

### Validar STORY-KF-008A de extremo a extremo

```bash
npm run validate:story-kf-008a
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
- `Web`: consumidor derivado seguro desde el mismo objeto.
- `IA`: consumidor derivado seguro con restricciones de canal.

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
