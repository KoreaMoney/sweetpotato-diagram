import React, { useState } from "react";

/**
 * 🚀 Sweet Diagram NPM 패키지 사용 예시
 *
 * 실제 배포 후 사용법:
 *
 * 1. 설치:
 *    npm install sweet-diagram
 *
 * 2. 사용:
 *    import { Sankey, Box, Connector, DiagramProvider } from "sweet-diagram";
 *    import "sweet-diagram/dist/sweet-diagram.css";
 */
const SweetDiagramUsageExample = () => {
  const [activeTab, setActiveTab] = useState("install");

  const installCode = `# NPM으로 설치
npm install sweet-diagram

# 또는 Yarn으로 설치  
yarn add sweet-diagram

# 또는 PNPM으로 설치
pnpm add sweet-diagram`;

  const basicUsageCode = `import React from "react";
import { 
  DiagramProvider,
  Box, 
  Connector,
  Sankey,
  Triangle,
  Valve 
} from "sweet-diagram";
import "sweet-diagram/dist/sweet-diagram.css";

function MyApp() {
  return (
    <div className="w-full h-full">
      <DiagramProvider width={800} height={600}>
        <Box
          id="box1"
          x={100}
          y={100}
          width={120}
          height={80}
          text="시작점"
          className="bg-blue-500 text-white rounded-lg"
        />
        
        <Box
          id="box2"
          x={300}
          y={200}
          width={120}
          height={80}
          text="끝점"
          className="bg-green-500 text-white rounded-lg"
        />
        
        <Connector
          fromBox={{ id: "box1", position: "right" }}
          toBox={{ id: "box2", position: "left" }}
          connectionType="straight"
          showArrow={true}
        />
      </DiagramProvider>
    </div>
  );
}`;

  const sankeyUsageCode = `import React from "react";
import { Sankey } from "sweet-diagram";

function SankeyDiagram() {
  const data = {
    nodes: [
      { id: "A", name: "소스 A", layer: 0 },
      { id: "B", name: "소스 B", layer: 0 },
      { id: "C", name: "중간 처리", layer: 1 },
      { id: "D", name: "최종 결과", layer: 2 }
    ],
    links: [
      { id: "link1", source: "A", target: "C", value: 30 },
      { id: "link2", source: "B", target: "C", value: 20 },
      { id: "link3", source: "C", target: "D", value: 50 }
    ]
  };

  return (
    <div className="w-full h-96">
      <Sankey 
        data={data}
        width={600}
        height={400}
        className="mx-auto border rounded-lg"
      />
    </div>
  );
}`;

  const packageJsonCode = `{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "sweet-diagram": "^0.4.6"
  },
  "peerDependencies": {
    "tailwindcss": "^3.0.0"
  }
}`;

  const tabs = [
    { id: "install", label: "설치", icon: "📦" },
    { id: "basic", label: "기본 사용", icon: "🚀" },
    { id: "sankey", label: "Sankey 예시", icon: "🌊" },
    { id: "package", label: "Package.json", icon: "⚙️" },
  ];

  const getCodeContent = () => {
    switch (activeTab) {
      case "install":
        return installCode;
      case "basic":
        return basicUsageCode;
      case "sankey":
        return sankeyUsageCode;
      case "package":
        return packageJsonCode;
      default:
        return installCode;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // 간단한 피드백 (실제로는 toast 등을 사용)
    alert("클립보드에 복사되었습니다!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 헤더 */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🍠 Sweet Diagram</h1>
        <p className="text-lg text-gray-600">NPM 패키지로 배포된 후 실제 사용법</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">v0.4.6</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">MIT License</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">React 18+</span>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 코드 디스플레이 */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          {/* 터미널 헤더 */}
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-2">{tabs.find((t) => t.id === activeTab)?.label}</span>
            </div>
            <button
              onClick={() => copyToClipboard(getCodeContent())}
              className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              📋 복사
            </button>
          </div>

          {/* 코드 내용 */}
          <pre className="p-4 text-sm overflow-x-auto text-gray-300">
            <code>{getCodeContent()}</code>
          </pre>
        </div>
      </div>

      {/* 중요한 정보 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <span className="mr-2">💡</span>
          중요한 사용 팁
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>CSS 파일 import</strong>: 반드시 CSS 파일을 import하세요
          </li>
          <li>
            • <strong>TailwindCSS</strong>: 스타일링을 위해 TailwindCSS 권장
          </li>
          <li>
            • <strong>DiagramProvider</strong>: 모든 컴포넌트는 DiagramProvider로 감싸야 합니다
          </li>
          <li>
            • <strong>React 18+</strong>: React 18 이상 버전이 필요합니다
          </li>
        </ul>
      </div>

      {/* 링크 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">📚</div>
          <h4 className="font-semibold text-gray-900 mb-1">문서</h4>
          <p className="text-sm text-gray-600">상세한 API 문서</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🌐</div>
          <h4 className="font-semibold text-gray-900 mb-1">데모</h4>
          <p className="text-sm text-gray-600">라이브 예시 확인</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🐛</div>
          <h4 className="font-semibold text-gray-900 mb-1">GitHub</h4>
          <p className="text-sm text-gray-600">이슈 & 기여</p>
        </div>
      </div>
    </div>
  );
};

export default SweetDiagramUsageExample;
