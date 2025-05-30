import { Line } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const LineSection = () => {
  const { addToast } = useToast();

  return (
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

        {/* Props 섹션 */}
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
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">startPoint</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">Point</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">시작점 좌표 (x, y)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">endPoint</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">Point</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">끝점 좌표 (x, y)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">strokeWidth</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">2</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">선 두께</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">strokeDasharray</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"none"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">점선 패턴 (예: "5,5")</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">className</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"text-gray-500"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">TailwindCSS 클래스</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">onClick</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">function</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">undefined</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">클릭 이벤트 핸들러</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineSection;
