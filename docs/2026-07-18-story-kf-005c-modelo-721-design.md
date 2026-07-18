# STORY-KF-005C - Modelo 721 Knowledge Object Design

## Contexto

Knowledge Factory entra ya en una fase de produccion estable sobre una base que no debe reabrirse. El contrato canonico `@ag/knowledge-contract@1.0.0` queda certificado, la arquitectura esta en `FEATURE FREEZE`, `Planner` ya consume el paquete neutral publicado y los `Knowledge Objects` de `Modelo 210`, `Modelo 720` y `Modelo 714` han quedado integrados en `main`.

Este nuevo corte no puede tocar contrato, `schema`, tipos generados, taxonomias, bloques, `Rule Engine`, consumidores ni arquitectura. El objetivo es producir el cuarto `Knowledge Object` oficial reutilizando exactamente el mismo armazon ya estabilizado.

El trabajo se ejecutara en el repo neutral `ag-knowledge-contract`, en una unica rama y con una unica `Draft PR`, siguiendo el patron operativo ya asentado en `STORY-KF-004A`, `STORY-KF-005A` y `STORY-KF-005B`.

## Objetivo

Construir el `Knowledge Object` canonico:

`Modelo 721 - Declaracion informativa sobre monedas virtuales situadas en el extranjero`

de forma que valide integramente contra `@ag/knowledge-contract@1.0.0` sin requerir cambios estructurales y permita generar correctamente:

- `Planner View`
- `Web View`
- `AI Context`
- `Checklist`
- `FAQ`
- `Client Response`

## Pregunta central del objeto

El `Knowledge Object` debe responder de forma consistente a esta pregunta:

**Debe este contribuyente presentar el Modelo 721 y como se determina correctamente su obligacion informativa?**

Esta decision de diseno implica que el objeto sera analitico y de criterio operativo sobre la obligacion de informar, no un objeto general sobre fiscalidad de criptoactivos ni una guia de pantallas AEAT.

## Principios de diseno

### 1. Objeto sobre obligacion informativa, no sobre fiscalidad cripto general

El contenido canonico debe centrarse en:

- residencia fiscal;
- sujeto obligado;
- concepto de moneda virtual incluida o excluida;
- concepto de custodia;
- identificacion de plataformas y entidades custodias;
- localizacion extranjera;
- umbrales;
- primera obligacion;
- obligaciones posteriores;
- perdida de obligacion;
- diferencias practicas con `Modelo 720`.

Quedan fuera del nucleo canonico:

- tributacion de ganancias y perdidas;
- `IRPF`, `IS`, `IVA`;
- `staking`, mineria, `NFT`, `DeFi`;
- `MiCA`;
- contabilidad de criptoactivos;
- blanqueo, compliance o analitica de operaciones;
- instrucciones mecanicas de cumplimentacion AEAT.

Ese contenido, si algun dia se necesitara, debera vivir en `Knowledge Objects` distintos o en derivadas operativas especializadas, no en este objeto bruto.

### 2. Reutilizacion total de plataforma

Se reutilizaran sin cambios:

- contrato canonico;
- `schema`;
- tipos generados;
- taxonomias y enums;
- pipeline de derivaciones;
- validadores;
- `Rule Engine`;
- consumidores existentes.

No se permite crear bloques nuevos ni duplicar logica doctrinal fuera del `Knowledge Object`.

### 3. Alcance doctrinal acotado

El objeto representa exclusivamente la obligacion de presentar el `Modelo 721`.

No debe derivar hacia:

- tributacion de compraventas de criptoactivos;
- analisis de bases imponibles o ganancias patrimoniales;
- regularizacion inspectora de activos digitales;
- doctrina completa de proveedores `CASP`;
- comparativas regulatorias amplias sobre mercados cripto;
- obligaciones ajenas a la informacion sobre monedas virtuales situadas en el extranjero.

## Enfoque material aprobado

### 1. La residencia fiscal abre el analisis

