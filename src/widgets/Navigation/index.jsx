import React from "react";
import { TABS } from "../../shared/constants/tabs";

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex space-x-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
            flex items-center gap-2 group whitespace-nowrap
            ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }
          `}
        >
          {/* 아이콘 */}
          <span className="text-lg">{tab.icon}</span>

          {/* 라벨 */}
          <span className="font-semibold">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
