# STORY-KF-008B - Convenios de Doble Imposicion Knowledge Object

## Estado

Diseno aprobado para ejecucion dentro de `EPIC-KF-007 - Knowledge Production Cycle 2`.

## Contexto

Knowledge Factory ya tiene certificadas su arquitectura, contrato y biblioteca v1, y ha incorporado el primer objeto transversal del segundo ciclo: `Residencia Fiscal en Espana`.

El siguiente hueco doctrinal real no es un modelo tributario adicional, sino la capa metodologica que explica como debe analizarse un Convenio para Evitar la Doble Imposicion (`CDI`) cuando existe un elemento internacional.

Este objeto debe reutilizarse despues por `Residencia Fiscal`, `Modelo 210`, `Modelo 714`, `Modelo 720`, `Modelo 721`, `Modelo 151`, `IRPF`, `IRNR` y futuros objetos de fiscalidad internacional.

## Objetivo

Implementar un `Knowledge Object` canonico titulado:

`Convenios para Evitar la Doble Imposicion (CDI)`

que valide integramente contra `@ag/knowledge-contract@1.0.0` y funcione como marco doctrinal transversal para responder una sola pregunta:

> Como se determina y aplica un Convenio para Evitar la Doble Imposicion cuando existe un elemento internacional.

## Decision de alcance

El objeto se queda en una capa doctrinal general pura.

No desarrolla un convenio concreto.

No desarrolla aun categorias materiales especificas de renta o patrimonio.

No se convierte en un tratado completo de fiscalidad internacional.

Su rol es metodologico: explicar cuando un CDI entra en juego, como se relaciona con la norma interna, que orden de analisis debe seguirse y que evidencias suelen ser necesarias para sostener la conclusion.

## Principios fijados

### 1. Objeto transversal puro

El objeto explica el marco comun aplicable a los CDI suscritos por Espana.

No debe entrar en analisis pais por pais ni en comparativas bilaterales extensas.

### 2. Un CDI no crea por si solo una obligacion tributaria nueva

El objeto debe dejar expresamente fijado que un CDI no inventa una obligacion tributaria autonoma.

Su funcion es limitar, distribuir o coordinar potestades tributarias respecto de una obligacion que nace en la normativa interna aplicable.

### 3. El Modelo OCDE y sus Comentarios tienen funcion interpretativa

El objeto puede apoyarse en el Modelo OCDE y en sus Comentarios como marco interpretativo general cuando ello tenga valor operativo reconocido.

Pero no debe presentar el Modelo OCDE ni sus Comentarios como sustitutos del texto del convenio concreto aplicable.

### 4. Establecimiento permanente solo en nivel introductorio

La vision de establecimiento permanente debe servir para detectar el posible problema y orientar la derivacion futura.

No debe desarrollar aun sus tests materiales ni resolver casuistica profunda de `EP`.

## Fuera de alcance

Este objeto no debe desarrollar todavia:

- dividendos;
- intereses;
- canones;
- rentas inmobiliarias;
- trabajo dependiente;
- administradores;
- artistas y deportistas;
- pensiones;
- estudiantes;
- ganancias patrimoniales;
- detalle de establecimiento permanente;
- aplicacion articulo por articulo de convenios concretos;
- analisis pais por pais.

Ese contenido, si llega a ser necesario, debera abrirse como objetos especializados relacionados con este.

## Relacion con otros objetos

La biblioteca doctrinal queda ordenada asi:

- `Residencia Fiscal en Espana` responde donde es residente el contribuyente.
- `Convenios para Evitar la Doble Imposicion (CDI)` responde como se resuelve el conflicto internacional y bajo que principios se distribuye la potestad tributaria.
- Los objetos tributarios concretos (`Modelo 210`, `Modelo 151`, `IRNR`, etc.) responden como tributa una renta, patrimonio u obligacion concreta.

## Estructura obligatoria del objeto

