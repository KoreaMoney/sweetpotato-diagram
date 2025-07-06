import StackedBoxExample from "../DiagramComponents/examples/StackedBoxExample";
import {
  StackSectionHeader,
  StackFeatureCards,
  StackUsageExamples,
  StackScenarioExample,
  StackPriorityRules,
  scenarios,
} from "./StackSectionComponents";

const StackSection = () => {
  return (
    <div className="space-y-6">
      <StackSectionHeader />

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <StackFeatureCards />
        <StackUsageExamples />

        <div className="mb-6 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold text-gray-800 mb-4">💡 다양한 사용 시나리오</h3>
          {scenarios.map((scenario) => (
            <StackScenarioExample key={scenario.id} scenario={scenario} />
          ))}
          <StackPriorityRules />
        </div>
      </div>

      <StackedBoxExample />
    </div>
  );
};

export default StackSection;
