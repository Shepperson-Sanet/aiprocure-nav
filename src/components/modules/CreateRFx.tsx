
import { useState } from "react";
import { Search, Send, Building, Mail, MapPin, Globe, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface CreateRFxProps {
  setActiveModule?: (module: string) => void;
}

interface Vendor {
  id: string;
  name: string;
  email: string;
  location: string;
  website: string;
  rating: number;
  employees: string;
  specialties: string[];
  description: string;
}

const CreateRFx = ({ setActiveModule }: CreateRFxProps) => {
  const [keyword, setKeyword] = useState("");
  const [vendorsFound, setVendorsFound] = useState<Vendor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Search keyword required",
        description: "Please enter a keyword to search for vendors.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Enhanced simulated vendor data
    const simulatedVendors: Vendor[] = [
      {
        id: "1",
        name: "Global Supply Co.",
        email: "contact@globalsupply.com",
        location: "New York, USA",
        website: "www.globalsupply.com",
        rating: 4.8,
        employees: "500-1000",
        specialties: ["Logistics", "Supply Chain", "Manufacturing"],
        description: "Leading global supplier with 20+ years of experience in industrial solutions."
      },
      {
        id: "2",
        name: "TechVendor Solutions",
        email: "sales@techvendor.com",
        location: "San Francisco, USA",
        website: "www.techvendor.com",
        rating: 4.6,
        employees: "100-500",
        specialties: ["Technology", "Software", "Consulting"],
        description: "Innovative technology solutions provider specializing in enterprise software."
      },
      {
        id: "3",
        name: "Premier Industries",
        email: "info@premierindustries.com",
        location: "Chicago, USA",
        website: "www.premierindustries.com",
        rating: 4.9,
        employees: "1000+",
        specialties: ["Construction", "Materials", "Engineering"],
        description: "Trusted industrial partner with comprehensive construction and engineering services."
      },
      {
        id: "4",
        name: "Innovation Labs",
        email: "hello@innovationlabs.com",
        location: "Austin, USA",
        website: "www.innovationlabs.com",
        rating: 4.5,
        employees: "50-100",
        specialties: ["R&D", "Product Development", "Consulting"],
        description: "Cutting-edge research and development firm focused on breakthrough innovations."
      }
    ];
    
    setVendorsFound(simulatedVendors);
    setIsSearching(false);
    
    toast({
      title: "Vendor search completed",
      description: `Found ${simulatedVendors.length} potential vendors for "${keyword}"`,
    });
  };

  const toggleVendorSelection = (vendorId: string) => {
    const newSelection = new Set(selectedVendors);
    if (newSelection.has(vendorId)) {
      newSelection.delete(vendorId);
    } else {
      newSelection.add(vendorId);
    }
    setSelectedVendors(newSelection);
  };

  const handleSendInvites = async () => {
    if (selectedVendors.size === 0) {
      toast({
        title: "No vendors selected",
        description: "Please select at least one vendor to send invitations.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending invitations
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Invitations sent successfully",
      description: `Tender invitations sent to ${selectedVendors.size} selected vendors.`,
    });
    
    setSelectedVendors(new Set());
  };

  return (
    <div className="w-full max-w-6xl space-y-8">
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span>AI Vendor Sourcing</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg">
            Search and discover qualified vendors for your procurement requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Search Requirement Keyword
            </label>
            <div className="flex space-x-4">
              <Input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                placeholder="e.g. diesel supply, construction materials, IT services"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Vendors
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {vendorsFound.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">
              Vendors Found ({vendorsFound.length})
            </h3>
            <Button
              onClick={handleSendInvites}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              disabled={selectedVendors.size === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invitations ({selectedVendors.size})
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vendorsFound.map((vendor) => (
              <Card
                key={vendor.id}
                className={`bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] ${
                  selectedVendors.has(vendor.id) ? "ring-2 ring-blue-500 bg-blue-950/20" : ""
                }`}
                onClick={() => toggleVendorSelection(vendor.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle 
                          className="text-xl text-white hover:text-blue-400 cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModule?.("Vendor Profile View");
                          }}
                        >
                          {vendor.name}
                        </CardTitle>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-300">{vendor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                      selectedVendors.has(vendor.id) 
                        ? "bg-blue-500 border-blue-500" 
                        : "border-slate-400"
                    }`}>
                      {selectedVendors.has(vendor.id) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-400 text-sm">{vendor.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{vendor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{vendor.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{vendor.website}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{vendor.employees} employees</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="bg-slate-700 text-slate-200 hover:bg-slate-600"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRFx;
