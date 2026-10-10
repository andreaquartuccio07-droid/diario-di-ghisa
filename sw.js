/* Service worker del Diario di Ghisa.
   Tiene l'app in cache cosi' parte subito e funziona anche senza campo in palestra.
   Alzare VERSIONE a ogni rilascio: la cache vecchia viene buttata e l'app avvisa di aggiornare. */
const VERSIONE = "ghisa-v8";
const CACHE_APP = VERSIONE + "-app";

const GUSCIO = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/ghisa-home-180.png",
  "./icons/favicon-32.png",
  "./fonts/barlow-condensed-600.woff2",
  "./fonts/barlow-condensed-700.woff2",
  "./fonts/ibm-plex-sans.woff2",
  "./fonts/ibm-plex-mono-500.woff2",
  "./fonts/ibm-plex-mono-600.woff2",
];

self.addEventListener("install", ev => {
  // Niente skipWaiting: la versione nuova resta in attesa finche' l'utente non tocca "Aggiorna".
  ev.waitUntil(
    caches.open(CACHE_APP).then(c => Promise.all(
      GUSCIO.map(u => c.add(new Request(u, {cache: "reload"})).catch(() => null))
    ))
  );
});

self.addEventListener("activate", ev => {
  ev.waitUntil((async () => {
    const nomi = await caches.keys();
    await Promise.all(nomi.filter(n => n !== CACHE_APP).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", ev => {
  if (ev.data && ev.data.tipo === "ATTIVA_SUBITO") self.skipWaiting();
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  ev.respondWith((async () => {
    const cache = await caches.open(CACHE_APP);
    const salvata = await cache.match(req, {ignoreSearch: true});

    const dallaRete = fetch(req).then(res => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => null);

    // Copia in cache subito, aggiornamento in sottofondo per la prossima apertura.
    if (salvata){
      ev.waitUntil(dallaRete);
      return salvata;
    }
    const res = await dallaRete;
    if (res) return res;

    if (req.mode === "navigate"){
      const fallback = await cache.match("./index.html") || await cache.match("./");
      if (fallback) return fallback;
    }
    return new Response("", {status: 504, statusText: "Offline"});
  })());
});
