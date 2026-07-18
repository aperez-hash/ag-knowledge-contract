# STORY-KF-008C - Modelo 151 Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory mantiene `FEATURE FREEZE` completo sobre su base
arquitectonica:

- contrato canonico `@ag/knowledge-contract@1.0.0` certificado;
- biblioteca v1 certificada;
- `Planner Consumer` certificado;
- arquitectura, `schema`, tipos generados, bloques, enums y `Rule Engine`
  congelados;
- objetos doctrinales transversales ya disponibles en `main`:
  - `Residencia Fiscal en Espana`;
  - `Convenios de Doble Imposicion`.

El siguiente corte debe apoyarse en esas dos piezas doctrinales ya cerradas
para construir un objeto operativo sobre el regimen especial aplicable a
trabajadores, profesionales, emprendedores e inversores desplazados a
territorio espanol.

## Objetivo

Construir el `Knowledge Object` canonico:

`Modelo 151 - Regimen especial aplicable a los trabajadores, profesionales, emprendedores e inversores desplazados a territorio espanol`

El objeto debe responder a una sola pregunta matriz:

**Puede esta persona acogerse al regimen especial de desplazados y como debe gestionarse correctamente su aplicacion durante su vigencia?**

El resultado debe validar integramente contra `@ag/knowledge-contract@1.0.0`,
sin modificar contrato, `schema`, tipos generados, `Rule Engine`,
consumidores ni arquitectura.

## Alcance

Se permite:

- crear un nuevo `Knowledge Object` canonico sobre el regimen especial;
- anadir su dossier juridico primario;
- generar sus derivadas oficiales (`Planner`, `Web`, `AI`, `Checklist`, `FAQ`
  y `Client Response`);
- anadir validadores y pruebas focales de historia siguiendo el patron ya
  certificado del repo;
- actualizar documentacion tecnica cuando refleje fielmente el nuevo objeto y
  sus validaciones.

No se permite:

- modificar `@ag/knowledge-contract`;
- cambiar `schema`, `generated`, bloques, enums o taxonomias;
- alterar `Rule Engine`, consumidores o arquitectura;
- convertir este objeto en una guia casilla a casilla del formulario;
- desarrollar el calculo integro del `IRPF`;
- bajar a tributacion renta por renta;
- desplegar analisis convenio por convenio;
- cubrir `stock options`, `carried interest`, planificacion retributiva o
  fiscalidad internacional completa.

## Decision de diseno aprobada

Se adopta un enfoque **centrado en el regimen especial** y no en los modelos
formales.

1. El objeto se organiza alrededor de la elegibilidad, acceso, duracion,
   familiares, mantenimiento y perdida del regimen.
2. El `Modelo 149` actua como compuerta de entrada y ejercicio de la opcion.
3. El `Modelo 151` actua como consecuencia anual de mantenimiento y cierre del
   regimen, no como eje doctrinal del objeto.
4. `Residencia Fiscal` y `CDI` se consumen como doctrina previa y no se
   duplican.

Esta decision evita convertir el objeto en un manual de campana y mantiene su
valor transversal para `Planner`, `Web`, `AI` y futuros objetos dependientes.

## Enfoque arquitectonico

El objeto reutiliza exactamente el armazon ya certificado en el repo:

- misma entidad raiz `KnowledgeObject`;
- mismos bloques tipados;
- mismas reglas de gobierno;
- mismas politicas de canal;
- mismo patron de derivacion;
- misma estrategia de validacion por historia.

No se crea ningun carril nuevo ni ningun bloque especial para el regimen. El
objetivo es demostrar que la plataforma actual soporta una pieza operativa de
alta relevancia sin requerir adaptaciones estructurales.

## Frontera funcional del objeto

El objeto debe permitir resolver:

