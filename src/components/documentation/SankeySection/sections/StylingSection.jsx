import Sankey from "../../../DiagramComponents/Sankey";
import { sampleData } from "../sampleData";

const StylingSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">🎨 TailwindCSS 스타일링</h2>
      <p className="text-gray-600 mb-6">TailwindCSS 클래스를 사용하여 다이어그램을 커스터마이징할 수 있습니다.</p>

      <div className="space-y-6">
        {/* 기본 클래스 적용 */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">기본 클래스 적용</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">tailwind-styling.jsx</span>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-gray-300">
                <span className="text-blue-400">&lt;</span>
                <span className="text-red-400">Sankey</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">data</span>=<span className="text-yellow-300">{"{data}"}</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">svgClassName</span>=
                <span className="text-green-300">
                  "border-2 border-purple-300 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                </span>
                {"\n"}
                {"  "}
                <span className="text-green-400">tooltipClassName</span>=
                <span className="text-green-300">
                  "absolute z-20 bg-purple-900 text-white text-xs px-4 py-2 rounded-full shadow-2xl"
                </span>
                {"\n"}
                {"  "}
                <span className="text-green-400">labelClassName</span>=
                <span className="text-green-300">"text-gray-700 font-bold text-sm"</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">className</span>=
                <span className="text-green-300">"mx-auto drop-shadow-lg"</span>
                {"\n"}
                <span className="text-blue-400">/&gt;</span>
              </code>
            </pre>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2">결과:</h4>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <Sankey
                data={sampleData}
                width={600}
                height={300}
                svgClassName="border-2 border-purple-300 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg"
                tooltipClassName="absolute z-20 bg-purple-900 text-white text-xs px-4 py-2 rounded-full shadow-2xl"
                labelClassName="text-gray-700 font-bold text-sm"
                className="mx-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* 테마 스타일링 */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">테마 스타일링</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">theme-styling.jsx</span>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-gray-300">
                <span className="text-gray-500">// 다크 테마 스타일링</span>
                {"\n"}
                <span className="text-blue-400">&lt;</span>
                <span className="text-red-400">Sankey</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">data</span>=<span className="text-yellow-300">{"{data}"}</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">svgClassName</span>=
                <span className="text-green-300">"border border-gray-600 rounded-lg bg-gray-800 shadow-xl"</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">tooltipClassName</span>=
                <span className="text-green-300">
                  "absolute z-10 bg-gray-900 text-gray-100 text-sm px-3 py-2 rounded-md shadow-lg border
                  border-gray-600"
                </span>
                {"\n"}
                {"  "}
                <span className="text-green-400">labelClassName</span>=
                <span className="text-green-300">"text-gray-200 font-medium"</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">nodeClassName</span>=
                <span className="text-green-300">"opacity-90"</span>
                {"\n"}
                {"  "}
                <span className="text-green-400">linkClassName</span>=
                <span className="text-green-300">"opacity-80"</span>
                {"\n"}
                <span className="text-blue-400">/&gt;</span>
              </code>
            </pre>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2">결과 (다크 테마):</h4>
            <div className="bg-gray-900 rounded-lg p-4 border">
              <Sankey
                data={sampleData}
                width={600}
                height={300}
                svgClassName="border border-gray-600 rounded-lg bg-gray-800 shadow-xl"
                tooltipClassName="absolute z-10 bg-gray-900 text-gray-100 text-sm px-3 py-2 rounded-md shadow-lg border border-gray-600"
                labelClassName="text-gray-200 font-medium"
                nodeClassName="opacity-90"
                linkClassName="opacity-80"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylingSection;
