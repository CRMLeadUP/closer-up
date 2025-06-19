import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserProgress } from "./useUserProgress";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlockedAt?: string;
  xp_reward?: number;
  unlocked_at?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  progress: number;
  target: number;
  completed: boolean;
  xpReward: number;
  endDate: string;
  requirements?: any;
  end_date?: string;
  challenge_type?: string;
  xp_reward?: number;
}

export interface UserProgress {
  total_xp: number;
  current_level: number;
  modules_completed: number;
  quizzes_completed: number;
  simulations_completed: number;
  perfect_scores: number;
  streak_days: number;
  next_level_xp: number;
  progress_percentage: number;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  level: number;
  xp: number;
  avatar?: string;
}

export const useGamification = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { progress } = useUserProgress();

  const fetchAchievements = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all achievements
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true);

      if (achievementsError) throw achievementsError;

      // Get user's unlocked achievements
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('achievement_id, unlocked_at')
        .eq('user_id', user.id);

      if (userAchievementsError) throw userAchievementsError;

      // Combine data
      const achievementsWithStatus = allAchievements?.map(achievement => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        rarity: achievement.rarity as Achievement['rarity'],
        unlocked: userAchievements?.some(ua => ua.achievement_id === achievement.id) || false,
        unlockedAt: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.unlocked_at,
        xp_reward: achievement.xp_reward,
        unlocked_at: userAchievements?.find(ua => ua.achievement_id === achievement.id)?.unlocked_at
      })) || [];

      setAchievements(achievementsWithStatus);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const fetchChallenges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get active challenges
      const { data: activeChallenges, error: challengesError } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .gte('end_date', new Date().toISOString());

      if (challengesError) throw challengesError;

      // Get user's challenge progress
      const { data: userChallenges, error: userChallengesError } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', user.id);

      if (userChallengesError) throw userChallengesError;

      // Combine data
      const challengesWithProgress = activeChallenges?.map(challenge => {
        const userChallenge = userChallenges?.find(uc => uc.challenge_id === challenge.id);
        const progressValue = userChallenge?.progress || {};
        
        // Calculate progress based on challenge type
        let currentProgress = 0;
        let target = 1;
        
        if (challenge.challenge_type === 'modules') {
          currentProgress = progress.modules_completed;
          target = (challenge.requirements as any)?.target || 5;
        } else if (challenge.challenge_type === 'quizzes') {
          currentProgress = progress.quizzes_completed;
          target = (challenge.requirements as any)?.target || 3;
        } else if (challenge.challenge_type === 'simulations') {
          currentProgress = progress.simulations_completed;
          target = (challenge.requirements as any)?.target || 2;
        } else if (challenge.challenge_type === 'streak') {
          currentProgress = progress.streak_days;
          target = (challenge.requirements as any)?.target || 7;
        }

        return {
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          type: challenge.challenge_type,
          progress: currentProgress,
          target: target,
          completed: userChallenge?.completed || false,
          xpReward: challenge.xp_reward,
          endDate: challenge.end_date,
          requirements: challenge.requirements,
          end_date: challenge.end_date,
          challenge_type: challenge.challenge_type,
          xp_reward: challenge.xp_reward
        };
      }) || [];

      setChallenges(challengesWithProgress);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      // Get top users by XP
      const { data: topUsers, error } = await supabase
        .from('user_progress')
        .select('user_id, total_xp, current_level')
        .order('total_xp', { ascending: false })
        .limit(10);

      if (error) throw error;

      // For now, generate mock names since we don't have user profiles
      const leaderboardData = topUsers?.map((user, index) => ({
        userId: user.user_id,
        name: `Usuário ${index + 1}`,
        level: user.current_level,
        xp: user.total_xp
      })) || [];

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchAchievements(),
        fetchChallenges(),
        fetchLeaderboard()
      ]);
      setLoading(false);
    };

    loadData();
  }, [progress]); // Refresh when progress changes

  return {
    achievements,
    challenges,
    leaderboard,
    loading,
    userProgress: progress,
    calculateXPForNextLevel: (level: number) => level * 100,
    refreshData: async () => {
      await Promise.all([
        fetchAchievements(),
        fetchChallenges(),
        fetchLeaderboard()
      ]);
    }
  };
};