import React from "react";
import { DiagramProvider } from "../DiagramContext";
import AutoConnectManager from "../AutoConnectManager";
import Box from "../Box";

/**
 * AutoConnectExample 컴포넌트
 *
 * 자동 연결 기능을 시연하는 예제 컴포넌트
 */
const AutoConnectExample = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">자동 연결 기능 예제</h2>
        <div className="text-gray-600 space-y-2">
          <p>
            📝 <strong>사용법:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Shift</kbd> + 박스 클릭으로 자동 연결 모드 시작
            </li>
            <li>연결점을 클릭하여 자동 연결 생성</li>
            <li>
              <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">ESC</kbd> 키로 연결 모드 취소
            </li>
            <li>연결선을 클릭하여 개별 제거 가능</li>
          </ul>
        </div>
      </div>

      <DiagramProvider width={800} height={600} className="border-2 border-gray-300 rounded-lg bg-white">
        <AutoConnectManager>
          {/* 예제 박스들 */}
          <Box
            id="box1"
            text="시작 박스"
            x={100}
            y={150}
            width={120}
            height={80}
            className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg font-medium"
          />

          <Box
            id="box2"
            text="중간 박스"
            x={350}
            y={100}
            width={120}
            height={80}
            className="bg-green-500 text-white border-green-600 border-2 rounded-lg font-medium"
          />

          <Box
            id="box3"
            text="목표 박스"
            x={600}
            y={200}
            width={120}
            height={80}
            className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg font-medium"
          />

          <Box
            id="box4"
            text="처리 박스"
            x={300}
            y={350}
            width={140}
            height={80}
            className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg font-medium"
          />

          <Box
            id="box5"
            text="결과 박스"
            x={550}
            y={450}
            width={120}
            height={80}
            className="bg-red-500 text-white border-red-600 border-2 rounded-lg font-medium"
          />

          {/* 고정 영역 표시 */}
          <div className="absolute top-2 left-20 bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 max-w-xs">
            <div className="text-yellow-800 font-medium mb-1">연결 영역</div>
            <div className="text-yellow-700 text-sm">이 영역의 임의 지점으로 연결 가능</div>
          </div>

          {/* 예제 포인트들 */}
          <div className="absolute" style={{ left: "150px", top: "300px" }}>
            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              예제 포인트 1
            </div>
          </div>

          <div className="absolute" style={{ left: "500px", top: "80px" }}>
            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              예제 포인트 2
            </div>
          </div>

          <div className="absolute" style={{ left: "450px", top: "300px" }}>
            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-gray-600"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              예제 포인트 3
            </div>
          </div>

          {/* 격자 패턴 (시각적 가이드) */}
          <svg className="absolute inset-0 pointer-events-none opacity-10" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="gray" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </AutoConnectManager>
      </DiagramProvider>

      {/* 기능 설명 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">✨ 주요 기능</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 기존 Connector와 구분되는 자동 연결 시스템</li>
            <li>• 박스에서 임의 포인트로의 스마트 연결</li>
            <li>• 최적 연결점 자동 계산</li>
            <li>• 실시간 시각적 피드백</li>
            <li>• 거리 기반 스마트 경로 선택</li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-2">🎨 시각적 표시</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • <span className="text-purple-600">보라색</span> 자동 연결선
            </li>
            <li>• 선택된 박스의 펄스 애니메이션</li>
            <li>• 연결 모드 중 크로스헤어 커서</li>
            <li>• 연결점과 종료점 시각적 표시</li>
            <li>• 상태별 안내 메시지</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutoConnectExample;
