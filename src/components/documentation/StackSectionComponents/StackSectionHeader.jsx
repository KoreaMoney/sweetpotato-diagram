const StackSectionHeader = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="text-3xl mr-3">🎯</span>
        Stack Priority & Z-Index Management
      </h2>
      <p className="text-gray-600 mb-6">
        Stack Priority는 Box와 ImageBox 컴포넌트에서 겹쳐진 요소들의 표시 순서를 제어하는 기능입니다. 클릭 기반 자동
        우선순위와 props 기반 고정 우선순위를 모두 지원합니다.
      </p>
    </div>
  );
};

export default StackSectionHeader;
