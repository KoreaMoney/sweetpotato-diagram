import { Valve } from "../DiagramComponents";
import { useToast } from "../ToastSystem";
import { Wrench, Gauge, ThermometerSun, Settings, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const ValveSection = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚰 Valve 컴포넌트</h2>
        <p className="text-gray-600 mb-6">
          다양한 타입의 밸브를 나타내는 컴포넌트입니다. 수소연료전지 시스템, 유체 제어 시스템 등에서 사용됩니다.
          <span className="text-blue-600 font-semibold ml-2">🆕 NEW! 커스텀 아이콘 및 상태 표시 기능 추가!</span>
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
  
  // 🆕 NEW! 아이콘 기능
  showIcon={true}
  iconPosition="top"
  iconSize={16}
  iconColor="text-emerald-600"
  showStatus={true}
  status="normal"
/>`}
          </pre>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🆕 NEW! 아이콘 및 상태 표시 기능</h3>
          <p className="text-green-700 mb-4">
            이제 밸브에 다양한 아이콘과 상태 표시를 추가할 수 있습니다. 시스템 모니터링과 상태 확인이 더욱 쉬워졌습니다!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 기본 아이콘 예제 */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">🎯 기본 아이콘 표시</h4>
              <div className="relative w-full h-40 bg-gray-50 border border-gray-200 rounded">
                <div className="absolute top-2 left-2 text-xs text-gray-600">기본 아이콘 - 밸브 타입별</div>

                {/* 게이트 밸브 - 아이콘 있음 */}
                <Valve
                  x={50}
                  y={60}
                  size={30}
                  type="gate"
                  isOpen={true}
                  className="text-blue-600"
                  showIcon={true}
                  iconPosition="top"
                  iconSize={16}
                  onClick={() => addToast("게이트 밸브 - 기본 아이콘 표시 🔵", "info")}
                />
                <span className="absolute text-xs text-blue-600" style={{ left: 40, top: 100 }}>
                  Gate
                </span>

                {/* 볼 밸브 - 아이콘 우측 */}
                <Valve
                  x={120}
                  y={60}
                  size={30}
                  type="ball"
                  isOpen={false}
                  className="text-red-600"
                  showIcon={true}
                  iconPosition="right"
                  iconSize={18}
                  onClick={() => addToast("볼 밸브 - 우측 아이콘 🔴", "error")}
                />
                <span className="absolute text-xs text-red-600" style={{ left: 115, top: 100 }}>
                  Ball
                </span>

                {/* 체크 밸브 - 하단 아이콘 */}
                <Valve
                  x={200}
                  y={60}
                  size={30}
                  type="check"
                  isOpen={true}
                  className="text-emerald-600"
                  showIcon={true}
                  iconPosition="bottom"
                  iconSize={14}
                  onClick={() => addToast("체크 밸브 - 하단 아이콘 🟢", "success")}
                />
                <span className="absolute text-xs text-emerald-600" style={{ left: 190, top: 100 }}>
                  Check
                </span>
              </div>
            </div>

            {/* 상태 표시 예제 */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">⚡ 상태 표시 아이콘</h4>
              <div className="relative w-full h-40 bg-gray-50 border border-gray-200 rounded">
                <div className="absolute top-2 left-2 text-xs text-gray-600">상태별 아이콘 표시</div>

                {/* 정상 상태 */}
                <Valve
                  x={40}
                  y={50}
                  size={25}
                  type="gate"
                  isOpen={true}
                  className="text-gray-600"
                  showIcon={true}
                  showStatus={true}
                  status="normal"
                  iconPosition="top-right"
                  iconSize={16}
                  onClick={() => addToast("정상 상태 - 모든 시스템 정상 ✅", "success")}
                />
                <span className="absolute text-xs text-emerald-600" style={{ left: 30, top: 85 }}>
                  정상
                </span>

                {/* 경고 상태 */}
                <Valve
                  x={100}
                  y={50}
                  size={25}
                  type="ball"
                  isOpen={true}
                  className="text-gray-600"
                  showIcon={true}
                  showStatus={true}
                  status="warning"
                  iconPosition="top-left"
                  iconSize={16}
                  onClick={() => addToast("경고 상태 - 주의 필요 ⚠️", "warning")}
                />
                <span className="absolute text-xs text-yellow-500" style={{ left: 90, top: 85 }}>
                  경고
                </span>

                {/* 오류 상태 */}
                <Valve
                  x={160}
                  y={50}
                  size={25}
                  type="check"
                  isOpen={false}
                  className="text-gray-600"
                  showIcon={true}
                  showStatus={true}
                  status="error"
                  iconPosition="bottom-right"
                  iconSize={16}
                  onClick={() => addToast("오류 상태 - 즉시 점검 필요 ❌", "error")}
                />
                <span className="absolute text-xs text-red-500" style={{ left: 150, top: 85 }}>
                  오류
                </span>

                {/* 정비 상태 */}
                <Valve
                  x={220}
                  y={50}
                  size={25}
                  type="butterfly"
                  isOpen={false}
                  className="text-gray-600"
                  showIcon={true}
                  showStatus={true}
                  status="maintenance"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => addToast("정비 상태 - 정비 진행 중 🔧", "info")}
                />
                <span className="absolute text-xs text-blue-500" style={{ left: 205, top: 85 }}>
                  정비
                </span>
              </div>
            </div>
          </div>

          {/* 커스텀 아이콘 예제 */}
          <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">🎨 커스텀 아이콘 사용</h4>
            <div className="relative w-full h-32 bg-gray-50 border border-gray-200 rounded">
              <div className="absolute top-2 left-2 text-xs text-gray-600">커스텀 아이콘으로 특별한 기능 표시</div>

              {/* 온도 센서 밸브 */}
              <Valve
                x={50}
                y={45}
                size={30}
                type="gate"
                isOpen={true}
                className="text-orange-600"
                showIcon={true}
                customIcon={<ThermometerSun className="w-4 h-4" />}
                iconPosition="top"
                iconColor="text-orange-500"
                iconSize={18}
                onClick={() => addToast("온도 센서 밸브 - 현재 온도: 85°C 🌡️", "warning")}
              />
              <span className="absolute text-xs text-orange-600" style={{ left: 35, top: 85 }}>
                온도센서
              </span>

              {/* 압력 게이지 밸브 */}
              <Valve
                x={130}
                y={45}
                size={30}
                type="ball"
                isOpen={true}
                className="text-purple-600"
                showIcon={true}
                customIcon={<Gauge className="w-4 h-4" />}
                iconPosition="right"
                iconColor="text-purple-500"
                iconSize={18}
                onClick={() => addToast("압력 게이지 밸브 - 현재 압력: 350bar 📊", "info")}
              />
              <span className="absolute text-xs text-purple-600" style={{ left: 115, top: 85 }}>
                압력계
              </span>

              {/* 제어 밸브 */}
              <Valve
                x={210}
                y={45}
                size={30}
                type="needle"
                isOpen={false}
                className="text-teal-600"
                showIcon={true}
                customIcon={<Settings className="w-4 h-4" />}
                iconPosition="bottom-left"
                iconColor="text-teal-500"
                iconSize={18}
                onClick={() => addToast("제어 밸브 - 자동 제어 모드 ⚙️", "info")}
              />
              <span className="absolute text-xs text-teal-600" style={{ left: 200, top: 85 }}>
                자동제어
              </span>
            </div>
          </div>

          {/* 아이콘 위치 예제 */}
          <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">📍 아이콘 위치 옵션</h4>
            <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded">
              <div className="absolute top-2 left-2 text-xs text-gray-600">9가지 아이콘 위치 옵션</div>

              {/* 중앙 밸브 */}
              <Valve
                x={150}
                y={80}
                size={40}
                type="gate"
                isOpen={true}
                className="text-gray-600"
                showIcon={true}
                iconPosition="center"
                iconSize={20}
                iconColor="text-red-500"
                onClick={() => addToast("중앙 위치 아이콘 📍", "info")}
              />

              {/* 8방향 아이콘들 */}
              <Valve
                x={110}
                y={40}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="top"
                iconSize={12}
              />
              <Valve
                x={190}
                y={40}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="top-right"
                iconSize={12}
              />
              <Valve
                x={220}
                y={80}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="right"
                iconSize={12}
              />
              <Valve
                x={190}
                y={120}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="bottom-right"
                iconSize={12}
              />
              <Valve
                x={110}
                y={120}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="bottom"
                iconSize={12}
              />
              <Valve
                x={80}
                y={120}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="bottom-left"
                iconSize={12}
              />
              <Valve
                x={50}
                y={80}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="left"
                iconSize={12}
              />
              <Valve
                x={80}
                y={40}
                size={20}
                type="ball"
                isOpen={true}
                showIcon={true}
                iconPosition="top-left"
                iconSize={12}
              />

              {/* 라벨들 */}
              <div className="absolute text-xs text-gray-500" style={{ left: 95, top: 25 }}>
                top
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 195, top: 25 }}>
                top-right
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 225, top: 75 }}>
                right
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 185, top: 145 }}>
                bottom-right
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 100, top: 145 }}>
                bottom
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 45, top: 145 }}>
                bottom-left
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 15, top: 75 }}>
                left
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 65, top: 25 }}>
                top-left
              </div>
              <div className="absolute text-xs text-gray-500" style={{ left: 140, top: 140 }}>
                center
              </div>
            </div>
          </div>

          {/* 코드 예시 */}
          <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">💻 새로운 아이콘 기능 사용 예시</h4>
            <pre className="text-sm overflow-x-auto">
              {`// 기본 아이콘 표시
<Valve
  x={100}
  y={50}
  type="gate"
  isOpen={true}
  showIcon={true}              // 아이콘 표시
  iconPosition="top"           // 위치
  iconSize={16}               // 크기
  iconColor="text-blue-500"   // 색상
/>

// 상태 표시 아이콘
<Valve
  x={200}
  y={50}
  type="ball"
  isOpen={true}
  showIcon={true}
  showStatus={true}           // 상태 아이콘 모드
  status="warning"            // 경고 상태
  iconPosition="top-right"
/>

// 커스텀 아이콘 사용
import { ThermometerSun } from "lucide-react";

<Valve
  x={300}
  y={50}
  type="needle"
  isOpen={true}
  showIcon={true}
  customIcon={<ThermometerSun className="w-4 h-4" />}
  iconPosition="bottom"
  iconColor="text-orange-500"
  iconSize={18}
/>

// 복합 설정 - 오프셋 조절
<Valve
  x={400}
  y={50}
  type="butterfly"
  isOpen={false}
  showIcon={true}
  showStatus={true}
  status="maintenance"
  iconPosition="left"
  iconSize={20}
  iconOffset={12}             // 아이콘 거리 조절
/>`}
            </pre>
          </div>

          <div className="mt-4 bg-green-100 border-l-4 border-green-400 p-4">
            <h4 className="font-medium text-green-800 mb-2">💡 아이콘 기능 사용 팁</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>
                • <strong>기본 아이콘:</strong> showIcon={true}로 밸브 타입별 기본 아이콘 표시
              </li>
              <li>
                • <strong>상태 표시:</strong> showStatus={true}로 운영 상태를 시각적으로 확인
              </li>
              <li>
                • <strong>커스텀 아이콘:</strong> customIcon으로 특별한 기능이나 센서 표시
              </li>
              <li>
                • <strong>위치 조정:</strong> 9가지 위치 옵션으로 레이아웃에 맞게 배치
              </li>
              <li>
                • <strong>크기 조절:</strong> iconSize로 밸브 크기에 비례하여 조정
              </li>
              <li>
                • <strong>색상 독립:</strong> iconColor로 밸브와 다른 색상 적용 가능
              </li>
            </ul>
          </div>
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

                {/* 🆕 NEW! 아이콘 관련 Props */}
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">showIcon</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">false</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 아이콘 표시 여부</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">customIcon</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">JSX</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 커스텀 아이콘 (Lucide 컴포넌트)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">iconPosition</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"top"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">
                    🆕 아이콘 위치 (top, bottom, left, right, top-left, top-right, bottom-left, bottom-right, center)
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">iconSize</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">16</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 아이콘 크기 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">iconColor</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">null</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 아이콘 색상 (TailwindCSS 클래스)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">iconOffset</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">number</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">8</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 아이콘과 밸브 사이의 거리 (픽셀)</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">showStatus</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">boolean</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">false</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">🆕 상태 표시 아이콘 모드</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="py-3 px-4">
                    <code className="text-sm bg-green-100 px-2 py-1 rounded">status</code>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-orange-600 font-medium">string</span>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 px-1 rounded">"normal"</code>
                  </td>
                  <td className="py-3 px-4 text-sm text-green-700">
                    🆕 밸브 상태 (normal, warning, error, maintenance)
                  </td>
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
