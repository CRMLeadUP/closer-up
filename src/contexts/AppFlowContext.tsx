
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
    console.log('Completing onboarding');
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
  };

  // Lógica super simples - só mostrar onboarding em condições muito específicas
  useEffect(() => {
    console.log('AppFlowContext effect - loading:', loading, 'user:', user?.email);
    
    if (loading) {
      console.log('Still loading auth, not setting onboarding state');
      return;
    }

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    console.log('hasSeenOnboarding:', hasSeenOnboarding);
    
    // Só mostrar onboarding se estiver na home, logado e nunca viu antes
    const isOnHome = window.location.pathname === '/';
    const shouldShow = user && isOnHome && !hasSeenOnboarding;
    
    console.log('Onboarding conditions - isOnHome:', isOnHome, 'user exists:', !!user, 'shouldShow:', shouldShow);
    
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
