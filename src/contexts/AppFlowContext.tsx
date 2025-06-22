
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

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
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
  };

  // Lógica muito simplificada - só mostrar onboarding em condições muito específicas
  useEffect(() => {
    if (loading) return;

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    // Só mostrar onboarding se estiver na home, logado e nunca viu antes
    const isOnHome = window.location.pathname === '/';
    const shouldShow = user && isOnHome && !hasSeenOnboarding;
    
    setShouldShowOnboarding(!!shouldShow);
    setIsFirstTime(!hasSeenOnboarding);
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
