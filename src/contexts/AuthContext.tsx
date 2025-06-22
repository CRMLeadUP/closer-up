
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { toast } = useToast();

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    if (signingOut) {
      console.log('Sign out already in progress');
      return;
    }

    try {
      setSigningOut(true);
      console.log('Starting sign out process...');
      
      // Clear state immediately
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Supabase sign out error:', error);
        throw error;
      }
      
      console.log('Sign out completed successfully');
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso"
      });
    } catch (error) {
      console.error('Sign out failed:', error);
      // Even if there's an error, clear the local state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      throw error;
    } finally {
      setSigningOut(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session first
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setUser(null);
            setSession(null);
            setLoading(false);
          }
          return;
        }

        if (!mounted) return;

        console.log('Initial session:', session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check admin status without blocking
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        if (mounted) {
          setUser(null);
          setSession(null);
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state change:', event, session?.user?.email);
        
        if (event === 'SIGNED_OUT' || !session) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(session);
          setUser(session.user);
          
          // Show welcome message for Google users
          if (event === 'SIGNED_IN' && session.user?.app_metadata?.provider === 'google') {
            const isNewUser = new Date(session.user.created_at).getTime() > (Date.now() - 60000);
            setTimeout(() => {
              if (isNewUser) {
                toast({
                  title: "Bem-vindo ao CloserUP!",
                  description: `Olá, ${session.user?.user_metadata?.full_name || session.user?.email}! Conta criada com sucesso via Google.`
                });
              } else {
                toast({
                  title: "Login realizado com sucesso!",
                  description: `Bem-vindo de volta, ${session.user?.user_metadata?.full_name || session.user?.email}!`
                });
              }
            }, 1000);
          }
          
          if (session.user) {
            setTimeout(() => {
              checkAdminStatus(session.user.id);
            }, 0);
          }
        }
      }
    );

    // Get initial session
    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      isAdmin, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
