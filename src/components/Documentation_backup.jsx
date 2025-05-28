import { useState } from "react";
import { Box, Connector, Triangle, Valve, ImageBox, Arrow, Line } from "./DiagramComponents";
import { useToast } from "./ToastSystem";

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
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">fromBox</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">object</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">시작 박스 정보</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">toBox</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">object</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">null</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">도착 박스 정보</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">boxes</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">array</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">[]</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">모든 박스 정보 배열</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">connectionType</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"straight"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  연결 타입 (straight, orthogonal, curved, stepped, custom)
                </td>
              </tr>
              <tr className="bg-cyan-50">
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  bendPoints <span className="text-cyan-600 ml-1">⭐</span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">array</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">[]</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">custom 타입에서 중간 꺾임점들</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">strokeWidth</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">number</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">2</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">선 두께</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">animated</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">boolean</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">false</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">애니메이션 효과</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">showArrow</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">boolean</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">true</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">화살표 표시 여부</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">className</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"text-gray-500"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  TailwindCSS 클래스 (text-* 클래스로 선 색상 지정)
                </td>
              </tr>
            </tbody>
          </table>
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
              className="bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-xs"
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
              className="bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-xs"
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
        <p className="text-gray-600 mb-6">밸브를 나타내는 컴포넌트입니다.</p>

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
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-48 border border-gray-200 rounded bg-gray-50 p-4">
            <Valve
              x={50}
              y={50}
              size={25}
              type="gate"
              isOpen={true}
              className="text-blue-600"
              onClick={() => addToast("게이트 밸브 (열림) 클릭! 🔵", "info")}
            />
            <Valve
              x={150}
              y={50}
              size={25}
              type="gate"
              isOpen={false}
              className="text-red-600"
              onClick={() => addToast("게이트 밸브 (닫힘) 클릭! 🔴", "error")}
            />
            <Valve
              x={250}
              y={50}
              size={25}
              type="ball"
              isOpen={true}
              className="text-emerald-600"
              onClick={() => addToast("볼 밸브 (열림) 클릭! 🟢", "success")}
            />
            <Valve
              x={350}
              y={50}
              size={25}
              type="ball"
              isOpen={false}
              className="text-amber-600"
              onClick={() => addToast("볼 밸브 (닫힘) 클릭! 🟡", "warning")}
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
                <td className="border border-gray-300 px-4 py-2 text-sm">밸브 크기</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">type</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">string</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">"gate"</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">밸브 타입 (gate, ball)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">isOpen</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">boolean</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">true</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">밸브 열림/닫힘 상태</td>
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
          <h1 className="text-xl font-bold text-gray-800">📚 Doc</h1>
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
