/**
 * Utility function to extract property values from JSX strings
 * @param {string} componentStr - Component JSX string
 * @param {string} propName - Property name to extract
 * @param {any} defaultValue - Default value
 * @returns {any} Parsed property value
 */
export const extractProp = (componentStr, propName, defaultValue) => {
  const regex = new RegExp(`${propName}=\\{([^}]+)\\}|${propName}="([^"]+)"`);
  const match = componentStr.match(regex);

  if (!match) return defaultValue;

  const value = match[1] || match[2];

  // Handle boolean values
  if (value === "true") return true;
  if (value === "false") return false;

  // Handle string values
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1);
  }

  // Handle array values
  if (value.startsWith("[") && value.endsWith("]")) {
    return parseArrayValue(value, defaultValue);
  }

  // Handle object values
  if (value.startsWith("{") && value.endsWith("}")) {
    return parseObjectValue(value, defaultValue);
  }

  // Handle numeric values
  if (!isNaN(value)) return Number(value);

  // Handle basic string processing
  return value.replace(/"/g, "");
};

/**
 * Function to parse array strings
 * @param {string} value - Array string
 * @param {any} defaultValue - Default value
 * @returns {any} Parsed array or default value
 */
const parseArrayValue = (value, defaultValue) => {
  try {
    const arrayStr = value.replace(/\s+/g, " ").trim();
    // Attempt JSON format conversion
    const result = JSON.parse(arrayStr.replace(/(\w+):/g, '"$1":'));
    return Array.isArray(result) ? result : defaultValue;
  } catch {
    try {
      // Attempt parsing using eval (security caution)
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
 * Function to parse object strings
 * @param {string} value - Object string
 * @param {any} defaultValue - Default value
 * @returns {any} Parsed object or default value
 */
const parseObjectValue = (value, defaultValue) => {
  try {
    // Attempt JSON format conversion
    const objectStr = value.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
    return JSON.parse(objectStr);
  } catch {
    try {
      // Attempt parsing using eval (security caution)
      return eval(`(${value})`);
    } catch (error) {
      console.warn(`Failed to parse object ${value}:`, error);
      return defaultValue;
    }
  }
};

/**
 * Function to parse Box components from JSX strings
 * @param {string} jsxCode - JSX code string
 * @returns {Array} Array of parsed Box components
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
    return box;
  });
};

/**
 * Function to parse Connector components from JSX strings
 * @param {string} jsxCode - JSX code string
 * @param {Array} boxes - Array of box components
 * @returns {Array} Array of parsed Connector components
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
      // Use all parsed boxes if boxes array is empty
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
    return connector;
  });
};

/**
 * Main function to parse JSX code and return components
 * @param {string} jsxCode - JSX code string
 * @returns {Object} { boxes, connectors } Parsed components
 */
export const parseJSXComponents = (jsxCode) => {
  try {
    const boxes = parseBoxComponents(jsxCode);
    const connectors = parseConnectorComponents(jsxCode, boxes);

    return { boxes, connectors };
  } catch (error) {
    console.error("JSX parsing error:", error);

    // Return default values on parsing error
    return {
      boxes: [
        {
          id: "box-1",
          x: 50,
          y: 50,
          width: 80,
          height: 30,
          text: "Start",
          className: "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm",
        },
        {
          id: "box-2",
          x: 200,
          y: 100,
          width: 80,
          height: 30,
          text: "End",
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
