# STORY-KF-010B - IRNR Dividendos, Intereses y Canones Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno preparado para validacion funcional

## Contexto

Knowledge Factory continua el dominio `IRNR` con la arquitectura en
`FEATURE FREEZE`:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- `Knowledge Library v2` certificada;
- `Planner Consumer` certificado;
- sin cambios permitidos en contrato, `schema`, `Rule Engine`,
  consumidores ni arquitectura.

La biblioteca ya dispone de la base doctrinal necesaria para abrir una tercera
pieza material dentro de `IRNR`:

- `Residencia Fiscal en Espana`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `IRNR - Rendimientos del Trabajo`;
- `IRNR - Rendimientos del Capital Inmobiliario`.

El siguiente corte debe construir el objeto canonico:

`IRNR - Dividendos, Intereses y Canones`

sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura.

## Objetivo

Construir el `Knowledge Object` canonico:

`IRNR - Dividendos, Intereses y Canones`

El objeto debe responder exclusivamente a esta pregunta:

**Como tributan en Espana, desde la perspectiva del `IRNR`, los dividendos,
intereses y canones obtenidos por un contribuyente no residente y cuales son
sus consecuencias operativas minimas?**

Debe validar integramente contra `@ag/knowledge-contract@1.0.0` sin introducir
cambios estructurales en el sistema.

## Enfoques considerados

### Opcion 1 - Objeto analitico-material unificado

Un unico objeto para `dividendos`, `intereses` y `canones`, centrado en
potestad tributaria, efecto del `CDI`, retenciones y cumplimiento minimo.

Ventajas:

- reutiliza por completo `Residencia Fiscal`, `CDI` y `Modelo 210`;
- sigue el mismo armazon de los otros objetos `IRNR`;
- cubre tres categorias muy habituales sin fragmentar prematuramente la
  biblioteca;
- mantiene la doctrina general reusable para `Planner`, `Web` e `IA`.

Riesgos:

- exige cuidar bien la frontera para no convertirse en un tratado completo de
  rentas mobiliarias internacionales.

### Opcion 2 - Tres objetos separados desde el inicio

Crear un objeto por cada categoria:

- `IRNR - Dividendos`
- `IRNR - Intereses`
- `IRNR - Canones`

Ventajas:

- maxima granularidad doctrinal;
- menor densidad interna por objeto.

Riesgos:

- introduce complejidad prematura;
- duplica gran parte de la metodologia comun;
- ralentiza la cobertura funcional del dominio.

### Opcion 3 - Objeto procedural del Modelo 210 con subsecciones materiales

Usar como eje el cumplimiento del `Modelo 210` y colgar de ahi cada tipo de
renta.

Ventajas:

- orientacion directa a ejecucion operativa.

Riesgos:

- mezcla doctrina material y procedimiento;
- degrada la reutilizacion transversal;
- contradice el patron ya consolidado en la biblioteca.

## Recomendacion

Se adopta la **Opcion 1**.

El objeto sera un **objeto material-operativo unificado** sobre `dividendos`,
`intereses` y `canones` en `IRNR`, con foco en:

- localizacion y fuente de la renta;
- potestad tributaria espanola por norma interna;
- modulacion por `CDI`;
- existencia de retencion o ingreso a cuenta;
- cumplimiento operativo minimo via `Modelo 210` cuando proceda.

No se abrira todavia la fragmentacion por categoria salvo que el uso real del
dominio la justifique despues.

## Posicion en la biblioteca

Este objeto se define como un **objeto material-operativo del dominio IRNR**
centrado en rentas pasivas mobiliarias.

No es:

- un manual completo de `Modelo 210`;
- un tratado general de fiscalidad financiera internacional;
- un catalogo articulo por articulo de todos los `CDI`;
- un objeto de rentas inmobiliarias;
- un objeto de ganancias patrimoniales;
- un objeto de imposicion societaria general.

Su papel es fijar la doctrina unica y reutilizable del despacho para decidir
como se someten a tributacion en Espana, bajo `IRNR`, los `dividendos`,
`intereses` y `canones`, con cierre operativo minimo.

## Frontera material aprobada

El alcance material aprobado es:

- dividendos y distribuciones asimiladas cuando la renta se trate como
  rendimiento mobiliario desde la perspectiva del objeto;
