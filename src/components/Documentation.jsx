import React, { useState } from "react";
import { DiagramProvider } from "./DiagramComponents";
import ConnectorSection from "./documentation/ConnectorSection";
import AutoConnectSection from "./documentation/AutoConnectSection";
import OverviewSection from "./documentation/OverviewSection";
import BoxSection from "./documentation/BoxSection";
import TriangleSection from "./documentation/TriangleSection";
import DiamondSection from "./documentation/DiamondSection";
import ValveSection from "./documentation/ValveSection";
import ImageBoxSection from "./documentation/ImageBoxSection";
import ArrowSection from "./documentation/ArrowSection";
import LineSection from "./documentation/LineSection";
import MouseTrackerSection from "./documentation/MouseTrackerSection";
import SankeySection from "./documentation/SankeySection/SankeySection";
import StackSection from "./documentation/StackSection";
import UndoRedoSection from "./documentation/UndoRedoSection";
import ExamplesSection from "./documentation/ExamplesSection";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Getting Started", icon: "🚀", color: "from-blue-500 to-cyan-500" },
    { id: "box", title: "Box", icon: "📦", color: "from-purple-500 to-pink-500" },
    { id: "connector", title: "Connectors", icon: "🔗", color: "from-green-500 to-emerald-500" },
    { id: "autoconnect", title: "Auto Connect", icon: "⚡", color: "from-purple-600 to-blue-600" },
    { id: "triangle", title: "Triangle", icon: "🔺", color: "from-red-500 to-orange-500" },
    { id: "diamond", title: "Diamond", icon: "💎", color: "from-cyan-500 to-blue-500" },
    { id: "valve", title: "Valve", icon: "🎛️", color: "from-indigo-500 to-purple-500" },
    { id: "imagebox", title: "Image Box", icon: "🖼️", color: "from-yellow-500 to-orange-500" },
    { id: "arrow", title: "Arrow", icon: "↗️", color: "from-teal-500 to-cyan-500" },
    { id: "line", title: "Line", icon: "📐", color: "from-pink-500 to-rose-500" },
    { id: "sankey", title: "Sankey", icon: "🌊", color: "from-blue-600 to-indigo-600" },
    { id: "mousetracker", title: "Mouse Tracker", icon: "🎯", color: "from-violet-500 to-purple-500" },
    { id: "stack", title: "Stack Priority", icon: "🎯", color: "from-orange-500 to-red-500" },
    { id: "undoredo", title: "Undo/Redo", icon: "↩️", color: "from-emerald-500 to-teal-500" },
    { id: "examples", title: "Examples", icon: "✨", color: "from-amber-500 to-yellow-500" },
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

  const renderAutoConnect = () => {
    return <AutoConnectSection />;
  };

  const renderTriangle = () => {
    return <TriangleSection />;
  };

  const renderDiamond = () => {
    return <DiamondSection />;
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

  const renderSankey = () => {
    return <SankeySection />;
  };

  const renderStack = () => {
    return <StackSection />;
  };

  const renderUndoRedo = () => {
    return <UndoRedoSection />;
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
      case "autoconnect":
        return renderAutoConnect();
      case "triangle":
        return renderTriangle();
      case "diamond":
        return renderDiamond();
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
      case "sankey":
        return renderSankey();
      case "stack":
        return renderStack();
      case "undoredo":
        return renderUndoRedo();
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
        <div className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex-shrink-0 flex flex-col h-full border-r border-slate-700">
          <div className="p-6 border-b border-slate-700 flex-shrink-0 bg-gradient-to-r from-slate-800 to-slate-700">
            <h1 className="text-xl font-bold text-white flex items-center">
              <span className="text-2xl mr-3 animate-pulse">🍠</span>
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
          </div>
          <nav className="p-4 overflow-y-auto flex-1 space-y-1">
            <ul className="space-y-3">
              {sections.map((section, index) => (
                <li key={section.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-300 transform
                              ${
                                activeSection === section.id
                                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105 shadow-black/20`
                                  : "text-gray-300 hover:text-white hover:bg-slate-700/50 hover:scale-102 hover:translate-x-1"
                              }
                              hover:shadow-lg active:scale-95 backdrop-blur-sm border border-slate-600/30
                              hover:border-slate-500/50`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`text-xl mr-3 transition-all duration-300 
                                     ${
                                       activeSection === section.id
                                         ? "scale-110 rotate-6"
                                         : "group-hover:scale-110 group-hover:rotate-3"
                                     }`}
                      >
                        {section.icon}
                      </span>
                      <span
                        className={`font-medium transition-all duration-300 
                                      ${
                                        activeSection === section.id
                                          ? "font-semibold tracking-wide"
                                          : "group-hover:translate-x-1"
                                      }`}
                      >
                        {section.title}
                      </span>
                    </div>
                    {activeSection === section.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full animate-pulse"></div>
                    )}
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
