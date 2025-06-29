import { ImageBox } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

// 🎨 SVG 아이콘 상수 분리
const ICONS = {
  sensor: `<svg viewBox="0 0 24 24" fill="#3B82F6"><circle cx="12" cy="12" r="8" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="8" fill="white">센서</text></svg>`,
  motor: `<svg viewBox="0 0 24 24" fill="#10B981"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="6" fill="white">모터</text></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="#F59E0B"><rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="7" fill="white">CPU</text></svg>`,
  cover: `<svg viewBox="0 0 24 24" fill="#EF4444"><rect x="2" y="6" width="20" height="12" rx="2" stroke="white" stroke-width="2"/><text x="12" y="16" text-anchor="middle" font-size="6" fill="white">COVER</text></svg>`,
};

// 📋 Props 테이블 데이터
const PROPS_DATA = [
  // 기본 Props
  { name: "id", type: "string", default: '""', desc: "고유 식별자", category: "basic" },
  { name: "x, y", type: "number", default: "0", desc: "위치 좌표 (픽셀)", category: "basic" },
  { name: "width, height", type: "number", default: "100, 80", desc: "박스 크기 (픽셀)", category: "basic" },
  { name: "text", type: "string", default: '""', desc: "표시할 텍스트", category: "basic" },
  {
    name: "icon",
    type: "string",
    default: "baseImage",
    desc: "SVG 문자열, 이미지 URL, 또는 이모지",
    category: "basic",
  },
  { name: "iconType", type: "string", default: '"image"', desc: "'svg', 'image', 'emoji'", category: "basic" },

  // 이미지 크기 조절 Props
  {
    name: "🆕 imageWidth",
    type: "number | null",
    default: "null",
    desc: "이미지 절대 너비 (픽셀) - null이면 자동 크기",
    category: "image",
  },
  {
    name: "🆕 imageHeight",
    type: "number | null",
    default: "null",
    desc: "이미지 절대 높이 (픽셀) - null이면 자동 크기",
    category: "image",
  },
  { name: "🆕 imageScale", type: "number", default: "1", desc: "이미지 크기 비율 (0.1 ~ 2.0)", category: "image" },
  { name: "🆕 imagePadding", type: "number", default: "8", desc: "이미지 주변 여백 (픽셀)", category: "image" },
  {
    name: "🆕 imageObjectFit",
    type: "string",
    default: '"contain"',
    desc: "'contain', 'cover', 'fill', 'scale-down', 'none'",
    category: "image",
  },

  // 텍스트 위치 설정 Props
  {
    name: "🆕 textPosition",
    type: "string",
    default: '"bottom"',
    desc: "텍스트 위치 ('top', 'bottom', 'left', 'right')",
    category: "text",
  },
  {
    name: "🆕 textClassName",
    type: "string",
    default: '"text-xs..."',
    desc: "텍스트 TailwindCSS 클래스",
    category: "text",
  },
  { name: "🆕 textSpacing", type: "number", default: "4", desc: "텍스트와 박스 사이 간격 (px)", category: "text" },
  {
    name: "🆕 textMaxWidth",
    type: "number | null",
    default: "null",
    desc: "텍스트 최대 너비 (px), null이면 박스 너비 사용",
    category: "text",
  },
  {
    name: "🆕 textAlign",
    type: "string",
    default: '"center"',
    desc: "텍스트 정렬 ('left', 'center', 'right')",
    category: "text",
  },

  // 드래그 기능 Props
  {
    name: "🆕 draggable",
    type: "boolean",
    default: "false",
    desc: "드래그 가능 여부. 우상단에 드래그 표시 아이콘 추가됨",
    category: "drag",
  },
  {
    name: "🆕 initialX",
    type: "number",
    default: "0",
    desc: "초기 X 좌표 (드래그 기능 사용 시 권장)",
    category: "drag",
  },
  {
    name: "🆕 initialY",
    type: "number",
    default: "0",
    desc: "초기 Y 좌표 (드래그 기능 사용 시 권장)",
    category: "drag",
  },
  {
    name: "🆕 onDrag",
    type: "function",
    default: "null",
    desc: "드래그 중 실시간 콜백. (position, info) => void",
    category: "drag",
  },
  {
    name: "🆕 onDragEnd",
    type: "function",
    default: "null",
    desc: "드래그 완료 시 콜백. 최종 위치에서 호출됨",
    category: "drag",
  },

  // 반짝이는 효과 Props
  {
    name: "🆕 sparkle",
    type: "boolean",
    default: "false",
    desc: "반짝이는 애니메이션 효과 활성화 여부",
    category: "sparkle",
  },
  {
    name: "🆕 sparkleColor",
    type: "string",
    default: '"#FFD700"',
    desc: "반짝이는 효과의 색상 (HEX 코드)",
    category: "sparkle",
  },
  {
    name: "🆕 sparkleIntensity",
    type: "string",
    default: '"medium"',
    desc: "반짝이는 강도 ('low', 'medium', 'high')",
    category: "sparkle",
  },

  // 기타 Props
  { name: "className", type: "string", default: '"bg-gray..."', desc: "TailwindCSS 클래스", category: "other" },
  { name: "onClick", type: "function", default: "null", desc: "클릭 이벤트 핸들러", category: "other" },
];

