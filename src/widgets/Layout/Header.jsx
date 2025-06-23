import { useState, useEffect } from "react";
import Navigation from "../Navigation";
import logo from "../../assets/logo.png";

const Header = ({ activeTab, onTabChange }) => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const fullText = "Sweet-Diagram";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 3000;

  // 타이핑 애니메이션 효과
  useEffect(() => {
    let timeout;

    if (!isDeleting && typedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && typedText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(typedText.slice(0, -1));
      }, deletingSpeed);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, fullText]);

  // 커서 깜빡임 효과
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
    onTabChange("home");
  };

  const renderTypingText = () => {
    return (
      <span className="inline-flex items-center">
        {typedText.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-300 ${char === "-" ? "text-blue-400" : "text-white"}`}
            style={{
              animationDelay: `${index * 0.05}s`,
              transform: `translateY(${Math.sin(Date.now() * 0.001 + index) * 2}px)`,
            }}
          >
            {char}
          </span>
        ))}
        <span
          className={`inline-block w-0.5 h-6 bg-blue-400 ml-1 ${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
        />
      </span>
    );
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-black to-blue-900 shadow-2xl border-b-2 border-blue-500/30 flex-shrink-0 relative overflow-hidden">
      {/* 배경 애니메이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>

      {/* 글로우 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center h-16">
          {/* 로고와 타이핑 텍스트 - 고정 폭 */}
          <div className="flex items-center flex-shrink-0 w-64">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-white hover:text-blue-400 transition-all duration-300 flex items-center group relative"
              aria-label="홈으로 가기"
            >
              {/* 로고 이미지 */}
              <img
                src={logo}
                alt="Sweet-Diagram 로고"
                className={`w-8 h-8 mr-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                  isAnimating ? "animate-spin scale-125" : ""
                }`}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                }}
              />

              {/* 타이핑 텍스트 */}
              <div className="relative">
                {renderTypingText()}

                {/* 텍스트 하단 글로우 라인 */}
                <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>

              {/* 호버 시 파티클 효과 */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                    style={{
                      left: `${30 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                ))}
              </div>
            </button>
          </div>

          {/* 네비게이션 - 남은 공간 활용 */}
          <div className="flex-1 flex justify-end">
            <Navigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        </div>
      </div>

      {/* 하단 그라데이션 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </header>
  );
};

export default Header;
