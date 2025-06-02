/**
 * 예제 선택 사이드바 컴포넌트
 */

import React from "react";
import { EXAMPLE_METADATA, getDifficultyColor } from "../examples/exampleMetadata";

const ExampleSidebar = ({ selectedExample, onExampleSelect }) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📂 Example Gallery</h3>
        <div className="space-y-3">
          {Object.entries(EXAMPLE_METADATA).map(([key, example]) => (
            <button
              key={key}
              onClick={() => onExampleSelect(key)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                selectedExample === key
                  ? "border-[#0066ff] bg-blue-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{example.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 truncate mb-1">{example.title}</div>
                  <div className="text-sm text-gray-600 mb-2 line-clamp-2">{example.description}</div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                      example.difficulty
                    )}`}
                  >
                    {example.difficulty}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExampleSidebar;