// 🎨 카테고리별 스타일
const CATEGORY_STYLES = {
  basic: { bg: "hover:bg-gray-50", code: "bg-gray-100", text: "text-gray-700" },
  image: { bg: "hover:bg-green-50 bg-green-25", code: "bg-green-100 text-green-800", text: "text-gray-600" },
  text: { bg: "hover:bg-blue-50 bg-blue-25", code: "bg-blue-100 text-blue-800", text: "text-gray-600" },
  drag: { bg: "hover:bg-purple-50 bg-purple-25", code: "bg-purple-100 text-purple-800", text: "text-gray-600" },
  sparkle: { bg: "hover:bg-yellow-50 bg-yellow-25", code: "bg-yellow-100 text-yellow-800", text: "text-gray-600" },
  other: { bg: "hover:bg-gray-50", code: "bg-gray-100", text: "text-gray-600" },
};

// 📍 텍스트 위치 예제 데이터
const TEXT_POSITION_EXAMPLES = [
  {
    id: "text-position-top",
    x: 50,
    y: 60,
    icon: "🌡️",
    text: "상단 텍스트",
    textPosition: "top",
    textAlign: "center",
    textSpacing: 8,
    textClassName: "text-sm font-bold text-red-600",
    className: "border-2 border-red-500 rounded-lg shadow-md bg-red-50",
    message: "상단 텍스트 클릭! 🔝",
    type: "info",
  },
  {
    id: "text-position-bottom",
    x: 180,
    y: 60,
    icon: "⚙️",
    text: "하단 텍스트",
    textPosition: "bottom",
    textAlign: "center",
    textSpacing: 8,
    textClassName: "text-sm font-bold text-blue-600",
    className: "border-2 border-blue-500 rounded-lg shadow-md bg-blue-50",
    message: "하단 텍스트 클릭! 🔽",
    type: "info",
  },
  {
    id: "text-position-left",
    x: 150,
    y: 180,
    icon: "📊",
    text: "좌측 텍스트",
    textPosition: "left",
    textAlign: "right",
    textSpacing: 12,
    textMaxWidth: 100,
    textClassName: "text-sm font-bold text-green-600",
    className: "border-2 border-green-500 rounded-lg shadow-md bg-green-50",
    message: "좌측 텍스트 클릭! ◀️",
    type: "success",
  },
  {
    id: "text-position-right",
    x: 280,
    y: 180,
    icon: "🔧",
    text: "우측 텍스트",
    textPosition: "right",
    textAlign: "left",
    textSpacing: 12,
    textMaxWidth: 100,
    textClassName: "text-sm font-bold text-purple-600",
    className: "border-2 border-purple-500 rounded-lg shadow-md bg-purple-50",
    message: "우측 텍스트 클릭! ▶️",
    type: "info",
  },
];

