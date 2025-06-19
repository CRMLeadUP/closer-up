import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Mic,
  Send,
  Bot,
  User,
  Target,
  TrendingUp,
  Clock,
  FileText,
  BarChart3,
  Lightbulb,
  Zap,
  Brain,
  PhoneCall
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const { toast } = useToast();
  
  const [conversation, setConversation] = useState([
    {
      type: "ai",
      message: "Olá! Sou seu assistente CloserAI com inteligência artificial avançada. Posso ajudar com vendas, negociação, análise de conversas, geração de scripts e muito mais. Como posso ajudá-lo hoje?",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickActions = [
    "Como quebrar objeção de preço?",
    "Estratégias de prospecção B2B",
    "Scripts de fechamento poderosos",
    "Análise de perfil comportamental",
    "Como criar urgência na venda",
    "Técnicas de storytelling"
  ];

  const insights = [
    { label: "IA Ativada", value: "✨", icon: Brain, color: "sales-success" },
    { label: "Tempo Médio", value: "12min", icon: Clock, color: "sales-primary" },
    { label: "Análises Hoje", value: "3", icon: BarChart3, color: "sales-accent" }
  ];

  // Função para enviar mensagem para IA real
  const sendToAI = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('closer-ai-chat', {
        body: {
          message: userMessage,
          conversation: conversation,
          userId: null // TODO: integrar com auth quando implementado
        }
      });

      if (error) throw error;

      return data.response;
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: "Erro na IA",
        description: "Não foi possível processar sua mensagem. Tente novamente.",
        variant: "destructive"
      });
      
      // Fallback para resposta local em caso de erro
      return "🚫 **Sistema IA Temporariamente Indisponível**\n\nDesculpe, estou com dificuldades técnicas no momento. Por favor, tente novamente em alguns instantes.\n\n💡 **Enquanto isso:**\n• Verifique sua conexão com a internet\n• Reformule sua pergunta se necessário\n• Use as ações rápidas abaixo\n\n🔄 **Status**: Reconectando sistemas...";
    } finally {
      setIsLoading(false);
    }
  };

  // Função para análise de texto avançada
  const analyzeText = async (analysisType: string) => {
    if (!analysisText.trim()) {
      toast({
        title: "Texto obrigatório",
        description: "Digite o texto que deseja analisar.",
        variant: "destructive"
      });
      return;
    }

    setAnalysisLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('closer-ai-analysis', {
        body: {
          text: analysisText,
          analysisType: analysisType
        }
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      
      toast({
        title: "Análise concluída!",
        description: "Verifique os resultados abaixo."
      });
    } catch (error) {
      console.error('Error in analysis:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o texto. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message;
    setMessage("");
    
    // Adiciona mensagem do usuário
    const newConversation = [
      ...conversation,
      {
        type: "user",
        message: userMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setConversation(newConversation);
    
    // Gera resposta da IA
    const aiResponse = await sendToAI(userMessage);
    
    setConversation(prev => [
      ...prev,
      {
        type: "ai",
        message: aiResponse,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        {/* Header */}
        <div className="px-4 mb-6">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
              🤖 CloserAI Assistant
            </Badge>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              Assistente IA Avançado
            </h1>
            <p className="text-muted-foreground text-sm">
              Seu consultor inteligente para vendas, análises e estratégias
            </p>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="card-glass">
                  <CardContent className="p-3 text-center">
                    <IconComponent className={`h-4 w-4 mx-auto mb-1 text-${insight.color}`} />
                    <div className="text-lg font-bold gradient-text">{insight.value}</div>
                    <div className="text-xs text-muted-foreground">{insight.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tabs para diferentes funcionalidades */}
        <div className="px-4">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat IA
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Análises
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Ferramentas
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              {/* Chat Area */}
              <Card className="card-glass h-96 flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-sales-secondary" />
                    Chat Inteligente
                    {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sales-primary"></div>}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto space-y-4">
                  {conversation.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' 
                            ? 'bg-sales-primary' 
                            : 'bg-sales-secondary'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Brain className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          msg.type === 'user'
                            ? 'bg-sales-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Perguntas Inteligentes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs glass-effect h-auto py-2 px-3"
                      onClick={() => handleQuickAction(action)}
                      disabled={isLoading}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <Card className="card-glass">
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Faça qualquer pergunta sobre vendas, estratégias, negociação..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className={`glass-effect ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                      onClick={() => setIsListening(!isListening)}
                      disabled={isLoading}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="btn-gradient"
                      onClick={handleSendMessage}
                      disabled={isLoading || !message.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-sales-accent" />
                    Análise de Conversas e Scripts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Cole aqui o texto da conversa, script ou qualquer conteúdo comercial que deseja analisar..."
                    value={analysisText}
                    onChange={(e) => setAnalysisText(e.target.value)}
                    className="min-h-32"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => analyzeText('call_analysis')}
                      disabled={analysisLoading}
                      className="btn-gradient"
                    >
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Analisar Chamada
                    </Button>
                    <Button
                      onClick={() => analyzeText('script_generation')}
                      disabled={analysisLoading}
                      variant="outline"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Gerar Script
                    </Button>
                    <Button
                      onClick={() => analyzeText('objection_handling')}
                      disabled={analysisLoading}
                      variant="outline"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Tratar Objeção
                    </Button>
                    <Button
                      onClick={() => analyzeText('general')}
                      disabled={analysisLoading}
                      variant="outline"
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Análise Geral
                    </Button>
                  </div>

                  {analysisResult && (
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Resultado da Análise
                        </h4>
                        <div className="text-sm whitespace-pre-line">
                          {analysisResult}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="grid gap-4">
                <Card className="card-glass">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Gerador de Scripts
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Crie scripts personalizados para diferentes situações de venda
                    </p>
                    <Button className="btn-gradient w-full">
                      Criar Script Personalizado
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-glass">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Simulador de Vendas
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pratique diferentes cenários com IA interativa
                    </p>
                    <Button variant="outline" className="w-full">
                      Iniciar Simulação
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-glass">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Análise de Performance
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Avalie suas métricas e receba insights personalizados
                    </p>
                    <Button variant="outline" className="w-full">
                      Analisar Performance
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

      </div>

      <AppBottomNav />
    </div>
  );
};

export default Assistant;
