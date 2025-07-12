
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface ScopeCardProps {
  title: string;
  subcategories: string[];
  onCreateTender: (selectedItems: string[]) => void;
}

const ScopeCard = ({ title, subcategories, onCreateTender }: ScopeCardProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, item]);
    } else {
      setSelectedItems(prev => prev.filter(i => i !== item));
    }
  };

  const handleCreateTender = () => {
    if (selectedItems.length > 0) {
      onCreateTender(selectedItems);
    }
  };

  return (
    <Card className="bg-[#0f172a] text-white p-6 shadow-lg rounded-xl mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
          Scope
        </Badge>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {subcategories.map((sub, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-3 border border-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors">
            <Checkbox
              id={`${title}-${idx}`}
              checked={selectedItems.includes(sub)}
              onCheckedChange={(checked) => handleCheckboxChange(sub, checked as boolean)}
              className="border-blue-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label 
              htmlFor={`${title}-${idx}`} 
              className="text-blue-400 cursor-pointer flex-1 text-sm"
            >
              {sub}
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">
          {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
        </span>
        <Button 
          onClick={handleCreateTender}
          disabled={selectedItems.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Create Tender
        </Button>
      </div>
    </Card>
  );
};

const ScopeSelection = () => {
  const scopeData = [
    {
      title: "Generators",
      subcategories: ["15 kVA", "20 kVA", "30 kVA", "50 kVA", "80 kVA", "100 kVA"]
    },
    {
      title: "Security Services",
      subcategories: ["Guards – Offices", "Guards – Towers", "Security Consumables"]
    },
    {
      title: "Fuel Supply",
      subcategories: ["Bulk Delivery", "Fuel Cards", "Depot Pickup"]
    }
  ];

  const handleCreateTender = (category: string, selectedItems: string[]) => {
    console.log(`Creating tender for ${category}:`, selectedItems);
    // Here you would typically navigate to the Create RFx module or trigger the tender creation process
    alert(`Creating tender for ${category} with: ${selectedItems.join(', ')}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold text-white">Scope Selection</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Select the procurement categories and specifications that match your requirements
        </p>
      </div>

      <div className="space-y-6">
        {scopeData.map((scope, index) => (
          <ScopeCard 
            key={index}
            title={scope.title}
            subcategories={scope.subcategories}
            onCreateTender={(selectedItems) => handleCreateTender(scope.title, selectedItems)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScopeSelection;
