import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Target, CheckCircle, Clock } from 'lucide-react';
import { Challenge } from '@/hooks/useGamification';

interface ChallengeCardProps {
  challenge: Challenge;
  userProgress?: any;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, userProgress }) => {
  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expirado';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const calculateProgress = () => {
    if (!userProgress || !challenge.requirements) return 0;
    
    const requirement = Object.entries(challenge.requirements)[0];
    if (!requirement) return 0;
    
    const [key, target] = requirement;
    const targetNum = typeof target === 'number' ? target : parseInt(String(target)) || 0;
    const current = challenge.progress?.[key] || userProgress[key] || 0;
    const currentNum = typeof current === 'number' ? current : parseInt(String(current)) || 0;
    
    return Math.min((currentNum / targetNum) * 100, 100);
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'weekly': return 'bg-sales-primary/20 text-sales-primary border-sales-primary/30';
      case 'special': return 'bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30';
      case 'daily': return 'bg-sales-accent/20 text-sales-accent border-sales-accent/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatRequirement = () => {
    const requirement = Object.entries(challenge.requirements)[0];
    if (!requirement) return '';
    
    const [key, target] = requirement;
    const targetNum = typeof target === 'number' ? target : parseInt(String(target)) || 0;
    const current = challenge.progress?.[key] || userProgress?.[key] || 0;
    const currentNum = typeof current === 'number' ? current : parseInt(String(current)) || 0;
    
    const labels: Record<string, string> = {
      modules_completed: 'módulos',
      quizzes_completed: 'quizzes',
      simulations_completed: 'simulações',
      perfect_scores: 'notas perfeitas'
    };
    
    return `${currentNum}/${targetNum} ${labels[key] || key}`;
  };

  const progressPercentage = calculateProgress();
  const isCompleted = challenge.completed || progressPercentage >= 100;
  const timeRemaining = getTimeRemaining(challenge.end_date);

  return (
    <Card className={`transition-all duration-300 ${
      isCompleted 
        ? 'card-glass border-sales-success/30' 
        : 'card-glass hover:scale-105'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-sales-primary" />
            <CardTitle className="text-lg">{challenge.title}</CardTitle>
            {isCompleted && <CheckCircle className="h-5 w-5 text-sales-success" />}
          </div>
          <Badge className={getChallengeTypeColor(challenge.challenge_type)}>
            {challenge.challenge_type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {challenge.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span className="text-muted-foreground">{formatRequirement()}</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className={`h-2 ${isCompleted ? 'bg-sales-success/20' : ''}`} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{timeRemaining}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sales-success">+{challenge.xp_reward} XP</span>
            </div>
          </div>
          
          {isCompleted ? (
            <Badge className="bg-sales-success/20 text-sales-success border-sales-success/30">
              Completo
            </Badge>
          ) : (
            <Button size="sm" variant="outline" className="glass-effect">
              <Clock className="h-4 w-4 mr-1" />
              Em Progresso
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;