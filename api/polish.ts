import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Text is required' });
        }

        console.log(`[POLISH] 📝 Polishing text: "${text.substring(0, 50)}..."`);
        const startTime = Date.now();

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'Tu és um assistente de escrita especializado em tornar textos mais elegantes e polidos sem perder a essência do autor. Mantém o tom profissional, confiante, pessoal e autêntico.',
                },
                {
                    role: 'user',
                    content: `Poli o seguinte texto: "${text}"`,
                },
            ],
            temperature: 0.7,
        });

        const duration = Date.now() - startTime;
        const polishedText = response.choices[0]?.message?.content || text;

        console.log(`[POLISH] ✅ Text polished in ${duration}ms. Tokens: ${response.usage?.total_tokens}`);

        return res.status(200).json({ text: polishedText });
    } catch (error: any) {
        console.error('❌ Error polishing text:', error);

        if (error.status === 401) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        if (error.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        if (error.code === 'insufficient_quota') {
            return res.status(402).json({ error: 'Insufficient quota' });
        }

        return res.status(500).json({ error: error.message || 'Failed to polish text' });
    }
}
