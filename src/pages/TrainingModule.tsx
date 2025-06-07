
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  PlayCircle, 
  Brain, 
  ArrowLeft, 
  Clock,
  Trophy,
  Star
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingModule = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const moduleData = {
    1: {
      title: "Perfis Comportamentais",
      description: "Identifique e adapte estratégias ao perfil do cliente",
      icon: Brain,
      totalLessons: 8,
      duration: "2h 30min",
      xpReward: 200,
      lessons: [
        {
          id: 1,
          title: "Introdução aos Perfis Comportamentais",
          duration: "15 min",
          type: "video",
          description: "Entenda os 4 perfis principais: Dominante, Influenciador, Estável e Cauteloso"
        },
        {
          id: 2,
          title: "Identificando o Perfil Dominante",
          duration: "20 min",
          type: "interactive",
          description: "Características e técnicas de vendas para clientes dominantes"
        },
        {
          id: 3,
          title: "Quiz: Perfil Dominante",
          duration: "10 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre vendas para perfis dominantes"
        },
        {
          id: 4,
          title: "O Perfil Influenciador",
          duration: "18 min",
          type: "video",
          description: "Como vender para pessoas extrovertidas e sociáveis"
        },
        {
          id: 5,
          title: "Simulador: Vendendo para Influenciador",
          duration: "25 min",
          type: "simulator",
          description: "Pratique uma conversa de vendas com um cliente influenciador"
        },
        {
          id: 6,
          title: "Perfil Estável e Cauteloso",
          duration: "22 min",
          type: "video",
          description: "Estratégias para clientes mais conservadores e analíticos"
        },
        {
          id: 7,
          title: "Quiz Final: Todos os Perfis",
          duration: "15 min",
          type: "quiz",
          description: "Avaliação completa sobre todos os perfis comportamentais"
        },
        {
          id: 8,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão"
        }
      ]
    }
  };

  const module = moduleData[moduleId as keyof typeof moduleData];
  if (!module) return <div>Módulo não encontrado</div>;

  const progress = (completedLessons.length / module.totalLessons) * 100;

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle2 className="h-5 w-5 text-sales-success" />;
    
    switch (type) {
      case 'video': return <PlayCircle className="h-5 w-5 text-sales-primary" />;
      case 'quiz': return <Brain className="h-5 w-5 text-sales-accent" />;
      case 'simulator': return <Star className="h-5 w-5 text-sales-warning" />;
      case 'certificate': return <Trophy className="h-5 w-5 text-sales-warning" />;
      default: return <PlayCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const startLesson = (lessonId: number, type: string) => {
    if (type === 'quiz') {
      navigate(`/training/module/${moduleId}/quiz/${lessonId}`);
    } else if (type === 'simulator') {
      navigate(`/training/module/${moduleId}/simulator/${lessonId}`);
    } else {
      // Simular conclusão da lição
      if (!completedLessons.includes(lessonId)) {
        setCompletedLessons([...completedLessons, lessonId]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/training')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Treinamento
        </Button>

        {/* Module Header */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sales-primary to-sales-primary/70 flex items-center justify-center">
                <module.icon className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-3">
                  {module.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {module.duration}
                  </span>
                  <span>{module.totalLessons} aulas</span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    {module.xpReward} XP
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Lessons List */}
        <div className="space-y-3">
          {module.lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = lesson.id > Math.max(...completedLessons) + 1;
            
            return (
              <Card 
                key={lesson.id}
                className={`card-glass ${isLocked ? 'opacity-50' : 'hover:scale-105 cursor-pointer'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getLessonIcon(lesson.type, isCompleted)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {lesson.type === 'video' && '📹 Vídeo'}
                          {lesson.type === 'quiz' && '🧠 Quiz'}
                          {lesson.type === 'simulator' && '⭐ Simulador'}
                          {lesson.type === 'interactive' && '🎯 Interativo'}
                          {lesson.type === 'certificate' && '🏆 Certificado'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </span>
                        <Button
                          size="sm"
                          className={`${
                            isCompleted 
                              ? 'bg-sales-success hover:bg-sales-success/80' 
                              : isLocked
                              ? 'bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed'
                              : 'btn-gradient'
                          }`}
                          disabled={isLocked}
                          onClick={() => !isLocked && startLesson(lesson.id, lesson.type)}
                        >
                          {isCompleted ? "✓ Concluído" : isLocked ? "🔒 Bloqueado" : "▶ Iniciar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default TrainingModule;
