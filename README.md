# Avatar AI
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-AGPL--3.0-green.svg)

Avatar AI è un agente web conversazionale (Conversational AI Web Agent) basato su Large Language Models (LLM) che offre interazioni testuali, vocali e visive in tempo reale. Il sistema permette agli utenti di dialogare con avatar 3D dotati di personalità specifiche e contesti di conoscenza personalizzabili (RAG). Risolve il problema di fornire interfacce uomo-macchina più naturali e coinvolgenti, dimostrandosi utile per applicazioni didattiche, di supporto clienti e di intrattenimento.

## 📑 Indice
- [🏗️ Architettura e Struttura](#️-architettura-e-struttura)
- [📦 Prerequisiti e Dipendenze](#-prerequisiti-e-dipendenze)
- [🚀 Installazione e Setup](#-installazione-e-setup)
- [💻 Utilizzo](#-utilizzo)
- [🔄 Flussi di Lavoro e CI/CD](#-flussi-di-lavoro-e-cicd)
- [🤝 Contribuire](#-contribuire)
- [📄 Licenza](#-licenza)

## 🏗️ Architettura e Struttura
Il progetto adotta un'architettura client-server leggera. Il backend è un server Node.js/Express che funge da proxy verso l'API di OpenRouter per l'LLM e orchestra la generazione vocale (TTS) tramite l'esecuzione di script Python locali. Il frontend è un'applicazione web single-page (SPA) basata su Vanilla JS e Three.js per il rendering e l'animazione dei modelli 3D in formato `.glb`.

**Tecnologie e framework principali:**
- **Frontend**: HTML5, Vanilla JavaScript, CSS, Three.js (con GLTFLoader per i modelli 3D).
- **Backend**: Node.js (>=18), Express.js.
- **Integrazioni AI**: API di OpenRouter (LLM), libreria Python `edge-tts` (sintesi vocale).
- **RAG (Retrieval-Augmented Generation)**: Supportato tramite l'iniezione del contenuto di file Markdown contestuali.

```text
.
├── avatar-ai/
│   ├── knowledge/               # File Markdown (es. ariarag.md, tinorag.md) usati come base di conoscenza per RAG
│   ├── avatar-standalone.html   # Interfaccia utente frontend, punto d'ingresso principale
│   ├── config.js                # Configurazioni frontend (prompt di sistema, profili avatar)
│   ├── server.js                # Backend server Node.js e controller per proxy API/TTS
│   ├── package.json             # Dipendenze Node.js
│   └── *.glb                    # Modelli avatar 3D (es. aria.glb, teal_v.2.glb)
├── README.md                    # Documentazione principale
└── LICENSE                      # Licenza del progetto
```

## 📦 Prerequisiti e Dipendenze
Per eseguire il progetto localmente, è necessario installare i seguenti software:
- **Node.js** (v18.0 o superiore) e `npm`.
- **Python** (v3.8 o superiore) e `pip`.
- Connessione a Internet (per l'utilizzo dell'API OpenRouter e per i CDN di Three.js).

## 🚀 Installazione e Setup
Segui queste istruzioni passo-passo per configurare l'ambiente di sviluppo locale:

1. **Clonazione del repository:**
   ```bash
   git clone <URL_DEL_REPOSITORY>
   cd <NOME_DIRECTORY>/avatar-ai
   ```

2. **Installazione delle dipendenze Node.js:**
   ```bash
   npm install
   ```

3. **Installazione del motore TTS Python:**
   ```bash
   pip install edge-tts
   ```

4. **Configurazione delle variabili d'ambiente:**
   Creare un file `.env` nella directory `avatar-ai` e impostare la chiave API per OpenRouter (non è presente un file `.env.example`, seguire questo formato):
   ```env
   OPENROUTER_KEY=la_tua_api_key_qui
   ```

## 💻 Utilizzo
Avvio del server di sviluppo:
Dalla directory `avatar-ai`, esegui il seguente comando per avviare il backend:
```bash
node server.js
```
Una volta avviato, il server sarà in ascolto sulla porta `8080`. Apri il browser e vai all'indirizzo `http://localhost:8080/avatar-standalone.html` per interagire con l'interfaccia 3D.

**Esempi di interazione API:**
Il server espone internamente endpoint per generare l'audio e comunicare con l'LLM. Ad esempio, è possibile testare manualmente l'endpoint TTS per generare un file audio effettuando una richiesta GET dal terminale:
```bash
curl "http://localhost:8080/tts?text=Ciao%20mondo&voice=it-IT-ElsaNeural" --output test_audio.mp3
```

## 🔄 Flussi di Lavoro e CI/CD
> **Note:** Aggiungere configurazioni per CI/CD, pipeline di build, containerizzazione (Docker) e ambienti di staging qui. Al momento il repository non contiene configurazioni come `.github/workflows` o `Dockerfile` per l'automazione dei deployment.

**Esecuzione dei test:**
> **Note:** Aggiungere configurazioni per i test qui. Attualmente lo script `test` nel `package.json` non è configurato e restituisce un errore ("Error: no test specified").

## 🤝 Contribuire
I contributi alla base di codice sono i benvenuti! Per contribuire al progetto:
1. Effettua un Fork del repository.
2. Crea un branch isolato per la tua funzionalità o bug fix (`git checkout -b feature/nuova-funzionalita`).
3. Applica le tue modifiche seguendo le convenzioni di codifica esistenti e mantenendo un codice pulito.
4. Esegui i commit utilizzando messaggi chiari e descrittivi.
5. Invia una Pull Request dettagliata verso il branch principale (`main` o `master`), documentando i cambiamenti apportati.

## 📄 Licenza
Il progetto è distribuito sotto la licenza **AGPL-3.0 (GNU Affero General Public License v3.0)**. Consultare il file `LICENSE` presente nella root del repository per ulteriori dettagli.
