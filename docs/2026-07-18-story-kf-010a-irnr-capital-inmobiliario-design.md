# STORY-KF-010A - IRNR Rendimientos del Capital Inmobiliario Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory inicia el tercer ciclo de produccion con la base ya
certificada:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- `Knowledge Library v2` certificada;
- `Planner Consumer` certificado;
- arquitectura en `FEATURE FREEZE`.

La biblioteca ya dispone de la base doctrinal necesaria para abrir el dominio
`IRNR` con una nueva pieza material:

- `Residencia Fiscal en Espana`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `Modelo 714`;
- `Modelo 720`;
- `Modelo 721`;
- `Modelo 151`;
- `IRNR - Rendimientos del Trabajo`.

El siguiente corte debe construir el objeto canonico:

`IRNR - Rendimientos del Capital Inmobiliario`

sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura.

## Objetivo

Construir el `Knowledge Object` canonico:

`IRNR - Rendimientos del Capital Inmobiliario`

El objeto debe responder exclusivamente a esta pregunta:

**Como tributan en Espana los rendimientos derivados del arrendamiento o
explotacion de bienes inmuebles obtenidos por un contribuyente no residente y
cuales son sus consecuencias operativas minimas?**

Debe validar integramente contra `@ag/knowledge-contract@1.0.0` sin introducir
cambios estructurales en el sistema.

## Posicion en la biblioteca

Este objeto se define como un **objeto material-operativo del dominio IRNR**.

No es:

- un manual completo de `Modelo 210`;
- un objeto de ganancias patrimoniales por transmision;
- un objeto de imputacion de rentas inmobiliarias;
- un tratado general de fiscalidad inmobiliaria internacional;
- una guia de IVA inmobiliario.

Su papel es fijar la doctrina unica y reutilizable sobre los rendimientos del
capital inmobiliario en el `IRNR`, con cierre operativo minimo suficiente para
`Planner`, `Web` e `IA`.

## Frontera material aprobada

El alcance material aprobado es:

- arrendamiento de inmuebles situados en Espana;
- cesiones de uso y rendimientos accesorios inseparables del alquiler;
- otros rendimientos de explotacion inmobiliaria solo cuando sigan siendo
  capital inmobiliario y no actividad economica.

Quedan fuera:

- actividad economica inmobiliaria;
- transmisiones y ganancias patrimoniales;
- imputacion de rentas inmobiliarias;
- cumplimentacion detallada del `Modelo 210`;
- cuestiones registrales, censales o de `IVA`.

## Enfoque funcional aprobado

Se adopta un enfoque **material + cumplimiento operativo minimo**.

Esto significa que el objeto si debe resolver:

- sujecion en Espana;
- localizacion de la renta;
- impacto del `CDI`;
- diferencia operativa entre residentes `UE/EEE` y terceros Estados cuando la
  normativa vigente lo exija;
- deducibilidad de gastos cuando proceda;
- copropiedad con implicaciones operativas minimas;
- obligacion de declarar, periodicidad general y conexion con `Modelo 210`.

Y no debe resolver:

- mecanica detallada de formulario;
- casillas;
- errores tecnicos de presentacion exhaustiva;
- casuistica formal propia de otro objeto procedimental.

## Dependencias doctrinales

### Consumes Doctrine From

- `Residencia Fiscal`
- `Convenios para Evitar la Doble Imposicion`
- `Modelo 210`

### Provides Doctrine To

- `IRNR - Ganancias patrimoniales` (futuro)
- `IRPF Internacional` (futuro)
- `Fiscalidad patrimonial internacional` (futuro)

## Identidad doctrinal

La posicion del objeto dentro de la biblioteca queda fijada asi:

- `Residencia Fiscal` determina si el contribuyente entra en `IRNR`;
- `CDI` limita o confirma la potestad espanola sobre la renta inmobiliaria;
- `Modelo 210` aporta la capa de cumplimiento cuando la conclusion material lo
  exige;
- `IRNR - Rendimientos del Capital Inmobiliario` resuelve la tributacion
  material de la renta derivada del inmueble y sus consecuencias operativas
  minimas.

No podra duplicar doctrina ya modelada en residencia, `CDI` o `Modelo 210`.

