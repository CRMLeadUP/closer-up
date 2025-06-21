
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare } from 'lucide-react';

const WelcomeStep = () => {
  return (
    <div className="text-center space-y-6 animate-scale-in">
      <div className="space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-primary/10 p-2 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/dd697459-b2b7-4b82-bcfa-21c96aea0ed0.png" 
              alt="CloserUP Logo" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
        
        <Badge className="bg-sales-primary/20 text-sales-primary border-sales-primary/30">
          🚀 Bem-vindo ao seu novo parceiro de vendas
        </Badge>
        
        <h1 className="text-3xl font-bold gradient-text">
          CloserUP + CloserAI
        </h1>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          Sua dupla perfeita para <strong>treinar</strong> e <strong>vender mais</strong>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-card border border-border/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-primary to-sales-primary/70 flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">CloserUP</h3>
            <p className="text-sm text-muted-foreground">Treinamento gamificado</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-card border border-border/50">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sales-secondary to-sales-secondary/70 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">CloserAI</h3>
            <p className="text-sm text-muted-foreground">Consultor IA pessoal</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Vamos configurar sua experiência em <strong>2 minutos</strong>
      </p>
    </div>
  );
};

export default WelcomeStep;
