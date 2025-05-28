import { Box, Connector } from "../DiagramComponents";
import { systemExampleBoxes } from "../../data/connectorExampleData";

const SystemExample = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-6">7. 복잡한 시스템 예제 (박스 연결 방식)</h3>
      <div className="relative h-64 border border-gray-200 rounded bg-gray-50 overflow-hidden">
        {/* 컴포넌트들 */}
        {systemExampleBoxes.map((box) => (
          <Box key={box.id} {...box} />
        ))}

        {/* 메인 플로우 */}
        <Connector
          fromBox={{ id: "input", position: "right" }}
          toBox={{ id: "process1", position: "left" }}
          boxes={systemExampleBoxes}
          connectionType="straight"
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "process1", position: "right" }}
          toBox={{ id: "process2", position: "left" }}
          boxes={systemExampleBoxes}
          connectionType="straight"
          className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "process2", position: "right" }}
          toBox={{ id: "output", position: "left" }}
          boxes={systemExampleBoxes}
          connectionType="straight"
          className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        {/* 제어 연결 */}
        <Connector
          fromBox={{ id: "process1", position: "bottom" }}
          toBox={{ id: "control", position: "top" }}
          boxes={systemExampleBoxes}
          connectionType="straight"
          className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        <Connector
          fromBox={{ id: "control", position: "right" }}
          toBox={{ id: "monitor", position: "left" }}
          boxes={systemExampleBoxes}
          connectionType="straight"
          className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
        />

        {/* 피드백 루프 */}
        <Connector
          fromBox={{ id: "monitor", position: "top" }}
          toBox={{ id: "process2", position: "bottom" }}
          boxes={systemExampleBoxes}
          connectionType="orthogonal"
          stepOffset={20}
          className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
          showArrow={true}
          strokeWidth={2}
          dashArray="4,4"
        />
      </div>
    </div>
  );
};

export default SystemExample;
