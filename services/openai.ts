/**
 * Polishes the provided text using our serverless API.
 * Makes it sound professional yet personal.
 */
export const polishText = async (text: string): Promise<string> => {
  try {
    console.log('[SERVICE] 📝 Calling /api/polish...');

    const response = await fetch('/api/polish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[SERVICE] ❌ Polish API error (${response.status}):`, errorData);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('[SERVICE] ✅ Text polished successfully');

    return data.text || text;
  } catch (error: any) {
    console.error('[SERVICE] ❌ Erro ao polir texto:', error);
    return text;
  }
};

/**
 * Transcribes audio using our serverless API.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Áudio vazio. Tente gravar novamente.");
    }

    console.log(`[SERVICE] 📤 Enviando áudio para /api/transcribe (${(audioBlob.size / 1024).toFixed(2)} KB, tipo: ${audioBlob.type})`);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.m4a');

    const startTime = Date.now();
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const duration = Date.now() - startTime;
    console.log(`[SERVICE] 📥 Resposta /api/transcribe recebida em ${duration}ms. Status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[SERVICE] ❌ Transcribe API error (${response.status}):`, errorData);
      const errorMessage = errorData.error || `HTTP ${response.status}`;
      throw new Error(`Erro na transcrição: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("[SERVICE] ✅ Transcrição concluída com sucesso. Texto:", data.text?.substring(0, 50) + "...");

    return data.text;
  } catch (error: any) {
    console.error("[SERVICE] ❌ Erro na transcrição:", error);

    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error("Erro de conexão. Verifique sua internet e tente novamente.");
    }

    throw error;
  }
};
