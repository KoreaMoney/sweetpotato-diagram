import React from "react";
import { TABS, TAB_DESCRIPTIONS } from "../../shared/constants/tabs";

const Home = ({ onTabChange }) => {
  const installCode = `npm install sweet-diagram
# 또는
yarn add sweet-diagram
# 또는
pnpm add sweet-diagram`;

  const tailwindInstallCode = `# TailwindCSS v4 설치 (필수)
npm install tailwindcss@latest @tailwindcss/postcss`;

  const postcssConfigCode = `// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
};`;

  const viteConfigCode = `// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};`;

  const cssImportCode = `/* CSS 파일에 Tailwind 임포트 */
@import "tailwindcss";

/* 커스텀 테마 설정 (선택사항) */
@theme {
  --color-brand: #b4d455;
  --font-display: "Inter", sans-serif;
}`;

  const basicUsageCode = `import React from "react";
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
  useDiagram,
} from "sweet-diagram";

// Sweet Diagram 컴포넌트들

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

export default MyDiagram;`;

  const hooksUsageCode = `import { DiagramProvider, useDiagram, Box } from "sweet-diagram";

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
}`;

  return (
    <div className="p-8 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center">Sweet-Diagram</h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern and intuitive React diagram editor components with drag & drop and interactive diagram editing
            features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TABS.slice(1).map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="p-6 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <div className="text-4xl mb-3">{tab.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{tab.label}</h3>
              <p className="text-sm text-gray-600">{TAB_DESCRIPTIONS[tab.id]}</p>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">🚀 Quick Start</h2>

          <div className="space-y-8">
            {/* 설치 */}
            <div className="bg-black bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-left">📦 설치</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                <code>{installCode}</code>
              </pre>
            </div>

            {/* TailwindCSS 설치 */}
            <div className="bg-black bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-left">🎨 TailwindCSS v4 설치 (필수)</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                <code>{tailwindInstallCode}</code>
              </pre>
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">PostCSS 설정:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                  <code>{postcssConfigCode}</code>
                </pre>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">또는 Vite 사용시:</p>
                <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                  <code>{viteConfigCode}</code>
                </pre>
              </div>
              <div className="mt-4">
                <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                  <code>{cssImportCode}</code>
                </pre>
              </div>
            </div>

            {/* 기본 사용법 */}
            <div className="bg-black bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-left">✨ 기본 사용법</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                <code>{basicUsageCode}</code>
              </pre>
            </div>

            {/* Hooks 사용법 */}
            <div className="bg-black bg-opacity-20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-left">🪝 Hooks 사용법</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-left overflow-x-auto">
                <code>{hooksUsageCode}</code>
              </pre>
            </div>
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
