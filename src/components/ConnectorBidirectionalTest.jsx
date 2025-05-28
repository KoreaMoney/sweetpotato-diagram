import React from "react";
import { Box, Connector } from "./DiagramComponents";

const ConnectorBidirectionalTest = () => {
  const boxes = [
    { id: "server", x: 50, y: 50, width: 100, height: 40 },
    { id: "client", x: 250, y: 50, width: 100, height: 40 },
    { id: "controller", x: 50, y: 150, width: 100, height: 40 },
    { id: "sensor", x: 250, y: 150, width: 100, height: 40 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🔗 Connector 양방향 화살표 테스트</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">양방향 통신 예제</h2>
        <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50">
          {/* 서버-클라이언트 양방향 통신 */}
          <Box
            id="server"
            x={50}
            y={50}
            width={100}
            height={40}
            text="서버"
            className="bg-blue-600 text-white border-blue-800 border-2 rounded-lg"
          />
          <Box
            id="client"
            x={250}
            y={50}
            width={100}
            height={40}
            text="클라이언트"
            className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg"
          />

          {/* 양방향 화살표 연결 */}
          <Connector
            fromBox={{ id: "server", position: "right" }}
            toBox={{ id: "client", position: "left" }}
            boxes={boxes}
            connectionType="straight"
            className="text-purple-600"
            showArrow={true}
            showStartArrow={true}
            strokeWidth={3}
            animated={true}
          />

          {/* 제어기-센서 피드백 루프 */}
          <Box
            id="controller"
            x={50}
            y={150}
            width={100}
            height={40}
            text="제어기"
            className="bg-amber-600 text-white border-amber-800 border-2 rounded-lg"
          />
          <Box
            id="sensor"
            x={250}
            y={150}
            width={100}
            height={40}
            text="센서"
            className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg"
          />

          {/* 피드백 루프 연결 */}
          <Connector
            fromBox={{ id: "controller", position: "right" }}
            toBox={{ id: "sensor", position: "left" }}
            boxes={boxes}
            connectionType="orthogonal"
            className="text-red-600"
            showArrow={true}
            showStartArrow={true}
            strokeWidth={2}
          />

          {/* 라벨 */}
          <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
            💡 양방향 화살표 테스트 - showStartArrow={true}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">단방향 vs 양방향 비교</h2>
        <div className="relative w-full h-32 border border-gray-200 rounded bg-gray-50">
          <Box
            id="box-a"
            x={50}
            y={50}
            width={80}
            height={30}
            text="A"
            className="bg-gray-600 text-white border-gray-800 border-2 rounded"
          />
          <Box
            id="box-b"
            x={200}
            y={50}
            width={80}
            height={30}
            text="B"
            className="bg-gray-600 text-white border-gray-800 border-2 rounded"
          />
          <Box
            id="box-c"
            x={350}
            y={50}
            width={80}
            height={30}
            text="C"
            className="bg-gray-600 text-white border-gray-800 border-2 rounded"
          />

          {/* 단방향 화살표 */}
          <Connector
            fromBox={{ id: "box-a", position: "right" }}
            toBox={{ id: "box-b", position: "left" }}
            boxes={[
              { id: "box-a", x: 50, y: 50, width: 80, height: 30 },
              { id: "box-b", x: 200, y: 50, width: 80, height: 30 },
              { id: "box-c", x: 350, y: 50, width: 80, height: 30 },
            ]}
            connectionType="straight"
            className="text-gray-600"
            showArrow={true}
            showStartArrow={false}
            strokeWidth={2}
          />

          {/* 양방향 화살표 */}
          <Connector
            fromBox={{ id: "box-b", position: "right" }}
            toBox={{ id: "box-c", position: "left" }}
            boxes={[
              { id: "box-a", x: 50, y: 50, width: 80, height: 30 },
              { id: "box-b", x: 200, y: 50, width: 80, height: 30 },
              { id: "box-c", x: 350, y: 50, width: 80, height: 30 },
            ]}
            connectionType="straight"
            className="text-green-600"
            showArrow={true}
            showStartArrow={true}
            strokeWidth={2}
          />

          {/* 라벨 */}
          <div className="absolute left-[140px] top-[25px]">
            <span className="text-xs text-gray-600 font-medium">단방향 →</span>
          </div>
          <div className="absolute left-[290px] top-[25px]">
            <span className="text-xs text-green-600 font-medium">양방향 ↔</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="font-medium text-blue-800 mb-2">🎯 테스트 결과</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <strong>showStartArrow={true}</strong>: 시작점과 끝점 모두에 화살표 표시
          </li>
          <li>
            • <strong>showStartArrow={false}</strong>: 끝점에만 화살표 표시 (기본값)
          </li>
          <li>• 양방향 화살표는 피드백 루프, 상호 통신 등을 표현할 때 유용</li>
          <li>• 애니메이션과 함께 사용하면 데이터 흐름을 더 명확하게 시각화</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectorBidirectionalTest;
