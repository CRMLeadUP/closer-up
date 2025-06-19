import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

const ValueDemoStep = () => {
  const { userPreferences } = useOnboarding();
  const [selectedDemo, setSelectedDemo] = useState<'training' | 'ai' | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleDemoSelect = (type: 'training' | 'ai') => {
    setSelectedDemo(type);
    // Simular carregamento da demo
    setTimeout(() => {
      setShowResults(true);
    }, 1500);
  };

  const getPersonalizedContent = () => {
    const { experience, salesGoal, name } = userPreferences;
    
    if (experience === 'iniciante') {
      return {
        training: 'Módulo: Primeiros Passos em Vendas',
        ai: 'Como iniciar uma conversa de vendas eficaz'
      };
    } else if (experience === 'avancado') {
      return {
        training: 'Módulo: Técnicas Avançadas de Close',
        ai: 'Estratégias para superar objeções complexas'
      };
    }
    
    return {
      training: 'Módulo: Técnicas de Persuasão',
      ai: 'Como aumentar sua taxa de conversão'
    };
  };

  const personalizedContent = getPersonalizedContent();

  if (showResults && selectedDemo) {
    return (
      <div className="space-y-6 animate-scale-in">
        <div className="text-center space-y-2">
          <CheckCircle className="h-12 w-12 text-sales-success mx-auto" />
          <h2 className="text-2xl font-bold gradient-text">
            Perfeito, {userPreferences.name}!
          </h2>
          <p className="text-muted-foreground">
            Veja como isso pode transformar suas vendas
          </p>
        </div>

        <Card className="card-glass">
          <CardContent className="p-6 space-y-4">
            {selectedDemo === 'training' ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="h-6 w-6 text-sales-primary" />
                  <h3 className="font-semibold">Simulação Concluída</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-sales-success/20 rounded-lg">
                    <span className="text-sm">Taxa de Conversão</span>
                    <Badge className="bg-sales-success/20 text-sales-success">+40%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-sales-primary/20 rounded-lg">
                    <span className="text-sm">XP Ganho</span>
                    <Badge className="bg-sales-primary/20 text-sales-primary">+250 XP</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-sales-accent/20 rounded-lg">
                    <span className="text-sm">Nível Atual</span>
                    <Badge className="bg-sales-accent/20 text-sales-accent">Vendedor Bronze</Badge>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-6 w-6 text-sales-secondary" />
                  <h3 className="font-semibold">Consulta IA Concluída</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="p-3 bg-muted/30 rounded-lg">
                    "Com base no seu perfil, recomendo usar a técnica SPIN Selling 
                    para identificar dores específicas do cliente..."
                  </p>
                  <div className="flex items-center gap-2 text-sales-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>3 estratégias personalizadas geradas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sales-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>Script de follow-up criado</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Isso é apenas o começo. Imagine o que você pode alcançar com acesso completo!
          </p>
          <div className="flex items-center justify-center gap-2 text-sales-primary">
            <span className="text-sm font-medium">Pronto para começar?</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">
          Vamos testar juntos!
        </h2>
        <p className="text-muted-foreground">
          Escolha uma experiência para ver o poder das ferramentas
        </p>
      </div>

      <div className="space-y-4">
        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedDemo === 'training' ? 'ring-2 ring-sales-primary' : ''
          }`}
          onClick={() => handleDemoSelect('training')}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-primary to-sales-primary/70 flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Demo CloserUP</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {personalizedContent.training}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              className="w-full btn-gradient"
              disabled={selectedDemo !== null && selectedDemo !== 'training'}
            >
              {selectedDemo === 'training' ? '⏳ Carregando...' : '🎯 Iniciar Simulação'}
            </Button>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedDemo === 'ai' ? 'ring-2 ring-sales-secondary' : ''
          }`}
          onClick={() => handleDemoSelect('ai')}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-secondary to-sales-secondary/70 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Demo CloserAI</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {personalizedContent.ai}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              className="w-full bg-sales-secondary hover:bg-sales-secondary/80 text-white"
              disabled={selectedDemo !== null && selectedDemo !== 'ai'}
            >
              {selectedDemo === 'ai' ? '⏳ Consultando...' : '💬 Fazer Pergunta'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        * Demonstração personalizada baseada no seu perfil
      </p>
    </div>
  );
};

export default ValueDemoStep;