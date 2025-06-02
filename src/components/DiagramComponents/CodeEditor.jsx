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
    // Tab key handling
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      // Adjust cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);

      if (onChange) {
        onChange(newCode);
      }
    }

    // Ctrl+Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunCode();
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{language.toUpperCase()} Code Editor</span>
          {readOnly && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Read Only</span>}
        </div>
        {!readOnly && (
          <button
            onClick={handleRunCode}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-[#0066ff] transition-colors"
          >
            Run (Ctrl+Enter)
          </button>
        )}
      </div>

      {/* Code editor */}
      <div className="relative flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className={`w-full h-full p-4 pl-12 font-mono text-sm resize-none border-none outline-none overflow-auto ${
            readOnly ? "bg-gray-50 text-gray-700" : "bg-white"
          }`}
          style={{
            tabSize: 2,
          }}
          placeholder={`Enter ${language} code here...`}
          spellCheck={false}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-0 w-10 bg-gray-50 border-r border-gray-200 h-full overflow-hidden pointer-events-none">
          <div className="pt-4">
            {code.split("\n").map((_, index) => (
              <div key={index} className="text-xs text-gray-400 text-center leading-6 h-6">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2 flex-shrink-0">
          <div className="text-sm text-red-700">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-500 flex justify-between flex-shrink-0">
        <span>
          Lines: {code.split("\n").length} | Characters: {code.length}
        </span>
        <span className="flex gap-4">
          <span>Tab: Indent</span>
          <span>Ctrl+Enter: Run</span>
        </span>
      </div>
    </div>
  );
};

export default CodeEditor;
