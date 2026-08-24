## Propósito

Closes #<!-- issue -->

Describe de forma concisa el problema, el cambio y el impacto esperado.

## Evidencia de validación

| Control | Resultado | Evidencia o nota |
| --- | --- | --- |
| Biome y tipado estricto |  |  |
| Revisión de fronteras de arquitectura |  |  |
| Pruebas unitarias e integración |  |  |
| Prueba E2E del flujo crítico |  |  |
| Pruebas de mutación |  |  |
| Auditoría de dependencias |  |  |
| Escaneo de secretos y análisis estático |  |  |

## Revisión de arquitectura y seguridad

Confirma que el dominio no depende de adaptadores, que los datos externos se validan en sus límites y que no se añadieron secretos, credenciales o permisos innecesarios.

- [ ] El cambio mantiene las fronteras entre dominio, aplicación y adaptadores.
- [ ] Las entradas se validan y las salidas no interpolan contenido no confiable.
- [ ] Los logs mantienen `requestId` y no incluyen datos sensibles.
- [ ] No se añadieron dependencias, permisos ni excepciones de seguridad injustificados.
- [ ] Si hay UI, se aplicaron carga diferida, skeletons y `prefers-reduced-motion`.

## Riesgo y reversión

Explica el riesgo residual, la estrategia de reversión y cualquier paso manual posterior al despliegue.
