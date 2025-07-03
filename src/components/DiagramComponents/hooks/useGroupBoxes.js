import { useState, useEffect, useCallback, useRef } from "react";
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

  // 🔧 무한 루프 방지를 위한 ref 추가
  const previousGroupData = useRef({});
  const isInitialMount = useRef(true);

  // DiagramContext 사용 (선택적)
  let diagramRegisterBox;
  try {
    const context = useDiagram();
    diagramRegisterBox = context.registerBox;
  } catch {
    diagramRegisterBox = null;
  }

  // 🔧 초기 그룹 등록 (groupBoxes 제외)
  useEffect(() => {
    if (groupId && registerGroup && isInitialMount.current) {
      const groupData = {
        label: groupLabel,
        style: groupStyle,
        boxIds: [],
      };

      // 이전 데이터와 비교하여 변경된 경우에만 등록
      const prevData = previousGroupData.current;
      if (
        !prevData.groupId ||
        prevData.groupId !== groupId ||
        prevData.label !== groupLabel ||
        JSON.stringify(prevData.style) !== JSON.stringify(groupStyle)
      ) {
        registerGroup(groupId, groupData);
        previousGroupData.current = { groupId, label: groupLabel, style: groupStyle };
      }

      isInitialMount.current = false;
    }
  }, [groupId, groupLabel, registerGroup]); // groupStyle과 groupBoxes 제거

  // 🔧 groupBoxes가 변경될 때만 그룹 정보 업데이트
  useEffect(() => {
    if (groupId && registerGroup && !isInitialMount.current) {
      const boxIds = groupBoxes.map((box) => box.id);

      // boxIds가 실제로 변경된 경우에만 업데이트
      if (JSON.stringify(previousGroupData.current.boxIds) !== JSON.stringify(boxIds)) {
        registerGroup(groupId, {
          label: groupLabel,
          style: groupStyle,
          boxIds,
        });
        previousGroupData.current.boxIds = boxIds;
      }
    }
  }, [groupBoxes]); // groupBoxes만 dependency로 설정

  // 박스 등록 함수 - useCallback으로 안정화
  const registerBox = useCallback((boxInfo) => {
    setGroupBoxes((prev) => {
      const existing = prev.find((box) => box.id === boxInfo.id);
      if (existing) {
        // 실제로 변경된 경우에만 업데이트
        const hasChanges = Object.keys(boxInfo).some((key) => existing[key] !== boxInfo[key]);
        if (hasChanges) {
          return prev.map((box) => (box.id === boxInfo.id ? { ...boxInfo } : box));
        }
        return prev; // 변경사항이 없으면 이전 상태 반환
      } else {
        return [...prev, { ...boxInfo }];
      }
    });
  }, []);

  // 박스 해제 함수 - useCallback으로 안정화
  const unregisterBox = useCallback((boxId) => {
    setGroupBoxes((prev) => {
      const filtered = prev.filter((box) => box.id !== boxId);
      return filtered.length !== prev.length ? filtered : prev; // 실제로 변경된 경우에만 새 배열 반환
    });
  }, []);

  // 박스 위치 업데이트 - useCallback으로 안정화
  const updateBoxes = useCallback(
    (updatedBoxes) => {
      setGroupBoxes((prev) => {
        // 실제로 변경사항이 있는지 확인
        if (JSON.stringify(prev) === JSON.stringify(updatedBoxes)) {
          return prev; // 변경사항이 없으면 이전 상태 반환
        }
        return updatedBoxes;
      });

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
    },
    [diagramRegisterBox, groupId]
  );

  return {
    groupBoxes,
    registerBox,
    unregisterBox,
    updateBoxes,
  };
};
