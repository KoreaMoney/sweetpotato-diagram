import { Arrow } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ArrowSection = () => {
  const { addToast } = useToast();

  return (
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
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">arrowSize</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">8</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">화살표 크기</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">showEndArrow</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">true</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">끝점 화살표 표시</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">showStartArrow</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">false</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">시작점 화살표 표시</td>
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

export default ArrowSection;
