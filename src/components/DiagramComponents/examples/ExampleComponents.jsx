/**
 * Connector 예제 컴포넌트들
 */

import React from "react";
import Box from "../Box";
import Connector from "../Connector";

// 기본 연결 예제
export const BasicExample = () => (
  <>
    <Box
      id="box1"
      x={100}
      y={200}
      width={140}
      height={90}
      text="Start Box"
      className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="box2"
      x={400}
      y={200}
      width={140}
      height={90}
      text="End Box"
      className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "box1", position: "right" }}
      toBox={{ id: "box2", position: "left" }}
      connectionType="straight"
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-[#0066ff] hover:stroke-[#0052cc] transition-all duration-300"
    />
  </>
);

// 곡선 연결 예제
export const CurvedExample = ({ isAnimated }) => (
  <>
    <Box
      id="box1"
      x={200}
      y={150}
      width={140}
      height={90}
      text="Start Point"
      className="bg-black text-white border-gray-800 border-2 rounded-lg"
    />
    <Box
      id="box2"
      x={400}
      y={350}
      width={140}
      height={90}
      text="End Point"
      className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "box1", position: "right" }}
      toBox={{ id: "box2", position: "top" }}
      connectionType="curved"
      arrowDirection="forward"
      strokeWidth={4}
      className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
      animated={isAnimated}
    />
  </>
);

// 직교 연결 예제
export const OrthogonalExample = () => (
  <>
    <Box
      id="box1"
      x={100}
      y={150}
      width={140}
      height={90}
      text="Start"
      className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="box2"
      x={400}
      y={320}
      width={140}
      height={90}
      text="End"
      className="bg-gray-200 text-black border-gray-300 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "box1", position: "right" }}
      toBox={{ id: "box2", position: "left" }}
      connectionType="orthogonal"
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
      orthogonalDirection="horizontal-first"
    />
  </>
);

// 다중 연결 예제
export const MultiConnectionExample = ({ isAnimated }) => (
  <>
    <Box
      id="center"
      x={480}
      y={220}
      width={150}
      height={90}
      text="Center"
      className="bg-black text-white border-gray-800 border-2 rounded-lg"
    />
    <Box
      id="box1"
      x={500}
      y={100}
      width={120}
      height={70}
      text="Top"
      className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="box2"
      x={700}
      y={220}
      width={120}
      height={70}
      text="Right"
      className="bg-gray-200 text-black border-gray-300 border-2 rounded-lg"
    />
    <Box
      id="box3"
      x={500}
      y={380}
      width={120}
      height={70}
      text="Bottom"
      className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="box4"
      x={250}
      y={220}
      width={120}
      height={70}
      text="Left"
      className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "center", position: "top" }}
      toBox={{ id: "box1", position: "bottom" }}
      connectionType="curved"
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
      animated={isAnimated}
    />
    <Connector
      fromBox={{ id: "center", position: "right" }}
      toBox={{ id: "box2", position: "left" }}
      connectionType="straight"
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
    />
    <Connector
      fromBox={{ id: "center", position: "bottom" }}
      toBox={{ id: "box3", position: "top" }}
      connectionType="orthogonal"
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
      orthogonalDirection="vertical-first"
      animated={isAnimated}
    />
    <Connector
      fromBox={{ id: "center", position: "left" }}
      toBox={{ id: "box4", position: "right" }}
      connectionType="custom"
      bendPoints={[
        { x: 450, y: 265 }, // center 왼쪽에서 조금 더 왼쪽으로
        { x: 420, y: 265 }, // 더 왼쪽으로 이동
        { x: 420, y: 180 }, // 위로 올라가기
        { x: 330, y: 180 }, // box4 위쪽으로 이동
        { x: 330, y: 255 }, // box4 연결점 높이로 내려가기
        { x: 370, y: 255 }, // box4의 right 연결점 (250 + 120 = 370, 220 + 35 = 255)
      ]}
      arrowDirection="forward"
      strokeWidth={3}
      className="stroke-purple-600 hover:stroke-purple-800 transition-all duration-300"
      animated={isAnimated}
    />
  </>
);

