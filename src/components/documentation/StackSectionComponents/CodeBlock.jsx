const CodeBlock = ({ filename, code, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    if (onCopy) onCopy();
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-2">{filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          📋 복사
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-gray-300 whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
