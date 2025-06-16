
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Settings,
  Bell,
  Moon,
  Globe,
  Shield,
  Download,
  Trash2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Eye,
  Volume2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const SettingsPage = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "Conta",
      icon: User,
      items: [
        { label: "Editar Perfil", icon: User, action: () => {} },
        { label: "Alterar Email", icon: Mail, action: () => {} },
        { label: "Alterar Telefone", icon: Phone, action: () => {} },
        { label: "Privacidade", icon: Eye, action: () => {} }
      ]
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
        { label: "Notificações Push", toggle: true, enabled: true },
        { label: "Notificações por Email", toggle: true, enabled: false },
        { label: "Sons", toggle: true, enabled: true }
      ]
    },
    {
      title: "Aparência",
      icon: Moon,
      items: [
        { label: "Modo Escuro", toggle: true, enabled: false },
        { label: "Idioma", value: "Português (BR)", action: () => {} }
      ]
    },
    {
      title: "Dados",
      icon: Download,
      items: [
        { label: "Exportar Dados", icon: Download, action: () => {} },
        { label: "Limpar Cache", icon: Trash2, action: () => {} }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Configurações</h1>
            <p className="text-muted-foreground text-sm">
              Gerencie suas preferências e conta
            </p>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <Card key={sectionIndex} className="card-glass">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <SectionIcon className="h-5 w-5 text-sales-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.value && (
                          <Badge variant="outline" className="text-xs">
                            {item.value}
                          </Badge>
                        )}
                        
                        {item.toggle ? (
                          <Switch 
                            checked={item.enabled} 
                            onCheckedChange={() => {}}
                            className="data-[state=checked]:bg-sales-primary"
                          />
                        ) : item.action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={item.action}
                            className="text-xs h-8"
                          >
                            Editar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Privacy & Security */}
        <Card className="card-glass mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-sales-primary" />
              Privacidade e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Autenticação de Dois Fatores</span>
              <Badge variant="outline" className="text-xs bg-sales-success/20 text-sales-success border-sales-success/30">
                Ativo
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Sessões Ativas</span>
              <Button variant="ghost" size="sm" className="text-xs h-8">
                Gerenciar
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Alterar Senha</span>
              <Button variant="ghost" size="sm" className="text-xs h-8">
                Alterar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="card-glass mt-6">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">CloserUP</h3>
            <p className="text-sm text-muted-foreground mb-2">Versão 1.0.0</p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <button>Termos de Uso</button>
              <span>•</span>
              <button>Política de Privacidade</button>
              <span>•</span>
              <button>Suporte</button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default SettingsPage;
