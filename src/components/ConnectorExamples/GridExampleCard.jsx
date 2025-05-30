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
      <h4 className="text-lg font-semibold mb-4">{example.title}</h4>
      <DiagramProvider>
        <div className="relative h-48 border border-gray-200 rounded bg-gray-50 overflow-hidden">
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
      {example.description && <p className="mt-4 text-sm text-gray-600">{example.description}</p>}
    </div>
  );
};

export default GridExampleCard;
