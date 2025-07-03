import React, { useEffect, useState, useRef } from "react";
import { useDiagram } from "./DiagramContext";
import { useGroup } from "./GroupProvider";

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
  containerClassName = "", // 컨테이너 추가 스타일
  textClassName = "", // 텍스트 추가 스타일
  borderClassName = "", // 테두리 추가 스타일
  backgroundClassName = "", // 배경 추가 스타일
  shadowClassName = "", // 그림자 추가 스타일
  opacity = 1,
  zIndex = 10, // z-index 제어
  onClick = null,
  enableAutoConnect = true, // 자동 연결 기능 활성화 여부
  // 3D 효과 관련 props
  is3D = false, // 3D 효과 활성화 여부
  threeDColor = "#0044aa", // 3D 측면 색상 (기본값은 주 색상보다 어두운 색)
  threeDDepth = 8, // 3D 깊이 (픽셀 단위)
  threeDDirection = "right-down", // "right-down" | "left-down" | "right-up" | "left-up"
}) => {
  // 동적 위치 상태 (외부에서 업데이트 가능)
  const [position, setPosition] = useState({ x, y });

  // 🔧 무한 루프 방지를 위한 ref 추가
  const previousPositionRef = useRef({ x, y });
  const isUpdatingFromContextRef = useRef(false);

  // Use DiagramContext optionally
  let registerBox, unregisterBox, startAutoConnect, isAutoConnectMode, autoConnectStartBox, boxes;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
    startAutoConnect = context.startAutoConnect;
    isAutoConnectMode = context.isAutoConnectMode;
    autoConnectStartBox = context.autoConnectStartBox;
    boxes = context.boxes;
  } catch {
    // Don't use context functionality if DiagramProvider is not available
    registerBox = null;
    unregisterBox = null;
    startAutoConnect = null;
    isAutoConnectMode = false;
    autoConnectStartBox = null;
    boxes = null;
  }

  // Use GroupProvider context optionally
  const groupContext = useGroup();

  // Props로 받은 초기 위치가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    if (x !== previousPositionRef.current.x || y !== previousPositionRef.current.y) {
      setPosition({ x, y });
      previousPositionRef.current = { x, y };

      // DiagramContext에도 위치 업데이트
      if (id && registerBox) {
        const boxInfo = {
          id,
          x,
          y,
          width,
          height,
        };
        registerBox(id, boxInfo);
      }
    }
  }, [x, y, id, registerBox, width, height]);

  // 🔧 수정: DiagramContext에서 위치 변화를 감지하고 내부 상태 업데이트 (무한 루프 방지)
  useEffect(() => {
    if (boxes && id && !isUpdatingFromContextRef.current) {
      const boxFromContext = boxes.get(id);
      if (boxFromContext && (boxFromContext.x !== position.x || boxFromContext.y !== position.y)) {
        isUpdatingFromContextRef.current = true;
        setPosition({ x: boxFromContext.x, y: boxFromContext.y });
        previousPositionRef.current = { x: boxFromContext.x, y: boxFromContext.y };

        // 다음 렌더링 사이클에서 플래그 리셋
        setTimeout(() => {
          isUpdatingFromContextRef.current = false;
        }, 0);
      }
    }
  }, [boxes, id]); // 🔧 position.x, position.y 제거

  // 🔧 수정: Register Box in DiagramContext and GroupProvider (마운트 시에만)
  useEffect(() => {
    if (id) {
      // DiagramContext에 박스 등록
      if (registerBox) {
        const boxInfo = {
          id,
          x: position.x,
          y: position.y,
          width,
          height,
        };
        registerBox(id, boxInfo);
      }

      // GroupProvider에 박스 등록
      if (groupContext?.registerBox) {
        const boxInfo = {
          id,
          x: position.x,
          y: position.y,
          width,
          height,
        };
        groupContext.registerBox(boxInfo);
      }
    }
  }, [id]); // 마운트 시에만 실행하여 무한 렌더링 완전 방지

  // Unregister when component unmounts
  useEffect(() => {
    return () => {
      if (id && unregisterBox) {
        unregisterBox(id);
      }
      if (id && groupContext?.unregisterBox) {
        groupContext.unregisterBox(id);
      }
    };
  }, [id]); // unregisterBox와 groupContext 의존성 제거

  const handleClick = (event) => {
    // 기본 onClick 핸들러 실행
    if (onClick) {
      onClick(event, { id, x: position.x, y: position.y, width, height, groupId: groupContext?.groupId });
    }

    // 자동 연결 기능 처리 (Shift + 클릭으로 활성화)
    if (enableAutoConnect && startAutoConnect && event.shiftKey && id) {
      event.stopPropagation();

      // 컨테이너를 기준으로 한 정확한 클릭 위치 계산
      const boxElement = event.currentTarget;
      const container = boxElement.closest(".auto-connect-manager") || boxElement.parentElement;
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

  // Calculate connection point positions
  const getConnectionPoints = () => {
    return {
      top: { x: position.x + width / 2, y: position.y },
      right: { x: position.x + width, y: position.y + height / 2 },
      bottom: { x: position.x + width / 2, y: position.y + height },
      left: { x: position.x, y: position.y + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();

  // 3D 효과를 위한 스타일 계산
  const get3DStyles = () => {
    if (!is3D) return { threeDElements: null, mainBoxOffset: {} };

    const depthX = threeDDirection.includes("right") ? threeDDepth : -threeDDepth;
    const depthY = threeDDirection.includes("down") ? threeDDepth : -threeDDepth;

    // 박스 자체에 적용할 3D 스타일
    const box3DStyle = {
      boxShadow: `
        ${depthX}px ${depthY}px 0px ${threeDColor},
        ${depthX + 1}px ${depthY + 1}px 0px rgba(0,0,0,${0.2 * opacity}),
        ${depthX + 3}px ${depthY + 3}px 8px rgba(0,0,0,${0.15 * opacity})
      `,
      border: `2px solid rgba(0,0,0,${0.1 * opacity})`,
      opacity: opacity,
    };

    return {
      threeDElements: null,
      mainBoxOffset: {
        position: "relative",
        zIndex: 1,
        ...box3DStyle,
      },
    };
  };

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

    // 3D 효과가 활성화된 경우 추가 그림자 효과
    if (is3D) {
      additionalClasses += " shadow-xl";
    }

    // 그룹에 속한 박스의 경우 추가 스타일
    if (groupContext?.groupId) {
      additionalClasses += " group-member";

      // 그룹이 드래그 중일 때 추가 스타일
      if (groupContext?.isDragging) {
        additionalClasses += " transition-transform duration-75";
        additionalStyles.pointerEvents = "none"; // 드래그 중 클릭 방지
      }
    }

    return { additionalClasses, additionalStyles };
  };

  const { additionalClasses, additionalStyles } = getBoxStyles();
  const { threeDElements, mainBoxOffset } = get3DStyles();

  return (
    <div
      className={`absolute ${className}${additionalClasses} ${containerClassName} ${shadowClassName}`}
      style={{
        left: `${position.x}px`, // 동적 위치 사용
        top: `${position.y}px`, // 동적 위치 사용
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
        transform: "translate3d(0,0,0)", // Utilize GPU acceleration
        ...additionalStyles,
      }}
      data-box-id={id}
      data-group-id={groupContext?.groupId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Box component: ${text} ${id ? `(ID: ${id})` : ""}${
        groupContext?.groupId ? ` (그룹: ${groupContext.groupId})` : ""
      }${isAutoConnectMode ? " (자동 연결 모드)" : ""}`}
    >
      {/* Main box content */}
      <div
        className={`flex items-center justify-center w-full h-full cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative z-10 rounded-lg ${backgroundClassName} ${borderClassName}`}
        style={mainBoxOffset}
      >
        <span className={`font-medium px-2 leading-tight ${textClassName}`} style={getTextStyle()}>
          {text}
        </span>
      </div>

      {/* Connection points */}
      {Object.entries(connectionPoints).map(([position_name, point]) => (
        <div
          key={position_name}
          className="absolute w-2 h-2 bg-[#0066ff] rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-[#0066ff] z-20"
          style={{
            left: `${point.x - position.x - 4}px`,
            top: `${point.y - position.y - 4}px`,
          }}
          data-connection-point={position_name}
          data-box-id={id}
          data-x={point.x}
          data-y={point.y}
          title={`${id ? `${id} - ` : ""}${position_name} connection point`}
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

export default Box;
