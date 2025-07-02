import { Diamond } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const DiamondSection = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">💎 Diamond 컴포넌트</h2>
        <p className="text-gray-600 mb-6">결정점이나 조건을 나타내는 마름모 모양의 컴포넌트입니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 정사각형 마름모
<Diamond
  id="decision1"
  x={100}
  y={50}
  size={80}
  text="로그인?"
  className="text-cyan-600 hover:text-cyan-700"
  onClick={() => console.log('마름모 클릭')}
/>

// 🆕 가로세로 다른 크기의 마름모
<Diamond
  id="decision2"
  x={200}
  y={50}
  width={120}
  height={80}
  text="권한 확인"
  className="text-purple-600 hover:text-purple-700"
/>

// 🆕 세로 텍스트 마름모
<Diamond
  id="decision3"
  x={350}
  y={50}
  size={100}
  text="데이터검증"
  textDirection="vertical"
  verticalDirection="lr"
  className="text-orange-600 hover:text-orange-700"
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제</h3>
          <div className="relative w-full h-64 border border-gray-200 rounded bg-gray-50 p-4 overflow-x-auto">
            <Diamond
              id="demo-diamond1"
              x={50}
              y={50}
              size={80}
              text="로그인?"
              className="text-cyan-600 hover:text-cyan-700"
              onClick={() => addToast("로그인 결정점 클릭! 🔑", "info")}
            />
            <Diamond
              id="demo-diamond2"
              x={200}
              y={50}
              size={100}
              text="권한 확인"
              className="text-purple-600 hover:text-purple-700"
              onClick={() => addToast("권한 확인 결정점 클릭! 🛡️", "success")}
            />
            <Diamond
              id="demo-diamond3"
              x={350}
              y={50}
              size={90}
              text="데이터 유효?"
              className="text-orange-600 hover:text-orange-700"
              onClick={() => addToast("데이터 유효성 결정점 클릭! 📊", "warning")}
            />
            <Diamond
              id="demo-diamond4"
              x={150}
              y={160}
              size={70}
              text="완료"
              className="text-green-600 hover:text-green-700"
              onClick={() => addToast("완료 결정점 클릭! ✅", "success")}
            />
            <Diamond
              id="demo-diamond5"
              x={300}
              y={160}
              size={60}
              text="재시도?"
              className="text-red-600 hover:text-red-700"
              onClick={() => addToast("재시도 결정점 클릭! 🔄", "error")}
            />

            {/* 🆕 가로세로 다른 크기 예제 */}
            <Diamond
              id="demo-diamond6"
              x={400}
              y={50}
              width={140}
              height={70}
              text="직사각형 마름모"
              className="text-teal-600 hover:text-teal-700"
              onClick={() => addToast("직사각형 마름모 클릭! 📐", "info")}
            />

            {/* 🆕 세로 텍스트 예제 */}
            <Diamond
              id="demo-diamond7"
              x={50}
              y={160}
              size={80}
              text="세로텍스트"
              textDirection="vertical"
              verticalDirection="lr"
              className="text-indigo-600 hover:text-indigo-700"
              onClick={() => addToast("세로 텍스트 마름모 클릭! 📝", "success")}
            />
          </div>
        </div>

        {/* Props 섹션 */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg mb-6 border border-cyan-200">
          <h3 className="text-xl font-bold text-cyan-800 mb-4">📋 Props</h3>

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
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">고유 식별자 (자동 연결 기능용)</td>
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
                  <td className="py-3 px-4 text-sm text-gray-600">마름모 내부에 표시할 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">size</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">100</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">마름모 기본 크기 (width/height 없을 때 사용)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">width</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">마름모 너비 (명시하면 size보다 우선)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">height</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">마름모 높이 (명시하면 size보다 우선)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">x</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">0</code>
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
                    <code className="text-sm bg-gray-100 px-1 rounded">0</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">Y 좌표 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">textDirection</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"horizontal"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">텍스트 방향 ("horizontal" | "vertical")</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">verticalDirection</code>
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
                    <code className="text-sm bg-gray-100 px-1 rounded">"text-cyan-600..."</code>
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
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">클릭 이벤트 핸들러</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">enableAutoConnect</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">true</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">자동 연결 기능 활성화 여부</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 🆕 세로 텍스트 기능 설명 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🆕 세로 텍스트 & 가변 크기 기능</h3>
          <p className="text-green-700 mb-4">
            Diamond 컴포넌트는 이제 Box 컴포넌트와 동일한 모든 기능을 지원합니다. 세로 텍스트와 가로세로가 다른 마름모를
            만들 수 있습니다.
          </p>

          <div className="mb-4">
            <h4 className="font-semibold text-green-800 mb-2">🔷 가변 크기 기능</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                • <code className="bg-white px-1 rounded">size</code>: 정사각형 마름모 (기본값)
              </li>
              <li>
                • <code className="bg-white px-1 rounded">width</code> +{" "}
                <code className="bg-white px-1 rounded">height</code>: 직사각형 마름모
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-green-800 mb-2">📝 세로 텍스트 기능</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                • <code className="bg-white px-1 rounded">textDirection="vertical"</code>: 세로 텍스트 활성화
              </li>
              <li>
                • <code className="bg-white px-1 rounded">verticalDirection="lr"</code>: 왼쪽→오른쪽 진행
              </li>
              <li>
                • <code className="bg-white px-1 rounded">verticalDirection="rl"</code>: 오른쪽→왼쪽 진행
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white text-md font-semibold mb-3">새로운 기능 사용 예제</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 직사각형 마름모
<Diamond
  id="rect-diamond"
  x={100}
  y={50}
  width={140}
  height={80}
  text="직사각형 결정점"
  className="text-teal-600"
/>

// 세로 텍스트 마름모
<Diamond
  id="vertical-diamond"
  x={250}
  y={50}
  size={100}
  text="세로텍스트결정"
  textDirection="vertical"
  verticalDirection="lr"
  className="text-indigo-600"
/>`}
            </pre>
          </div>
        </div>

        {/* 자동 연결 기능 설명 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">🔗 자동 연결 기능</h3>
          <p className="text-purple-700 mb-4">
            Diamond 컴포넌트는 자동 연결 기능을 지원합니다.{" "}
            <kbd className="bg-white px-2 py-1 rounded border">Shift</kbd> + 클릭으로 연결을 시작할 수 있습니다.
          </p>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white text-md font-semibold mb-3">자동 연결 사용법</h4>
            <pre className="text-sm overflow-x-auto">
              {`// DiagramProvider 내에서 사용
<DiagramProvider>
  <Diamond
    id="decision1"
    x={100}
    y={50}
    size={80}
    text="조건 확인"
    enableAutoConnect={true}
  />
  <Diamond
    id="decision2"
    x={200}
    y={150}
    size={80}
    text="결과 처리"
    enableAutoConnect={true}
  />
</DiagramProvider>

// Shift + 클릭으로 두 마름모를 연결할 수 있습니다.`}
            </pre>
          </div>
        </div>

        {/* 사용 사례 */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg mb-6 border border-amber-200">
          <h3 className="text-xl font-bold text-amber-800 mb-4">💡 사용 사례</h3>
          <ul className="text-amber-700 space-y-2">
            <li>
              • <strong>플로우차트의 결정점:</strong> 조건 분기를 나타낼 때
            </li>
            <li>
              • <strong>워크플로우의 검증점:</strong> 데이터 유효성 검사 단계
            </li>
            <li>
              • <strong>사용자 인터랙션:</strong> 선택이 필요한 지점
            </li>
            <li>
              • <strong>상태 전환:</strong> 시스템 상태 변화의 조건
            </li>
            <li>
              • <strong>승인 프로세스:</strong> 승인/거부 결정점
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">라이브 예제 코드</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 로그인 결정점
<Diamond
  id="demo-diamond1"
  x={50}
  y={50}
  size={80}
  text="로그인?"
  className="text-cyan-600 hover:text-cyan-700"
  onClick={() => addToast("로그인 결정점 클릭! 🔑", "info")}
/>

// 권한 확인 결정점
<Diamond
  id="demo-diamond2"
  x={200}
  y={50}
  size={100}
  text="권한 확인"
  className="text-purple-600 hover:text-purple-700"
  onClick={() => addToast("권한 확인 결정점 클릭! 🛡️", "success")}
/>

// 데이터 유효성 결정점
<Diamond
  id="demo-diamond3"
  x={350}
  y={50}
  size={90}
  text="데이터 유효?"
  className="text-orange-600 hover:text-orange-700"
  onClick={() => addToast("데이터 유효성 결정점 클릭! 📊", "warning")}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DiamondSection;
