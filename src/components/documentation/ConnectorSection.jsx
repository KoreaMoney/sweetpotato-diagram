import { Box, Connector } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ConnectorSection = () => {
  const { addToast } = useToast();

  return (
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

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">📋 Props</h3>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">속성</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">타입</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">기본값</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">설명</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">fromBox</td>
                  <td className="py-3 px-4 text-orange-600">BoxRef</td>
                  <td className="py-3 px-4 text-blue-600">required</td>
                  <td className="py-3 px-4">시작 박스 정보 (박스 연결 시)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">toBox</td>
                  <td className="py-3 px-4 text-orange-600">BoxRef</td>
                  <td className="py-3 px-4 text-blue-600">required</td>
                  <td className="py-3 px-4">도착 박스 정보 (박스 연결 시)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">startPoint</td>
                  <td className="py-3 px-4 text-orange-600">Point</td>
                  <td className="py-3 px-4 text-blue-600">required</td>
                  <td className="py-3 px-4">시작점 좌표 (좌표 연결 시)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">endPoint</td>
                  <td className="py-3 px-4 text-orange-600">Point</td>
                  <td className="py-3 px-4 text-blue-600">required</td>
                  <td className="py-3 px-4">끝점 좌표 (좌표 연결 시)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">connectionType</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"straight"</td>
                  <td className="py-3 px-4">연결 타입 (straight, orthogonal, curved, stepped, custom, auto)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">strokeWidth</td>
                  <td className="py-3 px-4 text-orange-600">number</td>
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4">선 두께</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">showArrow</td>
                  <td className="py-3 px-4 text-orange-600">boolean</td>
                  <td className="py-3 px-4">true</td>
                  <td className="py-3 px-4">끝점 화살표 표시 여부</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">showStartArrow</td>
                  <td className="py-3 px-4 text-orange-600">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">시작점 화살표 표시 여부 (양방향)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">arrowSize</td>
                  <td className="py-3 px-4 text-orange-600">number</td>
                  <td className="py-3 px-4">8</td>
                  <td className="py-3 px-4">화살표 크기</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-3 px-4 font-mono text-sm">arrowDirection</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"forward"</td>
                  <td className="py-3 px-4">🆕 화살표 방향 (forward, backward, both, none)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-3 px-4 font-mono text-sm">arrowShape</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"triangle"</td>
                  <td className="py-3 px-4">🆕 화살표 모양 (triangle, diamond, circle, square)</td>
                </tr>
                <tr className="border-b border-gray-100 bg-yellow-50">
                  <td className="py-3 px-4 font-mono text-sm">arrowColor</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"current"</td>
                  <td className="py-3 px-4">🆕 화살표 색상 (current, red, blue, green, purple 등)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">animated</td>
                  <td className="py-3 px-4 text-orange-600">boolean</td>
                  <td className="py-3 px-4">false</td>
                  <td className="py-3 px-4">애니메이션 효과</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">className</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"text-gray-500"</td>
                  <td className="py-3 px-4">TailwindCSS 클래스</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">orthogonalDirection</td>
                  <td className="py-3 px-4 text-orange-600">string</td>
                  <td className="py-3 px-4">"auto"</td>
                  <td className="py-3 px-4">직교 연결 방향 (horizontal-first, vertical-first, auto)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">stepOffset</td>
                  <td className="py-3 px-4 text-orange-600">number</td>
                  <td className="py-3 px-4">50</td>
                  <td className="py-3 px-4">직교 연결 중간점 오프셋</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-mono text-sm">bendPoints</td>
                  <td className="py-3 px-4 text-orange-600">Point[]</td>
                  <td className="py-3 px-4">[]</td>
                  <td className="py-3 px-4">커스텀 경로 점들</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-sm">cornerRadius</td>
                  <td className="py-3 px-4 text-orange-600">number</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">모서리 둥글기</td>
                </tr>
              </tbody>
            </table>
          </div>
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
            <div className="relative w-full h-32 border border-gray-200 rounded bg-gray-50">
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
                className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs"
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
                connectionType="straight"
                className="text-purple-600"
                showArrow={true}
                showStartArrow={true}
                arrowSize={8}
                strokeWidth={3}
              />

              {/* 라벨들 */}
              <div className="absolute left-[100px] top-[30px]">
                <span className="text-xs text-blue-600 font-medium">단방향</span>
              </div>
              <div className="absolute left-[355px] top-[30px]">
                <span className="text-xs text-purple-600 font-medium">양방향</span>
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
  connectionType="straight"
  className="text-purple-600"
  showArrow={true}          // 끝점 화살표 표시
  showStartArrow={true}     // 시작점 화살표도 표시 (양방향)
  arrowSize={8}            // 양쪽 화살표 크기
  strokeWidth={3}
/>`}
            </pre>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border border-yellow-200">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">📋 양방향 화살표 관련 Props</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="text-left py-2 px-3 font-semibold text-yellow-800">속성</th>
                    <th className="text-left py-2 px-3 font-semibold text-yellow-800">타입</th>
                    <th className="text-left py-2 px-3 font-semibold text-yellow-800">기본값</th>
                    <th className="text-left py-2 px-3 font-semibold text-yellow-800">설명</th>
                    <th className="text-left py-2 px-3 font-semibold text-yellow-800">권장값</th>
                  </tr>
                </thead>
                <tbody className="text-yellow-700">
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-3 font-mono text-xs bg-yellow-50 rounded">showArrow</td>
                    <td className="py-2 px-3">boolean</td>
                    <td className="py-2 px-3">true</td>
                    <td className="py-2 px-3">끝점 화살표 표시 여부</td>
                    <td className="py-2 px-3">true (기본)</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-3 font-mono text-xs bg-yellow-50 rounded">showStartArrow</td>
                    <td className="py-2 px-3">boolean</td>
                    <td className="py-2 px-3">false</td>
                    <td className="py-2 px-3">시작점 화살표 표시 (양방향용)</td>
                    <td className="py-2 px-3">true (양방향 시)</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-3 font-mono text-xs bg-yellow-50 rounded">arrowSize</td>
                    <td className="py-2 px-3">number</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3">화살표 크기 (픽셀)</td>
                    <td className="py-2 px-3">6-15 범위</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-3 font-mono text-xs bg-yellow-50 rounded">strokeWidth</td>
                    <td className="py-2 px-3">number</td>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3">선 두께 (픽셀)</td>
                    <td className="py-2 px-3">1-4 범위</td>
                  </tr>
                  <tr className="border-b border-yellow-100">
                    <td className="py-2 px-3 font-mono text-xs bg-yellow-50 rounded">className</td>
                    <td className="py-2 px-3">string</td>
                    <td className="py-2 px-3">"text-gray-500..."</td>
                    <td className="py-2 px-3">색상 및 스타일 클래스</td>
                    <td className="py-2 px-3">진한 색상 권장</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">🎯 크기 가이드</h5>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>
                    <strong>작은 화살표 (6-7):</strong> 센서, 피드백 신호
                  </li>
                  <li>
                    <strong>중간 화살표 (8-10):</strong> 일반 데이터 흐름
                  </li>
                  <li>
                    <strong>큰 화살표 (12-15):</strong> 메인 프로세스, 중요 연결
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">🎨 색상 조합 예시</h5>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>
                    <strong>단방향:</strong> text-blue-500, text-green-500
                  </li>
                  <li>
                    <strong>양방향:</strong> text-purple-600, text-indigo-600
                  </li>
                  <li>
                    <strong>중요 연결:</strong> text-red-600, text-orange-600
                  </li>
                </ul>
              </div>
            </div>
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

        {/* 🆕 NEW! 화살표 커스터마이징 섹션 */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg mb-6 border border-emerald-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">🆕 화살표 커스터마이징 (NEW!)</h3>
          <p className="text-emerald-700 mb-4">이제 화살표의 방향, 모양, 색상을 자유롭게 설정할 수 있습니다!</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 화살표 방향 데모 */}
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-3">🔄 화살표 방향 (arrowDirection)</h4>
              <div className="relative w-full h-64 bg-gray-50 border border-gray-200 rounded">
                {/* Forward 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 50 }}
                  endPoint={{ x: 200, y: 50 }}
                  arrowDirection="forward"
                  arrowShape="triangle"
                  arrowColor="blue"
                  arrowSize={12}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 30 }}>
                  forward
                </span>

                {/* Backward 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 90 }}
                  endPoint={{ x: 200, y: 90 }}
                  arrowDirection="backward"
                  arrowShape="triangle"
                  arrowColor="green"
                  arrowSize={12}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 65 }}>
                  backward
                </span>

                {/* Both 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 130 }}
                  endPoint={{ x: 200, y: 130 }}
                  arrowDirection="both"
                  arrowShape="triangle"
                  arrowColor="purple"
                  arrowSize={12}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 105 }}>
                  both
                </span>

                {/* None 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 170 }}
                  endPoint={{ x: 200, y: 170 }}
                  arrowDirection="none"
                  arrowShape="triangle"
                  arrowColor="gray"
                  arrowSize={12}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 145 }}>
                  none
                </span>
              </div>
            </div>

            {/* 화살표 모양 데모 */}
            <div className="bg-white p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-3">🔺 화살표 모양 (arrowShape)</h4>
              <div className="relative w-full h-64 bg-gray-50 border border-gray-200 rounded">
                {/* Triangle 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 50 }}
                  endPoint={{ x: 200, y: 50 }}
                  arrowDirection="forward"
                  arrowShape="triangle"
                  arrowColor="red"
                  arrowSize={15}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 30 }}>
                  triangle
                </span>

                {/* Diamond 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 90 }}
                  endPoint={{ x: 200, y: 90 }}
                  arrowDirection="forward"
                  arrowShape="diamond"
                  arrowColor="blue"
                  arrowSize={15}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 70 }}>
                  diamond
                </span>

                {/* Circle 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 130 }}
                  endPoint={{ x: 200, y: 130 }}
                  arrowDirection="forward"
                  arrowShape="circle"
                  arrowColor="green"
                  arrowSize={15}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 110 }}>
                  circle
                </span>

                {/* Square 화살표 */}
                <Connector
                  startPoint={{ x: 50, y: 170 }}
                  endPoint={{ x: 200, y: 170 }}
                  arrowDirection="forward"
                  arrowShape="square"
                  arrowColor="purple"
                  arrowSize={15}
                  strokeWidth={2}
                />
                <span className="absolute text-xs text-gray-600" style={{ left: 50, top: 150 }}>
                  square
                </span>
              </div>
            </div>
          </div>

          {/* 화살표 색상 데모 */}
          <div className="mt-6 bg-white p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-3">🎨 화살표 색상 (arrowColor)</h4>
            <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <Connector
                    startPoint={{ x: 20, y: 30 }}
                    endPoint={{ x: 120, y: 30 }}
                    arrowDirection="forward"
                    arrowShape="triangle"
                    arrowColor="red"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 20, top: 10 }}>
                    red
                  </span>

                  <Connector
                    startPoint={{ x: 20, y: 60 }}
                    endPoint={{ x: 120, y: 60 }}
                    arrowDirection="forward"
                    arrowShape="diamond"
                    arrowColor="blue"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 20, top: 40 }}>
                    blue
                  </span>

                  <Connector
                    startPoint={{ x: 20, y: 90 }}
                    endPoint={{ x: 120, y: 90 }}
                    arrowDirection="forward"
                    arrowShape="circle"
                    arrowColor="green"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 20, top: 70 }}>
                    green
                  </span>
                </div>

                <div>
                  <Connector
                    startPoint={{ x: 160, y: 30 }}
                    endPoint={{ x: 260, y: 30 }}
                    arrowDirection="forward"
                    arrowShape="square"
                    arrowColor="purple"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 160, top: 10 }}>
                    purple
                  </span>

                  <Connector
                    startPoint={{ x: 160, y: 60 }}
                    endPoint={{ x: 260, y: 60 }}
                    arrowDirection="forward"
                    arrowShape="triangle"
                    arrowColor="yellow"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 160, top: 40 }}>
                    yellow
                  </span>

                  <Connector
                    startPoint={{ x: 160, y: 90 }}
                    endPoint={{ x: 260, y: 90 }}
                    arrowDirection="forward"
                    arrowShape="diamond"
                    arrowColor="pink"
                    arrowSize={12}
                    strokeWidth={2}
                  />
                  <span className="absolute text-xs text-gray-600" style={{ left: 160, top: 70 }}>
                    pink
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 코드 예시 */}
          <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">💻 새로운 화살표 기능 사용 예시</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 빨간색 다이아몬드 양방향 화살표
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 300, y: 150 }}
  arrowDirection="both"
  arrowShape="diamond"
  arrowColor="red"
  arrowSize={15}
  connectionType="curved"
  strokeWidth={3}
/>

// 초록색 원형 단방향 화살표
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  arrowDirection="forward"
  arrowShape="circle"
  arrowColor="green"
  arrowSize={12}
/>

// 보라색 사각형 역방향 화살표
<Connector
  startPoint={{ x: 50, y: 200 }}
  endPoint={{ x: 250, y: 250 }}
  arrowDirection="backward"
  arrowShape="square"
  arrowColor="purple"
  arrowSize={18}
  connectionType="orthogonal"
/>`}
            </pre>
          </div>

          <div className="mt-4 bg-emerald-100 border-l-4 border-emerald-400 p-4">
            <h4 className="font-medium text-emerald-800 mb-2">💡 새로운 화살표 기능 사용 팁</h4>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>
                • <strong>arrowDirection="both":</strong> 양방향 화살표로 showStartArrow를 자동으로 대체
              </li>
              <li>
                • <strong>arrowShape:</strong> 용도에 맞게 선택 (triangle: 일반, diamond: 중요, circle: 상태, square:
                데이터)
              </li>
              <li>
                • <strong>arrowColor:</strong> 선의 색상과 독립적으로 설정 가능
              </li>
              <li>
                • <strong>arrowSize:</strong> 8-24 범위에서 선 두께와 조화롭게 조정
              </li>
            </ul>
          </div>
        </div>

        {/* 🚀 복잡한 반도체 회로도 시스템 예시 */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-lg mb-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">🚀 복잡한 반도체 회로도 시스템 예시</h3>
          <p className="text-slate-700 mb-4">
            실제 반도체 시스템에서 사용되는 다양한 신호 타입과 연결을 새로운 화살표 기능으로 표현한 예시입니다.
          </p>

          <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6">
            <h4 className="font-semibold text-slate-800 mb-4">🔌 복합 반도체 시스템 아키텍처</h4>
            <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded overflow-hidden">
              {/* CPU */}
              <Box
                id="cpu"
                x={50}
                y={50}
                width={80}
                height={40}
                text="CPU Core"
                className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("CPU: 중앙처리장치 🧠", "info")}
              />

              {/* 메모리 컨트롤러 */}
              <Box
                id="memory-controller"
                x={200}
                y={30}
                width={90}
                height={35}
                text="Memory Controller"
                className="bg-green-600 text-white border-green-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("메모리 컨트롤러: 메모리 액세스 제어 🎛️", "success")}
              />

              {/* DDR5 메모리 */}
              <Box
                id="ddr5"
                x={350}
                y={20}
                width={70}
                height={30}
                text="DDR5 RAM"
                className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("DDR5: 고속 시스템 메모리 ⚡", "info")}
              />

              {/* L3 캐시 */}
              <Box
                id="l3-cache"
                x={350}
                y={70}
                width={70}
                height={25}
                text="L3 Cache"
                className="bg-indigo-600 text-white border-indigo-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("L3 캐시: 공유 캐시 메모리 💾", "info")}
              />

              {/* PCIe 컨트롤러 */}
              <Box
                id="pcie-controller"
                x={50}
                y={130}
                width={80}
                height={30}
                text="PCIe 5.0"
                className="bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("PCIe: 고속 확장 버스 🚄", "warning")}
              />

              {/* GPU */}
              <Box
                id="gpu"
                x={200}
                y={110}
                width={70}
                height={35}
                text="GPU"
                className="bg-red-600 text-white border-red-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("GPU: 그래픽 처리 장치 🎮", "error")}
              />

              {/* SSD 컨트롤러 */}
              <Box
                id="ssd-controller"
                x={320}
                y={130}
                width={80}
                height={30}
                text="NVMe SSD"
                className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("NVMe SSD: 고속 저장장치 💽", "info")}
              />

              {/* 전력 관리 */}
              <Box
                id="power-mgmt"
                x={50}
                y={200}
                width={80}
                height={30}
                text="Power IC"
                className="bg-yellow-600 text-white border-yellow-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("전력 IC: 전원 관리 🔋", "warning")}
              />

              {/* 클럭 생성기 */}
              <Box
                id="clock-gen"
                x={200}
                y={200}
                width={80}
                height={30}
                text="Clock Gen"
                className="bg-pink-600 text-white border-pink-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("클럭 생성기: 시스템 타이밍 ⏰", "info")}
              />

              {/* I/O 컨트롤러 */}
              <Box
                id="io-controller"
                x={320}
                y={200}
                width={80}
                height={30}
                text="I/O Hub"
                className="bg-gray-600 text-white border-gray-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("I/O Hub: 입출력 제어 🔌", "info")}
              />

              {/* 🔥 고속 데이터 버스 (64bit) - 다이아몬드 양방향 */}
              <Connector
                fromBox={{ id: "cpu", position: "right" }}
                toBox={{ id: "memory-controller", position: "left" }}
                connectionType="straight"
                arrowDirection="both"
                arrowShape="diamond"
                arrowColor="blue"
                arrowSize={14}
                strokeWidth={4}
              />

              {/* 🚄 DDR5 메모리 버스 - 사각형 양방향 */}
              <Connector
                fromBox={{ id: "memory-controller", position: "right" }}
                toBox={{ id: "ddr5", position: "left" }}
                connectionType="straight"
                arrowDirection="both"
                arrowShape="square"
                arrowColor="purple"
                arrowSize={16}
                strokeWidth={5}
              />

              {/* ⚡ L3 캐시 액세스 - 원형 양방향 */}
              <Connector
                fromBox={{ id: "memory-controller", position: "right" }}
                toBox={{ id: "l3-cache", position: "left" }}
                connectionType="curved"
                arrowDirection="both"
                arrowShape="circle"
                arrowColor="indigo"
                arrowSize={12}
                strokeWidth={3}
              />

              {/* 🎮 PCIe GPU 연결 - 삼각형 양방향 */}
              <Connector
                fromBox={{ id: "pcie-controller", position: "right" }}
                toBox={{ id: "gpu", position: "left" }}
                connectionType="orthogonal"
                arrowDirection="both"
                arrowShape="triangle"
                arrowColor="red"
                arrowSize={13}
                strokeWidth={4}
              />

              {/* 💽 NVMe SSD 연결 - 사각형 단방향 */}
              <Connector
                fromBox={{ id: "pcie-controller", position: "right" }}
                toBox={{ id: "ssd-controller", position: "left" }}
                connectionType="custom"
                bendPoints={[
                  { x: 150, y: 145 },
                  { x: 150, y: 175 },
                  { x: 280, y: 175 },
                  { x: 280, y: 145 },
                ]}
                arrowDirection="forward"
                arrowShape="square"
                arrowColor="cyan"
                arrowSize={11}
                strokeWidth={3}
              />

              {/* 🔋 전력 공급 라인 - 다이아몬드 단방향 */}
              <Connector
                fromBox={{ id: "power-mgmt", position: "up" }}
                toBox={{ id: "cpu", position: "bottom" }}
                connectionType="straight"
                arrowDirection="forward"
                arrowShape="diamond"
                arrowColor="yellow"
                arrowSize={10}
                strokeWidth={2}
              />

              {/* ⏰ 클럭 신호 - 원형 단방향 (애니메이션) */}
              <Connector
                fromBox={{ id: "clock-gen", position: "up" }}
                toBox={{ id: "memory-controller", position: "bottom" }}
                connectionType="straight"
                arrowDirection="forward"
                arrowShape="circle"
                arrowColor="pink"
                arrowSize={8}
                strokeWidth={2}
                animated={true}
              />

              {/* 🔌 I/O 제어 신호 - 삼각형 양방향 */}
              <Connector
                fromBox={{ id: "io-controller", position: "left" }}
                toBox={{ id: "ssd-controller", position: "bottom" }}
                connectionType="straight"
                arrowDirection="both"
                arrowShape="triangle"
                arrowColor="gray"
                arrowSize={9}
                strokeWidth={2}
              />

              {/* 🔧 제어 버스 - 다이아몬드 역방향 */}
              <Connector
                fromBox={{ id: "cpu", position: "bottom" }}
                toBox={{ id: "pcie-controller", position: "top" }}
                connectionType="straight"
                arrowDirection="backward"
                arrowShape="diamond"
                arrowColor="blue"
                arrowSize={10}
                strokeWidth={2}
              />

              {/* 신호 타입 범례 */}
              <div className="absolute bottom-2 left-2 bg-white p-3 rounded-lg shadow-md border border-gray-200 text-xs">
                <h5 className="font-bold text-gray-800 mb-2">신호 타입 범례</h5>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-blue-500 mr-2"></div>
                    <span>💎 고속 데이터 버스</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-purple-500 mr-2"></div>
                    <span>🟦 메모리 인터페이스</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-red-500 mr-2"></div>
                    <span>🔺 PCIe 연결</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-yellow-500 mr-2"></div>
                    <span>💎 전력 공급</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-pink-500 mr-2"></div>
                    <span>⭕ 클럭 신호</span>
                  </div>
                </div>
              </div>

              {/* 성능 지표 */}
              <div className="absolute bottom-2 right-2 bg-white p-3 rounded-lg shadow-md border border-gray-200 text-xs">
                <h5 className="font-bold text-gray-800 mb-2">성능 지표</h5>
                <div className="space-y-1">
                  <div>
                    CPU-MEM: <span className="text-blue-600 font-bold">400GB/s</span>
                  </div>
                  <div>
                    DDR5: <span className="text-purple-600 font-bold">76.8GB/s</span>
                  </div>
                  <div>
                    PCIe 5.0: <span className="text-red-600 font-bold">64GB/s</span>
                  </div>
                  <div>
                    NVMe: <span className="text-cyan-600 font-bold">14GB/s</span>
                  </div>
                  <div>
                    Clock: <span className="text-pink-600 font-bold">3.2GHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 코드 예시 */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
            <h4 className="text-white font-semibold mb-3">💻 반도체 회로도 시스템 코드</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 고속 데이터 버스 (CPU ↔ Memory Controller)
