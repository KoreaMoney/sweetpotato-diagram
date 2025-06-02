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
