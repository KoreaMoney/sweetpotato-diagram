import React, { useState } from "react";
import MouseTracker from "../MouseTracker";

const MouseTrackerSection = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [positionData, setPositionData] = useState({ x: 0, y: 0 });

  const handlePositionChange = (position) => {
    setPositionData(position);
  };

  const examples = [
    {
      title: "기본 사용법",
      code: `import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker />
    </div>
  );
}`,
      component: <MouseTracker key="basic-doc" />,
    },
    {
      title: "위치 및 테마 설정",
      code: `import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker 
        position="bottom-left" 
        theme="light" 
        showDetails={false}
      />
    </div>
  );
}`,
      component: <MouseTracker key="light-doc" position="bottom-left" theme="light" showDetails={false} />,
    },
    {
      title: "콜백 함수 사용",
      code: `import { MouseTracker } from "sweet-diagram";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePositionChange = (pos) => {
    setPosition(pos);
    ("Mouse position:", pos);
  };

  return (
    <div>
      <MouseTracker 
        onPositionChange={handlePositionChange}
        position="top-left"
        theme="minimal"
      />
    </div>
  );
}`,
      component: (
        <MouseTracker key="callback-doc" onPositionChange={handlePositionChange} position="top-left" theme="minimal" />
      ),
    },
    {
      title: "📍 포인트 저장 기능",
      code: `import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker 
        position="bottom-right"
        theme="dark"
        showSavedPoints={true}
        maxSavedPoints={8}
      />
      {/* Ctrl + 클릭으로 포인트 저장 */}
      {/* 저장된 포인트 클릭으로 좌표 복사 */}
    </div>
  );
}`,
      component: (
        <MouseTracker key="points-doc" position="bottom-right" theme="dark" showSavedPoints={true} maxSavedPoints={8} />
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* 개요 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="text-4xl mr-3">🖱️</span>
          MouseTracker Component
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          실시간으로 마우스 위치를 추적하고 화면에 표시하는 컴포넌트입니다. 다양한 테마와 위치 설정을 지원하며, 개발 및
          디버깅 용도로 활용할 수 있습니다.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">✨ 주요 기능</h3>
          <ul className="text-blue-700 space-y-1">
            <li>• 실시간 마우스 좌표 (X, Y) 표시</li>
            <li>
              • 📍 <strong>Ctrl + 클릭</strong>으로 포인트 저장 및 관리
            </li>
            <li>• 저장된 포인트 클릭으로 좌표 복사</li>
            <li>• 6가지 위치 옵션 (상하좌우, 중앙)</li>
            <li>• 3가지 테마 (Dark, Light, Minimal)</li>
            <li>• 화면 크기 및 상대 위치 정보</li>
            <li>• 토글 기능으로 숨기기/보이기</li>
            <li>• 콜백 함수로 위치 데이터 활용</li>
          </ul>
        </div>
      </div>

      {/* Props 테이블 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">📋 Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">타입</th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">기본값</th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">설명</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">position</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">
                  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
                </td>
                <td className="border border-gray-300 px-4 py-3 font-mono">'top-right'</td>
                <td className="border border-gray-300 px-4 py-3">컴포넌트 표시 위치</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">theme</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">
                  'dark' | 'light' | 'minimal'
                </td>
                <td className="border border-gray-300 px-4 py-3 font-mono">'dark'</td>
                <td className="border border-gray-300 px-4 py-3">테마 스타일</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">showDetails</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">boolean</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">true</td>
                <td className="border border-gray-300 px-4 py-3">상세 정보 (화면 크기, 상대 위치) 표시 여부</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">showToggle</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">boolean</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">true</td>
                <td className="border border-gray-300 px-4 py-3">토글 버튼 표시 여부</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">initialVisible</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">boolean</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">true</td>
                <td className="border border-gray-300 px-4 py-3">초기 표시 상태</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">onPositionChange</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">
                  {`(position: {x: number, y: number}) => void`}
                </td>
                <td className="border border-gray-300 px-4 py-3 font-mono">null</td>
                <td className="border border-gray-300 px-4 py-3">마우스 위치 변경 시 호출되는 콜백</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">customStyles</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">object</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">{`{}`}</td>
                <td className="border border-gray-300 px-4 py-3">커스텀 스타일 객체</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">className</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">string</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">''</td>
                <td className="border border-gray-300 px-4 py-3">추가 CSS 클래스</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">children</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">ReactNode</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">null</td>
                <td className="border border-gray-300 px-4 py-3">추가 커스텀 내용</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">showSavedPoints</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">boolean</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">true</td>
                <td className="border border-gray-300 px-4 py-3">포인트 저장 기능 활성화 여부</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-mono bg-gray-50">maxSavedPoints</td>
                <td className="border border-gray-300 px-4 py-3 font-mono text-blue-600">number</td>
                <td className="border border-gray-300 px-4 py-3 font-mono">10</td>
                <td className="border border-gray-300 px-4 py-3">최대 저장 가능한 포인트 개수</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 사용 예제 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">💻 사용 예제</h3>

        {/* 예제 선택 탭 */}
        <div className="flex space-x-2 mb-6 border-b">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setCurrentExample(index)}
              className={`px-4 py-2 font-medium transition-colors ${
                currentExample === index
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* 코드 표시 */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>{examples[currentExample].code}</code>
          </pre>
        </div>

        {/* 실행 결과 */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 relative min-h-[200px]">
          <div className="text-sm text-gray-600 mb-4">🎯 실행 결과 (마우스를 움직여보세요!)</div>

          {currentExample === 2 && (
            <div className="bg-white border border-purple-200 rounded p-3 mb-4">
              <div className="text-sm text-purple-700">
                <strong>실시간 콜백 데이터:</strong>
                <div>
                  X: {positionData.x}, Y: {positionData.y}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 현재 활성화된 예제 컴포넌트 렌더링 */}
        {examples[currentExample].component}
      </div>

      {/* 테마 비교 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">🎨 테마 비교</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              <div className="text-white text-sm">Dark Theme</div>
              <div className="text-blue-400 text-xs">어두운 배경</div>
              <div className="text-green-400 text-xs">파란/초록 강조</div>
            </div>
            <p className="text-sm text-gray-600">기본 테마. 어두운 UI에 적합</p>
          </div>

          <div className="text-center">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-3">
              <div className="text-gray-900 text-sm">Light Theme</div>
              <div className="text-blue-600 text-xs">밝은 배경</div>
              <div className="text-green-600 text-xs">파란/초록 강조</div>
            </div>
            <p className="text-sm text-gray-600">밝은 UI에 적합한 라이트 테마</p>
          </div>

          <div className="text-center">
            <div className="bg-black bg-opacity-70 rounded-lg p-4 mb-3">
              <div className="text-white text-sm">Minimal Theme</div>
              <div className="text-cyan-400 text-xs">사이버네틱</div>
              <div className="text-lime-400 text-xs">청록/라임 강조</div>
            </div>
            <p className="text-sm text-gray-600">미니멀하고 세련된 디자인</p>
          </div>
        </div>
      </div>

      {/* 사용 팁 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">💡 사용 팁</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">🎯 개발용도</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• UI 요소 정확한 위치 확인</li>
              <li>• 반응형 디자인 테스트</li>
              <li>• 마우스 이벤트 디버깅</li>
              <li>• 좌표계 이해 및 학습</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">📍 포인트 저장</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                • <strong>Ctrl + 클릭</strong>으로 포인트 저장
              </li>
              <li>• 저장된 포인트 클릭으로 좌표 복사</li>
              <li>• 개별 포인트 삭제 (✕ 버튼)</li>
              <li>• 전체 포인트 삭제 (🗑️ 버튼)</li>
              <li>• 시간순 자동 정렬</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">⚙️ 커스터마이징</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• customStyles로 완전한 스타일 제어</li>
              <li>• children으로 추가 정보 표시</li>
              <li>• onPositionChange로 데이터 활용</li>
              <li>• 위치별로 다른 정보 표시</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 포인트 저장 기능 상세 설명 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">📍 포인트 저장 기능</h3>
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h4 className="font-semibold text-yellow-800 mb-2">🎯 사용법</h4>
            <div className="text-yellow-700 space-y-1">
              <div>
                <strong>1. 포인트 저장:</strong> 화면의 원하는 위치에서{" "}
                <code className="bg-yellow-200 px-1 rounded">Ctrl + 클릭</code>
              </div>
              <div>
                <strong>2. 좌표 복사:</strong> 저장된 포인트를 클릭하여 클립보드에 복사
              </div>
              <div>
                <strong>3. 포인트 삭제:</strong> 개별 ✕ 버튼 또는 전체 🗑️ 버튼 사용
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">✨ 주요 특징</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ 최대 저장 개수 제한 (`maxSavedPoints`)</li>
                <li>✅ 자동 시간순 정렬 (최신 순)</li>
                <li>✅ 개별/전체 삭제 기능</li>
                <li>✅ 클립보드 자동 복사</li>
                <li>✅ 스크롤 가능한 목록</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">🔧 설정 옵션</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <code className="bg-gray-200 px-1 rounded">showSavedPoints={true}</code>
                </div>
                <div className="text-xs ml-4">포인트 저장 기능 활성화</div>
                <div>
                  <code className="bg-gray-200 px-1 rounded">maxSavedPoints={10}</code>
                </div>
                <div className="text-xs ml-4">최대 저장 개수 설정</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 활용 예시</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• UI 컴포넌트의 정확한 배치 좌표 확인</li>
              <li>• 디자인 시스템의 간격 측정</li>
              <li>• 반응형 브레이크포인트 테스트</li>
              <li>• 사용자 인터랙션 포인트 분석</li>
              <li>• 애니메이션 키프레임 좌표 설정</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 접근성 및 성능 */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">♿ 접근성 & 성능</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-green-600 mb-3 flex items-center">
              <span className="mr-2">♿</span>
              접근성 지원
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ 키보드 네비게이션 (Tab, Enter, Space)</li>
              <li>✅ ARIA 라벨 제공</li>
              <li>✅ 스크린 리더 호환</li>
              <li>✅ 고대비 색상 지원</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
              <span className="mr-2">⚡</span>
              성능 최적화
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✅ 자동 이벤트 리스너 정리</li>
              <li>✅ 메모리 누수 방지</li>
              <li>✅ 효율적인 리렌더링</li>
              <li>✅ SSR 안전성</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MouseTrackerSection;
