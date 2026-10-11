# Cuaderno del profesor · estructura de la aplicación (versión modular)

La aplicación es **estática**: no necesita compilar nada. Se publica tal cual en GitHub Pages
(sube todo el contenido de esta carpeta respetando las subcarpetas) y funciona sin conexión gracias a `sw.js`.

> Importante: debe abrirse desde su dirección web (GitHub Pages, o cualquier servidor local).
> Abierta con doble clic (`file://`) arranca, pero el navegador no deja cargar el editor de exámenes
> ni la Planificación temporal (se muestra un aviso).

## Carpetas

| Ruta | Qué contiene |
|---|---|
| `index.html` | Cabecera, estructura de la pantalla y lista ordenada de scripts |
| `css/app.css` | Estilos de toda la aplicación |
| `js/` | Código de la aplicación en módulos (ver tabla), cargados **en este orden** |
| `js/99-arranque.js` | Arranque: crea el estado, aplica migraciones y dibuja la primera pantalla. Siempre el último |
| `editor/` | Editor de exámenes (página propia que se carga dentro de la pestaña «Diseño»): `index.html`, `css/`, `js/` y `fonts/` (Lora e Inter) |
| `editor/js/puente-cuaderno.js` | Conexión del editor con el Cuaderno: guardado, criterios, estructura y PDF |
| `tools/planificacion.html` | Herramienta de Planificación temporal (se incrusta en cada Programación) |
| `sw.js` | Service worker: lista de archivos para el uso sin conexión y versión de la caché |
| `guia_mejorada.html` | Guía de uso |

Completan el repositorio: `manifest.json` e `icons/` (instalación como app), `tutoria/` (Gestor de Tutoría, aplicación independiente), `guia.html` (guía anterior), `.nojekyll` y `README.md` (instrucciones de publicación).

## Módulos de `js/` (en orden de carga)

| Archivo | Contenido |
|---|---|
| `js/00-preferencias-ui.js` | Preferencias de pantalla del dispositivo: tema claro/oscuro y ancho iPad/escritorio |
| `js/datos/competencias.js` | Diccionario de competencias clave (LOMLOE) |
| `js/datos/catalogos-curriculares.js` | Catálogo curricular precargado (propuestas pedagógicas) y saberes básicos |
| `js/datos/modelos-nese-refuerzo.js` | Constantes de NESE, refuerzo y repetición (modelos, leyendas, medidas) |
| `js/nucleo/utilidades.js` | Nota de acta, utilidades (uid, esc), avisos, toasts y diálogos |
| `js/nucleo/plantillas-materias.js` | Gestión de plantillas de materias: editar y eliminar/ocultar |
| `js/nucleo/modelo-datos.js` | Modelo de datos: grupos, alumnado, columnas de la lista |
| `js/nucleo/estado-migraciones.js` | Estado global de la app y migraciones de datos antiguos |
| `js/nucleo/guardado-copias.js` | Guardado a prueba de pérdidas, deshacer/rehacer y copias automáticas |
| `js/nucleo/cifrado.js` | Copias cifradas con contraseña |
| `js/curriculo/catalogos-importador.js` | Autocarga del currículo e importador de materias propias |
| `js/evaluacion/calculo-notas.js` | Motor de cálculo de notas (criterios, CE, CC, bloques, trimestres, final) y recuperaciones |
| `js/ui/barra-superior.js` | Barra superior y navegación entre las aplicaciones |
| `js/inicio/cronometro.js` | Cronómetro flotante |
| `js/inicio/calendario.js` | Calendario de Inicio: eventos, exámenes y entregas |
| `js/inicio/reuniones.js` | Registro de reuniones con familias, alumnado y equipo |
| `js/alumnado/plan-refuerzo.js` | Plan de refuerzo: seguimiento individualizado |
| `js/alumnado/plan-repeticion.js` | Plan de repetición: expediente formal |
| `js/alumnado/alumnos-nese.js` | Alumnado NESE: plan de seguimiento curricular adaptado |
| `js/inicio/horario.js` | Horario semanal, franjas horarias y vista «Hoy» |
| `js/inicio/alertas-home.js` | Alertas automáticas y pantalla de Inicio |
| `js/ui/grupo-y-copias.js` | Navegación por grupo, pantalla inicial vacía, exportar/importar todo |
| `js/alumnado/plano-aula.js` | Plano de aula y lista de alumnado |
| `js/alumnado/ficha-familia.js` | Correos de la familia y papelera de alumnado |
| `js/evaluacion/actividades.js` | Actividades y recuperaciones (interfaz) |
| `js/evaluacion/calificar.js` | Calificar, entrada rápida de notas y marcas NP/Exento |
| `js/resultados/informe-detallado.js` | Distribución, evolución del alumno e informe detallado de cálculo |
| `js/resultados/resultados.js` | Comentarios sugeridos, paso a Tutoría y pantalla de Resultados |
| `js/resultados/cobertura-diagnostico.js` | Cobertura de la evaluación, «Revisar mis datos» y novedades |
| `js/clase/asistencia.js` | Asistencia (y constantes de convivencia y familias) |
| `js/clase/convivencia.js` | Convivencia: AC, RC y parte de amonestación |
| `js/clase/familias.js` | Contacto con familias |
| `js/clase/diario.js` | Diario de clase |
| `js/programacion/programacion-aula.js` | Programación de aula: lista, SdA y recursos |
| `js/programacion/actividades-y-texto-rico.js` | Editor de texto enriquecido y actividades de la programación |
| `js/programacion/detalle-imprimir.js` | Detalle de la programación e impresión |
| `js/programacion/planificacion-temporal.js` | Planificación temporal de la materia (herramienta incrustada) |
| `js/memoria/memoria-curso.js` | Memoria de curso |
| `js/ajustes/ajustes-grupo.js` | Ajustes del grupo |
| `js/informes/exportaciones.js` | Informes y exportaciones (CSV) |
| `js/informes/impresion.js` | Impresión sin ventanas emergentes e informe del alumno |
| `js/informes/informe-final.js` | Informe final de curso |
| `js/resumen/resumen-grupo.js` | Resumen del grupo: aprobados, SdA y estadísticas |
| `js/corrector/motor-rubricas.js` | Corrector de exámenes: motor de rúbricas |
| `js/corrector/programacion-corrector.js` | Programación ↔ Corrector: rúbricas para los exámenes planificados |
| `js/corrector/navegacion-lista-crear.js` | Navegación del Corrector, lista de exámenes y crear examen |
| `js/corrector/editor-rubrica.js` | Editor de rúbrica y rúbricas adaptadas (NESE) |
| `js/corrector/corregir.js` | Corregir, estadísticas por ítem e impresión de la rúbrica corregida |
| `js/ui/buscador.js` | Buscador global |
| `js/ui/bienvenida.js` | Pantalla de bienvenida y conservación de scroll |
| `js/ui/render-accesibilidad.js` | Accesibilidad y render principal |
| `js/corrector/editor-examenes.js` | Editor de exámenes dentro del Corrector (pestaña «Diseño») |
| `js/99-arranque.js` | Arranque: estado inicial, migraciones y primer dibujo |

