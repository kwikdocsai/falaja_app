
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background-dark z-[100] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a237e] via-[#0f1623] to-black opacity-60"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-12">
          <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border border-primary/40 shadow-[0_0_30px_rgba(31,104,249,0.3)]">
            <span className="material-symbols-outlined text-5xl text-white filled" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
          </div>
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1 h-12 items-center">
            <div className="w-1 h-4 bg-accent/80 rounded-full animate-bounce"></div>
            <div className="w-1 h-8 bg-accent/60 rounded-full animate-bounce delay-75"></div>
            <div className="w-1 h-6 bg-accent/40 rounded-full animate-bounce delay-150"></div>
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1 h-12 items-center flex-row-reverse">
            <div className="w-1 h-4 bg-accent/80 rounded-full animate-bounce"></div>
            <div className="w-1 h-8 bg-accent/60 rounded-full animate-bounce delay-75"></div>
            <div className="w-1 h-6 bg-accent/40 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-accent to-white font-logo mb-2 drop-shadow-xl">
          FalaJá
        </h1>
        <p className="text-primary/80 text-sm font-medium tracking-[0.2em] uppercase opacity-60">
          AI Voice Engine
        </p>

        <div className="w-full max-w-xs mt-24 space-y-4">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
            <div className="h-full bg-button-gradient w-[70%] rounded-full animate-[shimmer_2s_infinite]"></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <span className="animate-pulse">Initializing Neural Net...</span>
            <span className="text-accent">70%</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 text-[10px] text-gray-700 font-mono tracking-widest uppercase">
        Powered by Angolan AI
      </div>
    </div>
  );
};

export default Splash;
