-- Reset all user progress to start fresh
TRUNCATE TABLE user_progress;
TRUNCATE TABLE user_achievements;
TRUNCATE TABLE user_challenges;

-- Create function to update user progress
CREATE OR REPLACE FUNCTION public.update_user_progress(
  p_user_id uuid,
  p_activity_type text,
  p_score integer DEFAULT NULL,
  p_perfect_score boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert or update user progress
  INSERT INTO public.user_progress (
    user_id,
    total_xp,
    modules_completed,
    quizzes_completed,
    simulations_completed,
    perfect_scores,
    current_level,
    last_activity_date,
    streak_days
  ) VALUES (
    p_user_id,
    0,
    0,
    0,
    0,
    0,
    1,
    CURRENT_DATE,
    1
  )
  ON CONFLICT (user_id) DO NOTHING;

  -- Update progress based on activity type
  IF p_activity_type = 'module' THEN
    UPDATE public.user_progress 
    SET 
      modules_completed = modules_completed + 1,
      total_xp = total_xp + 50,
      last_activity_date = CURRENT_DATE,
      updated_at = now()
    WHERE user_id = p_user_id;
    
  ELSIF p_activity_type = 'quiz' THEN
    UPDATE public.user_progress 
    SET 
      quizzes_completed = quizzes_completed + 1,
      total_xp = total_xp + COALESCE(p_score, 30),
      perfect_scores = perfect_scores + CASE WHEN p_perfect_score THEN 1 ELSE 0 END,
      last_activity_date = CURRENT_DATE,
      updated_at = now()
    WHERE user_id = p_user_id;
    
  ELSIF p_activity_type = 'simulation' THEN
    UPDATE public.user_progress 
    SET 
      simulations_completed = simulations_completed + 1,
      total_xp = total_xp + COALESCE(p_score, 40),
      perfect_scores = perfect_scores + CASE WHEN p_perfect_score THEN 1 ELSE 0 END,
      last_activity_date = CURRENT_DATE,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;

  -- Update current level based on XP (every 100 XP = 1 level)
  UPDATE public.user_progress 
  SET current_level = GREATEST(1, (total_xp / 100) + 1)
  WHERE user_id = p_user_id;

  -- Update streak days
  UPDATE public.user_progress 
  SET streak_days = CASE 
    WHEN last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN streak_days + 1
    WHEN last_activity_date = CURRENT_DATE THEN streak_days
    ELSE 1
  END
  WHERE user_id = p_user_id;
END;
$$;

-- Create function to get user progress
CREATE OR REPLACE FUNCTION public.get_user_progress(p_user_id uuid)
RETURNS TABLE (
  total_xp integer,
  current_level integer,
  modules_completed integer,
  quizzes_completed integer,
  simulations_completed integer,
  perfect_scores integer,
  streak_days integer,
  next_level_xp integer,
  progress_percentage numeric
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    up.total_xp,
    up.current_level,
    up.modules_completed,
    up.quizzes_completed,
    up.simulations_completed,
    up.perfect_scores,
    up.streak_days,
    (up.current_level * 100) as next_level_xp,
    ROUND(((up.total_xp % 100) * 100.0 / 100), 1) as progress_percentage
  FROM public.user_progress up
  WHERE up.user_id = p_user_id;
  
  -- If no record exists, return default values
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      0 as total_xp,
      1 as current_level,
      0 as modules_completed,
      0 as quizzes_completed,
      0 as simulations_completed,
      0 as perfect_scores,
      0 as streak_days,
      100 as next_level_xp,
      0.0 as progress_percentage;
  END IF;
END;
$$;