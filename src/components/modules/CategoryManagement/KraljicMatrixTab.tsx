
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, AlertTriangle, Shield } from 'lucide-react';
import { kraljicData } from './data/mockData';
import { getQuadrantColor, getQuadrantBg } from './utils/styleHelpers';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

export const KraljicMatrixTab = () => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<any>(null);
  
  const filteredData = selectedQuadrant 
    ? kraljicData.filter(item => item.quadrant === selectedQuadrant)
    : kraljicData;

  const getQuadrantColors = (quadrant: string) => {
    switch (quadrant) {
      case 'Strategic': return { fill: 'hsl(221, 83%, 53%)', border: 'hsl(221, 83%, 43%)' }; // Deep Blue
      case 'Leverage': return { fill: 'hsl(142, 76%, 36%)', border: 'hsl(142, 76%, 26%)' }; // Emerald Green
      case 'Bottleneck': return { fill: 'hsl(25, 95%, 53%)', border: 'hsl(25, 95%, 43%)' }; // Orange
      case 'Non-critical': return { fill: 'hsl(215, 20%, 65%)', border: 'hsl(215, 20%, 55%)' }; // Soft Grey
      default: return { fill: 'hsl(215, 20%, 65%)', border: 'hsl(215, 20%, 55%)' };
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isStrategic = data.quadrant === 'Strategic';
      const isBottleneck = data.quadrant === 'Bottleneck';
      
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-white">{data.name}</h4>
            <Badge className={`bg-gradient-to-r ${getQuadrantColor(data.quadrant)} text-white border-0`}>
              {data.quadrant}
            </Badge>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-slate-300">Spend: <span className="font-medium text-white">${(data.spend / 1000000).toFixed(1)}M</span></p>
            <p className="text-slate-300">Supply Risk: <span className="font-medium text-white">{data.risk}%</span></p>
            <p className="text-slate-300">Profit Impact: <span className="font-medium text-white">{data.impact}%</span></p>
            <p className="text-slate-300">Suppliers: <span className="font-medium text-white">{data.suppliers}</span></p>
          </div>
          {(isStrategic || isBottleneck) && (
            <div className="mt-2 p-2 bg-gradient-to-r from-red-950/40 to-orange-950/40 rounded border border-red-800/30">
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3 h-3 text-red-400" />
                <span className="text-xs font-medium text-red-400">Risk Alert</span>
              </div>
              <p className="text-xs text-red-200">
                {isStrategic ? 'Critical supplier dependency - Monitor closely' : 'Limited supplier options - Seek alternatives'}
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Target className="w-5 h-5" />
          Kraljic Matrix - Strategic Category Positioning
        </CardTitle>
        <CardDescription className="text-slate-400">
          AI-enhanced supplier and category risk assessment with strategic recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                🧠 Strategic Procurement Positioning – Kraljic Matrix View
              </h3>
              {selectedQuadrant && (
                <button 
                  onClick={() => setSelectedQuadrant(null)}
                  className="text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  Clear Filter
                </button>
              )}
            </div>
            
            <Card className="bg-slate-800 border-slate-700 mb-4">
              <CardContent className="p-4">
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 80, bottom: 60, left: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 20%, 25%)" />
                      <XAxis 
                        type="number" 
                        dataKey="risk" 
                        domain={[0, 100]}
                        axisLine={{ stroke: 'hsl(215, 20%, 65%)' }}
                        tickLine={{ stroke: 'hsl(215, 20%, 65%)' }}
                        tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 12 }}
                        label={{ value: 'Supply Risk (Low → High)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(215, 20%, 85%)' } }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="impact" 
                        domain={[0, 100]}
                        axisLine={{ stroke: 'hsl(215, 20%, 65%)' }}
                        tickLine={{ stroke: 'hsl(215, 20%, 65%)' }}
                        tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 12 }}
                        label={{ value: 'Profit Impact (Low → High)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(215, 20%, 85%)' } }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      
                      {/* Quadrant background areas */}
                      <defs>
                        <pattern id="strategic" patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="4" fill="hsl(221, 83%, 53%, 0.1)" />
                        </pattern>
                        <pattern id="leverage" patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="4" fill="hsl(142, 76%, 36%, 0.1)" />
                        </pattern>
                        <pattern id="bottleneck" patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="4" fill="hsl(25, 95%, 53%, 0.1)" />
                        </pattern>
                        <pattern id="noncritical" patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="4" fill="hsl(215, 20%, 65%, 0.1)" />
                        </pattern>
                      </defs>
                      
                      <Scatter 
                        data={kraljicData} 
                        fill="transparent"
                        onClick={(data) => setSelectedQuadrant(data.quadrant)}
                      >
                        {kraljicData.map((entry, index) => {
                          const colors = getQuadrantColors(entry.quadrant);
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={colors.fill}
                              stroke={colors.border}
                              strokeWidth={2}
                              r={Math.sqrt(entry.spend / 100000)}
                              style={{ cursor: 'pointer' }}
                            />
                          );
                        })}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Quadrant Legend */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <span className="text-sm text-slate-300">Strategic Items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                    <span className="text-sm text-slate-300">Leverage Items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600"></div>
                    <span className="text-sm text-slate-300">Bottleneck Items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-slate-500 to-slate-600"></div>
                    <span className="text-sm text-slate-300">Non-Critical Items</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 mt-2">
                  💡 Tip: Click on any quadrant to filter categories below • Bubble size represents spend volume
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-white">
            Category Details & AI Recommendations 
            {selectedQuadrant && <span className="text-blue-400 ml-2">({selectedQuadrant} Items)</span>}
          </h3>
          {filteredData.map((item, index) => (
            <Card key={index} className={`border-l-4 bg-slate-800 border-slate-700 hover:bg-slate-700/50 transition-colors duration-200`} style={{ borderLeftColor: item.quadrant === 'Strategic' ? '#ef4444' : item.quadrant === 'Leverage' ? '#10b981' : item.quadrant === 'Bottleneck' ? '#f59e0b' : '#3b82f6' }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-white text-lg">{item.name}</h4>
                  <Badge className={`bg-gradient-to-r ${getQuadrantColor(item.quadrant)} text-white border-0 shadow-md`}>{item.quadrant}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 block">Annual Spend</span>
                    <span className="font-bold text-xl text-white">${(item.spend / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 block">Suppliers</span>
                    <span className="font-bold text-xl text-white">{item.suppliers}</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 block">Supply Risk</span>
                    <span className="font-bold text-lg text-white">{item.risk}%</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 block">Business Impact</span>
                    <span className="font-bold text-lg text-white">{item.impact}%</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-950/40 to-indigo-950/40 rounded-lg border border-blue-800/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 font-semibold text-sm">AI Strategic Recommendation:</span>
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    {item.quadrant === 'Strategic' && 'Develop long-term partnerships with key suppliers, establish joint innovation programs, and implement supplier development initiatives.'}
                    {item.quadrant === 'Leverage' && 'Leverage competitive market dynamics through regular tendering, consolidate purchase volumes, and negotiate aggressive pricing.'}
                    {item.quadrant === 'Bottleneck' && 'Actively seek alternative suppliers, implement dual sourcing strategies, and maintain safety stock buffers.'}
                    {item.quadrant === 'Non-critical' && 'Automate procurement processes, implement e-catalogs, and focus on reducing transaction costs and administrative overhead.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
