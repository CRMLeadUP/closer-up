import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ message, setMessage, onSendMessage, isLoading }: ChatInputProps) => {
  const [isListening, setIsListening] = useState(false);

  return (
    <Card className="card-glass shadow-xl border-0 bg-gradient-to-r from-background/90 to-muted/40">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              placeholder="Digite sua pergunta sobre vendas, estratégias, negociação..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
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
            onClick={onSendMessage}
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
  );
};