// 자유 포인트 연결 예제
export const FreePointExample = ({ isAnimated }) => (
  <>
    <Box
      id="box1"
      x={120}
      y={100}
      width={140}
      height={80}
      text="Box 1"
      className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="box2"
      x={480}
      y={150}
      width={140}
      height={80}
      text="Box 2"
      className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
    />
    <Box
      id="box3"
      x={300}
      y={300}
      width={140}
      height={80}
      text="Box 3"
      className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
    />

    {/* 1. 절대 좌표 자유 포인트 연결 */}
    <Connector
      fromCustomPoint={{ x: 200, y: 120 }}
      toCustomPoint={{ x: 420, y: 170 }}
      connectionType="curved"
      arrowDirection="forward"
      className="stroke-orange-500 fill-orange-500"
      strokeWidth={3}
      animated={isAnimated}
      arrowColor="#f97316"
    />

    {/* 2. 박스 내부 자유 위치 연결 (상대 좌표) */}
    <Connector
      fromBoxCustom={{
        id: "box1",
        customPoint: { x: 0.8, y: 0.8 }, // 박스 우측 하단
      }}
      toBoxCustom={{
        id: "box2",
        customPoint: { x: 0.2, y: 0.2 }, // 박스 좌측 상단
      }}
      connectionType="orthogonal"
      arrowDirection="forward"
      className="stroke-red-500 fill-red-500"
      strokeWidth={2}
      animated={isAnimated}
      arrowColor="#ef4444"
    />

    {/* 3. 혼합 연결 (박스 position + 자유 포인트) */}
    <Connector
      fromBox={{ id: "box2", position: "bottom" }}
      toCustomPoint={{ x: 370, y: 270 }}
      connectionType="stepped"
      arrowDirection="forward"
      className="stroke-blue-600 fill-blue-600"
      strokeWidth={2}
      animated={isAnimated}
      arrowColor="#2563eb"
    />

    {/* 4. 박스 자유 위치에서 절대 좌표로 (양방향 화살표) */}
    <Connector
      fromBoxCustom={{
        id: "box3",
        customPoint: { x: 0.1, y: 0.5 }, // 박스 좌측 중앙
      }}
      toCustomPoint={{ x: 180, y: 250 }}
      connectionType="curved"
      arrowDirection="both"
      className="stroke-purple-600 fill-purple-600"
      strokeWidth={3}
      arrowSize={12}
      animated={isAnimated}
      arrowColor="#9333ea"
    />

    {/* 5. 박스 내부 상하 연결 */}
    <Connector
      fromBoxCustom={{
        id: "box1",
        customPoint: { x: 0.5, y: 1.0 }, // 박스 하단 중앙
      }}
      toBoxCustom={{
        id: "box3",
        customPoint: { x: 0.5, y: 0.0 }, // 박스 상단 중앙
      }}
      connectionType="straight"
      arrowDirection="forward"
      className="stroke-indigo-500 fill-indigo-500"
      strokeWidth={2}
      animated={isAnimated}
      arrowColor="#6366f1"
    />

    {/* 설명 텍스트 - 화면 하단 중앙에 위치 */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg border text-sm max-w-lg">
      <h4 className="font-semibold mb-3 text-center">🎯 자유 포인트 연결 예시</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2 flex-shrink-0"></span>
          <span>절대 좌표 자유 포인트</span>
        </p>
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
          <span>박스 내부 자유 위치</span>
        </p>
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
          <span>혼합 연결</span>
        </p>
        <p className="flex items-center">
          <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2 flex-shrink-0"></span>
          <span>양방향 화살표</span>
        </p>
        <p className="md:col-span-2 text-center flex items-center justify-center">
          <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-2 flex-shrink-0"></span>
          <span>박스 상하 연결</span>
        </p>
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">
        상대 좌표: 0.0 = 좌측/상단, 0.5 = 중앙, 1.0 = 우측/하단
      </div>
    </div>
  </>
);

// 커스텀 예제 컴포넌트
export const CustomExample = ({ elements, isAnimated }) => {
  if (!elements || elements.length === 0) {
    return null;
  }

  return (
    <>
      {elements.map((element, index) => {
        if (element.type === "Box") {
          return <Box key={`box-${index}`} {...element.props} />;
        } else if (element.type === "Connector") {
          // showArrow prop을 arrowDirection prop으로 변환
          const props = { ...element.props };
          if (Object.prototype.hasOwnProperty.call(props, "showArrow")) {
            props.arrowDirection = props.showArrow ? "forward" : "none";
            delete props.showArrow;
          }
          return <Connector key={`connector-${index}`} {...props} animated={isAnimated} />;
        }
        return null;
      })}
    </>
  );
};

// 전기 애니메이션 예제
export const ElectricAnimationExample = ({ isAnimated }) => (
  <>
    <Box
      id="powerSource"
      x={100}
      y={200}
      width={120}
      height={80}
      text="전원"
      className="bg-yellow-400 text-black border-yellow-500 border-2 rounded-lg"
    />
    <Box
      id="motor"
      x={400}
      y={200}
      width={120}
      height={80}
      text="모터"
      className="bg-blue-600 text-white border-blue-700 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "powerSource", position: "right" }}
      toBox={{ id: "motor", position: "left" }}
      animated={isAnimated}
      animationType="electric"
      animationSpeed={1.5}
      connectionType="straight"
      className="text-blue-500"
      strokeWidth={4}
      arrowSize={12}
    />
  </>
);

// 물 흐름 애니메이션 예제
export const WaterAnimationExample = ({ isAnimated }) => (
  <>
    <Box
      id="tank"
      x={100}
      y={150}
      width={120}
      height={100}
      text="저장탱크"
      className="bg-blue-100 text-blue-800 border-blue-300 border-2 rounded-lg"
    />
    <Box
      id="pump"
      x={300}
      y={200}
      width={100}
      height={80}
      text="펌프"
      className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
    />
    <Box
      id="outlet"
      x={500}
      y={150}
      width={120}
      height={100}
      text="출구"
      className="bg-blue-200 text-blue-800 border-blue-400 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "tank", position: "right" }}
      toBox={{ id: "pump", position: "left" }}
      animated={isAnimated}
      animationType="water"
      animationSpeed={2}
      connectionType="curved"
      className="text-blue-600"
      strokeWidth={5}
    />
    <Connector
      fromBox={{ id: "pump", position: "right" }}
      toBox={{ id: "outlet", position: "left" }}
      animated={isAnimated}
      animationType="water"
      animationSpeed={1.8}
      connectionType="straight"
      className="text-blue-600"
      strokeWidth={5}
    />
  </>
);

// 바람 흐름 애니메이션 예제
export const WindAnimationExample = ({ isAnimated }) => (
  <>
    <Box
      id="fan"
      x={100}
      y={200}
      width={120}
      height={80}
      text="팬"
      className="bg-gray-300 text-gray-800 border-gray-400 border-2 rounded-lg"
    />
    <Box
      id="vent"
      x={400}
      y={150}
      width={120}
      height={60}
      text="통풍구"
      className="bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg"
    />
    <Box
      id="outlet"
      x={400}
      y={250}
      width={120}
      height={60}
      text="배출구"
      className="bg-gray-200 text-gray-700 border-gray-400 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "fan", position: "right" }}
      toBox={{ id: "vent", position: "left" }}
      animated={isAnimated}
      animationType="wind"
      animationSpeed={0.8}
      connectionType="curved"
      className="text-gray-500"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "fan", position: "right" }}
      toBox={{ id: "outlet", position: "left" }}
      animated={isAnimated}
      animationType="wind"
      animationSpeed={1.2}
      connectionType="curved"
      className="text-gray-400"
      strokeWidth={2}
    />
  </>
);

