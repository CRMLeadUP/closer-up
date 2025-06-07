
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock,
  Award,
  Brain,
  Calendar,
  BookOpen,
  Target
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Analytics = () => {
  const weeklyStudyTime = [
    { day: "Seg", minutes: 25, lessons: 1 },
    { day: "Ter", minutes: 45, lessons: 2 },
    { day: "Qua", minutes: 0, lessons: 0 },
    { day: "Qui", minutes: 60, lessons: 3 },
    { day: "Sex", minutes: 30, lessons: 1 },
    { day: "Sáb", minutes: 15, lessons: 1 },
    { day: "Dom", minutes: 0, lessons: 0 }
  ];

  const trainingMetrics = [
    { 
      title: "Módulos Concluídos", 
      value: "1", 
      change: "+1", 
      icon: BookOpen, 
      color: "sales-success",
      positive: true 
    },
    { 
      title: "Progresso Geral", 
      value: "8%", 
      change: "+8%", 
      icon: TrendingUp, 
      color: "sales-primary",
      positive: true 
    },
    { 
      title: "Tempo de Estudo", 
      value: "175min", 
      change: "+45min", 
      icon: Clock, 
      color: "sales-accent",
      positive: true 
    },
    { 
      title: "XP Acumulado", 
      value: "1.580", 
      change: "+240", 
      icon: Award, 
      color: "sales-secondary",
      positive: true 
    }
  ];

  const trainingActivities = [
    { action: "Quiz 'Perfil Dominante' - 85%", time: "2h atrás", type: "quiz", module: "Perfis Comportamentais" },
    { action: "Aula 'Identificando Perfis' concluída", time: "4h atrás", type: "lesson", module: "Perfis Comportamentais" },
    { action: "Aula 'Introdução aos Perfis' concluída", time: "1 dia", type: "lesson", module: "Perfis Comportamentais" },
    { action: "Módulo 'Perfis Comportamentais' iniciado", time: "2 dias", type: "module", module: "Perfis Comportamentais" }
  ];

  const moduleProgress = [
    {
      name: "Perfis Comportamentais",
      progress: 37.5,
      lessonsCompleted: 3,
      totalLessons: 8,
      timeSpent: 175,
      lastActivity: "2h atrás"
    },
    {
      name: "Gatilhos Mentais",
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
      timeSpent: 0,
      lastActivity: "Não iniciado"
    },
    {
      name: "Rapport e Conexão",
      progress: 0,
      lessonsCompleted: 0,
      totalLessons: 6,
      timeSpent: 0,
      lastActivity: "Não iniciado"
    }
  ];

  const maxMinutes = Math.max(...weeklyStudyTime.map(stat => stat.minutes));

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-sales-accent/20 text-sales-accent border-sales-accent/30">
            📚 Relatório de Treinamento
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Desempenho nos Estudos
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso nos módulos de treinamento
          </p>
        </div>

        {/* Training Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {trainingMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="card-glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`h-5 w-5 text-${metric.color}`} />
                    <span className={`text-xs ${
                      metric.positive ? 'text-sales-success' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-xl font-bold gradient-text">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Study Time Chart */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sales-primary" />
              Tempo de Estudo Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart */}
              <div className="flex items-end justify-between h-32 border-b border-white/10 pb-2">
                {weeklyStudyTime.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-6 bg-gradient-primary rounded-t"
                      style={{ height: `${maxMinutes > 0 ? (stat.minutes / maxMinutes) * 100 : 0}%` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{stat.day}</span>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-primary rounded"></div>
                  <span>Minutos de estudo</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Progress */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-sales-secondary" />
              Progresso por Módulo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleProgress.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{module.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {module.lessonsCompleted}/{module.totalLessons} aulas • {module.timeSpent}min
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{module.progress}%</div>
                      <div className="text-xs text-muted-foreground">{module.lastActivity}</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-sales-primary h-2 rounded-full" 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Training Activities */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sales-secondary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'lesson' ? 'bg-sales-primary' :
                    activity.type === 'quiz' ? 'bg-sales-success' :
                    activity.type === 'module' ? 'bg-sales-accent' :
                    'bg-sales-secondary'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.module} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Goals */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-sales-success" />
              Metas de Aprendizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Módulo Atual (3/8 aulas)</span>
                  <span>38%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-sales-success h-2 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Tempo Semanal (175/300 min)</span>
                  <span>58%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-sales-primary h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>XP Mensal (1.580/2.000)</span>
                  <span>79%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-sales-accent h-2 rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Analytics;
