import React, { useState } from "react";
import { DiagramProvider } from "./DiagramContext";
import Connector from "./Connector";

/**
 * 새로운 화살표 기능 데모 컴포넌트
 *
 * arrowDirection, arrowColor, arrowShape을 실시간으로 테스트할 수 있습니다.
 */
const ArrowDemo = () => {
  const [arrowDirection, setArrowDirection] = useState("forward");
  const [arrowColor, setArrowColor] = useState("blue");
  const [arrowShape, setArrowShape] = useState("triangle");
  const [arrowSize, setArrowSize] = useState(12);
  const [connectionType, setConnectionType] = useState("straight");

  const handleDirectionChange = (direction) => setArrowDirection(direction);
  const handleColorChange = (color) => setArrowColor(color);
  const handleShapeChange = (shape) => setArrowShape(shape);
  const handleSizeChange = (event) => setArrowSize(parseInt(event.target.value));
  const handleConnectionTypeChange = (type) => setConnectionType(type);

  const directions = [
    { value: "forward", label: "앞쪽" },
    { value: "backward", label: "뒤쪽" },
    { value: "both", label: "양방향" },
    { value: "none", label: "없음" },
  ];

  const colors = [
    { value: "current", label: "기본" },
    { value: "red", label: "빨강" },
    { value: "blue", label: "파랑" },
    { value: "green", label: "초록" },
    { value: "purple", label: "보라" },
    { value: "yellow", label: "노랑" },
    { value: "pink", label: "분홍" },
    { value: "indigo", label: "인디고" },
  ];

  const shapes = [
    { value: "triangle", label: "삼각형" },
    { value: "diamond", label: "다이아몬드" },
    { value: "circle", label: "원형" },
    { value: "square", label: "사각형" },
  ];

  const connectionTypes = [
    { value: "straight", label: "직선" },
    { value: "curved", label: "곡선" },
    { value: "orthogonal", label: "직교" },
  ];

  return (
    <DiagramProvider>
      <div className="h-full p-4 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-3">🔺 Arrow Demo</h2>
              <p className="text-purple-100 mt-1">Real-time arrow styling and animation demo</p>
            </div>

            {/* 컨트롤 패널 */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 화살표 방향 */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Arrow Type</label>
                  <div className="space-y-1">
                    {directions.map((direction) => (
                      <label key={direction.value} className="flex items-center">
                        <input
                          type="radio"
                          value={direction.value}
                          checked={arrowDirection === direction.value}
                          onChange={() => handleDirectionChange(direction.value)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{direction.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 화살표 색상 */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Arrow Color</label>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {colors.map((color) => (
                      <label key={color.value} className="flex items-center">
                        <input
                          type="radio"
                          value={color.value}
                          checked={arrowColor === color.value}
                          onChange={() => handleColorChange(color.value)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{color.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 화살표 모양 */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Arrow Shape</label>
                  <div className="space-y-1">
                    {shapes.map((shape) => (
                      <label key={shape.value} className="flex items-center">
                        <input
                          type="radio"
                          value={shape.value}
                          checked={arrowShape === shape.value}
                          onChange={() => handleShapeChange(shape.value)}
                          className="mr-2 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{shape.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 기타 설정 */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Arrow Size</label>
                  <input
                    type="range"
                    min="8"
                    max="24"
                    value={arrowSize}
                    onChange={handleSizeChange}
                    className="w-full mb-2"
                  />
                  <div className="text-sm text-gray-600 mb-3">Size: {arrowSize}px</div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">Line Width</label>
                  <select
                    value={connectionType}
                    onChange={(e) => handleConnectionTypeChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {connectionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 미리보기와 코드 영역 */}
            <div className="space-y-4 p-4">
              {/* 미리보기 영역 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>

                <div className="relative w-full h-96 bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                  <Connector
                    startPoint={{ x: 100, y: 200 }}
                    endPoint={{ x: 500, y: 250 }}
                    connectionType={connectionType}
                    arrowDirection={arrowDirection}
                    arrowColor={arrowColor}
                    arrowShape={arrowShape}
                    arrowSize={arrowSize}
                    strokeWidth={3}
                    className="text-gray-600"
                  />

                  {/* 시작점과 끝점 표시 */}
                  <div
                    className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-lg animate-pulse"
                    style={{ left: 96, top: 196 }}
                  ></div>
                  <div
                    className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg animate-pulse"
                    style={{ left: 496, top: 246 }}
                  ></div>

                  <div className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2"></span>
                    Start
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block ml-4 mr-2"></span>
                    End
                  </div>
                </div>
              </div>

              {/* 코드 예시 */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Current JSX Code:</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-green-400">
                    {`<Connector
  startPoint={{ x: 100, y: 200 }}
  endPoint={{ x: 500, y: 250 }}
  connectionType="${connectionType}"
  arrowDirection="${arrowDirection}"
  arrowColor="${arrowColor}"
  arrowShape="${arrowShape}"
  arrowSize={${arrowSize}}
  strokeWidth={3}
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default ArrowDemo;
