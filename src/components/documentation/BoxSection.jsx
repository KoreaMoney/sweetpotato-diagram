import { Box } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const BoxSection = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📦 Box 컴포넌트</h2>
        <p className="text-gray-600 mb-6">시스템의 각 구성요소를 나타내는 박스 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 가로 텍스트 Box
<Box
  id="component1"
  x={50}
  y={50}
  width={100}
  height={40}
  text="컴포넌트"
  className="bg-[#0066ff] text-white border-blue-700 border-2 rounded-lg"
  onClick={() => ('클릭됨')}
/>

// 🆕 세로 텍스트 Box
<Box
  id="component2"
  x={200}
  y={50}
  width={60}
  height={80}
  text="세로컴포넌트"
  textDirection="vertical"
  className="bg-emerald-600 text-white border-emerald-700 border-2 rounded-lg"
  onClick={() => console.log('세로 텍스트 클릭됨')}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4 overflow-x-auto">
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

            {/* 🆕 세로 텍스트 예제 */}
            <Box
              id="demo-box5"
              x={300}
              y={100}
              width={60}
              height={80}
              text="세로텍스트"
              textDirection="vertical"
              verticalDirection="lr"
              className="bg-rose-500 text-white border-rose-700 border-2 rounded-lg text-xs"
              onClick={() => addToast("세로 텍스트 (LR) 클릭! 📝", "success")}
            />
            <Box
              id="demo-box6"
              x={400}
              y={100}
              width={50}
              height={100}
              text="배터리모니터링"
              textDirection="vertical"
              verticalDirection="lr"
              className="bg-indigo-500 text-white border-indigo-700 border-2 rounded-lg text-xs"
              onClick={() => addToast("배터리 모니터링 (LR) 클릭! 🔋", "info")}
            />

            {/* 🆕 세로 텍스트 RL 방향 예제 */}
            <Box
              id="demo-box7"
              x={480}
              y={100}
              width={50}
              height={100}
              text="시스템관리도구"
              textDirection="vertical"
              verticalDirection="rl"
              className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg text-xs"
              onClick={() => addToast("시스템 관리 (RL) 클릭! ⚙️", "warning")}
            />
          </div>
        </div>

        {/* 🆕 세로 텍스트 기능 설명 추가 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🆕 세로 텍스트 기능</h3>
          <p className="text-green-700 mb-4">
            <code className="bg-white px-2 py-1 rounded">textDirection="vertical"</code> 속성을 사용하여 텍스트를 세로로
            표시할 수 있습니다. 추가로 <code className="bg-white px-2 py-1 rounded">verticalDirection</code>
            으로 텍스트 진행 방향을 설정할 수 있습니다.
          </p>

          <div className="mb-4">
            <h4 className="font-semibold text-green-800 mb-2">텍스트 진행 방향</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                • <code className="bg-white px-1 rounded">verticalDirection="lr"</code> (기본값): 왼쪽에서 오른쪽으로
                진행 (한국어/중국어 방식)
              </li>
              <li>
                • <code className="bg-white px-1 rounded">verticalDirection="rl"</code>: 오른쪽에서 왼쪽으로 진행
                (일본어 방식)
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white text-md font-semibold mb-3">세로 텍스트 사용 예제</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 세로 텍스트 Box (왼쪽→오른쪽 진행)
<Box
  id="vertical-lr"
  x={300}
  y={100}
  width={60}
  height={80}
  text="세로텍스트"
  textDirection="vertical"
  verticalDirection="lr"  // 🆕 진행 방향 설정
  className="bg-rose-500 text-white border-rose-700 border-2 rounded-lg text-xs"
/>

// 세로 텍스트 Box (오른쪽→왼쪽 진행)
<Box
  id="vertical-rl"
  x={400}
  y={100}
  width={60}
  height={80}
  text="시스템관리"
  textDirection="vertical"
  verticalDirection="rl"  // 오른쪽에서 왼쪽으로
  className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg text-xs"
/>

// 긴 텍스트 예제 (자동 줄바꿈)
<Box
  id="long-text"
  x={500}
  y={100}
  width={50}
  height={100}
  text="배터리모니터링시스템"
  textDirection="vertical"
  verticalDirection="lr"
  className="bg-indigo-500 text-white border-indigo-700 border-2 rounded-lg text-xs"
/>`}
            </pre>
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
/>

// 🆕 세로 텍스트 Box (LR 방향)
<Box
  id="demo-box5"
  x={300}
  y={100}
  width={60}
  height={80}
  text="세로텍스트"
  textDirection="vertical"
  verticalDirection="lr"
  className="bg-rose-500 text-white border-rose-700 border-2 rounded-lg text-xs"
  onClick={() => addToast("세로 텍스트 (LR) 클릭! 📝", "success")}
/>

// 긴 텍스트 세로 표시 (LR 방향)
<Box
  id="demo-box6"
  x={400}
  y={100}
  width={50}
  height={100}
  text="배터리모니터링"
  textDirection="vertical"
  verticalDirection="lr"
  className="bg-indigo-500 text-white border-indigo-700 border-2 rounded-lg text-xs"
  onClick={() => addToast("배터리 모니터링 (LR) 클릭! 🔋", "info")}
/>

// 🆕 세로 텍스트 Box (RL 방향)
<Box
  id="demo-box7"
  x={480}
  y={100}
  width={50}
  height={100}
  text="시스템관리도구"
  textDirection="vertical"
  verticalDirection="rl"
  className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg text-xs"
  onClick={() => addToast("시스템 관리 (RL) 클릭! ⚙️", "warning")}
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
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">id</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">고유 식별자</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">x</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">X 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">y</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">Y 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">width</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">너비 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">height</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">required</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">높이 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">text</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">박스 내부 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">textDirection</code>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">🆕 NEW</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"horizontal"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">텍스트 방향 ("horizontal" | "vertical")</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">verticalDirection</code>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">🆕 NEW</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"lr"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">세로 텍스트 진행 방향 ("lr" | "rl")</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">className</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"bg-gray-200..."</code>
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
            <li>
              • <strong>🆕 세로 텍스트:</strong> <code>textDirection="vertical"</code>로 좁은 공간에서 텍스트를 세로로
              표시
            </li>
            <li>
              • <strong>🆕 진행 방향:</strong> <code>verticalDirection="lr"</code> (한국어) 또는 <code>"rl"</code>{" "}
              (일본어) 선택 가능
            </li>
            <li>
              • <strong>텍스트 길이:</strong> 세로 모드에서는 박스 높이를 충분히 설정하여 텍스트가 잘리지 않도록 주의
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxSection;
