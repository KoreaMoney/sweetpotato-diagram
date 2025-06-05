declare module "sweet-diagram" {
  import { ComponentType, ReactNode } from "react";

  // Box Props
  interface BoxProps {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    draggable?: boolean;
    onClick?: () => void;
  }

  // Connector Props
  interface ConnectorProps {
    from: string;
    to: string;
    fromPosition?: "top" | "bottom" | "left" | "right";
    toPosition?: "top" | "bottom" | "left" | "right";
    color?: string;
    strokeWidth?: number;
    animated?: boolean;
    bidirectional?: boolean;
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
  export const DraggableBox: ComponentType<BoxProps>;
  export const ConnectorExamples: ComponentType<any>;
  export const ArrowDemo: ComponentType<any>;
  export const CodeEditor: ComponentType<any>;
  export const Documentation: ComponentType<any>;
  export const SweetDiagram: ComponentType<any>;

  // Hook export
  export function useDiagram(): DiagramContext;
}
