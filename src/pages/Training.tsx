
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  Users, 
  MessageSquare,
  TrendingUp,
  Star,
  Trophy,
  BookOpen,
  Play,
  CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Training = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: "1",
      title: "Perfis Comportamentais",
      description: "Identifique e adapte estratégias ao perfil do cliente",
      icon: Brain,
      totalLessons: 10,
      completedLessons: 7,
      duration: "3h 15min",
      level: "Iniciante",
      xpReward: 250,
      color: "sales-primary",
      isLocked: false
    },
    {
      id: "2",
      title: "Gatilhos Mentais",
      description: "Técnicas de persuasão e construção de urgência",
      icon: Target,
      totalLessons: 12,
      completedLessons: 4,
      duration: "3h 45min",
      level: "Intermediário",
      xpReward: 300,
      color: "sales-secondary",
      isLocked: false
    },
    {
      id: "3",
      title: "Rapport e Conexão",
      description: "Como criar conexão e confiança com o cliente",
      icon: Users,
      totalLessons: 6,
      completedLessons: 2,
      duration: "2h 15min",
      level: "Iniciante",
      xpReward: 200,
      color: "sales-accent",
      isLocked: false
    },
    {
      id: "4",
      title: "Quebra de Objeções",
      description: "Respostas práticas para situações comuns",
      icon: MessageSquare,
      totalLessons: 10,
      completedLessons: 0,
      duration: "4h 20min",
      level: "Avançado",
      xpReward: 350,
      color: "sales-warning",
      isLocked: false
    },
    {
      id: "5",
      title: "Estratégias de Fechamento",
      description: "Técnicas para finalizar vendas com sucesso",
      icon: TrendingUp,
      totalLessons: 8,
      completedLessons: 0,
      duration: "2h 50min",
      level: "Intermediário",
      xpReward: 280,
      color: "sales-success",
      isLocked: false
    }
  ];

  const achievements = [
    { title: "Primeiro Módulo", icon: Trophy, unlocked: true },
    { title: "Especialista em Perfis", icon: Star, unlocked: false },
    { title: "Mestre em Vendas", icon: BookOpen, unlocked: false }
  ];

  const stats = {
    totalXP: 850,
    streak: 7,
    coursesCompleted: 1,
    averageScore: 89
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        {/* Header */}
        <div className="px-4 mb-6">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-sales-primary/20 text-sales-primary border-sales-primary/30">
              🎓 Plataforma de Treinamento
            </Badge>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Treinamento CloserUP
            </h1>
            <p className="text-muted-foreground">
              Desenvolva suas habilidades de vendas com nossos módulos especializados
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-2xl font-bold gradient-text">{stats.totalXP}</div>
                <div className="text-xs text-muted-foreground">XP Total</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-2xl font-bold text-sales-warning">{stats.streak}</div>
                <div className="text-xs text-muted-foreground">Dias Seguidos</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-2xl font-bold text-sales-success">{stats.coursesCompleted}</div>
                <div className="text-xs text-muted-foreground">Concluídos</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-2xl font-bold text-sales-accent">{stats.averageScore}%</div>
                <div className="text-xs text-muted-foreground">Média</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modules */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Módulos de Treinamento</h2>
          <div className="space-y-4">
            {modules.map((module) => {
              const progress = (module.completedLessons / module.totalLessons) * 100;
              const IconComponent = module.icon;
              
              return (
                <Card 
                  key={module.id}
                  className="card-glass hover:scale-105 cursor-pointer transition-all duration-200"
                  onClick={() => navigate(`/training/module/${module.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${module.color} to-${module.color}/70 flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {module.level}
                          </Badge>
                          {progress === 100 && (
                            <CheckCircle2 className="h-4 w-4 text-sales-success" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {module.description}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{module.totalLessons} aulas</span>
                            <span>{module.duration}</span>
                            <span>+{module.xpReward} XP</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>{module.completedLessons}/{module.totalLessons}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm" className="btn-gradient">
                        <Play className="h-4 w-4 mr-1" />
                        {progress > 0 ? "Continuar" : "Começar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="px-4">
          <h2 className="text-xl font-bold mb-4">Conquistas</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className={`card-glass ${achievement.unlocked ? '' : 'opacity-50'}`}>
                  <CardContent className="p-3 text-center">
                    <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                      achievement.unlocked ? 'text-sales-warning' : 'text-muted-foreground'
                    }`} />
                    <div className="text-xs font-semibold">{achievement.title}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Training;
