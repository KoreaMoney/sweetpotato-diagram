import React, { useState, useEffect } from "react";
import { DiagramProvider } from "../../components/DiagramComponents";
import Box from "../../components/DiagramComponents/Box";
import DraggableBox from "../../components/DiagramComponents/DraggableBox";
import Triangle from "../../components/DiagramComponents/Triangle";
import Valve from "../../components/DiagramComponents/Valve";
import ImageBox from "../../components/DiagramComponents/ImageBox";
import Connector from "../../components/DiagramComponents/Connector";
import Arrow from "../../components/DiagramComponents/Arrow";
import Line from "../../components/DiagramComponents/Line";
import AutoConnectManager from "../../components/DiagramComponents/AutoConnectManager";
import AutoConnectSettings from "../../components/DiagramComponents/AutoConnectSettings";
import MouseTracker from "../../components/MouseTracker";
import { parseJSXCode } from "../../components/DiagramComponents/utils/jsxParser";

const ComponentTest = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("basic");
  const [customCode, setCustomCode] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [gridEnabled, setGridEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  // 파싱된 컴포넌트들과 실행 모드 상태
  const [parsedElements, setParsedElements] = useState([]);
  const [isCodeExecuted, setIsCodeExecuted] = useState(false);
  const [parseError, setParseError] = useState("");

  // 코드 템플릿들
  const codeTemplates = {
    basic: `<DiagramProvider width={800} height={600}>
  <Box
    id="box1"
    x={100}
    y={100}
    width={120}
    height={80}
    text="시작점 🚀"
    className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg shadow-lg"
    onClick={(event, data) => console.log("클릭됨:", data)}
  />
  
  <Box
    id="box2"
    x={300}
    y={200}
    width={120}
    height={80}
    text="끝점 🎯"
    className="bg-green-500 text-white border-green-600 border-2 rounded-lg shadow-lg"
  />
  
  <Connector
    fromBox={{ id: "box1", position: "right" }}
    toBox={{ id: "box2", position: "left" }}
    connectionType="curved"
    arrowDirection="forward"
    arrowShape="triangle"
    arrowColor="purple"
    strokeWidth={3}
    className="text-purple-500"
    animated={true}
    animationType="electric"
    animationSpeed={2}
  />
</DiagramProvider>`,

    advanced: `<DiagramProvider width={800} height={600}>
  <DraggableBox
    id="drag1"
    initialX={50}
    initialY={50}
    width={140}
    height={70}
    text="드래그해보세요! 🎮"
    className="bg-purple-500 text-white border-purple-700 border-2 rounded-lg"
    snapToGrid={true}
    gridSize={20}
    onDrag={(position) => console.log("새 위치:", position)}
  />
  
  <Box
    id="vertical-text"
    x={220}
    y={50}
    width={60}
    height={120}
    text="세로텍스트박스"
    textDirection="vertical"
    verticalDirection="lr"
    className="bg-emerald-500 text-white border-emerald-700 border-2 rounded-lg"
  />
  
  <Triangle 
    x={320} 
    y={300} 
    size={40} 
    direction="up"
    fillColor="#ff6b6b"
    borderColor="#dc2626"
    onClick={() => alert("삼각형 클릭!")} 
  />
  
  <Valve 
    x={400} 
    y={150} 
    size={30} 
    type="ball"
    isOpen={true}
    showStatus={true}
    status="normal"
    onClick={() => console.log("밸브 토글")} 
  />
  
  <ImageBox
    id="img1"
    x={500}
    y={300}
    width={100}
    height={80}
    text="이미지 박스"
    textPosition="bottom"
    icon="⚙️"
    iconType="emoji"
    draggable={true}
    sparkle={true}
    sparkleColor="#FFD700"
    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
  />
  
  <Arrow
    startX={300}
    startY={100}
    endX={380}
    endY={140}
    color="#10b981"
    strokeWidth={4}
    arrowSize={12}
    curved={true}
    animate={true}
  />
  
  <Line
    startX={100}
    startY={250}
    endX={200}
    endY={280}
    strokeColor="#f59e0b"
    strokeWidth={3}
    dashArray="5,5"
    opacity={0.8}
  />
  
  <MouseTracker
    position="top-right"
    theme="dark"
    showSavedPoints={true}
    maxSavedPoints={5}
  />
</DiagramProvider>`,

    creative: `<DiagramProvider width={800} height={600}>
  {/* 창의적인 다이어그램 만들기 */}
  <Box
    id="sun"
    x={400}
    y={100}
    width={80}
    height={80}
    text="☀️"
    className="bg-yellow-400 text-4xl border-yellow-500 border-4 rounded-full shadow-2xl"
  />
  
  <Box
    id="earth"
    x={200}
    y={300}
    width={60}
    height={60}
    text="🌍"
    className="bg-blue-400 text-3xl border-blue-500 border-3 rounded-full shadow-xl"
  />
  
  <Box
    id="moon"
    x={150}
    y={400}
    width={30}
    height={30}
    text="🌙"
    className="bg-gray-300 text-xl border-gray-400 border-2 rounded-full shadow-lg"
  />
  
  <Connector
    fromBox={{ id: "sun", position: "bottom" }}
    toBox={{ id: "earth", position: "top" }}
    connectionType="curved"
    arrowDirection="none"
    strokeWidth={2}
    className="text-orange-400"
    animated={true}
  />
  
  <Connector
    fromBox={{ id: "earth", position: "bottom" }}
    toBox={{ id: "moon", position: "top" }}
    connectionType="curved"
    arrowDirection="none"
    strokeWidth={1}
    className="text-gray-400"
    animated={true}
  />
  
  <Triangle x={600} y={200} size={25} color="#ef4444" />
  <Triangle x={650} y={180} size={30} color="#f97316" />
  <Triangle x={700} y={220} size={20} color="#eab308" />
</DiagramProvider>`,

    documentation: `<DiagramProvider width={800} height={600}>
  {/* 📚 Documentation에 있는 모든 기능 예시 */}
  
  {/* 기본 Box */}
  <Box
    id="standard-box"
    x={50}
    y={50}
    width={100}
    height={40}
    text="표준 박스"
    className="bg-blue-500 text-white border-blue-700 border-2 rounded-lg"
  />
  
  {/* 세로 텍스트 Box (LR 방향) */}
  <Box
    id="vertical-lr"
    x={200}
    y={30}
    width={60}
    height={100}
    text="세로텍스트LR"
    textDirection="vertical"
    verticalDirection="lr"
    className="bg-rose-500 text-white border-rose-700 border-2 rounded-lg"
  />
  
  {/* 세로 텍스트 Box (RL 방향) */}
  <Box
    id="vertical-rl"
    x={300}
    y={30}
    width={60}
    height={100}
    text="세로텍스트RL"
    textDirection="vertical"
    verticalDirection="rl"
    className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg"
  />
  
  {/* DraggableBox with all features */}
  <DraggableBox
    id="draggable-advanced"
    initialX={450}
    initialY={50}
    width={120}
    height={60}
    text="드래그 박스"
    className="bg-purple-500 text-white border-purple-700 border-2 rounded-lg"
    snapToGrid={true}
    gridSize={20}
    constrainToBounds={true}
    bounds={{ x: 400, y: 30, width: 350, height: 200 }}
  />
  
  {/* ImageBox with advanced features */}
  <ImageBox
    id="image-advanced"
    x={50}
    y={200}
    width={100}
    height={80}
    text="이미지박스"
    textPosition="top"
    icon="🚀"
    iconType="emoji"
    iconSize={24}
    imageSize={40}
    imageObjectFit="contain"
    draggable={true}
    sparkle={true}
    sparkleColor="#FFD700"
    sparkleIntensity="medium"
    className="bg-cyan-500 text-white border-cyan-700 border-2 rounded-lg"
  />
  
  {/* Various Valve types */}
  <Valve
    id="gate-valve"
    x={200}
    y={220}
    size={30}
    type="gate"
    isOpen={true}
    showStatus={true}
    status="normal"
    showIcon={true}
    iconPosition="top"
  />
  
  <Valve
    id="ball-valve"
    x={280}
    y={220}
    size={30}
    type="ball"
    isOpen={false}
    showStatus={true}
    status="warning"
    color="#f59e0b"
  />
  
  {/* Triangle with all directions */}
  <Triangle
    x={400}
    y={200}
    size={25}
    direction="up"
    fillColor="#ef4444"
    borderColor="#dc2626"
    borderWidth={2}
  />
  
  <Triangle
    x={450}
    y={200}
    size={25}
    direction="right"
    fillColor="#10b981"
    borderColor="#059669"
    borderWidth={2}
  />
  
  {/* Advanced Connectors */}
  <Connector
    fromBox={{ id: "standard-box", position: "right" }}
    toBox={{ id: "vertical-lr", position: "left" }}
    connectionType="orthogonal"
    arrowDirection="forward"
    arrowShape="diamond"
    arrowColor="blue"
    arrowSize={10}
    strokeWidth={2}
    animated={true}
    animationType="electric"
    animationSpeed={3}
    className="text-blue-500"
  />
  
  <Connector
    fromBox={{ id: "vertical-rl", position: "right" }}
    toBox={{ id: "draggable-advanced", position: "left" }}
    connectionType="curved"
    arrowDirection="both"
    arrowShape="circle"
    arrowColor="green"
    strokeWidth={3}
    animated={true}
    animationType="water"
    animationSpeed={2}
    className="text-green-500"
  />
  
  {/* Various Arrow types */}
  <Arrow
    startX={50}
    startY={320}
    endX={150}
    endY={370}
    color="#8b5cf6"
    strokeWidth={3}
    arrowSize={12}
    style="solid"
    curved={false}
    animate={true}
  />
  
  <Arrow
    startX={200}
    startY={320}
    endX={300}
    endY={370}
    color="#f59e0b"
    strokeWidth={4}
    arrowSize={15}
    style="dashed"
    curved={true}
    animate={true}
  />
  
  {/* Various Line types */}
  <Line
    startX={350}
    startY={320}
    endX={450}
    endY={350}
    strokeColor="#6b7280"
    strokeWidth={2}
    dashArray="10,5"
    opacity={0.8}
  />
  
  <Line
    startX={500}
    startY={320}
    endX={600}
    endY={370}
    strokeColor="#ef4444"
    strokeWidth={3}
    opacity={1}
  />
  
  {/* MouseTracker */}
  <MouseTracker
    position="bottom-left"
    theme="minimal"
    showDetails={true}
    showSavedPoints={true}
    maxSavedPoints={10}
    showToggle={true}
    initialVisible={true}
  />
</DiagramProvider>`,

    playground: `<DiagramProvider width={800} height={600}>
  {/* 여기에 자유롭게 코드를 작성해보세요! */}
  <Box
    id="myBox"
    x={50}
    y={50}
    width={100}
    height={60}
    text="시작해보세요!"
    className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-2 border-violet-600 rounded-lg"
  />
</DiagramProvider>`,

    autoConnect: `<DiagramProvider width={800} height={600}>
  <AutoConnectManager
    showSettingsButton={true}
    settingsProps={{
      size: "compact",
      position: "right",
      theme: "modern",
      enableTabs: false,
      compactMode: true,
      showHeader: true,
      showFooter: false
    }}
  >
    {/* Shift + 클릭으로 자동 연결 모드 시작 */}
    <Box
      id="source1"
      x={100}
      y={100}
      width={120}
      height={80}
      text="시작점 A 🎯"
      className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg font-medium shadow-lg"
      enableAutoConnect={true}
    />
    
    <Box
      id="source2"
      x={100}
      y={250}
      width={120}
      height={80}
      text="시작점 B 🚀"
      className="bg-green-500 text-white border-green-600 border-2 rounded-lg font-medium shadow-lg"
      enableAutoConnect={true}
    />
    
    <Box
      id="target1"
      x={400}
      y={150}
      width={120}
      height={80}
      text="목표점 C 📍"
      className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg font-medium shadow-lg"
      enableAutoConnect={true}
    />
    
    <Box
      id="process"
      x={600}
      y={200}
      width={140}
      height={80}
      text="처리 박스 ⚙️"
      className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg font-medium shadow-lg"
      enableAutoConnect={true}
    />
    
    {/* 예제 포인트들 */}
    <div className="absolute bg-gray-300 rounded-full w-3 h-3" style={{left: '300px', top: '50px'}}></div>
    <div className="absolute bg-gray-300 rounded-full w-3 h-3" style={{left: '500px', top: '350px'}}></div>
    <div className="absolute bg-gray-300 rounded-full w-3 h-3" style={{left: '350px', top: '400px'}}></div>
    
    {    /* 안내 텍스트 */}
    <div className="absolute top-4 left-4 bg-purple-100 border-purple-300 border rounded-lg p-3 max-w-sm">
      <div className="text-purple-800 font-medium text-sm">🔗 자동 연결 기능</div>
      <div className="text-purple-700 text-xs mt-1">
        Shift + 박스 클릭 → 원하는 지점 클릭으로 연결
      </div>
    </div>
    

  </AutoConnectManager>
</DiagramProvider>`,
  };

  // 초기 코드 설정 및 상태 초기화
  useEffect(() => {
    setCustomCode(codeTemplates[selectedTemplate]);
    // 템플릿 변경 시 실행 상태 초기화
    setIsCodeExecuted(false);
    setParsedElements([]);
    setParseError("");
  }, [selectedTemplate]);

  // 코드 실행 (JSX 파싱을 통한 실제 렌더링)
  const executeCode = () => {
    setIsPlaying(true);
    setParseError("");

    try {
      // JSX 코드 파싱
      const elements = parseJSXCode(customCode);

      if (elements.length === 0) {
        setParseError("유효한 Box, Connector 또는 다른 컴포넌트를 찾을 수 없습니다.");
        setIsCodeExecuted(false);
      } else {
        setParsedElements(elements);
        setIsCodeExecuted(true);
      }
    } catch (error) {
      setParseError(`코드 파싱 에러: ${error.message}`);
      setIsCodeExecuted(false);
    }

    // 코드 실행 후 자동으로 미리보기로 전환
    setShowCode(false);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  // 코드를 React 컴포넌트로 변환하는 함수
  const renderCodeAsComponent = () => {
    try {
      // 파싱 에러가 있다면 에러 메시지 표시
      if (parseError) {
        return (
          <div className="flex items-center justify-center h-full bg-red-50 text-red-600 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="font-semibold">코드 파싱 오류</div>
              <div className="text-sm mt-2">{parseError}</div>
            </div>
          </div>
        );
      }

      return (
        <DiagramProvider width={canvasSize.width} height={canvasSize.height}>
          {/* 코드가 실행되었다면 파싱된 요소들을 렌더링, 아니면 기본 템플릿 */}
          {isCodeExecuted
            ? // 파싱된 요소들을 동적으로 렌더링
              parsedElements.map((element, index) => {
                const { type, props } = element;
                const key = props.id || `${type}-${index}`;

                // 컴포넌트 타입에 따라 동적 렌더링
                switch (type) {
                  case "Box":
                    return <Box key={key} {...props} />;
                  case "DraggableBox":
                    return <DraggableBox key={key} {...props} />;
                  case "ImageBox":
                    return <ImageBox key={key} {...props} />;
                  case "Connector":
                    return <Connector key={key} {...props} />;
                  case "Arrow":
                    return <Arrow key={key} {...props} />;
                  case "Line":
                    return <Line key={key} {...props} />;
                  case "Triangle":
                    return <Triangle key={key} {...props} />;
                  case "Valve":
                    return <Valve key={key} {...props} />;
                  case "MouseTracker":
                    return <MouseTracker key={key} {...props} />;
                  case "AutoConnectManager":
                    // children이 있는 경우 렌더링
                    if (props.children && props.children.length > 0) {
                      return (
                        <AutoConnectManager key={key} {...props}>
                          {props.children.map((child, childIndex) => {
                            const childKey = child.props.id || `${child.type}-${childIndex}`;
                            switch (child.type) {
                              case "Box":
                                return <Box key={childKey} {...child.props} />;
                              case "DraggableBox":
                                return <DraggableBox key={childKey} {...child.props} />;
                              case "ImageBox":
                                return <ImageBox key={childKey} {...child.props} />;
                              default:
                                return null;
                            }
                          })}
                        </AutoConnectManager>
                      );
                    }
                    return <AutoConnectManager key={key} {...props} />;
                  case "AutoConnectSettings":
                    return <AutoConnectSettings key={key} {...props} />;
                  default:
                    console.warn(`알 수 없는 컴포넌트 타입: ${type}`);
                    return null;
                }
              })
            : // 기본 템플릿 렌더링 (코드 실행 전)
              renderDefaultTemplate()}
        </DiagramProvider>
      );
    } catch (error) {
      return (
        <div className="flex items-center justify-center h-full bg-red-50 text-red-600 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl mb-2">❌</div>
            <div className="font-semibold">렌더링 오류</div>
            <div className="text-sm mt-2">{error.message}</div>
          </div>
        </div>
      );
    }
  };

  // 기본 템플릿 렌더링 함수
  const renderDefaultTemplate = () => {
    switch (selectedTemplate) {
      case "basic":
        return (
          <>
            <Box
              id="box1"
              x={100}
              y={100}
              width={120}
              height={80}
              text="시작점 🚀"
              className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg shadow-lg"
            />
            <Box
              id="box2"
              x={300}
              y={200}
              width={120}
              height={80}
              text="끝점 🎯"
              className="bg-green-500 text-white border-green-600 border-2 rounded-lg shadow-lg"
            />
          </>
        );
      case "advanced":
        return (
          <>
            <DraggableBox
              id="drag1"
              initialX={50}
              initialY={50}
              width={140}
              height={70}
              title="드래그해보세요! 🎮"
              color="purple"
            />
            <Triangle x={200} y={300} size={40} color="#ff6b6b" />
            <Valve x={400} y={150} size={30} isOpen={true} />
            <ImageBox
              id="img1"
              x={500}
              y={300}
              width={100}
              height={80}
              text="이미지 박스"
              icon="⚙️"
              iconType="emoji"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            />
            <Arrow x={300} y={100} direction="right" size={50} color="#10b981" strokeWidth={4} />
          </>
        );
      case "creative":
        return (
          <>
            <Box
              id="sun"
              x={400}
              y={100}
              width={80}
              height={80}
              text="☀️"
              className="bg-yellow-400 text-4xl border-yellow-500 border-4 rounded-full shadow-2xl"
            />
            <Box
              id="earth"
              x={200}
              y={300}
              width={60}
              height={60}
              text="🌍"
              className="bg-blue-400 text-3xl border-blue-500 border-3 rounded-full shadow-xl"
            />
            <Box
              id="moon"
              x={150}
              y={400}
              width={30}
              height={30}
              text="🌙"
              className="bg-gray-300 text-xl border-gray-400 border-2 rounded-full shadow-lg"
            />
            <Triangle x={600} y={200} size={25} color="#ef4444" />
            <Triangle x={650} y={180} size={30} color="#f97316" />
            <Triangle x={700} y={220} size={20} color="#eab308" />
          </>
        );
      case "documentation":
        return (
          <>
            {/* 기본 Box */}
            <Box
              id="standard-box"
              x={50}
              y={50}
              width={100}
              height={40}
              text="표준 박스"
              className="bg-blue-500 text-white border-blue-700 border-2 rounded-lg"
            />

            {/* DraggableBox */}
            <DraggableBox
              id="draggable-advanced"
              initialX={200}
              initialY={50}
              width={120}
              height={60}
              text="드래그 박스"
              className="bg-purple-500 text-white border-purple-700 border-2 rounded-lg"
            />

            {/* ImageBox */}
            <ImageBox
              id="image-advanced"
              x={50}
              y={150}
              width={100}
              height={80}
              text="이미지박스"
              icon="🚀"
              iconType="emoji"
              className="bg-cyan-500 text-white border-cyan-700 border-2 rounded-lg"
            />

            {/* Triangle */}
            <Triangle x={200} y={150} size={25} direction="up" fillColor="#ef4444" borderColor="#dc2626" />

            {/* Valve */}
            <Valve id="gate-valve" x={300} y={150} size={30} type="gate" isOpen={true} />

            {/* Arrow */}
            <Arrow startX={50} startY={280} endX={150} endY={320} color="#8b5cf6" strokeWidth={3} />

            {/* Line */}
            <Line startX={200} startY={280} endX={300} endY={320} strokeColor="#f59e0b" strokeWidth={3} />
          </>
        );
      case "autoConnect":
        return (
          <AutoConnectManager
            showSettingsButton={true}
            settingsProps={{
              position: "right",
              size: "compact",
              theme: "modern",
              enableTabs: false,
              compactMode: true,
              enableAdvanced: false,
              borderRadius: "lg",
              shadow: "lg",
              widthClass: "w-64",
              maxHeightClass: "max-h-80",
            }}
          >
            <Box
              id="source1"
              x={100}
              y={100}
              width={120}
              height={80}
              text="시작점 A 🎯"
              className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg font-medium shadow-lg"
              enableAutoConnect={true}
            />

            <Box
              id="source2"
              x={100}
              y={250}
              width={120}
              height={80}
              text="시작점 B 🚀"
              className="bg-green-500 text-white border-green-600 border-2 rounded-lg font-medium shadow-lg"
              enableAutoConnect={true}
            />

            <Box
              id="target1"
              x={400}
              y={150}
              width={120}
              height={80}
              text="목표점 C 📍"
              className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg font-medium shadow-lg"
              enableAutoConnect={true}
            />

            <div className="absolute bg-gray-300 rounded-full w-3 h-3" style={{ left: "300px", top: "50px" }}></div>
            <div className="absolute bg-gray-300 rounded-full w-3 h-3" style={{ left: "500px", top: "350px" }}></div>
          </AutoConnectManager>
        );
      case "compactSettings":
        return (
          <AutoConnectManager
            showSettingsButton={true}
            settingsProps={{
              size: "compact",
              position: "top-right",
              enableTabs: false,
              compactMode: true,
              theme: "minimal",
              borderRadius: "xl",
              shadow: "lg",
              hiddenSections: ["advanced"],
              widthClass: "w-60",
              maxHeightClass: "max-h-72",
            }}
          >
            <Box
              id="compact1"
              x={80}
              y={80}
              width={100}
              height={60}
              text="박스 A"
              className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
            <Box
              id="compact2"
              x={250}
              y={150}
              width={100}
              height={60}
              text="박스 B"
              className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
            <Box
              id="compact3"
              x={150}
              y={280}
              width={100}
              height={60}
              text="박스 C"
              className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
          </AutoConnectManager>
        );
      case "customSettings":
        return (
          <AutoConnectManager
            showSettingsButton={true}
            settingsProps={{
              size: "large",
              position: "center",
              enableTabs: true,
              enableAdvanced: true,
              theme: "glass",
              borderRadius: "xl",
              shadow: "2xl",
              backdrop: true,
              customSections: [
                {
                  title: "프로젝트 설정",
                  subtitle: "이 프로젝트만의 특별한 옵션들",
                  icon: "🚀",
                  content: React.createElement("div", { className: "space-y-3" }, [
                    React.createElement(
                      "label",
                      {
                        key: "input-wrapper",
                        className: "block",
                      },
                      [
                        React.createElement(
                          "span",
                          {
                            key: "label",
                            className: "text-sm font-medium text-gray-700 mb-2 block",
                          },
                          "프로젝트 이름"
                        ),
                        React.createElement("input", {
                          key: "input",
                          type: "text",
                          placeholder: "새 프로젝트",
                          className:
                            "w-full p-3 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors",
                        }),
                      ]
                    ),
                    React.createElement(
                      "label",
                      {
                        key: "auto-save-wrapper",
                        className:
                          "flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors",
                      },
                      [
                        React.createElement("input", {
                          key: "checkbox1",
                          type: "checkbox",
                          className: "w-5 h-5 text-purple-600 rounded",
                        }),
                        React.createElement("div", { key: "text1", className: "flex-1" }, [
                          React.createElement(
                            "div",
                            {
                              key: "title1",
                              className: "font-medium text-gray-900",
                            },
                            "자동 저장"
                          ),
                          React.createElement(
                            "div",
                            {
                              key: "desc1",
                              className: "text-sm text-gray-500",
                            },
                            "변경사항을 실시간으로 저장합니다"
                          ),
                        ]),
                      ]
                    ),
                    React.createElement(
                      "label",
                      {
                        key: "collab-wrapper",
                        className:
                          "flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors",
                      },
                      [
                        React.createElement("input", {
                          key: "checkbox2",
                          type: "checkbox",
                          className: "w-5 h-5 text-purple-600 rounded",
                        }),
                        React.createElement("div", { key: "text2", className: "flex-1" }, [
                          React.createElement(
                            "div",
                            {
                              key: "title2",
                              className: "font-medium text-gray-900",
                            },
                            "실시간 협업"
                          ),
                          React.createElement(
                            "div",
                            {
                              key: "desc2",
                              className: "text-sm text-gray-500",
                            },
                            "다른 사용자와 함께 편집합니다"
                          ),
                        ]),
                      ]
                    ),
                  ]),
                },
              ],
            }}
          >
            <Box
              id="custom1"
              x={100}
              y={100}
              width={120}
              height={80}
              text="입력 🔥"
              className="bg-indigo-500 text-white border-indigo-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
            <Box
              id="custom2"
              x={300}
              y={200}
              width={120}
              height={80}
              text="처리 ⚡"
              className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
            <Box
              id="custom3"
              x={500}
              y={100}
              width={120}
              height={80}
              text="출력 🎯"
              className="bg-emerald-500 text-white border-emerald-600 border-2 rounded-lg"
              enableAutoConnect={true}
            />
          </AutoConnectManager>
        );
      case "playground":
      default:
        return (
          <Box
            id="myBox"
            x={50}
            y={50}
            width={100}
            height={60}
            text="시작해보세요!"
            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white border-2 border-violet-600 rounded-lg"
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50"
      }`}
    >
      {/* 헤더 */}
      <div
        className={`p-6 border-b ${
          theme === "dark" ? "border-gray-700 bg-gray-800" : "border-white/20 bg-white/30"
        } backdrop-blur-md`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              🎮 Component Playground
            </h1>
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-2`}>
              상상력을 발휘해서 다이어그램을 만들어보세요!
            </p>
          </div>

          {/* 컨트롤 패널 */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-3 rounded-lg transition-all transform hover:scale-110 ${
                theme === "dark"
                  ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-400"
                  : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setGridEnabled(!gridEnabled)}
              className={`p-3 rounded-lg transition-all transform hover:scale-110 ${
                gridEnabled ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {gridEnabled ? "📊" : "📋"}
            </button>

            <button
              onClick={executeCode}
              disabled={isPlaying}
              className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 ${
                isPlaying
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
              }`}
            >
              {isPlaying ? "실행중... ⚡" : "코드 실행 🚀"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* 사이드바 - 템플릿 선택 */}
        <div
          className={`w-80 ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white/70 border-white/20"
          } border-r backdrop-blur-md flex flex-col`}
        >
          {/* 스크롤 가능한 내용 영역 */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🎨</span>
              템플릿 선택
            </h3>

            <div className="space-y-3">
              {Object.entries({
                basic: { name: "기본 예제", icon: "🧩", desc: "Box와 Connector 기본 사용법" },
                advanced: { name: "고급 컴포넌트", icon: "⚡", desc: "새로운 기능들 종합 사용" },
                creative: { name: "창의적 예제", icon: "🌟", desc: "태양계 다이어그램" },
                autoConnect: { name: "자동 연결 기능", icon: "🔗", desc: "Shift + 클릭으로 자동 연결" },
                compactSettings: { name: "컴팩트 설정", icon: "📱", desc: "작은 설정 패널 모드" },
                customSettings: { name: "커스텀 설정", icon: "🛠️", desc: "사용자 정의 섹션" },
                documentation: { name: "문서 기능 모음", icon: "📚", desc: "Documentation의 모든 기능" },
                playground: { name: "자유 놀이터", icon: "🎪", desc: "자유롭게 코드 작성" },
              }).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedTemplate === key
                      ? `${
                          theme === "dark" ? "bg-purple-600" : "bg-gradient-to-r from-purple-500 to-blue-500"
                        } text-white shadow-lg scale-105`
                      : `${
                          theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-white/50 hover:bg-white/80"
                        } hover:shadow-md`
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{template.icon}</span>
                    <div>
                      <div className="font-semibold">{template.name}</div>
                      <div
                        className={`text-sm ${
                          selectedTemplate === key
                            ? "text-white/80"
                            : theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {template.desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 설정 패널 */}
            <div className="mt-8 pb-6">
              <h4 className="font-semibold mb-3 flex items-center">
                <span className="mr-2">⚙️</span>
                캔버스 설정
              </h4>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    폭: {canvasSize.width}px
                  </label>
                  <input
                    type="range"
                    min="400"
                    max="1200"
                    value={canvasSize.width}
                    onChange={(e) => setCanvasSize((prev) => ({ ...prev, width: parseInt(e.target.value) }))}
                    className="w-full accent-purple-500"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    높이: {canvasSize.height}px
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="800"
                    value={canvasSize.height}
                    onChange={(e) => setCanvasSize((prev) => ({ ...prev, height: parseInt(e.target.value) }))}
                    className="w-full accent-purple-500"
                  />
                </div>

                {/* 추가 설정들 */}
                <div>
                  <label
                    className={`flex items-center text-sm font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={gridEnabled}
                      onChange={(e) => setGridEnabled(e.target.checked)}
                      className="mr-2 accent-purple-500"
                    />
                    격자 표시
                  </label>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                  >
                    테마
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className={`w-full p-2 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="light">라이트</option>
                    <option value="dark">다크</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 탭 헤더 */}
          <div
            className={`flex border-b ${
              theme === "dark" ? "border-gray-700 bg-gray-800" : "border-white/20 bg-white/30"
            } backdrop-blur-md`}
          >
            <button
              onClick={() => setShowCode(false)}
              className={`px-6 py-3 font-medium transition-all ${
                !showCode
                  ? `${theme === "dark" ? "bg-purple-600" : "bg-purple-500"} text-white`
                  : `${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                    }`
              }`}
            >
              🎯 미리보기
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-6 py-3 font-medium transition-all ${
                showCode
                  ? `${theme === "dark" ? "bg-purple-600" : "bg-purple-500"} text-white`
                  : `${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                    }`
              }`}
            >
              💻 코드 편집
            </button>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="flex-1 p-6">
            {showCode ? (
              /* 코드 에디터 */
              <div className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="mr-2">💻</span>
                    코드 편집기
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCustomCode(codeTemplates[selectedTemplate])}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === "dark"
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      🔄 초기화
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(customCode)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
                    >
                      📋 복사
                    </button>
                  </div>
                </div>

                <div className="relative h-[calc(100%-60px)]">
                  <textarea
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    onKeyDown={(e) => {
                      // Ctrl+Enter 또는 Cmd+Enter로 코드 실행
                      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                        e.preventDefault();
                        executeCode();
                      }
                    }}
                    className={`w-full h-full p-4 rounded-lg border font-mono text-sm resize-none ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700 text-green-400"
                        : "bg-gray-900 border-gray-300 text-green-400"
                    }`}
                    placeholder="여기에 JSX 코드를 작성하세요... (Ctrl+Enter로 실행)"
                    spellCheck={false}
                  />

                  {/* 실행 버튼 */}
                  <button
                    onClick={executeCode}
                    disabled={isPlaying}
                    className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg font-medium text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                      isPlaying
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    }`}
                  >
                    {isPlaying ? "실행중... ⚡" : "🚀 실행 (Ctrl+Enter)"}
                  </button>
                </div>
              </div>
            ) : (
              /* 미리보기 */
              <div className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="mr-2">🎯</span>
                    실시간 미리보기
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      📐 {canvasSize.width} × {canvasSize.height}px
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm ${
                        parseError
                          ? theme === "dark"
                            ? "bg-red-900 text-red-300"
                            : "bg-red-100 text-red-800"
                          : isCodeExecuted
                          ? theme === "dark"
                            ? "bg-green-900 text-green-300"
                            : "bg-green-100 text-green-800"
                          : theme === "dark"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {parseError ? "❌ 파싱 오류" : isCodeExecuted ? "✅ 코드 실행됨" : "⏳ 코드 실행 대기"}
                    </div>
                  </div>
                </div>

                <div
                  className="flex justify-center items-start overflow-auto"
                  style={{ height: "calc(100vh - 400px)" }}
                >
                  <div
                    className={`rounded-lg border-2 border-dashed relative ${
                      theme === "dark" ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"
                    }`}
                    style={{
                      width: `${canvasSize.width}px`,
                      height: `${canvasSize.height}px`,
                      minWidth: `${canvasSize.width}px`,
                      minHeight: `${canvasSize.height}px`,
                      backgroundImage: gridEnabled
                        ? `
                        linear-gradient(to right, ${theme === "dark" ? "#374151" : "#e5e7eb"} 1px, transparent 1px),
                        linear-gradient(to bottom, ${theme === "dark" ? "#374151" : "#e5e7eb"} 1px, transparent 1px)
                      `
                        : "none",
                      backgroundSize: gridEnabled ? "20px 20px" : "auto",
                    }}
                  >
                    {renderCodeAsComponent()}

                    {/* 캔버스 경계 표시 */}
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {canvasSize.width} × {canvasSize.height}
                    </div>

                    {/* 상태 표시 */}
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 shadow-2xl text-center">
                          <div className="text-4xl mb-2">⚡</div>
                          <div className="font-semibold text-gray-800">코드 실행 중...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentTest;
