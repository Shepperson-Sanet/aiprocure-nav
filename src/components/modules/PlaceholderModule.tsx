
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PlaceholderModuleProps {
  title: string;
  description: string;
}

const PlaceholderModule = ({ title, description }: PlaceholderModuleProps) => {
  return (
    <Card className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl mx-auto flex items-center justify-center">
          <Construction className="w-8 h-8 text-slate-300" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
          <CardDescription className="text-slate-400 text-lg mt-2">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <p className="text-slate-400 text-sm">
            This module is currently under development and will be available soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderModule;
