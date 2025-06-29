import React, { useEffect } from "react";
import { useDiagram } from "./DiagramContext";

const Box = ({
  id = "",
  text = "",
  width = 120,
  height = 60,
  x = 0,
  y = 0,
  textDirection = "horizontal", // "horizontal" | "vertical"
  verticalDirection = "lr", // "lr" | "rl" - Vertical text direction (lr: left→right, rl: right→left)
  className = "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
  onClick = null,
  enableAutoConnect = true, // 자동 연결 기능 활성화 여부
}) => {
  // Use DiagramContext optionally
  let registerBox, unregisterBox, startAutoConnect, isAutoConnectMode, autoConnectStartBox;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
    startAutoConnect = context.startAutoConnect;
    isAutoConnectMode = context.isAutoConnectMode;
    autoConnectStartBox = context.autoConnectStartBox;
  } catch {
    // Don't use context functionality if DiagramProvider is not available
    registerBox = null;
    unregisterBox = null;
    startAutoConnect = null;
    isAutoConnectMode = false;
    autoConnectStartBox = null;
  }

  // Register/update Box information in Context (only when Context is available)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = { id, x, y, width, height };
      registerBox(id, boxInfo);
    }
  }, [id, x, y, width, height, registerBox]);

  // Unregister when component unmounts (only when Context is available)
  useEffect(() => {
    return () => {
      if (id && unregisterBox) {
        unregisterBox(id);
      }
    };
  }, [id, unregisterBox]);

  const handleClick = (event) => {
    // 기본 onClick 핸들러 실행
    if (onClick) {
      onClick(event, { id, x, y, width, height });
    }

    // 자동 연결 기능 처리 (Shift + 클릭으로 활성화)
    if (enableAutoConnect && startAutoConnect && event.shiftKey && id) {
      event.stopPropagation();

      // 클릭한 정확한 위치 계산 (박스 내에서의 절대 좌표)
      const boxElement = event.currentTarget;
      const rect = boxElement.getBoundingClientRect();
      const clickPoint = {
        x: x + (event.clientX - rect.left), // 박스의 절대 X + 박스 내 상대 X
        y: y + (event.clientY - rect.top), // 박스의 절대 Y + 박스 내 상대 Y
      };

      startAutoConnect(id, clickPoint);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // Determine style based on text direction
  const getTextStyle = () => {
    if (textDirection === "vertical") {
      return {
        writingMode: `vertical-${verticalDirection}`, // vertical-lr or vertical-rl
        textOrientation: "mixed",
        textAlign: "center",
      };
    }
    return {
      textAlign: "center",
    };
  };

  // Calculate connection point positions
  const getConnectionPoints = () => {
    return {
      top: { x: x + width / 2, y: y },
      right: { x: x + width, y: y + height / 2 },
      bottom: { x: x + width / 2, y: y + height },
      left: { x: x, y: y + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();

  // 자동 연결 모드 상태에 따른 스타일 계산
  const getBoxStyles = () => {
    let additionalClasses = "";
    let additionalStyles = {};

    const startBoxId = autoConnectStartBox?.boxId || autoConnectStartBox; // 기존 호환성 유지

    if (isAutoConnectMode && startBoxId === id) {
      // 선택된 시작 박스 스타일
      additionalClasses = " ring-4 ring-purple-400 ring-opacity-75 shadow-lg shadow-purple-500/50";
      additionalStyles.animation = "autoConnectPulse 2s ease-in-out infinite";
    } else if (isAutoConnectMode) {
      // 연결 가능한 박스들의 스타일
      additionalClasses = " ring-2 ring-purple-200 ring-opacity-50";
    }

    return { additionalClasses, additionalStyles };
  };

  const { additionalClasses, additionalStyles } = getBoxStyles();

  return (
    <>
      <div
        className={`absolute z-10 ${className}${additionalClasses}`}
        style={{
          left: `${x}px`, // Explicitly add px unit
          top: `${y}px`, // Explicitly add px unit
          width: `${width}px`,
          height: `${height}px`,
          transform: "translate3d(0,0,0)", // Utilize GPU acceleration
          ...additionalStyles,
        }}
        data-box-id={id}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Box component: ${text} ${id ? `(ID: ${id})` : ""}${isAutoConnectMode ? " (자동 연결 모드)" : ""}`}
      >
        {/* Main box content */}
        <div className="flex items-center justify-center w-full h-full cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          <span className="font-medium px-2 leading-tight" style={getTextStyle()}>
            {text}
          </span>
        </div>

        {/* Connection points */}
        {Object.entries(connectionPoints).map(([position, point]) => (
          <div
            key={position}
            className="absolute w-2 h-2 bg-[#0066ff] rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-[#0066ff] z-20"
            style={{
              left: `${point.x - x - 4}px`,
              top: `${point.y - y - 4}px`,
            }}
            data-connection-point={position}
            data-box-id={id}
            data-x={point.x}
            data-y={point.y}
            title={`${id ? `${id} - ` : ""}${position} connection point`}
          />
        ))}

        {/* 자동 연결 모드일 때 추가 UI 표시 */}
        {isAutoConnectMode && (autoConnectStartBox?.boxId || autoConnectStartBox) === id && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-30">
            시작점
          </div>
        )}
      </div>
    </>
  );
};

export default Box;
