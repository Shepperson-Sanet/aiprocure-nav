import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RFXGenerationRequest {
  keyword: string;
  requirements: string[];
  budget?: number;
  timeline?: string;
  specifications?: string;
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

    const { keyword, requirements, budget, timeline, specifications }: RFXGenerationRequest = await req.json();

    console.log(`Generating RFx content for: ${keyword}`);

    // Generate RFx content based on inputs
    const rfxContent = {
      title: `Request for ${keyword}`,
      introduction: generateIntroduction(keyword, specifications),
      scope: generateScope(requirements, specifications),
      terms: generateTerms(budget, timeline),
      evaluationCriteria: generateEvaluationCriteria(),
      submissionRequirements: generateSubmissionRequirements(),
    };

    // Create RFx record in database
    const { data: rfxRecord, error: rfxError } = await supabaseClient
      .from('rfx')
      .insert({
        keyword: keyword,
        created_by: 'AI Generator',
      })
      .select()
      .single();

    if (rfxError) {
      throw rfxError;
    }

    // Add document requirements
    const documentRequirements = [
      'Company Profile',
      'Financial Statements',
      'Technical Proposal',
      'Commercial Proposal',
      'Compliance Certificates',
    ];

    for (const docType of documentRequirements) {
      await supabaseClient
        .from('document_requirements')
        .insert({
          rfx_id: rfxRecord.id,
          document_type: docType,
          mandatory: true,
        });
    }

    return new Response(
      JSON.stringify({
        success: true,
        rfxId: rfxRecord.id,
        content: rfxContent,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-rfx-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateIntroduction(keyword: string, specifications?: string): string {
  return `We are seeking qualified vendors to provide ${keyword} services. ${specifications ? `Specific requirements include: ${specifications}` : ''} This RFx is designed to identify the most suitable partner for our organization's needs.`;
}

function generateScope(requirements: string[], specifications?: string): string {
  const scopeItems = requirements.join(', ');
  return `The scope of work includes: ${scopeItems}. ${specifications ? `Additional specifications: ${specifications}` : ''} Vendors must demonstrate capability to deliver all specified requirements within the agreed timeline.`;
}

function generateTerms(budget?: number, timeline?: string): string {
  let terms = 'Standard commercial terms and conditions apply. ';
  if (budget) terms += `Budget range: $${budget.toLocaleString()}. `;
  if (timeline) terms += `Expected timeline: ${timeline}. `;
  terms += 'Payment terms will be negotiated with selected vendor.';
  return terms;
}

function generateEvaluationCriteria(): string {
  return 'Proposals will be evaluated based on: Technical capability (40%), Commercial competitiveness (30%), Company experience (20%), and Compliance requirements (10%).';
}

function generateSubmissionRequirements(): string {
  return 'All proposals must be submitted electronically by the specified deadline. Late submissions will not be considered. Proposals must include all required documentation and be signed by authorized representatives.';
}
