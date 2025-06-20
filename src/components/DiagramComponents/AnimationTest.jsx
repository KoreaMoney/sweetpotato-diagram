import React from "react";
import { DiagramProvider } from "./DiagramContext";
import Box from "./Box";
import Connector from "./Connector";

const AnimationTest = () => {
  return (
    <div className="w-full h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">애니메이션 테스트</h1>

      <DiagramProvider>
        <div className="relative w-full h-64 bg-white border-2 border-gray-300 rounded-lg">
          {/* 간단한 박스들 */}
          <Box
            id="test1"
            x={50}
            y={100}
            width={100}
            height={60}
            text="시작"
            className="bg-blue-500 text-white border-blue-600 border-2 rounded"
          />

          <Box
            id="test2"
            x={300}
            y={100}
            width={100}
            height={60}
            text="끝"
            className="bg-red-500 text-white border-red-600 border-2 rounded"
          />

          {/* 강제로 애니메이션이 활성화된 커넥터 */}
          <Connector
            fromBox={{ id: "test1", position: "right" }}
            toBox={{ id: "test2", position: "left" }}
            animated={true}
            animationType="electric"
            animationSpeed={1}
            className="text-yellow-500"
            strokeWidth={4}
            arrowSize={10}
          />

          {/* 설명 */}
          <div className="absolute top-4 left-4 bg-yellow-100 p-2 rounded text-sm">
            <strong>전기 애니메이션 테스트</strong>
            <br />
            애니메이션이 보이지 않으면 브라우저 개발자 도구 콘솔을 확인하세요.
          </div>
        </div>
      </DiagramProvider>

      {/* 순수 CSS 애니메이션 테스트 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">순수 CSS 애니메이션 테스트</h2>
        <div className="w-full h-20 bg-white border-2 border-gray-300 rounded-lg relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <style>
                {`
                  .test-line {
                    stroke-dasharray: 8, 4;
                    animation: testDash 2s linear infinite;
                    stroke: #3b82f6;
                    stroke-width: 3;
                    fill: none;
                  }
                  @keyframes testDash {
                    0% { stroke-dashoffset: 0; }
                    100% { stroke-dashoffset: -12; }
                  }
                `}
              </style>
            </defs>
            <path d="M 20 40 L 380 40" className="test-line" />
          </svg>
          <div className="absolute top-2 left-4 text-sm text-gray-600">
            이 선이 움직이면 CSS 애니메이션이 작동합니다
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTest;
