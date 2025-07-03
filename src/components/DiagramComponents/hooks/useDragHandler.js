import { useState, useRef, useEffect } from "react";
import { DRAG_THRESHOLD, ANIMATION_DURATION, Z_INDEX, TRANSITIONS, LOG_MESSAGES } from "../constants/groupConstants";

/**
 * 그룹 드래그 기능을 처리하는 커스텀 훅
 * @param {Object} params - 드래그 핸들러 설정
 * @param {boolean} params.isDraggable - 드래그 가능 여부
 * @param {Function} params.onDragStart - 드래그 시작 콜백
 * @param {Function} params.onDrag - 드래그 중 콜백
 * @param {Function} params.onDragEnd - 드래그 종료 콜백
 * @param {Function} params.onClick - 클릭 콜백
 * @param {Array} params.groupBoxes - 그룹 내 박스들
 * @param {string} params.groupId - 그룹 ID
 * @param {string} params.groupLabel - 그룹 라벨
 */
export const useDragHandler = ({
  isDraggable,
  onDragStart,
  onDrag,
  onDragEnd,
  onClick,
  groupBoxes,
  groupId,
  groupLabel,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    hasMoved: false,
    animationFrame: null,
  });

  // 부드러운 박스 이동 함수
  const smoothMoveBoxes = (deltaX, deltaY) => {
    groupBoxes.forEach((box) => {
      const boxElement = document.querySelector(`[data-box-id="${box.id}"]`);
      if (boxElement) {
        boxElement.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        boxElement.style.zIndex = Z_INDEX.DRAGGING_BOX;
        boxElement.style.willChange = "transform";

        if (dragState.current.hasMoved) {
          boxElement.style.transition = "none";
        }
      }
    });
  };

  // 박스들을 원래 상태로 복원
  const resetBoxesTransform = () => {
    groupBoxes.forEach((box) => {
      const boxElement = document.querySelector(`[data-box-id="${box.id}"]`);
      if (boxElement) {
        boxElement.style.transition = TRANSITIONS.TRANSFORM_RESET;
        boxElement.style.transform = "";
        boxElement.style.zIndex = "";
        boxElement.style.willChange = "";

        setTimeout(() => {
          if (boxElement.style.transition) {
            boxElement.style.transition = "";
          }
        }, ANIMATION_DURATION.TRANSFORM_RESET);
      }
    });
  };

  // 최종 위치로 박스들 이동
  const finalMoveBoxes = (updatedBoxes) => {
    updatedBoxes.forEach((box) => {
      const boxElement = document.querySelector(`[data-box-id="${box.id}"]`);
      if (boxElement) {
        boxElement.style.transition = TRANSITIONS.FINAL_MOVE;
        boxElement.style.transform = "";
        boxElement.style.left = `${box.x}px`;
        boxElement.style.top = `${box.y}px`;
        boxElement.style.zIndex = "";
        boxElement.style.willChange = "";

        setTimeout(() => {
          if (boxElement.style.transition) {
            boxElement.style.transition = "";
          }
        }, ANIMATION_DURATION.FINAL_MOVE);
      }
    });
  };

  // 마우스 이벤트 핸들러들
  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseDown = (event) => {
    if (!isDraggable || event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      startY: event.clientY,
      hasMoved: false,
      animationFrame: null,
    };

    setIsDragging(true);
    setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (event) => {
    if (!dragState.current.isDragging) return;

    if (dragState.current.animationFrame) {
      cancelAnimationFrame(dragState.current.animationFrame);
    }

    dragState.current.animationFrame = requestAnimationFrame(() => {
      const deltaX = event.clientX - dragState.current.startX;
      const deltaY = event.clientY - dragState.current.startY;

      if (!dragState.current.hasMoved && (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)) {
        dragState.current.hasMoved = true;
        if (onDragStart) {
          onDragStart(event, { groupId, groupLabel, boxes: groupBoxes });
        }
      }

      if (dragState.current.hasMoved) {
        smoothMoveBoxes(deltaX, deltaY);

        if (onDrag) {
          onDrag(event, { groupId, groupLabel, boxes: groupBoxes, deltaX, deltaY });
        }
      }
    });
  };

  const handleMouseUp = (event) => {
    if (dragState.current.animationFrame) {
      cancelAnimationFrame(dragState.current.animationFrame);
    }

    const deltaX = event.clientX - dragState.current.startX;
    const deltaY = event.clientY - dragState.current.startY;

    let updatedBoxes = groupBoxes;

    if (dragState.current.hasMoved) {
      updatedBoxes = groupBoxes.map((box) => ({
        ...box,
        x: box.x + deltaX,
        y: box.y + deltaY,
      }));

      finalMoveBoxes(updatedBoxes);

      if (onDragEnd) {
        onDragEnd(event, { groupId, groupLabel, boxes: updatedBoxes });
      }
    } else {
      resetBoxesTransform();

      if (onClick) {
        onClick(event, { groupId, groupLabel, boxes: groupBoxes });
      }
    }

    dragState.current.isDragging = false;
    setIsDragging(false);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";

    return updatedBoxes;
  };

  // 정리 함수
  useEffect(() => {
    return () => {
      if (dragState.current.animationFrame) {
        cancelAnimationFrame(dragState.current.animationFrame);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, []);

  return {
    isDragging,
    isHovering,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
  };
};
