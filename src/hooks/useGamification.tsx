import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserProgress {
  id: string;
  user_id: string;
  total_xp: number;
  current_level: number;
  modules_completed: number;
  quizzes_completed: number;
  simulations_completed: number;
  perfect_scores: number;
  streak_days: number;
  last_activity_date: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xp_reward: number;
  requirements: any;
  rarity: string;
  unlocked?: boolean;
  unlocked_at?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  requirements: any;
  xp_reward: number;
  start_date: string;
  end_date: string;
  progress?: any;
  completed?: boolean;
}

export const useGamification = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  // Calculate level from XP
  const calculateLevel = (xp: number): number => {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  // Calculate XP needed for next level
  const calculateXPForNextLevel = (level: number): number => {
    return Math.pow(level, 2) * 100;
  };

  // Initialize user progress
  const initializeUserProgress = async () => {
    if (!user) return;

    try {
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!existingProgress) {
        const { data: newProgress } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: 500, // Bônus inicial do onboarding
            current_level: 1
          })
          .select()
          .single();

        if (newProgress) {
          setUserProgress(newProgress);
        }
      } else {
        setUserProgress(existingProgress);
      }
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  // Load achievements
  const loadAchievements = async () => {
    if (!user) return;

    try {
      const { data: allAchievements } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true);

      const { data: userAchievements } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id);

      const unlockedIds = userAchievements?.map(ua => ua.achievement_id) || [];

      const achievementsWithStatus = allAchievements?.map(achievement => ({
        ...achievement,
        unlocked: unlockedIds.includes(achievement.id),
        unlocked_at: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.unlocked_at
      })) || [];

      setAchievements(achievementsWithStatus);
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  // Load challenges
  const loadChallenges = async () => {
    if (!user) return;

    try {
      const { data: activeChallenges } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString());

      const { data: userChallenges } = await supabase
        .from('user_challenges')
        .select('challenge_id, progress, completed')
        .eq('user_id', user.id);

      const challengesWithProgress = activeChallenges?.map(challenge => {
        const userChallenge = userChallenges?.find(uc => uc.challenge_id === challenge.id);
        return {
          ...challenge,
          progress: userChallenge?.progress || {},
          completed: userChallenge?.completed || false
        };
      }) || [];

      setChallenges(challengesWithProgress);
    } catch (error) {
      console.error('Error loading challenges:', error);
    }
  };

  // Add XP and check for achievements
  const addXP = async (xpAmount: number, activityType: string) => {
    if (!user || !userProgress) return;

    setLoading(true);
    try {
      const newTotalXP = userProgress.total_xp + xpAmount;
      const newLevel = calculateLevel(newTotalXP);

      // Update user progress
      const updates: any = {
        total_xp: newTotalXP,
        current_level: newLevel,
        last_activity_date: new Date().toISOString().split('T')[0]
      };

      // Update activity counters
      if (activityType === 'module') updates.modules_completed = userProgress.modules_completed + 1;
      if (activityType === 'quiz') updates.quizzes_completed = userProgress.quizzes_completed + 1;
      if (activityType === 'perfect_quiz') {
        updates.quizzes_completed = userProgress.quizzes_completed + 1;
        updates.perfect_scores = userProgress.perfect_scores + 1;
      }
      if (activityType === 'simulation') updates.simulations_completed = userProgress.simulations_completed + 1;

      const { data: updatedProgress } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updatedProgress) {
        setUserProgress(updatedProgress);
        
        if (newLevel > userProgress.current_level) {
          toast({
            title: "🎉 Level Up!",
            description: `Parabéns! Você alcançou o nível ${newLevel}!`,
          });
        }

        // Check for new achievements
        await checkAchievements(updatedProgress);
        
        toast({
          title: "XP Ganho!",
          description: `+${xpAmount} XP adicionado ao seu progresso`,
        });
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check for new achievements
  const checkAchievements = async (progress: UserProgress) => {
    if (!user) return;

    try {
      const unlockedAchievements = achievements.filter(a => a.unlocked);
      const availableAchievements = achievements.filter(a => !a.unlocked);

      for (const achievement of availableAchievements) {
        let requirementMet = true;

        for (const [key, value] of Object.entries(achievement.requirements)) {
          if (progress[key as keyof UserProgress] < value) {
            requirementMet = false;
            break;
          }
        }

        if (requirementMet) {
          // Unlock achievement
          await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              achievement_id: achievement.id
            });

          // Add XP reward
          if (achievement.xp_reward > 0) {
            await supabase
              .from('user_progress')
              .update({
                total_xp: progress.total_xp + achievement.xp_reward
              })
              .eq('user_id', user.id);
          }

          toast({
            title: "🏆 Conquista Desbloqueada!",
            description: `${achievement.icon} ${achievement.name} - +${achievement.xp_reward} XP`,
          });
        }
      }

      // Reload achievements to update status
      await loadAchievements();
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  };

  useEffect(() => {
    if (user) {
      initializeUserProgress();
      loadAchievements();
      loadChallenges();
    }
  }, [user]);

  return {
    userProgress,
    achievements,
    challenges,
    loading,
    addXP,
    calculateLevel,
    calculateXPForNextLevel,
    initializeUserProgress,
    loadAchievements,
    loadChallenges
  };
};