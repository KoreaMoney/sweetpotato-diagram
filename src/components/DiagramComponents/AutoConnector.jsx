import React from "react";
import { useDiagram } from "./DiagramContext";

/**
 * AutoConnector 컴포넌트
 *
 * 박스 클릭 후 다른 지점 클릭으로 자동 연결되는 커넥터
 * 기존 Connector와 구분되는 추가 기능
 */
const AutoConnector = ({
  id,
  fromBoxId,
  toPoint, // { x: number, y: number }
  onRemove = null,
  // DiagramProvider가 없을 때 사용할 fallback props
  fromBoxInfo = null, // { x, y, width, height }
  settings = null, // AutoConnect 설정 오버라이드
}) => {
  // DiagramProvider가 없을 때도 작동하도록 옵셔널 사용
  let getBox, autoConnectSettings;

  try {
    const context = useDiagram();
    getBox = context.getBox;
    autoConnectSettings = context.autoConnectSettings;
  } catch (error) {
    // DiagramProvider가 없는 경우 기본값 사용
    console.warn("AutoConnector: DiagramProvider가 없어서 기본 설정으로 실행됩니다.");
    getBox = () => null;
    autoConnectSettings = {
      connectionType: "smart",
      color: "purple",
      strokeWidth: 3,
      arrowShape: "triangle",
      arrowSize: 12,
      animationType: "flow",
      animationSpeed: 2,
      curveStrength: 0.5,
      opacity: 0.8,
      showShadow: true,
    };
  }

  // 설정 병합 (props 설정이 우선)
  const finalSettings = { ...autoConnectSettings, ...settings };
  const {
    connectionType,
    color,
    strokeWidth,
    arrowShape,
    arrowSize,
    animationType,
    animationSpeed,
    curveStrength,
    opacity,
    showShadow,
  } = finalSettings;

  // 시작 박스 정보 가져오기 (Context 또는 props에서)
  const fromBox = getBox ? getBox(fromBoxId) : null;
  const finalFromBox = fromBox || fromBoxInfo;

  if (!finalFromBox || !toPoint) {
    return null;
  }

  // 박스의 최적 연결점 계산 (자동)
  const getOptimalConnectionPoint = () => {
    const boxCenterX = finalFromBox.x + finalFromBox.width / 2;
    const boxCenterY = finalFromBox.y + finalFromBox.height / 2;

    const dx = toPoint.x - boxCenterX;
    const dy = toPoint.y - boxCenterY;

    // 박스의 네 모서리 중 목표점에 가장 가까운 지점 선택
    const points = {
      top: { x: boxCenterX, y: finalFromBox.y },
      right: { x: finalFromBox.x + finalFromBox.width, y: boxCenterY },
      bottom: { x: boxCenterX, y: finalFromBox.y + finalFromBox.height },
      left: { x: finalFromBox.x, y: boxCenterY },
    };

    // 각도에 따라 최적 연결점 결정
    const angle = Math.atan2(dy, dx);

    if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
      return points.right; // 오른쪽
    } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
      return points.bottom; // 아래쪽
    } else if (angle >= (-3 * Math.PI) / 4 && angle < -Math.PI / 4) {
      return points.top; // 위쪽
    } else {
      return points.left; // 왼쪽
    }
  };

  const startPoint = getOptimalConnectionPoint();

  // 설정에 따른 경로 계산
  const calculatePath = () => {
    const dx = toPoint.x - startPoint.x;
    const dy = toPoint.y - startPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    switch (connectionType) {
      case "straight":
        return `M ${startPoint.x} ${startPoint.y} L ${toPoint.x} ${toPoint.y}`;

      case "curved":
        const controlX = startPoint.x + dx * curveStrength;
        const controlY = startPoint.y + dy * curveStrength;
        return `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`;

      case "orthogonal":
        const midX = startPoint.x + dx * 0.5;
        return `M ${startPoint.x} ${startPoint.y} L ${midX} ${startPoint.y} L ${midX} ${toPoint.y} L ${toPoint.x} ${toPoint.y}`;

      case "stepped":
        const stepX = startPoint.x + dx * 0.3;
        const stepY = startPoint.y + dy * 0.7;
        return `M ${startPoint.x} ${startPoint.y} L ${stepX} ${startPoint.y} L ${stepX} ${stepY} L ${toPoint.x} ${stepY} L ${toPoint.x} ${toPoint.y}`;

      case "smart":
      default:
        // Smart 모드 - 거리와 각도에 따라 자동 선택
        if (distance < 100) {
          return `M ${startPoint.x} ${startPoint.y} L ${toPoint.x} ${toPoint.y}`;
        } else if (Math.abs(dx) > Math.abs(dy) * 2) {
          // 수평 연결에 적합 - 곡선
          const controlX = startPoint.x + dx * curveStrength;
          const controlY = startPoint.y;
          return `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`;
        } else {
          // 일반적인 경우 - 부드러운 곡선
          const controlX = startPoint.x + dx * curveStrength;
          const controlY = startPoint.y + dy * curveStrength;
          return `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`;
        }
    }
  };

  // 화살표 계산
  const calculateArrow = () => {
    const dx = toPoint.x - startPoint.x;
    const dy = toPoint.y - startPoint.y;
    const angle = Math.atan2(dy, dx);

    const arrowLength = arrowSize;
    const arrowWidth = arrowSize * 0.6;

    const x1 = toPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
    const y1 = toPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
    const x2 = toPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
    const y2 = toPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

    return `M ${toPoint.x} ${toPoint.y} L ${x1} ${y1} M ${toPoint.x} ${toPoint.y} L ${x2} ${y2}`;
  };

  // 색상 클래스 계산
  const getColorClass = () => {
    const colorMap = {
      purple: "text-purple-500 hover:text-purple-600",
      blue: "text-blue-500 hover:text-blue-600",
      green: "text-green-500 hover:text-green-600",
      red: "text-red-500 hover:text-red-600",
      orange: "text-orange-500 hover:text-orange-600",
      pink: "text-pink-500 hover:text-pink-600",
      indigo: "text-indigo-500 hover:text-indigo-600",
      cyan: "text-cyan-500 hover:text-cyan-600",
    };
    return colorMap[color] || colorMap.purple;
  };

  // 애니메이션 스타일
  const getAnimationStyles = () => {
    if (animationType === "none") return {};

    const baseStyles = {
      opacity,
    };

    switch (animationType) {
      case "flow":
        return {
          ...baseStyles,
          strokeDasharray: "5,5",
          strokeDashoffset: "0",
          animation: `autoConnectorFlow ${animationSpeed}s linear infinite`,
        };
      case "pulse":
        return {
          ...baseStyles,
          animation: `autoConnectorPulse ${animationSpeed}s ease-in-out infinite`,
        };
      case "glow":
        return {
          ...baseStyles,
          filter: "drop-shadow(0 0 4px currentColor)",
          animation: `autoConnectorGlow ${animationSpeed}s ease-in-out infinite`,
        };
      case "electric":
        return {
          ...baseStyles,
          strokeDasharray: "3,3",
          animation: `autoConnectorElectric ${animationSpeed * 0.5}s linear infinite`,
        };
      default:
        return baseStyles;
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // 더블클릭으로만 제거하도록 변경
    if (event.detail === 2 && onRemove) {
      console.log(`연결선 ${id} 더블클릭으로 제거됨`);
      onRemove(id);
    } else {
      console.log(`연결선 ${id} 클릭됨 (더블클릭시 제거)`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (onRemove) {
        console.log(`연결선 ${id} ${event.key} 키로 제거됨`);
        onRemove(id);
      }
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const colorClass = getColorClass();
  const shadowFilter = showShadow ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" : "none";

  return (
    <>
      <svg
        className="absolute inset-0 pointer-events-none z-5"
        style={{ width: "100%", height: "100%", filter: shadowFilter }}
      >
        {/* 메인 연결선 */}
        <path
          d={calculatePath()}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={`pointer-events-auto cursor-pointer ${colorClass} transition-all duration-200 hover:opacity-70 hover:stroke-2`}
          style={getAnimationStyles()}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          role="button"
          aria-label={`자동 연결선 (더블클릭으로 제거) - 박스 ${fromBoxId}에서 포인트 ${toPoint.x}, ${toPoint.y}로`}
          title="더블클릭으로 제거"
        />

        {/* 화살표 */}
        {arrowShape !== "none" && (
          <g className={colorClass}>
            {arrowShape === "triangle" && (
              <path d={calculateArrow()} stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
            )}
            {arrowShape === "diamond" && (
              <polygon
                points={`${toPoint.x},${toPoint.y - arrowSize} ${toPoint.x + arrowSize / 2},${toPoint.y} ${toPoint.x},${
                  toPoint.y + arrowSize
                } ${toPoint.x - arrowSize / 2},${toPoint.y}`}
                fill="currentColor"
              />
            )}
            {arrowShape === "circle" && <circle cx={toPoint.x} cy={toPoint.y} r={arrowSize / 2} fill="currentColor" />}
            {arrowShape === "square" && (
              <rect
                x={toPoint.x - arrowSize / 2}
                y={toPoint.y - arrowSize / 2}
                width={arrowSize}
                height={arrowSize}
                fill="currentColor"
              />
            )}
          </g>
        )}

        {/* 연결점 표시 (설정에 따라) */}
        {autoConnectSettings.showConnectionPoints && (
          <>
            {/* 연결 종료점 표시 */}
            <circle cx={toPoint.x} cy={toPoint.y} r={4} fill="currentColor" className={`${colorClass} opacity-80`} />

            {/* 시작점 표시 (박스 연결점) */}
            <circle
              cx={startPoint.x}
              cy={startPoint.y}
              r={3}
              fill="currentColor"
              className={`${colorClass} opacity-60`}
            />
          </>
        )}
      </svg>
    </>
  );
};

export default AutoConnector;
