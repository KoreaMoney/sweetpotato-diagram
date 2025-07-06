import Sankey from "../../../DiagramComponents/Sankey";
import { revenueFlowData, admissionData, pipelineData, customerJourneyData, energySystemData } from "../sampleData";

const ComplexExamplesSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 복잡한 예제들</h2>

      {/* 실제 다이어그램 결과 */}
      <div className="mt-6 space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-medium text-gray-800 mb-3">💼 기업 매출 흐름</h4>
          <p className="text-sm text-gray-600 mb-3">제품별 → 지역별 → 채널별 매출 흐름 분석</p>
          <Sankey data={revenueFlowData} width={800} height={400} className="mx-auto" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-medium text-gray-800 mb-3">🎓 대학 입학 과정</h4>
          <p className="text-sm text-gray-600 mb-3">지원자 → 심사단계 → 합격/불합격 흐름</p>
          <Sankey data={admissionData} width={800} height={350} className="mx-auto" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-medium text-gray-800 mb-3">🚀 CI/CD 파이프라인</h4>
          <p className="text-sm text-gray-600 mb-3">코드 커밋 → 빌드/테스트 → 배포 과정</p>
          <Sankey data={pipelineData} width={800} height={400} className="mx-auto" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-medium text-gray-800 mb-3">🛒 고객 여정 분석</h4>
          <p className="text-sm text-gray-600 mb-3">방문 → 관심 → 구매 → 재구매 흐름</p>
          <Sankey data={customerJourneyData} width={800} height={400} className="mx-auto" />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border">
          <h4 className="font-medium text-gray-800 mb-3">⚡ 에너지 시스템</h4>
          <p className="text-sm text-gray-600 mb-3">재생에너지 → 전력망 → 최종 사용자 흐름</p>
          <Sankey data={energySystemData} width={800} height={450} className="mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ComplexExamplesSection;
