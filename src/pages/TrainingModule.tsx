import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  CheckCircle2, 
  PlayCircle, 
  Brain, 
  ArrowLeft, 
  Clock,
  Trophy,
  Star,
  Lock,
  Play
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingModule = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const moduleData = {
    "1": {
      title: "Perfis Comportamentais",
      description: "Identifique e adapte estratégias ao perfil do cliente",
      icon: Brain,
      totalLessons: 10,
      duration: "3h 15min",
      xpReward: 250,
      lessons: [
        {
          id: 1,
          title: "Introdução aos Perfis Comportamentais",
          duration: "15 min",
          type: "video",
          description: "Entenda os 4 perfis principais: Dominante, Influenciador, Estável e Cauteloso",
          isFree: true,
          videoUrl: "https://youtu.be/abDCOXYrWsA?si=Dd1Zmu6zwuqdr7DX"
        },
        {
          id: 2,
          title: "Identificando o Perfil Dominante",
          duration: "20 min",
          type: "video",
          description: "Características e técnicas de vendas para clientes dominantes",
          isFree: true,
          videoUrl: "https://youtu.be/ZPV9pC-T2dE?si=Vc87bTQrnYcsHpAb"
        },
        {
          id: 3,
          title: "Quiz: Perfil Dominante",
          duration: "10 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre vendas para perfis dominantes",
          isFree: true
        },
        {
          id: 4,
          title: "O Perfil Influenciador",
          duration: "18 min",
          type: "video",
          description: "Como vender para pessoas extrovertidas e sociáveis",
          isFree: true
        },
        {
          id: 5,
          title: "Simulador: Vendendo para Influenciador",
          duration: "25 min",
          type: "simulator",
          description: "Pratique uma conversa de vendas com um cliente influenciador",
          isFree: true
        },
        {
          id: 6,
          title: "O Perfil Estável",
          duration: "20 min",
          type: "video",
          description: "Estratégias para clientes estáveis, confiáveis e orientados a relacionamentos",
          isFree: true
        },
        {
          id: 7,
          title: "Simulador: Vendendo para Perfil Estável",
          duration: "22 min",
          type: "simulator",
          description: "Pratique abordagens para clientes que valorizam segurança e confiança",
          isFree: true
        },
        {
          id: 8,
          title: "O Perfil Cauteloso",
          duration: "18 min",
          type: "video",
          description: "Como lidar com clientes analíticos, detalhistas e mais conservadores",
          isFree: true
        },
        {
          id: 9,
          title: "Quiz Final: Todos os Perfis",
          duration: "15 min",
          type: "quiz",
          description: "Avaliação completa sobre todos os perfis comportamentais",
          isFree: true
        },
        {
          id: 10,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão",
          isFree: true
        }
      ]
    }
  };

  const module = moduleData[moduleId as keyof typeof moduleData];
  if (!module) return <div>Módulo não encontrado</div>;

  const allLessons = module.lessons;
  const progress = (completedLessons.length / allLessons.length) * 100;

  const getLessonIcon = (type: string, completed: boolean, isFree: boolean) => {
    if (completed) return <CheckCircle2 className="h-5 w-5 text-sales-success" />;
    
    switch (type) {
      case 'video': return <PlayCircle className="h-5 w-5 text-sales-primary" />;
      case 'quiz': return <Brain className="h-5 w-5 text-sales-accent" />;
      case 'simulator': return <Star className="h-5 w-5 text-sales-warning" />;
      case 'certificate': return <Trophy className="h-5 w-5 text-sales-warning" />;
      default: return <PlayCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^&\n?#]+)/);
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url;
  };

  const startLesson = (lessonId: number, type: string, isFree: boolean, videoUrl?: string) => {
    if (type === 'quiz') {
      navigate(`/training/module/${moduleId}/quiz/${lessonId}`);
    } else if (type === 'simulator') {
      navigate(`/training/module/${moduleId}/simulator/${lessonId}`);
    } else if (type === 'video' && videoUrl) {
      // Open video in modal
      setCurrentVideoUrl(getEmbedUrl(videoUrl));
      setIsVideoModalOpen(true);
      // Mark as completed
      if (!completedLessons.includes(lessonId)) {
        setCompletedLessons([...completedLessons, lessonId]);
      }
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

        {/* All Access Notice */}
        <Card className="card-glass mb-4 border border-sales-success/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sales-success/20 flex items-center justify-center">
                <span className="text-sales-success text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-sales-success">Acesso Completo</h3>
                <p className="text-sm text-muted-foreground">
                  Todas as aulas disponíveis para você
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <span>{allLessons.length} aulas</span>
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
            
            return (
              <Card 
                key={lesson.id}
                className="card-glass hover:scale-105 cursor-pointer border-sales-primary/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getLessonIcon(lesson.type, isCompleted, true)}
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
                        <Badge className="text-xs bg-sales-success">DISPONÍVEL</Badge>
                        {lesson.type === 'video' && lesson.videoUrl && (
                          <Play className="h-3 w-3 text-muted-foreground" />
                        )}
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
                              : 'btn-gradient'
                          }`}
                          onClick={() => startLesson(lesson.id, lesson.type, true, lesson.videoUrl)}
                        >
                          {isCompleted ? "✓ Concluído" : 
                           lesson.type === 'video' && lesson.videoUrl ? "▶ Assistir" : "▶ Iniciar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upgrade CTA */}
        <Card className="card-glass mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2 gradient-text">
              Continue sua jornada de aprendizado
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Desbloqueie as próximas 7 aulas deste módulo + 4 módulos completos
            </p>
            <Button className="w-full btn-gradient" onClick={() => navigate('/plans')}>
              👑 Upgrade para Premium - R$ 29,90/mês
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Vídeo da Aula</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0">
            <div className="aspect-video w-full">
              <iframe
                src={currentVideoUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AppBottomNav />
    </div>
  );
};

export default TrainingModule;
