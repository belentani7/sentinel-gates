# Contribuir a Sentinel Gates

La contribución comienza antes del código. Abre una issue con el problema, los criterios de aceptación y el impacto en arquitectura, seguridad y pruebas. Trabaja en una rama con el formato `feat/<issue>-resumen`, `fix/<issue>-resumen`, `refactor/<issue>-resumen` o `chore/<issue>-resumen`; usa Conventional Commits y evita mezclar objetivos no relacionados.

## Ciclo local

Instala Node.js 22 o superior y ejecuta `npm ci`. Antes de abrir un pull request, ejecuta `npm run verify` y `npm run test:mutation`. El primer comando concentra formato, tipo, fronteras de arquitectura, cobertura, integración, E2E, auditoría y build. El segundo valida la sensibilidad de los tests ante mutaciones. Si el cambio agrega un flujo nuevo, añade una prueba que reproduzca la historia crítica de un consumidor.

## Pull requests

Todo pull request debe contener `Closes #<id>`, una explicación de impacto, evidencia de los controles y una estrategia de reversión. No subas secretos, archivos de cobertura, artefactos de build ni dependencias desbloqueadas. Si introduces una dependencia, justifica su necesidad, licencia, mantenimiento y superficie de riesgo.

## Interfaz de usuario

Cuando el cambio incluya UI, aplica carga diferida a recursos no críticos, skeletons en estados de carga y transiciones de 150–300 ms exclusivamente con `transform` u `opacity`. No debe dependerse de animación para comunicar contenido y debe existir una alternativa completa mediante `prefers-reduced-motion`.

## Decisiones y cambios de política

Los cambios que afecten a principios, arquitectura o quality gates requieren un ADR nuevo en `docs/adr/`, una entrada en `CHANGELOG.md` y revisión explícita de un mantenedor. La política no se relaja silenciosamente para hacer pasar una entrega.