// ✨ 반짝이는 효과 예제 데이터
const SPARKLE_EXAMPLES = [
  {
    id: "sparkle-low",
    x: 50,
    y: 60,
    icon: "💎",
    text: "저강도 반짝임",
    sparkleIntensity: "low",
    sparkleColor: "#3B82F6",
    textClassName: "text-xs font-medium text-blue-600",
    className: "border-2 border-blue-500 rounded-lg shadow-md bg-blue-50",
    message: "저강도 반짝임 클릭! 💎",
    type: "info",
  },
  {
    id: "sparkle-medium",
    x: 150,
    y: 60,
    icon: "⭐",
    text: "중강도 반짝임",
    sparkleIntensity: "medium",
    sparkleColor: "#FFD700",
    textClassName: "text-xs font-medium text-yellow-600",
    className: "border-2 border-yellow-500 rounded-lg shadow-md bg-yellow-50",
    message: "중강도 반짝임 클릭! ⭐",
    type: "warning",
  },
  {
    id: "sparkle-high",
    x: 250,
    y: 60,
    icon: "🔥",
    text: "고강도 반짝임",
    sparkleIntensity: "high",
    sparkleColor: "#EF4444",
    textClassName: "text-xs font-medium text-red-600",
    className: "border-2 border-red-500 rounded-lg shadow-md bg-red-50",
    message: "고강도 반짝임 클릭! 🔥",
    type: "error",
  },
];

// 🚀 드래그 가능한 예제 데이터
const DRAGGABLE_EXAMPLES = [
  {
    id: "draggable-1",
    x: 50,
    y: 180,
    width: 90,
    height: 70,
    icon: "🚀",
    text: "드래그 가능!",
    textPosition: "right",
    textAlign: "left",
    textSpacing: 10,
    textMaxWidth: 100,
    textClassName: "text-sm font-bold text-indigo-600",
    sparkleColor: "#6366F1",
    className: "border-2 border-indigo-500 rounded-lg shadow-md bg-indigo-50",
    message: "드래그 가능한 박스 클릭! 🚀",
  },
  {
    id: "draggable-2",
    x: 200,
    y: 180,
    width: 90,
    height: 70,
    icon: "🎯",
    text: "이동 가능",
    textPosition: "top",
    textAlign: "center",
    textSpacing: 8,
    textClassName: "text-sm font-bold text-green-600",
    sparkleColor: "#10B981",
    sparkleIntensity: "low",
    className: "border-2 border-green-500 rounded-lg shadow-md bg-green-50",
    message: "타겟 박스 클릭! 🎯",
    dragMessage: "타겟 이동",
  },
  {
    id: "draggable-3",
    x: 320,
    y: 180,
    width: 80,
    height: 60,
    icon: "🎨",
    text: "자유롭게 움직여보세요",
    textPosition: "left",
    textAlign: "right",
    textSpacing: 12,
    textMaxWidth: 120,
    textClassName: "text-xs font-medium text-purple-600 leading-tight",
    sparkleColor: "#A855F7",
    sparkleIntensity: "high",
    className: "border-2 border-purple-500 rounded-lg shadow-md bg-purple-50",
    message: "아트 박스 클릭! 🎨",
    dragMessage: "아트 위치",
  },
];

// 🎨 기존 라이브 예제 데이터
const LIVE_EXAMPLES = [
  {
    id: "demo-image1",
    x: 30,
    y: 30,
    width: 80,
    height: 60,
    icon: ICONS.sensor,
    iconType: "svg",
    text: "온도센서",
    className: "border-2 border-blue-500 rounded-lg shadow-md",
    message: "온도센서 클릭! 🌡️",
    type: "info",
  },
  {
    id: "demo-image2",
    x: 180,
    y: 30,
    width: 120,
    height: 60,
    icon: ICONS.motor,
    iconType: "svg",
    text: "구동모터",
    imageScale: 0.7,
    imagePadding: 15,
    className: "border-2 border-emerald-500 rounded-lg shadow-md",
    message: "구동모터 클릭! ⚙️",
    type: "success",
  },
  {
    id: "demo-image3",
    x: 350,
    y: 30,
    width: 100,
    height: 80,
    icon: ICONS.cpu,
    iconType: "svg",
    text: "제어CPU",
    imageWidth: 50,
    imageHeight: 50,
    imagePadding: 20,
    className: "border-2 border-amber-500 rounded-lg shadow-md",
    message: "제어CPU 클릭! 💻",
    type: "warning",
  },
  {
    id: "demo-image4",
    x: 105,
    y: 140,
    width: 140,
    height: 70,
    icon: "🔋",
    iconType: "emoji",
    text: "리튬배터리",
    imageScale: 1.8,
    imagePadding: 10,
    className: "border-2 border-purple-500 rounded-lg shadow-md",
    message: "리튬배터리 클릭! 🔋",
    type: "info",
  },
  {
    id: "demo-image5",
    x: 300,
    y: 140,
    width: 120,
    height: 80,
    icon: ICONS.cover,
    iconType: "svg",
    text: "커버 모드",
    imageObjectFit: "cover",
    imagePadding: 5,
    className: "border-2 border-red-500 rounded-lg shadow-md",
    message: "커버 모드 클릭! 📐",
    type: "error",
  },
];

