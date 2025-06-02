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
    description: "Example of connecting multiple boxes simultaneously",
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
/>`,
  },
};
