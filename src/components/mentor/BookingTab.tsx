import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const BookingTab = () => {

  const steps = [
    { number: 1, title: "Realize o pagamento", description: "R$ 47,90 via cartão de crédito" },
    { number: 2, title: "Confirmação por email", description: "Receba detalhes da sessão" },
    { number: 3, title: "Escolha data e horário", description: "Acesse o link para agendar" },
    { number: 4, title: "Participe da mentoria", description: "Google Meet enviado por email" }
  ];

  return (
    <div className="space-y-6">
      {/* Steps */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">Como funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-sales-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
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

      {/* What's included */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-lg">O que está incluído</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
              <span className="text-sm">1 hora de mentoria ao vivo via Google Meet</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
              <span className="text-sm">Mapa mental personalizado criado na sessão</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
              <span className="text-sm">Script de vendas específico para seu perfil</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
              <span className="text-sm">Gravação completa da sessão</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-sales-success flex-shrink-0" />
              <span className="text-sm">Material exclusivo enviado por email</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guarantee */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>🔒 Pagamento 100% seguro via Stripe</p>
        <p>💯 Garantia de satisfação ou reembolso</p>
        <p>📧 Instruções de agendamento enviadas por email</p>
        <p>⚡ Acesso imediato após confirmação do pagamento</p>
      </div>
    </div>
  );
};