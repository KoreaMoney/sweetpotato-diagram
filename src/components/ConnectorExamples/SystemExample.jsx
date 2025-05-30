import { Box, Connector, DiagramProvider } from "../DiagramComponents";

const systemExampleBoxes = [
  {
    id: "input",
    x: 20,
    y: 50,
    width: 70,
    height: 35,
    text: "입력",
    className:
      "bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "process1",
    x: 150,
    y: 50,
    width: 70,
    height: 35,
    text: "처리1",
    className:
      "bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "process2",
    x: 280,
    y: 50,
    width: 70,
    height: 35,
    text: "처리2",
    className:
      "bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "output",
    x: 410,
    y: 50,
    width: 70,
    height: 35,
    text: "출력",
    className:
      "bg-red-500 text-white border-red-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "control",
    x: 150,
    y: 150,
    width: 70,
    height: 35,
    text: "제어",
    className:
      "bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "monitor",
    x: 280,
    y: 150,
    width: 70,
    height: 35,
    text: "모니터",
    className:
      "bg-pink-600 text-white border-pink-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
];

const SystemExample = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-6">복잡한 시스템 예제 (자동 박스 감지)</h3>
      <DiagramProvider>
        <div className="relative h-64 border border-gray-200 rounded bg-gray-50 overflow-hidden">
          {/* 컴포넌트들 */}
          {systemExampleBoxes.map((box) => (
            <Box key={box.id} {...box} />
          ))}

          {/* 메인 플로우 - 모든 화살표 명시적 설정 */}
          <Connector
            fromBox={{ id: "input", position: "right" }}
            toBox={{ id: "process1", position: "left" }}
            connectionType="straight"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "process1", position: "right" }}
            toBox={{ id: "process2", position: "left" }}
            connectionType="straight"
            className="text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "process2", position: "right" }}
            toBox={{ id: "output", position: "left" }}
            connectionType="straight"
            className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          {/* 제어 연결 */}
          <Connector
            fromBox={{ id: "process1", position: "bottom" }}
            toBox={{ id: "control", position: "top" }}
            connectionType="straight"
            className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "control", position: "right" }}
            toBox={{ id: "monitor", position: "left" }}
            connectionType="straight"
            className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
          />

          {/* 피드백 루프 */}
          <Connector
            fromBox={{ id: "monitor", position: "top" }}
            toBox={{ id: "process2", position: "bottom" }}
            connectionType="orthogonal"
            stepOffset={20}
            className="text-pink-600 hover:text-pink-700 transition-colors duration-200"
            showArrow={true}
            strokeWidth={2}
            dashArray="4,4"
          />
        </div>
      </DiagramProvider>
      <div className="mt-4 text-sm text-gray-600">
        <p>복잡한 데이터 플로우와 피드백 루프를 보여주는 시스템 다이어그램입니다.</p>
        <p className="text-xs text-green-600 mt-1">
          ✨ 모든 연결선에 showArrow={`{true}`}가 설정되어 화살표가 표시됩니다!
        </p>
      </div>
    </div>
  );
};

export default SystemExample;
