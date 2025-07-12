
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity } from 'lucide-react';
import { valueChainData } from './data/mockData';

export const ValueChainTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-5 h-5" />
          Porter's Value Chain Analysis
        </CardTitle>
        <CardDescription className="text-slate-400">
          Procurement category mapping across value chain stages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {valueChainData.map((stage, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">{stage.stage}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">
                      Spend: <span className="font-medium text-white">${(stage.spend / 1000000).toFixed(1)}M</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">Coverage:</span>
                      <Progress value={stage.coverage} className="w-20" />
                      <span className="text-sm font-medium text-white">{stage.coverage}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stage.categories.map((category, catIndex) => (
                    <Badge key={catIndex} variant="outline" className="border-slate-600 text-slate-300">{category}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