El analisis debe arrancar siempre por la residencia fiscal del contribuyente, porque condiciona:

- si existe obligacion personal de informar;
- el tipo de activo y custodia que entran en el examen;
- la necesidad de comparar plataformas extranjeras frente a españolas;
- el alcance real del expediente.

El objeto debe dejar claro el orden logico: primero residencia, despues sujeto obligado, luego custodia/localizacion y, por ultimo, umbral y obligacion de declarar.

### 2. La custodia es el nucleo operativo

El centro del objeto no es la mera existencia de monedas virtuales, sino si esas monedas se encuentran bajo una custodia que activa la obligacion informativa en el extranjero.

Por tanto, el objeto debe cubrir expresamente:

- quien es el titular obligado;
- que se entiende por custodia relevante;
- cuando una plataforma extranjera genera obligacion;
- cuando una plataforma española no cae en `Modelo 721`;
- como se abordan varias plataformas en conjunto;
- como reaparece la obligacion en ejercicios posteriores.

### 3. El umbral y la recurrencia deben quedar operativamente claros

La decision no se limita a si hoy existe o no un saldo. El objeto debe explicar con claridad:

- el umbral minimo aplicable;
- como se agregan saldos o posiciones;
- cuando existe primera obligacion;
- cuando debe volver a presentarse;
- cuando desaparece la obligacion.

Este punto debe vivir en el nucleo tecnico y en el procedimiento, no relegado a FAQ secundaria.

### 4. Diferencia con Modelo 720 como frontera funcional

El objeto debe relacionarse con `Modelo 720`, pero solo para fijar fronteras claras:

- `Modelo 720` informa sobre bienes y derechos situados en el extranjero;
- `Modelo 721` se centra en monedas virtuales situadas en el extranjero bajo determinada custodia;
- no deben mezclarse criterios por analogia sin base normativa.

La comparacion sirve para evitar errores de clasificacion y para orientar al asesor sobre que expediente doctrinal debe abrir.

## Cobertura tecnica requerida

### Executive Summary

Debe responder, de forma reutilizable para `Planner`, `Web` e `AI`:

- que es el `Modelo 721`;
- quien puede quedar obligado;
- que monedas virtuales deben declararse;
- que tipo de plataforma o custodia puede generar obligacion;
- cuando existe obligacion;
- cuando vuelve a presentarse;
- que consecuencias practicas tiene para el despacho.

### LegalBasisBlock

Debe explicar:

- naturaleza de la obligacion informativa;
- fundamento legal;
- evolucion normativa del `721`;
- encaje frente a otras obligaciones informativas sobre activos situados en el extranjero.

No debe copiar articulado legal ni convertirse en recopilacion normativa literal.

### TechnicalDevelopmentBlock

Debe ser el nucleo doctrinal del objeto e incluir:

- sujetos obligados;
- residencia fiscal;
- monedas virtuales incluidas;
- monedas virtuales excluidas;
- concepto operativo de custodia;
- plataformas extranjeras;
- plataformas españolas;
- localizacion relevante;
- umbrales aplicables;
- primera presentacion;
- presentaciones posteriores;
- perdida de obligacion;
- diferencias operativas con `Modelo 720`.

No debe transformarse en un manual general sobre fiscalidad de criptoactivos.

### ProcedureBlock

El flujo operativo debe cubrir de forma completa:

1. determinar residencia fiscal;
2. identificar el titular potencialmente obligado;
3. identificar monedas virtuales y su modalidad de custodia;
4. identificar entidades o plataformas custodias;
5. determinar si la custodia se sitúa en el extranjero a efectos operativos;
6. calcular umbrales y agregaciones;
7. verificar si existe obligacion en el ejercicio;
8. recopilar documentacion justificativa;
9. preparar declaracion;
10. revisar consistencia y archivo del expediente.

### ChecklistBlock

Debe separarse en:

- `obligatorio`
- `recomendable`

y servir de base derivable para `Planner` y para guias operativas internas.

