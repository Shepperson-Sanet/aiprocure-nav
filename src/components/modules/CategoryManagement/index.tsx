
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from 'lucide-react';
import { KraljicMatrixTab } from './KraljicMatrixTab';
import { ValueChainTab } from './ValueChainTab';
import { SupplierRiskTab } from './SupplierRiskTab';
import { TailSpendTab } from './TailSpendTab';
import { ConflictsTab } from './ConflictsTab';
import { PoliciesTab } from './PoliciesTab';
import { AIInsightsTab } from './AIInsightsTab';

const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 bg-slate-950 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Category Management</h1>
          <p className="text-slate-400">Strategic procurement oversight with AI-powered insights</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="drilling">Drilling Equipment</SelectItem>
              <SelectItem value="safety">Safety Equipment</SelectItem>
              <SelectItem value="it">IT Services</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="lagos">Lagos</SelectItem>
              <SelectItem value="portharcourt">Port Harcourt</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kraljic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800 border-slate-700">
          <TabsTrigger value="kraljic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Kraljic Matrix</TabsTrigger>
          <TabsTrigger value="valuechain" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Value Chain</TabsTrigger>
          <TabsTrigger value="suppliers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Supplier Risk</TabsTrigger>
          <TabsTrigger value="tailspend" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Tail Spend</TabsTrigger>
          <TabsTrigger value="conflicts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Conflicts</TabsTrigger>
          <TabsTrigger value="policies" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Best Practices</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="kraljic">
          <KraljicMatrixTab />
        </TabsContent>

        <TabsContent value="valuechain">
          <ValueChainTab />
        </TabsContent>

        <TabsContent value="suppliers">
          <SupplierRiskTab />
        </TabsContent>

        <TabsContent value="tailspend">
          <TailSpendTab />
        </TabsContent>

        <TabsContent value="conflicts">
          <ConflictsTab />
        </TabsContent>

        <TabsContent value="policies">
          <PoliciesTab />
        </TabsContent>

        <TabsContent value="ai">
          <AIInsightsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategoryManagement;
