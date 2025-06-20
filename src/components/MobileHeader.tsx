
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-12 h-12 rounded-full bg-gradient-primary/10 p-2 flex items-center justify-center">
              <img 
                src="/lovable-uploads/f4316b18-3c15-4ee4-b740-f265a9014917.png" 
                alt="CloserUP Logo" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span className="text-lg font-bold gradient-text">CloserUP</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-0 right-0 h-full w-64 glass-effect border-l border-white/10 p-6">
            <nav className="flex flex-col space-y-4 mt-16">
              <a 
                href="#" 
                className="text-foreground hover:text-sales-primary transition-colors py-2"
                onClick={() => { navigate('/training'); setIsMenuOpen(false); }}
              >
                Treinamento
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-sales-primary transition-colors py-2"
                onClick={() => { navigate('/mentorup'); setIsMenuOpen(false); }}
              >
                Assistente IA
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-sales-primary transition-colors py-2"
                onClick={() => { navigate('/plans'); setIsMenuOpen(false); }}
              >
                Planos
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-sales-primary transition-colors py-2"
                onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
              >
                Perfil
              </a>
              <div className="pt-4 border-t border-white/10">
                <Button className="w-full btn-gradient justify-start">
                  Upgrade Premium
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
