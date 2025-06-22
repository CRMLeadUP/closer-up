
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface AppFlowContextType {
  isFirstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
  shouldShowOnboarding: boolean;
  completeOnboarding: () => void;
}

const AppFlowContext = createContext<AppFlowContextType>({
  isFirstTime: true,
  setIsFirstTime: () => {},
  shouldShowOnboarding: false,
  completeOnboarding: () => {},
});

export const useAppFlow = () => {
  const context = useContext(AppFlowContext);
  if (!context) {
    throw new Error('useAppFlow must be used within AppFlowProvider');
  }
  return context;
};

export const AppFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    if (loading) return;

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isAuthPage = location.pathname === '/auth';
    const isSuccessPage = location.pathname === '/success';
    
    // Se é primeira vez e não está logado, vai para auth
    if (!user && !isAuthPage && !isSuccessPage) {
      console.log('User not logged in, redirecting to auth');
      navigate('/auth');
      return;
    }

    // Se está logado mas nunca viu onboarding, mostra onboarding
    if (user && !hasSeenOnboarding && !isSuccessPage) {
      console.log('User logged in but first time, showing onboarding');
      setShouldShowOnboarding(true);
      setIsFirstTime(true);
      return;
    }

    // Se está logado e já viu onboarding, vai para dashboard principal
    if (user && hasSeenOnboarding && isAuthPage) {
      console.log('User logged in and has seen onboarding, redirecting to home');
      navigate('/');
      return;
    }

    setIsFirstTime(!hasSeenOnboarding);
  }, [user, loading, navigate, location.pathname]);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
    navigate('/');
  };

  return (
    <AppFlowContext.Provider value={{
      isFirstTime,
      setIsFirstTime,
      shouldShowOnboarding,
      completeOnboarding,
    }}>
      {children}
    </AppFlowContext.Provider>
  );
};
