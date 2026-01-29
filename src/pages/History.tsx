
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Transcription } from '../types';

const mockHistory: Transcription[] = [
  {
    id: '1',
    title: 'Reunião de Equipa',
    text: 'Focámos nos objetivos do próximo trimestre. A retenção de utilizadores é a nossa prioridade número um para este mês...',
    date: '24 Out, 2023',
    time: '02:14',
    duration: '2m',
    category: 'Business'
  },
  {
    id: '2',
    title: 'Pitch de Marketing Luanda',
    text: 'Começar com um gancho forte sobre a conectividade em Angola. Depois apresentar a nossa solução para as empresas locais...',
    date: '23 Out, 2023',
    time: '05:42',
    duration: '5m',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Nota: Lista de Compras',
    text: 'Leite, ovos, pão e não esquecer as especiarias para o jantar de Sexta-feira. Confirmar se ainda há café em casa...',
    date: '18 Out, 2023',
    time: '01:15',
    duration: '1m',
    category: 'Personal'
  }
];

const History: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filteredHistory = filter === 'All' 
    ? mockHistory 
    : mockHistory.filter(item => item.category === filter);

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'All': return 'Tudo';
      case 'Business': return 'Negócios';
      case 'Personal': return 'Pessoal';
      case 'Favorites': return 'Favoritos';
      default: return cat;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-premium-gradient">
      <header className="px-6 py-12 flex items-center justify-between sticky top-0 z-40 bg-slate-900/40 backdrop-blur-xl border-b border-white/5">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full glass-panel flex items-center justify-center">
          <span className="material-icons-round text-slate-300">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-widest text-white/90 font-display uppercase">Histórico</h1>
        <button className="size-10 rounded-full glass-panel flex items-center justify-center">
          <span className="material-icons-round text-slate-300">search</span>
        </button>
      </header>

      <main className="flex-1 px-6 pt-8 pb-24">
        <div className="mb-8">
          <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Arquivo FalaJá</p>
          <h2 className="text-3xl font-bold">As Tuas <br/><span className="text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">Transcrições</span></h2>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
          {['All', 'Favorites', 'Business', 'Personal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'glass-panel text-slate-400'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredHistory.length > 0 ? filteredHistory.map((item) => (
            <div key={item.id} className="glass-panel rounded-3xl p-5 border-white/5 group hover:bg-white/5 transition-all">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_primary]"></div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.date}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-6">{item.text}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">{item.duration} de áudio</span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(item.text);
                      alert("Texto copiado!");
                    }}
                    className="size-9 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                  >
                    <span className="material-icons-round text-lg">content_copy</span>
                  </button>
                  <button className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                    <span className="material-icons-round text-lg">play_arrow</span>
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <span className="material-icons-round text-5xl text-slate-800 mb-4">folder_off</span>
              <p className="text-slate-500">Nenhuma transcrição encontrada nesta categoria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
