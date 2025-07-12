
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Award, DollarSign, TrendingUp, Calculator, Shield, Clock, Trophy } from "lucide-react";

interface SavingsDimension {
  name: string;
  value: number;
  percentage: number;
  tooltip: string;
}

interface Vendor {
  id: string;
  name: string;
  totalBidValue: number;
  evaluationScore: number;
  status: string;
  savingsDimensions: SavingsDimension[];
}

const ConfirmAward = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(1510);
  
  const savingsTooltips = {
    "Unit Cost Reduction": "Reduction in unit price compared to historical or benchmarked spend.",
    "Demand Management": "Savings from reduced quantities due to improved forecasting or scope rationalisation.",
    "Payment Terms Benefit": "Cashflow benefit from extended payment terms (e.g., 60 vs. 30 days).",
    "Lifecycle Cost Advantage": "Lower total cost of ownership due to longer life span, efficiency, or reduced maintenance.",
    "HSSE / Risk Avoidance": "Avoided costs related to non-compliance, HSSE risks, or vendor operational failures.",
    "Total Savings": "Aggregate dollar savings and benefit percentage across all categories for this vendor."
  };

  const mockVendors: Vendor[] = [
    {
      id: "1",
      name: "Premium Solutions Ltd",
      totalBidValue: 245000000,
      evaluationScore: 94.2,
      status: "Recommended for Award",
      savingsDimensions: [
        { name: "Unit Cost Reduction", value: 6000000, percentage: 4.2, tooltip: savingsTooltips["Unit Cost Reduction"] },
        { name: "Demand Management", value: 2100000, percentage: 1.5, tooltip: savingsTooltips["Demand Management"] },
        { name: "Payment Terms Benefit", value: 3800000, percentage: 2.7, tooltip: savingsTooltips["Payment Terms Benefit"] },
        { name: "Lifecycle Cost Advantage", value: 4500000, percentage: 3.2, tooltip: savingsTooltips["Lifecycle Cost Advantage"] },
        { name: "HSSE / Risk Avoidance", value: 1750000, percentage: 1.3, tooltip: savingsTooltips["HSSE / Risk Avoidance"] }
      ]
    },
    {
      id: "2",  
      name: "Global Industrial Corp",
      totalBidValue: 267000000,
      evaluationScore: 89.8,
      status: "Alternative Option",
      savingsDimensions: [
        { name: "Unit Cost Reduction", value: 4200000, percentage: 2.8, tooltip: savingsTooltips["Unit Cost Reduction"] },
        { name: "Demand Management", value: 1800000, percentage: 1.2, tooltip: savingsTooltips["Demand Management"] },
        { name: "Payment Terms Benefit", value: 2900000, percentage: 1.9, tooltip: savingsTooltips["Payment Terms Benefit"] },
        { name: "Lifecycle Cost Advantage", value: 3100000, percentage: 2.1, tooltip: savingsTooltips["Lifecycle Cost Advantage"] },
        { name: "HSSE / Risk Avoidance", value: 1400000, percentage: 0.9, tooltip: savingsTooltips["HSSE / Risk Avoidance"] }
      ]
    }
  ];

  const convertToUSD = (ngnValue: number): number => {
    return ngnValue / exchangeRate;
  };

  const calculateTotalSavings = (dimensions: SavingsDimension[]) => {
    const totalValue = dimensions.reduce((sum, dim) => sum + dim.value, 0);
    const totalPercentage = dimensions.reduce((sum, dim) => sum + dim.percentage, 0);
    return { totalValue, totalPercentage };
  };

  const getTopValueVendor = () => {
    return mockVendors.reduce((top, vendor) => {
      const vendorTotal = calculateTotalSavings(vendor.savingsDimensions).totalValue;
      const topTotal = calculateTotalSavings(top.savingsDimensions).totalValue;
      return vendorTotal > topTotal ? vendor : top;
    });
  };

  const topValueVendor = getTopValueVendor();

  return (
    <div className="w-full max-w-7xl space-y-8">
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span>Confirm Award</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg">
            Review vendor proposals and confirm award decisions with savings analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exchange Rate Input */}
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <Label htmlFor="exchangeRate" className="text-sm font-medium text-slate-300 mb-2 block">
              Current Exchange Rate (NGN/USD)
            </Label>
            <div className="flex items-center space-x-3">
              <span className="text-slate-400">1 USD =</span>
              <Input
                id="exchangeRate"
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value) || 1510)}
                className="w-32 bg-slate-700 border-slate-600 text-white"
                placeholder="1510"
              />
              <span className="text-slate-400">NGN</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Cards with Savings Tables */}
      {mockVendors.map((vendor) => {
        const { totalValue, totalPercentage } = calculateTotalSavings(vendor.savingsDimensions);
        const isTopValue = vendor.id === topValueVendor.id;
        
        return (
          <Card key={vendor.id} className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white flex items-center space-x-3">
                      {vendor.name}
                      {isTopValue && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          Top Value Vendor
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-slate-300">
                        Total Bid: ${convertToUSD(vendor.totalBidValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-slate-300">
                        Score: {vendor.evaluationScore}%
                      </span>
                      <Badge 
                        variant={vendor.status === "Recommended for Award" ? "default" : "secondary"}
                        className={vendor.status === "Recommended for Award" 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "bg-slate-600 hover:bg-slate-700"
                        }
                      >
                        {vendor.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Savings Summary</span>
                </h3>
                
                <TooltipProvider>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">Savings Dimension</TableHead>
                        <TableHead className="text-slate-300">Value (USD)</TableHead>
                        <TableHead className="text-slate-300">% Benefit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendor.savingsDimensions.map((dimension, index) => (
                        <TableRow key={index} className="border-slate-700">
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-slate-200 cursor-help hover:text-blue-400 transition-colors">
                                  {dimension.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>{dimension.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-slate-200 font-mono">
                            ${convertToUSD(dimension.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-slate-200">
                            {dimension.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-slate-700 bg-slate-800/50">
                        <TableCell className="font-semibold">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-green-400 cursor-help hover:text-green-300 transition-colors flex items-center space-x-1">
                                <Calculator className="w-4 h-4" />
                                <span>Total Savings</span>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>{savingsTooltips["Total Savings"]}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="text-green-400 font-semibold font-mono">
                          ${convertToUSD(totalValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className="text-green-400 font-semibold">
                          {totalPercentage.toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TooltipProvider>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Request Clarification
                  </Button>
                  <Button 
                    className={vendor.status === "Recommended for Award" 
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }
                  >
                    {vendor.status === "Recommended for Award" ? "Confirm Award" : "Consider Award"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ConfirmAward;
