import React from "react";
import Box from "../../components/DiagramComponents/Box";
import DraggableBox from "../../components/DiagramComponents/DraggableBox";
import Triangle from "../../components/DiagramComponents/Triangle";
import Valve from "../../components/DiagramComponents/Valve";
import ImageBox from "../../components/DiagramComponents/ImageBox";
import Connector from "../../components/DiagramComponents/Connector";

const ComponentTest = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Component Test</h2>
        <p className="text-gray-600">Test component positioning and functionality</p>
      </div>

      <div className="h-96 relative bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden mb-6">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ddd 1px, transparent 1px),
              linear-gradient(to bottom, #ddd 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Grid info */}
        <div className="absolute top-2 left-2 text-xs text-gray-500 z-30 bg-white px-2 py-1 rounded">
          Grid: 50px spacing
        </div>

        {/* Test components */}
        <Box
          id="test-box-1"
          x={50}
          y={50}
          width={100}
          height={40}
          text="(50,50)"
          className="bg-blue-500 text-white border-blue-600 border-2 rounded"
        />

        <Box
          id="test-box-2"
          x={200}
          y={80}
          width={120}
          height={60}
          text="(200,80)"
          className="bg-green-500 text-white border-green-600 border-2 rounded"
        />

        <Box
          id="test-box-3"
          x={350}
          y={50}
          width={80}
          height={30}
          text="(350,50)"
          className="bg-red-500 text-white border-red-600 border-2 rounded"
        />

        <Box
          id="test-box-4"
          x={100}
          y={200}
          width={90}
          height={50}
          text="(100,200)"
          className="bg-purple-500 text-white border-purple-600 border-2 rounded"
        />

        <Box
          id="test-box-5"
          x={300}
          y={250}
          width={110}
          height={45}
          text="(300,250)"
          className="bg-yellow-500 text-black border-yellow-600 border-2 rounded"
        />

        {/* Draggable box */}
        <DraggableBox
          id="drag-test"
          initialX={500}
          initialY={150}
          width={140}
          height={70}
          title="Draggable"
          color="indigo"
        />

        {/* Other components */}
        <Triangle x={50} y={300} size={40} direction="up" />
        <Valve x={150} y={300} size={50} type="ball" isOpen={true} />
        <ImageBox id="img-test" x={250} y={300} width={80} height={60} text="Image" icon="⚙️" iconType="emoji" />

        {/* 기존 Connector examples */}
        <Connector
          fromBox={{ id: "test-box-1", position: "right" }}
          toBox={{ id: "test-box-2", position: "left" }}
          connectionType="straight"
          arrowDirection="forward"
          className="stroke-blue-500"
        />

        {/* 새로운 자유 포인트 연결 예시들 */}

        {/* 1. 절대 좌표 자유 포인트 연결 */}
        <Connector
          fromCustomPoint={{ x: 175, y: 70 }}
          toCustomPoint={{ x: 280, y: 120 }}
          connectionType="curved"
          arrowDirection="forward"
          className="stroke-green-500"
          strokeWidth={3}
        />

        {/* 2. 박스 내부 자유 위치 연결 (상대 좌표) */}
        <Connector
          fromBoxCustom={{
            id: "test-box-2",
            customPoint: { x: 0.8, y: 0.8 }, // 박스 우측 하단
          }}
          toBoxCustom={{
            id: "test-box-3",
            customPoint: { x: 0.2, y: 0.2 }, // 박스 좌측 상단
          }}
          connectionType="orthogonal"
          arrowDirection="forward"
          className="stroke-red-500"
          strokeWidth={2}
        />

        {/* 3. 혼합 연결 (기존 박스 + 자유 포인트) */}
        <Connector
          fromBox={{ id: "test-box-4", position: "top" }}
          toCustomPoint={{ x: 380, y: 180 }}
          connectionType="stepped"
          arrowDirection="forward"
          className="stroke-purple-500"
          strokeWidth={2}
        />

        {/* 4. 박스 자유 위치에서 절대 좌표로 */}
        <Connector
          fromBoxCustom={{
            id: "test-box-5",
            customPoint: { x: 0.1, y: 0.5 }, // 박스 좌측 중앙
          }}
          toCustomPoint={{ x: 450, y: 200 }}
          connectionType="curved"
          arrowDirection="both"
          className="stroke-yellow-600"
          strokeWidth={3}
          arrowSize={10}
        />

        {/* 5. 다양한 박스 내부 위치 연결 */}
        <Connector
          fromBoxCustom={{
            id: "test-box-1",
            customPoint: { x: 0.5, y: 1.0 }, // 박스 하단 중앙
          }}
          toBoxCustom={{
            id: "test-box-4",
            customPoint: { x: 0.5, y: 0.0 }, // 박스 상단 중앙
          }}
          connectionType="straight"
          arrowDirection="forward"
          className="stroke-indigo-500"
          strokeWidth={2}
        />
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="font-semibold mb-2">자유 포인트 연결 테스트:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            ✅ <span className="text-blue-500">파란색 선</span>: 기존 박스 연결 (중점 to 중점)
          </p>
          <p>
            ✅ <span className="text-green-500">초록색 선</span>: 절대 좌표 자유 포인트 연결
          </p>
          <p>
            ✅ <span className="text-red-500">빨간색 선</span>: 박스 내부 자유 위치 연결 (상대 좌표)
          </p>
          <p>
            ✅ <span className="text-purple-500">보라색 선</span>: 혼합 연결 (박스 position + 자유 포인트)
          </p>
          <p>
            ✅ <span className="text-yellow-600">노란색 선</span>: 박스 자유 위치 + 절대 좌표 (양방향 화살표)
          </p>
          <p>
            ✅ <span className="text-indigo-500">인디고 선</span>: 박스 내부 상하 연결
          </p>
        </div>
        <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
          <p>
            <strong>새로운 기능:</strong> 이제 박스의 중점이 아닌 자유로운 위치에서 연결선을 그을 수 있습니다!
          </p>
          <p>
            <strong>상대 좌표:</strong> 0.0 = 좌측/상단, 0.5 = 중앙, 1.0 = 우측/하단
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentTest;
