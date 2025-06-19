import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";

const quickActions = [
  "Como quebrar objeção de preço?",
  "Estratégias de prospecção B2B",
  "Scripts de fechamento poderosos",
  "Análise de perfil comportamental",
  "Como criar urgência na venda",
  "Técnicas de storytelling"
];

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
  isLoading: boolean;
}

export const QuickActions = ({ onQuickAction, isLoading }: QuickActionsProps) => {
  return (
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
            onClick={() => onQuickAction(action)}
            disabled={isLoading}
          >
            <ArrowRight className="h-3 w-3 mr-2 opacity-50" />
            <span className="leading-tight">{action}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};