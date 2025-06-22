
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
    console.log("=== CHECKOUT STARTED ===");
    
    // Validate Stripe configuration
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("STRIPE_SECRET_KEY missing");
      return new Response(
        JSON.stringify({ error: "Payment system not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate request
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
    
    // Authenticate user
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

    // Parse request body safely
    let requestBody;
    try {
      const bodyText = await req.text();
      console.log("Request body:", bodyText);
      
      if (!bodyText?.trim()) {
        console.error("Empty request body");
        return new Response(
          JSON.stringify({ error: "Plan selection required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      requestBody = JSON.parse(bodyText);
      console.log("Parsed request:", requestBody);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { plan } = requestBody;
    if (!plan) {
      console.error("No plan specified");
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

    // Get or create customer
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
        console.log("Will create customer during checkout");
      }
    } catch (customerError) {
      console.error("Customer lookup failed:", customerError);
      return new Response(
        JSON.stringify({ error: "Customer processing failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Plan configurations
    const planConfigs = {
      closerUp: {
        priceId: "price_1Rb5oNE06ubkhHJygHtdcVJB",
        mode: "subscription"
      },
      closerAI: {
        priceId: "price_1Rb5oqE06ubkhHJyH7RW6SVC",
        mode: "subscription"
      },
      mentorup: {
        priceId: "price_1Rc6srE06ubkhHJyYqZD2ko7",
        mode: "payment"
      }
    };

    const planConfig = planConfigs[plan as keyof typeof planConfigs];
    if (!planConfig) {
      console.error("Invalid plan:", plan);
      return new Response(
        JSON.stringify({ error: "Invalid plan selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Using plan config:", planConfig);

    // Determine URLs
    const origin = req.headers.get("origin") || "https://preview--closer-ai-boost-58.lovable.app";
    const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/${plan === "mentorup" ? "mentorup" : "plans"}`;

    console.log("Redirect URLs:", { successUrl, cancelUrl });

    // Create checkout session
    const sessionConfig = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{
        price: planConfig.priceId,
        quantity: 1,
      }],
      mode: planConfig.mode as "payment" | "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: user.id,
        plan: plan,
        user_email: user.email
      },
      allow_promotion_codes: true,
    };

    console.log("Creating session...");

    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionConfig);
      console.log("Session created:", session.id);
    } catch (stripeError) {
      console.error("Stripe session creation failed:", stripeError);
      return new Response(
        JSON.stringify({ 
          error: "Payment session creation failed",
          details: stripeError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!session.url) {
      console.error("No session URL generated");
      return new Response(
        JSON.stringify({ error: "Payment URL not generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("=== CHECKOUT SUCCESS ===");
    console.log("Redirecting to:", session.url);

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id,
        success: true
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("=== CHECKOUT ERROR ===");
    console.error("Error details:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error.message || "Unknown error"
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
