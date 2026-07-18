# STORY-KF-005A - Modelo 720 Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseño aprobado en enfoque

## Objetivo

Implementar el segundo Knowledge Object oficial de Knowledge Factory:

`Modelo 720 - Declaracion informativa sobre bienes y derechos situados en el extranjero`

El trabajo debe generar un unico objeto canónico capaz de derivar:

- Planner View
- Web View
- AI Context
- Checklist
- FAQ
- Client Response

sin duplicacion doctrinal y sin abrir cambios de arquitectura.

## Alcance

Se reutiliza el contrato publicado `@ag/knowledge-contract@1.0.0` y el pipeline
ya certificado en `STORY-KF-004A`.

Se permite:

- crear un nuevo Knowledge Object real para `Modelo 720`;
- reutilizar y generalizar lo minimo imprescindible de los scripts de
  derivacion/validacion existentes para soportar un segundo objeto;
- generar nuevos artefactos derivados y pruebas focales;
- actualizar documentacion tecnica del repo cuando refleje fielmente el nuevo
  comportamiento.

No se permite:

- modificar `schema`, `generated`, enums, bloques o taxonomias;
- modificar el contrato publicado;
- introducir nuevos consumidores;
- rediseñar la arquitectura de Knowledge Factory;
- mezclar el objeto con temas ajenos al deber informativo del Modelo 720.

## Enfoque arquitectonico

Se adopta el mismo armazon ya certificado en `Modelo 210`, pero desacoplando el
pipeline de un unico nombre de fichero.

La idea no es crear una segunda arquitectura, sino pasar del caso singular a un
patron reutilizable de produccion v1:

1. un Knowledge Object canónico por historia;
2. una libreria neutra de carga, validacion semantica y derivacion;
3. artefactos derivados emitidos bajo `examples/derived/`;
4. validacion local reproducible con evidencia real.

Esto mantiene congelados:

- contrato;
- consumidores;
- politicas de canal;
- bloques del modelo.

## Modelo de contenido

El objeto representara exclusivamente la obligacion de presentar el Modelo 720.

No cubrira:

- planificacion patrimonial internacional;
- patrimonio global del cliente;
- intercambio automatico de informacion;
- residencia fiscal como objeto autonomo;
- sanciones como materia separada, salvo su efecto practico cuando sea
  determinante tras la jurisprudencia relevante del TJUE.

## Fuentes autorizadas

Se usaran solo fuentes primarias o jurisprudencia determinante:

- AEAT: pagina del Modelo 720, instrucciones y ayuda tecnica;
- Ley General Tributaria, disposicion adicional decimoctava;
- Real Decreto 1065/2007: articulos 42 bis, 42 ter y 54 bis;
- Orden HAP/72/2013 y modificaciones vigentes;
- TJUE cuando afecte materialmente al criterio operativo del regimen del 720.

No se usara doctrina secundaria salvo necesidad interpretativa estricta y
justificada.

## Estructura del objeto

El fichero previsto sera:

`examples/modelo-720-bienes-extranjero.json`

La raiz seguira el mismo patron certificado:

- `identity`
- `governance`
- `classification`
- `channelPolicy`
- `executiveSummary`
- `affectedTaxModels`
- `affectedForms`
- `blocks`
- `relations`
- `auditMetadata`

## Bloques obligatorios

Se implementaran los bloques canónicos ya existentes:

- `legal_basis`
- `technical_development`
- `procedure`
- `checklist`
- `faq`
- `risk`
- `required_documentation`
- `case_study`
- `internal_reference`

Sin introducir nuevos tipos.

## Reglas semanticas de la historia

La validacion de `STORY-KF-005A` debe exigir, ademas del schema:

- estado raiz `validado`;
- summary reutilizable con longitud controlada;
- al menos cuatro casos practicos;
- FAQ con preguntas reales y no artificiales;
- riesgos con categorias obligatorias:
  - `cumplimiento`
  - `documental`
  - `interpretativo`
  - `sancionador`
  - `procedimental`
- separacion clara entre documentacion obligatoria y recomendable;
- relaciones solo con objetos reales o planificados oficialmente;
- `client_response` derivada, nunca texto bruto;
- cero cambios estructurales.

Como el contrato no modela explicitamente `categoria` o `condicion de
activacion` en `RiskItem`, esa semantica se expresara en el propio contenido del
riesgo y se validara a nivel de historia, no de contrato.

## Derivaciones requeridas

El pipeline debe producir:

1. `Planner View`
   - contenido operativo interno;
   - filtros actuales por canal, visibilidad y obsolescencia.

2. `Web View`
   - salida publica derivada;
   - sin riesgos internos, sin referencias internas y sin contenido restringido.

3. `AI Context`
   - criterio vigente;
   - base legal;
   - procedimiento;
   - riesgos;
   - restricciones;
   - autorizacion de respuesta al cliente.

4. `Checklist derivada`
   - salida reutilizable desde el bloque `checklist`;
   - con separacion entre obligatorio y recomendable en la medida en que el
     contenido lo permita.

5. `FAQ derivada`
   - salida limpia para consumo por canal `faq`.

6. `Client Response derivada`
   - borrador controlado;
   - nunca contenido canónico bruto;
   - sometido a la politica `derived_only`.

## Cambios tecnicos previstos

Se esperan cambios en:

- nuevo objeto fuente `modelo-720-bienes-extranjero.json`;
- scripts de derivacion para soportar multiples objetos con el mismo armazon;
- pruebas focales nuevas para `Modelo 720`;
- posiblemente README o documentacion tecnica si describe el flujo ya como
  multiproduccion y no solo como caso `Modelo 210`.

No se esperan cambios en:

- contrato;
- tipos generados;
- package shape del contrato;
- arquitectura de consumidores.

## Testing y evidencia

La historia debe cerrar con evidencia real de:

- Schema Validation: PASS
- Rule Engine: PASS
- Planner View: PASS
- Web View: PASS
- AI Context: PASS
- Checklist: PASS
- FAQ: PASS
- Client Response: PASS
- Structural Changes: NO

Y con pruebas automatizadas focales que cubran:

- validacion del objeto `Modelo 720`;
- validacion semantica de la historia;
- generacion de cada derivacion;
- restricciones de canal;
- ausencia de incidentes en el informe final.

## Riesgos del microcorte

1. Mezclar doctrina de `Modelo 720` con objetos mas amplios de residencia o
   patrimonio.
2. Intentar introducir en el contrato semantica editorial que debe quedarse en
   la capa de historia.
3. Sobrecargar el pipeline con abstraccion innecesaria.

La mitigacion es mantener el cambio pequeño, local al repo neutral y orientado a
un segundo objeto real, no a una plataforma editorial nueva.

## Resultado esperado

```text
STORY-KF-005A

Knowledge Object:
Modelo 720

Schema Validation ........ PASS
Rule Engine .............. PASS
Planner View ............. PASS
Web View ................. PASS
AI Context ............... PASS
Checklist ................ PASS
FAQ ...................... PASS
Client Response .......... PASS
Structural Changes ....... NO

STATUS

KNOWLEDGE OBJECT READY
```
