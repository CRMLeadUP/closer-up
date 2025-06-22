
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Award, 
  TrendingUp, 
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  CreditCard,
  Shield
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const { subscribed, subscription_tier, hasCloserUpAccess, hasMentorUpAccess, isLoading: subLoading } = useSubscription();

  const getSubscriptionBadge = () => {
    if (subLoading) {
      return <Badge className="bg-muted/20 text-muted-foreground">Carregando...</Badge>;
    }
    
    if (!subscribed) {
      return <Badge className="bg-sales-accent/20 text-sales-accent border-sales-accent/30">Plano Gratuito</Badge>;
    }
    
    if (subscription_tier === 'mentorup') {
      return <Badge className="bg-sales-success/20 text-sales-success border-sales-success/30">MentorUP Premium</Badge>;
    }
    
    if (subscription_tier === 'closerUp') {
      return <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">CloserUP Premium</Badge>;
    }
    
    return <Badge className="bg-muted/20 text-muted-foreground">Plano Desconhecido</Badge>;
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) {
        toast({
          title: "Erro",
          description: error.message || "Não foi possível acessar o portal de assinaturas",
          variant: "destructive"
        });
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Erro",
        description: "Não foi possível acessar o portal de assinaturas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const achievements = [
    { name: "Primeiro Módulo", icon: "🎯", earned: true },
    { name: "Vendedor Ativo", icon: "⚡", earned: true },
    { name: "Expert em Gatilhos", icon: "🧠", earned: false },
    { name: "Master Closer", icon: "👑", earned: false }
  ];

  const stats = [
    { label: "XP Total", value: "1.580", icon: Award },
    { label: "Módulos Completos", value: "2/5", icon: TrendingUp },
    { label: "Tempo de Estudo", value: "12h", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Profile Header */}
        <Card className="card-glass mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-bold gradient-text mb-1">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}
            </h2>
            <p className="text-muted-foreground text-sm mb-3">
              {isAdmin ? 'Administrador' : 'Vendedor Profissional'}
            </p>
            <div className="flex justify-center gap-2">
              {getSubscriptionBadge()}
              {isAdmin && (
                <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="card-glass">
                <CardContent className="p-4 text-center">
                  <IconComponent className="h-5 w-5 mx-auto mb-2 text-sales-primary" />
                  <div className="text-lg font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-sales-success" />
              Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.earned 
                      ? 'bg-sales-success/20 border-sales-success/30' 
                      : 'bg-muted/20 border-muted/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className={`text-xs ${
                    achievement.earned ? 'text-sales-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          {isAdmin && (
            <Button 
              variant="outline" 
              className="w-full justify-start glass-effect border-sales-primary/30 text-sales-primary hover:bg-sales-primary/10"
              onClick={() => navigate('/admin')}
            >
              <Shield className="h-5 w-5 mr-3" />
              Painel Administrativo
            </Button>
          )}
          
          {!subscribed && (
            <Button 
              variant="outline" 
              className="w-full justify-start glass-effect"
              onClick={() => navigate('/plans')}
            >
              <Crown className="h-5 w-5 mr-3 text-sales-primary" />
              Fazer Upgrade para Premium
            </Button>
          )}
          
          {subscribed && (
            <Button 
              variant="outline" 
              className="w-full justify-start glass-effect"
              onClick={handleManageSubscription}
              disabled={isLoading}
            >
              <CreditCard className="h-5 w-5 mr-3" />
              {isLoading ? "Carregando..." : "Gerenciar Assinatura"}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5 mr-3" />
            Configurações
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect"
            onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Ajuda e Suporte
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect text-red-400 border-red-400/30 hover:bg-red-400/10"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair da Conta
          </Button>
        </div>

        {/* Upgrade CTA - Só mostra se não estiver inscrito ou puder fazer upgrade */}
        {(!subscribed || (subscription_tier === 'closerUp' && !hasMentorUpAccess())) && (
          <Card className="card-glass mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold mb-2 gradient-text">
                {!subscribed ? 'Acelere seu crescimento' : 'Evolua para o MentorUP'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {!subscribed 
                  ? 'Desbloqueie todos os recursos e turbine suas vendas'
                  : 'Upgrade para MentorUP e tenha mentoria personalizada exclusiva'
                }
              </p>
              <Button 
                className="w-full btn-gradient"
                onClick={() => navigate(!subscribed ? '/plans' : '/mentorup')}
              >
                {!subscribed 
                  ? '👑 Upgrade Premium - R$ 17,90/mês'
                  : '📅 Upgrade MentorUP - R$ 47,90/sessão'
                }
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Profile;