- intereses y otras remuneraciones equivalentes por cesion a terceros de
  capitales propios;
- canones y contraprestaciones por uso o cesion de derechos, bienes
  intangibles o similares cuando encajen en la categoria doctrinal relevante;
- retencion y cumplimiento minimo asociados a esas rentas;
- modulacion por `CDI`.

Quedan fuera:

- ganancias patrimoniales;
- rentas inmobiliarias;
- rentimientos del trabajo;
- establecimientos permanentes;
- fiscalidad completa del pagador residente;
- analisis detallado de exenciones sectoriales no nucleares;
- cumplimentacion exhaustiva del `Modelo 210`;
- desarrollo articulo por articulo de cada convenio concreto.

## Enfoque funcional aprobado

Se adopta un enfoque **material + cumplimiento operativo minimo**.

Esto significa que el objeto si debe resolver:

- cuando la renta se considera obtenida en Espana;
- que papel juega el pagador residente o no residente;
- como actua el `CDI` sobre dividendos, intereses y canones;
- cuando existe limite convencional, exencion o tributacion compartida;
- cuando nace retencion o necesidad de declaracion;
- como se conecta el cierre material con `Modelo 210`.

Y no debe resolver:

- la mecanica detallada del formulario;
- todas las variantes de planificacion financiera internacional;
- la doctrina completa del impuesto sobre sociedades;
- la exegesis completa de cada articulo de cada `CDI`.

## Dependencias doctrinales

### Consumes Doctrine From

- `Residencia Fiscal`
- `Convenios para Evitar la Doble Imposicion`
- `Modelo 210`

### Provides Doctrine To

- `IRNR - Ganancias patrimoniales` (futuro)
- `IRPF Internacional` (futuro)
- `Fiscalidad patrimonial internacional` (futuro)
- objetos futuros de rentas pasivas internacionales

## Identidad doctrinal

La posicion del objeto dentro de la biblioteca queda fijada asi:

- `Residencia Fiscal` determina si el contribuyente queda fuera del `IRPF` y
  entra en la logica del `IRNR`;
- `CDI` limita, redistribuye o confirma la potestad espanola sobre la renta;
- `Modelo 210` aporta la capa de cumplimiento cuando la conclusion material lo
  exige;
- `IRNR - Dividendos, Intereses y Canones` resuelve la tributacion material de
  esas rentas pasivas y sus consecuencias operativas minimas.

No podra duplicar doctrina ya modelada en residencia, `CDI` o `Modelo 210`.

## Decision Gateway

El objeto incorporara este flujo de decision reutilizable:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe una renta pasiva de dividendos, intereses o canones?
        ↓
La renta se considera obtenida en Espana por norma interna?
        ↓
Existe CDI aplicable?
        ↓
El CDI limita, reduce o excluye la potestad espanola?
        ↓
Existe retencion o ingreso a cuenta?
        ↓
Existe obligacion de declarar?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

## Regla metodologica central

La secuencia obligatoria del analisis sera:

1. residencia fiscal;
2. identificacion de la categoria de renta;
3. localizacion y fuente por norma interna;
4. potestad tributaria espanola inicial;
5. modulacion por `CDI`;
6. retencion o exencion aplicable;
7. cierre operativo minimo con `Modelo 210`.

Esto evita errores tipicos como:

- aplicar el `CDI` antes de confirmar la fuente interna;
- mezclar dividendos, intereses y canones como si fueran identicos en todos
  los convenios;
- tratar la retencion como sustituto del analisis material;
- convertir el objeto en una guia de casillas del formulario.

## Estructura interna del contenido

El objeto se organizara con esta secuencia logica:

1. condicion de no residente;
2. identificacion de la renta pasiva;
3. dividendos como categoria material;
4. intereses como categoria material;
5. canones como categoria material;
6. fuente y localizacion en Espana;
7. potestad tributaria espanola;
8. analisis de `CDI`;
9. retencion, ingreso a cuenta y declaracion;
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

Debe explicar:

- que cubre el objeto;
- que categorias integra;
- por que el `CDI` es especialmente decisivo en este dominio;
- cuando la renta puede soportar retencion o declaracion en Espana;
- por que el objeto no sustituye a un analisis convenio-especifico de detalle.

