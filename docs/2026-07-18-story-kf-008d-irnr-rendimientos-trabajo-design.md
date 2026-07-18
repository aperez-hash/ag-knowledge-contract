# STORY-KF-008D - IRNR Rendimientos del Trabajo Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory continua el segundo ciclo de produccion con la arquitectura
en `FEATURE FREEZE`:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- `Knowledge Library v1` certificada;
- `Planner Consumer` certificado;
- sin cambios permitidos en contrato, `schema`, `Rule Engine`,
  consumidores ni arquitectura.

La biblioteca ya dispone de la base doctrinal necesaria para abordar el primer
objeto de fiscalidad material internacional:

- `Residencia Fiscal en Espana`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 151`;
- `Modelo 210`;
- `Modelo 714`;
- `Modelo 720`;
- `Modelo 721`.

El siguiente corte debe convertir esa base doctrinal en un objeto operativo
centrado en la tributacion material de rendimientos del trabajo en el `IRNR`,
sin deslizarse hacia un manual completo del `Modelo 210`.

## Objetivo

Construir el `Knowledge Object` canonico:

`IRNR - Rendimientos del Trabajo`

El objeto debe responder exclusivamente a esta pregunta:

**Como tributan en Espana los rendimientos del trabajo obtenidos por un
contribuyente no residente?**

Debe validar integramente contra `@ag/knowledge-contract@1.0.0` sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura;
- bloques;
- enums;
- taxonomias.

## Posicion en la biblioteca

Este objeto se define como un **objeto material-operativo de fiscalidad
internacional**.

No explica todo el `IRNR` ni desarrolla el procedimiento completo del
`Modelo 210`. Su papel es resolver la decision material concreta sobre
rendimientos del trabajo y dejar preparadas sus consecuencias operativas
minimas:

- si existe tributacion en Espana;
- por que existe o no existe;
- como se localiza la renta;
- como impacta el `CDI`;
- que consecuencias practicas minimas nacen en retenciones y cumplimiento.

### Consumes Doctrine From

- `Residencia Fiscal`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210` (cumplimiento cuando proceda).

### Provides Doctrine To

- `IRNR` (otras categorias de renta);
- `IRPF Internacional`;
- `Modelo 151`;
- fiscalidad del teletrabajo internacional;
- fiscalidad de trabajadores desplazados.

### Identidad arquitectonica

La posicion doctrinal del objeto queda fijada asi:

- `Residencia Fiscal` determina la condicion del contribuyente;
- `CDI` resuelve el conflicto internacional de potestades;
- `IRNR - Rendimientos del Trabajo` determina la tributacion material de esa
  renta laboral en Espana y sus consecuencias operativas minimas.

No se ampliara el alcance en esta fase para convertir este objeto en:

- tratado general del `IRNR`;
- manual de cumplimentacion del `Modelo 210`;
- guia completa de teletrabajo internacional;
- catalogo de todas las rentas laborales internacionales posibles.

## Enfoque funcional aprobado

Se adopta un enfoque:

- **material + cumplimiento operativo minimo**;
- con foco principal en **teletrabajo internacional y modelos hibridos**;
- integrando **retenciones** como parte del nucleo operativo;
- sin invadir el terreno del `Modelo 210`.

### Consecuencias de este enfoque

1. El objeto no se limita a la potestad tributaria abstracta.
2. El objeto tampoco se convierte en una guia de formulario.
3. El eje principal sera determinar:
   - si la renta laboral se considera obtenida en Espana;
   - si un `CDI` limita o confirma la potestad espanola;
   - que ocurre despues con retenciones y obligacion formal minima.

## Frontera funcional del objeto

El objeto debe poder resolver:

- quien es contribuyente no residente a estos efectos;
- si existe rendimiento del trabajo relevante;
- cuando la renta se considera obtenida en territorio espanol;
- como se tratan trabajo total, parcial y remoto con conexion espanola;
- como influye que el empleador sea espanol o extranjero;
- cuando el `CDI` desplaza o limita la potestad espanola;
- quien retiene o cuando no existe retenedor espanol natural;
- cuando nace una obligacion formal minima.

El objeto no debe resolver:

- todas las categorias del `IRNR`;
- rendimientos inmobiliarios;
- dividendos, intereses, canones o ganancias patrimoniales;
- establecimientos permanentes;
- tributacion de sociedades;
- el desarrollo completo del `Modelo 210`;
- la fiscalidad material completa del teletrabajo internacional fuera del
  perimetro de rendimientos del trabajo.

## Decision Gateway

El objeto incorporara un flujo de decision reutilizable por `Planner`:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe rendimiento del trabajo?
        ↓
Se considera obtenido en Espana?
        ↓
Hay trabajo total, parcial o remoto con conexion espanola relevante?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva potestad tributaria?
        ↓
Existe obligacion de retener o declarar?
        ↓
