import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // Wait a moment for Stripe to process the subscription
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (!error && data) {
          setSubscriptionInfo(data);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, []);

  const getSubscriptionDetails = () => {
    if (!subscriptionInfo?.subscription_tier) return null;
    
    if (subscriptionInfo.subscription_tier === 'closerUp') {
      return {
        name: 'CloserUP Premium',
        price: 'R$ 17,90/mês',
        icon: Crown,
        color: 'sales-primary',
        description: 'Acesso completo a todos os módulos do CloserUP'
      };
    } else if (subscriptionInfo.subscription_tier === 'closerAI') {
      return {
        name: 'CloserAI',
        price: 'R$ 34,90/mês',
        icon: Brain,
        color: 'sales-success',
        description: 'Assistente de IA avançado para vendas'
      };
    }
    
    return null;
  };

  const details = getSubscriptionDetails();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-sales-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-sales-success" />
          </div>
          <CardTitle className="text-2xl gradient-text">
            Pagamento Realizado!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Processando sua assinatura...
              </p>
            </div>
          ) : details ? (
            <div className="space-y-4">
              <Badge className={`bg-${details.color}/20 text-${details.color} border-${details.color}/30`}>
                {details.name}
              </Badge>
              
              <div className="flex items-center justify-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${details.color}/20 flex items-center justify-center`}>
                  <details.icon className="h-5 w-5 text-${details.color}" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{details.name}</p>
                  <p className="text-sm text-muted-foreground">{details.price}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {details.description}
              </p>
              
              <div className="bg-sales-success/10 border border-sales-success/30 rounded-lg p-4">
                <p className="text-sm font-medium text-sales-success">
                  ✅ Assinatura ativada com sucesso!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Você já pode acessar todo o conteúdo
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Sua assinatura está sendo processada...
              </p>
              <p className="text-sm text-muted-foreground">
                Pode levar alguns minutos para ativar
              </p>
            </div>
          )}
          
          <div className="space-y-3 pt-4">
            <Button 
              className="w-full btn-gradient"
              onClick={() => navigate('/training')}
            >
              Começar Treinamento
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full glass-effect"
              onClick={() => navigate('/profile')}
            >
              Ver Perfil
            </Button>
          </div>
          
          {sessionId && (
            <p className="text-xs text-muted-foreground">
              ID da sessão: {sessionId.slice(0, 20)}...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;