<Connector
  fromBox={{ id: "cpu", position: "right" }}
  toBox={{ id: "memory-controller", position: "left" }}
  connectionType="straight"
  arrowDirection="both"          // 양방향 통신
  arrowShape="diamond"           // 고속 데이터 강조
  arrowColor="blue"             // 데이터 버스 색상
  arrowSize={14}                // 큰 화살표로 중요성 표시
  strokeWidth={4}               // 두꺼운 선으로 대역폭 표현
/>

// DDR5 메모리 인터페이스 (초고속)
<Connector
  fromBox={{ id: "memory-controller", position: "right" }}
  toBox={{ id: "ddr5", position: "left" }}
  connectionType="straight"
  arrowDirection="both"
  arrowShape="square"            // 메모리 블록 형태
  arrowColor="purple"           // DDR5 고유 색상
  arrowSize={16}                // 최대 크기로 최고 성능 표시
  strokeWidth={5}               // 최대 대역폭 표현
/>

// PCIe 5.0 GPU 연결
<Connector
  fromBox={{ id: "pcie-controller", position: "right" }}
  toBox={{ id: "gpu", position: "left" }}
  connectionType="orthogonal"   // L자 연결
  arrowDirection="both"
  arrowShape="triangle"          // 표준 확장 버스
  arrowColor="red"              // GPU 특화 색상
  arrowSize={13}
  strokeWidth={4}
