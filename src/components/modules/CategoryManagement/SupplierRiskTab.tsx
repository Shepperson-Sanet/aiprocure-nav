
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield } from 'lucide-react';
import { supplierRiskData } from './data/mockData';
import { getRiskColor } from './utils/styleHelpers';

export const SupplierRiskTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="w-5 h-5" />
          Supplier Dependency & Risk Analysis
        </CardTitle>
        <CardDescription className="text-slate-400">
          Monitor supplier concentration risks and relationship health
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Supplier</TableHead>
              <TableHead className="text-slate-300">Category</TableHead>
              <TableHead className="text-slate-300">IHS Dependency</TableHead>
              <TableHead className="text-slate-300">Revenue Share</TableHead>
              <TableHead className="text-slate-300">Risk Level</TableHead>
              <TableHead className="text-slate-300">Relationship</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierRiskData.map((supplier, index) => (
              <TableRow key={index} className="border-slate-700">
                <TableCell className="font-medium text-white">{supplier.name}</TableCell>
                <TableCell className="text-slate-300">{supplier.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={supplier.dependency} className="w-16" />
                    <span className="text-sm text-slate-300">{supplier.dependency}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">{supplier.revenue}%</TableCell>
                <TableCell>
                  <Badge className={getRiskColor(supplier.risk)}>{supplier.risk}</Badge>
                </TableCell>
                <TableCell className="text-slate-300">{supplier.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Review</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
