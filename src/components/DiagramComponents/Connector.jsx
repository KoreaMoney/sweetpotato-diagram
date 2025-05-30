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
 * === 박스 연결 방식 ===
 * @param {Object} fromBox - 시작 박스 정보 { id: string, position: string, offset: { x: number, y: number } }
 *   - position: "top" | "right" | "bottom" | "left" | "center"
 * @param {Object} toBox - 도착 박스 정보 { id: string, position: string, offset: { x: number, y: number } }
 * @param {Array} boxes - 모든 박스 정보 배열 [{ id: string, x: number, y: number, width: number, height: number }]
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
 * === 화살표 ===
 * @param {boolean} showArrow - 끝점 화살표 표시 (기본값: true)
 * @param {boolean} showStartArrow - 시작점 화살표 표시 (기본값: false)
 * @param {number} arrowSize - 화살표 크기 (기본값: 8)
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
 * // 3. 박스 간 연결 (자동 연결점 계산)
 * <Connector
 *   fromBox={{ id: "box1", position: "right" }}
 *   toBox={{ id: "box2", position: "left" }}
 *   boxes={[
 *     { id: "box1", x: 50, y: 50, width: 100, height: 60 },
 *     { id: "box2", x: 250, y: 80, width: 120, height: 80 }
 *   ]}
 *   connectionType="auto"
 * />
 *
 * // 4. 직교 연결 (ㄱ자 모양)
 * <Connector
 *   fromBox={{ id: "box1", position: "bottom" }}
 *   toBox={{ id: "box2", position: "top" }}
 *   boxes={boxesArray}
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
 * // 6. 양방향 화살표
 * <Connector
 *   startPoint={{ x: 100, y: 100 }}
 *   endPoint={{ x: 300, y: 200 }}
 *   showArrow={true}
 *   showStartArrow={true}
 *   arrowSize={10}
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
 *   boxes={boxesArray}
 * />
 *
 * === 주의사항 ===
 * - 박스 연결 방식 사용시 반드시 boxes 배열에 해당 박스 정보가 있어야 합니다
 * - startPoint/endPoint와 fromBox/toBox는 동시에 사용할 수 없습니다 (박스 연결이 우선)
 * - connectionType이 "custom"일 때는 bendPoints 배열을 제공해야 합니다
 * - 애니메이션은 성능에 영향을 줄 수 있으므로 필요한 경우에만 사용하세요
 */

