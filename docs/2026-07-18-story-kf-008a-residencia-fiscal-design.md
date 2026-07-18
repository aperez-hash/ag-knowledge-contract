# STORY-KF-008A - Residencia Fiscal en Espana Knowledge Object Design

Fecha: 2026-07-18
Estado: Draft de diseno aprobado en enfoque

## Contexto

Knowledge Factory ha completado oficialmente su primer ciclo:

- contrato canónico `@ag/knowledge-contract@1.0.0` certificado;
- biblioteca v1 certificada;
- arquitectura congelada;
- `Planner Consumer` certificado;
- cuatro `Knowledge Objects` ya integrados (`Modelo 210`, `Modelo 714`,
  `Modelo 720` y `Modelo 721`).

Este nuevo corte abre el segundo ciclo de produccion. El objetivo ya no es
extender obligaciones tributarias individuales, sino producir objetos
transversales reutilizables por multiples objetos de la biblioteca.

## Objetivo

Construir el primer `Knowledge Object` transversal del segundo ciclo:

`Residencia Fiscal en Espana`

El objeto debe responder de forma consistente a una sola pregunta:

**Es esta persona residente fiscal en Espana durante el ejercicio analizado?**

El resultado debe validar integramente contra `@ag/knowledge-contract@1.0.0`,
sin modificar contrato, `schema`, tipos generados, `Rule Engine`,
consumidores ni arquitectura.

## Alcance

Se permite:

- crear un nuevo `Knowledge Object` canónico de contenido transversal;
- anadir su dossier juridico primario;
- generar sus derivadas oficiales (`Planner`, `Web`, `AI`, `Checklist`, `FAQ`
  y `Client Response`);
- anadir validadores y pruebas focales de historia siguiendo el patron
  certificado del repo;
- actualizar documentacion tecnica si refleja fielmente el nuevo objeto y sus
  validaciones.

No se permite:

- modificar `@ag/knowledge-contract`;
- cambiar `schema`, `generated`, enums, taxonomias o bloques;
- crear consumidores nuevos;
- introducir logica especial en `Planner`;
- convertir este objeto en una guia de convenios pais por pais;
- desarrollar la tributacion derivada del IRPF, IRNR, `Modelo 210`, `Modelo
  714`, `Modelo 720`, `Modelo 721` o `Modelo 151`.

## Decision de diseno aprobada

Se adopta un enfoque **transversal puro con capa internacional limitada**:

1. nucleo espanol completo:
   - permanencia;
   - ausencias esporadicas;
   - centro de intereses economicos;
   - presuncion familiar;
   - prueba y documentacion.
2. capa internacional operativa pero contenida:
   - doble residencia;
   - valor operativo del certificado extranjero;
   - criterio general `tie-breaker` OCDE.
3. exclusion expresa de analisis bilateral pais por pais.

Esta decision mantiene el objeto reutilizable para:

- `IRPF`;
- `IRNR`;
- `Modelo 210`;
- `Modelo 714`;
- `Modelo 720`;
- `Modelo 721`;
- `Modelo 151`;
- futuros objetos sobre convenios y fiscalidad internacional de personas
  fisicas.

## Enfoque arquitectonico

El objeto reutiliza exactamente el armazon ya certificado en el repo:

- misma entidad raiz `KnowledgeObject`;
- mismos bloques tipados;
- mismas reglas de gobierno;
- mismas politicas de canal;
- mismo patron de derivacion;
- misma estrategia de validacion por historia.

No se crea un carril nuevo para conocimiento transversal. El objetivo es
demostrar que la plataforma actual soporta un objeto no ligado a un impuesto
concreto sin requerir ninguna adaptacion estructural.

## Pregunta funcional y frontera del objeto

El objeto debe permitir decidir si una persona fisica es residente fiscal en
Espana en un ejercicio determinado y como debe documentarse esa conclusion.

El objeto no debe resolver:

- cuanto tributa por `IRPF`;
- cuanto tributa por `IRNR`;
- como se presenta una autoliquidacion concreta;
- como se aplica un convenio especifico firmado con un pais concreto;
- como tributa un regimen especial concreto fuera de su relacion con la
  residencia.

Los objetos dependientes deberan consumir esta doctrina mediante `relations`, y
no duplicarla internamente.

## Fuentes autorizadas

Se usaran solo fuentes primarias o doctrina/jurisprudencia con impacto
operativo real:

