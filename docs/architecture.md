# Arquitectura de Sentinel Gates

Sentinel Gates utiliza una arquitectura de dependencias dirigidas. El núcleo se mantiene independiente de infraestructura para que las políticas se puedan probar, reutilizar y evolucionar sin propagar detalles externos a la lógica de decisión.

| Capa | Responsabilidad | Puede depender de | No puede depender de |
| --- | --- | --- | --- |
| `domain` | Tipos, invariantes y vocabulario de quality gates. | Nada externo. | Aplicación, adaptadores, red o almacenamiento. |
| `application` | Casos de uso y decisiones que combinan las reglas del dominio. | `domain`. | Adaptadores concretos. |
| `adapters` | Integraciones técnicas, como logging estructurado. | Contratos de dominio o aplicación. | No introduce reglas de negocio. |
| `index.ts` | Superficie pública deliberadamente pequeña. | Todas las capas internas. | Lógica nueva; solo compone exportaciones. |

> La regla operativa es simple: **las dependencias apuntan hacia el dominio**. Un adaptador puede conocer un contrato del dominio; el dominio nunca conoce un adaptador.

## Control automatizado

`npm run arch:check` recorre los imports y falla si `domain` importa de `application` o `adapters`, o si `application` importa de `adapters`. Este guardrail es intencionalmente pequeño: no sustituye una revisión humana, pero detecta de forma temprana las violaciones más peligrosas.

## Decisiones de diseño

La decisión de un conjunto de gates es determinista. Un fallo de una puerta **bloqueante** produce `block`; un fallo o una omisión **advisory** produce `warn`; y solo una colección totalmente aprobada produce `pass`. La evidencia se conserva junto con cada resultado, y cada evaluación exige un `requestId` no vacío para favorecer trazabilidad y correlación.

## Evolución segura

Una dependencia nueva, una modificación de frontera o una excepción a un gate debe nacer en una issue y quedar justificada en su pull request. Para decisiones que afecten a la estructura, registra un ADR en `docs/adr/` con contexto, decisión, consecuencias y fecha.
