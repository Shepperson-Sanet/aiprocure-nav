
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from 'lucide-react';
import { tailSpendData } from './data/mockData';

export const TailSpendTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5" />
          Tail Spend Analysis
        </CardTitle>
        <CardDescription className="text-slate-400">
          Identify consolidation opportunities in low-value, high-volume categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Category</TableHead>
              <TableHead className="text-slate-300">Annual Spend</TableHead>
              <TableHead className="text-slate-300">Suppliers</TableHead>
              <TableHead className="text-slate-300">Avg Order Value</TableHead>
              <TableHead className="text-slate-300">Consolidation Potential</TableHead>
              <TableHead className="text-slate-300">AI Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tailSpendData.map((item, index) => (
              <TableRow key={index} className="border-slate-700">
                <TableCell className="font-medium text-white">{item.category}</TableCell>
                <TableCell className="text-slate-300">${item.spend.toLocaleString()}</TableCell>
                <TableCell className="text-slate-300">{item.suppliers}</TableCell>
                <TableCell className="text-slate-300">${item.avgOrder.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={item.consolidation} className="w-16" />
                    <span className="text-sm text-slate-300">{item.consolidation}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-blue-400">
                    {item.consolidation > 90 ? 'High - Immediate catalog migration' : 
                     item.consolidation > 80 ? 'Medium - Supplier consolidation' : 
                     'Low - Monitor for automation'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
