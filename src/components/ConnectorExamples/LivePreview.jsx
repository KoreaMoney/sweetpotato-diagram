import { Box, Connector } from "../DiagramComponents";

const LivePreview = ({ parsedComponents }) => {
  const { boxes, connectors } = parsedComponents;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">실시간 미리보기</h3>
      <div className="relative h-64 border border-gray-200 rounded bg-gray-50 overflow-hidden">
        {/* 파싱된 Box 컴포넌트들 렌더링 */}
        {boxes.map((boxProps) => {
          // props 안전성 검사
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
                : "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
          };

          return <Box key={safeBoxProps.id} {...safeBoxProps} />;
        })}

        {/* 파싱된 Connector 컴포넌트들 렌더링 */}
        {connectors.map((connectorProps) => {
          console.log("Rendering connector:", connectorProps.id, {
            fromBox: connectorProps.fromBox,
            toBox: connectorProps.toBox,
            boxesAvailable: connectorProps.boxes.length,
            boxes: connectorProps.boxes.map((b) => ({ id: b.id, x: b.x, y: b.y })),
          });

          // props 안전성 검사
          const safeProps = {
            ...connectorProps,
            startPoint:
              connectorProps.startPoint && typeof connectorProps.startPoint === "object"
                ? connectorProps.startPoint
                : null,
            endPoint:
              connectorProps.endPoint && typeof connectorProps.endPoint === "object" ? connectorProps.endPoint : null,
            fromBox:
              connectorProps.fromBox && typeof connectorProps.fromBox === "object" ? connectorProps.fromBox : null,
            toBox: connectorProps.toBox && typeof connectorProps.toBox === "object" ? connectorProps.toBox : null,
            boxes: connectorProps.boxes,
            bendPoints: Array.isArray(connectorProps.bendPoints) ? connectorProps.bendPoints : [],
          };

          console.log("Safe props for connector:", safeProps.id, {
            hasFromBox: !!safeProps.fromBox,
            hasToBox: !!safeProps.toBox,
            boxesCount: safeProps.boxes.length,
          });

          return <Connector key={connectorProps.id} {...safeProps} />;
        })}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>JSX 코드 변경사항이 여기에 실시간으로 반영됩니다.</p>
        <p className="text-xs text-gray-500 mt-1">박스 연결 방식: fromBox, toBox, boxes 속성을 사용하세요.</p>
      </div>
    </div>
  );
};

export default LivePreview;
