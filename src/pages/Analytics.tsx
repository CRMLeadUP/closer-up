
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock,
  Award,
  Users,
  Calendar
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Analytics = () => {
  const weeklyStats = [
    { day: "Seg", sales: 3, time: 45 },
    { day: "Ter", sales: 5, time: 60 },
    { day: "Qua", sales: 2, time: 30 },
    { day: "Qui", sales: 7, time: 90 },
    { day: "Sex", sales: 4, time: 55 },
    { day: "Sáb", sales: 1, time: 15 },
    { day: "Dom", sales: 0, time: 0 }
  ];

  const metrics = [
    { 
      title: "Vendas Este Mês", 
      value: "22", 
      change: "+15%", 
      icon: Target, 
      color: "sales-success",
      positive: true 
    },
    { 
      title: "Taxa de Conversão", 
      value: "68%", 
      change: "+12%", 
      icon: TrendingUp, 
      color: "sales-primary",
      positive: true 
    },
    { 
      title: "Tempo Médio", 
      value: "18min", 
      change: "-3min", 
      icon: Clock, 
      color: "sales-accent",
      positive: true 
    },
    { 
      title: "XP Ganho", 
      value: "1.580", 
      change: "+240", 
      icon: Award, 
      color: "sales-secondary",
      positive: true 
    }
  ];

  const recentActivities = [
    { action: "Módulo 'Gatilhos Mentais' concluído", time: "2h atrás", type: "training" },
    { action: "Venda fechada com CloseAI", time: "4h atrás", type: "sale" },
    { action: "Quiz 'Perfis Comportamentais' - 90%", time: "1 dia", type: "quiz" },
    { action: "Badge 'Vendedor Ativo' conquistado", time: "2 dias", type: "achievement" }
  ];

  const maxSales = Math.max(...weeklyStats.map(stat => stat.sales));

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-sales-accent/20 text-sales-accent border-sales-accent/30">
            📊 Analytics Dashboard
          </Badge>
          <h1 className="text-2xl font-bold gradient-text mb-2">
            Seus Relatórios
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {metrics.map((metric, index) => {
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

        {/* Weekly Performance Chart */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sales-primary" />
              Performance Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart */}
              <div className="flex items-end justify-between h-32 border-b border-white/10 pb-2">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-6 bg-gradient-primary rounded-t"
                      style={{ height: `${(stat.sales / maxSales) * 100}%` }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{stat.day}</span>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gradient-primary rounded"></div>
                  <span>Vendas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sales-secondary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'training' ? 'bg-sales-primary' :
                    activity.type === 'sale' ? 'bg-sales-success' :
                    activity.type === 'quiz' ? 'bg-sales-accent' :
                    'bg-sales-secondary'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-sales-success" />
              Metas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Vendas (22/30)</span>
                  <span>73%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-sales-success h-2 rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Módulos (2/5)</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-sales-primary h-2 rounded-full" style={{ width: '40%' }}></div>
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
