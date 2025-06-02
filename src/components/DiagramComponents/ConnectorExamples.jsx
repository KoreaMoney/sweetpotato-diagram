import React, { useState, useEffect } from "react";
import { DiagramProvider } from "./DiagramContext";
import DraggableBox from "./DraggableBox";
import Connector from "./Connector";
import CodeEditor from "./CodeEditor";

/**
 * Connector 컴포넌트 사용 예시 모음
 *
 * 이 파일은 Connector 컴포넌트의 다양한 사용법을 보여주는 예시 컬렉션입니다.
 * 실제 프로젝트에서 참고용으로 사용하세요.
 */

// 기본 예제 템플릿들 - 새로운 컬러 팔레트 적용
const EXAMPLE_TEMPLATES = {
  basic: {
    title: "🔗 Basic Box Connection",
    description: "Example of automatically connecting draggable boxes",
    difficulty: "Beginner",
    icon: "🔗",
    code: `<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  showArrow={true}
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-[#0052cc] transition-all duration-300"
/>`,
    boxes: [
      { id: "box1", x: 50, y: 100, width: 140, height: 90, title: "Start Box", color: "primary" },
      { id: "box2", x: 320, y: 100, width: 140, height: 90, title: "End Box", color: "secondary" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "straight",
        showArrow: true,
        strokeWidth: 3,
        className: "stroke-[#0066ff] hover:stroke-[#0052cc] transition-all duration-300",
      },
    ],
  },

  curved: {
    title: "🌊 Curved Connection",
    description: "Example of connecting with smooth Bezier curves",
    difficulty: "Intermediate",
    icon: "🌊",
    code: `<Connector
  fromBox={{ id: "box1", position: "bottom" }}
  toBox={{ id: "box2", position: "top" }}
  connectionType="curved"
  showArrow={true}
  strokeWidth={4}
  className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
  animated={true}
/>`,
    boxes: [
      { id: "box1", x: 100, y: 50, width: 140, height: 90, title: "Start Point", color: "dark" },
      { id: "box2", x: 320, y: 280, width: 140, height: 90, title: "End Point", color: "primary" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "bottom" },
        toBox: { id: "box2", position: "top" },
        connectionType: "curved",
        showArrow: true,
        strokeWidth: 4,
        className: "stroke-black hover:stroke-[#0066ff] transition-all duration-300",
        animated: true,
      },
    ],
  },

  orthogonal: {
    title: "📐 Orthogonal Connection",
    description: "Example of L-shaped orthogonal connections",
    difficulty: "Intermediate",
    icon: "📐",
    code: `<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="orthogonal"
  showArrow={true}
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
  orthogonalDirection="horizontal-first"
/>`,
    boxes: [
      { id: "box1", x: 50, y: 80, width: 140, height: 90, title: "Start", color: "primary" },
      { id: "box2", x: 320, y: 220, width: 140, height: 90, title: "End", color: "light" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "orthogonal",
        showArrow: true,
        strokeWidth: 3,
        className: "stroke-[#0066ff] hover:stroke-black transition-all duration-300",
        orthogonalDirection: "horizontal-first",
      },
    ],
  },

  multiConnection: {
    title: "🔀 Multiple Connections",
    description: "Example of connecting multiple boxes simultaneously",
    difficulty: "Advanced",
    icon: "🔀",
    code: `{/* From center box to other boxes */}
<Connector
  fromBox={{ id: "center", position: "top" }}
  toBox={{ id: "box1", position: "bottom" }}
  connectionType="curved"
  showArrow={true}
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
/>
<Connector
  fromBox={{ id: "center", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  showArrow={true}
  strokeWidth={3}
  className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
/>
<Connector
  fromBox={{ id: "center", position: "bottom" }}
  toBox={{ id: "box3", position: "top" }}
  connectionType="orthogonal"
  showArrow={true}
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
/>`,
    boxes: [
      { id: "center", x: 250, y: 150, width: 120, height: 90, title: "Center", color: "dark" },
      { id: "box1", x: 200, y: 50, width: 120, height: 70, title: "Top", color: "primary" },
      { id: "box2", x: 420, y: 120, width: 120, height: 70, title: "Right", color: "light" },
      { id: "box3", x: 200, y: 290, width: 120, height: 70, title: "Bottom", color: "primary" },
    ],
    connections: [
      {
        fromBox: { id: "center", position: "top" },
        toBox: { id: "box1", position: "bottom" },
        connectionType: "curved",
        showArrow: true,
        strokeWidth: 3,
        className: "stroke-[#0066ff] hover:stroke-black transition-all duration-300",
      },
      {
        fromBox: { id: "center", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "straight",
        showArrow: true,
        strokeWidth: 3,
        className: "stroke-black hover:stroke-[#0066ff] transition-all duration-300",
      },
      {
        fromBox: { id: "center", position: "bottom" },
        toBox: { id: "box3", position: "top" },
        connectionType: "orthogonal",
        showArrow: true,
        strokeWidth: 3,
        className: "stroke-[#0066ff] hover:stroke-black transition-all duration-300",
      },
    ],
  },
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 border-green-300";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Advanced":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const ConnectorExamples = () => {
  const [selectedExample, setSelectedExample] = useState("basic");
  const [currentCode, setCurrentCode] = useState("");
  const [isCodeEditorVisible, setIsCodeEditorVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(true);

  const currentTemplate = EXAMPLE_TEMPLATES[selectedExample];

  useEffect(() => {
    setCurrentCode(currentTemplate.code);
  }, [selectedExample, currentTemplate.code]);

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
  };

  const handleRunCode = (code) => {
    // 코드 실행 로직 (여기서는 단순히 콘솔에 출력)
    console.log("실행할 코드:", code);
    // 실제로는 코드를 파싱하고 실행하는 로직이 필요합니다.
  };

  return (
    <DiagramProvider>
      <div className="w-full h-screen flex flex-col bg-white overflow-hidden">
        {/* 헤더 - 모던하고 깔끔한 디자인 */}
        <div className="flex items-center justify-between p-4 bg-black border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0066ff] rounded-lg flex items-center justify-center text-white text-xl">
              🔗
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Connector Live Examples</h1>
              <p className="text-gray-300 text-sm">Drag boxes to see real-time connection changes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAnimated(!isAnimated)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isAnimated ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              {isAnimated ? "🎬 Animation ON" : "⏸️ Animation OFF"}
            </button>
            <button
              onClick={() => setIsCodeEditorVisible(!isCodeEditorVisible)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isCodeEditorVisible
                  ? "bg-[#0066ff] text-white hover:bg-[#0052cc]"
                  : "bg-white text-black hover:bg-gray-100 border-2 border-gray-200"
              }`}
            >
              {isCodeEditorVisible ? "📝 Hide Code" : "👁️ Show Code"}
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex overflow-hidden">
          {/* 예제 선택 사이드바 */}
          <div className="w-72 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0">
            <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0066ff] rounded-full"></span>
              Example Selection
            </h3>
            <div className="space-y-3">
              {Object.entries(EXAMPLE_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedExample(key)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-300 ${
                    selectedExample === key
                      ? "bg-[#0066ff] text-white shadow-lg"
                      : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 hover:border-[#0066ff]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        selectedExample === key
                          ? "bg-white text-[#0066ff] border-white"
                          : getDifficultyColor(template.difficulty)
                      }`}
                    >
                      {template.difficulty}
                    </span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{template.title}</div>
                  <div className="text-xs opacity-80">{template.description}</div>
                </button>
              ))}
            </div>

            {/* 조작 가이드 */}
            <div className="mt-6 p-3 bg-black rounded-lg text-white">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">🎮 Controls</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag boxes: Mouse drag</li>
                <li>• Show connection points: Hover on box</li>
                <li>• Edit code: Bottom editor</li>
                <li>• Real-time preview auto-update</li>
              </ul>
            </div>

            {/* 팁 섹션 */}
            <div className="mt-4 p-3 bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-lg text-white">
              <h4 className="font-semibold text-white mb-2">💡 Development Tips</h4>
              <p className="text-sm text-gray-200">
                Connectors automatically recalculate connection points when boxes move.
              </p>
            </div>
          </div>

          {/* 미리보기 영역 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 다이어그램 캔버스 */}
            <div
              className={`relative bg-white ${isCodeEditorVisible ? "flex-1" : "h-full"} overflow-hidden`}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(0,102,255,0.1) 1px, transparent 0)
                `,
                backgroundSize: "20px 20px",
              }}
            >
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-black text-base">{currentTemplate.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(
                        currentTemplate.difficulty
                      )}`}
                    >
                      {currentTemplate.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{currentTemplate.description}</p>
                </div>
              </div>

              {/* 성능 표시기 */}
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-black bg-opacity-90 px-3 py-2 rounded-lg text-white text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Real-time Rendering
                  </div>
                </div>
              </div>

              {/* SVG 캔버스 - 연결선 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {currentTemplate.connections.map((connection, index) => (
                  <Connector
                    key={`${selectedExample}-${index}`}
                    {...connection}
                    animated={isAnimated && connection.animated}
                  />
                ))}
              </svg>

              {/* 박스들 */}
              {currentTemplate.boxes.map((box, index) => (
                <DraggableBox
                  key={`${selectedExample}-${box.id}`}
                  id={box.id}
                  initialX={box.x}
                  initialY={box.y}
                  width={box.width}
                  height={box.height}
                  title={box.title}
                  color={box.color}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* 코드 에디터 */}
            {isCodeEditorVisible && (
              <div className="h-80 border-t border-gray-200 flex-shrink-0">
                <CodeEditor
                  initialCode={currentCode}
                  onChange={handleCodeChange}
                  onRun={handleRunCode}
                  language="jsx"
                  className="h-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* 하단 상태 바 */}
        <div className="bg-black border-t border-gray-800 px-4 py-2 text-sm text-gray-300 flex justify-between items-center flex-shrink-0">
          <span className="flex items-center gap-2">
            Current Example: <strong className="text-white">{currentTemplate.title}</strong>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded">{currentTemplate.difficulty}</span>
          </span>
          <span className="flex items-center gap-4">
            <span>
              📦 Boxes: <strong className="text-white">{currentTemplate.boxes.length}</strong>
            </span>
            <span>
              🔗 Connections: <strong className="text-white">{currentTemplate.connections.length}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#0066ff] rounded-full animate-pulse"></span>
              <span className="text-[#0066ff] font-medium">Live Preview</span>
            </span>
          </span>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default ConnectorExamples;
