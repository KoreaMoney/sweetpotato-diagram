import { Box, Connector, Valve } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const OverviewSection = ({ setActiveSection }) => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">🔗 Diagram</h1>
        <p className="text-xl">회로도 설계 시스템을 위한 재사용 가능한 다이어그램 컴포넌트 라이브러리</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📋 라이브러리 소개</h2>
        <p className="text-gray-700 mb-4">
          Diagram 라이브러리는 React 기반의 인터랙티브한 다이어그램 컴포넌트 모음입니다. 수소연료전지 시스템, 전기회로,
          공정도 등 다양한 기술 다이어그램을 쉽고 빠르게 구성할 수 있도록 설계되었습니다.
        </p>
        <p className="text-gray-700">
          모든 컴포넌트는 TailwindCSS를 활용한 유연한 스타일링과 클릭 이벤트를 지원하여, 정적인 다이어그램뿐만 아니라
          인터랙티브한 시스템 모니터링 대시보드까지 구현할 수 있습니다.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">✨ 주요 특징</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">🎨 유연한 스타일링</h3>
            <p className="text-sm text-blue-700">TailwindCSS 클래스를 통한 자유로운 색상, 크기, 테두리 설정</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h3 className="font-semibold text-emerald-800 mb-2">🖱️ 인터랙티브</h3>
            <p className="text-sm text-emerald-700">모든 컴포넌트에 클릭 이벤트 지원으로 동적 상호작용 구현</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">🔗 스마트 연결</h3>
            <p className="text-sm text-purple-700">박스 간 자동 연결점 계산 및 다양한 연결 타입 지원</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">📱 반응형</h3>
            <p className="text-sm text-amber-700">다양한 화면 크기에 대응하는 유연한 레이아웃 지원</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🧩 컴포넌트 목록</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold mb-1">Box</h3>
            <p className="text-sm text-gray-600">시스템 구성요소를 나타내는 기본 박스</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-semibold mb-1">Connector</h3>
            <p className="text-sm text-gray-600">컴포넌트 간 연결선 (직선, 곡선, 커스텀)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🔺</div>
            <h3 className="font-semibold mb-1">Triangle</h3>
            <p className="text-sm text-gray-600">방향 표시용 삼각형</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🚰</div>
            <h3 className="font-semibold mb-1">Valve</h3>
            <p className="text-sm text-gray-600">게이트/볼 밸브 (열림/닫힘 상태)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="font-semibold mb-1">ImageBox</h3>
            <p className="text-sm text-gray-600">이미지를 포함하는 박스</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">➡️</div>
            <h3 className="font-semibold mb-1">Arrow</h3>
            <p className="text-sm text-gray-600">방향성 화살표 (단방향/양방향)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📏</div>
            <h3 className="font-semibold mb-1">Line</h3>
            <p className="text-sm text-gray-600">기본 직선 (연결선, 구분선, 보조선)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📦 설치 방법</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">NPM 설치</h3>
          <pre className="text-sm">
            {`# NPM으로 설치
npm install @your-org/diagram-components

# 또는 Yarn으로 설치
yarn add @your-org/diagram-components`}
          </pre>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">📋 필수 의존성</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>React:</strong> ^18.0.0
            </li>
            <li>
              • <strong>TailwindCSS:</strong> ^3.0.0
            </li>
            <li>
              • <strong>React DOM:</strong> ^18.0.0
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 빠른 시작</h2>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">1. 컴포넌트 임포트</h3>
          <pre className="text-sm overflow-x-auto">
            {`import { 
  Box, 
  Connector, 
  Triangle, 
  Valve, 
  ImageBox, 
  Arrow, 
  Line 
} from '@your-org/diagram-components';`}
          </pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">2. 기본 사용 예제</h3>
          <pre className="text-sm overflow-x-auto">
            {`function MyDiagram() {
  const boxes = [
    { id: "tank", x: 50, y: 50, width: 80, height: 40 },
    { id: "pump", x: 200, y: 50, width: 80, height: 40 }
  ];

  return (
    <div className="relative w-full h-64 bg-gray-50">
      <Box
        id="tank"
        x={50}
        y={50}
        width={80}
        height={40}
        text="수소탱크"
        className="bg-blue-500 text-white border-2 border-blue-700 rounded"
        onClick={() => console.log('탱크 클릭')}
      />
      
      <Box
        id="pump"
        x={200}
        y={50}
        width={80}
        height={40}
        text="펌프"
        className="bg-emerald-500 text-white border-2 border-emerald-700 rounded"
        onClick={() => console.log('펌프 클릭')}
      />
      
      <Connector
        fromBox={{ id: "tank", position: "right" }}
        toBox={{ id: "pump", position: "left" }}
        boxes={boxes}
        connectionType="straight"
        className="text-blue-600"
        showArrow={true}
      />
      
      <Valve
        x={165}
        y={62}
        size={15}
        type="gate"
        isOpen={true}
        className="text-gray-600"
      />
    </div>
  );
}`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🎯 결과 미리보기</h3>
          <div className="relative w-full h-32 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Box
              id="quick-tank"
              x={50}
              y={20}
              width={80}
              height={30}
              text="수소탱크"
              className="bg-blue-500 text-white border-2 border-blue-700 rounded text-xs"
              onClick={() => addToast("빠른 시작 - 탱크 클릭! 🚀", "info")}
            />

            <Box
              id="quick-pump"
              x={200}
              y={20}
              width={80}
              height={30}
              text="펌프"
              className="bg-emerald-500 text-white border-2 border-emerald-700 rounded text-xs"
              onClick={() => addToast("빠른 시작 - 펌프 클릭! ⚙️", "success")}
            />

            <Connector
              fromBox={{ id: "quick-tank", position: "right" }}
              toBox={{ id: "quick-pump", position: "left" }}
              boxes={[
                { id: "quick-tank", x: 50, y: 20, width: 80, height: 30 },
                { id: "quick-pump", x: 200, y: 20, width: 80, height: 30 },
              ]}
              connectionType="straight"
              className="text-blue-600"
              showArrow={true}
              strokeWidth={2}
            />

            <Valve
              x={165}
              y={27}
              size={12}
              type="gate"
              isOpen={true}
              className="text-gray-600"
              onClick={() => addToast("빠른 시작 - 밸브 클릭! 🚰", "info")}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📚 학습 가이드</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-2xl mr-3">1️⃣</span>
            <div>
              <h3 className="font-semibold text-blue-800">Box 컴포넌트부터 시작</h3>
              <p className="text-sm text-blue-700">기본 박스 생성과 스타일링 방법을 익혀보세요</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <span className="text-2xl mr-3">2️⃣</span>
            <div>
              <h3 className="font-semibold text-emerald-800">Connector로 연결하기</h3>
              <p className="text-sm text-emerald-700">박스들을 다양한 방식으로 연결하는 방법을 학습하세요</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
            <span className="text-2xl mr-3">3️⃣</span>
            <div>
              <h3 className="font-semibold text-purple-800">특수 컴포넌트 활용</h3>
              <p className="text-sm text-purple-700">Valve, Triangle, Arrow 등으로 전문적인 다이어그램 완성</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
            <span className="text-2xl mr-3">4️⃣</span>
            <div>
              <h3 className="font-semibold text-amber-800">실제 예제 구현</h3>
              <p className="text-sm text-amber-700">수소연료전지 시스템 등 실용적인 다이어그램 제작</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg border border-emerald-200">
        <h2 className="text-xl font-bold text-emerald-800 mb-3">🎯 다음 단계</h2>
        <p className="text-emerald-700 mb-4">
          왼쪽 메뉴에서 각 컴포넌트의 상세 문서를 확인하고, 라이브 예제를 통해 실제 동작을 체험해보세요!
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection("box")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            📦 Box 시작하기
          </button>
          <button
            onClick={() => setActiveSection("connector")}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
          >
            🔗 Connector 알아보기
          </button>
          <button
            onClick={() => setActiveSection("examples")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            💡 예제 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