// 가스 흐름 애니메이션 예제
export const GasAnimationExample = ({ isAnimated }) => (
  <>
    <Box
      id="gasSource"
      x={100}
      y={200}
      width={120}
      height={80}
      text="가스공급"
      className="bg-yellow-100 text-yellow-800 border-yellow-300 border-2 rounded-lg"
    />
    <Box
      id="valve"
      x={300}
      y={200}
      width={80}
      height={80}
      text="밸브"
      className="bg-orange-400 text-white border-orange-500 border-2 rounded-lg"
    />
    <Box
      id="burner"
      x={450}
      y={200}
      width={120}
      height={80}
      text="버너"
      className="bg-red-500 text-white border-red-600 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "gasSource", position: "right" }}
      toBox={{ id: "valve", position: "left" }}
      animated={isAnimated}
      animationType="gas"
      animationSpeed={2}
      connectionType="straight"
      className="text-yellow-600"
      strokeWidth={4}
    />
    <Connector
      fromBox={{ id: "valve", position: "right" }}
      toBox={{ id: "burner", position: "left" }}
      animated={isAnimated}
      animationType="gas"
      animationSpeed={1.5}
      connectionType="straight"
      className="text-orange-500"
      strokeWidth={4}
    />
  </>
);

// 데이터 전송 애니메이션 예제
export const DataAnimationExample = ({ isAnimated }) => (
  <>
    <Box
      id="server"
      x={100}
      y={200}
      width={120}
      height={80}
      text="서버"
      className="bg-green-600 text-white border-green-700 border-2 rounded-lg"
    />
    <Box
      id="router"
      x={300}
      y={200}
      width={100}
      height={80}
      text="라우터"
      className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="client"
      x={480}
      y={200}
      width={120}
      height={80}
      text="클라이언트"
      className="bg-purple-600 text-white border-purple-700 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "server", position: "right" }}
      toBox={{ id: "router", position: "left" }}
      animated={isAnimated}
      animationType="data"
      animationSpeed={1}
      connectionType="straight"
      className="text-green-500"
      strokeWidth={3}
      arrowDirection="both"
    />
    <Connector
      fromBox={{ id: "router", position: "right" }}
      toBox={{ id: "client", position: "left" }}
      animated={isAnimated}
      animationType="data"
      animationSpeed={1.2}
      connectionType="straight"
      className="text-blue-500"
      strokeWidth={3}
      arrowDirection="both"
    />
  </>
);

