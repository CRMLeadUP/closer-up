
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Zap, Users } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Plano Básico",
      price: "Grátis",
      description: "Perfeito para começar sua jornada em vendas",
      icon: Zap,
      badge: "Mais Popular",
      badgeColor: "sales-accent",
      features: [
        "Acesso ao CloserUP (módulos básicos)",
        "3 módulos de treinamento",
        "Sistema de gamificação básico",
        "Certificado de conclusão",
        "Suporte por email",
        "Comunidade online"
      ],
      cta: "Começar Grátis",
      highlight: false
    },
    {
      name: "Plano Premium",
      price: "R$ 29,90",
      priceSubtext: "/mês",
      description: "Solução completa para vendedores profissionais",
      icon: Crown,
      badge: "Recomendado",
      badgeColor: "sales-primary",
      features: [
        "Acesso completo ao CloserUP",
        "CloserAI - Assistente em tempo real",
        "Todos os módulos de treinamento",
        "Gamificação avançada com rankings",
        "Análises detalhadas de performance",
        "Integração com CRMs",
        "Suporte prioritário 24/7",
        "Relatórios personalizados"
      ],
      cta: "Fazer Upgrade",
      highlight: true
    },
    {
      name: "Plano Corporativo",
      price: "Customizado",
      description: "Para equipes que querem resultados excepcionais",
      icon: Users,
      badge: "Enterprise",
      badgeColor: "sales-success",
      features: [
        "Tudo do plano Premium",
        "Dashboard para gestores",
        "Análise de equipe completa",
        "Treinamentos personalizados",
        "Onboarding dedicado",
        "API para integrações",
        "Suporte dedicado",
        "Consultoria em vendas"
      ],
      cta: "Falar com Vendas",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sales-success/20 text-sales-success border-sales-success/30" variant="outline">
            💰 Preços Transparentes
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Planos que se adaptam ao seu crescimento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o plano ideal para seus objetivos. Comece grátis e faça upgrade 
            quando quiser escalar seus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.highlight 
                    ? 'card-glass scale-105 ring-2 ring-sales-primary/50 success-glow' 
                    : 'card-glass hover:scale-105'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${plan.badgeColor} to-${plan.badgeColor}/70 flex items-center justify-center`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={`mb-4 bg-${plan.badgeColor}/20 text-${plan.badgeColor} border-${plan.badgeColor}/30`}
                  >
                    {plan.badge}
                  </Badge>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.priceSubtext && (
                      <span className="text-muted-foreground ml-1">{plan.priceSubtext}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-sales-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.highlight 
                        ? 'btn-gradient text-lg py-3' 
                        : 'bg-card hover:bg-muted border border-border text-lg py-3'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            🔒 Garantia de 30 dias ou seu dinheiro de volta
          </p>
          <p className="text-sm text-muted-foreground">
            Sem taxas ocultas • Cancele quando quiser • Suporte brasileiro
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
