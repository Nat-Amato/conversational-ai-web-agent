require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
}));
app.use(express.json());

// Edge TTS endpoint using python edge-tts library
app.get('/tts', (req, res) => {
    const text = req.query.text;
    const voice = req.query.voice || 'it-IT-ElsaNeural';
    if (!text) return res.status(400).send('Text is required');

    const os = require('os');
    const filename = crypto.randomUUID() + '.mp3';
    const filepath = path.join(os.tmpdir(), filename);

    // Robust shell escaping: remove characters that break shell commands,
    // then wrap in double quotes. This prevents injection and encoding issues.
    const safeText = text
        .replace(/[\r\n]+/g, ' ')           // newlines → space
        .replace(/[`$\\!"<>|&;{}()[\]]/g, '') // strip dangerous shell chars
        .replace(/\s{2,}/g, ' ')             // collapse whitespace
        .trim();

    if (!safeText) return res.status(400).send('Text is empty after sanitization');

    const cmd = `python -m edge_tts --voice "${voice}" --text "${safeText}" --write-media "${filepath}"`;

    exec(cmd, { timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
            console.error('Edge TTS Error:', stderr || error.message);
            // Cleanup temp file if it was partially written
            try { if (fs.existsSync(filepath)) fs.unlinkSync(filepath); } catch (e) { }
            return res.status(500).send('Edge TTS Python Error');
        }

        if (fs.existsSync(filepath)) {
            const stat = fs.statSync(filepath);
            if (stat.size === 0) {
                // Edge TTS produced an empty file — treat as error
                try { fs.unlinkSync(filepath); } catch (e) { }
                return res.status(500).send('Edge TTS produced empty audio');
            }
            res.set('Content-Type', 'audio/mpeg');
            const stream = fs.createReadStream(filepath);
            stream.pipe(res);
            stream.on('end', () => {
                try { fs.unlinkSync(filepath); } catch (e) { }
            });
            stream.on('error', () => {
                try { fs.unlinkSync(filepath); } catch (e) { }
            });
        } else {
            res.status(500).send('Failed to generate audio file');
        }
    });
});

// OpenRouter Chat Proxy
app.post('/chat', async (req, res) => {
    const { messages, model, ragFile, max_tokens, temperature } = req.body;
    const apiKey = process.env.OPENROUTER_KEY;
    if (!apiKey || !messages) {
        return res.status(400).json({ error: { message: 'Missing API key or messages' } });
    }

    // Read and inject RAG file if provided
    if (ragFile) {
        // Prevent directory traversal attacks
        const safeRagFile = path.basename(ragFile);
        const ragPath = path.join(__dirname, 'knowledge', safeRagFile);
        if (fs.existsSync(ragPath)) {
            const ragContent = fs.readFileSync(ragPath, 'utf-8');
            if (messages.length > 0 && messages[0].role === 'system') {
                messages[0].content += `\n\n--- CONTESTO AGGIUNTIVO (KNOWLEDGE BASE) ---\nUsa le seguenti informazioni per rispondere alle domande:\n\n${ragContent}`;
            }
        }
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:8080',
                'X-Title': 'Avatar AI - Aria'
            },
            body: JSON.stringify({
                model: model || 'openrouter/owl-alpha',
                messages,
                max_tokens: max_tokens || 512,
                temperature: temperature || 0.7
            })
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('OpenRouter API error:', data);
            return res.status(response.status).json(data);
        }
        res.json(data);
    } catch (err) {
        console.error('OpenRouter proxy error:', err.message);
        res.status(500).json({ error: { message: err.message } });
    }
});

app.listen(PORT, () => {
    console.log(`\n============================================`);
    console.log(`AVATAR AI SERVER IS RUNNING ON PORT ${PORT}`);
    console.log(`Open http://localhost:${PORT}/avatar-standalone.html`);
    console.log(`============================================\n`);
});
