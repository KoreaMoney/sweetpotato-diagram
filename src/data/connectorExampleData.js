// 박스 연결 위치 예제 데이터
export const positionExampleBoxes = [
  {
    id: "center",
    x: 200,
    y: 150,
    width: 100,
    height: 50,
    text: "중앙 박스",
    className:
      "bg-indigo-600 text-white border-indigo-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "top",
    x: 225,
    y: 50,
    width: 50,
    height: 30,
    text: "위",
    className:
      "bg-red-500 text-white border-red-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "right",
    x: 350,
    y: 165,
    width: 50,
    height: 30,
    text: "오른쪽",
    className:
      "bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "bottom",
    x: 225,
    y: 250,
    width: 50,
    height: 30,
    text: "아래",
    className:
      "bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "left",
    x: 100,
    y: 165,
    width: 50,
    height: 30,
    text: "왼쪽",
    className:
      "bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
];

// 복잡한 시스템 예제 데이터
export const systemExampleBoxes = [
  {
    id: "input",
    x: 20,
    y: 50,
    width: 70,
    height: 35,
    text: "입력",
    className:
      "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "process1",
    x: 150,
    y: 50,
    width: 70,
    height: 35,
    text: "처리1",
    className:
      "bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "process2",
    x: 280,
    y: 50,
    width: 70,
    height: 35,
    text: "처리2",
    className:
      "bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "output",
    x: 410,
    y: 50,
    width: 70,
    height: 35,
    text: "출력",
    className:
      "bg-red-500 text-white border-red-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "control",
    x: 150,
    y: 150,
    width: 70,
    height: 35,
    text: "제어",
    className:
      "bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
  {
    id: "monitor",
    x: 280,
    y: 150,
    width: 70,
    height: 35,
    text: "모니터",
    className:
      "bg-pink-600 text-white border-pink-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
  },
];

// 기본 예제 코드 템플릿들
export const codeTemplates = {
  boxStraight: `<DiagramProvider>
  <Box 
    id="box1"
    x={50} 
    y={50} 
    width={80} 
    height={30} 
    text="시작" 
    className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="box2"
    x={200} 
    y={100} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "box1", position: "right" }}
    toBox={{ id: "box2", position: "left" }}
    connectionType="straight"
    className="text-blue-600"
    showArrow={true}
    strokeWidth={2}
  />
</DiagramProvider>`,

  boxOrthogonal: `<DiagramProvider>
  <Box 
    id="boxA"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="A" 
    className="bg-red-500 text-white border-red-700 border-2 rounded-lg text-sm"
  />
  <Box 
    id="boxB"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="B" 
    className="bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "boxA", position: "bottom" }}
    toBox={{ id: "boxB", position: "top" }}
    connectionType="orthogonal"
    stepOffset={30}
    className="text-red-500"
    showArrow={true}
    strokeWidth={2}
  />
</DiagramProvider>`,

  boxCurved: `<DiagramProvider>
  {/* Box 컴포넌트들 */}
  <Box 
    id="start"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="시작" 
    className="bg-purple-600 text-white border-purple-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />
  <Box 
    id="end"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-pink-600 text-white border-pink-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />

  {/* Connector 컴포넌트 - 자동 박스 감지 */}
  <Connector
    fromBox={{ id: "start", position: "right" }}
    toBox={{ id: "end", position: "left" }}
    connectionType="curved"
    className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
    showArrow={true}
    strokeWidth={3}
  />
</DiagramProvider>`,

  autoType: `<DiagramProvider>
  {/* Box 컴포넌트들 */}
  <Box 
    id="auto1"
    x={50} 
    y={30} 
    width={80} 
    height={30} 
    text="A" 
    className="bg-orange-600 text-white border-orange-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />
  <Box 
    id="auto2"
    x={200} 
    y={120} 
    width={80} 
    height={30} 
    text="B" 
    className="bg-yellow-600 text-white border-yellow-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />

  {/* Connector 컴포넌트 - 자동 박스 감지 */}
  <Connector
    fromBox={{ id: "auto1", position: "right" }}
    toBox={{ id: "auto2", position: "top" }}
    connectionType="auto"
    className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
    showArrow={true}
    strokeWidth={2}
  />
</DiagramProvider>`,

  animated: `<DiagramProvider>
  {/* Box 컴포넌트들 */}
  <Box 
    id="data"
    x={50} 
    y={50} 
    width={80} 
    height={30} 
    text="데이터" 
    className="bg-teal-600 text-white border-teal-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />
  <Box 
    id="process"
    x={200} 
    y={100} 
    width={80} 
    height={30} 
    text="처리" 
    className="bg-cyan-600 text-white border-cyan-800 border-2 
               rounded-lg text-sm hover:shadow-lg transition-all duration-300"
  />

  {/* Connector 컴포넌트 - 자동 박스 감지 */}
  <Connector
    fromBox={{ id: "data", position: "right" }}
    toBox={{ id: "process", position: "left" }}
    connectionType="straight"
    className="text-teal-500 hover:text-teal-600 transition-colors duration-200"
    showArrow={true}
    strokeWidth={3}
    animated={true}
  />
</DiagramProvider>`,
};

// 그리드 예제 데이터
export const gridExamples = [
  {
    id: "straight",
    title: "1. 직선 연결 (박스 방식)",
    boxes: [
      {
        id: "straight-start",
        x: 10,
        y: 40,
        width: 80,
        height: 30,
        text: "시작",
        className:
          "bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "straight-end",
        x: 150,
        y: 40,
        width: 80,
        height: 30,
        text: "끝",
        className:
          "bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "straight-start", position: "right" },
      toBox: { id: "straight-end", position: "left" },
      connectionType: "straight",
      className: "text-gray-500 hover:text-gray-600 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 2,
    },
    description: 'fromBox.position="right" → toBox.position="left"',
  },
  {
    id: "orthogonal",
    title: "2. 직교 연결 (박스 방식)",
    boxes: [
      {
        id: "ortho-start",
        x: 10,
        y: 20,
        width: 80,
        height: 30,
        text: "A",
        className:
          "bg-red-500 text-white border-red-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "ortho-end",
        x: 150,
        y: 80,
        width: 80,
        height: 30,
        text: "B",
        className:
          "bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "ortho-start", position: "bottom" },
      toBox: { id: "ortho-end", position: "top" },
      connectionType: "orthogonal",
      stepOffset: 30,
      className: "text-red-500 hover:text-red-600 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 2,
    },
    description: 'fromBox.position="bottom" → toBox.position="top"',
  },
  {
    id: "curved",
    title: "3. 곡선 연결 (박스 방식)",
    boxes: [
      {
        id: "curve-start",
        x: 10,
        y: 20,
        width: 80,
        height: 30,
        text: "시작",
        className:
          "bg-purple-600 text-white border-purple-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "curve-end",
        x: 150,
        y: 80,
        width: 80,
        height: 30,
        text: "끝",
        className:
          "bg-pink-600 text-white border-pink-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "curve-start", position: "right" },
      toBox: { id: "curve-end", position: "left" },
      connectionType: "curved",
      className: "text-purple-600 hover:text-purple-700 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 2,
    },
    description: 'connectionType="curved"',
  },
  {
    id: "auto",
    title: "4. 자동 연결 타입",
    boxes: [
      {
        id: "auto-start",
        x: 10,
        y: 20,
        width: 80,
        height: 30,
        text: "출발",
        className:
          "bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "auto-end",
        x: 180,
        y: 80,
        width: 80,
        height: 30,
        text: "도착",
        className:
          "bg-lime-600 text-white border-lime-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "auto-start", position: "right" },
      toBox: { id: "auto-end", position: "top" },
      connectionType: "auto",
      className: "text-cyan-500 hover:text-cyan-600 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 2,
    },
    description: 'connectionType="auto" (자동으로 orthogonal 선택)',
  },
  {
    id: "offset",
    title: "5. 오프셋 적용",
    boxes: [
      {
        id: "offset-start",
        x: 10,
        y: 50,
        width: 80,
        height: 30,
        text: "A",
        className:
          "bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "offset-end",
        x: 150,
        y: 50,
        width: 80,
        height: 30,
        text: "B",
        className:
          "bg-yellow-600 text-white border-yellow-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "offset-start", position: "right", offset: { x: 0, y: -10 } },
      toBox: { id: "offset-end", position: "left", offset: { x: 0, y: 10 } },
      connectionType: "orthogonal",
      className: "text-orange-500 hover:text-orange-600 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 2,
    },
    description: "offset: { x: 0, y: ±10 }",
  },
  {
    id: "animated",
    title: "6. 애니메이션 (박스 방식)",
    boxes: [
      {
        id: "anim-start",
        x: 10,
        y: 50,
        width: 80,
        height: 30,
        text: "데이터",
        className:
          "bg-teal-600 text-white border-teal-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
      {
        id: "anim-end",
        x: 150,
        y: 50,
        width: 80,
        height: 30,
        text: "처리",
        className:
          "bg-sky-600 text-white border-sky-800 border-2 rounded-lg text-xs hover:shadow-lg transition-all duration-300",
      },
    ],
    connector: {
      fromBox: { id: "anim-start", position: "right" },
      toBox: { id: "anim-end", position: "left" },
      connectionType: "straight",
      className: "text-teal-500 hover:text-teal-600 transition-colors duration-200",
      showArrow: true,
      strokeWidth: 3,
      animated: true,
    },
    description: "animated={true}",
  },
];
