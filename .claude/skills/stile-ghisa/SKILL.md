---
name: stile-ghisa
description: Regole di stile del Diario di Ghisa, con i token e i font veri di index.html. Usala ogni volta che crei o modifichi una schermata, un componente, un colore, un font o un layout.
---

# Stile del Diario di Ghisa — "Abisso"

Obiettivo: un'app da palestra dall'aria futuristica ma leggibile al volo tra una serie e l'altra, con
le mani sudate e il telefono a mezzo metro. Prima la chiarezza dei numeri, poi tutto il resto.

L'idea dello stile (scelto dall'utente l'8 ottobre 2026, dalla v6):

- **Fondo chiaro** con una fascia di luce ciano in alto che sfuma verso il basso.
- **Vetro chiaro** per i riquadri normali (card, tessere): bianco semitrasparente, bordo chiaro, ombra morbida.
- **Vetro scuro** solo per ciò che conta davvero: obiettivo dell'esercizio, timer di recupero, barra in
  basso, giorno scelto, avvisi. Lì dentro i numeri importanti si accendono di ciano (`--glow`).
- **Ciano elettrico** come colore dell'azione principale. Niente viola, fucsia o rosa: l'utente non li vuole.
- Il tema **chiaro è quello principale** (l'utente usa sempre quello); lo scuro deve funzionare e restare curato.

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
valore nuovo.

## Token

| Token | Chiaro | Scuro | Uso |
|---|---|---|---|
| `--bg` | `#F1F5F6` | `#040B0E` | sfondo dell'app |
| `--surface` | `#FFFFFF` | `#101C22` | superfici piene: campi, bottoni, menu, dialog |
| `--surface-2` | `#E3EAED` | `#1B2A32` | hover, barre vuote, Salva disattivato |
| `--surface-3` | `#F6F9FA` | `#16242B` | testata dei riquadri, campi nei dialog |
| `--glass` | bianco 80% | bianco 6% | **vetro chiaro**: card, tessere, giorni, domande |
| `--edge` | `#FFFFFF` | bianco 13% | bordo del vetro chiaro |
| `--ink` | `#06202B` | `#E8F6FA` | testo principale |
| `--ink-2` | `#3E5560` | `#A3BEC8` | testo secondario (`.muted`) |
| `--ink-3` | `#5E747E` | `#7C98A3` | unità e dettagli **dentro** card e campi; mai sulla fascia di luce in alto (lì `--ink-2`) |
| `--line` | `#D9E2E6` | `#1F2E36` | separatori |
| `--line-2` | `#C2CFD5` | `#2D3F48` | bordi di bottoni e input |
| `--accent` | `#19D3F3` | `#2BD9F5` | ciano: **riempimento** dell'azione principale, settimana in corso, record |
| `--accent-soft` | 16% | 15% | sfondo tenue di tecnica, settimane fatte, numero della domanda |
| `--accent-ink` | `#00697F` | `#5FE3F8` | **testo** e icone color accento (in chiaro il ciano puro non si legge) |
| `--on-accent` | `#03202A` | `#03181E` | testo sopra `--accent` |
| `--dato` | `#008CA6` | `#2BD9F5` | linee sottili che devono vedersi su chiaro: grafici, filo dei superset, barre (il ciano puro su bianco è troppo debole) |
| `--up` / `--up-soft` / `--on-up` | `#0B7A54` | `#4FD69A` | carico che sale, serie fatta, e il testo sopra `--up` |
| `--down` | `#B0402C` | `#E2705C` | carico che scende |
| `--vol` | `#D5E0E5` | `#22323A` | barre del volume nei grafici |
| `--deep` | blu notte 90% | petrolio 74% | **vetro scuro**: obiettivo, timer, barra in basso, giorno scelto, avvisi |
| `--deep-ink` / `--deep-ink-2` | `#EAF8FC` / `#A9C6D0` | uguali | testo principale e secondario sopra `--deep` |
| `--deep-fill` | bianco 11% | uguale | bottoni e voce attiva dentro il vetro scuro |
| `--glow` | `#5BE6FF` | uguale | numeri e icone "accesi" sopra `--deep` (timer, etichetta Obiettivo) |
| `--aurora-top` | `#A9E9F6` | `#0B3A48` | colore della fascia in alto e dell'intestazione |
| `--aurora-2` | | | macchia blu dietro al titolo |
| `--shadow` / `--shadow-alta` | | | ombra delle card / di menu e dialog |
| `--scrim` | | | velo dietro ai dialog |
| `--r` | `20px` | | raggio delle card |
| `--p-rosso` `--p-blu` `--p-verde` `--p-giallo` `--p-nero` `--p-acciaio` | | | colori dei dischi: gruppi muscolari (`.gruppo`, via `--g`) |

`--aurora-top` è anche il `theme-color` nell'`<head>` (chiaro e scuro) e il `theme_color` del manifest:
se cambia qui, va cambiato anche lì, altrimenti la barra di stato del telefono stacca dall'intestazione.

Uso dell'accento: solo per l'azione principale della schermata e per ciò che conta davvero
(settimana in corso, record). Massimo un `.btn.primary` per schermata. Per scrivere in ciano su fondo
chiaro usa `--accent-ink`, mai `--accent`. Sopra `--deep` si usano solo `--deep-ink`, `--deep-ink-2`,
`--glow` e `--accent`.

Uso del vetro scuro: è la cosa che si nota. Se un elemento nuovo non è fra i più importanti della
schermata, va in vetro chiaro.

## Tipografia

Tre famiglie, salvate in locale in `fonts/` e dichiarate con `@font-face` in cima allo `<style>`.
Nessun font esterno. I pesi disponibili sono solo quelli indicati: non chiederne altri.

| Famiglia | Pesi | Dove |
|---|---|---|
| Barlow Condensed (`--f-tit`, `--f-num`) | 600, 700 | titoli, marchio, nomi dei giorni, bottone principale e **numeri in evidenza** (kg, ripetizioni, timer, tessere, obiettivo) |
| IBM Plex Sans | 400–600 | tutto il testo |
| IBM Plex Mono (`.mono`) | 500, 600 | numeri piccoli in riga o in tabella: storico, date, grafici, variazioni |

Barlow Condensed è stretto: sotto i 15px non si legge bene (unica eccezione "ATT" a 13px, maiuscolo).
Per i numeri piccoli resta IBM Plex Mono.

| Uso | Dimensione | Peso |
|---|---|---|
| `h1` titolo schermata | 32px | 700 |
| `h2` | 23px | 700 |
| `h3` titolo card / esercizio | 20–22px | 700 |
| Testo normale | 15px | 400 |
| `.small` | 13px | |
| `.tiny` | 11.5px | |
| Etichette (`.eyebrow`, `.k`, `th`, `label.f`) | 11.5–12.5px | 600, **minuscole normali**; `.eyebrow` in `--ink-2`, le altre in `--ink-3` |
| Kg e ripetizioni nei campi | 24px | 700 |
| Timer | 30px | 700 |
| Obiettivo | 23px | 700 |
| Tessere (`.tile .v`) | 27px | 700 |

- L'utente ha trovato troppo grandi i numeri a 32px: **24px nei campi è la misura approvata**, non alzarla.
- Niente etichette TUTTE MAIUSCOLE con le lettere spaziate: si scrivono normali. Fanno eccezione solo
  l'etichetta `.pr` ("REC") e "ATT" nella riga della serie iniziale.
- I numeri hanno sempre `font-variant-numeric:tabular-nums`, così non ballano.
- In una card il carico è l'elemento più visibile.
- Gli `input`, i `select` e le `textarea` hanno testo di almeno **16px**: sotto, iOS ingrandisce la pagina al tocco.

## Misure e forme

Non esiste una scala di spaziature a token: le misure sono in px nel CSS. Resta sui valori già in uso.

- Margine laterale della pagina: 13px (`.wrap`, che tiene conto anche delle safe area).
- Spazio fra blocchi: 12px (`.stack`). Fra elementi in riga: 6–10px.
- Padding interno delle card: 12–14px.
- Forme morbide: `var(--r)` (20px) per le card, 14–17px per bottoni e campi delle serie, 10–12px per
  bottoni piccoli, icone e campi nei dialog,
  22px per la barra in basso, 100px per le pillole. Niente spigoli vivi.
- Ombra: `var(--shadow)` sulle card e sugli elementi che galleggiano, `var(--shadow-alta)` su menu e dialog.

## Vetro ed effetti

- La sfocatura vera (`backdrop-filter`, sempre con il prefisso `-webkit-`) si usa **solo sugli
  elementi fissi**: intestazione, barra in basso, timer, avvisi. Sono pochi e non pesano.
- Le card che scorrono sono vetro "finto": `--glass` semitrasparente senza sfocatura. Sopra uno
  sfondo che è già una sfumatura morbida l'effetto è lo stesso, e lo scorrimento sul telefono resta fluido.
- La luce in alto è un solo livello fisso (`body::before`). Niente `background-attachment:fixed`,
  niente animazioni sullo sfondo, niente bagliori che pulsano.
- I dialog hanno fondo pieno (`--surface`): dentro si scrive e si legge, il vetro lì disturba.

## Componenti

- **Bottone** `.btn` (minimo 44px); principale `.btn.primary` (ciano, scritta in Barlow Condensed 19px);
  discreto `.btn.ghost`; piccolo `.btn.sm`; largo `.btn.block`.
  Azione principale in fondo allo schermo: `.btn.primary.block` dentro `.salva-bar` (52px).
- **Bottone a icona** `.icobtn`: sempre con `aria-label`.
- **Eliminare dati**: chiede sempre conferma in un `dialog` e ricorda che i dati stanno solo sul telefono.
- **Card esercizio** `.es`: testata `.es-head` (nome + prescrizione `.prescr`), righe delle serie `.sr`.
  Superset: `.es.ss`, bordo sinistro 3px `--dato`.
- **Obiettivo** `.obiettivo`: riquadro in vetro scuro largo quanto la card, etichetta in `--glow`,
  carico × ripetizioni in grande in `--deep-ink`.
- **Riga serie** `.sr`: numero, kg, ripetizioni, spunta `.tick` (52×50). Numeri centrati nei campi.
  Fatta: `data-done="1"` (campi su `--up-soft`, spunta piena `--up` con segno `--on-up`).
  Serie iniziale: `data-att="1"`.
- **Input numerici** `.fld`: alti 50px, unità (`kg`, `rip`) in un `<u>` a destra. `inputmode="decimal"`
  per i kg, `inputmode="numeric"` per le ripetizioni.
- **Giorni** `.gday`: vetro chiaro; quello scelto (`aria-pressed="true"`) in vetro scuro.
- **Variazioni** `.delta` e `.tile .d` con `data-dir="su" | "giu" | "fermo"`. Mai solo il colore:
  sempre anche segno o freccia (`+2,5 kg ▲`).
- **Record** `.pr`: etichetta piccola su `--accent`.
- **Barra in basso** `nav.tabs`: pillola di vetro scuro staccata dai bordi, 4 voci, non di più.
  Attiva: fondo `--deep-fill`, testo `--deep-ink`, icona `--glow`. Da 760px in su diventa una barra in alto.
- **Stato vuoto** `.vuoto`: un titolo, una riga in `--ink-2`, un bottone per l'azione giusta. Mai uno schermo bianco.
- **Avvisi** `.toast`, `.aggiorna`: vetro scuro. Il `.toast` sta in alto sotto l'intestazione (in basso
  copriva Salva e il timer) e non intercetta i tocchi.
