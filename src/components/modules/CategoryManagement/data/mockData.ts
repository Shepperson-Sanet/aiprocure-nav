
export const kraljicData = [
  { name: 'Diesel Supply', risk: 85, impact: 90, spend: 15000000, quadrant: 'Strategic', suppliers: 3 },
  { name: 'Stationery', risk: 20, impact: 25, spend: 300000, quadrant: 'Non-critical', suppliers: 25 },
  { name: 'Tower Steel', risk: 30, impact: 85, spend: 12000000, quadrant: 'Leverage', suppliers: 8 },
  { name: 'Civil Works', risk: 75, impact: 35, spend: 8000000, quadrant: 'Bottleneck', suppliers: 5 },
  { name: 'Generator Spares', risk: 80, impact: 88, spend: 6500000, quadrant: 'Strategic', suppliers: 4 },
  { name: 'Office Snacks', risk: 15, impact: 20, spend: 120000, quadrant: 'Non-critical', suppliers: 15 }
];

export const supplierRiskData = [
  { name: 'TechFlow Solutions', category: 'IT Services', dependency: 85, revenue: 60, risk: 'High', status: 'Strategic' },
  { name: 'SafeGuard Inc', category: 'Safety Equipment', dependency: 92, revenue: 35, risk: 'Critical', status: 'Sole Source' },
  { name: 'Drill Masters', category: 'Drilling Equipment', dependency: 45, revenue: 75, risk: 'Medium', status: 'Preferred' },
  { name: 'Global Office Co', category: 'Office Supplies', dependency: 15, revenue: 5, risk: 'Low', status: 'Transactional' }
];

export const conflictData = [
  { vendor: 'Alpha Engineering', conflict: 'Employee spouse director', risk: 'High', declared: 'Yes', status: 'Under Review' },
  { vendor: 'Beta Services', conflict: 'Political exposure', risk: 'Medium', declared: 'No', status: 'Investigation' },
  { vendor: 'Gamma Tech', conflict: 'Shell company indicators', risk: 'High', declared: 'No', status: 'AI Flagged' }
];

export const tailSpendData = [
  { category: 'Miscellaneous Services', spend: 125000, suppliers: 45, avgOrder: 2800, consolidation: 85 },
  { category: 'Small Tools', spend: 89000, suppliers: 67, avgOrder: 1300, consolidation: 92 },
  { category: 'Consumables', spend: 156000, suppliers: 38, avgOrder: 4100, consolidation: 78 }
];

export const valueChainData = [
  { stage: 'Inbound Logistics', spend: 25000000, categories: ['Transportation', 'Warehousing'], coverage: 95 },
  { stage: 'Operations', spend: 45000000, categories: ['Equipment', 'Materials', 'Energy'], coverage: 88 },
  { stage: 'Outbound Logistics', spend: 12000000, categories: ['Shipping', 'Distribution'], coverage: 92 },
  { stage: 'Marketing & Sales', spend: 8000000, categories: ['Advertising', 'CRM Systems'], coverage: 75 },
  { stage: 'Services', spend: 15000000, categories: ['Maintenance', 'Support'], coverage: 85 }
];
