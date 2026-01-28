
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '../types';

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Iniciante',
    price: 'Grátis',
    description: 'Perfeito para testar as funcionalidades básicas.',
    features: ['15 min de transcrição/mês', 'Precisão standard', 'Exportar como TXT']
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: '4.500 Kz',
    description: 'Para quem precisa de poder e rapidez no dia-a-dia.',
    features: ['300 min de transcrição/mês', 'Precisão de IA avançada', 'Identificação de oradores', 'Exportar PDF e DOCX'],
    popular: true
  },
  {
    id: 'basic',
    name: 'Básico',
    price: '2.000 Kz',
    description: 'Ideal para estudantes e uso ocasional.',
    features: ['60 min de transcrição/mês', 'Precisão melhorada', 'Sem anúncios']
  }
];

const Upgrade: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'Mensal' | 'Anual'>('Mensal');

  return (
    <div className="min-h-screen bg-premium-gradient p-6 flex flex-col">
      <header className="flex justify-between items-center pt-8 pb-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-widest uppercase">Planos</h2>
        <button className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">history</span>
        </button>
      </header>

      <main className="flex-1 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Desbloqueia o Teu Poder</h1>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">Transcreve áudio ilimitado com precisão de IA. Escolhe o plano ideal para ti.</p>
        </div>

        <div className="flex justify-center relative">
          <div className="glass-panel p-1 rounded-full flex gap-1 border-white/5 relative z-10">
            {['Mensal', 'Anual'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${
                  period === p ? 'bg-button-gradient text-white shadow-lg' : 'text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {period === 'Anual' && (
            <span className="absolute -top-4 -right-4 bg-accent text-slate-900 text-[9px] font-bold px-3 py-1 rounded-full animate-bounce shadow-lg shadow-accent/40 uppercase">Poupa 20%</span>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 pb-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`min-w-[280px] snap-center glass-panel rounded-[2.5rem] p-8 flex flex-col border border-white/5 relative overflow-hidden ${plan.popular ? 'ring-2 ring-accent/50 scale-105 my-2 z-10 bg-slate-900/40' : 'bg-slate-900/20'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-slate-900 text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl">MAIS POPULAR</div>
              )}
              
              <div className="flex-1">
                <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${plan.popular ? 'bg-button-gradient shadow-accent/20' : 'bg-white/5'}`}>
                  <span className="material-symbols-outlined text-white">{plan.popular ? 'auto_awesome' : 'mic'}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== 'Grátis' && <span className="text-slate-500 text-sm">/mês</span>}
                </div>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{plan.description}</p>
                
                <ul className="space-y-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className={`material-symbols-outlined text-lg ${plan.popular ? 'text-accent' : 'text-slate-500'}`}>check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => plan.price !== 'Grátis' && navigate('/payment')}
                className={`w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase mt-12 transition-all ${
                  plan.id === 'starter' 
                  ? 'bg-white/5 text-slate-500 border border-white/10' 
                  : 'bg-button-gradient text-white shadow-xl shadow-primary/20 hover:scale-[1.02]'
                }`}
              >
                {plan.id === 'starter' ? 'Plano Atual' : 'Atualizar Agora'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Upgrade;
