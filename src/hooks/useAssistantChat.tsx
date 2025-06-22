import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ConversationMessage {
  type: "user" | "ai";
  message: string;
  time: string;
}

export const useAssistantChat = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
  const [conversation, setConversation] = useState<ConversationMessage[]>([
    {
      type: "ai",
      message: "Olá! Sou seu assistente CloserAI com inteligência artificial avançada. Posso ajudar com vendas, negociação, análise de conversas, geração de scripts e muito mais. Como posso ajudá-lo hoje?",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const sendToAI = async (userMessage: string) => {
    setIsLoading(true);
    console.log('🚀 Iniciando sendToAI com mensagem:', userMessage);
    
    try {
      const { data, error } = await supabase.functions.invoke('closer-ai-chat', {
        body: {
          message: userMessage,
          conversation: conversation,
          userId: null
        }
      });

      console.log('📊 Supabase response:', { data, error });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      console.log('✅ Supabase funcionou:', data);
      return data.response || "Resposta da IA processada com sucesso.";
      
    } catch (supabaseError) {
      console.error('💥 Supabase falhou:', supabaseError);
      
      toast({
        title: "Erro na IA",
        description: "Não foi possível conectar com a IA. Verifique o console para detalhes.",
        variant: "destructive"
      });
      
      return `🔧 **Teste com Resposta Local**

Olá! Recebi sua mensagem: "${userMessage}"

💡 **Dicas de Vendas Rápidas:**
• Use a técnica SPIN (Situação, Problema, Implicação, Necessidade)
• Crie urgência mostrando benefícios únicos
• Escute mais do que fale (proporção 70/30)
• Sempre confirme o entendimento antes de avançar

⚡ **Scripts Básicos:**
Para objeção de preço: "Entendo sua preocupação. Vamos focar no valor que isso vai gerar para você..."

🎯 **Status**: Sistema em modo de teste - funcionalidade básica ativa.`;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message;
    setMessage("");
    
    const newConversation = [
      ...conversation,
      {
        type: "user" as const,
        message: userMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setConversation(newConversation);
    
    const aiResponse = await sendToAI(userMessage);
    
    setConversation(prev => [
      ...prev,
      {
        type: "ai" as const,
        message: aiResponse,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
  };

  return {
    message,
    setMessage,
    isLoading,
    isTyping,
    setIsTyping,
    conversation,
    handleSendMessage,
    handleQuickAction
  };
};