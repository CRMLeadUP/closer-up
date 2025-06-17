
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Zap, Users, Brain } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Plans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async (plan: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan }
      });

      if (error) {
        toast({
          title: "Erro no checkout",
          description: error.message || "Ocorreu um erro ao processar o pagamento",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Erro no checkout",
        description: "Não foi possível iniciar o processo de pagamento",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const plans = [
    {
      name: "Gratuito",
      price: "Grátis",
      description: "Perfeito para começar sua jornada",
      icon: Zap,
      badge: "Atual",
      badgeColor: "sales-accent",
      features: [
        "Módulo 'Perfis Comportamentais' completo",
        "10 aulas de alta qualidade",
        "Certificado de conclusão",
        "Gamificação básica",
        "Suporte por email"
      ],
      cta: "Plano Atual",
      highlight: false,
      current: true
    },
    {
      name: "Premium",
      price: "R$ 17,90",
      priceSubtext: "/mês",
      description: "Acesso completo a todo conteúdo do CloserUP",
      icon: Crown,
      badge: "Mais Popular",
      badgeColor: "sales-primary",
      features: [
        "Todo o conteúdo do CloserUP",
        "Todos os 5 módulos de treinamento",
        "50+ aulas especializadas",
        "Simuladores práticos",
        "Quizzes interativos",
        "Certificados profissionais",
        "Gamificação avançada",
        "Relatórios de progresso",
        "Suporte prioritário"
      ],
      cta: "Começar Premium",
      highlight: true,
      current: false
    },
    {
      name: "CloserAI",
      price: "R$ 34,90",
      priceSubtext: "/mês",
      description: "Assistente de IA avançado para vendas",
      icon: Brain,
      badge: "IA Avançada",
      badgeColor: "sales-success",
      features: [
        "CloserAI - Assistente inteligente completo",
        "Análise de conversas em tempo real",
        "Sugestões personalizadas de resposta",
        "Relatórios de IA detalhados",
        "Coaching automatizado",
        "Integração com CRMs",
        "Automação de follow-ups",
        "Suporte 24/7 especializado"
      ],
      cta: "Ativar CloserAI",
      highlight: false,
      current: false
    }
  ];

  const moduleBreakdown = [
    { name: "Perfis Comportamentais", plan: "Gratuito", color: "sales-success" },
    { name: "Gatilhos Mentais", plan: "Premium", color: "sales-primary" },
    { name: "Rapport e Conexão", plan: "Premium", color: "sales-primary" },
    { name: "Quebra de Objeções", plan: "Premium", color: "sales-primary" },
    { name: "Estratégias de Fechamento", plan: "Premium", color: "sales-primary" },
    { name: "CloserAI", plan: "CloserAI", color: "sales-success" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-sales-success/20 text-sales-success border-sales-success/30">
            💰 Planos e Preços
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Escolha seu plano
          </h1>
          <p className="text-muted-foreground">
            Comece grátis e evolua conforme sua necessidade
          </p>
        </div>

        {/* Module Breakdown */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg">O que cada plano inclui</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moduleBreakdown.map((module, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{module.name}</span>
                <Badge className={`text-xs bg-${module.color}/20 text-${module.color} border-${module.color}/30`}>
                  {module.plan}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.highlight 
                    ? 'card-glass ring-2 ring-sales-primary/50 success-glow' 
                    : 'card-glass'
                } ${plan.current ? 'opacity-75' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${plan.badgeColor} to-${plan.badgeColor}/70 flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`bg-${plan.badgeColor}/20 text-${plan.badgeColor} border-${plan.badgeColor}/30`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                    {plan.priceSubtext && (
                      <span className="text-muted-foreground ml-1">{plan.priceSubtext}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-sales-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                   <Button 
                    className={`w-full ${
                      plan.current
                        ? 'bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed'
                        : plan.highlight 
                        ? 'btn-gradient' 
                        : plan.name === 'CloserAI' 
                        ? 'btn-gradient'
                        : 'bg-card hover:bg-muted border border-border'
                    }`}
                    disabled={plan.current || isLoading}
                    onClick={() => {
                      if (plan.name === "Premium") {
                        handleCheckout("closerUp");
                      } else if (plan.name === "CloserAI") {
                        handleCheckout("closerAI");
                      }
                    }}
                  >
                    {isLoading ? "Processando..." : plan.current ? '✓ Plano Atual' : plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Corporate Plan CTA */}
        <Card className="card-glass mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2 gradient-text">
              Plano Corporativo
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Soluções personalizadas para equipes comerciais
            </p>
            <Button 
              variant="outline" 
              className="w-full glass-effect"
              onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
            >
              📞 +5511999484196
            </Button>
          </CardContent>
        </Card>

        {/* Guarantee */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            🔒 Garantia de 30 dias ou seu dinheiro de volta
          </p>
          <p className="text-xs text-muted-foreground">
            Sem taxas ocultas • Cancele quando quiser
          </p>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Plans;
