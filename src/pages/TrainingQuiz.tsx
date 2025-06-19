
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  Brain
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingQuiz = () => {
  const { updateProgress } = useUserProgress();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { moduleId, lessonId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const quizData = {
    title: "Quiz: Perfil Dominante",
    description: "Teste seus conhecimentos sobre vendas para perfis dominantes",
    questions: [
      {
        question: "Qual é a principal característica de um cliente com perfil dominante?",
        options: [
          "Fala devagar e analisa muito",
          "É direto, objetivo e toma decisões rápidas",
          "Gosta de conversar sobre a vida pessoal",
          "Precisa de muito tempo para decidir"
        ],
        correct: 1,
        explanation: "Clientes dominantes são diretos, objetivos e preferem informações concisas. Eles tomam decisões rapidamente e não gostam de perder tempo."
      },
      {
        question: "Como você deve abordar um cliente dominante?",
        options: [
          "Conte histórias pessoais para criar rapport",
          "Seja direto, mostre resultados e benefícios",
          "Apresente muitos detalhes técnicos",
          "Fale sobre as funcionalidades do produto"
        ],
        correct: 1,
        explanation: "Para clientes dominantes, foque nos resultados e benefícios. Seja objetivo e mostre como sua solução pode ajudá-los a alcançar seus objetivos."
      },
      {
        question: "Qual frase seria mais eficaz com um perfil dominante?",
        options: [
          "Este produto tem muitas funcionalidades interessantes...",
          "Isso vai economizar 30% do seu tempo e aumentar sua produtividade",
          "Vamos conversar sobre como você está se sentindo...",
          "Preciso explicar todos os detalhes técnicos primeiro"
        ],
        correct: 1,
        explanation: "Perfis dominantes respondem bem a afirmações diretas sobre resultados concretos, como economia de tempo e aumento de produtividade."
      }
    ]
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizData.questions[currentQuestion].correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        
        // Update user progress
        const score = Math.round((newAnswers.filter(Boolean).length / quizData.questions.length) * 100);
        const perfectScore = score === 100;
        updateProgress('quiz', score, perfectScore);
      }
    }, 2000);
  };

  const getScore = () => {
    return Math.round((answers.filter(Boolean).length / quizData.questions.length) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const finishQuiz = () => {
    navigate(`/training/module/${moduleId}`);
  };

  if (quizCompleted) {
    const score = getScore();
    const passed = score >= 70;

    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        
        <div className="pt-20 pb-24 px-4">
          <Card className="card-glass text-center">
            <CardHeader>
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                passed ? 'bg-sales-success' : 'bg-sales-warning'
              }`}>
                {passed ? (
                  <Trophy className="h-10 w-10 text-white" />
                ) : (
                  <Brain className="h-10 w-10 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {passed ? "Parabéns!" : "Quase lá!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">
                  {score}%
                </div>
                <p className="text-muted-foreground">
                  {passed 
                    ? "Você passou no quiz! Continue assim!" 
                    : "Você precisa de 70% para passar. Tente novamente!"
                  }
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Respostas corretas: {answers.filter(Boolean).length} de {quizData.questions.length}
                </div>
                <Progress value={score} className="h-3" />
              </div>

              {passed && (
                <div className="p-4 bg-sales-success/20 rounded-lg border border-sales-success/30">
                  <p className="text-sm text-sales-success">
                    🎉 +50 XP adicionados ao seu perfil!
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {!passed && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={restartQuiz}
                  >
                    Tentar Novamente
                  </Button>
                )}
                <Button 
                  className="flex-1 btn-gradient"
                  onClick={finishQuiz}
                >
                  {passed ? "Continuar" : "Voltar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <AppBottomNav />
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(`/training/module/${moduleId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Módulo
        </Button>

        {/* Progress Header */}
        <Card className="card-glass mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold">{quizData.title}</h2>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} de {quizData.questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="card-glass mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-4 h-auto text-left justify-start ${
                  selectedAnswer === index 
                    ? showResult
                      ? index === question.correct
                        ? 'border-sales-success bg-sales-success/20 text-sales-success'
                        : 'border-destructive bg-destructive/20 text-destructive'
                      : 'border-sales-primary bg-sales-primary/20'
                    : showResult && index === question.correct
                    ? 'border-sales-success bg-sales-success/20 text-sales-success'
                    : ''
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index && showResult
                      ? index === question.correct
                        ? 'border-sales-success bg-sales-success'
                        : 'border-destructive bg-destructive'
                      : showResult && index === question.correct
                      ? 'border-sales-success bg-sales-success'
                      : selectedAnswer === index
                      ? 'border-sales-primary bg-sales-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {showResult && (
                      <>
                        {index === question.correct && <CheckCircle2 className="h-4 w-4 text-white" />}
                        {selectedAnswer === index && index !== question.correct && <XCircle className="h-4 w-4 text-white" />}
                      </>
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Explanation */}
        {showResult && (
          <Card className="card-glass mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedAnswer === question.correct ? 'bg-sales-success' : 'bg-sales-warning'
                }`}>
                  {selectedAnswer === question.correct ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <Brain className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    {selectedAnswer === question.correct ? "Correto!" : "Explicação:"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Button */}
        <Button
          className="w-full btn-gradient"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < quizData.questions.length - 1 ? "Próxima Pergunta" : "Finalizar Quiz"}
        </Button>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default TrainingQuiz;
