import { createContext, useContext, useState, useCallback, useRef } from "react";
import Box from "./Box";

const DiagramContext = createContext();

export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagram must be used within a DiagramProvider");
  }
  return context;
};

export const DiagramProvider = ({ children, className = "", style = {}, width = null, height = null }) => {
  const [boxes, setBoxes] = useState(new Map());
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [selectedBoxes, setSelectedBoxes] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStartBox, setConnectionStartBox] = useState(null);
  const [diagramHistory, setDiagramHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [dynamicBoxes, setDynamicBoxes] = useState(new Map());
  const [autoConnections, setAutoConnections] = useState([]);
  const [isAutoConnectMode, setIsAutoConnectMode] = useState(false);
  const [autoConnectStartBox, setAutoConnectStartBox] = useState(null);
  const [autoConnectSettings, setAutoConnectSettings] = useState({
    connectionType: "smart", // "smart", "straight", "curved", "orthogonal", "stepped"
    color: "purple",
    strokeWidth: 3,
    arrowShape: "triangle", // "triangle", "diamond", "circle", "square", "none"
    arrowSize: 10,
    animationType: "flow", // "none", "flow", "pulse", "glow", "electric"
    animationSpeed: 2,
    curveStrength: 0.3,
    opacity: 1,
    showShadow: true,
    showConnectionPoints: true,
    autoCleanup: false,
    maxConnections: 20,
    smartSnap: true,
  });
  const containerRef = useRef(null);

  // Box 등록 - 위치 정보 포함
  const registerBox = useCallback((id, boxInfo) => {
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      const boxData = {
        id,
        x: boxInfo.x,
        y: boxInfo.y,
        width: boxInfo.width,
        height: boxInfo.height,
        element: boxInfo.element, // DOM 요소 참조
        ...boxInfo,
      };
      newBoxes.set(id, boxData);
      return newBoxes;
    });
  }, []);

  // 동적 박스 추가 (실제로 렌더링될 박스)
  const addDynamicBox = useCallback((boxConfig) => {
    const newId = boxConfig.id || `dynamic-box-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newBox = {
      id: newId,
      x: boxConfig.x || Math.random() * 400 + 50,
      y: boxConfig.y || Math.random() * 300 + 50,
      width: boxConfig.width || 120,
      height: boxConfig.height || 80,
      text: boxConfig.text || `박스 ${newId}`,
      className: boxConfig.className || "bg-blue-500 text-white border-blue-600 border-2 rounded-lg",
      ...boxConfig,
    };

    setDynamicBoxes((prev) => {
      const newDynamicBoxes = new Map(prev);
      newDynamicBoxes.set(newId, newBox);
      return newDynamicBoxes;
    });

    // 박스 정보를 boxes Map에도 등록
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      newBoxes.set(newId, newBox);
      return newBoxes;
    });

    return newId;
  }, []);

  // 동적 박스 제거
  const removeDynamicBox = useCallback((id) => {
    setDynamicBoxes((prev) => {
      const newDynamicBoxes = new Map(prev);
      newDynamicBoxes.delete(id);
      return newDynamicBoxes;
    });

    // 관련 정보도 모두 제거
    unregisterBox(id);
  }, []);

  // Box 위치 업데이트
  const updateBoxPosition = useCallback((id, newPosition) => {
    setBoxes((prev) => {
      const newBoxes = new Map(prev);
      const box = newBoxes.get(id);
      if (box) {
        // 위치가 실제로 변경된 경우에만 업데이트
        if (box.x !== newPosition.x || box.y !== newPosition.y) {
          const updatedBox = { ...box, ...newPosition };
          newBoxes.set(id, updatedBox);

          // 동적 박스도 업데이트
          setDynamicBoxes((prevDynamic) => {
            const newDynamicBoxes = new Map(prevDynamic);
            if (newDynamicBoxes.has(id)) {
              newDynamicBoxes.set(id, updatedBox);
            }
            return newDynamicBoxes;
          });

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
    // 선택된 박스에서도 제거
    setSelectedBoxes((prev) => {
      const newSelected = new Set(prev);
      newSelected.delete(id);
      return newSelected;
    });
  }, []);

  // Box 정보 가져오기
  const getBox = useCallback(
    (id) => {
      const box = boxes.get(id);
      return box;
    },
    [boxes]
  );

  // 모든 Box 정보를 배열로 가져오기
  const getAllBoxes = useCallback(() => {
    return Array.from(boxes.values());
  }, [boxes]);

  // 박스 선택/해제 (개선된 다중 선택)
  const selectBox = useCallback((id, multiSelect = false) => {
    setSelectedBoxes((prev) => {
      const newSelected = new Set();

      if (multiSelect) {
        // 다중 선택 모드
        newSelected.add(...prev);
        if (prev.has(id)) {
          newSelected.delete(id); // 이미 선택된 경우 해제
        } else {
          newSelected.add(id); // 선택되지 않은 경우 추가
        }
      } else {
        // 단일 선택 모드
        if (prev.has(id) && prev.size === 1) {
          // 이미 선택된 박스를 다시 클릭하면 해제
          // newSelected는 비어있음
        } else {
          // 새로운 박스 선택
          newSelected.add(id);
        }
      }

      return newSelected;
    });
  }, []);

  // 모든 박스 선택 해제
  const clearSelection = useCallback(() => {
    setSelectedBoxes(new Set());
  }, []);

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

  // 히스토리 관리
  const saveState = useCallback(() => {
    const currentState = {
      boxes: new Map(boxes),
      connections: [...connections],
      dynamicBoxes: new Map(dynamicBoxes),
      timestamp: Date.now(),
    };

    setDiagramHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(currentState);
      return newHistory.slice(-50); // 최대 50개 상태 유지
    });

    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [boxes, connections, dynamicBoxes, historyIndex]);

  // Undo 기능
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = diagramHistory[historyIndex - 1];
      setBoxes(new Map(previousState.boxes));
      setConnections([...previousState.connections]);
      setDynamicBoxes(new Map(previousState.dynamicBoxes || new Map()));
      setHistoryIndex((prev) => prev - 1);
    }
  }, [diagramHistory, historyIndex]);

  // Redo 기능
  const redo = useCallback(() => {
    if (historyIndex < diagramHistory.length - 1) {
      const nextState = diagramHistory[historyIndex + 1];
      setBoxes(new Map(nextState.boxes));
      setConnections([...nextState.connections]);
      setDynamicBoxes(new Map(nextState.dynamicBoxes || new Map()));
      setHistoryIndex((prev) => prev + 1);
    }
  }, [diagramHistory, historyIndex]);

  // 다이어그램 클리어
  const clearDiagram = useCallback(() => {
    setBoxes(new Map());
    setConnections([]);
    setDynamicBoxes(new Map());
    setSelectedBoxes(new Set());
    setSelectedConnection(null);
    saveState();
  }, [saveState]);

  // 줌 기능
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, 0.1));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // 다이어그램 통계
  const getDiagramStats = useCallback(() => {
    return {
      boxCount: boxes.size,
      connectionCount: connections.length,
      selectedBoxCount: selectedBoxes.size,
      canUndo: historyIndex > 0,
      canRedo: historyIndex < diagramHistory.length - 1,
      scale,
      panOffset,
    };
  }, [boxes.size, connections.length, selectedBoxes.size, historyIndex, diagramHistory.length, scale, panOffset]);

  // 박스 찾기
  const findBoxes = useCallback(
    (predicate) => {
      return Array.from(boxes.values()).filter(predicate);
    },
    [boxes]
  );

  // 연결선 찾기
  const findConnections = useCallback(
    (predicate) => {
      return connections.filter(predicate);
    },
    [connections]
  );

  // 박스 배치 최적화 (개선된 버전)
  const optimizeLayout = useCallback(() => {
    const boxArray = Array.from(boxes.values());
    if (boxArray.length === 0) return;

    const updatedBoxes = new Map();
    const iterations = 50; // 최적화 반복 횟수
    const containerWidth = 800;
    const containerHeight = 600;

    // 초기 위치 복사
    boxArray.forEach((box) => {
      updatedBoxes.set(box.id, { ...box });
    });

    // 포스 기반 레이아웃 알고리즘
    for (let iter = 0; iter < iterations; iter++) {
      const forces = new Map();

      // 각 박스에 대해 힘 계산
      boxArray.forEach((box) => {
        let fx = 0,
          fy = 0;
        const currentBox = updatedBoxes.get(box.id);

        // 다른 박스들과의 반발력 계산
        boxArray.forEach((otherBox) => {
          if (box.id !== otherBox.id) {
            const otherCurrentBox = updatedBoxes.get(otherBox.id);
            const dx = currentBox.x - otherCurrentBox.x;
            const dy = currentBox.y - otherCurrentBox.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = Math.min(1000 / (distance * distance), 10); // 최대 힘 제한

            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });

        // 연결된 박스들과의 인력 계산
        connections.forEach((conn) => {
          let targetBox = null;
          if (conn.fromBox?.id === box.id) {
            targetBox = updatedBoxes.get(conn.toBox?.id);
          } else if (conn.toBox?.id === box.id) {
            targetBox = updatedBoxes.get(conn.fromBox?.id);
          }

          if (targetBox) {
            const dx = targetBox.x - currentBox.x;
            const dy = targetBox.y - currentBox.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const idealDistance = 150; // 이상적인 연결 거리
            const force = (distance - idealDistance) * 0.05;

            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });

        // 중앙으로의 약한 인력
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const toCenterX = (centerX - currentBox.x) * 0.001;
        const toCenterY = (centerY - currentBox.y) * 0.001;

        fx += toCenterX;
        fy += toCenterY;

        forces.set(box.id, { fx, fy });
      });

      // 힘 적용 및 위치 업데이트
      boxArray.forEach((box) => {
        const force = forces.get(box.id);
        const currentBox = updatedBoxes.get(box.id);
        const damping = 0.1; // 감쇠 계수

        let newX = currentBox.x + force.fx * damping;
        let newY = currentBox.y + force.fy * damping;

        // 경계 체크
        newX = Math.max(10, Math.min(containerWidth - currentBox.width - 10, newX));
        newY = Math.max(10, Math.min(containerHeight - currentBox.height - 10, newY));

        updatedBoxes.set(box.id, {
          ...currentBox,
          x: newX,
          y: newY,
        });
      });
    }

    // 위치 업데이트 적용
    setBoxes(updatedBoxes);

    // 동적 박스도 업데이트
    setDynamicBoxes((prev) => {
      const newDynamicBoxes = new Map(prev);
      updatedBoxes.forEach((box, id) => {
        if (newDynamicBoxes.has(id)) {
          newDynamicBoxes.set(id, box);
        }
      });
      return newDynamicBoxes;
    });

    saveState();
  }, [boxes, connections, saveState]);

  // 자동 연결 관련 함수들
  const startAutoConnect = useCallback((boxId, clickPoint = null) => {
    setIsAutoConnectMode(true);
    setAutoConnectStartBox({ boxId, clickPoint }); // 박스 ID와 클릭 위치 함께 저장
  }, []);

  const cancelAutoConnect = useCallback(() => {
    setIsAutoConnectMode(false);
    setAutoConnectStartBox(null);
  }, []);

  const addAutoConnection = useCallback(
    (toPoint) => {
      if (!autoConnectStartBox) return null;

      const newAutoConnection = {
        id: `auto-conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fromBoxId: autoConnectStartBox.boxId || autoConnectStartBox, // 기존 호환성 유지
        toPoint: toPoint,
        userClickPoint: autoConnectStartBox.clickPoint || null, // 사용자 클릭 위치 저장
        type: "auto",
        createdAt: new Date().toISOString(),
      };

      setAutoConnections((prev) => [...prev, newAutoConnection]);

      // 자동 연결 모드 종료
      setIsAutoConnectMode(false);
      setAutoConnectStartBox(null);

      return newAutoConnection.id;
    },
    [autoConnectStartBox]
  );

  const removeAutoConnection = useCallback((connectionId) => {
    setAutoConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  }, []);

  const clearAutoConnections = useCallback(() => {
    setAutoConnections([]);
  }, []);

  const updateAutoConnectSettings = useCallback((newSettings) => {
    setAutoConnectSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetAutoConnectSettings = useCallback(() => {
    setAutoConnectSettings({
      connectionType: "smart",
      color: "purple",
      strokeWidth: 3,
      arrowShape: "triangle",
      arrowSize: 10,
      animationType: "flow",
      animationSpeed: 2,
      curveStrength: 0.3,
      opacity: 1,
      showShadow: true,
      showConnectionPoints: true,
      autoCleanup: false,
      maxConnections: 20,
      smartSnap: true,
    });
  }, []);

  const value = {
    // 박스 관리
    boxes,
    registerBox,
    unregisterBox,
    updateBoxPosition,
    getBox,
    getAllBoxes,
    selectBox,
    clearSelection,
    selectedBoxes,
    findBoxes,
    addDynamicBox,
    removeDynamicBox,
    dynamicBoxes,

    // 연결 관리
    connections,
    addConnection,
    removeConnection,
    updateConnection,
    selectedConnection,
    setSelectedConnection,
    getOptimalConnectionPoints,
    findConnections,

    // 상태 관리
    isDragging,
    setIsDragging,
    isConnecting,
    setIsConnecting,
    connectionStartBox,
    setConnectionStartBox,

    // 히스토리 관리
    undo,
    redo,
    saveState,
    clearDiagram,

    // 뷰 관리
    scale,
    setScale,
    panOffset,
    setPanOffset,
    zoomIn,
    zoomOut,
    resetZoom,

    // 유틸리티
    getDiagramStats,
    optimizeLayout,

    // 자동 연결 관련
    autoConnections,
    isAutoConnectMode,
    autoConnectStartBox,
    startAutoConnect,
    cancelAutoConnect,
    addAutoConnection,
    removeAutoConnection,
    clearAutoConnections,
    autoConnectSettings,
    updateAutoConnectSettings,
    resetAutoConnectSettings,

    // 컨테이너 관련
    containerRef,
  };

  // 기본 스타일과 사용자 스타일 병합
  const defaultStyle = {
    position: "relative",
    width: width !== null ? `${width}px` : "100%",
    height: height !== null ? `${height}px` : "100%",
    maxWidth: width !== null ? `${width}px` : "none",
    maxHeight: height !== null ? `${height}px` : "none",
    overflow: width !== null || height !== null ? "hidden" : "visible",
    ...style,
  };

  const combinedClassName = `sweet-diagram-provider diagram-container ${className}`;

  return (
    <DiagramContext.Provider value={value}>
      <div ref={containerRef} className={combinedClassName} style={defaultStyle}>
        {children}
        {/* 동적 박스 렌더링을 각 컴포넌트에서 직접 하도록 제거 */}
      </div>
    </DiagramContext.Provider>
  );
};

export default DiagramContext;
