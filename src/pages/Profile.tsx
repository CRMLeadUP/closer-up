
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
  Crown
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Profile = () => {
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
            <h2 className="text-xl font-bold gradient-text mb-1">João Silva</h2>
            <p className="text-muted-foreground text-sm mb-3">Vendedor Profissional</p>
            <Badge className="bg-sales-accent/20 text-sales-accent border-sales-accent/30">
              Plano Starter
            </Badge>
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
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect"
            onClick={() => {}}
          >
            <Crown className="h-5 w-5 mr-3 text-sales-primary" />
            Fazer Upgrade para Premium
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect"
            onClick={() => {}}
          >
            <Settings className="h-5 w-5 mr-3" />
            Configurações
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect"
            onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Ajuda e Suporte
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start glass-effect text-red-400 border-red-400/30 hover:bg-red-400/10"
            onClick={() => {}}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair da Conta
          </Button>
        </div>

        {/* Upgrade CTA */}
        <Card className="card-glass mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2 gradient-text">
              Acelere seu crescimento
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Desbloqueie todos os recursos e turbine suas vendas
            </p>
            <Button className="w-full btn-gradient">
              👑 Upgrade Premium - R$ 29,90/mês
            </Button>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Profile;
