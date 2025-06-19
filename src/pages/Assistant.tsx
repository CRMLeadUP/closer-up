import { useState, useEffect } from "react";
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
  PhoneCall,
  Sparkles,
  ArrowRight,
  Copy,
  Check
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
  const [copiedAnalysis, setCopiedAnalysis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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

  // Função para enviar mensagem para IA via n8n webhook
  const sendToAI = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://closerup.app.n8n.cloud/webhook/65aecc35-1b17-484c-a92f-b5b6701aff31', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversation: conversation,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Retorna apenas o output do webhook response do n8n
      return data.output || data.response || data.message || "Resposta processada com sucesso.";
      
    } catch (error) {
      console.error('Error calling n8n webhook:', error);
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAnalysis(true);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência."
      });
      setTimeout(() => setCopiedAnalysis(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive"
      });
    }
  };

  // Efeito typing para simular digitação da IA
  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        {/* Header */}
        <div className="px-4 mb-6 animate-fade-in">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-sales-secondary/20 to-sales-accent/20 text-sales-secondary border-sales-secondary/30 
                           hover:from-sales-secondary/30 hover:to-sales-accent/30 transition-all duration-300 
                           shadow-lg hover:shadow-xl hover:scale-105">
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
              CloserAI Assistant
            </Badge>
            <h1 className="text-3xl font-bold gradient-text mb-3 animate-scale-in">
              Assistente IA Avançado
            </h1>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              Seu consultor inteligente para vendas, análises e estratégias comerciais
            </p>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="card-glass hover:scale-105 transition-all duration-300 
                                          hover:shadow-lg group cursor-pointer border-0 
                                          bg-gradient-to-br from-background/80 to-muted/30">
                  <CardContent className="p-4 text-center">
                    <div className="bg-gradient-to-r from-sales-primary/10 to-sales-accent/10 
                                  rounded-full w-10 h-10 mx-auto mb-2 flex items-center justify-center
                                  group-hover:from-sales-primary/20 group-hover:to-sales-accent/20 
                                  transition-all duration-300">
                      <IconComponent className="h-5 w-5 text-sales-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xl font-bold gradient-text mb-1">{insight.value}</div>
                    <div className="text-xs text-muted-foreground font-medium">{insight.label}</div>
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
            <TabsContent value="chat" className="space-y-6 animate-fade-in">
              {/* Chat Area */}
              <Card className="card-glass h-96 flex flex-col shadow-xl border-0 
                             bg-gradient-to-br from-background/90 to-muted/40">
                <CardHeader className="pb-4 border-b border-border/50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="bg-gradient-to-r from-sales-secondary/20 to-sales-accent/20 
                                  rounded-full p-2">
                      <Brain className="h-5 w-5 text-sales-secondary" />
                    </div>
                    Chat Inteligente
                    {isLoading && (
                      <div className="flex items-center gap-2 ml-auto">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-sales-primary border-t-transparent"></div>
                        <span className="text-xs text-muted-foreground">Pensando...</span>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                  {conversation.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} 
                                animate-scale-in`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg 
                                       transition-all duration-300 hover:scale-110 ${
                          msg.type === 'user' 
                            ? 'bg-gradient-to-r from-sales-primary to-sales-accent' 
                            : 'bg-gradient-to-r from-sales-secondary to-sales-accent'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Brain className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 shadow-md relative
                                       transition-all duration-300 hover:shadow-lg ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-sales-primary to-sales-accent text-white'
                            : 'bg-gradient-to-r from-background to-muted text-foreground border border-border/50'
                        }`}>
                          <p className="text-sm whitespace-pre-line leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {msg.time}
                          </p>
                          {/* Message tail */}
                          <div className={`absolute top-4 w-0 h-0 ${
                            msg.type === 'user' 
                              ? 'right-[-8px] border-l-8 border-l-sales-primary border-t-4 border-b-4 border-t-transparent border-b-transparent'
                              : 'left-[-8px] border-r-8 border-r-background border-t-4 border-b-4 border-t-transparent border-b-transparent'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center 
                                      bg-gradient-to-r from-sales-secondary to-sales-accent shadow-lg">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-background to-muted rounded-2xl px-4 py-3 
                                      border border-border/50 shadow-md">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-sales-secondary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-sales-secondary rounded-full animate-bounce" 
                                 style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-sales-secondary rounded-full animate-bounce" 
                                 style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-sales-accent" />
                  <h3 className="text-sm font-semibold">Perguntas Inteligentes</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-3 px-4 text-left justify-start 
                               bg-gradient-to-r from-background/80 to-muted/40 
                               border-0 shadow-md hover:shadow-lg
                               hover:scale-105 transition-all duration-300
                               hover:from-sales-primary/10 hover:to-sales-accent/10"
                      onClick={() => handleQuickAction(action)}
                      disabled={isLoading}
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-50" />
                      <span className="leading-tight">{action}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <Card className="card-glass shadow-xl border-0 bg-gradient-to-r from-background/90 to-muted/40">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Digite sua pergunta sobre vendas, estratégias, negociação..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-12 border-0 bg-background/50 focus:bg-background/80 
                                 transition-all duration-300 shadow-inner
                                 placeholder:text-muted-foreground/60"
                        disabled={isLoading}
                      />
                      {message && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 bg-sales-accent rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className={`shadow-lg border-0 transition-all duration-300 hover:scale-110 ${
                        isListening 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/50 animate-pulse' 
                          : 'bg-gradient-to-r from-background to-muted hover:from-sales-secondary/20 hover:to-sales-accent/20'
                      }`}
                      onClick={() => setIsListening(!isListening)}
                      disabled={isLoading}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="btn-gradient shadow-lg hover:scale-110 transition-all duration-300
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      onClick={handleSendMessage}
                      disabled={isLoading || !message.trim()}
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6 animate-fade-in">
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
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6 animate-fade-in">
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
            </TabsContent>
          </Tabs>
        </div>

      </div>

      <AppBottomNav />
    </div>
  );
};

export default Assistant;
