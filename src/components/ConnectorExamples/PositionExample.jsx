import { useState } from "react";
import { DraggableBox, Connector, DiagramProvider } from "../DiagramComponents";

const initialBoxes = [
  {
    id: "center",
    x: 200,
    y: 150,
    width: 110,
    height: 60,
    title: "중앙 박스",
    color: "indigo",
  },
  {
    id: "top",
    x: 225,
    y: 50,
    width: 70,
    height: 50,
    title: "위",
    color: "red",
  },
  {
    id: "right",
    x: 350,
    y: 165,
    width: 70,
    height: 50,
    title: "오른쪽",
    color: "green",
  },
  {
    id: "bottom",
    x: 225,
    y: 250,
    width: 70,
    height: 50,
    title: "아래",
    color: "yellow",
  },
  {
    id: "left",
    x: 100,
    y: 165,
    width: 70,
    height: 50,
    title: "왼쪽",
    color: "purple",
  },
];

const PositionExample = () => {
  const [boxes, setBoxes] = useState(initialBoxes);

  const handleBoxDrag = (boxId, newPosition) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === boxId ? { ...box, x: newPosition.x, y: newPosition.y } : box))
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-6">박스 연결 위치 예제 (자동 감지)</h3>
      <DiagramProvider>
        <div className="relative h-80 border border-gray-200 rounded bg-gray-50">
          {/* 박스들 렌더링 - DraggableBox 사용 */}
          {boxes.map((box) => (
            <DraggableBox
              key={box.id}
              id={box.id}
              initialX={box.x}
              initialY={box.y}
              width={box.width}
              height={box.height}
              title={box.title}
              color={box.color}
              onDrag={(newPosition) => handleBoxDrag(box.id, newPosition)}
            />
          ))}

          {/* 연결선들 - 화살표 명시적 설정 */}
          <Connector
            fromBox={{ id: "center", position: "top" }}
            toBox={{ id: "top", position: "bottom" }}
            connectionType="straight"
            className="text-red-500 hover:text-red-600 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "center", position: "right" }}
            toBox={{ id: "right", position: "left" }}
            connectionType="straight"
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "center", position: "bottom" }}
            toBox={{ id: "bottom", position: "top" }}
            connectionType="straight"
            className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "center", position: "left" }}
            toBox={{ id: "left", position: "right" }}
            connectionType="straight"
            className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />
        </div>
      </DiagramProvider>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          박스의 <code className="bg-gray-100 px-1 rounded">top</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">right</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">bottom</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">left</code> 위치에서 연결됩니다.
        </p>
        <p className="text-xs text-green-600 mt-1">
          ✨ 박스들을 드래그해서 위치를 변경할 수 있습니다! 연결선이 자동으로 업데이트됩니다.
        </p>
      </div>
    </div>
  );
};

export default PositionExample;
