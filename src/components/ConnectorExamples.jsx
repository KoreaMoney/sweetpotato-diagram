import { useJSXParser } from "../hooks/useJSXParser";
import { gridExamples } from "../data/connectorExampleData";

// 분할된 컴포넌트들 import (index 파일 사용)
import {
  IntroductionSection,
  PositionExample,
  GridExampleCard,
  SystemExample,
  CodeEditor,
  LivePreview,
  UsageGuide,
} from "./ConnectorExamples/index";
import logo from "@/assets/logo.png";
const ConnectorExamples = () => {
  const { editableCode, parsedComponents, handleCodeChange } = useJSXParser();

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <img src={logo} alt="logo" className="w-6 h-6 inline-block mr-2" />
        SweetPotato Connector
      </h1>

      {/* 박스 연결 방식 소개 */}
      <IntroductionSection />

      {/* 박스 연결 위치 예제 */}
      <PositionExample />

      {/* 그리드 레이아웃으로 변경 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
        {gridExamples.map((example) => (
          <GridExampleCard key={example.id} example={example} />
        ))}
      </div>

      {/* 복잡한 시스템 예제 */}
      <SystemExample />

      {/* 수정 가능한 코드 예제 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 코드 에디터 */}
        <CodeEditor editableCode={editableCode} onCodeChange={handleCodeChange} />

        {/* 실시간 미리보기 */}
        <LivePreview parsedComponents={parsedComponents} />

        {/* 사용법 안내 */}
        <UsageGuide />
      </div>
    </div>
  );
};

export default ConnectorExamples;
