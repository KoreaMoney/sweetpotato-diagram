const codeTemplates = {
  boxStraight: `<DiagramProvider>
  <Box 
    id="start"
    x={50} 
    y={50} 
    width={80} 
    height={30} 
    text="시작" 
    className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="end"
    x={200} 
    y={100} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-green-600 text-white border-green-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "start", position: "right" }}
    toBox={{ id: "end", position: "left" }}
    connectionType="straight"
    showArrow={true}
    strokeWidth={2}
    className="text-blue-600"
  />
</DiagramProvider>`,

  boxOrthogonal: `<DiagramProvider>
  <Box 
    id="boxA"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="A" 
    className="bg-red-500 text-white border-red-700 border-2 rounded-lg text-sm"
  />
  <Box 
    id="boxB"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="B" 
    className="bg-yellow-500 text-white border-yellow-700 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "boxA", position: "bottom" }}
    toBox={{ id: "boxB", position: "top" }}
    connectionType="orthogonal"
    showArrow={true}
    strokeWidth={2}
    className="text-red-500"
  />
</DiagramProvider>`,

  boxCurved: `<DiagramProvider>
  <Box 
    id="curve1"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="시작" 
    className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="curve2"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-pink-600 text-white border-pink-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "curve1", position: "right" }}
    toBox={{ id: "curve2", position: "left" }}
    connectionType="curved"
    showArrow={true}
    strokeWidth={3}
    className="text-purple-600"
  />
</DiagramProvider>`,

  autoType: `<DiagramProvider>
  <Box 
    id="auto1"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="A" 
    className="bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="auto2"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="B" 
    className="bg-amber-600 text-white border-amber-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "auto1", position: "right" }}
    toBox={{ id: "auto2", position: "top" }}
    connectionType="auto"
    showArrow={true}
    strokeWidth={2}
    className="text-orange-500"
  />
</DiagramProvider>`,

  animated: `<DiagramProvider>
  <Box 
    id="data"
    x={50} 
    y={50} 
    width={80} 
    height={30} 
    text="데이터" 
    className="bg-teal-600 text-white border-teal-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="process"
    x={200} 
    y={100} 
    width={80} 
    height={30} 
    text="처리" 
    className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "data", position: "right" }}
    toBox={{ id: "process", position: "left" }}
    connectionType="straight"
    showArrow={true}
    strokeWidth={3}
    animated={true}
    className="text-teal-500"
  />
</DiagramProvider>`,
};

const CodeEditor = ({ editableCode, onCodeChange }) => {
  const handleTemplateClick = (templateKey) => {
    onCodeChange({ target: { value: codeTemplates[templateKey] } });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">코드 예제 (수정 가능)</h3>
      <textarea
        value={editableCode}
        onChange={onCodeChange}
        className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap break-words overflow-x-auto"
        spellCheck={false}
        wrap="soft"
      />

      {/* 빠른 예제 버튼들 */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleTemplateClick("boxStraight")}
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 transition-colors"
        >
          박스 직선
        </button>
        <button
          onClick={() => handleTemplateClick("boxOrthogonal")}
          className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200 transition-colors"
        >
          박스 직교
        </button>
        <button
          onClick={() => handleTemplateClick("boxCurved")}
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200 transition-colors"
        >
          박스 곡선
        </button>
        <button
          onClick={() => handleTemplateClick("autoType")}
          className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-xs hover:bg-orange-200 transition-colors"
        >
          자동 타입
        </button>
        <button
          onClick={() => handleTemplateClick("animated")}
          className="px-3 py-1 bg-teal-100 text-teal-800 rounded text-xs hover:bg-teal-200 transition-colors"
        >
          애니메이션
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>박스 연결 방식을 사용해보세요! 화살표가 자동으로 표시됩니다.</p>
        <p className="text-xs text-green-600 mt-1">💡 showArrow={`{true}`}를 추가하면 화살표가 표시됩니다.</p>
      </div>
    </div>
  );
};

export default CodeEditor;
