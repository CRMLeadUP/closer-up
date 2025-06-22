
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
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
  };

  // Simplificar drasticamente a lógica
  useEffect(() => {
    if (loading) return;

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    // Só mostrar onboarding se o usuário estiver logado, na home e não viu ainda
    if (user && window.location.pathname === '/' && !hasSeenOnboarding) {
      setShouldShowOnboarding(true);
      setIsFirstTime(true);
    } else {
      setShouldShowOnboarding(false);
      setIsFirstTime(!hasSeenOnboarding);
    }
  }, [user, loading]);

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
