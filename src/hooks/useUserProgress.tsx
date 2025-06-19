import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserProgressData {
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

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgressData>({
    total_xp: 0,
    current_level: 1,
    modules_completed: 0,
    quizzes_completed: 0,
    simulations_completed: 0,
    perfect_scores: 0,
    streak_days: 0,
    next_level_xp: 100,
    progress_percentage: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Call the database function to get user progress
      const { data, error } = await supabase.rpc('get_user_progress', {
        p_user_id: user.id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setProgress(data[0]);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    activityType: 'module' | 'quiz' | 'simulation',
    score?: number,
    perfectScore?: boolean
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Call the database function to update progress
      const { error } = await supabase.rpc('update_user_progress', {
        p_user_id: user.id,
        p_activity_type: activityType,
        p_score: score || null,
        p_perfect_score: perfectScore || false
      });

      if (error) throw error;

      // Refresh progress data
      await fetchUserProgress();

      // Show toast notification
      const xpGained = activityType === 'module' ? 50 : (score || (activityType === 'quiz' ? 30 : 40));
      toast({
        title: "Progresso Atualizado!",
        description: `Você ganhou ${xpGained} XP${perfectScore ? ' (Score Perfeito!)' : ''}`,
      });

    } catch (error) {
      console.error('Error updating progress:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu progresso.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchUserProgress();

    // Set up real-time subscription for progress updates
    const channel = supabase
      .channel('user_progress_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress'
        },
        () => {
          fetchUserProgress();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    progress,
    loading,
    updateProgress,
    refreshProgress: fetchUserProgress
  };
};