# Cuaderno del profesor · Evaluación, Corrector y Tutoría

Aplicación web para Geografía e Historia, pensada para usarse como una app (PWA) en el
iPad, el móvil o el ordenador: sin cuenta, sin servidor y **sin datos dentro**. Al
publicarla se abre vacía; todo lo que se escribe se guarda solo en el navegador del
dispositivo.

Contiene dos aplicaciones independientes (no comparten alumnado ni notas):

- **Cuaderno del profesor** (`index.html`): evaluación por competencias, Corrector de
  exámenes con diseño de examen y rúbrica, programación de aula, calendario, planes…
- **Gestor de Tutoría** (`tutoria/index.html`).

## Contenido del repositorio

```
index.html              → Cuaderno del profesor (estructura y lista de scripts)
css/                    → estilos de la aplicación
js/                     → código de la aplicación en módulos (ver README_ESTRUCTURA.md)
editor/                 → editor de exámenes (página propia, con sus fuentes Lora e Inter)
tools/                  → Planificación temporal de la materia
sw.js                   → service worker: funcionamiento sin conexión y versión de la caché
manifest.json, icons/   → instalación como app
guia_mejorada.html      → guía de uso actual (también enlazada desde la app)
tutoria/                → Gestor de Tutoría (independiente) y sus librerías en vendor/
.nojekyll               → evita que GitHub procese el sitio como Jekyll
README.md               → este archivo
README_ESTRUCTURA.md    → mapa técnico: qué hace cada módulo y cómo modificarla
```

## 1. Subir el repositorio a GitHub

1. Crea un repositorio nuevo en [github.com/new](https://github.com/new) (público o
   privado, ambos funcionan con GitHub Pages).
2. Entra en el repositorio → **Add file → Upload files**.
3. Arrastra **todo el contenido de esta carpeta** (sus archivos y carpetas, no la carpeta
   en sí) a la raíz del repositorio, de modo que `index.html` quede en la raíz.
   Son unos 96 archivos: si GitHub te limita a 100 por subida, hazlo en dos tandas
   (por ejemplo, primero `js/` y `editor/`, luego el resto).
4. Pulsa **Commit changes** y comprueba que se ven las carpetas `css/`, `js/`, `editor/`,
   `tools/`, `icons/` y `tutoria/`.

Con git, desde esta carpeta:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## 2. Activar GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En *Build and deployment → Source* elige **Deploy from a branch**; rama `main`,
   carpeta **/ (root)**. Guarda.
3. Espera uno o dos minutos. La dirección será
   `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

> La aplicación **debe abrirse desde esa dirección**. Abierta con doble clic
> (`file://`) arranca, pero el navegador no deja cargar el editor de exámenes ni la
> Planificación temporal.

## 3. Instalarla como app

- **Chrome (ordenador o Android):** abre la dirección y pulsa el icono de instalar en la
  barra de direcciones (o menú ⋮ → *Instalar Cuaderno del profesor*).
- **iPad / iPhone:** debe hacerse desde **Safari**: Compartir → *Añadir a la pantalla de
  inicio*.

## 4. Funciona sin conexión

La primera vez que se abre **con internet**, el service worker (`sw.js`) guarda todos los
archivos (aplicación, editor, fuentes, planificador y Tutoría). Después se abre incluso en
modo avión. Solo las fuentes opcionales del examen marcadas «requiere conexión» necesitan
internet, y solo la primera vez que se usan.

Para que los gráficos y la vista previa de PDF de Tutoría también funcionen sin conexión,
sigue `tutoria/vendor/LEEME.txt` (en este repositorio ya vienen incluidas las librerías).

## 5. Actualizar la aplicación

1. Antes, en el dispositivo de trabajo: **Exportar copia** en la app.
2. Sube los archivos que cambien al repositorio, respetando las carpetas.
3. **Cambia `CACHE_NAME` en `sw.js`** (`geohist-suite-v75` → `v76`, etc.). Es
   imprescindible: sin eso los dispositivos podrían mezclar archivos viejos y nuevos.
4. Abre la app con conexión; si aparece la versión anterior, ciérrala del todo y ábrela de nuevo.

Actualizar los archivos no toca tus datos: viven en el navegador, no en GitHub.

## Cosas importantes

- **Los datos no salen del dispositivo.** Se guardan en el almacenamiento del navegador
  (localStorage e IndexedDB), ligados a la dirección de GitHub Pages. Nadie más los ve.
- **Exporta copias de seguridad con regularidad.** La app avisa si llevas tiempo sin hacerlo.
  Si borras los datos del sitio o desinstalas la app sin copia, se pierden.
- **Cada navegador y cada dispositivo tienen sus propios datos.** Usa «Exportar/Importar
  copia» para pasarlos de uno a otro.
- Cambiar el nombre del repositorio o del usuario cambia la dirección y, con ella, el
  almacenamiento: los datos quedarían en la dirección antigua (haz copia antes).
