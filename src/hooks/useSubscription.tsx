
import { useState, useEffect, useCallback } from 'react';
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

  const checkSubscription = useCallback(async () => {
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
        // Set default values on error
        setSubscriptionData({
          subscribed: false,
          subscription_tier: null,
          subscription_end: null
        });
        return;
      }
      
      console.log('Subscription data received:', data);
      
      if (data) {
        setSubscriptionData(data);
      } else {
        // Set default values if no data returned
        setSubscriptionData({
          subscribed: false,
          subscription_tier: null,
          subscription_end: null
        });
      }
    } catch (err) {
      console.error('Subscription check error:', err);
      setError('Erro ao verificar assinatura');
      // Set default values on catch
      setSubscriptionData({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, session?.access_token]);

  useEffect(() => {
    // Set timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('Subscription check timeout, setting default state');
        setSubscriptionData({
          subscribed: false,
          subscription_tier: null,
          subscription_end: null
        });
        setIsLoading(false);
      }
    }, 3000); // 3 second timeout

    if (user && session) {
      checkSubscription();
    } else {
      setIsLoading(false);
      setSubscriptionData({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
    }

    return () => clearTimeout(timeout);
  }, [user?.id, session?.access_token, checkSubscription]);

  const hasCloserUpAccess = useCallback(() => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'closerUp';
  }, [subscriptionData.subscribed, subscriptionData.subscription_tier]);

  const hasMentorUpAccess = useCallback(() => {
    return subscriptionData.subscribed && 
           subscriptionData.subscription_tier === 'mentorup';
  }, [subscriptionData.subscribed, subscriptionData.subscription_tier]);

  const hasAnyPremiumAccess = useCallback(() => {
    return subscriptionData.subscribed;
  }, [subscriptionData.subscribed]);

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
