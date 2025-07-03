import React, { useEffect } from "react";
import { useDiagram } from "./DiagramContext";

const Diamond = ({
  id = "",
  text = "",
  size = 100, // 기본 크기 (width/height가 없을 때 사용)
  width = null, // 명시적 너비 (우선순위 높음)
  height = null, // 명시적 높이 (우선순위 높음)
  x = 0,
  y = 0,
  textDirection = "horizontal", // "horizontal" | "vertical"
  verticalDirection = "lr", // "lr" | "rl" - Vertical text direction (lr: left→right, rl: right→left)
  className = "text-cyan-600 hover:text-cyan-700 transition-colors duration-200",
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

  // 실제 너비와 높이 계산 (width/height가 명시되면 우선 사용, 없으면 size 사용)
  const actualWidth = width !== null ? width : size;
  const actualHeight = height !== null ? height : size;

  // Register/update Diamond information in Context (only when Context is available)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = { id, x, y, width: actualWidth, height: actualHeight };
      registerBox(id, boxInfo);
    }
  }, [id, x, y, actualWidth, actualHeight, registerBox]);

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
      onClick(event, { id, x, y, width: actualWidth, height: actualHeight, size });
    }

    // 자동 연결 기능 처리 (Shift + 클릭으로 활성화)
    if (enableAutoConnect && startAutoConnect && event.shiftKey && id) {
      event.stopPropagation();

      // 컨테이너를 기준으로 한 정확한 클릭 위치 계산
      const diamondElement = event.currentTarget;
      const container = diamondElement.closest(".auto-connect-manager") || diamondElement.parentElement;
      const containerRect = container.getBoundingClientRect();

      const clickPoint = {
        x: event.clientX - containerRect.left, // 컨테이너 기준 절대 X 좌표
        y: event.clientY - containerRect.top, // 컨테이너 기준 절대 Y 좌표
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

  // 마름모의 점들 계산 (중앙 기준으로 상, 우, 하, 좌 순서)
  const getDiamondPoints = () => {
    const halfWidth = actualWidth / 2;
    const halfHeight = actualHeight / 2;
    return `${halfWidth},0 ${actualWidth},${halfHeight} ${halfWidth},${actualHeight} 0,${halfHeight}`;
  };

  // 연결점 위치 계산 (마름모의 네 꼭짓점)
  const getConnectionPoints = () => {
    const halfWidth = actualWidth / 2;
    const halfHeight = actualHeight / 2;
    return {
      top: { x: x + halfWidth, y: y },
      right: { x: x + actualWidth, y: y + halfHeight },
      bottom: { x: x + halfWidth, y: y + actualHeight },
      left: { x: x, y: y + halfHeight },
    };
  };

  const connectionPoints = getConnectionPoints();

  // 자동 연결 모드 상태에 따른 스타일 계산
  const getDiamondStyles = () => {
    let additionalClasses = "";
    let additionalStyles = {};

    const startBoxId = autoConnectStartBox?.boxId || autoConnectStartBox; // 기존 호환성 유지

    if (isAutoConnectMode && startBoxId === id) {
      // 선택된 시작 마름모 스타일
      additionalClasses = " ring-4 ring-purple-400 ring-opacity-75 shadow-lg shadow-purple-500/50";
      additionalStyles.animation = "autoConnectPulse 2s ease-in-out infinite";
    } else if (isAutoConnectMode) {
      // 연결 가능한 마름모들의 스타일
      additionalClasses = " ring-2 ring-purple-200 ring-opacity-50";
    }

    return { additionalClasses, additionalStyles };
  };

  const { additionalClasses, additionalStyles } = getDiamondStyles();

  return (
    <div
      className={`absolute ${className}${additionalClasses}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        ...additionalStyles,
      }}
      data-box-id={id}
    >
      <svg
        width={actualWidth}
        height={actualHeight}
        className={`cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Diamond component: ${text} ${id ? `(ID: ${id})` : ""}${
          isAutoConnectMode ? " (자동 연결 모드)" : ""
        }`}
      >
        {/* 마름모 배경 */}
        <polygon
          points={getDiamondPoints()}
          className="fill-current stroke-current stroke-2 transition-colors duration-200 hover:opacity-80"
          fill="currentColor"
          fillOpacity="0.1"
        />

        {/* 텍스트를 위한 foreignObject */}
        <foreignObject x="0" y="0" width={actualWidth} height={actualHeight} className="pointer-events-none">
          <div
            className="flex items-center justify-center w-full h-full text-center"
            style={{
              fontSize: `${Math.max(10, Math.min(actualWidth, actualHeight) * 0.12)}px`,
              lineHeight: "1.2",
              ...getTextStyle(),
            }}
          >
            <span className="font-medium px-2 select-none leading-tight">{text}</span>
          </div>
        </foreignObject>
      </svg>

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-cyan-600 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-cyan-500 z-20"
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
  );
};

export default Diamond;
