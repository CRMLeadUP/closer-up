
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Verificar chave do Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not found");
      return new Response(JSON.stringify({ error: "Stripe configuration error" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    logStep("Stripe key verified");

    // Verificar header de autorização
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header");
      return new Response(JSON.stringify({ error: "Authorization required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const token = authHeader.replace("Bearer ", "");
    logStep("Token extracted", { tokenLength: token.length });
    
    // Criar cliente Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    
    // Autenticar usuário
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData.user) {
      logStep("ERROR: Authentication failed", { error: userError?.message });
      return new Response(JSON.stringify({ error: "Authentication failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }
    
    const user = userData.user;
    if (!user.email) {
      logStep("ERROR: User email not available");
      return new Response(JSON.stringify({ error: "User email required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Processar body da requisição
    let requestBody;
    try {
      const bodyText = await req.text();
      logStep("Request body received", { bodyLength: bodyText.length });
      
      if (!bodyText.trim()) {
        logStep("ERROR: Empty request body");
        return new Response(JSON.stringify({ error: "Request body is required" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      
      requestBody = JSON.parse(bodyText);
      logStep("Request body parsed", { body: requestBody });
    } catch (parseError) {
      logStep("ERROR: Invalid JSON in request body", { error: parseError.message });
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { plan } = requestBody;
    
    // Validar plano
    const validPlans = ["closerUp", "closerAI", "mentorup"];
    if (!plan || !validPlans.includes(plan)) {
      logStep("ERROR: Invalid plan", { plan, validPlans });
      return new Response(JSON.stringify({ error: `Invalid plan. Must be one of: ${validPlans.join(", ")}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Plan validated", { plan });

    // Inicializar Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Verificar/criar cliente no Stripe
    let customerId;
    try {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Found existing customer", { customerId });
      } else {
        logStep("No existing customer found, will create during checkout");
      }
    } catch (stripeError) {
      logStep("ERROR: Failed to check Stripe customer", { error: stripeError.message });
      return new Response(JSON.stringify({ error: "Failed to verify customer" }), {
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
      logStep("ERROR: Price ID not found for plan", { plan });
      return new Response(JSON.stringify({ error: "Price not configured for plan" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    logStep("Using price ID", { priceId, plan });

    // Determinar origem para URLs de retorno
    const origin = req.headers.get("origin") || req.headers.get("referer")?.split('/').slice(0, 3).join('/') || "https://preview--closer-ai-boost-58.lovable.app";
    logStep("Using origin", { origin });
    
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

    logStep("Creating checkout session", { 
      mode: sessionConfig.mode,
      priceId,
      hasCustomer: !!customerId,
      successUrl: sessionConfig.success_url,
      cancelUrl: sessionConfig.cancel_url
    });

    // Criar sessão do checkout
    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionConfig);
      logStep("Checkout session created successfully", { 
        sessionId: session.id, 
        url: session.url,
        status: session.status
      });
    } catch (stripeError) {
      logStep("ERROR: Failed to create checkout session", { 
        error: stripeError.message,
        code: stripeError.code,
        type: stripeError.type
      });
      return new Response(JSON.stringify({ 
        error: "Failed to create checkout session",
        details: stripeError.message 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Verificar se a URL foi criada
    if (!session.url) {
      logStep("ERROR: No checkout URL returned from Stripe");
      return new Response(JSON.stringify({ error: "No checkout URL generated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    logStep("Function completed successfully", { url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    logStep("CRITICAL ERROR in create-checkout", { 
      message: errorMessage,
      stack: errorStack,
      type: typeof error
    });
    
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      message: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
