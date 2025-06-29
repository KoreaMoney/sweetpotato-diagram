/**
 * 예제 선택 사이드바 컴포넌트
 */

import React from "react";
import { EXAMPLE_METADATA, getDifficultyColor } from "../examples/exampleMetadata";

const ExampleSidebar = ({ selectedExample, onExampleSelect }) => {
  return (
    <div
      className="w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex-shrink-0 flex flex-col border-r border-slate-700"
      style={{ height: "calc(100vh - 100px)" }}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-700 flex-shrink-0 bg-gradient-to-r from-slate-800 to-slate-700">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="text-2xl mr-3 animate-pulse">📂</span>
          <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
            Example Gallery
          </span>
        </h3>
        <p className="text-gray-300 text-sm mt-2">실시간 인터랙티브 예제 모음</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          <div className="space-y-3 pb-8">
            {Object.entries(EXAMPLE_METADATA).map(([key, example], index) => (
              <button
                key={key}
                onClick={() => onExampleSelect(key)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`group w-full text-left p-4 rounded-xl transition-all duration-300 transform animate-fade-in
                          ${
                            selectedExample === key
                              ? `bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105 shadow-black/20`
                              : "text-gray-300 hover:text-white hover:bg-slate-700/50 hover:scale-102 hover:translate-x-1"
                          }
                          hover:shadow-lg active:scale-95 backdrop-blur-sm border border-slate-600/30
                          hover:border-slate-500/50`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-2xl flex-shrink-0 transition-all duration-300 
                               ${
                                 selectedExample === key
                                   ? "scale-110 rotate-6"
                                   : "group-hover:scale-110 group-hover:rotate-3"
                               }`}
                  >
                    {example.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-semibold truncate mb-1 transition-all duration-300 
                                  ${
                                    selectedExample === key
                                      ? "font-bold tracking-wide text-white"
                                      : "text-gray-200 group-hover:translate-x-1"
                                  }`}
                    >
                      {example.title}
                    </div>
                    <div
                      className={`text-sm mb-2 line-clamp-2 transition-all duration-300 
                                  ${
                                    selectedExample === key
                                      ? "text-blue-100"
                                      : "text-gray-400 group-hover:text-gray-300"
                                  }`}
                    >
                      {example.description}
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
                                  ${
                                    selectedExample === key
                                      ? "bg-white/20 text-white border border-white/30"
                                      : getDifficultyColor(example.difficulty)
                                  }`}
                    >
                      {example.difficulty}
                    </span>
                  </div>
                </div>
                {selectedExample === key && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ExampleSidebar;
