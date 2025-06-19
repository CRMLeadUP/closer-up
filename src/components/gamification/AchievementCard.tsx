import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle } from 'lucide-react';
import { Achievement } from '@/hooks/useGamification';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'uncommon': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'rare': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'epic': return 'bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30';
      case 'legendary': return 'bg-gradient-to-r from-sales-primary to-sales-secondary text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className={`transition-all duration-300 ${
      achievement.unlocked 
        ? 'card-glass hover:scale-105 border-sales-success/30' 
        : 'bg-muted/30 border-muted/30'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
            {achievement.unlocked ? achievement.icon : <Lock className="h-8 w-8 text-muted-foreground" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                {achievement.name}
              </h4>
              {achievement.unlocked && (
                <CheckCircle className="h-4 w-4 text-sales-success" />
              )}
            </div>
            
            <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
              {achievement.description}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                {achievement.rarity}
              </Badge>
              
              <div className="flex items-center gap-2 text-sm">
                <span className={achievement.unlocked ? 'text-sales-success' : 'text-muted-foreground'}>
                  +{achievement.xp_reward} XP
                </span>
                {achievement.unlocked && achievement.unlocked_at && (
                  <span className="text-xs text-muted-foreground">
                    {formatDate(achievement.unlocked_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;