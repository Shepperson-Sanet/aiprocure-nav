
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VendorRiskRequest {
  vendorId: string;
  vendorData: {
    financialData?: any;
    complianceData?: any;
    operationalData?: any;
  };
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

    const { vendorId, vendorData }: VendorRiskRequest = await req.json();

    console.log(`Analyzing risk for vendor: ${vendorId}`);

    // Simulate AI risk analysis logic
    const riskAnalysis = {
      financialRisk: calculateFinancialRisk(vendorData.financialData),
      complianceRisk: calculateComplianceRisk(vendorData.complianceData),
      operationalRisk: calculateOperationalRisk(vendorData.operationalData),
    };

    const overallRiskLevel = determineOverallRisk(riskAnalysis);
    const riskDescription = generateRiskDescription(riskAnalysis);
    const mitigationPlan = generateMitigationPlan(riskAnalysis);

    // Insert risk record into database
    const { data: riskRecord, error } = await supabaseClient
      .from('risk_register')
      .insert({
        vendor_id: vendorId,
        risk_category: 'Comprehensive',
        risk_level: overallRiskLevel,
        mitigation_plan: mitigationPlan,
        detected_by_ai: true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        riskAnalysis,
        overallRiskLevel,
        riskDescription,
        mitigationPlan,
        riskRecordId: riskRecord.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in analyze-vendor-risk function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function calculateFinancialRisk(financialData: any): number {
  if (!financialData) return 50;
  // Simulate financial risk calculation
  const cashFlowScore = financialData.cashFlow || 0;
  const debtRatio = financialData.debtRatio || 0.5;
  return Math.min(100, Math.max(0, (debtRatio * 100) - (cashFlowScore / 1000)));
}

function calculateComplianceRisk(complianceData: any): number {
  if (!complianceData) return 30;
  // Simulate compliance risk calculation
  const certificationScore = complianceData.certifications?.length || 0;
  const auditScore = complianceData.lastAuditScore || 50;
  return Math.max(0, 50 - (certificationScore * 10) - (auditScore - 50));
}

function calculateOperationalRisk(operationalData: any): number {
  if (!operationalData) return 40;
  // Simulate operational risk calculation
  const experienceYears = operationalData.experienceYears || 0;
  const projectSuccessRate = operationalData.projectSuccessRate || 0.5;
  return Math.max(0, 80 - (experienceYears * 2) - (projectSuccessRate * 50));
}

function determineOverallRisk(analysis: any): string {
  const avgRisk = (analysis.financialRisk + analysis.complianceRisk + analysis.operationalRisk) / 3;
  if (avgRisk >= 60) return 'High';
  if (avgRisk >= 30) return 'Medium';
  return 'Low';
}

function generateRiskDescription(analysis: any): string {
  const risks = [];
  if (analysis.financialRisk > 50) risks.push('financial instability');
  if (analysis.complianceRisk > 40) risks.push('compliance gaps');
  if (analysis.operationalRisk > 45) risks.push('operational concerns');
  
  return risks.length > 0 
    ? `Detected ${risks.join(', ')} based on AI analysis`
    : 'Low risk profile across all categories';
}

function generateMitigationPlan(analysis: any): string {
  const plans = [];
  if (analysis.financialRisk > 50) plans.push('Request financial guarantees');
  if (analysis.complianceRisk > 40) plans.push('Verify certifications');
  if (analysis.operationalRisk > 45) plans.push('Require performance bonds');
  
  return plans.length > 0 
    ? plans.join('; ')
    : 'Continue with standard monitoring procedures';
}
