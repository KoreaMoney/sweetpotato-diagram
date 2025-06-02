import React, { useState } from "react";
import { Box, Arrow, Line, Triangle, Valve, Connector, ImageBox, DiagramProvider } from "../index.js";

const ComponentShowcase = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (componentName, data) => {
    setSelectedComponent({ name: componentName, data });
  };

  return (
    <DiagramProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">SweetPD 컴포넌트 쇼케이스</h1>

        {selectedComponent && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">클릭된 컴포넌트: {selectedComponent.name}</h3>
            <pre className="text-sm text-blue-600 bg-blue-100 p-2 rounded overflow-auto">
              {JSON.stringify(selectedComponent.data, null, 2)}
            </pre>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Box 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Box 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Box
                id="demo-box-1"
                text="클릭 가능한 박스"
                width={140}
                height={60}
                x={20}
                y={50}
                onClick={(e, data) => handleComponentClick("Box", data)}
              />
              <Box
                id="demo-box-2"
                text="다른 박스"
                width={120}
                height={50}
                x={200}
                y={100}
                className="bg-green-500 text-white border-green-700 border-2 rounded-lg text-sm"
                onClick={(e, data) => handleComponentClick("Box", data)}
              />
              <Box
                id="demo-box-3"
                text="소형 박스"
                width={80}
                height={40}
                x={120}
                y={180}
                className="bg-purple-500 text-white border-purple-700 border-2 rounded-lg text-xs"
                onClick={(e, data) => handleComponentClick("Box", data)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">HTML/CSS 기반 박스 컴포넌트 - 클릭하면 정보가 위에 표시됩니다</p>
          </div>

          {/* Arrow 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Arrow 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Arrow
                startPoint={{ x: 50, y: 50 }}
                endPoint={{ x: 200, y: 50 }}
                className="text-red-500"
                onClick={(e, data) => handleComponentClick("Arrow", data)}
              />
              <Arrow
                startPoint={{ x: 50, y: 100 }}
                endPoint={{ x: 150, y: 150 }}
                className="text-blue-500"
                arrowSize={12}
                strokeWidth={3}
                onClick={(e, data) => handleComponentClick("Arrow", data)}
              />
              <Arrow
                startPoint={{ x: 200, y: 100 }}
                endPoint={{ x: 100, y: 200 }}
                className="text-green-500"
                showStartArrow={true}
                showEndArrow={true}
                onClick={(e, data) => handleComponentClick("Arrow", data)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">SVG 기반 화살표 컴포넌트 - 다양한 방향과 스타일</p>
          </div>

          {/* Line 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Line 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Line start={{ x: 30, y: 30 }} end={{ x: 250, y: 30 }} color="red" thickness={2} />
              <Line start={{ x: 30, y: 80 }} end={{ x: 200, y: 120 }} color="blue" thickness={4} />
              <Line start={{ x: 50, y: 150 }} end={{ x: 180, y: 200 }} color="green" thickness={1} />
            </div>
            <p className="mt-2 text-sm text-gray-600">단순한 선 컴포넌트 - 두 점을 연결하는 직선</p>
          </div>

          {/* Triangle 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Triangle 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Triangle position={{ x: 100, y: 50 }} color="purple" size={60} />
              <Triangle position={{ x: 200, y: 120 }} color="orange" size={40} />
            </div>
            <p className="mt-2 text-sm text-gray-600">삼각형 컴포넌트 - 다양한 크기와 색상</p>
          </div>

          {/* Connector 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Connector 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Connector start={{ x: 50, y: 100 }} end={{ x: 250, y: 100 }} color="cyan" type="straight" />
              <Connector start={{ x: 50, y: 150 }} end={{ x: 250, y: 50 }} color="magenta" type="curved" />
            </div>
            <p className="mt-2 text-sm text-gray-600">연결선 컴포넌트 - 직선 또는 곡선으로 연결</p>
          </div>

          {/* Valve 컴포넌트 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Valve 컴포넌트</h2>
            <div className="h-64 border rounded relative bg-gray-50 overflow-hidden">
              <Valve position={{ x: 100, y: 80 }} color="orange" isOpen={true} />
              <Valve position={{ x: 200, y: 140 }} color="red" isOpen={false} />
            </div>
            <p className="mt-2 text-sm text-gray-600">밸브 컴포넌트 - 열림/닫힘 상태 표시</p>
          </div>
        </div>

        {/* 다이어그램 예제 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">복합 다이어그램 예제</h2>
          <div className="h-96 border rounded relative bg-gray-50 overflow-hidden">
            {/* 박스들 */}
            <Box
              id="process-1"
              text="입력"
              width={80}
              height={50}
              x={50}
              y={100}
              className="bg-green-500 text-white border-green-700 border-2 rounded-lg text-sm"
              onClick={(e, data) => handleComponentClick("Process Box", data)}
            />
            <Box
              id="process-2"
              text="처리"
              width={80}
              height={50}
              x={200}
              y={100}
              className="bg-blue-500 text-white border-blue-700 border-2 rounded-lg text-sm"
              onClick={(e, data) => handleComponentClick("Process Box", data)}
            />
            <Box
              id="process-3"
              text="출력"
              width={80}
              height={50}
              x={350}
              y={100}
              className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg text-sm"
              onClick={(e, data) => handleComponentClick("Process Box", data)}
            />

            {/* 연결 화살표들 */}
            <Arrow
              startPoint={{ x: 130, y: 125 }}
              endPoint={{ x: 200, y: 125 }}
              className="text-gray-600"
              onClick={(e, data) => handleComponentClick("Connection Arrow", data)}
            />
            <Arrow
              startPoint={{ x: 280, y: 125 }}
              endPoint={{ x: 350, y: 125 }}
              className="text-gray-600"
              onClick={(e, data) => handleComponentClick("Connection Arrow", data)}
            />

            {/* 밸브 */}
            <Valve position={{ x: 160, y: 200 }} color="red" isOpen={true} />

            {/* 제어 라인 */}
            <Line start={{ x: 240, y: 150 }} end={{ x: 180, y: 200 }} color="gray" thickness={1} />
          </div>
          <p className="mt-2 text-sm text-gray-600">실제 다이어그램에서 사용되는 컴포넌트들의 조합 예제</p>
        </div>

        {/* 사용법 가이드 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">사용법</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>컴포넌트 유형:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Box:</strong> HTML/CSS 기반, 클릭 가능, 연결점 포함
              </li>
              <li>
                <strong>Arrow:</strong> SVG 기반, 방향 화살표
              </li>
              <li>
                <strong>Line:</strong> 단순 직선 연결
              </li>
              <li>
                <strong>Triangle:</strong> 기본 도형
              </li>
              <li>
                <strong>Valve:</strong> 밸브 상태 표시
              </li>
              <li>
                <strong>Connector:</strong> 고급 연결선
              </li>
            </ul>

            <p>
              <strong>상호작용:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Box 컴포넌트들을 클릭하면 위에 정보가 표시됩니다</li>
              <li>모든 컴포넌트는 DiagramProvider 내에서 작동합니다</li>
              <li>연결점(Connection Points)이 호버시 표시됩니다</li>
            </ul>
          </div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default ComponentShowcase;
