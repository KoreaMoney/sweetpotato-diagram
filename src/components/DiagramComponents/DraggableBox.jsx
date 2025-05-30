import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDiagram } from "./DiagramContext";

const DraggableBox = ({
  id,
  initialX = 0,
  initialY = 0,
  width = 120,
  height = 80,
  title,
  color = "blue",
  children,
  onDrag,
  ...props
}) => {
  const { registerBox, unregisterBox, updateBoxPosition } = useDiagram();
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: initialX, y: initialY });

  // 드래그 중 임시 위치 (DOM transform 사용)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  // 박스 등록
  useEffect(() => {
    if (boxRef.current) {
      const boxInfo = {
        x: position.x,
        y: position.y,
        width,
        height,
        element: boxRef.current,
        title,
        color,
      };
      registerBox(id, boxInfo);
    }

    return () => {
      unregisterBox(id);
    };
  }, [id, registerBox, unregisterBox, width, height, title, color]);

  // 위치 변경 시 Context 업데이트 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (!isDragging) {
      updateBoxPosition(id, { x: position.x, y: position.y });
    }
  }, [position, id, updateBoxPosition, isDragging]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);

    const rect = boxRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    setDragPosition({ x: 0, y: 0 }); // transform 초기화
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const container = boxRef.current.parentElement;
      const containerRect = container.getBoundingClientRect();

      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      // 경계 체크
      const maxX = container.clientWidth - width;
      const maxY = container.clientHeight - height;

      const clampedX = Math.max(0, Math.min(maxX, newX));
      const clampedY = Math.max(0, Math.min(maxY, newY));

      // 드래그 중에는 transform을 사용하여 즉시 이동
      const deltaX = clampedX - position.x;
      const deltaY = clampedY - position.y;
      setDragPosition({ x: deltaX, y: deltaY });

      // Context 실시간 업데이트 (연결선용)
      updateBoxPosition(id, { x: clampedX, y: clampedY });

      if (onDrag) {
        onDrag({ x: clampedX, y: clampedY });
      }
    },
    [isDragging, dragOffset, position, width, height, updateBoxPosition, id, onDrag]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    // 드래그 완료 시 최종 위치로 상태 업데이트
    const finalX = position.x + dragPosition.x;
    const finalY = position.y + dragPosition.y;

    setPosition({ x: finalX, y: finalY });
    setDragPosition({ x: 0, y: 0 }); // transform 초기화
  }, [isDragging, position, dragPosition]);

  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const colorClasses = {
    blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
    green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
    red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
    purple: "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
    indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
  };

  // 드래그 중일 때와 아닐 때 다른 스타일 적용
  const transformStyle = isDragging ? { transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)` } : {};

  return (
    <div
      ref={boxRef}
      className={`absolute border-2 rounded-lg shadow-md cursor-move select-none ${
        colorClasses[color] || colorClasses.blue
      } ${isDragging ? "scale-105 shadow-lg z-50" : "z-10 transition-all duration-200"}`}
      style={{
        left: position.x,
        top: position.y,
        width,
        height,
        ...transformStyle,
      }}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="h-full flex flex-col items-center justify-center w-full">
        {title && <div className="text-sm font-semibold text-center">{title}</div>}
        {children && <div className="text-xs text-center opacity-70">{children}</div>}
        <div className="text-xs opacity-50">{id}</div>
      </div>

      {/* 연결점 표시 (호버 시) */}
      <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
        {/* Top */}
        <div className="absolute w-2 h-2 bg-gray-400 rounded-full -top-1 left-1/2 transform -translate-x-1/2" />
        {/* Right */}
        <div className="absolute w-2 h-2 bg-gray-400 rounded-full -right-1 top-1/2 transform -translate-y-1/2" />
        {/* Bottom */}
        <div className="absolute w-2 h-2 bg-gray-400 rounded-full -bottom-1 left-1/2 transform -translate-x-1/2" />
        {/* Left */}
        <div className="absolute w-2 h-2 bg-gray-400 rounded-full -left-1 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default DraggableBox;