### LegalBasisBlock

Debe incluir unicamente normativa y fuentes aplicables:

- `TRLIRNR`;
- Reglamento del `IRNR`;
- Ley General Tributaria cuando sea relevante;
- normativa interna sobre dividendos, intereses y canones solo como apoyo de
  conceptos compartidos;
- `CDI` y marco interpretativo general.

### TechnicalDevelopmentBlock

Debe separar claramente:

1. acceso al objeto como no residente;
2. identificacion de la categoria material de renta;
3. regla interna de fuente;
4. papel del pagador;
5. modulacion por `CDI`;
6. retencion y declaracion.

Debe dejar tambien tres matices metodologicos expresos:

- el `CDI` no crea una obligacion tributaria nueva por si solo;
- el `Modelo OCDE` y sus Comentarios cumplen funcion interpretativa, pero no
  sustituyen el texto del convenio aplicable;
- cualquier derivacion hacia `establecimiento permanente` es solo introductoria
  y de escalado, no desarrollo completo.

### ProcedureBlock

Debe describir el flujo operativo minimo:

1. identificar al no residente;
2. clasificar la renta;
3. confirmar si la fuente es espanola;
4. localizar el `CDI` aplicable;
5. revisar limite convencional y documentacion soporte;
6. decidir retencion y declaracion;
7. cerrar el expediente en `Planner`.

### ChecklistBlock

Debe permitir al asesor revisar, como minimo:

- condicion de no residente;
- categoria de renta;
- existencia de pagador conectado con Espana;
- `CDI` aplicable;
- documentacion soporte;
- retencion;
- declaracion.

### FaqBlock

Debe responder preguntas reales como:

- si todos los dividendos cobrados desde Espana tributan siempre aqui;
- si un interes pagado por un residente espanol obliga siempre a retener;
- si un canon puede quedar limitado por convenio;
- si basta con la retencion para no declarar;
- que prueba hace falta para aplicar el convenio.

### RiskBlock

Debe cubrir al menos:

- clasificacion incorrecta de la renta;
- aplicacion automatica y erronea del `CDI`;
- ausencia de certificado de residencia;
- retencion incorrecta;
- cierre formal incorrecto por confundir exencion, limite convencional y no
  sujecion.

### RequiredDocumentBlock

Debe incluir una matriz de evidencias con fuerza probatoria y uso habitual para:

- certificado de residencia fiscal;
- contrato o acuerdo de distribucion, financiacion o licencia;
- prueba de titularidad o beneficiario efectivo cuando proceda;
- justificante de pagos;
- soporte de retencion practicada;
- texto del `CDI` aplicable cuando la operativa lo exija.

### CaseStudyBlock

Debe incluir al menos cuatro casos:

1. dividendo pagado a residente de Estado con `CDI`;
2. interes pagado a no residente con limite convencional;
3. canon internacional con posible tributacion en fuente;
4. expediente en el que la ausencia de documentacion impide aplicar el trato
   convencional mas favorable.

### InternalReferenceBlock

Solo debe incluir referencias internas reales ya existentes.

## Calidad editorial

El contenido debe ser:

- tecnicamente preciso;
- reusable por `Planner`, `Web`, `IA`, `FAQ`, `Checklist` y `Client Response`;
- neutro y no promocional;
- disciplinado en la frontera con otros objetos;
- apto para trazabilidad doctrinal.

## Fuera de alcance

Este objeto no desarrolla:

- ganancias patrimoniales;
- establecimientos permanentes;
- fiscalidad societaria completa;
- detalle articulo por articulo de todos los convenios;
- cumplimentacion exhaustiva del `Modelo 210`.

Cada una de esas materias, si se vuelve critica, debera convertirse en un
objeto propio o en una capa derivada posterior.

## Criterios de aceptacion del diseno

El diseno se considerara correcto cuando:

- reutilice sin duplicacion doctrinal `Residencia Fiscal`, `CDI` y
  `Modelo 210`;
- mantenga la arquitectura congelada;
- trate `dividendos`, `intereses` y `canones` como un bloque material coherente
  de rentas pasivas en `IRNR`;
- deje clara la secuencia:
  norma interna -> `CDI` -> retencion -> declaracion;
- no requiera cambios estructurales en Knowledge Factory.
