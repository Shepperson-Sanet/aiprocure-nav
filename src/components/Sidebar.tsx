
import { Building2, FileText, Award, File, UserCheck, Activity, Search, Shield, Bot, CheckSquare, AlertTriangle, ClipboardList, BarChart, BarChart2, Plus, TrendingUp, Target, Users } from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar = ({ activeModule, setActiveModule }: SidebarProps) => {
  const menuItems = [
    { id: "Scope Selection", label: "Scope Selection", icon: ClipboardList },
    { id: "RFx Creation", label: "RFx Creation", icon: Plus },
    { id: "Create RFx", label: "Source vendors for RFx", icon: FileText },
    { id: "Scope Validation", label: "Scope Validation", icon: CheckSquare },
    { id: "RFx Review and Rank", label: "RFx Review and Rank", icon: BarChart2 },
    { id: "RFx BAFO Rank", label: "RFx BAFO Rank", icon: BarChart },
    { id: "Confirm Due Diligence", label: "Confirm Due Diligence", icon: Shield },
    { id: "Confirm Award", label: "Confirm Award", icon: Award },
    { id: "Confirm Contract", label: "Confirm Contract", icon: File },
    { id: "Confirm Onboarding", label: "Confirm Onboarding", icon: UserCheck },
    { id: "Performance Management", label: "Performance Management", icon: Activity },
    { id: "Perform Audit", label: "Perform Audit", icon: Search },
    { id: "Risk Register", label: "Risk Register", icon: AlertTriangle },
    { id: "AI Overview Bot", label: "AI Overview Bot", icon: Bot },
    { id: "Forecasting and Sourcing Phasing", label: "Forecasting and Sourcing Phasing", icon: TrendingUp },
    { id: "Category Management", label: "Category Management", icon: Target },
    { id: "Vendor Profile View", label: "Vendor Profile View", icon: Users },
  ];

  return (
    <aside className="w-72 bg-slate-950/80 backdrop-blur-sm border-r border-slate-800 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">ProcureAI</h1>
            <p className="text-xs text-slate-400">Smart Procurement</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">John Doe</p>
            <p className="text-xs">Procurement Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
