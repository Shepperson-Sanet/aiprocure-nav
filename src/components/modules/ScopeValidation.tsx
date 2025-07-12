import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileText, Shield, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClarificationMeeting from "./ClarificationMeeting";

const ScopeValidation = () => {
  const { toast } = useToast();
  const [meetingDialog, setMeetingDialog] = useState<{
    isOpen: boolean;
    vendorName: string;
    validationId: string;
  }>({
    isOpen: false,
    vendorName: "",
    validationId: ""
  });

  const validationItems = [
    {
      id: "scope-1",
      vendorName: "TechCorp Solutions",
      requirementType: "Technical Specifications",
      status: "Validated",
      validatedBy: "John Smith",
      validationDate: "2024-06-05",
      requirement: "24/7 system availability with 99.9% uptime",
      vendorResponse: "We guarantee 99.95% uptime with redundant systems",
      compliant: true,
    },
    {
      id: "scope-2",
      vendorName: "Global Services Inc",
      requirementType: "Service Level Agreement",
      status: "Pending Review",
      validatedBy: "",
      validationDate: "",
      requirement: "Response time under 4 hours for critical issues",
      vendorResponse: "We offer 6-hour response time for critical issues",
      compliant: false,
    },
  ];

  const handleIssueRFx = (vendorName: string) => {
    toast({
      title: "RFx Issued",
      description: `RFx has been issued to ${vendorName}`,
    });
  };

  const openMeetingDialog = (vendorName: string, validationId: string) => {
    setMeetingDialog({
      isOpen: true,
      vendorName,
      validationId
    });
  };

  const closeMeetingDialog = () => {
    setMeetingDialog({
      isOpen: false,
      vendorName: "",
      validationId: ""
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Scope Validation</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Validate vendor responses against RFx requirements and specifications
        </p>
      </div>

      <div className="grid gap-6">
        {validationItems.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">{item.vendorName}</CardTitle>
                    <CardDescription className="text-slate-400">{item.requirementType}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={item.compliant ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                    {item.compliant ? "Compliant" : "Non-Compliant"}
                  </Badge>
                  <Badge className={item.status === "Validated" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-2">Requirement</div>
                  <div className="text-white">{item.requirement}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400 mb-2">Vendor Response</div>
                  <div className="text-white">{item.vendorResponse}</div>
                </div>
              </div>
              {item.validatedBy && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-sm text-slate-400">Validated By</div>
                    <div className="text-white">{item.validatedBy}</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-lg">
                    <div className="text-sm text-slate-400">Validation Date</div>
                    <div className="text-white">{item.validationDate}</div>
                  </div>
                </div>
              )}
              <div className="flex space-x-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Scope
                </Button>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300"
                  onClick={() => openMeetingDialog(item.vendorName, item.id)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Clarification Meeting Required
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Request Clarification
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <FileText className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  onClick={() => handleIssueRFx(item.vendorName)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Issue RFx
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClarificationMeeting
        isOpen={meetingDialog.isOpen}
        onClose={closeMeetingDialog}
        vendorName={meetingDialog.vendorName}
        validationId={meetingDialog.validationId}
      />
    </div>
  );
};

export default ScopeValidation;
