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
  verticalDirection = "lr", // "lr" | "rl" - Vertical text direction (lr: left→right, rl: right→left)
  className = "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
  onClick = null,
}) => {
  // Use DiagramContext optionally
  let registerBox, unregisterBox;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
  } catch {
    // Don't use context functionality if DiagramProvider is not available
    registerBox = null;
    unregisterBox = null;
  }

  // Register/update Box information in Context (only when Context is available)
  useEffect(() => {
    if (id && registerBox) {
      const boxInfo = { id, x, y, width, height };
      registerBox(id, boxInfo);
    }
  }, [id, x, y, width, height, registerBox]);

  // Unregister when component unmounts (only when Context is available)
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

  // Determine style based on text direction
  const getTextStyle = () => {
    if (textDirection === "vertical") {
      return {
        writingMode: `vertical-${verticalDirection}`, // vertical-lr or vertical-rl
        textOrientation: "mixed",
        textAlign: "center",
      };
    }
    return {
      textAlign: "center",
    };
  };

  // Calculate connection point positions
  const getConnectionPoints = () => {
    return {
      top: { x: x + width / 2, y: y },
      right: { x: x + width, y: y + height / 2 },
      bottom: { x: x + width / 2, y: y + height },
      left: { x: x, y: y + height / 2 },
    };
  };

  const connectionPoints = getConnectionPoints();

  return (
    <div
      className={`absolute z-10 ${className}`}
      style={{
        left: `${x}px`, // Explicitly add px unit
        top: `${y}px`, // Explicitly add px unit
        width: `${width}px`,
        height: `${height}px`,
        transform: "translate3d(0,0,0)", // Utilize GPU acceleration
      }}
      data-box-id={id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="button"
      aria-label={`Box component: ${text} ${id ? `(ID: ${id})` : ""}`}
    >
      {/* Main box content */}
      <div className="flex items-center justify-center w-full h-full cursor-pointer select-none transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <span className="font-medium px-2 leading-tight" style={getTextStyle()}>
          {text}
        </span>
      </div>

      {/* Connection points */}
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
          title={`${id ? `${id} - ` : ""}${position} connection point`}
        />
      ))}
    </div>
  );
};

export default Box;
