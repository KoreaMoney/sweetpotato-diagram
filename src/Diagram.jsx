import React, { useState } from "react";
import ConnectorExamples from "./components/ConnectorExamples";
import Documentation from "./components/Documentation";
import { ToastProvider } from "./components/ToastSystem";

const Diagram = () => {
  const [currentView, setCurrentView] = useState("examples"); // 'examples' 또는 'docs'

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <ToastProvider>
      <div className="relative w-full h-screen">
        {/* 네비게이션 버튼 */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => handleViewChange("examples")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === "examples" ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Connector 예제
          </button>
          <button
            onClick={() => handleViewChange("docs")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentView === "docs" ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            📚 Doc
          </button>
        </div>

        {/* 현재 뷰 렌더링 */}
        {currentView === "examples" && <ConnectorExamples />}
        {currentView === "docs" && <Documentation />}
      </div>
    </ToastProvider>
  );
};

export default Diagram;
