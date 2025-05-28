import {
  Settings,
  Circle,
  Square,
  Triangle as TriangleIcon,
  Zap,
  Power,
  RotateCw,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";

const Valve = ({
  type = "gate", // 'gate', 'ball', 'check', 'butterfly', 'needle'
  size = 50,
  x = 0,
  y = 0,
  isOpen = true,
  className = "text-amber-500 hover:text-amber-600 transition-colors duration-200",
  onClick = null,
  showIcon = false, // 새로운 prop: lucide 아이콘 표시 여부
  iconPosition = "top", // 'top', 'bottom', 'left', 'right'
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { x, y, size, type, isOpen });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // 밸브 타입에 따른 lucide 아이콘 선택
  const getValveIcon = () => {
    switch (type) {
      case "gate":
        return isOpen ? <Square className="w-4 h-4" /> : <Minus className="w-4 h-4" />;
      case "ball":
        return isOpen ? <Circle className="w-4 h-4" /> : <Power className="w-4 h-4" />;
      case "check":
        return isOpen ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />;
      case "butterfly":
        return isOpen ? <RotateCw className="w-4 h-4" /> : <Settings className="w-4 h-4" />;
      case "needle":
        return isOpen ? <Plus className="w-4 h-4" /> : <Zap className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  // 아이콘 위치 계산
  const getIconPosition = () => {
    const iconSize = 20;
    const offset = 8;

    switch (iconPosition) {
      case "top":
        return { x: size / 2 - iconSize / 2, y: -iconSize - offset };
      case "bottom":
        return { x: size / 2 - iconSize / 2, y: size + offset };
      case "left":
        return { x: -iconSize - offset, y: size / 2 - iconSize / 2 };
      case "right":
        return { x: size + offset, y: size / 2 - iconSize / 2 };
      default:
        return { x: size / 2 - iconSize / 2, y: -iconSize - offset };
    }
  };

  // 밸브 타입에 따른 SVG 경로 생성
  const getValvePath = () => {
    const center = size / 2;
    const quarter = size / 4;

    switch (type) {
      case "gate":
        return (
          <>
            <rect
              x={quarter}
              y={quarter}
              width={center}
              height={center}
              className="fill-current stroke-current stroke-2"
            />
            <line x1={center} y1={0} x2={center} y2={quarter} className="stroke-current stroke-2" />
            <line x1={center} y1={size - quarter} x2={center} y2={size} className="stroke-current stroke-2" />
            {!isOpen && (
              <line x1={quarter} y1={center} x2={size - quarter} y2={center} className="stroke-red-500 stroke-[3]" />
            )}
          </>
        );

      case "ball":
        return (
          <>
            <circle cx={center} cy={center} r={quarter} className="fill-current stroke-current stroke-2" />
            <line x1={center} y1={0} x2={center} y2={center - quarter} className="stroke-current stroke-2" />
            <line x1={center} y1={center + quarter} x2={center} y2={size} className="stroke-current stroke-2" />
            {isOpen ? (
              <line
                x1={center - quarter / 2}
                y1={center}
                x2={center + quarter / 2}
                y2={center}
                className="stroke-emerald-600 stroke-2"
              />
            ) : (
              <line
                x1={center}
                y1={center - quarter / 2}
                x2={center}
                y2={center + quarter / 2}
                className="stroke-red-500 stroke-2"
              />
            )}
          </>
        );

      case "check":
        return (
          <>
            <polygon
              points={`${quarter},${quarter} ${size - quarter},${quarter} ${center},${size - quarter}`}
              className="fill-current stroke-current stroke-2"
            />
            <line x1={center} y1={0} x2={center} y2={quarter} className="stroke-current stroke-2" />
            <line x1={center} y1={size - quarter} x2={center} y2={size} className="stroke-current stroke-2" />
          </>
        );

      case "butterfly":
        return (
          <>
            <circle cx={center} cy={center} r={quarter} className="fill-none stroke-current stroke-2" />
            <ellipse
              cx={center}
              cy={center}
              rx={isOpen ? 2 : quarter}
              ry={quarter}
              className="fill-current stroke-current stroke-2"
              transform={isOpen ? `rotate(90 ${center} ${center})` : ""}
            />
            <line x1={center} y1={0} x2={center} y2={quarter} className="stroke-current stroke-2" />
            <line x1={center} y1={size - quarter} x2={center} y2={size} className="stroke-current stroke-2" />
          </>
        );

      case "needle":
        return (
          <>
            <circle cx={center} cy={center} r={quarter} className="fill-none stroke-current stroke-2" />
            <line
              x1={center}
              y1={center - quarter}
              x2={center}
              y2={center + quarter}
              className="stroke-current stroke-2"
            />
            <line
              x1={center - quarter}
              y1={center}
              x2={center + quarter}
              y2={center}
              className="stroke-current stroke-2"
            />
            <circle
              cx={center}
              cy={center}
              r={quarter / 3}
              className={`fill-current ${isOpen ? "stroke-emerald-600" : "stroke-red-500"} stroke-2`}
            />
            <line x1={center} y1={0} x2={center} y2={quarter} className="stroke-current stroke-2" />
            <line x1={center} y1={size - quarter} x2={center} y2={size} className="stroke-current stroke-2" />
          </>
        );

      default:
        return (
          <>
            <rect
              x={quarter}
              y={quarter}
              width={center}
              height={center}
              className="fill-current stroke-current stroke-2"
            />
          </>
        );
    }
  };

  // 연결점 위치 계산
  const getConnectionPoints = () => {
    return {
      top: { x: x + size / 2, y: y },
      bottom: { x: x + size / 2, y: y + size },
      left: { x: x, y: y + size / 2 },
      right: { x: x + size, y: y + size / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();
  const iconPos = getIconPosition();

  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y }}>
      <svg
        width={size}
        height={size}
        className={`cursor-pointer transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`${type} valve - ${isOpen ? "open" : "closed"}`}
      >
        <g className="transition-colors duration-200 hover:opacity-80">{getValvePath()}</g>
      </svg>

      {/* Lucide 아이콘 표시 */}
      {showIcon && (
        <div
          className={`absolute flex items-center justify-center transition-all duration-200 ${
            isOpen ? "text-emerald-600" : "text-red-500"
          }`}
          style={{
            left: iconPos.x,
            top: iconPos.y,
            width: "20px",
            height: "20px",
          }}
        >
          {getValveIcon()}
        </div>
      )}

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-amber-600 rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-amber-500"
          style={{
            left: point.x - x - 4,
            top: point.y - y - 4,
          }}
          data-connection-point={position}
          data-x={point.x}
          data-y={point.y}
        />
      ))}
    </div>
  );
};

export default Valve;
