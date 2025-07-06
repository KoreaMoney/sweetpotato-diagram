const SystemFeatureCard = ({ featureData, gradientColors = "from-blue-50 to-purple-50" }) => {
  if (!featureData || !featureData.sections) return null;

  return (
    <div className={`mt-6 bg-gradient-to-r ${gradientColors} p-6 rounded-lg border border-blue-200`}>
      <h4 className="text-lg font-bold text-blue-800 mb-3">{featureData.title}</h4>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        {featureData.sections.map((section, index) => (
          <div key={index}>
            <h5 className="font-semibold text-blue-700 mb-2">{section.title}</h5>
            <ul className="text-blue-600 space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemFeatureCard;