- **Timer** `.timer`: vetro scuro, tempo in `--glow`, filo di avanzamento `--accent`.
  **Sveglia** `.timer.suona`: a tempo scaduto la barra diventa `--accent` con testo `--on-accent`,
  scritta grande e un solo bottone "Stop".
- **Storico** `.storico-btn`: la riga "Ultima …" in cima alla card è un bottone alto almeno 48px, con i
  numeri in mono, l'indicatore `.delta` (▲ / ▼ / =) e una freccia a destra.
- **Pannello dal basso** `dialog.foglio`: attaccato al fondo su telefono, centrato da 760px in su;
  testata con titolo e × da 44px, corpo che scorre, due bottoni da 48px in fondo. Nessun `.btn.primary`
  dentro: quello della schermata resta Salva.
- **Scelta dell'esercizio** `dialog.foglio.scegli`: pannello alto quanto lo schermo visibile (segue la
  tastiera con `--vvh`), ricerca `.cerca` in alto (48px, testo 16px), striscia di filtri `.filtro` a
  pillola da 48px che scorre (scelto: `--accent-soft` con testo `--accent-ink`), righe `.voce` da 54px
  con pallino del gruppo, nome e sotto "muscolo · attrezzo". Niente vetro scuro né `.btn.primary`.
- **Grafici**: `grafico(storia, larghezza)` si disegna alla larghezza vera dello spazio, così i numeri
  restano a 11-13px anche a 320px. Linea e punti in `--dato`, area in `--accent-soft`, barre in `--vol`.
  Mai un SVG largo rimpicciolito con `viewBox`.

