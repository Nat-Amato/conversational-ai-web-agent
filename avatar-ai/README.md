# Avatar AI

Benvenuto nel progetto Avatar AI! Questo sistema ti permette di interagire con avatar 3D (come Tino e Aria) dotati di voce e animazioni, alimentati dall'intelligenza artificiale di OpenRouter e dalle voci di Edge TTS.

## 📋 Prerequisiti di Sistema

Prima di avviare il progetto, assicurati di avere installato sul tuo computer:
1. **Node.js** (versione 18 o superiore)
2. **Python** (versione 3.8 o superiore)

## 📦 Dipendenze Necessarie

Il progetto utilizza le seguenti tecnologie e librerie:

### Node.js (Backend)
- `express`: Per il server web locale.
- `dotenv`: Per gestire le variabili d'ambiente in modo sicuro.
- `ws`: Per eventuali connessioni WebSocket.

### Python (Audio TTS)
Il sistema utilizza una libreria Python per generare le voci degli avatar in tempo reale.
Devi installarla eseguendo questo comando nel terminale:
```bash
pip install edge-tts
```

## 🚀 Comandi di Primo Avvio

Se è la prima volta che cloni o apri questo progetto, segui questi semplici passaggi:

**1. Installa i pacchetti Node.js:**
Apri il terminale all'interno della cartella `avatar-ai` ed esegui:
```bash
npm install
```
*(Questo comando creerà la cartella `node_modules` installando tutte le dipendenze elencate nel `package.json`)*

**2. Configura le Chiavi API:**
Crea un file chiamato `.env` nella cartella radice del progetto (se non esiste già) e inserisci la tua chiave di OpenRouter in questo modo:
```env
OPENROUTER_KEY=la-tua-chiave-api-qui
```

**3. Avvia il Server:**
Una volta installato tutto, puoi far partire il backend eseguendo:
```bash
node server.js
```

## 🌐 Visionare il Sistema

Dopo aver avviato il server con successo (vedrai un messaggio di conferma nel terminale), puoi aprire il sistema direttamente dal tuo browser preferito cliccando su questo link:

👉 **[http://localhost:8080/avatar-standalone.html](http://localhost:8080/avatar-standalone.html)**

---
*Nota: Puoi personalizzare la conoscenza e le impostazioni degli avatar modificando il file `config.js` e i rispettivi file Markdown all'interno della cartella `knowledge/`.*