## Decision Gateway

El objeto incorporara este flujo de decision reutilizable:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe un inmueble situado en Espana?
        ↓
Se obtienen rendimientos del inmueble?
        ↓
El rendimiento sigue siendo capital inmobiliario y no actividad economica?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva la potestad tributaria?
        ↓
Existe derecho a deducir gastos?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

## Regla metodologica central

La secuencia obligatoria del analisis sera:

1. residencia fiscal;
2. localizacion del inmueble y de la renta;
3. naturaleza del rendimiento;
4. potestad tributaria por norma interna;
5. modulacion por `CDI`;
6. deducibilidad de gastos cuando proceda;
7. cierre operativo minimo.

Esto evita errores tipicos como:

- aplicar un `CDI` antes de confirmar la sujecion interna;
- mezclar capital inmobiliario con actividad economica;
- tratar la deducibilidad como automatica;
- mezclar copropietarios con posiciones fiscales distintas;
- convertir el objeto en una guia de formulario.

## Estructura interna del contenido

El objeto se organizara con esta secuencia logica:

1. condicion de no residente;
2. existencia de inmueble situado en Espana;
3. existencia de rendimiento inmobiliario;
4. delimitacion de capital inmobiliario frente a actividad economica;
5. localizacion de la renta;
6. potestad tributaria espanola;
7. analisis de `CDI`;
8. deducibilidad de gastos;
9. copropiedad y separacion por cotitular;
10. cumplimiento operativo minimo.

## Bloques obligatorios

Se completaran todas las secciones exigidas por el contrato:

- `identity`
- `governance`
- `classification`
- `channelPolicy`
- `executiveSummary`
- `legal_basis`
- `technical_development`
- `procedure`
- `checklist`
- `faq`
- `risk`
- `required_documentation`
- `case_study`
- `internal_reference`
- `relations`
- `auditMetadata`

No se creara ningun bloque nuevo.

## Diseno por bloque

### Executive Summary

Debe responder, en lenguaje reutilizable por `Planner`, `Web` e `IA`:

- cuando existe tributacion en Espana;
- que rendimientos inmobiliarios estan sujetos;
- como cambia el analisis entre residentes `UE/EEE` y terceros Estados cuando
  la normativa vigente lo contemple;
- como influye el `CDI`;
- que consecuencias practicas minimas nacen.

Debe ser apto para salidas derivadas y no sonar a nota interna cerrada ni a
manual de presentacion.

### LegalBasisBlock

Debe explicar:

- naturaleza de los rendimientos del capital inmobiliario en `IRNR`;
- criterio de localizacion de la renta;
- interaccion con residencia fiscal;
- relacion con `CDI`;
- marco de deducibilidad de gastos.

No debe copiar textos legales; debe traducirlos a doctrina operativa.

### TechnicalDevelopmentBlock

Debe desarrollar operativamente:

- inmuebles situados en Espana;
- arrendamientos;
- cesiones de uso y rendimientos accesorios admisibles dentro de capital
  inmobiliario;
- delimitacion frente a actividad economica;
- criterio de localizacion;
- sujetos pasivos;
- diferencia entre residentes `UE/EEE` y terceros Estados cuando proceda;
- gastos deducibles cuando proceda;
- base imponible y tributacion general a nivel doctrinal;
- aplicacion de `CDI`;
- cumplimiento operativo minimo.

#### Regla de deducibilidad aprobada

La deducibilidad se tratara como una regla operativa central por bloques de
contribuyente:

- residentes `UE/EEE`, cuando la normativa vigente permita deduccion de gastos
  vinculados;
- terceros Estados, con tratamiento diferenciado cuando proceda;
- siempre con advertencia expresa de que la deducibilidad depende del marco
  normativo aplicable y de la trazabilidad documental del expediente.

No se entrara en una guia exhaustiva gasto por gasto, pero si en una comparacion
clara y util para expediente real.

#### Copropiedad aprobada

La copropiedad se tratara con:

- criterio material basico por cotitular;
- separacion de residencia, `CDI`, deducibilidad y renta atribuible;
- implicaciones operativas minimas:
  - documentacion separada por cotitular;
  - no mezclar posiciones fiscales distintas;
  - advertencia sobre periodicidad y cierre individual cuando proceda.

