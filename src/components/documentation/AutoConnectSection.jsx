import React, { useState } from "react";
import {
  DiagramProvider,
  AutoConnectManager,
  Box,
  AutoConnectExample,
  AutoConnectCompactExample,
  AutoConnectCustomExample,
} from "../DiagramComponents";

/**
 * AutoConnectSection 컴포넌트
 *
 * 자동 연결 기능에 대한 문서화 섹션
 */
const AutoConnectSection = () => {
  const [activeExample, setActiveExample] = useState("basic");

  const examples = {
    basic: {
      title: "기본 자동 연결 (Tailwind)",
      description: "Tailwind CSS 클래스로 크기를 제어하는 기본 자동 연결. Shift + 클릭으로 박스에서 임의 포인트로 연결",
      code: `<DiagramProvider>
  <AutoConnectManager
    settingsProps={{
      size: "normal",
      widthClass: "w-80",
      maxHeightClass: "max-h-40",
      position: "right",
      theme: "modern"
    }}
  >
    <Box
      id="box1"
      x={100}
      y={100}
      text="시작점"
      enableAutoConnect={true}
    />
    <Box
      id="box2"
      x={300}
      y={200}
      text="목표점"
      enableAutoConnect={true}
    />
  </AutoConnectManager>
</DiagramProvider>`,
    },
    compact: {
      title: "컴팩트 설정 (Tailwind)",
      description: "Tailwind CSS 클래스로 크기를 제어하는 컴팩트 설정 패널",
      code: `<AutoConnectManager
  showSettingsButton={true}
  settingsProps={{
    size: "compact",
    widthClass: "w-64",
    maxHeightClass: "max-h-80",
    position: "right",
    enableTabs: false,
    theme: "modern",
    compactMode: true
  }}
>
  <Box id="box1" x={100} y={100} text="박스 A" />
  <Box id="box2" x={250} y={150} text="박스 B" />
</AutoConnectManager>`,
    },
    custom: {
      title: "사용자 정의 (초소형)",
      description: "초소형 크기로 제어된 사용자 정의 설정 섹션",
      code: `<AutoConnectManager
  settingsProps={{
    size: "compact",
    widthClass: "w-56",        // 224px (매우 작음)
    maxHeightClass: "max-h-64", // 256px
    position: "top-right",
    theme: "minimal",
    compactMode: true,
    hiddenSections: ["advanced"],
    customSections: [
      {
        title: "프로젝트",
        content: (
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="이름" 
              className="w-full text-xs"
            />
            <label className="text-xs">
              <input type="checkbox" /> 자동저장
            </label>
          </div>
        )
      }
    ]
  }}
>
  <Box id="box1" x={100} y={100} text="A" />
  <Box id="box2" x={200} y={150} text="B" />
</AutoConnectManager>`,
    },
    advanced: {
      title: "고급 기능",
      description: "자동 정리, 스마트 스냅, 연결점 표시 등 고급 옵션",
      code: `// 고급 설정 예제
const advancedSettings = {
  autoCleanup: true,         // 자동 정리
  maxConnections: 15,        // 최대 연결 수
  smartSnap: true,           // 연결점 자동 정렬
  showConnectionPoints: true, // 연결점 표시
  curveStrength: 0.5,        // 곡선 강도
  opacity: 0.8              // 투명도
};`,
    },
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🔗 AutoConnect (자동 연결)</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          AutoConnect는 박스를 클릭한 후 다른 지점을 클릭하여 자동으로 연결선을 생성하는 혁신적인 기능입니다. 기존
          Connector와 구분되는 독립적인 시스템으로, 다양한 설정과 애니메이션 효과를 제공합니다.
        </p>
      </div>

      {/* 주요 특징 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="text-purple-600 text-2xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-purple-800 mb-2">직관적인 UI</h3>
          <p className="text-purple-700 text-sm">
            Shift + 클릭만으로 연결 모드 시작. 시각적 피드백으로 사용자 경험 최적화
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="text-blue-600 text-2xl mb-3">🎨</div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">풍부한 커스터마이징</h3>
          <p className="text-blue-700 text-sm">8가지 색상, 5가지 연결 타입, 4가지 화살표 모양, 5가지 애니메이션 효과</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="text-green-600 text-2xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">고성능</h3>
          <p className="text-green-700 text-sm">스마트 경로 계산, 자동 정리, GPU 가속 애니메이션으로 부드러운 성능</p>
        </div>
      </div>

      {/* 사용법 */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📝 사용법</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 연결 생성 */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-800 mb-3">🔗 연결 생성</h4>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-gray-700">
                <kbd className="px-2 py-1 bg-gray-200 rounded">Shift</kbd> + 박스 클릭으로 자동 연결 모드 시작
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-gray-700">연결점을 클릭하여 자동 연결 생성</span>
            </div>
          </div>

          {/* 연결 제거 */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-800 mb-3">🗑️ 연결 제거</h4>
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                ✕
              </div>
              <span className="text-gray-700">
                연결선을 <strong>더블클릭</strong>으로 개별 제거
              </span>
            </div>
          </div>

          {/* 기타 조작 */}
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-gray-800 mb-3">⚙️ 기타 조작</h4>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                ⚙
              </div>
              <span className="text-gray-700">설정 버튼으로 다양한 옵션 조정</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                ↺
              </div>
              <span className="text-gray-700">
                <kbd className="px-2 py-1 bg-gray-200 rounded">ESC</kbd> 키로 연결 모드 취소
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 예제 탭 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setActiveExample(key)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeExample === key
                  ? "text-purple-600 border-b-2 border-purple-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      {/* 예제 내용 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{examples[activeExample].title}</h3>
          <p className="text-gray-600 mb-4">{examples[activeExample].description}</p>

          {/* 코드 예제 */}
          <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6">
            <pre className="text-sm overflow-x-auto">
              <code>{examples[activeExample].code}</code>
            </pre>
          </div>

          {/* 라이브 예제 */}
          {activeExample === "basic" && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <AutoConnectExample />
            </div>
          )}
          {activeExample === "compact" && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <AutoConnectCompactExample />
            </div>
          )}
          {activeExample === "custom" && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <AutoConnectCustomExample />
            </div>
          )}
        </div>
      </div>

      {/* 설정 옵션 표 */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">⚙️ 설정 옵션</h3>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">옵션</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">타입</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기본값
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">설명</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 기본 연결 설정 */}
              <tr className="bg-blue-50">
                <td className="px-6 py-4 text-sm font-bold text-blue-900" colSpan="4">
                  📡 연결 설정
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">connectionType</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"smart"</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  연결 타입: smart, straight, curved, orthogonal, stepped
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">color</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"purple"</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  연결선 색상: purple, blue, green, red, orange, pink, indigo, cyan
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">strokeWidth</td>
                <td className="px-6 py-4 text-sm text-gray-500">number</td>
                <td className="px-6 py-4 text-sm text-gray-500">3</td>
                <td className="px-6 py-4 text-sm text-gray-500">선 두께 (1-10)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">arrowShape</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"triangle"</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  화살표 모양: triangle, diamond, circle, square, none
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">animationType</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"flow"</td>
                <td className="px-6 py-4 text-sm text-gray-500">애니메이션 효과: none, flow, pulse, glow, electric</td>
              </tr>

              {/* 패널 크기 설정 */}
              <tr className="bg-green-50">
                <td className="px-6 py-4 text-sm font-bold text-green-900" colSpan="4">
                  📏 패널 크기 설정
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">size</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"normal"</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  프리셋 크기: compact (240px), normal (360px), large (500px), fullscreen (95vw)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">width</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">커스텀 폭 (예: "400px", "50vw")</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">height</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">커스텀 높이 (예: "600px", "80vh")</td>
              </tr>

              {/* Tailwind CSS 클래스 */}
              <tr className="bg-purple-50">
                <td className="px-6 py-4 text-sm font-bold text-purple-900" colSpan="4">
                  🎨 Tailwind CSS 클래스
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">widthClass</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">Tailwind 폭 클래스 (예: "w-80", "w-96")</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">heightClass</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">Tailwind 높이 클래스 (예: "h-96", "h-screen")</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">maxWidthClass</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">최대 폭 클래스 (예: "max-w-sm", "max-w-md")</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">maxHeightClass</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">최대 높이 클래스 (예: "max-h-96", "max-h-screen")</td>
              </tr>

              {/* 패널 레이아웃 */}
              <tr className="bg-orange-50">
                <td className="px-6 py-4 text-sm font-bold text-orange-900" colSpan="4">
                  📍 패널 레이아웃
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">position</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"right"</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  패널 위치: right, left, top, bottom, center, top-left, top-right, bottom-left, bottom-right
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">theme</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"modern"</td>
                <td className="px-6 py-4 text-sm text-gray-500">테마: modern, dark, minimal, glass</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">borderRadius</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"lg"</td>
                <td className="px-6 py-4 text-sm text-gray-500">모서리 둥글기: none, sm, md, lg, xl, full</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">shadow</td>
                <td className="px-6 py-4 text-sm text-gray-500">string</td>
                <td className="px-6 py-4 text-sm text-gray-500">"xl"</td>
                <td className="px-6 py-4 text-sm text-gray-500">그림자 크기: none, sm, md, lg, xl, 2xl</td>
              </tr>

              {/* UI 제어 */}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm font-bold text-gray-900" colSpan="4">
                  🎛️ UI 제어
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">enableTabs</td>
                <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 text-sm text-gray-500">true</td>
                <td className="px-6 py-4 text-sm text-gray-500">탭 메뉴 표시 여부</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">enableAdvanced</td>
                <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 text-sm text-gray-500">true</td>
                <td className="px-6 py-4 text-sm text-gray-500">고급 설정 표시 여부</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">compactMode</td>
                <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 text-sm text-gray-500">false</td>
                <td className="px-6 py-4 text-sm text-gray-500">모든 설정을 한 화면에 표시</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">hiddenSections</td>
                <td className="px-6 py-4 text-sm text-gray-500">array</td>
                <td className="px-6 py-4 text-sm text-gray-500">[]</td>
                <td className="px-6 py-4 text-sm text-gray-500">숨길 섹션들 (예: ["advanced"])</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">customSections</td>
                <td className="px-6 py-4 text-sm text-gray-500">array</td>
                <td className="px-6 py-4 text-sm text-gray-500">null</td>
                <td className="px-6 py-4 text-sm text-gray-500">사용자 정의 설정 섹션</td>
              </tr>

              {/* 기타 설정 */}
              <tr className="bg-yellow-50">
                <td className="px-6 py-4 text-sm font-bold text-yellow-900" colSpan="4">
                  ⚙️ 기타 설정
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">smartSnap</td>
                <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 text-sm text-gray-500">true</td>
                <td className="px-6 py-4 text-sm text-gray-500">연결점에 자동 정렬</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">autoCleanup</td>
                <td className="px-6 py-4 text-sm text-gray-500">boolean</td>
                <td className="px-6 py-4 text-sm text-gray-500">false</td>
                <td className="px-6 py-4 text-sm text-gray-500">최대 연결 수 제한</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 키보드 단축키 */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">⌨️ 키보드 단축키</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-3">🔗 연결 관련</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <span className="text-slate-700">자동 연결 모드 시작</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">Shift</kbd>
                  <span className="text-slate-500">+</span>
                  <kbd className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">클릭</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <span className="text-slate-700">연결 모드 취소</span>
                <kbd className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">ESC</kbd>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-slate-700 mb-3">🗑️ 제거 관련</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <span className="text-slate-700">개별 연결선 제거</span>
                <span className="text-slate-500 text-xs">더블클릭</span>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <span className="text-slate-700">포커스된 연결선 제거</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">Del</kbd>
                  <span className="text-slate-500">또는</span>
                  <kbd className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-mono">Backspace</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg">💡</div>
            <div className="text-blue-800 text-sm">
              <strong>ESC 키의 동작:</strong> 자동 연결 모드가 활성화된 경우 모드를 취소합니다.
            </div>
          </div>
        </div>
      </div>

      {/* 팁과 모범 사례 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 팁과 모범 사례</h3>
        <ul className="space-y-2 text-yellow-700">
          <li>
            • <strong>Tailwind CSS 활용:</strong> widthClass="w-80" maxHeightClass="max-h-96"으로 반응형 크기 제어
          </li>
          <li>
            • <strong>성능 최적화:</strong> 많은 연결이 필요한 경우 autoCleanup을 활성화하세요
          </li>
          <li>
            • <strong>공간 효율성:</strong> 작은 화면에서는 size="compact" compactMode=true 사용
          </li>
          <li>
            • <strong>사용자 경험:</strong> position="center"로 설정하면 더 나은 접근성 제공
          </li>
          <li>
            • <strong>크기 우선순위:</strong> Tailwind 클래스 → 커스텀 width/height → 프리셋 size 순으로 적용
          </li>
          <li>
            • <strong>커스터마이징:</strong> customSections로 프로젝트별 전용 기능 추가
          </li>
          <li>
            • <strong>테마 일관성:</strong> 앱의 다크/라이트 모드에 맞춰 theme="dark" 또는 "minimal" 설정
          </li>
          <li>
            • <strong>섹션 제어:</strong> hiddenSections=["advanced"]로 불필요한 설정 숨기기
          </li>
        </ul>
      </div>
    </section>
  );
};

export default AutoConnectSection;
