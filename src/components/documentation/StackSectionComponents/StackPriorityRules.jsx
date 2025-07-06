import { priorityRules } from "./scenarioData";

const StackPriorityRules = () => {
  const getColorClasses = (color) => {
    const colorMap = {
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      gray: "bg-gray-500",
    };
    return colorMap[color] || "bg-gray-500";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-l-4 border-blue-500 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📋</span>
        <h4 className="font-bold text-blue-800 text-lg">우선순위 적용 규칙</h4>
      </div>
      <div className="space-y-3">
        {priorityRules.map((rule, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <span
              className={`flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm ${getColorClasses(
                rule.color
              )}`}
            >
              {rule.priority}
            </span>
            <div>
              <span className="font-semibold text-gray-800">{rule.title}:</span>
              <span className="text-gray-600 ml-2">
                {rule.code ? (
                  <>
                    <code className="bg-gray-100 px-1 rounded">{rule.code}</code> prop ({rule.description})
                  </>
                ) : (
                  rule.description
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2">
          <span className="text-yellow-600">⚠️</span>
          <span className="text-sm text-yellow-800">
            <code className="bg-yellow-100 px-1 rounded">maintainPriority={"{true}"}</code>인 경우 클릭해도 동적
            z-index가 적용되지 않습니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default StackPriorityRules;
