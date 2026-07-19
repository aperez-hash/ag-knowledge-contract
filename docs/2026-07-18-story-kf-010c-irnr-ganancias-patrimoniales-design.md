# STORY-KF-010C - IRNR Ganancias Patrimoniales Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory continua el desarrollo del dominio `IRNR` con la base ya
certificada y congelada en `FEATURE FREEZE`:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- `Knowledge Library v2` certificada;
- `Planner Consumer` certificado;
- sin cambios permitidos en contrato, `schema`, `Rule Engine`,
  consumidores ni arquitectura.

La biblioteca ya dispone de la base doctrinal necesaria para abrir otra pieza
material del dominio:

- `Residencia Fiscal en Espana`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `IRNR - Rendimientos del Trabajo`;
- `IRNR - Rendimientos del Capital Inmobiliario`;
- `IRNR - Dividendos, Intereses y Canones`.

El siguiente corte debe construir el objeto canonico:

`IRNR - Ganancias Patrimoniales`

sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura.

## Objetivo

Construir el `Knowledge Object` canonico:

`IRNR - Ganancias Patrimoniales`

El objeto debe responder exclusivamente a esta pregunta:

**Como tributan en Espana las ganancias patrimoniales obtenidas por un
contribuyente no residente y cuales son sus consecuencias operativas
minimas?**

Debe validar integramente contra `@ag/knowledge-contract@1.0.0` sin introducir
cambios estructurales en el sistema.

## Enfoques considerados

### Opcion 1 - Objeto material-operativo general con alertas de escalado

Un unico objeto para ganancias patrimoniales de `IRNR`, con cobertura
operativa general de:

- inmuebles situados en Espana;
- acciones y participaciones;
- otros activos patrimoniales;
- `CDI`;
- retencion del `3%` cuando proceda;
- cumplimiento minimo.

Ventajas:

- mantiene el patron ya consolidado del dominio `IRNR`;
- reutiliza completamente `Residencia Fiscal`, `CDI` y `Modelo 210`;
- permite cubrir la mayor parte de los expedientes habituales sin fragmentar
  prematuramente la biblioteca;
- deja los supuestos societarios delicados como alertas doctrinales de
  escalado, no como agujeros invisibles.

Riesgos:

- exige disciplina para no convertir el objeto en un tratado completo de
  fiscalidad patrimonial internacional.

### Opcion 2 - Objeto profundo con casuistica societaria integrada

Un objeto unico que baje ya a supuestos finos de:

- participaciones significativas;
- subyacente inmobiliario;
- conflictos complejos de `CDI`;
- otras transmisiones patrimoniales sensibles.

Ventajas:

- mucha potencia doctrinal concentrada en una sola pieza.

Riesgos:

- mezcla niveles distintos de conocimiento;
- incrementa mucho el volumen del objeto;
- anticipa casuistica que puede merecer objetos posteriores o escalados
  especializados.

### Opcion 3 - Objeto casi limitado a inmuebles

Centrar el objeto casi por completo en transmisiones inmobiliarias,
apuntando solo de forma ligera las participaciones y otros activos.

Ventajas:

- maxima simplicidad inicial;
- fuerte alineacion con la practica mas visible del `IRNR`.

Riesgos:

- deja demasiado incompleto el dominio;
- obligaria a abrir pronto otro objeto complementario muy cercano;
- no responde bien a la promesa de cubrir ganancias patrimoniales como
  categoria material del `IRNR`.

## Recomendacion

Se adopta la **Opcion 1**.

El objeto sera un **objeto material-operativo general** sobre ganancias
patrimoniales en `IRNR`, con foco en:

- localizacion de la ganancia;
- activos que generan sujecion en Espana;
- diferencia entre no sujecion y exencion;
- papel de los `CDI`;
- exenciones o no sujeciones relevantes en enfoque general;
- retencion del `3%` en transmisiones inmobiliarias cuando proceda;
- cumplimiento operativo minimo via `Modelo 210`.

Las acciones y participaciones quedan incluidas, pero la casuistica
societaria fina no se desarrolla todavia como tratado completo. Se reflejara
solo como **alerta de escalado doctrinal** cuando el expediente salga del
marco general seguro del objeto.

