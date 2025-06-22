
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { AppFlowProvider } from "./contexts/AppFlowContext";
import Index from "./pages/Index";
import Training from "./pages/Training";
import TrainingModule from "./pages/TrainingModule";
import TrainingQuiz from "./pages/TrainingQuiz";
import TrainingSimulator from "./pages/TrainingSimulator";
import TrainingSimulatorResult from "./pages/TrainingSimulatorResult";
import TrainingCertificate from "./pages/TrainingCertificate";
import MentorUP from "./pages/MentorUP";
import Plans from "./pages/Plans";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Success from "./pages/Success";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <AppFlowProvider>
          <OnboardingProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/training" element={<Training />} />
                <Route path="/training/module/:moduleId" element={<TrainingModule />} />
                <Route path="/training/module/:moduleId/quiz/:lessonId" element={<TrainingQuiz />} />
                <Route path="/training/module/:moduleId/simulator/:lessonId" element={<TrainingSimulator />} />
                <Route path="/training/simulator/:moduleId/:lessonId/result" element={<TrainingSimulatorResult />} />
                <Route path="/training/certificate/:moduleId" element={<TrainingCertificate />} />
                <Route path="/mentorup" element={<MentorUP />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/success" element={<Success />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </OnboardingProvider>
        </AppFlowProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
