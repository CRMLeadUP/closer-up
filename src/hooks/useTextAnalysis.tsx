import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useTextAnalysis = () => {
  const [analysisText, setAnalysisText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [copiedAnalysis, setCopiedAnalysis] = useState(false);
  const { toast } = useToast();

  const analyzeText = async (analysisType: string) => {
    if (!analysisText.trim()) {
      toast({
        title: "Texto obrigatório",
        description: "Digite o texto que deseja analisar.",
        variant: "destructive"
      });
      return;
    }

    setAnalysisLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('closer-ai-analysis', {
        body: {
          text: analysisText,
          analysisType: analysisType
        }
      });

      if (error) throw error;

      setAnalysisResult(data.analysis);
      
      toast({
        title: "Análise concluída!",
        description: "Verifique os resultados abaixo."
      });
    } catch (error) {
      console.error('Error in analysis:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o texto. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAnalysis(true);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência."
      });
      setTimeout(() => setCopiedAnalysis(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive"
      });
    }
  };

  return {
    analysisText,
    setAnalysisText,
    analysisResult,
    analysisLoading,
    copiedAnalysis,
    analyzeText,
    copyToClipboard
  };
};