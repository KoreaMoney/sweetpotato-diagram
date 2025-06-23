declare module "sweet-diagram" {
  import { ReactNode, CSSProperties } from "react";

  // Component Props interfaces
  interface BoxProps {
    id?: string;
    text?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    textDirection?: "horizontal" | "vertical";
    verticalDirection?: "lr" | "rl";
    className?: string;
    onClick?: (event: any, data: any) => void;
  }

  interface DraggableBoxProps {
    id: string;
    initialX?: number;
    initialY?: number;
    width?: number;
    height?: number;
    title?: string;
    color?: string;
    children?: ReactNode;
    onDrag?: (position: { x: number; y: number }) => void;
  }

  interface ConnectorProps {
    fromBox?: { id: string; position: string };
    toBox?: { id: string; position: string };
    startPoint?: { x: number; y: number };
    endPoint?: { x: number; y: number };
    connectionType?: "straight" | "curved" | "orthogonal";
    arrowDirection?: "none" | "forward" | "backward" | "both";
    strokeWidth?: number;
    className?: string;
    animated?: boolean;
    showArrow?: boolean;
    arrowShape?: "triangle" | "diamond" | "circle" | "square";
    arrowColor?: string;
    arrowSize?: number;
    bendPoints?: { x: number; y: number }[];
  }

  interface ArrowProps {
    from?: { x: number; y: number };
    to?: { x: number; y: number };
    color?: string;
    strokeWidth?: number;
    arrowSize?: number;
  }

  interface LineProps {
    from?: { x: number; y: number };
    to?: { x: number; y: number };
    color?: string;
    strokeWidth?: number;
  }

  interface TriangleProps {
    x?: number;
    y?: number;
    size?: number;
    color?: string;
    rotation?: number;
    onClick?: () => void;
  }

  interface ValveProps {
    x?: number;
    y?: number;
    size?: number;
    isOpen?: boolean;
    onClick?: () => void;
  }

  interface ImageBoxProps extends BoxProps {
    // 기본 props
    text?: string;
    icon?: string;
    iconType?: "image" | "emoji" | "svg";

    // 텍스트 위치 관련 props
    textPosition?: "top" | "bottom" | "left" | "right";
    textClassName?: string;
    textSpacing?: number;
    textMaxWidth?: number | null;
    textAlign?: "left" | "center" | "right";

    // 이미지 크기 조절 관련 props
    imageWidth?: number | null;
    imageHeight?: number | null;
    imageScale?: number;
    imagePadding?: number;
    imageObjectFit?: "contain" | "cover" | "fill" | "scale-down" | "none";

    // 드래그 기능 관련 props
    draggable?: boolean;
    onDrag?: (position: { x: number; y: number }, info: { id: string; width: number; height: number }) => void;
    onDragEnd?: (position: { x: number; y: number }, info: { id: string; width: number; height: number }) => void;

    // 애니메이션 효과 관련 props
    sparkle?: boolean;
    sparkleColor?: string;
    sparkleIntensity?: "low" | "medium" | "high";

    // 위치 관련 props (prop 이름 변경 반영)
    x?: number;
    y?: number;

    // 기타 props
    src?: string; // 기존 호환성을 위해 유지
    alt?: string; // 기존 호환성을 위해 유지
  }

  interface DiagramProviderProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    width?: number;
    height?: number;
  }

  // Box data interface
  interface BoxData {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    element?: HTMLElement;
    text?: string;
    [key: string]: any;
  }

  // Connection data interface
  interface ConnectionData {
    id: string;
    fromBox?: { id: string; position: string };
    toBox?: { id: string; position: string };
    connectionType?: "straight" | "curved" | "orthogonal";
    arrowDirection?: "none" | "forward" | "backward" | "both";
    [key: string]: any;
  }

  // Diagram stats interface
  interface DiagramStats {
    boxCount: number;
    connectionCount: number;
    selectedBoxCount: number;
    canUndo: boolean;
    canRedo: boolean;
    scale: number;
    panOffset: { x: number; y: number };
    dynamicBoxCount?: number;
  }

  // Hook return type
  interface DiagramContext {
    // 박스 관리
    boxes: Map<string, BoxData>;
    registerBox: (id: string, boxInfo: any) => void;
    unregisterBox: (id: string) => void;
    updateBoxPosition: (id: string, newPosition: { x: number; y: number }) => void;
    getBox: (id: string) => BoxData | undefined;
    getAllBoxes: () => BoxData[];
    selectBox: (id: string, multiSelect?: boolean) => void;
    clearSelection: () => void;
    selectedBoxes: Set<string>;
    findBoxes: (predicate: (box: BoxData) => boolean) => BoxData[];

    // 동적 박스 관리
    addDynamicBox: (boxConfig: DynamicBoxConfig) => string;
    removeDynamicBox: (id: string) => void;
    dynamicBoxes: Map<string, DynamicBoxData>;

    // 연결 관리
    connections: ConnectionData[];
    addConnection: (connectionInfo: any) => string;
    removeConnection: (connectionId: string) => void;
    updateConnection: (connectionId: string, updates: any) => void;
    selectedConnection: string | null;
    setSelectedConnection: (connectionId: string | null) => void;
    getOptimalConnectionPoints: (fromBoxId: string, toBoxId: string) => any;
    findConnections: (predicate: (connection: ConnectionData) => boolean) => ConnectionData[];

    // 상태 관리
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    isConnecting: boolean;
    setIsConnecting: (isConnecting: boolean) => void;
    connectionStartBox: string | null;
    setConnectionStartBox: (boxId: string | null) => void;

    // 히스토리 관리
    undo: () => void;
    redo: () => void;
    saveState: () => void;
    clearDiagram: () => void;

    // 뷰 관리
    scale: number;
    setScale: (scale: number) => void;
    panOffset: { x: number; y: number };
    setPanOffset: (offset: { x: number; y: number }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;

    // 유틸리티
    getDiagramStats: () => DiagramStats;
    optimizeLayout: () => void;
    containerRef: React.RefObject<HTMLDivElement>;
  }

  // Component exports
  export const Box: React.FC<BoxProps>;
  export const DraggableBox: React.FC<DraggableBoxProps>;
  export const Connector: React.FC<ConnectorProps>;
  export const Arrow: React.FC<ArrowProps>;
  export const Line: React.FC<LineProps>;
  export const Triangle: React.FC<TriangleProps>;
  export const Valve: React.FC<ValveProps>;
  export const ImageBox: React.FC<ImageBoxProps>;
  export const DiagramProvider: React.FC<DiagramProviderProps>;

  // Hook export
  export function useDiagram(): DiagramContext;

  // useDiagram Hook 타입 정의
  export interface UseDiagramReturn {
    // 박스 관리
    boxes: Map<string, BoxData>;
    registerBox: (id: string, boxInfo: BoxInfo) => void;
    unregisterBox: (id: string) => void;
    updateBoxPosition: (id: string, position: { x: number; y: number }) => void;
    getBox: (id: string) => BoxData | undefined;
    getAllBoxes: () => BoxData[];
    selectBox: (id: string, multiSelect?: boolean) => void;
    clearSelection: () => void;
    selectedBoxes: Set<string>;
    findBoxes: (predicate: (box: BoxData) => boolean) => BoxData[];

    // 동적 박스 관리 (새로 추가)
    addDynamicBox: (boxConfig: DynamicBoxConfig) => string;
    removeDynamicBox: (id: string) => void;
    dynamicBoxes: Map<string, DynamicBoxData>;

    // 연결 관리
    connections: ConnectionData[];
    addConnection: (connectionInfo: ConnectionInfo) => string;
    removeConnection: (connectionId: string) => void;
    updateConnection: (connectionId: string, updates: Partial<ConnectionInfo>) => void;
    selectedConnection: string | null;
    setSelectedConnection: (connectionId: string | null) => void;
    getOptimalConnectionPoints: (fromBoxId: string, toBoxId: string) => ConnectionPoints | null;
    findConnections: (predicate: (connection: ConnectionData) => boolean) => ConnectionData[];

    // 상태 관리
    isDragging: boolean;
    setIsDragging: (isDragging: boolean) => void;
    isConnecting: boolean;
    setIsConnecting: (isConnecting: boolean) => void;
    connectionStartBox: string | null;
    setConnectionStartBox: (boxId: string | null) => void;

    // 히스토리 관리
    undo: () => void;
    redo: () => void;
    saveState: () => void;
    clearDiagram: () => void;

    // 뷰 관리
    scale: number;
    setScale: (scale: number) => void;
    panOffset: { x: number; y: number };
    setPanOffset: (offset: { x: number; y: number }) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;

    // 유틸리티
    getDiagramStats: () => DiagramStats;
    optimizeLayout: () => void;
    containerRef: React.RefObject<HTMLDivElement>;
  }

  // 동적 박스 설정 타입 (새로 추가)
  export interface DynamicBoxConfig {
    id?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    className?: string;
    onClick?: (event: React.MouseEvent, data: BoxData) => void;
    onMouseEnter?: (event: React.MouseEvent, data: BoxData) => void;
    onMouseLeave?: (event: React.MouseEvent, data: BoxData) => void;
    [key: string]: any;
  }

  // 동적 박스 데이터 타입 (새로 추가)
  export interface DynamicBoxData extends BoxData {
    className?: string;
    onClick?: (event: React.MouseEvent, data: BoxData) => void;
    onMouseEnter?: (event: React.MouseEvent, data: BoxData) => void;
    onMouseLeave?: (event: React.MouseEvent, data: BoxData) => void;
  }

  // 연결점 타입 (새로 추가)
  export interface ConnectionPoints {
    fromPosition: "top" | "bottom" | "left" | "right";
    toPosition: "top" | "bottom" | "left" | "right";
  }
}
