# Storia delle modifiche

Qui c'è tutto quello che è stato fatto all'app, versione per versione, dalla più recente alla più vecchia.
Il numero di versione è quello scritto in `sw.js` (`VERSIONE`). In fondo ci sono le cose ancora da
provare, quelle lasciate così apposta e i limiti che non si possono togliere.

Questo file va aggiornato a ogni rilascio: una voce nuova in cima.

## ghisa-v10 — 11 ottobre 2026

**Bordi e righe di separazione un po' più scuri, per far staccare meglio i riquadri.**

- Il bordo dei riquadri (esercizi, tessere, giorni, domande) era bianco e sul fondo chiaro spariva:
  ora è un grigio-azzurro tenue, così si vede dove finisce un esercizio e comincia l'altro.
- Le righe sottili dentro i riquadri (sotto il nome, sopra la figura, nelle tabelle) e i bordi di
  campi e bottoni sono un gradino più scuri.
- Ritocco uguale, più leggero, nel tema scuro. Cambiati solo tre colori (`--edge`, `--line`,
  `--line-2`): misure, ombre e tutto il resto sono come prima.

## ghisa-v9 — 11 ottobre 2026

**Oggi: esercizi in righe che si aprono, andamento accanto al nome, figura che mostra il movimento.**

Righe
- Ogni esercizio è una riga compatta: cerchio, nome, andamento, sotto schema e recupero, freccina.
- Toccando la riga si apre sotto la sua finestra; ritoccandola si chiude. Se ne apre una alla volta.
  All'inizio è aperta la prima che ha ancora serie da fare.
- Il cerchio non si tocca: si riempie man mano che spunti le serie e diventa verde con la spunta
  quando le hai fatte tutte. La riga lo dice anche a parole ("2 di 4 fatte", "fatto").
- Una superserie è un riquadro solo con i due esercizi legati da un filo; aperta, li mostra uno sotto
  l'altro.
- Nella finestra aperta, dall'alto: obiettivo, serie, figura. La riga "Ultima …" che apre lo storico
  è subito sotto l'obiettivo.

