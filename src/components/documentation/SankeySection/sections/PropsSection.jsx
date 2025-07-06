import { propsData } from "../propsData";

const PropsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Props</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[120px]">이름</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[80px] whitespace-nowrap">타입</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[60px] whitespace-nowrap">필수</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[100px]">기본값</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 min-w-[200px]">설명</th>
            </tr>
          </thead>
          <tbody>
            {propsData.map((prop, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 font-mono text-blue-600 min-w-[120px]">{prop.name}</td>
                <td className="py-3 px-4 text-gray-700 min-w-[80px] whitespace-nowrap">{prop.type}</td>
                <td className="py-3 px-4 min-w-[60px]">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                      prop.required ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {prop.required ? "필수" : "선택"}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-gray-600 text-xs min-w-[100px]">{prop.default}</td>
                <td className="py-3 px-4 text-gray-700 min-w-[200px]">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsSection;
