import { useState, useMemo } from "react";
import { parseJSXComponents } from "../utils/jsxParser";
import { codeTemplates } from "../data/connectorExampleData";

/**
 * JSX 코드 파싱을 위한 커스텀 훅
 * @returns {Object} { editableCode, setEditableCode, parsedComponents, handleCodeChange }
 */
export const useJSXParser = () => {
  const [editableCode, setEditableCode] = useState(codeTemplates.boxStraight);

  // JSX 코드를 파싱해서 컴포넌트 props로 변환
  const parsedComponents = useMemo(() => {
    console.log("Parsing JSX:", editableCode);
    return parseJSXComponents(editableCode);
  }, [editableCode]);

  const handleCodeChange = (event) => {
    setEditableCode(event.target.value);
  };

  return {
    editableCode,
    setEditableCode,
    parsedComponents,
    handleCodeChange,
  };
};
