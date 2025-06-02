/**
 * 하단 상태 바 컴포넌트
 */

import React from "react";

const StatusBar = ({ isCustomMode, currentTemplate }) => {
  return (
    <div className="bg-black border-t border-gray-800 px-4 py-2 text-sm text-gray-300 flex justify-between items-center flex-shrink-0 z-50">
      <span className="flex items-center gap-2">
        Current Example: <strong className="text-white">{isCustomMode ? "Custom Code" : currentTemplate.title}</strong>
        <span className="text-xs px-2 py-1 bg-gray-800 rounded">
          {isCustomMode ? "Custom" : currentTemplate.difficulty}
        </span>
      </span>
      <span className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-[#0066ff] rounded-full animate-pulse"></span>
          <span className="text-[#0066ff] font-medium">Live Preview</span>
        </span>
      </span>
    </div>
  );
};

export default StatusBar;
