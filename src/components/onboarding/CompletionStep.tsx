import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Gift, Star, ArrowRight } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';

const CompletionStep = () => {
  const { userPreferences, completeOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    completeOnboarding();
    navigate('/training');
  };

  const handleExploreAI = () => {
    completeOnboarding();
    navigate('/plans');
  };

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="text-center space-y-4">
        <div className="relative">
          <CheckCircle className="h-16 w-16 text-sales-success mx-auto animate-pulse-success" />
          <div className="absolute -top-2 -right-2">
            <Star className="h-6 w-6 text-sales-accent animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold gradient-text">
          Parabéns, {userPreferences.name}! 🎉
        </h2>
        
        <p className="text-muted-foreground">
          Sua conta está configurada e pronta para impulsionar suas vendas
        </p>
      </div>

      {/* Welcome Gift */}
      <Card className="card-glass border-sales-success/30">
        <CardContent className="p-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Gift className="h-5 w-5 text-sales-success" />
            <Badge className="bg-sales-success/20 text-sales-success border-sales-success/30">
              Bônus de Boas-vindas
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">XP Inicial</span>
              <Badge className="bg-sales-primary/20 text-sales-primary">+500 XP</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Acesso Gratuito</span>
              <Badge className="bg-sales-success/20 text-sales-success">3 Módulos</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm">Trial CloserAI</span>
              <Badge className="bg-sales-secondary/20 text-sales-secondary">7 Dias</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-3">
        <h3 className="font-semibold text-center">Seus próximos passos:</h3>
        
        <Button 
          onClick={handleGetStarted}
          className="w-full btn-gradient text-lg py-6"
        >
          <div className="flex items-center justify-center gap-3">
            <span>🎯 Começar Treinamento</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleExploreAI}
          className="w-full glass-effect text-lg py-6"
        >
          <div className="flex items-center justify-center gap-3">
            <span>💬 Explorar CloserAI</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </Button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Dica: Comece pelos módulos básicos para maximizar seu aprendizado
        </p>
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-sales-accent fill-current" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Junte-se a +50.000 vendedores que já transformaram suas carreiras
        </p>
      </div>
    </div>
  );
};

export default CompletionStep;