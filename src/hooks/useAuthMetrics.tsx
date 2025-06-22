
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthMetrics {
  totalUsers: number;
  googleAuthUsers: number;
  emailAuthUsers: number;
  googleAuthRate: number;
  isLoading: boolean;
  error: string | null;
}

export const useAuthMetrics = () => {
  const [metrics, setMetrics] = useState<AuthMetrics>({
    totalUsers: 0,
    googleAuthUsers: 0,
    emailAuthUsers: 0,
    googleAuthRate: 0,
    isLoading: true,
    error: null
  });

  const fetchMetrics = async () => {
    try {
      console.log('Buscando métricas de autenticação...');
      
      // Esta função só funcionará se você tiver acesso admin
      // Você pode implementar uma edge function para buscar esses dados
      const { data, error } = await supabase.functions.invoke('get-auth-metrics');
      
      if (error) {
        console.error('Erro ao buscar métricas:', error);
        setMetrics(prev => ({ ...prev, error: error.message, isLoading: false }));
        return;
      }

      if (data) {
        const googleRate = data.totalUsers > 0 ? (data.googleAuthUsers / data.totalUsers) * 100 : 0;
        
        setMetrics({
          totalUsers: data.totalUsers || 0,
          googleAuthUsers: data.googleAuthUsers || 0,
          emailAuthUsers: data.emailAuthUsers || 0,
          googleAuthRate: Math.round(googleRate),
          isLoading: false,
          error: null
        });
      }
    } catch (err) {
      console.error('Erro ao buscar métricas:', err);
      setMetrics(prev => ({ 
        ...prev, 
        error: 'Erro ao carregar métricas', 
        isLoading: false 
      }));
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return {
    ...metrics,
    refreshMetrics: fetchMetrics
  };
};
