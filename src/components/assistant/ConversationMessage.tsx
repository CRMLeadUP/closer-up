import { User, Brain, Clock } from "lucide-react";
import { ConversationMessage as MessageType } from "@/hooks/useAssistantChat";

interface ConversationMessageProps {
  message: MessageType;
  index: number;
}

export const ConversationMessage = ({ message, index }: ConversationMessageProps) => {
  return (
    <div 
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} 
                animate-scale-in`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg 
                       transition-all duration-300 hover:scale-110 ${
          message.type === 'user' 
            ? 'bg-gradient-to-r from-sales-primary to-sales-accent' 
            : 'bg-gradient-to-r from-sales-secondary to-sales-accent'
        }`}>
          {message.type === 'user' ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Brain className="h-4 w-4 text-white" />
          )}
        </div>
        <div className={`rounded-2xl px-4 py-3 shadow-md relative
                       transition-all duration-300 hover:shadow-lg ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-sales-primary to-sales-accent text-white'
            : 'bg-gradient-to-r from-background to-muted text-foreground border border-border/50'
        }`}>
          <p className="text-sm whitespace-pre-line leading-relaxed">{message.message}</p>
          <p className="text-xs opacity-70 mt-2 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {message.time}
          </p>
          {/* Message tail */}
          <div className={`absolute top-4 w-0 h-0 ${
            message.type === 'user' 
              ? 'right-[-8px] border-l-8 border-l-sales-primary border-t-4 border-b-4 border-t-transparent border-b-transparent'
              : 'left-[-8px] border-r-8 border-r-background border-t-4 border-b-4 border-t-transparent border-b-transparent'
          }`}></div>
        </div>
      </div>
    </div>
  );
};