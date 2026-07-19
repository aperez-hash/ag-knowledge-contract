# STORY-KF-010D - IRNR Establecimientos Permanentes Knowledge Object Design

Fecha: 2026-07-19
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory continua el desarrollo del dominio `IRNR` sobre una base ya
certificada y congelada en `FEATURE FREEZE`:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- `Knowledge Library v2` certificada;
- `Planner Consumer` certificado;
- sin cambios permitidos en contrato, `schema`, `Rule Engine`,
  consumidores ni arquitectura.

La biblioteca ya dispone de la base doctrinal necesaria para abrir la ultima
pieza estructural del dominio `IRNR`:

- `Residencia Fiscal en Espana`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `IRNR - Rendimientos del Trabajo`;
- `IRNR - Rendimientos del Capital Inmobiliario`;
- `IRNR - Dividendos, Intereses y Canones`;
- `IRNR - Ganancias Patrimoniales`.

El siguiente corte debe construir el objeto canonico:

`IRNR - Establecimientos Permanentes`

sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura.

## Objetivo

Construir el `Knowledge Object` canonico:

`IRNR - Establecimientos Permanentes`

El objeto debe responder exclusivamente a esta pregunta:

**Existe un establecimiento permanente en Espana y cuales son las
consecuencias operativas generales de esa calificacion?**

Debe validar integramente contra `@ag/knowledge-contract@1.0.0` sin introducir
cambios estructurales en el sistema.

## Enfoques considerados

### Opcion 1 - Objeto metodologico-operativo general sobre EP

Un unico objeto para `IRNR - Establecimientos Permanentes`, centrado en:

- concepto general de `EP`;
- lugar fijo de negocios;
- agentes dependientes;
- agentes independientes en vision general;
- permanencia;
- actividad empresarial;
- exclusiones preparatorias o auxiliares;
- interaccion entre normativa interna y `CDI`;
- consecuencias operativas generales del paso de `IRNR sin EP` a `IRNR con EP`.

Ventajas:

- completa el dominio `IRNR` sin abrir aun fiscalidad empresarial completa;
- reutiliza de forma limpia `Residencia Fiscal` y `CDI`;
- crea una base doctrinal transversal que otros objetos podran consumir;
- mantiene el patron ya consolidado del repositorio.

Riesgos:

- exige disciplina para no deslizarse hacia atribucion de beneficios,
  contabilidad del `EP` o precios de transferencia.

### Opcion 2 - Objeto amplio con tributacion detallada del EP

Un objeto unico que, ademas de identificar el `EP`, entre ya en:

- determinacion detallada de beneficios;
- contabilidad atribuible;
- pagos internos;
- relaciones con `IS`;
- interaccion con precios de transferencia.

Ventajas:

- mucha potencia tecnica concentrada en una sola pieza.

Riesgos:

- rompe el alcance aprobado;
- mezcla metodologia de calificacion con fiscalidad empresarial completa;
- obligaria a tocar demasiadas fronteras doctrinales de golpe.

### Opcion 3 - Objeto demasiado ligero y casi introductorio

Un objeto reducido a definiciones generales, con poca consecuencia operativa y
sin aterrizar procedimiento, pruebas ni riesgos.

Ventajas:

- maxima simplicidad inicial.

Riesgos:

- se queda corto para `Planner`, `Web` e `IA`;
- no cubriria el umbral de reutilizacion esperado;
- obligaria a reabrir pronto otra historia para completar lo que falte.

## Recomendacion

Se adopta la **Opcion 1**.

El objeto sera un **objeto metodologico-operativo general** sobre
`Establecimientos Permanentes` en `IRNR`, con foco en:

- determinar si existe `EP` en Espana;
- separar analisis de normativa interna y analisis convencional;
- identificar los criterios generales de lugar fijo, agentes, permanencia,
  actividad y exclusiones;
- fijar las consecuencias operativas generales de la calificacion;
- dejar claras las fronteras con `IRNR sin EP`.

No desarrollara aun:

- atribucion detallada de beneficios;
- contabilidad del `EP`;
- precios de transferencia;
- `Pilar II`;
- fiscalidad societaria completa;
- liquidacion detallada del impuesto.

## Posicion en la biblioteca