### FaqBlock

Debe responder preguntas reales como:

- si debe declararse saldo en un `exchange` español;
- que ocurre con un `exchange` extranjero;
- si existe umbral minimo;
- cuando hay que volver a presentar;
- como se determina la localizacion relevante;
- que diferencias practicas existen con `Modelo 720`.

### RiskBlock

Debe incluir, como minimo, riesgos de:

- cumplimiento;
- documental;
- interpretacion;
- tecnologico;
- procedimiento.

Riesgos minimos esperados:

- identificar incorrectamente la entidad obligada;
- omitir plataformas o custodios relevantes;
- error de residencia fiscal;
- calculo incorrecto de umbrales;
- clasificacion erronea de la custodia.

### RequiredDocumentBlock

Debe separarse en:

- `obligatorio`
- `recomendable`

y detallar para cada pieza:

- finalidad;
- momento de uso;
- alternativa documental razonable si no existe el soporte ideal.

### CaseStudyBlock

Debe incluir como minimo cuatro supuestos:

1. `exchange` extranjero con obligacion de declarar;
2. `exchange` español sin obligacion de `Modelo 721`;
3. varias plataformas con saldos agregados;
4. cambio de residencia durante el ejercicio.

Cada caso debe incorporar:

- contexto;
- analisis;
- resolucion;
- aprendizaje.

### InternalReferenceBlock

Solo debe incluir referencias internas existentes o previstas oficialmente, sin inventar material ficticio.

## Relaciones

El objeto debe relacionarse unicamente con materia real o planificada oficialmente:

- `Residencia Fiscal`
- `Modelo 720`
- `Modelo 714`
- `IRPF - Ganancias Patrimoniales por Criptoactivos` (futuro)
- `Convenios de Doble Imposicion`

Las relaciones deben servir para orientar navegacion y trazabilidad, no para absorber contenido de otras materias.

## Calidad editorial

El contenido debe ser:

- tecnicamente preciso;
- reutilizable;
- neutro;
- independiente del canal;
- apto para IA;
- prudente con terminos tecnologicos que puedan inducir a error regulatorio.

## Cobertura minima esperada

El objeto debe cubrir al menos:

- sujetos obligados;
- residencia fiscal;
- monedas virtuales incluidas;
- custodia;
- `exchanges` extranjeros;
- `exchanges` españoles;
- umbrales;
- documentacion;
- procedimiento;
- errores frecuentes;
- diferencias frente a `Modelo 720`.

## Fuentes primarias de trabajo

La implementacion debe construirse solo con:

- AEAT: `Modelo 721`, instrucciones oficiales, FAQ y ayuda tecnica;
- `Ley General Tributaria`, cuando resulte aplicable;
- `Ley 11/2021`;
- `RD 1065/2007`;
- orden ministerial reguladora del `Modelo 721`;
- normativa vigente sobre obligaciones informativas relativas a monedas virtuales;
- jurisprudencia solo cuando tenga impacto operativo real.

## Out of scope

Este `Knowledge Object` no desarrolla:

- tributacion de compraventas;
- `staking`;
- mineria;
- `NFT`;
- `DeFi`;
- `MiCA`;
- obligaciones contables;
- `IRPF`;
- `IS`;
- `IVA`.

Cada materia debera convertirse en un `Knowledge Object` independiente.

## Criterios de aceptacion

La historia quedara completada cuando:

- valide contra `@ag/knowledge-contract@1.0.0`;
- no requiera cambios estructurales;
- genere correctamente todas las vistas;
- cubra al menos el `80 %` de las consultas habituales sobre `Modelo 721`;
- supere todas las validaciones;
- mantenga la arquitectura congelada.

## Resultado esperado

```text
STORY-KF-005C

Knowledge Object:
Modelo 721

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

Este `Knowledge Object` debe desarrollarse en una unica rama, finalizar en una unica `Draft PR` y fusionarse antes de iniciar el siguiente objeto de conocimiento.
