
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const timestamp = new Date().toISOString();
  const detailsStr = details ? ` - ${JSON.stringify(details, null, 2)}` : '';
  console.log(`[${timestamp}] [CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  logStep("=== NOVA REQUISIÇÃO INICIADA ===");
  logStep("Method", req.method);
  logStep("URL", req.url);
  logStep("Headers", Object.fromEntries(req.headers.entries()));

  if (req.method === "OPTIONS") {
    logStep("Retornando resposta CORS");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verificar chave do Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERRO CRÍTICO: STRIPE_SECRET_KEY não encontrada");
      return new Response(JSON.stringify({ 
        error: "Configuração do Stripe não encontrada",
        code: "STRIPE_CONFIG_ERROR"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    logStep("Chave do Stripe verificada");

    // Verificar header de autorização
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERRO: Header de autorização ausente");
      return new Response(JSON.stringify({ 
        error: "Header de autorização obrigatório",
        code: "AUTH_HEADER_MISSING"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const token = authHeader.replace("Bearer ", "");
    logStep("Token extraído", { tokenLength: token.length, tokenStart: token.substring(0, 20) + '...' });
    
    // Criar cliente Supabase para autenticação
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      logStep("ERRO: Configuração do Supabase ausente");
      return new Response(JSON.stringify({ 
        error: "Configuração do servidor incompleta",
        code: "SUPABASE_CONFIG_ERROR"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    logStep("Cliente Supabase criado");
    
    // Autenticar usuário
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      logStep("ERRO na autenticação", { error: userError.message, code: userError.name });
      return new Response(JSON.stringify({ 
        error: "Falha na autenticação do usuário",
        details: userError.message,
        code: "AUTH_USER_ERROR"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = userData.user;
    if (!user || !user.email) {
      logStep("ERRO: Usuário ou email não disponível", { user: !!user, email: user?.email });
      return new Response(JSON.stringify({ 
        error: "Email do usuário obrigatório",
        code: "USER_EMAIL_REQUIRED"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Usuário autenticado", { userId: user.id, email: user.email });

    // Processar body da requisição
    let requestBody;
    let bodyText = "";
    
    try {
      bodyText = await req.text();
      logStep("Body da requisição recebido", { 
        bodyLength: bodyText.length, 
        isEmpty: !bodyText.trim(),
        bodyPreview: bodyText.substring(0, 200)
      });
      
      if (!bodyText.trim()) {
        logStep("ERRO: Body da requisição vazio");
        return new Response(JSON.stringify({ 
          error: "Dados da requisição obrigatórios",
          code: "EMPTY_REQUEST_BODY"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      
      requestBody = JSON.parse(bodyText);
      logStep("Body parseado com sucesso", requestBody);
    } catch (parseError) {
      logStep("ERRO ao fazer parse do JSON", { 
        error: parseError.message, 
        bodyText: bodyText.substring(0, 500)
      });
      return new Response(JSON.stringify({ 
        error: "Formato JSON inválido no corpo da requisição",
        details: parseError.message,
        code: "INVALID_JSON"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { plan } = requestBody;
    
    // Validar plano
    const validPlans = ["closerUp", "closerAI", "mentorup"];
    if (!plan || !validPlans.includes(plan)) {
      logStep("ERRO: Plano inválido", { plan, validPlans });
      return new Response(JSON.stringify({ 
        error: `Plano inválido. Deve ser um de: ${validPlans.join(", ")}`,
        received: plan,
        code: "INVALID_PLAN"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Plano validado", { plan });

    // Inicializar Stripe
    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });
    logStep("Stripe inicializado");
    
    // Verificar/criar cliente no Stripe
    let customerId;
    try {
      logStep("Procurando cliente existente no Stripe", { email: user.email });
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Cliente existente encontrado", { customerId });
      } else {
        logStep("Nenhum cliente encontrado, será criado durante o checkout");
      }
    } catch (stripeError) {
      logStep("ERRO ao verificar cliente no Stripe", { 
        error: stripeError.message,
        type: stripeError.type,
        code: stripeError.code
      });
      return new Response(JSON.stringify({ 
        error: "Falha ao verificar cliente no Stripe",
        details: stripeError.message,
        code: "STRIPE_CUSTOMER_ERROR"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Definir preços
    const priceIds = {
      closerUp: "price_1Rb5oNE06ubkhHJygHtdcVJB",
      closerAI: "price_1Rb5oqE06ubkhHJyH7RW6SVC",
      mentorup: "price_1Rc6srE06ubkhHJyYqZD2ko7"
    };

    const priceId = priceIds[plan as keyof typeof priceIds];
    if (!priceId) {
      logStep("ERRO: Price ID não encontrado", { plan, availablePlans: Object.keys(priceIds) });
      return new Response(JSON.stringify({ 
        error: "Preço não configurado para o plano selecionado",
        plan,
        code: "PRICE_NOT_CONFIGURED"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Price ID encontrado", { priceId, plan });

    // Determinar origem para URLs de retorno
    const origin = req.headers.get("origin") || 
                  req.headers.get("referer")?.split('/').slice(0, 3).join('/') || 
                  "https://preview--closer-ai-boost-58.lovable.app";
    logStep("Origem determinada", { origin });
    
    // Configurar sessão do checkout
    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: plan === "mentorup" ? "payment" as const : "subscription" as const,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${plan === "mentorup" ? "mentorup" : "plans"}`,
      metadata: {
        user_id: user.id,
        plan: plan,
        user_email: user.email
      },
      allow_promotion_codes: true,
    };

    logStep("Configuração da sessão preparada", { 
      mode: sessionConfig.mode,
      priceId,
      hasCustomer: !!customerId,
      successUrl: sessionConfig.success_url,
      cancelUrl: sessionConfig.cancel_url
    });

    // Criar sessão do checkout
    let session;
    try {
      logStep("Criando sessão do checkout no Stripe...");
      session = await stripe.checkout.sessions.create(sessionConfig);
      logStep("Sessão criada com sucesso", { 
        sessionId: session.id, 
        url: session.url,
        status: session.status,
        paymentStatus: session.payment_status
      });
    } catch (stripeError) {
      logStep("ERRO CRÍTICO ao criar sessão", { 
        error: stripeError.message,
        code: stripeError.code,
        type: stripeError.type,
        requestId: stripeError.requestId
      });
      return new Response(JSON.stringify({ 
        error: "Falha ao criar sessão de checkout",
        details: stripeError.message,
        code: "STRIPE_SESSION_ERROR",
        stripeCode: stripeError.code
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Verificar URL da sessão
    if (!session.url) {
      logStep("ERRO: URL da sessão não retornada pelo Stripe");
      return new Response(JSON.stringify({ 
        error: "URL de checkout não foi gerada",
        sessionId: session.id,
        code: "NO_CHECKOUT_URL"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    logStep("=== SUCESSO COMPLETO ===", { 
      sessionId: session.id,
      checkoutUrl: session.url,
      plan,
      userEmail: user.email
    });

    return new Response(JSON.stringify({ 
      url: session.url,
      sessionId: session.id,
      success: true
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    logStep("=== ERRO CRÍTICO GERAL ===", { 
      message: errorMessage,
      stack: errorStack,
      type: typeof error,
      errorName: error instanceof Error ? error.name : 'Unknown'
    });
    
    return new Response(JSON.stringify({ 
      error: "Erro interno do servidor",
      message: errorMessage,
      code: "INTERNAL_SERVER_ERROR"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
