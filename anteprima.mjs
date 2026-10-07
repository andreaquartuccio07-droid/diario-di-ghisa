/* Server statico per provare l'app in locale: node anteprima.mjs
   Serve perche' un service worker non si registra dai file aperti con doppio clic (file://). */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORTA = Number(process.argv[2]) || 5173;
const RADICE = process.cwd();

const TIPI = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  const percorso = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = normalize(join(RADICE, percorso === "/" ? "/index.html" : percorso));
  if (!file.startsWith(RADICE)) {
    res.writeHead(403).end("Vietato");
    return;
  }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    const corpo = await readFile(file);
    res.writeHead(200, {
      "content-type": TIPI[extname(file).toLowerCase()] || "application/octet-stream",
      // niente cache: in sviluppo vogliamo vedere subito le modifiche
      "cache-control": "no-store",
    });
    res.end(corpo);
  } catch {
    res.writeHead(404, {"content-type": "text/plain; charset=utf-8"}).end("Non trovato: " + percorso);
  }
}).listen(PORTA, () => {
  console.log("Diario di Ghisa in ascolto su http://localhost:" + PORTA);
  console.log("Ctrl+C per fermare.");
});
