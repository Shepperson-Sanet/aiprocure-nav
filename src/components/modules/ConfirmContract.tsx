
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Edit, CheckCircle } from "lucide-react";

const ConfirmContract = () => {
  const contracts = [
    {
      id: "contract-1",
      vendorName: "TechCorp Solutions",
      contractType: "Service Agreement",
      value: 125000,
      status: "Draft",
      startDate: "2024-07-01",
      endDate: "2025-06-30",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Confirm Contract</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Finalize contracts with selected vendors
        </p>
      </div>

      <div className="grid gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">{contract.vendorName}</CardTitle>
                    <CardDescription className="text-slate-400">{contract.contractType}</CardDescription>
                  </div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">
                  {contract.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Contract Value</div>
                  <div className="text-2xl font-bold text-white">${contract.value.toLocaleString()}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Start Date</div>
                  <div className="text-lg font-bold text-white">{contract.startDate}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">End Date</div>
                  <div className="text-lg font-bold text-white">{contract.endDate}</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Contract
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Terms
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConfirmContract;
