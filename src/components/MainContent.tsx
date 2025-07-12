
import CreateRFx from "./modules/CreateRFx";
import DueDiligence from "./modules/ConfirmDueDiligence";
import ConfirmAward from "./modules/ConfirmAward";
import ConfirmContract from "./modules/ConfirmContract";
import ConfirmOnboarding from "./modules/ConfirmOnboarding";
import PerformanceManagement from "./modules/PerformanceManagement";
import PerformAudit from "./modules/PerformAudit";
import ScopeValidation from "./modules/ScopeValidation";
import ScopeSelection from "./modules/ScopeSelection";
import RiskRegister from "./modules/RiskRegister";
import AiOverviewBot from "./modules/AIBot";
import RFxReviewRank from "./modules/RFxReviewRank";
import RFxBAFORank from "./modules/RFxBAFORank";
import RFxCreation from "./modules/RFxCreation";
import ForecastingSourcingPhasing from "./modules/ForecastingSourcingPhasing";
import CategoryManagement from "./modules/CategoryManagement";
import VendorProfileView from "./modules/VendorProfileView";

interface MainContentProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const MainContent = ({ activeModule, setActiveModule }: MainContentProps) => {
  const renderModule = () => {
    switch (activeModule) {
      case "Scope Selection":
        return <ScopeSelection />;
      case "RFx Creation":
        return <RFxCreation />;
      case "Scope Validation":
        return <ScopeValidation />;
      case "Create RFx":
        return <CreateRFx setActiveModule={setActiveModule} />;
      case "RFx Review and Rank":
        return <RFxReviewRank />;
      case "RFx BAFO Rank":
        return <RFxBAFORank />;
      case "Confirm Due Diligence":
        return <DueDiligence />;
      case "Confirm Award":
        return <ConfirmAward />;
      case "Confirm Contract":
        return <ConfirmContract />;
      case "Confirm Onboarding":
        return <ConfirmOnboarding />;
      case "Performance Management":
        return <PerformanceManagement />;
      case "Perform Audit":
        return <PerformAudit />;
      case "Risk Register":
        return <RiskRegister />;
      case "AI Overview Bot":
        return <AiOverviewBot />;
      case "Forecasting and Sourcing Phasing":
        return <ForecastingSourcingPhasing />;
      case "Category Management":
        return <CategoryManagement />;
      case "Vendor Profile View":
        return <VendorProfileView setActiveModule={setActiveModule} />;
      default:
        return <ScopeSelection />;
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
      {renderModule()}
    </main>
  );
};

export default MainContent;