- si existe desplazamiento relevante a Espana;
- si se adquiere residencia fiscal en Espana;
- si el contribuyente principal puede optar al regimen;
- si existen familiares potencialmente elegibles;
- si esos familiares cumplen sus requisitos especificos;
- como se ejercita la opcion;
- como se mantiene el regimen durante su vigencia;
- cuando se pierde o deja de ser aplicable.

El objeto no debe resolver:

- el calculo completo del `IRPF`;
- la cumplimentacion casilla a casilla de `Modelo 149` o `Modelo 151`;
- la tributacion detallada de cada renta;
- el desarrollo completo de convenios bilaterales;
- los tests materiales de establecimiento permanente;
- materias futuras que deban ser objetos propios.

## Dependencias doctrinales

Este objeto consume doctrina ya existente de:

- `Residencia Fiscal en Espana`;
- `Convenios de Doble Imposicion`.

Eso implica:

- no reexplicar desde cero los criterios generales de residencia;
- no reescribir la teoria general del `tie-breaker`;
- no duplicar el marco general de aplicacion de los convenios.

El objeto solo desarrollara la relacion practica de esas piezas doctrinales
con el regimen especial.

## Fuentes autorizadas

Se utilizaran solo fuentes primarias o doctrina/jurisprudencia con impacto
operativo real:

- Ley 35/2006 del `IRPF`, especialmente el articulo 93 en su redaccion
  vigente;
- Reglamento del `IRPF`, especialmente el desarrollo del regimen especial;
- ordenes vigentes relativas a `Modelo 149` y `Modelo 151`;
- instrucciones y paginas oficiales de la `AEAT` sobre el regimen y sus
  modelos;
- consultas vinculantes `DGT` relevantes y consolidadas;
- jurisprudencia solo cuando cambie materialmente el razonamiento operativo.

No se utilizaran resenas secundarias como fuente principal del criterio.

## Estructura prevista del objeto

Fichero canonico:

`examples/modelo-151-regimen-trabajadores-desplazados.json`

Raiz prevista:

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

Se implementaran todos los bloques canonicos ya aprobados:

- `legal_basis`
- `technical_development`
- `procedure`
- `checklist`
- `faq`
- `risk`
- `required_documentation`
- `case_study`
- `internal_reference`

No se introducira ningun tipo de bloque adicional.

## Diseno de contenido por bloque

### Executive Summary

Debe explicar de forma reutilizable:

- que es el regimen especial;
- quien puede acogerse;
- cuales son los requisitos nucleares;
- como se articula la opcion;
- cuanto dura;
- que relacion guardan `Modelo 149` y `Modelo 151`;
- por que la residencia fiscal y la posible capa de convenio son previas al
  analisis del regimen.

Debe poder alimentar sin reescritura importante:

- `Planner View`;
- `Web View`;
- `AI Context`;
- `Client Response`.

### LegalBasisBlock

Debe exponer, sin copiar normas:

- fundamento legal y finalidad del regimen;
- evolucion normativa reciente;
- relacion con la adquisicion de residencia fiscal;
- relacion con `CDI` cuando resulte relevante;
- marco formal de `Modelo 149` y `Modelo 151`.

### TechnicalDevelopmentBlock

Sera el nucleo doctrinal y operativo del objeto. Debe organizarse con este
orden:

1. acceso al regimen del contribuyente principal;
2. acceso al regimen de los familiares;
3. relacion entre principal y familiares;
4. momento de incorporacion;
5. permanencia en el regimen del principal y de los familiares;
6. causas de exclusion inicial;
7. perdida o exclusion sobrevenida;
8. efectos generales de tributacion y gestion anual.

Debe cubrir especificamente:

- desplazamiento a Espana;
- adquisicion de residencia fiscal;
- periodo previo de no residencia exigido;
- actividades admitidas;
- trabajadores;
- administradores;
- emprendedores;
- profesionales altamente cualificados;
- investigadores;
- familiares cuando proceda;
- exclusiones y limites iniciales;
- permanencia, control anual, renuncia y perdida;
- duracion del regimen;
- interaccion general con `Modelo 149` y `Modelo 151`.