## Reglas para modificar la aplicación

1. **Todos los scripts son «clásicos»** y comparten el mismo ámbito global (igual que cuando era un solo archivo). Una función definida en un archivo se puede llamar desde cualquier otro **una vez cargada la página**.
2. **Al cargar, un archivo solo puede usar lo definido en los anteriores.** Las funciones que se *ejecutan* al cargar (listeners, constantes calculadas) deben quedar después de aquello de lo que dependen. Lo que se ejecuta solo cuando el usuario hace algo no tiene esta restricción.
3. **Archivo nuevo = línea nueva** en `index.html` (y en `APP_SHELL` de `sw.js`).
4. **Tras cualquier cambio, cambia `CACHE_NAME` en `sw.js`** (v72 → v73…). Si no, los dispositivos pueden mezclar archivos viejos y nuevos.
5. La app se entrega **vacía**: ningún archivo contiene datos de alumnado. Los datos viven en el navegador de cada dispositivo.

## Cómo se comprobó que el troceado no pierde nada

- El código JavaScript de los 52 módulos, unido en orden, es **idéntico byte a byte** al de la versión de un solo archivo (`index_beta_v2.html`); solo se cambiaron de sitio tres bloques de arranque (estado inicial, migraciones y primer dibujo) para que se ejecuten al final.
- Los únicos cambios de código respecto a esa versión son: el editor de exámenes y la Planificación temporal se cargan desde sus archivos (antes iban incrustados en el HTML), el PDF del editor lee su CSS y sus fuentes por ruta, y se eliminó el botón oculto «Preparar sin conexión».
- Con los mismos datos, 24 pantallas generan **exactamente el mismo HTML** en las dos versiones; el estado guardado coincide y la recarga con datos y diseño abierto funciona igual.
- Pruebas completas con datos: diseño → cobertura → rúbrica → corrección → reimportación con alumnos corregidos → copia de seguridad → paquete → PDF → versión B.
- Sin conexión (service worker): la app, el editor, el PDF con Lora/Inter y la Planificación temporal cargan desde la caché, sin peticiones a internet.
