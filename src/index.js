// CSS 스타일을 import하여 라이브러리에 포함
import "./index-minimal.css";

// 핵심 다이어그램 컴포넌트들만 export (라이브러리 최적화)
export {
  Connector,
  Box,
  Arrow,
  Line,
  Triangle,
  Valve,
  ImageBox,
  DraggableBox,
  DiagramProvider,
  useDiagram,
} from "./components/DiagramComponents";
