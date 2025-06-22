
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
    console.log("=== CHECKOUT REQUEST START ===");
    
    // Validate Stripe key
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
      console.error("Authorization header missing");
      return new Response(
        JSON.stringify({ error: "Authorization required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
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
    
    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!user.email) {
      console.error("User email not found");
      return new Response(
        JSON.stringify({ error: "User email required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("User authenticated:", user.email);

    // Parse request body
    let requestBody;
    try {
      const bodyText = await req.text();
      console.log("Raw body:", bodyText);
      
      if (!bodyText || bodyText.trim() === '') {
        console.error("Empty request body");
        return new Response(
          JSON.stringify({ error: "Request body required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      requestBody = JSON.parse(bodyText);
      console.log("Parsed body:", requestBody);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { plan } = requestBody;
    if (!plan) {
      console.error("Plan not specified");
      return new Response(
        JSON.stringify({ error: "Plan is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Plan requested:", plan);

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });

    // Find or create customer
    let customerId;
    try {
      const customers = await stripe.customers.list({ 
        email: user.email, 
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log("Existing customer found:", customerId);
      } else {
        console.log("No customer found - will create during checkout");
      }
    } catch (stripeError) {
      console.error("Stripe customer lookup error:", stripeError);
      return new Response(
        JSON.stringify({ error: "Customer lookup failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Define price mapping
    const priceMap = {
      closerUp: "price_1Rb5oNE06ubkhHJygHtdcVJB",
      closerAI: "price_1Rb5oqE06ubkhHJyH7RW6SVC", 
      mentorup: "price_1Rc6srE06ubkhHJyYqZD2ko7"
    };

    const priceId = priceMap[plan as keyof typeof priceMap];
    if (!priceId) {
      console.error("Invalid plan:", plan);
      return new Response(
        JSON.stringify({ error: "Invalid plan selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Price ID:", priceId);

    // Determine origin for redirect URLs
    const origin = req.headers.get("origin") || 
                  req.headers.get("referer")?.split('/').slice(0, 3).join('/') || 
                  "https://preview--closer-ai-boost-58.lovable.app";

    console.log("Origin:", origin);

    // Create checkout session
    const sessionConfig = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: plan === "mentorup" ? "payment" : "subscription",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${plan === "mentorup" ? "mentorup" : "plans"}`,
      metadata: {
        user_id: user.id,
        plan: plan,
        user_email: user.email
      },
      allow_promotion_codes: true,
    };

    console.log("Creating session with config:", JSON.stringify(sessionConfig, null, 2));

    let session;
    try {
      session = await stripe.checkout.sessions.create(sessionConfig);
      console.log("Session created successfully:", session.id);
    } catch (stripeError) {
      console.error("Stripe session creation error:", stripeError);
      return new Response(
        JSON.stringify({ 
          error: "Checkout session creation failed",
          details: stripeError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!session.url) {
      console.error("Session URL not generated");
      return new Response(
        JSON.stringify({ error: "Checkout URL not generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("=== CHECKOUT SUCCESS ===");
    console.log("Session URL:", session.url);

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
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    
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
