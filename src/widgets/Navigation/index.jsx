import React, { useState, useEffect, useRef } from "react";
import { TABS } from "../../shared/constants/tabs";

// 1420px 정도 화면에서 사용할 축약 라벨 함수
const getShortLabel = (label) => {
  const shortLabels = {
    Home: "Home",
    "Connector Examples": "Connectors",
    "Arrow Demo": "Arrows",
    Hooks: "Hooks",
    "Mouse Tracker": "Mouse",
    Documentation: "Docs",
    "Component Test": "Test",
  };
  return shortLabels[label] || label;
};

const Navigation = ({ activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 모바일 버전
  if (isMobile) {
    return (
      <div className="relative" ref={menuRef}>
        {/* 햄버거 메뉴 버튼 */}
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center w-8 h-8 space-y-1 text-gray-300 hover:text-white transition-colors duration-200"
          aria-label="메뉴 열기/닫기"
        >
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* 드롭다운 메뉴 */}
        <div
          className={`
          absolute right-0 top-full mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-blue-500/30 z-[60]
          transition-all duration-300 origin-top-right
          ${
            isMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
        >
          <div className="py-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border-r-2 border-blue-400"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <span className="text-lg flex-shrink-0">{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 데스크톱 버전 - 태블릿에서는 아이콘만 표시
  return (
    <nav className="flex space-x-1 lg:space-x-2">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            relative px-2 lg:px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
            flex items-center gap-1 lg:gap-2 group whitespace-nowrap
            ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }
          `}
          title={tab.label}
        >
          {/* 아이콘 */}
          <span className="text-base lg:text-lg">{tab.icon}</span>

          {/* 라벨 - 반응형 축약 */}
          <span className="font-semibold hidden lg:inline xl:hidden">{getShortLabel(tab.label)}</span>
          <span className="font-semibold hidden xl:inline">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