Tributacion IRNR por rendimientos del trabajo
```

### Regla metodologica central

- la conexion territorial de la renta se analiza primero con normativa interna;
- el `CDI` actua despues, limitando o confirmando la potestad espanola;
- retenciones y cumplimiento formal se analizan al final, no antes.

Esta secuencia es obligatoria para evitar errores del tipo:

- asumir obligacion formal antes de confirmar potestad material;
- aplicar el `CDI` sin haber localizado antes la renta;
- resolver teletrabajo internacional por intuicion y no por secuencia
  normativa.

## Estructura interna del contenido

El nucleo del objeto se ordenara con esta secuencia logica:

1. condicion de no residente;
2. existencia de rendimiento del trabajo;
3. localizacion de la renta;
4. presencia fisica en Espana, trabajo parcial y teletrabajo internacional;
5. empleador espanol o extranjero;
6. analisis del `CDI` aplicable;
7. potestad tributaria efectiva de Espana;
8. retenciones y cumplimiento operativo minimo;
9. obligacion formal cuando proceda.

Con ello, el `TechnicalDevelopmentBlock` no sera una lista doctrinal plana,
sino una cadena de decision reutilizable.

## Bloques obligatorios

Se completaran todas las secciones definidas por el contrato:

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

No se creara ningun bloque adicional.

## Diseno por bloque

### Executive Summary

Debe responder, en lenguaje reutilizable para `Planner`, `Web` y `AI`:

- cuando un no residente puede tributar en Espana por rendimientos del trabajo;
- por que la residencia fiscal se analiza antes;
- cuando entra en juego el `CDI`;
- que importancia tienen la localizacion de la renta, las retenciones y la
  obligacion formal.

No debe sonar a formulario ni a nota cerrada de despacho. Debe servir como
pieza comun de explicacion.

### LegalBasisBlock

Debe explicar:

- naturaleza del `IRNR` sobre rendimientos del trabajo;
- criterio de obtencion en territorio espanol;
- relacion jerarquica entre norma interna y `CDI`;
- papel auxiliar del `IRPF` cuando ayude a interpretar conceptos comunes;
- conexion con retenciones y cumplimiento, sin bajar aun al detalle operativo.

No copiara legislacion. Debe explicar el marco y la jerarquia normativa.

### TechnicalDevelopmentBlock

Sera el corazon real del objeto y se estructurara asi:

1. no residente y punto de partida doctrinal;
2. que entendemos por rendimiento del trabajo en este contexto;
3. localizacion territorial de la renta;
4. trabajo desarrollado integramente en Espana;
5. trabajo parcialmente desarrollado en Espana;
6. teletrabajo internacional y modelos hibridos;
7. empleador espanol frente a empleador extranjero;
8. `CDI` y potestad tributaria;
9. retenciones;
10. obligaciones operativas minimas y errores frecuentes de encuadre.

Debe dejar especialmente claro:

- que el teletrabajo desde Espana para empresa extranjera no se resuelve con
  intuiciones;
- que la localizacion de la renta y la potestad tributaria no son lo mismo;
- que el `CDI` no crea una obligacion tributaria nueva, sino que limita o
  confirma la potestad de la normativa interna;
- que las retenciones forman parte del nucleo operativo del analisis.

### ProcedureBlock

Flujo operativo:

1. determinar residencia fiscal;
2. identificar el rendimiento;
3. localizar la renta;
4. verificar la normativa interna;
5. analizar el `CDI` aplicable;
6. determinar la potestad tributaria;
7. calcular la tributacion cuando proceda;
8. verificar obligaciones formales;
9. presentar declaracion si corresponde;
10. archivar evidencias.

### ChecklistBlock

Debe separar:

- `Obligatorio`;
- `Recomendable`.

La checklist debe ser utilizable directamente en `Planner`.

### FaqBlock

Debe responder preguntas reales como:

- tributo en Espana si trabajo temporalmente aqui?;
- que ocurre si teletrabajo desde Espana para una empresa extranjera?;
- puede el `CDI` impedir la tributacion en Espana?;
- debo presentar `Modelo 210`?;
- quien debe practicar retencion?;
- que pasa si parte del trabajo se realiza en Espana y parte fuera?;
- que evidencia necesito para defender la localizacion de la renta?;
- que ocurre si inicialmente se asumio mal la residencia fiscal?

### RiskBlock

Categorias:

- cumplimiento;
- internacional;
- interpretativo;
- documental;
- procedimental.

Riesgos minimos:

- determinar incorrectamente la residencia;
- localizar erroneamente la renta;
- aplicar incorrectamente el `CDI`;
- retenciones indebidas;
- omision de obligaciones formales.

### RequiredDocumentBlock

Debe separar:

- `Obligatorios`;
- `Recomendables`.

Debe incluir al menos:

- contrato laboral;
- certificado de residencia fiscal;
- documentacion de desplazamientos;
- nominas;
- certificado de retenciones;
- documentacion del empleador.

Ademas, por el foco del objeto, incorporara tambien como soporte frecuente:

- calendarios de presencia fisica;
- evidencias de teletrabajo;
- politica interna del empleador cuando exista;
- pruebas del lugar efectivo de prestacion.

### Evidence Matrix

Dentro de `RequiredDocumentBlock` se incorporara una matriz con:

- documento;
- finalidad;
- fuerza probatoria;
- momento de utilizacion.

Esa matriz debe ser especialmente util para:

- casos de teletrabajo internacional;
- trabajo parcial dentro y fuera de Espana;
- discrepancias sobre retenciones o localizacion de la renta.

### CaseStudyBlock

Se desarrollaran al menos estos cinco casos:

1. trabajador desplazado temporalmente a Espana;
2. teletrabajador internacional;
3. trabajador de empresa extranjera con actividad parcial en Espana;
4. aplicacion de un `CDI` que limita la tributacion espanola;
5. error de residencia con consecuencias en `IRNR`.

Cada caso incluira:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

Regla metodologica adicional:

Cada caso debe cerrar con una conclusion explicita sobre **por que Espana si o
no conserva potestad tributaria**.

### InternalReferenceBlock

Solo incluira referencias internas reales ya existentes.

No se crearan referencias ficticias.

## Sources autorizadas

### Legislacion

- Texto Refundido de la Ley del `IRNR`;
- Reglamento del `IRNR`;
- Ley General Tributaria;
- Ley del `IRPF` cuando sea necesaria para interpretar conceptos comunes.

### Convenios

- convenios para evitar la doble imposicion suscritos por Espana;
- `Modelo OCDE` como referencia interpretativa general.

### AEAT

- `Modelo 210`;
- instrucciones oficiales;
- ayuda tecnica.

### Doctrina administrativa

- consultas vinculantes relevantes;
- criterios administrativos consolidados.

### Jurisprudencia

Solo resoluciones con impacto operativo real.

No se utilizaran resenas secundarias como fuente principal del criterio.

## Relations

El objeto se relacionara con:

- `Residencia Fiscal`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `Modelo 151`;
- `IRPF` (futuro);
- `Establecimiento Permanente` (futuro).

Y declarara expresamente:

```text
Consumes Doctrine From:

- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
```

Tambien dejara explicito su papel proveedor mediante relaciones funcionales
alineadas con:

- `IRNR` (otras categorias de renta);
- `IRPF Internacional`;
- fiscalidad del teletrabajo internacional;
- fiscalidad de trabajadores desplazados.

## Knowledge Coverage minima

El objeto debera cubrir, como minimo:

- condicion de no residente;
- existencia de rendimiento del trabajo;
- localizacion territorial de la renta;
- trabajo total, parcial y remoto con conexion espanola;
- papel del empleador espanol o extranjero;
- intervencion del `CDI`;
- potestad tributaria efectiva de Espana;
- retenciones;
- obligacion formal minima;
- documentacion probatoria;
- errores frecuentes;
- casuistica internacional habitual.

## Out of Scope

No se desarrollan en esta historia:

- rendimientos inmobiliarios;
- dividendos;
- intereses;
- canones;
- ganancias patrimoniales;
- establecimientos permanentes;
- tributacion de sociedades;
- calculo completo del `Modelo 210`;
- fiscalidad material completa del `IRNR`;
- manual general de teletrabajo internacional.

Cada una de estas materias debera convertirse, si procede, en un `Knowledge
Object` especifico.

## Validaciones requeridas

Se ejecutara:

- `Schema Validation`;
- `Rule Engine`;
- `Planner View`;
- `Web View`;
- `AI Context`;
- `Checklist` derivada;
- `FAQ` derivada;
- `Client Response` derivada.

Todo debera validar sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores.

## Quality Gate final

La historia solo podra darse por cerrada si:

- valida contra `@ag/knowledge-contract@1.0.0`;
- no requiere cambios en contrato, `schema`, `Rule Engine` ni consumidores;
- genera correctamente `Planner View`, `Web View`, `AI Context`, `Checklist`,
  `FAQ` y `Client Response`;
- mantiene la prioridad en teletrabajo internacional y modelos hibridos;
- integra retenciones dentro del nucleo operativo;
- no invade el terreno del `Modelo 210`;
- deja claro cuando Espana si o no conserva potestad tributaria.

## Criterio de cierre del diseno

El diseno quedara correctamente implementado si el objeto resultante:

- mantiene congelada la arquitectura;
- no duplica doctrina ya existente;
- ocupa una posicion clara como consumidor y proveedor de conocimiento;
- resuelve materialmente la tributacion laboral internacional del no residente
  en Espana;
- traduce esa decision material en consecuencias operativas minimas, sin
  invadir el `Modelo 210`.
