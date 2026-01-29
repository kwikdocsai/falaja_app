import { apiFetch } from './api';

/**
 * Polishes the provided text using our serverless API.
 * Makes it sound professional yet personal.
 */
export const polishText = async (text: string): Promise<string> => {
    try {
        console.log('📝 Sending text to polish API...');

        const response = await apiFetch('/api/polish', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Text polished successfully');

        return data.text || text;
    } catch (error: any) {
        console.error('❌ Erro ao polir texto:', error);
        return text;
    }
};

/**
 * Transcribes audio using our serverless API.
 */
export const transcribeAudio = async (audioUri: string): Promise<string> => {
    try {
        if (!audioUri) {
            throw new Error("Caminho do áudio inválido.");
        }

        console.log(`📤 Enviando áudio para transcrição: ${audioUri}`);

        // Create FormData for React Native
        const formData = new FormData();
        // @ts-ignore
        formData.append('audio', {
            uri: audioUri,
            name: 'recording.m4a',
            type: 'audio/m4a',
        });

        const response = await apiFetch('/api/transcribe', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error || `HTTP ${response.status}`;
            throw new Error(`Erro na transcrição: ${errorMessage}`);
        }

        const data = await response.json();
        console.log("✅ Transcrição concluída com sucesso");

        return data.text;
    } catch (error: any) {
        console.error("❌ Erro na transcrição:", error);
        if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            throw new Error("Erro de conexão. Verifique sua internet e tente novamente.");
        }
        throw error;
    }
};
