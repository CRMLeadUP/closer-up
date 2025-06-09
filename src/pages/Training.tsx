
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
  CheckCircle2
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
      lessons: 10,
      duration: "3h 15min",
      isFree: true
    },
    {
      id: 2,
      title: "Gatilhos Mentais",
      description: "Técnicas de persuasão e construção de urgência",
      icon: Brain,
      progress: 0,
      status: "available",
      lessons: 12,
      duration: "3h 45min",
      isFree: true
    },
    {
      id: 3,
      title: "Rapport e Conexão",
      description: "Como criar conexão e confiança com o cliente",
      icon: MessageSquare,
      progress: 0,
      status: "available",
      lessons: 6,
      duration: "2h 15min",
      isFree: true
    },
    {
      id: 4,
      title: "Quebra de Objeções",
      description: "Respostas práticas para situações comuns",
      icon: Target,
      progress: 0,
      status: "available",
      lessons: 10,
      duration: "4h 20min",
      isFree: true
    },
    {
      id: 5,
      title: "Estratégias de Fechamento",
      description: "Métodos avançados para finalizar vendas",
      icon: Award,
      progress: 0,
      status: "available",
      lessons: 15,
      duration: "5h 10min",
      isFree: true
    }
  ];

  const getStatusIcon = (status: string, progress: number) => {
    if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-sales-success" />;
    if (status === "in-progress") return <PlayCircle className="h-5 w-5 text-sales-primary" />;
    return <PlayCircle className="h-5 w-5 text-sales-accent" />;
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "sales-success";
    if (status === "in-progress") return "sales-primary";
    return "sales-accent";
  };

  const handleModuleClick = (moduleId: number, status: string, isFree: boolean) => {
    if (isFree) {
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

        {/* All Modules Available Notice */}
        <Card className="card-glass mb-6 border border-sales-success/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sales-success/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-sales-success" />
              </div>
              <div>
                <h3 className="font-semibold text-sales-success">Todos os Módulos Disponíveis</h3>
                <p className="text-sm text-muted-foreground">
                  Acesse todos os módulos de treinamento gratuitamente
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
            
            return (
              <Card 
                key={module.id} 
                className="card-glass transition-all duration-300 hover:scale-105 cursor-pointer border-sales-primary/20"
                onClick={() => handleModuleClick(module.id, module.status, module.isFree)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${statusColor} to-${statusColor}/70 flex items-center justify-center relative`}>
                      <IconComponent className="h-6 w-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-sales-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <Badge className="text-xs bg-sales-success">DISPONÍVEL</Badge>
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
                
                {module.progress > 0 && (
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
                      module.status === "completed" 
                        ? 'bg-sales-success hover:bg-sales-success/80' 
                        : 'btn-gradient'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleClick(module.id, module.status, module.isFree);
                    }}
                  >
                    {module.status === "completed" ? "✓ Revisitar" : 
                     module.status === "in-progress" ? "▶ Continuar" : "🚀 Iniciar"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Training;
