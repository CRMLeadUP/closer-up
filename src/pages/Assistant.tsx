import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BarChart3, Zap } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import AppBottomNav from "@/components/AppBottomNav";
import { AssistantHeader } from "@/components/assistant/AssistantHeader";
import { ChatTab } from "@/components/assistant/ChatTab";
import { AnalysisTab } from "@/components/assistant/AnalysisTab";
import { ToolsTab } from "@/components/assistant/ToolsTab";

const Assistant = () => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      <div className="pt-20 pb-24">
        <AssistantHeader />

        <div className="px-4">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat IA
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Análises
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Ferramentas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <ChatTab />
            </TabsContent>

            <TabsContent value="analysis">
              <AnalysisTab />
            </TabsContent>

            <TabsContent value="tools">
              <ToolsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default Assistant;
