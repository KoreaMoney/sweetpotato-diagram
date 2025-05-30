import { useState } from "react";
import { DiagramProvider } from "./DiagramComponents";
import ConnectorSection from "./documentation/ConnectorSection";
import OverviewSection from "./documentation/OverviewSection";
import BoxSection from "./documentation/BoxSection";
import TriangleSection from "./documentation/TriangleSection";
import ValveSection from "./documentation/ValveSection";
import ImageBoxSection from "./documentation/ImageBoxSection";
import ArrowSection from "./documentation/ArrowSection";
import LineSection from "./documentation/LineSection";
import ExamplesSection from "./documentation/ExamplesSection";
import logo from "@/assets/logo.png";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "개요", icon: "📚" },
    { id: "box", title: "Box", icon: "📦" },
    { id: "connector", title: "Connector", icon: "🔗" },
    { id: "triangle", title: "Triangle", icon: "🔺" },
    { id: "valve", title: "Valve", icon: "🚰" },
    { id: "imagebox", title: "ImageBox", icon: "🖼️" },
    { id: "arrow", title: "Arrow", icon: "➡️" },
    { id: "line", title: "Line", icon: "📏" },
    { id: "examples", title: "예제", icon: "💡" },
  ];

  const renderOverview = () => {
    return <OverviewSection />;
  };

  const renderBox = () => {
    return <BoxSection />;
  };

  const renderConnector = () => {
    return <ConnectorSection />;
  };

  const renderTriangle = () => {
    return <TriangleSection />;
  };

  const renderValve = () => {
    return <ValveSection />;
  };

  const renderImageBox = () => {
    return <ImageBoxSection />;
  };

  const renderArrow = () => {
    return <ArrowSection />;
  };

  const renderLine = () => {
    return <LineSection />;
  };

  const renderExamples = () => {
    return <ExamplesSection />;
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "box":
        return renderBox();
      case "connector":
        return renderConnector();
      case "triangle":
        return renderTriangle();
      case "valve":
        return renderValve();
      case "imagebox":
        return renderImageBox();
      case "arrow":
        return renderArrow();
      case "line":
        return renderLine();
      case "examples":
        return renderExamples();
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {sections.find((s) => s.id === activeSection)?.icon}{" "}
                {sections.find((s) => s.id === activeSection)?.title} 컴포넌트
              </h2>
              <p className="text-gray-600 mb-6">컴포넌트 설명</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DiagramProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h1 className="text-lg font-bold text-gray-800">
              <img src={logo} alt="logo" className="w-6 h-6 inline-block mr-2" />
              Documentation
            </h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-8">{renderContent()}</div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default Documentation;
