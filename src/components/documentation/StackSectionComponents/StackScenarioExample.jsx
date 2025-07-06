import CodeBlock from "./CodeBlock";

const StackScenarioExample = ({ scenario }) => {
  const getBadgeClasses = (color) => {
    const colorMap = {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
      red: "bg-red-100 text-red-700",
    };
    return colorMap[color] || "bg-gray-100 text-gray-700";
  };

  const getTitleClasses = (color) => {
    const colorMap = {
      green: "text-green-600",
      blue: "text-blue-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      red: "text-red-600",
    };
    return colorMap[color] || "text-gray-600";
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{scenario.number}</span>
        <h4 className={`font-semibold ${getTitleClasses(scenario.badge.color)}`}>{scenario.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClasses(scenario.badge.color)}`}>
          {scenario.badge.text}
        </span>
      </div>
      <CodeBlock filename={scenario.filename} code={scenario.code} />
    </div>
  );
};

export default StackScenarioExample;
