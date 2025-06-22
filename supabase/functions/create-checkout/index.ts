
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== CHECKOUT FUNCTION STARTED ===");
    console.log("Request method:", req.method);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Get Stripe key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY not found");
      return new Response(
        JSON.stringify({ error: "Stripe configuration missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header");
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase configuration missing");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get user
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user?.email) {
      console.error("Authentication failed:", authError?.message);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("User authenticated:", user.email);

    // Get request body
    let requestData;
    try {
      const bodyText = await req.text();
      console.log("Raw request body:", bodyText);
      
      if (!bodyText || bodyText.trim() === '') {
        console.error("Empty request body received");
        return new Response(
          JSON.stringify({ error: "Request body is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      requestData = JSON.parse(bodyText);
      console.log("Parsed request data:", requestData);
    } catch (parseError) {
      console.error("Body parse error:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid request body format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { plan } = requestData;
    if (!plan) {
      console.error("No plan specified in request");
      return new Response(
        JSON.stringify({ error: "Plan is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Creating checkout for plan:", plan);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });

    // Check for existing customer
    let customerId;
    try {
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log("Found existing customer:", customerId);
      } else {
        console.log("No existing customer found, will create during checkout");
      }
    } catch (customerError) {
      console.error("Customer lookup failed:", customerError);
      // Continue without existing customer
    }

    // Plan configurations with correct price IDs
    const planConfigs = {
      closerUp: {
        priceId: "price_1Rb5oNE06ubkhHJygHtdcVJB",
        mode: "subscription" as const
      },
      mentorup: {
        priceId: "price_1Rc6srE06ubkhHJyYqZD2ko7",
        mode: "payment" as const
      }
    };

    const planConfig = planConfigs[plan as keyof typeof planConfigs];
    if (!planConfig) {
      console.error("Invalid plan:", plan, "Available plans:", Object.keys(planConfigs));
      return new Response(
        JSON.stringify({ error: "Invalid plan selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Using plan config:", planConfig);

    // Get origin for redirect URLs
    const origin = req.headers.get("origin") || req.headers.get("referer")?.split('/').slice(0, 3).join('/') || "https://preview--closer-ai-boost-58.lovable.app";
    const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/${plan === "mentorup" ? "mentorup" : "plans"}`;

    console.log("Checkout URLs:", { origin, successUrl, cancelUrl });

    // Create checkout session
    const sessionParams = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{
        price: planConfig.priceId,
        quantity: 1,
      }],
      mode: planConfig.mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: user.id,
        plan: plan,
        user_email: user.email
      },
      allow_promotion_codes: true,
    };

    console.log("Creating Stripe session with params:", JSON.stringify(sessionParams, null, 2));

    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionParams);
      console.log("Stripe session created successfully:", session.id);
      console.log("Session URL:", session.url);
    } catch (stripeError) {
      console.error("Stripe session creation failed:", stripeError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to create checkout session",
          details: stripeError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!session.url) {
      console.error("No session URL generated");
      return new Response(
        JSON.stringify({ error: "Checkout URL not generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("=== CHECKOUT SUCCESS ===");
    console.log("Returning session URL:", session.url);

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("=== CHECKOUT ERROR ===");
    console.error("Error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