/>

// 클럭 신호 (애니메이션으로 주기적 신호 표현)
<Connector
  fromBox={{ id: "clock-gen", position: "up" }}
  toBox={{ id: "memory-controller", position: "bottom" }}
  connectionType="straight"
  arrowDirection="forward"       // 단방향 클럭 공급
  arrowShape="circle"           // 주기적 신호 표현
  arrowColor="pink"             // 클럭 신호 색상
  arrowSize={8}
  strokeWidth={2}
  animated={true}               // 주기적 펄스 애니메이션
/>

// 전력 공급 라인
<Connector
  fromBox={{ id: "power-mgmt", position: "up" }}
  toBox={{ id: "cpu", position: "bottom" }}
  connectionType="straight"
  arrowDirection="forward"       // 단방향 전력 공급
  arrowShape="diamond"          // 중요한 전력선 강조
  arrowColor="yellow"           // 전력/에너지 색상
  arrowSize={10}
  strokeWidth={2}
/>

// 복잡한 라우팅 (장애물 회피)
<Connector
  fromBox={{ id: "pcie-controller", position: "right" }}
  toBox={{ id: "ssd-controller", position: "left" }}
  connectionType="custom"
  bendPoints={[
    { x: 150, y: 145 },         // 첫 번째 꺾임
    { x: 150, y: 175 },         // 아래로 우회
    { x: 280, y: 175 },         // 장애물 아래로 통과
    { x: 280, y: 145 }          // 목적지로 상승
  ]}
  arrowDirection="forward"
  arrowShape="square"
  arrowColor="cyan"
  arrowSize={11}
  strokeWidth={3}
