import { useState } from "react";
import { Box, Connector, Triangle, Valve, ImageBox, Arrow, Line } from "./DiagramComponents";
import { useToast } from "./ToastSystem";
import logo from "@/assets/logo.png";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { addToast } = useToast();

  const sections = [
    { id: "overview", title: "개요", icon: "📚" },
    { id: "box", title: "Box", icon: "📦" },
    { id: "connector", title: "Connector", icon: "🔗" },
    { id: "triangle", title: "Triangle", icon: "🔺" },
    { id: "valve", title: "Valve", icon: "🚰" },
    { id: "imagebox", title: "ImageBox", icon: "🖼️" },
    { id: "arrow", title: "Arrow", icon: "➡️" },
    { id: "line", title: "Line", icon: "📏" },
    { id: "examples", title: "예제", icon: "💡" },
  ];

  const renderOverview = () => (
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

  const renderConnector = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🔗 Connector 컴포넌트</h2>
        <p className="text-gray-600 mb-6">컴포넌트들을 연결하는 다양한 형태의 선을 그리는 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  boxes={[
    { id: "box1", x: 50, y: 50, width: 80, height: 30 },
    { id: "box2", x: 200, y: 100, width: 80, height: 30 }
  ]}
  connectionType="straight"
  className="text-blue-600"
  showArrow={true}
  showStartArrow={false}
  arrowSize={8}
  strokeWidth={2}
/>`}
          </pre>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mb-6 border border-cyan-200">
          <h3 className="text-xl font-bold text-cyan-800 mb-4">🛤️ 커스텀 경로 (Custom) 사용법</h3>
          <p className="text-cyan-700 mb-4">
            복잡한 경로나 장애물을 피해야 할 때 <code className="bg-white px-2 py-1 rounded">bendPoints</code>를
            사용하여 자유로운 경로를 설정할 수 있습니다.
          </p>

          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">라이브 예제</h4>
            <div className="relative w-full h-48 border border-gray-200 rounded bg-gray-50">
              <Box
                id="custom-demo-start"
                x={20}
                y={50}
                width={60}
                height={25}
                text="시작점"
                className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("시작점: 커스텀 경로 시작! 🚀", "info")}
              />

              <Box
                id="obstacle"
                x={120}
                y={60}
                width={80}
                height={40}
                text="장애물"
                className="bg-red-500 text-white border-red-700 border-2 rounded-lg text-xs opacity-70"
              />

              <Box
                id="custom-demo-end"
                x={280}
                y={120}
                width={60}
                height={25}
                text="도착점"
                className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("도착점: 커스텀 경로 완료! 🎯", "success")}
              />

              <Connector
                fromBox={{ id: "custom-demo-start", position: "right" }}
                toBox={{ id: "custom-demo-end", position: "left" }}
                boxes={[
                  { id: "custom-demo-start", x: 20, y: 45, width: 60, height: 25 },
                  { id: "custom-demo-end", x: 280, y: 120, width: 60, height: 25 },
                ]}
                connectionType="custom"
                bendPoints={[
                  { x: 100, y: 60 },
                  { x: 100, y: 40 },
                  { x: 220, y: 40 },
                  { x: 220, y: 132 },
                  { x: 280, y: 132 },
                ]}
                className="text-cyan-500"
                showArrow={true}
                strokeWidth={3}
                animated={true}
              />

              <div className="absolute top-1 left-1 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                💡 장애물을 피하는 커스텀 경로
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">커스텀 경로 코드 예제</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 박스 정보 정의
const boxes = [
  { id: "start", x: 20, y: 30, width: 60, height: 25 },
  { id: "end", x: 280, y: 120, width: 60, height: 25 }
];

// 커스텀 경로 Connector
<Connector
  fromBox={{ id: "start", position: "right" }}
  toBox={{ id: "end", position: "left" }}
  boxes={boxes}
  connectionType="custom"
  bendPoints={[
    { x: 100, y: 42 },  // 첫 번째 꺾임점
    { x: 100, y: 20 },  // 위로 올라가기
    { x: 220, y: 20 },  // 장애물 위로 지나가기
    { x: 220, y: 132 }, // 아래로 내려가기
    { x: 280, y: 132 }  // 도착점으로
  ]}
  className="text-cyan-500"
  showArrow={true}
  strokeWidth={3}
  animated={true}
/>`}
            </pre>
          </div>

          <div className="mt-4 bg-cyan-100 border-l-4 border-cyan-400 p-4">
            <h4 className="font-medium text-cyan-800 mb-2">💡 커스텀 경로 사용 팁</h4>
            <ul className="text-sm text-cyan-700 space-y-1">
              <li>
                • <strong>bendPoints:</strong> 연결선이 지나갈 중간 지점들을 순서대로 배열로 정의
              </li>
              <li>
                • <strong>장애물 회피:</strong> 다른 컴포넌트나 영역을 피해서 연결할 때 유용
              </li>
              <li>
                • <strong>복잡한 플로우:</strong> 여러 단계를 거치는 복잡한 프로세스 표현
              </li>
              <li>
                • <strong>애니메이션:</strong> <code>animated={true}</code>로 데이터 흐름 시각화
              </li>
              <li>
                • <strong>좌표 계산:</strong> 박스 연결 방식과 함께 사용하면 자동으로 시작/끝점 계산
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg mb-6 border border-yellow-200">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">↔️ 양방향 화살표 및 크기 조절 사용법</h3>
          <p className="text-yellow-700 mb-4">
            양방향 통신이나 데이터 교환을 나타낼 때 <code className="bg-white px-2 py-1 rounded">showStartArrow</code>와
            <code className="bg-white px-2 py-1 rounded">arrowSize</code>를 사용하여 더욱 명확한 방향성을 표현할 수
            있습니다.
          </p>

          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">양방향 화살표 및 크기별 라이브 예제</h4>
            <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50">
              <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                💡 양방향 통신과 다양한 화살표 크기
              </div>

              {/* 기본 단방향 화살표 */}
              <Box
                id="uni-start"
                x={30}
                y={40}
                width={60}
                height={25}
                text="송신기"
                className="bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("송신기: 데이터 전송 📡", "info")}
              />
              <Box
                id="uni-end"
                x={150}
                y={40}
                width={60}
                height={25}
                text="수신기"
                className="bg-green-600 text-white border-green-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("수신기: 데이터 수신 📨", "success")}
              />
              <Connector
                fromBox={{ id: "uni-start", position: "right" }}
                toBox={{ id: "uni-end", position: "left" }}
                boxes={[
                  { id: "uni-start", x: 30, y: 40, width: 60, height: 25 },
                  { id: "uni-end", x: 150, y: 40, width: 60, height: 25 },
                ]}
                connectionType="straight"
                className="text-blue-600"
                showArrow={true}
                showStartArrow={false}
                arrowSize={8}
                strokeWidth={2}
              />

              {/* 양방향 화살표 - 기본 크기 */}
              <Box
                id="bi-server"
                x={280}
                y={40}
                width={60}
                height={25}
                text="서버"
                className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("서버: 양방향 통신 🖥️", "info")}
              />
              <Box
                id="bi-client"
                x={400}
                y={40}
                width={60}
                height={25}
                text="클라이언트"
                className="bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("클라이언트: 양방향 통신 💻", "warning")}
              />
              <Connector
                fromBox={{ id: "bi-server", position: "right" }}
                toBox={{ id: "bi-client", position: "left" }}
                boxes={[
                  { id: "bi-server", x: 280, y: 40, width: 60, height: 25 },
                  { id: "bi-client", x: 400, y: 40, width: 60, height: 25 },
                ]}
                connectionType="straight"
                className="text-purple-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={8}
                strokeWidth={3}
              />

              {/* 화살표 크기 비교 - 작은 크기 */}
              <Box
                id="small-start"
                x={30}
                y={100}
                width={50}
                height={20}
                text="소형"
                className="bg-cyan-600 text-white border-cyan-800 border-2 rounded text-xs"
                onClick={() => addToast("소형 시스템 🔹", "info")}
              />
              <Box
                id="small-end"
                x={120}
                y={100}
                width={50}
                height={20}
                text="센서"
                className="bg-teal-600 text-white border-teal-800 border-2 rounded text-xs"
                onClick={() => addToast("센서 연결 📊", "info")}
              />
              <Connector
                fromBox={{ id: "small-start", position: "right" }}
                toBox={{ id: "small-end", position: "left" }}
                boxes={[
                  { id: "small-start", x: 30, y: 100, width: 50, height: 20 },
                  { id: "small-end", x: 120, y: 100, width: 50, height: 20 },
                ]}
                connectionType="straight"
                className="text-cyan-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={6}
                strokeWidth={2}
              />

              {/* 화살표 크기 비교 - 중간 크기 */}
              <Box
                id="medium-start"
                x={220}
                y={95}
                width={60}
                height={30}
                text="중형"
                className="bg-indigo-600 text-white border-indigo-800 border-2 rounded text-xs"
                onClick={() => addToast("중형 시스템 🔸", "info")}
              />
              <Box
                id="medium-end"
                x={320}
                y={95}
                width={60}
                height={30}
                text="제어기"
                className="bg-blue-600 text-white border-blue-800 border-2 rounded text-xs"
                onClick={() => addToast("제어기 연결 ⚙️", "info")}
              />
              <Connector
                fromBox={{ id: "medium-start", position: "right" }}
                toBox={{ id: "medium-end", position: "left" }}
                boxes={[
                  { id: "medium-start", x: 220, y: 95, width: 60, height: 30 },
                  { id: "medium-end", x: 320, y: 95, width: 60, height: 30 },
                ]}
                connectionType="straight"
                className="text-indigo-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={10}
                strokeWidth={3}
              />

              {/* 화살표 크기 비교 - 큰 크기 */}
              <Box
                id="large-start"
                x={420}
                y={90}
                width={70}
                height={40}
                text="대형"
                className="bg-red-600 text-white border-red-800 border-2 rounded text-xs"
                onClick={() => addToast("대형 시스템 🔶", "error")}
              />
              <Box
                id="large-end"
                x={530}
                y={90}
                width={70}
                height={40}
                text="메인서버"
                className="bg-gray-800 text-white border-gray-900 border-2 rounded text-xs"
                onClick={() => addToast("메인서버 연결 🖥️", "info")}
              />
              <Connector
                fromBox={{ id: "large-start", position: "right" }}
                toBox={{ id: "large-end", position: "left" }}
                boxes={[
                  { id: "large-start", x: 420, y: 90, width: 70, height: 40 },
                  { id: "large-end", x: 530, y: 90, width: 70, height: 40 },
                ]}
                connectionType="straight"
                className="text-red-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={15}
                strokeWidth={4}
              />

              {/* 복잡한 양방향 연결 예제 */}
              <Box
                id="complex-hub"
                x={250}
                y={180}
                width={80}
                height={35}
                text="통신 허브"
                className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("통신 허브: 중앙 제어 🌐", "success")}
              />
              <Box
                id="complex-device1"
                x={100}
                y={170}
                width={60}
                height={25}
                text="장치1"
                className="bg-amber-600 text-white border-amber-800 border-2 rounded text-xs"
                onClick={() => addToast("장치1: 센서 모듈 📡", "warning")}
              />
              <Box
                id="complex-device2"
                x={100}
                y={205}
                width={60}
                height={25}
                text="장치2"
                className="bg-pink-600 text-white border-pink-800 border-2 rounded text-xs"
                onClick={() => addToast("장치2: 액추에이터 ⚙️", "info")}
              />
              <Box
                id="complex-device3"
                x={400}
                y={188}
                width={60}
                height={25}
                text="장치3"
                className="bg-violet-600 text-white border-violet-800 border-2 rounded text-xs"
                onClick={() => addToast("장치3: 디스플레이 📺", "info")}
              />

              <Connector
                fromBox={{ id: "complex-device1", position: "right" }}
                toBox={{ id: "complex-hub", position: "left" }}
                boxes={[
                  { id: "complex-device1", x: 100, y: 170, width: 60, height: 25 },
                  { id: "complex-hub", x: 250, y: 180, width: 80, height: 35 },
                ]}
                connectionType="orthogonal"
                className="text-amber-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={8}
                strokeWidth={2}
              />

              <Connector
                fromBox={{ id: "complex-device2", position: "right" }}
                toBox={{ id: "complex-hub", position: "left" }}
                boxes={[
                  { id: "complex-device2", x: 100, y: 205, width: 60, height: 25 },
                  { id: "complex-hub", x: 250, y: 180, width: 80, height: 35 },
                ]}
                connectionType="orthogonal"
                className="text-pink-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={10}
                strokeWidth={3}
              />

              <Connector
                fromBox={{ id: "complex-hub", position: "right" }}
                toBox={{ id: "complex-device3", position: "left" }}
                boxes={[
                  { id: "complex-hub", x: 250, y: 180, width: 80, height: 35 },
                  { id: "complex-device3", x: 400, y: 188, width: 60, height: 25 },
                ]}
                connectionType="straight"
                className="text-violet-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={12}
                strokeWidth={3}
              />

              {/* 라벨들 */}
              <div className="absolute left-[85px] top-[20px]">
                <span className="text-xs text-blue-600 font-medium">단방향</span>
              </div>
              <div className="absolute left-[330px] top-[20px]">
                <span className="text-xs text-purple-600 font-medium">양방향</span>
              </div>
              <div className="absolute left-[85px] top-[80px]">
                <span className="text-xs text-cyan-600 font-medium">크기:6</span>
              </div>
              <div className="absolute left-[285px] top-[80px]">
                <span className="text-xs text-indigo-600 font-medium">크기:10</span>
              </div>
              <div className="absolute left-[490px] top-[75px]">
                <span className="text-xs text-red-600 font-medium">크기:15</span>
              </div>
              <div className="absolute left-[280px] top-[160px]">
                <span className="text-xs text-emerald-600 font-medium">허브</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">양방향 화살표 및 크기 조절 코드 예제</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 단방향 화살표 (기본)
