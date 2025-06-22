import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Star, Video, FileText, Brain, CheckCircle } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { MentorHeader } from "@/components/mentor/MentorHeader";
import { BookingTab } from "@/components/mentor/BookingTab";
import { BenefitsTab } from "@/components/mentor/BenefitsTab";

const MentorUP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    console.log('=== INICIANDO CHECKOUT MENTORUP ===');
    console.log('Timestamp:', new Date().toISOString());
    
    if (!user || !session) {
      console.log('ERRO: Usuário não autenticado');
      toast({
        title: "Login necessário",
        description: "Faça login para agendar sua mentoria",
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
      tokenLength: session.access_token.length
    });

    setIsLoading(true);

    try {
      // Preparar dados para o checkout
      const checkoutData = { plan: 'mentorup' };
      console.log('Dados do checkout preparados:', checkoutData);
      
      console.log('Fazendo chamada para edge function...');
      console.log('Headers que serão enviados:', {
        'Authorization': `Bearer ${session.access_token.substring(0, 20)}...`,
        'Content-Type': 'application/json'
      });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: checkoutData,
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta recebida da edge function:', {
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
          description: "Você será redirecionado para o checkout do Stripe..."
        });
        
        // Redirecionamento direto e imediato
        console.log('Iniciando redirecionamento...');
        setTimeout(() => {
          console.log('Executando redirecionamento para:', data.url);
          window.location.href = data.url;
        }, 500);
        
      } else {
        console.error('ERRO: URL não recebida');
        console.log('Dados completos recebidos:', data);
        
        toast({
          title: "Erro no checkout",
          description: "Não foi possível obter a URL de pagamento. Tente novamente.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('ERRO CRÍTICO no checkout:', error);
      console.error('Tipo do erro:', typeof error);
      console.error('Detalhes completos:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'N/A',
        name: error instanceof Error ? error.name : 'Unknown'
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

  const features = [
    {
      icon: Video,
      title: "Live Personalizada de 1 hora",
      description: "Sessão exclusiva via Google Meet com foco total em suas necessidades"
    },
    {
      icon: Brain,
      title: "Mapa Mental Exclusivo",
      description: "Criado ao vivo durante nossa sessão, personalizado para sua estratégia"
    },
    {
      icon: FileText,
      title: "Script de Vendas Personalizado",
      description: "Roteiro específico para seu perfil e tipo de venda"
    },
    {
      icon: CheckCircle,
      title: "Gravação da Sessão",
      description: "Acesso permanente para revisar e aplicar as estratégias"
    }
  ];

  const results = [
    "Aumento médio de 35% na taxa de conversão",
    "Redução de 50% no tempo de fechamento",
    "Scripts personalizados que realmente funcionam",
    "Estratégias exclusivas baseadas em sua personalidade"
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        <MentorHeader />

        <div className="px-4">
          {/* Hero Section */}
          <section className="mb-8">
            <div className="text-center space-y-4">
              <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
                🎯 Mentoria Personalizada
              </Badge>
              
              <h1 className="text-2xl font-bold gradient-text">
                MentorUP Premium
              </h1>
              
              <p className="text-muted-foreground">
                1 hora de mentoria exclusiva + materiais personalizados
              </p>
              
              <div className="flex items-center justify-center gap-2 text-lg font-bold">
                <span className="text-2xl gradient-text">R$ 47,90</span>
                <span className="text-sm text-muted-foreground">por sessão</span>
              </div>
            </div>
          </section>

          {/* Quick Features */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="card-glass">
                    <CardContent className="p-4 text-center">
                      <IconComponent className="h-8 w-8 mx-auto mb-2 text-sales-primary" />
                      <h3 className="text-sm font-semibold mb-1">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Tabs */}
          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="booking" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agendar
              </TabsTrigger>
              <TabsTrigger value="benefits" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Benefícios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="booking">
              <BookingTab />
            </TabsContent>

            <TabsContent value="benefits">
              <BenefitsTab />
            </TabsContent>
          </Tabs>

          {/* Results Section */}
          <section className="mt-8">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="text-center gradient-text">
                  Resultados dos Mentorados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
                      <span className="text-sm">{result}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Final */}
          <section className="mt-8">
            <Card className="card-glass text-center">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 gradient-text">
                  Pronto para multiplicar seus resultados?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Agende sua sessão personalizada agora
                </p>
                <Button 
                  className="w-full btn-gradient mb-3"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processando checkout...
                    </div>
                  ) : (
                    "🚀 Agendar Mentoria - R$ 47,90"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full glass-effect"
                  onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
                >
                  💬 Tirar Dúvidas pelo WhatsApp
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default MentorUP;
