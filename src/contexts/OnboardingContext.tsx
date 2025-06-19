import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  isOnboardingActive: boolean;
  currentStep: number;
  totalSteps: number;
  userPreferences: {
    experience: string;
    salesGoal: string;
    name: string;
  };
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  completeOnboarding: () => void;
  updatePreferences: (preferences: Partial<OnboardingContextType['userPreferences']>) => void;
  skipOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    experience: '',
    salesGoal: '',
    name: ''
  });

  const totalSteps = 5;

  const startOnboarding = () => {
    setIsOnboardingActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingActive(false);
    localStorage.setItem('onboarding_completed', 'true');
  };

  const skipOnboarding = () => {
    setIsOnboardingActive(false);
    localStorage.setItem('onboarding_completed', 'true');
  };

  const updatePreferences = (preferences: Partial<OnboardingContextType['userPreferences']>) => {
    setUserPreferences(prev => ({ ...prev, ...preferences }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingActive,
        currentStep,
        totalSteps,
        userPreferences,
        startOnboarding,
        nextStep,
        prevStep,
        completeOnboarding,
        updatePreferences,
        skipOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};