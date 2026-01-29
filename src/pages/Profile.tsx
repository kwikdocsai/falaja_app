
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

const mockUser: UserProfile = {
  name: "João Silva",
  phone: "+244 923 000 000",
  plan: 'Pro',
  creditsRemaining: 45,
  creditsTotal: 120,
  stats: {
    minutes: 124,
    shares: 45,
    savedHours: 2
  }
};

const Profile: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col p-6">
      <header className="flex justify-between items-center pt-8 pb-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold font-display tracking-widest">MEU PERFIL</h2>
        <button className="p-3 rounded-full glass-panel">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      <main className="flex-1 space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="size-32 rounded-full p-1 bg-gradient-to-tr from-accent to-primary shadow-xl shadow-primary/20">
              <div className="size-full rounded-full overflow-hidden border-4 border-slate-900">
                <img src="https://picsum.photos/seed/user/200/200" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 size-4 rounded-full bg-green-500 border-2 border-slate-900 shadow-lg shadow-green-500/40"></div>
          </div>
          <h1 className="text-2xl font-bold mb-1">{mockUser.name}</h1>
          <p className="text-slate-500 text-sm font-medium tracking-wide">{mockUser.phone}</p>
        </div>

        <div
          onClick={() => navigate('/usage')}
          className="glass-panel rounded-3xl p-5 relative overflow-hidden group cursor-pointer hover:bg-white/5 transition-all"
        >
          <div className="absolute -right-8 -top-8 size-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Plano Atual</p>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold">FalaJá Pro</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-[10px] font-bold uppercase tracking-widest">Pro</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">Renova em 12 Nov, 2023</p>
            </div>
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">diamond</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary mb-2">mic</span>
            <p className="text-xl font-bold">{mockUser.stats.minutes}</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Minutos</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-purple-400 mb-2">share</span>
            <p className="text-xl font-bold">{mockUser.stats.shares}</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Partilhas</p>
          </div>
          <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-amber-400 mb-2">bolt</span>
            <p className="text-xl font-bold">{mockUser.stats.savedHours}h</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Poupadas</p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Geral</h3>
          {[
            { icon: 'person', label: 'Editar Perfil' },
            { icon: 'security', label: 'Segurança' },
            { icon: 'notifications', label: 'Notificações' },
            { icon: 'redeem', label: 'Convidar Amigos', path: '/referral' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className="w-full glass-panel rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-slate-900/60 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <span className="font-medium text-slate-200">{item.label}</span>
              </div>
              <span className="material-symbols-outlined text-slate-600">chevron_right</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onLogout?.()}
          className="w-full h-14 rounded-2xl border border-red-500/20 text-red-500 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all mb-8"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Sair da Conta</span>
        </button>
      </main>
    </div>
  );
};

export default Profile;
