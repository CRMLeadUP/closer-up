import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone, Tablet, MapPin, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
}

interface SessionManagerProps {
  children: React.ReactNode;
}

export const SessionManager = ({ children }: SessionManagerProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulated sessions data - in real app this would come from Supabase
    const mockSessions: Session[] = [
      {
        id: '1',
        device: 'Chrome no Windows',
        location: 'São Paulo, SP',
        lastActive: '2 minutos atrás',
        current: true,
        deviceType: 'desktop'
      },
      {
        id: '2', 
        device: 'Safari no iPhone',
        location: 'São Paulo, SP',
        lastActive: '1 hora atrás',
        current: false,
        deviceType: 'mobile'
      },
      {
        id: '3',
        device: 'Edge no Windows',
        location: 'Rio de Janeiro, RJ',
        lastActive: '3 dias atrás',
        current: false,
        deviceType: 'desktop'
      }
    ];
    
    setSessions(mockSessions);
  }, []);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    toast({
      title: "Sessão encerrada",
      description: "A sessão foi encerrada com sucesso"
    });
  };

  const handleRevokeAllSessions = () => {
    setSessions(sessions.filter(s => s.current));
    toast({
      title: "Todas as sessões encerradas",
      description: "Todas as outras sessões foram encerradas"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="card-glass max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-sales-primary" />
            Gerenciar Sessões
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {sessions.map((session) => {
            const DeviceIcon = getDeviceIcon(session.deviceType);
            return (
              <Card key={session.id} className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <DeviceIcon className="h-5 w-5 text-sales-primary mt-0.5" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{session.device}</span>
                          {session.current && (
                            <Badge className="bg-sales-success/20 text-sales-success border-sales-success/30 text-xs">
                              Atual
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.lastActive}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {!session.current && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        className="h-8 text-xs text-red-400 border-red-400/30 hover:bg-red-400/10"
                      >
                        Encerrar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10"
            onClick={handleRevokeAllSessions}
          >
            Encerrar Todas as Outras Sessões
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Isso irá desconectar todos os outros dispositivos
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};