import type { VercelRequest, VercelResponse } from '@vercel/node';

// Disable default body parser if needed for raw binary
// However, Vercel's default body parser might handle raw binary as a Buffer in req.body.
// We'll try to use it as is first.
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '25mb',
        },
    },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log(`[PROXY] 📤 Recebida requisição binária. Content-Type: ${req.headers['content-type']}`);

        // n8n Webhook URL
        const WEBHOOK_URL = 'https://n8n.conversio.ao/webhook-test/falaja';

        // Forward the raw body to n8n
        // Vercel populates req.body for raw requests as a Buffer or similar
        const body = req.body;

        if (!body) {
            throw new Error("Corpo da requisição vazio.");
        }

        console.log(`[PROXY] 🚀 Relaying raw binary to n8n: ${WEBHOOK_URL}`);

        const startTime = Date.now();
        const n8nResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': req.headers['content-type'] || 'audio/m4a',
            }
        });

        const duration = Date.now() - startTime;
        console.log(`[PROXY] 📥 Resposta n8n recebida em ${duration}ms. Status: ${n8nResponse.status}`);

        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text().catch(() => 'No error body');
            console.error(`[PROXY] ❌ Erro no n8n (${n8nResponse.status}):`, errorText);
            throw new Error(`n8n webhook error ${n8nResponse.status}: ${errorText}`);
        }

        const data = await n8nResponse.json();
        console.log('[PROXY] ✅ Dados n8n recebidos:', JSON.stringify(data).substring(0, 200));

        // Let n8n handle the transcription, we just return the result
        return res.status(200).json(data);

    } catch (error: any) {
        console.error('❌ Error proxying to n8n:', error);
        return res.status(500).json({ error: error.message || 'Failed to relay binary audio' });
    }
}
