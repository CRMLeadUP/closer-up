import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const WebHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="web-header web-only">
      <div className="web-container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sales-primary to-sales-secondary flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CloserUP</span>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/training')}
              className="text-muted-foreground hover:text-foreground"
            >
              Treinamentos
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/mentorup')}
              className="text-muted-foreground hover:text-foreground"
            >
              MentorUP
              <Badge className="ml-2 text-xs bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
                R$ 47,90
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/plans')}
              className="text-muted-foreground hover:text-foreground"
            >
              Planos
            </Button>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Perfil</span>
                </Button>
                <Button 
                  className="btn-gradient"
                  onClick={() => navigate('/training')}
                >
                  Continuar Treinamento
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth')}
                >
                  Entrar
                </Button>
                <Button 
                  className="btn-gradient"
                  onClick={() => navigate('/auth')}
                >
                  Começar Grátis
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate('/training');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Treinamentos
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate('/mentorup');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                MentorUP
                <Badge className="ml-2 text-xs bg-sales-secondary/20 text-sales-secondary border-sales-secondary/30">
                  R$ 47,90
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => {
                  navigate('/plans');
                  setMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Planos
              </Button>
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Button>
                  <Button 
                    className="btn-gradient justify-start"
                    onClick={() => {
                      navigate('/training');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Continuar Treinamento
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Entrar
                  </Button>
                  <Button 
                    className="btn-gradient justify-start"
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Começar Grátis
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default WebHeader;