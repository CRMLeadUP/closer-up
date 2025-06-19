-- Create user_progress table for XP and levels
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  modules_completed INTEGER NOT NULL DEFAULT 0,
  quizzes_completed INTEGER NOT NULL DEFAULT 0,
  simulations_completed INTEGER NOT NULL DEFAULT 0,
  perfect_scores INTEGER NOT NULL DEFAULT 0,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  requirements JSONB NOT NULL,
  rarity TEXT NOT NULL DEFAULT 'common',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id),
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL,
  requirements JSONB NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_challenges table
CREATE TABLE public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id),
  progress JSONB NOT NULL DEFAULT '{}',
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON public.user_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for achievements (read-only for users)
CREATE POLICY "Achievements are viewable by everyone" 
ON public.achievements 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
ON public.user_achievements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for challenges
CREATE POLICY "Active challenges are viewable by everyone" 
ON public.challenges 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for user_challenges
CREATE POLICY "Users can view their own challenge progress" 
ON public.user_challenges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenge progress" 
ON public.user_challenges 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenge progress" 
ON public.user_challenges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update user progress timestamps
CREATE OR REPLACE FUNCTION public.update_user_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user_progress
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_user_progress_updated_at();

-- Insert initial achievements
INSERT INTO public.achievements (name, description, icon, category, xp_reward, requirements, rarity) VALUES
('Primeiro Passo', 'Complete seu primeiro módulo de treinamento', '🎯', 'modules', 100, '{"modules_completed": 1}', 'common'),
('Estudante Dedicado', 'Complete 5 módulos de treinamento', '📚', 'modules', 250, '{"modules_completed": 5}', 'common'),
('Expert em Vendas', 'Complete todos os módulos disponíveis', '👑', 'modules', 500, '{"modules_completed": 10}', 'rare'),
('Acertou em Cheio', 'Obtenha nota perfeita em um quiz', '⭐', 'quiz', 150, '{"perfect_scores": 1}', 'common'),
('Perfeccionista', 'Obtenha 10 notas perfeitas', '💎', 'quiz', 400, '{"perfect_scores": 10}', 'epic'),
('Simulador Master', 'Complete 25 simulações', '🎮', 'simulation', 300, '{"simulations_completed": 25}', 'rare'),
('Sequência de Fogo', 'Mantenha uma sequência de 7 dias', '🔥', 'streak', 200, '{"streak_days": 7}', 'uncommon'),
('Imparável', 'Mantenha uma sequência de 30 dias', '⚡', 'streak', 750, '{"streak_days": 30}', 'legendary'),
('Vendedor Novato', 'Alcance o nível 5', '🌟', 'level', 100, '{"current_level": 5}', 'common'),
('Vendedor Veterano', 'Alcance o nível 10', '🏆', 'level', 300, '{"current_level": 10}', 'rare'),
('Vendedor Lendário', 'Alcance o nível 20', '👑', 'level', 1000, '{"current_level": 20}', 'legendary');

-- Insert initial challenges
INSERT INTO public.challenges (title, description, challenge_type, requirements, xp_reward, start_date, end_date) VALUES
('Desafio da Semana', 'Complete 3 módulos esta semana', 'weekly', '{"modules_completed": 3}', 300, 
 date_trunc('week', CURRENT_DATE), 
 date_trunc('week', CURRENT_DATE) + interval '7 days'),
('Quiz Master', 'Obtenha nota perfeita em 5 quizzes', 'special', '{"perfect_scores": 5}', 500,
 CURRENT_DATE,
 CURRENT_DATE + interval '14 days'),
('Simulação Intensiva', 'Complete 10 simulações em uma semana', 'weekly', '{"simulations_completed": 10}', 400,
 date_trunc('week', CURRENT_DATE), 
 date_trunc('week', CURRENT_DATE) + interval '7 days');