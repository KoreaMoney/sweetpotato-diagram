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
  className = "bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg text-xs hover:shadow-lg hover:scale-105 transition-all duration-200",
  onClick = null,
}) => {
  // 🆕 드래그 상태 관리 (동적 위치로 변경)
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  // 현재 위치 (동적 위치 사용)
  const currentX = position.x;
  const currentY = position.y;

  // DiagramContext를 optional하게 사용 (에러 로깅 제거)
  let registerBox, unregisterBox, boxes;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
    boxes = context.boxes;
  } catch (error) {
    // DiagramProvider가 없으면 context 기능을 사용하지 않음 (에러 로깅 제거)
    registerBox = null;
    unregisterBox = null;
    boxes = null;
  }

  // 🆕 GroupProvider 컨텍스트 사용
  const groupContext = useGroup();

  // Props로 받은 초기 위치가 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  // DiagramContext에서 위치 변화를 감지하고 내부 상태 업데이트 (의존성 최적화)
  useEffect(() => {
    if (boxes && id) {
      const boxFromContext = boxes.get(id);
      if (boxFromContext && (boxFromContext.x !== position.x || boxFromContext.y !== position.y)) {
        setPosition({ x: boxFromContext.x, y: boxFromContext.y });
      }
    }
  }, [boxes, id]); // position 의존성 제거하여 무한 루프 방지

  // ImageBox 정보를 DiagramContext에 등록/업데이트 (마운트 시에만)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = {
        id,
        x: currentX,
        y: currentY,
        width,
        height,
        groupId: groupContext?.groupId || null,
      };
      registerBox(id, boxInfo);
    }
  }, [id]); // 마운트 시에만 실행하여 무한 렌더링 방지

  // 🆕 ImageBox를 GroupProvider에 등록 (마운트 시에만)
  useEffect(() => {
    if (id && groupContext?.registerBox) {
      const boxInfo = {
        id,
        x: currentX,
        y: currentY,
        width,
        height,
      };
      groupContext.registerBox(boxInfo);
    }
  }, [id]); // 마운트 시에만 실행하여 무한 렌더링 방지

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

  const handleMouseMove = (event) => {
    if (!isDragging || !draggable || groupContext?.isDragging) return;

    event.preventDefault();
    const newPosition = {
      x: event.clientX - dragStart.x,
      y: event.clientY - dragStart.y,
    };

    setPosition(newPosition);

    if (onDrag) {
      onDrag(newPosition, { id, width, height });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !draggable) return;

    setIsDragging(false);

    if (onDragEnd) {
      onDragEnd(position, { id, width, height });
    }
  };

  // 전역 마우스 이벤트 리스너 등록 (의존성 최적화)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]); // 불안정한 의존성들 제거하여 무한 렌더링 방지

  const handleClick = (event) => {
    if (onClick && !isDragging) {
      onClick(event, {
        id,
        x: currentX,
        y: currentY,
        width,
        height,
        groupId: groupContext?.groupId,
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
    if (!sparkle) return "";

    const intensityClasses = {
      low: "animate-pulse",
      medium: "animate-bounce",
      high: "animate-ping",
    };

    return `${intensityClasses[sparkleIntensity] || intensityClasses.medium}`;
  };

  // 🆕 반짝이는 효과 스타일
  const getSparkleStyles = () => {
    if (!sparkle) return {};

    return {
      filter: `drop-shadow(0 0 8px ${sparkleColor}) drop-shadow(0 0 16px ${sparkleColor}40)`,
      boxShadow: `0 0 20px ${sparkleColor}60, inset 0 0 20px ${sparkleColor}20`,
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
            className={`transition-transform duration-200 hover:scale-110 ${getSparkleClasses()}`}
            style={{
              ...imageStyle,
              ...sparkleStyle,
              objectFit: imageObjectFit,
            }}
          />
        );

      case "emoji":
        return (
          <span
            className={`text-center transition-transform duration-200 hover:scale-110 ${getSparkleClasses()}`}
            style={{
              fontSize: `${Math.min(parseInt(imageStyle.width), parseInt(imageStyle.height)) * 0.6}px`,
              ...sparkleStyle,
            }}
          >
            {icon}
          </span>
        );

      case "svg":
      default:
        return (
          <div
            className={`flex items-center justify-center transition-transform duration-200 hover:scale-110 ${getSparkleClasses()}`}
            style={{
              ...imageStyle,
              ...sparkleStyle,
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

  return (
    <div
      ref={boxRef}
      className={`absolute ${isDragging ? "z-50" : "z-10"} ${
        draggable ? "cursor-move" : "cursor-pointer"
      } ${additionalClasses}`}
      style={{
        left: `${currentX}px`,
        top: `${currentY}px`,
        ...additionalStyles,
      }}
      data-box-id={id}
      onMouseDown={handleMouseDown}
    >
      {/* 메인 박스 - 이미지만 포함 */}
      <div
        className={`relative select-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${className} ${
          isDragging ? "shadow-2xl scale-105" : ""
        } ${sparkle ? "animate-pulse" : ""}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          padding: `${imagePadding}px`,
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
