/**
 * JSX 코드 파싱 유틸리티 함수들
 */

// props 문자열을 파싱하여 객체로 변환하는 함수
export const parseProps = (propsString) => {
  try {
    const props = {};

    // 각 prop을 추출하는 정규식들
    const patterns = {
      // 기본 위치/크기 props
      id: /id=["']([^"']+)["']/,
      x: /x=\{(\d+)\}/,
      y: /y=\{(\d+)\}/,
      initialX: /initialX=\{(\d+)\}/,
      initialY: /initialY=\{(\d+)\}/,
      startX: /startX=\{(\d+)\}/,
      startY: /startY=\{(\d+)\}/,
      endX: /endX=\{(\d+)\}/,
      endY: /endY=\{(\d+)\}/,
      width: /width=\{(\d+)\}/,
      height: /height=\{(\d+)\}/,
      size: /size=\{(\d+)\}/,

      // 텍스트 관련 props
      text: /text=["']([^"']+)["']/,
      textDirection: /textDirection=["']([^"']+)["']/,
      verticalDirection: /verticalDirection=["']([^"']+)["']/,
      textPosition: /textPosition=["']([^"']+)["']/,

      // 스타일링 props
      className: /className=["']([^"']+)["']/,
      color: /color=["']([^"']+)["']/,
      fillColor: /fillColor=["']([^"']+)["']/,
      borderColor: /borderColor=["']([^"']+)["']/,
      strokeColor: /strokeColor=["']([^"']+)["']/,
      backgroundColor: /backgroundColor=["']([^"']+)["']/,
      textColor: /textColor=["']([^"']+)["']/,

      // 크기/두께 관련 props
      strokeWidth: /strokeWidth=\{(\d+)\}/,
      borderWidth: /borderWidth=\{(\d+)\}/,
      arrowSize: /arrowSize=\{(\d+)\}/,
      iconSize: /iconSize=\{(\d+)\}/,
      imageSize: /imageSize=\{(\d+)\}/,
      gridSize: /gridSize=\{(\d+)\}/,
      maxSavedPoints: /maxSavedPoints=\{(\d+)\}/,

      // 불린 props
      showArrow: /showArrow=\{(true|false)\}/,
      showStartArrow: /showStartArrow=\{(true|false)\}/,
      animated: /animated=\{(true|false)\}/,
      isOpen: /isOpen=\{(true|false)\}/,
      showStatus: /showStatus=\{(true|false)\}/,
      showIcon: /showIcon=\{(true|false)\}/,
      filled: /filled=\{(true|false)\}/,
      curved: /curved=\{(true|false)\}/,
      animate: /animate=\{(true|false)\}/,
      draggable: /draggable=\{(true|false)\}/,
      sparkle: /sparkle=\{(true|false)\}/,
      snapToGrid: /snapToGrid=\{(true|false)\}/,
      constrainToBounds: /constrainToBounds=\{(true|false)\}/,
      showDetails: /showDetails=\{(true|false)\}/,
      showSavedPoints: /showSavedPoints=\{(true|false)\}/,
      showToggle: /showToggle=\{(true|false)\}/,
      initialVisible: /initialVisible=\{(true|false)\}/,
      showSettingsButton: /showSettingsButton=\{(true|false)\}/,
      enableAutoConnect: /enableAutoConnect=\{(true|false)\}/,

      // 숫자 값 props
      opacity: /opacity=\{(\d*\.?\d+)\}/,
      animationSpeed: /animationSpeed=\{(\d+)\}/,

      // 문자열 enum props
      connectionType: /connectionType=["']([^"']+)["']/,
      arrowDirection: /arrowDirection=["']([^"']+)["']/,
      arrowShape: /arrowShape=["']([^"']+)["']/,
      arrowColor: /arrowColor=["']([^"']+)["']/,
      animationType: /animationType=["']([^"']+)["']/,
      orthogonalDirection: /orthogonalDirection=["']([^"']+)["']/,
      direction: /direction=["']([^"']+)["']/,
      type: /type=["']([^"']+)["']/,
      status: /status=["']([^"']+)["']/,
      iconPosition: /iconPosition=["']([^"']+)["']/,
      iconType: /iconType=["']([^"']+)["']/,
      imageObjectFit: /imageObjectFit=["']([^"']+)["']/,
      sparkleColor: /sparkleColor=["']([^"']+)["']/,
      sparkleIntensity: /sparkleIntensity=["']([^"']+)["']/,
      style: /style=["']([^"']+)["']/,
      dashArray: /dashArray=["']([^"']+)["']/,
      position: /position=["']([^"']+)["']/,
      theme: /theme=["']([^"']+)["']/,
      icon: /icon=["']([^"']+)["']/,
      alt: /alt=["']([^"']+)["']/,
      src: /src=["']([^"']+)["']/,

      // 복잡한 객체 props
      fromBox: /fromBox=\{([^}]+)\}/,
      toBox: /toBox=\{([^}]+)\}/,
      bendPoints: /bendPoints=\{(\[[\s\S]*?\])\}/,
      bounds: /bounds=\{([^}]+)\}/,
      settingsProps: /settingsProps=\{(\{[\s\S]*?\})\}/,
    };

    // 각 패턴을 적용하여 props 추출
    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = propsString.match(pattern);
      if (match) {
        // 숫자 props
        if (
          [
            "x",
            "y",
            "initialX",
            "initialY",
            "startX",
            "startY",
            "endX",
            "endY",
            "width",
            "height",
            "size",
            "strokeWidth",
            "borderWidth",
            "arrowSize",
            "iconSize",
            "imageSize",
            "gridSize",
            "maxSavedPoints",
            "animationSpeed",
          ].includes(key)
        ) {
          props[key] = parseInt(match[1]);
        }
        // 소수점 숫자 props
        else if (["opacity"].includes(key)) {
          props[key] = parseFloat(match[1]);
        }
        // 불린 props
        else if (
          [
            "showArrow",
            "showStartArrow",
            "animated",
            "isOpen",
            "showStatus",
            "showIcon",
            "filled",
            "curved",
            "animate",
            "draggable",
            "sparkle",
            "snapToGrid",
            "constrainToBounds",
            "showDetails",
            "showSavedPoints",
            "showToggle",
            "initialVisible",
            "showSettingsButton",
            "enableAutoConnect",
          ].includes(key)
        ) {
          props[key] = match[1] === "true";
        }
        // 복잡한 객체 props
        else if (key === "fromBox" || key === "toBox" || key === "fromBoxInfo" || key === "toPoint") {
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
            // fromBoxInfo나 toPoint용 x,y,width,height 파싱
            const xMatch = match[1].match(/x:\s*(\d+)/);
            const yMatch = match[1].match(/y:\s*(\d+)/);
            const widthMatch = match[1].match(/width:\s*(\d+)/);
            const heightMatch = match[1].match(/height:\s*(\d+)/);
            if (xMatch && yMatch) {
              props[key] = {
                x: parseInt(xMatch[1]),
                y: parseInt(yMatch[1]),
                ...(widthMatch ? { width: parseInt(widthMatch[1]) } : {}),
                ...(heightMatch ? { height: parseInt(heightMatch[1]) } : {}),
              };
            }
          }
        } else if (key === "bounds") {
          try {
            const objString = match[1].replace(/'/g, '"');
            const cleanObjString = objString.replace(/(\w+):/g, '"$1":');
            props[key] = JSON.parse(`{${cleanObjString}}`);
          } catch (error) {
            console.error("bounds 파싱 오류:", error);
          }
        } else if (key === "bendPoints") {
          // bendPoints 배열 파싱
          try {
            const arrayString = match[1];
            const pointMatches = arrayString.matchAll(/{\s*x:\s*(\d+)\s*,\s*y:\s*(\d+)\s*}/g);
            const bendPoints = [];
            for (const pointMatch of pointMatches) {
              bendPoints.push({
                x: parseInt(pointMatch[1]),
                y: parseInt(pointMatch[2]),
              });
            }
            if (bendPoints.length > 0) {
              props[key] = bendPoints;
            }
          } catch (error) {
            console.error("bendPoints 파싱 오류:", error);
          }
        } else if (key === "settingsProps" || key === "settings") {
          // settingsProps/settings 객체 파싱
          try {
            const objString = match[1];
            // 간단한 키-값 쌍 추출
            const settingsObj = {};

            // 문자열 값들
            const stringMatches = objString.matchAll(/(\w+):\s*["']([^"']+)["']/g);
            for (const stringMatch of stringMatches) {
              settingsObj[stringMatch[1]] = stringMatch[2];
            }

            // 불린 값들
            const boolMatches = objString.matchAll(/(\w+):\s*(true|false)/g);
            for (const boolMatch of boolMatches) {
              settingsObj[boolMatch[1]] = boolMatch[2] === "true";
            }

            // 숫자 값들
            const numberMatches = objString.matchAll(/(\w+):\s*(\d+(?:\.\d+)?)/g);
            for (const numberMatch of numberMatches) {
              const value = numberMatch[2].includes(".") ? parseFloat(numberMatch[2]) : parseInt(numberMatch[2]);
              settingsObj[numberMatch[1]] = value;
            }

            if (Object.keys(settingsObj).length > 0) {
              props[key] = settingsObj;
            }
          } catch (error) {
            console.error(`${key} 파싱 오류:`, error);
          }
        }
        // 문자열 props
        else {
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

    // 지원하는 모든 컴포넌트 타입들
    const componentTypes = [
      "Box",
      "DraggableBox",
      "ImageBox",
      "Connector",
      "AutoConnector",
      "Arrow",
      "Line",
      "Triangle",
      "Valve",
      "MouseTracker",
      "AutoConnectManager",
      "AutoConnectSettings",
    ];

    // 각 컴포넌트 타입별로 파싱
    componentTypes.forEach((componentType) => {
      // Self-closing 태그 파싱
      const selfClosingRegex = new RegExp(`<${componentType}\\s+([\\s\\S]*?)\\s*\\/>`, "g");
      let match;
      while ((match = selfClosingRegex.exec(code)) !== null) {
        const propsString = match[1];
        const props = parseProps(propsString);
        if (props) {
          elements.push({ type: componentType, props });
        }
      }

      // Children을 가지는 태그 파싱 (AutoConnectManager 등)
      if (componentType === "AutoConnectManager") {
        const openingRegex = new RegExp(`<${componentType}\\s+([\\s\\S]*?)>([\\s\\S]*?)<\\/${componentType}>`, "g");
        let openingMatch;
        while ((openingMatch = openingRegex.exec(code)) !== null) {
          const propsString = openingMatch[1];
          const childrenString = openingMatch[2];
          const props = parseProps(propsString);
          if (props) {
            // children을 재귀적으로 파싱
            const childElements = parseJSXCode(childrenString);
            props.children = childElements;
            elements.push({ type: componentType, props });
          }
        }
      }
    });
    return elements;
  } catch (error) {
    console.error("JSX 파싱 에러:", error);
    return [];
  }
};
