/**
 * 예제 페이지 헤더 컴포넌트
 */

import React from "react";

const ExampleHeader = ({
  supportsAnimation,
  isAnimated,
  isCodeEditorVisible,
  onAnimationToggle,
  onCodeEditorToggle,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 shadow-lg flex-shrink-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connector Examples
          </div>
          <div className="text-lg text-gray-300">실시간 인터랙티브 예제 모음</div>
        </div>
        <div className="flex items-center gap-3">
          {supportsAnimation && (
            <button
              onClick={onAnimationToggle}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isAnimated
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-600 hover:bg-gray-700 text-gray-200"
              }`}
              title="애니메이션 토글"
            >
              {isAnimated ? "🎬 Animation ON" : "⏸️ Animation OFF"}
            </button>
          )}
          <button
            onClick={onCodeEditorToggle}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              isCodeEditorVisible
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-600 hover:bg-gray-700 text-gray-200"
            }`}
            title="코드 에디터 토글"
          >
            {isCodeEditorVisible ? "📝 Hide Code" : "💻 Show Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExampleHeader;
