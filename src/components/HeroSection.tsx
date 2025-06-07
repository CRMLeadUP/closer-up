
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sales-primary/20 via-sales-secondary/20 to-sales-accent/20 opacity-30"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge className="mb-6 bg-sales-primary/20 text-sales-primary border-sales-primary/30" variant="outline">
          🚀 Nova Era em Vendas com IA
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">AICloser</span> +{" "}
          <span className="gradient-text">CloseAI</span>
          <br />
          <span className="text-foreground text-4xl md:text-5xl">
            Sua dupla perfeita para vendas
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          Treine como um profissional no <strong>AICloser</strong> e tenha um consultor de vendas 
          IA no seu bolso com o <strong>CloseAI</strong>. A solução completa para multiplicar seus resultados.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="btn-gradient text-lg px-8 py-4 w-full sm:w-auto">
            🎯 Começar Treinamento Grátis
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto glass-effect">
            <Play className="mr-2 h-5 w-5" />
            Ver Demo
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-sales-success" />
            <span>+50.000 vendedores</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-sales-success" />
            <span>+300% em conversão média</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-sales-success/20 text-sales-success border-sales-success/30" variant="outline">
              ⭐ 4.9/5
            </Badge>
            <span>Avaliação dos usuários</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
