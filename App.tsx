
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import Usage from './pages/Usage';
import Payment from './pages/Payment';
import Referral from './pages/Referral';
import BottomNav from './components/BottomNav';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hide nav on specific paths
  const noNavPaths = ['/', '/onboarding', '/login', '/register', '/payment', '/payment-confirm'];
  const showNav = !noNavPaths.includes(location.pathname) && isAuthenticated;

  useEffect(() => {
    // Check local auth state
    const authRecord = localStorage.getItem('falaja_auth');
    setIsAuthenticated(!!authRecord);

    // Simulate initial loading/splash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Protected Route wrapper
  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated === null) return null; // Wait for check
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  const handleLogin = () => {
    localStorage.setItem('falaja_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('falaja_auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoading && location.pathname === '/') {
    return <Splash />;
  }

  return (
    <div className="min-h-screen bg-premium-gradient flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home onLogout={handleLogout} /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile onLogout={handleLogout} /></PrivateRoute>} />
          <Route path="/upgrade" element={<PrivateRoute><Upgrade /></PrivateRoute>} />
          <Route path="/usage" element={<PrivateRoute><Usage /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/referral" element={<PrivateRoute><Referral /></PrivateRoute>} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