El objeto debe completar todas las secciones ya existentes en el contrato:

- Identity
- Governance
- Classification
- Channel Policy
- Executive Summary
- LegalBasisBlock
- TechnicalDevelopmentBlock
- ProcedureBlock
- ChecklistBlock
- FaqBlock
- RiskBlock
- RequiredDocumentBlock
- CaseStudyBlock
- InternalReferenceBlock
- Relations
- Audit Metadata

No se crean bloques nuevos.

No se modifica el contrato.

## Diseno de contenido por bloque

### Identity

- `stableKey` doctrinal y transversal, no vinculado a un modelo concreto.
- Jurisdiccion principal: Espana.
- Tema: fiscalidad internacional / convenios.

### Governance

- Estado esperado: `validado`.
- Version inicial: `1.0.0`.
- Ownership tecnico: equipo fiscal internacional.

### Classification

Debe dejar claro que es:

- dominio fiscal;
- subtema internacional;
- audiencia principal: advisor;
- sensibilidad alta;
- objeto transversal reutilizable.

### Channel Policy

Regla propuesta:

- `planner`: `allowed`
- `ia`: `allowed`
- `internal_guide`: `allowed`
- `web`: `derived_only`
- `faq`: `derived_only`
- `checklist`: `derived_only`
- `client_response`: `derived_only`
- `tax_library`: `derived_only`

La razon es la misma que en los objetos transversales de alto valor doctrinal: reutilizacion interna directa, y salidas externas solo derivadas.

### Executive Summary

Debe responder de forma reutilizable por `Planner`, `Web` e `AI`:

- que es un CDI;
- para que sirve;
- cuando resulta aplicable;
- como interactua con la normativa espanola;
- como evita la doble imposicion;
- cual es su impacto practico en expedientes reales.

### LegalBasisBlock

Debe explicar:

- naturaleza juridica de los CDI;
- jerarquia normativa;
- interaccion entre normativa interna y convenio;
- funcion interpretativa del Modelo OCDE.

Sin copiar legislacion.

Sin reproducir tratados.

### TechnicalDevelopmentBlock

Debe desarrollar de forma operativa:

- ambito subjetivo;
- ambito objetivo;
- residencia a efectos del convenio;
- doble residencia;
- `tie-breaker`;
- establecimiento permanente en vision general;
- distribucion general de potestades tributarias;
- metodos para eliminar la doble imposicion;
- intercambio de informacion en vision general;
- procedimiento amistoso (`MAP`).

El bloque debe remarcar que:

- primero se identifica el impuesto y la norma interna de partida;
- despues se analiza si el CDI limita o redistribuye la potestad;
- y solo entonces se baja, en su caso, al objeto tributario o categoria material correspondiente.

### ProcedureBlock

Flujo operativo cerrado:

1. Identificar el elemento internacional.
2. Confirmar residencia fiscal o conflicto de residencia.
3. Verificar si existe CDI aplicable.
4. Determinar el ambito subjetivo y objetivo.
5. Identificar la categoria general de renta o patrimonio.
6. Aplicar la regla de atribucion de potestad tributaria.
7. Determinar el metodo para evitar la doble imposicion.
8. Documentar el analisis y sus evidencias.
9. Trasladar la conclusion al impuesto o modelo correspondiente.
10. Archivar el soporte probatorio.

### ChecklistBlock

Debe separarse en:

- obligatorio;
- recomendable.

La checklist debe ser util para `Planner` y no depender de un convenio bilateral concreto.

### FaqBlock

Debe cubrir preguntas reales como minimo sobre:

- conflicto entre norma interna y CDI;
- significado de `tie-breaker`;
- residencia a efectos del convenio;
- que es un establecimiento permanente;
- como se elimina la doble imposicion;
- cuando hace falta certificado de residencia;
- cuando escalar a analisis mas especializado.

### RiskBlock

Categorias minimas:

