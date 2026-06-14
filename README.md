# Avatar AI - Conversational AI Web Agent

## 📖 Descrizione del Progetto e Obiettivi
Avatar AI è un sistema di intelligenza artificiale conversazionale basato sul web (Conversational AI Web Agent) alimentato dai Large Language Models (LLM). L'obiettivo primario di questa piattaforma è offrire un'interfaccia ricca e interattiva dove gli utenti possono dialogare in tempo reale con agenti dotati di personalità. Il sistema fornisce risposte generate in testo e sintetizzate tramite intelligenza artificiale vocale (Text-To-Speech), animate dinamicamente attraverso avatar virtuali tridimensionali.

## ✨ Funzionalità Principali
- **Conversazione LLM Real-Time**: Interazioni gestite sfruttando le API di OpenRouter.
- **TTS Integrato**: Generazione della voce istantanea utilizzando la libreria locale `edge-tts`.
- **Rappresentazione 3D e Animazioni (Three.js)**: Modelli avatar in formato `.glb` che includono movimenti procedurali, sguardi, espressioni e labiale (lipsync) sincronizzato all'audio generato.
- **Supporto multi-profilo (Persona RAG)**: Possibilità di selezionare fra più avatar. Per esempio, "Tino" e "Aria" sono forniti di default, supportati ciascuno da un proprio file Markdown come Knowledge Base (RAG) da cui attingono per contestualizzare le risposte.

## 🏗 Architettura e Struttura delle Cartelle
Il sistema si fonda su un'architettura monolitica client-server semplificata:
- Il Backend è un server Express leggero in **Node.js** che funge da proxy per l'API di OpenRouter ed espone un endpoint per invocare la generazione dell'audio locale affidata a un sottoprocesso in **Python**.
- Il Frontend risiede interamente in un singolo file HTML servito staticamente, dove tutta la gestione del flusso WebGL, UI e rete è definita lato client.

**Albero delle Directory principale (`/avatar-ai/`)**:
- `server.js`: Application server Node.js ed endpoint proxy.
- `avatar-standalone.html`: Punto d'ingresso principale dell'applicazione client (Monolite UI e Logica).
- `config.js`: Script di configurazione base contenente i prompt di sistema e le configurazioni degli avatar per la UI.
- `knowledge/`: Cartella destinata al Retrieval-Augmented Generation.
  - `ariarag.md`: Contesto di conoscenza per l'avatar Aria.
  - `tinorag.md`: Contesto di conoscenza per l'avatar Tino.
- `*.glb` (es. `aria.glb`, `teal_v.2.glb`): Asset dei modelli 3D caricati dal motore rendering nel browser.

## 🛠 Tecnologie Utilizzate
- **Frontend**: Vanilla HTML/JS, CSS in-page, *Three.js* (con *GLTFLoader* via CDN per il rendering 3D).
- **Backend**: *Node.js* (>=18), framework *Express.js*, pacchetto *dotenv* per la gestione env.
- **LLM/NLP**: *OpenRouter API* (default `openai/gpt-oss-20b:free`).
- **Audio/TTS**: *Python* (>=3.8) con libreria `edge-tts` (Microsoft Edge TTS Engine) gestito tramite esecuzione in subprocess della shell.

## ⚙️ Istruzioni di Installazione e Utilizzo
**Prerequisiti**: Node.js (>=18), Python (>=3.8) e pip.
1. Spostarsi nella cartella backend: `cd avatar-ai`
2. Installare il motore TTS Python: `pip install edge-tts`
3. Installare le dipendenze npm: `npm install`
4. Creare un file `.env` in `avatar-ai` inserendo l'API Key:
   ```env
   OPENROUTER_KEY=la-tua-chiave-api-qui
   ```
5. Avviare il server web: `node server.js`
6. Accedere al progetto navigando all'indirizzo `http://localhost:8080/avatar-standalone.html`

## 💡 Esempi Pratici
- **Scenari didattici (Tino)**: L'utente seleziona l'avatar *Tino* per esplorare concetti di sviluppo Web o AI ricevendo risposte professionali e di natura tecnologica grazie al suo file RAG `tinorag.md`.
- **Turismo Digitale (Aria)**: L'utente seleziona l'avatar *Aria*. Lei possiederà un background descritto in `ariarag.md` come "Guida locale di Bari". Si può quindi dialogare sullo street food pugliese o le bellezze cittadine, ottenendo risposte che verranno contestualizzate al volo.

## ⚠️ Criticità o Limitazioni Trovate
Analizzando il codice, la repository presenta alcune incongruenze importanti e falle da correggere prima della messa in produzione reale:
1. **Problema di Sicurezza (Command Injection Vulnerability)**: Nel file `server.js`, all'endpoint `/tts`, il parametro di query string `voice` non è sanitizzato. Viene immesso nativamente nel comando bash: `python -m edge_tts --voice "${voice}"...`. A differenza della variabile `text` (trattata in `safeText`), la mancanza di validazione su `voice` espone a rischi di Shell Injection nel sistema host se modificata arbitrariamente dall'utente.
2. **Dipendenze inutilizzate**: Il `package.json` elenca tra le dependencies `ws` (WebSockets), ma il protocollo socket non è importato o inizializzato in `server.js` (si usa polling HTTP per le API Proxy).
3. **Incongruenze nel repository e naming incoerente**: Il file `package.json` definisce `"main": "replace.js"`, file totalmente assente nella repository. Lo script `"test"` definito non lancia alcuna procedura automatica di quality assurance. Il naming tra repository GitHub principale (`conversational-ai-web-agent`) e cartella applicativa (`avatar-ai`) risulta scollegato. Non era specificata correttamente o inclusa la licenza.
4. **Debolezze strutturali e latenza lato backend**: Il TTS dipende da un child_process in Shell invocato tramite Node a ogni richiesta (`exec("python...")`), generando un file audio MP3 temporaneo su disco che poi viene letto. Questo crea pesante I/O sul filesystem, latenza ad ogni avvio dell'interprete Python e instabilità per traffico simultaneo.
5. **Codice Ridondante (Frontend)**: Il file `avatar-standalone.html` unisce pesantemente oltre mille righe di codice per il Markup, CSS e Three.js in un monolite, contravvenendo a qualsiasi pattern modulare del frontend e rendendo ostica la manutenzione.

## 🚀 Possibili Miglioramenti Futuri
- **Refactoring Architetturale del TTS**: Implementare un microservizio FastAPI in Python dedicato unicamente al rendering audio on-the-fly su pipe stream diretti al network socket, rimuovendo la necessità dello spawn process bash con scrittura su disco (eliminando alla radice l'injection).
- **Sanitizzazione Input Backend**: Aggiornare express per utilizzare middleware robusti per il filtraggio e controllo dei parametri (es. librerie Joi, express-validator).
- **Modernizzazione del Frontend**: Scorporare il file monolitico in una toolchain Javascript solida (es. React o Vue.js, integrando react-three-fiber per la gestione procedurale del canvas).
- **Containerizzazione Docker**: Rendere l'applicativo portatile fornendo un `Dockerfile` multienvironment per isolare i requisiti Python e Node.js nella stessa applicazione riducendo i conflitti di sistema e standardizzando la compilazione.