Este objeto se define como un **objeto doctrinal-metodologico del dominio IRNR**
centrado en la calificacion de `Establecimientos Permanentes`.

No es:

- un manual del `Modelo 210`;
- un objeto de `Impuesto sobre Sociedades`;
- un tratado de fiscalidad empresarial internacional;
- un objeto de atribucion de beneficios;
- un objeto de precios de transferencia;
- una guia de contabilidad del `EP`;
- una liquidacion completa del regimen `IRNR con EP`.

Su papel es fijar la doctrina unica y reutilizable del despacho para decidir
cuando un no residente deja de tributar bajo el marco general de `IRNR sin EP`
y entra en el marco especifico de `EP`.

## Frontera material aprobada

El alcance material aprobado es:

- concepto general de `EP`;
- lugar fijo de negocios;
- agentes dependientes;
- agentes independientes en vision general;
- permanencia;
- actividad empresarial;
- exclusiones preparatorias o auxiliares;
- interaccion con `CDI`;
- consecuencias operativas generales de la existencia de `EP`;
- diferencias generales entre `IRNR con EP` e `IRNR sin EP`;
- documentacion, procedimiento, riesgos y casos practicos de calificacion.

Quedan fuera:

- atribucion detallada de beneficios;
- contabilidad del `EP`;
- precios de transferencia;
- `Pilar II`;
- fiscalidad societaria completa;
- liquidacion detallada del impuesto;
- desarrollo articulo por articulo de cada convenio;
- casos de litigacion avanzada sin impacto operativo general.

## Enfoque funcional aprobado

Se adopta un enfoque **metodologico + consecuencias operativas generales**.

Esto significa que el objeto si debe resolver:

- que es un `EP`;
- cuales son los criterios generales de existencia;
- como se analiza un lugar fijo de negocios;
- como se analiza un agente con capacidad relevante;
- como se revisa la permanencia;
- como se aplican las exclusiones generales;
- cuando debe abrirse la capa de `CDI`;
- cuando el `CDI` puede modificar el analisis;
- que cambia de forma general cuando se concluye que existe `EP`;
- que evidencias minimas deben archivarse.

Y no debe resolver:

- calculo detallado del beneficio atribuible;
- cierre contable del `EP`;
- mecanica de precios de transferencia;
- liquidacion completa del impuesto;
- manuales de formularios;
- fiscalidad empresarial internacional mas alla del marco general de calificacion.

## Dependencias doctrinales

### Consumes Doctrine From

- `Residencia Fiscal`
- `Convenios para Evitar la Doble Imposicion`

### Provides Doctrine To

- `Impuesto sobre Sociedades`
- `Precios de Transferencia`
- `Fiscalidad Internacional Empresarial`

El objeto no duplicara la doctrina general ya existente sobre residencia ni la
teoria general de `CDI`; solo la consumira y la aplicara al problema de
calificacion de `EP`.

## Principio metodologico central

El objeto debe fijar con claridad que el analisis de `EP` tiene dos capas:

1. **Normativa interna**
   - comprobar si existe actividad economica en Espana;
   - revisar lugar fijo de negocios, agentes, permanencia y exclusiones;
   - obtener una conclusion inicial bajo el marco interno.

2. **Normativa convencional**
   - comprobar si existe `CDI` aplicable;
   - revisar si el tratado modifica la lectura de `EP`;
   - confirmar o ajustar la conclusion inicial.

El `CDI` no crea por si solo una presencia economica nueva, pero puede matizar
o limitar la conclusion alcanzada bajo normativa interna.

## Consecuencias operativas generales aprobadas

Si se concluye que existe `EP`, el objeto debe dejar claro, sin entrar aun en
liquidacion detallada, que:

- deja de ser suficiente el analisis ordinario de `IRNR sin EP`;
- cambia el marco general de tributacion aplicable;
- el expediente debe escalar a una capa especifica de `EP`;
- aumentan las exigencias documentales y de soporte del caso;
- puede abrirse la necesidad de conectar con objetos futuros de `IS` o
  `Precios de Transferencia`.

## Ejes tecnicos del objeto

El `TechnicalDevelopmentBlock` debe tratar expresamente:

1. concepto general de `EP`;
2. lugar fijo de negocios;
3. agentes dependientes;
4. agentes independientes en vision general;
5. permanencia;
6. actividad empresarial en Espana;
7. exclusiones generales, con foco expreso en actividad preparatoria o auxiliar;
8. diferencias generales entre `IRNR con EP` e `IRNR sin EP`;
9. interaccion con `CDI`;
10. consecuencias juridicas y operativas generales de la existencia de `EP`.

## Decision Gateway aprobado

El objeto incorporara el siguiente flujo:

```text
Existe actividad economica en Espana?
        ↓
Existe lugar fijo de negocios?
        ↓
Existe agente con capacidad relevante?
        ↓
Concurren los requisitos generales de EP?
        ↓
Existe CDI aplicable?
        ↓
El CDI modifica el analisis?
        ↓
Calificacion final

EP
o
No EP
```

Este `Decision Gateway` debe ser reutilizable por `Planner`, `Web` e `IA`.

## ProcedureBlock aprobado

El flujo operativo debe quedar fijado como:

1. identificar actividad;
2. analizar presencia fisica;
3. analizar agentes;
4. revisar permanencia;
5. verificar exclusiones;
6. analizar `CDI`;
7. determinar existencia del `EP`;
8. identificar consecuencias tributarias generales;
9. documentar la conclusion;
10. archivar evidencias.

## RiskBlock aprobado

El objeto tratara como minimo riesgos de:

- cumplimiento;
- internacional;
- interpretativo;
- documental;
- procedimental.

Riesgos materiales minimos:

- calificar incorrectamente un `EP`;
- ignorar el `CDI` aplicable;
- interpretar mal la actividad preparatoria o auxiliar;
- documentacion insuficiente;
- aplicar el regimen incorrecto.

## Evidence Matrix aprobada

El `RequiredDocumentBlock` debe separar:

- **Obligatorios**
- **Recomendables**

Y debe incluir, como minimo:

- contratos;
- documentacion societaria;
- poderes de representacion;
- contratos de arrendamiento de oficinas o espacios;
- documentacion de empleados o agentes;
- documentacion de operaciones desarrolladas en Espana.

La matriz de evidencias debe clasificar cada pieza por:

- documento;
- finalidad;
- fuerza probatoria;
- utilizacion habitual.

## CaseStudyBlock aprobado

El objeto desarrollara al menos cinco casos:

1. oficina permanente en Espana;
2. agente dependiente con capacidad de contratacion;
3. actividad auxiliar sin `EP`;
4. prestacion continuada de servicios;
5. `CDI` que modifica el analisis del `EP`.

Cada caso incluira:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

## Relations aprobadas

El objeto debe relacionarse con:

- `Residencia Fiscal`;
- `Convenios para Evitar la Doble Imposicion`;
- `IRNR - Rendimientos del Trabajo`;
- `IRNR - Rendimientos del Capital Inmobiliario`;
- `IRNR - Dividendos, Intereses y Canones`;
- `IRNR - Ganancias Patrimoniales`;
- `Impuesto sobre Sociedades` como objeto futuro;
- `Precios de Transferencia` como objeto futuro.

Debe declarar expresamente:

```text
Consumes Doctrine From:

- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion

Provides Doctrine To:

- Impuesto sobre Sociedades
- Precios de Transferencia
- Fiscalidad Internacional Empresarial
```

## Cobertura minima exigida

El objeto debera cubrir como minimo:

- concepto de `EP`;
- criterios generales;
- lugar fijo de negocios;
- agentes;
- exclusiones generales;
- interaccion con `CDI`;
- consecuencias operativas generales;
- documentacion;
- procedimiento;
- errores frecuentes.

## Fuera de alcance

Queda expresamente fuera:

- atribucion detallada de beneficios;
- contabilidad del `EP`;
- precios de transferencia;
- `Pilar II`;
- fiscalidad societaria completa;
- liquidacion detallada del impuesto.

Cada una de esas materias pertenece a objetos futuros y no debe forzarse dentro
de este corte.

## Resultado esperado

```text
STORY-KF-010D

Knowledge Object:
IRNR - Establecimientos Permanentes

Design Review ............... PASS
Scope ....................... APPROVED
Architecture ................ FROZEN
Contract .................... UNCHANGED
Consumers ................... UNCHANGED

NEXT GATE

STORY-KF-010D Execution Plan
```
