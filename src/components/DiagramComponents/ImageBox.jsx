import React, { useEffect, useState, useRef } from "react";
import { useDiagram } from "./DiagramContext";
import { useGroup } from "./GroupProvider";
import baseImage from "@/assets/logo.png";

const ImageBox = ({
  id = "",
  text = "",
  textPosition = "bottom", // 🆕 텍스트 위치: top, bottom, left, right
  textClassName = "text-xs text-gray-700 font-medium", // 🆕 텍스트 스타일링
  textSpacing = 6, // 🆕 텍스트와 박스 사이의 간격 (px) - 기본값 증가
  textMaxWidth = null, // 🆕 텍스트 최대 너비 (px), null이면 박스 너비를 따름
  textAlign = "center", // 🆕 텍스트 정렬: left, center, right
  icon = baseImage,
  iconType = "image", // 기본값을 image로 변경
  width = 100,
  height = 80,
  x: initialX = 0, // prop 이름 변경
  y: initialY = 0, // prop 이름 변경
  // 🆕 드래그 기능 관련 props
  draggable = false, // 드래그 가능 여부
  onDrag = null, // 드래그 시 콜백 함수
  onDragEnd = null, // 드래그 완료 시 콜백 함수
  // 🆕 애니메이션 효과 관련 props
  sparkle = false, // 반짝이는 효과 여부
  sparkleColor = "#FFD700", // 반짝이는 효과 색상
  sparkleIntensity = "medium", // 반짝이는 강도: low, medium, high
  // 🆕 이미지 크기 조절 관련 props
  imageWidth = null, // 이미지 절대 너비 (px)
  imageHeight = null, // 이미지 절대 높이 (px)
  imageScale = 1, // 이미지 크기 비율 (0.1 ~ 2.0)
  imagePadding = 8, // 이미지 주변 여백 (px)
  imageObjectFit = "contain", // 이미지 피팅 방식: contain, cover, fill, scale-down, none
  className = "bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg text-xs hover:shadow-lg transition-shadow duration-200",
  onClick = null,
  // 🆕 Z-Index 관련 props
  zIndex = 100, // 기본 z-index 값
  priority = null, // 우선순위 (높을수록 위에 표시, null이면 zIndex 사용)
  maintainPriority = false, // true면 클릭해도 우선순위 변경 안됨
}) => {
  // 🆕 드래그 상태 관리 (동적 위치로 변경)
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  // 🔧 무한 루프 방지를 위한 ref 추가
  const previousPositionRef = useRef({ x: initialX, y: initialY });
  const isUpdatingFromContextRef = useRef(false);
  const initialZIndexSetRef = useRef(false);

  // 현재 위치 (동적 위치 사용)
  const currentX = position.x;
  const currentY = position.y;

  // DiagramContext를 optional하게 사용 (에러 로깅 제거)
  let registerBox, unregisterBox, boxes, getBoxZIndex, bringBoxToFront, setBoxZIndex;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
    boxes = context.boxes;
    getBoxZIndex = context.getBoxZIndex;
    bringBoxToFront = context.bringBoxToFront;
    setBoxZIndex = context.setBoxZIndex;
  } catch (error) {
    // DiagramProvider가 없으면 context 기능을 사용하지 않음 (에러 로깅 제거)
    registerBox = null;
    unregisterBox = null;
    boxes = null;
    getBoxZIndex = null;
    bringBoxToFront = null;
    setBoxZIndex = null;
  }

  // 🆕 GroupProvider 컨텍스트 사용
  const groupContext = useGroup();

  // 🆕 초기 zIndex/priority 설정
  useEffect(() => {
    if (id && setBoxZIndex && !initialZIndexSetRef.current) {
      const initialZIndexValue = priority !== null ? priority : zIndex;
      setBoxZIndex(id, initialZIndexValue);
      initialZIndexSetRef.current = true;
    }
  }, [id, priority, zIndex, setBoxZIndex]);

  // 🆕 priority나 zIndex props가 변경되면 DiagramContext에 반영
  useEffect(() => {
    if (id && setBoxZIndex && initialZIndexSetRef.current) {
      const newZIndexValue = priority !== null ? priority : zIndex;
      setBoxZIndex(id, newZIndexValue);
    }
  }, [priority, zIndex, id, setBoxZIndex]);

  // 🆕 최신 상태 참조를 위한 ref 추가
  const latestStateRef = useRef({
    position,
    dragStart,
    isDragging,
    draggable,
    groupContext,
    id,
    width,
    height,
    registerBox,
    onDrag,
    onDragEnd,
  });

  // 🆕 최신 상태를 ref에 업데이트
  useEffect(() => {
    latestStateRef.current = {
      position,
      dragStart,
      isDragging,
      draggable,
      groupContext,
      id,
      width,
      height,
      registerBox,
      onDrag,
      onDragEnd,
    };
  });

  // Props로 받은 초기 위치가 변경되면 내부 상태도 업데이트 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (!isDragging && (initialX !== previousPositionRef.current.x || initialY !== previousPositionRef.current.y)) {
      setPosition({ x: initialX, y: initialY });
      previousPositionRef.current = { x: initialX, y: initialY };

      // DiagramContext에도 위치 업데이트
      if (id && registerBox) {
        const boxInfo = {
          id,
          x: initialX,
          y: initialY,
          width,
          height,
          groupId: groupContext?.groupId || null,
        };
        registerBox(id, boxInfo);
      }
    }
  }, [initialX, initialY, id, registerBox, width, height, groupContext?.groupId, isDragging]);

  // 🔧 수정: DiagramContext에서 위치 변화를 감지하고 내부 상태 업데이트 (무한 루프 방지, 드래그 중 제외)
  useEffect(() => {
    if (boxes && id && !isUpdatingFromContextRef.current && !isDragging) {
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
  }, [boxes, id, isDragging]); // 🔧 isDragging 의존성 추가

  // ImageBox 정보를 DiagramContext에 등록 (마운트 시에만)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = {
        id,
        x: initialX,
        y: initialY,
        width,
        height,
        groupId: groupContext?.groupId || null,
      };
      registerBox(id, boxInfo);
    }
  }, [id, registerBox]); // 마운트 시에만 실행

  // 🆕 ImageBox를 GroupProvider에 등록 (마운트 시에만)
  useEffect(() => {
    if (id && groupContext?.registerBox) {
      const boxInfo = {
        id,
        x: initialX,
        y: initialY,
        width,
        height,
      };
      groupContext.registerBox(boxInfo);
    }
  }, [id, groupContext?.registerBox]); // 마운트 시에만 실행

  // 컴포넌트 언마운트 시 등록 해제
  useEffect(() => {
    return () => {
      if (id && unregisterBox) {
        unregisterBox(id);
      }
      if (id && groupContext?.unregisterBox) {
        groupContext.unregisterBox(id);
      }
    };
  }, [id]); // 마운트 시에만 실행하여 무한 렌더링 방지

  // 🆕 드래그 이벤트 핸들러들 - 그룹 드래그와 분리
  const handleMouseDown = (event) => {
    // 그룹 드래그 중이면 개별 드래그 비활성화
    if (!draggable || groupContext?.isDragging) return;

    event.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: event.clientX - currentX,
      y: event.clientY - currentY,
    });
  };

  // 🆕 ref를 사용한 안정적인 마우스 이벤트 핸들러
  const handleMouseMoveRef = useRef();
  const handleMouseUpRef = useRef();

  // 마우스 이벤트 핸들러 함수들을 매번 업데이트
  useEffect(() => {
    handleMouseMoveRef.current = (event) => {
      const { position, dragStart, isDragging, draggable, groupContext, id, width, height, registerBox, onDrag } =
        latestStateRef.current;

      if (!isDragging || !draggable || groupContext?.isDragging) return;

      event.preventDefault();
      const newPosition = {
        x: Math.round(event.clientX - dragStart.x),
        y: Math.round(event.clientY - dragStart.y),
      };

      setPosition(newPosition);

      // 드래그 중 실시간으로 DiagramContext 업데이트
      if (id && registerBox) {
        const boxInfo = {
          id,
          x: newPosition.x,
          y: newPosition.y,
          width,
          height,
          groupId: groupContext?.groupId || null,
        };
        registerBox(id, boxInfo);
      }

      if (onDrag) {
        onDrag(newPosition, { id, width, height });
      }
    };

    handleMouseUpRef.current = () => {
      const { position, isDragging, draggable, groupContext, id, width, height, registerBox, onDragEnd } =
        latestStateRef.current;

      if (!isDragging || !draggable) return;

      setIsDragging(false);

      const finalPosition = {
        x: Math.round(position.x),
        y: Math.round(position.y),
      };

      setPosition(finalPosition);

      // 드래그 완료 후 DiagramContext에 최종 위치 업데이트
      if (id && registerBox) {
        const boxInfo = {
          id,
          x: finalPosition.x,
          y: finalPosition.y,
          width,
          height,
          groupId: groupContext?.groupId || null,
        };
        registerBox(id, boxInfo);
      }

      // GroupProvider에도 최종 위치 업데이트
      if (id && groupContext?.updateBoxPosition) {
        groupContext.updateBoxPosition(id, finalPosition);
      }

      if (onDragEnd) {
        onDragEnd(finalPosition, { id, width, height });
      }
    };
  });

  // 전역 마우스 이벤트 리스너 등록 (안정적인 함수 참조 사용)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMoveRef.current);
      document.addEventListener("mouseup", handleMouseUpRef.current);
      return () => {
        document.removeEventListener("mousemove", handleMouseMoveRef.current);
        document.removeEventListener("mouseup", handleMouseUpRef.current);
      };
    }
  }, [isDragging]);

  const handleClick = (event) => {
    // 🆕 maintainPriority가 true가 아닐 때만 박스를 앞으로 가져오기
    if (id && bringBoxToFront && !maintainPriority) {
      bringBoxToFront(id);
    }

    if (onClick) {
      onClick(event, {
        id,
        x: currentX,
        y: currentY,
        width,
        height,
        groupId: groupContext?.groupId,
        currentZIndex: getBoxZIndex ? getBoxZIndex(id) : priority !== null ? priority : zIndex,
        priority,
        maintainPriority,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // 🆕 반짝이는 애니메이션 CSS 클래스 생성
  const getSparkleClasses = () => {
    // 🔧 드래그 중에는 애니메이션 효과 비활성화
    if (!sparkle || isDragging) return "";

    const intensityClasses = {
      low: "animate-pulse",
      medium: "animate-bounce",
      high: "animate-ping",
    };

    return `${intensityClasses[sparkleIntensity] || intensityClasses.medium}`;
  };

  // 🆕 반짝이는 효과 스타일 생성
  const getSparkleStyles = () => {
    // 🔧 드래그 중에는 효과 비활성화
    if (!sparkle || isDragging) return {};

    return {
      boxShadow: `0 0 10px ${sparkleColor}`,
      borderColor: sparkleColor,
    };
  };

  // 🆕 이미지 크기 계산 함수
  const calculateImageSize = () => {
    const containerWidth = width - imagePadding * 2;
    const containerHeight = height - imagePadding * 2;

    // 절대 크기가 지정된 경우
    if (imageWidth || imageHeight) {
      return {
        width: imageWidth ? `${imageWidth}px` : "auto",
        height: imageHeight ? `${imageHeight}px` : "auto",
        maxWidth: `${containerWidth}px`,
        maxHeight: `${containerHeight}px`,
      };
    }

    // 스케일 비율이 지정된 경우
    const scaledWidth = containerWidth * imageScale;
    const scaledHeight = containerHeight * imageScale;

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      maxWidth: `${containerWidth}px`,
      maxHeight: `${containerHeight}px`,
    };
  };

  // 🆕 그룹 상태에 따른 스타일 계산
  const getImageBoxStyles = () => {
    let additionalClasses = "";
    let additionalStyles = {};

    // 그룹에 속한 ImageBox의 경우 추가 스타일
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

  const { additionalClasses, additionalStyles } = getImageBoxStyles();

  // 🆕 개선된 텍스트 위치 및 스타일 계산 함수
  const getTextPositionStyles = () => {
    const spacing = textSpacing;
    const maxWidth = textMaxWidth || Math.max(width, 120); // 최소 120px 보장

    const baseClasses = `absolute ${textClassName} break-words leading-tight pointer-events-none select-none`;

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    switch (textPosition) {
      case "top":
        return {
          className: `${baseClasses} ${alignmentClasses[textAlign]}`,
          style: {
            bottom: `${height + spacing}px`,
            left: textAlign === "center" ? "50%" : textAlign === "right" ? "auto" : "0",
            right: textAlign === "right" ? "0" : "auto",
            transform: textAlign === "center" ? "translateX(-50%)" : "none",
            maxWidth: `${maxWidth}px`,
            width: textAlign === "center" ? "max-content" : `${maxWidth}px`,
            minWidth: textAlign === "center" ? "max-content" : "auto",
            whiteSpace: textAlign === "center" ? "nowrap" : "normal",
          },
        };

      case "bottom":
        return {
          className: `${baseClasses} ${alignmentClasses[textAlign]}`,
          style: {
            top: `${height + spacing}px`,
            left: textAlign === "center" ? "50%" : textAlign === "right" ? "auto" : "0",
            right: textAlign === "right" ? "0" : "auto",
            transform: textAlign === "center" ? "translateX(-50%)" : "none",
            maxWidth: `${maxWidth}px`,
            width: textAlign === "center" ? "max-content" : `${maxWidth}px`,
            minWidth: textAlign === "center" ? "max-content" : "auto",
            whiteSpace: textAlign === "center" ? "nowrap" : "normal",
          },
        };

      case "left":
        return {
          className: `${baseClasses} ${alignmentClasses[textAlign]}`,
          style: {
            right: `${width + spacing}px`,
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: `${maxWidth}px`,
            width: `${maxWidth}px`,
          },
        };

      case "right":
        return {
          className: `${baseClasses} ${alignmentClasses[textAlign]}`,
          style: {
            left: `${width + spacing}px`,
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: `${maxWidth}px`,
            width: `${maxWidth}px`,
          },
        };

      default:
        return {
          className: `${baseClasses} ${alignmentClasses[textAlign]}`,
          style: {
            top: `${height + spacing}px`,
            left: textAlign === "center" ? "50%" : "0",
            transform: textAlign === "center" ? "translateX(-50%)" : "none",
            width: textAlign === "center" ? "max-content" : `${width}px`,
            maxWidth: `${maxWidth}px`,
          },
        };
    }
  };

  // 아이콘 렌더링
  const renderIcon = () => {
    if (!icon) return null;

    const imageStyle = calculateImageSize();
    const sparkleStyle = getSparkleStyles();

    switch (iconType) {
      case "image":
        return (
          <img
            src={icon}
            alt={text}
            className={`${getSparkleClasses()}`}
            style={{
              ...imageStyle,
              ...sparkleStyle,
              objectFit: imageObjectFit,
              // 🔧 완전히 순수한 이미지 렌더링 - 모든 최적화 제거
              display: "block",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            draggable={false}
          />
        );

      case "emoji":
        return (
          <span
            className={`text-center ${getSparkleClasses()}`}
            style={{
              fontSize: `${Math.min(parseInt(imageStyle.width), parseInt(imageStyle.height)) * 0.6}px`,
              ...sparkleStyle,
              // 🔧 완전히 순수한 텍스트 렌더링 - 모든 최적화 제거
              display: "block",
              lineHeight: "1",
            }}
          >
            {icon}
          </span>
        );

      case "svg":
      default:
        return (
          <div
            className={`flex items-center justify-center ${getSparkleClasses()}`}
            style={{
              ...imageStyle,
              ...sparkleStyle,
              // 🔧 완전히 순수한 SVG 렌더링 - 모든 최적화 제거
              display: "flex",
            }}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        );
    }
  };

  // 연결점 위치 계산
  const getConnectionPoints = () => {
    return {
      top: { x: currentX + width / 2, y: currentY },
      right: { x: currentX + width, y: currentY + height / 2 },
      bottom: { x: currentX + width / 2, y: currentY + height },
      left: { x: currentX, y: currentY + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();
  const textPositionStyles = getTextPositionStyles();

  // 🆕 현재 z-index 값 가져오기 (우선순위: DiagramContext > priority prop > zIndex prop)
  const currentZIndex = getBoxZIndex ? getBoxZIndex(id) : priority !== null ? priority : zIndex;

  return (
    <div
      ref={boxRef}
      className={`absolute ${draggable ? "cursor-move" : "cursor-pointer"} ${additionalClasses}`}
      style={{
        // 🔧 순수한 위치 기반 렌더링 - 모든 transform 제거
        left: `${Math.round(currentX)}px`,
        top: `${Math.round(currentY)}px`,
        // 🆕 동적 z-index 적용
        zIndex: isDragging ? currentZIndex + 1000 : currentZIndex,
        // 🔧 이미지 선명도를 위한 기본 설정만 유지
        imageRendering: "auto",
        WebkitImageRendering: "auto",
        ...additionalStyles,
      }}
      data-box-id={id}
      onMouseDown={handleMouseDown}
    >
      {/* 메인 박스 - 이미지만 포함 */}
      <div
        className={`relative select-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${className} ${
          isDragging ? "shadow-2xl" : ""
        } ${sparkle && !isDragging ? "animate-pulse" : ""}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          padding: `${imagePadding}px`,
          // 🔧 순수한 렌더링 - 모든 transform 제거
          ...getSparkleStyles(),
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Image box: ${text} ${id ? `(ID: ${id})` : ""}`}
      >
        {/* 아이콘 영역 - 박스 전체를 차지 */}
        <div className="w-full h-full flex items-center justify-center">{renderIcon()}</div>

        {/* 🆕 드래그 가능 표시 */}
        {draggable && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-gray-400 rounded-full opacity-50 hover:opacity-100 transition-opacity">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
          </div>
        )}
      </div>

      {/* 🆕 텍스트 영역 - 설정된 위치에 배치 */}
      {text && (
        <div className={textPositionStyles.className} style={textPositionStyles.style}>
          <span>{text}</span>
        </div>
      )}

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-gray-600 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-gray-500"
          style={{
            left: `${point.x - currentX - 4}px`,
            top: `${point.y - currentY - 4}px`,
          }}
          data-connection-point={position}
          data-box-id={id}
          data-x={point.x}
          data-y={point.y}
          title={`연결점: ${position}`}
        />
      ))}
    </div>
  );
};

export default ImageBox;
