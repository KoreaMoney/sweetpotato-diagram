/**
 * Connector 예제들의 메타데이터 정의
 */

// 난이도별 색상 스타일
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 border-green-200";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Advanced":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

// 애니메이션 타입별 설명
export const getAnimationDescription = (animationType) => {
  switch (animationType) {
    case "electric":
      return "전기 흐름을 표현하는 번개 효과";
    case "water":
      return "물의 흐름을 표현하는 방울 효과";
    case "wind":
      return "바람의 흐름을 표현하는 미세 입자 효과";
    case "gas":
      return "가스의 흐름을 표현하는 버블 효과";
    case "data":
      return "데이터 전송을 표현하는 패킷 효과";
    case "dash":
      return "기본적인 대시 라인 효과";
    default:
      return "애니메이션 없음";
  }
};
// 예제 메타데이터
export const EXAMPLE_METADATA = {
  basic: {
    title: "Basic Box Connection",
    description: "Example of automatically connecting draggable boxes",
    difficulty: "Beginner",
    icon: "🔗",
    supportsAnimation: false,
    code: `<Box
  id="box1"
  x={100}
  y={200}
  width={140}
  height={90}
  text="Start Box"
  className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="box2"
  x={400}
  y={200}
  width={140}
  height={90}
  text="End Box"
  className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-[#0052cc] transition-all duration-300"
/>`,
  },

  curved: {
    title: "Curved Connection",
    description: "Example of connecting with smooth Bezier curves",
    difficulty: "Intermediate",
    icon: "🌊",
    supportsAnimation: true,
    code: `<Box
  id="box1"
  x={200}
  y={150}
  width={140}
  height={90}
  text="Start Point"
  className="bg-black text-white border-gray-800 border-2 rounded-lg"
/>

<Box
  id="box2"
  x={400}
  y={350}
  width={140}
  height={90}
  text="End Point"
  className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "top" }}
  connectionType="curved"
  arrowDirection="forward"
  strokeWidth={4}
  className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
  animated={true}
/>`,
  },

  orthogonal: {
    title: "Orthogonal Connection",
    description: "Example of L-shaped orthogonal connections",
    difficulty: "Intermediate",
    icon: "📐",
    supportsAnimation: false,
    code: `<Box
  id="box1"
  x={100}
  y={150}
  width={140}
  height={90}
  text="Start"
  className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="box2"
  x={400}
  y={320}
  width={140}
  height={90}
  text="End"
  className="bg-gray-200 text-black border-gray-300 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="orthogonal"
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
  orthogonalDirection="horizontal-first"
/>`,
  },

  multiConnection: {
    title: "Multiple Connections",
    description: "Example of connecting multiple boxes with different connection types including custom bending",
    difficulty: "Advanced",
    icon: "🔀",
    supportsAnimation: true,
    code: `<Box
  id="center"
  x={480}
  y={220}
  width={150}
  height={90}
  text="Center"
  className="bg-black text-white border-gray-800 border-2 rounded-lg"
/>

<Box
  id="box1"
  x={500}
  y={100}
  width={120}
  height={70}
  text="Top"
  className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="box2"
  x={700}
  y={220}
  width={120}
  height={70}
  text="Right"
  className="bg-gray-200 text-black border-gray-300 border-2 rounded-lg"
/>

<Box
  id="box3"
  x={500}
  y={380}
  width={120}
  height={70}
  text="Bottom"
  className="bg-[#0066ff] text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="box4"
  x={250}
  y={220}
  width={120}
  height={70}
  text="Left"
  className="bg-purple-600 text-white border-purple-800 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "center", position: "top" }}
  toBox={{ id: "box1", position: "bottom" }}
  connectionType="curved"
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
  animated={true}
/>

<Connector
  fromBox={{ id: "center", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
/>

<Connector
  fromBox={{ id: "center", position: "bottom" }}
  toBox={{ id: "box3", position: "top" }}
  connectionType="orthogonal"
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-[#0066ff] hover:stroke-black transition-all duration-300"
  orthogonalDirection="vertical-first"
  animated={true}
/>

<Connector
  fromBox={{ id: "center", position: "left" }}
  toBox={{ id: "box4", position: "right" }}
  connectionType="custom"
  bendPoints={[
    { x: 450, y: 265 },
    { x: 420, y: 265 },
    { x: 420, y: 180 },
    { x: 330, y: 180 },
    { x: 330, y: 255 },
    { x: 370, y: 255 },
  ]}
  arrowDirection="forward"
  strokeWidth={3}
  className="stroke-purple-600 hover:stroke-purple-800 transition-all duration-300"
  animated={true}
/>`,
  },

  freePoint: {
    title: "자유 포인트 연결",
    description: "박스의 중점이 아닌 자유로운 위치에서 연결하는 고급 기능 예시",
    difficulty: "Advanced",
    icon: "🎯",
    supportsAnimation: true,
    code: `<Box
  id="box1"
  x={400}
  y={200}
  width={140}
  height={80}
  text="Box 1"
  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="box2"
  x={450}
  y={180}
  width={140}
  height={80}
  text="Box 2"
  className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
/>

<Box
  id="box3"
  x={300}
  y={320}
  width={140}
  height={80}
  text="Box 3"
  className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
/>

// 1. 절대 좌표 자유 포인트 연결
<Connector
  fromCustomPoint={{ x: 220, y: 140 }}
  toCustomPoint={{ x: 380, y: 200 }}
  connectionType="curved"
  arrowDirection="forward"
  className="stroke-orange-500"
  strokeWidth={3}
  animated={true}
/>

// 2. 박스 내부 자유 위치 연결 (상대 좌표 0~1)
<Connector
  fromBoxCustom={{ 
    id: "box1", 
    customPoint: { x: 0.8, y: 0.8 } // 박스 우측 하단
  }}
  toBoxCustom={{ 
    id: "box2", 
    customPoint: { x: 0.2, y: 0.2 } // 박스 좌측 상단
  }}
  connectionType="orthogonal"
  arrowDirection="forward"
  className="stroke-red-500"
  strokeWidth={2}
  animated={true}
/>

// 3. 혼합 연결 (박스 position + 자유 포인트)
<Connector
  fromBox={{ id: "box2", position: "bottom" }}
  toCustomPoint={{ x: 370, y: 290 }}
  connectionType="stepped"
  arrowDirection="forward"
  className="stroke-blue-600"
  strokeWidth={2}
  animated={true}
/>

// 4. 박스 자유 위치에서 절대 좌표로 (양방향 화살표)
<Connector
  fromBoxCustom={{ 
    id: "box3", 
    customPoint: { x: 0.1, y: 0.5 } // 박스 좌측 중앙
  }}
  toCustomPoint={{ x: 180, y: 250 }}
  connectionType="curved"
  arrowDirection="both"
  className="stroke-purple-600"
  strokeWidth={3}
  arrowSize={12}
  animated={true}
/>

// 5. 박스 내부 상하 연결
<Connector
  fromBoxCustom={{ 
    id: "box1", 
    customPoint: { x: 0.5, y: 1.0 } // 박스 하단 중앙
  }}
  toBoxCustom={{ 
    id: "box3", 
    customPoint: { x: 0.5, y: 0.0 } // 박스 상단 중앙
  }}
  connectionType="straight"
  arrowDirection="forward"
  className="stroke-indigo-500"
  strokeWidth={2}
  animated={true}
/>`,
  },

  // 애니메이션 예제들
  electricAnimation: {
    title: "전기 흐름 애니메이션",
    description: "전기 흐름을 표현하는 번개와 스파크 효과",
    difficulty: "Intermediate",
    icon: "⚡",
    supportsAnimation: true,
    code: `<Box
  id="powerSource"
  x={100}
  y={200}
  width={120}
  height={80}
  text="전원"
  className="bg-yellow-400 text-black border-yellow-500 border-2 rounded-lg"
/>

<Box
  id="motor"
  x={400}
  y={200}
  width={120}
  height={80}
  text="모터"
  className="bg-blue-600 text-white border-blue-700 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "powerSource", position: "right" }}
  toBox={{ id: "motor", position: "left" }}
  animated={true}
  animationType="electric"
  animationSpeed={1.5}
  connectionType="straight"
  className="text-blue-500"
  strokeWidth={4}
  arrowSize={12}
/>`,
  },

  waterAnimation: {
    title: "물 흐름 애니메이션",
    description: "물 흐름을 표현하는 방울과 파도 효과",
    difficulty: "Intermediate",
    icon: "💧",
    supportsAnimation: true,
    code: `<Box
  id="tank"
  x={100}
  y={150}
  width={120}
  height={100}
  text="저장탱크"
  className="bg-blue-100 text-blue-800 border-blue-300 border-2 rounded-lg"
/>

<Box
  id="pump"
  x={300}
  y={200}
  width={100}
  height={80}
  text="펌프"
  className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
/>

<Box
  id="outlet"
  x={500}
  y={150}
  width={120}
  height={100}
  text="출구"
  className="bg-blue-200 text-blue-800 border-blue-400 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "tank", position: "right" }}
  toBox={{ id: "pump", position: "left" }}
  animated={true}
  animationType="water"
  animationSpeed={2}
  connectionType="curved"
  className="text-blue-600"
  strokeWidth={5}
/>

<Connector
  fromBox={{ id: "pump", position: "right" }}
  toBox={{ id: "outlet", position: "left" }}
  animated={true}
  animationType="water"
  animationSpeed={1.8}
  connectionType="straight"
  className="text-blue-600"
  strokeWidth={5}
/>`,
  },

  windAnimation: {
    title: "바람 흐름 애니메이션",
    description: "바람 흐름을 표현하는 미세 입자 효과",
    difficulty: "Intermediate",
    icon: "💨",
    supportsAnimation: true,
    code: `<Box
  id="fan"
  x={100}
  y={200}
  width={120}
  height={80}
  text="팬"
  className="bg-gray-300 text-gray-800 border-gray-400 border-2 rounded-lg"
/>

<Box
  id="vent"
  x={400}
  y={150}
  width={120}
  height={60}
  text="통풍구"
  className="bg-gray-100 text-gray-700 border-gray-300 border-2 rounded-lg"
/>

<Box
  id="outlet"
  x={400}
  y={250}
  width={120}
  height={60}
  text="배출구"
  className="bg-gray-200 text-gray-700 border-gray-400 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "fan", position: "right" }}
  toBox={{ id: "vent", position: "left" }}
  animated={true}
  animationType="wind"
  animationSpeed={0.8}
  connectionType="curved"
  className="text-gray-500"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "fan", position: "right" }}
  toBox={{ id: "outlet", position: "left" }}
  animated={true}
  animationType="wind"
  animationSpeed={1.2}
  connectionType="curved"
  className="text-gray-400"
  strokeWidth={2}
/>`,
  },

  gasAnimation: {
    title: "가스 흐름 애니메이션",
    description: "가스 흐름을 표현하는 버블과 불규칙 효과",
    difficulty: "Intermediate",
    icon: "🫧",
    supportsAnimation: true,
    code: `<Box
  id="gasSource"
  x={100}
  y={200}
  width={120}
  height={80}
  text="가스공급"
  className="bg-yellow-100 text-yellow-800 border-yellow-300 border-2 rounded-lg"
/>

<Box
  id="valve"
  x={300}
  y={200}
  width={80}
  height={80}
  text="밸브"
  className="bg-orange-400 text-white border-orange-500 border-2 rounded-lg"
/>

<Box
  id="burner"
  x={450}
  y={200}
  width={120}
  height={80}
  text="버너"
  className="bg-red-500 text-white border-red-600 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "gasSource", position: "right" }}
  toBox={{ id: "valve", position: "left" }}
  animated={true}
  animationType="gas"
  animationSpeed={2}
  connectionType="straight"
  className="text-yellow-600"
  strokeWidth={4}
/>

<Connector
  fromBox={{ id: "valve", position: "right" }}
  toBox={{ id: "burner", position: "left" }}
  animated={true}
  animationType="gas"
  animationSpeed={1.5}
  connectionType="straight"
  className="text-orange-500"
  strokeWidth={4}
/>`,
  },

  dataAnimation: {
    title: "데이터 전송 애니메이션",
    description: "데이터 패킷 전송을 표현하는 디지털 효과",
    difficulty: "Intermediate",
    icon: "📡",
    supportsAnimation: true,
    code: `<Box
  id="server"
  x={100}
  y={200}
  width={120}
  height={80}
  text="서버"
  className="bg-green-600 text-white border-green-700 border-2 rounded-lg"
/>

<Box
  id="router"
  x={300}
  y={200}
  width={100}
  height={80}
  text="라우터"
  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="client"
  x={480}
  y={200}
  width={120}
  height={80}
  text="클라이언트"
  className="bg-purple-600 text-white border-purple-700 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "server", position: "right" }}
  toBox={{ id: "router", position: "left" }}
  animated={true}
  animationType="data"
  animationSpeed={1}
  connectionType="straight"
  className="text-green-500"
  strokeWidth={3}
  arrowDirection="both"
/>

<Connector
  fromBox={{ id: "router", position: "right" }}
  toBox={{ id: "client", position: "left" }}
  animated={true}
  animationType="data"
  animationSpeed={1.2}
  connectionType="straight"
  className="text-blue-500"
  strokeWidth={3}
  arrowDirection="both"
/>`,
  },

  animationComparison: {
    title: "애니메이션 비교",
    description: "모든 애니메이션 타입을 한 번에 비교하는 예제",
    difficulty: "Advanced",
    icon: "🎬",
    supportsAnimation: true,
    code: `<Box
  id="source"
  x={50}
  y={250}
  width={100}
  height={60}
  text="공통 소스"
  className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg"
/>

<Box
  id="electric"
  x={300}
  y={50}
  width={100}
  height={50}
  text="전기"
  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
/>

<Box
  id="water"
  x={300}
  y={130}
  width={100}
  height={50}
  text="물"
  className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
/>

<Box
  id="wind"
  x={300}
  y={210}
  width={100}
  height={50}
  text="바람"
  className="bg-gray-400 text-white border-gray-500 border-2 rounded-lg"
/>

<Box
  id="gas"
  x={300}
  y={290}
  width={100}
  height={50}
  text="가스"
  className="bg-yellow-500 text-black border-yellow-600 border-2 rounded-lg"
/>

<Box
  id="data"
  x={300}
  y={370}
  width={100}
  height={50}
  text="데이터"
  className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
/>

<Box
  id="dash"
  x={300}
  y={450}
  width={100}
  height={50}
  text="대시"
  className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "electric", position: "left" }}
  animated={true}
  animationType="electric"
  animationSpeed={1.5}
  connectionType="orthogonal"
  className="text-blue-500"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "water", position: "left" }}
  animated={true}
  animationType="water"
  animationSpeed={2}
  connectionType="orthogonal"
  className="text-cyan-600"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "wind", position: "left" }}
  animated={true}
  animationType="wind"
  animationSpeed={0.8}
  connectionType="straight"
  className="text-gray-500"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "gas", position: "left" }}
  animated={true}
  animationType="gas"
  animationSpeed={1.8}
  connectionType="orthogonal"
  className="text-yellow-600"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "data", position: "left" }}
  animated={true}
  animationType="data"
  animationSpeed={1}
  connectionType="orthogonal"
  className="text-green-500"
  strokeWidth={3}
/>

<Connector
  fromBox={{ id: "source", position: "right" }}
  toBox={{ id: "dash", position: "left" }}
  animated={true}
  animationType="dash"
  animationSpeed={2}
  connectionType="orthogonal"
  className="text-purple-500"
  strokeWidth={3}
/>`,
  },
};
