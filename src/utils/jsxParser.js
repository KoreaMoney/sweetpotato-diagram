/**
 * JSX 문자열에서 속성 값을 추출하는 유틸리티 함수
 * @param {string} componentStr - 컴포넌트 JSX 문자열
 * @param {string} propName - 추출할 속성 이름
 * @param {any} defaultValue - 기본값
 * @returns {any} 파싱된 속성 값
 */
export const extractProp = (componentStr, propName, defaultValue) => {
  const regex = new RegExp(`${propName}=\\{([^}]+)\\}|${propName}="([^"]+)"`);
  const match = componentStr.match(regex);

  if (!match) return defaultValue;

  const value = match[1] || match[2];

  // Boolean 값 처리
  if (value === "true") return true;
  if (value === "false") return false;

  // 문자열 값 처리
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }

  // 배열 값 처리
  if (value.startsWith("[") && value.endsWith("]")) {
    return parseArrayValue(value, defaultValue);
  }

  // 객체 값 처리
  if (value.startsWith("{") && value.endsWith("}")) {
    return parseObjectValue(value, defaultValue);
  }

  // 숫자 값 처리
  if (!isNaN(value)) return Number(value);

  // 기본 문자열 처리
  return value.replace(/"/g, "");
};

/**
 * 배열 문자열을 파싱하는 함수
 * @param {string} value - 배열 문자열
 * @param {any} defaultValue - 기본값
 * @returns {any} 파싱된 배열 또는 기본값
 */
const parseArrayValue = (value, defaultValue) => {
  try {
    const arrayStr = value.replace(/\s+/g, " ").trim();
    // JSON 형태로 변환 시도
    const result = JSON.parse(arrayStr.replace(/(\w+):/g, '"$1":'));
    return Array.isArray(result) ? result : defaultValue;
  } catch {
    try {
      // eval을 사용한 파싱 시도 (보안상 주의)
      const arrayStr = value.replace(/\s+/g, " ").trim();
      const result = eval(`(${arrayStr})`);
      return Array.isArray(result) ? result : defaultValue;
    } catch {
      console.warn(`Failed to parse array ${value}`);
      return defaultValue;
    }
  }
};

/**
 * 객체 문자열을 파싱하는 함수
 * @param {string} value - 객체 문자열
 * @param {any} defaultValue - 기본값
 * @returns {any} 파싱된 객체 또는 기본값
 */
const parseObjectValue = (value, defaultValue) => {
  try {
    // JSON 형태로 변환 시도
    const objectStr = value.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
    return JSON.parse(objectStr);
  } catch {
    try {
      // eval을 사용한 파싱 시도 (보안상 주의)
      return eval(`(${value})`);
    } catch (error) {
      console.warn(`Failed to parse object ${value}:`, error);
      return defaultValue;
    }
  }
};

/**
 * JSX 문자열에서 Box 컴포넌트들을 파싱하는 함수
 * @param {string} jsxCode - JSX 코드 문자열
 * @returns {Array} 파싱된 Box 컴포넌트 배열
 */
export const parseBoxComponents = (jsxCode) => {
  const boxMatches = jsxCode.match(/<Box[^>]*>/g) || [];

  return boxMatches.map((boxStr, index) => {
    const box = {
      id: extractProp(boxStr, "id", `box-${index}`),
      x: extractProp(boxStr, "x", 50),
      y: extractProp(boxStr, "y", 50),
      width: extractProp(boxStr, "width", 80),
      height: extractProp(boxStr, "height", 30),
      text: extractProp(boxStr, "text", "Box"),
      className: extractProp(
        boxStr,
        "className",
        "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm"
      ),
    };

    console.log(`Parsed box ${index}:`, box);
    return box;
  });
};

/**
 * JSX 문자열에서 Connector 컴포넌트들을 파싱하는 함수
 * @param {string} jsxCode - JSX 코드 문자열
 * @param {Array} boxes - 박스 컴포넌트 배열
 * @returns {Array} 파싱된 Connector 컴포넌트 배열
 */
export const parseConnectorComponents = (jsxCode, boxes) => {
  const connectorMatches = jsxCode.match(/<Connector[^>]*>/g) || [];

  return connectorMatches.map((connectorStr, index) => {
    const extractedBoxes = extractProp(connectorStr, "boxes", []);

    const connector = {
      id: `connector-${index}`,
      startPoint: extractProp(connectorStr, "startPoint", null),
      endPoint: extractProp(connectorStr, "endPoint", null),
      fromBox: extractProp(connectorStr, "fromBox", null),
      toBox: extractProp(connectorStr, "toBox", null),
      // boxes 배열이 비어있으면 파싱된 모든 박스를 사용
      boxes: Array.isArray(extractedBoxes) && extractedBoxes.length > 0 ? extractedBoxes : boxes,
      connectionType: extractProp(connectorStr, "connectionType", "straight"),
      bendPoints: extractProp(connectorStr, "bendPoints", []),
      showArrow: extractProp(connectorStr, "showArrow", true),
      strokeWidth: extractProp(connectorStr, "strokeWidth", 2),
      animated: extractProp(connectorStr, "animated", false),
      dashArray: extractProp(connectorStr, "dashArray", ""),
      orthogonalDirection: extractProp(connectorStr, "orthogonalDirection", "horizontal-first"),
      stepOffset: extractProp(connectorStr, "stepOffset", 20),
      className: extractProp(
        connectorStr,
        "className",
        "text-cyan-500 hover:text-cyan-600 transition-colors duration-200"
      ),
    };

    console.log(`Parsed connector ${index}:`, {
      ...connector,
      boxesCount: connector.boxes.length,
      fromBoxId: connector.fromBox?.id,
      toBoxId: connector.toBox?.id,
    });

    return connector;
  });
};

/**
 * JSX 코드를 파싱하여 컴포넌트들을 반환하는 메인 함수
 * @param {string} jsxCode - JSX 코드 문자열
 * @returns {Object} { boxes, connectors } 파싱된 컴포넌트들
 */
export const parseJSXComponents = (jsxCode) => {
  try {
    const boxes = parseBoxComponents(jsxCode);
    const connectors = parseConnectorComponents(jsxCode, boxes);

    console.log("Final parsed components:", { boxes, connectors });
    return { boxes, connectors };
  } catch (error) {
    console.error("JSX parsing error:", error);

    // 파싱 에러시 기본값 반환
    return {
      boxes: [
        {
          id: "box-1",
          x: 50,
          y: 50,
          width: 80,
          height: 30,
          text: "시작",
          className: "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
        },
        {
          id: "box-2",
          x: 200,
          y: 100,
          width: 80,
          height: 30,
          text: "끝",
          className: "bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-sm",
        },
      ],
      connectors: [
        {
          id: "connector-1",
          startPoint: { x: 130, y: 65 },
          endPoint: { x: 200, y: 115 },
          connectionType: "straight",
          className: "text-cyan-500 hover:text-cyan-600 transition-colors duration-200",
          showArrow: true,
          strokeWidth: 2,
        },
      ],
    };
  }
};
