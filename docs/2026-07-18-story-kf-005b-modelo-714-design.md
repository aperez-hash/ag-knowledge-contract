# STORY-KF-005B - Modelo 714 Knowledge Object Design

## Contexto

Knowledge Factory ha completado ya su primera fase de produccion con el contrato canonico `@ag/knowledge-contract@1.0.0` congelado, `Modelo 210` y `Modelo 720` integrados y el pipeline de derivaciones validado en uso real. Este nuevo corte no puede reabrir arquitectura, contrato, enums, bloques ni consumidores. El objetivo es producir el tercer `Knowledge Object` oficial reutilizando exactamente el mismo armazon ya certificado.

El objeto se implementara en el repo neutral `ag-knowledge-contract`, en una unica rama y con una unica `Draft PR`, siguiendo el mismo patron operativo ya estabilizado en `STORY-KF-004A` y `STORY-KF-005A`.

## Objetivo

Construir el `Knowledge Object` canonico:

`Modelo 714 - Impuesto sobre el Patrimonio`

de forma que valide integramente contra `@ag/knowledge-contract@1.0.0` sin requerir cambios estructurales y permita generar correctamente:

- `Planner View`
- `Web View`
- `AI Context`
- `Checklist`
- `FAQ`
- `Client Response`

## Pregunta central del objeto

El `Knowledge Object` debe responder de forma consistente a esta pregunta:

**Debe este contribuyente presentar el Modelo 714 y como se determina correctamente su obligacion tributaria?**

Esta decision de diseno implica que el objeto sera analitico y de criterio tributario, no un manual de cumplimentacion del formulario ni una guia de pantallas de la AEAT.

## Principios de diseno

### 1. Objeto analitico, no formulario

El contenido canonico debe centrarse en:

- residencia fiscal;
- obligacion personal frente a obligacion real;
- patrimonio gravado;
- reglas de valoracion;
- exenciones;
- minimos y cuota;
- obligacion de declarar;
- interaccion con normativa autonómica;
- relacion operativa con `ITSGF`.

Quedan fuera del nucleo canonico:

- casillas concretas del modelo;
- pantallas de la AEAT;
- instrucciones mecanicas de cumplimentacion;
- detalles formales del envio.

Ese contenido, si se necesitara, debera vivir en derivadas operativas o guias internas, no en el objeto bruto.

### 2. Reutilizacion total de plataforma

Se reutilizaran sin cambios:

- contrato canonico;
- schema;
- tipos generados;
- taxonomias y enums;
- pipeline de derivaciones;
- validadores;
- `Rule Engine`;
- consumidores existentes.

No se permite crear bloques nuevos ni duplicar logica doctrinal fuera del `Knowledge Object`.

### 3. Alcance doctrinal acotado

El objeto representa exclusivamente la obligacion de analizar y, en su caso, presentar el `Modelo 714 - Impuesto sobre el Patrimonio`.

No debe derivar hacia:

- planificacion patrimonial general;
- sucesiones y donaciones;
- fiscalidad internacional general;
- `Modelo 720`;
- `Modelo 721`;
- procedimientos inspectores;
- doctrina completa de `ITSGF` como objeto autonomo.

## Enfoque material aprobado

### 1. Residencia fiscal como primer eje

El analisis debe arrancar siempre por la residencia fiscal del contribuyente, porque de ella depende:

- la existencia de obligacion personal o real;
- el patrimonio que entra en el perimetro;
- el punto de conexion territorial;
- la necesidad de analizar normativa autonómica;
- el alcance del expediente.

El objeto debe dejar claro el orden logico: primero residencia, despues naturaleza de la obligacion y solo entonces determinacion de base, cuota y obligacion de declarar.

### 2. Obligacion de declarar como nucleo decisorio

El centro del objeto no sera solo calcular una cuota, sino determinar correctamente si existe o no obligacion de presentar.

Por tanto, el objeto debe cubrir expresamente:

- base imponible;
- base liquidable;
- cuota;
- umbrales relevantes;
- supuestos con obligacion de presentar incluso sin cuota a ingresar.

Este ultimo punto no se tratara como FAQ secundaria, sino como parte central del razonamiento tecnico y del procedimiento.

### 3. Normativa autonómica en nivel operativo profundo

La normativa autonómica no debe resolverse como un catalogo exhaustivo por comunidades, porque eso envejece rapido y rompe el equilibrio del objeto. En su lugar, el diseño debe incorporar:

- como identificar la comunidad competente;
- que elementos suelen variar por normativa autonómica;
- que piezas siguen siendo estatales;
- como abrir la revision autonómica dentro del expediente;
- que patrones materiales tienen impacto real en la decision tributaria.

Se prestara especial atencion a minimos exentos, tarifa, bonificaciones y reglas con efecto practico en la obligacion o en la cuota.

### 4. Relacion con ITSGF como bloque separado pero conectado

La interaccion con el `Impuesto Temporal de Solidaridad de las Grandes Fortunas` debe explicarse, pero sin convertir el objeto en un hibrido `714 + ITSGF`.

El diseño aprobado es:

- analisis principal centrado en Patrimonio;
- bloque tecnico separado al final del razonamiento principal;
- conexion fuerte para explicar cuando debe abrirse el analisis conjunto;
- exposicion clara del orden de trabajo:
  1. resolver Patrimonio;
  2. revisar si ademas entra en juego `ITSGF`.

## Cobertura tecnica requerida

### Executive Summary

Debe responder, de forma reutilizable para `Planner`, `Web` e `AI`:

