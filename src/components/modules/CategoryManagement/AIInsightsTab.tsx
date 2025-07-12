
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from 'lucide-react';

export const AIInsightsTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="w-5 h-5" />
          AI & ML Strategic Recommendations
        </CardTitle>
        <CardDescription className="text-slate-400">
          Machine learning insights for category optimization and risk mitigation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Card className="border-blue-800 bg-blue-950/30">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-400 mb-2">Market Intelligence Alert</h3>
              <p className="text-blue-300 text-sm">
                Steel prices expected to increase 15% in Q2 2024. Recommend accelerating drilling equipment procurement by 45 days.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-green-800 bg-green-950/30">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-400 mb-2">Savings Opportunity</h3>
              <p className="text-green-300 text-sm">
                IT Services category shows 23% savings potential through vendor consolidation. Projected annual savings: $1.8M.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-800 bg-yellow-950/30">
            <CardContent className="p-4">
              <h3 className="font-semibold text-yellow-400 mb-2">Risk Mitigation</h3>
              <p className="text-yellow-300 text-sm">
                SafeGuard Inc dependency at 92% poses critical supply risk. Recommend immediate dual sourcing initiative.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-purple-800 bg-purple-950/30">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-400 mb-2">Strategy Shift Recommendation</h3>
              <p className="text-purple-300 text-sm">
                Office Supplies category ready for automation. Migrate to e-procurement platform to reduce transaction costs by 60%.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
