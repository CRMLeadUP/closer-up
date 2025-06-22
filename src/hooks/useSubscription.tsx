
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export const useSubscription = () => {
  const { user, session } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkSubscription = async () => {
    if (!user || !session) {
      console.log('No user or session, setting default subscription state');
      setSubscriptionData({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Checking subscription for user:', user.email);
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        }
      });
      
      if (error) {
        console.error('Subscription check error:', error);
        setError(error.message);
        return;
      }
      
      console.log('Subscription data received:', data);
      
      if (data) {
        setSubscriptionData(data);
      }
    } catch (err) {
      console.error('Subscription check error:', err);
      setError('Erro ao verificar assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && session) {
      checkSubscription();
    } else {
      setIsLoading(false);
    }
  }, [user, session]);

  const hasCloserUpAccess = () => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'closerUp';
  };

  const hasMentorUpAccess = () => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'mentorup';
  };

  const hasAnyPremiumAccess = () => {
    return subscriptionData.subscribed;
  };

  return {
    ...subscriptionData,
    isLoading,
    error,
    checkSubscription,
    hasCloserUpAccess,
    hasMentorUpAccess,
    hasAnyPremiumAccess
  };
};
