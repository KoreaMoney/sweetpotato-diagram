/**
 * Connector 컴포넌트 사용 예시 모음
 *
 * 리팩토링된 버전: 모듈화된 구조로 개선
 */

import React from "react";
import { DiagramProvider } from "./DiagramContext";
import CodeEditor from "./CodeEditor";

// 커스텀 훅
import { useConnectorExamples } from "./hooks/useConnectorExamples";

// UI 컴포넌트들
import ExampleHeader from "./ui/ExampleHeader";
import ExampleSidebar from "./ui/ExampleSidebar";
import DiagramPreview from "./ui/DiagramPreview";
import StatusBar from "./ui/StatusBar";

// 예제 컴포넌트들
import {
  BasicExample,
  CurvedExample,
  OrthogonalExample,
  MultiConnectionExample,
  FreePointExample,
  CustomExample,
  ElectricAnimationExample,
  WaterAnimationExample,
  WindAnimationExample,
  GasAnimationExample,
  DataAnimationExample,
  AnimationComparisonExample,
} from "./examples/ExampleComponents";

// 컴포넌트 매핑
const EXAMPLE_COMPONENTS = {
  basic: BasicExample,
  curved: CurvedExample,
  orthogonal: OrthogonalExample,
  multiConnection: MultiConnectionExample,
  freePoint: FreePointExample,
  electricAnimation: ElectricAnimationExample,
  waterAnimation: WaterAnimationExample,
  windAnimation: WindAnimationExample,
  gasAnimation: GasAnimationExample,
  dataAnimation: DataAnimationExample,
  animationComparison: AnimationComparisonExample,
};

const ConnectorExamplesContent = () => {
  const {
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
  } = useConnectorExamples();

  // 렌더링할 컴포넌트 결정
  const ExampleComponent = isCustomMode
    ? () => <CustomExample elements={customElements} isAnimated={isAnimated} />
    : EXAMPLE_COMPONENTS[selectedExample];

  // 애니메이션 지원 여부 확인
  const supportsAnimation = isCustomMode || currentTemplate.supportsAnimation;

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* 상단 헤더 */}
      <div className="flex-shrink-0">
        <ExampleHeader
          supportsAnimation={supportsAnimation}
          isAnimated={isAnimated}
          isCodeEditorVisible={isCodeEditorVisible}
          onAnimationToggle={handleAnimationToggle}
          onCodeEditorToggle={handleCodeEditorToggle}
        />
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* 좌측 사이드바 */}
        <ExampleSidebar selectedExample={selectedExample} onExampleSelect={handleExampleSelect} />

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* 다이어그램 미리보기 */}
          <DiagramPreview
            ExampleComponent={ExampleComponent}
            isAnimated={isAnimated}
            isCustomMode={isCustomMode}
            currentTemplate={currentTemplate}
            parseError={parseError}
          />

          {/* 코드 에디터 */}
          {isCodeEditorVisible && (
            <div className="h-80 border-t border-gray-200 flex-shrink-0 overflow-hidden">
              <CodeEditor
                key={`editor-${selectedExample}`}
                initialCode={currentCode}
                onChange={handleCodeChange}
                onRun={handleRunCode}
                language="jsx"
                className="h-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* 하단 상태 바 */}
      <div className="flex-shrink-0">
        <StatusBar isCustomMode={isCustomMode} currentTemplate={currentTemplate} />
      </div>
    </div>
  );
};

const ConnectorExamples = () => {
  return (
    <DiagramProvider>
      <ConnectorExamplesContent />
    </DiagramProvider>
  );
};

export default ConnectorExamples;
