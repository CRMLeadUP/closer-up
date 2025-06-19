import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, PhoneCall, FileText, Target, Lightbulb, Brain, Copy, Check } from "lucide-react";
import { useTextAnalysis } from "@/hooks/useTextAnalysis";

export const AnalysisTab = () => {
  const {
    analysisText,
    setAnalysisText,
    analysisResult,
    analysisLoading,
    copiedAnalysis,
    analyzeText,
    copyToClipboard
  } = useTextAnalysis();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="card-glass shadow-xl border-0 bg-gradient-to-br from-background/90 to-muted/40">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-sales-accent/20 to-sales-secondary/20 
                          rounded-full p-2">
              <BarChart3 className="h-5 w-5 text-sales-accent" />
            </div>
            Análise de Conversas e Scripts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="relative">
            <Textarea
              placeholder="Cole aqui o texto da conversa, script ou qualquer conteúdo comercial para análise IA..."
              value={analysisText}
              onChange={(e) => setAnalysisText(e.target.value)}
              className="min-h-40 border-0 bg-background/50 focus:bg-background/80 
                       transition-all duration-300 shadow-inner resize-none
                       placeholder:text-muted-foreground/60"
            />
            {analysisText && (
              <div className="absolute bottom-3 right-3">
                <Badge variant="secondary" className="text-xs">
                  {analysisText.length} caracteres
                </Badge>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => analyzeText('call_analysis')}
              disabled={analysisLoading}
              className="btn-gradient h-12 shadow-lg hover:shadow-xl 
                       hover:scale-105 transition-all duration-300
                       disabled:opacity-50 disabled:hover:scale-100"
            >
              {analysisLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              ) : (
                <PhoneCall className="h-4 w-4 mr-2" />
              )}
              Analisar Chamada
            </Button>
            <Button
              onClick={() => analyzeText('script_generation')}
              disabled={analysisLoading}
              variant="outline"
              className="h-12 bg-gradient-to-r from-background/80 to-muted/40 
                       border-0 shadow-lg hover:shadow-xl
                       hover:scale-105 transition-all duration-300
                       hover:from-sales-primary/10 hover:to-sales-accent/10"
            >
              <FileText className="h-4 w-4 mr-2" />
              Gerar Script
            </Button>
            <Button
              onClick={() => analyzeText('objection_handling')}
              disabled={analysisLoading}
              variant="outline"
              className="h-12 bg-gradient-to-r from-background/80 to-muted/40 
                       border-0 shadow-lg hover:shadow-xl
                       hover:scale-105 transition-all duration-300
                       hover:from-sales-primary/10 hover:to-sales-accent/10"
            >
              <Target className="h-4 w-4 mr-2" />
              Tratar Objeção
            </Button>
            <Button
              onClick={() => analyzeText('general')}
              disabled={analysisLoading}
              variant="outline"
              className="h-12 bg-gradient-to-r from-background/80 to-muted/40 
                       border-0 shadow-lg hover:shadow-xl
                       hover:scale-105 transition-all duration-300
                       hover:from-sales-primary/10 hover:to-sales-accent/10"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Análise Geral
            </Button>
          </div>

          {analysisResult && (
            <Card className="bg-gradient-to-r from-muted/30 to-background/50 
                           border border-border/50 shadow-lg animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <div className="bg-gradient-to-r from-sales-accent/20 to-sales-secondary/20 
                                  rounded-full p-1">
                      <Brain className="h-4 w-4 text-sales-accent" />
                    </div>
                    Resultado da Análise IA
                  </h4>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(analysisResult)}
                    className="border-0 bg-gradient-to-r from-background to-muted 
                             hover:from-sales-primary/10 hover:to-sales-accent/10
                             transition-all duration-300 hover:scale-105"
                  >
                    {copiedAnalysis ? (
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                    ) : (
                      <Copy className="h-3 w-3 mr-1" />
                    )}
                    {copiedAnalysis ? 'Copiado!' : 'Copiar'}
                  </Button>
                </div>
                <div className="text-sm whitespace-pre-line leading-relaxed">
                  {analysisResult}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};