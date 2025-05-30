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
    title: "🔗 기본 박스 연결",
    description: "드래그 가능한 박스들을 자동으로 연결하는 예제",
    difficulty: "초급",
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
      { id: "box1", x: 50, y: 100, width: 140, height: 90, title: "시작 박스", color: "primary" },
      { id: "box2", x: 320, y: 100, width: 140, height: 90, title: "끝 박스", color: "secondary" },
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
    title: "🌊 곡선 연결",
    description: "부드러운 베지어 곡선으로 연결하는 예제",
    difficulty: "중급",
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
      { id: "box1", x: 100, y: 50, width: 140, height: 90, title: "시작점", color: "dark" },
      { id: "box2", x: 320, y: 280, width: 140, height: 90, title: "도착점", color: "primary" },
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
    title: "📐 직각 연결",
    description: "ㄱ자 모양의 직각 연결 예제",
    difficulty: "중급",
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
      { id: "box1", x: 50, y: 80, width: 140, height: 90, title: "출발", color: "primary" },
      { id: "box2", x: 320, y: 220, width: 140, height: 90, title: "도착", color: "light" },
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
    title: "🔀 다중 연결",
    description: "여러 박스들을 동시에 연결하는 예제",
    difficulty: "고급",
    icon: "🔀",
    code: `{/* 중앙 박스에서 다른 박스들로 */}
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
      { id: "center", x: 250, y: 150, width: 120, height: 90, title: "중앙", color: "dark" },
      { id: "box1", x: 200, y: 50, width: 120, height: 70, title: "상단", color: "primary" },
      { id: "box2", x: 420, y: 120, width: 120, height: 70, title: "우측", color: "light" },
      { id: "box3", x: 200, y: 290, width: 120, height: 70, title: "하단", color: "primary" },
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
    case "초급":
      return "bg-green-100 text-green-800 border-green-300";
    case "중급":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "고급":
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
      <div className="w-full h-screen flex flex-col bg-white">
        {/* 헤더 - 모던하고 깔끔한 디자인 */}
        <div className="flex items-center justify-between p-6 bg-black border-b border-gray-200 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0066ff] rounded-xl flex items-center justify-center text-white text-2xl">
              🔗
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">Connector 실시간 예제</h1>
              <p className="text-gray-300 mt-1">박스를 드래그하여 실시간으로 연결선 변화를 확인하세요</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAnimated(!isAnimated)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isAnimated ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              {isAnimated ? "🎬 애니메이션 ON" : "⏸️ 애니메이션 OFF"}
            </button>
            <button
              onClick={() => setIsCodeEditorVisible(!isCodeEditorVisible)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isCodeEditorVisible
                  ? "bg-[#0066ff] text-white hover:bg-[#0052cc] shadow-lg transform hover:scale-105"
                  : "bg-white text-black hover:bg-gray-100 border-2 border-gray-200"
              }`}
            >
              {isCodeEditorVisible ? "📝 코드 숨기기" : "👁️ 코드 보기"}
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex">
          {/* 예제 선택 사이드바 - 세련된 디자인 */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto animate-fade-in-up">
            <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0066ff] rounded-full animate-pulse-blue"></span>
              예제 선택
            </h3>
            <div className="space-y-3">
              {Object.entries(EXAMPLE_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedExample(key)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all duration-300 hover:shadow-md group ${
                    selectedExample === key
                      ? "bg-[#0066ff] text-white shadow-lg transform scale-[1.02] animate-glow"
                      : "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 hover:border-[#0066ff]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{template.icon}</span>
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
                  <div className="font-semibold text-base mb-1">{template.title}</div>
                  <div className="text-xs opacity-80">{template.description}</div>
                </button>
              ))}
            </div>

            {/* 조작 가이드 - 세련된 디자인 */}
            <div className="mt-8 p-4 bg-black rounded-xl text-white glass-effect">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">🎮 조작 방법</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full animate-pulse"></span>
                  박스 드래그: 마우스로 끌기
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full animate-pulse"></span>
                  연결점 표시: 박스에 호버
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full animate-pulse"></span>
                  코드 수정: 우측 에디터
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#0066ff] rounded-full animate-pulse"></span>
                  실시간 미리보기 자동 업데이트
                </li>
              </ul>
            </div>

            {/* 팁 섹션 */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-xl text-white">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">💡 개발 팁</h4>
              <p className="text-sm text-gray-200">
                커넥터는 박스가 이동할 때 자동으로 연결점을 재계산합니다. 다양한 connectionType을 실험해보세요!
              </p>
            </div>
          </div>

          {/* 미리보기 영역 */}
          <div className={`flex-1 flex ${isCodeEditorVisible ? "flex-col" : ""}`}>
            {/* 다이어그램 캔버스 - 깔끔한 흰색 배경 */}
            <div
              className={`relative bg-white border-r border-gray-200 ${
                isCodeEditorVisible ? "h-1/2" : "h-full"
              } overflow-hidden`}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(0,102,255,0.1) 1px, transparent 0)
                `,
                backgroundSize: "20px 20px",
              }}
            >
              <div className="absolute top-6 left-6 z-20 animate-fade-in-up">
                <div className="bg-white bg-opacity-95 px-4 py-3 rounded-xl shadow-lg border border-gray-200 glass-effect">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{currentTemplate.icon}</span>
                    <h3 className="font-bold text-black text-lg">{currentTemplate.title}</h3>
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
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-black bg-opacity-90 px-3 py-2 rounded-lg text-white text-sm font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    실시간 렌더링
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
                  className={isAnimated ? "box-hover-effect" : ""}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* 코드 에디터 */}
            {isCodeEditorVisible && (
              <div className="h-1/2 border-t border-gray-200">
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

        {/* 하단 상태 바 - 세련된 디자인 */}
        <div className="bg-black border-t border-gray-800 px-6 py-3 text-sm text-gray-300 flex justify-between items-center">
          <span className="flex items-center gap-2">
            현재 예제: <strong className="text-white">{currentTemplate.title}</strong>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded">{currentTemplate.difficulty}</span>
          </span>
          <span className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              📦 박스 수: <strong className="text-white">{currentTemplate.boxes.length}</strong>
            </span>
            <span className="flex items-center gap-1">
              🔗 연결 수: <strong className="text-white">{currentTemplate.connections.length}</strong>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0066ff] rounded-full animate-pulse"></span>
              <span className="text-[#0066ff] font-medium">실시간 미리보기 활성</span>
            </span>
          </span>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default ConnectorExamples;
