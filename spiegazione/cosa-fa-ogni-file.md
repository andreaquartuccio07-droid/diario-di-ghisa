# Cosa fa ogni file del Diario di Ghisa

Promemoria per me. Questa cartella non fa parte dell'app: posso cancellarla o cambiarla senza rompere niente.

## L'app vera e propria

Sono i file che finiscono sul telefono.

| File o cartella | A cosa serve |
|---|---|
| `index.html` | È l'app. Grafica, logica, tutto sta qui. |
| `sw.js` | Fa funzionare l'app offline, salvandola sul telefono. Contiene `VERSIONE`: va alzata a ogni modifica, altrimenti il telefono resta sulla copia vecchia. |
| `manifest.webmanifest` | Nome, icona e colori dell'app quando la installo sul telefono. |
| `icons/` | Le icone dell'app: il disco di ghisa in varie misure. `ghisa-home-180.png` è quella che usa l'iPhone. `icona-sorgente.html` è il disegno da cui Claude le ricava: non finisce sul telefono. |
| `fonts/` | I caratteri di scrittura (Barlow Condensed, IBM Plex Sans, IBM Plex Mono), salvati qui così ci sono anche senza campo. |

## Cartella `.claude` — roba per Claude Code

Non fa parte dell'app. Serve a far lavorare meglio Claude su questo progetto.

| File | A cosa serve |
|---|---|
| `.claude/settings.json` | Impostazioni di Claude Code. Dice per esempio quando far partire l'hook. |
| `.claude/hooks/controlla-versione.sh` | Il promemoria automatico: se l'app è cambiata e `VERSIONE` no, ferma Claude e glielo fa sistemare. |
| `.claude/skills/stile-ghisa/` | Le regole grafiche: colori, caratteri, misure, componenti. |
| `.claude/skills/figura-esercizio/` | Come è fatto l'omino che mostra il movimento sotto le serie, e una tavola per controllarlo. |
| `.claude/skills/rilascio/` | La procedura da seguire quando pubblico una modifica. Si richiama scrivendo `/rilascio`. |
| `.claude/agents/revisore-pwa.md` | Un "controllore" che rilegge il codice e cerca errori, senza modificare niente. |
| `.claude/agents/tester.md` | Un "collaudatore" che apre l'app in un browser e la prova come farei io: aggiunge e cancella serie, ricarica, la usa offline, a schermo da telefono. Poi dice cosa funziona e cosa no. |
| `.mcp.json` (fuori da `.claude`) | Collega Claude Code a Playwright, il programma che comanda il browser per il collaudatore. |

## File di servizio

| File | A cosa serve |
|---|---|
| `CLAUDE.md` | Le istruzioni che Claude Code legge ogni volta che apro il progetto. |
| `README.md` | Descrizione del progetto per chi lo guarda. |
| `anteprima.mjs` | Apre l'app sul computer per provarla: `node anteprima.mjs`, poi `http://localhost:5173` nel browser. Serve perché l'offline non funziona aprendo `index.html` con doppio clic. |
| `.gitignore` | Dice a git quali file ignorare. |
| `.nojekyll` | Serve a GitHub Pages, il sito dove l'app viene pubblicata. |
| `spiegazione/` | Questa cartella. Dentro c'è anche `storia-delle-modifiche.md`: tutto quello che è stato fatto all'app, versione per versione, e cosa resta da provare. |

## Le lettere accanto ai file in VS Code

- **U** = file nuovo, mai salvato su git.
- **M** = file modificato, non ancora salvato su git.

Spariscono dopo il commit. Finché non faccio commit e push, il telefono non vede le modifiche.

## Cose da ricordare

- Nel menu ⋯ c'è "Prova la sveglia": fa suonare il fine recupero dopo 3 secondi, per controllare volume e silenzioso.
- "Sveglia col silenzioso: sì" la fa sentire anche col tasto silenzioso ma mette in pausa la musica; "no" la mescola alla musica ma col silenzioso tace.
- Su iPhone la sveglia del Diario suona solo con l'app aperta e lo schermo acceso (l'app prova a tenerlo acceso da sola durante il recupero). Non vibra: Apple non lo permette alle app web.
- Per farla suonare anche da un'altra app: menu ⋯ → "Timer dell'iPhone: sì". Sul timer compare una campanella: toccandola parte il timer dell'Orologio coi secondi che restano. Funziona grazie al comando rapido "Recupero Ghisa" che ho creato nell'app Comandi: se lo cancello o lo rinomino, smette di funzionare (la guida per rifarlo si apre riaccendendo la voce).
- La scheda del coach sta dentro `index.html`. Quando il coach me ne dà una nuova, Claude la riscrive lì; sul telefono arriva solo quando tocco "Ripristina la scheda del coach" (tiene lo storico) o "Azzera tutto" (cancella tutto) dal menu ⋯. Oggi dentro c'è la Scheda Andrea 8.0.
- Lo schema "3×5 + 1×8": tre serie da 5 su cui l'app calcola l'obiettivo, più una serie finale più leggera da 8 (riga "FIN") col suo carico.
- Chiunque abbia il link può usare l'app: i suoi dati restano sul suo telefono, ma parte con la mia scheda e riceve i miei aggiornamenti.

- La grafica si chiama "Abisso": fondo chiaro, azzurro in alto, riquadri di vetro, timer e barra in basso scuri. Le regole stanno in `.claude/skills/stile-ghisa/`.
- L'icona sulla Home dell'iPhone non cambia con "Aggiorna". Per cambiarla: Esporta backup, aggiungi di nuovo l'app da Safari, Importa backup nella nuova, controlla in Progressi, poi elimina la vecchia.
- I miei dati di allenamento stanno **solo sul telefono**, non in questi file. Prima di modifiche grosse: menu ⋯ → Esporta backup (.json).
- Dopo una modifica pubblicata, sul telefono compare "Nuova versione disponibile": va toccato "Aggiorna".
