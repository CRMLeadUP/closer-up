
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Target, 
  Trophy,
  Crown,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { PremiumGate } from "@/components/PremiumGate";
import { useSubscription } from "@/hooks/useSubscription";

const Training = () => {
  const navigate = useNavigate();
  const { hasCloserUpAccess, isLoading } = useSubscription();
  const [showContent, setShowContent] = useState(false);

  // Show content after a short delay even if still loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Show content after 1 second

    return () => clearTimeout(timer);
  }, []);

  const modules = [
    {
      id: 1,
      title: "Perfis Comportamentais",
      description: "Entenda os diferentes tipos de personalidade e como abordar cada cliente",
      icon: Users,
      lessons: 10,
      duration: "2h 30min",
      difficulty: "Iniciante",
      color: "sales-primary",
      premium: false,
      completed: false
    },
    {
      id: 2,
      title: "Técnicas de Abertura",
      description: "Domine as melhores formas de iniciar uma conversa de vendas",
      icon: MessageSquare,
      lessons: 8,
      duration: "1h 45min",
      difficulty: "Iniciante",
      color: "sales-secondary",
      premium: true,
      completed: false
    },
    {
      id: 3,
      title: "Objeções e Fechamento",
      description: "Aprenda a contornar objeções e fechar vendas com eficiência",
      icon: Target,
      lessons: 12,
      duration: "3h 15min",
      difficulty: "Intermediário",
      color: "sales-accent",
      premium: true,
      completed: false
    },
    {
      id: 4,
      title: "Vendas Consultivas",
      description: "Técnicas avançadas para vendas de alto valor agregado",
      icon: BookOpen,
      lessons: 15,
      duration: "4h 20min",
      difficulty: "Avançado",
      color: "sales-success",
      premium: true,
      completed: false
    },
    {
      id: 5,
      title: "Mestria em Vendas",
      description: "Torne-se um vendedor de elite com estratégias exclusivas",
      icon: Trophy,
      lessons: 20,
      duration: "5h 45min",
      difficulty: "Especialista",
      color: "sales-primary",
      premium: true,
      completed: false
    }
  ];

  const handleModuleClick = (module: any) => {
    if (module.premium && !hasCloserUpAccess()) {
      return;
    }
    navigate(`/training/module/${module.id}`);
  };

  const freeModule = modules.find(m => !m.premium);
  const premiumModules = modules.filter(m => m.premium);

  // Show loading only for the first second
  if (!showContent && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <div className="pt-20 pb-24 px-4 flex items-center justify-center">
          <Card className="card-glass">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-sales-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando treinamentos...</p>
            </CardContent>
          </Card>
        </div>
        <AppBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-sales-primary/20 text-sales-primary border-sales-primary/30">
            🎯 Treinamento CloserUP
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-3">
            Módulos de Treinamento
          </h1>
          <p className="text-muted-foreground text-sm">
            Desenvolva suas habilidades de vendas com nossos módulos especializados
          </p>
        </div>

        {/* Progresso Geral */}
        <Card className="card-glass mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso Geral</span>
              <span className="text-sm text-muted-foreground">
                {hasCloserUpAccess() ? "Premium Ativo" : "Acesso Limitado"}
              </span>
            </div>
            <Progress value={hasCloserUpAccess() ? 20 : 10} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{hasCloserUpAccess() ? "1 de 5 módulos" : "1 módulo gratuito"}</span>
              <span>{hasCloserUpAccess() ? "20%" : "Acesso limitado"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Módulo Gratuito */}
        {freeModule && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold">Módulo Gratuito</h2>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                Grátis
              </Badge>
            </div>
            
            <Card 
              className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => handleModuleClick(freeModule)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${freeModule.color} to-${freeModule.color}/70 flex items-center justify-center`}>
                    <freeModule.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{freeModule.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{freeModule.description}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{freeModule.lessons} aulas</span>
                  <span>•</span>
                  <span>{freeModule.duration}</span>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">
                    {freeModule.difficulty}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Módulos Premium */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Módulos Premium</h2>
            <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>

          <PremiumGate 
            requiredTier="closerUp"
            fallbackTitle="Módulos Premium CloserUP"
            fallbackDescription="Acesse todos os 4 módulos premium com técnicas avançadas de vendas por apenas R$ 17,90/mês."
          >
            <div className="space-y-4">
              {premiumModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <Card 
                    key={module.id} 
                    className="card-glass hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => handleModuleClick(module)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${module.color} to-${module.color}/70 flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                        <div className="text-center">
                          <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30 mb-2">
                            Premium
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{module.lessons} aulas</span>
                        <span>•</span>
                        <span>{module.duration}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {module.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </PremiumGate>
        </div>

        {/* CTA Premium */}
        {!hasCloserUpAccess() && (
          <Card className="card-glass mt-8 text-center">
            <CardContent className="p-6">
              <Crown className="h-12 w-12 mx-auto mb-4 text-sales-primary" />
              <h3 className="text-lg font-bold mb-2 gradient-text">
                Desbloqueie Todo o Potencial
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse todos os 5 módulos de treinamento por apenas R$ 17,90/mês
              </p>
              <Button 
                className="w-full btn-gradient"
                onClick={() => navigate('/plans')}
              >
                🚀 Upgrade para Premium
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Training;
