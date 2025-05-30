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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxSection;