// 🎨 추가 이모지 예제 데이터
const ADDITIONAL_EMOJI_EXAMPLES = [
  {
    id: "demo-image6",
    x: 50,
    y: 250,
    icon: "⚙️",
    text: "설정",
    message: "설정 클릭! ⚙️",
    type: "info",
    imageScale: 1.2,
  },
  {
    id: "demo-image7",
    x: 150,
    y: 250,
    icon: "🌡️",
    text: "온도",
    message: "온도 클릭! 🌡️",
    type: "warning",
    className: "border-2 border-orange-500 rounded-lg shadow-md",
    imageScale: 1.4,
  },
  {
    id: "demo-image8",
    x: 250,
    y: 250,
    icon: "💨",
    text: "압력",
    message: "압력 클릭! 💨",
    type: "info",
    className: "border-2 border-cyan-500 rounded-lg shadow-md",
    imageScale: 1.3,
  },
];

// 🎯 이미지 피팅 모드 설명 데이터
const FITTING_MODES = [
  { mode: "contain (기본값)", desc: "이미지 전체가 보이도록 비율을 유지하며 박스에 맞춤" },
  { mode: "cover", desc: "박스를 완전히 채우도록 이미지를 크롭" },
  { mode: "fill", desc: "박스에 맞게 이미지를 늘림 (비율 무시)" },
  { mode: "scale-down", desc: "contain과 none 중 더 작은 크기 선택" },
];

// 💡 사용 팁 데이터
const USAGE_TIPS = [
  { title: "절대 크기 제어", desc: "imageWidth, imageHeight로 정확한 픽셀 크기 지정" },
  { title: "비율 조절", desc: "imageScale로 박스 대비 이미지 크기 비율 조정 (0.1 ~ 2.0)" },
  { title: "여백 조정", desc: "imagePadding으로 이미지와 테두리 사이 여백 조절" },
  { title: "피팅 방식", desc: "imageObjectFit으로 이미지가 박스에 맞춰지는 방식 선택" },
  { title: "반응형 호버", desc: "마우스 호버 시 이미지가 10% 확대되는 애니메이션 효과" },
  { title: "다양한 타입", desc: "이미지, SVG, 이모지 모두 동일한 크기 조절 기능 지원" },
  { title: "네트워크 독립성", desc: "이모지와 인라인 SVG 사용으로 안정적인 표시 보장" },
];

// 📦 공통 컴포넌트들
const ExampleContainer = ({ title, height = "h-80", children, tip }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <div className={`relative w-full ${height} border border-gray-200 rounded bg-gray-50 p-8`}>{children}</div>
    {tip && <p className="text-sm text-gray-600 mt-2">{tip}</p>}
  </div>
);

const PropRow = ({ prop, styles }) => (
  <tr className={styles.bg}>
    <td className="py-3 px-4">
      <code className={`text-sm ${styles.code} px-2 py-1 rounded`}>{prop.name}</code>
    </td>
    <td className="py-3 px-4">
      <span className="text-orange-600 font-medium">{prop.type}</span>
    </td>
    <td className="py-3 px-4">
      <code className="text-sm bg-gray-100 px-1 rounded">{prop.default}</code>
    </td>
    <td className={`py-3 px-4 text-sm ${styles.text}`}>{prop.desc}</td>
  </tr>
);

