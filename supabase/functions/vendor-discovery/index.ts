
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VendorDiscoveryRequest {
  searchParameterId: string;
  keywords: string[];
  targetSuppliers?: string[];
  productSpec?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { searchParameterId, keywords, targetSuppliers, productSpec }: VendorDiscoveryRequest = await req.json();

    console.log(`Discovering vendors for search: ${searchParameterId}`);

    // Simulate vendor discovery from multiple platforms
    const discoveredVendors = await simulateVendorDiscovery(keywords, targetSuppliers, productSpec);

    // Insert discovered vendors into database
    const vendorInserts = discoveredVendors.map(vendor => ({
      search_parameter_id: searchParameterId,
      company_name: vendor.companyName,
      email: vendor.email,
      website: vendor.website,
      product_title: vendor.productTitle,
      origin_country: vendor.originCountry,
      shipping_term: vendor.shippingTerm,
      source_platform: vendor.sourcePlatform,
      spec_match_score: vendor.specMatchScore,
      credibility_score: vendor.credibilityScore,
      ai_summary: vendor.aiSummary,
      contact_status: 'Not Contacted',
    }));

    const { data: insertedVendors, error } = await supabaseClient
      .from('discovered_vendors')
      .insert(vendorInserts)
      .select();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        vendorsFound: insertedVendors.length,
        vendors: insertedVendors,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in vendor-discovery function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function simulateVendorDiscovery(keywords: string[], targetSuppliers?: string[], productSpec?: string) {
  // Simulate discovering vendors from various platforms
  const platforms = ['Alibaba', 'ThomasNet', 'Global Sources', 'Made-in-China'];
  const countries = ['China', 'USA', 'Germany', 'India', 'Japan', 'South Korea'];
  
  const vendors = [];
  
  for (let i = 0; i < 10; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    vendors.push({
      companyName: `${keyword} Solutions ${i + 1}`,
      email: `contact@${keyword.toLowerCase()}solutions${i + 1}.com`,
      website: `https://www.${keyword.toLowerCase()}solutions${i + 1}.com`,
      productTitle: `High-Quality ${keyword} Products`,
      originCountry: country,
      shippingTerm: 'FOB',
      sourcePlatform: platform,
      specMatchScore: Math.floor(Math.random() * 40) + 60, // 60-100
      credibilityScore: Math.floor(Math.random() * 30) + 70, // 70-100
      aiSummary: `Established ${keyword.toLowerCase()} manufacturer with ${Math.floor(Math.random() * 15) + 5} years of experience. Specializes in high-quality products with international certifications.`,
    });
  }
  
  return vendors;
}