// 애니메이션 비교 예제
export const AnimationComparisonExample = ({ isAnimated }) => (
  <>
    <Box
      id="source"
      x={50}
      y={250}
      width={100}
      height={60}
      text="공통 소스"
      className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg"
    />
    <Box
      id="electric"
      x={300}
      y={50}
      width={100}
      height={50}
      text="전기"
      className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
    />
    <Box
      id="water"
      x={300}
      y={130}
      width={100}
      height={50}
      text="물"
      className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
    />
    <Box
      id="wind"
      x={300}
      y={210}
      width={100}
      height={50}
      text="바람"
      className="bg-gray-400 text-white border-gray-500 border-2 rounded-lg"
    />
    <Box
      id="gas"
      x={300}
      y={290}
      width={100}
      height={50}
      text="가스"
      className="bg-yellow-500 text-black border-yellow-600 border-2 rounded-lg"
    />
    <Box
      id="data"
      x={300}
      y={370}
      width={100}
      height={50}
      text="데이터"
      className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
    />
    <Box
      id="dash"
      x={300}
      y={450}
      width={100}
      height={50}
      text="대시"
      className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "electric", position: "left" }}
      animated={isAnimated}
      animationType="electric"
      animationSpeed={1.5}
      connectionType="orthogonal"
      className="text-blue-500"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "water", position: "left" }}
      animated={isAnimated}
      animationType="water"
      animationSpeed={2}
      connectionType="orthogonal"
      className="text-cyan-600"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "wind", position: "left" }}
      animated={isAnimated}
      animationType="wind"
      animationSpeed={0.8}
      connectionType="straight"
      className="text-gray-500"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "gas", position: "left" }}
      animated={isAnimated}
      animationType="gas"
      animationSpeed={1.8}
      connectionType="orthogonal"
      className="text-yellow-600"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "data", position: "left" }}
      animated={isAnimated}
      animationType="data"
      animationSpeed={1}
      connectionType="orthogonal"
      className="text-green-500"
      strokeWidth={3}
    />
    <Connector
      fromBox={{ id: "source", position: "right" }}
      toBox={{ id: "dash", position: "left" }}
      animated={isAnimated}
      animationType="dash"
      animationSpeed={2}
      connectionType="orthogonal"
      className="text-purple-500"
      strokeWidth={3}
    />
  </>
);
