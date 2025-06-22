
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    try {
      console.log('Iniciando autenticação com Google...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error('Erro na autenticação Google:', error);
        throw error;
      }

      console.log('Redirecionamento para Google iniciado');
      // O usuário será redirecionado para o Google, então não precisamos fazer mais nada aqui
      
    } catch (error: any) {
      console.error('Erro na autenticação Google:', error);
      toast({
        title: "Erro na autenticação",
        description: error.message || "Não foi possível fazer login com Google",
        variant: "destructive"
      });
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        console.log('Fazendo login com email/senha...');
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        toast({ 
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta ao CloserUP"
        });
        navigate("/");
      } else {
        console.log('Criando conta com email/senha...');
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split('@')[0]
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        
        toast({ 
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao CloserUP! Verifique seu email se necessário."
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error('Erro na autenticação:', error);
      let errorMessage = "Ocorreu um erro inesperado";
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email ou senha incorretos";
      } else if (error.message.includes('User already registered')) {
        errorMessage = "Este email já está cadastrado. Tente fazer login.";
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = "A senha deve ter pelo menos 6 caracteres";
      } else if (error.message.includes('Unable to validate email address')) {
        errorMessage = "Email inválido";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="card-glass max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">
            {isLogin ? "Entrar no CloserUP" : "Criar Conta"}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            {isLogin ? "Acesse sua conta e continue seu treinamento" : "Junte-se a milhares de vendedores de sucesso"}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Google Auth Button */}
          <Button 
            onClick={handleGoogleAuth}
            disabled={isGoogleLoading || isLoading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium relative overflow-hidden"
            variant="outline"
          >
            {isGoogleLoading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-sales-primary border-t-transparent"></div>
                <span>Conectando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{isLogin ? "Entrar com Google" : "Inscreva-se com Google"}</span>
              </div>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="mt-1"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className="mt-1"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-gradient h-12 font-medium"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Carregando...</span>
                </div>
              ) : (
                isLogin ? "Entrar" : "Criar Conta"
              )}
            </Button>
          </form>
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading || isGoogleLoading}
              className="text-sm"
            >
              {isLogin ? "Não tem conta? Criar nova conta" : "Já tem conta? Fazer login"}
            </Button>
          </div>

          {/* Privacy Notice */}
          <div className="text-center text-xs text-muted-foreground">
            <p>
              Ao continuar, você concorda com nossos{" "}
              <span className="text-sales-primary cursor-pointer hover:underline">
                Termos de Uso
              </span>{" "}
              e{" "}
              <span className="text-sales-primary cursor-pointer hover:underline">
                Política de Privacidade
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