<Connector
  fromBox={{ id: "sender", position: "right" }}
  toBox={{ id: "receiver", position: "left" }}
  boxes={boxes}
  connectionType="straight"
  className="text-blue-600"
  showArrow={true}          // 끝점 화살표만 표시
  showStartArrow={false}    // 시작점 화살표 숨김
  arrowSize={8}            // 화살표 크기
  strokeWidth={2}
/>

// 양방향 화살표 (서버-클라이언트 통신)
<Connector
  fromBox={{ id: "server", position: "right" }}
  toBox={{ id: "client", position: "left" }}
  boxes={boxes}
  connectionType="straight"
  className="text-purple-600"
  showArrow={true}          // 끝점 화살표 표시
  showStartArrow={true}     // 시작점 화살표도 표시 (양방향)
  arrowSize={8}            // 양쪽 화살표 크기
  strokeWidth={3}
/>

// 작은 화살표 (센서 연결용)
<Connector
  showArrow={true}
  showStartArrow={true}
  arrowSize={6}            // 작은 화살표
  strokeWidth={2}
  className="text-cyan-600"
/>

// 중간 화살표 (제어 신호용)
<Connector
  showArrow={true}
  showStartArrow={true}
  arrowSize={10}           // 중간 화살표
  strokeWidth={3}
  className="text-indigo-600"
/>

// 큰 화살표 (메인 데이터 라인용)
<Connector
  showArrow={true}
  showStartArrow={true}
  arrowSize={15}           // 큰 화살표
  strokeWidth={4}
  className="text-red-600"