- que es el `Modelo 714`;
- quien debe analizarlo;
- cuando puede existir obligacion;
- como se determina la obligacion material;
- que bienes y exenciones son mas relevantes;
- por que importa operativamente.

### LegalBasisBlock

Debe explicar:

- naturaleza del impuesto;
- Ley 19/1991 y normas complementarias;
- reparto Estado / Comunidades Autónomas;
- interaccion normativa con `ITSGF` cuando proceda.

No debe copiar articulado legal ni convertirse en recopilacion normativa literal.

### TechnicalDevelopmentBlock

Debe ser el nucleo doctrinal del objeto e incluir:

- sujetos pasivos;
- obligacion personal y real;
- residencia fiscal y punto de conexion;
- patrimonio gravado;
- exenciones relevantes;
- minimo exento;
- vivienda habitual;
- bienes empresariales y participaciones exentas cuando proceda;
- devengo;
- reglas autonómicas con impacto material;
- obligacion de presentar aun sin cuota;
- relacion operativa con `ITSGF`.

Tambien debe incorporar valoracion operativa tipologica de las principales clases de activos, sin aspiracion enciclopedica:

- inmuebles;
- valores cotizados;
- participaciones no cotizadas;
- seguros y rentas;
- joyas, vehiculos, embarcaciones y bienes singulares;
- bienes y participaciones potencialmente exentos por actividad economica o negocio familiar.

### ProcedureBlock

El flujo operativo debe cubrir de forma completa:

1. determinar residencia;
2. identificar patrimonio;
3. clasificar activos;
4. valorar activos;
5. aplicar exenciones;
6. calcular base imponible;
7. aplicar reducciones, minimo exento y reglas autonómicas;
8. determinar cuota;
9. verificar obligacion de declarar, incluso sin cuota a ingresar;
10. revisar si debe abrirse tambien analisis de `ITSGF`;
11. preparar declaracion y cierre documental del expediente.

### ChecklistBlock

Debe separarse en:

- `obligatorio`
- `recomendable`

y servir de base derivable para `Planner` y para guias operativas internas.

### FaqBlock

Debe responder preguntas reales como:

- si existe obligacion de declarar sin cuota a ingresar;
- como se valora un inmueble;
- como se tratan acciones cotizadas y participaciones no cotizadas;
- como opera la vivienda habitual;
- como afecta la normativa autonómica;
- cuando debe analizarse tambien `ITSGF`.

### RiskBlock

Debe incluir, como minimo, riesgos de:

- cumplimiento;
- valoracion;
- documental;
- interpretacion;
- procedimiento.

Riesgos minimos esperados:

- valoracion incorrecta;
- omision de activos;
- aplicacion indebida de exenciones;
- error de residencia;
- error en normativa autonómica;
- no abrir a tiempo el analisis conjunto con `ITSGF`.

### RequiredDocumentBlock

Debe separar:

- obligatorios;
- recomendables;

e indicar finalidad practica y momento de uso dentro del expediente.

### CaseStudyBlock

Debe incluir al menos estos cuatro casos:

1. patrimonio inferior al minimo exento;
2. vivienda habitual y cartera de inversion;
3. empresario con bienes potencialmente exentos;
4. no residente sujeto por obligacion real.

Cada caso incluira:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

### InternalReferenceBlock

Solo podra enlazar referencias internas reales existentes en el despacho. No se crearan referencias ficticias para completar estructura.

### Relations

Se relacionara unicamente con objetos reales o planificados oficialmente, en especial:

- Residencia Fiscal;
- Modelo 720;
- Modelo 721;
- Convenios de Doble Imposicion;
- `ITSGF`.

## Fuentes primarias autorizadas

La investigacion doctrinal se construira solo sobre:

- AEAT: `Modelo 714`, instrucciones oficiales y ayuda tecnica;
- `Ley 19/1991`, del Impuesto sobre el Patrimonio;
- `Ley 35/2006`, cuando la interaccion sea necesaria;
- Leyes de Presupuestos con incidencia real en el impuesto;
- normativa autonómica aplicable en nivel de criterio operativo;
- normativa vigente sobre `ITSGF` cuando afecte al analisis del expediente;
- jurisprudencia con impacto operativo real.

## Estrategia de derivacion

No se duplicara contenido doctrinal entre salidas. El flujo sera el ya estabilizado:

`Knowledge Object canonico -> derivaciones controladas`

Las derivadas deben limitarse a reordenar, resumir o filtrar contenido segun politica de canal, sin introducir otro modelo de conocimiento.

## Criterios de aceptacion del diseno

Este diseño se considerara correcto si el futuro objeto:

- valida contra `@ag/knowledge-contract@1.0.0`;
- no exige cambios estructurales;
- mantiene `FEATURE FREEZE`;
- responde de forma consistente a la pregunta central del expediente;
- genera correctamente todas las vistas derivadas;
- cubre al menos el 80 por ciento de las consultas habituales sobre `Modelo 714`;
- permite separar con claridad Patrimonio, `ITSGF` y otras materias proximas sin mezclar objetos.

## Fuera de alcance

No se desarrollara en esta historia:

- `ITSGF` como objeto autonomo completo;
- sucesiones y donaciones;
- planificacion patrimonial general;
- inventario exhaustivo por comunidades autonomas;
- formulario o pantallas AEAT;
- arquitectura nueva;
- cambios de contrato o consumidor.

## Siguiente paso

Tras validar este diseño por escrito, el siguiente paso sera redactar el plan de ejecucion de `STORY-KF-005B` y, despues, implementar el `Knowledge Object` en una sola rama con una sola `Draft PR`.