- Ley 35/2006 (`IRPF`), especialmente articulo 9;
- Reglamento del `IRPF` cuando aporte desarrollo util;
- Ley General Tributaria cuando resulte materialmente aplicable;
- Modelo OCDE para explicar la logica general de `tie-breaker`;
- consultas vinculantes relevantes de la `DGT`;
- criterios administrativos consolidados;
- jurisprudencia solo cuando cambie de verdad el razonamiento operativo.

No se usaran resenas secundarias ni recopilaciones doctrinales como base
principal.

## Estructura prevista del objeto

Fichero canónico:

`examples/residencia-fiscal-espana.json`

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

Se implementaran todos los bloques canónicos ya aprobados:

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

Debe explicar de forma reusable:

- que es la residencia fiscal;
- por que es determinante para abrir casi cualquier analisis tributario de
  personas fisicas;
- cuales son los criterios principales de determinacion;
- por que un certificado extranjero no siempre cierra el caso por si solo;
- como encaja la doble residencia con la capa internacional general.

Debe poder alimentar sin reescritura importante:

- `Planner View`;
- `Web View`;
- `AI Context`;
- `Client Response`.

### LegalBasisBlock

Debe exponer, sin copiar normas:

- articulo 9 `LIRPF`;
- criterio de permanencia;
- centro de intereses economicos;
- presuncion familiar;
- interaccion general con convenios para evitar la doble imposicion.

### TechnicalDevelopmentBlock

Sera el nucleo doctrinal y operativo del objeto. Debe cubrir:

- jerarquia de criterios y su orden de uso:
  - criterio principal: permanencia superior a 183 dias;
  - criterio alternativo: centro de intereses economicos;
  - presuncion familiar;
  - aplicacion posterior del `tie-breaker` solo cuando exista doble
    residencia real;
- permanencia superior a 183 dias;
- computo practico de dias;
- ausencias esporadicas;
- centro de intereses economicos;
- nucleo principal de actividades o intereses;
- presuncion por conyuge no separado legalmente e hijos menores;
- relevancia y limites del certificado de residencia fiscal extranjero;
- doble residencia;
- criterios generales de `tie-breaker`;
- perdida de residencia;
- cambio de residencia dentro del ejercicio;
- patrones tipicos de movilidad internacional:
  - traslado definitivo;
  - teletrabajo internacional;
  - ejecutivo desplazado;
  - presencia fisica corta con intereses economicos en Espana.

No debe derivar hacia la liquidacion de impuestos ni hacia el analisis
particular de cada convenio.

### ProcedureBlock

Flujo operativo obligatorio:

1. identificar el periodo analizado;
2. analizar permanencia fisica;
3. revisar ausencias;
4. evaluar centro de intereses economicos;
5. evaluar nucleo familiar;
6. revisar certificados de residencia;
7. detectar posible doble residencia;
8. aplicar la logica general de convenio si procede;
9. concluir la residencia fiscal;
10. documentar evidencias y puntos de incertidumbre.

### ChecklistBlock

Debe separarse en:

- `obligatorio`
- `recomendable`

Tiene que ser util para `Planner` sin convertirse en un checklist de
cumplimentacion de formularios.

### FaqBlock

Debe recoger preguntas reales y frecuentes, como minimo:

- que ocurre si paso menos de 183 dias en Espana;
- como cuentan las ausencias esporadicas;
- que pesa mas, presencia fisica o intereses economicos;
- como se resuelve una doble residencia;
- si un certificado fiscal extranjero basta por si solo.

### RiskBlock

Categorias minimas obligatorias:

- `cumplimiento`
- `documental`
- `interpretativo`
- `internacional`
- `procedimental`

Riesgos minimos esperados:

- computo incorrecto de dias;
- interpretacion erronea de ausencias;
- documentacion insuficiente;
- aplicacion incorrecta del criterio general de convenio;
- falsa doble residencia.

Cada riesgo debe incluir gravedad, impacto y mitigacion usando el patron ya
admitido por el contrato.

### RequiredDocumentBlock

Debe separar:

- `obligatorios`
- `recomendables`

Y cubrir, como minimo:

- certificados fiscales;
- contratos laborales o de prestacion relevante;
- documentacion de viajes o estancias;
- pruebas de residencia efectiva;
- documentacion economica para centro de intereses.

Ademas, el bloque debe incorporar una matriz practica de evidencias con estas
columnas:

- evidencia;
- fuerza probatoria;
- uso habitual.

La matriz minima esperada es:

- certificado de residencia fiscal -> fuerza muy alta -> doble residencia;
- registro de entradas y salidas -> fuerza alta -> computo de dias;
- contratos de trabajo -> fuerza media -> centro de intereses;
- contratos de arrendamiento -> fuerza media -> residencia efectiva;
- consumos, escolarizacion y otras pruebas de vida efectiva -> fuerza
  complementaria -> refuerzo probatorio.

