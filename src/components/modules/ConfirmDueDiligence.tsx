
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock, FileText, Users, Shield } from "lucide-react";

const ConfirmDueDiligence = () => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const vendors = [
    {
      id: "vendor-1",
      name: "TechCorp Solutions",
      status: "Pending Review",
      riskLevel: "Low",
      completedChecks: 8,
      totalChecks: 10,
      documents: ["Financial Statements", "Insurance Certificate", "Security Audit", "References"],
      complianceScore: 92,
    },
    {
      id: "vendor-2", 
      name: "Global Services Inc",
      status: "In Progress",
      riskLevel: "Medium",
      completedChecks: 6,
      totalChecks: 10,
      documents: ["Financial Statements", "Insurance Certificate"],
      complianceScore: 78,
    },
    {
      id: "vendor-3",
      name: "SecureFlow Systems",
      status: "Complete",
      riskLevel: "Low",
      completedChecks: 10,
      totalChecks: 10,
      documents: ["Financial Statements", "Insurance Certificate", "Security Audit", "References", "Certifications"],
      complianceScore: 96,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Confirm Due Diligence</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Review and confirm vendor due diligence checks, compliance scores, and risk assessments
        </p>
      </div>

      <div className="grid gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(vendor.status)}
                  <div>
                    <CardTitle className="text-white">{vendor.name}</CardTitle>
                    <CardDescription className="text-slate-400">Due Diligence Assessment</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getRiskBadgeColor(vendor.riskLevel)}>
                    <Shield className="w-3 h-3 mr-1" />
                    {vendor.riskLevel} Risk
                  </Badge>
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    Score: {vendor.complianceScore}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-slate-300">Completion Status</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {vendor.completedChecks}/{vendor.totalChecks}
                  </div>
                  <div className="text-xs text-slate-400">Checks Complete</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-slate-300">Documents</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{vendor.documents.length}</div>
                  <div className="text-xs text-slate-400">Submitted</div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-slate-300">Status</span>
                  </div>
                  <div className="text-lg font-semibold text-white">{vendor.status}</div>
                </div>
              </div>

              {/* Documents List */}
              <div>
                <h4 className="text-sm font-medium text-slate-300 mb-3">Submitted Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {vendor.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="text-slate-300 border-slate-600">
                      <FileText className="w-3 h-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Due Diligence Progress</span>
                  <span>{Math.round((vendor.completedChecks / vendor.totalChecks) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(vendor.completedChecks / vendor.totalChecks) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button 
                  onClick={() => setSelectedVendor(vendor.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Details
                </Button>
                
                {vendor.status === "Complete" && (
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Due Diligence
                  </Button>
                )}
                
                {vendor.status !== "Complete" && (
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    <Clock className="w-4 h-4 mr-2" />
                    Request Updates
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConfirmDueDiligence;