- cumplimiento;
- internacional;
- interpretativo;
- documental;
- procedimental.

Riesgos minimos:

- aplicar un convenio inexistente o no vigente;
- interpretar incorrectamente la residencia;
- aplicar mal el `tie-breaker`;
- identificar mal la categoria de renta o patrimonio;
- no documentar la conclusion con evidencia suficiente.

### RequiredDocumentBlock

Debe separar:

- obligatorios;
- recomendables.

Y debe incluir al menos:

- certificado de residencia fiscal cuando proceda;
- texto o referencia del convenio aplicable;
- documentacion de la renta o patrimonio analizado;
- prueba de retenciones soportadas cuando proceda;
- indicios o pruebas de establecimiento permanente cuando el riesgo exista;
- soporte documental del conflicto internacional analizado.

### CaseStudyBlock

Casos practicos de nivel doctrinal general, no articulo por articulo.

Ejemplos orientativos:

- contribuyente con residencia discutida entre dos Estados;
- renta internacional con posible conflicto entre norma interna y convenio;
- caso donde el CDI limita la tributacion espanola;
- caso donde Espana mantiene potestad principal pero debe aplicarse metodo de eliminacion de doble imposicion;
- caso donde aparece el riesgo de establecimiento permanente y el expediente debe escalarse.

### InternalReferenceBlock

Debe enlazar solo referencias internas reales o previstas oficialmente, por ejemplo:

- `Residencia Fiscal en Espana`
- `Modelo 210`
- `Modelo 714`
- `Modelo 720`
- `Modelo 721`
- futuros `IRPF`, `IRNR`, `Establecimiento Permanente`, `Rentas Internacionales`

### Relations

Las relaciones deben dejar visible que este objeto actua como infraestructura doctrinal para:

- `Residencia Fiscal`
- `Modelo 210`
- `Modelo 714`
- `Modelo 720`
- `Modelo 721`
- `Modelo 151`
- `IRPF`
- `IRNR`
- `Fiscalidad internacional`
- `Establecimiento permanente`
- `Rentas internacionales`

## Fuentes autorizadas

Fuentes primarias o cuasi primarias permitidas:

- convenios suscritos por Espana;
- Modelo de Convenio OCDE;
- Comentarios OCDE cuando tengan valor interpretativo reconocido;
- Ley IRPF;
- Ley IRNR;
- Ley General Tributaria;
- jurisprudencia con impacto operativo;
- doctrina administrativa consolidada solo cuando aclare la aplicacion practica de un CDI.

## Criterios de calidad

El objeto debe quedar:

- doctrinalmente preciso;
- neutral respecto del canal;
- reutilizable por `Planner`, `Web`, `AI`, `checklist`, `FAQ` y `client response`;
- sin duplicar el contenido de `Residencia Fiscal`;
- sin invadir todavia los futuros objetos materiales de articulos o categorias de renta.

## Estrategia de validacion

La historia debe cerrarse solo cuando:

- el objeto valide contra `@ag/knowledge-contract@1.0.0`;
- no requiera cambios estructurales;
- genere correctamente sus vistas derivadas;
- respete el `FEATURE FREEZE`;
- mantenga la funcion metodologica transversal aprobada.

## Evolucion futura prevista

Si la biblioteca lo necesita, este objeto podra relacionarse despues con objetos especializados como:

- `CDI - Dividendos`
- `CDI - Intereses`
- `CDI - Canones`
- `CDI - Ganancias patrimoniales`
- `CDI - Rentas del trabajo`
- `CDI - Establecimiento permanente`

Esos objetos no forman parte de `STORY-KF-008B`.

## Veredicto de diseno

`STORY-KF-008B` queda aprobada como implementacion de un objeto transversal doctrinal general puro sobre `Convenios para Evitar la Doble Imposicion`, sin granularidad material por categorias de renta y sin desarrollo profundo de establecimiento permanente.
