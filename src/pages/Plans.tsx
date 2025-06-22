import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Zap, Users, Brain, Star, Sparkles, ArrowRight, Shield } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Plans = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session, user } = useAuth();

  const handleCheckout = async (plan: string) => {
    console.log('=== INICIANDO CHECKOUT PLANS ===');
    console.log('Plano selecionado:', plan);
    console.log('Timestamp:', new Date().toISOString());
    
    if (!session || !user) {
      console.log('ERRO: Usuário não autenticado');
      toast({
        title: "Login necessário",
        description: "Faça login para continuar com a compra",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!session.access_token) {
      console.log('ERRO: Token de acesso não encontrado');
      toast({
        title: "Erro de autenticação",
        description: "Token de acesso não encontrado. Faça login novamente.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    console.log('Usuário autenticado:', {
      userId: user.id,
      email: user.email,
      plan,
      tokenLength: session.access_token.length
    });

    setIsLoading(true);
    
    try {
      // Preparar dados do checkout
      const checkoutData = { plan };
      console.log('Dados preparados para checkout:', checkoutData);
      
      console.log('Invocando edge function create-checkout...');
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: checkoutData,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta da edge function:', {
        data,
        error,
        timestamp: new Date().toISOString()
      });

      if (error) {
        console.error('ERRO retornado pela edge function:', error);
        
        let errorMessage = "Erro no checkout";
        
        if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        } else if (error.code) {
          errorMessage = `Erro ${error.code}: ${error.details || 'Tente novamente'}`;
        }
        
        toast({
          title: "Erro no checkout",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        console.log('URL do checkout recebida:', data.url);
        console.log('SessionId:', data.sessionId);
        
        toast({
          title: "Redirecionando para pagamento",
          description: "Você será redirecionado para o Stripe..."
        });
        
        // Redirecionamento direto
        console.log('Executando redirecionamento...');
        setTimeout(() => {
          console.log('Redirecionando para:', data.url);
          window.location.href = data.url;
        }, 500);
        
      } else {
        console.error('ERRO: URL não recebida');
        console.log('Dados completos:', data);
        
        toast({
          title: "Erro no checkout",
          description: "Não foi possível obter a URL de pagamento. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('ERRO CRÍTICO no checkout:', error);
      console.error('Detalhes do erro:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'N/A',
        type: typeof error
      });
      
      toast({
        title: "Erro no checkout",
        description: "Erro interno. Tente novamente em alguns segundos.",
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
      name: "MentorUP",
      price: "R$ 47,90",
      priceSubtext: "/sessão",
      description: "Mentoria personalizada 1:1 com estratégias exclusivas",
      icon: Brain,
      badge: "Mentoria Premium",
      badgeColor: "sales-success",
      features: [
        "MentorUP - Sessão personalizada de 1 hora",
        "Mapa mental criado ao vivo",
        "Script de vendas personalizado",
        "Gravação da sessão para consulta",
        "Estratégias exclusivas para seu perfil",
        "Google Meet com link por email",
        "Suporte direto via WhatsApp",
        "Garantia de satisfação total"
      ],
      cta: "Agendar MentorUP",
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
    { name: "MentorUP", plan: "MentorUP", color: "sales-success" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Badge className="mb-4 btn-gradient text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
            Planos e Preços
          </Badge>
          <h1 className="text-3xl font-bold gradient-text mb-3 animate-scale-in">
            Escolha seu plano ideal
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
            Comece grátis e evolua suas vendas com nossos treinamentos especializados
          </p>
        </div>

        {/* Module Breakdown */}
        <Card className="card-glass mb-8 shadow-xl border-0 bg-gradient-to-br from-background/90 to-muted/40 animate-fade-in">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="bg-gradient-to-r from-sales-primary/20 to-sales-accent/20 
                            rounded-full p-2">
                <Star className="h-5 w-5 text-sales-primary" />
              </div>
              O que você terá em cada plano
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {moduleBreakdown.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-3 
                                       rounded-xl bg-gradient-to-r from-background/50 to-muted/30
                                       hover:from-sales-primary/10 hover:to-sales-accent/10
                                       transition-all duration-300 hover:scale-[1.02]">
                <span className="text-sm font-medium">{module.name}</span>
                <Badge className="text-xs btn-gradient text-white border-0 shadow-sm">
                  {module.plan}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Plans */}
        <div className="space-y-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-500 hover:scale-[1.02] 
                          animate-fade-in shadow-xl border-0 
                          ${plan.highlight 
                            ? 'bg-gradient-to-br from-sales-primary/5 via-background/90 to-sales-accent/5 ring-2 ring-sales-primary/30 shadow-sales-primary/20' 
                            : 'bg-gradient-to-br from-background/90 to-muted/40'
                          } ${plan.current ? 'opacity-80' : 'hover:shadow-2xl'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Popular Badge */}
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full">
                    <div className="bg-gradient-to-r from-sales-primary via-sales-accent to-sales-primary h-1"></div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                  bg-gradient-to-r from-sales-primary to-sales-accent 
                                  text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-lg">
                      <Star className="h-3 w-3 inline mr-1" />
                      MAIS POPULAR
                    </div>
                  </div>
                )}
                
                <CardHeader className={`pb-6 ${plan.highlight ? 'pt-8' : 'pt-6'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg 
                                   group-hover:scale-110 transition-transform duration-300
                                   ${plan.name === 'Gratuito' 
                                     ? 'bg-gradient-to-br from-green-500 to-green-600' 
                                     : plan.name === 'Premium'
                                     ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                     : 'bg-gradient-to-br from-purple-500 to-purple-600'
                                   }`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="btn-gradient text-white border-0 shadow-sm hover:scale-105 transition-transform duration-300">
                      {plan.badge}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <CardTitle className="text-2xl gradient-text">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      {plan.priceSubtext && (
                        <span className="text-muted-foreground text-lg">{plan.priceSubtext}</span>
                      )}
                    </div>
                    {plan.priceSubtext && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Cancele quando quiser
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-8">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} 
                           className="flex items-start gap-3 p-2 rounded-lg
                                    hover:bg-muted/30 transition-all duration-200"
                           style={{ animationDelay: `${(index * 150) + (featureIndex * 50)}ms` }}>
                        <div className="bg-gradient-to-r from-sales-success/20 to-sales-success/30 
                                      rounded-full p-1 mt-0.5">
                          <CheckCircle2 className="h-3 w-3 text-sales-success" />
                        </div>
                        <span className="text-sm leading-relaxed flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full h-12 text-sm font-semibold transition-all duration-300 ${
                      plan.current
                        ? 'bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed'
                        : plan.highlight 
                        ? 'btn-gradient shadow-lg hover:shadow-xl hover:scale-105' 
                         : plan.name === 'MentorUP' 
                         ? 'btn-gradient shadow-lg hover:shadow-xl hover:scale-105'
                         : 'bg-gradient-to-r from-background/80 to-muted/60 border border-border hover:from-sales-primary/10 hover:to-sales-accent/10 hover:scale-105 shadow-md hover:shadow-lg'
                     }`}
                     disabled={plan.current || isLoading}
                     onClick={() => {
                       console.log('Botão clicado para plano:', plan.name);
                       if (plan.name === "Premium") {
                         handleCheckout("closerUp");
                       } else if (plan.name === "MentorUP") {
                         navigate('/mentorup');
                       }
                     }}
                   >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Processando...
                      </div>
                    ) : plan.current ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Plano Atual
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {plan.cta}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Corporate Plan CTA */}
        <Card className="mt-10 shadow-xl border-0 bg-gradient-to-br from-background/90 to-muted/40 
                       hover:scale-[1.02] transition-all duration-300 animate-fade-in">
          <CardContent className="p-8 text-center">
            <div className="bg-gradient-to-r from-sales-accent/20 to-sales-primary/20 
                          rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-sales-accent" />
            </div>
            <h3 className="text-xl font-bold gradient-text mb-3">
              Plano Corporativo
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
              Soluções personalizadas e treinamentos especializados para equipes comerciais de alto desempenho
            </p>
            <Button 
              className="btn-gradient w-full h-12 shadow-lg hover:shadow-xl 
                       hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
            >
              <div className="flex items-center gap-2">
                <span>Falar com Especialista</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Guarantee */}
        <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-sales-success/5 to-sales-accent/5 
                       animate-fade-in">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="bg-gradient-to-r from-sales-success/20 to-sales-success/30 
                            rounded-full p-2">
                <Shield className="h-5 w-5 text-sales-success" />
              </div>
              <h4 className="font-semibold text-sales-success">Garantia Total</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              30 dias para testar sem riscos ou seu dinheiro de volta
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>✓ Sem taxas ocultas</span>
              <span>•</span>
              <span>✓ Cancele quando quiser</span>
              <span>•</span>
              <span>✓ Suporte especializado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Plans;
