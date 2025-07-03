import { Box, DiagramProvider, GroupProvider, ImageBox, CircularSegment, InfoBox } from "../DiagramComponents";
import { useToast } from "../ToastSystem";
import { useState } from "react";

const BoxSection = () => {
  const { addToast } = useToast();

  // 박스들의 위치를 state로 관리
  const [boxPositions, setBoxPositions] = useState({
    "react-demo": { x: 60, y: 60 },
    "vue-demo": { x: 170, y: 60 },
    "angular-demo": { x: 280, y: 60 },
    "nodejs-demo": { x: 60, y: 170 },
    "express-demo": { x: 170, y: 170 },
    "mysql-demo": { x: 60, y: 280 },
    "mongodb-demo": { x: 170, y: 280 },
    "docker-demo": { x: 450, y: 140 },
    "nginx-demo": { x: 450, y: 210 },
    // 🆕 UI 컴포넌트 그룹 (ImageBox + Box 혼합)
    "ui-header": { x: 600, y: 60 },
    "ui-button": { x: 720, y: 60 },
    "ui-icon": { x: 600, y: 140 },
    "ui-logo": { x: 720, y: 140 },
    "ui-menu": { x: 660, y: 220 },
  });

  // 그룹 드래그 완료 시 박스 위치 업데이트
  const handleGroupDragEnd = (event, groupInfo) => {
    // 그룹 내 박스들의 새로운 위치로 state 업데이트
    if (groupInfo.boxes && groupInfo.boxes.length > 0) {
      setBoxPositions((prev) => {
        const newPositions = { ...prev };
        groupInfo.boxes.forEach((box) => {
          newPositions[box.id] = { x: box.x, y: box.y };
        });
        return newPositions;
      });

      addToast(`${groupInfo.groupLabel} 그룹 이동 완료! 🚀`, "success");
    }
  };

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

      {/* 🆕 그룹화 기능 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-3xl mr-3">📦</span>
          Box 그룹화 기능
        </h2>
        <p className="text-gray-600 mb-6">
          관련된 Box들을 그룹으로 묶어서 시각적으로 구분할 수 있는 기능입니다. 그룹별로 배경색과 라벨을 설정할 수
          있습니다.
        </p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`<DiagramProvider>
  {/* 프론트엔드 그룹 */}
  <GroupProvider
    groupId="frontend"
    groupLabel="프론트엔드"
    groupStyle={{
      backgroundColor: "rgba(59, 130, 246, 0.08)",
      borderColor: "#3b82f6",
      borderWidth: 2,
      borderRadius: 12,
      padding: 15,
    }}
    onGroupClick={(event, groupInfo) => 
      console.log('그룹 클릭!', groupInfo)
    }
    onGroupDragEnd={handleGroupDragEnd}
  >
    <Box
      id="react-box"
      text="React"
      x={60}
      y={60}
      width={90}
      height={50}
      className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
      onClick={() => console.log('React 클릭!')}
    />
    
    <Box
      id="vue-box"
      text="Vue.js"
      x={170}
      y={60}
      width={90}
      height={50}
      className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
      onClick={() => console.log('Vue.js 클릭!')}
    />

    {/* 🆕 ImageBox도 그룹에 포함 가능 */}
    <ImageBox
      id="logo-box"
      text="로고"
      icon="⚛️"
      iconType="emoji"
      x={280}
      y={60}
      width={80}
      height={60}
      className="bg-gray-100 border-gray-300 border-2 rounded-lg"
      onClick={() => console.log('로고 클릭!')}
    />
  </GroupProvider>
</DiagramProvider>`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">라이브 예제 - Box 그룹화</h3>
          <DiagramProvider>
            <div className="relative w-full h-[500px] border border-gray-200 rounded bg-gray-50 p-6 overflow-x-auto overflow-y-hidden">
              {/* 프론트엔드 그룹 */}
              <GroupProvider
                groupId="frontend"
                groupLabel="프론트엔드"
                groupStyle={{
                  backgroundColor: "rgba(59, 130, 246, 0.08)",
                  borderColor: "#3b82f6",
                  borderWidth: 2,
                  borderRadius: 12,
                  padding: 15,
                }}
                onGroupClick={(event, groupInfo) =>
                  addToast(`${groupInfo.groupLabel} 그룹 클릭! (${groupInfo.boxes.length}개 박스)`, "info")
                }
                onGroupDragEnd={handleGroupDragEnd}
              >
                <Box
                  id="react-demo"
                  text="React"
                  x={boxPositions["react-demo"].x}
                  y={boxPositions["react-demo"].y}
                  width={90}
                  height={50}
                  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("React 클릭! ⚛️", "info")}
                />

                <Box
                  id="vue-demo"
                  text="Vue.js"
                  x={boxPositions["vue-demo"].x}
                  y={boxPositions["vue-demo"].y}
                  width={90}
                  height={50}
                  className="bg-green-500 text-white border-violet-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Vue.js 클릭! 💚", "success")}
                />

                <Box
                  id="angular-demo"
                  text="Angular"
                  x={boxPositions["angular-demo"].x}
                  y={boxPositions["angular-demo"].y}
                  width={90}
                  height={50}
                  className="bg-red-500 text-white border-red-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Angular 클릭! 🅰️", "warning")}
                />
              </GroupProvider>

              {/* 백엔드 그룹 */}
              <GroupProvider
                groupId="backend"
                groupLabel="백엔드"
                groupStyle={{
                  backgroundColor: "rgba(34, 197, 94, 0.08)",
                  borderColor: "#22c55e",
                  borderWidth: 2,
                  borderRadius: 12,
                  padding: 15,
                }}
                onGroupClick={(event, groupInfo) =>
                  addToast(`${groupInfo.groupLabel} 그룹 클릭! (${groupInfo.boxes.length}개 박스)`, "success")
                }
                onGroupDragEnd={handleGroupDragEnd}
              >
                <Box
                  id="nodejs-demo"
                  text="Node.js"
                  x={boxPositions["nodejs-demo"].x}
                  y={boxPositions["nodejs-demo"].y}
                  width={90}
                  height={50}
                  className="bg-green-600 text-white border-green-700 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Node.js 클릭! 🟢", "success")}
                />

                <Box
                  id="express-demo"
                  text="Express"
                  x={boxPositions["express-demo"].x}
                  y={boxPositions["express-demo"].y}
                  width={90}
                  height={50}
                  className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Express 클릭! 🚀", "info")}
                />
              </GroupProvider>

              {/* 데이터베이스 그룹 */}
              <GroupProvider
                groupId="database"
                groupLabel="데이터베이스"
                groupStyle={{
                  backgroundColor: "rgba(249, 115, 22, 0.08)",
                  borderColor: "#f97316",
                  borderWidth: 2,
                  borderRadius: 12,
                  padding: 15,
                }}
                onGroupClick={(event, groupInfo) =>
                  addToast(`${groupInfo.groupLabel} 그룹 클릭! (${groupInfo.boxes.length}개 박스)`, "warning")
                }
                onGroupDragEnd={handleGroupDragEnd}
              >
                <Box
                  id="mysql-demo"
                  text="MySQL"
                  x={boxPositions["mysql-demo"].x}
                  y={boxPositions["mysql-demo"].y}
                  width={90}
                  height={50}
                  className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("MySQL 클릭! 🗃️", "warning")}
                />

                <Box
                  id="mongodb-demo"
                  text="MongoDB"
                  x={boxPositions["mongodb-demo"].x}
                  y={boxPositions["mongodb-demo"].y}
                  width={90}
                  height={50}
                  className="bg-green-700 text-white border-green-800 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("MongoDB 클릭! 🍃", "success")}
                />
              </GroupProvider>

              {/* 개별 박스 (그룹 없음) */}
              <Box
                id="docker-demo"
                text="Docker"
                x={boxPositions["docker-demo"].x}
                y={boxPositions["docker-demo"].y}
                width={90}
                height={50}
                className="bg-blue-600 text-white border-blue-700 border-2 rounded-lg text-sm font-semibold"
                onClick={() => addToast("Docker 클릭! 🐳", "info")}
              />

              <Box
                id="nginx-demo"
                text="Nginx"
                x={boxPositions["nginx-demo"].x}
                y={boxPositions["nginx-demo"].y}
                width={90}
                height={50}
                className="bg-green-500 text-white border-green-600 border-2 rounded-lg text-sm font-semibold"
                onClick={() => addToast("Nginx 클릭! 🌐", "success")}
              />

              {/* 🆕 UI 컴포넌트 그룹 (ImageBox + Box 혼합) */}
              <GroupProvider
                groupId="ui-components"
                groupLabel="UI 컴포넌트"
                groupStyle={{
                  backgroundColor: "rgba(168, 85, 247, 0.08)",
                  borderColor: "#a855f7",
                  borderWidth: 2,
                  borderRadius: 12,
                  padding: 15,
                }}
                onGroupClick={(event, groupInfo) =>
                  addToast(`${groupInfo.groupLabel} 그룹 클릭! (${groupInfo.boxes.length}개 요소)`, "info")
                }
                onGroupDragEnd={handleGroupDragEnd}
              >
                {/* 헤더 박스 */}
                <Box
                  id="ui-header"
                  text="Header"
                  x={boxPositions["ui-header"].x}
                  y={boxPositions["ui-header"].y}
                  width={80}
                  height={40}
                  className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Header 컴포넌트 클릭! 📱", "info")}
                />

                {/* 버튼 박스 */}
                <Box
                  id="ui-button"
                  text="Button"
                  x={boxPositions["ui-button"].x}
                  y={boxPositions["ui-button"].y}
                  width={80}
                  height={40}
                  className="bg-pink-500 text-white border-pink-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Button 컴포넌트 클릭! 🔘", "warning")}
                />

                {/* 아이콘 이미지박스 */}
                <ImageBox
                  id="ui-icon"
                  text="아이콘"
                  icon="🎨"
                  iconType="emoji"
                  x={boxPositions["ui-icon"].x}
                  y={boxPositions["ui-icon"].y}
                  width={80}
                  height={60}
                  textPosition="bottom"
                  className="bg-gradient-to-b from-purple-100 to-purple-200 border-purple-400 border-2 rounded-lg"
                  onClick={() => addToast("아이콘 컴포넌트 클릭! 🎨", "success")}
                />

                {/* 로고 이미지박스 */}
                <ImageBox
                  id="ui-logo"
                  text="로고"
                  icon="⭐"
                  iconType="emoji"
                  x={boxPositions["ui-logo"].x}
                  y={boxPositions["ui-logo"].y}
                  width={80}
                  height={60}
                  textPosition="bottom"
                  sparkle={true}
                  sparkleColor="#a855f7"
                  className="bg-gradient-to-b from-yellow-100 to-yellow-200 border-yellow-400 border-2 rounded-lg"
                  onClick={() => addToast("로고 컴포넌트 클릭! ⭐", "success")}
                />

                {/* 메뉴 박스 */}
                <Box
                  id="ui-menu"
                  text="Menu"
                  x={boxPositions["ui-menu"].x}
                  y={boxPositions["ui-menu"].y}
                  width={100}
                  height={40}
                  className="bg-indigo-500 text-white border-indigo-600 border-2 rounded-lg text-sm font-semibold"
                  onClick={() => addToast("Menu 컴포넌트 클릭! 📋", "info")}
                />
              </GroupProvider>

              {/* 설명 텍스트 */}
              <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-sm">
                💡 그룹 배경을 클릭하거나 드래그해보세요!
              </div>
            </div>
          </DiagramProvider>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mb-6 border border-purple-200">
          <h3 className="text-xl font-bold text-purple-800 mb-4">📋 GroupProvider Props</h3>

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
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">groupId</code>
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Required</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">-</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 식별자 (필수)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">groupLabel</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">""</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 라벨 텍스트</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">groupStyle</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">object</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">기본 스타일</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 배경 스타일 (색상, 테두리 등)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">showGroupBackground</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">true</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 배경 표시 여부</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">onGroupClick</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">function</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 배경 클릭 이벤트 핸들러</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">onGroupDragEnd</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">function</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹 드래그 종료 이벤트 핸들러</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-purple-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-purple-100 px-2 py-1 rounded">children</code>
                    <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Required</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">ReactNode</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">-</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">그룹에 포함될 Box, ImageBox 컴포넌트들</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <h4 className="font-medium text-purple-800 mb-2">💡 GroupProvider 사용 팁</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>
              • <strong>DiagramProvider 필수:</strong> GroupProvider는 DiagramProvider 내에서 사용해야 합니다
            </li>
            <li>
              • <strong>간편한 구조:</strong> <code>&lt;GroupProvider&gt;</code>로 감싸기만 하면 자동으로 그룹화됩니다
            </li>
            <li>
              • <strong>중복 제거:</strong> 각 Box에 그룹 정보를 중복 설정할 필요가 없어졌습니다
            </li>
            <li>
              • <strong>라벨 위치:</strong> 그룹이 화면 위쪽에 가까우면 라벨이 그룹 내부에 표시되어 짤림을 방지합니다
            </li>
            <li>
              • <strong>그룹 클릭:</strong> <code>onGroupClick</code>으로 그룹 배경 클릭 시 동작을 정의할 수 있습니다
            </li>
            <li>
              • <strong>자동 경계:</strong> 그룹 배경은 children Box들의 위치를 기준으로 자동 계산됩니다
            </li>
            <li>
              • <strong>중첩 가능:</strong> GroupProvider는 중첩해서 사용할 수 있습니다 (서브 그룹)
            </li>
            <li>
              • <strong>개별 박스:</strong> GroupProvider 밖의 Box는 개별 요소로 표시됩니다
            </li>
            <li>
              • <strong>🆕 ImageBox 지원:</strong> Box와 ImageBox를 함께 그룹화할 수 있습니다
            </li>
            <li>
              • <strong>혼합 그룹:</strong> 하나의 그룹에 여러 타입의 컴포넌트를 포함시킬 수 있습니다
            </li>
          </ul>
        </div>
      </div>

      {/* 🆕 3D 효과 박스 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">📦 3D 효과 박스</h3>
        <p className="text-gray-600 mb-6">박스에 입체감을 주는 3D 효과를 적용할 수 있습니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h4 className="text-white text-lg font-semibold mb-3">3D 효과 사용법</h4>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 3D 효과
<Box
  id="3d-box"
  x={100}
  y={100}
  width={160}
  height={80}
  text="01 MANAGEMENT"
  className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg"
  is3D={true}
  threeDColor="#d97706"
  threeDDepth={10}
  threeDDirection="right-down"
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">라이브 예제</h4>
          <div className="relative w-full h-[450px] border border-gray-200 rounded bg-gray-50 p-4 overflow-x-auto">
            {/* 기본 박스 (비교용) */}
            <Box
              id="normal-box"
              x={50}
              y={50}
              width={140}
              height={60}
              text="일반 박스"
              className="bg-gray-500 text-white border-gray-700 border-2 rounded-lg text-sm"
              onClick={() => addToast("일반 박스 클릭! 📦", "info")}
            />

            {/* 3D 효과 박스들 - 다양한 방향과 색상 */}
            <Box
              id="3d-box1"
              x={220}
              y={50}
              width={140}
              height={60}
              text="01 MANAGEMENT"
              className="bg-orange-500 text-white border-orange-700 border-2 rounded-lg text-sm font-bold"
              is3D={true}
              threeDColor="#d97706"
              threeDDepth={8}
              threeDDirection="right-down"
              onClick={() => addToast("3D 박스 클릭! 📦✨", "success")}
            />

            <Box
              id="3d-box2"
              x={390}
              y={50}
              width={140}
              height={60}
              text="02 MARKETING"
              className="bg-green-500 text-white border-green-700 border-2 rounded-lg text-sm font-bold"
              is3D={true}
              threeDColor="#16a34a"
              threeDDepth={8}
              threeDDirection="right-down"
              onClick={() => addToast("마케팅 박스 클릭! 📈", "success")}
            />

            <Box
              id="3d-box3"
              x={50}
              y={140}
              width={140}
              height={60}
              text="03 RESEARCH"
              className="bg-blue-500 text-white border-blue-700 border-2 rounded-lg text-sm font-bold"
              is3D={true}
              threeDColor="#1d4ed8"
              threeDDepth={10}
              threeDDirection="right-down"
              onClick={() => addToast("연구 박스 클릭! 🔬", "info")}
            />

            <Box
              id="3d-box4"
              x={220}
              y={140}
              width={140}
              height={60}
              text="04 ANALYSIS"
              className="bg-pink-500 text-white border-pink-700 border-2 rounded-lg text-sm font-bold"
              is3D={true}
              threeDColor="#ec4899"
              threeDDepth={8}
              threeDDirection="right-down"
              onClick={() => addToast("분석 박스 클릭! 📊", "success")}
            />

            {/* 좌측 위 방향 예제 */}
            <Box
              id="3d-box5"
              x={50}
              y={230}
              width={120}
              height={50}
              text="좌측 위"
              className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#7c3aed"
              threeDDepth={6}
              threeDDirection="left-up"
              onClick={() => addToast("좌측-위 3D 박스! 📦", "info")}
            />

            {/* 투명도 + 3D 효과 예제 */}
            <Box
              id="3d-box6"
              x={200}
              y={230}
              width={120}
              height={50}
              text="투명 70%"
              className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#0891b2"
              threeDDepth={8}
              threeDDirection="right-down"
              opacity={0.7}
              onClick={() => addToast("투명 3D 박스! 👻✨", "info")}
            />

            <Box
              id="3d-box7"
              x={350}
              y={230}
              width={120}
              height={50}
              text="투명 50%"
              className="bg-rose-600 text-white border-rose-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#e11d48"
              threeDDepth={8}
              threeDDirection="right-down"
              opacity={0.5}
              onClick={() => addToast("반투명 3D 박스! 🌙✨", "info")}
            />

            <Box
              id="3d-box8"
              x={490}
              y={230}
              width={120}
              height={50}
              text="투명 30%"
              className="bg-amber-600 text-white border-amber-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#d97706"
              threeDDepth={8}
              threeDDirection="right-down"
              opacity={0.3}
              onClick={() => addToast("고투명 3D 박스! 🔮✨", "info")}
            />

            {/* 🔧 수정: 다른 방향 예제들 (ID 중복 및 위치 겹침 문제 해결) */}
            <Box
              id="3d-box9"
              x={50}
              y={310}
              width={120}
              height={50}
              text="우측 위"
              className="bg-red-600 text-white border-red-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#dc2626"
              threeDDepth={6}
              threeDDirection="right-up"
              onClick={() => addToast("우측-위 3D 박스! 📦", "warning")}
            />

            <Box
              id="3d-box10"
              x={200}
              y={310}
              width={120}
              height={50}
              text="좌측 아래"
              className="bg-yellow-600 text-white border-yellow-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#ca8a04"
              threeDDepth={6}
              threeDDirection="left-down"
              onClick={() => addToast("좌측-아래 3D 박스! 📦", "warning")}
            />

            <Box
              id="3d-box11"
              x={350}
              y={310}
              width={120}
              height={50}
              text="우측 아래"
              className="bg-teal-600 text-white border-teal-800 border-2 rounded-lg text-sm"
              is3D={true}
              threeDColor="#0d9488"
              threeDDepth={6}
              threeDDirection="right-down"
              onClick={() => addToast("우측-아래 3D 박스! 📦", "info")}
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border border-blue-200">
          <h4 className="text-xl font-bold text-blue-800 mb-4">📋 3D 효과 Props</h4>

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
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-blue-100 px-2 py-1 rounded">is3D</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">false</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">3D 효과 활성화 여부</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-blue-100 px-2 py-1 rounded">threeDColor</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"#0044aa"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">3D 측면 색상 (주 색상보다 어두운 색 권장)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-blue-100 px-2 py-1 rounded">threeDDepth</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">8</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">3D 깊이 (픽셀 단위)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-blue-100 px-2 py-1 rounded">threeDDirection</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"right-down"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    3D 효과 방향
                    <br />
                    <span className="text-xs text-gray-500">"right-down" | "left-down" | "right-up" | "left-up"</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-blue-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-blue-100 px-2 py-1 rounded">opacity</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">1</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    투명도 (0.0 ~ 1.0)
                    <br />
                    <span className="text-xs text-gray-500">3D 그림자도 함께 조절됨</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 3D 효과 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>색상 선택:</strong> threeDColor는 메인 색상보다 20-30% 어두운 색을 사용하세요
            </li>
            <li>
              • <strong>깊이 조절:</strong> 박스 크기에 따라 threeDDepth를 조절하세요 (작은 박스: 4-6px, 큰 박스:
              8-12px)
            </li>
            <li>
              • <strong>방향 통일:</strong> 같은 화면의 박스들은 동일한 threeDDirection을 사용하는 것이 좋습니다
            </li>
            <li>
              • <strong>투명도 효과:</strong> opacity를 줄여도 3D 그림자가 자동으로 조절되어 자연스러운 투명 효과를 얻을
              수 있습니다
            </li>
            <li>
              • <strong>레이어링:</strong> 투명한 박스들을 겹쳐서 깊이감 있는 레이아웃을 만들 수 있습니다
            </li>
            <li>
              • <strong>애니메이션 주의:</strong> 3D 효과와 hover 애니메이션을 함께 사용할 때 자연스러운 결과를
              확인하세요
            </li>
            <li>
              • <strong>접근성:</strong> 3D 효과는 장식용이므로 텍스트 가독성을 해치지 않도록 주의하세요
            </li>
          </ul>
        </div>
      </div>

      {/* 🆕 인포그래픽 스타일 예제 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">🎨 인포그래픽 스타일</h3>
        <p className="text-gray-600 mb-6">
          원형 차트와 번호가 매겨진 박스를 조합한 프로페셔널한 인포그래픽을 만들 수 있습니다.
        </p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h4 className="text-white text-lg font-semibold mb-3">인포그래픽 구성 요소</h4>
          <pre className="text-sm overflow-x-auto">
            {`// 원형 차트 세그먼트 (className props 포함)
<CircularSegment
  id="segment1"
  centerX={150}
  centerY={150}
  radius={100}
  startAngle={0}
  endAngle={72}
  title="TARGET AUDIENCE"
  subtitle="Knowledge of the market"
  icon="📊"
  color="#ff6b35"
  darkColor="#d97706"
  // 🆕 className props
  className="hover:scale-105 transition-all duration-300"
  segmentClassName="drop-shadow-lg filter"
  shadowClassName="opacity-50"
  titleClassName="font-bold uppercase tracking-wider"
  subtitleClassName="font-light text-xs"
  iconClassName="text-lg"
/>

// 번호가 있는 정보 박스 (className props 포함)
<InfoBox
  id="info1"
  number="01"
  title="MANAGEMENT"
  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  x={400}
  y={50}
  width={320}
  height={70}
  color="#ff6b35"
  darkColor="#d97706"
  // 🆕 className props
  className="rounded-xl overflow-hidden"
  containerClassName="hover:scale-[1.02] transition-all duration-300"
  numberClassName="bg-gradient-to-br from-orange-400 to-red-500"
  titleClassName="text-lg font-black text-gray-900 tracking-wide"
  descriptionClassName="text-gray-600 text-sm leading-relaxed"
  contentClassName="bg-gradient-to-r from-white to-gray-50"
  backgroundClassName="shadow-lg border border-gray-200"
  borderClassName="ring-2 ring-orange-100"
  shadowClassName="shadow-xl shadow-orange-500/20"
  zIndex={20}
/>`}
          </pre>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">라이브 예제 - 크리에이티브 인포그래픽</h4>
          <div className="relative w-full h-[500px] border border-gray-200 rounded bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-x-auto">
            {/* 중앙 라벨 */}
            <div className="absolute top-[101px] left-[101px] bg-white rounded-full w-[100px] h-[100px] flex flex-col items-center justify-center shadow-lg border-4 border-cyan-400 z-10">
              <span className="text-xl font-bold text-gray-800">SWEET</span>
              <span className="text-sm text-gray-600">POTATO</span>
              <div className="flex space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>

            {/* 원형 차트 세그먼트들 */}
            <svg className="absolute top-0 left-0" width="300" height="300">
              <CircularSegment
                id="segment1"
                centerX={150}
                centerY={150}
                radius={120}
                startAngle={0}
                endAngle={72}
                title="AUDIENCE"
                subtitle="Knowledge of the market"
                icon="📊"
                color="#ff6b35"
                darkColor="#d97706"
                onClick={() => addToast("타겟 오디언스 세그먼트 클릭! 📊", "success")}
              />
              <CircularSegment
                id="segment2"
                centerX={150}
                centerY={150}
                radius={120}
                startAngle={72}
                endAngle={144}
                title="INCREASE"
                subtitle="Expand the market"
                icon="💰"
                color="#4ade80"
                darkColor="#16a34a"
                onClick={() => addToast("매출 증가 세그먼트 클릭! 💰", "success")}
              />
              <CircularSegment
                id="segment3"
                centerX={150}
                centerY={150}
                radius={120}
                startAngle={144}
                endAngle={216}
                title="POTATO"
                subtitle="Potato"
                icon="💡"
                color="#3b82f6"
                darkColor="#1d4ed8"
                onClick={() => addToast("아이디어 생성 세그먼트 클릭! 💡", "info")}
              />
              <CircularSegment
                id="segment4"
                centerX={150}
                centerY={150}
                radius={120}
                startAngle={216}
                endAngle={288}
                title="COMMUNICATION"
                subtitle="Team collaboration"
                icon="💬"
                color="#ec4899"
                darkColor="#be185d"
                onClick={() => addToast("커뮤니케이션 세그먼트 클릭! 💬", "success")}
              />
              <CircularSegment
                id="segment5"
                centerX={150}
                centerY={150}
                radius={120}
                startAngle={288}
                endAngle={360}
                title="DATA"
                subtitle="information"
                icon="📁"
                color="#06b6d4"
                darkColor="#0891b2"
                onClick={() => addToast("데이터 관리 세그먼트 클릭! 📁", "info")}
              />
            </svg>

            {/* 번호가 있는 정보 박스들 */}
            <InfoBox
              id="info1"
              number="01"
              title="MANAGEMENT"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              x={350}
              y={30}
              width={320}
              height={70}
              color="#ff6b35"
              darkColor="#d97706"
              zIndex={20}
              onClick={() => addToast("01 MANAGEMENT 클릭! 📋", "success")}
            />

            <InfoBox
              id="info2"
              number="02"
              title="MARKETING"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              x={350}
              y={120}
              width={320}
              height={70}
              color="#4ade80"
              darkColor="#16a34a"
              zIndex={21}
              onClick={() => addToast("02 MARKETING 클릭! 📈", "success")}
            />

            <InfoBox
              id="info3"
              number="03"
              title="RESEARCH"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              x={350}
              y={210}
              width={320}
              height={70}
              color="#3b82f6"
              darkColor="#1d4ed8"
              zIndex={22}
              onClick={() => addToast("03 RESEARCH 클릭! 🔬", "info")}
            />

            <InfoBox
              id="info4"
              number="04"
              title="ANALYSIS"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              x={350}
              y={300}
              width={320}
              height={70}
              color="#ec4899"
              darkColor="#be185d"
              zIndex={23}
              onClick={() => addToast("04 ANALYSIS 클릭! 📊", "success")}
            />

            <InfoBox
              id="info5"
              number="05"
              title="INFORMATION"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              x={350}
              y={390}
              width={320}
              height={70}
              color="#06b6d4"
              darkColor="#0891b2"
              zIndex={24}
              onClick={() => addToast("05 INFORMATION 클릭! 📋", "info")}
            />
          </div>
        </div>

        <div className="space-y-8 mb-6">
          {/* CircularSegment Props - 개선된 레이아웃 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
            <h4 className="text-xl font-bold text-orange-800 mb-4">🔄 CircularSegment Props</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/3">속성</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        centerX, centerY
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">원의 중심 좌표</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">radius</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">원의 반지름</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        startAngle, endAngle
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">세그먼트 시작/끝 각도</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        title, subtitle
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">세그먼트 제목/부제목</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">icon</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">아이콘 (이모지 또는 텍스트)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        color, darkColor
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">메인 색상과 그림자 색상</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* InfoBox Props - 개선된 레이아웃 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-xl font-bold text-blue-800 mb-4">📋 InfoBox Props</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/3">속성</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">number</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">왼쪽에 표시될 번호</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">title</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">오른쪽 영역의 제목</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">description</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">상세 설명 텍스트</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">color, darkColor</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">번호 영역 색상과 3D 색상</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">width, height</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">박스 크기 (기본: 300x80)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">is3D</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">3D 효과 여부 (기본: true)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-4">
          <h4 className="font-medium text-purple-800 mb-2">🎨 인포그래픽 디자인 팁</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>
              • <strong>색상 일관성:</strong> 세그먼트와 InfoBox에서 동일한 색상 팔레트를 사용하세요
            </li>
            <li>
              • <strong>적절한 간격:</strong> 요소들 간의 여백을 충분히 확보하여 가독성을 높이세요
            </li>
            <li>
              • <strong>텍스트 계층:</strong> 제목은 굵게, 설명은 작게 하여 정보 계층을 명확히 하세요
            </li>
            <li>
              • <strong>상호작용:</strong> onClick 이벤트를 활용하여 인터랙티브한 인포그래픽을 만드세요
            </li>
            <li>
              • <strong>접근성:</strong> 색상에만 의존하지 말고 아이콘과 텍스트를 함께 사용하세요
            </li>
            <li>
              • <strong>반응형:</strong> 다양한 화면 크기를 고려하여 요소들의 크기를 조절하세요
            </li>
          </ul>
        </div>
      </div>

      {/* 🆕 Tailwind CSS 커스터마이징 섹션 */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">🎨 Tailwind CSS 커스터마이징</h3>
        <p className="text-gray-600 mb-6">모든 컴포넌트에 className props를 사용하여 세밀한 스타일링이 가능합니다.</p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h4 className="text-white text-lg font-semibold mb-3">🔧 Box 컴포넌트 className Props</h4>
          <pre className="text-sm overflow-x-auto">
            {`<Box
  id="custom-box"
  x={100}
  y={100}
  text="커스텀 박스"
  // 기본 className (전체 스타일)
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl"
  // 추가 className props
  containerClassName="hover:rotate-2 transition-transform"
  textClassName="font-extrabold text-lg tracking-wide"
  borderClassName="ring-4 ring-purple-300 ring-opacity-50"
  backgroundClassName="bg-opacity-90 backdrop-blur-sm"
  shadowClassName="shadow-2xl shadow-purple-500/25"
  zIndex={50}  // z-index 제어
/>`}
          </pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h4 className="text-white text-lg font-semibold mb-3">🔧 InfoBox 컴포넌트 className Props</h4>
          <pre className="text-sm overflow-x-auto">
            {`<InfoBox
  id="custom-info"
  number="01"
  title="CUSTOM TITLE"
  description="커스텀 설명 텍스트입니다."
  x={100}
  y={100}
  // 기본 className (전체 스타일)
  className="rounded-2xl overflow-hidden"
  // 세부 영역별 className props
  containerClassName="hover:scale-105 transition-all duration-300"
  numberClassName="bg-gradient-to-br from-orange-400 to-red-500"
  titleClassName="text-2xl font-black text-gray-900"
  descriptionClassName="text-gray-500 italic"
  contentClassName="bg-gradient-to-r from-white to-gray-50"
  backgroundClassName="border-4 border-orange-200"
  borderClassName="ring-8 ring-orange-100"
  shadowClassName="shadow-2xl shadow-orange-500/30"
  zIndex={100}  // z-index 제어
/>`}
          </pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h4 className="text-white text-lg font-semibold mb-3">🔧 CircularSegment 컴포넌트 className Props</h4>
          <pre className="text-sm overflow-x-auto">
            {`<CircularSegment
  id="custom-segment"
  centerX={150}
  centerY={150}
  radius={100}
  startAngle={0}
  endAngle={60}
  title="CUSTOM"
  subtitle="Segment"
  icon="🎨"
  color="#ff6b35"
  // className props
  className="hover:scale-110 transition-transform duration-300"
  segmentClassName="drop-shadow-lg"
  shadowClassName="opacity-60"
  titleClassName="font-black text-lg"
  subtitleClassName="font-light italic"
  iconClassName="text-2xl"
/>`}
          </pre>
        </div>

        <div className="space-y-8 mb-6">
          {/* Box Props 표 - 개선된 레이아웃 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-xl font-bold text-blue-800 mb-4">📦 Box className Props</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/3">Props</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">적용 영역</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">className</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (기본 스타일)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">containerClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (추가 스타일)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">textClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">텍스트 span 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">borderClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">내부 콘텐츠 영역 (테두리)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">
                        backgroundClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">내부 콘텐츠 영역 (배경)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">shadowClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (그림자)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">zIndex</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">z-index 값 (숫자)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* InfoBox Props 표 - 개선된 레이아웃 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-xl font-bold text-green-800 mb-4">📋 InfoBox className Props</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/3">Props</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">적용 영역</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">className</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (기본 스타일)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">
                        containerClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (추가 스타일)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">numberClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">번호 영역 div (왼쪽 정사각형)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">titleClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">제목 h3 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">
                        descriptionClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">설명 p 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">contentClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">내용 영역 div (오른쪽 영역)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">
                        backgroundClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">메인 박스 컨테이너 (배경)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">borderClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">메인 박스 컨테이너 (테두리)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">shadowClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">최외부 컨테이너 (그림자)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-green-600 bg-green-50 px-2 py-1 rounded font-medium">zIndex</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">z-index 값 (숫자)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CircularSegment Props 표 - 개선된 레이아웃 */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
            <h4 className="text-xl font-bold text-orange-800 mb-4">🔄 CircularSegment className Props</h4>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/3">Props</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">적용 영역</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">className</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">전체 SVG g 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        segmentClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">메인 세그먼트 path 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        shadowClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">그림자 path 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">titleClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">제목 text 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">
                        subtitleClassName
                      </code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">부제목 text 요소</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <code className="text-orange-600 bg-orange-50 px-2 py-1 rounded font-medium">iconClassName</code>
                    </td>
                    <td className="py-3 px-4 text-gray-700">아이콘 text 요소</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-400 p-4">
          <h4 className="font-medium text-cyan-800 mb-2">💡 Tailwind CSS 커스터마이징 팁</h4>
          <ul className="text-sm text-cyan-700 space-y-1">
            <li>
              • <strong>🔧 정확한 적용:</strong> 각 className props는 특정 HTML/SVG 요소에만 적용됩니다 (위 표 참조)
            </li>
            <li>
              • <strong>📦 Box 구조:</strong> 최외부 컨테이너 → 내부 콘텐츠 → 텍스트 span 3단계 구조입니다
            </li>
            <li>
              • <strong>📋 InfoBox 구조:</strong> 최외부 → 메인 박스 → 번호 영역 + 내용 영역으로 나뉩니다
            </li>
            <li>
              • <strong>🔄 CircularSegment:</strong> SVG 요소들에 적용되므로 일반 CSS와 다를 수 있습니다
            </li>
            <li>
              • <strong>z-index 관리:</strong> <code>zIndex</code> props로 요소 겹침 순서를 명시적으로 제어하세요
            </li>
            <li>
              • <strong>호버 효과:</strong> <code>hover:</code> 접두사로 인터랙티브한 UX를 만드세요
            </li>
            <li>
              • <strong>조합 사용:</strong> 여러 className props를 조합하여 복잡한 디자인을 구현하세요
            </li>
            <li>
              • <strong>🚫 주의사항:</strong> 같은 CSS 속성은 나중에 적용된 className이 우선됩니다
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoxSection;
