
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Training from "./pages/Training";
import TrainingModule from "./pages/TrainingModule";
import TrainingQuiz from "./pages/TrainingQuiz";
import TrainingSimulator from "./pages/TrainingSimulator";
import Assistant from "./pages/Assistant";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/training" element={<Training />} />
          <Route path="/training/module/:moduleId" element={<TrainingModule />} />
          <Route path="/training/module/:moduleId/quiz/:lessonId" element={<TrainingQuiz />} />
          <Route path="/training/module/:moduleId/simulator/:lessonId" element={<TrainingSimulator />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
