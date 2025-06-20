import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkSubscription = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        setError(error.message);
        return;
      }
      
      if (data) {
        setSubscriptionData(data);
      }
    } catch (err) {
      setError('Erro ao verificar assinatura');
      console.error('Subscription check error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const hasCloserUpAccess = () => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'closerUp';
  };

  const hasMentorUpAccess = () => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'mentorup';
  };

  return {
    ...subscriptionData,
    isLoading,
    error,
    checkSubscription,
    hasCloserUpAccess,
    hasMentorUpAccess
  };
};