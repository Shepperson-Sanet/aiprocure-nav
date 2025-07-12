
export const getQuadrantColor = (quadrant: string) => {
  switch (quadrant) {
    case 'Strategic': return 'from-red-500 to-red-600';
    case 'Leverage': return 'from-emerald-500 to-emerald-600';
    case 'Bottleneck': return 'from-amber-500 to-amber-600';
    case 'Non-critical': return 'from-blue-500 to-blue-600';
    default: return 'from-slate-500 to-slate-600';
  }
};

export const getQuadrantBg = (quadrant: string) => {
  switch (quadrant) {
    case 'Strategic': return 'bg-gradient-to-br from-red-500/20 to-red-600/10';
    case 'Leverage': return 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10';
    case 'Bottleneck': return 'bg-gradient-to-br from-amber-500/20 to-amber-600/10';
    case 'Non-critical': return 'bg-gradient-to-br from-blue-500/20 to-blue-600/10';
    default: return 'bg-gradient-to-br from-slate-500/20 to-slate-600/10';
  }
};

export const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'High': case 'Critical': return 'text-red-400 bg-red-950/50';
    case 'Medium': return 'text-yellow-400 bg-yellow-950/50';
    case 'Low': return 'text-green-400 bg-green-950/50';
    default: return 'text-gray-400 bg-gray-950/50';
  }
};

export const getCirclePosition = (item: any) => {
  switch (item.quadrant) {
    case 'Strategic': return { left: '25%', top: '30%' };
    case 'Leverage': return { left: '75%', top: '30%' };
    case 'Bottleneck': return { left: '25%', top: '70%' };
    case 'Non-critical': return { left: '75%', top: '70%' };
    default: return { left: '50%', top: '50%' };
  }
};