/>`}
            </pre>
          </div>

          {/* 설계 가이드라인 */}
          <div className="bg-slate-100 border-l-4 border-slate-400 p-4">
            <h4 className="font-medium text-slate-800 mb-3">🏗️ 반도체 회로도 설계 가이드라인</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-slate-700 mb-2">📊 화살표 모양별 용도</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    <strong>🔺 Triangle:</strong> 표준 신호, PCIe, I/O
                  </li>
                  <li>
                    <strong>💎 Diamond:</strong> 고속 데이터, 전력, 제어 버스
                  </li>
                  <li>
                    <strong>⭕ Circle:</strong> 클럭, 주기적 신호, 인터럽트
                  </li>
                  <li>
                    <strong>🟦 Square:</strong> 메모리, 블록 데이터, 패킷
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-slate-700 mb-2">🎨 색상 코딩 시스템</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>
                    <strong>🔵 Blue:</strong> 데이터 버스, CPU 연결
                  </li>
                  <li>
                    <strong>🟣 Purple:</strong> 메모리 인터페이스
                  </li>
                  <li>
                    <strong>🔴 Red:</strong> 그래픽, 고성능 장치
                  </li>
                  <li>
                    <strong>🟡 Yellow:</strong> 전력, 에너지 관리
                  </li>
                  <li>
                    <strong>🩷 Pink:</strong> 클럭, 타이밍 신호
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-semibold text-slate-700 mb-2">⚡ 성능별 시각적 표현</h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>
                  <strong>초고속 (100GB/s+):</strong> strokeWidth={5}, arrowSize={16}
                </li>
                <li>
                  <strong>고속 (10-100GB/s):</strong> strokeWidth={4}, arrowSize={13}
                </li>
                <li>
                  <strong>중속 (1-10GB/s):</strong> strokeWidth={3}, arrowSize={11}
                </li>
                <li>
                  <strong>저속 (1GB/s 이하):</strong> strokeWidth={2}, arrowSize={8}
                </li>
                <li>
                  <strong>제어/클럭 신호:</strong> strokeWidth={2}, arrowSize={8 - 10}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectorSection;
