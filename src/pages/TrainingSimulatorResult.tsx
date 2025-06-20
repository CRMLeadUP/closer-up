
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Trophy,
  Star,
  Brain,
  CheckCircle2,
  RotateCcw
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingSimulatorResult = () => {
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const maxScore = 100;
  const passed = score >= 70;

  const getPerformanceLevel = () => {
    if (score >= 90) return { level: "Excelente", color: "sales-success", icon: Trophy };
    if (score >= 80) return { level: "Muito Bom", color: "sales-primary", icon: Star };
    if (score >= 70) return { level: "Bom", color: "sales-accent", icon: CheckCircle2 };
    return { level: "Precisa Melhorar", color: "sales-warning", icon: Brain };
  };

  const performance = getPerformanceLevel();
  const IconComponent = performance.icon;

  const getFeedback = () => {
    if (score >= 90) {
      return "Excelente desempenho! Você demonstrou domínio completo das técnicas de vendas. Continue assim!";
    }
    if (score >= 80) {
      return "Muito bom! Você tem um bom entendimento das estratégias. Com mais prática, chegará à excelência.";
    }
    if (score >= 70) {
      return "Bom trabalho! Você passou no simulador. Continue praticando para aperfeiçoar suas habilidades.";
    }
    return "Você está no caminho certo, mas precisa praticar mais. Revise o conteúdo e tente novamente.";
  };

  const restartSimulator = () => {
    navigate(`/training/module/${moduleId}/simulator/${lessonId}`);
  };

  const continueTraining = () => {
    navigate(`/training/module/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-3">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(`/training/module/${moduleId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Módulo
        </Button>

        {/* Result Card */}
        <Card className="card-glass text-center">
          <CardHeader>
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 bg-${performance.color}`}>
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl">
              Simulador Concluído!
            </CardTitle>
            <Badge className={`bg-${performance.color}/20 text-${performance.color} border-${performance.color}/30`}>
              {performance.level}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {score}%
              </div>
              <p className="text-muted-foreground">
                Sua pontuação no simulador
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Performance
              </div>
              <Progress value={score} className="h-3" />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                {getFeedback()}
              </p>
            </div>

            {passed && (
              <div className={`p-4 bg-${performance.color}/20 rounded-lg border border-${performance.color}/30`}>
                <p className={`text-sm text-${performance.color}`}>
                  🎉 +{Math.round(score * 0.5)} XP adicionados ao seu perfil!
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={restartSimulator}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
              <Button 
                className="flex-1 btn-gradient"
                onClick={continueTraining}
              >
                {passed ? "Continuar Treinamento" : "Voltar ao Módulo"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="card-glass mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Dicas para Melhorar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p>• Revise as aulas do módulo para reforçar o conhecimento</p>
              <p>• Pratique as técnicas com clientes reais</p>
              <p>• Assista aos vídeos novamente focando nos detalhes</p>
              <p>• Faça anotações dos pontos principais</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default TrainingSimulatorResult;
