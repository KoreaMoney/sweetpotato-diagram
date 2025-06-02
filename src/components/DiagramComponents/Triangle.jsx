const Triangle = ({
  direction = "up", // 'up', 'down', 'left', 'right'
  size = 40,
  x = 0,
  y = 0,
  className = "text-emerald-600 hover:text-emerald-700 transition-colors duration-200",
  onClick = null,
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { x, y, size, direction });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // 방향에 따른 삼각형 점들 계산
  const getTrianglePoints = () => {
    const halfSize = size / 2;

    switch (direction) {
      case "up":
        return `${halfSize},0 0,${size} ${size},${size}`;
      case "down":
        return `0,0 ${size},0 ${halfSize},${size}`;
      case "left":
        return `${size},0 ${size},${size} 0,${halfSize}`;
      case "right":
        return `0,0 0,${size} ${size},${halfSize}`;
      default:
        return `${halfSize},0 0,${size} ${size},${size}`;
    }
  };

  // 연결점 위치 계산
  const getConnectionPoints = () => {
    const halfSize = size / 2;

    switch (direction) {
      case "up":
        return {
          top: { x: x + halfSize, y: y },
          bottom: { x: x + halfSize, y: y + size },
          left: { x: x, y: y + size },
          right: { x: x + size, y: y + size },
        };
      case "down":
        return {
          top: { x: x + halfSize, y: y },
          bottom: { x: x + halfSize, y: y + size },
          left: { x: x, y: y },
          right: { x: x + size, y: y },
        };
      case "left":
        return {
          top: { x: x + size, y: y },
          bottom: { x: x + size, y: y + size },
          left: { x: x, y: y + halfSize },
          right: { x: x + size, y: y + halfSize },
        };
      case "right":
        return {
          top: { x: x, y: y },
          bottom: { x: x, y: y + size },
          left: { x: x, y: y + halfSize },
          right: { x: x + size, y: y + halfSize },
        };
      default:
        return {
          top: { x: x + halfSize, y: y },
          bottom: { x: x + halfSize, y: y + size },
          left: { x: x, y: y + size },
          right: { x: x + size, y: y + size },
        };
    }
  };

  const connectionPoints = getConnectionPoints();

  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <svg
        width={size}
        height={size}
        className={`cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Triangle pointing ${direction}`}
      >
        <polygon
          points={getTrianglePoints()}
          className="fill-current stroke-current stroke-2 transition-colors duration-200 hover:opacity-80"
        />
      </svg>

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-emerald-600 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-emerald-500"
          style={{
            left: `${point.x - x - 4}px`,
            top: `${point.y - y - 4}px`,
          }}
          data-connection-point={position}
          data-x={point.x}
          data-y={point.y}
        />
      ))}
    </div>
  );
};

export default Triangle;
