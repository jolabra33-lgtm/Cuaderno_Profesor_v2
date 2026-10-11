/* Cuaderno del profesor · registro del service worker (funcionamiento sin conexión) */
// Hace que la app siga funcionando sin conexión tras la primera visita con wifi.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(()=>{}); });
}
