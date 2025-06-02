import { Box, Connector, DiagramProvider } from "../DiagramComponents";

const GridExampleCard = ({ example }) => {
  if (!example || !example.boxes) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold mb-4">예제를 불러올 수 없습니다</h4>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold mb-4 text-gray-800 leading-relaxed">{example.title}</h4>
      <DiagramProvider>
        <div className="relative h-56 border border-gray-200 rounded bg-gray-50 overflow-hidden mb-4">
          {/* 박스들 렌더링 */}
          {example.boxes.map((box) => (
            <Box key={box.id} {...box} />
          ))}

          {/* 연결선 렌더링 - connector (단수형) 사용 */}
          {example.connector && (
            <Connector
              key={`${example.connector.fromBox.id}-${example.connector.toBox.id}`}
              {...example.connector}
              showArrow={true}
            />
          )}
        </div>
      </DiagramProvider>
      {example.description && (
        <div className="bg-gray-100 p-3 rounded text-sm text-gray-700 font-mono">
          <code className="break-words">{example.description}</code>
        </div>
      )}
    </div>
  );
};

export default GridExampleCard;
