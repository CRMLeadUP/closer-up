import { Badge } from "@/components/ui/badge";
import { User, Clock, Video } from "lucide-react";

export const MentorHeader = () => {
  return (
    <div className="px-4 pb-6">
      <div className="text-center space-y-4">
        {/* Mentor Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
          <User className="h-10 w-10 text-white" />
        </div>
        
        <div>
          <h2 className="text-xl font-bold gradient-text mb-2">
            MentorUP
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Mentoria personalizada para vendedores de alta performance
          </p>
          
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-sales-primary" />
              <span>1 hora</span>
            </div>
            <div className="flex items-center gap-1">
              <Video className="h-3 w-3 text-sales-primary" />
              <span>Google Meet</span>
            </div>
            <Badge className="bg-sales-success/20 text-sales-success text-xs">
              ⭐ 4.9/5
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};