const Connector = ({
  // 기존 방식 (좌표 직접 지정)
  startPoint = null,
  endPoint = null,

  // 새로운 방식 (박스 연결)
  fromBox = null, // { id: "box1", position: "right", offset: { x: 0, y: 0 } }
  toBox = null, // { id: "box2", position: "left", offset: { x: 0, y: 0 } }
  boxes = [], // 모든 박스 정보 배열 [{ id, x, y, width, height }]

  connectionType = "straight", // 'straight', 'curved', 'orthogonal', 'stepped', 'custom'
  strokeWidth = 2,
  animated = false,
  className = "text-gray-500 hover:text-gray-600 transition-colors duration-200",
  showArrow = true,
  showStartArrow = false, // 시작점 화살표 표시 여부 (양방향 화살표용) - 🆕 NEW!
  arrowSize = 8,
  bendPoints = [], // 중간 꺾임점들 [{ x: 150, y: 100 }, { x: 150, y: 200 }]
  cornerRadius = 0, // 모서리 둥글기
  orthogonalDirection = "auto", // 'horizontal-first', 'vertical-first', 'auto'
  stepOffset = 50, // orthogonal 연결에서 중간 지점 오프셋
}) => {
  // 박스 연결점 계산 함수
  const getBoxConnectionPoint = (boxInfo, position, offset = { x: 0, y: 0 }) => {
    if (!boxInfo) return { x: 0, y: 0 };

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
      x: point.x + (offset.x || 0),
      y: point.y + (offset.y || 0),
    };
  };

  // 박스 정보 찾기
  const findBox = (boxId) => {
    if (!Array.isArray(boxes)) {
      console.warn("Connector: boxes prop must be an array");
      return null;
    }
    return boxes.find((box) => box && box.id === boxId);
  };

  // 실제 시작점과 끝점 계산
  const calculateActualPoints = () => {
    let actualStartPoint = startPoint;
    let actualEndPoint = endPoint;

    // 박스 연결 방식이 지정된 경우
    if (fromBox && toBox && fromBox.id && toBox.id) {
      console.log("Connector: Attempting box connection", {
        fromBoxId: fromBox.id,
        toBoxId: toBox.id,
        availableBoxes: boxes.map((b) => ({ id: b.id, x: b.x, y: b.y })),
      });

      const startBox = findBox(fromBox.id);
      const endBox = findBox(toBox.id);

      console.log("Connector: Found boxes", { startBox, endBox });

      if (startBox && endBox) {
        actualStartPoint = getBoxConnectionPoint(startBox, fromBox.position, fromBox.offset);
        actualEndPoint = getBoxConnectionPoint(endBox, toBox.position, toBox.offset);

        console.log("Connector: Calculated connection points", {
          actualStartPoint,
          actualEndPoint,
          fromPosition: fromBox.position,
          toPosition: toBox.position,
        });
      } else {
        console.warn("Connector: Box not found!", {
          fromBoxId: fromBox.id,
          toBoxId: toBox.id,
          startBoxFound: !!startBox,
          endBoxFound: !!endBox,
          availableBoxes: boxes,
        });

        // 박스를 찾지 못한 경우 기본값 사용
        actualStartPoint = startPoint || { x: 50, y: 50 };
        actualEndPoint = endPoint || { x: 150, y: 150 };
      }
    }

    return { actualStartPoint, actualEndPoint };
  };

  const { actualStartPoint, actualEndPoint } = calculateActualPoints();

  // 안전한 좌표 값 확보
  const safeStartPoint = {
    x: typeof actualStartPoint?.x === "number" && !isNaN(actualStartPoint.x) ? actualStartPoint.x : 0,
    y: typeof actualStartPoint?.y === "number" && !isNaN(actualStartPoint.y) ? actualStartPoint.y : 0,
  };

  const safeEndPoint = {
    x: typeof actualEndPoint?.x === "number" && !isNaN(actualEndPoint.x) ? actualEndPoint.x : 100,
    y: typeof actualEndPoint?.y === "number" && !isNaN(actualEndPoint.y) ? actualEndPoint.y : 100,
  };

  const safeArrowSize = typeof arrowSize === "number" && !isNaN(arrowSize) ? arrowSize : 8;
  const safeStrokeWidth = typeof strokeWidth === "number" && !isNaN(strokeWidth) ? strokeWidth : 2;

  // 자동 연결 타입 결정 (박스 연결시)
  const getAutoConnectionType = () => {
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

    // bendPoints가 배열인지 확인하고 중간 꺾임점들을 통과
    if (Array.isArray(bendPoints) && bendPoints.length > 0) {
      bendPoints.forEach((point) => {
        if (point && typeof point.x === "number" && typeof point.y === "number") {
          path += ` L ${point.x} ${point.y}`;
        }
      });
    }

    // 최종 목적지
    path += ` L ${x2} ${y2}`;

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

    // 마지막 세그먼트의 방향 계산
    let finalX1 = x1,
      finalY1 = y1,
      finalX2 = x2,
      finalY2 = y2;

    if (finalConnectionType === "custom" && Array.isArray(bendPoints) && bendPoints.length > 0) {
      const lastBend = bendPoints[bendPoints.length - 1];
      if (lastBend && typeof lastBend.x === "number" && typeof lastBend.y === "number") {
        finalX1 = lastBend.x;
        finalY1 = lastBend.y;
      }
    } else if (finalConnectionType === "orthogonal") {
      // 박스 연결시 도착 방향에 따른 화살표 조정
      if (toBox && toBox.position) {
        const { position: toPos } = toBox;
        switch (toPos) {
          case "left":
            finalX1 = x2 + 10; // 왼쪽에서 들어오는 화살표
            finalY1 = y2;
            break;
          case "right":
            finalX1 = x2 - 10; // 오른쪽에서 들어오는 화살표
            finalY1 = y2;
            break;
          case "top":
            finalX1 = x2;
            finalY1 = y2 + 10; // 위에서 들어오는 화살표
            break;
          case "bottom":
            finalX1 = x2;
            finalY1 = y2 - 10; // 아래에서 들어오는 화살표
            break;
        }
      } else {
        // 기존 로직
        if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
          finalY1 = y2; // 수평 마지막 세그먼트
        } else {
          finalX1 = x2; // 수직 마지막 세그먼트
        }
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

    // 첫 번째 세그먼트의 방향 계산
    let startX1 = x1,
      startY1 = y1,
      startX2 = x2,
      startY2 = y2;

    if (finalConnectionType === "custom" && Array.isArray(bendPoints) && bendPoints.length > 0) {
      const firstBend = bendPoints[0];
      if (firstBend && typeof firstBend.x === "number" && typeof firstBend.y === "number") {
        startX2 = firstBend.x;
        startY2 = firstBend.y;
      }
    } else if (finalConnectionType === "orthogonal") {
      // 박스 연결시 시작 방향에 따른 화살표 조정
      if (fromBox && fromBox.position) {
        const { position: fromPos } = fromBox;
        switch (fromPos) {
          case "right":
            startX2 = x1 + 10; // 오른쪽으로 나가는 화살표
            startY2 = y1;
            break;
          case "left":
            startX2 = x1 - 10; // 왼쪽으로 나가는 화살표
            startY2 = y1;
            break;
          case "bottom":
            startX2 = x1;
            startY2 = y1 + 10; // 아래로 나가는 화살표
            break;
          case "top":
            startX2 = x1;
            startY2 = y1 - 10; // 위로 나가는 화살표
            break;
        }
      } else {
        // 기존 로직
        if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
          startY2 = y1; // 수평 첫 번째 세그먼트
        } else {
          startX2 = x1; // 수직 첫 번째 세그먼트
        }
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

  const { arrowHead1, arrowHead2 } = showArrow ? calculateArrowMarker() : { arrowHead1: null, arrowHead2: null };
  const { startArrowHead1, startArrowHead2 } = showStartArrow
    ? calculateStartArrowMarker()
    : { startArrowHead1: null, startArrowHead2: null };

  // SVG 영역 계산 (bendPoints 포함)
  const safeBendPoints = Array.isArray(bendPoints)
    ? bendPoints.filter((p) => p && typeof p.x === "number" && typeof p.y === "number" && !isNaN(p.x) && !isNaN(p.y))
    : [];
  const allPoints = [safeStartPoint, safeEndPoint, ...safeBendPoints];
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
      {showArrow && arrowHead1 && arrowHead2 && (
        <polygon
          points={`${safeEndPoint.x - minX},${safeEndPoint.y - minY} ${arrowHead1.x - minX},${arrowHead1.y - minY} ${
            arrowHead2.x - minX
          },${arrowHead2.y - minY}`}
          className="fill-current"
        />
      )}

      {/* 시작점 화살표 */}
      {showStartArrow && startArrowHead1 && startArrowHead2 && (
        <polygon
          points={`${safeStartPoint.x - minX},${safeStartPoint.y - minY} ${startArrowHead1.x - minX},${
            startArrowHead1.y - minY
          } ${startArrowHead2.x - minX},${startArrowHead2.y - minY}`}
          className="fill-current"
        />
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
      {safeBendPoints.map((point, index) => (
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
