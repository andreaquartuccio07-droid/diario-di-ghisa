# Contesto del progetto

App personale per la palestra: scheda del coach, log delle serie, progressione dei carichi,
questionario di fine blocco da mandare al coach. Interfaccia in italiano.
È una **PWA installata sulla schermata Home del telefono**: si usa in palestra, spesso senza campo.

## Regole

- **Un file solo per l'app**: tutto in `index.html` (HTML + `<style>` + `<script>` inline).
  Non spezzarlo in più file senza che l'utente lo chieda.
- **Niente librerie né risorse esterne**: grafici in SVG scritto a mano, font in locale in `fonts/`
  (Archivo, IBM Plex Sans, IBM Plex Mono, sottoinsieme latino) dichiarati con `@font-face` in `index.html`.
  Il service worker serve solo file della propria origine: una risorsa esterna rompe l'offline.
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

## Strumenti di Claude

La cartella `.claude/` contiene ciò che è specifico di questo progetto; il resto è installato
sull'account. Usali senza aspettare che l'utente li nomini:

| Quando | Cosa usare |
|---|---|
| Schermata nuova o rifatta, componenti, layout | skill `ui-ux-pro-max` e `frontend-design` |
| Grafici e numeri in `vistaProgressi()` / `vistaReport()` | skill `dataviz` (SVG a mano, niente librerie) |
| Qualsiasi modifica grafica: colori, font, misure, componenti | skill `stile-ghisa` (`.claude/skills/`), prima delle altre |
| Token nuovi, tema chiaro/scuro | skill `design-system` |
| Modifica alla forma dei dati salvati | agente `Plan` prima di scrivere codice, e backup dell'utente |
| Dopo una modifica consistente | agente `revisore-pwa` (`.claude/agents/`): rilegge il codice |
| Dopo una modifica all'app, prima del rilascio | agente `tester` (`.claude/agents/`): prova l'app in un browser vero con Playwright |
| Fine di ogni modifica all'app | skill `rilascio` (`.claude/skills/`) |
| Vedere la modifica funzionare | skill `run` |
| Questionario di fine blocco da mandare al coach | connettore Gmail: crea una **bozza**, non inviare |
| Copia di sicurezza di un backup `.json` | connettore Google Drive, solo se l'utente lo chiede |

- Non usare la skill `ui-styling`: porta Tailwind e shadcn, vietati dalla regola sulle librerie.
- L'hook in `.claude/settings.json` blocca la chiusura del turno se l'app è cambiata e `VERSIONE` no.
- I connettori (Gmail, Drive) sono legati all'account claude.ai, non a file del repo.
- `.mcp.json` nella radice dichiara il server MCP `playwright` (`npx @playwright/mcp@latest`, avviato
  con `cmd /c` perché su Windows `npx` da solo non parte). Lo usa l'agente `tester`. Va approvato una
  volta con `/mcp`; se gli strumenti `mcp__playwright__*` mancano, dillo invece di saltare la prova.
- Il `tester` lavora su `http://localhost:5188` con un profilo del browser suo: i dati che inserisce
  sono finti e non toccano quelli dell'utente. Non modifica file.
- Plugin: andrebbero in `enabledPlugins` di `.claude/settings.json`. Al momento non ne serve nessuno.

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
