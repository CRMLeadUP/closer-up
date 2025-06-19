import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Clock, BarChart3, Sparkles } from "lucide-react";

const insights = [
  { label: "IA Ativada", value: "✨", icon: Brain, color: "sales-success" },
  { label: "Tempo Médio", value: "12min", icon: Clock, color: "sales-primary" },
  { label: "Análises Hoje", value: "3", icon: BarChart3, color: "sales-accent" }
];

export const AssistantHeader = () => {
  return (
    <div className="px-4 mb-6 animate-fade-in">
      <div className="text-center mb-6">
        <Badge className="mb-4 bg-gradient-to-r from-sales-secondary/20 to-sales-accent/20 text-sales-secondary border-sales-secondary/30 
                       hover:from-sales-secondary/30 hover:to-sales-accent/30 transition-all duration-300 
                       shadow-lg hover:shadow-xl hover:scale-105">
          <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
          CloserAI Assistant
        </Badge>
        <h1 className="text-3xl font-bold gradient-text mb-3 animate-scale-in">
          Assistente IA Avançado
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
          Seu consultor inteligente para vendas, análises e estratégias comerciais
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Card key={index} className="card-glass hover:scale-105 transition-all duration-300 
                                      hover:shadow-lg group cursor-pointer border-0 
                                      bg-gradient-to-br from-background/80 to-muted/30">
              <CardContent className="p-4 text-center">
                <div className="bg-gradient-to-r from-sales-primary/10 to-sales-accent/10 
                              rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center
                              group-hover:from-sales-primary/20 group-hover:to-sales-accent/20 
                              transition-all duration-300">
                  <IconComponent className="h-5 w-5 text-sales-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xl font-bold gradient-text mb-1">{insight.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{insight.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};