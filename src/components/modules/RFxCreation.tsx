import { useState, useEffect } from "react";
import { Calendar, Edit, DollarSign, Clock, Plus, AlertCircle, CheckCircle, FileText, MessageSquare, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ScopeDetails {
  description: string;
  licensingRequirements: string[];
  hsseClause: string;
  cyberSecurityRequirements: string[];
  conflictOfInterest: string;
  slas: string[];
  kpis: string[];
}

type RFxType = "RFP" | "RFQ" | "RFI" | null;

const RFxCreation = () => {
  const [scopeDetails, setScopeDetails] = useState<ScopeDetails>({
    description: "30 kVA Diesel Generators",
    licensingRequirements: ["Valid business registration", "Equipment certification", "Insurance coverage"],
    hsseClause: "All equipment must meet safety standards and include maintenance protocols",
    cyberSecurityRequirements: ["Data encryption", "Secure access protocols"],
    conflictOfInterest: "Vendors must declare any potential conflicts of interest",
    slas: ["24/7 availability", "4-hour response time", "Monthly maintenance"],
    kpis: ["Uptime percentage", "Response time", "Customer satisfaction score"]
  });

  const [rfxType, setRfxType] = useState<RFxType>(null);
  const [formData, setFormData] = useState({
    department: "",
    quantity: "",
    deliveryDate: "",
    additionalRequirements: "",
    budgetAmount: ""
  });

  const [budgetStatus, setBudgetStatus] = useState<"checking" | "approved" | "pending" | "rejected">("checking");
  const [timeline, setTimeline] = useState({
    draftingTime: "2 days",
    vendorResponseWindow: "7 days",
    evaluationPeriod: "5 days",
    expectedAwardDate: "",
    finalDeliveryDate: "",
    expectedCloseDate: ""
  });

  const [babatundeRecommendation, setBabatundeRecommendation] = useState<RFxType>("RFQ");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { toast } = useToast();

  const departments = [
    "IT",
    "Procurement", 
    "Operations",
    "Finance",
    "HR",
    "Marketing",
    "Engineering",
    "Facilities"
  ];

  const rfxTypes = [
    {
      type: "RFP" as const,
      title: "Request for Proposal",
      description: "Comprehensive proposals with detailed technical and commercial solutions",
      workingDays: 25,
      icon: FileText
    },
    {
      type: "RFQ" as const,
      title: "Request for Quotation",
      description: "Price quotations for clearly defined specifications",
      workingDays: 14,
      icon: DollarSign
    },
    {
      type: "RFI" as const,
      title: "Request for Information",
      description: "Information gathering about capabilities and market conditions",
      workingDays: 20,
      icon: Search
    }
  ];

  // Updated timeline data with corrected RFQ calculations
  const timelineData = {
    RFP: {
      title: "RFP Timeline Guidelines",
      description: "Standard process timeline for Request for Proposal workflow",
      heading: "RFP Process Timeline",
      steps: [
        { name: "Sourcing", days: "4 days" },
        { name: "Scope Clarification", days: "2 days" },
        { name: "RFP", days: "10 days" },
        { name: "In-person Meeting for BAFO", days: "2 days" },
        { name: "BAFO", days: "3 days" },
        { name: "Due Diligence", days: "3 days" },
        { name: "Confirm Award", days: "1 day" }
      ],
      total: "25 working days from sourcing to award",
      draftingTime: "2 days",
      vendorResponseWindow: "25 days",
      evaluationPeriod: "5 days"
    },
    RFQ: {
      title: "RFQ Timeline Guidelines", 
      description: "Standard process timeline for Request for Quotation workflow",
      heading: "RFQ Process Timeline",
      steps: [
        { name: "Sourcing", days: "3 days" },
        { name: "Scope Clarification", days: "1 day" },
        { name: "RFQ", days: "5 days" },
        { name: "BAFO", days: "2 days" },
        { name: "Due Diligence", days: "2 days" },
        { name: "Confirm Award", days: "1 day" }
      ],
      total: "14 working days from sourcing to award",
      draftingTime: "2 days",
      vendorResponseWindow: "14 days",
      evaluationPeriod: "5 days"
    },
    RFI: {
      title: "RFI Timeline Guidelines",
      description: "Standard process timeline for Request for Information workflow", 
      heading: "RFI Process Timeline",
      steps: [
        { name: "Sourcing", days: "3 days" },
        { name: "Scope Clarification", days: "5 days" },
        { name: "RFI", days: "10 days" },
        { name: "Clarification Period", days: "2 days" }
      ],
      total: "20 working days from sourcing to award",
      draftingTime: "2 days",
      vendorResponseWindow: "20 days",
      evaluationPeriod: "5 days"
    }
  };

  const calculateCloseDate = (workingDays: number) => {
    const today = new Date();
    let businessDays = 0;
    let currentDate = new Date(today);

    while (businessDays < workingDays) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        businessDays++;
      }
    }

    return currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleRfxTypeSelect = (type: RFxType) => {
    setRfxType(type);
    setShowConfirmation(true);
    
    if (type) {
      const selectedType = rfxTypes.find(t => t.type === type);
      const selectedTimeline = timelineData[type];
      
      if (selectedType && selectedTimeline) {
        const closeDate = calculateCloseDate(selectedType.workingDays);
        setTimeline(prev => ({
          ...prev,
          expectedCloseDate: closeDate,
          vendorResponseWindow: selectedTimeline.vendorResponseWindow,
          draftingTime: selectedTimeline.draftingTime,
          evaluationPeriod: selectedTimeline.evaluationPeriod
        }));
        
        toast({
          title: `${selectedType.title} Selected`,
          description: `Timeline set to ${selectedType.workingDays} working days`,
        });
      }
    }
    
    // Hide confirmation after 3 seconds
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  useEffect(() => {
    // Simulate budget check
    if (formData.budgetAmount) {
      setBudgetStatus("checking");
      setTimeout(() => {
        setBudgetStatus(Math.random() > 0.3 ? "approved" : "pending");
      }, 1500);
    }
  }, [formData.budgetAmount]);

  useEffect(() => {
    // Calculate timeline when delivery date is set
    if (formData.deliveryDate) {
      const deliveryDate = new Date(formData.deliveryDate);
      const today = new Date();
      
      // Calculate backwards from delivery date
      const awardDate = new Date(deliveryDate);
      awardDate.setDate(awardDate.getDate() - 14); // 2 weeks before delivery
      
      setTimeline(prev => ({
        ...prev,
        expectedAwardDate: awardDate.toLocaleDateString(),
        finalDeliveryDate: deliveryDate.toLocaleDateString()
      }));
    }
  }, [formData.deliveryDate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateRFx = async () => {
    // Validate mandatory fields
    if (!formData.department || !formData.quantity || !formData.deliveryDate || !rfxType) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in department, quantity, delivery date, and select RFx type.",
        variant: "destructive",
      });
      return;
    }

    if (budgetStatus !== "approved") {
      toast({
        title: "Budget Approval Required",
        description: "Please wait for budget approval before creating RFx.",
        variant: "destructive",
      });
      return;
    }

    // Simulate RFx creation
    toast({
      title: "RFx Creation Initiated",
      description: `AI Vendor Sourcing is now matching vendors and drafting your ${rfxType} document.`,
    });

    // Here you would typically call an API to create the RFx
    console.log("Creating RFx with data:", { scopeDetails, formData, timeline, rfxType });
  };

  const getBudgetStatusIcon = () => {
    switch (budgetStatus) {
      case "checking":
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getBudgetStatusText = () => {
    switch (budgetStatus) {
      case "checking":
        return "Checking budget availability...";
      case "approved":
        return "Budget Approved";
      case "pending":
        return "Pending Finance Review";
      case "rejected":
        return "Budget Not Available";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">RFx Creation</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Create a new Request for Quote with pre-populated scope details and automated vendor sourcing
        </p>
      </div>

      {/* RFx Type Selection */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Select RFx Type</CardTitle>
          <CardDescription className="text-slate-400">
            Choose the type of request that best fits your procurement needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Babatunde Recommendation Notice */}
          <div className="flex items-center space-x-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">
              Babatunde recommends: RFQ - Request for Quotation based on your input
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rfxTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = rfxType === type.type;
              const isRecommended = babatundeRecommendation === type.type;
              
              return (
                <div
                  key={type.type}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : isRecommended
                      ? "border-blue-400/60 bg-blue-500/5 shadow-lg shadow-blue-500/20 animate-pulse"
                      : "border-slate-600 bg-slate-800/50 hover:border-slate-500"
                  }`}
                  onClick={() => handleRfxTypeSelect(type.type)}
                >
                  {/* Recommendation Badge */}
                  {isRecommended && !isSelected && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Recommended</span>
                    </div>
                  )}
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-blue-500" />
                  )}
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`w-6 h-6 ${
                      isSelected 
                        ? "text-blue-400" 
                        : isRecommended 
                        ? "text-blue-300" 
                        : "text-slate-400"
                    }`} />
                    <div>
                      <h3 className={`font-semibold ${
                        isSelected 
                          ? "text-blue-300" 
                          : isRecommended 
                          ? "text-blue-200" 
                          : "text-white"
                      }`}>
                        {type.title}
                      </h3>
                      <p className="text-sm text-slate-400">{type.type}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-300 mb-3">
                    {type.description}
                  </p>
                  
                  {/* Recommendation Tooltip for RFQ */}
                  {isRecommended && (
                    <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                      Recommended by Babatunde based on your input
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={`${
                      isSelected || isRecommended 
                        ? "bg-blue-600/20 text-blue-300" 
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {type.workingDays} working days
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Post-Selection Confirmation */}
          {showConfirmation && rfxType && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  You've selected {rfxTypes.find(t => t.type === rfxType)?.title}. You may proceed or change your selection.
                </span>
              </div>
            </div>
          )}
          
          {rfxType && timeline.expectedCloseDate && (
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Timeline Confirmation</span>
              </div>
              <div className="text-sm text-slate-300">
                Expected Close Date: <span className="font-medium text-white">{new Date(timeline.expectedCloseDate).toLocaleDateString()}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Based on {rfxTypes.find(t => t.type === rfxType)?.workingDays} working days SLA
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditional Timeline Guidelines Card */}
      {rfxType && (
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">{timelineData[rfxType].title}</CardTitle>
            <CardDescription className="text-slate-400">
              {timelineData[rfxType].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{timelineData[rfxType].heading}</h3>
              
              <div className="space-y-3">
                {timelineData[rfxType].steps.map((step, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-3 bg-slate-800/30 rounded-lg border border-slate-600">
                    <span className="text-slate-300">{step.name}:</span>
                    <span className="text-white font-medium">{step.days}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Highlight Box */}
            <div className="p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-semibold">Standard {rfxType} SLA:</span>
                <span className="text-yellow-300 font-bold">{timelineData[rfxType].total}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pre-Populated Scope Details */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-white">Scope Details</CardTitle>
            <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <CardDescription className="text-slate-400">
            Auto-populated from scope selection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-300">Description</Label>
                <p className="text-slate-200 bg-slate-800/50 p-3 rounded-lg border border-slate-600">
                  {scopeDetails.description}
                </p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-slate-300">Licensing Requirements</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scopeDetails.licensingRequirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-600/20 text-blue-400">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-300">HSSE Clause</Label>
                <p className="text-slate-200 bg-slate-800/50 p-3 rounded-lg border border-slate-600 text-sm">
                  {scopeDetails.hsseClause}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-slate-300">Cyber Security Requirements</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scopeDetails.cyberSecurityRequirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-400">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-300">SLAs</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scopeDetails.slas.map((sla, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-600/20 text-green-400">
                      {sla}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-300">KPIs</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scopeDetails.kpis.map((kpi, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-600/20 text-orange-400">
                      {kpi}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department & Quantity Selection */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Department & Requirements</CardTitle>
          <CardDescription className="text-slate-400">
            Specify your department and quantity requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-slate-300">
                Department *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept} className="text-white hover:bg-slate-700">
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium text-slate-300">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="Enter quantity"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-400 font-medium">Finance Approved</span>
              </div>
              <Label htmlFor="budget" className="text-sm font-medium text-slate-300">
                Estimated Budget
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="budget"
                  type="number"
                  value={formData.budgetAmount}
                  onChange={(e) => handleInputChange("budgetAmount", e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {formData.budgetAmount && (
            <div className="flex items-center space-x-2 p-3 bg-slate-800/30 rounded-lg border border-slate-600">
              {getBudgetStatusIcon()}
              <span className="text-sm text-slate-300">{getBudgetStatusText()}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Timeline - Updated with corrected RFQ calculations */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Delivery Timeline</CardTitle>
          <CardDescription className="text-slate-400">
            Set your required delivery date and view estimated timeline based on selected {rfxType} type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate" className="text-sm font-medium text-slate-300">
                  Required Delivery Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white pl-10"
                  />
                </div>
              </div>

              {rfxType && timeline.expectedCloseDate && (
                <div className="space-y-2">
                  <Label htmlFor="closeDate" className="text-sm font-medium text-slate-300">
                    Expected Close Date ({rfxType})
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="closeDate"
                      type="date"
                      value={timeline.expectedCloseDate}
                      onChange={(e) => setTimeline(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                      className="bg-slate-800/50 border-slate-600 text-white pl-10"
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Auto-calculated based on {rfxType} SLA ({rfxTypes.find(t => t.type === rfxType)?.workingDays} working days), but can be overridden
                  </p>
                </div>
              )}
            </div>

            {rfxType && timeline.expectedCloseDate && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-slate-300">Estimated Timeline Breakdown</h4>
                  <div className="text-xs text-slate-400 bg-slate-800/30 px-2 py-1 rounded">
                    Based on {rfxType} SLA
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {rfxType === "RFQ" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sourcing:</span>
                        <span className="text-slate-200">3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Scope Clarification:</span>
                        <span className="text-slate-200">1 day</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RFQ:</span>
                        <span className="text-slate-200">5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">BAFO:</span>
                        <span className="text-slate-200">2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Due Diligence:</span>
                        <span className="text-slate-200">2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Confirm Award:</span>
                        <span className="text-slate-200">1 day</span>
                      </div>
                    </>
                  )}
                  {rfxType === "RFP" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sourcing:</span>
                        <span className="text-slate-200">4 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Scope Clarification:</span>
                        <span className="text-slate-200">2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RFP:</span>
                        <span className="text-slate-200">10 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">In-person Meeting for BAFO:</span>
                        <span className="text-slate-200">2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">BAFO:</span>
                        <span className="text-slate-200">3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Due Diligence:</span>
                        <span className="text-slate-200">3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Confirm Award:</span>
                        <span className="text-slate-200">1 day</span>
                      </div>
                    </>
                  )}
                  {rfxType === "RFI" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sourcing:</span>
                        <span className="text-slate-200">3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Scope Clarification:</span>
                        <span className="text-slate-200">5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">RFI:</span>
                        <span className="text-slate-200">10 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Clarification Period:</span>
                        <span className="text-slate-200">2 days</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-slate-600 pt-2 mt-3">
                    <div className="flex justify-between font-medium">
                      <span className="text-orange-400">Expected Close Date:</span>
                      <span className="text-orange-400">{new Date(timeline.expectedCloseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Total: {rfxTypes.find(t => t.type === rfxType)?.workingDays} working days
                    </div>
                  </div>
                  {timeline.expectedAwardDate && (
                    <div className="flex justify-between font-medium">
                      <span className="text-blue-400">Expected Award:</span>
                      <span className="text-blue-400">{timeline.expectedAwardDate}</span>
                    </div>
                  )}
                  {timeline.finalDeliveryDate && (
                    <div className="flex justify-between font-medium">
                      <span className="text-green-400">Final Delivery:</span>
                      <span className="text-green-400">{timeline.finalDeliveryDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Requirements */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Additional Requirements</CardTitle>
          <CardDescription className="text-slate-400">
            Add any special terms, vendor preferences, or project-specific context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalRequirements" className="text-sm font-medium text-slate-300">
              Additional Requirements or Notes
            </Label>
            <Textarea
              id="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white min-h-[120px]"
              placeholder="Enter any special terms, sustainability preferences, vendor exclusions, or project-specific context..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Create RFx Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleCreateRFx}
          disabled={budgetStatus !== "approved" || !rfxType}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create {rfxType || "RFx"}
        </Button>
      </div>
    </div>
  );
};

export default RFxCreation;
