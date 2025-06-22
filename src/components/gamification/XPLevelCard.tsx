import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp } from 'lucide-react';
import { UserProgress } from '@/hooks/useGamification';

interface XPLevelCardProps {
  userProgress: UserProgress;
  calculateXPForNextLevel: (level: number) => number;
}

const XPLevelCard: React.FC<XPLevelCardProps> = ({ userProgress, calculateXPForNextLevel }) => {
  const currentLevelXP = calculateXPForNextLevel(userProgress.current_level - 1);
  const nextLevelXP = calculateXPForNextLevel(userProgress.current_level);
  const xpProgress = userProgress.total_xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const progressPercentage = (xpProgress / xpNeeded) * 100;

  const getLevelBadgeColor = (level: number) => {
    if (level < 5) return 'bg-muted text-muted-foreground';
    if (level < 10) return 'bg-sales-primary/20 text-sales-primary border-sales-primary/30';
    if (level < 15) return 'bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30';
    if (level < 20) return 'bg-sales-accent/20 text-sales-accent border-sales-accent/30';
    return 'bg-gradient-to-r from-sales-primary to-sales-secondary text-white';
  };

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Novato';
    if (level < 10) return 'Vendedor';
    if (level < 15) return 'Profissional';
    if (level < 20) return 'Expert';
    return 'Lendário';
  };

  return (
    <Card className="card-glass">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg gradient-text">Nível {userProgress.current_level}</h3>
              <p className="text-sm text-muted-foreground">{getLevelTitle(userProgress.current_level)}</p>
            </div>
          </div>
          <Badge className={getLevelBadgeColor(userProgress.current_level)}>
            {userProgress.total_xp.toLocaleString()} XP
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso para Nível {userProgress.current_level + 1}</span>
            <span className="text-muted-foreground">
              {xpProgress.toLocaleString()} / {xpNeeded.toLocaleString()} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-sales-success" />
              <span className="text-lg font-bold">{userProgress.modules_completed}</span>
            </div>
            <p className="text-xs text-muted-foreground">Módulos</p>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-lg">🔥</span>
              <span className="text-lg font-bold">{userProgress.streak_days}</span>
            </div>
            <p className="text-xs text-muted-foreground">Sequência</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default XPLevelCard;