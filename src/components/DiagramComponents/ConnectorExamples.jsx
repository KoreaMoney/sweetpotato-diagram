import React, { useState } from "react";
import Connector from "./Connector";

/**
 * Connector 컴포넌트 사용 예시 모음
 *
 * 이 파일은 Connector 컴포넌트의 다양한 사용법을 보여주는 예시 컬렉션입니다.
 * 실제 프로젝트에서 참고용으로 사용하세요.
 */

const ConnectorExamples = () => {
  // 예시용 박스 데이터
  const [boxes] = useState([
    { id: "box1", x: 50, y: 50, width: 120, height: 80 },
    { id: "box2", x: 300, y: 100, width: 100, height: 60 },
    { id: "box3", x: 500, y: 50, width: 140, height: 90 },
    { id: "box4", x: 200, y: 250, width: 110, height: 70 },
    { id: "box5", x: 450, y: 300, width: 130, height: 85 },
  ]);

  const [selectedExample, setSelectedExample] = useState("basic");

  const handleExampleChange = (example) => {
    setSelectedExample(example);
  };

  const renderBox = (box) => (
    <div
      key={box.id}
      className="absolute bg-blue-100 border-2 border-blue-300 rounded-lg shadow-md flex items-center justify-center text-sm font-medium text-blue-800"
      style={{
        left: box.x,
        top: box.y,
        width: box.width,
        height: box.height,
      }}
    >
      {box.id}
    </div>
  );

  const renderExample = () => {
    switch (selectedExample) {
      case "basic":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">1. 기본 직선 연결</h3>

            {/* 기본 직선 */}
            <Connector startPoint={{ x: 100, y: 100 }} endPoint={{ x: 300, y: 150 }} />

            {/* 두꺼운 빨간 선 */}
            <Connector
              startPoint={{ x: 150, y: 200 }}
              endPoint={{ x: 400, y: 180 }}
              strokeWidth={4}
              className="text-red-500"
            />

            {/* 화살표 없는 선 */}
            <Connector
              startPoint={{ x: 80, y: 280 }}
              endPoint={{ x: 350, y: 320 }}
              showArrow={false}
              className="text-green-600"
            />

            {/* 연결점 표시용 원 */}
            <circle cx="100" cy="100" r="4" className="fill-blue-500" />
            <circle cx="300" cy="150" r="4" className="fill-blue-500" />
            <circle cx="150" cy="200" r="4" className="fill-red-500" />
            <circle cx="400" cy="180" r="4" className="fill-red-500" />
            <circle cx="80" cy="280" r="4" className="fill-green-600" />
            <circle cx="350" cy="320" r="4" className="fill-green-600" />
          </div>
        );

      case "curved":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">2. 곡선 연결</h3>

            {/* 기본 곡선 */}
            <Connector startPoint={{ x: 80, y: 120 }} endPoint={{ x: 350, y: 180 }} connectionType="curved" />

            {/* 애니메이션 곡선 */}
            <Connector
              startPoint={{ x: 100, y: 250 }}
              endPoint={{ x: 400, y: 150 }}
              connectionType="curved"
              animated={true}
              strokeWidth={3}
              className="text-purple-500"
            />

            {/* 양방향 화살표 곡선 */}
            <Connector
              startPoint={{ x: 200, y: 320 }}
              endPoint={{ x: 500, y: 100 }}
              connectionType="curved"
              showArrow={true}
              showStartArrow={true}
              arrowSize={12}
              className="text-orange-500"
            />
          </div>
        );

      case "orthogonal":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">3. 직교 연결 (ㄱ자)</h3>

            {/* 수평 우선 */}
            <Connector
              startPoint={{ x: 80, y: 120 }}
              endPoint={{ x: 300, y: 220 }}
              connectionType="orthogonal"
              orthogonalDirection="horizontal-first"
              stepOffset={60}
            />

            {/* 수직 우선 */}
            <Connector
              startPoint={{ x: 200, y: 80 }}
              endPoint={{ x: 450, y: 180 }}
              connectionType="orthogonal"
              orthogonalDirection="vertical-first"
              stepOffset={80}
              className="text-green-500"
            />

            {/* 자동 방향 */}
            <Connector
              startPoint={{ x: 350, y: 280 }}
              endPoint={{ x: 150, y: 320 }}
              connectionType="orthogonal"
              orthogonalDirection="auto"
              className="text-blue-500"
              strokeWidth={3}
            />
          </div>
        );

      case "boxConnection":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">4. 박스 간 연결</h3>

            {/* 박스들 렌더링 */}
            {boxes.slice(0, 3).map(renderBox)}

            {/* 박스 간 직선 연결 */}
            <Connector
              fromBox={{ id: "box1", position: "right" }}
              toBox={{ id: "box2", position: "left" }}
              boxes={boxes}
              connectionType="straight"
            />

            {/* 박스 간 곡선 연결 */}
            <Connector
              fromBox={{ id: "box2", position: "right" }}
              toBox={{ id: "box3", position: "left" }}
              boxes={boxes}
              connectionType="curved"
              className="text-purple-500"
            />

            {/* 박스 간 자동 연결 */}
            <Connector
              fromBox={{ id: "box1", position: "bottom" }}
              toBox={{ id: "box3", position: "top" }}
              boxes={boxes}
              connectionType="auto"
              className="text-green-500"
              strokeWidth={3}
            />
          </div>
        );

      case "custom":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">5. 사용자 정의 경로</h3>

            {/* 커스텀 경로 */}
            <Connector
              startPoint={{ x: 80, y: 100 }}
              endPoint={{ x: 450, y: 300 }}
              connectionType="custom"
              bendPoints={[
                { x: 200, y: 100 },
                { x: 200, y: 200 },
                { x: 350, y: 200 },
                { x: 350, y: 300 },
              ]}
            />

            {/* 계단식 연결 */}
            <Connector
              startPoint={{ x: 100, y: 250 }}
              endPoint={{ x: 400, y: 120 }}
              connectionType="stepped"
              className="text-orange-500"
              strokeWidth={3}
            />

            {/* 복잡한 커스텀 경로 */}
            <Connector
              startPoint={{ x: 300, y: 320 }}
              endPoint={{ x: 500, y: 80 }}
              connectionType="custom"
              bendPoints={[
                { x: 380, y: 320 },
                { x: 380, y: 250 },
                { x: 450, y: 250 },
                { x: 450, y: 150 },
                { x: 500, y: 150 },
              ]}
              animated={true}
              className="text-red-500"
            />
          </div>
        );

      case "advanced":
        return (
          <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <h3 className="absolute top-4 left-4 text-lg font-semibold text-gray-700 z-20">6. 고급 기능들</h3>

            {/* 모든 박스 렌더링 */}
            {boxes.map(renderBox)}

            {/* 오프셋이 있는 박스 연결 */}
            <Connector
              fromBox={{
                id: "box1",
                position: "right",
                offset: { x: 10, y: -10 },
              }}
              toBox={{
                id: "box4",
                position: "top",
                offset: { x: 20, y: -10 },
              }}
              boxes={boxes}
              connectionType="orthogonal"
              className="text-blue-600"
            />

            {/* 복합 연결 */}
            <Connector
              fromBox={{ id: "box2", position: "bottom" }}
              toBox={{ id: "box5", position: "left" }}
              boxes={boxes}
              connectionType="curved"
              animated={true}
              showStartArrow={true}
              className="text-purple-600"
              strokeWidth={4}
            />

            {/* 센터 연결 */}
            <Connector
              fromBox={{ id: "box3", position: "center" }}
              toBox={{ id: "box4", position: "center" }}
              boxes={boxes}
              connectionType="straight"
              className="text-red-500 opacity-70"
              strokeWidth={2}
              showArrow={false}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Connector 컴포넌트 사용 예시</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">예시 선택:</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "basic", label: "기본 연결" },
            { key: "curved", label: "곡선 연결" },
            { key: "orthogonal", label: "직교 연결" },
            { key: "boxConnection", label: "박스 연결" },
            { key: "custom", label: "사용자 정의" },
            { key: "advanced", label: "고급 기능" },
          ].map((example) => (
            <button
              key={example.key}
              onClick={() => handleExampleChange(example.key)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedExample === example.key
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">{renderExample()}</div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">현재 예시 설명:</h3>
        <div className="text-sm text-gray-600">
          {selectedExample === "basic" &&
            "가장 기본적인 점 대 점 연결입니다. startPoint와 endPoint를 사용하여 직선으로 연결합니다."}
          {selectedExample === "curved" &&
            "베지어 곡선을 사용한 부드러운 연결입니다. 애니메이션과 양방향 화살표도 지원합니다."}
          {selectedExample === "orthogonal" &&
            "직각으로 꺾이는 연결선입니다. horizontal-first, vertical-first, auto 방향을 설정할 수 있습니다."}
          {selectedExample === "boxConnection" &&
            "박스 간의 자동 연결입니다. 박스의 위치와 크기를 자동으로 계산하여 최적의 연결점을 찾습니다."}
          {selectedExample === "custom" && "bendPoints를 사용한 사용자 정의 경로와 stepped 연결 방식을 보여줍니다."}
          {selectedExample === "advanced" && "오프셋, 복합 연결, 센터 연결 등 고급 기능들을 조합한 예시입니다."}
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 사용 팁</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 박스 연결시 connectionType="auto"를 사용하면 자동으로 최적의 연결 방식을 선택합니다</li>
          <li>• 애니메이션은 시각적 효과는 좋지만 성능에 영향을 줄 수 있으므로 적절히 사용하세요</li>
          <li>• 복잡한 다이어그램에서는 orthogonal 연결이 가독성이 좋습니다</li>
          <li>• 오프셋을 사용하여 연결점을 미세 조정할 수 있습니다</li>
          <li>• className을 통해 다양한 색상과 스타일을 적용할 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectorExamples;
