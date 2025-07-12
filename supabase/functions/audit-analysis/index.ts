
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuditAnalysisRequest {
  module: string;
  tableName: string;
  recordId: string;
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

    const { module, tableName, recordId }: AuditAnalysisRequest = await req.json();

    console.log(`Performing audit analysis for ${module}: ${tableName}/${recordId}`);

    // Simulate AI-powered anomaly detection
    const anomalyAnalysis = await performAnomalyDetection(module, tableName, recordId);

    // Insert audit log
    const { data: auditLog, error } = await supabaseClient
      .from('audit_logs')
      .insert({
        module: module,
        table_name: tableName,
        record_id: recordId,
        anomaly_detected: anomalyAnalysis.anomalyDetected,
        anomaly_description: anomalyAnalysis.description,
        reviewed: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        auditLogId: auditLog.id,
        anomalyDetected: anomalyAnalysis.anomalyDetected,
        description: anomalyAnalysis.description,
        recommendations: anomalyAnalysis.recommendations,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in audit-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function performAnomalyDetection(module: string, tableName: string, recordId: string) {
  // Simulate AI anomaly detection logic
  const anomalyScore = Math.random();
  const threshold = 0.3;
  
  const anomalyDetected = anomalyScore > threshold;
  
  const descriptions = {
    'Risk Register': 'Unusual risk pattern detected - multiple high-risk vendors from same region',
    'RFx': 'Potential bid rigging detected - similar pricing patterns across vendors',
    'Contracts': 'Contract terms deviation from standard templates detected',
    'Performance Management': 'KPI anomaly - performance metrics outside expected range',
  };

  const recommendations = {
    'Risk Register': 'Review vendor selection criteria and geographical distribution',
    'RFx': 'Investigate vendor relationships and pricing methodology',
    'Contracts': 'Legal review recommended for non-standard terms',
    'Performance Management': 'Verify data accuracy and investigate performance issues',
  };

  return {
    anomalyDetected,
    description: anomalyDetected ? descriptions[module] || 'Anomaly detected in data patterns' : null,
    recommendations: anomalyDetected ? recommendations[module] || 'Further investigation recommended' : null,
  };
}
