/**
 * Connector component
 *
 * A component that draws connection lines between two points or boxes.
 * Supports various connection styles, arrows, and animations.
 *
 * @param {Object} props - Component props
 *
 * === Basic coordinate connection method ===
 * @param {Object} startPoint - Start point coordinates { x: number, y: number }
 * @param {Object} endPoint - End point coordinates { x: number, y: number }
 *
 * === Box connection method (auto-detection) ===
 * @param {Object} fromBox - Source box information { id: string, position: string, offset: { x: number, y: number } }
 *   - position: "top" | "right" | "bottom" | "left" | "center"
 * @param {Object} toBox - Destination box information { id: string, position: string, offset: { x: number, y: number } }
 * ⚠️ Note: The boxes prop has been removed! Box information is now automatically retrieved through DiagramContext.
 *
 * === Free point connection method ===
 * @param {Object} fromCustomPoint - Start point free coordinates { x: number, y: number } (free point not specific to a box position)
 * @param {Object} toCustomPoint - End point free coordinates { x: number, y: number } (free point not specific to a box position)
 * @param {Object} fromBoxCustom - Free position of start box { id: string, customPoint: { x: number, y: number } }
 *   - customPoint: Relative position within the box (0~1 range, 0.5 is center)
 * @param {Object} toBoxCustom - Free position of destination box { id: string, customPoint: { x: number, y: number } }
 *
 * === Connection styles ===
 * @param {string} connectionType - Connection type
 *   - "straight": Straight line connection (default)
 *   - "curved": Curved connection (Bezier curve)
 *   - "orthogonal": Right-angle connection (L-shaped)
 *   - "stepped": Stepped connection
 *   - "custom": Custom path (uses bendPoints)
 *   - "auto": Automatically selected based on box positions
 *
 * === Styling ===
 * @param {number} strokeWidth - Line thickness (default: 2)
 * @param {string} className - CSS class (default: "text-gray-500 hover:text-gray-600 transition-colors duration-200")
 * @param {boolean} animated - Animation effect (default: false)
 * @param {string} animationType - Animation type "electric" | "water" | "wind" | "gas" | "data" | "dash" (default: "dash")
 * @param {number} animationSpeed - Animation speed (default: 2 seconds)
 *
 * === Arrows/Triangles ===
 * @param {boolean} showArrow - Show end point arrow (default: true)
 * @param {boolean} showStartArrow - Show start point arrow (default: false)
 * @param {number} arrowSize - Arrow size (default: 8)
 * @param {string} arrowDirection - Arrow direction "forward" | "backward" | "both" | "none" (default: "forward")
 * @param {string} arrowColor - Arrow color (default: "current" - inherits parent element color)
 * @param {string} arrowShape - Arrow shape "triangle" | "diamond" | "circle" | "square" (default: "triangle")
 *
 * === Advanced settings ===
 * @param {Array} bendPoints - Intermediate bend points [{ x: number, y: number }] (used when connectionType: "custom")
 * @param {number} cornerRadius - Corner rounding (default: 0)
 * @param {string} orthogonalDirection - Orthogonal connection direction "horizontal-first" | "vertical-first" | "auto"
 * @param {number} stepOffset - Intermediate point offset for orthogonal connections (default: 50)
 *
 * === Usage examples ===
 *
 * // 1. Basic straight connection
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 200, y: 200 }}
 * />
 *
 * // 2. Electric flow animation
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 150 }}
 *   animated={true}
 *   animationType="electric"
 *   animationSpeed={1.5}
 *   className="text-blue-500"
 * />
 *
 * // 3. Water flow animation
 * <Connector
 *   fromBox={{ id: "tank1", position: "right" }}
 *   toBox={{ id: "tank2", position: "left" }}
 *   animated={true}
 *   animationType="water"
 *   connectionType="curved"
 *   className="text-blue-600"
 * />
 *
 * // 4. Wind flow animation
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 400, y: 200 }}
 *   animated={true}
 *   animationType="wind"
 *   animationSpeed={0.8}
 *   className="text-gray-400"
 * />
 *
 * // 5. Gas flow animation
 * <Connector
 *   fromBox={{ id: "source", position: "bottom" }}
 *   toBox={{ id: "dest", position: "top" }}
 *   animated={true}
 *   animationType="gas"
 *   connectionType="orthogonal"
 *   className="text-yellow-500"
 * />
 *
 * // 6. Data transmission animation
 * <Connector
 *   startPoint={{ x: 50, y: 50 }}
 *   endPoint={{ x: 350, y: 250 }}
 *   animated={true}
 *   animationType="data"
 *   animationSpeed={1}
 *   className="text-green-500"
 * />
 *
 * // 7. Box-to-box connection (automatic Box detection!)
 * <Connector
 *   fromBox={{ id: "box1", position: "right" }}
 *   toBox={{ id: "box2", position: "left" }}
 *   connectionType="auto"
 * />
 *
 * // 8. Orthogonal connection (L-shaped)
 * <Connector
 *   fromBox={{ id: "box1", position: "bottom" }}
 *   toBox={{ id: "box2", position: "top" }}
 *   connectionType="orthogonal"
 *   orthogonalDirection="vertical-first"
 *   stepOffset={80}
 * />
 *
 * // 9. Custom path (specifying intermediate points)
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 400, y: 300 }}
 *   connectionType="custom"
 *   bendPoints={[
 *     { x: 200, y: 100 },
 *     { x: 200, y: 250 },
 *     { x: 350, y: 250 }
 *   ]}
 * />
 *
 * // 10. Bidirectional arrows with custom color and size
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 200 }}
 *   arrowDirection="both"
 *   arrowSize={12}
 *   arrowColor="red"
 *   arrowShape="diamond"
 *   className="text-blue-500"
 * />
 *
 * // 11. Box connection with offset
 * <Connector
 *   fromBox={{
 *     id: "box1",
 *     position: "right",
 *     offset: { x: 10, y: -5 }
 *   }}
 *   toBox={{
 *     id: "box2",
 *     position: "left",
 *     offset: { x: -10, y: 5 }
 *   }}
 * />
 *
 * // 12. Various arrow shapes and colors
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 200 }}
 *   arrowDirection="both"
 *   arrowShape="diamond"
 *   arrowColor="blue"
 *   arrowSize={15}
 * />
 *
 * // 13. Circle arrows
 * <Connector
 *   fromBox={{ id: "box1", position: "bottom" }}
 *   toBox={{ id: "box2", position: "top" }}
 *   arrowShape="circle"
 *   arrowColor="green"
 *   arrowSize={10}
 * />
 *
 * // 14. Square arrows (unidirectional)
 * <Connector
 *   startPoint={{ x: 50, y: 50 }}
 *   endPoint={{ x: 250, y: 150 }}
 *   arrowDirection="forward"
 *   arrowShape="square"
 *   arrowColor="red"
 *   connectionType="curved"
 * />
 *
 * // 15. Free point connection (absolute coordinates)
 * <Connector
 *   fromCustomPoint={{ x: 120, y: 80 }}
 *   toCustomPoint={{ x: 350, y: 220 }}
 *   connectionType="curved"
 * />
 *
 * // 16. Box custom point connection (relative coordinates)
 * <Connector
 *   fromBoxCustom={{
 *     id: "box1",
 *     customPoint: { x: 0.8, y: 0.3 } // 80% right, 30% down from top-left
 *   }}
 *   toBoxCustom={{
 *     id: "box2",
 *     customPoint: { x: 0.2, y: 0.7 } // 20% right, 70% down from top-left
 *   }}
 *   connectionType="straight"
 * />
 */

