---
name: rilascio
description: Chiude una modifica al Diario di Ghisa e la prepara per il telefono. Alza VERSIONE in sw.js, controlla GUSCIO, verifica le regole del progetto e l'offline. Da usare dopo ogni modifica a index.html, al manifest o alle icone, e quando l'utente dice "rilascia", "pubblica", "manda sul telefono" o "fai il commit".
---

# Rilascio del Diario di Ghisa

Esegui i passi in ordine. Se uno fallisce, fermati e dillo: non rilasciare a metà.

## 1. Cosa è cambiato

`git status --short` e `git diff HEAD --stat`. Se non è cambiato nessun file dell'app
(`index.html`, `manifest.webmanifest`, `icons/`, `sw.js`), non c'è niente da rilasciare.

## 2. Dati sul dispositivo

Guarda nel diff se cambia la forma dei dati salvati: la chiave `diario-ghisa-v2`, i campi delle
serie o dello storico, `chiave()`, `storicoDi()`, `blocco()`, `REV` in `schedaCoach()`.

Se sì, **prima di tutto** ricorda all'utente di fare Esporta backup (.json) dal menu ⋯ sul telefono,
e controlla che i dati vecchi vengano letti ancora (migrazione o valori di default), non buttati.
`REV` va alzato solo se si vuole sovrascrivere la scheda già salvata: se è cambiato, chiedi conferma.

## 3. Regole del progetto

Controlla solo le righe aggiunte dal diff:

- Colori letterali (`#abc`, `rgb(`, `hsl(`) fuori dai tre blocchi di token in `:root`.
  Un colore nuovo va definito in tutti e tre: `:root`, `prefers-color-scheme: dark`, `[data-theme="dark"]`.
- Risorse esterne nuove (`http://`, `https://`, `<script src`, `<link href`, `@import`, `fetch(`).
  Non ne è ammessa nessuna: anche i font stanno in locale in `fonts/`.
- File nuovi: l'app resta in `index.html`. Se serve davvero un file in più, va in `GUSCIO`.
- Elementi toccabili nuovi: bersaglio di almeno 48px (vedi skill `stile-ghisa`) e rispetto delle `env(safe-area-inset-*)`
  per ciò che sta attaccato ai bordi dello schermo.

## 4. Versione

In `sw.js` alza `VERSIONE` di uno (`ghisa-v7` → `ghisa-v8`), una sola volta per rilascio.
Se `git diff HEAD -- sw.js` mostra già la riga `VERSIONE` cambiata, non alzarla di nuovo.

Ogni file che l'app carica dalla propria origine deve stare in `GUSCIO`.

## 5. Prova

Apri l'app con la skill `run` (o `node anteprima.mjs` se è quello che usa il progetto) e controlla:

- la schermata toccata dalla modifica, in tema chiaro e in tema scuro, a larghezza telefono (~390px);
- nessun errore in console;
- se ci sono gli strumenti del browser: ricarica offline e verifica che l'app parta ancora.

Se non riesci a provare qualcosa, dillo chiaramente invece di darlo per buono.

## 6. Chiusura

Riassumi all'utente: cosa è cambiato, versione vecchia → nuova, cosa hai provato e cosa no.
Commit e push **solo se l'utente li chiede**. Dopo il push, sul telefono compare la striscia
"Nuova versione disponibile": va toccato "Aggiorna".
