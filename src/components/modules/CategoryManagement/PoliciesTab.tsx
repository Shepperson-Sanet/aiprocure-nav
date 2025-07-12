
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

export const PoliciesTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="w-5 h-5" />
          Best Practice Policy Repository
        </CardTitle>
        <CardDescription className="text-slate-400">
          Category-specific policies and compliance frameworks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-white">Sourcing Models</h3>
              <ul className="text-sm space-y-1 text-slate-300">
                <li>• Strategic: Long-term partnerships</li>
                <li>• Leverage: Competitive tenders</li>
                <li>• Bottleneck: Dual sourcing</li>
                <li>• Routine: Catalog/automated</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-white">Review Cycles</h3>
              <ul className="text-sm space-y-1 text-slate-300">
                <li>• Strategic: Quarterly</li>
                <li>• Critical: Semi-annually</li>
                <li>• Standard: Annually</li>
                <li>• Routine: Bi-annually</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-white">Compliance Thresholds</h3>
              <ul className="text-sm space-y-1 text-slate-300">
                <li>• ESG: Mandatory scoring</li>
                <li>• HSSE: Zero tolerance</li>
                <li>• Financial: Credit rating B+</li>
                <li>• Insurance: $10M minimum</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
