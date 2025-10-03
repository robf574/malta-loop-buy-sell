import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { itemId, wantedAdId, type } = await req.json();
    
    console.log('Matching request:', { itemId, wantedAdId, type });

    let itemData, brandToMatch, userId, title;

    // Get item/wanted ad details
    if (type === 'listing' && itemId) {
      const { data } = await supabase
        .from('item_listings')
        .select('*, profiles(username)')
        .eq('id', itemId)
        .single();
      
      itemData = data;
      title = data?.title || '';
      userId = data?.user_id;
    } else if (type === 'wanted' && wantedAdId) {
      const { data } = await supabase
        .from('wanted_ads')
        .select('*, profiles(username)')
        .eq('id', wantedAdId)
        .single();
      
      itemData = data;
      title = data?.title || '';
      userId = data?.user_id;
    }

    if (!itemData) {
      throw new Error('Item not found');
    }

    // Use AI to extract brand from title/description
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a brand recognition expert. Extract the fashion brand name from the given text. Return only the brand name, nothing else. If no recognizable brand is found, return "UNKNOWN".'
          },
          {
            role: 'user',
            content: `Title: ${title}\nDescription: ${itemData.description || ''}`
          }
        ],
      }),
    });

    const aiData = await aiResponse.json();
    brandToMatch = aiData.choices?.[0]?.message?.content?.trim() || 'UNKNOWN';
    
    console.log('AI detected brand:', brandToMatch);

    if (brandToMatch === 'UNKNOWN') {
      return new Response(
        JSON.stringify({ message: 'No recognizable brand found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find matching users based on brand preferences
    let matchedUsers = [];

    if (type === 'listing') {
      // Find users who want this brand (in their wishlist)
      const { data: matches } = await supabase
        .from('user_brand_preferences')
        .select('user_id, wishlist_brands, profiles(username)')
        .contains('wishlist_brands', [brandToMatch])
        .neq('user_id', userId);
      
      matchedUsers = matches || [];

      // Create notifications for matched users
      for (const match of matchedUsers) {
        await supabase.from('notifications').insert({
          user_id: match.user_id,
          type: 'match_wishlist',
          title: `${brandToMatch} item available!`,
          body: `A ${brandToMatch} item you're looking for has been posted: ${title}`,
          related_item_id: itemId,
        });
      }
    } else if (type === 'wanted') {
      // Find users who own this brand
      const { data: matches } = await supabase
        .from('user_brand_preferences')
        .select('user_id, owned_brands, profiles(username)')
        .contains('owned_brands', [brandToMatch])
        .neq('user_id', userId);
      
      matchedUsers = matches || [];

      // Create notifications for matched users
      for (const match of matchedUsers) {
        await supabase.from('notifications').insert({
          user_id: match.user_id,
          type: 'match_owned',
          title: `Someone wants ${brandToMatch}!`,
          body: `Someone is looking for: ${title}. You might have this!`,
          related_wanted_ad_id: wantedAdId,
        });
      }
    }

    console.log(`Found ${matchedUsers.length} matching users`);

    return new Response(
      JSON.stringify({
        success: true,
        brand: brandToMatch,
        matchedUsersCount: matchedUsers.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in match-brands:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});