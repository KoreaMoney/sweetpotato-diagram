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
  Wrench,
  Gauge,
  ThermometerSun,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Valve = ({
  type = "gate", // 'gate', 'ball', 'check', 'butterfly', 'needle'
  size = 50,
  x = 0,
  y = 0,
  isOpen = true,
  className = "text-amber-500 hover:text-amber-600 transition-colors duration-200",
  onClick = null,
  showIcon = false, // 아이콘 표시 여부
  customIcon = null, // 커스텀 아이콘 (lucide 컴포넌트 또는 JSX)
  iconPosition = "top", // 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
  iconSize = 16, // 아이콘 크기 (픽셀)
  iconColor = null, // 아이콘 색상 (null이면 밸브 상태에 따라 자동)
  iconOffset = 8, // 아이콘과 밸브 사이의 거리
  showStatus = false, // 상태 표시 아이콘 (정상, 경고, 오류)
  status = "normal", // 'normal', 'warning', 'error', 'maintenance'
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { x, y, size, type, isOpen, status });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // 밸브 타입에 따른 기본 lucide 아이콘 선택
  const getDefaultValveIcon = () => {
    const iconStyle = { width: `${iconSize}px`, height: `${iconSize}px` };

    switch (type) {
      case "gate":
        return isOpen ? <Square style={iconStyle} /> : <Minus style={iconStyle} />;
      case "ball":
        return isOpen ? <Circle style={iconStyle} /> : <Power style={iconStyle} />;
      case "check":
        return isOpen ? <ArrowRight style={iconStyle} /> : <ArrowLeft style={iconStyle} />;
      case "butterfly":
        return isOpen ? <RotateCw style={iconStyle} /> : <Settings style={iconStyle} />;
      case "needle":
        return isOpen ? <Plus style={iconStyle} /> : <Zap style={iconStyle} />;
      default:
        return <Settings style={iconStyle} />;
    }
  };

  // 상태 아이콘 선택
  const getStatusIcon = () => {
    const iconStyle = { width: `${iconSize}px`, height: `${iconSize}px` };

    switch (status) {
      case "normal":
        return <CheckCircle style={iconStyle} />;
      case "warning":
        return <AlertTriangle style={iconStyle} />;
      case "error":
        return <XCircle style={iconStyle} />;
      case "maintenance":
        return <Wrench style={iconStyle} />;
      default:
        return <Activity style={iconStyle} />;
    }
  };

  // 표시할 아이콘 결정
  const getDisplayIcon = () => {
    if (customIcon) {
      return customIcon;
    }
    if (showStatus) {
      return getStatusIcon();
    }
    return getDefaultValveIcon();
  };

  // 아이콘 위치 계산 (확장된 위치 옵션)
  const getIconPosition = () => {
    const halfIcon = iconSize / 2;
    const offset = iconOffset;

    switch (iconPosition) {
      case "top":
        return { x: size / 2 - halfIcon, y: -iconSize - offset };
      case "bottom":
        return { x: size / 2 - halfIcon, y: size + offset };
      case "left":
        return { x: -iconSize - offset, y: size / 2 - halfIcon };
      case "right":
        return { x: size + offset, y: size / 2 - halfIcon };
      case "top-left":
        return { x: -halfIcon - offset, y: -halfIcon - offset };
      case "top-right":
        return { x: size - halfIcon + offset, y: -halfIcon - offset };
      case "bottom-left":
        return { x: -halfIcon - offset, y: size - halfIcon + offset };
      case "bottom-right":
        return { x: size - halfIcon + offset, y: size - halfIcon + offset };
      case "center":
        return { x: size / 2 - halfIcon, y: size / 2 - halfIcon };
      default:
        return { x: size / 2 - halfIcon, y: -iconSize - offset };
    }
  };

  // 아이콘 색상 결정
  const getIconColor = () => {
    if (iconColor) {
      return iconColor;
    }

    if (showStatus) {
      switch (status) {
        case "normal":
          return "text-emerald-600";
        case "warning":
          return "text-yellow-500";
        case "error":
          return "text-red-500";
        case "maintenance":
          return "text-blue-500";
        default:
          return "text-gray-500";
      }
    }

    // 기본 아이콘의 경우 밸브 상태에 따라
    return isOpen ? "text-emerald-600" : "text-red-500";
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
        aria-label={`${type} valve - ${isOpen ? "open" : "closed"} - status: ${status}`}
      >
        <g className="transition-colors duration-200 hover:opacity-80">{getValvePath()}</g>
      </svg>

      {/* 🆕 개선된 아이콘 표시 */}
      {showIcon && (
        <div
          className={`absolute flex items-center justify-center transition-all duration-200 ${getIconColor()}`}
          style={{
            left: iconPos.x,
            top: iconPos.y,
            width: `${iconSize}px`,
            height: `${iconSize}px`,
          }}
          title={showStatus ? `Status: ${status}` : `${type} valve: ${isOpen ? "open" : "closed"}`}
        >
          {getDisplayIcon()}
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
