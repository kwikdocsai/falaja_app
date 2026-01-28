
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: 'home', label: 'Home', path: '/home' },
    { icon: 'history', label: 'Histórico', path: '/history' },
    { icon: 'diamond', label: 'Premium', path: '/upgrade' },
    { icon: 'person', label: 'Perfil', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-6 py-4 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 flex justify-between items-center z-50 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      {navItems.slice(0, 2).map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-all ${
            location.pathname === item.path ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <span className="material-icons-round text-2xl">{item.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </button>
      ))}

      <button
        onClick={() => navigate('/home')}
        className="flex flex-col items-center -mt-10"
      >
        <div className="w-16 h-16 rounded-full bg-button-gradient flex items-center justify-center shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-transform border-4 border-[#0f172a] ring-2 ring-primary/20">
          <span className="material-icons-round text-white text-3xl">mic</span>
        </div>
      </button>

      {navItems.slice(2).map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-all ${
            location.pathname === item.path ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <span className="material-icons-round text-2xl">{item.icon}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
