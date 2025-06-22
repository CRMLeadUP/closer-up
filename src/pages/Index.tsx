
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  User,
  Menu,
  X,
  Target,
  Award,
  TrendingUp,
  Users
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import AdManager from "@/components/AdManager";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAppFlow } from "@/contexts/AppFlowContext";
import OnboardingOverlay from "@/components/onboarding/OnboardingOverlay";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { startOnboarding } = useOnboarding();
  const { shouldShowOnboarding } = useAppFlow();

  console.log('Index render - user:', user?.email, 'loading:', loading, 'shouldShowOnboarding:', shouldShowOnboarding);

  const quickStats = [
    { value: "+5.2K", label: "Usuários", icon: Users },
    { value: "+35%", label: "Crescimento", icon: TrendingUp },
    { value: "4.8/5", label: "Avaliação", icon: Award },
    { value: "92%", label: "Conclusão", icon: Target }
  ];

  const handleMentorUPClick = () => {
    navigate('/mentorup');
  };

  // Loading muito simples - apenas mostrar spinner
  if (loading) {
    console.log('Showing loading spinner');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-sales-primary border-t-transparent"></div>
      </div>
    );
  }

  // Renderizar onboarding apenas se necessário E não estiver carregando
  if (!loading && shouldShowOnboarding) {
    console.log('Showing onboarding overlay');
    return <OnboardingOverlay />;
  }

  // Sempre renderizar o conteúdo principal se não estiver em loading
  console.log('Rendering main dashboard content');
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileHeader />
      
      {/* Banner Ad no topo */}
      <div className="px-4 pt-20">
        <AdManager 
          adType="banner" 
          className="mb-4"
          onAdLoaded={() => console.log('Banner ad loaded')}
          onAdError={(error) => console.error('Banner ad error:', error)}
        />
      </div>
      
      {/* Hero Section */}
      <section className="px-4 pt-4 pb-8">
        <div className="text-center space-y-6">
          <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
            🚀 Sua dupla perfeita para vendas
          </Badge>
          
          <h1 className="text-3xl font-bold gradient-text">
            CloserUP + MentorUP
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Treine como um profissional e tenha mentoria personalizada exclusiva
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="card-glass text-center">
                <CardContent className="p-4">
                  <IconComponent className="h-6 w-6 mx-auto mb-2 text-sales-primary" />
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Ad Banner entre seções */}
      <section className="px-4 pb-4">
        <AdManager 
          adType="banner" 
          className="mb-4"
          onAdLoaded={() => console.log('Mid-section banner loaded')}
        />
      </section>

      {/* Main Features */}
      <section className="px-4 pb-8">
        <h2 className="text-xl font-bold mb-6 text-center">Escolha sua ferramenta</h2>
        
        <div className="space-y-4">
          {/* CloserUP Card */}
          <Card 
            className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/training')}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-primary to-sales-primary/70 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-yellow-300" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">CloserUP</CardTitle>
                  <p className="text-sm text-muted-foreground">Treinamento Interativo</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Módulos gamificados com simulações reais e técnicas avançadas de vendas
              </p>
              <Button className="w-full btn-gradient">
                🎯 Iniciar Treinamento
              </Button>
            </CardContent>
          </Card>

          {/* MentorUP Card */}
          <Card 
            className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={handleMentorUPClick}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-secondary to-sales-secondary/70 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-cyan-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">MentorUP</CardTitle>
                    <Badge className="text-xs bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
                      R$ 47,90
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Mentoria Personalizada</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                1 hora de mentoria exclusiva + mapa mental + script personalizado
              </p>
              <Button className="w-full btn-gradient">
                🎯 Agendar Mentoria
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-24">
        <Card className="card-glass text-center">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2 gradient-text">
              Pronto para vender mais?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comece grátis e upgrade quando quiser
            </p>
            {user ? (
              <Button 
                className="w-full btn-gradient mb-3"
                onClick={() => navigate('/plans')}
              >
                Ver Planos
              </Button>
            ) : (
              <Button 
                className="w-full btn-gradient mb-3"
                onClick={() => navigate('/auth')}
              >
                Começar Grátis
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full glass-effect"
              onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
            >
              📞 Falar com Especialista
            </Button>
          </CardContent>
        </Card>
      </section>

      <AppBottomNav />
    </div>
  );
};

export default Index;
