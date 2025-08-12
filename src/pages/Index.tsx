
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
  Users,
  Play
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import WebHeader from "@/components/WebHeader";
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

  // APENAS mostrar loading se realmente estiver carregando
  if (loading) {
    console.log('Showing loading spinner');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-sales-primary border-t-transparent"></div>
      </div>
    );
  }

  // SEMPRE renderizar o dashboard - onboarding temporariamente desabilitado
  console.log('Rendering main dashboard content');
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Headers - Mobile e Web */}
      <div className="mobile-only">
        <MobileHeader />
      </div>
      <WebHeader />
      
      {/* Main Content */}
      <main className="web-container">
        {/* Banner Ad no topo - Mobile */}
        <div className="mobile-only px-4 pt-20">
          <AdManager 
            adType="banner" 
            className="mb-4"
            onAdLoaded={() => console.log('Banner ad loaded')}
            onAdError={(error) => console.error('Banner ad error:', error)}
          />
        </div>
        
        {/* Hero Section */}
        <section className="hero-section mobile-only">
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

        {/* Hero Section - Desktop */}
        <section className="hero-section web-only mt-8">
          <div className="text-center space-y-8">
            <Badge className="text-lg px-6 py-2 bg-sales-primary/20 text-sales-primary border-sales-primary/30">
              🚀 Nova Era em Vendas com IA
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">CloserUP</span> + <span className="gradient-text">MentorUP</span>
              <br />
              <span className="text-3xl md:text-4xl text-muted-foreground">
                Sua dupla perfeita para vendas
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Treine como um profissional no <strong>CloserUP</strong> e tenha mentoria 
              personalizada exclusiva no <strong>MentorUP</strong>. A solução completa para multiplicar seus resultados.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="btn-gradient text-lg px-8 py-4 w-full sm:w-auto" onClick={() => navigate('/training')}>
                🎯 Começar Treinamento Grátis
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto glass-effect">
                <Play className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="pb-8 mobile-only px-4">
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

        {/* Quick Stats - Desktop */}
        <section className="pb-12 web-only">
          <div className="stats-grid">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="card-glass text-center hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <IconComponent className="h-8 w-8 mx-auto mb-3 text-sales-primary" />
                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Ad Banner entre seções - Mobile */}
        <section className="mobile-only px-4 pb-4">
          <AdManager 
            adType="banner" 
            className="mb-4"
            onAdLoaded={() => console.log('Mid-section banner loaded')}
          />
        </section>

        {/* Main Features - Mobile */}
        <section className="pb-8 mobile-only px-4">
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

        {/* Main Features - Desktop */}
        <section className="pb-12 web-only">
          <h2 className="text-3xl font-bold mb-8 text-center">Escolha sua ferramenta</h2>
          
          <div className="feature-grid">
            {/* CloserUP Card */}
            <Card 
              className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate('/training')}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sales-primary to-sales-primary/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">CloserUP</CardTitle>
                    <p className="text-lg text-muted-foreground">Treinamento Interativo</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 text-lg">
                  Módulos gamificados com simulações reais e técnicas avançadas de vendas para se tornar um closer profissional
                </p>
                <Button className="w-full btn-gradient text-lg py-3">
                  🎯 Iniciar Treinamento Grátis
                </Button>
              </CardContent>
            </Card>

            {/* MentorUP Card */}
            <Card 
              className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={handleMentorUPClick}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sales-secondary to-sales-secondary/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-8 w-8 text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">MentorUP</CardTitle>
                      <Badge className="text-sm px-3 py-1 bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
                        R$ 47,90
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">Mentoria Personalizada</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-6 text-lg">
                  1 hora de mentoria exclusiva com especialista + mapa mental personalizado + script de vendas customizado
                </p>
                <Button className="w-full btn-gradient text-lg py-3">
                  🎯 Agendar Mentoria Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section - Mobile */}
        <section className="mobile-only px-4 pb-24">
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

        {/* CTA Section - Desktop */}
        <section className="web-only pb-16">
          <Card className="card-glass text-center max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4 gradient-text">
                Pronto para multiplicar suas vendas?
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Comece grátis hoje e transforme sua carreira em vendas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Button 
                    size="lg"
                    className="btn-gradient text-lg px-8 py-4"
                    onClick={() => navigate('/plans')}
                  >
                    Ver Planos Premium
                  </Button>
                ) : (
                  <Button 
                    size="lg"
                    className="btn-gradient text-lg px-8 py-4"
                    onClick={() => navigate('/auth')}
                  >
                    Começar Grátis Agora
                  </Button>
                )}
                <Button 
                  size="lg"
                  variant="outline" 
                  className="text-lg px-8 py-4 glass-effect"
                  onClick={() => window.open('https://wa.me/5511999484196', '_blank')}
                >
                  📞 Falar com Especialista
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <div className="mobile-only">
        <AppBottomNav />
      </div>
    </div>
  );
};

export default Index;
