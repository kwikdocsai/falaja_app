
/**
 * Transcribes audio using our serverless API.
 * Sends the raw binary blob directly.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error("Áudio vazio. Tente gravar novamente.");
    }

    console.log(`[SERVICE] 📤 Enviando áudio BINÁRIO para /api/transcribe (${(audioBlob.size / 1024).toFixed(2)} KB, tipo: ${audioBlob.type})`);

    const startTime = Date.now();
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      headers: {
        'Content-Type': audioBlob.type || 'application/octet-stream',
      },
      body: audioBlob, // Send raw blob
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
    console.log("[SERVICE] ✅ Dados recebidos de n8n:", JSON.stringify(data).substring(0, 100));

    // Extract text from n8n response
    // Priority: text -> output -> message -> raw string
    const transcriptionText = data.text || data.output || data.message || (typeof data === 'string' ? data : JSON.stringify(data));

    return transcriptionText;
  } catch (error: any) {
    console.error("[SERVICE] ❌ Erro na transcrição:", error);
    throw error;
  }
};