La capa de familiares no sera un anexo. Se trata como dominio nuclear porque
modifica la logica de decision del expediente y la configuracion operativa del
caso.

La separacion entre **acceso** y **permanencia** debe ser explicita. El objeto
no puede tratar el regimen como una foto fija: primero resuelve la entrada
juridica en el regimen y despues su mantenimiento, control anual y salida.

### Decision Gateway

El objeto incorporara un flujo logico de decision reutilizable por `Planner`:

```text
Existe desplazamiento a Espana?
        ↓
Se adquiere residencia fiscal?
        ↓
El contribuyente principal puede optar al regimen?
        ↓
Existe causa de exclusion?
        ↓
Existen familiares potencialmente elegibles?
        ↓
Cumplen sus requisitos especificos?
        ↓
Determinacion del regimen aplicable a cada miembro
        ↓
Opcion inicial y gestion anual del regimen
```

Este `Decision Gateway` debe dejar claro que el regimen no se analiza de forma
abstracta ni aislada del hecho previo de residencia fiscal.

### Cronologia operativa

El objeto incorporara ademas una linea temporal reutilizable por `Planner` y
por las derivadas operativas:

```text
Desplazamiento
        ↓
Adquisicion de residencia
        ↓
Plazo para ejercer la opcion
        ↓
Aplicacion del regimen
        ↓
Control anual
        ↓
Finalizacion o perdida
```

Esta cronologia debe reflejarse tanto en `TechnicalDevelopmentBlock` como en
`ProcedureBlock`, porque sera la base natural de checklists, alertas y
recordatorios.

### ProcedureBlock

Debe describir el flujo operativo completo:

1. verificar desplazamiento;
2. confirmar residencia fiscal;
3. analizar requisitos de acceso del contribuyente principal;
4. revisar exclusiones iniciales;
5. identificar familiares elegibles;
6. verificar requisitos de acceso de cada familiar;
7. confirmar plazo de opcion;
8. preparar `Modelo 149` cuando proceda;
9. verificar admision del regimen;
10. controlar permanencia y mantenimiento anual;
11. gestionar la tributacion anual y el `Modelo 151` cuando corresponda;
12. controlar causas de perdida o exclusion sobrevenida;
13. documentar el expediente.

### ChecklistBlock

Debe separar:

- `obligatorio`;
- `recomendable`.

La checklist debe servir como herramienta directa para `Planner`.

### FaqBlock

Debe responder preguntas reales como:

- cuando puedo optar al regimen;
- que ocurre si llego a Espana a mitad de ano;
- puedo trabajar para una empresa extranjera;
- pierdo el regimen si cambio de empresa o de funcion;
- que sucede si dejo de cumplir requisitos;
- cual es la relacion entre `Modelo 149` y `Modelo 151`;
- pueden acogerse mis familiares y en que condiciones.

### RiskBlock

Debe incluir categorias:

- cumplimiento;
- documental;
- interpretativo;
- internacional;
- procedimental.

Riesgos minimos:

- presentacion fuera de plazo;
- incumplimiento de requisitos;
- error en la residencia fiscal de partida;
- inclusion indebida o exclusion indebida de familiares;
- aplicacion incorrecta de `CDI` cuando resulte relevante;
- perdida sobrevenida del regimen no detectada a tiempo.

### RequiredDocumentBlock

Debe separar:

- `obligatorios`;
- `recomendables`.

Debe incluir, al menos:

- contrato laboral o documentacion equivalente;
- documentacion societaria;
- certificado de residencia anterior;
- documentacion del desplazamiento;
- documentacion de alta en Espana;
- documentacion justificativa de la actividad;
- documentacion especifica de familiares cuando proceda.

### Evidence Matrix

Dentro de `RequiredDocumentBlock` se incorporara una matriz practica con:

