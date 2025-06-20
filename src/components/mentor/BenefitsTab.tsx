import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Video, FileText, Clock, Star, Target, Users, CheckCircle, Gift } from "lucide-react";

export const BenefitsTab = () => {
  const mainBenefits = [
    {
      icon: Video,
      title: "Live Exclusiva de 1 Hora",
      description: "Sessão personalizada via Google Meet com foco total nas suas necessidades específicas",
      highlight: true
    },
    {
      icon: Brain,
      title: "Mapa Mental Personalizado",
      description: "Criado ao vivo durante nossa sessão, específico para sua estratégia de vendas",
      highlight: true
    },
    {
      icon: FileText,
      title: "Script de Vendas Exclusivo",
      description: "Roteiro personalizado baseado no seu perfil e tipo de cliente",
      highlight: true
    },
    {
      icon: Gift,
      title: "Gravação da Sessão",
      description: "Acesso permanente para revisar e aplicar todas as estratégias ensinadas",
      highlight: false
    }
  ];

  const additionalBenefits = [
    "Análise completa do seu perfil de vendas",
    "Estratégias personalizadas para seu nicho",
    "Técnicas avançadas de fechamento",
    "Como lidar com objeções específicas",
    "Estrutura de follow-up personalizada",
    "Dicas de postura e comunicação",
    "Métodos para aumentar ticket médio",
    "Estratégias de relacionamento com cliente"
  ];

  const testimonials = [
    {
      name: "Carlos S.",
      role: "Corretor de Imóveis",
      text: "Aumentei 40% minhas vendas em 2 meses. O mapa mental é incrível!",
      rating: 5
    },
    {
      name: "Marina L.",
      role: "Consultora de Seguros",
      text: "O script personalizado transformou minha abordagem. Recomendo muito!",
      rating: 5
    },
    {
      name: "Roberto F.",
      role: "Vendedor B2B",
      text: "Melhor investimento que fiz. A mentoria é realmente personalizada.",
      rating: 5
    }
  ];

  const comparison = [
    { feature: "Mentoria Personalizada", mentorup: true, others: false },
    { feature: "Mapa Mental Exclusivo", mentorup: true, others: false },
    { feature: "Script Personalizado", mentorup: true, others: false },
    { feature: "Gravação Inclusa", mentorup: true, others: false },
    { feature: "Acesso Vitalício", mentorup: true, others: false },
    { feature: "Suporte Pós-Sessão", mentorup: true, others: false }
  ];

  return (
    <div className="space-y-6">
      {/* Main Benefits */}
      <div className="space-y-4">
        {mainBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index} className={`card-glass ${benefit.highlight ? 'border-sales-primary/50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sales-primary/20 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-sales-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{benefit.title}</h3>
                      {benefit.highlight && (
                        <Badge className="bg-sales-primary/20 text-sales-primary text-xs">Exclusivo</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Benefits */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">O que você vai aprender</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {additionalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-sales-success flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">MentorUP vs Outros Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {comparison.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.feature}</span>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    {item.mentorup ? (
                      <CheckCircle className="h-4 w-4 text-sales-success mx-auto" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-muted mx-auto"></div>
                    )}
                    <span className="text-xs text-muted-foreground">MentorUP</span>
                  </div>
                  <div className="text-center">
                    {item.others ? (
                      <CheckCircle className="h-4 w-4 text-sales-success mx-auto" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-muted mx-auto"></div>
                    )}
                    <span className="text-xs text-muted-foreground">Outros</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">Depoimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border-l-2 border-sales-primary/30 pl-3">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-sales-primary text-sales-primary" />
                  ))}
                </div>
                <p className="text-sm mb-2">"{testimonial.text}"</p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold">{testimonial.name}</span> - {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Value */}
      <Card className="card-glass border-sales-primary/50">
        <CardContent className="p-4 text-center">
          <h3 className="font-bold mb-2 gradient-text">Investimento Único</h3>
          <div className="text-2xl font-bold gradient-text mb-2">R$ 47,90</div>
          <p className="text-xs text-muted-foreground mb-4">
            Valor equivalente a menos de 2 almoços para transformar sua carreira
          </p>
          <Button className="w-full btn-gradient">
            💰 Garantir Minha Vaga Agora
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};