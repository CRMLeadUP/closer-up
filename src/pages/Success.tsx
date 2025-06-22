
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Crown, Brain } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { subscribed, subscription_tier, subscription_end, checkSubscription } = useSubscription();
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        console.log('Success page loaded, checking subscription status...');
        
        // Aguardar um momento para o Stripe processar
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Verificar status da assinatura
        await checkSubscription();
        
        console.log('Subscription verification completed');
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [checkSubscription]);

  const getSubscriptionDetails = () => {
    if (!subscription_tier) return null;
    
    if (subscription_tier === 'closerUp') {
      return {
        name: 'CloserUP Premium',
        price: 'R$ 17,90/mês',
        icon: Crown,
        color: 'sales-primary',
        description: 'Acesso completo a todos os módulos do CloserUP'
      };
    } else if (subscription_tier === 'mentorup') {
      return {
        name: 'MentorUP',
        price: 'R$ 47,90/sessão',
        icon: Brain,
        color: 'sales-success',
        description: 'Mentoria personalizada exclusiva'
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
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-sales-primary border-t-transparent mx-auto"></div>
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
                  <details.icon className={`h-5 w-5 text-${details.color}`} />
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
                  Você já pode acessar todo o conteúdo premium
                </p>
              </div>
            </div>
          ) : subscribed ? (
            <div className="space-y-4">
              <div className="bg-sales-success/10 border border-sales-success/30 rounded-lg p-4">
                <p className="text-sm font-medium text-sales-success">
                  ✅ Pagamento confirmado!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sua assinatura está ativa
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
              🎯 Começar Treinamento
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full glass-effect"
              onClick={() => navigate('/')}
            >
              🏠 Ir para Início
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
