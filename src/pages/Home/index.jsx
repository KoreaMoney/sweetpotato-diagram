import React from "react";
import { TABS, TAB_DESCRIPTIONS } from "../../shared/constants/tabs";

// 재사용 가능한 컴포넌트들
const CodeSection = ({ title, code, description, additionalSections = [] }) => (
  <div className="bg-black bg-opacity-20 rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4 text-left">{title}</h3>
    <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
      <code>{code}</code>
    </pre>
    {description && <p className="text-sm text-gray-300 mt-2">{description}</p>}
    {additionalSections.map((section, index) => (
      <div key={index} className="mt-4">
        {section.description && <p className="text-sm text-gray-300 mb-2">{section.description}</p>}
        <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
          <code>{section.code}</code>
        </pre>
      </div>
    ))}
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

const TabCard = ({ tab, onTabChange }) => (
  <button
    onClick={() => onTabChange(tab.id)}
    className="group p-6 bg-white rounded-lg shadow-lg border border-gray-200 
               transition-all duration-300 ease-in-out transform
               hover:scale-105 hover:shadow-2xl hover:-translate-y-2
               hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
               hover:border-blue-300 hover:shadow-blue-200/50
               active:scale-95"
  >
    <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
      {tab.icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-blue-600">
      {tab.label}
    </h3>
    <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
      {TAB_DESCRIPTIONS[tab.id]}
    </p>
  </button>
);

// 새로운 기능 강조 카드
const NewFeatureCard = ({ icon, title, description, isNew = true }) => (
  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-6 text-center border-2 border-purple-300 relative">
    {isNew && (
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</div>
    )}
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// 코드 데이터 상수
const CODE_SECTIONS = {
  install: {
    title: "📦 설치",
    code: `npm install sweet-diagram
# 또는
yarn add sweet-diagram
# 또는
pnpm add sweet-diagram`,
  },
  tailwind: {
    title: "🎨 TailwindCSS v4 설치 (필수)",
    code: `# TailwindCSS v4 설치 (필수)
npm install tailwindcss@latest @tailwindcss/postcss`,
    additionalSections: [
      {
        description: "PostCSS 설정:",
        code: `// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
};`,
      },
      {
        description: "또는 Vite 사용시:",
        code: `// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};`,
      },
      {
        description: null,
        code: `/* CSS 파일에 Tailwind 임포트 */
@import "tailwindcss";

/* 커스텀 테마 설정 (선택사항) */
@theme {
  --color-brand: #b4d455;
  --font-display: "Inter", sans-serif;
}`,
      },
    ],
  },
  basicUsage: {
    title: "✨ 기본 사용법",
    code: `import React from "react";
import {
  DiagramProvider,
  Box,
  Connector,
  DraggableBox,
  Triangle,
  Valve,
  Arrow,
  Line,
  ImageBox,
  Sankey,
  useDiagram,
} from "sweet-diagram";

function MyDiagram() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider width={800} height={600}>
        <Box
          id="box1"
          x={100}
          y={100}
          width={120}
          height={80}
          text="시작점"
          className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
          onClick={(event, data) => console.log("Box clicked:", data)}
        />

        <Box
          id="box2"
          x={300}
          y={200}
          width={120}
          height={80}
          text="끝점"
          className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
        />

        <Connector
          fromBox={{ id: "box1", position: "right" }}
          toBox={{ id: "box2", position: "left" }}
          connectionType="straight"
          arrowDirection="forward"
          strokeWidth={3}
          className="text-black"
          animated={true}
        />

        <DraggableBox
          id="draggable1"
          initialX={500}
          initialY={100}
          width={100}
          height={60}
          title="드래그 가능"
          color="purple"
          onDrag={(position) => console.log("New position:", position)}
        />

        <Triangle 
          x={200} 
          y={300} 
          size={30} 
          color="#ff6b6b" 
          onClick={() => console.log("Triangle clicked")} 
        />

        <Valve 
          x={400} 
          y={150} 
          size={25} 
          isOpen={true} 
          onClick={() => console.log("Valve clicked")} 
        />
      </DiagramProvider>
    </div>
  );
}

export default MyDiagram;`,
  },
  newFeatures: {
    title: "🆕 새로운 기능 - Sankey 다이어그램",
    code: `import React from "react";
import { Sankey } from "sweet-diagram";

function SankeyExample() {
  const sankeyData = {
    nodes: [
      { id: "A", name: "소스 A", layer: 0 },
      { id: "B", name: "소스 B", layer: 0 },
      { id: "C", name: "처리 C", layer: 1 },
      { id: "D", name: "결과 D", layer: 2 },
    ],
    links: [
      { source: "A", target: "C", value: 20 },
      { source: "B", target: "C", value: 15 },
      { source: "C", target: "D", value: 35 },
    ],
  };

  return (
    <Sankey
      data={sankeyData}
      width={600}
      height={300}
      animated={true}
      showTooltip={true}
      className="border border-gray-300 rounded-lg"
    />
  );
}`,
  },
  stackFeatures: {
    title: "📚 Stack 기능 - 박스 쌓기",
    code: `import React from "react";
import { DiagramProvider, Box } from "sweet-diagram";

function StackExample() {
  return (
    <DiagramProvider width={400} height={300}>
      {/* 같은 위치에 박스들을 배치하면 자동으로 스택됩니다 */}
      <Box
        id="stack1"
        x={100}
        y={100}
        width={100}
        height={50}
        text="박스 1"
        className="bg-blue-500 text-white"
        priority={3}
      />
      <Box
        id="stack2"
        x={100}
        y={100}
        width={100}
        height={50}
        text="박스 2"
        className="bg-green-500 text-white"
        priority={2}
      />
      <Box
        id="stack3"
        x={100}
        y={100}
        width={100}
        height={50}
        text="박스 3"
        className="bg-red-500 text-white"
        priority={1}
      />
    </DiagramProvider>
  );
}`,
  },
  hooksUsage: {
    title: "🪝 Hooks 사용법",
    code: `import { DiagramProvider, useDiagram, Box } from "sweet-diagram";

function DiagramControls() {
  const { boxes, addBox, removeBox, updateBox } = useDiagram();

  const handleAddBox = () => {
    const newId = \`box-\${Date.now()}\`;
    addBox(newId, {
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 100,
      height: 60,
    });
  };

  return (
    <div>
      <button onClick={handleAddBox}>박스 추가</button>
      <p>현재 박스 개수: {boxes.size}</p>
    </div>
  );
}

function App() {
  return (
    <DiagramProvider>
      <DiagramControls />
    </DiagramProvider>
  );
}`,
  },
};

// AutoConnect 특징 데이터
const AUTOCONNECT_FEATURES = [
  {
    icon: "🎯",
    title: "직관적인 UI",
    description: "Shift + 클릭만으로 연결 모드 시작",
  },
  {
    icon: "🎨",
    title: "풍부한 커스터마이징",
    description: "8가지 색상, 5가지 연결 타입, 4가지 애니메이션",
  },
  {
    icon: "⚡",
    title: "고성능",
    description: "스마트 경로 계산과 GPU 가속 애니메이션",
  },
];

// 새로운 기능 데이터
const NEW_FEATURES = [
  {
    icon: "🌊",
    title: "Sankey 다이어그램",
    description: "흐름량을 시각적으로 표현하는 인터랙티브 다이어그램",
    isNew: true,
  },
  {
    icon: "📚",
    title: "Stack 기능",
    description: "박스들을 자동으로 쌓아 올리는 스택 레이아웃",
    isNew: true,
  },
  {
    icon: "🔧",
    title: "향상된 최적화",
    description: "더 빠른 렌더링과 작은 번들 크기",
    isNew: false,
  },
];

const Home = ({ onTabChange }) => {
  return (
    <div className="p-8 text-center">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            Sweet-Diagram
            <span className="ml-3 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">v0.4.6</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern and intuitive React diagram editor components with drag & drop, Sankey diagrams, and Stack features.
          </p>
        </div>

        {/* 새로운 기능 강조 섹션 */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🆕 v0.4.6 새로운 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEW_FEATURES.map((feature, index) => (
              <NewFeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* 탭 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TABS.slice(1).map((tab) => (
            <TabCard key={tab.id} tab={tab} onTabChange={onTabChange} />
          ))}
        </div>

        {/* AutoConnect 기능 강조 섹션 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">⚡ AutoConnect 기능</h2>
            <p className="text-xl opacity-90">Shift + 클릭으로 박스에서 임의 지점으로 연결하는 혁신적인 기능</p>
          </div>

          <div className="grid text-black grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {AUTOCONNECT_FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onTabChange("test")}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold 
                         hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              AutoConnect 체험하기 →
            </button>
          </div>
        </div>

        {/* Quick Start 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">🚀 Quick Start</h2>

          <div className="space-y-8">
            {Object.values(CODE_SECTIONS).map((section, index) => (
              <CodeSection key={index} {...section} />
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-400">
            <p className="text-sm text-yellow-100">
              💡 <strong>주의:</strong> TailwindCSS v4는 설정 파일이 필요하지 않습니다! 자동으로 파일을 감지합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
