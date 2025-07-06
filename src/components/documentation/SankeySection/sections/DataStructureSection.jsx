const DataStructureSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">🏗️ 데이터 구조</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">노드 (Nodes)</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">node-structure.js</span>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-gray-300">
                <span className="text-yellow-300">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">id</span>: <span className="text-green-300">"A"</span>,{" "}
                <span className="text-gray-500">// 고유 ID (필수)</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">name</span>: <span className="text-green-300">"소스 A"</span>,{" "}
                <span className="text-gray-500">// 표시 이름 (선택)</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">layer</span>: <span className="text-orange-300">0</span>{" "}
                <span className="text-gray-500">// 레이어 위치 (선택)</span>
                {"\n"}
                <span className="text-yellow-300">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-2">링크 (Links)</h3>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">link-structure.js</span>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-gray-300">
                <span className="text-yellow-300">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">id</span>: <span className="text-green-300">"link-A-C"</span>,{" "}
                <span className="text-gray-500">// 고유 ID (선택)</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">source</span>: <span className="text-green-300">"A"</span>,{" "}
                <span className="text-gray-500">// 시작 노드 ID (필수)</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">target</span>: <span className="text-green-300">"C"</span>,{" "}
                <span className="text-gray-500">// 끝 노드 ID (필수)</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">value</span>: <span className="text-orange-300">10</span>{" "}
                <span className="text-gray-500">// 흐름량 (필수)</span>
                {"\n"}
                <span className="text-yellow-300">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructureSection;
