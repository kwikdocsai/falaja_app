
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    title: "Clica e Fala",
    desc: "Transcreve o teu áudio instantaneamente com a melhor tecnologia de IA do mercado.",
    img: "https://picsum.photos/seed/mic/400/400",
    accent: "text-primary"
  },
  {
    title: "Edita e Melhora",
    desc: "Usa a nossa IA para corrigir gramática, resumir reuniões ou mudar o tom do teu texto.",
    img: "https://picsum.photos/seed/brain/400/400",
    accent: "text-accent"
  },
  {
    title: "Partilha Rápida",
    desc: "Envia os teus textos corrigidos para o WhatsApp, E-mail ou copia para qualquer aplicação.",
    img: "https://picsum.photos/seed/share/400/400",
    accent: "text-indigo-400"
  }
];

const Onboarding: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col p-6">
      <header className="flex justify-end pt-8">
        <button 
          onClick={() => navigate('/login')}
          className="text-white/60 text-sm font-medium px-4 py-2 hover:text-white transition-colors"
        >
          Saltar
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all"></div>
          <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/40">
            <img src={steps[current].img} alt={steps[current].title} className="w-full h-full object-cover opacity-80" />
          </div>
        </div>

        <div className="text-center space-y-4 max-w-xs">
          <h2 className="text-4xl font-bold tracking-tight text-white font-display">
            {steps[current].title}
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            {steps[current].desc}
          </p>
        </div>
      </main>

      <footer className="pb-12 space-y-12">
        <div className="flex justify-center gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 transition-all duration-300 rounded-full ${
                i === current ? 'w-8 bg-primary shadow-lg shadow-primary/40' : 'w-2 bg-white/20'
              }`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-full h-14 rounded-2xl bg-button-gradient text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>{current === steps.length - 1 ? 'Começar Agora' : 'Próximo'}</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
