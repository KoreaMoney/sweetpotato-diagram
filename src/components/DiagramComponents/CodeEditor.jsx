import React, { useState, useEffect } from "react";

const CodeEditor = ({ initialCode = "", onChange, onRun, language = "jsx", readOnly = false, className = "" }) => {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setError(null);

    if (onChange) {
      onChange(newCode);
    }
  };

  const handleRunCode = () => {
    try {
      if (onRun) {
        onRun(code);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = (e) => {
    // Tab 키 처리
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // 커서 위치 조정
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);

      if (onChange) {
        onChange(newCode);
      }
    }

    // Ctrl+Enter로 실행
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCode();
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{language.toUpperCase()} 코드 에디터</span>
          {readOnly && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">읽기 전용</span>}
        </div>
        {!readOnly && (
          <button
            onClick={handleRunCode}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-[#0066ff] transition-colors"
          >
            실행 (Ctrl+Enter)
          </button>
        )}
      </div>

      {/* 코드 에디터 */}
      <div className="relative flex-1">
        <textarea
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className={`w-full h-full p-4 font-mono text-sm resize-none border-none outline-none ${
            readOnly ? "bg-gray-50 text-gray-700" : "bg-white"
          }`}
          style={{
            minHeight: "300px",
            tabSize: 2,
          }}
          placeholder={`${language} 코드를 입력하세요...`}
          spellCheck={false}
        />

        {/* 라인 넘버 (간단한 버전) */}
        <div className="absolute left-0 top-4 w-8 bg-gray-50 border-r border-gray-200 h-full overflow-hidden pointer-events-none">
          {code.split("\n").map((_, index) => (
            <div key={index} className="text-xs text-gray-400 text-center leading-6 h-6">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* 에러 표시 */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <div className="text-sm text-red-700">
            <strong>오류:</strong> {error}
          </div>
        </div>
      )}

      {/* 상태 바 */}
      <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>
          줄: {code.split("\n").length} | 문자: {code.length}
        </span>
        <span className="flex gap-4">
          <span>Tab: 들여쓰기</span>
          <span>Ctrl+Enter: 실행</span>
        </span>
      </div>
    </div>
  );
};

export default CodeEditor;
