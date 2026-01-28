import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { transcribeAudio } from '../services/openai';

const Home: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [lastTranscription, setLastTranscription] = useState("");

  const transcriptRef = useRef<HTMLDivElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Auto-scroll transcription
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcription]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("O seu navegador não suporta gravação de áudio ou não está numa ligação segura (HTTPS).");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);

      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      audioChunks.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        console.log("[UI] ⏺️ Parando gravação...");
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/m4a' });
        console.log(`[UI] 📂 Audio Blob criado: ${audioBlob.size} bytes, tipo: ${audioBlob.type}`);

        setIsProcessing(true);
        setTranscription(prev => [...prev, "A transcrever..."]);

        try {
          console.log("[UI] 🚀 Iniciando transcrição...");
          const text = await transcribeAudio(audioBlob);

          console.log("[UI] ✅ Transcrição recebida.");
          setTranscription(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = text;
            return newArr;
          });

          // Automatic Clipboard Copy
          try {
            await navigator.clipboard.writeText(text);
            console.log("[UI] 📋 Texto copiado para o clipboard.");
            setLastTranscription(text);
            setTimeout(() => setLastTranscription(""), 3000);
          } catch (clipErr) {
            console.error("[UI] ❌ Clipboard access failed:", clipErr);
          }
        } catch (err: any) {
          console.error("[UI] ❌ Erro no processamento:", err);

          const errorMessage = err?.message || "Falha na transcrição. Tente novamente.";

          setTranscription(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = `❌ ${errorMessage}`;
            return newArr;
          });

          // Show alert for critical errors
          if (errorMessage.includes("API") || errorMessage.includes("quota") || errorMessage.includes("500")) {
            setTimeout(() => {
              alert(`⚠️ Erro: ${errorMessage}`);
            }, 500);
          }
        } finally {
          setIsProcessing(false);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (err: any) {
      console.error("Erro ao aceder ao microfone:", err);
      alert("Não foi possível iniciar a gravação.");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setIsHolding(false);

    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsHolding(true);
    startRecording();
  };

  const handlePointerUp = () => {
    if (isHolding) {
      stopRecording();
    }
  };

  const handleToggleClick = () => {
    if (isRecording) {
      if (!isHolding) stopRecording();
    } else {
      startRecording();
    }
  };

  const handleWhatsAppShare = () => {
    const text = transcription.join(" ");
    if (!text) {
      alert("Grave algum áudio primeiro para partilhar.");
      return;
    }
    // WhatsApp URL scheme
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent("*Transcrição FalaJá:* \n\n" + text)}`;
    window.open(url, '_blank');
  };

  const handleCopy = () => {
    const fullText = transcription.join("\n");
    if (!fullText) return;
    navigator.clipboard.writeText(fullText).then(() => {
      alert("Texto copiado com sucesso!");
    });
  };

  const handleSave = () => {
    if (transcription.length === 0) return;
    alert("Transcrição guardada no histórico!");
    // In a real app, this would push to a database or localStorage
  };

  return (
    <div className="flex flex-col h-full bg-premium-gradient p-6 pt-12 relative overflow-hidden">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <span className="material-icons-round text-slate-400">menu</span>
        </button>
        <div className="text-center">
          <h1 className="font-logo font-bold tracking-widest text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">FALAJÁ</h1>
          <div className={`h-1.5 w-1.5 rounded-full mx-auto mt-1 transition-all ${isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_8px_red]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
        </div>
        <button onClick={() => navigate('/history')} className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <span className="material-icons-round text-slate-400">history</span>
        </button>
      </header>

      {/* Side Menu Drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-72 h-full bg-slate-950 z-[101] p-8 border-r border-white/10 flex flex-col shadow-2xl animate-slide-in-left">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-bold font-logo tracking-widest">FALA<span className="text-accent">JÁ</span></h1>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="size-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="material-icons-round text-slate-400">close</span>
              </button>
            </div>

            <nav className="flex-1 space-y-6">
              <button
                onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent/20 transition-all text-slate-300 hover:text-white group"
              >
                <span className="material-icons-round text-slate-500 group-hover:text-accent">person</span>
                <span className="font-medium tracking-wide">Meu Perfil</span>
              </button>

              <button
                onClick={() => { navigate('/usage'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent/20 transition-all text-slate-300 hover:text-white group"
              >
                <span className="material-icons-round text-slate-500 group-hover:text-accent">analytics</span>
                <span className="font-medium tracking-wide">Uso de Créditos</span>
              </button>

              <button
                onClick={() => { navigate('/upgrade'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/20 hover:border-primary/40 transition-all text-white group"
              >
                <span className="material-icons-round text-primary group-hover:scale-110 transition-transform">diamond</span>
                <span className="font-bold tracking-wide">Upgrade Premium</span>
              </button>
            </nav>

            <div className="pt-8 border-t border-white/5">
              <button
                onClick={() => { onLogout?.(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 transition-all text-slate-500 hover:text-red-400 group"
              >
                <span className="material-icons-round group-hover:rotate-180 transition-transform duration-500">logout</span>
                <span className="font-medium tracking-wide">Sair do FalaJá</span>
              </button>
            </div>
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col justify-center relative z-10">
        <div className="absolute top-0 w-full text-center py-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-accent/60 px-3 py-1 rounded-full bg-slate-900/40 border border-white/5">
            {isRecording ? 'Gravando Áudio...' : isProcessing ? 'Processando IA...' : 'Pronto para Transcrever'}
          </span>
        </div>

        <div
          ref={transcriptRef}
          className="h-64 overflow-y-auto no-scrollbar space-y-6 px-4"
        >
          {transcription.length === 0 ? (
            <p className="text-3xl font-display font-medium text-slate-600/40 leading-tight text-center">
              Mantenha pressionado o microfone para falar...
            </p>
          ) : (
            transcription.map((t, idx) => (
              <p
                key={idx}
                className={`text-3xl font-display font-medium leading-tight transition-all duration-700 ${idx === transcription.length - 1 ? 'text-white drop-shadow-lg' : 'text-slate-500/40'
                  }`}
              >
                {t}
              </p>
            ))
          )}
          {isRecording && (
            <div className="flex justify-center gap-1.5 pt-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></div>
            </div>
          )}
        </div>
      </main>

      <footer className="pb-12 flex flex-col items-center gap-12 relative z-10">
        <div className="relative group touch-none">
          {/* Animated Glow behind mic */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl transition-all duration-300 ${isRecording ? 'bg-red-500/40 scale-125' : 'bg-primary/20 animate-pulse-slow'}`}></div>

          <button
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleToggleClick}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-150 shadow-2xl border select-none ${isRecording
              ? 'bg-gradient-to-b from-red-500 to-rose-600 border-red-400 scale-110 shadow-red-500/50'
              : 'bg-gradient-to-b from-blue-500 to-indigo-600 border-white/10 ring-4 ring-black/20 hover:scale-105 active:scale-95'
              }`}
          >
            <span className="material-icons-round text-white text-4xl pointer-events-none">
              {isRecording ? 'mic' : 'mic_none'}
            </span>
          </button>

          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-slate-500 font-bold uppercase tracking-widest pointer-events-none text-center">
            {isRecording ? (isHolding ? 'Solte para Finalizar' : 'Toque para Parar') : 'Segure ou Toque'}
          </p>
        </div>

        <div className="w-full grid grid-cols-3 gap-4">
          <button
            onClick={handleCopy}
            title="Copiar Texto"
            className="glass-panel group flex flex-col items-center py-4 rounded-2xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="size-10 rounded-full bg-slate-900/40 flex items-center justify-center mb-2 group-hover:bg-primary/20">
              <span className="material-icons-round text-slate-400 group-hover:text-primary text-lg">content_copy</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Copiar</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            title="Partilhar no WhatsApp"
            className="glass-panel group flex flex-col items-center py-4 rounded-2xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="size-10 rounded-full bg-slate-900/40 flex items-center justify-center mb-2 group-hover:bg-[#25D366]/20">
              <span className="material-icons-round text-slate-400 group-hover:text-[#25D366] text-xl">chat</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">WhatsApp</span>
          </button>

          <button
            onClick={handleSave}
            title="Guardar Transcrição"
            className="glass-panel group flex flex-col items-center py-4 rounded-2xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="size-10 rounded-full bg-slate-900/40 flex items-center justify-center mb-2 group-hover:bg-primary/20">
              <span className="material-icons-round text-slate-400 group-hover:text-primary text-lg">save_alt</span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Guardar</span>
          </button>
        </div>
      </footer>

      {/* Floating Macro Button (Internal) */}
      {!isRecording && !isProcessing && (
        <button
          onClick={handleToggleClick}
          className="fixed bottom-32 right-6 size-14 rounded-full bg-button-gradient shadow-2xl shadow-primary/40 flex items-center justify-center z-50 animate-bounce active:scale-95 transition-all md:hidden"
        >
          <span className="material-icons-round text-white">mic</span>
        </button>
      )}

      {/* Auto-Copy Toast Notification */}
      {lastTranscription && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-green-500/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest animate-fade-in z-[60] text-white">
          Copiado para o clipboard
        </div>
      )}
    </div>
  );
};

export default Home;
