
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const PerformanceManagement = () => {
  const vendors = [
    {
      id: "vendor-1",
      name: "TechCorp Solutions",
      performanceScore: 92,
      status: "Excellent",
      onTimeDelivery: 95,
      qualityRating: 4.8,
      lastReview: "2024-05-15",
    },
    {
      id: "vendor-2",
      name: "Global Services Inc",
      performanceScore: 78,
      status: "Good",
      onTimeDelivery: 82,
      qualityRating: 4.2,
      lastReview: "2024-05-10",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Performance Management</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Monitor and evaluate vendor performance metrics
        </p>
      </div>

      <div className="grid gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <div>
                    <CardTitle className="text-white">{vendor.name}</CardTitle>
                    <CardDescription className="text-slate-400">Performance Review</CardDescription>
                  </div>
                </div>
                <Badge className={vendor.status === "Excellent" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}>
                  {vendor.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{vendor.performanceScore}</div>
                  <div className="text-xs text-slate-400">Overall Score</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{vendor.onTimeDelivery}%</div>
                  <div className="text-xs text-slate-400">On-Time Delivery</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-white">{vendor.qualityRating}</div>
                  <div className="text-xs text-slate-400">Quality Rating</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-lg font-bold text-white">{vendor.lastReview}</div>
                  <div className="text-xs text-slate-400">Last Review</div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Activity className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Update Metrics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerformanceManagement;
