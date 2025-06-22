import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '@/hooks/useGamification';
import XPLevelCard from '@/components/gamification/XPLevelCard';
import AchievementCard from '@/components/gamification/AchievementCard';
import ChallengeCard from '@/components/gamification/ChallengeCard';
import LeaderboardCard from '@/components/gamification/LeaderboardCard';
import MobileHeader from '@/components/MobileHeader';
import AppBottomNav from '@/components/AppBottomNav';
import { Trophy, Award, Target, Star } from 'lucide-react';

const Gamification = () => {
  const { 
    userProgress, 
    achievements, 
    challenges, 
    loading,
    calculateXPForNextLevel 
  } = useGamification();

  if (loading || !userProgress) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader />
        <div className="pt-20 pb-24 px-4">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/30 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
        <AppBottomNav />
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const activeChallenges = challenges.filter(c => !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* XP and Level Card */}
        <div className="mb-6">
          <XPLevelCard 
            userProgress={userProgress} 
            calculateXPForNextLevel={calculateXPForNextLevel}
          />
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Conquistas</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Desafios</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Ranking</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-card rounded-lg border border-border/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-sales-success" />
                  <span className="text-2xl font-bold gradient-text">{unlockedAchievements.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Desbloqueadas</p>
              </div>
              <div className="text-center p-4 bg-gradient-card rounded-lg border border-border/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold text-muted-foreground">{lockedAchievements.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Restantes</p>
              </div>
            </div>

            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">🏆 Suas Conquistas</h3>
                {unlockedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}

            {/* Locked Achievements */}
            {lockedAchievements.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground">🔒 A Desbloquear</h3>
                {lockedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            {/* Active Challenges */}
            {activeChallenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-text">🎯 Desafios Ativos</h3>
                {activeChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    userProgress={userProgress}
                  />
                ))}
              </div>
            )}

            {/* Completed Challenges */}
            {completedChallenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground">✅ Desafios Completos</h3>
                {completedChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    userProgress={userProgress}
                  />
                ))}
              </div>
            )}

            {activeChallenges.length === 0 && completedChallenges.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Nenhum desafio disponível
                </h3>
                <p className="text-sm text-muted-foreground">
                  Novos desafios serão adicionados em breve!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="leaderboard">
            <LeaderboardCard />
          </TabsContent>
        </Tabs>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Gamification;