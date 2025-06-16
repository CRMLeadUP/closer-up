import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export const useSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkSubscription = async () => {
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
    checkSubscription();
  }, []);

  const hasCloserUpAccess = () => {
    return subscriptionData.subscribed && 
           (subscriptionData.subscription_tier === 'closerUp' || 
            subscriptionData.subscription_tier === 'closerAI');
  };

  const hasCloserAIAccess = () => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'closerAI';
  };

  return {
    ...subscriptionData,
    isLoading,
    error,
    checkSubscription,
    hasCloserUpAccess,
    hasCloserAIAccess
  };
};