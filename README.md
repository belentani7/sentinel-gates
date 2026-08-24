# Sentinel Gates

> **Quality gates ejecutables para proyectos TypeScript/Node.js.** Trazabilidad por issue, seguridad desde el inicio y evidencia antes del merge.

Sentinel Gates es una plantilla de referencia para equipos que quieren dejar de tratar la calidad como una lista de deseos. Ofrece un núcleo TypeScript pequeño, una arquitectura de dependencias dirigidas y una política SEDA/CSG ejecutable en local y en GitHub Actions. El resultado es un punto de partida que convierte cada control en un comando reproducible, una revisión observable o ambos.

## Qué protege

| Área | Control | Resultado esperado |
| --- | --- | --- |
| Corrección | Biome y TypeScript en modo estricto. | Errores de estilo, imports y tipos se detectan antes del build. |
| Pruebas | Vitest con cobertura y StrykerJS. | La lógica crítica se prueba y se mide frente a mutaciones. |
| Arquitectura | `arch:check` y revisión humana. | El dominio no queda acoplado a infraestructura. |
| Cadena de suministro | `npm audit`, lockfile y revisión de dependencias. | No se introducen vulnerabilidades altas o críticas conocidas. |
| Código y secretos | CodeQL y TruffleHog. | Se buscan patrones de riesgo y credenciales expuestas. |
| Gobernanza | Issues, PRs, Conventional Commits, ADRs y changelog. | Cada decisión relevante conserva intención y contexto. |
| Observabilidad | Eventos JSON con `requestId`. | Los cambios y evaluaciones se pueden correlacionar sin logs ambiguos. |

Biome recomienda `biome ci` para CI por su integración con runners; en local, esta plantilla usa `biome check` dentro de `npm run check` para mantener el diagnóstico y el formato verificables. CodeQL v4 evita la línea v3, cuya retirada está anunciada para diciembre de 2026. [1] [2]

## Inicio rápido

Usa Node.js 22 o superior. Tras clonar, instala el árbol exacto de dependencias y ejecuta la validación completa.

```bash
npm ci
npm run verify
npm run test:mutation
```

| Comando | Alcance | ¿Debe bloquear un merge? |
| --- | --- | --- |
| `npm run check` | Biome y TypeScript estricto. | Sí. |
| `npm run arch:check` | Fronteras entre dominio, aplicación y adaptadores. | Sí. |
| `npm run test:coverage` | Unitarias, integración, E2E y cobertura mínima del 80 %. | Sí. |
| `npm run test:mutation` | Sensibilidad de las pruebas a mutaciones. | Sí, cuando el umbral de madurez se haya aceptado. |
| `npm run audit` | Dependencias con severidad alta o crítica. | Sí. |
| `npm run build` | Artefacto de producción. | Sí. |

## Modelo de decisión

El paquete expone `evaluateQualityAssessment`, un caso de uso determinista que transforma resultados de gates en tres estados: `pass`, `warn` o `block`. Un fallo de una puerta bloqueante siempre produce `block`; un fallo u omisión advisory produce `warn`; únicamente todos los controles aprobados producen `pass`. Cada evaluación requiere un `requestId` y conserva sus evidencias.

```ts
import { evaluateQualityAssessment } from '@belentani7/sentinel-gates';

const assessment = evaluateQualityAssessment({
  requestId: 'pr-42',
  evaluatedAt: new Date(),
  gates: [
    { id: 'biome', status: 'passed', disposition: 'blocking' },
    { id: 'secret-scan', status: 'passed', disposition: 'blocking' },
  ],
});
```

## Automatización SEDA/CSG

El workflow principal usa `pull_request`, `push` sobre `main` y ejecución manual. Sus permisos globales se reducen a lectura de contenido; CodeQL añade `security-events: write` solo en el trabajo que publica resultados. Las acciones externas se fijan a hashes de commit y Dependabot vigila sus actualizaciones. GitHub recomienda las referencias SHA para limitar el impacto de una acción comprometida. [3]

La revisión de dependencias funciona en pull requests y falla por defecto cuando se detectan paquetes vulnerables. Está disponible en repositorios públicos y en privados con Code Security o GitHub Advanced Security activo. [4] Por ese motivo, el workflow omite de forma explícita la revisión de dependencias y CodeQL cuando el repositorio es privado; al abrirlo al público, ambos controles quedan activos automáticamente. `npm audit` se mantiene como línea local de defensa, y la omisión debe tratarse como una limitación visible, no como aprobación de seguridad.

El escaneo de secretos analiza el historial completo usando TruffleHog y se ejecuta tanto en privado como en público. Una vez público, CodeQL ejecuta las consultas `security-and-quality` sobre `src/`. StrykerJS es compatible con TypeScript, Node.js y frameworks de UI, por lo que el patrón se puede trasladar a servicios o aplicaciones sin reemplazar el modelo de pruebas. [5]

## Arquitectura y contribución

Lee [la arquitectura](docs/architecture.md) para entender las fronteras y el control automático. [Los principios](PRINCIPLES.md) establecen los invariantes; [la guía de contribución](CONTRIBUTING.md) describe el ciclo de issue, rama, commit y pull request; [la política de seguridad](SECURITY.md) explica la divulgación responsable. Las decisiones estructurales viven en [`docs/adr`](docs/adr/).

> **Precedencia:** seguridad > corrección > privacidad > integridad > accesibilidad > rendimiento > velocidad.

Cuando una contribución incluya UI, el repositorio exige Motion Principles: carga diferida para contenido no crítico, skeletons localizados, transiciones de 150–300 ms solo con `transform` u `opacity`, y una experiencia completa sin animación mediante `prefers-reduced-motion`.

## Estado de publicación

El repositorio se creó inicialmente como **privado** para proteger el trabajo en curso. Antes de abrirlo a la comunidad, revisa la configuración de Code Security, los colaboradores, las reglas de rama y los badges de CI. La licencia MIT ya está incluida para permitir una futura apertura pública.

## Referencias

[1]: https://biomejs.dev/recipes/continuous-integration/ "Biome: Continuous Integration"
[2]: https://github.blog/changelog/2025-10-28-upcoming-deprecation-of-codeql-action-v3/ "GitHub Changelog: deprecación de CodeQL Action v3"
[3]: https://github.blog/changelog/2025-08-15-github-actions-policy-now-supports-blocking-and-sha-pinning-actions/ "GitHub Changelog: SHA pinning para acciones"
[4]: https://docs.github.com/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review "GitHub Docs: Dependency review"
[5]: https://stryker-mutator.io/docs/stryker-js/introduction/ "StrykerJS: Introduction"
