import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useOnboarding } from '@/contexts/OnboardingContext';
import WelcomeStep from './WelcomeStep';
import PersonalizationStep from './PersonalizationStep';
import FeatureTourStep from './FeatureTourStep';
import ValueDemoStep from './ValueDemoStep';
import CompletionStep from './CompletionStep';

const OnboardingOverlay = () => {
  const { 
    isOnboardingActive, 
    currentStep, 
    totalSteps, 
    nextStep, 
    prevStep, 
    skipOnboarding 
  } = useOnboarding();

  if (!isOnboardingActive) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <PersonalizationStep />;
      case 2:
        return <FeatureTourStep />;
      case 3:
        return <ValueDemoStep />;
      case 4:
        return <CompletionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={skipOnboarding}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-col h-full">
        {/* Progress Bar */}
        <div className="px-4 pt-8 pb-4">
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              {currentStep + 1} de {totalSteps}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="w-full max-w-md mx-auto min-h-full flex items-center">
            <div className="w-full py-8">
              {renderStep()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-border/50">
          <div className="max-w-md mx-auto flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button
              onClick={nextStep}
              className="flex-1 btn-gradient"
            >
              {currentStep === totalSteps - 1 ? 'Finalizar' : 'Continuar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingOverlay;