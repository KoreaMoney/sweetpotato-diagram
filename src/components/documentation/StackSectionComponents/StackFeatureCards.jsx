import { featureCards } from "./scenarioData";

const StackFeatureCards = () => {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-500 text-blue-800",
      green: "bg-green-50 border-green-500 text-green-800",
    };
    return colorMap[color] || "bg-gray-50 border-gray-500 text-gray-800";
  };

  const getTextColorClasses = (color) => {
    const colorMap = {
      blue: "text-blue-700",
      green: "text-green-700",
    };
    return colorMap[color] || "text-gray-700";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {featureCards.map((card, index) => (
        <div key={index} className={`p-4 rounded-lg border-l-4 ${getColorClasses(card.color)}`}>
          <h3 className="font-semibold mb-2">{card.title}</h3>
          <ul className={`text-sm space-y-1 ${getTextColorClasses(card.color)}`}>
            {card.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    <code className="bg-white px-1 rounded">{item.code}</code>: {item.description}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StackFeatureCards;
