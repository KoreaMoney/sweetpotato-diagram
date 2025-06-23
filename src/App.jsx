import { useState } from "react";
import { DiagramProvider } from "./components/DiagramComponents/DiagramContext";
import { ToastProvider } from "./components/ToastSystem";

// Pages
import Home from "./pages/Home";
import ComponentTest from "./pages/ComponentTest";
import HooksPage from "./pages/Hooks";

// Widgets
import Header from "./widgets/Layout/Header";
import Footer from "./widgets/Layout/Footer";

// Components
import ConnectorExamples from "./components/DiagramComponents/ConnectorExamples";
import ArrowDemo from "./components/DiagramComponents/ArrowDemo";
import MouseTrackerDoc from "./components/MouseTrackerDoc";
import Documentation from "./components/Documentation";
import AnimationTest from "./components/DiagramComponents/AnimationTest";

// Constants
import { DEFAULT_TAB } from "./shared/constants/tabs";

function App() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // Content renderer based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onTabChange={handleTabChange} />;
      case "connectors":
        return <ConnectorExamples />;
      case "arrows":
        return <ArrowDemo />;
      case "hooks":
        return <HooksPage />;
      case "mouse":
        return <MouseTrackerDoc />;
      case "docs":
        return <Documentation />;
      case "test":
        return <ComponentTest />;
      case "animation-test":
        return <AnimationTest />;
      default:
        return <Home onTabChange={handleTabChange} />;
    }
  };

  return (
    <ToastProvider>
      <DiagramProvider>
        <div className="h-screen flex flex-col bg-gray-50">
          <Header activeTab={activeTab} onTabChange={handleTabChange} />

          <main className="flex-1 overflow-auto">{renderContent()}</main>

          <Footer activeTab={activeTab} />
        </div>
      </DiagramProvider>
    </ToastProvider>
  );
}

export default App;
