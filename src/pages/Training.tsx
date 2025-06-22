
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Zap,
  Heart,
  Target,
  TrendingUp,
  Star,
  Trophy,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  Crown,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { useSubscription } from "@/hooks/useSubscription";

const Training = () => {
  const navigate = useNavigate();
  const { hasCloserUpAccess, hasMentorUpAccess, subscription_tier, isLoading: subLoading } = useSubscription();

  // Determine user plan based on subscription
  const getUserPlan = () => {
    if (hasMentorUpAccess()) return "mentor";
    if (hasCloserUpAccess()) return "premium";
    return "free";
  };

  const userPlan = getUserPlan();

  const modules = [
    {
      id: "1",
      title: "Perfis Comportamentais",
      description: "Identifique e adapte estratégias ao perfil do cliente",
      icon: Users,
      totalLessons: 10,
      completedLessons: 7,
      duration: "3h 15min",
      level: "Iniciante",
      xpReward: 250,
      color: "from-blue-500 to-blue-600",
      isLocked: false,
      price: "Grátis",
      planRequired: "free" as const
    },
    {
      id: "2",
      title: "Gatilhos Mentais",
      description: "Técnicas de persuasão e construção de urgência",
      icon: Zap,
      totalLessons: 12,
      completedLessons: 4,
      duration: "3h 45min",
      level: "Intermediário",
      xpReward: 300,
      color: "from-purple-500 to-purple-600",
      isLocked: userPlan === "free",
      price: "R$ 17,90",
      planRequired: "premium" as const
    },
    {
      id: "3",
      title: "Rapport e Conexão",
      description: "Como criar conexão e confiança com o cliente",
      icon: Heart,
      totalLessons: 6,
      completedLessons: 2,
      duration: "2h 15min",
      level: "Iniciante",
      xpReward: 200,
      color: "from-pink-500 to-pink-600",
      isLocked: userPlan === "free",
      price: "R$ 17,90",
      planRequired: "premium" as const
    },
    {
      id: "4",
      title: "Quebra de Objeções",
      description: "Respostas práticas para situações comuns",
      icon: Target,
      totalLessons: 10,
      completedLessons: 0,
      duration: "4h 20min",
      level: "Avançado",
      xpReward: 350,
      color: "from-orange-500 to-orange-600",
      isLocked: userPlan === "free",
      price: "R$ 17,90",
      planRequired: "premium" as const
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
      color: "from-green-500 to-green-600",
      isLocked: userPlan === "free",
      price: "R$ 17,90",
      planRequired: "premium" as const
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

  const handleModuleClick = (module: any) => {
    if (module.isLocked) {
      navigate('/plans');
    } else {
      navigate(`/training/module/${module.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-16 pb-20">
        {/* Header Section */}
        <div className="px-4 py-6 text-center">
          <Badge className="mb-3 bg-sales-primary/20 text-sales-primary border-sales-primary/30 text-xs">
            🎓 Plataforma de Treinamento
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Treinamento CloserUP
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Desenvolva suas habilidades de vendas com nossos módulos especializados
          </p>
        </div>

        {/* Current Plan */}
        <div className="px-4 mb-6">
          <Card className="card-glass border border-sales-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sales-accent/10 flex items-center justify-center">
                    <span className="text-sm">
                      {userPlan === "free" ? "🆓" : userPlan === "premium" ? "👑" : "📅"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      Plano {userPlan === "free" ? "Gratuito" : userPlan === "premium" ? "Premium" : "MentorUP"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {userPlan === "free" ? "1 módulo disponível" : userPlan === "premium" ? "Acesso completo" : "Acesso + MentorUP"}
                    </p>
                  </div>
                </div>
                {userPlan === "free" && (
                  <Button size="sm" className="btn-gradient text-xs px-3 py-1.5 h-auto" onClick={() => navigate('/plans')}>
                    Upgrade
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="px-4 mb-8">
          <div className="grid grid-cols-4 gap-2">
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold gradient-text">{stats.totalXP}</div>
                <div className="text-xs text-muted-foreground">XP</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-sales-warning">{stats.streak}</div>
                <div className="text-xs text-muted-foreground">Dias</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-sales-success">{stats.coursesCompleted}</div>
                <div className="text-xs text-muted-foreground">Completos</div>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-sales-accent">{stats.averageScore}%</div>
                <div className="text-xs text-muted-foreground">Média</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modules Section */}
        <div className="px-4 mb-8">
          <h2 className="text-lg font-bold mb-4">Módulos de Treinamento</h2>
          <div className="space-y-3">
            {modules.map((module) => {
              const progress = (module.completedLessons / module.totalLessons) * 100;
              const IconComponent = module.icon;
              
              return (
                <Card 
                  key={module.id}
                  className="card-glass hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                  onClick={() => handleModuleClick(module)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center relative flex-shrink-0`}>
                        <IconComponent className="h-5 w-5 text-white" />
                        {module.isLocked && (
                          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                            <Lock className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-sm truncate">{module.title}</h3>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-auto">
                                {module.level}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                              {module.description}
                            </p>
                            
                            {/* Module Info */}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                              <span>{module.totalLessons} aulas</span>
                              <span>{module.duration}</span>
                              <span>+{module.xpReward} XP</span>
                            </div>
                            
                            {/* Progress or Lock Info */}
                            {module.isLocked ? (
                              <div className="flex items-center gap-2">
                                <Badge className="text-xs bg-sales-warning/20 text-sales-warning border-sales-warning/30 px-2 py-1">
                                  {module.price}
                                </Badge>
                                <Crown className="h-3 w-3 text-sales-primary" />
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Progresso</span>
                                  <span className="font-medium">{module.completedLessons}/{module.totalLessons}</span>
                                </div>
                                <Progress value={progress} className="h-1.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex-shrink-0 self-start">
                        <Button size="sm" className="btn-gradient text-xs px-3 py-1.5 h-auto">
                          {module.isLocked ? (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Desbloquear
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              {progress > 0 ? "Continuar" : "Começar"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* MentorUP Section */}
        <div className="px-4 mb-8">
          <h2 className="text-lg font-bold mb-4">MentorUP - Mentoria Personalizada</h2>
          <Card className="card-glass hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                onClick={() => userPlan !== "mentor" ? navigate('/mentorup') : navigate('/mentorup')}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center relative flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-white" />
                  {userPlan !== "mentor" && (
                    <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                      <Lock className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">MentorUP</h3>
                    <Badge className="text-xs bg-gradient-to-r from-sales-success to-sales-primary text-white px-2 py-1">
                      📅 1:1
                    </Badge>
                    {userPlan !== "mentor" && (
                      <Badge className="text-xs bg-sales-success/20 text-sales-success border-sales-success/30 px-2 py-1">
                        R$ 47,90
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Sessões personalizadas de 1 hora com estratégias exclusivas
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>• Live personalizada</span>
                    <span>• Mapa mental</span>
                    <span>• Script exclusivo</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0 self-start">
                  <Button size="sm" className="btn-gradient text-xs px-3 py-1.5 h-auto">
                    {userPlan !== "mentor" ? (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Agendar
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Usar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="px-4">
          <h2 className="text-lg font-bold mb-4">Conquistas</h2>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className={`card-glass ${achievement.unlocked ? '' : 'opacity-50'}`}>
                  <CardContent className="p-3 text-center">
                    <IconComponent className={`h-5 w-5 mx-auto mb-2 ${
                      achievement.unlocked ? 'text-sales-warning' : 'text-muted-foreground'
                    }`} />
                    <div className="text-xs font-medium">{achievement.title}</div>
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
