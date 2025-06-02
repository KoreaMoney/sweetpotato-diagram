import React, { useState } from "react";
import { DiagramProvider } from "./components/DiagramComponents/DiagramContext";
import { ToastProvider } from "./components/ToastSystem";
import ConnectorExamples from "./components/DiagramComponents/ConnectorExamples";
import ArrowDemo from "./components/DiagramComponents/ArrowDemo";
import Documentation from "./components/Documentation";
import Box from "./components/DiagramComponents/Box";
import DraggableBox from "./components/DiagramComponents/DraggableBox";
import Triangle from "./components/DiagramComponents/Triangle";
import Valve from "./components/DiagramComponents/Valve";
import ImageBox from "./components/DiagramComponents/ImageBox";
import TypingEffect from "./components/TypingEffect";
import logo from "./assets/logo.png";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  // Navigation tabs
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "connectors", label: "Connector Examples", icon: "🔗" },
    { id: "arrows", label: "Arrow Demo", icon: "🔺" },
    { id: "docs", label: "Documentation", icon: "📚" },
    { id: "test", label: "Component Test", icon: "🧪" },
  ];

  // Home content
  const HomeContent = () => (
    <div className="p-8 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">Sweet-Diagram</h1>
          <p className="text-xl text-gray-600 mb-8">
            <TypingEffect
              text="Modern and intuitive React diagram editor components with drag & drop and interactive diagram editing features."
              speed={60}
              delay={800}
              showCursor={true}
              cursorChar="|"
              className="inline-block"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.slice(1).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-blue-500"
            >
              <div className="text-4xl mb-3">{tab.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tab.label}</h3>
              <p className="text-sm text-gray-600">
                {tab.id === "connectors" && "Interactive connector examples with drag & drop"}
                {tab.id === "arrows" && "Real-time arrow customization demo"}
                {tab.id === "docs" && "Complete API documentation and guides"}
                {tab.id === "test" && "Component positioning and functionality tests"}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">🚀 Quick Start</h2>
          <div className="text-left bg-black bg-opacity-20 rounded-lg p-4">
            <pre className="text-sm">
              {`npm install sweet-diagram

import { Box, DiagramProvider } from "sweet-diagram";

function App() {
  return (
  <div className="relative w-full h-full">
    <DiagramProvider>
      <Box x={100} y={100} width={120} height={60} text="Hello World!" />
    </DiagramProvider>
  </div>
  );
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  // Component Test content
  const ComponentTestContent = () => (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Component Test</h2>
        <p className="text-gray-600">Test component positioning and functionality</p>
      </div>

      <div className="h-96 relative bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Grid info */}
        <div className="absolute top-2 left-2 text-xs text-gray-500 z-30 bg-white px-2 py-1 rounded">
          Grid: 50px spacing
        </div>

        {/* Test components */}
        <Box
          id="test-box-1"
          x={50}
          y={50}
          width={100}
          height={40}
          text="(50,50)"
          className="bg-blue-500 text-white border-blue-600 border-2 rounded"
        />

        <Box
          id="test-box-2"
          x={200}
          y={100}
          width={120}
          height={60}
          text="(200,100)"
          className="bg-green-500 text-white border-green-600 border-2 rounded"
        />

        <Box
          id="test-box-3"
          x={350}
          y={50}
          width={80}
          height={30}
          text="(350,50)"
          className="bg-red-500 text-white border-red-600 border-2 rounded"
        />

        <Box
          id="test-box-4"
          x={100}
          y={200}
          width={90}
          height={50}
          text="(100,200)"
          className="bg-purple-500 text-white border-purple-600 border-2 rounded"
        />

        <Box
          id="test-box-5"
          x={300}
          y={250}
          width={110}
          height={45}
          text="(300,250)"
          className="bg-yellow-500 text-black border-yellow-600 border-2 rounded"
        />

        {/* Draggable box */}
        <DraggableBox
          id="drag-test"
          initialX={500}
          initialY={150}
          width={140}
          height={70}
          title="Draggable"
          color="indigo"
        />

        {/* Other components */}
        <Triangle x={50} y={300} size={40} direction="up" />
        <Valve x={150} y={300} size={50} type="ball" isOpen={true} />
        <ImageBox id="img-test" x={250} y={300} width={80} height={60} text="Image" icon="⚙️" iconType="emoji" />
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="font-semibold mb-2">Test Checklist:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>✅ Each Box positioned at specified (x, y) coordinates</p>
          <p>✅ Draggable box can be moved</p>
          <p>✅ Grid alignment matches coordinates (50px spacing)</p>
          <p>✅ Triangle, Valve, and ImageBox display correctly</p>
        </div>
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />;
      case "connectors":
        return <ConnectorExamples />;
      case "arrows":
        return <ArrowDemo />;
      case "docs":
        return <Documentation />;
      case "test":
        return <ComponentTestContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <ToastProvider>
      <DiagramProvider>
        <div className="h-screen flex flex-col bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <button
                    onClick={() => setActiveTab("home")}
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center"
                  >
                    <img src={logo} alt="logo" className="w-6 h-6 mr-2" />
                    Sweet-Diagram
                  </button>
                </div>

                <nav className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">{renderContent()}</main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 flex-shrink-0">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Made with 💻 by KimDowon</span>
                <div className="flex items-center gap-4">
                  <span>Active: {tabs.find((tab) => tab.id === activeTab)?.label}</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live Demo
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </DiagramProvider>
    </ToastProvider>
  );
}

export default App;