## Bersagli

Tutto ciò che si tocca fra una serie e l'altra è alto almeno **48px** (minimo assoluto 44px).
Spunta, campi, `+ serie` / `− serie`, Salva, le voci della barra in basso e i bottoni del timer sono
a 48px o più. Menu ⋯ e le sue voci, `.btn`, `.btn.sm`, "Elimina allenamento" e i cursori del
questionario sono a 44px. Restano a 32px solo i `.icobtn` nelle righe di Scheda (quattro per riga: a
44px schiaccerebbero il nome dell'esercizio): non usarli come misura per elementi nuovi.

Il timer di recupero scrive la propria altezza in `--timer-h` su `<html>` finché è a schermo:
`.salva-bar` e il padding di `main` la sommano per non finirci sotto. Ogni altro elemento fisso in
basso deve fare lo stesso.

## Layout

- Mobile prima di tutto: progetta a 375px, poi verifica a 320px e a 430px.
- Nessuno scroll orizzontale della pagina. Le uniche strisce che scorrono sono `.giorni` e `.chart-box`.
- Larghezza massima del contenuto 760px, centrato. Punto di rottura principale: `min-width:760px`.
  Due ritocchi locali: tessere su 4 colonne da 560px, righe delle serie e tabelle più strette sotto 360px.
- Le azioni principali stanno nella metà bassa dello schermo, raggiungibili col pollice.
- Ciò che è fisso ai bordi rispetta `env(safe-area-inset-*)`. La barra in basso occupa 64px dal fondo
  (più la safe area): ciò che è fisso sopra di lei parte da `bottom:72px`, e `main` ha il padding
  inferiore per non restare coperto.

## Movimento

- Transizioni brevi, 150ms, `ease-out`, solo su colore di fondo e pressione (`transform:scale(.97)`).
  Niente animazioni decorative.
- Ogni transizione nuova va aggiunta alla regola `@media (prefers-reduced-motion:reduce)` in fondo
  allo `<style>`, che le spegne tutte.

## Accessibilità

- Contrasto del testo almeno 4.5:1 **in entrambi i temi**. `--ink-3` è al limite: solo per etichette
  e unità, mai per informazioni che servono.
- Fuoco visibile: c'è già `:focus-visible` globale, non toglierlo con `outline:none` senza un sostituto.
- Interfaccia in italiano, numeri con la virgola decimale.

## Icona

Un disco di ghisa da 20 kg visto di fronte, con le scritte in rilievo ciano, su fondo blu abisso.
Il disegno sta in `icons/icona-sorgente.html` (SVG a mano, non fa parte dell'app e non va in `GUSCIO`).
Per rifare i PNG: servire la cartella del progetto in locale, aprire
`icons/icona-sorgente.html?solo=i2&px=512` con Playwright e fare lo screenshot alla misura giusta
(`i2` per le icone normali, `i2m` per la maskable, col disco dentro l'80% centrale).
Misure: 512, 192, maskable 512, apple-touch 180, favicon 32. L'icona per l'iPhone è `icons/ghisa-home-180.png`
(è quella dichiarata nell'`<head>`); `apple-touch-icon.png` è la stessa immagine, tenuta per le copie già installate.
Se l'icona cambia ancora, dare al file un nome nuovo: l'iPhone tiene in memoria quella vecchia per nome. Le icone sono quadrate a tutto campo:
gli angoli li arrotonda il telefono.

## Checklist prima di chiudere una modifica grafica

1. Solo `var(--token)` per i colori? Ogni token nuovo è in tutti e tre i blocchi?
2. Ho guardato la schermata sia in chiaro sia in scuro?
3. Un solo `.btn.primary` nella schermata? Il vetro scuro è solo su ciò che conta?
4. Ciò che si tocca è alto almeno 48px? Gli input hanno testo da 16px?
5. I numeri in evidenza sono in Barlow Condensed con `tabular-nums`, e il carico è la cosa più visibile?
6. Regge a 320px senza scroll orizzontale?
7. Nessuna risorsa esterna (font, CDN)? `backdrop-filter` solo su elementi fissi?
8. Chiudo con la skill `rilascio` (alza `VERSIONE` in `sw.js`).
