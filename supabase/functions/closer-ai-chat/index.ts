import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const CLOSER_AI_SYSTEM_PROMPT = `Você é CloserAI, um assistente especializado em vendas e desenvolvimento comercial. Você tem expertise em:

VENDAS & NEGOCIAÇÃO:
- Técnicas de fechamento e persuasão
- Tratamento de objeções
- Prospecção e qualificação
- Construção de relacionamentos
- Psicologia de vendas
- Análise de perfis comportamentais

DESENVOLVIMENTO COMERCIAL:
- Estratégias de mercado
- Gestão de pipeline
- Métricas e KPIs
- Coaching de vendas
- Liderança comercial

COMUNICAÇÃO:
- Storytelling empresarial
- Apresentações impactantes
- Networking estratégico
- Comunicação persuasiva

CARACTERÍSTICAS DA SUA PERSONALIDADE:
- Direto e prático
- Focado em resultados
- Motivacional e inspirador
- Baseado em dados e evidências
- Linguagem clara e acessível
- Sempre oferece exemplos práticos

FORMATO DAS RESPOSTAS:
- Use emojis relevantes para engajamento
- Estruture com tópicos e subtópicos
- Inclua exemplos práticos e scripts
- Termine com dicas ou calls-to-action
- Mantenha o tom profissional mas acessível
- Responda sempre em português brasileiro

Seu objetivo é ajudar vendedores e empresários a melhorar seus resultados comerciais através de conselhos práticos e estratégias comprovadas.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation, userId } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Preparar contexto da conversa
    const messages = [
      { role: 'system', content: CLOSER_AI_SYSTEM_PROMPT },
      ...conversation.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      { role: 'user', content: message }
    ];

    // Chamar OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    const aiData = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${aiData.error?.message || 'Unknown error'}`);
    }

    const aiMessage = aiData.choices[0].message.content;

    // Salvar conversa no banco (opcional para histórico)
    if (userId) {
      try {
        await supabase.from('ai_conversations').insert({
          user_id: userId,
          user_message: message,
          ai_response: aiMessage,
          model_used: 'gpt-4o-mini'
        });
      } catch (error) {
        console.log('Error saving conversation:', error);
        // Não falhar a request se não conseguir salvar
      }
    }

    return new Response(JSON.stringify({ 
      response: aiMessage,
      model: 'gpt-4o-mini'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in closer-ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro interno do servidor. Tente novamente.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});