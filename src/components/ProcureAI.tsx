
import { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function ProcureAI() {
  const [activeModule, setActiveModule] = useState("login");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-foreground font-sans">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <MainContent activeModule={activeModule} setActiveModule={setActiveModule} />
    </div>
  );
}
