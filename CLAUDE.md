# Contesto del progetto

App personale per la palestra: scheda del coach, log delle serie, progressione dei carichi,
questionario di fine blocco da mandare al coach. Interfaccia in italiano, si usa dal telefono.

## Regole

- **File unico**: tutto in `diario-di-ghisa.html` (HTML + `<style>` + `<script>` inline).
  Non spezzare in piu' file senza che l'utente lo chieda: viene pubblicato come Artifact.
- **Pubblicazione**: e' un Artifact gia' esistente. Per aggiornarlo passare SEMPRE
  `url: https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705` allo strumento Artifact,
  e rileggerlo (`action: "read"`) prima di ripubblicare se la sessione non l'ha gia' fatto.
  Senza `url` si crea un artifact separato e l'utente perde i dati.
- **Capabilities dichiarate**: `db` (sincronizzazione di scheda, questionario e pesi sul suo account)
  e `downloads` (export .json e .txt). Vanno mantenute a ogni ripubblicazione.
- Il file inizia direttamente con `<title>`: niente `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`,
  li aggiunge la piattaforma al momento della pubblicazione.
- Niente librerie esterne: grafici in SVG scritto a mano, font da Google Fonts.
- Tema chiaro e scuro: tutti i colori passano dai token CSS in `:root` (vedi i tre blocchi
  `:root`, `prefers-color-scheme: dark`, `[data-theme="dark"]`). Mai colori letterali nei componenti.

## Struttura del codice

Tutto dentro una IIFE in fondo al file:

- `schedaCoach()` - la scheda vera dell'utente (4 giorni + blocchi post-allenamento).
  `REV` va alzato solo quando si vuole che la scheda nuova sovrascriva quella salvata sul cloud.
- `DOMANDE` - le 17 domande del questionario di fine programma del coach.
- `storicoDi(nome)` - storico di un esercizio, **indicizzato per nome normalizzato** (`chiave()`),
  non per id: cosi' lo stesso esercizio in giorni diversi ha una progressione unica.
- `obiettivo(es)` - regola del sovraccarico progressivo (tutte le serie a rep max -> +incremento).
  Le serie di attivazione (`att`) sono escluse dalla regola ma contano per l'1RM stimato.
- `blocco()` / `progressioniBlocco()` - stato del blocco di 6 settimane e delta dei carichi.
- `vistaOggi()`, `vistaScheda()`, `vistaProgressi()`, `vistaReport()` - le quattro schermate.
- Persistenza: `localStorage` (chiave `diario-ghisa-v2`) + `db` quando disponibile
  (`stato/corrente` per scheda/questionario/pesi, collection `sessioni` per gli allenamenti).

## Da sapere

- I tempi di recupero non erano sulla scheda del coach: sono stime, l'utente li corregge dall'app.
- Gli esercizi in superset hanno `recupero: 0` e al posto del timer mostrano l'avviso di passare
  all'esercizio successivo.
