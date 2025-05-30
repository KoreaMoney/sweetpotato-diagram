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

// 기본 예제 템플릿들
const EXAMPLE_TEMPLATES = {
  basic: {
    title: "🔗 기본 박스 연결",
    description: "드래그 가능한 박스들을 자동으로 연결하는 예제",
    code: `<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  showArrow={true}
  strokeWidth={2}
  className="text-blue-500"
/>`,
    boxes: [
      { id: "box1", x: 50, y: 100, width: 120, height: 80, title: "시작 박스", color: "blue" },
      { id: "box2", x: 300, y: 100, width: 120, height: 80, title: "끝 박스", color: "green" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "straight",
        showArrow: true,
        strokeWidth: 2,
        className: "text-blue-500",
      },
    ],
  },

  curved: {
    title: "🌊 곡선 연결",
    description: "부드러운 베지어 곡선으로 연결하는 예제",
    code: `<Connector
  fromBox={{ id: "box1", position: "bottom" }}
  toBox={{ id: "box2", position: "top" }}
  connectionType="curved"
  showArrow={true}
  strokeWidth={3}
  className="text-purple-500"
  animated={true}
/>`,
    boxes: [
      { id: "box1", x: 100, y: 50, width: 120, height: 80, title: "시작점", color: "purple" },
      { id: "box2", x: 300, y: 250, width: 120, height: 80, title: "도착점", color: "indigo" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "bottom" },
        toBox: { id: "box2", position: "top" },
        connectionType: "curved",
        showArrow: true,
        strokeWidth: 3,
        className: "text-purple-500",
        animated: true,
      },
    ],
  },

  orthogonal: {
    title: "📐 직각 연결",
    description: "ㄱ자 모양의 직각 연결 예제",
    code: `<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="orthogonal"
  showArrow={true}
  strokeWidth={2}
  className="text-red-500"
  orthogonalDirection="horizontal-first"
/>`,
    boxes: [
      { id: "box1", x: 50, y: 80, width: 120, height: 80, title: "출발", color: "red" },
      { id: "box2", x: 300, y: 200, width: 120, height: 80, title: "도착", color: "yellow" },
    ],
    connections: [
      {
        fromBox: { id: "box1", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "orthogonal",
        showArrow: true,
        strokeWidth: 2,
        className: "text-red-500",
        orthogonalDirection: "horizontal-first",
      },
    ],
  },

  multiConnection: {
    title: "🔀 다중 연결",
    description: "여러 박스들을 동시에 연결하는 예제",
    code: `{/* 중앙 박스에서 다른 박스들로 */}
<Connector
  fromBox={{ id: "center", position: "top" }}
  toBox={{ id: "box1", position: "bottom" }}
  connectionType="curved"
  showArrow={true}
  className="text-blue-500"
/>
<Connector
  fromBox={{ id: "center", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  showArrow={true}
  className="text-green-500"
/>
<Connector
  fromBox={{ id: "center", position: "bottom" }}
  toBox={{ id: "box3", position: "top" }}
  connectionType="orthogonal"
  showArrow={true}
  className="text-red-500"
/>`,
    boxes: [
      { id: "center", x: 250, y: 150, width: 100, height: 80, title: "중앙", color: "indigo" },
      { id: "box1", x: 200, y: 50, width: 100, height: 60, title: "상단", color: "blue" },
      { id: "box2", x: 400, y: 120, width: 100, height: 60, title: "우측", color: "green" },
      { id: "box3", x: 200, y: 280, width: 100, height: 60, title: "하단", color: "red" },
    ],
    connections: [
      {
        fromBox: { id: "center", position: "top" },
        toBox: { id: "box1", position: "bottom" },
        connectionType: "curved",
        showArrow: true,
        className: "text-blue-500",
      },
      {
        fromBox: { id: "center", position: "right" },
        toBox: { id: "box2", position: "left" },
        connectionType: "straight",
        showArrow: true,
        className: "text-green-500",
      },
      {
        fromBox: { id: "center", position: "bottom" },
        toBox: { id: "box3", position: "top" },
        connectionType: "orthogonal",
        showArrow: true,
        className: "text-red-500",
      },
    ],
  },
};

const ConnectorExamples = () => {
  const [selectedExample, setSelectedExample] = useState("basic");
  const [currentCode, setCurrentCode] = useState("");
  const [isCodeEditorVisible, setIsCodeEditorVisible] = useState(true);

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
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🔗 Connector 실시간 예제</h1>
            <p className="text-sm text-gray-600 mt-1">박스를 드래그하여 실시간으로 연결선 변화를 확인하세요</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCodeEditorVisible(!isCodeEditorVisible)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                isCodeEditorVisible ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {isCodeEditorVisible ? "코드 숨기기" : "코드 보기"}
            </button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex">
          {/* 예제 선택 사이드바 */}
          <div className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-700 mb-3">예제 선택</h3>
            <div className="space-y-2">
              {Object.entries(EXAMPLE_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedExample(key)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                    selectedExample === key
                      ? "bg-blue-100 border-2 border-blue-300 text-blue-800"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{template.title}</div>
                  <div className="text-xs opacity-70 mt-1">{template.description}</div>
                </button>
              ))}
            </div>

            {/* 조작 가이드 */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">🎮 조작 방법</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• 박스 드래그: 마우스로 끌기</li>
                <li>• 연결점 표시: 박스에 호버</li>
                <li>• 코드 수정: 우측 에디터</li>
                <li>• 실시간 미리보기 자동 업데이트</li>
              </ul>
            </div>
          </div>

          {/* 미리보기 영역 */}
          <div className={`flex-1 flex ${isCodeEditorVisible ? "flex-col" : ""}`}>
            {/* 다이어그램 캔버스 */}
            <div
              className={`relative bg-gray-100 border-r ${isCodeEditorVisible ? "h-1/2" : "h-full"} overflow-hidden`}
            >
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-700">{currentTemplate.title}</h3>
                  <p className="text-xs text-gray-600">{currentTemplate.description}</p>
                </div>
              </div>

              {/* SVG 캔버스 - 연결선 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {currentTemplate.connections.map((connection, index) => (
                  <Connector key={`${selectedExample}-${index}`} {...connection} />
                ))}
              </svg>

              {/* 박스들 */}
              {currentTemplate.boxes.map((box) => (
                <DraggableBox
                  key={`${selectedExample}-${box.id}`}
                  id={box.id}
                  initialX={box.x}
                  initialY={box.y}
                  width={box.width}
                  height={box.height}
                  title={box.title}
                  color={box.color}
                />
              ))}
            </div>

            {/* 코드 에디터 */}
            {isCodeEditorVisible && (
              <div className="h-1/2 border-t">
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
        <div className="bg-gray-50 border-t px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
          <span>
            현재 예제: <strong>{currentTemplate.title}</strong>
          </span>
          <span className="flex items-center gap-4">
            <span>박스 수: {currentTemplate.boxes.length}</span>
            <span>연결 수: {currentTemplate.connections.length}</span>
            <span className="text-green-600">● 실시간 미리보기 활성</span>
          </span>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default ConnectorExamples;
