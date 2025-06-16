
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Trophy,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  User
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";

const TrainingCertificate = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const moduleData = {
    "1": {
      title: "Perfis Comportamentais",
      description: "Especialista em identificação e adaptação a perfis de clientes"
    },
    "2": {
      title: "Gatilhos Mentais",
      description: "Especialista em técnicas de persuasão e influência"
    },
    "3": {
      title: "Rapport e Conexão",
      description: "Especialista em criação de vínculos e relacionamentos"
    },
    "4": {
      title: "Quebra de Objeções",
      description: "Especialista em superação de resistências e objeções"
    },
    "5": {
      title: "Estratégias de Fechamento",
      description: "Especialista em finalização e conclusão de vendas"
    }
  };

  const module = moduleData[moduleId as keyof typeof moduleData];
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const userName = "Usuário CloserUP"; // Em uma aplicação real, viria do contexto do usuário

  const downloadCertificate = () => {
    // Aqui seria implementada a funcionalidade de download do certificado em PDF
    console.log("Downloading certificate...");
  };

  const shareCertificate = () => {
    // Aqui seria implementada a funcionalidade de compartilhamento
    if (navigator.share) {
      navigator.share({
        title: `Certificado CloserUP - ${module?.title}`,
        text: `Acabei de completar o módulo ${module?.title} na plataforma CloserUP!`,
        url: window.location.href
      });
    } else {
      // Fallback para browsers que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!module) {
    return <div>Módulo não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24 px-4">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(`/training/module/${moduleId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Módulo
        </Button>

        {/* Certificate Card */}
        <Card className="card-glass border-2 border-sales-primary/30">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-sales-primary to-sales-secondary flex items-center justify-center mb-4">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <Badge className="mb-4 bg-sales-success/20 text-sales-success border-sales-success/30">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Certificado Válido
            </Badge>
            <CardTitle className="text-2xl gradient-text mb-2">
              Certificado de Conclusão
            </CardTitle>
            <p className="text-muted-foreground">
              CloserUP - Plataforma de Treinamento em Vendas
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Certificate Content */}
            <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg border-2 border-dashed border-sales-primary/30">
              <p className="text-lg">
                Certificamos que
              </p>
              <h2 className="text-2xl font-bold gradient-text">
                {userName}
              </h2>
              <p className="text-lg">
                concluiu com sucesso o módulo
              </p>
              <h3 className="text-xl font-semibold text-sales-primary">
                {module.title}
              </h3>
              <p className="text-muted-foreground">
                {module.description}
              </p>
              
              <div className="flex items-center justify-center gap-4 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Data: {currentDate}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  ID: CU{moduleId}#{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Skills Acquired */}
            <div className="space-y-3">
              <h4 className="font-semibold">Habilidades Adquiridas:</h4>
              <div className="space-y-2 text-sm">
                {moduleId === "1" && (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-sales-success" />
                      <span>Identificação dos 4 perfis comportamentais principais</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-sales-success" />
                      <span>Adaptação de estratégias para cada perfil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-sales-success" />
                      <span>Comunicação eficaz com diferentes personalidades</span>
                    </div>
                  </>
                )}
                {/* Adicionar outras habilidades conforme o módulo */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={downloadCertificate}
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
              <Button 
                className="flex-1 btn-gradient"
                onClick={shareCertificate}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="card-glass mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Parabéns por concluir este módulo! Continue sua jornada de aprendizado:
            </p>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/training')}
              >
                📚 Explorar outros módulos
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/assistant')}
              >
                🤖 Praticar com o Assistente IA
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/profile')}
              >
                👤 Ver meu progresso completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default TrainingCertificate;
