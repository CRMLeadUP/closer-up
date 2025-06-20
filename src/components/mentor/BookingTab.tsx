import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const BookingTab = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock available dates and times - in real app this would come from Google Calendar API
  const availableDates = [
    { date: "2025-01-15", label: "15 Jan", dayOfWeek: "Qua" },
    { date: "2025-01-16", label: "16 Jan", dayOfWeek: "Qui" },
    { date: "2025-01-17", label: "17 Jan", dayOfWeek: "Sex" },
    { date: "2025-01-20", label: "20 Jan", dayOfWeek: "Seg" },
    { date: "2025-01-21", label: "21 Jan", dayOfWeek: "Ter" },
  ];

  const availableTimes = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, selecione uma data e horário",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create Google Calendar event
      const eventTitle = "MentorUP - Sessão de Mentoria Personalizada";
      const eventDescription = `Sessão de mentoria exclusiva de 1 hora com entrega de:
- Mapa mental personalizado
- Script de vendas exclusivo
- Gravação da sessão para consulta futura
- Estratégias personalizadas para seu perfil`;
      
      const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1 hour
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent(eventTitle)}` +
        `&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z` +
        `&details=${encodeURIComponent(eventDescription)}` +
        `&location=${encodeURIComponent('Google Meet (link será enviado por email)')}` +
        `&ctz=America/Sao_Paulo`;

      // Open Google Calendar with the event details
      window.open(googleCalendarUrl, '_blank');
      
      toast({
        title: "Agendamento confirmado!",
        description: "Sua sessão foi agendada. Verifique seu Google Calendar e aguarde o link do Meet por email."
      });

      // Reset form
      setSelectedDate("");
      setSelectedTime("");

    } catch (error) {
      console.error('Error creating calendar event:', error);
      toast({
        title: "Erro no agendamento",
        description: "Tente novamente ou entre em contato",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleCalendarDirect = () => {
    // Open mentor's Google Calendar directly
    window.open('https://calendar.google.com/calendar/u/0?cid=anVuaW9yemluaG8xMUBnbWFpbC5jb20', '_blank');
  };

  const steps = [
    { number: 1, title: "Pagamento realizado ✅", description: "Sessão já paga e confirmada" },
    { number: 2, title: "Escolha data e horário", description: "Selecione o melhor momento" },
    { number: 3, title: "Receba confirmação", description: "Link do Meet por email" }
  ];

  return (
    <div className="space-y-6">
      {/* Steps */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">Como funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sales-primary text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Escolha a Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {availableDates.map((date) => (
              <Button
                key={date.date}
                variant={selectedDate === date.date ? "default" : "outline"}
                className={`h-auto py-3 ${
                  selectedDate === date.date ? "btn-gradient" : "glass-effect"
                }`}
                onClick={() => setSelectedDate(date.date)}
              >
                <div className="text-center">
                  <div className="text-xs">{date.dayOfWeek}</div>
                  <div className="font-semibold">{date.label}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Escolha o Horário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`${
                    selectedTime === time ? "btn-gradient" : "glass-effect"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <Card className="card-glass border-sales-primary/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="h-5 w-5 text-sales-success" />
              <div>
                <h4 className="font-semibold">Sessão Selecionada</h4>
                <p className="text-sm text-muted-foreground">
                  {availableDates.find(d => d.date === selectedDate)?.label} às {selectedTime}
                </p>
              </div>
            </div>
            <Button 
              className="w-full btn-gradient"
              onClick={handleBooking}
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : "📅 Confirmar Data e Horário"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Google Calendar Integration */}
      <Card className="card-glass border-sales-secondary/50">
        <CardContent className="p-4 text-center">
          <h4 className="font-semibold mb-2">📅 Ver Agenda Completa</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Consulte todos os horários disponíveis na agenda do mentor
          </p>
          <Button 
            variant="outline" 
            className="w-full glass-effect"
            onClick={handleGoogleCalendarDirect}
          >
            🗓️ Abrir Google Calendar
          </Button>
        </CardContent>
      </Card>

      {/* Guarantee */}
      <div className="text-center text-sm text-muted-foreground">
        <p>🔒 Pagamento 100% seguro via Stripe</p>
        <p>💯 Garantia de satisfação ou reembolso</p>
        <p>📧 Link do Google Meet enviado por email após confirmação</p>
      </div>
    </div>
  );
};