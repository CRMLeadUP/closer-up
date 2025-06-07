
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold gradient-text">CloserAI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-sales-primary transition-colors">
              Funcionalidades
            </a>
            <a href="#pricing" className="text-foreground hover:text-sales-primary transition-colors">
              Preços
            </a>
            <a href="#about" className="text-foreground hover:text-sales-primary transition-colors">
              Sobre
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-sales-primary">
              Login
            </Button>
            <Button className="btn-gradient">
              Começar Grátis
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="text-foreground hover:text-sales-primary transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="text-foreground hover:text-sales-primary transition-colors">
                Preços
              </a>
              <a href="#about" className="text-foreground hover:text-sales-primary transition-colors">
                Sobre
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="text-foreground hover:text-sales-primary justify-start">
                  Login
                </Button>
                <Button className="btn-gradient justify-start">
                  Começar Grátis
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
