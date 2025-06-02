import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  console.log(`🚀 ${id} DraggableBox 생성 - 전달받은 props:`, {
    id,
    initialX: initialX,
    initialY: initialY,
    width,
    height,
    title,
    color,
    초기값변환: {
      x: Number(initialX) || 0,
      y: Number(initialY) || 0,
    },
  });

  // DiagramContext를 optional하게 사용
  let registerBox, unregisterBox, updateBoxPosition;
  try {
    const context = useDiagram();
    registerBox = context.registerBox;
    unregisterBox = context.unregisterBox;
    updateBoxPosition = context.updateBoxPosition;
  } catch (error) {
    console.error("DiagramContext 사용 오류:", error);
    // DiagramProvider가 없으면 context 기능을 사용하지 않음
    registerBox = null;
    unregisterBox = null;
    updateBoxPosition = null;
  }

  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // 초기 위치를 명확하게 설정
  const [position, setPosition] = useState({
    x: Number(initialX) || 0,
    y: Number(initialY) || 0,
  });

  // 드래그 중 임시 위치 (DOM transform 사용)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  // 등록된 여부를 추적하여 중복 등록 방지
  const isRegisteredRef = useRef(false);
  const lastPositionRef = useRef({ x: initialX, y: initialY });

  // initialX, initialY가 변경되면 즉시 position 업데이트
  useEffect(() => {
    const newX = Number(initialX) || 0;
    const newY = Number(initialY) || 0;
    console.log(`📍 ${id} 위치 설정:`, {
      initialX,
      initialY,
      newX,
      newY,
      width,
      height,
      계산된위치: { x: newX, y: newY },
    });
    setPosition({ x: newX, y: newY });
    lastPositionRef.current = { x: newX, y: newY };
  }, [initialX, initialY, id]);

  // 초기 박스 등록 (한 번만 실행)
  useEffect(() => {
    // DOM 요소가 완전히 렌더링된 후에 등록하도록 약간의 지연 추가
    const timer = setTimeout(() => {
      if (boxRef.current && registerBox && id && !isRegisteredRef.current) {
        console.log(`📦 ${id} 박스 등록:`, {
          position,
          width,
          height,
          element: !!boxRef.current,
        });

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
        isRegisteredRef.current = true;
        lastPositionRef.current = { x: position.x, y: position.y };

        // 등록 직후 확인 로그
        setTimeout(() => {
          if (registerBox && id) {
            // registerBox를 통해 등록된 상태를 간접적으로 확인
            console.log(`✅ ${id} 박스 등록 완료 - Context 함수들:`, {
              registerBox: !!registerBox,
              unregisterBox: !!unregisterBox,
              updateBoxPosition: !!updateBoxPosition,
            });
          }
        }, 100);
      }
    }, 10); // 10ms 지연

    return () => {
      clearTimeout(timer);
      if (unregisterBox && id && isRegisteredRef.current) {
        console.log(`🗑️ ${id} 박스 등록 해제`);
        unregisterBox(id);
        isRegisteredRef.current = false;
      }
    };
  }, [id, registerBox, unregisterBox, position.x, position.y]);

  // 박스 속성 업데이트 (위치 제외)
  useEffect(() => {
    if (registerBox && id && isRegisteredRef.current && boxRef.current) {
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
  }, [width, height, title, color]); // position 관련 의존성 완전 제거

  // 위치 변경 시 Context 업데이트 (드래그가 끝났을 때만)
  useEffect(() => {
    if (!isDragging && updateBoxPosition && id && isRegisteredRef.current) {
      // 실제로 위치가 변경된 경우에만 업데이트
      if (lastPositionRef.current.x !== position.x || lastPositionRef.current.y !== position.y) {
        lastPositionRef.current = { x: position.x, y: position.y };
        updateBoxPosition(id, { x: position.x, y: position.y });
      }
    }
  }, [position.x, position.y, isDragging, id]); // updateBoxPosition 의존성 제거

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
      if (!container) return;

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

      // Context 실시간 업데이트 (연결선용) - 드래그 중에만 직접 호출
      if (updateBoxPosition && isRegisteredRef.current) {
        // requestAnimationFrame으로 성능 최적화
        requestAnimationFrame(() => {
          updateBoxPosition(id, { x: clampedX, y: clampedY });
        });
      }

      if (onDrag) {
        onDrag({ x: clampedX, y: clampedY });
      }
    },
    [isDragging, dragOffset, position, width, height, id, onDrag, updateBoxPosition]
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
    primary:
      "bg-[#0066ff] border-[#0052cc] text-white hover:bg-[#0052cc] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105",
    secondary:
      "bg-white border-[#0066ff] text-[#0066ff] hover:bg-[#0066ff] hover:text-white hover:shadow-lg transition-all duration-300 hover:scale-105",
    dark: "bg-black border-gray-800 text-white hover:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105",
    light:
      "bg-white border-black text-black hover:bg-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105",
  };

  // 드래그 중일 때와 아닐 때 다른 스타일 적용
  const transformStyle = isDragging ? { transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)` } : {};

  // 실제 적용될 스타일 확인
  const finalStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${width}px`,
    height: `${height}px`,
    position: "absolute",
    ...transformStyle,
  };

  console.log(`🎨 ${id} 렌더링 스타일:`, finalStyle);

  return (
    <div
      ref={boxRef}
      className={`absolute border-2 rounded-xl shadow-md cursor-move select-none ${
        colorClasses[color] || colorClasses.primary
      } ${isDragging ? "scale-110 shadow-2xl z-50 rotate-1" : "z-10 transition-all duration-300"}`}
      style={finalStyle}
      data-box-id={id}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="h-full flex flex-col items-center justify-center w-full">
        {title && <div className="text-sm font-bold text-center leading-tight">{title}</div>}
        {children && <div className="text-xs text-center opacity-80 mt-1">{children}</div>}
        <div className="text-xs opacity-60 mt-1 font-mono">{id}</div>
      </div>

      {/* 연결점 표시 (호버 시) - 새로운 스타일 */}
      <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
        {/* Top */}
        <div className="absolute w-3 h-3 bg-[#0066ff] rounded-full -top-1.5 left-1/2 transform -translate-x-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform" />
        {/* Right */}
        <div className="absolute w-3 h-3 bg-[#0066ff] rounded-full -right-1.5 top-1/2 transform -translate-y-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform" />
        {/* Bottom */}
        <div className="absolute w-3 h-3 bg-[#0066ff] rounded-full -bottom-1.5 left-1/2 transform -translate-x-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform" />
        {/* Left */}
        <div className="absolute w-3 h-3 bg-[#0066ff] rounded-full -left-1.5 top-1/2 transform -translate-y-1/2 border-2 border-white shadow-lg hover:scale-125 transition-transform" />
      </div>
    </div>
  );
};

export default DraggableBox;
