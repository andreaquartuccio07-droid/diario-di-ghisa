# Contesto del progetto

App personale per la palestra: scheda del coach, log delle serie, progressione dei carichi,
questionario di fine blocco da mandare al coach. Interfaccia in italiano.
È una **PWA installata sulla schermata Home del telefono**: si usa in palestra, spesso senza campo.

## Regole

- **Un file solo per l'app**: tutto in `index.html` (HTML + `<style>` + `<script>` inline).
  Non spezzarlo in più file senza che l'utente lo chieda.
- **Niente librerie esterne**: grafici in SVG scritto a mano, font da Google Fonts.
  Qualsiasi risorsa esterna in più va cacheata nel service worker, altrimenti rompe l'offline.
- **A ogni modifica dell'app alza `VERSIONE` in `sw.js`** (`ghisa-v1` → `ghisa-v2`): senza quello
  i telefoni restano sulla copia vecchia in cache. Se aggiungi file da far funzionare offline,
  mettili anche nell'array `GUSCIO`.
- **Tema chiaro e scuro**: tutti i colori passano dai token CSS in `:root` (tre blocchi: `:root`,
  `prefers-color-scheme: dark`, `[data-theme="dark"]`). Mai colori letterali nei componenti.
- **Mobile first**: si usa col telefono in mano fra una serie e l'altra. Bersagli grandi,
  niente interazioni che richiedano precisione, attenzione alle `env(safe-area-inset-*)`.
- Le icone si rigenerano con uno script PowerShell + System.Drawing (non è nel repo):
  barra e dischi gialli `#F5C518` su grafite `#131619`.

## Struttura del codice

Tutto dentro una IIFE in fondo a `index.html` (più un secondo `<script>` che registra il
service worker e mostra la striscia "Nuova versione disponibile"):

- `schedaCoach()` — la scheda vera dell'utente (4 giorni + blocchi post-allenamento).
  `REV` va alzato solo per sovrascrivere la scheda già salvata sul dispositivo.
- `DOMANDE` — le 17 domande del questionario di fine programma del coach.
- `storicoDi(nome)` — storico di un esercizio, **indicizzato per nome normalizzato** (`chiave()`),
  non per id: così lo stesso esercizio in giorni diversi ha una progressione unica.
- `obiettivo(es)` — regola del sovraccarico progressivo (tutte le serie a rep max → +incremento).
  Le serie di attivazione (`att`) sono escluse dalla regola ma contano per l'1RM stimato.
- `blocco()` / `progressioniBlocco()` — stato del blocco di 6 settimane e delta dei carichi.
- `vistaOggi()`, `vistaScheda()`, `vistaProgressi()`, `vistaReport()` — le quattro schermate.
- Persistenza: `localStorage`, chiave `diario-ghisa-v2`. Resta il codice che usa `claude.use("db")`
  per la vecchia versione Artifact: fuori da claude.ai `window.claude` non esiste, `avviaSync()`
  esce subito e l'app lavora solo in locale. Non è un bug.

## Da sapere

- I dati stanno **solo sul dispositivo**. Prima di modifiche rischiose alla struttura dei dati,
  ricordare all'utente di fare Esporta backup (.json) dal menu ⋯.
- I tempi di recupero non erano sulla scheda del coach: sono stime, l'utente li corregge dall'app.
- Gli esercizi in superset hanno `recupero: 0` e al posto del timer mostrano l'avviso di passare
  all'esercizio successivo.
- Esiste una vecchia copia come Artifact su claude.ai
  (`https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705`), non più allineata.
  Per ripubblicarla andrebbe tolto l'involucro `<!doctype html>`/`<head>`/`<body>` da `index.html`,
  che la piattaforma aggiunge da sé. Farlo solo se l'utente lo chiede.
