
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Users, 
  Target, 
  MessageSquare, 
  Award,
  PlayCircle,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Training = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 1,
      title: "Perfis Comportamentais",
      description: "Identifique e adapte estratégias ao perfil do cliente",
      icon: Users,
      progress: 25,
      status: "in-progress",
      lessons: 8,
      duration: "2h 30min",
      isFree: true
    },
    {
      id: 2,
      title: "Gatilhos Mentais",
      description: "Técnicas de persuasão e construção de urgência",
      icon: Brain,
      progress: 0,
      status: "locked",
      lessons: 12,
      duration: "3h 45min",
      isFree: false
    },
    {
      id: 3,
      title: "Rapport e Conexão",
      description: "Como criar conexão e confiança com o cliente",
      icon: MessageSquare,
      progress: 0,
      status: "locked",
      lessons: 6,
      duration: "2h 15min",
      isFree: false
    },
    {
      id: 4,
      title: "Quebra de Objeções",
      description: "Respostas práticas para situações comuns",
      icon: Target,
      progress: 0,
      status: "locked",
      lessons: 10,
      duration: "4h 20min",
      isFree: false
    },
    {
      id: 5,
      title: "Estratégias de Fechamento",
      description: "Métodos avançados para finalizar vendas",
      icon: Award,
      progress: 0,
      status: "locked",
      lessons: 15,
      duration: "5h 10min",
      isFree: false
    }
  ];

  const getStatusIcon = (status: string, progress: number) => {
    if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-sales-success" />;
    if (status === "in-progress") return <PlayCircle className="h-5 w-5 text-sales-primary" />;
    if (status === "locked") return <Lock className="h-5 w-5 text-muted-foreground" />;
    return <PlayCircle className="h-5 w-5 text-sales-accent" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "sales-success";
    if (status === "in-progress") return "sales-primary";
    if (status === "locked") return "muted";
    return "sales-accent";
  };

  const handleModuleClick = (moduleId: number, status: string, isFree: boolean) => {
    if (status !== "locked" && isFree) {
      navigate(`/training/module/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-sales-primary/20 text-sales-primary border-sales-primary/30">
            🎯 AICloser Training
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Treinamento Avançado
          </h1>
          <p className="text-muted-foreground">
            Desenvolva suas habilidades de vendas com módulos interativos
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="card-glass mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Progresso Geral</h3>
                <p className="text-sm text-muted-foreground">8% completo</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">1.580</div>
                <div className="text-xs text-muted-foreground">XP ganhos</div>
              </div>
            </div>
            <Progress value={8} className="h-2" />
          </CardContent>
        </Card>

        {/* Free Module Notice */}
        <Card className="card-glass mb-6 border border-sales-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sales-primary/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-sales-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sales-primary">Módulo Gratuito Disponível</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse o módulo de Perfis Comportamentais gratuitamente
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Modules */}
        <div className="space-y-4">
          {modules.map((module) => {
            const IconComponent = module.icon;
            const statusColor = getStatusColor(module.status);
            const isLocked = !module.isFree;
            
            return (
              <Card 
                key={module.id} 
                className={`card-glass transition-all duration-300 ${
                  module.isFree ? 'hover:scale-105 cursor-pointer' : 'opacity-60'
                } ${module.isFree ? 'border-sales-primary/20' : ''}`}
                onClick={() => handleModuleClick(module.id, module.status, module.isFree)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${statusColor} to-${statusColor}/70 flex items-center justify-center relative`}>
                      <IconComponent className="h-6 w-6 text-white" />
                      {module.isFree && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-sales-success rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {module.isFree && <Badge className="text-xs bg-sales-success">GRÁTIS</Badge>}
                        {getStatusIcon(module.status, module.progress)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {module.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{module.lessons} aulas</span>
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                {module.progress > 0 && module.isFree && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  </CardContent>
                )}
                
                <CardContent className="pt-2">
                  <Button 
                    className={`w-full ${
                      module.isFree
                        ? module.status === "completed" 
                          ? 'bg-sales-success hover:bg-sales-success/80' 
                          : 'btn-gradient'
                        : 'bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                    disabled={!module.isFree}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleClick(module.id, module.status, module.isFree);
                    }}
                  >
                    {module.isFree ? (
                      module.status === "completed" ? "✓ Revisitar" : 
                      module.status === "in-progress" ? "▶ Continuar" : "🚀 Iniciar"
                    ) : (
                      "🔒 Premium"
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Card */}
        <Card className="card-glass mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2 gradient-text">
              Desbloqueie todos os módulos
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade para Premium e acelere seu aprendizado com mais 4 módulos completos
            </p>
            <Button className="w-full btn-gradient" onClick={() => navigate('/plans')}>
              👑 Fazer Upgrade - R$ 29,90/mês
            </Button>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Training;
