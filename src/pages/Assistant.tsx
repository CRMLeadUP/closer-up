
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Mic,
  Send,
  Bot,
  User,
  Target,
  TrendingUp,
  Clock
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: "ai",
      message: "Olá! Sou seu assistente CloseAI. Como posso ajudar na sua venda hoje?",
      time: "14:30"
    }
  ]);

  const quickActions = [
    "Como quebrar objeção de preço?",
    "Cliente perdeu interesse",
    "Estratégia de urgência",
    "Fechamento de venda"
  ];

  const insights = [
    { label: "Taxa de Conversão", value: "78%", icon: Target, color: "sales-success" },
    { label: "Tempo Médio", value: "12min", icon: Clock, color: "sales-primary" },
    { label: "Vendas Hoje", value: "5", icon: TrendingUp, color: "sales-accent" }
  ];

  // Sistema de respostas inteligentes
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Objeções de preço
    if (message.includes("preço") || message.includes("caro") || message.includes("barato") || message.includes("desconto")) {
      return "Para quebrar objeções de preço, use a técnica do 'Valor Percebido':\n\n1. **Reconheça a objeção**: 'Entendo sua preocupação com o preço'\n2. **Reforce o valor**: Destaque os benefícios únicos e resultados\n3. **Compare com o custo**: 'O custo de não resolver o problema é maior'\n4. **Ofereça opções**: Apresente diferentes formas de pagamento\n5. **Crie urgência**: 'Esta condição especial é válida até...'\n\n💡 Lembre-se: Preço só é objeção quando não há valor percebido!";
    }
    
    // Cliente perdeu interesse
    if (message.includes("interesse") || message.includes("desistiu") || message.includes("desanimado")) {
      return "Para resgatar o interesse do cliente:\n\n1. **Identifique o motivo**: 'O que mudou desde nossa última conversa?'\n2. **Reative a dor**: Relembre o problema que ele precisa resolver\n3. **Mostre novos benefícios**: Apresente aspectos que ele não viu antes\n4. **Use prova social**: 'Outros clientes como você obtiveram...'\n5. **Crie uma nova urgência**: Ofereça algo exclusivo\n\n🎯 Dica: Às vezes o cliente só precisa de mais tempo para decidir.";
    }
    
    // Fechamento de venda
    if (message.includes("fechar") || message.includes("finalizar") || message.includes("venda")) {
      return "Técnicas de fechamento eficazes:\n\n1. **Fechamento assumido**: 'Quando você gostaria de começar?'\n2. **Fechamento por escolha**: 'Você prefere a opção A ou B?'\n3. **Fechamento de urgência**: 'Temos apenas 2 vagas restantes'\n4. **Fechamento por benefício**: 'Com isso você vai conseguir...'\n5. **Fechamento de teste**: 'Se eu conseguir resolver X, você fecha hoje?'\n\n✅ Sinais de compra: cliente faz perguntas técnicas, pergunta sobre prazo, menciona implementação.";
    }
    
    // Perfis comportamentais
    if (message.includes("perfil") || message.includes("comportamento") || message.includes("cliente")) {
      return "Identifique o perfil do cliente:\n\n🔴 **Dominante**: Direto, objetivo, quer resultados rápidos\n• Abordagem: Seja assertivo, foque em resultados\n\n🟡 **Influenciador**: Comunicativo, social, emotivo\n• Abordagem: Use storytelling, mostre reconhecimento\n\n🟢 **Estável**: Cauteloso, leal, precisa de confiança\n• Abordagem: Construa relacionamento, dê garantias\n\n🔵 **Consciente**: Analítico, detalhista, precisa de dados\n• Abordagem: Apresente fatos, seja técnico";
    }
    
    // Objeções gerais
    if (message.includes("objeção") || message.includes("não") || message.includes("dúvida")) {
      return "Técnica para lidar com objeções:\n\n1. **Ouça completamente**: Deixe o cliente terminar\n2. **Reconheça**: 'Entendo sua preocupação'\n3. **Questione**: 'Além disso, existe mais alguma coisa?'\n4. **Responda**: Use dados, exemplos ou casos de sucesso\n5. **Confirme**: 'Isso esclarece sua dúvida?'\n\n🔑 Principais objeções: preço, tempo, autoridade, necessidade, confiança";
    }
    
    // Prospecção
    if (message.includes("prospecção") || message.includes("lead") || message.includes("contato")) {
      return "Estratégias de prospecção eficazes:\n\n1. **Pesquise antes**: Conheça a empresa e dores do setor\n2. **Valor na abordagem**: Ofereça insights, não produtos\n3. **Multiple touchpoints**: E-mail + LinkedIn + telefone\n4. **Follow-up inteligente**: Adicione valor a cada contato\n5. **Timing certo**: Identifique momentos de necessidade\n\n📞 Script inicial: 'Olá [Nome], notei que vocês estão [situação]. Ajudei empresas similares a [resultado]. Posso compartilhar como?'";
    }
    
    // Negociação
    if (message.includes("negociar") || message.includes("proposta") || message.includes("acordo")) {
      return "Princípios de negociação:\n\n1. **Prepare-se**: Conheça seus limites e alternativas\n2. **Entenda o outro lado**: Quais são as prioridades dele?\n3. **Crie valor**: Busque soluções win-win\n4. **Use silêncio**: Deixe o cliente falar primeiro\n5. **Feche com resumo**: 'Então, acordamos que...'\n\n⚖️ Regra de ouro: Quem fala primeiro sobre preço, perde poder na negociação.";
    }
    
    // Follow-up
    if (message.includes("follow") || message.includes("acompanhamento") || message.includes("retorno")) {
      return "Estratégia de follow-up:\n\n📅 **Timeline**:\n• 24h: Agradeça e confirme próximos passos\n• 3 dias: Compartilhe conteúdo relevante\n• 1 semana: Faça pergunta sobre implementação\n• 2 semanas: Ofereça demonstração/teste\n\n💡 **Cada contato deve**:\n- Adicionar valor\n- Ter motivo específico\n- Incluir call-to-action clara\n- Ser personalizado";
    }
    
    // Resposta padrão
    return "Entendi sua situação. Baseado na minha experiência com vendas, recomendo:\n\n1. **Identifique a real necessidade** do cliente\n2. **Construa rapport** antes de apresentar soluções\n3. **Use perguntas abertas** para entender melhor o cenário\n4. **Apresente benefícios**, não apenas características\n5. **Sempre confirme** se o cliente entendeu o valor\n\n💬 Pode me dar mais detalhes sobre sua situação específica? Assim posso ajudar de forma mais direcionada.";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newConversation = [
      ...conversation,
      {
        type: "user",
        message: message,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setConversation(newConversation);
    const userMessage = message;
    setMessage("");
    
    // Gera resposta inteligente baseada na pergunta
    setTimeout(() => {
      const aiResponse = generateResponse(userMessage);
      setConversation(prev => [
        ...prev,
        {
          type: "ai",
          message: aiResponse,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
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
              🤖 CloseAI Assistant
            </Badge>
            <h1 className="text-2xl font-bold gradient-text mb-2">
              Assistente em Tempo Real
            </h1>
            <p className="text-muted-foreground text-sm">
              Seu consultor de vendas pessoal
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

        {/* Chat Area */}
        <div className="flex-1 px-4">
          <Card className="card-glass h-96 flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-sales-secondary" />
                Chat em Tempo Real
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
                        <Bot className="h-4 w-4 text-white" />
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
        </div>

        {/* Quick Actions */}
        <div className="px-4 my-6">
          <h3 className="text-sm font-semibold mb-3">Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs glass-effect h-auto py-2 px-3"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4">
          <Card className="card-glass">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua dúvida sobre vendas..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className={`glass-effect ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={() => setIsListening(!isListening)}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  className="btn-gradient"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Assistant;
