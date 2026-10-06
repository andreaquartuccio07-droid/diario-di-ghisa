# Diario di Ghisa

App per seguire la scheda della palestra, registrare le serie e monitorare i carichi progressivi.
Pagina unica: tutto (HTML, CSS, JS) sta in `diario-di-ghisa.html`.

## Artifact pubblicato

https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705

E' la versione che usi dal telefono. Il file locale e' il sorgente: dopo averlo modificato
va ripubblicato su **quello stesso URL**, altrimenti nasce un artifact nuovo e i dati
(scheda, allenamenti, questionario) restano sul vecchio.

## Come ci lavoro

1. Apro questa cartella in VS Code (File -> Apri cartella).
2. Modifico `diario-di-ghisa.html`.
3. Chiedo a Claude Code: *"ripubblica l'artifact https://claude.ai/code/artifact/b3e22f10-69b3-4072-8ef5-94c23e2c5705 con il file aggiornato"*.

## Anteprima in locale

Basta aprire il file col browser (doppio clic). Attenzione: aperto da `file://` non esiste
`window.claude`, quindi niente sincronizzazione sul cloud -- i dati vanno in `localStorage`
del browser e restano separati da quelli dell'artifact. Per provarlo con i dati veri, usa l'artifact.

## Backup dei dati

Dal menu (...) dell'app: **Esporta backup (.json)** salva scheda + allenamenti + pesi + questionario.
**Importa backup** li rimette. Conviene farlo a fine blocco, prima di cambiare scheda.
