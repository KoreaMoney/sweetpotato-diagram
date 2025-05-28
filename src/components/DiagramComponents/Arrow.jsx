const Arrow = ({
  direction = "right",
  length = 100,
  strokeWidth = 2,
  startPoint = { x: 0, y: 0 },
  endPoint = null,
  className = "text-blue-600 hover:text-blue-700 transition-colors duration-200",
  arrowSize = 8,
  showStartArrow = false,
  showEndArrow = true,
  onClick = null,
}) => {
  // 안전한 값들 확보
  const safeStartPoint = {
    x: typeof startPoint?.x === "number" && !isNaN(startPoint.x) ? startPoint.x : 0,
    y: typeof startPoint?.y === "number" && !isNaN(startPoint.y) ? startPoint.y : 0,
  };

  const safeLength = typeof length === "number" && !isNaN(length) ? length : 100;
  const safeArrowSize = typeof arrowSize === "number" && !isNaN(arrowSize) ? arrowSize : 8;
  const safeStrokeWidth = typeof strokeWidth === "number" && !isNaN(strokeWidth) ? strokeWidth : 2;

  // 방향에 따른 끝점 계산
  const calculateEndPoint = () => {
    if (
      endPoint &&
      typeof endPoint.x === "number" &&
      typeof endPoint.y === "number" &&
      !isNaN(endPoint.x) &&
      !isNaN(endPoint.y)
    ) {
      return endPoint;
    }

    const directions = {
      right: { x: safeStartPoint.x + safeLength, y: safeStartPoint.y },
      left: { x: safeStartPoint.x - safeLength, y: safeStartPoint.y },
      up: { x: safeStartPoint.x, y: safeStartPoint.y - safeLength },
      down: { x: safeStartPoint.x, y: safeStartPoint.y + safeLength },
      "up-right": { x: safeStartPoint.x + safeLength * 0.7, y: safeStartPoint.y - safeLength * 0.7 },
      "down-right": { x: safeStartPoint.x + safeLength * 0.7, y: safeStartPoint.y + safeLength * 0.7 },
      "up-left": { x: safeStartPoint.x - safeLength * 0.7, y: safeStartPoint.y - safeLength * 0.7 },
      "down-left": { x: safeStartPoint.x - safeLength * 0.7, y: safeStartPoint.y + safeLength * 0.7 },
    };

    return directions[direction] || directions.right;
  };

  const end = calculateEndPoint();

  // 화살표 머리 계산 (끝점용)
  const calculateEndArrowHead = () => {
    const dx = end.x - safeStartPoint.x;
    const dy = end.y - safeStartPoint.y;
    const angle = Math.atan2(dy, dx);

    const arrowHead1 = {
      x: end.x - safeArrowSize * Math.cos(angle - Math.PI / 6),
      y: end.y - safeArrowSize * Math.sin(angle - Math.PI / 6),
    };

    const arrowHead2 = {
      x: end.x - safeArrowSize * Math.cos(angle + Math.PI / 6),
      y: end.y - safeArrowSize * Math.sin(angle + Math.PI / 6),
    };

    return { arrowHead1, arrowHead2 };
  };

  // 화살표 머리 계산 (시작점용)
  const calculateStartArrowHead = () => {
    const dx = safeStartPoint.x - end.x;
    const dy = safeStartPoint.y - end.y;
    const angle = Math.atan2(dy, dx);

    const arrowHead1 = {
      x: safeStartPoint.x - safeArrowSize * Math.cos(angle - Math.PI / 6),
      y: safeStartPoint.y - safeArrowSize * Math.sin(angle - Math.PI / 6),
    };

    const arrowHead2 = {
      x: safeStartPoint.x - safeArrowSize * Math.cos(angle + Math.PI / 6),
      y: safeStartPoint.y - safeArrowSize * Math.sin(angle + Math.PI / 6),
    };

    return { arrowHead1, arrowHead2 };
  };

  const endArrow = showEndArrow ? calculateEndArrowHead() : null;
  const startArrow = showStartArrow ? calculateStartArrowHead() : null;

  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { startPoint: safeStartPoint, endPoint: end, arrowSize: safeArrowSize });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  return (
    <svg
      className={`absolute ${onClick ? "cursor-pointer" : "pointer-events-none"} ${className}`}
      style={{
        left: Math.min(safeStartPoint.x, end.x) - safeArrowSize,
        top: Math.min(safeStartPoint.y, end.y) - safeArrowSize,
        width: Math.abs(end.x - safeStartPoint.x) + safeArrowSize * 2,
        height: Math.abs(end.y - safeStartPoint.y) + safeArrowSize * 2,
      }}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? "화살표" : undefined}
    >
      {/* 화살표 선 */}
      <line
        x1={safeStartPoint.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize}
        y1={safeStartPoint.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize}
        x2={end.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize}
        y2={end.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize}
        strokeWidth={safeStrokeWidth}
        className="stroke-current"
        strokeLinecap="round"
      />

      {/* 끝점 화살표 머리 */}
      {showEndArrow && endArrow && (
        <polygon
          points={`${end.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            end.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          } ${endArrow.arrowHead1.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            endArrow.arrowHead1.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          } ${endArrow.arrowHead2.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            endArrow.arrowHead2.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          }`}
          className="fill-current"
        />
      )}

      {/* 시작점 화살표 머리 */}
      {showStartArrow && startArrow && (
        <polygon
          points={`${safeStartPoint.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            safeStartPoint.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          } ${startArrow.arrowHead1.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            startArrow.arrowHead1.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          } ${startArrow.arrowHead2.x - Math.min(safeStartPoint.x, end.x) + safeArrowSize},${
            startArrow.arrowHead2.y - Math.min(safeStartPoint.y, end.y) + safeArrowSize
          }`}
          className="fill-current"
        />
      )}
    </svg>
  );
};

export default Arrow;
