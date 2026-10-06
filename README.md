# Diario di Ghisa

App per seguire la scheda della palestra, registrare le serie e monitorare i carichi progressivi.
È una PWA: si installa sulla schermata Home del telefono, parte a schermo intero e funziona
anche senza connessione.

## File

| | |
|---|---|
| `index.html` | l'app: HTML, CSS e JavaScript in un file solo |
| `manifest.webmanifest` | nome, icone e modo di apertura dell'app installata |
| `sw.js` | service worker: tiene l'app in cache per l'uso offline |
| `icons/` | icone generate (192, 512, maskable, apple-touch, favicon) |
| `anteprima.mjs` | server statico per provarla in locale |

## Provarla sul PC

```
node anteprima.mjs
```

poi apri http://localhost:5173. Serve il server: aperta con doppio clic (`file://`) l'app
funziona ma il service worker non si registra, quindi non puoi provare l'offline.

## Metterla online e installarla sul telefono

Il progetto è pensato per GitHub Pages (va bene qualsiasi hosting statico).

1. Crea un repository su GitHub e collegalo:
   ```
   git remote add origin https://github.com/<tuo-utente>/diario-di-ghisa.git
   git push -u origin main
   ```
2. Su GitHub: **Settings → Pages → Source: Deploy from a branch**, branch `main`, cartella `/ (root)`.
3. Dopo un minuto l'app è su `https://<tuo-utente>.github.io/diario-di-ghisa/`.
4. Dal telefono apri quell'indirizzo e aggiungilo alla Home:
   - **iPhone (Safari)**: Condividi → *Aggiungi a Home*
   - **Android (Chrome)**: menu ⋮ → *Installa app* / *Aggiungi a schermata Home*

Da quel momento l'icona apre l'app a schermo intero, senza barra del browser, anche senza campo.

## Aggiornamenti

Quando modifichi l'app, **alza `VERSIONE` in `sw.js`** (es. `ghisa-v1` → `ghisa-v2`) prima di
pubblicare: altrimenti i telefoni continuano a usare la copia in cache. Alla prima apertura
successiva l'app mostra la striscia "Nuova versione disponibile" con il pulsante per aggiornare.

## I tuoi dati

Allenamenti, scheda, pesi e questionario stanno nel `localStorage` del browser **di quel
dispositivo**: non viaggiano in rete e non sono su nessun server. Conseguenza importante:
se cancelli i dati del browser o cambi telefono, spariscono.

Dal menu (⋯) dell'app:

- **Esporta backup (.json)** — salva tutto in un file. Fallo a fine blocco e prima di cambiare telefono.
- **Importa backup** — rimette tutto da quel file, anche su un altro dispositivo.

## Versione su Claude

Esiste anche una copia pubblicata come Artifact:
https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705
Non è più allineata a questo codice ed è tenuta solo come appoggio. L'app vera è questa.