- documento;
- finalidad;
- fuerza probatoria;
- momento de utilizacion.

Debe servir para orientar la preparacion del expediente y la defensa de la
elegibilidad.

### CaseStudyBlock

Debe desarrollar al menos cinco casos:

1. trabajador desplazado contratado por empresa espanola;
2. directivo trasladado desde grupo multinacional;
3. administrador que cumple requisitos;
4. profesional altamente cualificado;
5. nucleo familiar con incorporacion posterior de conyuge e hijos.

Cada caso debe incluir:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

El caso familiar es obligatorio para reflejar el caracter nuclear de esta
dimension del regimen.

### InternalReferenceBlock

Solo anadira referencias internas reales ya existentes. No se crean referencias
ficticias.

## Relaciones

Debe relacionarse con:

- `Residencia Fiscal`;
- `Convenios de Doble Imposicion`;
- `Modelo 210`;
- `IRPF` futuro;
- `IRNR` futuro;
- `Fiscalidad Internacional`.

Ademas declarara expresamente:

```text
Consumes Doctrine From:

- Residencia Fiscal
- Convenios de Doble Imposicion
```

Esto deja claro que el objeto depende de doctrina transversal previa y no debe
convertirse en una repeticion de esos marcos.

Tambien declarara una seccion funcional adicional:

```text
Delegated Analysis

- Residencia Fiscal -> determinacion de la residencia.
- CDI -> resolucion de conflictos internacionales cuando proceda.
```

Esa nota debe hacer visible que `Modelo 151` no reimplementa la logica
transversal ya resuelta por otros objetos de la biblioteca.

## Cobertura minima esperada

El objeto debe cubrir como minimo:

- requisitos del regimen;
- adquisicion de residencia fiscal;
- plazo de opcion;
- actividades admitidas;
- administradores;
- emprendedores;
- profesionales altamente cualificados;
- investigadores;
- familiares;
- exclusiones;
- duracion;
- obligaciones formales;
- perdida del regimen;
- documentacion;
- procedimiento completo;
- errores frecuentes.

## Fuera de alcance

No se desarrollan en esta historia:

- calculo integro del `IRPF`;
- analisis detallado renta por renta;
- `stock options`;
- `carried interest`;
- planificacion retributiva;
- analisis convenio por convenio;
- establecimiento permanente mas alla de su deteccion introductoria;
- fiscalidad internacional completa de personas desplazadas.

Cada una de estas materias debera convertirse, si procede, en un `Knowledge
Object` independiente o en una derivacion operativa posterior.

## Estrategia de validacion

Se ejecutaran, siguiendo el patron del repo:

- validacion `schema`;
- validacion semantica de historia;
- `Rule Engine`;
- `Planner View`;
- `Web View`;
- `AI Context`;
- `Checklist`;
- `FAQ`;
- `Client Response`;
- prueba focal automatizada;
- `check` completo del paquete.

Todo debe validar sin modificar:

- contrato;
- `schema`;
- `Rule Engine`;
- consumidores;
- arquitectura.

## Artefactos previstos

Se preve:

- `examples/modelo-151-regimen-trabajadores-desplazados.json`
- dossier primario juridico;
- helper/story scripts;
- test focal;
- derivadas `Planner`, `Web`, `AI`, `Checklist`, `FAQ` y `Client Response`;
- informe de validacion;
- borrador de PR.

## Criterio de cierre del diseno

Este diseno quedara correctamente implementado si el objeto resultante:

- valida contra `@ag/knowledge-contract@1.0.0`;
- no requiere cambios estructurales;
- mantiene congelada la arquitectura;
- reutiliza doctrina previa sin duplicarla;
- trata la capa de familiares como dominio nuclear;
- usa `Modelo 149` como entrada y `Modelo 151` como gestion anual, sin perder
  el foco en el regimen;
- genera todas las vistas derivadas coherentes sin duplicacion de contenido.
