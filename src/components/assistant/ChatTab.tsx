import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { ConversationMessage } from "./ConversationMessage";
import { QuickActions } from "./QuickActions";
import { ChatInput } from "./ChatInput";
import { useAssistantChat } from "@/hooks/useAssistantChat";

export const ChatTab = () => {
  const {
    message,
    setMessage,
    isLoading,
    isTyping,
    setIsTyping,
    conversation,
    handleSendMessage,
    handleQuickAction
  } = useAssistantChat();

  // Efeito typing para simular digitação da IA
  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, setIsTyping]);

  return (
    <div className="space-y-6 animate-fade-in">
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
            <ConversationMessage key={index} message={msg} index={index} />
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

      <QuickActions onQuickAction={handleQuickAction} isLoading={isLoading} />

      <ChatInput 
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};