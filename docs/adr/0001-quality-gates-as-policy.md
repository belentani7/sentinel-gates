# ADR 0001: Quality gates como política ejecutable

| Campo | Valor |
| --- | --- |
| Estado | Aceptada |
| Fecha | 2026-08-22 |
| Decisores | Mantenedores de Sentinel Gates |
| Issue | #1 |

## Contexto

Los controles de calidad y seguridad suelen convertirse en convenciones no verificadas o comandos opcionales. Esto permite que el código llegue a la rama principal sin una evidencia homogénea de formato, tipos, pruebas, arquitectura o seguridad.

## Decisión

El repositorio tratará los quality gates como una política ejecutable. Los comandos de desarrollo y la integración continua comparten la misma fuente de verdad: Biome, TypeScript estricto, revisión automática de fronteras, pruebas con cobertura, pruebas de mutación, auditoría de dependencias, escaneo de secretos y análisis estático.

Los controles críticos son bloqueantes. Las excepciones deben ser explícitas, limitarse en el tiempo, justificarse en una issue y registrarse en el pull request que las introduce.

## Consecuencias

El tiempo inicial de integración es mayor, pero se reduce la ambigüedad de aceptación y se hace visible el coste de cambios inseguros. Las herramientas externas pueden requerir capacidades de seguridad de GitHub en repositorios privados; cuando no estén disponibles, el repositorio conserva controles locales equivalentes y documenta la limitación en vez de simular una cobertura inexistente.
