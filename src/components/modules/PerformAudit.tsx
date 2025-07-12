
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const PerformAudit = () => {
  const audits = [
    {
      id: "audit-1",
      vendorName: "TechCorp Solutions",
      auditType: "Compliance Audit",
      status: "Scheduled",
      dueDate: "2024-07-15",
      findings: 0,
      riskLevel: "Low",
    },
    {
      id: "audit-2",
      vendorName: "Global Services Inc",
      auditType: "Performance Audit",
      status: "In Progress",
      dueDate: "2024-06-30",
      findings: 2,
      riskLevel: "Medium",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Perform Audit</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Conduct compliance and performance audits
        </p>
      </div>

      <div className="grid gap-6">
        {audits.map((audit) => (
          <Card key={audit.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Search className="w-6 h-6 text-purple-400" />
                  <div>
                    <CardTitle className="text-white">{audit.vendorName}</CardTitle>
                    <CardDescription className="text-slate-400">{audit.auditType}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={audit.riskLevel === "Low" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                    {audit.riskLevel} Risk
                  </Badge>
                  <Badge className={audit.status === "Scheduled" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}>
                    {audit.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Due Date</div>
                  <div className="text-lg font-bold text-white">{audit.dueDate}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Findings</div>
                  <div className="text-2xl font-bold text-white">{audit.findings}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Status</div>
                  <div className="text-lg font-bold text-white">{audit.status}</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Start Audit
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <FileText className="w-4 h-4 mr-2" />
                  View Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerformAudit;
