const IntroductionSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg shadow-lg mb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📊 Connector 컴포넌트 사용 가이드</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">🎯 주요 기능</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                박스 간 자동 연결선 생성
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                다양한 연결 타입 (직선, 직교, 곡선, 자동)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                화살표 표시 및 애니메이션 지원
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                실시간 코드 편집 및 미리보기
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">⚡ 새로운 방식</h3>
            <div className="space-y-3 text-gray-700">
              <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-800">DiagramProvider 사용</p>
                <p className="text-xs text-gray-600 mt-1">자동 박스 감지 및 관리</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-800">fromBox, toBox 방식</p>
                <p className="text-xs text-gray-600 mt-1">단순하고 직관적인 연결</p>
              </div>
              <div className="bg-gray-50 p-3 rounded border-l-4 border-purple-500">
                <p className="text-sm font-medium text-purple-800">showArrow 속성</p>
                <p className="text-xs text-gray-600 mt-1">화살표 표시 제어</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">📝 기본 사용법</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`<DiagramProvider>
  <Box id="start" x={50} y={50} width={80} height={30} text="시작" />
  <Box id="end" x={200} y={100} width={80} height={30} text="끝" />
  
  <Connector
    fromBox={{ id: "start", position: "right" }}
    toBox={{ id: "end", position: "left" }}
    connectionType="straight"
    showArrow={true}
    strokeWidth={2}
    className="text-blue-600"
  />
</DiagramProvider>`}</pre>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            💡 <code className="bg-gray-100 px-1 rounded">showArrow={`{true}`}</code>를 추가하면 화살표가 표시됩니다!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;
