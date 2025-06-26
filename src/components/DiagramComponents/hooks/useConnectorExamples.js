/**
 * ConnectorExamples 컴포넌트의 상태 관리를 위한 커스텀 훅
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { EXAMPLE_METADATA } from "../examples/exampleMetadata";
import { parseJSXCode } from "../utils/jsxParser";

export const useConnectorExamples = () => {
  const [selectedExample, setSelectedExample] = useState("basic");
  const [currentCode, setCurrentCode] = useState("");
  const [isCodeEditorVisible, setIsCodeEditorVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [parseError, setParseError] = useState("");
  const [customElements, setCustomElements] = useState([]);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // 현재 템플릿을 메모화하여 불필요한 재렌더링 방지
  const currentTemplate = useMemo(() => {
    const template = EXAMPLE_METADATA[selectedExample];
    if (!template) {
      return EXAMPLE_METADATA.basic;
    }
    return template;
  }, [selectedExample]);

  // 예제 선택 핸들러
  const handleExampleSelect = useCallback((exampleKey) => {
    setSelectedExample(exampleKey);
    setParseError("");
    setIsCustomMode(false);
    setCustomElements([]);
  }, []);

  // 코드 변경 핸들러
  const handleCodeChange = useCallback((newCode) => {
    setCurrentCode(newCode);
    setParseError(""); // 코드 변경 시 에러 메시지 초기화
  }, []);

  // 코드 실행 핸들러
  const handleRunCode = useCallback((code) => {
    try {
      // JSX 코드 파싱
      const elements = parseJSXCode(code);

      if (elements.length === 0) {
        setParseError("유효한 Box 또는 Connector 컴포넌트를 찾을 수 없습니다.");
        return;
      }

      // 파싱된 요소들을 상태에 저장
      setCustomElements(elements);
      setIsCustomMode(true);
      setParseError("");

      // 코드 실행 후 자동으로 코드 에디터 숨기기 (미리보기로 전환)
      setIsCodeEditorVisible(false);
    } catch (error) {
      setParseError(`코드 실행 에러: ${error.message}`);
      console.error("Code execution error:", error);
    }
  }, []);

  // 애니메이션 토글 핸들러
  const handleAnimationToggle = useCallback(() => {
    setIsAnimated((prev) => !prev);
  }, []);

  // 코드 에디터 표시 토글 핸들러
  const handleCodeEditorToggle = useCallback(() => {
    setIsCodeEditorVisible((prev) => !prev);
  }, []);

  // selectedExample이 변경될 때마다 currentCode 업데이트
  useEffect(() => {
    if (currentTemplate?.code) {
      setCurrentCode(currentTemplate.code);
    }
  }, [currentTemplate]);

  return {
    // State
    selectedExample,
    currentCode,
    isCodeEditorVisible,
    isAnimated,
    parseError,
    customElements,
    isCustomMode,
    currentTemplate,

    // Handlers
    handleExampleSelect,
    handleCodeChange,
    handleRunCode,
    handleAnimationToggle,
    handleCodeEditorToggle,
  };
};
