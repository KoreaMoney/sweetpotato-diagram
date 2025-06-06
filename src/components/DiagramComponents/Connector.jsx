/**
 * Connector 컴포넌트
 *
 * 두 점 또는 박스 간의 연결선을 그리는 컴포넌트입니다.
 * 다양한 연결 스타일과 화살표, 애니메이션을 지원합니다.
 *
 * @param {Object} props - 컴포넌트 props
 *
 * === 기본 좌표 연결 방식 ===
 * @param {Object} startPoint - 시작점 좌표 { x: number, y: number }
 * @param {Object} endPoint - 끝점 좌표 { x: number, y: number }
 *
 * === 박스 연결 방식 (자동 감지) ===
 * @param {Object} fromBox - 시작 박스 정보 { id: string, position: string, offset: { x: number, y: number } }
 *   - position: "top" | "right" | "bottom" | "left" | "center"
 * @param {Object} toBox - 도착 박스 정보 { id: string, position: string, offset: { x: number, y: number } }
 * ⚠️ 주의: boxes prop이 제거되었습니다! 이제 DiagramContext를 통해 자동으로 Box 정보를 가져옵니다.
 *
 * === 연결 스타일 ===
 * @param {string} connectionType - 연결 타입
 *   - "straight": 직선 연결 (기본값)
 *   - "curved": 곡선 연결 (베지어 곡선)
 *   - "orthogonal": 직각 연결 (ㄱ자 모양)
 *   - "stepped": 계단식 연결
 *   - "custom": 사용자 정의 경로 (bendPoints 사용)
 *   - "auto": 박스 위치에 따라 자동 선택
 *
 * === 스타일링 ===
 * @param {number} strokeWidth - 선 두께 (기본값: 2)
 * @param {string} className - CSS 클래스 (기본값: "text-gray-500 hover:text-gray-600 transition-colors duration-200")
 * @param {boolean} animated - 애니메이션 효과 (기본값: false)
 *
 * === 화살표/삼각형 ===
 * @param {boolean} showArrow - 끝점 화살표 표시 (기본값: true)
 * @param {boolean} showStartArrow - 시작점 화살표 표시 (기본값: false)
 * @param {number} arrowSize - 화살표 크기 (기본값: 8)
 * @param {string} arrowDirection - 화살표 방향 "forward" | "backward" | "both" | "none" (기본값: "forward")
 * @param {string} arrowColor - 화살표 색상 (기본값: "current" - 부모 요소 색상 상속)
 * @param {string} arrowShape - 화살표 모양 "triangle" | "diamond" | "circle" | "square" (기본값: "triangle")
 *
 * === 고급 설정 ===
 * @param {Array} bendPoints - 중간 꺾임점들 [{ x: number, y: number }] (connectionType: "custom"일 때 사용)
 * @param {number} cornerRadius - 모서리 둥글기 (기본값: 0)
 * @param {string} orthogonalDirection - 직교 연결 방향 "horizontal-first" | "vertical-first" | "auto"
 * @param {number} stepOffset - 직교 연결에서 중간 지점 오프셋 (기본값: 50)
 *
 * === 사용 예시 ===
 *
 * // 1. 기본 직선 연결
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 200, y: 200 }}
 * />
 *
 * // 2. 곡선 연결 with 애니메이션
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 150 }}
 *   connectionType="curved"
 *   animated={true}
 *   strokeWidth={3}
 * />
 *
 * // 3. 박스 간 연결 (자동 Box 감지!)
 * <Connector
 *   fromBox={{ id: "box1", position: "right" }}
 *   toBox={{ id: "box2", position: "left" }}
 *   connectionType="auto"
 * />
 *
 * // 4. 직교 연결 (ㄱ자 모양)
 * <Connector
 *   fromBox={{ id: "box1", position: "bottom" }}
 *   toBox={{ id: "box2", position: "top" }}
 *   connectionType="orthogonal"
 *   orthogonalDirection="vertical-first"
 *   stepOffset={80}
 * />
 *
 * // 5. 사용자 정의 경로 (중간점 지정)
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
 * // 6. 양방향 화살표 with 커스텀 색상 및 크기
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
 * // 7. 박스 연결 with 오프셋
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
 * // 8. 다양한 화살표 모양과 색상
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 200 }}
 *   arrowDirection="both"
 *   arrowShape="diamond"
 *   arrowColor="blue"
 *   arrowSize={15}
 * />
 *
 * // 9. 원형 화살표
 * <Connector
 *   fromBox={{ id: "box1", position: "bottom" }}
 *   toBox={{ id: "box2", position: "top" }}
 *   arrowShape="circle"
 *   arrowColor="green"
 *   arrowSize={10}
 * />
 *
 * // 10. 사각형 화살표 (단방향)
 * <Connector
 *   startPoint={{ x: 50, y: 50 }}
 *   endPoint={{ x: 250, y: 150 }}
 *   arrowDirection="forward"
 *   arrowShape="square"
 *   arrowColor="red"
 *   connectionType="curved"
 * />
 *
 * === 주요 변경사항 ===
 * - boxes prop이 제거되었습니다!
 * - DiagramContext를 통해 Box 정보를 자동으로 가져옵니다
 * - Box 컴포넌트가 이동하면 자동으로 Connector도 업데이트됩니다
 * - DiagramProvider로 감싸진 영역에서만 사용 가능합니다
 * - 새로운 삼각형/화살표 커스터마이징 옵션 추가:
 *   - arrowDirection: 화살표 방향 제어
 *   - arrowColor: 화살표 색상 제어
 *   - arrowShape: 화살표 모양 제어 (triangle, diamond, circle, square)
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

  connectionType = "straight", // 'straight', 'curved', 'orthogonal', 'stepped', 'custom'
  strokeWidth = 2,
  animated = false,
  className = "stroke-[#0066ff] hover:stroke-black transition-all duration-300",
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

  // 실제 시작점과 끝점 계산
  const calculateActualPoints = () => {
    let actualStartPoint = startPoint;
    let actualEndPoint = endPoint;

    // 박스 연결 방식이 지정된 경우
    if (fromBox && toBox && fromBox.id && toBox.id && getBox) {
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
          <style>
            {`
              .animated-path {
                stroke-dasharray: 10;
                animation: dash 2s linear infinite;
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: -20;
                }
              }
            `}
          </style>
        </defs>
      )}

      {/* 연결선 */}
      <path
        d={getPathWithRadius()}
        strokeWidth={safeStrokeWidth}
        fill="none"
        className={`stroke-current ${animated ? "animated-path" : ""}`}
        transform={`translate(${-minX}, ${-minY})`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

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

      {/* 연결점 표시 */}
      <circle
        cx={safeStartPoint.x - minX}
        cy={safeStartPoint.y - minY}
        r="2"
        className="fill-current opacity-60 hover:opacity-100 transition-opacity"
      />
      <circle
        cx={safeEndPoint.x - minX}
        cy={safeEndPoint.y - minY}
        r="2"
        className="fill-current opacity-60 hover:opacity-100 transition-opacity"
      />

      {/* bendPoints 표시 (디버깅용) */}
      {filteredBendPoints.map((point, index) => (
        <circle
          key={index}
          cx={point.x - minX}
          cy={point.y - minY}
          r="1.5"
          className="fill-current opacity-40 hover:opacity-80 transition-opacity"
        />
      ))}
    </svg>
  );
};

export default Connector;