### CaseStudyBlock

Debe incorporar al menos cinco casos:

1. traslado definitivo durante el ejercicio;
2. teletrabajador internacional;
3. ejecutivo desplazado;
4. doble residencia con necesidad de `tie-breaker`;
5. centro de intereses economicos en Espana con menos de 183 dias.

Cada caso debe incluir:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

### InternalReferenceBlock

Solo debe enlazar referencias internas reales y ya existentes. No se inventaran
guias ni documentos internos.

## Relaciones obligatorias

El objeto debe relacionarse, al menos, con:

- `Modelo 210`;
- `Modelo 714`;
- `Modelo 720`;
- `Modelo 721`;
- `Modelo 151`;
- `Convenios de Doble Imposicion`;
- `IRNR` futuro;
- `IRPF` futuro.

La regla es clara: el resto de objetos deben enlazar esta doctrina, no volver a
explicarla desde cero.

Ademas, las relaciones deben dejar explicita la categoria funcional:

`Provides Residency Decision To`

con esos mismos destinos, para reforzar que este objeto actua como pieza de
infraestructura doctrinal transversal y no solo como una entrada tematica mas
de la biblioteca.

## Reglas semanticas de la historia

Ademas del `schema`, la historia debe validar:

- estado raiz compatible con contenido certificado para consumo;
- `executiveSummary` reutilizable y no orientado a un canal unico;
- cobertura de los cinco casos minimos;
- FAQ realista y sin preguntas artificiales;
- riesgos presentes en las cinco categorias minimas;
- separacion clara entre documentacion obligatoria y recomendable;
- relaciones limitadas a objetos reales o previstos oficialmente;
- cero cambios estructurales del contrato;
- capa internacional explicada en clave general, no bilateral.

## Derivaciones requeridas

El pipeline debe generar:

1. `Planner View`
   - contenido interno operativo;
   - bloques permitidos por politica de canal;
   - foco en procedimiento, checklist, riesgos y documentacion.

2. `Web View`
   - explicacion publica derivada;
   - sin referencias internas;
   - sin contenido restringido.

3. `AI Context`
   - criterio operativo compacto;
   - riesgos;
   - limites de la respuesta;
   - advertencia sobre necesidad de evidencia documental.

4. `Checklist derivada`

5. `FAQ derivada`

6. `Client Response derivada`
   - orientada a explicar criterio y necesidad de analisis;
   - sin exponer contenido `derived_only` de forma indebida.

## Cambios tecnicos previstos

Se esperan cambios en:

- nuevo objeto fuente `examples/residencia-fiscal-espana.json`;
- scripts de build y validacion especificos de la historia;
- prueba focal nueva de `STORY-KF-008A`;
- dossier primario en `docs/research/`;
- informe de validacion y borrador de PR;
- posiblemente `README` y `CHANGELOG`, si procede por trazabilidad.

No se esperan cambios en:

- contrato;
- tipos generados;
- `Rule Engine`;
- consumidores;
- arquitectura general del repo.

## Testing y evidencia

La historia debe cerrar con evidencia real de:

- `Schema Validation`: PASS
- `Rule Engine`: PASS
- `Planner View`: PASS
- `Web View`: PASS
- `AI Context`: PASS
- `Checklist`: PASS
- `FAQ`: PASS
- `Client Response`: PASS
- `Quality Gate`: PASS
- `Structural Changes`: NO

Y con pruebas focales que cubran, como minimo:

- validacion del objeto `Residencia Fiscal en Espana`;
- validacion semantica de la historia;
- generacion de cada derivada;
- restricciones de canal;
- cobertura de la capa internacional general sin convenios concretos;
- ausencia de necesidad de cambios estructurales.

## Riesgo principal a vigilar

El riesgo de diseno mas importante es que el objeto se expanda de forma
silenciosa hacia una pseudo-guia de convenios internacionales. La mitigacion es
mantener una frontera editorial estricta:

- criterio general de doble residencia y `tie-breaker`, si;
- analisis bilateral por pais, no.

## Resultado esperado

```text
STORY-KF-008A

Knowledge Object:
Residencia Fiscal en Espana

Research .................... PASS
Knowledge Object ............ PASS
Schema Validation ........... PASS
Rule Engine ................. PASS
Planner View ............... PASS
Web View ................... PASS
AI Context ................. PASS
Checklist .................. PASS
FAQ ........................ PASS
Client Response ............ PASS
Quality Gate ............... PASS
Structural Changes ......... NO

STATUS

KNOWLEDGE OBJECT READY
```
