
import { Home, Brain, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AppBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/training', icon: Brain, label: 'Treinar' },
    { path: '/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-sales-primary bg-sales-primary/20' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AppBottomNav;
