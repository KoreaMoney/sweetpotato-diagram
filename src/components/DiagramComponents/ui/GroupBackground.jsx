import React from "react";
import {
  getGroupStyleClasses,
  getGroupDynamicStyles,
  calculateGroupLabelPosition,
  getGroupLabelStyles,
} from "../utils/groupUtils";

/**
 * 그룹 배경 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.groupBackground - 그룹 배경 정보
 * @param {string} props.groupLabel - 그룹 라벨
 * @param {Array} props.groupBoxes - 그룹 내 박스들
 * @param {boolean} props.isDraggable - 드래그 가능 여부
 * @param {boolean} props.isDragging - 드래그 중 여부
 * @param {boolean} props.isHovering - 호버 중 여부
 * @param {Function} props.onMouseDown - 마우스 다운 핸들러
 * @param {Function} props.onMouseEnter - 마우스 진입 핸들러
 * @param {Function} props.onMouseLeave - 마우스 떠남 핸들러
 */
const GroupBackground = ({
  groupBackground,
  groupLabel,
  groupBoxes,
  isDraggable,
  isDragging,
  isHovering,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
}) => {
  const shouldShowLabel = groupBackground && groupLabel;
  const styleClasses = getGroupStyleClasses(isDraggable, isDragging, isHovering);
  const dynamicStyles = getGroupDynamicStyles(groupBackground, isDragging, isHovering);

  return (
    <div
      className={styleClasses}
      style={dynamicStyles}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={`${groupLabel} (${groupBoxes.length}개 박스) - ${isDraggable ? "드래그 가능" : "클릭만 가능"}`}
    >
      {/* 그룹 라벨 */}
      {shouldShowLabel && (
        <GroupLabel
          groupLabel={groupLabel}
          groupBoxes={groupBoxes}
          groupBackground={groupBackground}
          isDragging={isDragging}
          isHovering={isHovering}
        />
      )}

      {/* 드래그 중 시각적 피드백 */}
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg animate-pulse pointer-events-none" />
      )}

      {/* 호버 시 미묘한 그라데이션 효과 */}
      {isHovering && !isDragging && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-lg pointer-events-none transition-opacity duration-300" />
      )}
    </div>
  );
};

/**
 * 그룹 라벨 컴포넌트
 */
const GroupLabel = ({ groupLabel, groupBoxes, groupBackground, isDragging, isHovering }) => {
  const labelPos = calculateGroupLabelPosition(groupBackground);
  const labelStyles = getGroupLabelStyles(labelPos, groupBackground, isDragging, isHovering);

  return (
    <div
      className={`absolute px-3 py-1.5 text-xs font-bold rounded-lg shadow-md pointer-events-none 
        bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out
        ${isDragging ? "scale-105 shadow-lg" : isHovering ? "scale-102" : "scale-100"}`}
      style={labelStyles}
    >
      {groupLabel} ({groupBoxes.length})
    </div>
  );
};

export default GroupBackground;
