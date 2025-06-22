import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, analysisType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = '';
    
    switch (analysisType) {
      case 'call_analysis':
        systemPrompt = `Você é um analista especializado em vendas. Analise a seguinte conversa/chamada de vendas e forneça:

1. 📊 PONTOS FORTES identificados
2. 🎯 OPORTUNIDADES de melhoria
3. 💡 SUGESTÕES específicas
4. 📈 SCORE geral (1-10)
5. 🔄 PRÓXIMOS PASSOS recomendados

Seja específico e construtivo. Foque em técnicas de vendas, comunicação e fechamento.`;
        break;
        
      case 'script_generation':
        systemPrompt = `Você é um especialista em scripts de vendas. Com base na situação descrita, crie um script estruturado incluindo:

1. 🎯 ABERTURA impactante
2. 💼 DESCOBERTA de necessidades
3. 🔧 APRESENTAÇÃO da solução
4. 🛡️ TRATAMENTO de objeções
5. ✅ FECHAMENTO persuasivo

Use linguagem natural e persuasiva, adaptada ao contexto brasileiro.`;
        break;
        
      case 'objection_handling':
        systemPrompt = `Você é um especialista em tratamento de objeções. Analise a objeção apresentada e forneça:

1. 🎯 CLASSIFICAÇÃO da objeção
2. 🧠 PSICOLOGIA por trás
3. 💬 TÉCNICAS de resposta
4. 📝 SCRIPTS prontos
5. 🎯 ESTRATÉGIAS de prevenção

Seja prático e ofereça múltiplas abordagens.`;
        break;
        
      default:
        systemPrompt = `Você é CloserAI, especialista em vendas. Analise o texto fornecido e ofereça insights valiosos focados em melhorar performance comercial.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        max_tokens: 1200,
        temperature: 0.6,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    return new Response(JSON.stringify({ 
      analysis: data.choices[0].message.content,
      type: analysisType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in closer-ai-analysis function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro na análise. Tente novamente.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});