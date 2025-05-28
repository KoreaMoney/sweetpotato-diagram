import baseImage from "@/assets/chip.png";

const ImageBox = ({
  id = "",
  text = "",
  icon = baseImage,
  iconType = "image", // 기본값을 image로 변경
  width = 100,
  height = 80,
  x = 0,
  y = 0,
  className = "bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg text-xs hover:shadow-lg hover:scale-105 transition-all duration-200",
  onClick = null,
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event, { id, x, y, width, height, text });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick(event);
    }
  };

  // 아이콘 렌더링
  const renderIcon = () => {
    if (!icon) return null;

    switch (iconType) {
      case "image":
        return <img src={icon} alt={text} className="object-contain w-full h-full max-w-full max-h-full" />;

      case "emoji":
        return <span className="text-center text-2xl">{icon}</span>;

      case "svg":
      default:
        return (
          <div className="flex items-center justify-center w-full h-full" dangerouslySetInnerHTML={{ __html: icon }} />
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
    <div className="absolute" style={{ left: x, top: y }} data-box-id={id}>
      {/* 메인 박스 - 이미지만 포함 */}
      <div
        className={`relative cursor-pointer select-none p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`Image box: ${text} ${id ? `(ID: ${id})` : ""}`}
      >
        {/* 아이콘 영역 - 박스 전체를 차지 */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 hover:scale-110 p-2">
          {renderIcon()}
        </div>
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

export default ImageBox;
