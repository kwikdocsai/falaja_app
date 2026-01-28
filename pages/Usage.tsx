
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Usage: React.FC = () => {
  const navigate = useNavigate();
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = 62;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col p-6">
      <header className="flex justify-between items-center pt-8 pb-4 mb-12">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-widest uppercase">Uso de Crédito</h2>
        <button className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 space-y-12">
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative size-64">
            <svg className="size-full transform -rotate-90" viewBox="0 0 120 120">
              <circle className="text-slate-800" cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" />
              <circle 
                className="text-primary transition-all duration-1000 ease-out" 
                cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="8" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Restantes</span>
              <div className="text-6xl font-display font-bold text-white tracking-tighter">
                45<span className="text-2xl text-slate-500 font-normal ml-1">m</span>
              </div>
              <span className="text-slate-600 text-[10px] mt-2 font-bold uppercase tracking-widest px-4">De um total de 120 minutos</span>
            </div>
          </div>
          
          <div className="mt-8 px-5 py-2 rounded-full glass-panel border-accent/20 flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_accent]"></span>
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Plano Ativo</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-white font-display font-bold text-xl px-1">Resumo de Gastos</h2>
          {[
            { label: 'Transcrições Efetuadas', value: '75 min', icon: 'graphic_eq', color: 'bg-primary/20', text: 'text-primary', badge: '62%' },
            { label: 'Créditos Acumulados', value: '12 min', icon: 'savings', color: 'bg-accent/20', text: 'text-accent', badge: '+ Bónus' },
            { label: 'Próxima Renovação', value: '24 Nov, 2023', icon: 'event_repeat', color: 'bg-purple-500/20', text: 'text-purple-400', badge: 'Em 5 dias' }
          ].map((item) => (
            <div key={item.label} className="glass-panel p-5 rounded-[2rem] flex items-center justify-between group hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl ${item.color} ${item.text} flex items-center justify-center`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-lg font-bold text-white">{item.value}</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-3 py-1.5 rounded-xl ${item.color} ${item.text} uppercase tracking-widest`}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="pb-12 pt-8">
        <button 
          onClick={() => navigate('/upgrade')}
          className="w-full h-16 rounded-3xl bg-button-gradient text-white font-bold text-lg shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>Recarregar Créditos</span>
        </button>
      </footer>
    </div>
  );
};

export default Usage;
