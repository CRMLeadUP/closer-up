import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardEntry {
  user_id: string;
  total_xp: number;
  current_level: number;
  modules_completed: number;
  position?: number;
}

const LeaderboardCard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, [user]);

  const loadLeaderboard = async () => {
    try {
      const { data: topUsers } = await supabase
        .from('user_progress')
        .select('user_id, total_xp, current_level, modules_completed')
        .order('total_xp', { ascending: false })
        .limit(10);

      if (topUsers) {
        const leaderboardWithPositions = topUsers.map((entry, index) => ({
          ...entry,
          position: index + 1
        }));
        
        setLeaderboard(leaderboardWithPositions);
        
        // Find user position
        if (user) {
          const userEntry = leaderboardWithPositions.find(entry => entry.user_id === user.id);
          if (userEntry) {
            setUserPosition(userEntry.position);
          } else {
            // User not in top 10, get their actual position
            const { data: allUsers } = await supabase
              .from('user_progress')
              .select('user_id, total_xp')
              .order('total_xp', { ascending: false });
            
            if (allUsers) {
              const position = allUsers.findIndex(entry => entry.user_id === user.id) + 1;
              setUserPosition(position > 0 ? position : null);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 1: return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 2: return 'bg-gray-400/20 text-gray-600 border-gray-400/30';
      case 3: return 'bg-orange-500/20 text-orange-600 border-orange-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUserInitials = (userId: string) => {
    return userId.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-sales-primary" />
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-sales-primary" />
            Ranking Semanal
          </CardTitle>
          {userPosition && userPosition <= 10 && (
            <Badge className={getPositionBadge(userPosition)}>
              Top {userPosition}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {leaderboard.map((entry) => (
          <div 
            key={entry.user_id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              entry.user_id === user?.id 
                ? 'bg-sales-primary/10 border border-sales-primary/30' 
                : 'bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {getPositionIcon(entry.position!)}
            </div>
            
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {entry.user_id === user?.id ? (
                  <User className="h-4 w-4" />
                ) : (
                  getUserInitials(entry.user_id)
                )}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {entry.user_id === user?.id ? 'Você' : `Vendedor ${entry.position}`}
                </span>
                <Badge className="text-xs bg-sales-accent/20 text-sales-accent border-sales-accent/30">
                  Nível {entry.current_level}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {entry.modules_completed} módulos • {entry.total_xp.toLocaleString()} XP
              </p>
            </div>
          </div>
        ))}
        
        {userPosition && userPosition > 10 && (
          <div className="border-t border-border/50 pt-3 mt-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sales-primary/10 border border-sales-primary/30">
              <span className="text-sm font-bold text-muted-foreground">#{userPosition}</span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <span className="font-medium text-sm">Sua Posição</span>
                <p className="text-xs text-muted-foreground">Continue progredindo!</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;