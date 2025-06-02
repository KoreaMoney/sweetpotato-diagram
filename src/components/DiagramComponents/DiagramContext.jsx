import { createContext, useContext, useState, useCallback, useRef } from "react";

const DiagramContext = createContext();

export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagram must be used within a DiagramProvider");
  }
  return context;
};

export const DiagramProvider = ({ children }) => {
  const [boxes, setBoxes] = useState(new Map());
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const containerRef = useRef(null);

  // Box 등록 - 위치 정보 포함
  const registerBox = useCallback((id, boxInfo) => {
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      newBoxes.set(id, {
        id,
        x: boxInfo.x,
        y: boxInfo.y,
        width: boxInfo.width,
        height: boxInfo.height,
        element: boxInfo.element, // DOM 요소 참조
        ...boxInfo,
      });
      return newBoxes;
    });
  }, []);

  // Box 위치 업데이트
  const updateBoxPosition = useCallback((id, newPosition) => {
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      const box = newBoxes.get(id);
      if (box) {
        // 위치가 실제로 변경된 경우에만 업데이트
        if (box.x !== newPosition.x || box.y !== newPosition.y) {
          newBoxes.set(id, { ...box, ...newPosition });
          return newBoxes;
        }
      }
      // 변경사항이 없으면 기존 Map 반환 (리렌더링 방지)
      return prev;
    });
  }, []);

  // Box 제거
  const unregisterBox = useCallback((id) => {
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      newBoxes.delete(id);
      return newBoxes;
    });
    // 해당 박스와 연결된 connections도 제거
    setConnections((prev) => prev.filter((conn) => conn.fromBox?.id !== id && conn.toBox?.id !== id));
  }, []);

  // Box 정보 가져오기
  const getBox = useCallback(
    (id) => {
      return boxes.get(id);
    },
    [boxes]
  );

  // 모든 Box 정보를 배열로 가져오기
  const getAllBoxes = useCallback(() => {
    return Array.from(boxes.values());
  }, [boxes]);

  // 연결 추가
  const addConnection = useCallback((connectionInfo) => {
    const newConnection = {
      id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...connectionInfo,
    };
    setConnections((prev) => [...prev, newConnection]);
    return newConnection.id;
  }, []);

  // 연결 제거
  const removeConnection = useCallback((connectionId) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  }, []);

  // 연결 업데이트
  const updateConnection = useCallback((connectionId, updates) => {
    setConnections((prev) => prev.map((conn) => (conn.id === connectionId ? { ...conn, ...updates } : conn)));
  }, []);

  // 박스 간의 최적 연결점 계산
  const getOptimalConnectionPoints = useCallback(
    (fromBoxId, toBoxId) => {
      const fromBox = boxes.get(fromBoxId);
      const toBox = boxes.get(toBoxId);

      if (!fromBox || !toBox) return null;

      // 박스들의 중심점 계산
      const fromCenter = {
        x: fromBox.x + fromBox.width / 2,
        y: fromBox.y + fromBox.height / 2,
      };
      const toCenter = {
        x: toBox.x + toBox.width / 2,
        y: toBox.y + toBox.height / 2,
      };

      // 방향에 따른 최적 연결점 계산
      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;

      let fromPosition, toPosition;

      if (Math.abs(dx) > Math.abs(dy)) {
        // 수평 연결이 더 적합
        if (dx > 0) {
          fromPosition = "right";
          toPosition = "left";
        } else {
          fromPosition = "left";
          toPosition = "right";
        }
      } else {
        // 수직 연결이 더 적합
        if (dy > 0) {
          fromPosition = "bottom";
          toPosition = "top";
        } else {
          fromPosition = "top";
          toPosition = "bottom";
        }
      }

      return { fromPosition, toPosition };
    },
    [boxes]
  );

  const value = {
    // 박스 관련
    boxes,
    registerBox,
    unregisterBox,
    updateBoxPosition,
    getBox,
    getAllBoxes,

    // 연결 관련
    connections,
    addConnection,
    removeConnection,
    updateConnection,
    selectedConnection,
    setSelectedConnection,
    getOptimalConnectionPoints,

    // 컨테이너 관련
    containerRef,
  };

  return <DiagramContext.Provider value={value}>{children}</DiagramContext.Provider>;
};

export default DiagramContext;
