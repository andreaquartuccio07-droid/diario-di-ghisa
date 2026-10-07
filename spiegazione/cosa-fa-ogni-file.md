# Cosa fa ogni file del Diario di Ghisa

Promemoria per me. Questa cartella non fa parte dell'app: posso cancellarla o cambiarla senza rompere niente.

## L'app vera e propria

Sono i file che finiscono sul telefono.

| File o cartella | A cosa serve |
|---|---|
| `index.html` | È l'app. Grafica, logica, tutto sta qui. |
| `sw.js` | Fa funzionare l'app offline, salvandola sul telefono. Contiene `VERSIONE`: va alzata a ogni modifica, altrimenti il telefono resta sulla copia vecchia. |
| `manifest.webmanifest` | Nome, icona e colori dell'app quando la installo sul telefono. |
| `icons/` | Le icone dell'app. |
| `fonts/` | I caratteri di scrittura (Archivo, IBM Plex Sans, IBM Plex Mono), salvati qui così ci sono anche senza campo. |

## Cartella `.claude` — roba per Claude Code

Non fa parte dell'app. Serve a far lavorare meglio Claude su questo progetto.

| File | A cosa serve |
|---|---|
| `.claude/settings.json` | Impostazioni di Claude Code. Dice per esempio quando far partire l'hook. |
| `.claude/hooks/controlla-versione.sh` | Il promemoria automatico: se l'app è cambiata e `VERSIONE` no, ferma Claude e glielo fa sistemare. |
| `.claude/skills/stile-ghisa/` | Le regole grafiche: colori, caratteri, misure, componenti. |
| `.claude/skills/rilascio/` | La procedura da seguire quando pubblico una modifica. Si richiama scrivendo `/rilascio`. |
| `.claude/agents/revisore-pwa.md` | Un "controllore" che rilegge il codice e cerca errori, senza modificare niente. |

## File di servizio

| File | A cosa serve |
|---|---|
| `CLAUDE.md` | Le istruzioni che Claude Code legge ogni volta che apro il progetto. |
| `README.md` | Descrizione del progetto per chi lo guarda. |
| `anteprima.mjs` | Apre l'app sul computer per provarla: `node anteprima.mjs`, poi `http://localhost:5173` nel browser. Serve perché l'offline non funziona aprendo `index.html` con doppio clic. |
| `.gitignore` | Dice a git quali file ignorare. |
| `.nojekyll` | Serve a GitHub Pages, il sito dove l'app viene pubblicata. |
| `spiegazione/` | Questa cartella. |

## Le lettere accanto ai file in VS Code

- **U** = file nuovo, mai salvato su git.
- **M** = file modificato, non ancora salvato su git.

Spariscono dopo il commit. Finché non faccio commit e push, il telefono non vede le modifiche.

## Cose da ricordare

- I miei dati di allenamento stanno **solo sul telefono**, non in questi file. Prima di modifiche grosse: menu ⋯ → Esporta backup (.json).
- Dopo una modifica pubblicata, sul telefono compare "Nuova versione disponibile": va toccato "Aggiorna".
