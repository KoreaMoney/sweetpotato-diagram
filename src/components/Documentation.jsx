import React, { useState } from "react";
import { DiagramProvider } from "./DiagramComponents";
import ConnectorSection from "./documentation/ConnectorSection";
import OverviewSection from "./documentation/OverviewSection";
import BoxSection from "./documentation/BoxSection";
import TriangleSection from "./documentation/TriangleSection";
import ValveSection from "./documentation/ValveSection";
import ImageBoxSection from "./documentation/ImageBoxSection";
import ArrowSection from "./documentation/ArrowSection";
import LineSection from "./documentation/LineSection";
import MouseTrackerSection from "./documentation/MouseTrackerSection";
import ExamplesSection from "./documentation/ExamplesSection";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Getting Started", icon: "🚀" },
    { id: "box", title: "Box", icon: "🧩" },
    { id: "connector", title: "Connectors", icon: "🔗" },
    { id: "triangle", title: "Triangle", icon: "🎨" },
    { id: "valve", title: "Valve", icon: "⚡" },
    { id: "imagebox", title: "Image Box", icon: "💡" },
    { id: "arrow", title: "Arrow", icon: "➡️" },
    { id: "line", title: "Line", icon: "📏" },
    { id: "mousetracker", title: "Mouse Tracker", icon: "🖱️" },
    { id: "examples", title: "Examples", icon: "💡" },
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

  const renderMouseTracker = () => {
    return <MouseTrackerSection />;
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
      case "mousetracker":
        return renderMouseTracker();
      case "examples":
        return renderExamples();
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {sections.find((s) => s.id === activeSection)?.icon}{" "}
                {sections.find((s) => s.id === activeSection)?.title} Component
              </h2>
              <p className="text-gray-600 mb-6">Component description</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DiagramProvider>
      <div className="h-full bg-gray-100 flex">
        {/* Sidebar - fixed height with internal scroll */}
        <div className="w-64 bg-white shadow-lg flex-shrink-0 flex flex-col h-full">
          <div className="p-6 border-b flex-shrink-0">
            <h1 className="text-lg font-bold text-gray-800">🍠 Documentation</h1>
          </div>
          <nav className="p-4 overflow-y-auto flex-1">
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

        {/* Main Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">{renderContent()}</div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default Documentation;
