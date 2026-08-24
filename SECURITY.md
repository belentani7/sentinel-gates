# Política de seguridad

## Reportar una vulnerabilidad

No abras una issue pública para información que pueda facilitar una explotación. Usa la función de avisos privados de seguridad del repositorio o contacta al mantenedor mediante la dirección indicada en el perfil de GitHub. Incluye una descripción, el impacto, una prueba de concepto mínima y los pasos de reproducción. Recibirás acuse de recibo en un plazo objetivo de siete días y una actualización tras evaluar la severidad.

## Controles aplicados

La plantilla aplica seguridad desde el inicio: dependencias bloqueadas, auditoría con umbral alto, revisión de dependencias por pull request cuando la capacidad de GitHub está disponible, escaneo de secretos sobre el historial completo, análisis CodeQL y permisos de workflow mínimos. Las acciones de terceros se fijan a revisiones inmutables y Dependabot vigila sus actualizaciones.

## Límites y gestión de riesgo

Un control automático no equivale a una garantía. Mantén los secretos fuera del repositorio, valida los datos no confiables en sus límites, usa cuentas y tokens con el menor privilegio posible y evita registrar identificadores personales, credenciales o cuerpos de peticiones. Toda excepción de seguridad exige una issue, un propietario, fecha de caducidad y un plan de eliminación.

## Repositorios privados

Algunas capacidades administradas de GitHub, como la revisión de dependencias y la publicación de resultados de análisis, pueden requerir que Code Security o GitHub Advanced Security estén habilitados en repositorios privados. Para evitar una falsa señal de aprobación, el workflow omite explícitamente Dependency Review y CodeQL mientras el repositorio sea privado, y los activa automáticamente al hacerlo público. El workflow mantiene `npm audit` como control local y TruffleHog como escaneo de secretos en ambos estados. Antes de marcar una verificación como requerida, confirma que el plan del repositorio soporta la ejecución y la subida de resultados.
