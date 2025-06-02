import React, { useEffect } from "react";
import { useDiagram } from "./DiagramContext";
import baseImage from "@/assets/logo.png";

const ImageBox = ({
  id = "",
  text = "",
  icon = baseImage,
  iconType = "image", // 기본값을 image로 변경
  width = 100,
  height = 80,
  x = 0,
  y = 0,
  // 🆕 이미지 크기 조절 관련 props
  imageWidth = null, // 이미지 절대 너비 (px)
  imageHeight = null, // 이미지 절대 높이 (px)
  imageScale = 1, // 이미지 크기 비율 (0.1 ~ 2.0)
  imagePadding = 8, // 이미지 주변 여백 (px)
  imageObjectFit = "contain", // 이미지 피팅 방식: contain, cover, fill, scale-down, none
  className = "bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg text-xs hover:shadow-lg hover:scale-105 transition-all duration-200",
  onClick = null,
}) => {
  // DiagramContext를 optional하게 사용
  let registerBox, unregisterBox;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
  } catch (error) {
    console.error("DiagramContext 사용 중 오류:", error);
    // DiagramProvider가 없으면 context 기능을 사용하지 않음
    registerBox = null;
    unregisterBox = null;
  }

  // ImageBox 정보를 Context에 등록/업데이트 (Context가 있을 때만)
  useEffect(() => {
    if (id && registerBox) {
      registerBox(id, { x, y, width, height });
    }
  }, [id, x, y, width, height, registerBox]);

  // 컴포넌트 언마운트 시 등록 해제 (Context가 있을 때만)
  useEffect(() => {
    return () => {
      if (id && unregisterBox) {
        unregisterBox(id);
      }
    };
  }, [id, unregisterBox]);

  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { id, x, y, width, height });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
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

  // 아이콘 렌더링
  const renderIcon = () => {
    if (!icon) return null;

    const imageStyle = calculateImageSize();

    switch (iconType) {
      case "image":
        return (
          <img
            src={icon}
            alt={text}
            className="transition-transform duration-200 hover:scale-110"
            style={{
              ...imageStyle,
              objectFit: imageObjectFit,
            }}
          />
        );

      case "emoji":
        return (
          <span
            className="text-center transition-transform duration-200 hover:scale-110"
            style={{
              fontSize: `${Math.min(parseInt(imageStyle.width), parseInt(imageStyle.height)) * 0.6}px`,
            }}
          >
            {icon}
          </span>
        );

      case "svg":
      default:
        return (
          <div
            className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
            style={imageStyle}
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        );
    }
  };

  // 연결점 위치 계산
  const getConnectionPoints = () => {
    return {
      top: { x: x + width / 2, y: y },
      right: { x: x + width, y: y + height / 2 },
      bottom: { x: x + width / 2, y: y + height },
      left: { x: x, y: y + height / 2 },
      center: { x: x + width / 2, y: y + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();

  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      data-box-id={id}
    >
      {/* 메인 박스 - 이미지만 포함 */}
      <div
        className={`relative cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          padding: `${imagePadding}px`,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Image box: ${text} ${id ? `(ID: ${id})` : ""}`}
      >
        {/* 아이콘 영역 - 박스 전체를 차지 */}
        <div className="w-full h-full flex items-center justify-center">{renderIcon()}</div>
      </div>

      {/* 텍스트 영역 - 박스 외부 하단에 위치 */}
      {text && (
        <div
          className="absolute text-center font-medium px-1"
          style={{
            top: `${height + 2}px`, // 박스 하단에서 2px 아래
            left: 0,
            width: `${width}px`,
          }}
        >
          <span className="break-words leading-tight text-xs">{text}</span>
        </div>
      )}

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-gray-600 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-gray-500"
          style={{
            left: `${point.x - x - 4}px`,
            top: `${point.y - y - 4}px`,
          }}
          data-connection-point={position}
          data-box-id={id}
          data-x={point.x}
          data-y={point.y}
          title={`${id ? `${id} - ` : ""}${position} 연결점`}
        />
      ))}
    </div>
  );
};

export default ImageBox;
