/**
 * JSX 코드 파싱 유틸리티 함수들
 */

// props 문자열을 파싱하여 객체로 변환하는 함수
export const parseProps = (propsString) => {
  try {
    const props = {};

    // 각 prop을 추출하는 정규식들
    const patterns = {
      id: /id=["']([^"']+)["']/,
      x: /x=\{(\d+)\}/,
      y: /y=\{(\d+)\}/,
      width: /width=\{(\d+)\}/,
      height: /height=\{(\d+)\}/,
      text: /text=["']([^"']+)["']/,
      className: /className=["']([^"']+)["']/,
      fromBox: /fromBox=\{([^}]+)\}/,
      toBox: /toBox=\{([^}]+)\}/,
      connectionType: /connectionType=["']([^"']+)["']/,
      showArrow: /showArrow=\{(true|false)\}/,
      arrowDirection: /arrowDirection=["']([^"']+)["']/,
      animated: /animated=\{(true|false)\}/,
      strokeWidth: /strokeWidth=\{(\d+)\}/,
      orthogonalDirection: /orthogonalDirection=["']([^"']+)["']/,
    };

    // 각 패턴을 적용하여 props 추출
    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = propsString.match(pattern);
      if (match) {
        if (key === "x" || key === "y" || key === "width" || key === "height" || key === "strokeWidth") {
          props[key] = parseInt(match[1]);
        } else if (key === "showArrow" || key === "animated") {
          props[key] = match[1] === "true";
        } else if (key === "fromBox" || key === "toBox") {
          // fromBox, toBox 객체 파싱
          try {
            const objString = match[1].replace(/'/g, '"');
            const cleanObjString = objString.replace(/(\w+):/g, '"$1":');
            props[key] = JSON.parse(`{${cleanObjString}}`);
          } catch {
            // 간단한 파싱 시도
            const idMatch = match[1].match(/id:\s*["']([^"']+)["']/);
            const positionMatch = match[1].match(/position:\s*["']([^"']+)["']/);
            if (idMatch && positionMatch) {
              props[key] = { id: idMatch[1], position: positionMatch[1] };
            }
          }
        } else {
          props[key] = match[1];
        }
      }
    });

    return Object.keys(props).length > 0 ? props : null;
  } catch (error) {
    console.error("Props 파싱 에러:", error);
    return null;
  }
};

// JSX 코드를 파싱하여 컴포넌트 요소들을 추출하는 함수
export const parseJSXCode = (code) => {
  try {
    const elements = [];

    // Box 컴포넌트 추출
    const boxRegex = /<Box\s+([\s\S]*?)\s*\/>/g;
    let boxMatch;
    while ((boxMatch = boxRegex.exec(code)) !== null) {
      const propsString = boxMatch[1];
      const props = parseProps(propsString);
      if (props) {
        elements.push({ type: "Box", props });
      }
    }

    // Connector 컴포넌트 추출
    const connectorRegex = /<Connector\s+([\s\S]*?)\s*\/>/g;
    let connectorMatch;
    while ((connectorMatch = connectorRegex.exec(code)) !== null) {
      const propsString = connectorMatch[1];
      const props = parseProps(propsString);
      if (props) {
        elements.push({ type: "Connector", props });
      }
    }

    return elements;
  } catch (error) {
    console.error("JSX 파싱 에러:", error);
    return [];
  }
};
