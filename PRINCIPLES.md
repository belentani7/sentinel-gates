# Principios universales de Sentinel Gates

**Versión:** 0.1.0. **Estado:** activo. **Principio rector:** cualquier cambio debe ser trazable, verificable y compatible con los invariantes de seguridad, corrección, privacidad, integridad, accesibilidad, rendimiento y velocidad.

| Invariante | Regla ejecutable | Evidencia esperada |
| --- | --- | --- |
| Trazabilidad | Cada cambio nace en una issue, usa una rama con tipo e identificador, sigue Conventional Commits y se entrega mediante pull request. | Issue enlazada, PR con `Closes #id` e historial legible. |
| Calidad | La rama principal solo recibe código tras pasar formato, tipado estricto, revisión de arquitectura, pruebas y build. | Checks verdes y revisión humana registrada. |
| Seguridad | Se validan entradas, se evita la exposición de secretos, se minimizan permisos y se inspeccionan dependencias y código. | Auditoría, secret scanning, CodeQL y evaluación de permisos. |
| Observabilidad | Las operaciones relevantes usan eventos estructurados, `requestId` y atributos explícitos sin datos sensibles. | Logs JSON y evidencia de correlación. |
| Accesibilidad y motion | Toda UI comunica estados con carga diferida, skeletons y microinteracciones de `transform` u `opacity`; respeta `prefers-reduced-motion`. | Pruebas de interfaz, revisión a11y y CSS accesible. |
| Evolución consciente | Los cambios estructurales se clasifican, revalidan y documentan en changelog y ADR. | Versión, ADR y explicación de impacto. |

## Precedencia en caso de conflicto

> **Seguridad > corrección > privacidad > integridad > accesibilidad > rendimiento > velocidad de entrega.**

## Ciclo de reorganización

Cuando cambie un requisito, dependencia, frontera o amenaza, el mantenedor debe detectar el cambio, clasificar el impacto, preservar los invariantes, reorganizar el diseño, ejecutar de nuevo los gates, registrar la decisión y entregar evidencia. No se aceptan ediciones estructurales silenciosas.

## Política de excepciones

Toda excepción es temporal. Debe identificar el control afectado, explicar el riesgo, asignar un propietario, tener fecha de vencimiento y enlazar una issue que elimine la excepción. Una excepción no convierte un gate bloqueante en opcional para cambios futuros.
