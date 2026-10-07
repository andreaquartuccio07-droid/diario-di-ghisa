---
name: stile-ghisa
description: Regole di stile del Diario di Ghisa, con i token e i font veri di index.html. Usala ogni volta che crei o modifichi una schermata, un componente, un colore, un font o un layout.
---

# Stile del Diario di Ghisa

Obiettivo: un'app da palestra pulita, leggibile al volo tra una serie e l'altra, con le mani sudate
e il telefono in mano. Prima la chiarezza dei numeri, poi tutto il resto.

Tutto lo stile sta nel `<style>` di `index.html`. Prima di aggiungere una classe, cerca se esiste già:
`.card`, `.btn`, `.icobtn`, `.tile`, `.es`, `.sr`, `.fld`, `.eyebrow`, `.muted`, `.small`, `.tiny`,
`.stack`, `.row`, `.spread`, `.vuoto`, `.pr`, `.delta`.

## Regola d'oro

Mai colori scritti a mano nei componenti: solo `var(--token)`. Se serve un colore nuovo, si aggiunge
un token e lo si definisce in **tutti e tre** i blocchi, con lo stesso valore negli ultimi due:

1. `:root` — tema chiaro
2. `@media (prefers-color-scheme:dark){ :root:not([data-theme="light"]) }` — scuro di sistema
3. `:root[data-theme="dark"]` — scuro scelto dall'utente

Per varianti di un token esistente usa `color-mix(in srgb, var(--up) 35%, var(--line))`, non un
valore nuovo. Nel CSS attuale restano pochi letterali (`#fff` sulla spunta fatta, l'ombra e lo
sfondo del `dialog`): non sono un modello da copiare.

## Token

| Token | Chiaro | Scuro | Uso |
|---|---|---|---|
| `--bg` | `#EBEDEF` | `#131619` | sfondo dell'app, header |
| `--surface` | `#FFFFFF` | `#1B1F23` | card, barra in basso, bottoni |
| `--surface-2` | `#E2E6E9` | `#252B30` | hover, barre vuote |
| `--surface-3` | `#F5F7F8` | `#20252A` | campi di input, testata dei riquadri |
| `--ink` | `#14171A` | `#E9ECEE` | testo principale |
| `--ink-2` | `#5A636B` | `#9BA4AC` | testo secondario (`.muted`) |
| `--ink-3` | `#8B949B` | `#767F87` | etichette, unità, disabilitato |
| `--line` | `#D5DADF` | `#2C3238` | bordi delle card, separatori |
| `--line-2` | `#BFC7CD` | `#3A4148` | bordi di bottoni e input |
| `--accent` | `#F2B705` | `#F5C518` | giallo ghisa: azione principale, settimana in corso, PR |
| `--accent-soft` | 18% | 14% | sfondo tenue di obiettivo, tecnica, giorno scelto |
| `--accent-ink` | `#7A5300` | `#F5C518` | **testo** color accento (in chiaro il giallo puro non si legge) |
| `--on-accent` | `#1A1500` | `#16190C` | testo sopra `--accent` |
| `--up` / `--up-soft` | `#1C7A4E` | `#45C98A` | carico che sale, serie fatta |
| `--down` | `#B0402C` | `#E2705C` | carico che scende |
| `--vol` | `#DDE2E6` | `#2A3036` | barre del volume nei grafici |
| `--shadow` | | | unica ombra delle card |
| `--r` | `14px` | | raggio delle card |
| `--p-rosso` `--p-blu` `--p-verde` `--p-giallo` `--p-nero` `--p-acciaio` | | | colori dei dischi: gruppi muscolari (`.gruppo`, via `--g`) |

Il giallo è lo stesso delle icone (`#F5C518` su grafite `#131619`).

Uso dell'accento: solo per l'azione principale della schermata e per ciò che conta davvero
(settimana in corso, record). Massimo un `.btn.primary` per schermata: se tutto è giallo, niente è
importante. Per scrivere in giallo usa `--accent-ink`, mai `--accent`.

## Tipografia

Tre famiglie, salvate in locale in `fonts/` e dichiarate con `@font-face` in cima allo `<style>`.
Nessun font esterno. I pesi disponibili sono solo quelli indicati: non chiederne altri.

| Famiglia | Pesi | Dove |
|---|---|---|
| Archivo | 600–800 | titoli (`h1` `h2` `h3`), `.eyebrow`, marchio, nomi dei giorni |
| IBM Plex Sans | 400–600 | tutto il testo |
| IBM Plex Mono | 500, 600 | **ogni numero**: kg, ripetizioni, serie, timer, date in tabella |

| Uso | Dimensione | Peso |
|---|---|---|
| `h1` titolo schermata | 25px | 800 |
| `h2` | 17px | 700 |
| `h3` titolo card / esercizio | 15–15.5px | 700 |
| Testo normale | 15px | 400 |
| `.small` | 13px | |
| `.tiny` | 11.5px | |
| Etichette maiuscole (`.eyebrow`, `.k`, `th`) | 10–10.5px | 600–700, spaziatura `.06em`–`.15em`, `--ink-3` |
| Numero in evidenza (`.tile .v`, timer) | 19–20px | 600 |
| Valore del cursore nel questionario | 26px | 600 |

