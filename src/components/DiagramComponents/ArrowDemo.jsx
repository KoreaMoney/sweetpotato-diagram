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
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔺 화살표 기능 데모</h2>

        {/* 컨트롤 패널 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* 화살표 방향 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">방향</label>
            <div className="space-y-1">
              {directions.map((direction) => (
                <label key={direction.value} className="flex items-center">
                  <input
                    type="radio"
                    value={direction.value}
                    checked={arrowDirection === direction.value}
                    onChange={() => handleDirectionChange(direction.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{direction.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 화살표 색상 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">색상</label>
            <div className="space-y-1">
              {colors.map((color) => (
                <label key={color.value} className="flex items-center">
                  <input
                    type="radio"
                    value={color.value}
                    checked={arrowColor === color.value}
                    onChange={() => handleColorChange(color.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{color.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 화살표 모양 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">모양</label>
            <div className="space-y-1">
              {shapes.map((shape) => (
                <label key={shape.value} className="flex items-center">
                  <input
                    type="radio"
                    value={shape.value}
                    checked={arrowShape === shape.value}
                    onChange={() => handleShapeChange(shape.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">{shape.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 기타 설정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">크기</label>
            <input
              type="range"
              min="8"
              max="24"
              value={arrowSize}
              onChange={handleSizeChange}
              className="w-full mb-2"
            />
            <div className="text-sm text-gray-600">크기: {arrowSize}px</div>

            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">연결 타입</label>
            <select
              value={connectionType}
              onChange={(e) => handleConnectionTypeChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            >
              {connectionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 미리보기 영역 */}
        <div className="relative w-full h-80 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
          <h3 className="absolute top-4 left-4 text-lg font-medium text-gray-700 z-20">실시간 미리보기</h3>

          <Connector
            startPoint={{ x: 100, y: 150 }}
            endPoint={{ x: 400, y: 200 }}
            connectionType={connectionType}
            arrowDirection={arrowDirection}
            arrowColor={arrowColor}
            arrowShape={arrowShape}
            arrowSize={arrowSize}
            strokeWidth={3}
            className="text-gray-600"
          />

          {/* 시작점과 끝점 표시 */}
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full" style={{ left: 96, top: 146 }}></div>
          <div className="absolute w-4 h-4 bg-red-500 rounded-full" style={{ left: 396, top: 196 }}></div>

          <div className="absolute bottom-4 left-4 text-sm text-gray-600">파란점: 시작점 | 빨간점: 끝점</div>
        </div>

        {/* 코드 예시 */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-700 mb-2">현재 설정 코드:</h4>
          <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
            {`<Connector
  startPoint={{ x: 100, y: 150 }}
  endPoint={{ x: 400, y: 200 }}
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
    </DiagramProvider>
  );
};

export default ArrowDemo;
