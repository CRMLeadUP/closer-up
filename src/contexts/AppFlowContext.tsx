
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
    // Only process after auth loading is complete
    if (loading) return;

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isAuthPage = location.pathname === '/auth';
    const isSuccessPage = location.pathname === '/success';
    const isHomePage = location.pathname === '/';
    
    console.log('AppFlow processing:', { 
      user: !!user, 
      hasSeenOnboarding: !!hasSeenOnboarding, 
      currentPath: location.pathname,
      loading 
    });
    
    // If user is not logged in and not on auth/success page, redirect to auth
    if (!user && !isAuthPage && !isSuccessPage) {
      console.log('User not logged in, redirecting to auth');
      navigate('/auth', { replace: true });
      return;
    }

    // If user is logged in and on auth page, redirect to home
    if (user && isAuthPage) {
      console.log('User logged in on auth page, redirecting to home');
      navigate('/', { replace: true });
      return;
    }

    // Handle onboarding for logged in users on home page
    if (user && isHomePage && !hasSeenOnboarding) {
      console.log('User logged in but first time on home, showing onboarding');
      setShouldShowOnboarding(true);
      setIsFirstTime(true);
      return;
    }

    // Set first time status
    setIsFirstTime(!hasSeenOnboarding);
  }, [user, loading, navigate, location.pathname]);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
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
