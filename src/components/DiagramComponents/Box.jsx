const Box = ({
  id = "",
  text = "",
  width = 120,
  height = 60,
  x = 0,
  y = 0,
  className = "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
  onClick = null,
}) => {
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
    <div className={`absolute ${className}`} style={{ left: x, top: y }} data-box-id={id}>
      {/* 메인 박스 */}
      <div
        className={`flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Box component: ${text} ${id ? `(ID: ${id})` : ""}`}
      >
        <span className="font-medium text-center px-2 leading-tight">{text}</span>
      </div>

      {/* 연결점들 */}
      {Object.entries(connectionPoints).map(([position, point]) => (
        <div
          key={position}
          className="absolute w-2 h-2 bg-[#0066ff] rounded-full opacity-0 hover:opacity-100 transition-all duration-200 cursor-crosshair hover:scale-150 hover:bg-[#0066ff]"
          style={{
            left: point.x - x - 4,
            top: point.y - y - 4,
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
