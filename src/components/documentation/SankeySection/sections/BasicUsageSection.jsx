import Sankey from "../../../DiagramComponents/Sankey";
import { sampleData } from "../sampleData";

const BasicUsageSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 기본 사용법</h2>

      <div className="mb-4">
        <h3 className="font-medium text-gray-800 mb-2">코드:</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-2">basic-example.jsx</span>
            </div>
            <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
              📋 복사
            </button>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-gray-300">
              <span className="text-purple-400">import</span> <span className="text-yellow-300">{"{"}</span>{" "}
              <span className="text-white">Sankey</span> <span className="text-yellow-300">{"}"}</span>{" "}
              <span className="text-purple-400">from</span> <span className="text-green-300">"hy-diagram"</span>;
              {"\n"}
              {"\n"}
              <span className="text-purple-400">const</span> <span className="text-white">data</span> ={" "}
              <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-cyan-400">nodes</span>: <span className="text-yellow-300">[</span>
              {"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"A"</span>, <span className="text-cyan-400">name</span>:{" "}
              <span className="text-green-300">"소스 A"</span>, <span className="text-cyan-400">layer</span>:{" "}
              <span className="text-orange-300">0</span> <span className="text-yellow-300">{"}"}</span>,{"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"B"</span>, <span className="text-cyan-400">name</span>:{" "}
              <span className="text-green-300">"소스 B"</span>, <span className="text-cyan-400">layer</span>:{" "}
              <span className="text-orange-300">0</span> <span className="text-yellow-300">{"}"}</span>,{"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"C"</span>, <span className="text-cyan-400">name</span>:{" "}
              <span className="text-green-300">"중간"</span>, <span className="text-cyan-400">layer</span>:{" "}
              <span className="text-orange-300">1</span> <span className="text-yellow-300">{"}"}</span>,{"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"D"</span>, <span className="text-cyan-400">name</span>:{" "}
              <span className="text-green-300">"목적지"</span>, <span className="text-cyan-400">layer</span>:{" "}
              <span className="text-orange-300">2</span> <span className="text-yellow-300">{"}"}</span>
              {"\n"}
              {"  "}
              <span className="text-yellow-300">]</span>,{"\n"}
              {"  "}
              <span className="text-cyan-400">links</span>: <span className="text-yellow-300">[</span>
              {"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"link-A-C"</span>, <span className="text-cyan-400">source</span>:{" "}
              <span className="text-green-300">"A"</span>, <span className="text-cyan-400">target</span>:{" "}
              <span className="text-green-300">"C"</span>, <span className="text-cyan-400">value</span>:{" "}
              <span className="text-orange-300">10</span> <span className="text-yellow-300">{"}"}</span>,{"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"link-B-C"</span>, <span className="text-cyan-400">source</span>:{" "}
              <span className="text-green-300">"B"</span>, <span className="text-cyan-400">target</span>:{" "}
              <span className="text-green-300">"C"</span>, <span className="text-cyan-400">value</span>:{" "}
              <span className="text-orange-300">5</span> <span className="text-yellow-300">{"}"}</span>,{"\n"}
              {"    "}
              <span className="text-yellow-300">{"{"}</span> <span className="text-cyan-400">id</span>:{" "}
              <span className="text-green-300">"link-C-D"</span>, <span className="text-cyan-400">source</span>:{" "}
              <span className="text-green-300">"C"</span>, <span className="text-cyan-400">target</span>:{" "}
              <span className="text-green-300">"D"</span>, <span className="text-cyan-400">value</span>:{" "}
              <span className="text-orange-300">15</span> <span className="text-yellow-300">{"}"}</span>
              {"\n"}
              {"  "}
              <span className="text-yellow-300">]</span>
              {"\n"}
              <span className="text-yellow-300">{"}"}</span>;{"\n"}
              {"\n"}
              <span className="text-blue-400">&lt;</span>
              <span className="text-red-400">Sankey</span> <span className="text-green-400">data</span>=
              <span className="text-yellow-300">{"{data}"}</span> <span className="text-green-400">width</span>=
              <span className="text-yellow-300">{"{600}"}</span> <span className="text-green-400">height</span>=
              <span className="text-yellow-300">{"{300}"}</span> <span className="text-blue-400">/&gt;</span>
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-800 mb-2">결과:</h3>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <Sankey data={sampleData} width={600} height={300} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default BasicUsageSection; 