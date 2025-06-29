import { useState, useEffect } from "react";
import { DiagramProvider } from "./components/DiagramComponents/DiagramContext";
import { ToastProvider } from "./components/ToastSystem";

// SEO Utils
import { setPageMeta, trackWebVitals } from "./utils/seo";

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

// 탭과 SEO 페이지 키 매핑
const tabToSeoMap = {
  home: "home",
  connectors: "components",
  arrows: "components",
  hooks: "hooks",
  mouse: "components",
  docs: "documentation",
  test: "examples",
  "animation-test": "examples",
};

function App() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  // 초기 로드 시 Web Vitals 추적 시작
  useEffect(() => {
    trackWebVitals();
  }, []);

  // 탭 변경 시 SEO 메타 태그 업데이트
  useEffect(() => {
    const seoPageKey = tabToSeoMap[activeTab] || "home";

    // 특정 탭에 대한 커스텀 메타데이터 설정
    const customMeta = getCustomMetaForTab(activeTab);

    setPageMeta(seoPageKey, customMeta);
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 탭별 커스텀 메타데이터 반환
  const getCustomMetaForTab = (tabId) => {
    const customMetas = {
      connectors: {
        title: "Connectors - Sweet Diagram Components",
        description:
          "Interactive connector components with auto-connect features, bidirectional connections, and advanced styling options",
      },
      arrows: {
        title: "Arrows - Sweet Diagram Components",
        description:
          "Customizable arrow components with various styles, directions, and interactive features for diagram connections",
      },
      mouse: {
        title: "Mouse Tracker - Sweet Diagram Components",
        description:
          "Advanced mouse tracking component for interactive diagram experiences and cursor-based interactions",
      },
      test: {
        title: "Component Test - Sweet Diagram Examples",
        description:
          "Live testing environment for Sweet Diagram components with interactive examples and code playground",
      },
      "animation-test": {
        title: "Animation Test - Sweet Diagram Examples",
        description:
          "Animation testing and examples showcasing smooth transitions and interactive effects in diagram components",
      },
    };

    return customMetas[tabId] || {};
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
