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
          isFree: true,
          videoUrl: "https://youtu.be/kxf6LqAYK_U"
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
          isFree: true,
          videoUrl: "https://youtu.be/pHVmimdbg5E"
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
          isFree: true,
          videoUrl: "https://youtu.be/ndgiMFrVvds"
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
    },
    "2": {
      title: "Gatilhos Mentais",
      description: "Técnicas de persuasão e construção de urgência",
      icon: Brain,
      totalLessons: 12,
      duration: "3h 45min",
      xpReward: 300,
      lessons: [
        {
          id: 1,
          title: "Introdução aos Gatilhos Mentais",
          duration: "18 min",
          type: "video",
          description: "O que são gatilhos mentais e como usá-los eticamente nas vendas",
          isFree: true,
          videoUrl: "https://youtu.be/AFCwxwH9uzU"
        },
        {
          id: 2,
          title: "Gatilho da Escassez",
          duration: "22 min",
          type: "video",
          description: "Como criar urgência através da escassez de produto, tempo ou oportunidade",
          isFree: true,
          videoUrl: "https://youtu.be/esYPR8Qnolw"
        },
        {
          id: 3,
          title: "Quiz: Escassez",
          duration: "8 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre o gatilho da escassez",
          isFree: true
        },
        {
          id: 4,
          title: "Gatilho da Autoridade",
          duration: "20 min",
          type: "video",
          description: "Como estabelecer autoridade e credibilidade para influenciar decisões",
          isFree: true,
          videoUrl: "https://youtu.be/mSzHxcNUWqY"
        },
        {
          id: 5,
          title: "Simulador: Usando Autoridade",
          duration: "25 min",
          type: "simulator",
          description: "Pratique como demonstrar autoridade em conversas de venda",
          isFree: true
        },
        {
          id: 6,
          title: "Gatilho da Prova Social",
          duration: "19 min",
          type: "video",
          description: "Use depoimentos, cases e números para validar sua proposta",
          isFree: true,
          videoUrl: "https://youtu.be/scot3SZwYYQ"
        },
        {
          id: 7,
          title: "Gatilho da Reciprocidade",
          duration: "16 min",
          type: "video",
          description: "Como oferecer valor primeiro para criar obrigação de retorno",
          isFree: true,
          videoUrl: "https://youtu.be/KSIxkjR6V78"
        },
        {
          id: 8,
          title: "Quiz: Prova Social e Reciprocidade",
          duration: "10 min",
          type: "quiz",
          description: "Avalie seu entendimento sobre estes dois gatilhos",
          isFree: true
        },
        {
          id: 9,
          title: "Gatilho da Novidade",
          duration: "17 min",
          type: "video",
          description: "Como usar o novo, o exclusivo e o inovador para despertar interesse",
          isFree: true,
          videoUrl: "https://youtu.be/SpBP1VxJthQ"
        },
        {
          id: 10,
          title: "Simulador: Combinando Gatilhos",
          duration: "30 min",
          type: "simulator",
          description: "Pratique usando múltiplos gatilhos em uma conversa de venda",
          isFree: true
        },
        {
          id: 11,
          title: "Quiz Final: Todos os Gatilhos",
          duration: "15 min",
          type: "quiz",
          description: "Avaliação completa sobre todos os gatilhos mentais",
          isFree: true
        },
        {
          id: 12,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão em Gatilhos Mentais",
          isFree: true
        }
      ]
    },
    "3": {
      title: "Rapport e Conexão",
      description: "Como criar conexão e confiança com o cliente",
      icon: Brain,
      totalLessons: 6,
      duration: "2h 15min",
      xpReward: 200,
      lessons: [
        {
          id: 1,
          title: "Fundamentos do Rapport",
          duration: "20 min",
          type: "video",
          description: "O que é rapport e por que é essencial nas vendas",
          isFree: true,
          videoUrl: "https://youtu.be/41Kts8QKies"
        },
        {
          id: 2,
          title: "Linguagem Corporal e Espelhamento",
          duration: "25 min",
          type: "video",
          description: "Como usar a linguagem corporal para criar conexão",
          isFree: true,
          videoUrl: "https://youtu.be/xfpJJ0VHP08"
        },
        {
          id: 3,
          title: "Quiz: Linguagem Corporal",
          duration: "8 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre comunicação não-verbal",
          isFree: true
        },
        {
          id: 4,
          title: "Escuta Ativa e Empatia",
          duration: "22 min",
          type: "video",
          description: "Técnicas para demonstrar interesse genuíno pelo cliente",
          isFree: true,
          videoUrl: "https://youtu.be/mQzgkdJqQwk"
        },
        {
          id: 5,
          title: "Simulador: Construindo Rapport",
          duration: "35 min",
          type: "simulator",
          description: "Pratique técnicas de rapport em conversas reais",
          isFree: true
        },
        {
          id: 6,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão em Rapport e Conexão",
          isFree: true
        }
      ]
    },
    "4": {
      title: "Quebra de Objeções",
      description: "Respostas práticas para situações comuns",
      icon: Brain,
      totalLessons: 10,
      duration: "4h 20min",
      xpReward: 350,
      lessons: [
        {
          id: 1,
          title: "Fundamentos da Quebra de Objeções",
          duration: "22 min",
          type: "video",
          description: "Entenda a psicologia por trás das objeções e como respondê-las",
          isFree: true,
          videoUrl: "https://youtu.be/CNnRe4dZ1Io"
        },
        {
          id: 2,
          title: "Objeção de Preço: 'Está muito caro'",
          duration: "28 min",
          type: "video",
          description: "Técnicas para superar a objeção mais comum nas vendas",
          isFree: true,
          videoUrl: "https://youtu.be/GXzzh028J2Q"
        },
        {
          id: 3,
          title: "Quiz: Objeções de Preço",
          duration: "12 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre como lidar com objeções de preço",
          isFree: true
        },
        {
          id: 4,
          title: "Objeção de Tempo: 'Preciso pensar'",
          duration: "25 min",
          type: "video",
          description: "Como responder quando o cliente quer 'pensar melhor'",
          isFree: true,
          videoUrl: "https://youtu.be/DI30Xix_9yI"
        },
        {
          id: 5,
          title: "Simulador: Objeções de Tempo",
          duration: "30 min",
          type: "simulator",
          description: "Pratique superando objeções relacionadas à tomada de decisão",
          isFree: true
        },
        {
          id: 6,
          title: "Objeção de Autoridade: 'Preciso falar com...'",
          duration: "23 min",
          type: "video",
          description: "Estratégias quando o cliente não é o decisor final",
          isFree: true,
          videoUrl: "https://youtu.be/objections4"
        },
        {
          id: 7,
          title: "Objeção de Confiança: 'Não conheço a empresa'",
          duration: "26 min",
          type: "video",
          description: "Como construir credibilidade e superar desconfiança",
          isFree: true,
          videoUrl: "https://youtu.be/objections5"
        },
        {
          id: 8,
          title: "Simulador: Múltiplas Objeções",
          duration: "35 min",
          type: "simulator",
          description: "Pratique lidando com várias objeções em sequência",
          isFree: true
        },
        {
          id: 9,
          title: "Quiz Final: Todas as Objeções",
          duration: "15 min",
          type: "quiz",
          description: "Avaliação completa sobre quebra de objeções",
          isFree: true
        },
        {
          id: 10,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão em Quebra de Objeções",
          isFree: true
        }
      ]
    },
    "5": {
      title: "Estratégias de Fechamento",
      description: "Técnicas para finalizar vendas com sucesso",
      icon: Brain,
      totalLessons: 8,
      duration: "2h 50min",
      xpReward: 280,
      lessons: [
        {
          id: 1,
          title: "Fundamentos do Fechamento",
          duration: "20 min",
          type: "video",
          description: "Entenda quando e como finalizar uma venda de forma natural",
          isFree: true,
          videoUrl: "https://youtu.be/closing1"
        },
        {
          id: 2,
          title: "Fechamento Assumido",
          duration: "25 min",
          type: "video",
          description: "Como usar a técnica do fechamento assumido sem ser invasivo",
          isFree: true,
          videoUrl: "https://youtu.be/closing2"
        },
        {
          id: 3,
          title: "Quiz: Técnicas de Fechamento",
          duration: "10 min",
          type: "quiz",
          description: "Teste seus conhecimentos sobre diferentes tipos de fechamento",
          isFree: true
        },
        {
          id: 4,
          title: "Fechamento por Escassez",
          duration: "22 min",
          type: "video",
          description: "Como criar urgência genuína para acelerar a decisão",
          isFree: true,
          videoUrl: "https://youtu.be/closing3"
        },
        {
          id: 5,
          title: "Simulador: Praticando Fechamentos",
          duration: "30 min",
          type: "simulator",
          description: "Pratique diferentes técnicas de fechamento em cenários reais",
          isFree: true
        },
        {
          id: 6,
          title: "Fechamento Consultivo",
          duration: "28 min",
          type: "video",
          description: "A abordagem consultiva para fechar vendas complexas",
          isFree: true,
          videoUrl: "https://youtu.be/closing4"
        },
        {
          id: 7,
          title: "Quiz Final: Estratégias de Fechamento",
          duration: "12 min",
          type: "quiz",
          description: "Avaliação completa sobre todas as estratégias de fechamento",
          isFree: true
        },
        {
          id: 8,
          title: "Certificação do Módulo",
          duration: "5 min",
          type: "certificate",
          description: "Receba seu certificado de conclusão em Estratégias de Fechamento",
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

        {/* Continue Learning CTA */}
        <Card className="card-glass mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold mb-2 gradient-text">
              Continue sua jornada de aprendizado
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore outros módulos para dominar todas as técnicas de vendas
            </p>
            <Button className="w-full btn-gradient" onClick={() => navigate('/training')}>
              🚀 Ver Todos os Módulos
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
