import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floatingOffset, setFloatingOffset] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const animationRef = useRef(null);

  const fullText = "SweetPD";
  const typingSpeed = 150; // 타이핑 속도 (ms)
  const deletingSpeed = 100; // 삭제 속도 (ms)
  const pauseTime = 4000; // 타이핑 완료 후 대기 시간 (ms)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // 반복 타이핑 효과
  useEffect(() => {
    let timeout;

    if (!isDeleting && typedText.length < fullText.length) {
      // 타이핑 중
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && typedText.length === fullText.length) {
      // 타이핑 완료, 잠시 대기 후 삭제 시작
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && typedText.length > 0) {
      // 삭제 중
      timeout = setTimeout(() => {
        setTypedText(typedText.slice(0, -1));
      }, deletingSpeed);
    } else if (isDeleting && typedText.length === 0) {
      // 삭제 완료, 다시 타이핑 시작
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

  // 부드러운 플로팅 애니메이션 (이미지용만 유지)
  useEffect(() => {
    const animateFloat = () => {
      setFloatingOffset((prev) => prev + 0.02);
      animationRef.current = requestAnimationFrame(animateFloat);
    };

    animationRef.current = requestAnimationFrame(animateFloat);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleStartClick = () => {
    navigate("/examples");
  };

  const handleImageHover = (hovered) => {
    setIsHovered(hovered);
  };

  const renderTypingText = () => {
    return (
      <span className="inline-block">
        {typedText.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block ${char === "-" ? "text-[#0066ff]" : "text-white"} animate-fade-in-up`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char}
          </span>
        ))}
        <span
          className={`inline-block w-1 h-16 md:h-20 bg-white ml-1 ${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100`}
          style={{
            animation: typedText.length === fullText.length ? "none" : "blink 1s infinite",
          }}
        />
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#0066ff] overflow-hidden relative"
    >
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* 타이핑 타이틀 */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white min-h-[4rem] md:min-h-[5rem] flex items-center justify-center">
            {renderTypingText()}
          </h1>

          {/* 인터랙티브 이미지 */}
          <div className="relative mb-12 flex justify-center items-center">
            <img
              ref={imageRef}
              src="/main.png"
              alt="고구마 메인 이미지"
              className={`w-64 h-64 md:w-80 md:h-80 object-contain transition-all duration-300 ease-out cursor-pointer mx-auto ${
                isHovered ? "scale-110" : "scale-100"
              }`}
              style={{
                transform: `translate(${mousePosition.x}px, ${
                  mousePosition.y + Math.sin(floatingOffset) * 5
                }px) scale(${isHovered ? 1.1 : 1}) rotate(${mousePosition.x * 0.5}deg)`,
                filter: `drop-shadow(0 0 20px ${isHovered ? "#0066ff" : "rgba(255,255,255,0.3)"}) brightness(${
                  isHovered ? 1.2 : 1
                })`,
              }}
              onMouseEnter={() => handleImageHover(true)}
              onMouseLeave={() => handleImageHover(false)}
            />

            {/* 이미지 주변 글로우 효과 */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-500"
              style={{
                background: `radial-gradient(circle, #0066ff ${isHovered ? "60%" : "40%"}, transparent 70%)`,
                transform: `translate(${mousePosition.x * 0.5}px, ${
                  mousePosition.y * 0.5 + Math.sin(floatingOffset) * 3
                }px) scale(${isHovered ? 1.2 : 1})`,
              }}
            />
          </div>

          {/* 서브타이틀 */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto px-4">
            인터랙티브한 다이어그램 컴포넌트로
            <span className="text-[#0066ff] font-semibold"> 창의적인 시각화</span>를 경험해보세요
          </p>

          {/* 시작하기 버튼 */}
          <button
            onClick={handleStartClick}
            className="px-12 py-4 cursor-pointer bg-[#0066ff] text-white font-bold text-xl rounded-full hover:bg-[#0066ff] transition-all duration-300 transform hover:scale-105"
            aria-label="예제 페이지로 이동"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleStartClick();
              }
            }}
          >
            시작하기
          </button>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">시작하기를 클릭하여 예제를 확인하세요</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* 커서 깜빡임 CSS */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
