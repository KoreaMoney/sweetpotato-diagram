import { gridExamples } from "../data/connectorExampleData";

// 분할된 컴포넌트들 import (index 파일 사용)
import {
  IntroductionSection,
  PositionExample,
  GridExampleCard,
  SystemExample,
  UsageGuide,
} from "./ConnectorExamples/index";
import logo from "@/assets/logo.png";

const ConnectorExamples = () => {
  return (
    <div className="w-full bg-gray-50 p-8 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
        <img src={logo} alt="logo" className="w-6 h-6 inline-block mr-2" />
        SweetPD Connector
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

      {/* 실시간 코드 편집기 */}
      <UsageGuide />
    </div>
  );
};

export default ConnectorExamples;
