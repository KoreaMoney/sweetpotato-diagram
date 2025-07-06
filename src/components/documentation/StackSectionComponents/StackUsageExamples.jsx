import { usageExamples } from "./scenarioData";

const StackUsageExamples = () => {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: "text-blue-600",
      purple: "text-purple-600",
    };
    return colorMap[color] || "text-gray-600";
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-800 mb-3">📝 사용 예시</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
        {usageExamples.map((example, index) => (
          <div key={index}>
            <h4 className={`font-medium mb-2 ${getColorClasses(example.color)}`}>{example.title}:</h4>
            <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">{example.code}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackUsageExamples;
