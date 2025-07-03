import React, { useState, useEffect } from "react";
import { TABS } from "../../shared/constants/tabs";

const Footer = ({ activeTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glowEffect, setGlowEffect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기값 설정
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 실시간 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 글로우 효과 주기적 실행
  useEffect(() => {
    const glowTimer = setInterval(() => {
      setGlowEffect(true);
      setTimeout(() => setGlowEffect(false), 2000);
    }, 8000);

    return () => clearInterval(glowTimer);
  }, []);

  const activeTabInfo = TABS.find((tab) => tab.id === activeTab);

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-blue-900 border-t-2 border-blue-500/30 flex-shrink-0 relative overflow-hidden">
      {/* 배경 애니메이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>

      {/* 상단 그라데이션 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative z-10">
        {/* 메인 컨테이너 - 모바일에서는 세로 배치, 데스크톱에서는 가로 배치 */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
          {/* 상단: 제작자 정보와 시계 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-xl sm:text-2xl animate-pulse">💻</span>
              <span className="text-sm sm:text-base font-medium">
                Made with <span className="text-orange-400 animate-pulse text-base sm:text-lg">🍠</span> by{" "}
                <span className="text-blue-400 font-bold hover:text-blue-300 transition-colors cursor-pointer">
                  KimDowon
                </span>
              </span>
            </div>

            {/* 실시간 시계 - 모바일에서도 표시 */}
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
              <span className="font-mono">
                {currentTime.toLocaleTimeString("ko-KR", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* 하단: 상태 정보 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:gap-6">
            {/* 활성 탭 정보 */}
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-gray-400 text-xs sm:text-sm">Active:</span>
              <div className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                <span className="text-sm sm:text-lg">{activeTabInfo?.icon}</span>
                <span className="font-semibold text-white text-xs sm:text-sm">{activeTabInfo?.label}</span>
              </div>
            </div>

            {/* 라이브 데모 상태 */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <span
                  className={`w-3 h-3 bg-green-400 rounded-full inline-block transition-all duration-300 ${
                    glowEffect ? "animate-ping" : "animate-pulse"
                  }`}
                ></span>
                {glowEffect && (
                  <span className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></span>
                )}
              </div>
              <span className="text-green-400 font-semibold text-xs sm:text-sm">Live Demo</span>
            </div>
          </div>
        </div>

        {/* 하단 추가 정보 */}
        <div className="mt-3 pt-3 border-t border-gray-700/30 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0 text-xs text-gray-500">
          {/* 좌측: 프로젝트 정보와 링크들 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs">React Diagram Components</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-xs">Interactive & Modern</span>
            </div>

            {/* 링크들 */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* NPM 패키지 링크 */}
              <a
                href="https://www.npmjs.com/package/sweet-diagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors duration-300 group"
                aria-label="NPM 패키지로 이동"
              >
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">📦</span>
                <span className="font-medium text-xs">NPM</span>
              </a>

              {/* GitHub 링크 */}
              <a
                href="https://github.com/KoreaMoney/sweetpotato-diagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
                aria-label="GitHub 저장소로 이동"
              >
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">🔗</span>
                <span className="font-medium text-xs">GitHub</span>
              </a>

              {/* Vercel 링크 */}
              <a
                href="https://sweetpotato-diagram.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors duration-300 group"
                aria-label="라이브 데모로 이동"
              >
                <span className="text-sm group-hover:scale-110 transition-transform duration-300">🚀</span>
                <span className="font-medium text-xs">Demo</span>
              </a>
            </div>
          </div>

          {/* 우측: 기술 스택 정보 */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 text-xs">
              <span className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="text-yellow-400 hidden sm:inline">TypeScript 도입 예정</span>
              <span className="text-yellow-400 sm:hidden">TS 예정</span>
            </span>
            <span className="flex items-center gap-1 text-xs">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              <span className="hidden sm:inline">TailwindCSS</span>
              <span className="sm:hidden">Tailwind</span>
            </span>
            <span className="flex items-center gap-1 text-xs">
              <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
              Vite
            </span>
          </div>
        </div>
      </div>

      {/* 파티클 효과 - 모바일에서는 개수 줄임 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 4 : 8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${10 + i * (isMobile ? 20 : 12)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
