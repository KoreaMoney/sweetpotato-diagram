import { Box, Connector, DiagramProvider } from "../DiagramComponents";

const LivePreview = ({ parsedComponents }) => {
  const { boxes, connectors } = parsedComponents;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">실시간 미리보기 (자동 박스 감지)</h3>
      <DiagramProvider>
        <div className="relative h-64 border border-gray-200 rounded bg-gray-50 overflow-hidden">
          {/* 파싱된 Box 컴포넌트들 렌더링 */}
          {boxes.map((boxProps) => {
            const safeBoxProps = {
              ...boxProps,
              x: typeof boxProps.x === "number" ? boxProps.x : 50,
              y: typeof boxProps.y === "number" ? boxProps.y : 50,
              width: typeof boxProps.width === "number" ? boxProps.width : 80,
              height: typeof boxProps.height === "number" ? boxProps.height : 30,
              text: typeof boxProps.text === "string" ? boxProps.text : "Box",
              id: typeof boxProps.id === "string" ? boxProps.id : `box-${Math.random()}`,
              className:
                typeof boxProps.className === "string"
                  ? boxProps.className
                  : "bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-sm",
            };

            return <Box key={safeBoxProps.id} {...safeBoxProps} />;
          })}

          {/* 파싱된 Connector 컴포넌트들 렌더링 */}
          {connectors.map((connectorProps) => {
            const safeProps = {
              ...connectorProps,
              id: connectorProps.id || `connector-${Math.random()}`,
              fromBox: connectorProps.fromBox || null,
              toBox: connectorProps.toBox || null,
              connectionType: connectorProps.connectionType || "straight",
              showArrow: connectorProps.showArrow !== false,
              strokeWidth: connectorProps.strokeWidth || 2,
              className: connectorProps.className || "text-blue-600",
              bendPoints: Array.isArray(connectorProps.bendPoints) ? connectorProps.bendPoints : [],
            };

            return <Connector key={safeProps.id} {...safeProps} />;
          })}
        </div>
      </DiagramProvider>
      <div className="mt-4 text-sm text-gray-600">
        <p>JSX 코드 변경사항이 여기에 실시간으로 반영됩니다.</p>
        <p className="text-xs text-green-600 mt-1">
          ✨ 새로운 방식: fromBox, toBox만 사용하세요! 화살표가 자동으로 표시됩니다.
        </p>
      </div>
    </div>
  );
};

export default LivePreview;
