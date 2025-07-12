
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, CheckCircle, Clock, FileText } from "lucide-react";

const ConfirmOnboarding = () => {
  const vendors = [
    {
      id: "vendor-1",
      name: "TechCorp Solutions",
      status: "In Progress",
      completedSteps: 3,
      totalSteps: 5,
      documents: ["Tax Forms", "Insurance", "Banking Details"],
      nextStep: "System Access Setup",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Confirm Onboarding</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Manage vendor onboarding processes and documentation
        </p>
      </div>

      <div className="grid gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-6 h-6 text-green-400" />
                  <div>
                    <CardTitle className="text-white">{vendor.name}</CardTitle>
                    <CardDescription className="text-slate-400">Vendor Onboarding</CardDescription>
                  </div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">
                  {vendor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Progress</div>
                  <div className="text-2xl font-bold text-white">{vendor.completedSteps}/{vendor.totalSteps}</div>
                  <div className="text-xs text-slate-400">Steps Completed</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Next Step</div>
                  <div className="text-lg font-medium text-white">{vendor.nextStep}</div>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(vendor.completedSteps / vendor.totalSteps) * 100}%` }}
                ></div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Review Progress
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <FileText className="w-4 h-4 mr-2" />
                  View Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConfirmOnboarding;
