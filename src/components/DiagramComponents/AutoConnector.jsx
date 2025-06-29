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
  userClickPoint = null, // 사용자가 실제로 클릭한 박스의 위치 { x, y }
}) => {
  // DiagramProvider가 없을 때도 작동하도록 옵셔널 사용
  let getBox, autoConnectSettings;

  try {
    const context = useDiagram();
    getBox = context.getBox;
    autoConnectSettings = context.autoConnectSettings;
  } catch {
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

  // 박스의 최적 연결점 계산 (사용자 클릭 위치 우선)
  const getOptimalConnectionPoint = () => {
    // 사용자가 클릭한 실제 위치가 있으면 그 위치를 박스 경계로 조정해서 사용
    if (userClickPoint) {
      const boxLeft = finalFromBox.x;
      const boxRight = finalFromBox.x + finalFromBox.width;
      const boxTop = finalFromBox.y;
      const boxBottom = finalFromBox.y + finalFromBox.height;

      // 클릭한 위치가 박스 내부라면 가장 가까운 경계로 이동
      let connectionX = userClickPoint.x;
      let connectionY = userClickPoint.y;

      // 박스 경계에 맞춰 조정
      if (connectionX >= boxLeft && connectionX <= boxRight) {
        // 수직 경계 (위/아래)
        if (Math.abs(connectionY - boxTop) < Math.abs(connectionY - boxBottom)) {
          connectionY = boxTop; // 위쪽 경계
        } else {
          connectionY = boxBottom; // 아래쪽 경계
        }
      } else if (connectionY >= boxTop && connectionY <= boxBottom) {
        // 수평 경계 (좌/우)
        if (Math.abs(connectionX - boxLeft) < Math.abs(connectionX - boxRight)) {
          connectionX = boxLeft; // 왼쪽 경계
        } else {
          connectionX = boxRight; // 오른쪽 경계
        }
      } else {
        // 모서리 처리 - 가장 가까운 모서리로 이동
        const distToTopLeft = Math.sqrt((connectionX - boxLeft) ** 2 + (connectionY - boxTop) ** 2);
        const distToTopRight = Math.sqrt((connectionX - boxRight) ** 2 + (connectionY - boxTop) ** 2);
        const distToBottomLeft = Math.sqrt((connectionX - boxLeft) ** 2 + (connectionY - boxBottom) ** 2);
        const distToBottomRight = Math.sqrt((connectionX - boxRight) ** 2 + (connectionY - boxBottom) ** 2);

        const minDist = Math.min(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight);

        if (minDist === distToTopLeft) {
          connectionX = boxLeft;
          connectionY = boxTop;
        } else if (minDist === distToTopRight) {
          connectionX = boxRight;
          connectionY = boxTop;
        } else if (minDist === distToBottomLeft) {
          connectionX = boxLeft;
          connectionY = boxBottom;
        } else {
          connectionX = boxRight;
          connectionY = boxBottom;
        }
      }

      return { x: connectionX, y: connectionY };
    }

    // 기존 자동 계산 로직 (userClickPoint가 없을 때)
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

      case "curved": {
        const controlX = startPoint.x + dx * curveStrength;
        const controlY = startPoint.y + dy * curveStrength;
        return `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`;
      }

      case "orthogonal": {
        // 박스의 연결점 방향을 고려한 직각 연결
        const boxCenterX = finalFromBox.x + finalFromBox.width / 2;
        const boxCenterY = finalFromBox.y + finalFromBox.height / 2;

        // 시작점이 박스의 어느 면에서 나오는지 판단
        const isHorizontalExit = startPoint.y === boxCenterY; // 좌/우 면
        const isVerticalExit = startPoint.x === boxCenterX; // 상/하 면

        if (isHorizontalExit) {
          // 좌/우 면에서 시작: 수평 → 수직
          const midX = toPoint.x;
          return `M ${startPoint.x} ${startPoint.y} L ${midX} ${startPoint.y} L ${midX} ${toPoint.y}`;
        } else if (isVerticalExit) {
          // 상/하 면에서 시작: 수직 → 수평
          const midY = toPoint.y;
          return `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${midY} L ${toPoint.x} ${midY}`;
        } else {
          // 기본값: 중점에서 꺾기
          const midX = startPoint.x + dx * 0.5;
          return `M ${startPoint.x} ${startPoint.y} L ${midX} ${startPoint.y} L ${midX} ${toPoint.y} L ${toPoint.x} ${toPoint.y}`;
        }
      }

      case "stepped": {
        // 더 자연스러운 계단식 - 방향에 따라 수평/수직 우선 결정
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (absX > absY) {
          // 수평 이동이 더 큰 경우: 수평 → 수직
          const midX = startPoint.x + dx * 0.7; // 70% 지점에서 꺾기
          return `M ${startPoint.x} ${startPoint.y} L ${midX} ${startPoint.y} L ${midX} ${toPoint.y} L ${toPoint.x} ${toPoint.y}`;
        } else {
          // 수직 이동이 더 큰 경우: 수직 → 수평
          const midY = startPoint.y + dy * 0.7; // 70% 지점에서 꺾기
          return `M ${startPoint.x} ${startPoint.y} L ${startPoint.x} ${midY} L ${toPoint.x} ${midY} L ${toPoint.x} ${toPoint.y}`;
        }
      }

      case "smart":
      default: {
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
    }
  };

  // 화살표 계산
  const calculateArrow = () => {
    const dx = toPoint.x - startPoint.x;
    const dy = toPoint.y - startPoint.y;
    const angle = Math.atan2(dy, dx);

    const arrowLength = arrowSize;

    const x1 = toPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
    const y1 = toPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
    const x2 = toPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
    const y2 = toPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

    return `M ${toPoint.x} ${toPoint.y} L ${x1} ${y1} M ${toPoint.x} ${toPoint.y} L ${x2} ${y2}`;
  };

  // 색상 클래스 계산 - TailwindCSS 커스텀 지원
  const getColorClass = () => {
    // 사용자가 직접 TailwindCSS 클래스를 입력한 경우 (공백이나 하이픈 포함)
    if (color && (color.includes(" ") || color.includes("-") || color.startsWith("text-"))) {
      return color; // 사용자 커스텀 TailwindCSS 클래스 그대로 사용
    }

    // 기본 제공 색상들
    const colorMap = {
      purple: "text-purple-500 hover:text-purple-600",
      blue: "text-blue-500 hover:text-blue-600",
      green: "text-green-500 hover:text-green-600",
      red: "text-red-500 hover:text-red-600",
      orange: "text-orange-500 hover:text-orange-600",
      pink: "text-pink-500 hover:text-pink-600",
      indigo: "text-indigo-500 hover:text-indigo-600",
      cyan: "text-cyan-500 hover:text-cyan-600",
      yellow: "text-yellow-500 hover:text-yellow-600",
      emerald: "text-emerald-500 hover:text-emerald-600",
      rose: "text-rose-500 hover:text-rose-600",
      violet: "text-violet-500 hover:text-violet-600",
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
      onRemove(id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      if (onRemove) {
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