/>`}
            </pre>
          </div>

          <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-400 p-4">
            <h4 className="font-medium text-yellow-800 mb-2">💡 양방향 화살표 사용 팁</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                • <strong>showStartArrow:</strong> true로 설정하면 시작점에도 화살표가 표시되어 양방향 통신 표현
              </li>
              <li>
                • <strong>arrowSize:</strong> 6-15 범위 권장, 선 두께(strokeWidth)와 균형있게 조정
              </li>
              <li>
                • <strong>양방향 연결:</strong> 서버-클라이언트, 센서-제어기 간 피드백 루프 표현에 유용
              </li>
              <li>
                • <strong>크기 가이드:</strong> 작은(6): 센서, 중간(8-10): 일반, 큰(12-15): 메인 라인
              </li>
              <li>
                • <strong>시각적 계층:</strong> 중요도에 따라 화살표 크기와 선 두께를 함께 조절
              </li>
              <li>
                • <strong>색상 조합:</strong> 양방향일 때 더 진한 색상 사용으로 중요성 강조
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBox = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📦 Box 컴포넌트</h2>
        <p className="text-gray-600 mb-6">시스템의 각 구성요소를 나타내는 박스 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Box
  id="component1"
  x={50}
  y={50}
  width={100}
  height={40}
  text="컴포넌트"
  className="bg-[#0066ff] text-white border-blue-700 border-2 rounded-lg"
  onClick={() => console.log('클릭됨')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-48 border border-gray-200 rounded bg-gray-50 p-4">
            <Box
              id="demo-box1"
              x={50}
              y={30}
              width={80}
              height={30}
              text="수소탱크"
              className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("수소탱크 클릭! 💧", "info")}
            />
            <Box
              id="demo-box2"
              x={200}
              y={30}
              width={80}
              height={30}
              text="압축기"
              className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("압축기 클릭! ⚙️", "success")}
            />
            <Box
              id="demo-box3"
              x={350}
              y={30}
              width={80}
              height={30}
              text="연료전지"
              className="bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs"
              onClick={() => addToast("연료전지 클릭! ⚡", "warning")}
            />
            <Box
              id="demo-box4"
              x={125}
              y={100}
              width={100}
              height={40}
              text="제어시스템"
              className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("제어시스템 클릭! 🎛️", "info")}
            />
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 수소탱크 Box
<Box
  id="demo-box1"
  x={50}
  y={30}
  width={80}
  height={30}
  text="수소탱크"
  className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs"
  onClick={() => addToast("수소탱크 클릭! 💧", "info")}
/>

// 압축기 Box
<Box
  id="demo-box2"
  x={200}
  y={30}
  width={80}
  height={30}
  text="압축기"
  className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
  onClick={() => addToast("압축기 클릭! ⚙️", "success")}
/>

// 연료전지 Box
<Box
  id="demo-box3"
  x={350}
  y={30}
  width={80}
  height={30}
  text="연료전지"
  className="bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs"
  onClick={() => addToast("연료전지 클릭! ⚡", "warning")}
/>

// 제어시스템 Box (더 큰 크기)
<Box
  id="demo-box4"
  x={125}
  y={100}
  width={100}
  height={40}
  text="제어시스템"
  className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs"
  onClick={() => addToast("제어시스템 클릭! 🎛️", "info")}
/>`}
          </pre>
        </div>

        <div className="overflow-x-auto mb-6">
          <h3 className="text-lg font-semibold mb-3">Props</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">속성</th>
                <th className="border border-gray-300 px-4 py-2 text-left">타입</th>
                <th className="border border-gray-300 px-4 py-2 text-left">기본값</th>
                <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">id</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">고유 식별자</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">x</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">X 좌표 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">y</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Y 좌표 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">width</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">너비 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">height</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">높이 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">text</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">""</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">박스 내부 텍스트</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">className</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  "bg-gray-200 border border-gray-400"
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">TailwindCSS 클래스</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">onClick</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">function</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">클릭 이벤트 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>위치:</strong> x, y 좌표는 부모 컨테이너 기준 절대 위치입니다
            </li>
            <li>
              • <strong>스타일링:</strong> TailwindCSS 클래스로 배경색, 테두리, 텍스트 색상 등을 자유롭게 설정
            </li>
            <li>
              • <strong>상호작용:</strong> onClick 이벤트로 클릭 시 동작을 정의할 수 있습니다
            </li>
            <li>
              • <strong>연결:</strong> Connector 컴포넌트와 함께 사용하여 박스들을 연결할 수 있습니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">💡 사용 예제</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">1. 기본 수소연료전지 시스템</h3>
          <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Box
              id="hydrogen-tank"
              x={20}
              y={60}
              width={70}
              height={30}
              text="수소탱크"
              className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("수소탱크: 압력 350bar, 온도 25°C", "info")}
            />
            <Box
              id="compressor"
              x={150}
              y={60}
              width={70}
              height={30}
              text="압축기"
              className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("압축기: 정상 작동 중 ✅", "success")}
            />
            <Box
              id="fuel-cell"
              x={280}
              y={60}
              width={70}
              height={30}
              text="연료전지"
              className="bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs"
              onClick={() => addToast("연료전지: 출력 100kW, 효율 60%", "info")}
            />

            <Connector
              fromBox={{ id: "hydrogen-tank", position: "right" }}
              toBox={{ id: "compressor", position: "left" }}
              boxes={[
                { id: "hydrogen-tank", x: 20, y: 60, width: 70, height: 30 },
                { id: "compressor", x: 150, y: 60, width: 70, height: 30 },
                { id: "fuel-cell", x: 280, y: 60, width: 70, height: 30 },
              ]}
              connectionType="straight"
              className="text-blue-600"
              showArrow={true}
              strokeWidth={2}
            />
            <Connector
              fromBox={{ id: "compressor", position: "right" }}
              toBox={{ id: "fuel-cell", position: "left" }}
              boxes={[
                { id: "hydrogen-tank", x: 20, y: 60, width: 70, height: 30 },
                { id: "compressor", x: 150, y: 60, width: 70, height: 30 },
                { id: "fuel-cell", x: 280, y: 60, width: 70, height: 30 },
              ]}
              connectionType="straight"
              className="text-emerald-600"
              showArrow={true}
              strokeWidth={2}
            />

            <Valve x={120} y={68} size={15} type="gate" isOpen={true} className="text-gray-500" />
            <Valve x={250} y={68} size={15} type="ball" isOpen={true} className="text-gray-500" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. 복잡한 반도체 회로도 시스템</h3>
          <p className="text-gray-600 mb-4">
            고성능 반도체 칩을 중심으로 한 복합 전자 시스템입니다. 전원 관리, 신호 처리, 데이터 통신이 통합된 회로도를
            보여줍니다.
          </p>

          <div className="relative w-full h-[600px] bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-hidden">
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow z-10">
              💡 복잡한 반도체 시스템 - 각 컴포넌트를 클릭해보세요!
            </div>

            {/* 메인 프로세서 칩 (중앙) */}
            <ImageBox
              id="main-processor"
              x={280}
              y={250}
              width={120}
              height={80}
              src="/chip.png"
              alt="메인 프로세서"
              text="ARM Cortex-A78"
              className="border-4 border-blue-600 rounded-lg shadow-lg bg-white"
              onClick={() => addToast("메인 프로세서: ARM Cortex-A78, 2.8GHz, 8코어 🚀", "info")}
            />

            {/* 전원 관리 유닛 (좌상단) */}
            <Box
              id="pmu"
              x={50}
              y={60}
              width={100}
              height={40}
              text="PMU"
              className="bg-red-600 text-white border-red-800 border-2 rounded-lg text-xs font-bold"
              onClick={() => addToast("전원 관리 유닛: 3.3V/1.8V/1.2V 출력 ⚡", "error")}
            />

            {/* GPU (우상단) */}
            <ImageBox
              id="gpu"
              x={500}
              y={50}
              width={100}
              height={60}
              src="/chip.png"
              alt="GPU"
              text="Mali-G78 GPU"
              className="border-3 border-purple-600 rounded-lg shadow-md bg-white"
              onClick={() => addToast("GPU: Mali-G78, 24코어, 1.3GHz 🎮", "info")}
            />

            {/* 메모리 컨트롤러 (좌측) */}
            <Box
              id="memory-controller"
              x={50}
              y={200}
              width={80}
              height={50}
              text="Memory Controller"
              className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("메모리 컨트롤러: DDR5-5600, 듀얼채널 💾", "success")}
            />

            {/* DDR5 메모리 (좌측 하단) */}
            <Box
              id="ddr5-1"
              x={30}
              y={320}
              width={60}
              height={30}
              text="DDR5-A"
              className="bg-cyan-500 text-white border-cyan-700 border-2 rounded text-xs"
              onClick={() => addToast("DDR5 메모리 A: 16GB, 5600MHz 🧠", "info")}
            />
            <Box
              id="ddr5-2"
              x={100}
              y={320}
              width={60}
              height={30}
              text="DDR5-B"
              className="bg-cyan-500 text-white border-cyan-700 border-2 rounded text-xs"
              onClick={() => addToast("DDR5 메모리 B: 16GB, 5600MHz 🧠", "info")}
            />

            {/* PCIe 컨트롤러 (우측) */}
            <Box
              id="pcie-controller"
              x={520}
              y={200}
              width={80}
              height={50}
              text="PCIe 5.0 Controller"
              className="bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-xs"
              onClick={() => addToast("PCIe 컨트롤러: 5.0 x16, 32GT/s 🔌", "warning")}
            />

            {/* NVMe SSD (우측 하단) */}
            <Box
              id="nvme-1"
              x={480}
              y={320}
              width={70}
              height={30}
              text="NVMe-1"
              className="bg-indigo-600 text-white border-indigo-800 border-2 rounded text-xs"
              onClick={() => addToast("NVMe SSD 1: 2TB, 7000MB/s 💽", "info")}
            />
            <Box
              id="nvme-2"
              x={560}
              y={320}
              width={70}
              height={30}
              text="NVMe-2"
              className="bg-indigo-600 text-white border-indigo-800 border-2 rounded text-xs"
              onClick={() => addToast("NVMe SSD 2: 1TB, 7000MB/s 💽", "info")}
            />

            {/* 네트워크 프로세서 (하단 중앙) */}
            <ImageBox
              id="network-processor"
              x={280}
              y={420}
              width={120}
              height={60}
              src="/chip.png"
              alt="네트워크 프로세서"
              text="10GbE Controller"
              className="border-3 border-green-600 rounded-lg shadow-md bg-white"
              onClick={() => addToast("네트워크 프로세서: 10GbE, TCP 오프로드 🌐", "success")}
            />

            {/* AI 가속기 (우하단) */}
            <ImageBox
              id="ai-accelerator"
              x={480}
              y={450}
              width={100}
              height={70}
              src="/chip.png"
              alt="AI 가속기"
              text="NPU 6.0"
              className="border-3 border-pink-600 rounded-lg shadow-md bg-white"
              onClick={() => addToast("AI 가속기: NPU 6.0, 45TOPS 🤖", "info")}
            />

            {/* 보안 칩 (좌하단) */}
            <Box
              id="security-chip"
              x={50}
              y={450}
              width={80}
              height={40}
              text="Security Chip"
              className="bg-gray-800 text-white border-gray-900 border-2 rounded-lg text-xs"
              onClick={() => addToast("보안 칩: TPM 2.0, AES-256 🔒", "info")}
            />

            {/* 클럭 생성기 (상단 중앙) */}
            <Box
              id="clock-gen"
              x={300}
              y={40}
              width={80}
              height={30}
              text="Clock Gen"
              className="bg-yellow-500 text-black border-yellow-700 border-2 rounded text-xs font-bold"
              onClick={() => addToast("클럭 생성기: 100MHz 기준, PLL x28 ⏰", "warning")}
            />

            {/* 전력선 연결 (PMU에서 각 컴포넌트로) - 애니메이션 적용 */}
            <Connector
              fromBox={{ id: "pmu", position: "bottom" }}
              toBox={{ id: "main-processor", position: "top" }}
              boxes={[
                { id: "pmu", x: 50, y: 60, width: 100, height: 40 },
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
              ]}
              connectionType="orthogonal"
              className="text-red-600"
              strokeWidth={4}
              animated={true}
            />

            <Connector
              fromBox={{ id: "pmu", position: "right" }}
              toBox={{ id: "gpu", position: "left" }}
              boxes={[
                { id: "pmu", x: 50, y: 60, width: 100, height: 40 },
                { id: "gpu", x: 500, y: 50, width: 100, height: 60 },
              ]}
              connectionType="straight"
              className="text-blue-600"
              showArrow={true}
              strokeWidth={4}
              animated={true}
            />

            {/* 클럭 신호 연결 - 메인 프로세서만 애니메이션 */}
            <Connector
              fromBox={{ id: "clock-gen", position: "bottom" }}
              toBox={{ id: "main-processor", position: "top" }}
              boxes={[
                { id: "clock-gen", x: 300, y: 50, width: 80, height: 30 },
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
              ]}
              connectionType="straight"
              className="text-yellow-600"
              showArrow={true}
              strokeWidth={2}
              animated={true}
            />

            <Connector
              fromBox={{ id: "clock-gen", position: "right" }}
              toBox={{ id: "gpu", position: "top" }}
              boxes={[
                { id: "clock-gen", x: 300, y: 50, width: 80, height: 30 },
                { id: "gpu", x: 500, y: 50, width: 100, height: 60 },
              ]}
              connectionType="orthogonal"
              className="text-yellow-600"
              showArrow={true}
              strokeWidth={2}
            />

            {/* 메모리 버스 연결 - 메인 연결만 애니메이션 */}
            <Connector
              fromBox={{ id: "memory-controller", position: "right" }}
              toBox={{ id: "main-processor", position: "left" }}
              boxes={[
                { id: "memory-controller", x: 50, y: 200, width: 80, height: 50 },
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
              ]}
              connectionType="straight"
              className="text-emerald-600"
              showArrow={true}
              showStartArrow={true}
              strokeWidth={3}
              animated={true}
            />

            <Connector
              fromBox={{ id: "memory-controller", position: "bottom" }}
              toBox={{ id: "ddr5-1", position: "top" }}
              boxes={[
                { id: "memory-controller", x: 50, y: 200, width: 80, height: 50 },
                { id: "ddr5-1", x: 30, y: 320, width: 60, height: 30 },
              ]}
              connectionType="orthogonal"
              className="text-cyan-600"
              showArrow={true}
              strokeWidth={3}
            />

            <Connector
              fromBox={{ id: "memory-controller", position: "bottom" }}
              toBox={{ id: "ddr5-2", position: "top" }}
              boxes={[
                { id: "memory-controller", x: 50, y: 200, width: 80, height: 50 },
                { id: "ddr5-2", x: 100, y: 320, width: 60, height: 30 },
              ]}
              connectionType="orthogonal"
              className="text-cyan-600"
              showArrow={true}
              strokeWidth={3}
            />

            {/* PCIe 연결 - 메인 연결만 애니메이션 */}
            <Connector
              fromBox={{ id: "main-processor", position: "right" }}
              toBox={{ id: "pcie-controller", position: "left" }}
              boxes={[
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
                { id: "pcie-controller", x: 520, y: 200, width: 80, height: 50 },
              ]}
              connectionType="straight"
              className="text-orange-600"
              showArrow={true}
              showStartArrow={true}
              strokeWidth={3}
              animated={true}
            />

            <Connector
              fromBox={{ id: "pcie-controller", position: "bottom" }}
              toBox={{ id: "nvme-1", position: "top" }}
              boxes={[
                { id: "pcie-controller", x: 520, y: 200, width: 80, height: 50 },
                { id: "nvme-1", x: 480, y: 320, width: 70, height: 30 },
              ]}
              connectionType="orthogonal"
              className="text-indigo-600"
              showArrow={true}
              strokeWidth={2}
            />

            <Connector
              fromBox={{ id: "pcie-controller", position: "bottom" }}
              toBox={{ id: "nvme-2", position: "top" }}
              boxes={[
                { id: "pcie-controller", x: 520, y: 200, width: 80, height: 50 },
                { id: "nvme-2", x: 560, y: 320, width: 70, height: 30 },
              ]}
              connectionType="orthogonal"
              className="text-indigo-600"
              showArrow={true}
              strokeWidth={2}
            />

            {/* 네트워크 연결 - 애니메이션 적용 */}
            <Connector
              fromBox={{ id: "main-processor", position: "bottom" }}
              toBox={{ id: "network-processor", position: "top" }}
              boxes={[
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
                { id: "network-processor", x: 280, y: 420, width: 120, height: 60 },
              ]}
              connectionType="straight"
              className="text-green-600"
              showArrow={true}
              showStartArrow={true}
              strokeWidth={3}
              animated={true}
            />

            {/* AI 가속기 연결 */}
            <Connector
              fromBox={{ id: "main-processor", position: "bottom" }}
              toBox={{ id: "ai-accelerator", position: "left" }}
              boxes={[
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
                { id: "ai-accelerator", x: 480, y: 450, width: 100, height: 70 },
              ]}
              connectionType="orthogonal"
              className="text-pink-600"
              showArrow={true}
              showStartArrow={true}
              strokeWidth={3}
            />

            {/* 보안 칩 연결 */}
            <Connector
              fromBox={{ id: "main-processor", position: "left" }}
              toBox={{ id: "security-chip", position: "right" }}
              boxes={[
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
                { id: "security-chip", x: 50, y: 450, width: 80, height: 40 },
              ]}
              connectionType="custom"
              bendPoints={[
                { x: 250, y: 290 },
                { x: 200, y: 290 },
                { x: 200, y: 470 },
                { x: 130, y: 470 },
              ]}
              className="text-gray-700"
              showArrow={true}
              strokeWidth={2}
            />

            {/* GPU와 메인 프로세서 연결 - 애니메이션 적용 */}
            <Connector
              fromBox={{ id: "gpu", position: "bottom" }}
              toBox={{ id: "main-processor", position: "top" }}
              boxes={[
                { id: "gpu", x: 500, y: 50, width: 100, height: 60 },
                { id: "main-processor", x: 280, y: 250, width: 120, height: 80 },
              ]}
              connectionType="custom"
              bendPoints={[
                { x: 550, y: 130 },
                { x: 450, y: 130 },
                { x: 450, y: 200 },
                { x: 340, y: 200 },
                { x: 340, y: 250 },
              ]}
              className="text-purple-600"
              showArrow={true}
              showStartArrow={true}
              strokeWidth={3}
              animated={true}
            />

            {/* PMU에서 네트워크 프로세서로 전원 공급 */}
            <Connector
              fromBox={{ id: "pmu", position: "bottom" }}
              toBox={{ id: "network-processor", position: "left" }}
              boxes={[
                { id: "pmu", x: 50, y: 60, width: 100, height: 40 },
                { id: "network-processor", x: 280, y: 420, width: 120, height: 60 },
              ]}
              connectionType="custom"
              bendPoints={[
                { x: 100, y: 120 },
                { x: 240, y: 120 },
                { x: 240, y: 450 },
              ]}
              className="text-red-500"
              showArrow={true}
              strokeWidth={2}
            />

            {/* 접지 및 기준선들 */}
            <Line
              startPoint={{ x: 20, y: 550 }}
              endPoint={{ x: 650, y: 550 }}
              strokeWidth={3}
              className="text-gray-800"
              onClick={() => addToast("시스템 접지선 ⏚", "info")}
            />

            <Line
              startPoint={{ x: 100, y: 530 }}
              endPoint={{ x: 100, y: 550 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지 연결 ⏚", "info")}
            />

            <Line
              startPoint={{ x: 340, y: 530 }}
              endPoint={{ x: 340, y: 550 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지 연결 ⏚", "info")}
            />

            <Line
              startPoint={{ x: 530, y: 530 }}
              endPoint={{ x: 530, y: 550 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지 연결 ⏚", "info")}
            />

            {/* 범례 */}
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border text-xs">
              <h4 className="font-bold mb-2">범례</h4>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-red-600 mr-2"></div>
                  <span>전원 (3.3V/1.8V)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-yellow-600 mr-2"></div>
                  <span>클럭 신호</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-emerald-600 mr-2"></div>
                  <span>메모리 버스</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-orange-600 mr-2"></div>
                  <span>PCIe 5.0</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-green-600 mr-2"></div>
                  <span>네트워크</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-pink-600 mr-2"></div>
                  <span>AI 가속</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-1 bg-gray-700 mr-2"></div>
                  <span>보안/접지</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🔧 반도체 회로도 특징</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-blue-700 mb-2">주요 컴포넌트:</h5>
                <ul className="text-blue-600 space-y-1">
                  <li>• ARM Cortex-A78 메인 프로세서 (8코어)</li>
                  <li>• Mali-G78 GPU (24코어)</li>
                  <li>• DDR5-5600 듀얼채널 메모리</li>
                  <li>• PCIe 5.0 x16 컨트롤러</li>
                  <li>• 10GbE 네트워크 프로세서</li>
                  <li>• NPU 6.0 AI 가속기 (45TOPS)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">시스템 특징:</h5>
                <ul className="text-purple-600 space-y-1">
                  <li>• 다중 전압 전원 관리 (PMU)</li>
                  <li>• 고속 메모리 인터페이스</li>
                  <li>• 복합 클럭 도메인</li>
                  <li>• 하드웨어 보안 모듈</li>
                  <li>• 고성능 스토리지 (NVMe)</li>
                  <li>• 실시간 AI 추론 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTriangle = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🔺 Triangle 컴포넌트</h2>
        <p className="text-gray-600 mb-6">방향을 나타내는 삼각형 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Triangle
  x={100}
  y={50}
  size={20}
  direction="right"
  className="text-red-500"
  onClick={() => console.log('삼각형 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-48 border border-gray-200 rounded bg-gray-50 p-4">
            <Triangle
              x={50}
              y={50}
              size={25}
              direction="up"
              className="text-blue-600"
              onClick={() => addToast("위쪽 삼각형 클릭! ⬆️", "info")}
            />
            <Triangle
              x={150}
              y={50}
              size={25}
              direction="right"
              className="text-emerald-600"
              onClick={() => addToast("오른쪽 삼각형 클릭! ➡️", "success")}
            />
            <Triangle
              x={250}
              y={50}
              size={25}
              direction="down"
              className="text-amber-600"
              onClick={() => addToast("아래쪽 삼각형 클릭! ⬇️", "warning")}
            />
            <Triangle
              x={350}
              y={50}
              size={25}
              direction="left"
              className="text-purple-600"
              onClick={() => addToast("왼쪽 삼각형 클릭! ⬅️", "info")}
            />
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <h3 className="text-lg font-semibold mb-3">Props</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">속성</th>
                <th className="border border-gray-300 px-4 py-2 text-left">타입</th>
                <th className="border border-gray-300 px-4 py-2 text-left">기본값</th>
                <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">x</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">X 좌표 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">y</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">Y 좌표 (픽셀)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">size</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">20</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">삼각형 크기</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">direction</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"up"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">방향 (up, down, left, right)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">className</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"text-gray-500"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">TailwindCSS 클래스</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">onClick</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">function</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">클릭 이벤트 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderValve = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚰 Valve 컴포넌트</h2>
        <p className="text-gray-600 mb-6">
          다양한 타입의 밸브를 나타내는 컴포넌트입니다. 수소연료전지 시스템, 유체 제어 시스템 등에서 사용됩니다.
        </p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Valve
  x={100}
  y={50}
  size={20}
  type="gate"
  isOpen={true}
  className="text-blue-600"
  onClick={() => console.log('밸브 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🔧 다양한 밸브 타입 라이브 예제</h3>
          <div className="relative w-full h-80 border border-gray-200 rounded bg-gray-50 p-4">
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              💡 각 밸브를 클릭해보세요! 다양한 타입과 상태를 확인할 수 있습니다.
            </div>

            {/* 첫 번째 줄: Gate 밸브들 */}
            <div className="absolute left-15 top-15 text-xs font-semibold text-gray-700">Gate 밸브 (게이트)</div>
            <Valve
              x={50}
              y={80}
              size={30}
              type="gate"
              isOpen={true}
              className="text-blue-600"
              onClick={() => addToast("게이트 밸브 (열림) - 일반적인 개폐 밸브 🔵", "info")}
            />
            <Valve
              x={120}
              y={80}
              size={30}
              type="gate"
              isOpen={false}
              className="text-red-600"
              onClick={() => addToast("게이트 밸브 (닫힘) - 완전 차단 🔴", "error")}
            />

            {/* 두 번째 줄: Ball 밸브들 */}
            <div className="absolute left-15 top-30 text-xs font-semibold text-gray-700">Ball 밸브 (볼)</div>
            <Valve
              x={50}
              y={150}
              size={30}
              type="ball"
              isOpen={true}
              className="text-emerald-600"
              onClick={() => addToast("볼 밸브 (열림) - 빠른 개폐, 낮은 압력손실 🟢", "success")}
            />
            <Valve
              x={120}
              y={150}
              size={30}
              type="ball"
              isOpen={false}
              className="text-amber-600"
              onClick={() => addToast("볼 밸브 (닫힘) - 완전 밀폐 🟡", "warning")}
            />

            {/* 세 번째 줄: Check 밸브들 */}
            <div className="absolute left-15 top-50 text-xs font-semibold text-gray-700">Check 밸브 (체크)</div>
            <Valve
              x={50}
              y={230}
              size={30}
              type="check"
              isOpen={true}
              className="text-purple-600"
              onClick={() => addToast("체크 밸브 (순방향) - 역류 방지 밸브 🟣", "info")}
            />
            <Valve
              x={120}
              y={230}
              size={30}
              type="check"
              isOpen={false}
              className="text-pink-600"
              onClick={() => addToast("체크 밸브 (역방향 차단) - 자동 차단 🩷", "error")}
            />

            {/* 네 번째 줄: Butterfly 밸브들 */}
            <div className="absolute left-65 top-40 text-xs font-semibold text-gray-700">
              Butterfly 밸브 (버터플라이)
            </div>
            <Valve
              x={250}
              y={80}
              size={35}
              type="butterfly"
              isOpen={true}
              className="text-cyan-600"
              onClick={() => addToast("버터플라이 밸브 (열림) - 대구경 파이프용 🔵", "info")}
            />
            <Valve
              x={320}
              y={80}
              size={35}
              type="butterfly"
              isOpen={false}
              className="text-indigo-600"
              onClick={() => addToast("버터플라이 밸브 (닫힘) - 90도 회전 차단 🟦", "info")}
            />

            {/* 다섯 번째 줄: Needle 밸브들 */}
            <Valve
              x={250}
              y={200}
              size={25}
              type="needle"
              isOpen={true}
              className="text-orange-600"
              onClick={() => addToast("니들 밸브 (열림) - 정밀 유량 제어 🟠", "warning")}
            />
            <Valve
              x={320}
              y={200}
              size={25}
              type="needle"
              isOpen={false}
              className="text-red-700"
              onClick={() => addToast("니들 밸브 (닫힘) - 미세 조절 가능 🔴", "error")}
            />

            {/* 크기 비교 예제 */}
            <div className="absolute left-400 top-48 text-xs font-semibold text-gray-700">크기 비교</div>
            <Valve
              x={420}
              y={80}
              size={20}
              type="gate"
              isOpen={true}
              className="text-gray-600"
              onClick={() => addToast("소형 밸브 (20px) 🔹", "info")}
            />
            <Valve
              x={460}
              y={75}
              size={30}
              type="gate"
              isOpen={true}
              className="text-gray-600"
              onClick={() => addToast("중형 밸브 (30px) 🔸", "info")}
            />
            <Valve
              x={510}
              y={65}
              size={50}
              type="gate"
              isOpen={true}
              className="text-gray-600"
              onClick={() => addToast("대형 밸브 (50px) 🔶", "info")}
            />

            {/* 라벨들 */}
            <div className="absolute left-[85px] top-[80px]">
              <span className="text-xs text-blue-600 font-medium">열림</span>
            </div>
            <div className="absolute left-[150px] top-[80px]">
              <span className="text-xs text-red-600 font-medium">닫힘</span>
            </div>
            <div className="absolute left-[85px] top-[150px]">
              <span className="text-xs text-emerald-600 font-medium">열림</span>
            </div>
            <div className="absolute left-[150px] top-[150px]">
              <span className="text-xs text-amber-600 font-medium">닫힘</span>
            </div>
            <div className="absolute left-[85px] top-[230px]">
              <span className="text-xs text-purple-600 font-medium">순방향</span>
            </div>
            <div className="absolute left-[150px] top-[230px]">
              <span className="text-xs text-pink-600 font-medium">차단</span>
            </div>
            <div className="absolute left-[285px] top-[85px]">
              <span className="text-xs text-cyan-600 font-medium">열림</span>
            </div>
            <div className="absolute left-[355px] top-[85px]">
              <span className="text-xs text-indigo-600 font-medium">닫힘</span>
            </div>
            <div className="absolute left-[285px] top-[200px]">
              <span className="text-xs text-orange-600 font-medium">열림</span>
            </div>
            <div className="absolute left-[355px] top-[200px]">
              <span className="text-xs text-red-700 font-medium">닫힘</span>
            </div>
            <div className="absolute left-[415px] top-[120px]">
              <span className="text-xs text-gray-600 font-medium">20px</span>
            </div>
            <div className="absolute left-[465px] top-[120px]">
              <span className="text-xs text-gray-600 font-medium">30px</span>
            </div>
            <div className="absolute left-[520px] top-[120px]">
              <span className="text-xs text-gray-600 font-medium">50px</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// Gate 밸브 (게이트 밸브)
<Valve
  x={50}
  y={40}
  size={30}
  type="gate"
  isOpen={true}
  className="text-blue-600"
  onClick={() => addToast("게이트 밸브 클릭!", "info")}
/>

// Ball 밸브 (볼 밸브)
<Valve
  x={50}
  y={120}
  size={30}
  type="ball"
  isOpen={true}
  className="text-emerald-600"
  onClick={() => addToast("볼 밸브 클릭!", "success")}
/>

// Check 밸브 (체크 밸브 - 역류 방지)
<Valve
  x={50}
  y={200}
  size={30}
  type="check"
  isOpen={true}
  className="text-purple-600"
  onClick={() => addToast("체크 밸브 클릭!", "info")}
/>

// Butterfly 밸브 (버터플라이 밸브)
<Valve
  x={250}
  y={80}
  size={35}
  type="butterfly"
  isOpen={true}
  className="text-cyan-600"
  onClick={() => addToast("버터플라이 밸브 클릭!", "info")}
/>

// Needle 밸브 (니들 밸브 - 정밀 제어)
<Valve
  x={250}
  y={200}
  size={25}
  type="needle"
  isOpen={true}
  className="text-orange-600"
  onClick={() => addToast("니들 밸브 클릭!", "warning")}
/>`}
          </pre>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">🔧 밸브 타입별 특징 및 용도</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">🔵 Gate 밸브 (게이트)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  • <strong>용도:</strong> 일반적인 개폐 제어
                </li>
                <li>
                  • <strong>특징:</strong> 완전 열림/닫힘 상태에서 사용
                </li>
                <li>
                  • <strong>장점:</strong> 낮은 압력손실, 양방향 흐름
                </li>
                <li>
                  • <strong>단점:</strong> 느린 개폐 속도
                </li>
                <li>
                  • <strong>적용:</strong> 주배관, 차단용
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2 flex items-center">🟢 Ball 밸브 (볼)</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>
                  • <strong>용도:</strong> 빠른 개폐 제어
                </li>
                <li>
                  • <strong>특징:</strong> 90도 회전으로 완전 개폐
                </li>
                <li>
                  • <strong>장점:</strong> 빠른 작동, 완전 밀폐
                </li>
                <li>
                  • <strong>단점:</strong> 유량 조절 어려움
                </li>
                <li>
                  • <strong>적용:</strong> 긴급 차단, 수소 공급라인
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center">🟣 Check 밸브 (체크)</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>
                  • <strong>용도:</strong> 역류 방지
                </li>
                <li>
                  • <strong>특징:</strong> 자동 개폐 (압력 차이)
                </li>
                <li>
                  • <strong>장점:</strong> 자동 작동, 역류 완전 차단
                </li>
                <li>
                  • <strong>단점:</strong> 압력손실 존재
                </li>
                <li>
                  • <strong>적용:</strong> 펌프 출구, 압축기 후단
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-cyan-200">
              <h4 className="font-semibold text-cyan-800 mb-2 flex items-center">🔵 Butterfly 밸브 (버터플라이)</h4>
              <ul className="text-sm text-cyan-700 space-y-1">
                <li>
                  • <strong>용도:</strong> 대구경 파이프 제어
                </li>
                <li>
                  • <strong>특징:</strong> 디스크 회전 방식
                </li>
                <li>
                  • <strong>장점:</strong> 경량, 저비용, 빠른 작동
                </li>
                <li>
                  • <strong>단점:</strong> 완전 밀폐 어려움
                </li>
                <li>
                  • <strong>적용:</strong> 대용량 공기 공급, 배기
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center">🟠 Needle 밸브 (니들)</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>
                  • <strong>용도:</strong> 정밀 유량 제어
                </li>
                <li>
                  • <strong>특징:</strong> 미세 조절 가능
                </li>
                <li>
                  • <strong>장점:</strong> 정확한 유량 제어
                </li>
                <li>
                  • <strong>단점:</strong> 작은 유량만 가능
                </li>
                <li>
                  • <strong>적용:</strong> 계측라인, 샘플링
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-bold mb-4">✨ Lucide React 아이콘 활용</h3>
          <p className="text-gray-600 mb-4">
            Valve 컴포넌트는 lucide-react 아이콘을 활용하여 더욱 직관적인 시각적 표현이 가능합니다.
          </p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">🎨 아이콘 포함 밸브 예제</h4>
            <div className="relative w-full h-96 border border-gray-200 rounded bg-gray-50 p-4">
              <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
                💡 lucide-react 아이콘이 포함된 밸브들 - 각 밸브의 상태를 아이콘으로 확인!
              </div>

              {/* 아이콘 위치별 예제 */}
              <div className="absolute left-4 top-8 text-xs font-semibold text-gray-700">아이콘 위치: Top</div>
              <Valve
                x={50}
                y={40}
                size={35}
                type="gate"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                className="text-blue-600"
                onClick={() => addToast("아이콘 포함 게이트 밸브 (상단) 🔵", "info")}
              />
              <Valve
                x={120}
                y={40}
                size={35}
                type="ball"
                isOpen={false}
                showIcon={true}
                iconPosition="top"
                className="text-red-600"
                onClick={() => addToast("아이콘 포함 볼 밸브 (상단) 🔴", "error")}
              />

              <div className="absolute left-4 top-128 text-xs font-semibold text-gray-700">아이콘 위치: Bottom</div>
              <Valve
                x={50}
                y={160}
                size={35}
                type="check"
                isOpen={true}
                showIcon={true}
                iconPosition="bottom"
                className="text-purple-600"
                onClick={() => addToast("아이콘 포함 체크 밸브 (하단) 🟣", "info")}
              />
              <Valve
                x={120}
                y={160}
                size={35}
                type="butterfly"
                isOpen={false}
                showIcon={true}
                iconPosition="bottom"
                className="text-cyan-600"
                onClick={() => addToast("아이콘 포함 버터플라이 밸브 (하단) 🔵", "info")}
              />

              <div className="absolute left-220 top-48 text-xs font-semibold text-gray-700">
                아이콘 위치: Left & Right
              </div>
              <Valve
                x={250}
                y={80}
                size={40}
                type="needle"
                isOpen={true}
                showIcon={true}
                iconPosition="left"
                className="text-orange-600"
                onClick={() => addToast("아이콘 포함 니들 밸브 (좌측) 🟠", "warning")}
              />
              <Valve
                x={350}
                y={80}
                size={40}
                type="gate"
                isOpen={false}
                showIcon={true}
                iconPosition="right"
                className="text-gray-600"
                onClick={() => addToast("아이콘 포함 게이트 밸브 (우측) ⚫", "info")}
              />

              {/* 다양한 크기와 아이콘 조합 */}
              <div className="absolute left-220 top-208 text-xs font-semibold text-gray-700">크기별 아이콘 밸브</div>
              <Valve
                x={250}
                y={240}
                size={25}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                className="text-emerald-600"
                onClick={() => addToast("소형 아이콘 밸브 (25px) 🟢", "success")}
              />
              <Valve
                x={300}
                y={235}
                size={35}
                type="check"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                className="text-purple-600"
                onClick={() => addToast("중형 아이콘 밸브 (35px) 🟣", "info")}
              />
              <Valve
                x={360}
                y={225}
                size={55}
                type="butterfly"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                className="text-cyan-600"
                onClick={() => addToast("대형 아이콘 밸브 (55px) 🔵", "info")}
              />

              {/* 상태별 아이콘 변화 */}
              <div className="absolute left-450 top-48 text-xs font-semibold text-gray-700">상태별 아이콘</div>
              <Valve
                x={480}
                y={80}
                size={35}
                type="gate"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                className="text-emerald-600"
                onClick={() => addToast("열림 상태 - Square 아이콘 🟢", "success")}
              />
              <Valve
                x={480}
                y={140}
                size={35}
                type="gate"
                isOpen={false}
                showIcon={true}
                iconPosition="top"
                className="text-red-600"
                onClick={() => addToast("닫힘 상태 - Minus 아이콘 🔴", "error")}
              />

              {/* 라벨들 */}
              <div className="absolute left-[85px] top-[25px]">
                <span className="text-xs text-blue-600 font-medium">Gate+아이콘</span>
              </div>
              <div className="absolute left-[155px] top-[25px]">
                <span className="text-xs text-red-600 font-medium">Ball+아이콘</span>
              </div>
              <div className="absolute left-[85px] top-[205px]">
                <span className="text-xs text-purple-600 font-medium">Check+아이콘</span>
              </div>
              <div className="absolute left-[155px] top-[205px]">
                <span className="text-xs text-cyan-600 font-medium">Butterfly+아이콘</span>
              </div>
              <div className="absolute left-[200px] top-[65px]">
                <span className="text-xs text-orange-600 font-medium">Left</span>
              </div>
              <div className="absolute left-[400px] top-[65px]">
                <span className="text-xs text-gray-600 font-medium">Right</span>
              </div>
              <div className="absolute left-[485px] top-[65px]">
                <span className="text-xs text-emerald-600 font-medium">열림</span>
              </div>
              <div className="absolute left-[485px] top-[125px]">
                <span className="text-xs text-red-600 font-medium">닫힘</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
            <h4 className="text-white text-lg font-semibold mb-3">Lucide 아이콘 활용 코드</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 기본 아이콘 포함 밸브
<Valve
  x={50}
  y={40}
  size={35}
  type="gate"
  isOpen={true}
  showIcon={true}
  iconPosition="top"
  className="text-blue-600"
  onClick={() => console.log('아이콘 밸브 클릭')}
/>

// 다양한 아이콘 위치
<Valve
  type="ball"
  showIcon={true}
  iconPosition="bottom"  // 'top', 'bottom', 'left', 'right'
  className="text-emerald-600"
/>

// 상태에 따른 아이콘 변화
<Valve
  type="check"
  isOpen={true}   // ArrowRight 아이콘
  showIcon={true}
/>

<Valve
  type="check"
  isOpen={false}  // ArrowLeft 아이콘
  showIcon={true}
/>

// 크기별 아이콘 밸브
<Valve size={25} type="needle" showIcon={true} />  // 소형
<Valve size={35} type="butterfly" showIcon={true} />  // 중형
<Valve size={55} type="gate" showIcon={true} />  // 대형`}
            </pre>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4">
            <h4 className="font-medium text-cyan-800 mb-2">🎨 아이콘 매핑 정보</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-cyan-700">
              <div>
                <h5 className="font-semibold mb-2">열림 상태 아이콘:</h5>
                <ul className="space-y-1">
                  <li>
                    • <strong>Gate:</strong> Square (사각형)
                  </li>
                  <li>
                    • <strong>Ball:</strong> Circle (원형)
                  </li>
                  <li>
                    • <strong>Check:</strong> ArrowRight (우향 화살표)
                  </li>
                  <li>
                    • <strong>Butterfly:</strong> RotateCw (회전)
                  </li>
                  <li>
                    • <strong>Needle:</strong> Plus (플러스)
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">닫힘 상태 아이콘:</h5>
                <ul className="space-y-1">
                  <li>
                    • <strong>Gate:</strong> Minus (마이너스)
                  </li>
                  <li>
                    • <strong>Ball:</strong> Power (전원)
                  </li>
                  <li>
                    • <strong>Check:</strong> ArrowLeft (좌향 화살표)
                  </li>
                  <li>
                    • <strong>Butterfly:</strong> Settings (설정)
                  </li>
                  <li>
                    • <strong>Needle:</strong> Zap (번개)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImageBox = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🖼️ ImageBox 컴포넌트</h2>
        <p className="text-gray-600 mb-6">이미지를 포함하는 박스 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<ImageBox
  id="image1"
  x={100}
  y={50}
  width={120}
  height={80}
  src="/path/to/image.jpg"
  alt="설명"
  text="이미지 박스"
  className="border-2 border-blue-500 rounded-lg"
  onClick={() => console.log('이미지 박스 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4">
            {/* 플레이스홀더 이미지를 사용한 예제들 */}
            <ImageBox
              id="demo-image1"
              x={30}
              y={30}
              width={100}
              height={60}
              src="https://via.placeholder.com/100x60/3B82F6/FFFFFF?text=센서"
              alt="센서 이미지"
              text="온도센서"
              className="border-2 border-blue-500 rounded-lg shadow-md"
              onClick={() => addToast("온도센서 클릭! 🌡️", "info")}
            />

            <ImageBox
              id="demo-image2"
              x={180}
              y={30}
              width={120}
              height={60}
              src="https://via.placeholder.com/120x60/10B981/FFFFFF?text=모터"
              alt="모터 이미지"
              text="구동모터"
              className="border-2 border-emerald-500 rounded-lg shadow-md"
              onClick={() => addToast("구동모터 클릭! ⚙️", "success")}
            />

            <ImageBox
              id="demo-image3"
              x={350}
              y={30}
              width={80}
              height={80}
              src="https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=CPU"
              alt="CPU 이미지"
              text="제어CPU"
              className="border-2 border-amber-500 rounded-lg shadow-md"
              onClick={() => addToast("제어CPU 클릭! 💻", "warning")}
            />

            <ImageBox
              id="demo-image4"
              x={105}
              y={140}
              width={140}
              height={70}
              src="https://via.placeholder.com/140x70/8B5CF6/FFFFFF?text=배터리"
              alt="배터리 이미지"
              text="리튬배터리"
              className="border-2 border-purple-500 rounded-lg shadow-md"
              onClick={() => addToast("리튬배터리 클릭! 🔋", "info")}
            />
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 온도센서 ImageBox
<ImageBox
  id="demo-image1"
  x={30}
  y={30}
  width={100}
  height={60}
  src="https://via.placeholder.com/100x60/3B82F6/FFFFFF?text=센서"
  alt="센서 이미지"
  text="온도센서"
  className="border-2 border-blue-500 rounded-lg shadow-md"
  onClick={() => addToast("온도센서 클릭! 🌡️", "info")}
/>

// 구동모터 ImageBox
<ImageBox
  id="demo-image2"
  x={180}
  y={30}
  width={120}
  height={60}
  src="https://via.placeholder.com/120x60/10B981/FFFFFF?text=모터"
  alt="모터 이미지"
  text="구동모터"
  className="border-2 border-emerald-500 rounded-lg shadow-md"
  onClick={() => addToast("구동모터 클릭! ⚙️", "success")}
/>`}
          </pre>
        </div>

        <div className="overflow-x-auto mb-6">
          <h3 className="text-lg font-semibold mb-3">Props</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">속성</th>
                <th className="border border-gray-300 px-4 py-2 text-left">타입</th>
                <th className="border border-gray-300 px-4 py-2 text-left">기본값</th>
                <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">id</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">고유 식별자</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">x, y</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">위치 좌표</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">width, height</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">크기</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">src</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">required</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">이미지 경로</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">alt</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">""</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">이미지 대체 텍스트</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">text</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">""</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">박스 텍스트</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">className</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"border border-gray-400"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">TailwindCSS 클래스</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">onClick</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">function</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">클릭 이벤트 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>이미지 경로:</strong> 로컬 파일 또는 외부 URL 모두 사용 가능
            </li>
            <li>
              • <strong>플레이스홀더:</strong> via.placeholder.com 등을 활용해 개발 중 임시 이미지 사용
            </li>
            <li>
              • <strong>접근성:</strong> alt 속성을 반드시 설정하여 스크린 리더 지원
            </li>
            <li>
              • <strong>반응형:</strong> 다양한 크기의 이미지를 지원하여 유연한 레이아웃 구성
            </li>
            <li>
              • <strong>상호작용:</strong> onClick 이벤트로 이미지 클릭 시 상세 정보 표시 가능
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderArrow = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">➡️ Arrow 컴포넌트</h2>
        <p className="text-gray-600 mb-6">방향성을 나타내는 화살표를 그리는 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Arrow
  startPoint={{ x: 50, y: 50 }}
  endPoint={{ x: 200, y: 100 }}
  strokeWidth={2}
  arrowSize={8}
  showEndArrow={true}
  showStartArrow={false}
  className="text-blue-600"
  onClick={() => console.log('화살표 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🔧 화살표 크기 및 양방향 예제</h3>
          <div className="relative w-full h-48 border border-gray-200 rounded bg-gray-50 p-4">
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              💡 화살표 크기와 방향 조절
            </div>

            {/* 다양한 크기의 화살표 */}
            <Arrow
              startPoint={{ x: 30, y: 50 }}
              endPoint={{ x: 120, y: 50 }}
              strokeWidth={2}
              arrowSize={6}
              className="text-blue-600"
              onClick={() => addToast("작은 화살표 (크기: 6) ➡️", "info")}
            />

            <Arrow
              startPoint={{ x: 30, y: 80 }}
              endPoint={{ x: 120, y: 80 }}
              strokeWidth={3}
              arrowSize={10}
              className="text-emerald-600"
              onClick={() => addToast("중간 화살표 (크기: 10) ➡️", "success")}
            />

            <Arrow
              startPoint={{ x: 30, y: 110 }}
              endPoint={{ x: 120, y: 110 }}
              strokeWidth={4}
              arrowSize={15}
              className="text-purple-600"
              onClick={() => addToast("큰 화살표 (크기: 15) ➡️", "info")}
            />

            {/* 양방향 화살표 */}
            <Arrow
              startPoint={{ x: 200, y: 50 }}
              endPoint={{ x: 320, y: 50 }}
              strokeWidth={3}
              arrowSize={10}
              showStartArrow={true}
              showEndArrow={true}
              className="text-red-600"
              onClick={() => addToast("양방향 화살표 ↔️", "error")}
            />

            {/* 시작점만 화살표 */}
            <Arrow
              startPoint={{ x: 200, y: 80 }}
              endPoint={{ x: 320, y: 80 }}
              strokeWidth={2}
              arrowSize={8}
              showStartArrow={true}
              showEndArrow={false}
              className="text-amber-600"
              onClick={() => addToast("역방향 화살표 ⬅️", "warning")}
            />

            {/* 화살표 없는 선 */}
            <Arrow
              startPoint={{ x: 200, y: 130 }}
              endPoint={{ x: 320, y: 130 }}
              strokeWidth={2}
              showStartArrow={false}
              showEndArrow={false}
              className="text-gray-600"
              onClick={() => addToast("화살표 없는 선 —", "info")}
            />

            {/* 라벨들 */}
            <div className="absolute left-[130px] top-[35px]">
              <span className="text-xs text-blue-600 font-medium">작은(6)</span>
            </div>
            <div className="absolute left-[130px] top-[65px]">
              <span className="text-xs text-emerald-600 font-medium">중간(10)</span>
            </div>
            <div className="absolute left-[130px] top-[95px]">
              <span className="text-xs text-purple-600 font-medium">큰(15)</span>
            </div>
            <div className="absolute left-[330px] top-[35px]">
              <span className="text-xs text-red-600 font-medium">양방향</span>
            </div>
            <div className="absolute left-[330px] top-[75px]">
              <span className="text-xs text-amber-600 font-medium">역방향</span>
            </div>
            <div className="absolute left-[330px] top-[115px]">
              <span className="text-xs text-gray-600 font-medium">선만</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">📊 실용적인 사용 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4">
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              💡 데이터 흐름 및 신호 전달
            </div>

            {/* 수평 데이터 흐름 */}
            <Arrow
              startPoint={{ x: 30, y: 80 }}
              endPoint={{ x: 120, y: 80 }}
              strokeWidth={3}
              arrowSize={8}
              className="text-blue-600"
              onClick={() => addToast("데이터 입력 흐름 ➡️", "info")}
            />

            {/* 수직 제어 신호 */}
            <Arrow
              startPoint={{ x: 75, y: 100 }}
              endPoint={{ x: 75, y: 160 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-emerald-600"
              onClick={() => addToast("제어 신호 ⬇️", "success")}
            />

            {/* 대각선 피드백 */}
            <Arrow
              startPoint={{ x: 140, y: 80 }}
              endPoint={{ x: 200, y: 120 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-purple-600"
              onClick={() => addToast("피드백 신호 ↗️", "info")}
            />

            {/* 곡선형 연결 (여러 화살표로 구현) */}
            <Arrow
              startPoint={{ x: 220, y: 80 }}
              endPoint={{ x: 280, y: 80 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-amber-600"
              onClick={() => addToast("1단계 처리 ➡️", "warning")}
            />
            <Arrow
              startPoint={{ x: 280, y: 80 }}
              endPoint={{ x: 320, y: 110 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-amber-600"
              onClick={() => addToast("2단계 처리 ↘️", "warning")}
            />
            <Arrow
              startPoint={{ x: 320, y: 110 }}
              endPoint={{ x: 380, y: 110 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-amber-600"
              onClick={() => addToast("3단계 처리 ➡️", "warning")}
            />

            {/* 양방향 통신 (개선된 버전) */}
            <Arrow
              startPoint={{ x: 50, y: 200 }}
              endPoint={{ x: 150, y: 200 }}
              strokeWidth={3}
              arrowSize={10}
              showStartArrow={true}
              showEndArrow={true}
              className="text-red-600"
              onClick={() => addToast("양방향 통신 ↔️", "error")}
            />

            {/* 분기 화살표 */}
            <Arrow
              startPoint={{ x: 250, y: 180 }}
              endPoint={{ x: 320, y: 160 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-cyan-600"
              onClick={() => addToast("분기 A ↗️", "info")}
            />
            <Arrow
              startPoint={{ x: 250, y: 180 }}
              endPoint={{ x: 320, y: 200 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-cyan-600"
              onClick={() => addToast("분기 B ↘️", "info")}
            />
            <Arrow
              startPoint={{ x: 250, y: 180 }}
              endPoint={{ x: 320, y: 180 }}
              strokeWidth={2}
              arrowSize={8}
              className="text-cyan-600"
              onClick={() => addToast("분기 C ➡️", "info")}
            />

            {/* 라벨 추가 */}
            <div className="absolute left-[30px] top-[55px]">
              <span className="text-xs text-blue-600 font-medium">입력</span>
            </div>
            <div className="absolute left-[100px] top-[55px]">
              <span className="text-xs text-blue-600 font-medium">처리</span>
            </div>
            <div className="absolute left-[80px] top-[170px]">
              <span className="text-xs text-red-600 font-medium">양방향</span>
            </div>
            <div className="absolute left-[220px] top-[165px]">
              <span className="text-xs text-cyan-600 font-medium">분기</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 화살표
<Arrow
  startPoint={{ x: 30, y: 80 }}
  endPoint={{ x: 120, y: 80 }}
  strokeWidth={3}
  arrowSize={8}
  className="text-blue-600"
  onClick={() => addToast("데이터 입력 흐름 ➡️", "info")}
/>

// 양방향 화살표
<Arrow
  startPoint={{ x: 50, y: 200 }}
  endPoint={{ x: 150, y: 200 }}
  strokeWidth={3}
  arrowSize={10}
  showStartArrow={true}
  showEndArrow={true}
  className="text-red-600"
  onClick={() => addToast("양방향 통신 ↔️", "error")}
/>

// 큰 화살표
<Arrow
  startPoint={{ x: 30, y: 100 }}
  endPoint={{ x: 120, y: 100 }}
  strokeWidth={4}
  arrowSize={15}
  className="text-purple-600"
  onClick={() => addToast("큰 화살표 ➡️", "info")}
/>

// 역방향 화살표 (시작점만)
<Arrow
  startPoint={{ x: 200, y: 80 }}
  endPoint={{ x: 320, y: 80 }}
  strokeWidth={2}
  arrowSize={8}
  showStartArrow={true}
  showEndArrow={false}
  className="text-amber-600"
  onClick={() => addToast("역방향 화살표 ⬅️", "warning")}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );

  const renderLine = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📏 Line 컴포넌트</h2>
        <p className="text-gray-600 mb-6">연결선, 구분선, 보조선 등을 그리는 기본 직선 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<Line
  startPoint={{ x: 50, y: 50 }}
  endPoint={{ x: 200, y: 100 }}
  strokeWidth={2}
  className="text-gray-600"
  onClick={() => console.log('선 클릭')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4">
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              💡 다양한 선 스타일과 용도
            </div>

            {/* 전력선 (굵은 선) */}
            <Line
              startPoint={{ x: 30, y: 80 }}
              endPoint={{ x: 150, y: 80 }}
              strokeWidth={4}
              className="text-red-600"
              onClick={() => addToast("전력선 (AC 220V) 🔌", "error")}
            />

            {/* 신호선 (중간 선) */}
            <Line
              startPoint={{ x: 30, y: 100 }}
              endPoint={{ x: 150, y: 100 }}
              strokeWidth={2}
              className="text-blue-600"
              onClick={() => addToast("신호선 (Digital) 📡", "info")}
            />

            {/* 데이터선 (얇은 선) */}
            <Line
              startPoint={{ x: 30, y: 120 }}
              endPoint={{ x: 150, y: 120 }}
              strokeWidth={1}
              className="text-emerald-600"
              onClick={() => addToast("데이터선 (Serial) 💾", "success")}
            />

            {/* 접지선 (점선 효과를 위한 여러 짧은 선) */}
            <Line
              startPoint={{ x: 30, y: 140 }}
              endPoint={{ x: 50, y: 140 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지선 ⏚", "info")}
            />
            <Line
              startPoint={{ x: 60, y: 140 }}
              endPoint={{ x: 80, y: 140 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지선 ⏚", "info")}
            />
            <Line
              startPoint={{ x: 90, y: 140 }}
              endPoint={{ x: 110, y: 140 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지선 ⏚", "info")}
            />
            <Line
              startPoint={{ x: 120, y: 140 }}
              endPoint={{ x: 150, y: 140 }}
              strokeWidth={2}
              className="text-gray-600"
              onClick={() => addToast("접지선 ⏚", "info")}
            />

            {/* 구조적 연결선 */}
            <Line
              startPoint={{ x: 200, y: 80 }}
              endPoint={{ x: 200, y: 160 }}
              strokeWidth={3}
              className="text-purple-600"
              onClick={() => addToast("수직 지지대 🏗️", "info")}
            />

            {/* 측정 보조선 */}
            <Line
              startPoint={{ x: 250, y: 60 }}
              endPoint={{ x: 380, y: 60 }}
              strokeWidth={1}
              className="text-amber-600"
              onClick={() => addToast("측정 기준선 📐", "warning")}
            />
            <Line
              startPoint={{ x: 250, y: 180 }}
              endPoint={{ x: 380, y: 180 }}
              strokeWidth={1}
              className="text-amber-600"
              onClick={() => addToast("측정 기준선 📐", "warning")}
            />

            {/* 대각선 브레이스 */}
            <Line
              startPoint={{ x: 250, y: 90 }}
              endPoint={{ x: 320, y: 150 }}
              strokeWidth={2}
              className="text-cyan-600"
              onClick={() => addToast("대각선 브레이스 ⚡", "info")}
            />
            <Line
              startPoint={{ x: 320, y: 90 }}
              endPoint={{ x: 250, y: 150 }}
              strokeWidth={2}
              className="text-cyan-600"
              onClick={() => addToast("대각선 브레이스 ⚡", "info")}
            />

            {/* 연결 분기점 */}
            <Line
              startPoint={{ x: 350, y: 120 }}
              endPoint={{ x: 380, y: 100 }}
              strokeWidth={2}
              className="text-indigo-600"
              onClick={() => addToast("분기 연결 🔀", "info")}
            />
            <Line
              startPoint={{ x: 350, y: 120 }}
              endPoint={{ x: 380, y: 120 }}
              strokeWidth={2}
              className="text-indigo-600"
              onClick={() => addToast("분기 연결 🔀", "info")}
            />
            <Line
              startPoint={{ x: 350, y: 120 }}
              endPoint={{ x: 380, y: 140 }}
              strokeWidth={2}
              className="text-indigo-600"
              onClick={() => addToast("분기 연결 🔀", "info")}
            />

            {/* 라벨들 */}
            <div className="absolute" style={{ left: "160px", top: "65px" }}>
              <span className="text-xs text-red-600 font-medium">전력</span>
            </div>
            <div className="absolute" style={{ left: "160px", top: "85px" }}>
              <span className="text-xs text-blue-600 font-medium">신호</span>
            </div>
            <div className="absolute" style={{ left: "160px", top: "105px" }}>
              <span className="text-xs text-emerald-600 font-medium">데이터</span>
            </div>
            <div className="absolute" style={{ left: "160px", top: "125px" }}>
              <span className="text-xs text-gray-600 font-medium">접지</span>
            </div>
            <div className="absolute" style={{ left: "210px", top: "100px" }}>
              <span className="text-xs text-purple-600 font-medium">구조</span>
            </div>
            <div className="absolute" style={{ left: "300px", top: "35px" }}>
              <span className="text-xs text-amber-600 font-medium">측정</span>
            </div>
            <div className="absolute" style={{ left: "260px", top: "75px" }}>
              <span className="text-xs text-cyan-600 font-medium">브레이스</span>
            </div>
            <div className="absolute" style={{ left: "390px", top: "105px" }}>
              <span className="text-xs text-indigo-600 font-medium">분기</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 전력선 (굵은 선)
<Line
  startPoint={{ x: 30, y: 80 }}
  endPoint={{ x: 150, y: 80 }}
  strokeWidth={4}
  className="text-red-600"
  onClick={() => addToast("전력선 (AC 220V) 🔌", "error")}
/>

// 신호선 (중간 선)
<Line
  startPoint={{ x: 30, y: 100 }}
  endPoint={{ x: 150, y: 100 }}
  strokeWidth={2}
  className="text-blue-600"
  onClick={() => addToast("신호선 (Digital) 📡", "info")}
/>

// 점선 효과 (여러 짧은 선으로 구현)
<Line startPoint={{ x: 30, y: 140 }} endPoint={{ x: 50, y: 140 }} 
      strokeWidth={2} className="text-gray-600" />
<Line startPoint={{ x: 60, y: 140 }} endPoint={{ x: 80, y: 140 }} 
      strokeWidth={2} className="text-gray-600" />
<Line startPoint={{ x: 90, y: 140 }} endPoint={{ x: 110, y: 140 }} 
      strokeWidth={2} className="text-gray-600" />

// 대각선 브레이스
<Line
  startPoint={{ x: 250, y: 90 }}
  endPoint={{ x: 320, y: 150 }}
  strokeWidth={2}
  className="text-cyan-600"
  onClick={() => addToast("대각선 브레이스 ⚡", "info")}
/>`}
          </pre>
        </div>

        <div className="overflow-x-auto mb-6">
          <h3 className="text-lg font-semibold mb-3">Props</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">속성</th>
                <th className="border border-gray-300 px-4 py-2 text-left">타입</th>
                <th className="border border-gray-300 px-4 py-2 text-left">기본값</th>
                <th className="border border-gray-300 px-4 py-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">startPoint</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">object</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{ x: 0, y: 0 }`}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">시작점 좌표</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">endPoint</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">object</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{`{ x: 100, y: 0 }`}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">끝점 좌표</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">strokeWidth</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">2</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">선 두께 (1-4 권장)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">lineType</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"straight"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">선 타입 (straight, curved, stepped)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">dashArray</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">점선 패턴 (예: "5,5")</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">className</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"text-gray-500"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">TailwindCSS 클래스 (색상)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
          <h4 className="font-medium text-orange-800 mb-2">🔧 실용적인 사용 예시</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>
              • <strong>전력선:</strong> 굵은 선(4px)으로 고전압/고전류 라인 표시
            </li>
            <li>
              • <strong>신호선:</strong> 중간 선(2px)으로 디지털/아날로그 신호 표시
            </li>
            <li>
              • <strong>데이터선:</strong> 얇은 선(1px)으로 통신/데이터 라인 표시
            </li>
            <li>
              • <strong>점선 효과:</strong> 여러 짧은 선으로 가상 연결이나 접지선 표현
            </li>
            <li>
              • <strong>구조선:</strong> 물리적 지지대나 프레임 구조 표시
            </li>
            <li>
              • <strong>측정선:</strong> 치수나 기준선 표시
            </li>
            <li>
              • <strong>분기선:</strong> 한 지점에서 여러 방향으로 분기되는 연결
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderOtherComponents = (componentName) => {
    switch (componentName) {
      case "triangle":
        return renderTriangle();
      case "valve":
        return renderValve();
      case "imagebox":
        return renderImageBox();
      case "arrow":
        return renderArrow();
      case "line":
        return renderLine();
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {sections.find((s) => s.id === componentName)?.icon}{" "}
                {sections.find((s) => s.id === componentName)?.title} 컴포넌트
              </h2>
              <p className="text-gray-600 mb-6">컴포넌트 설명</p>
            </div>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "box":
        return renderBox();
      case "connector":
        return renderConnector();
      case "triangle":
        return renderTriangle();
      case "valve":
        return renderValve();
      case "imagebox":
        return renderImageBox();
      case "arrow":
        return renderArrow();
      case "line":
        return renderLine();
      case "examples":
        return renderExamples();
      default:
        return renderOtherComponents(activeSection);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold text-gray-800">
            <img src={logo} alt="logo" className="w-6 h-6 inline-block mr-2" />
            Documentation
          </h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Documentation;
