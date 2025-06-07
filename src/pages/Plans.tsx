
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Zap, Users } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Plans = () => {
  const plans = [
    {
      name: "Starter",
      price: "Grátis",
      description: "Perfeito para começar sua jornada",
      icon: Zap,
      badge: "Gratuito",
      badgeColor: "sales-accent",
      features: [
        "Acesso básico ao AICloser",
        "3 módulos introdutórios",
        "Gamificação básica",
        "Certificado de conclusão",
        "Suporte por email"
      ],
      cta: "Começar Grátis",
      highlight: false,
      current: true
    },
    {
      name: "Profissional",
      price: "R$ 29,90",
      priceSubtext: "/mês",
      description: "Para vendedores que querem resultados",
      icon: Crown,
      badge: "Mais Popular",
      badgeColor: "sales-primary",
      features: [
        "Acesso completo ao AICloser",
        "CloseAI com 10 interações/mês",
        "Todos os módulos de treinamento",
        "Gamificação avançada",
        "Análises de performance",
        "Suporte prioritário"
      ],
      cta: "Fazer Upgrade",
      highlight: true,
      current: false
    },
    {
      name: "Executivo",
      price: "R$ 59,90",
      priceSubtext: "/mês",
      description: "Solução completa para profissionais",
      icon: Users,
      badge: "Premium",
      badgeColor: "sales-success",
      features: [
        "Tudo do plano Profissional",
        "CloseAI ilimitado",
        "Simuladores avançados",
        "Relatórios detalhados",
        "Integração com CRMs",
        "Consultoria personalizada"
      ],
      cta: "Escolher Executivo",
      highlight: false,
      current: false
    }
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
            Comece grátis e faça upgrade quando quiser
          </p>
        </div>

        {/* Current Plan */}
        <Card className="card-glass mb-6 border-sales-accent/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Plano Atual</h3>
                <p className="text-sm text-muted-foreground">Starter (Gratuito)</p>
              </div>
              <Badge className="bg-sales-accent/20 text-sales-accent border-sales-accent/30">
                Ativo
              </Badge>
            </div>
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
                        : 'bg-card hover:bg-muted border border-border'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? '✓ Plano Atual' : plan.cta}
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
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
            >
              💬 Falar com Vendas
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
