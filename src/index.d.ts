declare module "sweet-diagram" {
  import { ComponentType, ReactNode } from "react";

  // Box Props
  interface BoxProps {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: any, data: any) => void;
  }

  // DraggableBox Props
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
    onDragStart?: () => void;
    onDragEnd?: () => void;
  }

  // Connector Props
  interface ConnectorProps {
    fromBox?: { id: string; position: string; offset?: { x: number; y: number } };
    toBox?: { id: string; position: string; offset?: { x: number; y: number } };
    fromCustomPoint?: { x: number; y: number };
    toCustomPoint?: { x: number; y: number };
    fromBoxCustom?: { id: string; customPoint: { x: number; y: number } };
    toBoxCustom?: { id: string; customPoint: { x: number; y: number } };
    startPoint?: { x: number; y: number };
    endPoint?: { x: number; y: number };
    connectionType?: "straight" | "curved" | "orthogonal" | "stepped" | "custom" | "auto";
    strokeWidth?: number;
    className?: string;
    animated?: boolean;
    animationType?: "electric" | "water" | "wind" | "gas" | "data" | "dash";
    animationSpeed?: number;
    showArrow?: boolean;
    showStartArrow?: boolean;
    arrowDirection?: "forward" | "backward" | "both" | "none";
    arrowSize?: number;
    arrowColor?: string;
    arrowShape?: "triangle" | "diamond" | "circle" | "square";
    bendPoints?: Array<{ x: number; y: number }>;
    orthogonalDirection?: "horizontal-first" | "vertical-first" | "auto";
    stepOffset?: number;
    cornerRadius?: number;
  }

  // Arrow Props
  interface ArrowProps {
    from: { x: number; y: number };
    to: { x: number; y: number };
    color?: string;
    strokeWidth?: number;
    arrowSize?: number;
  }

  // Line Props
  interface LineProps {
    from: { x: number; y: number };
    to: { x: number; y: number };
    color?: string;
    strokeWidth?: number;
  }

  // Triangle Props
  interface TriangleProps {
    x: number;
    y: number;
    size?: number;
    color?: string;
    rotation?: number;
    onClick?: () => void;
  }

  // Valve Props
  interface ValveProps {
    x: number;
    y: number;
    size?: number;
    isOpen?: boolean;
    onClick?: () => void;
  }

  // ImageBox Props
  interface ImageBoxProps {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    src: string;
    alt?: string;
    draggable?: boolean;
  }

  // DiagramProvider Props
  interface DiagramProviderProps {
    children: ReactNode;
    width?: number;
    height?: number;
  }

  // MouseTracker Props
  interface MouseTrackerProps {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
    theme?: "dark" | "light" | "minimal";
    showDetails?: boolean;
    showToggle?: boolean;
    initialVisible?: boolean;
    customStyles?: {
      container?: React.CSSProperties;
      button?: React.CSSProperties;
      closeButton?: React.CSSProperties;
    };
    onPositionChange?: (position: { x: number; y: number }) => void;
    className?: string;
    children?: ReactNode;
  }

  // Hook return type
  interface DiagramContext {
    boxes: Map<string, any>;
    connectors: any[];
    addBox: (id: string, element: any) => void;
    removeBox: (id: string) => void;
    updateBox: (id: string, updates: any) => void;
  }

  // Component exports
  export const Box: ComponentType<BoxProps>;
  export const Connector: ComponentType<ConnectorProps>;
  export const Arrow: ComponentType<ArrowProps>;
  export const Line: ComponentType<LineProps>;
  export const Triangle: ComponentType<TriangleProps>;
  export const Valve: ComponentType<ValveProps>;
  export const ImageBox: ComponentType<ImageBoxProps>;
  export const DiagramProvider: ComponentType<DiagramProviderProps>;
  export const DraggableBox: ComponentType<DraggableBoxProps>;
  export const ConnectorExamples: ComponentType<any>;
  export const ArrowDemo: ComponentType<any>;
  export const CodeEditor: ComponentType<any>;
  export const Documentation: ComponentType<any>;
  export const MouseTracker: ComponentType<MouseTrackerProps>;
  export const AnimationExamples: ComponentType<any>;
  export const SweetDiagram: ComponentType<any>;

  // Hook export
  export function useDiagram(): DiagramContext;
}
