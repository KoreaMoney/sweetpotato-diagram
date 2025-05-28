const IntroductionSection = () => {
  return (
    <div className="space-y-6 mb-8">
      {/* 메인 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">🔗 Diagram 컴포넌트 라이브러리</h1>
        <p className="text-xl mb-4">회로도 설계 시스템을 위한 재사용 가능한 다이어그램 컴포넌트 라이브러리</p>
        <div className="bg-black bg-opacity-20 p-4 rounded-lg">
          <p className="text-lg">✨ 직관적인 박스 연결 방식으로 복잡한 시스템 다이어그램을 쉽게 구성할 수 있습니다</p>
        </div>
      </div>

      {/* 주요 특징 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">직관적인 연결</h3>
          <p className="text-gray-600 text-sm">박스 ID와 위치만 지정하면 자동으로 최적의 경로로 연결됩니다</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-3xl mb-3">🔧</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">다양한 연결 타입</h3>
          <p className="text-gray-600 text-sm">직선, 직각, 곡선, 커스텀 경로 등 다양한 연결 방식을 지원합니다</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">실시간 편집</h3>
          <p className="text-gray-600 text-sm">코드 에디터에서 실시간으로 수정하고 결과를 바로 확인할 수 있습니다</p>
        </div>
      </div>

      {/* 박스 연결 방식 설명 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎯 박스 연결 방식</h2>
        <p className="text-blue-700 mb-4">
          Connector에서 박스 ID와 연결 위치를 지정하여 직관적으로 연결할 수 있습니다!
        </p>

        <div className="bg-white p-4 rounded border mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">기본 연결 방식</h4>
          <code className="text-sm bg-gray-100 p-2 rounded block">
            fromBox=&#123;&#123; id: "box1", position: "right" &#125;&#125;
            <br />
            toBox=&#123;&#123; id: "box2", position: "left" &#125;&#125;
            <br />
            boxes=&#123;[박스정보배열]&#125;
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📍 연결 위치</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • <strong>top</strong>: 박스 상단 중앙
              </li>
              <li>
                • <strong>right</strong>: 박스 우측 중앙
              </li>
              <li>
                • <strong>bottom</strong>: 박스 하단 중앙
              </li>
              <li>
                • <strong>left</strong>: 박스 좌측 중앙
              </li>
            </ul>
          </div>

          <div className="bg-indigo-100 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-2">🔗 연결 타입</h4>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>
                • <strong>straight</strong>: 직선 연결
              </li>
              <li>
                • <strong>orthogonal</strong>: 직각 연결
              </li>
              <li>
                • <strong>curved</strong>: 곡선 연결
              </li>
              <li>
                • <strong>custom</strong>: 커스텀 경로
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;
