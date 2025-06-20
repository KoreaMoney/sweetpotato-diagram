import React, { useState } from "react";
import { DiagramProvider } from "../DiagramContext";
import Box from "../Box";
import Connector from "../Connector";

const AnimationExamples = () => {
  const [isRunning, setIsRunning] = useState(true);

  const animationTypes = [
    { type: "electric", name: "전기", color: "text-blue-500", description: "전기 흐름 애니메이션" },
    { type: "water", name: "물", color: "text-blue-600", description: "물 흐름 애니메이션" },
    { type: "wind", name: "바람", color: "text-gray-400", description: "바람 흐름 애니메이션" },
    { type: "gas", name: "가스", color: "text-yellow-500", description: "가스 흐름 애니메이션" },
    { type: "data", name: "데이터", color: "text-green-500", description: "데이터 전송 애니메이션" },
    { type: "dash", name: "대시", color: "text-purple-500", description: "기본 대시 애니메이션" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">커넥터 애니메이션 예제</h2>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isRunning ? "애니메이션 정지" : "애니메이션 시작"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {animationTypes.map((animation, index) => (
          <div key={animation.type} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold mb-2 text-center">
              {animation.name} ({animation.type})
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">{animation.description}</p>

            <DiagramProvider>
              <div className="relative w-full h-32 bg-gray-50 rounded">
                <Box
                  id={`source-${index}`}
                  x={20}
                  y={40}
                  width={60}
                  height={40}
                  className="bg-green-100 border-green-300"
                >
                  <div className="text-xs text-center">소스</div>
                </Box>

                <Box id={`target-${index}`} x={180} y={40} width={60} height={40} className="bg-red-100 border-red-300">
                  <div className="text-xs text-center">타겟</div>
                </Box>

                <Connector
                  fromBox={{ id: `source-${index}`, position: "right" }}
                  toBox={{ id: `target-${index}`, position: "left" }}
                  animated={isRunning}
                  animationType={animation.type}
                  animationSpeed={2}
                  connectionType="straight"
                  className={animation.color}
                  strokeWidth={3}
                  arrowSize={10}
                />
              </div>
            </DiagramProvider>
          </div>
        ))}
      </div>

      {/* 복합 시스템 예제 */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">복합 시스템 예제</h3>
        <p className="text-gray-600 mb-6 text-center">다양한 애니메이션이 적용된 시스템 다이어그램</p>

        <DiagramProvider>
          <div className="relative w-full h-96 bg-gray-50 rounded">
            {/* 전력 공급 */}
            <Box id="power-source" x={50} y={50} width={80} height={50} className="bg-yellow-100 border-yellow-400">
              <div className="text-sm text-center font-medium">전력 공급</div>
            </Box>

            {/* 제어 시스템 */}
            <Box id="control-system" x={250} y={50} width={100} height={50} className="bg-blue-100 border-blue-400">
              <div className="text-sm text-center font-medium">제어 시스템</div>
            </Box>

            {/* 펌프 */}
            <Box id="pump" x={250} y={150} width={100} height={50} className="bg-cyan-100 border-cyan-400">
              <div className="text-sm text-center font-medium">펌프</div>
            </Box>

            {/* 저장 탱크 */}
            <Box id="tank" x={450} y={150} width={80} height={50} className="bg-green-100 border-green-400">
              <div className="text-sm text-center font-medium">저장 탱크</div>
            </Box>

            {/* 센서 */}
            <Box id="sensor" x={450} y={50} width={80} height={50} className="bg-purple-100 border-purple-400">
              <div className="text-sm text-center font-medium">센서</div>
            </Box>

            {/* 배출구 */}
            <Box id="outlet" x={450} y={250} width={80} height={50} className="bg-gray-100 border-gray-400">
              <div className="text-sm text-center font-medium">배출구</div>
            </Box>

            {/* 전기 연결 */}
            <Connector
              fromBox={{ id: "power-source", position: "right" }}
              toBox={{ id: "control-system", position: "left" }}
              animated={isRunning}
              animationType="electric"
              animationSpeed={1.5}
              className="text-yellow-500"
              strokeWidth={3}
            />

            <Connector
              fromBox={{ id: "power-source", position: "bottom" }}
              toBox={{ id: "pump", position: "left" }}
              animated={isRunning}
              animationType="electric"
              animationSpeed={1.5}
              className="text-yellow-500"
              connectionType="orthogonal"
              strokeWidth={3}
            />

            {/* 데이터 연결 */}
            <Connector
              fromBox={{ id: "control-system", position: "right" }}
              toBox={{ id: "sensor", position: "left" }}
              animated={isRunning}
              animationType="data"
              animationSpeed={2}
              className="text-green-500"
              strokeWidth={2}
            />

            <Connector
              fromBox={{ id: "sensor", position: "left" }}
              toBox={{ id: "control-system", position: "right" }}
              animated={isRunning}
              animationType="data"
              animationSpeed={1.8}
              className="text-blue-500"
              strokeWidth={2}
              startPoint={{ x: 450, y: 65 }}
              endPoint={{ x: 350, y: 65 }}
            />

            {/* 물 흐름 */}
            <Connector
              fromBox={{ id: "pump", position: "right" }}
              toBox={{ id: "tank", position: "left" }}
              animated={isRunning}
              animationType="water"
              animationSpeed={2.5}
              className="text-blue-600"
              strokeWidth={4}
            />

            <Connector
              fromBox={{ id: "tank", position: "bottom" }}
              toBox={{ id: "outlet", position: "top" }}
              animated={isRunning}
              animationType="water"
              animationSpeed={3}
              className="text-blue-600"
              strokeWidth={4}
            />

            {/* 바람/배기 */}
            <Connector
              fromBox={{ id: "outlet", position: "right" }}
              toCustomPoint={{ x: 600, y: 275 }}
              animated={isRunning}
              animationType="wind"
              animationSpeed={1}
              className="text-gray-500"
              strokeWidth={2}
            />
          </div>
        </DiagramProvider>
      </div>

      {/* 애니메이션 설정 예제 */}
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-center">속도 조절 예제</h3>
        <p className="text-gray-600 mb-6 text-center">같은 애니메이션을 다른 속도로 표현</p>

        <DiagramProvider>
          <div className="relative w-full h-64 bg-gray-50 rounded">
            {[0.5, 1, 2, 3].map((speed, index) => (
              <div key={speed}>
                <Box
                  id={`speed-source-${index}`}
                  x={50}
                  y={50 + index * 50}
                  width={100}
                  height={30}
                  className="bg-indigo-100 border-indigo-300"
                >
                  <div className="text-xs text-center">속도 {speed}x</div>
                </Box>

                <Box
                  id={`speed-target-${index}`}
                  x={400}
                  y={50 + index * 50}
                  width={100}
                  height={30}
                  className="bg-pink-100 border-pink-300"
                >
                  <div className="text-xs text-center">타겟</div>
                </Box>

                <Connector
                  fromBox={{ id: `speed-source-${index}`, position: "right" }}
                  toBox={{ id: `speed-target-${index}`, position: "left" }}
                  animated={isRunning}
                  animationType="electric"
                  animationSpeed={speed}
                  className="text-indigo-500"
                  strokeWidth={2}
                />
              </div>
            ))}
          </div>
        </DiagramProvider>
      </div>
    </div>
  );
};

export default AnimationExamples;
