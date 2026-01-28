
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Referral: React.FC = () => {
  const navigate = useNavigate();
  const inviteCode = "FALAJÁ-JOAO";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    alert("Código copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col p-6">
      <header className="flex justify-between items-center pt-8 pb-4 mb-12">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-widest uppercase">Convidar Amigos</h2>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        <div className="relative size-64 mb-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] animate-pulse"></div>
          <img 
            src="https://picsum.photos/seed/gift/400/400" 
            alt="Presente" 
            className="relative z-10 size-48 object-contain animate-float drop-shadow-2xl" 
          />
        </div>

        <div className="text-center space-y-3 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Ganha Minutos <span className="text-accent drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">Grátis</span></h1>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
            Convida os teus amigos para o FalaJá e ambos ganham <span className="text-white font-bold">15 minutos</span> de transcrição gratuita após o primeiro carregamento deles.
          </p>
        </div>

        <div className="w-full glass-panel rounded-3xl p-6 flex items-center justify-between group hover:bg-white/5 transition-all mb-12">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">O teu código único</p>
            <p className="text-2xl font-bold text-accent tracking-[0.2em] font-mono">{inviteCode}</p>
          </div>
          <button 
            onClick={handleCopyCode}
            className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-slate-900 transition-all active:scale-90"
          >
            <span className="material-symbols-outlined">content_copy</span>
          </button>
        </div>

        <div className="w-full space-y-4">
          <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Partilhar com</p>
          <div className="flex justify-center gap-8">
            {[
              { icon: 'chat', label: 'WhatsApp', color: 'bg-green-500/10 text-green-500' },
              { icon: 'public', label: 'Facebook', color: 'bg-blue-600/10 text-blue-600' },
              { icon: 'photo_camera', label: 'Instagram', color: 'bg-rose-500/10 text-rose-500' }
            ].map((social) => (
              <button 
                key={social.label} 
                onClick={() => alert(`A abrir ${social.label}...`)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`size-14 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${social.color} border border-white/5`}>
                  <span className="material-symbols-outlined text-2xl">{social.icon}</span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">{social.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="pb-12 pt-12">
        <button 
          onClick={() => alert("Link de convite gerado!")}
          className="w-full h-16 rounded-3xl bg-button-gradient text-white font-bold text-lg shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
        >
          <span>Partilhar Link de Convite</span>
          <span className="material-symbols-outlined">ios_share</span>
        </button>
      </footer>
    </div>
  );
};

export default Referral;
