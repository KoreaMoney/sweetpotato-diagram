import { codeTemplates } from "../../data/connectorExampleData";

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
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
        >
          박스 직선
        </button>
        <button
          onClick={() => handleTemplateClick("boxOrthogonal")}
          className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200"
        >
          박스 직교
        </button>
        <button
          onClick={() => handleTemplateClick("boxCurved")}
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200"
        >
          박스 곡선
        </button>
        <button
          onClick={() => handleTemplateClick("autoType")}
          className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-xs hover:bg-orange-200"
        >
          자동 타입
        </button>
        <button
          onClick={() => handleTemplateClick("animated")}
          className="px-3 py-1 bg-teal-100 text-teal-800 rounded text-xs hover:bg-teal-200"
        >
          애니메이션
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>박스 연결 방식을 사용해보세요!</p>
      </div>
    </div>
  );
};

export default CodeEditor;
