
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MessageSquare, 
  User, 
  Bot,
  Star,
  Trophy
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingSimulator = () => {
  const navigate = useNavigate();
  const { moduleId, lessonId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'client' | 'vendor' | 'choice';
    message: string;
    options?: string[];
    correct?: number;
  }>>([]);

  const simulatorData = {
    title: "Simulador: Vendendo para Perfil Influenciador",
    description: "Pratique uma conversa de vendas com um cliente influenciador",
    scenario: "Você é um vendedor de software de gestão. O cliente, Maria, é dona de uma academia e tem perfil influenciador: extrovertida, sociável e focada em relacionamentos.",
    steps: [
      {
        clientMessage: "Oi! Você é o vendedor que ia me apresentar esse software? Adoro conhecer pessoas novas! Como você está?",
        options: [
          "Oi Maria! Estou ótimo, obrigado! Vi que você tem uma academia incrível, deve ser muito gratificante ajudar pessoas a se exercitarem!",
          "Olá. Sim, sou eu. Vamos direto ao assunto - tenho um software que vai revolucionar sua gestão.",
          "Oi! Tudo bem sim. Deixa eu te mostrar as funcionalidades do nosso sistema..."
        ],
        correct: 0,
        feedback: {
          correct: "Perfeito! Com influenciadores, comece criando rapport e mostrando interesse genuíno por eles e seu negócio.",
          incorrect: "Influenciadores valorizam relacionamentos. Sempre comece criando conexão antes de falar do produto."
        }
      },
      {
        clientMessage: "Obrigada! Sim, amo o que faço! A academia é como minha segunda casa. Mas confesso que a parte administrativa me deixa louca... tantos sistemas diferentes!",
        options: [
          "Entendo perfeitamente! Imagino como deve ser desafiador conciliar sua paixão por fitness com a burocracia administrativa.",
          "Nosso software resolve isso. Tem módulo financeiro, CRM, agendamentos...",
          "Quantos sistemas você usa atualmente? Preciso entender seu setup técnico."
        ],
        correct: 0,
        feedback: {
          correct: "Excelente! Você demonstrou empatia e validou o sentimento dela, criando mais conexão.",
          incorrect: "Com influenciadores, valide os sentimentos antes de apresentar soluções técnicas."
        }
      },
      {
        clientMessage: "Exato! É isso mesmo! Eu queria focar só nos meus alunos, sabe? Criar uma comunidade incrível! Vocês têm algo que me ajude nisso?",
        options: [
          "Sim! Nosso sistema tem um módulo de engajamento que cria uma verdadeira comunidade. Você pode enviar desafios, criar grupos de WhatsApp integrados e até fazer lives para os alunos!",
          "Temos CRM para gerenciar leads e um sistema de agendamento eficiente.",
          "Nossa plataforma tem relatórios detalhados sobre performance dos alunos."
        ],
        correct: 0,
        feedback: {
          correct: "Perfeito! Você conectou a solução com o sonho dela de criar comunidade, usando linguagem emocional.",
          incorrect: "Para influenciadores, foque nos benefícios emocionais e sociais, não apenas nas funcionalidades técnicas."
        }
      },
      {
        clientMessage: "Nossa, isso seria perfeito! Mas confessar que não entendo muito de tecnologia... É muito complicado de usar?",
        options: [
          "É super intuitivo! Inclusive, a gente faz toda a implementação e treinamento. Você vai ficar especialista em poucos dias!",
          "Não se preocupe, temos suporte técnico 24/7 para resolver qualquer problema.",
          "O sistema é bem simples, você consegue aprender sozinha lendo o manual."
        ],
        correct: 0,
        feedback: {
          correct: "Excelente! Você tranquilizou sobre a dificuldade e ofereceu suporte, mostrando que ela não ficará sozinha.",
          incorrect: "Influenciadores precisam se sentir apoiados. Ofereça acompanhamento personalizado."
        }
      }
    ]
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextStep = () => {
    if (selectedOption === null) return;

    const currentStepData = simulatorData.steps[currentStep];
    const isCorrect = selectedOption === currentStepData.correct;
    
    if (isCorrect) {
      setScore(score + 25);
    }

    // Add to conversation history
    const newHistory = [
      ...conversationHistory,
      {
        type: 'client' as const,
        message: currentStepData.clientMessage
      },
      {
        type: 'choice' as const,
        message: currentStepData.options[selectedOption],
        options: currentStepData.options,
        correct: currentStepData.correct
      }
    ];

    setConversationHistory(newHistory);

    if (currentStep < simulatorData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    } else {
      // Simulation completed
      navigate(`/training/simulator/${moduleId}/${lessonId}/result?score=${score + (isCorrect ? 25 : 0)}`);
    }
  };

  const currentStepData = simulatorData.steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-3 max-w-full overflow-hidden">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(`/training/module/${moduleId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Módulo
        </Button>

        {/* Simulator Header */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-sales-warning flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{simulatorData.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">Passo {currentStep + 1} de {simulatorData.steps.length}</Badge>
                  <Badge className="bg-sales-primary/20 text-sales-primary">
                    {score} pontos
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {simulatorData.scenario}
            </p>
          </CardHeader>
        </Card>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-3 mb-6">
            {conversationHistory.map((item, index) => (
              <div key={index}>
                {item.type === 'client' && (
                  <Card className="card-glass">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-sales-accent flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold mb-1">Maria (Cliente)</div>
                          <p className="text-sm leading-relaxed break-words">{item.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {item.type === 'choice' && (
                  <Card className="card-glass ml-8">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-sales-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold mb-1">Você (Vendedor)</div>
                          <p className="text-sm leading-relaxed break-words">{item.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Current Client Message */}
        <Card className="card-glass mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-sales-accent flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold mb-2 text-sm">Maria diz:</div>
                <p className="text-sm bg-sales-accent/20 p-3 rounded-lg leading-relaxed break-words">
                  {currentStepData.clientMessage}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Options */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Como você responde?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentStepData.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-3 h-auto text-left justify-start rounded-xl transition-all duration-200 ${
                  selectedOption === index 
                    ? 'border-sales-primary bg-sales-primary/20' 
                    : 'hover:bg-muted/30'
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-start gap-3 w-full min-w-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                    selectedOption === index
                      ? 'border-sales-primary bg-sales-primary'
                      : 'border-muted-foreground'
                  }`} />
                  <span className="text-sm leading-relaxed break-words flex-1 min-w-0 text-left">{option}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          className="w-full btn-gradient"
          onClick={handleNextStep}
          disabled={selectedOption === null}
        >
          {currentStep < simulatorData.steps.length - 1 ? "Continuar Conversa" : "Finalizar Simulação"}
        </Button>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default TrainingSimulator;
