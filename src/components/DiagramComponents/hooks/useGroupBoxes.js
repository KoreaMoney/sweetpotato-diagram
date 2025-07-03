import { useState, useEffect } from "react";
import { useDiagram } from "../DiagramContext";
import { LOG_MESSAGES } from "../constants/groupConstants";

/**
 * 그룹 내 박스들을 관리하는 커스텀 훅
 * @param {string} groupId - 그룹 ID
 * @param {string} groupLabel - 그룹 라벨
 * @param {Object} groupStyle - 그룹 스타일
 * @param {Function} registerGroup - 그룹 등록 함수 (DiagramContext에서)
 */
export const useGroupBoxes = (groupId, groupLabel, groupStyle, registerGroup) => {
  const [groupBoxes, setGroupBoxes] = useState([]);

  // DiagramContext 사용 (선택적)
  let diagramRegisterBox;
  try {
    const context = useDiagram();
    diagramRegisterBox = context.registerBox;
  } catch {
    diagramRegisterBox = null;
  }

  // 그룹 등록
  useEffect(() => {
    if (groupId && registerGroup) {
      registerGroup(groupId, {
        label: groupLabel,
        style: groupStyle,
        boxIds: groupBoxes.map((box) => box.id),
      });
    }
  }, [groupId, groupLabel, groupStyle, registerGroup, groupBoxes]);

  // 박스 등록 함수
  const registerBox = (boxInfo) => {
    setGroupBoxes((prev) => {
      const existing = prev.find((box) => box.id === boxInfo.id);
      if (existing) {
        return prev.map((box) => (box.id === boxInfo.id ? { ...boxInfo } : box));
      } else {
        return [...prev, { ...boxInfo }];
      }
    });
  };

  // 박스 해제 함수
  const unregisterBox = (boxId) => {
    setGroupBoxes((prev) => prev.filter((box) => box.id !== boxId));
  };

  // 박스 위치 업데이트
  const updateBoxes = (updatedBoxes) => {
    setGroupBoxes(updatedBoxes);

    // 🔧 DiagramContext의 박스 위치도 함께 업데이트
    if (diagramRegisterBox) {
      updatedBoxes.forEach((box) => {
        const boxInfo = {
          id: box.id,
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          groupId: groupId,
        };
        diagramRegisterBox(box.id, boxInfo);
      });
    }
  };

  return {
    groupBoxes,
    registerBox,
    unregisterBox,
    updateBoxes,
  };
};
