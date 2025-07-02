import React, { useEffect, useState } from "react";
import { useDiagram } from "./DiagramContext";
import { useGroup } from "./GroupProvider";

const InfoBox = ({
  id = "",
  number = "01",
  title = "TITLE",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  width = 300,
  height = 80,
  x = 0,
  y = 0,
  color = "#ff6b35",
  darkColor = "#d97706",
  textColor = "white",
  opacity = 1,
  className = "",
  containerClassName = "", // 컨테이너 추가 스타일
  numberClassName = "", // 번호 영역 추가 스타일
  titleClassName = "", // 제목 추가 스타일
  descriptionClassName = "", // 설명 추가 스타일
  contentClassName = "", // 내용 영역 추가 스타일
  backgroundClassName = "", // 배경 추가 스타일
  borderClassName = "", // 테두리 추가 스타일
  shadowClassName = "", // 그림자 추가 스타일
  zIndex = 10, // z-index 제어
  onClick = null,
  enableAutoConnect = true,
  // 3D 효과 관련 props
  is3D = true,
  threeDDepth = 8,
  threeDDirection = "right-down",
}) => {
  // 동적 위치 상태
  const [position, setPosition] = useState({ x, y });

  // DiagramContext 사용 (선택적)
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
    registerBox = null;
    unregisterBox = null;
    startAutoConnect = null;
    isAutoConnectMode = false;
    autoConnectStartBox = null;
    boxes = null;
  }

  // GroupProvider 컨텍스트 사용 (선택적)
  const groupContext = useGroup();

  // Props로 받은 초기 위치가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  // DiagramContext에서 위치 변화를 감지하고 내부 상태 업데이트
  useEffect(() => {
    if (boxes && id) {
      const boxFromContext = boxes.get(id);
      if (boxFromContext && (boxFromContext.x !== position.x || boxFromContext.y !== position.y)) {
        setPosition({ x: boxFromContext.x, y: boxFromContext.y });
      }
    }
  }, [boxes, id, position.x, position.y]);

  // Register/update Box information in Context
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = {
        id,
        x: position.x,
        y: position.y,
        width,
        height,
        groupId: groupContext?.groupId || null,
      };
      registerBox(id, boxInfo);
    }
  }, [id, position.x, position.y, width, height, groupContext?.groupId, registerBox]);

  // Register Box in GroupProvider
  useEffect(() => {
    if (id && groupContext?.registerBox) {
      const boxInfo = {
        id,
        x: position.x,
        y: position.y,
        width,
        height,
      };
      groupContext.registerBox(boxInfo);
    }
  }, [id, position.x, position.y, width, height, groupContext]);

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
  }, [id, unregisterBox, groupContext]);

  // 3D 효과를 위한 스타일 계산
  const get3DStyles = () => {
    if (!is3D) return { threeDElements: null, mainBoxOffset: {} };

    const depthX = threeDDirection.includes("right") ? threeDDepth : -threeDDepth;
    const depthY = threeDDirection.includes("down") ? threeDDepth : -threeDDepth;

    // 박스 자체에 적용할 3D 스타일
    const box3DStyle = {
      boxShadow: `
        ${depthX}px ${depthY}px 0px ${darkColor},
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

  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { id, number, title, description, x: position.x, y: position.y, width, height });
    }

    // 자동 연결 기능 처리
    if (enableAutoConnect && startAutoConnect && event.shiftKey && id) {
      event.stopPropagation();

      const boxElement = event.currentTarget;
      const container = boxElement.closest(".auto-connect-manager") || boxElement.parentElement;
      const containerRect = container.getBoundingClientRect();

      const clickPoint = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top,
      };

      startAutoConnect(id, clickPoint);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // Connection point positions 계산
  const getConnectionPoints = () => {
    return {
      top: { x: position.x + width / 2, y: position.y },
      right: { x: position.x + width, y: position.y + height / 2 },
      bottom: { x: position.x + width / 2, y: position.y + height },
      left: { x: position.x, y: position.y + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();
  const { threeDElements, mainBoxOffset } = get3DStyles();

  // 번호 영역 크기 (전체 높이와 같은 정사각형)
  const numberAreaSize = height;
  const contentAreaWidth = width - numberAreaSize;

  return (
    <div
      className={`absolute ${className} ${containerClassName} ${shadowClassName}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
        transform: "translate3d(0,0,0)",
      }}
      data-box-id={id}
      data-group-id={groupContext?.groupId}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`InfoBox: ${number} ${title}`}
    >
      {/* 메인 박스 컨테이너 */}
      <div
        className={`flex w-full h-full cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative z-10 rounded-lg overflow-hidden shadow-lg ${backgroundClassName} ${borderClassName}`}
        style={mainBoxOffset}
      >
        {/* 번호 영역 (왼쪽 정사각형) */}
        <div
          className={`flex items-center justify-center font-bold border-r-4 border-white ${numberClassName}`}
          style={{
            width: `${numberAreaSize}px`,
            height: `${height}px`,
            backgroundColor: color,
            color: textColor,
            fontSize: `${Math.min(height * 0.5, 36)}px`, // 높이에 따라 폰트 크기 조절
          }}
        >
          {number}
        </div>

        {/* 내용 영역 (오른쪽) */}
        <div
          className={`flex flex-col justify-center px-6 py-3 ${contentClassName}`}
          style={{
            width: `${contentAreaWidth}px`,
            backgroundColor: "#ffffff",
            color: "#333",
            minHeight: `${height}px`, // 최소 높이 보장
          }}
        >
          <h3
            className={`font-bold uppercase tracking-wide mb-2 text-gray-800 leading-tight ${titleClassName}`}
            style={{
              fontSize: `${Math.min(height * 0.25, 18)}px`, // 제목 크기도 높이에 맞춰 조절
              lineHeight: "1.2",
            }}
          >
            {title}
          </h3>
          <p
            className={`text-gray-600 leading-relaxed ${descriptionClassName}`}
            style={{
              fontSize: `${Math.min(height * 0.18, 14)}px`, // 설명 텍스트 크기 조절
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: Math.floor(height / 25), // 높이에 따라 줄 수 제한
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Connection points */}
      {Object.entries(connectionPoints).map(([position_name, point]) => (
        <div
          key={position_name}
          className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 z-20"
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

      {/* 자동 연결 모드 표시 */}
      {isAutoConnectMode && (autoConnectStartBox?.boxId || autoConnectStartBox) === id && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg z-30">
          시작점
        </div>
      )}
    </div>
  );
};

export default InfoBox;
