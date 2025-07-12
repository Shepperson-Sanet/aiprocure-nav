
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import InPersonNegotiation from "./InPersonNegotiation";

const RFxBAFORank = () => {
  const [negotiationDialog, setNegotiationDialog] = useState<{
    isOpen: boolean;
    vendorName: string;
    vendorId: number;
  }>({
    isOpen: false,
    vendorName: "",
    vendorId: 0
  });

  const bafoVendors = [
    {
      id: 1,
      name: "Global Tech Solutions Ltd",
      rank: 1,
      previousRank: 2,
      technical: 97,
      financial: 92,
      risk: 94,
      delivery: "25 days",
      totalScore: 94.3,
      improvement: "+2.6",
      status: "Final Winner"
    },
    {
      id: 2,
      name: "Alpha Industries Corp",
      rank: 2,
      previousRank: 1,
      technical: 89,
      financial: 96,
      risk: 87,
      delivery: "40 days",
      totalScore: 90.7,
      improvement: "+1.7",
      status: "Runner-up"
    },
    {
      id: 3,
      name: "Beta Manufacturing Co",
      rank: 3,
      previousRank: 3,
      technical: 85,
      financial: 82,
      risk: 90,
      delivery: "30 days",
      totalScore: 85.7,
      improvement: "+3.0",
      status: "Backup Option"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Final Winner":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      case "Runner-up":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    }
  };

  const getRankChange = (rank: number, previousRank: number) => {
    if (rank < previousRank) {
      return { icon: TrendingUp, color: "text-green-400", text: "↑" };
    } else if (rank > previousRank) {
      return { icon: TrendingDown, color: "text-red-400", text: "↓" };
    }
    return { icon: null, color: "text-slate-400", text: "=" };
  };

  const openNegotiationDialog = (vendorName: string, vendorId: number) => {
    setNegotiationDialog({
      isOpen: true,
      vendorName,
      vendorId
    });
  };

  const closeNegotiationDialog = () => {
    setNegotiationDialog({
      isOpen: false,
      vendorName: "",
      vendorId: 0
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">RFx BAFO Rank</h1>
          <p className="text-slate-400">Best and Final Offer evaluation and final rankings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            Compare with Initial
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Finalize Award
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {bafoVendors.map((vendor) => {
          const rankChange = getRankChange(vendor.rank, vendor.previousRank);
          const RankIcon = rankChange.icon;

          return (
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
                        Final: {vendor.totalScore}/100
                      </span>
                      <span className="text-green-400 font-semibold">
                        {vendor.improvement} improvement
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-white">#{vendor.rank}</div>
                      {RankIcon && (
                        <RankIcon className={`w-6 h-6 ${rankChange.color}`} />
                      )}
                      {!RankIcon && (
                        <span className={`text-lg ${rankChange.color}`}>{rankChange.text}</span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400">
                      Previous: #{vendor.previousRank}
                    </div>
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
                    View BAFO Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    Compare Offers
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => openNegotiationDialog(vendor.name, vendor.id)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    In-Person Negotiation
                  </Button>
                  {vendor.status === "Final Winner" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Award Contract
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <InPersonNegotiation
        isOpen={negotiationDialog.isOpen}
        onClose={closeNegotiationDialog}
        vendorName={negotiationDialog.vendorName}
        vendorId={negotiationDialog.vendorId}
      />
    </div>
  );
};

export default RFxBAFORank;
