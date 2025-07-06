const UsageTipsSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
      <h2 className="text-xl font-semibold text-green-900 mb-4">💡 사용 팁</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-green-600 mt-1">🎯</span>
          <div>
            <h3 className="font-medium text-green-800">레이어 설정</h3>
            <p className="text-sm text-green-700">
              노드의 layer 속성으로 좌우 위치를 결정합니다. 0부터 시작하여 단계별로 배치됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 mt-1">🔗</span>
          <div>
            <h3 className="font-medium text-green-800">링크 ID</h3>
            <p className="text-sm text-green-700">
              각 링크에 고유한 ID를 설정하면 흐름 선택 기능을 사용할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 mt-1">📏</span>
          <div>
            <h3 className="font-medium text-green-800">흐름량 설정</h3>
            <p className="text-sm text-green-700">value 값이 클수록 노드와 링크의 높이가 커집니다.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 mt-1">🎨</span>
          <div>
            <h3 className="font-medium text-green-800">TailwindCSS 스타일링</h3>
            <p className="text-sm text-green-700">
              각 노드와 링크에 개별적으로 className과 style을 적용하여 다양한 스타일을 만들 수 있습니다.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-green-600 mt-1">🌙</span>
          <div>
            <h3 className="font-medium text-green-800">테마 적용</h3>
            <p className="text-sm text-green-700">
              svgClassName, tooltipClassName 등을 사용하여 다크 모드나 커스텀 테마를 쉽게 적용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageTipsSection;
