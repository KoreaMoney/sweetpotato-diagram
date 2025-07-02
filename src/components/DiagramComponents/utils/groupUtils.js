import { LABEL_CONFIG, Z_INDEX } from "../constants/groupConstants";

/**
 * 그룹 배경 정보를 계산하는 함수
 * @param {string} groupId - 그룹 ID
 * @param {boolean} showGroupBackground - 배경 표시 여부
 * @param {Array} groupBoxes - 그룹 내 박스들
 * @param {Object} groupStyle - 그룹 스타일
 * @returns {Object|null} 그룹 배경 정보
 */
export const calculateGroupBackground = (groupId, showGroupBackground, groupBoxes, groupStyle) => {
  if (!groupId || !showGroupBackground || groupBoxes.length === 0) return null;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  groupBoxes.forEach((box) => {
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  });

  const padding = groupStyle.padding || 15;
  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
    style: groupStyle,
  };
};

/**
 * 그룹 라벨 위치를 계산하는 함수
 * @param {Object} groupBackground - 그룹 배경 정보
 * @returns {Object} 라벨 위치 정보
 */
export const calculateGroupLabelPosition = (groupBackground) => {
  if (groupBackground.y < LABEL_CONFIG.HEIGHT + LABEL_CONFIG.MIN_TOP_OFFSET) {
    return { position: "inside", top: LABEL_CONFIG.MIN_TOP_OFFSET, left: LABEL_CONFIG.HORIZONTAL_OFFSET };
  }
  return { position: "outside", top: -LABEL_CONFIG.HEIGHT - 4, left: LABEL_CONFIG.HORIZONTAL_OFFSET };
};

/**
 * 그룹 상태에 따른 스타일 클래스를 생성하는 함수
 * @param {boolean} isDraggable - 드래그 가능 여부
 * @param {boolean} isDragging - 드래그 중 여부
 * @param {boolean} isHovering - 호버 중 여부
 * @returns {string} CSS 클래스 문자열
 */
export const getGroupStyleClasses = (isDraggable, isDragging, isHovering) => {
  const baseClasses = "absolute select-none transition-all duration-300 ease-out border-2 backdrop-blur-sm";

  const cursorClasses = isDraggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer";

  const stateClasses = isDragging
    ? "opacity-80 shadow-2xl scale-[1.02] ring-4 ring-blue-500/30"
    : isHovering
    ? "shadow-xl scale-[1.01] ring-2 ring-blue-400/20"
    : "shadow-lg hover:shadow-xl";

  const hoverClasses = isHovering && !isDragging ? "opacity-95" : "";

  return `${baseClasses} ${cursorClasses} ${stateClasses} ${hoverClasses}`.trim();
};

/**
 * 그룹 상태에 따른 동적 스타일을 생성하는 함수
 * @param {Object} groupBackground - 그룹 배경 정보
 * @param {boolean} isDragging - 드래그 중 여부
 * @param {boolean} isHovering - 호버 중 여부
 * @returns {Object} 인라인 스타일 객체
 */
export const getGroupDynamicStyles = (groupBackground, isDragging, isHovering) => {
  return {
    left: `${groupBackground.x}px`,
    top: `${groupBackground.y}px`,
    width: `${groupBackground.width}px`,
    height: `${groupBackground.height}px`,
    backgroundColor: groupBackground.style.backgroundColor,
    borderColor: groupBackground.style.borderColor,
    borderRadius: `${groupBackground.style.borderRadius}px`,
    zIndex: isDragging ? Z_INDEX.DRAGGING : isHovering ? Z_INDEX.HOVER : Z_INDEX.DEFAULT,
    transform: isDragging ? "translateZ(0)" : isHovering ? "translateZ(0) translateY(-1px)" : "translateZ(0)",
    willChange: isDragging ? "transform, box-shadow" : "auto",
  };
};

/**
 * 그룹 라벨 스타일을 생성하는 함수
 * @param {Object} labelPos - 라벨 위치 정보
 * @param {Object} groupBackground - 그룹 배경 정보
 * @param {boolean} isDragging - 드래그 중 여부
 * @param {boolean} isHovering - 호버 중 여부
 * @returns {Object} 라벨 스타일 객체
 */
export const getGroupLabelStyles = (labelPos, groupBackground, isDragging, isHovering) => {
  return {
    top: `${labelPos.top}px`,
    left: `${labelPos.left}px`,
    color: groupBackground.style.borderColor,
    border: `2px solid ${groupBackground.style.borderColor}`,
    transform: isDragging ? "translateY(-2px)" : isHovering ? "translateY(-1px)" : "translateY(0)",
  };
};
