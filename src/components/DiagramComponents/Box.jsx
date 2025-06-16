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
  verticalDirection = "lr", // "lr" | "rl" - 세로 텍스트 진행 방향 (lr: 왼쪽→오른쪽, rl: 오른쪽→왼쪽)
  className = "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
  onClick = null,
}) => {
  // DiagramContext를 optional하게 사용
  let registerBox, unregisterBox;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
  } catch {
    // DiagramProvider가 없으면 context 기능을 사용하지 않음
    registerBox = null;
    unregisterBox = null;
  }

  // Box 정보를 Context에 등록/업데이트 (Context가 있을 때만)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = { id, x, y, width, height };
      registerBox(id, boxInfo);
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

  // 텍스트 방향에 따른 스타일 결정
  const getTextStyle = () => {
    if (textDirection === "vertical") {
      return {
        writingMode: `vertical-${verticalDirection}`, // vertical-lr 또는 vertical-rl
        textOrientation: "mixed",
        textAlign: "center",
      };
    }
    return {
      textAlign: "center",
    };
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
      className={`absolute z-10 ${className}`}
      style={{
        left: `${x}px`, // 명시적으로 px 단위 추가
        top: `${y}px`, // 명시적으로 px 단위 추가
        width: `${width}px`,
        height: `${height}px`,
        transform: "translate3d(0,0,0)", // GPU 가속 활용
      }}
      data-box-id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Box component: ${text} ${id ? `(ID: ${id})` : ""}`}
    >
      {/* 메인 박스 내용 */}
      <div className="flex items-center justify-center w-full h-full cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <span className="font-medium px-2 leading-tight" style={getTextStyle()}>
          {text}
        </span>
      </div>

      {/* 연결점들 */}
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
          title={`${id ? `${id} - ` : ""}${position} 연결점`}
        />
      ))}
    </div>
  );
};

export default Box;
