
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
  const [hasProcessedAuth, setHasProcessedAuth] = useState(false);

  useEffect(() => {
    // Don't do anything while auth is still loading
    if (loading) return;

    // Prevent multiple navigation calls
    if (hasProcessedAuth) return;

    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const isAuthPage = location.pathname === '/auth';
    const isSuccessPage = location.pathname === '/success';
    const isHomePage = location.pathname === '/';
    
    console.log('AppFlow processing:', { 
      user: !!user, 
      hasSeenOnboarding: !!hasSeenOnboarding, 
      currentPath: location.pathname 
    });
    
    // If user is not logged in and not on auth/success page, redirect to auth
    if (!user && !isAuthPage && !isSuccessPage) {
      console.log('User not logged in, redirecting to auth');
      navigate('/auth', { replace: true });
      setHasProcessedAuth(true);
      return;
    }

    // If user is logged in
    if (user) {
      // If user is on auth page and logged in, redirect to home
      if (isAuthPage) {
        console.log('User logged in on auth page, redirecting to home');
        navigate('/', { replace: true });
        setHasProcessedAuth(true);
        return;
      }

      // If user never saw onboarding and is on home page, show onboarding
      if (!hasSeenOnboarding && isHomePage) {
        console.log('User logged in but first time on home, showing onboarding');
        setShouldShowOnboarding(true);
        setIsFirstTime(true);
        setHasProcessedAuth(true);
        return;
      }
    }

    setIsFirstTime(!hasSeenOnboarding);
    setHasProcessedAuth(true);
  }, [user, loading, navigate, location.pathname, hasProcessedAuth]);

  // Reset processing flag when location changes significantly
  useEffect(() => {
    setHasProcessedAuth(false);
  }, [location.pathname]);

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShouldShowOnboarding(false);
    setIsFirstTime(false);
    // Don't navigate here - let the component handle it
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
