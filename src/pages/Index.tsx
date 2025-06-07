
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Brain, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Crown,
  CheckCircle2,
  Zap,
  Award,
  BarChart3
} from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <FeatureCards />
      <PricingSection />
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            Pronto para revolucionar suas vendas?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de vendedores que já estão fechando mais negócios com nossa plataforma.
          </p>
          <Button size="lg" className="btn-gradient text-lg px-8 py-4">
            Começar Agora - Grátis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
