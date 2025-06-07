
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  MessageSquare, 
  Target, 
  Award, 
  Zap, 
  BarChart3,
  Users,
  Crown
} from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      title: "AICloser - Treinamento Interativo",
      description: "Módulos gamificados com simulações reais, gatilhos mentais e técnicas avançadas de vendas.",
      icon: Brain,
      badge: "Treinamento",
      color: "sales-primary",
      benefits: [
        "Módulos interativos com gamificação",
        "Certificações profissionais",
        "Simulações de vendas reais",
        "Feedback personalizado com IA"
      ]
    },
    {
      title: "CloseAI - Assistente em Tempo Real",
      description: "Seu consultor de vendas pessoal que analisa conversas e sugere as melhores estratégias.",
      icon: MessageSquare,
      badge: "Assistente IA",
      color: "sales-secondary",
      benefits: [
        "Análise de conversas em tempo real",
        "Sugestões personalizadas de resposta",
        "Identificação automática de objeções",
        "Estratégias de fechamento inteligentes"
      ]
    },
    {
      title: "Gamificação Avançada",
      description: "Sistema de pontos, badges e rankings que tornam o aprendizado viciante e divertido.",
      icon: Award,
      badge: "Engajamento",
      color: "sales-accent",
      benefits: [
        "Sistema de pontos e XP",
        "Badges de conquistas",
        "Rankings competitivos",
        "Recompensas por progresso"
      ]
    },
    {
      title: "Analytics Inteligente",
      description: "Relatórios detalhados de performance com insights acionáveis para melhoria contínua.",
      icon: BarChart3,
      badge: "Insights",
      color: "sales-success",
      benefits: [
        "Dashboard de performance",
        "Análise de conversão",
        "Identificação de pontos fracos",
        "Sugestões de melhoria personalizadas"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sales-primary/20 text-sales-primary border-sales-primary/30" variant="outline">
            🔥 Funcionalidades Principais
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Tudo que você precisa para vender mais
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa que combina o melhor do treinamento em vendas 
            com assistência inteligente em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="card-glass group animate-fade-in hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color} to-${feature.color}/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className={`bg-${feature.color}/20 text-${feature.color} border-${feature.color}/30`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-primary"></div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
