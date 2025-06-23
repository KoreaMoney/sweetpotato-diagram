import React, { useState } from "react";
import MouseTracker from "./MouseTracker";

const MouseTrackerDoc = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [positionData, setPositionData] = useState({ x: 0, y: 0 });

  const handlePositionChange = (position) => {
    setPositionData(position);
  };

  const examples = [
    {
      title: "기본 사용법",
      description: "기본 설정으로 우상단에 표시되는 MouseTracker",
      component: <MouseTracker key="basic" />,
    },
    {
      title: "밝은 테마 + 왼쪽 하단",
      description: "밝은 테마로 왼쪽 하단에 위치",
      component: <MouseTracker key="light-bottom-left" position="bottom-left" theme="light" />,
    },
    {
      title: "미니멀 테마 + 상단 중앙",
      description: "미니멀 테마로 상단 중앙에 위치, 상세 정보 숨김",
      component: <MouseTracker key="minimal-top-center" position="top-center" theme="minimal" showDetails={false} />,
    },
    {
      title: "콜백 함수 + 커스텀 스타일",
      description: "위치 변경 콜백과 커스텀 스타일 적용",
      component: (
        <MouseTracker
          key="callback-custom"
          position="bottom-right"
          onPositionChange={handlePositionChange}
          customStyles={{
            container: {
              backgroundColor: "rgba(138, 43, 226, 0.9)",
              borderRadius: "20px",
              border: "2px solid #fff",
              boxShadow: "0 8px 32px rgba(138, 43, 226, 0.3)",
            },
          }}
        />
      ),
    },
    {
      title: "커스텀 내용 포함",
      description: "추가 커스텀 내용이 포함된 MouseTracker",
      component: (
        <MouseTracker key="custom-content" position="top-left" theme="dark">
          <div className="text-xs space-y-1">
            <div className="text-yellow-400">🎯 커스텀 데이터</div>
            <div>속도: {Math.abs(positionData.x - positionData.y)} px/s</div>
            <div>거리: {Math.sqrt(positionData.x ** 2 + positionData.y ** 2).toFixed(0)} px</div>
          </div>
        </MouseTracker>
      ),
    },
    {
      title: "토글 없는 고정 표시",
      description: "토글 버튼이 없는 항상 표시되는 MouseTracker",
      component: (
        <MouseTracker
          key="no-toggle"
          position="bottom-center"
          theme="minimal"
          showToggle={false}
          initialVisible={true}
        />
      ),
    },
    {
      title: "📍 포인트 저장 기능",
      description: "Ctrl+클릭으로 포인트를 저장하고 클릭하여 좌표 복사",
      component: (
        <MouseTracker key="point-saver" position="top-right" theme="dark" showSavedPoints={true} maxSavedPoints={5} />
      ),
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">🖱️ MouseTracker</h1>
        <p className="text-gray-600 text-center mb-8">다양한 설정과 스타일의 MouseTracker 컴포넌트를 체험해보세요</p>

        {/* 예제 선택기 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📋 예제 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`p-3 rounded-lg text-left transition-all duration-200 ${
                  currentExample === index
                    ? "bg-blue-100 border-2 border-blue-500 text-blue-800"
                    : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                }`}
              >
                <div className="font-medium text-sm">{example.title}</div>
                <div className="text-xs text-gray-600 mt-1">{example.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 현재 예제 정보 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">🎯 현재 예제: {examples[currentExample].title}</h3>
          <p className="text-gray-600 mb-4">{examples[currentExample].description}</p>

          {currentExample === 3 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-800 mb-2">📊 실시간 콜백 데이터:</h4>
              <div className="text-sm text-purple-700 space-y-1">
                <div>
                  X: {positionData.x}, Y: {positionData.y}
                </div>
                <div>마지막 업데이트: {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          )}
        </div>

        {/* 코드 예제 */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 mb-6 text-white">
          <h3 className="text-lg font-semibold mb-4 text-green-400">💻 코드 예제</h3>
          <pre className="text-sm overflow-x-auto">
            <code>
              {currentExample === 0 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker />
    </div>
  );
}`}

              {currentExample === 1 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker 
        position="bottom-left" 
        theme="light" 
      />
    </div>
  );
}`}

              {currentExample === 2 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker 
        position="top-center" 
        theme="minimal" 
        showDetails={false}
      />
    </div>
  );
}`}

              {currentExample === 3 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  const [positionData, setPositionData] = useState({ x: 0, y: 0 });

  const handlePositionChange = (position) => {
    setPositionData(position);
  };

  return (
    <div>
      <MouseTracker 
        position="bottom-right"
        onPositionChange={handlePositionChange}
        customStyles={{
          container: { 
            backgroundColor: 'rgba(138, 43, 226, 0.9)',
            borderRadius: '20px',
            border: '2px solid #fff'
          }
        }}
      />
    </div>
  );
}`}

              {currentExample === 4 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker position="top-left" theme="dark">
        <div className="text-xs space-y-1">
          <div className="text-yellow-400">🎯 커스텀 데이터</div>
          <div>속도: {Math.abs(x - y)} px/s</div>
          <div>거리: {Math.sqrt(x ** 2 + y ** 2)} px</div>
        </div>
      </MouseTracker>
    </div>
  );
}`}

              {currentExample === 5 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker 
        position="bottom-center"
        theme="minimal"
        showToggle={false}
        initialVisible={true}
      />
    </div>
  );
}`}

              {currentExample === 6 &&
                `import { MouseTracker } from 'sweet-diagram';

function App() {
  return (
    <div>
      <MouseTracker 
        position="top-right"
        theme="dark"
        showSavedPoints={true}
        maxSavedPoints={5}
      />
    </div>
  );
}`}
            </code>
          </pre>
        </div>

        {/* 사용 팁 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">💡 사용 팁</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>마우스를 움직여서 실시간 위치 추적을 확인해보세요</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>토글 버튼(✕)을 클릭하거나 키보드로 숨기기/보이기를 전환할 수 있습니다</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>다양한 테마와 위치 설정으로 UI에 맞게 커스터마이징하세요</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✅</span>
              <span>onPositionChange 콜백으로 마우스 위치 데이터를 활용하세요</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-500">📍</span>
              <span>
                <strong>Ctrl + 클릭</strong>으로 포인트를 저장하고, 저장된 포인트를 클릭하여 좌표를 복사하세요
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 현재 활성화된 예제 렌더링 */}
      {examples[currentExample].component}
    </div>
  );
};

export default MouseTrackerDoc;