Andamento
- Accanto al nome: freccia verde in su e percentuale se sei migliorato, freccia rossa in giù se sei
  peggiorato, "=" se è uguale (meno dell'1% di differenza), niente se non ci sono ancora due sedute.
- Come si calcola: massimale stimato della migliore serie di lavoro, ultima seduta contro quella
  prima dello stesso esercizio. Il massimale stimato sale sia con più kg sia con più ripetizioni.
- La serie pesante iniziale (l'1×5) non entra nel conto: essendo la più pesante, avrebbe nascosto
  una ripetizione persa o guadagnata nelle serie da 8.
- Quando sali di carico e riparti da meno ripetizioni (80×8 → 82,5×6) la freccia è verde e la
  percentuale è quella del carico in più (+3,1%). Vale finché il calo del massimale è piccolo (entro
  il 5%): se sali di carico ma perdi molte ripetizioni (80×8 → 82,5×3) la freccia è rossa.
- Prima il confronto era con tre sedute prima. Anche il pannello dello storico ora usa la regola nuova,
  così riga e pannello danno lo stesso numero.

Figura dell'esercizio
- Sotto le serie c'è un omino piccolo che ripete il movimento. È disegnato dentro l'app: funziona
  senza campo e non scarica niente.
- 15 movimenti: squat, stacco, affondi, leg extension, leg curl, polpacci, spinta orizzontale, croci,
  spinta verticale, alzate laterali, trazione verticale, rematore, curl, estensione tricipiti, addome.
- Il movimento viene riconosciuto dal nome dell'esercizio. Se non lo riconosce non mostra nessuna
  figura. Dal menu "Movimento" lì accanto lo scegli a mano; la scelta vale per quell'esercizio in
  tutti i giorni ed entra nel backup.
- Con "riduci movimento" attivo sul telefono la figura resta ferma (partenza piena, arrivo in trasparenza).
- Il bottone con l'occhio barrato la nasconde in tutti gli esercizi; si riattiva dal menu ⋯,
  "Figura dell'esercizio: sì / no". La scelta viene ricordata.

Dati
- Scheda e allenamenti salvati non sono stati toccati. Si aggiunge solo l'elenco dei movimenti scelti
  a mano, che entra nel backup; un backup vecchio si importa come prima.

## ghisa-v8 — 10 ottobre 2026

**Esercizi da scegliere in una lista, invece di scrivere il nome a mano.**

- In Scheda, "+ Esercizio" apre un pannello con 159 esercizi di palestra già pronti dentro l'app
  (funziona senza campo): per ognuno nome, gruppo muscolare e attrezzo (bilanciere, manubri,
  macchina, cavi, corpo libero).
- In alto c'è la ricerca per nome (non bada a maiuscole e accenti, bastano pezzi di parola: "lat pro").
  Sotto, i filtri: Tutti, I miei, Petto, Schiena, Spalle, Gambe, Polpacci, Bicipiti, Tricipiti, Addome.
- Toccando un esercizio si apre la finestra di sempre con nome e gruppo già compilati: restano da
  controllare serie, ripetizioni e recupero.
- Se l'esercizio non c'è, "Crea «nome»" lo aggiunge come esercizio tuo. Resta salvato e lo ritrovi
  sotto "I miei"; da lì la × lo toglie dall'elenco (scheda e storico non cambiano).
  La × c'è solo sugli esercizi tuoi che non sono più né in scheda né nello storico.
- Creando un esercizio tuo il gruppo va scelto (non parte più da Petto senza chiederlo).
- Sotto "I miei" compaiono da soli anche gli esercizi della scheda e dello storico che non sono in lista.
- Un esercizio nuovo finisce in coda a quelli dell'allenamento, prima del blocco "Post allenamento"
  (prima finiva in fondo, sotto il post).
- Se il recupero scade mentre il pannello di scelta è aperto, il pannello si chiude da solo, così
  Stop si può toccare. Aprire il pannello mentre la sveglia suona la ferma.
- I filtri sono più fini dei gruppi dell'app: un esercizio per i bicipiti o i tricipiti viene salvato
  nel gruppo Braccia, i polpacci in Gambe, l'addome in Core. Colori, Progressi e Report sono quelli di prima.
- Dati: si aggiunge solo l'elenco "i miei esercizi", che entra anche nel backup. Scheda e allenamenti
  salvati non vengono toccati; un backup vecchio si importa come prima e non cancella i tuoi esercizi.

## ghisa-v7 — 8 ottobre 2026

**Icona della Home con un nome nuovo.**

- Aggiungendo l'app alla Home l'iPhone mostrava una "G" al posto del disco di ghisa: è il segnaposto
  che mette quando non riesce a prendere l'icona. Il file pubblicato era giusto, quindi l'icona per
  l'iPhone ora ha un nome nuovo (`icons/ghisa-home-180.png`), così non può usare una copia vecchia o
  rimasta a metà.
- Quando si aggiunge l'app alla Home, nella finestra "Aggiungi alla schermata Home" si vede
  l'anteprima dell'icona: se non è il disco, annullare, aspettare qualche secondo e riprovare.
- Provato sull'iPhone l'8 ottobre: app riaggiunta alla Home da Safari, icona col disco, backup
  esportato dall'app vecchia e importato in quella nuova senza perdere niente.

## ghisa-v6 — 8 ottobre 2026

**Grafica nuova ("Abisso") e icona nuova. Solo aspetto: funzioni e dati salvati sono gli stessi.**

- Fondo chiaro con una fascia di luce azzurra in alto, riquadri di vetro chiaro.
- Ciò che conta è in vetro scuro: l'obiettivo dell'esercizio, il timer, la barra in basso, il giorno scelto.
- Il colore principale è il ciano (prima era il giallo). Il verde resta per "serie fatta" e "carico salito".
- Titoli e numeri grandi in un carattere nuovo, alto e stretto (Barlow Condensed): kg e ripetizioni
  a 24px, timer a 30px. Il carattere Archivo non serve più ed è stato tolto.
- La barra in basso è una pillola staccata dai bordi; le quattro voci sono le stesse.
- Le etichette non sono più TUTTE MAIUSCOLE.
- Campi delle serie e spunta più alti (50px), Salva a 52px.
- Tutti i campi di testo sono a 16px: l'iPhone non ingrandisce più la pagina quando ci scrivi.
- Sui telefoni stretti (320px) un carico come 102,5 sta intero nel campo.
- Icona nuova sulla Home: un disco di ghisa da 20 kg con le scritte ciano su fondo blu scuro.
- Tema scuro aggiornato allo stesso stile.

## ghisa-v5 — 8 ottobre 2026

**Report per il coach con tutte le serie.**

- Nelle "Progressioni del blocco" non c'è più un solo carico "Da → A" (era il più pesante della seduta
  e nascondeva le 3×8). Ora ogni esercizio mostra per intero la prima e l'ultima seduta del blocco,
  per esempio `da 62,5×5 · 55×8·8·7` / `a 80×5 · 70×8·8·8`.
- Lo stesso vale per il testo che si copia o si scarica per il coach.

## ghisa-v4 — 8 ottobre 2026

**Schemi misti, recuperi, sveglia a fine timer, storico in un tocco.**

Schemi "1×5 + 3×8"
- Ogni carico è scritto accanto alle sue ripetizioni: `100×5 · 80×8·7·6`. Prima compariva
  "100 kg × 8·7·6", che mischiava il carico della serie pesante con le ripetizioni delle altre.
- La prima serie (l'1×5) ha un carico suo e viene precompilata con quello dell'ultima volta, non con
  il carico delle serie da 8.
- L'obiettivo ("sali di 2,5 kg", "guadagna una ripetizione") si calcola solo sulle serie da 8.
- I dati salvati erano già giusti: l'errore era solo in come venivano mostrati. Nessun allenamento
  passato è stato toccato.
- In Progressi la tabella ha la colonna "Serie (kg×rip)" al posto di "Carico".

Recuperi
- 1:30 fra le serie.
- In superserie: nessun timer dopo il primo esercizio (compare l'avviso "Superserie: vai subito a …"),
  2:30 dopo il secondo.
- La regola viene applicata una volta sola alla scheda salvata; dopo, ogni recupero si può cambiare
  a mano da Scheda e resta com'è.
- Mettendo o togliendo "in superserie" da Scheda, i recuperi della coppia si sistemano da soli.

Timer e sveglia
- A tempo scaduto la barra diventa gialla ("Tempo! Riparti") e squilla finché non si tocca Stop
  (si ferma da sola dopo circa un minuto).
- Il timer conta sull'ora vera: resta giusto se si esce dall'app e si rientra, e sopravvive al
  ricaricamento della pagina.
- Durante il recupero l'app tiene acceso lo schermo.
- Menu ⋯: "Prova la sveglia" (suona dopo 3 secondi) e "Sveglia col silenzioso: sì / no".

Storico
- Sotto ogni esercizio la riga "Ultima …" è un bottone con la freccia dell'andamento
  (▲ +x%, ▼ −x%, = stabile), calcolata sul massimale stimato: ultima seduta contro tre sedute prima.
- Toccandola si apre dal basso un pannello con andamento, record, grafico e ultime 6 volte, più il
  bottone "Apri in Progressi".

Altre correzioni
- Cambiare giorno con serie già spuntate chiede conferma.
- Modificare, spostare, aggiungere o eliminare esercizi da Scheda a metà allenamento non fa più
  perdere le serie spuntate.
- "Esporta backup" crea davvero il file: foglio di condivisione sul telefono, download sul computer.
- Gli avvisi compaiono in alto e non coprono più il bottone Salva.
- I grafici si disegnano alla larghezza vera dello schermo: numeri leggibili anche a 320px.
- Modificando un esercizio non si perde più la scritta delle ripetizioni del coach (es. "8-6").

## ghisa-v3 — 7 ottobre 2026

- Il bottone Salva resta sopra il timer invece di finirci sotto.
- Bottoni più grandi: spunta, `+ serie`, `− serie`, Salva e timer a 48px.
- Aggiunto il "tester": un agente che prova l'app in un browser vero (Playwright) a larghezza telefono.

## ghisa-v2 — 7 ottobre 2026

- Font salvati dentro il progetto (`fonts/`): prima arrivavano da internet e offline mancavano.
- Create la cartella `.claude` (regole di stile, procedura di rilascio, revisore) e questa cartella
  `spiegazione`.

## ghisa-v1 — 7 ottobre 2026

- Prima versione: scheda del coach, registro delle serie, progressione dei carichi, questionario di
  fine blocco.
- Trasformata in app installabile sulla Home del telefono, che funziona senza campo.
- Pubblicata su https://andreaquartuccio07-droid.github.io/diario-di-ghisa/

---

## Ancora da provare sull'iPhone

Sono cose che al computer non si possono verificare. Quando le hai provate, cancellale da qui.

- Figura dell'esercizio: sull'iPhone si muove? (Al computer sì, ma Safari va visto dal vero.) È fluida
  e non rallenta lo scorrimento? Con Impostazioni → Accessibilità → Movimento → "Riduci movimento"
  attivo deve restare ferma.
- Righe di Oggi: si aprono e si chiudono bene col pollice, e la riga toccata resta sotto il dito
  quando se ne chiude un'altra più in alto? Il menu "Movimento" si apre con la rotella dell'iPhone?
- Le frecce dell'andamento si leggono a colpo d'occhio sotto le luci della palestra?
- Grafica nuova: i numeri si leggono sotto le luci della palestra? La barra in alto dell'iPhone (ora,
  batteria) ha lo stesso azzurro dell'intestazione, senza una fascia bianca sopra?
- Lo scorrimento della pagina è fluido come prima, anche col timer a schermo?
- Suono della sveglia: menu ⋯ → "Prova la sveglia", col tasto silenzioso spento e acceso.
- Musica: con "Sveglia col silenzioso: sì" la sveglia mette in pausa la musica; con "no" si mescola
  ma col silenzioso tace.
- Schermo che resta acceso durante un recupero vero.
- Uscire dall'app e rientrare a recupero in corso: il tempo deve essere giusto.
- Pannello dello storico: i bottoni in fondo non devono finire sotto la barra dell'iPhone.
- Scelta dell'esercizio: toccando il campo di ricerca si apre la tastiera. La lista e il bottone
  "Crea…" devono restare visibili sopra la tastiera, e il pannello non deve saltare o finire tagliato.
- Scelta dell'esercizio: la striscia dei filtri scorre bene col dito, e in alto il titolo non finisce
  sotto l'ora e la batteria.

## Lasciato così apposta

- Il cerchio delle righe non si tocca: con un tocco sbagliato avrebbe segnato serie mai fatte.
- 28 esercizi della lista non hanno figura (dip, scrollate, tirate al mento, alzate frontali, hip
  thrust, plank, pullover, adduttori, rotazioni del busto): meglio nessuna figura che una sbagliata.
  Si può sempre sceglierne una a mano dal menu "Movimento".
- I piegamenti mostrano la figura della panca e le croci inverse quella delle croci: il gesto è lo
  stesso, cambia il verso.
- L'andamento confronta con la volta prima dello stesso esercizio anche se era in un altro giorno
  della scheda. Se lo stesso esercizio ha schemi diversi nei due giorni (alzate laterali 8-10 il 1°
  giorno e 10-12 il 3°, panca 30° nel 1° e nel 3°) la freccia può andare su e giù senza un vero
  cambiamento. L'alternativa sarebbe confrontare solo con lo stesso giorno: da decidere.
- Un esercizio "in superserie" che è l'ultimo prima del post allenamento non si lega al primo
  esercizio del post: ha il suo timer normale.
- Nell'andamento la serie pesante iniziale non conta: se migliori solo quella, la riga resta "=".
  Il suo progresso si vede nello storico (massimale stimato e grafico).
- I quattro bottoni piccoli (32px) nelle righe di Scheda: più grandi schiaccerebbero il nome
  dell'esercizio.
- Una fessura di circa 10px fra Salva e la barra del timer.
- Gli esercizi già in scheda non sono stati rinominati con i nomi della lista: lo storico va per nome
  e la progressione sarebbe ripartita da zero.
- Degli esercizi tuoi l'app conosce solo il gruppo: per i filtri Bicipiti, Tricipiti e Polpacci
  indovina dal nome (curl, pushdown, calf…). Un esercizio di Braccia dal nome che non dice niente
  compare in entrambi i filtri.
- Se il recupero scade mentre è aperta la finestra "Nuovo/Modifica esercizio", la sveglia suona ma
  Stop resta coperto finché non salvi o annulli: chiuderla da sola farebbe perdere quello che stavi
  scrivendo. Era così anche prima.
- Alcuni esercizi della lista somigliano a quelli della tua scheda ma hanno un nome diverso
  ("Pulley basso" / "Pulley", "Pendulum squat" / "Pendlum squat", "Croci ai cavi alti" / "Croci cavi
  alti"): sono storici separati. Per continuare la progressione scegli il tuo, sotto "I miei".
- Eliminando da Scheda un esercizio con una serie già spuntata, la conferma non avvisa della spunta.
- In Progressi la tessera "Record carico" mostra un numero solo: il carico più pesante mai sollevato,
  serie pesante compresa.
- Se si ricarica la pagina mentre la sveglia sta suonando, la sveglia sparisce.
- Nei grafici i numeri dell'asse a sinistra toccano la prima barra del volume. C'era già prima della
  grafica nuova; per sistemarlo va cambiato il disegno del grafico, non solo lo stile.
- Sul computer (schermo largo) la barra delle schede copre la prima voce del menu ⋯. Sul telefono no.
- Il "vetro" dei riquadri che scorrono è finto (bianco semitrasparente senza sfocatura): la sfocatura
  vera è solo su intestazione, timer, barra in basso e avvisi, per non rallentare lo scorrimento.

## Limiti che non si possono togliere

- Su iPhone un'app web non può vibrare.
- Su iPhone l'icona sulla Home non si aggiorna da sola: resta quella del giorno in cui si è aggiunta
  l'app. Per cambiarla bisogna aggiungere di nuovo l'app da Safari. Ogni icona sulla Home ha i suoi
  dati separati, quindi: Esporta backup dalla vecchia, aggiungi la nuova, Importa backup, controlla
  in Progressi, e solo alla fine elimina la vecchia.
- Su iPhone la sveglia suona solo con l'app aperta e lo schermo acceso: non a schermo spento, non
  con un'altra app davanti.
- Gli schemi misti riconosciuti sono solo "1×N + M×R" (una serie iniziale più le serie di lavoro).
  Altri, come "2×10 + 1×6", non sono previsti.
- I dati stanno solo sul telefono. Gli allenamenti fatti nella vecchia versione su claude.ai non
  sono stati recuperati.