### ProcedureBlock

El flujo operativo queda fijado asi:

1. determinar residencia fiscal;
2. confirmar localizacion del inmueble;
3. identificar la naturaleza del rendimiento;
4. verificar normativa interna;
5. analizar `CDI`;
6. determinar potestad tributaria;
7. analizar deducibilidad de gastos cuando proceda;
8. determinar obligaciones formales minimas;
9. presentar declaracion cuando corresponda;
10. archivar evidencias.

### ChecklistBlock

La checklist se separara en:

- `Obligatorio`
- `Recomendable`

Debe servir para `Planner` sin duplicar doctrina.

### FaqBlock

Debe responder preguntas reales como minimo sobre:

- si se pueden deducir gastos;
- si se tributa igual fuera de la `UE`;
- como afecta un `CDI`;
- cuando debe presentarse `Modelo 210`;
- que ocurre en copropiedad.

### RiskBlock

Debe cubrir al menos estas categorias:

- cumplimiento;
- documental;
- interpretativo;
- internacional;
- procedimental.

Riesgos minimos:

- localizar incorrectamente la renta;
- aplicar indebidamente gastos deducibles;
- aplicar incorrectamente un `CDI`;
- declarar rentas con periodicidad errónea;
- omitir documentacion justificativa.

### RequiredDocumentBlock

Debe separar:

- `Obligatorios`
- `Recomendables`

Debe incluir como minimo:

- escritura o titulo de propiedad;
- contrato de arrendamiento;
- justificantes de ingresos;
- justificantes de gastos;
- certificado de residencia fiscal;
- documentacion de retenciones, cuando exista.

#### Evidence Matrix

Cada evidencia se clasificara por:

- documento;
- finalidad;
- fuerza probatoria;
- momento de utilizacion.

Esto debe quedar reutilizable para `Planner` e `IA`.

### CaseStudyBlock

Se desarrollaran al menos cinco casos:

1. arrendamiento por residente en la `UE/EEE`;
2. arrendamiento por residente en un tercer Estado;
3. copropiedad de un inmueble;
4. aplicacion de un `CDI`;
5. gastos deducibles y gastos no deducibles.

Cada caso debe cerrar con:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

### InternalReferenceBlock

Solo incluira referencias internas reales, no placeholders doctrinales
inventados.

## Knowledge Coverage minimo

El objeto debera cubrir como minimo:

- inmuebles situados en Espana;
- localizacion de la renta;
- potestad tributaria;
- aplicacion de `CDI`;
- deducibilidad de gastos;
- cumplimiento operativo minimo;
- documentacion;
- procedimiento;
- errores frecuentes.

## Out of Scope

Queda expresamente fuera:

- ganancias patrimoniales por transmision;
- imputacion de rentas inmobiliarias;
- `IVA` inmobiliario;
- modelos censales;
- gestion registral;
- cumplimentacion detallada del `Modelo 210`.

Cada una de esas materias debera vivir en su propio `Knowledge Object`.

## Validaciones esperadas

El objeto debera validar en:

- `Schema Validation`
- `Rule Engine`
- `Planner View`
- `Web View`
- `AI Context`
- `Checklist derivada`
- `FAQ derivada`
- `Client Response derivada`

Todo ello sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores.

## Riesgos de diseno a vigilar en implementacion

1. deslizarse hacia actividad economica inmobiliaria;
2. convertir la deducibilidad en una pseudo-guia de liquidacion exhaustiva;
3. mezclar la capa material con la guia de presentacion del `Modelo 210`;
4. duplicar doctrina de `Residencia Fiscal` o `CDI`;
5. infra-modelar la copropiedad, dejando fuera sus implicaciones operativas
   minimas.

## Resultado esperado

```text
STORY-KF-010A

Knowledge Object:
IRNR - Rendimientos del Capital Inmobiliario

Design Review ............... PASS
Scope ....................... APPROVED
Architecture ................ FROZEN
Contract .................... UNCHANGED
Consumers ................... UNCHANGED

NEXT GATE

Write spec -> review -> implementation plan
```
