import { useState } from "react";
import Sankey from "../../../DiagramComponents/Sankey";
import { sampleData } from "../sampleData";

const InteractiveSection = () => {
  const [selectedFlow, setSelectedFlow] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ 흐름 선택</h2>

      <div className="mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            💡 링크를 클릭하면 해당 흐름만 하이라이트됩니다. 다시 클릭하면 해제됩니다.
          </p>
        </div>

        <h3 className="font-medium text-gray-800 mb-2">코드:</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-2">interactive-sankey.jsx</span>
            </div>
            <button className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
              📋 복사
            </button>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-gray-300">
              <span className="text-purple-400">import</span> <span className="text-yellow-300">{"{"}</span>{" "}
              <span className="text-white">Sankey</span> <span className="text-yellow-300">{"}"}</span>{" "}
              <span className="text-purple-400">from</span> <span className="text-green-300">"sweet-diagram"</span>;{"\n"}
              <span className="text-purple-400">import</span> <span className="text-yellow-300">{"{"}</span>{" "}
              <span className="text-white">useState</span> <span className="text-yellow-300">{"}"}</span>{" "}
              <span className="text-purple-400">from</span> <span className="text-green-300">"react"</span>;{"\n"}
              {"\n"}
              <span className="text-purple-400">const</span> <span className="text-white">InteractiveSankey</span> ={" "}
              <span className="text-yellow-300">() =&gt;</span> <span className="text-yellow-300">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-purple-400">const</span> <span className="text-yellow-300">[</span>
              <span className="text-white">selectedFlow</span>, <span className="text-white">setSelectedFlow</span>
              <span className="text-yellow-300">]</span> = <span className="text-blue-400">useState</span>(
              <span className="text-orange-300">null</span>);
              {"\n"}
              {"\n"}
              {"  "}
              <span className="text-purple-400">return</span> <span className="text-yellow-300">(</span>
              {"\n"}
              {"    "}
              <span className="text-blue-400">&lt;</span>
              <span className="text-red-400">Sankey</span>
              {"\n"}
              {"      "}
              <span className="text-green-400">data</span>=<span className="text-yellow-300">{"{data}"}</span>
              {"\n"}
              {"      "}
              <span className="text-green-400">selectedFlow</span>=
              <span className="text-yellow-300">{"{selectedFlow}"}</span>
              {"\n"}
              {"      "}
              <span className="text-green-400">onFlowSelect</span>=
              <span className="text-yellow-300">{"{setSelectedFlow}"}</span>
              {"\n"}
              {"      "}
              <span className="text-green-400">width</span>=<span className="text-yellow-300">{"{600}"}</span>
              {"\n"}
              {"      "}
              <span className="text-green-400">height</span>=<span className="text-yellow-300">{"{300}"}</span>
              {"\n"}
              {"    "}
              <span className="text-blue-400">/&gt;</span>
              {"\n"}
              {"  "}
              <span className="text-yellow-300">)</span>;{"\n"}
              <span className="text-yellow-300">{"}"}</span>;
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-800 mb-2">결과:</h3>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <Sankey
            data={sampleData}
            width={600}
            height={300}
            selectedFlow={selectedFlow}
            onFlowSelect={setSelectedFlow}
            highlightConnected={false}
            highlightPath={false}
            className="mx-auto"
          />
        </div>

        {selectedFlow && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ 선택된 흐름: <code className="bg-green-100 px-2 py-1 rounded">{selectedFlow}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveSection;
