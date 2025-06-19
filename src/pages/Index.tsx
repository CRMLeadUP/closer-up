
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import OnboardingOverlay from "@/components/onboarding/OnboardingOverlay";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { startOnboarding } = useOnboarding();
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding_completed');
    if (!hasCompletedOnboarding && user) {
      setShowOnboardingPrompt(true);
    }
  }, [user]);

  // Simulating user's current plan - in real app this would come from user context/auth
  const userPlan = "free" as "free" | "premium" | "ai"; // Can be changed to "premium" or "ai" for testing

  const quickStats = [
    { value: "+5.2K", label: "Usuários", icon: Users },
    { value: "+35%", label: "Crescimento", icon: TrendingUp },
    { value: "4.8/5", label: "Avaliação", icon: Award },
    { value: "92%", label: "Conclusão", icon: Target }
  ];

  const handleCloserAIClick = () => {
    if (userPlan === "ai") {
      navigate('/assistant');
    } else {
      navigate('/plans');
    }
  };

  const handleStartOnboarding = () => {
    setShowOnboardingPrompt(false);
    startOnboarding();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <OnboardingOverlay />
      <MobileHeader />
      
      {/* Onboarding Prompt */}
      {showOnboardingPrompt && (
        <div className="fixed bottom-20 left-4 right-4 z-40 animate-slide-in-right">
          <Card className="card-glass border-sales-primary/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white text-sm">👋</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Novo por aqui?</h4>
                  <p className="text-xs text-muted-foreground">Configure sua experiência em 2 minutos</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="btn-gradient flex-1"
                  onClick={handleStartOnboarding}
                >
                  Começar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowOnboardingPrompt(false)}
                >
                  Depois
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-8">
        <div className="text-center space-y-6">
          <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
            🚀 Sua dupla perfeita para vendas
          </Badge>
          
          <h1 className="text-3xl font-bold gradient-text">
            CloserUP + CloserAI
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Treine como um profissional e tenha um consultor de vendas IA no seu bolso
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
                  <Brain className="h-6 w-6 text-white" />
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

          {/* CloserAI Card */}
          <Card 
            className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={handleCloserAIClick}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-secondary to-sales-secondary/70 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">CloserAI</CardTitle>
                    {userPlan !== "ai" && (
                      <Badge className="text-xs bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
                        R$ 34,90
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Assistente em Tempo Real</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4">
                Seu consultor de vendas pessoal que analisa conversas e sugere estratégias
              </p>
              <Button 
                className={`w-full ${
                  userPlan === "ai" 
                    ? "bg-sales-secondary hover:bg-sales-secondary/80 text-white"
                    : "btn-gradient"
                }`}
              >
                {userPlan === "ai" ? "💬 Ativar Suporte" : "🔓 Desbloquear CloserAI"}
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
