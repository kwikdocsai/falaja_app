
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Conta criada com sucesso! Por favor, faça login.");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-premium-gradient p-8 flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full bg-white/5 border border-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-right">
          <p className="text-accent text-[10px] font-bold uppercase tracking-widest">Passo 01/02</p>
          <p className="text-white/40 text-xs">Informações Pessoais</p>
        </div>
      </header>

      <div className="h-1.5 w-full bg-slate-800 rounded-full mb-12 overflow-hidden">
        <div className="h-full w-1/2 bg-button-gradient shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
      </div>

      <main className="flex-1 space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-display leading-tight mb-2">
            Junte-se ao <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">FalaJá Premium</span>
          </h1>
          <p className="text-slate-400 text-sm">Experiência de transcrição AI de última geração. Crie sua identidade digital agora.</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pl-1">Nome Completo</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-accent">person</span>
              <input type="text" placeholder="Ex: João Baptista" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-accent transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pl-1">Email Corporativo</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 group-focus-within:text-accent">mail</span>
              <input type="email" placeholder="nome@empresa.com" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:border-accent transition-all" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pl-1">Telemóvel</label>
            <div className="flex h-14 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-accent transition-all">
              <div className="flex items-center gap-2 px-4 bg-white/5 border-r border-white/5">
                <span className="text-lg">🇦🇴</span>
                <span className="text-sm font-medium">+244</span>
              </div>
              <input type="tel" placeholder="9XX XXX XXX" className="flex-1 bg-transparent px-4 outline-none" />
            </div>
          </div>

          <div className="space-y-1.5 pt-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 rounded border-white/10 bg-white/5 text-accent focus:ring-0" />
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                Concordo com os <span className="text-white underline decoration-accent/50">Termos de Serviço</span> e reconheço a Política de Privacidade.
              </span>
            </label>
          </div>
        </form>
      </main>

      <footer className="py-8">
        <button
          onClick={handleRegister}
          className="w-full h-14 rounded-full bg-button-gradient text-white font-bold tracking-widest uppercase text-sm shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Criar Conta</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="text-center text-sm text-slate-500 mt-6">
          Já é membro? <button onClick={() => navigate('/login')} className="text-accent font-semibold ml-1">Entrar</button>
        </p>
      </footer>
    </div>
  );
};

export default Register;
