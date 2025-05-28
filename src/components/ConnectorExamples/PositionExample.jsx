import { Box, Connector } from "../DiagramComponents";
import { positionExampleBoxes } from "../../data/connectorExampleData";

const PositionExample = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-6">박스 연결 위치 예제</h3>
      <div className="relative h-80 border border-gray-200 rounded bg-gray-50">
        {/* 박스들 렌더링 */}
        {positionExampleBoxes.map((box) => (
          <Box key={box.id} {...box} />
        ))}

        {/* 연결선들 */}
        <Connector
          fromBox={{ id: "center", position: "top" }}
          toBox={{ id: "top", position: "bottom" }}
          boxes={positionExampleBoxes}
          connectionType="straight"
          className="text-red-500 hover:text-red-600 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "center", position: "right" }}
          toBox={{ id: "right", position: "left" }}
          boxes={positionExampleBoxes}
          connectionType="straight"
          className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "center", position: "bottom" }}
          toBox={{ id: "bottom", position: "top" }}
          boxes={positionExampleBoxes}
          connectionType="straight"
          className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "center", position: "left" }}
          toBox={{ id: "left", position: "right" }}
          boxes={positionExampleBoxes}
          connectionType="straight"
          className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          박스의 <code className="bg-gray-100 px-1 rounded">top</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">right</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">bottom</code>,{" "}
          <code className="bg-gray-100 px-1 rounded">left</code> 위치에서 연결됩니다.
        </p>
      </div>
    </div>
  );
};

export default PositionExample;
