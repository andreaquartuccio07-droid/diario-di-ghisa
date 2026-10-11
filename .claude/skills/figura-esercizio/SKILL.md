---
name: figura-esercizio
description: Come è fatta la figura che mostra il movimento sotto le serie nel Diario di Ghisa (pose, riconoscimento dal nome, scelta a mano) e come aggiungerne o correggerne una. Usala quando tocchi MOV, REGOLE_MOV, figura() o quando l'utente dice che un esercizio mostra la figura sbagliata, non ne mostra nessuna o ne vuole una nuova.
---

# Figura dell'esercizio

Sotto le serie di ogni esercizio aperto c'è un omino che ripete il movimento. È un SVG disegnato a
mano dentro `index.html`: niente immagini, video o librerie, quindi funziona senza campo. Dalla v9.

Regola di fondo: **le serie restano la cosa più importante**. La figura è piccola (68px, 60px sotto
i 360px), sta in fondo alla riga aperta e si può nascondere.

## I pezzi nel codice

| Cosa | Dove | A che serve |
|---|---|---|
| `MOV` | dopo `CATALOGO` | i 15 movimenti, ognuno con le sue due pose |
| `REGOLE_MOV`, `movimentoDalNome()` | subito sotto | dal nome dell'esercizio al movimento |
| `movimentoDi(nome)` | | scelta a mano se c'è, altrimenti il riconoscimento |
| `stato.movimenti` | stato salvato | le scelte a mano: `{nome normalizzato: id di MOV oppure "nessuna"}` |
| `posaFigura()`, `figura()` | | disegnano l'SVG |
| `figuraHTML()`, `ridisegnaFigure()` | vicino a `vistaOggi()` | figura + menu "Movimento" + bottone per nasconderla |
| `figuraAttiva()` | chiave `diario-ghisa-figura` | la preferenza "mostra / nascondi", fuori dai dati dell'app |

## Com'è fatto un movimento

Foglio 64×64, omino visto di lato (rivolto a destra) o di fronte. Coordinate scritte a mano.

```js
curl: {nome: "Curl", fissi: [PAVIMENTO],
  linee: [["30,56 30,44 30,30 30,16", "30,56 30,44 30,30 30,16"],   // gamba + busto: [partenza, arrivo]
          ["30,16 31,28 33,39", "30,16 31,28 39,18"]],              // braccio: l'ultima linea sta sopra a tutto
  testa: [[31, 8], [31, 8]],                                         // centro della testa: [partenza, arrivo]
  pesi: [[[33.5, 41.5], [41, 16.5]]]},                               // ogni peso: [partenza, arrivo]
```

- `linee`: busto e arti, spessi 6. **L'ultima** viene disegnata sopra la testa e con un alone chiaro
  attorno, così un braccio che passa davanti al busto si distingue: di solito è il braccio che lavora.
- `testa`: un cerchio di raggio 5.8. `pesi`: cerchi di raggio 4 in `--dato` (manubrio, bilanciere visto
  di punta, maniglia, cuscinetto). `cavi`: linee sottili in `--dato` (facoltativo).
- `fissi`: panca, sedile, pavimento. Non si muovono, colore `--line-2`.
- **Le due pose di una linea devono avere lo stesso numero di punti.** Se no l'animazione non parte e
  il telefono non dà nessun errore.
- Tieni tutto dentro il foglio: la testa non sopra y = 6, i pesi non oltre 4 dal bordo.
- Le parti che non si muovono hanno le due pose identiche (non vengono animate).

Colori solo dai token: corpo `--ink` (via `currentColor`), attrezzo `--dato`, fondo `--surface-3`.
Lo stile sta nelle classi `.fig`, `.arto`, `.alone`, `.testa`, `.peso`, `.cavo`, `.fisso`, `.ombra`.

## Movimento e "riduci movimento"

L'animazione è SMIL (`<animate>` dentro l'SVG): 3 secondi, andata, breve pausa, ritorno, senza fine.
Niente JavaScript che gira a ogni fotogramma. Si vede solo la figura della riga aperta: le altre sono
in un contenitore nascosto e non consumano.

Se il telefono chiede meno movimento (`prefers-reduced-motion`), o il browser non anima gli SVG,
`figura()` non mette nessun `<animate>`: disegna la partenza piena e l'arrivo in trasparenza
(`.ombra`). Se l'impostazione cambia a pagina aperta, `ridisegnaFigure()` aggiorna subito.

## Dal nome al movimento

`REGOLE_MOV` è una lista ordinata di `[id, espressione]` provata sul nome normalizzato da `chiave()`
(minuscole, senza accenti, solo lettere e cifre separate da spazi: "T-bar" diventa `t bar`).
**Vince la prima che combacia**, quindi l'ordine conta: `calf` prima di `pressa`, `leg curl` prima di
`curl`, `scott` e `croci` prima di `panca`. Niente regola generica su "press" o "laterali".

Chi non combacia con niente non ha figura: va bene così, è meglio di una figura sbagliata. Oggi
restano senza 28 esercizi del catalogo (dip, scrollate, tirate al mento, alzate frontali, hip thrust,
plank, pullover, adduttori, rotazioni del busto).

L'utente può sempre scegliere a mano dal menu "Movimento" sotto la figura. La scelta si salva per
nome (come lo storico), quindi vale per lo stesso esercizio in tutti i giorni. Si salva solo se è
diversa dal riconoscimento automatico; "Nessuna figura" si salva come `"nessuna"`.

## Aggiungere o correggere un movimento

1. Aggiungi la voce in `MOV` (o correggi le coordinate) e, se serve, una riga in `REGOLE_MOV` nel
   punto giusto dell'ordine.
2. Guarda la tavola di controllo: `node anteprima.mjs 5188`, poi apri
   `http://localhost:5188/.claude/skills/figura-esercizio/tavola.html` (aggiungi `?tema=dark` per lo
   scuro). Legge pose e funzioni da `index.html` e per ogni movimento mostra partenza, arrivo, figura
   ferma e in movimento; avvisa se due pose hanno un numero di punti diverso. Fai uno screenshot con
   Playwright e guardalo davvero. La tavola non fa parte dell'app e non va in `GUSCIO`.
3. Se hai toccato le regole, ricontrolla che gli esercizi della scheda dell'utente (`schedaCoach()`)
   cadano ancora nel movimento giusto: i nomi li ha scritti lui ("Pusshdown con voulchen", "Pendlum
   squat", "Pulley barra lat focus upper back").
4. Un id tolto da `MOV` non rompe niente: `movimentiValidi()` scarta le scelte che non esistono più.
5. Chiudi con la skill `rilascio`.

## Cose da non fare

- Non salvare il movimento sull'esercizio della scheda: sta in `stato.movimenti`, per nome.
- Non cambiare la forma di `stato.movimenti` senza passare dall'agente `Plan` e dal backup dell'utente:
  viaggia con Esporta/Importa come `stato.miei` (Importa e sync lo sostituiscono solo se lo trovano).
- Non ingrandire la figura e non metterla sopra le serie.
- Non animarla con CSS su `d` o `points`: su iPhone non funziona. Resta SMIL.
