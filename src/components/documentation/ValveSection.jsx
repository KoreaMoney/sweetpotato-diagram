import { Valve } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ValveSection = () => {
  const { addToast } = useToast();

  return (
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
          </div>
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
          </div>
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
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">size</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">20</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">밸브 크기</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">type</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"gate"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">밸브 타입 (gate, ball, check, butterfly, needle)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">isOpen</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">true</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">밸브 개폐 상태</td>
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

export default ValveSection;
