import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Users, Share2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrivacySettingsProps {
  children: React.ReactNode;
}

export const PrivacySettings = ({ children }: PrivacySettingsProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    profileVisibility: true,
    activityStatus: false,
    shareProgress: true,
    analyticsData: false,
    marketingEmails: false,
    dataCollection: true
  });
  const { toast } = useToast();

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    localStorage.setItem('privacySettings', JSON.stringify({ ...settings, [key]: value }));
    
    toast({
      title: "Configuração atualizada",
      description: "Suas preferências de privacidade foram salvas"
    });
  };

  const privacySections = [
    {
      title: "Visibilidade do Perfil",
      icon: Eye,
      items: [
        {
          key: "profileVisibility",
          label: "Perfil público",
          description: "Permitir que outros usuários vejam seu perfil",
          enabled: settings.profileVisibility
        },
        {
          key: "activityStatus",
          label: "Status de atividade",
          description: "Mostrar quando você está online",
          enabled: settings.activityStatus
        }
      ]
    },
    {
      title: "Compartilhamento",
      icon: Share2,
      items: [
        {
          key: "shareProgress",
          label: "Compartilhar progresso",
          description: "Permitir compartilhamento do seu progresso",
          enabled: settings.shareProgress
        }
      ]
    },
    {
      title: "Dados e Análise",
      icon: Activity,
      items: [
        {
          key: "analyticsData",
          label: "Dados de análise",
          description: "Permitir coleta de dados para melhorar o app",
          enabled: settings.analyticsData
        },
        {
          key: "dataCollection",
          label: "Coleta de dados",
          description: "Dados essenciais para funcionamento do app",
          enabled: settings.dataCollection
        }
      ]
    },
    {
      title: "Comunicação",
      icon: Users,
      items: [
        {
          key: "marketingEmails",
          label: "Emails de marketing",
          description: "Receber emails promocionais e novidades",
          enabled: settings.marketingEmails
        }
      ]
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="card-glass max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-sales-primary" />
            Configurações de Privacidade
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {privacySections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <Card key={index} className="border border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <SectionIcon className="h-4 w-4 text-sales-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                      <Switch
                        checked={item.enabled}
                        onCheckedChange={(value) => handleSettingChange(item.key, value)}
                        className="data-[state=checked]:bg-sales-primary"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 p-3 bg-muted/20 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Suas configurações de privacidade são importantes. 
            Você pode alterá-las a qualquer momento.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};