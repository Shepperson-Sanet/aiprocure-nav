import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { CheckCircle, AlertTriangle, Upload, FileText, ArrowLeft } from "lucide-react";

interface VendorProfileViewProps {
  setActiveModule?: (module: string) => void;
}

const VendorProfileView = ({ setActiveModule }: VendorProfileViewProps) => {
  const [acknowledgmentChecked, setAcknowledgmentChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [scopeConfirmed, setScopeConfirmed] = useState(true);
  const [vendorNotes, setVendorNotes] = useState("We can meet all specs. Delivery to Lagos and PHC possible within 14 days. Gensets include AMF panels by default.");

  const documentStatus = [
    { type: "HSSE Certificate (ISO 45001)", status: "available", action: "pre-filled" },
    { type: "Cybersecurity Policy", status: "missing", action: "upload" },
    { type: "Business Registration Cert.", status: "verified", action: "pre-filled" },
    { type: "Tax Clearance Certificate (2023)", status: "verified", action: "pre-filled" },
    { type: "Conflict of Interest Disclosure", status: "required", action: "upload" },
    { type: "Company Brochure / Specs", status: "available", action: "pre-filled" },
    { type: "NDA & Ethics Policy Acceptance", status: "awaiting", action: "acknowledge" }
  ];

  const vendorInfo = {
    companyName: "ZenPower Technologies Ltd.",
    website: "www.zenpowerafrica.com",
    coreOffering: "Diesel Generators (10–60KVA), ATS Panels",
    countryOfOperation: "Nigeria, Ghana, Kenya",
    yearsOfExperience: "17 Years",
    publicRating: "Dun & Bradstreet Score: A (Low Risk)",
    pastEngagement: "No",
    sustainabilityRating: "85/100 (EcoDiesel product line certified)",
    flagshipClients: "MTN, Airtel, Dangote Group"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "missing":
      case "required":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "awaiting":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">✅ Available</Badge>;
      case "verified":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">✅ Verified</Badge>;
      case "missing":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">⛔ Missing</Badge>;
      case "required":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">⚠️ Required</Badge>;
      case "awaiting":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">⛔ Awaiting Tick</Badge>;
      default:
        return null;
    }
  };

  const getActionButton = (action: string, status: string) => {
    switch (action) {
      case "pre-filled":
        return <Button variant="outline" size="sm" disabled className="text-green-600">✔️ Pre-Filled</Button>;
      case "upload":
        return (
          <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
            <Upload className="w-4 h-4 mr-1" />
            🔺 Upload Now
          </Button>
        );
      case "acknowledge":
        return (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-orange-600 hover:text-orange-700"
            onClick={() => setAcknowledgmentChecked(!acknowledgmentChecked)}
          >
            🔺 Acknowledge
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setActiveModule?.("Scope Selection")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Procure AI
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setActiveModule?.("Create RFx")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Vendors
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-slate-600">
                  {vendorInfo.companyName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Button 
            variant="outline" 
            onClick={() => setActiveModule?.("Create RFx")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vendors</span>
          </Button>
        </div>
        
        {/* Section 1: Welcome Section (Hero Banner) */}
        <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Welcome to IHS Towers – A Future Built with You</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We are excited to explore a potential partnership with your organization. As a global leader in telecom infrastructure, 
              listed on the New York Stock Exchange, IHS Towers is driven by innovation, sustainability, and performance. 
              We consider our vendors to be critical partners in enabling connectivity across Africa, the Middle East, and Latin America.
            </p>
            <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-lg font-medium">
                Your solutions have demonstrated significant potential, and we believe this could mark the beginning of a high-value, strategically aligned partnership.
              </p>
            </div>
          </div>
        </Card>

        {/* Section 2: Vendor Company Overview */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Vendor Company Overview (Auto-Filled)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Company Name</label>
                <p className="text-lg font-semibold text-slate-800">{vendorInfo.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Website</label>
                <p className="text-blue-600 hover:underline cursor-pointer">{vendorInfo.website}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Core Offering</label>
                <p className="text-slate-800">{vendorInfo.coreOffering}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Country of Operation</label>
                <p className="text-slate-800">{vendorInfo.countryOfOperation}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Years of Experience</label>
                <p className="text-lg font-semibold text-green-600">{vendorInfo.yearsOfExperience}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Public Rating</label>
                <p className="text-green-600 font-medium">{vendorInfo.publicRating}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Past Engagement with IHS</label>
                <p className="text-slate-800">{vendorInfo.pastEngagement}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Sustainability Rating</label>
                <p className="text-green-600 font-medium">{vendorInfo.sustainabilityRating}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-slate-600">Flagship Clients</label>
            <p className="text-slate-800 font-medium">{vendorInfo.flagshipClients}</p>
          </div>
          <p className="text-sm text-slate-500 mt-4 italic">
            This data is pulled via web scraping and public directories. Vendors may edit after submission.
          </p>
        </Card>

        {/* Section 3: Required Documentation Upload */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Required Documentation Upload</h2>
          <p className="text-slate-600 mb-6">
            To proceed with onboarding, please upload the following documents. Fields pre-checked based on public availability are auto-filled.
          </p>
          <div className="space-y-4">
            {documentStatus.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <span className="font-medium text-slate-800">{doc.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(doc.status)}
                  {getActionButton(doc.action, doc.status)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 4: Scope Requirement Confirmation */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Scope Requirement Review</h2>
          <p className="text-slate-600 mb-6">
            We are currently onboarding vendors for the supply of 30KVA diesel generators across Nigeria.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-slate-800 mb-3">Scope Summary (Auto-filled):</h3>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Technical Specs:</strong> Perkins engine, Stamford alternator, DeepSea controller</li>
              <li><strong>Warranty:</strong> Minimum 1 year on-site</li>
              <li><strong>Delivery Timeline:</strong> Within 21 days of PO</li>
              <li><strong>Other Notes:</strong> Noise level under 75db, factory test certificate required</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="scope-confirmation" 
                checked={scopeConfirmed}
                onCheckedChange={(checked) => setScopeConfirmed(checked === true)}
              />
              <label htmlFor="scope-confirmation" className="font-medium text-slate-800">
                We confirm that we can meet the above scope in full.
              </label>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-600 mb-2 block">Text Notes Field:</label>
              <Textarea
                value={vendorNotes}
                onChange={(e) => setVendorNotes(e.target.value)}
                placeholder="Add any additional notes or clarifications..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </Card>

        {/* Section 5: Consent & Final Submission */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Consent & Final Submission</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="consent" 
                checked={consentChecked}
                onCheckedChange={(checked) => setConsentChecked(checked === true)}
              />
              <label htmlFor="consent" className="text-slate-700 leading-relaxed">
                I consent to IHS Towers retaining and processing our information in accordance with our Privacy & Compliance Framework.
              </label>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium"
              disabled={!consentChecked || !scopeConfirmed}
            >
              Complete Submission & Join Tender Pool
            </Button>
            {(!consentChecked || !scopeConfirmed) && (
              <p className="text-sm text-red-500 mt-2">
                Please complete all required confirmations to proceed.
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VendorProfileView;