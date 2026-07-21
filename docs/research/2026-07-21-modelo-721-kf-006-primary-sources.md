# Modelo 721 - KF-006 Primary Sources Review

## Scope

Revision controlada del Knowledge Object `ko_es_modelo721_monedas_virtuales_001`.

No se crea un objeto nuevo porque `origin/main` ya contiene `examples/modelo-721-monedas-virtuales.json` como objeto certificado previo (`STORY-KF-005C`). `KF-006` mantiene identidad estable y revisa el contenido para reforzar trazabilidad normativa vigente a 2026.

## Fuentes normativas revisadas

- `Ley 58/2003, General Tributaria`, disposicion adicional decimoctava y articulo 35.4: `https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186`
- `Ley 11/2021`, de medidas de prevencion y lucha contra el fraude fiscal: `https://www.boe.es/buscar/doc.php?id=BOE-A-2021-11473`
- `Real Decreto 1065/2007`, articulo 42 quater: `https://www.boe.es/eli/es/rd/2007/07/27/1065/con`
- `Orden HFP/886/2023`, aprobacion del Modelo 721: `https://www.boe.es/buscar/doc.php?id=BOE-A-2023-17429`
- `Orden HAC/1504/2024`, sustitucion del anexo del Modelo 721 para declaraciones informativas correspondientes al ejercicio 2024 y posteriores: `https://www.boe.es/buscar/doc.php?id=BOE-A-2024-27528`

## Criterio administrativo revisado

- FAQ AEAT del Modelo 721, pagina actualizada el `08/07/2026`: `https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/declaraciones-informativas/modelo-721-decla-sobre-monedas-extranjero/preguntas-frecuentes-sobre-modelo-721.html`
- FAQ AEAT sobre informacion a suministrar: `https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/declaraciones-informativas/modelo-721-decla-sobre-monedas-extranjero/preguntas-frecuentes-sobre-modelo-721/que-informacion-debe-suministrarse-modelo-721.html`
- FAQ AEAT sobre monedas virtuales excluidas: `https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/declaraciones-informativas/modelo-721-decla-sobre-monedas-extranjero/preguntas-frecuentes-sobre-modelo-721/respecto-que-monedas-virtuales-no-informacion.html`
- AEAT, plazos de presentacion 2026: `https://sede.agenciatributaria.gob.es/Sede/todas-gestiones/impuestos-tasas/declaraciones-informativas/modelo-721-decla-sobre-monedas-extranjero/plazos-presentacion.html`

## Lectura operativa

- El nucleo normativo sigue siendo el articulo 42 quater RGAT.
- La revision no altera la finalidad: obligacion informativa, no calculo fiscal.
- La localizacion depende del custodio y del perimetro de informacion interna, no de la etiqueta comercial del exchange ni de servidores.
- La autocustodia pura queda fuera porque falta custodia por tercero.
- Deben recogerse expresamente las exenciones reglamentarias y la frontera con dinero fiduciario en exchanges extranjeros.
- La actualizacion de la Orden HAC/1504/2024 afecta al anexo tecnico; no cambia la arquitectura del objeto ni exige modificar contratos publicos.

## Jurisprudencia

No se ha identificado en esta revision una jurisprudencia especifica del Modelo 721 con impacto operativo autonomo que obligue a modificar el criterio canonico.