const ImageBoxSection = () => {
  const { addToast } = useToast();

  const handleDragEnd = (position, message = "새 위치") => {
    addToast(`${message}: (${Math.round(position.x)}, ${Math.round(position.y)})`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🖼️ ImageBox 컴포넌트</h2>
        <p className="text-gray-600 mb-6">
          아이콘이나 이미지를 포함할 수 있는 박스 컴포넌트입니다. NEW! 이미지 크기 조절 기능 및 텍스트 위치 설정 기능
          추가!**
        </p>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
          <h3 className="text-white text-lg font-semibold mb-3">기본 사용법</h3>
          <pre className="text-sm overflow-x-auto">
            {`// 기본 사용법 (텍스트는 하단 중앙)
<ImageBox
  id="image1"
  x={100}
  y={50}
  width={120}
  height={80}
  text="수소 탱크"
  icon="/path/to/hydrogen-tank.png"
  iconType="image"
  onClick={() => ('수소 탱크 클릭')}
/>

// 🆕 NEW! 텍스트 위치 4방향 설정
<ImageBox
  x={200}
  y={150}
  width={120}
  height={100}
  text="연료전지 스택"
  icon="/path/to/fuel-cell.png"
  iconType="image"
  textPosition="top"                    // 텍스트를 상단에 배치
  textAlign="center"                    // 텍스트 중앙 정렬
  textSpacing={8}                       // 박스와 텍스트 간격 8px
  textClassName="text-sm font-bold text-blue-600"  // 텍스트 스타일
/>

// 🆕 이미지 크기 조절과 함께 사용
<ImageBox
  x={150}
  y={300}
  width={100}
  height={80}
  text="센서 데이터"
  icon={sensorIcon}
  iconType="svg"
  textPosition="bottom"                 // 텍스트를 하단에 배치
  imageScale={0.9}                      // 이미지를 90% 크기로
  imagePadding={15}                     // 15px 여백
/>`}
          </pre>
        </div>

        {/* 🆕 텍스트 위치 설정 예제 */}
        <ExampleContainer title="🆕 텍스트 위치 설정 예제">
          {TEXT_POSITION_EXAMPLES.map((example) => (
            <ImageBox
              key={example.id}
              id={example.id}
              x={example.x}
              y={example.y}
              width={80}
              height={60}
              icon={example.icon}
              iconType="emoji"
              text={example.text}
              textPosition={example.textPosition}
              textAlign={example.textAlign}
              textSpacing={example.textSpacing}
              textMaxWidth={example.textMaxWidth}
              textClassName={example.textClassName}
              className={example.className}
              onClick={() => addToast(example.message, example.type)}
            />
          ))}
        </ExampleContainer>

        {/* ✨ 반짝이는 효과 & 드래그 기능 예제 */}
        <ExampleContainer
          title="✨ 반짝이는 효과 & 드래그 기능 예제"
          tip="💡 팁: 드래그 가능한 박스들을 마우스로 드래그해서 이동시켜보세요! 오른쪽 상단의 작은 점이 드래그 가능 표시입니다."
        >
          {/* 반짝이는 효과 예제들 */}
          {SPARKLE_EXAMPLES.map((example) => (
            <ImageBox
              key={example.id}
              id={example.id}
              x={example.x}
              y={example.y}
              width={80}
              height={60}
              icon={example.icon}
              iconType="emoji"
              text={example.text}
              textPosition="bottom"
              textAlign="center"
              textSpacing={8}
              textClassName={example.textClassName}
              sparkle={true}
              sparkleIntensity={example.sparkleIntensity}
              sparkleColor={example.sparkleColor}
              className={example.className}
              onClick={() => addToast(example.message, example.type)}
            />
          ))}

          {/* 드래그 가능한 예제들 */}
          {DRAGGABLE_EXAMPLES.map((example) => (
            <ImageBox
              key={example.id}
              id={example.id}
              x={example.x}
              y={example.y}
              width={example.width || 80}
              height={example.height || 60}
              icon={example.icon}
              iconType="emoji"
              text={example.text}
              textPosition={example.textPosition}
              textAlign={example.textAlign}
              textSpacing={example.textSpacing}
              textMaxWidth={example.textMaxWidth}
              textClassName={example.textClassName}
              draggable={true}
              sparkle={true}
              sparkleIntensity={example.sparkleIntensity || "medium"}
              sparkleColor={example.sparkleColor}
              className={example.className}
              // onDrag={(position) => console.log("드래그 중:", position)}
              onDragEnd={(position) => handleDragEnd(position, example.dragMessage || "새 위치")}
              onClick={() => addToast(example.message, "info")}
            />
          ))}
        </ExampleContainer>

        {/* 다양한 텍스트 스타일 예제 */}
        <ExampleContainer title="다양한 텍스트 스타일 예제" height="h-64">
          {/* 큰 굵은 텍스트 */}
          <ImageBox
            id="text-style-large"
            x={50}
            y={50}
            width={100}
            height={70}
            icon={ICONS.cpu}
            iconType="svg"
            text="CPU 모듈"
            textPosition="bottom"
            textAlign="center"
            textSpacing={6}
            textClassName="text-lg font-black text-yellow-600 tracking-wide"
            className="border-2 border-yellow-500 rounded-lg shadow-md"
            onClick={() => addToast("큰 텍스트 클릭! 📏", "warning")}
          />

          {/* 작은 회색 텍스트 */}
          <ImageBox
            id="text-style-small"
            x={200}
            y={50}
            width={90}
            height={70}
            icon="🔋"
            iconType="emoji"
            text="배터리 상태: 정상"
            textPosition="top"
            textAlign="center"
            textSpacing={4}
            textClassName="text-xs text-gray-500 font-light italic"
            className="border-2 border-gray-400 rounded-lg shadow-md"
            onClick={() => addToast("작은 텍스트 클릭! 🔬", "info")}
          />

          {/* 긴 텍스트 + 줄바꿈 */}
          <ImageBox
            id="text-style-long"
            x={330}
            y={50}
            width={80}
            height={70}
            icon="📡"
            iconType="emoji"
            text="통신 모듈 데이터 전송 상태"
            textPosition="right"
            textAlign="left"
            textSpacing={10}
            textMaxWidth={120}
            textClassName="text-sm font-medium text-indigo-600 leading-tight"
            className="border-2 border-indigo-500 rounded-lg shadow-md"
            onClick={() => addToast("긴 텍스트 클릭! 📝", "info")}
          />
        </ExampleContainer>

        {/* 기존 라이브 예제 */}
        <ExampleContainer title="기존 라이브 예제" height="h-96">
          {LIVE_EXAMPLES.map((example) => (
            <ImageBox key={example.id} {...example} onClick={() => addToast(example.message, example.type)} />
          ))}

          {/* 추가 이모지 예제들 */}
          {ADDITIONAL_EMOJI_EXAMPLES.map((example) => (
            <ImageBox
              key={example.id}
              id={example.id}
              x={example.x}
              y={example.y}
              width={70}
              height={60}
              icon={example.icon}
              iconType="emoji"
              text={example.text}
              imageScale={example.imageScale}
              imagePadding={8}
              className={example.className || "border-2 border-gray-500 rounded-lg shadow-md"}
              onClick={() => addToast(example.message, example.type)}
            />
          ))}
        </ExampleContainer>

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
                {PROPS_DATA.map((prop) => (
                  <PropRow key={prop.name} prop={prop} styles={CATEGORY_STYLES[prop.category]} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🆕 이미지 피팅 모드 설명 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border border-green-200">
          <h4 className="text-xl font-bold text-green-800 mb-4">🎯 이미지 피팅 모드</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FITTING_MODES.map((item) => (
              <div key={item.mode} className="bg-white p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-700 mb-2">{item.mode}</h5>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 사용 팁</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            {USAGE_TIPS.map((tip) => (
              <li key={tip.title}>
                • <strong>{tip.title}:</strong> {tip.desc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageBoxSection;