## Posicion en la biblioteca

Este objeto se define como un **objeto material-operativo del dominio IRNR**
centrado en ganancias patrimoniales obtenidas por no residentes.

No es:

- un manual completo de `Modelo 210`;
- un objeto de rendimientos del trabajo;
- un objeto de rendimientos del capital inmobiliario;
- un objeto de dividendos, intereses y canones;
- un tratado completo de fiscalidad societaria internacional;
- un objeto de establecimientos permanentes;
- una guia de planificacion patrimonial.

Su papel es fijar la doctrina unica y reutilizable del despacho para decidir
cuando una ganancia patrimonial de un no residente tributa en Espana y cual es
su cierre operativo minimo.

## Frontera material aprobada

El alcance material aprobado es:

- transmision de inmuebles situados en Espana;
- transmision de acciones y participaciones cuando proceda analizarlas dentro
  del marco general del objeto;
- otros activos patrimoniales cuya ganancia pueda considerarse obtenida en
  Espana;
- exenciones o no sujeciones relevantes tratadas como bloque general
  operativo;
- `CDI`;
- retencion del `3%` en transmisiones inmobiliarias;
- cumplimiento operativo minimo.

Quedan fuera:

- rendimientos del trabajo;
- rendimientos del capital inmobiliario;
- dividendos, intereses y canones;
- establecimientos permanentes;
- cumplimentacion detallada del `Modelo 210`;
- planificacion patrimonial;
- desarrollo exhaustivo de casuistica societaria fina;
- catalogo completo de todas las exenciones posibles;
- analisis articulo por articulo de todos los convenios.

## Enfoque funcional aprobado

Se adopta un enfoque **material + cumplimiento operativo minimo**.

Esto significa que el objeto si debe resolver:

- cuando existe una transmision patrimonial relevante;
- cuando esa transmision genera realmente una ganancia patrimonial;
- que activos pueden generar tributacion en Espana;
- como se localiza la ganancia;
- cuando debe abrirse la capa de `CDI`;
- cuando existen no sujeciones y exenciones relevantes tratadas a nivel
  general, pero diferenciadas conceptualmente;
- cuando aparece la retencion del `3%` en inmuebles;
- como influye la copropiedad en el analisis material y formal;
- cuando procede declaracion, retencion, devolucion o archivo de evidencias.

Y no debe resolver:

- mecanica detallada de formulario;
- instrucciones de casillas;
- desarrollo exhaustivo de exenciones concretas;
- fiscalidad completa del pagador o adquirente fuera de la capa necesaria;
- test materiales propios de establecimientos permanentes;
- doctrina fina de participaciones complejas mas alla del marco general y la
  alerta de escalado.

## Dependencias doctrinales

### Consumes Doctrine From

- `Residencia Fiscal`
- `Convenios para Evitar la Doble Imposicion`
- `Modelo 210`

### Provides Doctrine To

- futuros objetos del dominio `IRNR`;
- `IRPF Internacional` (futuro);
- `Fiscalidad patrimonial internacional` (futuro);
- `Establecimientos Permanentes` (futuro), como relacion de frontera y
  escalado.

## Identidad doctrinal

La posicion del objeto dentro de la biblioteca queda fijada asi:

- `Residencia Fiscal` determina si el contribuyente queda dentro de la logica
  del `IRNR`;
- `CDI` limita, redistribuye o confirma la potestad espanola sobre la ganancia
  patrimonial;
- `Modelo 210` aporta la capa de cumplimiento cuando la conclusion material lo
  exige;
- `IRNR - Ganancias Patrimoniales` resuelve la tributacion material de la
  transmision patrimonial y sus consecuencias operativas minimas.

No podra duplicar doctrina ya modelada en residencia, `CDI` o `Modelo 210`.

## Decision Gateway

El objeto incorporara este flujo de decision reutilizable:

```text
Es residente fiscal en Espana?
        ↓
NO
        ↓
Existe una transmision patrimonial?
        ↓
Existe una ganancia patrimonial?
        ↓
El activo tiene conexion con Espana?
        ↓
Que activo se transmite?
  - inmueble en Espana
  - acciones/participaciones
  - otro activo
        ↓
La ganancia se considera obtenida en Espana?
        ↓
Existe no sujecion relevante?
        ↓
Existe exencion relevante?
        ↓
Existe CDI aplicable?
        ↓
Espana conserva la potestad tributaria?
        ↓
Existe obligacion de retener?
        ↓
Tributacion IRNR
        ↓
Cumplimiento operativo minimo
```

Notas operativas del gateway:

- la bifurcacion por tipo de activo debe evitar analisis innecesarios antes de
  abrir `CDI`, retencion o cumplimiento;
- en inmuebles, la rama debe hacer visible desde el principio la posible
  retencion del `3%`;
- cuando exista copropiedad y afecte a la determinacion del obligado o de la
  atribucion de la ganancia, el gateway debe permitir esa lectura transversal.

## Regla metodologica central

La secuencia obligatoria del analisis sera:

1. residencia fiscal;
2. existencia de transmision y de ganancia patrimonial;
3. identificacion del activo transmitido;
4. localizacion de la ganancia por norma interna;
5. distincion entre no sujecion y exencion, en enfoque general;
6. modulacion por `CDI`;
7. retencion cuando proceda;
8. cierre operativo minimo.

La no sujecion y la exencion no deben fundirse en una sola etiqueta
metodologica:

- **No sujecion**: el hecho imponible no nace conforme a la normativa
  aplicable.
- **Exencion**: existe hecho imponible, pero la norma libera de tributacion.

Esto evita errores tipicos como:

- analizar `CDI` o retenciones sin haber confirmado que realmente existe una
  ganancia patrimonial;
- confundir no sujecion con exencion;
- aplicar el `CDI` antes de confirmar la fuente espanola de la ganancia;
- tratar todas las transmisiones patrimoniales como si fueran equivalentes;
- reducir la retencion del `3%` a una consecuencia menor en vez de integrarla
  en el nucleo del expediente;
- relegar la copropiedad a un ejemplo en vez de tratarla como regla
  transversal;
- convertir el objeto en una guia detallada del formulario.

## Estructura interna del contenido

El `TechnicalDevelopmentBlock` seguira este orden:

1. inmuebles situados en Espana;
2. acciones y participaciones;
3. otros activos patrimoniales;
4. no sujeciones relevantes;
5. exenciones relevantes;
6. `CDI`;
7. retencion del `3%`;
8. cumplimiento operativo minimo.

La copropiedad no se tratara como una nota lateral ni solo como caso
practico. Debe aparecer como **regla operativa transversal** dentro del
`TechnicalDevelopmentBlock` y del `ProcedureBlock`, porque afecta a:

- la determinacion de la ganancia;
- la atribucion por contribuyente;
- la retencion del `3%` cuando hay inmueble;
- el cierre formal.

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

- cuando una ganancia patrimonial tributa en Espana;
- que activos pueden quedar sujetos;
- como interviene el `CDI`;
- que consecuencias practicas minimas nacen;
- cuando puede aparecer la retencion del `3%`.

Debe ser apto para salidas derivadas y no sonar a manual interno cerrado ni a
formulario.

### LegalBasisBlock

Debe explicar:

- concepto de ganancia patrimonial en el `IRNR`;
- criterios de sujecion;
- interaccion con residencia fiscal;
- relacion con los `CDI`;
- reglas generales de determinacion de la tributacion.

No debe copiar textos legales; debe traducirlos a doctrina operativa.

### TechnicalDevelopmentBlock

Debe desarrollar operativamente:

- transmision de inmuebles situados en Espana;
- transmision de acciones y participaciones, con alertas expresas de escalado
  en supuestos finos;
- otros activos patrimoniales sujetos;
- criterio de localizacion;
- no sujeciones relevantes tratadas a nivel general;
- exenciones relevantes tratadas a nivel general;
- interaccion con `CDI`;
- retencion especifica del `3%` en transmisiones inmobiliarias cuando proceda;
- cumplimiento operativo minimo;
- copropiedad como regla transversal.

Debe centrarse en el criterio operativo y no en la exegesis completa de
casuistica societaria.

### ProcedureBlock

El flujo operativo debe reflejar:

