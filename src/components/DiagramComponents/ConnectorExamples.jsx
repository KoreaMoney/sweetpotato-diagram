import React, { useState, useEffect, useCallback, useMemo } from "react";
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
      { id: "box1", x: 100, y: 200, width: 400, height: 90, title: "Start Box", color: "primary" },
      { id: "box2", x: 400, y: 200, width: 140, height: 90, title: "End Box", color: "secondary" },
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
      { id: "box1", x: 200, y: 100, width: 140, height: 90, title: "Start Point", color: "dark" },
      { id: "box2", x: 400, y: 350, width: 140, height: 90, title: "End Point", color: "primary" },
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
  strokeWidth={10}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
  orthogonalDirection="horizontal-first"
/>`,
    boxes: [
      { id: "box1", x: 100, y: 150, width: 140, height: 90, title: "Start", color: "primary" },
      { id: "box2", x: 400, y: 320, width: 140, height: 90, title: "End", color: "light" },
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
      { id: "center", x: 300, y: 250, width: 300, height: 90, title: "Center", color: "dark" },
      { id: "box1", x: 260, y: 100, width: 120, height: 70, title: "Top", color: "primary" },
      { id: "box2", x: 500, y: 220, width: 120, height: 70, title: "Right", color: "light" },
      { id: "box3", x: 260, y: 420, width: 120, height: 70, title: "Bottom", color: "primary" },
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

// JSX 코드에서 Connector props를 추출하는 함수
const parseConnectorCode = (code) => {
  try {
    const connections = [];

    // 단일 태그 Connector들을 찾기
    const singleTagRegex = /<Connector([^>]*?)\/>/g;

    let match;
    while ((match = singleTagRegex.exec(code)) !== null) {
      const propsString = match[1];
      const props = parseProps(propsString);
      if (props.fromBox && props.toBox) {
        connections.push(props);
      }
    }

    return connections;
  } catch (error) {
    console.error("코드 파싱 에러:", error);
    return [];
  }
};

// props 문자열을 객체로 파싱하는 함수
const parseProps = (propsString) => {
  const props = {};

  // 각 prop을 추출하는 정규식들
  const patterns = {
    fromBox: /fromBox=\{([^}]*)\}/,
    toBox: /toBox=\{([^}]*)\}/,
    connectionType: /connectionType="([^"]*?)"/,
    showArrow: /showArrow=\{([^}]*)\}/,
    strokeWidth: /strokeWidth=\{([^}]*)\}/,
    className: /className="([^"]*?)"/,
    animated: /animated=\{([^}]*)\}/,
    orthogonalDirection: /orthogonalDirection="([^"]*?)"/,
  };

  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = propsString.match(pattern);
    if (match) {
      let value = match[1];

      if (key === "fromBox" || key === "toBox") {
        // 객체 형태로 파싱
        try {
          // {{ id: "box1", position: "right" }} -> { id: "box1", position: "right" }
          value = value.replace(/^\s*{?\s*/, "").replace(/\s*}?\s*$/, "");
          const objMatch = value.match(/id:\s*"([^"]*)".*?position:\s*"([^"]*)"/);
          if (objMatch) {
            props[key] = { id: objMatch[1], position: objMatch[2] };
          }
        } catch {
          console.warn(`${key} 파싱 실패:`, value);
        }
      } else if (key === "showArrow" || key === "animated") {
        // boolean 값
        props[key] = value === "true";
      } else if (key === "strokeWidth") {
        // 숫자 값
        props[key] = parseInt(value) || 3;
      } else {
        // 문자열 값
        props[key] = value;
      }
    }
  });

  return props;
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
  const [customConnections, setCustomConnections] = useState(null);
  const [parseError, setParseError] = useState("");

  // 현재 템플릿을 메모화하여 불필요한 재렌더링 방지
  const currentTemplate = useMemo(() => {
    const template = EXAMPLE_TEMPLATES[selectedExample];
    if (!template) {
      console.warn(`Template "${selectedExample}" not found, falling back to "basic"`);
      return EXAMPLE_TEMPLATES.basic;
    }
    return template;
  }, [selectedExample]);

  // 실제 사용할 연결 정보 (커스텀이 있으면 커스텀, 없으면 템플릿 기본값)
  const activeConnections = useMemo(() => {
    return customConnections || currentTemplate.connections;
  }, [customConnections, currentTemplate.connections]);

  // 예제 선택 핸들러 - useCallback으로 최적화
  const handleExampleSelect = useCallback((exampleKey) => {
    setSelectedExample(exampleKey);
    setCustomConnections(null); // 예제 변경 시 커스텀 연결 초기화
    setParseError("");
  }, []);

  // 코드 변경 핸들러
  const handleCodeChange = useCallback((newCode) => {
    setCurrentCode(newCode);
    setParseError(""); // 코드 변경 시 에러 메시지 초기화
  }, []);

  // 코드 실행 핸들러 - 실제 JSX 파싱 및 적용
  const handleRunCode = useCallback((code) => {
    try {
      const parsedConnections = parseConnectorCode(code);

      if (parsedConnections.length === 0) {
        setParseError("유효한 Connector 컴포넌트를 찾을 수 없습니다.");
        return;
      }

      setCustomConnections(parsedConnections);
      setParseError("");

    } catch (error) {
      setParseError(`코드 파싱 에러: ${error.message}`);
    }
  }, []);

  // 코드 초기화 핸들러
  const handleResetCode = useCallback(() => {
    setCustomConnections(null);
    setCurrentCode(currentTemplate.code);
    setParseError("");
  }, [currentTemplate.code]);

  // 애니메이션 토글 핸들러
  const handleAnimationToggle = useCallback(() => {
    setIsAnimated((prev) => !prev);
  }, []);

  // 코드 에디터 표시 토글 핸들러
  const handleCodeEditorToggle = useCallback(() => {
    setIsCodeEditorVisible((prev) => !prev);
  }, []);

  // selectedExample이 변경될 때마다 currentCode 업데이트
  useEffect(() => {
    if (currentTemplate?.code) {
      setCurrentCode(currentTemplate.code);
    }
  }, [currentTemplate]);

  return (
    <DiagramProvider>
      <div className="w-full h-screen flex flex-col bg-white">
        {/* 헤더 - 고정 */}
        <div className="flex items-center justify-between p-4 bg-black border-b border-gray-200 flex-shrink-0 z-50">
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
              onClick={handleResetCode}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-orange-600 text-white hover:bg-orange-700"
            >
              🔄 Reset Code
            </button>
            <button
              onClick={handleAnimationToggle}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isAnimated ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              {isAnimated ? "🎬 Animation ON" : "⏸️ Animation OFF"}
            </button>
            <button
              onClick={handleCodeEditorToggle}
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

        {/* 메인 컨텐츠 - 스크롤 가능 영역 */}
        <div className="flex-1 flex min-h-0">
          {/* 예제 선택 사이드바 - 독립 스크롤 */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex flex-col">
            <div className="p-4 flex-shrink-0">
              <h3 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0066ff] rounded-full"></span>
                Example Selection
              </h3>

              {/* 현재 선택된 예제 표시 */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  현재 선택: <strong>{selectedExample}</strong>
                </p>
                {customConnections && <p className="text-sm text-green-600 mt-1">✅ 커스텀 코드 적용됨</p>}
              </div>

              {/* 에러 메시지 표시 */}
              {parseError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">❌ {parseError}</p>
                </div>
              )}
            </div>

            {/* 스크롤 가능한 예제 목록 */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-3 mb-6">
                {Object.entries(EXAMPLE_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleExampleSelect(key)}
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
                      {selectedExample === key && (
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">✓ Active</span>
                      )}
                    </div>
                    <div className="font-semibold text-sm mb-1">{template.title}</div>
                    <div className="text-xs opacity-80 break-words">{template.description}</div>
                  </button>
                ))}
              </div>

              {/* 조작 가이드 */}
              <div className="p-3 bg-black rounded-lg text-white mb-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">🎮 Controls</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Drag boxes: Mouse drag</li>
                  <li>• Edit & Run code: Bottom editor</li>
                  <li>• Reset: 🔄 Reset Code button</li>
                  <li>• Real-time preview updates</li>
                </ul>
              </div>

              {/* 팁 섹션 */}
              <div className="p-3 bg-gradient-to-br from-[#0066ff] to-[#0052cc] rounded-lg text-white">
                <h4 className="font-semibold text-white mb-2">💡 Tips</h4>
                <div className="text-sm text-gray-200 space-y-1">
                  <p>• Edit JSX code in bottom editor</p>
                  <p>• Click RUN to see live updates</p>
                  <p>• Use Reset to restore original</p>
                </div>
              </div>
            </div>
          </div>

          {/* 미리보기 영역 - 독립 스크롤 */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* 다이어그램 캔버스 */}
            <div
              className={`relative bg-white ${isCodeEditorVisible ? "flex-1" : "flex-1"} min-h-0 overflow-auto`}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(0,102,255,0.1) 1px, transparent 0)
                `,
                backgroundSize: "20px 20px",
              }}
            >
              {/* 스크롤 가능한 캔버스 컨테이너 */}
              <div className="relative min-w-[1000px] min-h-[700px] w-full h-full" style={{ position: "relative" }}>
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
                      {customConnections && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 border-green-300">
                          CUSTOM
                        </span>
                      )}
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

                {/* 박스들 먼저 렌더링 */}
                {currentTemplate.boxes?.map((box, index) => {
                  return (
                    <DraggableBox
                      key={`box-${selectedExample}-${box.id}-${index}`}
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
                  );
                })}

                {/* SVG 캔버스 - 연결선 (박스들 이후에 렌더링) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {activeConnections?.map((connection, index) => (
                    <Connector
                      key={`connector-${selectedExample}-${index}-${customConnections ? "custom" : "template"}`}
                      {...connection}
                      animated={isAnimated && connection.animated}
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* 코드 에디터 - 고정 높이 */}
            {isCodeEditorVisible && (
              <div className="h-80 border-t border-gray-200 flex-shrink-0 overflow-hidden">
                <CodeEditor
                  key={`editor-${selectedExample}`}
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

        {/* 하단 상태 바 - 고정 */}
        <div className="bg-black border-t border-gray-800 px-4 py-2 text-sm text-gray-300 flex justify-between items-center flex-shrink-0 z-50">
          <span className="flex items-center gap-2">
            Current Example: <strong className="text-white">{currentTemplate.title}</strong>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded">{currentTemplate.difficulty}</span>
            {customConnections && (
              <span className="text-xs px-2 py-1 bg-green-800 rounded text-green-200">CUSTOM CODE</span>
            )}
          </span>
          <span className="flex items-center gap-4">
            <span>
              📦 Boxes: <strong className="text-white">{currentTemplate.boxes?.length || 0}</strong>
            </span>
            <span>
              🔗 Connections: <strong className="text-white">{activeConnections?.length || 0}</strong>
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
