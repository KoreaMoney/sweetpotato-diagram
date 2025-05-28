const Line = ({
  startPoint = { x: 0, y: 0 },
  endPoint = { x: 100, y: 0 },
  strokeWidth = 2,
  lineType = "straight", // 'straight', 'curved', 'stepped'
  className = "text-gray-500 hover:text-gray-600 transition-colors duration-200",
  dashArray = null, // '5,5' for dashed line
}) => {
  // 안전한 값들 확보
  const safeStartPoint = {
    x: typeof startPoint?.x === "number" && !isNaN(startPoint.x) ? startPoint.x : 0,
    y: typeof startPoint?.y === "number" && !isNaN(startPoint.y) ? startPoint.y : 0,
  };

  const safeEndPoint = {
    x: typeof endPoint?.x === "number" && !isNaN(endPoint.x) ? endPoint.x : 100,
    y: typeof endPoint?.y === "number" && !isNaN(endPoint.y) ? endPoint.y : 0,
  };

  const safeStrokeWidth = typeof strokeWidth === "number" && !isNaN(strokeWidth) ? strokeWidth : 2;

  const calculatePath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    switch (lineType) {
      case "curved": {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const controlX = midX;
        const controlY = midY - Math.abs(x2 - x1) * 0.2;
        return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
      }

      case "stepped": {
        const stepX = x1 + (x2 - x1) * 0.5;
        return `M ${x1} ${y1} L ${stepX} ${y1} L ${stepX} ${y2} L ${x2} ${y2}`;
      }

      default: // straight
        return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
  };

  const minX = Math.min(safeStartPoint.x, safeEndPoint.x);
  const minY = Math.min(safeStartPoint.y, safeEndPoint.y);
  const maxX = Math.max(safeStartPoint.x, safeEndPoint.x);
  const maxY = Math.max(safeStartPoint.y, safeEndPoint.y);

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: minX - safeStrokeWidth,
        top: minY - safeStrokeWidth,
        width: maxX - minX + safeStrokeWidth * 2,
        height: maxY - minY + safeStrokeWidth * 2,
      }}
    >
      <path
        d={calculatePath()}
        strokeWidth={safeStrokeWidth}
        fill="none"
        strokeDasharray={dashArray}
        transform={`translate(${-minX + safeStrokeWidth}, ${-minY + safeStrokeWidth})`}
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 연결점 표시 */}
      <circle
        cx={safeStartPoint.x - minX + safeStrokeWidth}
        cy={safeStartPoint.y - minY + safeStrokeWidth}
        r="3"
        className="opacity-50 hover:opacity-100 transition-opacity fill-current"
      />
      <circle
        cx={safeEndPoint.x - minX + safeStrokeWidth}
        cy={safeEndPoint.y - minY + safeStrokeWidth}
        r="3"
        className="opacity-50 hover:opacity-100 transition-opacity fill-current"
      />
    </svg>
  );
};

export default Line;
