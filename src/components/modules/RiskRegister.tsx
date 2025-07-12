
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Bot, TrendingUp } from "lucide-react";

const RiskRegister = () => {
  const risks = [
    {
      id: "risk-1",
      vendorName: "TechCorp Solutions",
      riskCategory: "Financial",
      riskLevel: "Medium",
      description: "Vendor has limited cash flow based on financial statements",
      detectedBy: "AI Analysis",
      mitigationPlan: "Request additional financial guarantees",
      probability: 30,
      impact: "Medium",
      detectedAt: "2024-06-05",
    },
    {
      id: "risk-2",
      vendorName: "Global Services Inc",
      riskCategory: "Operational",
      riskLevel: "High",
      description: "Vendor lacks experience in critical infrastructure projects",
      detectedBy: "AI Analysis",
      mitigationPlan: "Require partnership with experienced subcontractor",
      probability: 65,
      impact: "High",
      detectedAt: "2024-06-04",
    },
    {
      id: "risk-3",
      vendorName: "SecureFlow Systems",
      riskCategory: "Compliance",
      riskLevel: "Low",
      description: "Minor gaps in cybersecurity certifications",
      detectedBy: "AI Analysis",
      mitigationPlan: "Request certification updates within 30 days",
      probability: 15,
      impact: "Low",
      detectedAt: "2024-06-03",
    },
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">AI Risk Register</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          AI-powered risk detection and analysis for vendor management
        </p>
      </div>

      <div className="grid gap-6">
        {risks.map((risk) => (
          <Card key={risk.id} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                  <div>
                    <CardTitle className="text-white">{risk.vendorName}</CardTitle>
                    <CardDescription className="text-slate-400">{risk.riskCategory} Risk</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getRiskLevelColor(risk.riskLevel)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {risk.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                    <Bot className="w-3 h-3 mr-1" />
                    AI Detected
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <div className="text-sm font-medium text-slate-300 mb-2">Risk Description</div>
                <div className="text-white">{risk.description}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-slate-300">Probability</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{risk.probability}%</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-medium text-slate-300">Impact Level</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{risk.impact}</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Detected</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{risk.detectedAt}</div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <div className="text-sm font-medium text-slate-300 mb-2">Mitigation Plan</div>
                <div className="text-white">{risk.mitigationPlan}</div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Shield className="w-4 h-4 mr-2" />
                  Accept Risk
                </Button>
                
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Implement Mitigation
                </Button>
                
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Re-analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RiskRegister;
