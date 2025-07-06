import BasicUsageSection from "./sections/BasicUsageSection";
import InteractiveSection from "./sections/InteractiveSection";
import ComplexExamplesSection from "./sections/ComplexExamplesSection";
import DataStructureSection from "./sections/DataStructureSection";
import PropsSection from "./sections/PropsSection";
import StylingSection from "./sections/StylingSection";
import UsageTipsSection from "./sections/UsageTipsSection";

const SankeySection = () => {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">🌊 Sankey 다이어그램</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          흐름량을 시각적으로 표현하는 다이어그램입니다. 노드의 높이가 흐름량에 비례합니다.
        </p>
      </div>

      {/* 각 섹션들 */}
      <BasicUsageSection />
      <InteractiveSection />
      <ComplexExamplesSection />
      <DataStructureSection />
      <PropsSection />
      <StylingSection />
      <UsageTipsSection />
    </div>
  );
};

export default SankeySection;
