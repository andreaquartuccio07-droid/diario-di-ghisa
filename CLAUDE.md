# Contesto del progetto

App personale per la palestra: scheda del coach, log delle serie, progressione dei carichi,
questionario di fine blocco da mandare al coach. Interfaccia in italiano.
È una **PWA installata sulla schermata Home del telefono**: si usa in palestra, spesso senza campo.

## Regole

- **Un file solo per l'app**: tutto in `index.html` (HTML + `<style>` + `<script>` inline).
  Non spezzarlo in più file senza che l'utente lo chieda.
- **Niente librerie né risorse esterne**: grafici in SVG scritto a mano, font in locale in `fonts/`
  (Barlow Condensed, IBM Plex Sans, IBM Plex Mono, sottoinsieme latino) dichiarati con `@font-face` in `index.html`.
  Il service worker serve solo file della propria origine: una risorsa esterna rompe l'offline.
- **A ogni modifica dell'app alza `VERSIONE` in `sw.js`** (`ghisa-v1` → `ghisa-v2`): senza quello
  i telefoni restano sulla copia vecchia in cache. Se aggiungi file da far funzionare offline,
  mettili anche nell'array `GUSCIO`.
- **Tema chiaro e scuro**: tutti i colori passano dai token CSS in `:root` (tre blocchi: `:root`,
  `prefers-color-scheme: dark`, `[data-theme="dark"]`). Mai colori letterali nei componenti.
- **Mobile first**: si usa col telefono in mano fra una serie e l'altra. Bersagli grandi,
  niente interazioni che richiedano precisione, attenzione alle `env(safe-area-inset-*)`.
- Le icone si rigenerano da `icons/icona-sorgente.html` (SVG a mano) con uno screenshot di Playwright,
  come spiegato nella skill `stile-ghisa`: un disco di ghisa con scritte ciano su fondo blu abisso.

## Struttura del codice

Tutto dentro una IIFE in fondo a `index.html` (più un secondo `<script>` che registra il
service worker e mostra la striscia "Nuova versione disponibile"):

- `schedaCoach()` — la scheda vera dell'utente (4 giorni + blocchi post-allenamento).
  `REV` va alzato solo per sovrascrivere la scheda già salvata sul dispositivo.
- `DOMANDE` — le 17 domande del questionario di fine programma del coach.
- `storicoDi(nome)` — storico di un esercizio, **indicizzato per nome normalizzato** (`chiave()`),
  non per id: così lo stesso esercizio in giorni diversi ha una progressione unica.
- `obiettivo(es)` — regola del sovraccarico progressivo (tutte le serie a rep max → +incremento).
  Si calcola sull'ultima seduta che ha serie di lavoro. La serie iniziale (`att`, il "1×5" di
  "1×5 + 3×8") è esclusa dalla regola ma conta per l'1RM stimato, e **ha un carico suo**: per l'utente
  è una serie pesante, non un riscaldamento. Ovunque si mostrino le serie si usa `serieGruppi()`
  (`100×5 · 80×8·7·6`): mai un solo "kg" accanto alle ripetizioni di serie diverse.
- `sistemaRecuperi(scheda)` — regola dei recuperi, applicata una volta sola a ogni scheda
  (marcatore `scheda.recuperi = 2`): 90 s ovunque, 0 sul primo esercizio di una superserie, 150 su
  quello dopo. Poi i valori restano modificabili da Scheda.
- Timer: `avviaTimer()` conta sull'ora vera di fine e si salva in `diario-ghisa-timer` (sopravvive al
  ricaricamento); a zero `sveglia()` squilla finché non si tocca Stop. `sbloccaSuono()` va chiamata
  dentro un tocco. La preferenza "Sveglia col silenzioso" sta in `diario-ghisa-sveglia`.
- `andamento()` / `apriStorico()` — indicatore di progresso e pannello dal basso (`#dlg-storico`).
- `aggiornaBozza()` — da usare dopo ogni modifica alla scheda: a metà allenamento non butta via le
  serie spuntate. Non chiamare `creaBozza()` direttamente in quei punti.
- `blocco()` / `progressioniBlocco()` — stato del blocco di 6 settimane e delta dei carichi. Nel Report
  e nel testo per il coach ogni esercizio riporta le serie intere di prima e ultima seduta
  (`serieDa` / `serieA`): il coach deve vedere "80×5 · 70×8·8·8", non un solo carico.
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

- **Storia e stato del progetto**: `spiegazione/storia-delle-modifiche.md` elenca cosa è cambiato a ogni
  versione, cosa resta da provare sull'iPhone, cosa è stato lasciato così apposta e i limiti noti.
  Leggilo prima di lavorare su un problema e aggiungi una voce in cima a ogni rilascio.
- I dati stanno **solo sul dispositivo**. Prima di modifiche rischiose alla struttura dei dati,
  ricordare all'utente di fare Esporta backup (.json) dal menu ⋯.
- Recuperi voluti dall'utente: 1:30 fra le serie; in superserie nessuna pausa dopo il primo esercizio
  (`recupero: 0`, solo l'avviso di passare al successivo) e 2:30 dopo il secondo.
- L'utente ha un **iPhone**: un'app web lì non può vibrare, né suonare a schermo spento o in secondo
  piano. Per questo durante il recupero si tiene acceso lo schermo (`navigator.wakeLock`). Suono,
  silenzioso e schermo acceso si possono verificare solo sul telefono vero ("Prova la sveglia" nel menu ⋯).
- Fuori da claude.ai "Esporta backup" usa il foglio di condivisione sul telefono e un download sul computer.
- Esiste una vecchia copia come Artifact su claude.ai
  (`https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705`), non più allineata.
  Per ripubblicarla andrebbe tolto l'involucro `<!doctype html>`/`<head>`/`<body>` da `index.html`,
  che la piattaforma aggiunge da sé. Farlo solo se l'utente lo chiede.
