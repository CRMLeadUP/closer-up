import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, MessageSquare, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeatureTourStep = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: 'CloserUP - Treinamento',
      description: 'Módulos interativos com simulações reais',
      details: [
        '🎯 Simulações de vendas realistas',
        '🏆 Sistema de conquistas e XP',
        '📊 Acompanhe seu progresso',
        '🎓 Certificados de conclusão'
      ],
      gradient: 'from-sales-primary to-sales-primary/70'
    },
    {
      icon: MessageSquare,
      title: 'CloserAI - Assistente',
      description: 'Seu consultor de vendas pessoal 24/7',
      details: [
        '💬 Respostas instantâneas sobre vendas',
        '🎯 Estratégias personalizadas',
        '📝 Scripts e objection handling',
        '🧠 Análise de conversas'
      ],
      gradient: 'from-sales-secondary to-sales-secondary/70'
    },
    {
      icon: Award,
      title: 'Gamificação Avançada',
      description: 'Torne o aprendizado divertido e envolvente',
      details: [
        '🏅 Conquistas e badges exclusivos',
        '📈 Rankings e competições',
        '🎮 Desafios semanais',
        '⭐ Sistema de níveis progressivos'
      ],
      gradient: 'from-sales-accent to-sales-success'
    },
    {
      icon: Target,
      title: 'Resultados Mensuráveis',
      description: 'Acompanhe sua evolução em tempo real',
      details: [
        '📊 Dashboard de performance',
        '📈 Métricas de conversão',
        '🎯 Metas personalizadas',
        '📋 Relatórios de progresso'
      ],
      gradient: 'from-sales-success to-sales-accent'
    }
  ];

  const currentFeatureData = features[currentFeature];
  const IconComponent = currentFeatureData.icon;

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text">
          Conheça suas ferramentas
        </h2>
        <p className="text-muted-foreground">
          Tudo que você precisa para vender mais
        </p>
      </div>

      <Card className="card-glass overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentFeatureData.gradient} flex items-center justify-center`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{currentFeatureData.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{currentFeatureData.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentFeatureData.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-sm">{detail}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feature Navigation */}
      <div className="flex justify-center gap-2">
        {features.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 rounded-full p-0 ${
              index === currentFeature
                ? 'bg-sales-primary'
                : 'bg-muted hover:bg-muted-foreground/20'
            }`}
            onClick={() => setCurrentFeature(index)}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentFeature(Math.max(0, currentFeature - 1))}
          disabled={currentFeature === 0}
          className="flex-1"
        >
          Anterior
        </Button>
        <Button
          onClick={() => setCurrentFeature(Math.min(features.length - 1, currentFeature + 1))}
          disabled={currentFeature === features.length - 1}
          className="flex-1 btn-gradient"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default FeatureTourStep;