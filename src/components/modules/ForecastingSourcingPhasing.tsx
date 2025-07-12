
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TrendingUp, Brain, Calendar, Download, Upload, Plus, ChevronDown, ChevronRight, Activity, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForecastItem {
  id: string;
  name: string;
  forecastedQuantity: number;
  optimalOrderDate: string;
  confidenceScore: number;
  autoTriggerRfx: boolean;
  leadTimeWeeks: number;
  monthlyDemand: { [key: string]: number };
}

const ForecastingSourcingPhasing = () => {
  const { toast } = useToast();
  const [forecastItems, setForecastItems] = useState<ForecastItem[]>([
    {
      id: "1",
      name: "AC Generator",
      forecastedQuantity: 3037,
      optimalOrderDate: "2026-01-15",
      confidenceScore: 94,
      autoTriggerRfx: true,
      leadTimeWeeks: 12,
      monthlyDemand: {
        "Jan-26": 0,
        "Feb-26": 514,
        "Mar-26": 920,
        "Apr-26": 450,
        "May-26": 380,
        "Jun-26": 290,
        "Jul-26": 160,
        "Aug-26": 200,
        "Sep-26": 350,
        "Oct-26": 180,
        "Nov-26": 93,
        "Dec-26": 0
      }
    },
    {
      id: "2",
      name: "DCDG Engines (incl Spares)",
      forecastedQuantity: 203,
      optimalOrderDate: "2026-09-01",
      confidenceScore: 87,
      autoTriggerRfx: false,
      leadTimeWeeks: 16,
      monthlyDemand: {
        "Jan-26": 0,
        "Feb-26": 0,
        "Mar-26": 0,
        "Apr-26": 0,
        "May-26": 0,
        "Jun-26": 0,
        "Jul-26": 0,
        "Aug-26": 0,
        "Sep-26": 0,
        "Oct-26": 0,
        "Nov-26": 0,
        "Dec-26": 203
      }
    },
    {
      id: "3",
      name: "PowerCubes (600ah)",
      forecastedQuantity: 740,
      optimalOrderDate: "2026-08-15",
      confidenceScore: 91,
      autoTriggerRfx: true,
      leadTimeWeeks: 8,
      monthlyDemand: {
        "Jan-26": 0,
        "Feb-26": 0,
        "Mar-26": 0,
        "Apr-26": 0,
        "May-26": 0,
        "Jun-26": 0,
        "Jul-26": 0,
        "Aug-26": 0,
        "Sep-26": 0,
        "Oct-26": 0,
        "Nov-26": 292,
        "Dec-26": 448
      }
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [lastForecastDate] = useState(new Date().toISOString().split('T')[0]);

  const months = ["Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26", "Jul-26", "Aug-26", "Sep-26", "Oct-26", "Nov-26", "Dec-26"];

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const toggleAutoRfx = (itemId: string) => {
    setForecastItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, autoTriggerRfx: !item.autoTriggerRfx } : item
      )
    );
  };

  const generateRfxForItem = (item: ForecastItem, month: string, quantity: number) => {
    if (quantity > 0) {
      toast({
        title: "RFx Generated",
        description: `Created RFx for ${quantity} units of ${item.name} for ${month}`,
      });
    }
  };

  const exportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Downloading forecasting data as Excel file...",
    });
  };

  const importFromExcel = () => {
    toast({
      title: "Import Ready",
      description: "Select Excel file to import forecasting data...",
    });
  };

  const getTotalForecastedSpend = () => {
    // Mock calculation - in real implementation, this would calculate based on unit costs
    return 125000000; // ₦125M
  };

  return (
    <div className="w-full max-w-7xl space-y-8">
      {/* Header */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span>Forecasting & Sourcing Phasing</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-lg">
            ML-powered demand forecasting with automated RFx generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Total Items Forecasted</span>
              </div>
              <div className="text-2xl font-bold text-white">{forecastItems.length}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-slate-300">Total Forecasted Spend</span>
              </div>
              <div className="text-2xl font-bold text-white">₦{getTotalForecastedSpend().toLocaleString()}</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-slate-300">Last Forecast Date</span>
              </div>
              <div className="text-lg font-bold text-white">{lastForecastDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ML Forecasting Engine */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <span>Machine Learning Forecasting Engine</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            AI-powered demand forecasting based on run hours, consumption trends, and lead times
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastItems.map((item) => (
              <div key={item.id} className="bg-slate-800/30 p-4 rounded-lg border border-slate-700">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-slate-400">Lead Time: {item.leadTimeWeeks} weeks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{item.forecastedQuantity}</div>
                    <div className="text-xs text-slate-400">Forecasted Qty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">{item.optimalOrderDate}</div>
                    <div className="text-xs text-slate-400">Optimal Order Date</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={item.confidenceScore >= 90 ? "default" : "secondary"} className="text-xs">
                      {item.confidenceScore}% Confidence
                    </Badge>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Switch
                      checked={item.autoTriggerRfx}
                      onCheckedChange={() => toggleAutoRfx(item.id)}
                    />
                    <Label className="text-xs text-slate-300">Auto RFx</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sourcing Phasing Table */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span>Sourcing Phasing Table</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Monthly demand breakdown with procurement phasing
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={importFromExcel} className="border-slate-600 text-slate-300">
                <Upload className="w-4 h-4 mr-2" />
                Import Excel
              </Button>
              <Button variant="outline" size="sm" onClick={exportToExcel} className="border-slate-600 text-slate-300">
                <Download className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {forecastItems.map((item) => (
              <Collapsible key={item.id} open={expandedItems.has(item.id)} onOpenChange={() => toggleExpanded(item.id)}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {expandedItems.has(item.id) ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-white font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        FY'26 Total: {item.forecastedQuantity}
                      </Badge>
                    </div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="bg-slate-800/20 p-4 rounded-lg border border-slate-700">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-300">Month</TableHead>
                          <TableHead className="text-slate-300">Demand</TableHead>
                          <TableHead className="text-slate-300">Order By Date</TableHead>
                          <TableHead className="text-slate-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {months.map((month) => {
                          const demand = item.monthlyDemand[month] || 0;
                          const orderByDate = demand > 0 ? 
                            new Date(Date.parse(month.replace('-', ' 1, ')) - (item.leadTimeWeeks * 7 * 24 * 60 * 60 * 1000))
                              .toISOString().split('T')[0] : '-';
                          
                          return (
                            <TableRow key={month} className="border-slate-700">
                              <TableCell className="text-slate-200">{month}</TableCell>
                              <TableCell className="text-slate-200 font-mono">
                                {demand > 0 ? demand.toLocaleString() : '-'}
                              </TableCell>
                              <TableCell className="text-slate-200 text-sm">
                                {orderByDate}
                              </TableCell>
                              <TableCell>
                                {demand > 0 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => generateRfxForItem(item, month, demand)}
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Generate RFx
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Auto RFx Creation Summary */}
      <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center space-x-3">
            <Plus className="w-6 h-6 text-green-400" />
            <span>Auto RFx Creation Status</span>
          </CardTitle>
          <CardDescription className="text-slate-400">
            Automated tender generation based on forecasted demand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Items with Auto RFx Enabled</h3>
              <div className="space-y-2">
                {forecastItems.filter(item => item.autoTriggerRfx).map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-200">{item.name}</span>
                    <Badge variant="default" className="bg-green-600">
                      Auto-enabled
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Manual Review Required</h3>
              <div className="space-y-2">
                {forecastItems.filter(item => !item.autoTriggerRfx).map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <span className="text-slate-200">{item.name}</span>
                    <Badge variant="secondary">
                      Manual
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastingSourcingPhasing;
