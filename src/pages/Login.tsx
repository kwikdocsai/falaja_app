
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-premium-gradient">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-900 mx-auto rounded-2xl rotate-45 flex items-center justify-center shadow-xl border border-primary/20 mb-8 animate-float">
            <span className="material-symbols-outlined text-3xl text-primary -rotate-45">fingerprint</span>
          </div>
          <h1 className="text-3xl font-bold font-logo tracking-[0.2em] mb-2">FALA<span className="text-accent">JÁ</span></h1>
          <p className="text-indigo-200/50 text-[10px] font-medium tracking-[0.4em] uppercase">Premium Voice Intelligence</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-indigo-300/40 uppercase tracking-widest pl-1">Identidade</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-xl text-slate-500 group-focus-within:text-accent transition-colors">person</span>
                  <input 
                    type="text" 
                    placeholder="ID de Utilizador" 
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-white focus:ring-1 focus:ring-accent/50 focus:border-accent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-indigo-300/40 uppercase tracking-widest pl-1">Código de Acesso</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-xl text-slate-500 group-focus-within:text-accent transition-colors">lock</span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 text-white focus:ring-1 focus:ring-accent/50 focus:border-accent transition-all outline-none"
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    <span className="material-symbols-outlined text-xl">visibility</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 text-indigo-200/50 cursor-pointer">
                <input type="checkbox" className="rounded bg-white/5 border-white/10 text-accent focus:ring-0" />
                <span>Memorizar</span>
              </label>
              <a href="#" className="text-accent/70 hover:text-accent transition-colors">Recuperar Acesso</a>
            </div>

            <button type="submit" className="w-full h-12 rounded-xl bg-button-gradient text-white font-bold tracking-widest uppercase text-xs shadow-lg hover:shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
              <span>Inicializar</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </form>

          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink-0 mx-4 text-indigo-300/20 text-[9px] uppercase tracking-widest">Sincronizar com</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6 grayscale opacity-60" alt="Google" />
            </button>
            <button className="h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-icons-round text-white/40 text-2xl">apple</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-indigo-300/40">
          Novo na plataforma? 
          <button onClick={() => navigate('/register')} className="text-accent font-bold ml-1 hover:underline">Criar Conta</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
