import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  { code: "es-ES", name: "Español", flag: "🇪🇸" },
  { code: "fr-FR", name: "Français", flag: "🇫🇷" }
];

interface LanguageSelectorProps {
  children: React.ReactNode;
}

export const LanguageSelector = ({ children }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("pt-BR");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    const language = languages.find(l => l.code === languageCode);
    
    setOpen(false);
    toast({
      title: "Idioma alterado",
      description: `Idioma alterado para ${language?.name}`
    });
  };

  const getCurrentLanguage = () => {
    return languages.find(l => l.code === selectedLanguage) || languages[0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="card-glass">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-sales-primary" />
            Selecionar Idioma
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 mt-4">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedLanguage === language.code
                  ? 'bg-sales-primary/20 border-sales-primary/30'
                  : 'hover:bg-muted/50 border-border/50'
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </div>
              {selectedLanguage === language.code && (
                <Check className="h-4 w-4 text-sales-primary" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Mais idiomas serão adicionados em breve
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};