import React, { useState, useEffect } from "react";

const MouseTracker = ({
  position = "top-right",
  theme = "dark",
  showDetails = true,
  showToggle = true,
  initialVisible = true,
  customStyles = {},
  onPositionChange = null,
  className = "",
  children = null,
  showSavedPoints = true,
  maxSavedPoints = 10,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [savedPoints, setSavedPoints] = useState([]);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newPosition = {
        x: event.clientX,
        y: event.clientY,
      };
      setMousePosition(newPosition);

      // 외부 콜백 함수가 있다면 위치 변경 시 호출
      if (onPositionChange) {
        onPositionChange(newPosition);
      }
    };

    const handleMouseClick = (event) => {
      // Ctrl + 클릭 (Windows/Linux) 또는 Cmd + 클릭 (Mac)으로 포인트 저장
      if ((event.ctrlKey || event.metaKey) && showSavedPoints) {
        const newPoint = {
          id: Date.now(),
          x: event.clientX,
          y: event.clientY,
          timestamp: new Date().toLocaleTimeString(),
        };

        setSavedPoints((prev) => {
          const newPoints = [newPoint, ...prev];
          return newPoints.slice(0, maxSavedPoints);
        });
      }
    };

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 추가
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleMouseClick);
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [onPositionChange, showSavedPoints, maxSavedPoints]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggleVisibility();
    }
  };

  const handlePointClick = (point) => {
    // 포인트 좌표를 클립보드에 복사
    navigator.clipboard.writeText(`x: ${point.x}, y: ${point.y}`).then(() => {
      console.log(`포인트 좌표 복사됨: x: ${point.x}, y: ${point.y}`);
    });
  };

  const handleClearPoints = () => {
    setSavedPoints([]);
  };

  const handleRemovePoint = (pointId) => {
    setSavedPoints((prev) => prev.filter((point) => point.id !== pointId));
  };

  // 위치 스타일 계산
  const getPositionStyles = () => {
    const positions = {
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-right": "bottom-4 right-4",
      "top-center": "top-4 left-1/2 transform -translate-x-1/2",
      "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    };

    return positions[position] || positions["top-right"];
  };

  // 테마 스타일 계산
  const getThemeStyles = () => {
    const themes = {
      dark: {
        bg: "bg-gray-900 bg-opacity-90 text-white border-gray-700",
        button: "bg-gray-800 hover:bg-gray-700 text-white",
        accent: "text-blue-400",
        secondary: "text-green-400",
        muted: "text-gray-300",
        detail: "text-gray-400",
        border: "border-gray-700",
      },
      light: {
        bg: "bg-white bg-opacity-90 text-gray-900 border-gray-300",
        button: "bg-gray-200 hover:bg-gray-300 text-gray-900",
        accent: "text-blue-600",
        secondary: "text-green-600",
        muted: "text-gray-600",
        detail: "text-gray-500",
        border: "border-gray-300",
      },
      minimal: {
        bg: "bg-black bg-opacity-70 text-white border-transparent",
        button: "bg-gray-700 hover:bg-gray-600 text-white",
        accent: "text-cyan-400",
        secondary: "text-lime-400",
        muted: "text-gray-200",
        detail: "text-gray-300",
        border: "border-transparent",
      },
    };

    return themes[theme] || themes.dark;
  };

  const themeStyles = getThemeStyles();

  // 토글 버튼만 표시하는 경우
  if (!isVisible && showToggle) {
    return (
      <button
        onClick={handleToggleVisibility}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="마우스 위치 표시기 보이기"
        className={`fixed ${getPositionStyles()} z-50 ${
          themeStyles.button
        } px-3 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm font-medium ${className}`}
        style={customStyles.button}
      >
        🖱️ 마우스 위치 보기
      </button>
    );
  }

  // 메인 표시 컴포넌트가 숨겨져 있고 토글 버튼도 없는 경우
  if (!isVisible && !showToggle) {
    return null;
  }

  return (
    <div
      className={`fixed ${getPositionStyles()} z-50 ${
        themeStyles.bg
      } px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border ${className}`}
      style={customStyles.container}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className={`text-xs ${themeStyles.muted} mb-1`}>마우스 위치</div>
          <div className="flex gap-4 font-mono text-sm">
            <span className="flex items-center gap-1">
              <span className={themeStyles.accent}>X:</span>
              <span className="text-current min-w-[3rem] text-right">{mousePosition.x}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className={themeStyles.secondary}>Y:</span>
              <span className="text-current min-w-[3rem] text-right">{mousePosition.y}</span>
            </span>
          </div>
        </div>

        {showToggle && (
          <button
            onClick={handleToggleVisibility}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="마우스 위치 표시기 숨기기"
            className={`ml-2 ${themeStyles.detail} hover:text-current transition-colors duration-200 text-lg`}
            style={customStyles.closeButton}
          >
            ✕
          </button>
        )}
      </div>

      {/* 상세 정보 */}
      {showDetails && (
        <div className={`mt-2 pt-2 border-t ${themeStyles.border}`}>
          <div className={`text-xs ${themeStyles.detail} space-y-1`}>
            <div>
              화면 크기: {screenSize.width} × {screenSize.height}
            </div>
            <div>
              상대 위치: {((mousePosition.x / screenSize.width) * 100).toFixed(1)}%,{" "}
              {((mousePosition.y / screenSize.height) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {/* 저장된 포인트들 */}
      {showSavedPoints && savedPoints.length > 0 && (
        <div className={`mt-2 pt-2 border-t ${themeStyles.border}`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`text-xs ${themeStyles.muted}`}>📍 저장된 포인트 ({savedPoints.length})</div>
            <button
              onClick={handleClearPoints}
              className={`text-xs ${themeStyles.detail} hover:text-red-400 transition-colors duration-200`}
              title="모든 포인트 삭제"
            >
              🗑️
            </button>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {savedPoints.map((point) => (
              <div
                key={point.id}
                className={`flex items-center justify-between p-2 rounded ${themeStyles.button} text-xs cursor-pointer hover:opacity-80 transition-all duration-200`}
                onClick={() => handlePointClick(point)}
                title={`클릭하여 좌표 복사: ${point.x}, ${point.y}`}
              >
                <div className="flex flex-col">
                  <span className="font-mono">
                    <span className={themeStyles.accent}>X:</span> {point.x}{" "}
                    <span className={themeStyles.secondary}>Y:</span> {point.y}
                  </span>
                  <span className={`${themeStyles.detail} text-xs`}>{point.timestamp}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePoint(point.id);
                  }}
                  className={`ml-2 ${themeStyles.detail} hover:text-red-400 transition-colors duration-200`}
                  title="이 포인트 삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className={`text-xs ${themeStyles.detail} mt-2 text-center`}>
            💡 Ctrl + 클릭 (Win) / Cmd + 클릭 (Mac)으로 포인트 저장
          </div>
        </div>
      )}

      {/* 커스텀 내용 */}
      {children && <div className="mt-2 pt-2 border-t border-current border-opacity-20">{children}</div>}
    </div>
  );
};

export default MouseTracker;