- I numeri hanno sempre `font-variant-numeric:tabular-nums` (classe `.mono`), così non ballano.
- In una card il carico è l'elemento più visibile.
- Gli `input` hanno testo di almeno **16px**: sotto, iOS ingrandisce la pagina al tocco.

## Misure e forme

Non esiste una scala di spaziature a token: le misure sono in px nel CSS. Resta sui valori già in uso.

- Margine laterale della pagina: 13px (`.wrap`, che tiene conto anche delle safe area).
- Spazio fra blocchi: 12px (`.stack`). Fra elementi in riga: 6–10px.
- Padding interno delle card: 12–14px.
- Raggi: `var(--r)` per le card, 12px per riquadri piccoli, 8–11px per bottoni e input, 100px per le pillole.
- Ombra: solo `var(--shadow)`, e solo sulle card.

## Componenti

- **Bottone** `.btn`; principale `.btn.primary`; discreto `.btn.ghost`; piccolo `.btn.sm`; largo `.btn.block`.
  Azione principale in fondo allo schermo: `.btn.primary.block` dentro `.salva-bar`.
- **Bottone a icona** `.icobtn`: sempre con `aria-label`.
- **Eliminare dati**: chiede sempre conferma in un `dialog` e ricorda che i dati stanno solo sul telefono.
- **Card esercizio** `.es`: testata `.es-head` (nome + prescrizione `.prescr` in mono), righe delle serie
  `.sr`. Superset: `.es.ss`, bordo sinistro 3px `--accent`.
- **Riga serie** `.sr`: numero, kg, ripetizioni, spunta `.tick`. Fatta: `data-done="1"` (sfondo `--up-soft`).
  Serie di attivazione: `data-att="1"`.
- **Input numerici** `.fld`: unità (`kg`, `rep`) in un `<u>` a destra. `inputmode="decimal"` per i kg,
  `inputmode="numeric"` per le ripetizioni.
- **Variazioni** `.delta` e `.tile .d` con `data-dir="su" | "giu" | "fermo"`. Mai solo il colore:
  sempre anche segno o freccia (`+2,5 kg ▲`).
- **Record** `.pr`: etichetta piccola su `--accent`.
- **Barra in basso** `nav.tabs`: 4 voci, non di più. Attiva: testo `--ink` e filo superiore `--accent`.
  Da 760px in su diventa una barra in alto.
- **Stato vuoto** `.vuoto`: un titolo, una riga in `--ink-2`, un bottone per l'azione giusta. Mai uno schermo bianco.
- **Avvisi** `.toast`, `.timer`, `.aggiorna`: colori invertiti (`--ink` come sfondo, `--bg` come testo).

## Bersagli

Tutto ciò che si tocca fra una serie e l'altra è alto almeno **48px** (minimo assoluto 44px).
Alcuni elementi esistenti sono più piccoli (`.tick` 42px, `.icobtn` 32px, menu ⋯ 33px): non usarli
come misura per quelli nuovi, e se li ritocchi portali a misura.

## Layout

- Mobile prima di tutto: progetta a 375px, poi verifica a 320px e a 430px.
- Nessuno scroll orizzontale della pagina. Le uniche strisce che scorrono sono `.giorni` e `.chart-box`.
- Larghezza massima del contenuto 760px, centrato. Unico punto di rottura: `min-width:760px`.
- Le azioni principali stanno nella metà bassa dello schermo, raggiungibili col pollice.
- Ciò che è fisso ai bordi rispetta `env(safe-area-inset-*)`. Ciò che è fisso in basso sta sopra la
  barra di navigazione (`bottom:72px` e oltre) e `main` ha il padding inferiore per non restare coperto.

## Movimento

- Transizioni brevi, 150–200ms, `ease-out`. Niente animazioni decorative.
- Ogni transizione nuova ha la sua regola in `@media (prefers-reduced-motion:reduce)` che la spegne.

## Accessibilità

- Contrasto del testo almeno 4.5:1 **in entrambi i temi**. `--ink-3` è al limite: solo per etichette
  e unità, mai per informazioni che servono.
- Fuoco visibile: c'è già `:focus-visible` globale, non toglierlo con `outline:none` senza un sostituto.
- Interfaccia in italiano, numeri con la virgola decimale.

## Checklist prima di chiudere una modifica grafica

1. Solo `var(--token)` per i colori? Ogni token nuovo è in tutti e tre i blocchi?
2. Ho guardato la schermata sia in chiaro sia in scuro?
3. Un solo `.btn.primary` nella schermata?
4. Ciò che si tocca è alto almeno 48px? Gli input hanno testo da 16px?
5. I numeri sono in IBM Plex Mono con `tabular-nums`, e il carico è la cosa più visibile?
6. Regge a 320px senza scroll orizzontale?
7. Nessuna risorsa esterna (font, CDN)?
8. Chiudo con la skill `rilascio` (alza `VERSIONE` in `sw.js`).
