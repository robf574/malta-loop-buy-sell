import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all active services
    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .eq("status", "Active");

    if (servicesError) throw servicesError;

    // Simple keyword-based matching instead of AI
    const queryLower = query.toLowerCase();
    const matchingServices = services?.filter(service => 
      service.title.toLowerCase().includes(queryLower) ||
      service.description.toLowerCase().includes(queryLower) ||
      service.category.toLowerCase().includes(queryLower) ||
      service.locality.toLowerCase().includes(queryLower)
    ) || [];

    let recommendation = "No matching services found.";
    
    if (matchingServices.length > 0) {
      const topMatches = matchingServices.slice(0, 3);
      recommendation = `Based on your search for "${query}", here are some recommended services:\n\n` +
        topMatches.map(service => 
          `• ${service.title} (${service.category})\n  ${service.description}\n  Location: ${service.locality}`
        ).join('\n\n');
    }

    console.log("Service recommendation generated for query:", query);

    return new Response(
      JSON.stringify({ recommendation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in recommend-services function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
