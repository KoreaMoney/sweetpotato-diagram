import React, { createContext, useContext } from "react";
import { useDiagram } from "./DiagramContext";
import { useDragHandler } from "./hooks/useDragHandler";
import { useGroupBoxes } from "./hooks/useGroupBoxes";
import { calculateGroupBackground } from "./utils/groupUtils";
import { DEFAULT_GROUP_STYLE, LOG_MESSAGES } from "./constants/groupConstants";
import GroupBackground from "./ui/GroupBackground";

// GroupProvider의 Context 생성
const GroupContext = createContext(null);

// GroupProvider 훅
export const useGroup = () => {
  return useContext(GroupContext);
};

/**
 * 그룹 기능을 제공하는 Provider 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.groupId - 그룹 고유 ID
 * @param {string} props.groupLabel - 그룹 라벨
 * @param {Object} props.groupStyle - 그룹 스타일 설정
 * @param {boolean} props.showGroupBackground - 그룹 배경 표시 여부
 * @param {Function} props.onGroupClick - 그룹 클릭 이벤트 핸들러
 * @param {Function} props.onGroupDrag - 그룹 드래그 이벤트 핸들러
 * @param {Function} props.onGroupDragStart - 그룹 드래그 시작 이벤트 핸들러
 * @param {Function} props.onGroupDragEnd - 그룹 드래그 종료 이벤트 핸들러
 * @param {boolean} props.isDraggable - 드래그 가능 여부
 * @param {React.ReactNode} props.children - 자식 컴포넌트들
 */
const GroupProvider = ({
  groupId,
  groupLabel = "",
  groupStyle = DEFAULT_GROUP_STYLE,
  showGroupBackground = true,
  onGroupClick = null,
  onGroupDrag = null,
  onGroupDragStart = null,
  onGroupDragEnd = null,
  isDraggable = true,
  children,
}) => {
  // DiagramContext 사용 (선택적)
  let registerGroup;
  try {
    const context = useDiagram();
    registerGroup = context.registerGroup;
  } catch {
    registerGroup = null;
  }

  // 그룹 박스 관리 훅
  const { groupBoxes, registerBox, unregisterBox, updateBoxes } = useGroupBoxes(
    groupId,
    groupLabel,
    groupStyle,
    registerGroup
  );

  // 드래그 핸들러 훅
  const { isDragging, isHovering, handleMouseDown, handleMouseEnter, handleMouseLeave } = useDragHandler({
    isDraggable,
    onDragStart: onGroupDragStart,
    onDrag: onGroupDrag,
    onDragEnd: (event, data) => {
      updateBoxes(data.boxes);
      if (onGroupDragEnd) {
        onGroupDragEnd(event, data);
      }
    },
    onClick: onGroupClick,
    groupBoxes,
    groupId,
    groupLabel,
  });

  // 그룹 배경 계산
  const groupBackground = calculateGroupBackground(groupId, showGroupBackground, groupBoxes, groupStyle);

  // 그룹 컨텍스트 값
  const groupContextValue = {
    groupId,
    groupLabel,
    groupStyle,
    showGroupBackground,
    registerBox,
    unregisterBox,
    isDragging,
  };

  return (
    <GroupContext.Provider value={groupContextValue}>
      {/* 그룹 배경 렌더링 */}
      {groupBackground && groupLabel && (
        <GroupBackground
          groupBackground={groupBackground}
          groupLabel={groupLabel}
          groupBoxes={groupBoxes}
          isDraggable={isDraggable}
          isDragging={isDragging}
          isHovering={isHovering}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Children 렌더링 */}
      {children}
    </GroupContext.Provider>
  );
};

export default GroupProvider;
