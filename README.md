# TOCCA A TE — CLECI

Applicazione statica, senza dipendenze, account, analytics, pubblicità o richieste a servizi esterni. Le immagini sono estratte dai due PDF originali, senza ridisegno.

## Anteprima subito
Apri `anteprima.html` con Chrome, Edge, Safari o Firefox: contiene codice e immagini e funziona anche senza server. Su smartphone scarica il file e aprilo con un browser; se il gestore file impedisce JavaScript, usa la versione pubblicata dopo approvazione. Per modificare il progetto usa i file separati, non l'anteprima generata.

## File
- `index.html`: struttura della pagina.
- `style.css`: colori e layout responsive.
- `app.js`: Scopri, pronuncia e Memory.
- `animali.js`: catalogo aggiornabile.
- `assets/animali/`: 32 PNG originali con trasparenza e inventario JSON.
- `anteprima.html`: versione autonoma del prototipo.

## Pubblicazione gratuita su GitHub Pages
1. Crea un repository GitHub, ad esempio `tocca-a-te`. Per il piano gratuito usa un repository pubblico: codice e illustrazioni saranno visibili e scaricabili.
2. Carica il contenuto di questa cartella nella radice del repository, mantenendo la sottocartella `assets`.
3. In Settings → Pages scegli Deploy from a branch, branch `main`, cartella `/ (root)`, poi Save.
4. Attendi il completamento della pubblicazione e apri l'indirizzo mostrato da GitHub Pages, normalmente `https://TUO-UTENTE.github.io/tocca-a-te/`.
5. Prova Scopri, audio e tutti e tre i livelli su telefono e computer prima di stampare un QR.

Non è stata effettuata alcuna pubblicazione. Il QR va generato solo dopo aver verificato l'indirizzo pubblico definitivo. La procedura dell'interfaccia GitHub può cambiare.

## Aggiungere un animale
1. Inserisci un PNG trasparente in `assets/animali/`, con nome semplice in minuscolo, ad esempio `zebra.png`.
2. In `animali.js` aggiungi un elemento nell'array ANIMALI, separato dagli altri con una virgola:
   `{ "id": "zebra", "nome": "zebra", "immagine": "assets/animali/zebra.png" }`
3. Usa un `id` univoco. La griglia e il Memory si aggiornano automaticamente. Mantieni almeno 8 animali per il livello difficile.
4. Aggiorna i file sul repository. L'anteprima autonoma non si rigenera da sola.

## Pronuncia gratuita
Web Speech API del browser: viene selezionata solo una voce con lingua italiana (`it`, `it-IT`, ecc.). Il catalogo viene ricontrollato quando il sistema carica le voci. Senza voce italiana viene mostrato un messaggio e il pulsante audio viene nascosto; Scopri e Memory continuano a funzionare. La voce dipende dal browser/sistema e può richiedere l'installazione del pacchetto vocale italiano o una connessione. Alcuni sistemi elaborano la sintesi tramite il proprio servizio: l'app non invia dati a servizi scelti da CLECI e non registra nulla. Nessun servizio a pagamento.

## Qualità delle immagini
32 illustrazioni separate con maschera di trasparenza: quattro immagini a 251×251 px, una a 270×270 px e le altre a 377×377 px. Sono preservate dimensioni, proporzioni e trasparenza originali. Esclusi freccia, moneta, STOP, numeri e tabellone. Per ingrandimenti da stampa queste risoluzioni non equivalgono a originali vettoriali.

## Verifica
Controlli automatici superati su: 32 elementi, nomi inizialmente nascosti e toggle, assenza voce italiana, 4/6/8 coppie, selezione univoca, blocco durante mismatch, doppio clic, vittoria e riavvio durante timeout. JavaScript validato sintatticamente. Layout predisposto a 2 colonne in Scopri e 4 colonne nel Memory su smartphone, senza font o librerie esterni. Verifica visiva browser/mobile e ascolto audio su dispositivo reale non disponibili nell'ambiente di produzione del prototipo e da completare prima della pubblicazione.

Guida ufficiale GitHub Pages verificata: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
