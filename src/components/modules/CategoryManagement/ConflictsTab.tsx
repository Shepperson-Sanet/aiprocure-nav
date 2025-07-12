
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from 'lucide-react';
import { conflictData } from './data/mockData';
import { getRiskColor } from './utils/styleHelpers';

export const ConflictsTab = () => {
  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="w-5 h-5" />
          Conflict of Interest Tracker
        </CardTitle>
        <CardDescription className="text-slate-400">
          Monitor and manage potential conflicts across vendor relationships
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-300">Vendor</TableHead>
              <TableHead className="text-slate-300">Conflict Type</TableHead>
              <TableHead className="text-slate-300">Risk Level</TableHead>
              <TableHead className="text-slate-300">Declared</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conflictData.map((conflict, index) => (
              <TableRow key={index} className="border-slate-700">
                <TableCell className="font-medium text-white">{conflict.vendor}</TableCell>
                <TableCell className="text-slate-300">{conflict.conflict}</TableCell>
                <TableCell>
                  <Badge className={getRiskColor(conflict.risk)}>{conflict.risk}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={conflict.declared === 'Yes' ? 'default' : 'destructive'}>
                    {conflict.declared}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-300">{conflict.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">Investigate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
