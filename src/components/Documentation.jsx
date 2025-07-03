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
import ExamplesSection from "./documentation/ExamplesSection";
import StackedBoxExample from "./DiagramComponents/examples/StackedBoxExample";

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
    { id: "mousetracker", title: "Mouse Tracker", icon: "🎯", color: "from-violet-500 to-purple-500" },
    { id: "stack", title: "Stack Priority", icon: "🎯", color: "from-orange-500 to-red-500" },
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

  const renderStack = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="text-3xl mr-3">🎯</span>
            Stack Priority & Z-Index Management
          </h2>
          <p className="text-gray-600 mb-6">
            Stack Priority는 Box와 ImageBox 컴포넌트에서 겹쳐진 요소들의 표시 순서를 제어하는 기능입니다. 클릭 기반 자동
            우선순위와 props 기반 고정 우선순위를 모두 지원합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-2">🔧 Box & ImageBox Props</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  <code className="bg-white px-1 rounded">priority</code>: 숫자가 높을수록 위에 표시
                </li>
                <li>
                  <code className="bg-white px-1 rounded">maintainPriority</code>: 클릭해도 우선순위 유지
                </li>
                <li>
                  <code className="bg-white px-1 rounded">zIndex</code>: 기본 z-index 설정
                </li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-2">✨ 기능</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>클릭 시 자동으로 맨 앞으로 이동</li>
                <li>Props 기반 우선순위 고정</li>
                <li>실시간 z-index 관리</li>
                <li>Box와 ImageBox 모두 지원</li>
              </ul>
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">📝 사용 예시</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Box 컴포넌트:</h4>
                <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
                  {`<Box 
  x={100} 
  y={100}
  priority={10}
  maintainPriority={true}
>
  고정 우선순위 박스
</Box>`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-purple-600 mb-2">ImageBox 컴포넌트:</h4>
                <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
                  {`<ImageBox 
  x={200} 
  y={150}
  src="/image.png"
  priority={5}
  maintainPriority={false}
/>`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-gray-800 mb-4">💡 다양한 사용 시나리오</h3>

            {/* 기본 사용법 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">1️⃣</span>
                <h4 className="font-semibold text-green-600">기본 Z-Index 설정</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">기초</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">basic-zindex.jsx</span>
                  </div>
                  <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// 기본 z-index로 초기 순서 설정</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{50}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{50}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{1}"}</span>
                    <span className="text-blue-400">&gt;</span>배경 박스<span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{80}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{80}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{5}"}</span>
                    <span className="text-blue-400">&gt;</span>중간 박스<span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{110}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{110}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{10}"}</span>
                    <span className="text-blue-400">&gt;</span>맨 앞 박스<span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* Priority 사용법 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">2️⃣</span>
                <h4 className="font-semibold text-blue-600">Priority로 고정 순서 설정</h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">고급</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">priority-system.jsx</span>
                  </div>
                  <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// priority가 높을수록 위에 표시 (zIndex보다 우선)</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{100}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{100}"}</span> <span className="text-green-400">priority</span>=
                    <span className="text-yellow-300">{"{20}"}</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}항상 가장 위에 (priority 20){"\n"}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{130}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{130}"}</span> <span className="text-green-400">priority</span>=
                    <span className="text-yellow-300">{"{15}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{100}"}</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}priority가 zIndex보다 우선 (priority 15){"\n"}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{160}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{160}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{50}"}</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}일반 zIndex 박스{"\n"}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* 고정 우선순위 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">3️⃣</span>
                <h4 className="font-semibold text-purple-600">클릭해도 순서 변경 안됨</h4>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">고정</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">maintain-priority.jsx</span>
                  </div>
                  <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// maintainPriority로 클릭 시 순서 변경 방지</span>
                    {"\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> {"\n"}
                    {"  "}
                    <span className="text-green-400">x</span>=<span className="text-yellow-300">{"{200}"}</span> {"\n"}
                    {"  "}
                    <span className="text-green-400">y</span>=<span className="text-yellow-300">{"{200}"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">priority</span>=<span className="text-yellow-300">{"{100}"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">maintainPriority</span>=
                    <span className="text-yellow-300">{"{true}"}</span>
                    {"\n"}
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}고정 최상위 박스 (클릭해도 변화없음){"\n"}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n\n"}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">ImageBox</span> {"\n"}
                    {"  "}
                    <span className="text-green-400">x</span>=<span className="text-yellow-300">{"{250}"}</span> {"\n"}
                    {"  "}
                    <span className="text-green-400">y</span>=<span className="text-yellow-300">{"{250}"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">src</span>=
                    <span className="text-yellow-300">"/important-icon.png"</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">priority</span>=<span className="text-yellow-300">{"{90}"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">maintainPriority</span>=
                    <span className="text-yellow-300">{"{true}"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-green-400">onClick</span>=
                    <span className="text-yellow-300">{"{() => console.log('고정 아이콘 클릭')}"}</span>
                    {"\n"}
                    <span className="text-blue-400">/&gt;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* 혼합 사용법 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">4️⃣</span>
                <h4 className="font-semibold text-orange-600">혼합 사용 - 레이어 시스템</h4>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">실무</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">layer-system.jsx</span>
                  </div>
                  <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// 실제 다이어그램에서의 레이어 시스템</span>
                    {"\n"}
                    <span className="text-purple-400">const</span> <span className="text-white">DiagramWithLayers</span>{" "}
                    = <span className="text-yellow-300">() =&gt;</span> <span className="text-yellow-300">{"{"}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-purple-400">return</span> <span className="text-yellow-300">{"("}</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">DiagramProvider</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    <span className="text-gray-500">{"{"}</span>
                    <span className="text-gray-500">/* 배경 레이어 - 클릭 가능하지만 낮은 우선순위 */</span>
                    <span className="text-gray-500">{"}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{0}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{0}"}</span> <span className="text-green-400">width</span>=
                    <span className="text-yellow-300">{"{400}"}</span> <span className="text-green-400">height</span>=
                    <span className="text-yellow-300">{"{300}"}</span> <span className="text-green-400">zIndex</span>=
                    <span className="text-yellow-300">{"{1}"}</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"        "}배경 영역{"\n"}
                    {"      "}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    {"\n"}
                    {"      "}
                    <span className="text-gray-500">{"{"}</span>
                    <span className="text-gray-500">/* 콘텐츠 레이어 - 일반 클릭 동작 */</span>
                    <span className="text-gray-500">{"}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{50}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{50}"}</span> <span className="text-green-400">priority</span>=
                    <span className="text-yellow-300">{"{10}"}</span>
                    <span className="text-blue-400">&gt;</span>콘텐츠 1<span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> <span className="text-green-400">x</span>=
                    <span className="text-yellow-300">{"{100}"}</span> <span className="text-green-400">y</span>=
                    <span className="text-yellow-300">{"{100}"}</span> <span className="text-green-400">priority</span>=
                    <span className="text-yellow-300">{"{10}"}</span>
                    <span className="text-blue-400">&gt;</span>콘텐츠 2<span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    {"\n"}
                    {"      "}
                    <span className="text-gray-500">{"{"}</span>
                    <span className="text-gray-500">/* UI 레이어 - 항상 최상위 고정 */</span>
                    <span className="text-gray-500">{"}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">ImageBox</span> {"\n"}
                    {"        "}
                    <span className="text-green-400">x</span>=<span className="text-yellow-300">{"{350}"}</span> {"\n"}
                    {"        "}
                    <span className="text-green-400">y</span>=<span className="text-yellow-300">{"{20}"}</span>
                    {"\n"}
                    {"        "}
                    <span className="text-green-400">src</span>=
                    <span className="text-yellow-300">"/close-button.png"</span>
                    {"\n"}
                    {"        "}
                    <span className="text-green-400">priority</span>=<span className="text-yellow-300">{"{1000}"}</span>
                    {"\n"}
                    {"        "}
                    <span className="text-green-400">maintainPriority</span>=
                    <span className="text-yellow-300">{"{true}"}</span>
                    {"\n"}
                    {"        "}
                    <span className="text-green-400">onClick</span>=
                    <span className="text-yellow-300">{"{() => handleClose()}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-blue-400">/&gt;</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">DiagramProvider</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}
                    <span className="text-yellow-300">{")"}</span>
                    <span className="text-yellow-300">;</span>
                    {"\n"}
                    <span className="text-yellow-300">{"}"}</span>
                    <span className="text-yellow-300">;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* 동적 우선순위 */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">5️⃣</span>
                <h4 className="font-semibold text-red-600">동적 우선순위 변경</h4>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">React</span>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">dynamic-priority.jsx</span>
                  </div>
                  <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-gray-300">
                    <span className="text-gray-500">// state를 사용한 동적 우선순위 관리</span>
                    {"\n"}
                    <span className="text-purple-400">const</span> [<span className="text-white">isHighlighted</span>,{" "}
                    <span className="text-white">setIsHighlighted</span>] ={" "}
                    <span className="text-red-400">useState</span>(<span className="text-yellow-300">false</span>)
                    <span className="text-yellow-300">;</span>
                    {"\n"}
                    <span className="text-purple-400">const</span> [<span className="text-white">isLocked</span>,{" "}
                    <span className="text-white">setIsLocked</span>] = <span className="text-red-400">useState</span>(
                    <span className="text-yellow-300">false</span>)<span className="text-yellow-300">;</span>
                    {"\n\n"}
                    <span className="text-purple-400">return</span> <span className="text-yellow-300">{"("}</span>
                    {"\n"}
                    {"  "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">&gt;</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">Box</span> {"\n"}
                    {"      "}
                    <span className="text-green-400">x</span>=<span className="text-yellow-300">{"{100}"}</span> {"\n"}
                    {"      "}
                    <span className="text-green-400">y</span>=<span className="text-yellow-300">{"{100}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-green-400">priority</span>=
                    <span className="text-yellow-300">{"{isHighlighted ? 100 : 10}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-green-400">maintainPriority</span>=
                    <span className="text-yellow-300">{"{isLocked}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-green-400">onClick</span>=
                    <span className="text-yellow-300">{"{(info) => {"}</span>
                    {"\n"}
                    {"        "}
                    <span className="text-red-400">console</span>.<span className="text-white">log</span>(
                    <span className="text-yellow-300">'현재 우선순위:'</span>, <span className="text-white">info</span>.
                    <span className="text-white">priority</span>)<span className="text-yellow-300">;</span>
                    {"\n"}
                    {"        "}
                    <span className="text-red-400">console</span>.<span className="text-white">log</span>(
                    <span className="text-yellow-300">'현재 z-index:'</span>, <span className="text-white">info</span>.
                    <span className="text-white">currentZIndex</span>)<span className="text-yellow-300">;</span>
                    {"\n"}
                    {"        "}
                    <span className="text-purple-400">if</span> (<span className="text-yellow-300">!</span>
                    <span className="text-white">isLocked</span>) <span className="text-yellow-300">{"{"}</span>
                    {"\n"}
                    {"          "}
                    <span className="text-white">setIsHighlighted</span>(<span className="text-yellow-300">!</span>
                    <span className="text-white">isHighlighted</span>)<span className="text-yellow-300">;</span>
                    {"\n"}
                    {"        "}
                    <span className="text-yellow-300">{"}"}</span>
                    {"\n"}
                    {"      "}
                    <span className="text-yellow-300">
                      {"}"}
                      {"}"}
                      {"}"}
                    </span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    <span className="text-yellow-300">{"{isHighlighted ? '⭐ 강조된 박스' : '일반 박스'}"}</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">Box</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"    "}
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;</span>
                    <span className="text-red-400">button</span> <span className="text-green-400">onClick</span>=
                    <span className="text-yellow-300">{"{() => setIsLocked(!isLocked)}"}</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"      "}
                    <span className="text-yellow-300">{"{isLocked ? '🔒 우선순위 잠금' : '🔓 우선순위 해제'}"}</span>
                    {"\n"}
                    {"    "}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">button</span>
                    <span className="text-blue-400">&gt;</span>
                    {"\n"}
                    {"  "}
                    <span className="text-blue-400">&lt;/</span>
                    <span className="text-red-400">&gt;</span>
                    {"\n"}
                    <span className="text-yellow-300">{")"}</span>
                    <span className="text-yellow-300">;</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* 우선순위 규칙 */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📋</span>
                <h4 className="font-bold text-blue-800 text-lg">우선순위 적용 규칙</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800">최우선:</span>
                    <span className="text-gray-600 ml-2">DiagramContext에서 관리하는 동적 z-index (클릭 시 생성)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800">두 번째:</span>
                    <span className="text-gray-600 ml-2">
                      <code className="bg-gray-100 px-1 rounded">priority</code> prop (숫자가 높을수록 위에)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800">세 번째:</span>
                    <span className="text-gray-600 ml-2">
                      <code className="bg-gray-100 px-1 rounded">zIndex</code> prop (CSS z-index)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800">최하위:</span>
                    <span className="text-gray-600 ml-2">컴포넌트 생성 순서</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-sm text-yellow-800">
                    <code className="bg-yellow-100 px-1 rounded">maintainPriority={"{true}"}</code>인 경우 클릭해도 동적
                    z-index가 적용되지 않습니다.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <StackedBoxExample />
      </div>
    );
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
      case "stack":
        return renderStack();
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
