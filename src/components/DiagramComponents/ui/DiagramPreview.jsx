/**
 * 다이어그램 미리보기 컴포넌트
 */

import React from "react";
import { getDifficultyColor } from "../examples/exampleMetadata";

const DiagramPreview = ({ ExampleComponent, isAnimated, isCustomMode, currentTemplate, parseError }) => {
  // 컴포넌트 리마운트를 위한 stable key 생성
  const stableKey = `${isCustomMode ? "custom" : currentTemplate?.title || "unknown"}-${isAnimated}`;

  return (
    <div className="flex-1 bg-gray-100 relative overflow-hidden">
      {/* 헤더 정보 */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-40 max-w-md">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{isCustomMode ? "🚀" : currentTemplate.icon}</span>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{isCustomMode ? "Custom Code" : currentTemplate.title}</h2>
            <p className="text-sm text-gray-600">
              {isCustomMode ? "코드 에디터에서 수정된 다이어그램" : currentTemplate.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span
            className={`px-2 py-1 rounded-full font-medium border ${
              isCustomMode
                ? "bg-purple-100 text-purple-800 border-purple-200"
                : getDifficultyColor(currentTemplate.difficulty)
            }`}
          >
            {isCustomMode ? "Custom" : currentTemplate.difficulty}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Real-time Rendering
          </div>
        </div>
        {parseError && (
          <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-red-800 text-xs">{parseError}</div>
        )}
      </div>

      {/* 다이어그램 렌더링 영역 */}
      <div className="w-full h-full relative">
        {ExampleComponent && <ExampleComponent key={stableKey} isAnimated={isAnimated} />}
      </div>
    </div>
  );
};

export default DiagramPreview;
