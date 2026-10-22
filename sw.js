// sw.js — hace que la suite funcione sin conexión.
//
// Cómo funciona: la PRIMERA vez que se abre con wifi/datos (o simplemente la
// primera vez que se abre, si ya has seguido tutoria/vendor/LEEME.txt), este
// Service Worker guarda en una caché local todos los archivos de la app. A
// partir de ese momento, cada archivo se sirve primero desde esa caché
// (funciona sin conexión) y se actualiza en segundo plano si hay red.
//
// Nota: este Service Worker solo se activa cuando la app se abre a través de
// un servidor (http/https), como GitHub Pages. Si abres el archivo suelto
// haciendo doble clic (file://), el navegador no permite Service Workers —
// pero el hub principal, y Tutoría si has vendorizado sus librerías, siguen
// funcionando sin conexión de todas formas, porque no dependen de recursos
// externos.
//
// Si actualizas CUALQUIER archivo de la app (ahora hay varios: js/, css/, editor/...),
// cambia también el CACHE_NAME de abajo (v72 -> v73, etc.) para que los dispositivos
// descarguen la versión nueva completa en vez de mezclar archivos viejos y nuevos.

const CACHE_NAME = 'geohist-suite-v75';

// El "esqueleto" de las dos apps: HTML, manifest e iconos.
const APP_SHELL = [
  './',
  './index.html',
  './css/app.css',
  './tools/planificacion.html',
  './js/00-preferencias-ui.js',
  './js/datos/competencias.js',
  './js/datos/catalogos-curriculares.js',
  './js/datos/modelos-nese-refuerzo.js',
  './js/nucleo/utilidades.js',
  './js/nucleo/plantillas-materias.js',
  './js/nucleo/modelo-datos.js',
  './js/nucleo/estado-migraciones.js',
  './js/nucleo/guardado-copias.js',
  './js/nucleo/cifrado.js',
  './js/curriculo/catalogos-importador.js',
  './js/evaluacion/calculo-notas.js',
  './js/ui/barra-superior.js',
  './js/inicio/cronometro.js',
  './js/inicio/calendario.js',
  './js/inicio/reuniones.js',
  './js/alumnado/plan-refuerzo.js',
  './js/alumnado/plan-repeticion.js',
  './js/alumnado/alumnos-nese.js',
  './js/inicio/horario.js',
  './js/inicio/alertas-home.js',
  './js/ui/grupo-y-copias.js',
  './js/alumnado/plano-aula.js',
  './js/alumnado/ficha-familia.js',
  './js/evaluacion/actividades.js',
  './js/evaluacion/calificar.js',
  './js/resultados/informe-detallado.js',
  './js/resultados/resultados.js',
  './js/resultados/cobertura-diagnostico.js',
  './js/clase/asistencia.js',
  './js/clase/convivencia.js',
  './js/clase/familias.js',
  './js/clase/diario.js',
  './js/programacion/programacion-aula.js',
  './js/programacion/actividades-y-texto-rico.js',
  './js/programacion/detalle-imprimir.js',
  './js/programacion/planificacion-temporal.js',
  './js/memoria/memoria-curso.js',
  './js/ajustes/ajustes-grupo.js',
  './js/informes/exportaciones.js',
  './js/informes/impresion.js',
  './js/informes/informe-final.js',
  './js/resumen/resumen-grupo.js',
  './js/corrector/motor-rubricas.js',
  './js/corrector/programacion-corrector.js',
  './js/corrector/navegacion-lista-crear.js',
  './js/corrector/editor-rubrica.js',
  './js/corrector/corregir.js',
  './js/ui/buscador.js',
  './js/ui/bienvenida.js',
  './js/ui/render-accesibilidad.js',
  './js/corrector/editor-examenes.js',
  './js/99-arranque.js',
  './js/una-ventana.js',
  './js/registro-sw.js',
  './editor/index.html',
  './editor/css/editor.css',
  './editor/css/fuentes.css',
  './editor/js/01-nucleo.js',
  './editor/js/02-maquetacion.js',
  './editor/js/03-interfaz-arbol.js',
  './editor/js/04-inspector.js',
  './editor/js/05-dialogos.js',
  './editor/js/06-exportacion-docx.js',
  './editor/js/07-archivos-y-calidad.js',
  './editor/js/08-arranque.js',
  './editor/js/puente-cuaderno.js',
  './editor/fonts/inter-400.woff',
  './editor/fonts/inter-400i.woff',
  './editor/fonts/inter-700.woff',
  './editor/fonts/inter-700i.woff',
  './editor/fonts/lora-400.woff',
  './editor/fonts/lora-400i.woff',
  './editor/fonts/lora-700.woff',
  './editor/fonts/lora-700i.woff',
  './guia_mejorada.html',
  './manifest.json',
  './icons/icon-32.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './tutoria/',
  './tutoria/index.html',
  './tutoria/manifest.json',
  './tutoria/icon-192.png',
  './tutoria/icon-512.png'
];

// Librerías vendorizadas que Tutoría necesita para los gráficos y la vista
// previa de PDF (ver tutoria/vendor/LEEME.txt). Son opcionales: si no las
// has descargado, simplemente no se cachean y esas dos funciones concretas
// no estarán disponibles sin conexión (el resto de la app sí).
const OPTIONAL_ASSETS = [
  './tutoria/vendor/chart.umd.min.js',
  './tutoria/vendor/pdf.min.js',
  './tutoria/vendor/pdf.worker.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await Promise.all(OPTIONAL_ASSETS.map(async url => {
      try {
        const resp = await fetch(url);
        if (resp && resp.status === 200) await cache.put(url, resp);
      } catch (e) { /* no está descargado; no pasa nada */ }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('geohist-suite-') && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    const networkFetch = fetch(event.request).then(resp => {
      if (resp && (resp.status === 200 || resp.type === 'opaque')) {
        cache.put(event.request, resp.clone());
      }
      return resp;
    }).catch(() => null);
    if (cached) return cached;
    const fromNetwork = await networkFetch;
    if (fromNetwork) return fromNetwork;
    return new Response('Sin conexión y todavía no hay una copia guardada de este archivo.', {
      status: 503, statusText: 'Offline'
    });
  })());
});
