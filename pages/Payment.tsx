
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    if (!selectedFile) {
      alert("Por favor, anexe o comprovativo da transferência primeiro.");
      return;
    }
    // Simulation of upload process
    setIsDone(true);
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-premium-gradient flex flex-col items-center justify-center p-8 text-center">
        <div className="relative size-48 mb-8">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] animate-pulse"></div>
          <div className="relative size-full rounded-full border-2 border-accent/30 flex items-center justify-center glass-panel">
            <span className="material-symbols-outlined text-6xl text-accent animate-bounce">task_alt</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold font-display mb-4">Sucesso!</h1>
        <p className="text-slate-400 text-lg mb-12">O seu comprovativo foi recebido. O saldo será atualizado em instantes.</p>
        <div className="px-6 py-2 glass-panel rounded-full text-slate-500 text-sm font-medium mb-12">
          Protocolo: <span className="text-white font-mono tracking-widest">#MCX-9921-A</span>
        </div>
        <button 
          onClick={() => navigate('/home')}
          className="w-full h-14 rounded-2xl bg-button-gradient text-white font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col p-6">
      <header className="flex items-center pt-8 pb-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full glass-panel mr-4 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-widest flex-1 text-center pr-12 text-white/80">PAGAMENTO MCX</h2>
      </header>

      <main className="flex-1 space-y-10">
        <div className="text-center space-y-2">
          <p className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Valor da Recarga</p>
          <h1 className="text-5xl font-bold tracking-tight text-white">12.000 <span className="text-xl text-slate-500 font-medium">AOA</span></h1>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border-white/10 shadow-2xl">
          <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500 text-xl">account_balance_wallet</span>
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Dados para Pagamento</span>
            </div>
            <span className="text-[9px] bg-accent/20 text-accent px-2 py-0.5 rounded-md font-bold">EXPRESS</span>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined">smartphone</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">923 000 000</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Entidade / Telefone</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('923000000');
                  alert("Número copiado!");
                }}
                className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 active:text-accent active:bg-accent/10 transition-all hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-lg">content_copy</span>
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent border border-accent/20">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">FALAJÁ-RECARGAS</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Referência / Destino</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-accent filled text-2xl">check_circle</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="px-2">
             <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Passo 2: Anexar Comprovativo</h3>
          </div>
          
          <label className={`group relative flex flex-col items-center justify-center w-full h-44 rounded-[2.5rem] border-2 border-dashed transition-all duration-300 cursor-pointer ${selectedFile ? 'border-accent bg-accent/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
            <div className="relative flex flex-col items-center gap-2 px-4 text-center">
              <div className={`p-4 rounded-full mb-1 shadow-2xl transition-all duration-500 group-hover:scale-110 ${selectedFile ? 'bg-accent/20 text-accent rotate-12' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-4xl">{selectedFile ? 'receipt_long' : 'upload_file'}</span>
              </div>
              
              {selectedFile ? (
                <>
                  <p className="text-accent font-bold text-sm truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Toque para substituir
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold text-sm">Carregar Comprovativo</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Formatos: JPG, PNG ou PDF
                  </p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*,.pdf" 
              ref={fileInputRef}
            />
          </label>

          <button 
            onClick={handleSend}
            disabled={!selectedFile}
            className={`w-full h-16 rounded-3xl text-white font-bold tracking-widest uppercase text-sm shadow-2xl transition-all flex items-center justify-center gap-2 group overflow-hidden relative ${!selectedFile ? 'opacity-40 cursor-not-allowed bg-slate-800' : 'bg-button-gradient shadow-primary/30 hover:scale-[1.02] active:scale-95'}`}
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-shimmer"></div>
            <span>Validar Recarga</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">send</span>
          </button>
          
          <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest">
             Processamento automático 24/7
          </p>
        </div>
      </main>
    </div>
  );
};

export default Payment;
