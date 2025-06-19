
import { TrendingUp, Users, Award, Target } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      value: "+5.200",
      label: "Usuários Ativos",
      icon: Users,
      color: "sales-primary"
    },
    {
      value: "+35%",
      label: "Crescimento Médio",
      icon: TrendingUp,
      color: "sales-success"
    },
    {
      value: "4.8/5",
      label: "Avaliação dos Usuários",
      icon: Award,
      color: "sales-accent"
    },
    {
      value: "92%",
      label: "Taxa de Conclusão",
      icon: Target,
      color: "sales-secondary"
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-${stat.color} to-${stat.color}/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
