
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RFxReviewRank = () => {
  const { toast } = useToast();

  const vendors = [
    {
      id: 1,
      name: "Global Tech Solutions Ltd",
      rank: 1,
      technical: 95,
      financial: 88,
      risk: 92,
      delivery: "30 days",
      totalScore: 91.7,
      status: "Recommended"
    },
    {
      id: 2,
      name: "Alpha Industries Corp",
      rank: 2,
      technical: 87,
      financial: 95,
      risk: 85,
      delivery: "45 days",
      totalScore: 89.0,
      status: "Under Review"
    },
    {
      id: 3,
      name: "Beta Manufacturing Co",
      rank: 3,
      technical: 82,
      financial: 78,
      risk: 88,
      delivery: "35 days",
      totalScore: 82.7,
      status: "Qualified"
    },
    {
      id: 4,
      name: "Gamma Enterprises Inc",
      rank: 4,
      technical: 75,
      financial: 85,
      risk: 70,
      delivery: "60 days",
      totalScore: 76.7,
      status: "Not Recommended"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recommended":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      case "Under Review":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      case "Qualified":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-red-600/20 text-red-400 border-red-500/30";
    }
  };

  const handleRequestBAFO = (vendorName: string) => {
    toast({
      title: "BAFO Request Sent",
      description: `Best and Final Offer request sent to ${vendorName}`,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">RFx Review and Rank</h1>
          <p className="text-slate-400">Comprehensive vendor evaluation and ranking system</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Export Rankings
        </Button>
      </div>

      <div className="grid gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-white">{vendor.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                    <span className="text-2xl font-bold text-blue-400">
                      Overall: {vendor.totalScore}/100
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">#{vendor.rank}</div>
                  <div className="text-sm text-slate-400">Rank</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-sm text-white">
                <div className="p-4 bg-slate-700/50 rounded-md">
                  <p className="text-slate-300 mb-1">Technical Score</p>
                  <p className="text-lg font-semibold">{vendor.technical}/100</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-md">
                  <p className="text-slate-300 mb-1">Financial Score</p>
                  <p className="text-lg font-semibold">{vendor.financial}/100</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-md">
                  <p className="text-slate-300 mb-1">Risk Score</p>
                  <p className="text-lg font-semibold">{vendor.risk}/100</p>
                </div>
                <div className="p-4 bg-slate-700/50 rounded-md">
                  <p className="text-slate-300 mb-1">Delivery Time</p>
                  <p className="text-lg font-semibold">{vendor.delivery}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Download Report
                </Button>
                <Button 
                  onClick={() => handleRequestBAFO(vendor.name)}
                  size="sm" 
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Request BAFO
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RFxReviewRank;
