import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Target, BarChart3, Sparkles, Brain, TrendingUp } from "lucide-react";

export const ToolsTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6">
        <Card className="card-glass hover:scale-105 transition-all duration-300 
                       hover:shadow-xl group border-0 
                       bg-gradient-to-br from-background/80 to-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-sales-primary/10 to-sales-accent/10 
                            rounded-xl p-3 group-hover:from-sales-primary/20 
                            group-hover:to-sales-accent/20 transition-all duration-300">
                <FileText className="h-6 w-6 text-sales-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 gradient-text">
                  Gerador de Scripts
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Crie scripts personalizados e persuasivos para diferentes situações de venda com IA avançada
                </p>
                <Button className="btn-gradient w-full h-12 shadow-lg hover:shadow-xl 
                                 hover:scale-105 transition-all duration-300">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Criar Script Personalizado
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass hover:scale-105 transition-all duration-300 
                       hover:shadow-xl group border-0 
                       bg-gradient-to-br from-background/80 to-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-sales-secondary/10 to-sales-accent/10 
                            rounded-xl p-3 group-hover:from-sales-secondary/20 
                            group-hover:to-sales-accent/20 transition-all duration-300">
                <Target className="h-6 w-6 text-sales-secondary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 gradient-text">
                  Simulador de Vendas
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Pratique diferentes cenários e técnicas de vendas com simulações realistas de IA
                </p>
                <Button variant="outline" className="w-full h-12 bg-gradient-to-r from-background/80 to-muted/40 
                                                  border-0 shadow-lg hover:shadow-xl
                                                  hover:scale-105 transition-all duration-300
                                                  hover:from-sales-secondary/10 hover:to-sales-accent/10">
                  <Brain className="h-4 w-4 mr-2" />
                  Iniciar Simulação
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glass hover:scale-105 transition-all duration-300 
                       hover:shadow-xl group border-0 
                       bg-gradient-to-br from-background/80 to-muted/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-sales-accent/10 to-sales-primary/10 
                            rounded-xl p-3 group-hover:from-sales-accent/20 
                            group-hover:to-sales-primary/20 transition-all duration-300">
                <BarChart3 className="h-6 w-6 text-sales-accent group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 gradient-text">
                  Análise de Performance
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Avalie suas métricas comerciais e receba insights personalizados para melhorar resultados
                </p>
                <Button variant="outline" className="w-full h-12 bg-gradient-to-r from-background/80 to-muted/40 
                                                  border-0 shadow-lg hover:shadow-xl
                                                  hover:scale-105 transition-all duration-300
                                                  hover:from-sales-accent/10 hover:to-sales-primary/10">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analisar Performance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};