import React from "react";
import { useDiagram } from "./DiagramContext";

const Connector = ({
  // 기존 방식 (좌표 직접 지정)
  startPoint = null,
  endPoint = null,

  // 새로운 방식 (박스 연결 - 자동 감지)
  fromBox = null, // { id: "box1", position: "right", offset: { x: 0, y: 0 } }
  toBox = null, // { id: "box2", position: "left", offset: { x: 0, y: 0 } }

  // 자유 포인트 연결 방식
  fromCustomPoint = null, // { x: number, y: number } - 절대 좌표
  toCustomPoint = null, // { x: number, y: number } - 절대 좌표
  fromBoxCustom = null, // { id: string, customPoint: { x: 0~1, y: 0~1 } } - 박스 내 상대 위치
  toBoxCustom = null, // { id: string, customPoint: { x: 0~1, y: 0~1 } } - 박스 내 상대 위치

  connectionType = "straight", // 'straight', 'curved', 'orthogonal', 'stepped', 'custom'
  strokeWidth = 2,
  animated = false,
  animationType = "dash",
  animationSpeed = 2,
  className = "",
  arrowSize = 8,
  arrowDirection = "forward", // 'forward', 'backward', 'both', 'none'
  arrowColor = "current", // 'current', 'red', 'blue', etc.
  arrowShape = "triangle", // 'triangle', 'diamond', 'circle', 'square'
  bendPoints, // 중간 꺾임점들 [{ x: 150, y: 100 }, { x: 150, y: 200 }] - 기본값 제거
  cornerRadius = 0, // 모서리 둥글기
  orthogonalDirection = "auto", // 'horizontal-first', 'vertical-first', 'auto'
  stepOffset = 50, // orthogonal 연결에서 중간 지점 오프셋
}) => {
  // DiagramContext를 optional하게 사용
  let getBox = null;
  try {
    const context = useDiagram();
    getBox = context.getBox;
  } catch {
    // DiagramProvider가 없으면 박스 연결 기능을 사용하지 않음
    getBox = null;
  }

  // bendPoints를 안전하게 처리 - undefined는 그대로 유지
  const safeBendPoints = Array.isArray(bendPoints) ? bendPoints : undefined;

  // arrowDirection에 따른 화살표 표시 설정
  const shouldShowEndArrow =
    arrowDirection === "none" ? false : arrowDirection === "forward" || arrowDirection === "both";

  const shouldShowStartArrow =
    arrowDirection === "none" ? false : arrowDirection === "backward" || arrowDirection === "both";

  // 화살표 색상 클래스 생성
  const getArrowColorClass = () => {
    if (arrowColor === "current") {
      return "fill-current";
    }

    // 일반적인 색상 매핑
    const colorMap = {
      red: "fill-red-500",
      blue: "fill-blue-500",
      green: "fill-green-500",
      yellow: "fill-yellow-500",
      purple: "fill-purple-500",
      pink: "fill-pink-500",
      indigo: "fill-indigo-500",
      gray: "fill-gray-500",
      black: "fill-black",
      white: "fill-white",
    };

    return colorMap[arrowColor] || `fill-${arrowColor}` || "fill-current";
  };

  // 화살표 모양별 좌표 생성 함수
  const createArrowShape = (centerX, centerY, head1X, head1Y, head2X, head2Y, size) => {
    switch (arrowShape) {
      case "triangle":
        return `${centerX},${centerY} ${head1X},${head1Y} ${head2X},${head2Y}`;

      case "diamond": {
        // 화살표 방향 계산 (head1에서 center로의 방향)
        const angle = Math.atan2(head1Y - centerY, head1X - centerX);

        // 다이아몬드의 4개 점 계산 (앞쪽, 위쪽, 뒤쪽, 아래쪽)
        const frontX = centerX - size * 0.6 * Math.cos(angle);
        const frontY = centerY - size * 0.6 * Math.sin(angle);

        const backX = centerX + size * 0.6 * Math.cos(angle);
        const backY = centerY + size * 0.6 * Math.sin(angle);

        const topX = centerX + size * 0.4 * Math.cos(angle + Math.PI / 2);
        const topY = centerY + size * 0.4 * Math.sin(angle + Math.PI / 2);

        const bottomX = centerX + size * 0.4 * Math.cos(angle - Math.PI / 2);
        const bottomY = centerY + size * 0.4 * Math.sin(angle - Math.PI / 2);

        return `${frontX},${frontY} ${topX},${topY} ${backX},${backY} ${bottomX},${bottomY}`;
      }

      case "circle":
        // 원은 polygon 대신 circle 요소로 처리됨
        return null;

      case "square": {
        const squareSize = size * 0.8;
        const halfSize = squareSize / 2;
        return `${centerX - halfSize},${centerY - halfSize} ${centerX + halfSize},${centerY - halfSize} ${
          centerX + halfSize
        },${centerY + halfSize} ${centerX - halfSize},${centerY + halfSize}`;
      }

      default:
        return `${centerX},${centerY} ${head1X},${head1Y} ${head2X},${head2Y}`;
    }
  };

  // 원형 화살표 렌더링 함수
  const renderCircleArrow = (centerX, centerY, minX, minY) => {
    if (arrowShape !== "circle") return null;

    return <circle cx={centerX - minX} cy={centerY - minY} r={safeArrowSize * 0.6} className={getArrowColorClass()} />;
  };

  // 박스 연결점 계산 함수
  const getBoxConnectionPoint = (boxInfo, position, offset = { x: 0, y: 0 }) => {
    if (!boxInfo || typeof boxInfo.x !== "number" || typeof boxInfo.y !== "number") {
      return null;
    }

    const { x, y, width, height } = boxInfo;
    let point = { x: 0, y: 0 };

    switch (position) {
      case "top":
        point = { x: x + width / 2, y: y };
        break;
      case "right":
        point = { x: x + width, y: y + height / 2 };
        break;
      case "bottom":
        point = { x: x + width / 2, y: y + height };
        break;
      case "left":
        point = { x: x, y: y + height / 2 };
        break;
      case "center":
        point = { x: x + width / 2, y: y + height / 2 };
        break;
      default:
        point = { x: x + width / 2, y: y + height / 2 };
    }

    return {
      x: point.x + (offset?.x || 0),
      y: point.y + (offset?.y || 0),
    };
  };

  // 박스 내부의 자유 위치를 계산하는 함수 (상대 좌표 0~1을 절대 좌표로 변환)
  const getBoxCustomPoint = (boxCustomInfo) => {
    if (!getBox) return null;

    const box = getBox(boxCustomInfo.id);
    if (!box) return null;

    const { x: boxX, y: boxY, width, height } = box;
    const { customPoint } = boxCustomInfo;

    // customPoint.x, customPoint.y는 0~1 범위의 상대 좌표
    // 범위를 벗어나는 값은 0~1로 제한
    const normalizedX = Math.max(0, Math.min(1, customPoint.x));
    const normalizedY = Math.max(0, Math.min(1, customPoint.y));

    const connectionX = boxX + width * normalizedX;
    const connectionY = boxY + height * normalizedY;

    return {
      x: connectionX,
      y: connectionY,
    };
  };

  // 실제 시작점과 끝점 계산
  const calculateActualPoints = () => {
    let actualStartPoint = startPoint;
    let actualEndPoint = endPoint;

    // 1. 자유 포인트 연결 (절대 좌표) - 최우선
    if (fromCustomPoint && toCustomPoint) {
      actualStartPoint = fromCustomPoint;
      actualEndPoint = toCustomPoint;
    }
    // 2. 박스 자유 위치 연결 (상대 좌표)
    else if (fromBoxCustom && toBoxCustom && getBox) {
      const calculatedStart = getBoxCustomPoint(fromBoxCustom);
      const calculatedEnd = getBoxCustomPoint(toBoxCustom);

      if (calculatedStart && calculatedEnd) {
        actualStartPoint = calculatedStart;
        actualEndPoint = calculatedEnd;
      }
    }
    // 3. 혼합 연결 (기존 박스 + 자유 포인트)
    else if ((fromBox || fromBoxCustom) && (toBox || toBoxCustom || fromCustomPoint || toCustomPoint)) {
      // 시작점 계산
      if (fromBoxCustom && getBox) {
        actualStartPoint = getBoxCustomPoint(fromBoxCustom);
      } else if (fromBox && fromBox.id && getBox) {
        const startBox = getBox(fromBox.id);
        if (startBox) {
          actualStartPoint = getBoxConnectionPoint(startBox, fromBox.position, fromBox.offset);
        }
      } else if (fromCustomPoint) {
        actualStartPoint = fromCustomPoint;
      }

      // 끝점 계산
      if (toBoxCustom && getBox) {
        actualEndPoint = getBoxCustomPoint(toBoxCustom);
      } else if (toBox && toBox.id && getBox) {
        const endBox = getBox(toBox.id);
        if (endBox) {
          actualEndPoint = getBoxConnectionPoint(endBox, toBox.position, toBox.offset);
        }
      } else if (toCustomPoint) {
        actualEndPoint = toCustomPoint;
      }
    }
    // 4. 기존 박스 연결 방식
    else if (fromBox && toBox && fromBox.id && toBox.id && getBox) {
      const startBox = getBox(fromBox.id);
      const endBox = getBox(toBox.id);

      if (startBox && endBox) {
        const calculatedStart = getBoxConnectionPoint(startBox, fromBox.position, fromBox.offset);
        const calculatedEnd = getBoxConnectionPoint(endBox, toBox.position, toBox.offset);

        if (calculatedStart && calculatedEnd) {
          actualStartPoint = calculatedStart;
          actualEndPoint = calculatedEnd;
        }
      } else {
        // 박스를 찾지 못했지만 safeBendPoints가 있는 경우, safeBendPoints 사용
        if (safeBendPoints && safeBendPoints.length >= 2) {
          actualStartPoint = safeBendPoints[0];
          actualEndPoint = safeBendPoints[safeBendPoints.length - 1];
        }
      }
    }

    return { actualStartPoint, actualEndPoint };
  };

  const { actualStartPoint, actualEndPoint } = calculateActualPoints();

  // 안전한 좌표 값 확보 - 기본값 사용
  const safeStartPoint = {
    x: actualStartPoint?.x ?? 100,
    y: actualStartPoint?.y ?? 100,
  };

  const safeEndPoint = {
    x: actualEndPoint?.x ?? 300,
    y: actualEndPoint?.y ?? 200,
  };

  const safeArrowSize = typeof arrowSize === "number" && !isNaN(arrowSize) ? arrowSize : 8;
  const safeStrokeWidth = typeof strokeWidth === "number" && !isNaN(strokeWidth) ? strokeWidth : 2;

  // 자동 연결 타입 결정 (박스 연결시)
  const getAutoConnectionType = () => {
    // custom 타입인데 bendPoints가 없으면 straight로 fallback
    if (connectionType === "custom" && (!safeBendPoints || safeBendPoints.length === 0)) {
      console.warn(
        "⚠️ connectionType='custom'이지만 bendPoints가 정의되지 않았습니다. 'straight' 타입으로 fallback합니다."
      );
      return "straight";
    }

    if (connectionType !== "auto") return connectionType;

    if (fromBox && toBox && fromBox.position && toBox.position) {
      const { position: fromPos } = fromBox;

      // 같은 방향끼리 연결되면 곡선, 반대 방향이면 직선
      if (
        (fromPos === "right" && toBox.position === "left") ||
        (fromPos === "left" && toBox.position === "right") ||
        (fromPos === "top" && toBox.position === "bottom") ||
        (fromPos === "bottom" && toBox.position === "top")
      ) {
        return "straight";
      } else {
        return "orthogonal";
      }
    }

    return "straight";
  };

  const finalConnectionType = getAutoConnectionType();

  // 직교 연결 경로 계산 (개선된 버전)
  const calculateOrthogonalPath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    let path = `M ${x1} ${y1}`;

    // 박스 연결시 연결 방향에 따른 자동 경로 계산
    if (fromBox && toBox && fromBox.position && toBox.position) {
      const { position: fromPos } = fromBox;

      if (fromPos === "right" || fromPos === "left") {
        // 수평 시작
        const midX = fromPos === "right" ? x1 + stepOffset : x1 - stepOffset;
        path += ` L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
      } else {
        // 수직 시작
        const midY = fromPos === "bottom" ? y1 + stepOffset : y1 - stepOffset;
        path += ` L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
      }
    } else {
      // 기존 로직
      if (orthogonalDirection === "horizontal-first") {
        const midX = x1 + stepOffset;
        path += ` L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
      } else if (orthogonalDirection === "vertical-first") {
        const midY = y1 + stepOffset;
        path += ` L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
      } else {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        if (dx > dy) {
          const midX = x1 + (x2 - x1) * 0.5;
          path += ` L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
        } else {
          const midY = y1 + (y2 - y1) * 0.5;
          path += ` L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
        }
      }
    }

    return path;
  };

  // 계단식 연결 (여러 단계)
  const calculateSteppedPath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    const steps = 3; // 계단 수
    const stepX = (x2 - x1) / steps;
    const stepY = (y2 - y1) / steps;

    let path = `M ${x1} ${y1}`;

    for (let i = 1; i <= steps; i++) {
      const currentX = x1 + stepX * i;
      const currentY = y1 + stepY * (i - 1);
      const nextY = y1 + stepY * i;

      path += ` L ${currentX} ${currentY} L ${currentX} ${nextY}`;
    }

    return path;
  };

  // 커스텀 경로 (bendPoints 사용)
  const calculateCustomPath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    let path = `M ${x1} ${y1}`;

    // safeBendPoints가 정의되어 있고 배열인지 확인하고 중간 꺾임점들을 통과
    if (safeBendPoints && safeBendPoints.length > 0) {
      safeBendPoints.forEach((point) => {
        if (point && typeof point.x === "number" && typeof point.y === "number") {
          path += ` L ${point.x} ${point.y}`;
        }
      });

      // safeBendPoints의 마지막 점에서 endPoint로 연결
      // 단, 마지막 bendPoint가 endPoint와 다른 경우에만
      const lastBend = safeBendPoints[safeBendPoints.length - 1];
      if (lastBend && (lastBend.x !== x2 || lastBend.y !== y2)) {
        path += ` L ${x2} ${y2}`;
      }
    } else {
      // safeBendPoints가 없으면 직선 연결
      path += ` L ${x2} ${y2}`;
    }

    return path;
  };

  // 곡선 연결 경로 계산 (개선된 버전)
  const calculateCurvedPath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    const dx = x2 - x1;
    const dy = y2 - y1;

    // 박스 연결시 연결 방향에 따른 제어점 계산
    if (fromBox && toBox && fromBox.position && toBox.position) {
      const { position: fromPos } = fromBox;

      let cp1x = x1,
        cp1y = y1,
        cp2x = x2,
        cp2y = y2;

      if (fromPos === "right") {
        cp1x = x1 + Math.abs(dx) * 0.5;
      } else if (fromPos === "left") {
        cp1x = x1 - Math.abs(dx) * 0.5;
      } else if (fromPos === "bottom") {
        cp1y = y1 + Math.abs(dy) * 0.5;
      } else if (fromPos === "top") {
        cp1y = y1 - Math.abs(dy) * 0.5;
      }

      if (toBox.position === "left") {
        cp2x = x2 - Math.abs(dx) * 0.5;
      } else if (toBox.position === "right") {
        cp2x = x2 + Math.abs(dx) * 0.5;
      } else if (toBox.position === "top") {
        cp2y = y2 - Math.abs(dy) * 0.5;
      } else if (toBox.position === "bottom") {
        cp2y = y2 + Math.abs(dy) * 0.5;
      }

      return `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
    }

    // 기존 로직
    const distance = Math.sqrt(dx * dx + dy * dy);
    const controlOffset = Math.min(distance * 0.3, 100);

    const cp1x = x1 + controlOffset;
    const cp1y = y1;
    const cp2x = x2 - controlOffset;
    const cp2y = y2;

    return `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
  };

  // 직선 연결 경로 계산
  const calculateStraightPath = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    return `M ${x1} ${y1} L ${x2} ${y2}`;
  };

  // 연결 타입에 따른 경로 선택
  const getPath = () => {
    switch (finalConnectionType) {
      case "curved":
        return calculateCurvedPath();
      case "orthogonal":
        return calculateOrthogonalPath();
      case "stepped":
        return calculateSteppedPath();
      case "custom":
        return calculateCustomPath();
      default:
        return calculateStraightPath();
    }
  };

  // 모서리 둥글기 적용
  const getPathWithRadius = () => {
    const basePath = getPath();

    if (cornerRadius <= 0 || finalConnectionType === "curved") {
      return basePath;
    }

    // 간단한 모서리 둥글기 구현 (orthogonal에만 적용)
    if (finalConnectionType === "orthogonal") {
      // TODO: 복잡한 모서리 둥글기 로직 구현
      return basePath;
    }

    return basePath;
  };

  // 화살표 마커 계산 (개선된 버전)
  const calculateArrowMarker = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    // 박스 연결시에는 연결점에서의 정확한 방향 계산
    if (toBox && toBox.position && fromBox) {
      const { position: toPos } = toBox;
      let angle;

      // 도착 박스의 연결점 위치에 따른 화살표 방향 설정
      switch (toPos) {
        case "left":
          angle = 0; // 오른쪽에서 왼쪽으로
          break;
        case "right":
          angle = Math.PI; // 왼쪽에서 오른쪽으로
          break;
        case "top":
          angle = Math.PI / 2; // 아래에서 위로
          break;
        case "bottom":
          angle = -Math.PI / 2; // 위에서 아래로
          break;
        default:
          // 일반적인 방향 계산
          angle = Math.atan2(y2 - y1, x2 - x1);
      }

      const arrowHead1 = {
        x: x2 - safeArrowSize * Math.cos(angle - Math.PI / 6),
        y: y2 - safeArrowSize * Math.sin(angle - Math.PI / 6),
      };

      const arrowHead2 = {
        x: x2 - safeArrowSize * Math.cos(angle + Math.PI / 6),
        y: y2 - safeArrowSize * Math.sin(angle + Math.PI / 6),
      };

      return { arrowHead1, arrowHead2 };
    }

    // 기존 로직 (일반 좌표 연결)
    let finalX1 = x1,
      finalY1 = y1,
      finalX2 = x2,
      finalY2 = y2;

    if (finalConnectionType === "custom" && safeBendPoints && safeBendPoints.length > 0) {
      const lastBend = safeBendPoints[safeBendPoints.length - 1];
      if (lastBend && typeof lastBend.x === "number" && typeof lastBend.y === "number") {
        finalX1 = lastBend.x;
        finalY1 = lastBend.y;
      }
    } else if (finalConnectionType === "orthogonal") {
      // orthogonal 연결에서는 마지막 세그먼트 방향 사용
      if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
        finalY1 = y2; // 수평 마지막 세그먼트
      } else {
        finalX1 = x2; // 수직 마지막 세그먼트
      }
    }

    const dx = finalX2 - finalX1;
    const dy = finalY2 - finalY1;
    const angle = Math.atan2(dy, dx);

    const arrowHead1 = {
      x: x2 - safeArrowSize * Math.cos(angle - Math.PI / 6),
      y: y2 - safeArrowSize * Math.sin(angle - Math.PI / 6),
    };

    const arrowHead2 = {
      x: x2 - safeArrowSize * Math.cos(angle + Math.PI / 6),
      y: y2 - safeArrowSize * Math.sin(angle + Math.PI / 6),
    };

    return { arrowHead1, arrowHead2 };
  };

  // 시작점 화살표 마커 계산
  const calculateStartArrowMarker = () => {
    const { x: x1, y: y1 } = safeStartPoint;
    const { x: x2, y: y2 } = safeEndPoint;

    // 박스 연결시에는 연결점에서의 정확한 방향 계산
    if (fromBox && fromBox.position && toBox) {
      const { position: fromPos } = fromBox;
      let angle;

      // 시작 박스의 연결점 위치에 따른 화살표 방향 설정
      switch (fromPos) {
        case "right":
          angle = 0; // 오른쪽으로
          break;
        case "left":
          angle = Math.PI; // 왼쪽으로
          break;
        case "bottom":
          angle = Math.PI / 2; // 아래로
          break;
        case "top":
          angle = -Math.PI / 2; // 위로
          break;
        default:
          // 일반적인 방향 계산
          angle = Math.atan2(y2 - y1, x2 - x1);
      }

      const startArrowHead1 = {
        x: x1 + safeArrowSize * Math.cos(angle - Math.PI / 6),
        y: y1 + safeArrowSize * Math.sin(angle - Math.PI / 6),
      };

      const startArrowHead2 = {
        x: x1 + safeArrowSize * Math.cos(angle + Math.PI / 6),
        y: y1 + safeArrowSize * Math.sin(angle + Math.PI / 6),
      };

      return { startArrowHead1, startArrowHead2 };
    }

    // 기존 로직 (일반 좌표 연결)
    let startX1 = x1,
      startY1 = y1,
      startX2 = x2,
      startY2 = y2;

    if (finalConnectionType === "custom" && safeBendPoints && safeBendPoints.length > 0) {
      const firstBend = safeBendPoints[0];
      if (firstBend && typeof firstBend.x === "number" && typeof firstBend.y === "number") {
        startX2 = firstBend.x;
        startY2 = firstBend.y;
      }
    } else if (finalConnectionType === "orthogonal") {
      // orthogonal 연결에서는 첫 번째 세그먼트 방향 사용
      if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
        startY2 = y1; // 수평 첫 번째 세그먼트
      } else {
        startX2 = x1; // 수직 첫 번째 세그먼트
      }
    }

    const dx = startX2 - startX1;
    const dy = startY2 - startY1;
    const angle = Math.atan2(dy, dx);

    const startArrowHead1 = {
      x: x1 + safeArrowSize * Math.cos(angle - Math.PI / 6),
      y: y1 + safeArrowSize * Math.sin(angle - Math.PI / 6),
    };

    const startArrowHead2 = {
      x: x1 + safeArrowSize * Math.cos(angle + Math.PI / 6),
      y: y1 + safeArrowSize * Math.sin(angle + Math.PI / 6),
    };

    return { startArrowHead1, startArrowHead2 };
  };

  const { arrowHead1, arrowHead2 } = shouldShowEndArrow
    ? calculateArrowMarker()
    : { arrowHead1: null, arrowHead2: null };
  const { startArrowHead1, startArrowHead2 } = shouldShowStartArrow
    ? calculateStartArrowMarker()
    : { startArrowHead1: null, startArrowHead2: null };

  // SVG 영역 계산 (bendPoints 포함)
  const filteredBendPoints = safeBendPoints
    ? safeBendPoints.filter(
        (p) => p && typeof p.x === "number" && typeof p.y === "number" && !isNaN(p.x) && !isNaN(p.y)
      )
    : [];
  const allPoints = [safeStartPoint, safeEndPoint, ...filteredBendPoints];
  const minX = Math.min(...allPoints.map((p) => p.x)) - safeArrowSize;
  const minY = Math.min(...allPoints.map((p) => p.y)) - safeArrowSize;
  const maxX = Math.max(...allPoints.map((p) => p.x)) + safeArrowSize;
  const maxY = Math.max(...allPoints.map((p) => p.y)) + safeArrowSize;

  // 애니메이션 스타일 생성
  const getAnimationStyles = () => {
    if (!animated) return "";

    const speed = animationSpeed || 2;

    switch (animationType) {
      case "electric":
        return `
          .electric-path {
            stroke-dasharray: 8, 4, 2, 4;
            animation: electricFlow ${speed * 0.9}s linear infinite, electricGlow ${
          speed * 2
        }s ease-in-out infinite alternate;
            filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.7));
            stroke-linecap: round;
          }
          @keyframes electricFlow {
            0% { 
              stroke-dashoffset: 0; 
              opacity: 0.8;
            }
            25% { 
              opacity: 1;
            }
            50% { 
              opacity: 0.9;
            }
            75% { 
              opacity: 1;
            }
            100% { 
              stroke-dashoffset: -14; 
              opacity: 0.8;
            }
          }
          @keyframes electricGlow {
            0% { 
              filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.7));
            }
            100% { 
              filter: drop-shadow(0 0 12px rgba(59, 130, 246, 1)) drop-shadow(0 0 20px rgba(96, 165, 250, 0.6));
            }
          }

        `;

      case "water":
        return `
          .water-path {
            stroke-dasharray: 12, 6, 4, 6;
            animation: waterFlow ${speed * 1.1}s ease-in-out infinite, waterWave ${speed * 2}s ease-in-out infinite;
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.6));
            stroke-linecap: round;
          }
          @keyframes waterFlow {
            0% { 
              stroke-dashoffset: 0; 
              opacity: 0.7;
            }
            25% { 
              opacity: 0.9;
            }
            50% { 
              opacity: 1;
            }
            75% { 
              opacity: 0.8;
            }
            100% { 
              stroke-dashoffset: -16; 
              opacity: 0.7;
            }
          }
          @keyframes waterWave {
            0% { 
              filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.6));
            }
            50% { 
              filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 14px rgba(14, 165, 233, 0.5));
            }
            100% { 
              filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.6));
            }
          }

        `;

      case "wind":
        return `
          .wind-path {
            stroke-dasharray: 6, 10, 4, 8;
            animation: windFlow ${speed * 0.8}s ease-in-out infinite, windGust ${speed * 2.2}s ease-in-out infinite;
            filter: drop-shadow(0 0 3px rgba(156, 163, 175, 0.5));
            stroke-linecap: round;
          }
          @keyframes windFlow {
            0% { 
              stroke-dashoffset: 0; 
              opacity: 0.5;
            }
            20% { 
              opacity: 0.7;
            }
            40% { 
              opacity: 0.4;
            }
            60% { 
              opacity: 0.8;
            }
            80% { 
              opacity: 0.6;
            }
            100% { 
              stroke-dashoffset: -18; 
              opacity: 0.5;
            }
          }
          @keyframes windGust {
            0% { 
              filter: drop-shadow(0 0 3px rgba(156, 163, 175, 0.5));
            }
            50% { 
              filter: drop-shadow(0 0 6px rgba(156, 163, 175, 0.7)) drop-shadow(0 0 12px rgba(107, 114, 128, 0.4));
            }
            100% { 
              filter: drop-shadow(0 0 3px rgba(156, 163, 175, 0.5));
            }
          }

        `;

      case "gas":
        return `
          .gas-path {
            stroke-dasharray: 6, 8, 4, 6;
            animation: gasFlow ${speed * 1.2}s ease-in-out infinite, gasDiffusion ${speed * 2.5}s ease-in-out infinite;
            filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.6));
            stroke-linecap: round;
          }
          @keyframes gasFlow {
            0% { 
              stroke-dashoffset: 0; 
              opacity: 0.6;
            }
            20% { 
              opacity: 0.8;
            }
            40% { 
              opacity: 0.5;
            }
            60% { 
              opacity: 0.9;
            }
            80% { 
              opacity: 0.7;
            }
            100% { 
              stroke-dashoffset: -14; 
              opacity: 0.6;
            }
          }
          @keyframes gasDiffusion {
            0% { 
              filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.6));
            }
            50% { 
              filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 15px rgba(245, 158, 11, 0.5));
            }
            100% { 
              filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.6));
            }
          }

        `;

      case "data":
        return `
          .data-path {
            stroke-dasharray: 4, 3, 2, 3;
            animation: dataTransfer ${speed * 0.9}s linear infinite, dataGlow ${speed * 2}s ease-in-out infinite;
            filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.7));
            stroke-linecap: round;
          }
          @keyframes dataTransfer {
            0% { 
              stroke-dashoffset: 0; 
              opacity: 0.8;
            }
            25% { 
              opacity: 1;
            }
            50% { 
              opacity: 0.9;
            }
            75% { 
              opacity: 1;
            }
            100% { 
              stroke-dashoffset: -12; 
              opacity: 0.8;
            }
          }
          @keyframes dataGlow {
            0% { 
              filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.7));
            }
            50% { 
              filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.6));
            }
            100% { 
              filter: drop-shadow(0 0 5px rgba(34, 197, 94, 0.7));
            }
          }
          .data-packets {
            animation: dataPacket ${speed * 0.6}s linear infinite;
          }
          @keyframes dataPacket {
            0% { 
              opacity: 0; 
              r: 1;
              fill: #22c55e;
            }
            20% { 
              opacity: 0.7; 
              r: 1.5;
              fill: #10b981;
            }
            40% { 
              opacity: 1; 
              r: 2;
              fill: #059669;
            }
            60% { 
              opacity: 0.8; 
              r: 1.8;
              fill: #047857;
            }
            80% { 
              opacity: 0.4; 
              r: 1.2;
              fill: #065f46;
            }
            100% { 
              opacity: 0; 
              r: 1;
              fill: #22c55e;
            }
          }
        `;

      default: // "dash"
        return `
          .dash-path {
            stroke-dasharray: 8, 4;
            animation: dashFlow ${speed}s linear infinite;
            stroke-linecap: round;
            opacity: 0.8;
          }
          @keyframes dashFlow {
            0% { 
              stroke-dashoffset: 0; 
            }
            100% { 
              stroke-dashoffset: -12; 
            }
          }
        `;
    }
  };

  // 애니메이션 파티클 생성 (비활성화)
  const renderAnimationParticles = () => {
    // 애니메이션 파티클 제거
    return null;
  };

  return (
    <svg
      className={`absolute pointer-events-none z-10 ${className}`}
      style={{
        left: minX,
        top: minY,
        width: maxX - minX,
        height: maxY - minY,
      }}
    >
      {/* 애니메이션 정의 */}
      {animated && (
        <defs>
          <style>{getAnimationStyles()}</style>
        </defs>
      )}

      {/* 연결선 */}
      <path
        d={getPathWithRadius()}
        strokeWidth={safeStrokeWidth}
        fill="none"
        className={`stroke-current ${animated ? `${animationType}-path` : ""}`}
        transform={`translate(${-minX}, ${-minY})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 애니메이션 파티클 */}
      {renderAnimationParticles()}

      {/* 화살표 */}
      {shouldShowEndArrow && arrowHead1 && arrowHead2 && (
        <>
          {arrowShape === "circle" ? (
            renderCircleArrow(safeEndPoint.x, safeEndPoint.y, minX, minY)
          ) : (
            <polygon
              points={createArrowShape(
                safeEndPoint.x,
                safeEndPoint.y,
                arrowHead1.x,
                arrowHead1.y,
                arrowHead2.x,
                arrowHead2.y,
                safeArrowSize
              )}
              className={getArrowColorClass()}
              transform={`translate(${-minX}, ${-minY})`}
            />
          )}
        </>
      )}

      {/* 시작점 화살표 */}
      {shouldShowStartArrow && startArrowHead1 && startArrowHead2 && (
        <>
          {arrowShape === "circle" ? (
            renderCircleArrow(safeStartPoint.x, safeStartPoint.y, minX, minY)
          ) : (
            <polygon
              points={createArrowShape(
                safeStartPoint.x,
                safeStartPoint.y,
                startArrowHead1.x,
                startArrowHead1.y,
                startArrowHead2.x,
                startArrowHead2.y,
                safeArrowSize
              )}
              className={getArrowColorClass()}
              transform={`translate(${-minX}, ${-minY})`}
            />
          )}
        </>
      )}
    </svg>
  );
};

export default Connector;
