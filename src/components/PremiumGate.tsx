
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';

interface PremiumGateProps {
  children: ReactNode;
  requiredTier?: 'closerUp' | 'mentorup' | 'any';
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export const PremiumGate = ({ 
  children, 
  requiredTier = 'any',
  fallbackTitle = "Conteúdo Premium",
  fallbackDescription = "Este conteúdo está disponível apenas para assinantes premium."
}: PremiumGateProps) => {
  const navigate = useNavigate();
  const { hasCloserUpAccess, hasMentorUpAccess, hasAnyPremiumAccess, isLoading } = useSubscription();

  // Reduced loading time and show content faster
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Show skeleton loading for premium modules */}
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index} className="card-glass animate-pulse">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-300"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-6 bg-gray-300 rounded"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-12"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Verificar acesso baseado no tier requerido
  let hasAccess = false;
  
  switch (requiredTier) {
    case 'closerUp':
      hasAccess = hasCloserUpAccess();
      break;
    case 'mentorup':
      hasAccess = hasMentorUpAccess();
      break;
    case 'any':
      hasAccess = hasAnyPremiumAccess();
      break;
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="card-glass">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-sales-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-sales-primary" />
        </div>
        <Badge className="mb-4 bg-sales-primary/20 text-sales-primary border-sales-primary/30">
          <Crown className="h-3 w-3 mr-1" />
          Premium
        </Badge>
        <CardTitle className="gradient-text">{fallbackTitle}</CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">{fallbackDescription}</p>
        
        <div className="space-y-3">
          <Button 
            className="w-full btn-gradient"
            onClick={() => navigate('/plans')}
          >
            🚀 Ver Planos Premium
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full glass-effect"
            onClick={() => navigate('/mentorup')}
          >
            💬 Conhecer MentorUP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
