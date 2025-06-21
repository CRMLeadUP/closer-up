
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Shield, 
  Activity,
  Settings,
  Database,
  Crown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
  user_metadata: any;
  role?: string;
}

interface AdminLog {
  id: string;
  action: string;
  target_user_id: string;
  details: any;
  created_at: string;
  admin_user_id: string;
}

const Admin = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");

  // Redirecionar se não for admin
  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  const loadUsers = async () => {
    try {
      // Buscar usuários da tabela auth.users usando uma edge function
      const { data: usersData, error: usersError } = await supabase.functions.invoke('admin-get-users');
      
      if (usersError) {
        console.error('Error fetching users:', usersError);
        return;
      }

      // Buscar roles dos usuários
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        return;
      }

      // Combinar dados
      const usersWithRoles = (usersData || []).map((user: any) => ({
        ...user,
        role: rolesData?.find(r => r.user_id === user.id)?.role || 'user'
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários.",
        variant: "destructive"
      });
    }
  };

  const loadLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  const logAdminAction = async (action: string, targetUserId?: string, details?: any) => {
    try {
      await supabase
        .from('admin_logs')
        .insert({
          admin_user_id: user?.id,
          action,
          target_user_id: targetUserId,
          details
        });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      
      if (newRole === 'admin') {
        // Adicionar role de admin
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
      } else {
        // Remover role de admin
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
      }

      await logAdminAction(
        `Role changed to ${newRole}`,
        userId,
        { previousRole: currentRole, newRole }
      );

      toast({
        title: "Sucesso",
        description: `Usuário ${newRole === 'admin' ? 'promovido a' : 'removido de'} administrador.`
      });

      loadUsers();
      loadLogs();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o papel do usuário.",
        variant: "destructive"
      });
    }
  };

  const searchUserByEmail = async () => {
    if (!searchEmail) {
      loadUsers();
      return;
    }

    const filteredUsers = users.filter(user => 
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  useEffect(() => {
    if (isAdmin) {
      setLoading(true);
      Promise.all([loadUsers(), loadLogs()]).finally(() => setLoading(false));
    }
  }, [isAdmin]);

  if (adminLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sales-primary mx-auto mb-4"></div>
          <p>Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-8 w-8 text-sales-primary" />
              <h1 className="text-3xl font-bold gradient-text">Painel Administrativo</h1>
            </div>
            <p className="text-muted-foreground">Gerencie usuários, permissões e monitore atividades do sistema</p>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Sistema
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gerenciar Usuários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-6">
                    <div className="flex-1">
                      <Label htmlFor="search">Buscar por email</Label>
                      <Input
                        id="search"
                        placeholder="Digite o email do usuário..."
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                      />
                    </div>
                    <Button onClick={searchUserByEmail} className="mt-6">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sales-primary mx-auto mb-4"></div>
                        <p>Carregando usuários...</p>
                      </div>
                    ) : users.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
                      </div>
                    ) : (
                      users.map((userData) => (
                        <div key={userData.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/50">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium">{userData.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  Criado em: {new Date(userData.created_at).toLocaleDateString('pt-BR')}
                                </p>
                                {userData.last_sign_in_at && (
                                  <p className="text-sm text-muted-foreground">
                                    Último login: {new Date(userData.last_sign_in_at).toLocaleDateString('pt-BR')}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={userData.role === 'admin' ? 'default' : 'secondary'}
                              className={userData.role === 'admin' ? 'bg-sales-primary text-white' : ''}
                            >
                              {userData.role === 'admin' ? (
                                <>
                                  <Crown className="h-3 w-3 mr-1" />
                                  Admin
                                </>
                              ) : (
                                'Usuário'
                              )}
                            </Badge>
                            {userData.id !== user?.id && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleUserRole(userData.id, userData.role)}
                              >
                                {userData.role === 'admin' ? 'Remover Admin' : 'Tornar Admin'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Logs de Atividade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {logs.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum log encontrado.</p>
                      </div>
                    ) : (
                      logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background/50">
                          <div className="mt-1">
                            {log.action.includes('error') ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : log.action.includes('warning') ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{log.action}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(log.created_at).toLocaleString('pt-BR')}
                            </p>
                            {log.details && (
                              <pre className="text-xs text-muted-foreground mt-2 bg-muted p-2 rounded">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Informações do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-sales-primary" />
                        <span className="font-medium">Total de Usuários</span>
                      </div>
                      <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="h-4 w-4 text-sales-primary" />
                        <span className="font-medium">Administradores</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {users.filter(u => u.role === 'admin').length}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-sales-primary" />
                        <span className="font-medium">Ações Registradas</span>
                      </div>
                      <p className="text-2xl font-bold">{logs.length}</p>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-sales-primary" />
                        <span className="font-medium">Status do Sistema</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