1. determinar residencia fiscal;
2. confirmar que existe transmision y ganancia patrimonial;
3. identificar el activo transmitido;
4. localizar la ganancia;
5. verificar la normativa interna;
6. separar no sujecion de exencion cuando proceda;
7. analizar el `CDI`;
8. determinar la potestad tributaria;
9. verificar retenciones cuando procedan;
10. determinar obligaciones formales;
11. presentar declaracion cuando corresponda;
12. archivar evidencias.

La copropiedad debe aparecer expresamente dentro del procedimiento, no solo en
casos.

### ChecklistBlock

Debe separar:

- `Obligatorio`
- `Recomendable`

Con foco en:

- residencia;
- identificacion del activo;
- localizacion de la ganancia;
- revision de `CDI`;
- retencion cuando proceda;
- documentacion del valor de adquisicion y transmision;
- cierre formal minimo.

### FaqBlock

Debe responder preguntas reales como:

- tributa en Espana la venta de un inmueble situado en Espana?;
- como afecta un `CDI` a la transmision?;
- existe retencion en la venta de inmuebles?;
- debo presentar `Modelo 210`?;
- que ocurre con la venta de participaciones?

No debe intentar agotar toda la casuistica societaria.

### RiskBlock

Debe cubrir, al menos, riesgos de:

- cumplimiento;
- documental;
- interpretativo;
- internacional;
- procedimental.

Riesgos minimos:

- localizar incorrectamente la ganancia;
- aplicar incorrectamente un `CDI`;
- omitir retenciones obligatorias;
- documentar incorrectamente el valor de adquisicion o transmision;
- incumplir obligaciones formales.

### RequiredDocumentBlock

Debe separar:

- `Obligatorios`
- `Recomendables`

Y reflejar una **Evidence Matrix** util para `Planner`, `Web` e `IA`, con:

- documento;
- finalidad;
- fuerza probatoria;
- momento de utilizacion.

Debe incluir como minimo:

- escritura o contrato de transmision;
- documentacion acreditativa del valor de adquisicion;
- documentacion del valor de transmision;
- certificado de residencia fiscal;
- justificantes de retenciones cuando procedan.

### CaseStudyBlock

Debe desarrollar al menos cinco casos:

1. venta de inmueble situado en Espana;
2. venta de participaciones con `CDI` aplicable;
3. ganancia patrimonial exenta;
4. copropiedad del activo transmitido;
5. error en la determinacion de la residencia con impacto en la tributacion.

Cada caso debe incluir:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

### InternalReferenceBlock

Debe recoger:

- dossier juridico de la historia;
- referencias internas reales ya existentes;
- conexiones con objetos doctrinales consumidos;
- referencias de continuidad para el dominio `IRNR`.

No debe inventar referencias internas ficticias.

## Relations

El objeto se relacionara con:

- `Residencia Fiscal`;
- `Convenios para Evitar la Doble Imposicion`;
- `Modelo 210`;
- `IRNR - Rendimientos del Trabajo`;
- `IRNR - Rendimientos del Capital Inmobiliario`;
- `IRNR - Dividendos, Intereses y Canones`;
- `Establecimientos Permanentes` (futuro).

Debe declarar expresamente:

```text
Consumes Doctrine From:

- Residencia Fiscal
- Convenios para Evitar la Doble Imposicion
- Modelo 210
```

## Knowledge Coverage minimo

El objeto debera cubrir como minimo:

- activos sujetos;
- localizacion de la ganancia;
- potestad tributaria;
- aplicacion de `CDI`;
- retenciones especificas;
- cumplimiento operativo minimo;
- documentacion;
- procedimiento;
- errores frecuentes.

## Resultado esperado del diseno

El objeto `IRNR - Ganancias Patrimoniales` queda definido como:

- pieza material-operativa general del dominio `IRNR`;
- reutilizable por `Planner`, `Web` e `IA`;
- no redundante con residencia, `CDI` o `Modelo 210`;
- suficientemente amplio para cubrir inmuebles, participaciones y otros
  activos;
- suficientemente disciplinado para dejar la casuistica fina como alerta de
  escalado y no como expansion desordenada del objeto.
