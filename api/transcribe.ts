import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import formidable from 'formidable';
import fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '',
});

// Disable default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse multipart form data
        const form = formidable({
            maxFileSize: 25 * 1024 * 1024, // 25MB limit
        });

        const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
            form.parse(req as any, (err, fields, files) => {
                if (err) reject(err);
                else resolve([fields, files]);
            });
        });

        const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;

        if (!audioFile) {
            return res.status(400).json({ error: 'Audio file is required' });
        }

        console.log(`📤 Transcribing audio (${(audioFile.size / 1024).toFixed(2)} KB)...`);

        // Read the file
        const fileBuffer = fs.readFileSync(audioFile.filepath);
        const file = new File([fileBuffer], audioFile.originalFilename || 'recording.m4a', {
            type: audioFile.mimetype || 'audio/m4a',
        });

        // Call n8n webhook
        const WEBHOOK_URL = 'https://n8n.conversio.ao/webhook-test/falaja';

        console.log(`[PROXY] 📤 Enviando para n8n: ${WEBHOOK_URL}`);
        console.log(`[PROXY] 📂 Ficheiro: ${audioFile.originalFilename}, Tipo: ${audioFile.mimetype}, Tamanho: ${audioFile.size} bytes`);

        const n8nFormData = new FormData();
        const fileBlob = new Blob([fileBuffer], { type: audioFile.mimetype || 'audio/m4a' });
        n8nFormData.append('audio', fileBlob, audioFile.originalFilename || 'recording.m4a');

        const startTime = Date.now();
        const n8nResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: n8nFormData,
        });

        const duration = Date.now() - startTime;
        console.log(`[PROXY] 📥 Resposta n8n recebida em ${duration}ms. Status: ${n8nResponse.status}`);

        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text().catch(() => 'No error body');
            console.error(`[PROXY] ❌ Erro no n8n (${n8nResponse.status}):`, errorText);
            throw new Error(`n8n webhook error ${n8nResponse.status}: ${errorText}`);
        }

        const data = await n8nResponse.json();
        console.log('[PROXY] ✅ Dados n8n recebidos:', JSON.stringify(data).substring(0, 200) + '...');

        // Extract text from n8n response
        let text = "";
        if (data.text) text = data.text;
        else if (data.output) text = data.output;
        else if (data.message) text = data.message;
        else if (typeof data === 'string') text = data;
        else if (Array.isArray(data) && data[0]?.text) text = data[0].text;
        else text = JSON.stringify(data);

        console.log(`[PROXY] 📝 Texto extraído: "${text.substring(0, 50)}..."`);

        return res.status(200).json({ text: text });

    } catch (error: any) {
        console.error('❌ Error transcribing audio:', error);

        if (error.status === 401) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        if (error.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        if (error.code === 'insufficient_quota') {
            return res.status(402).json({ error: 'Insufficient quota' });
        }

        return res.status(500).json({ error: error.message || 'Failed to transcribe audio' });
    }
}
