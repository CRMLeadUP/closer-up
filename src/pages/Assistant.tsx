
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
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setConversation(prev => [
        ...prev,
        {
          type: "ai",
          message: "Entendi sua situação. Para quebrar a objeção de preço, recomendo usar a técnica de 'Valor Percebido'. Primeiro, reforce os benefícios únicos do produto...",
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
                      <p className="text-sm">{msg.message}</p>
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
