import { Box, Connector } from "../DiagramComponents";

const GridExampleCard = ({ example }) => {
  const { title, boxes, connector, description } = example;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative h-32 border border-gray-200 rounded bg-gray-50">
        {/* 박스들 렌더링 */}
        {boxes.map((box) => (
          <Box key={box.id} {...box} />
        ))}

        {/* 커넥터 렌더링 */}
        <Connector {...connector} boxes={boxes} />
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <code className="bg-gray-100 px-2 py-1 rounded">{description}</code>
      </div>
    </div>
  );
};

export default GridExampleCard;
