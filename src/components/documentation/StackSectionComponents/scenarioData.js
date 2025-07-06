export const scenarios = [
  {
    id: "basic-zindex",
    number: "1️⃣",
    title: "기본 Z-Index 설정",
    badge: { text: "기초", color: "green" },
    filename: "basic-zindex.jsx",
    description: "기본 z-index로 초기 순서 설정",
    code: `// 기본 z-index로 초기 순서 설정
<Box x={50} y={50} zIndex={1}>배경 박스</Box>
<Box x={80} y={80} zIndex={5}>중간 박스</Box>
<Box x={110} y={110} zIndex={10}>맨 앞 박스</Box>`,
  },
  {
    id: "priority-system",
    number: "2️⃣",
    title: "Priority로 고정 순서 설정",
    badge: { text: "고급", color: "blue" },
    filename: "priority-system.jsx",
    description: "priority가 높을수록 위에 표시 (zIndex보다 우선)",
    code: `// priority가 높을수록 위에 표시 (zIndex보다 우선)
<Box x={100} y={100} priority={20}>
  항상 가장 위에 (priority 20)
</Box>
<Box x={130} y={130} priority={15} zIndex={100}>
  priority가 zIndex보다 우선 (priority 15)
</Box>
<Box x={160} y={160} zIndex={50}>
  일반 zIndex 박스
</Box>`,
  },
  {
    id: "maintain-priority",
    number: "3️⃣",
    title: "클릭해도 순서 변경 안됨",
    badge: { text: "고정", color: "purple" },
    filename: "maintain-priority.jsx",
    description: "maintainPriority로 클릭 시 순서 변경 방지",
    code: `// maintainPriority로 클릭 시 순서 변경 방지
<Box 
  x={200} 
  y={200}
  priority={100}
  maintainPriority={true}
>
  고정 최상위 박스 (클릭해도 변화없음)
</Box>

<ImageBox 
  x={250} 
  y={250}
  src="/important-icon.png"
  priority={90}
  maintainPriority={true}
  onClick={() => console.log('고정 아이콘 클릭')}
/>`,
  },
  {
    id: "layer-system",
    number: "4️⃣",
    title: "혼합 사용 - 레이어 시스템",
    badge: { text: "실무", color: "orange" },
    filename: "layer-system.jsx",
    description: "실제 다이어그램에서의 레이어 시스템",
    code: `// 실제 다이어그램에서의 레이어 시스템
const DiagramWithLayers = () => {
  return (
    <DiagramProvider>
      {/* 배경 레이어 - 클릭 가능하지만 낮은 우선순위 */}
      <Box x={0} y={0} width={400} height={300} zIndex={1}>
        배경 영역
      </Box>
      
      {/* 콘텐츠 레이어 - 일반 클릭 동작 */}
      <Box x={50} y={50} priority={10}>콘텐츠 1</Box>
      <Box x={100} y={100} priority={10}>콘텐츠 2</Box>
      
      {/* UI 레이어 - 항상 최상위 고정 */}
      <ImageBox 
        x={350} 
        y={20}
        src="/close-button.png"
        priority={1000}
        maintainPriority={true}
        onClick={() => handleClose()}
      />
    </DiagramProvider>
  );
};`,
  },
  {
    id: "dynamic-priority",
    number: "5️⃣",
    title: "동적 우선순위 변경",
    badge: { text: "React", color: "red" },
    filename: "dynamic-priority.jsx",
    description: "state를 사용한 동적 우선순위 관리",
    code: `// state를 사용한 동적 우선순위 관리
const [isHighlighted, setIsHighlighted] = useState(false);
const [isLocked, setIsLocked] = useState(false);

return (
  <>
    <Box 
      x={100} 
      y={100}
      priority={isHighlighted ? 100 : 10}
      maintainPriority={isLocked}
      onClick={(info) => {
        console.log('현재 우선순위:', info.priority);
        console.log('현재 z-index:', info.currentZIndex);
        if (!isLocked) {
          setIsHighlighted(!isHighlighted);
        }
      }}
    >
      {isHighlighted ? '⭐ 강조된 박스' : '일반 박스'}
    </Box>
    
    <button onClick={() => setIsLocked(!isLocked)}>
      {isLocked ? '🔒 우선순위 잠금' : '🔓 우선순위 해제'}
    </button>
  </>
);`,
  },
];

export const priorityRules = [
  {
    priority: 1,
    title: "최우선",
    description: "DiagramContext에서 관리하는 동적 z-index (클릭 시 생성)",
    color: "red",
  },
  {
    priority: 2,
    title: "두 번째",
    description: "priority prop (숫자가 높을수록 위에)",
    color: "blue",
    code: "priority",
  },
  {
    priority: 3,
    title: "세 번째",
    description: "zIndex prop (CSS z-index)",
    color: "green",
    code: "zIndex",
  },
  {
    priority: 4,
    title: "최하위",
    description: "컴포넌트 생성 순서",
    color: "gray",
  },
];

export const featureCards = [
  {
    type: "props",
    title: "🔧 Box & ImageBox Props",
    color: "blue",
    items: [
      {
        code: "priority",
        description: "숫자가 높을수록 위에 표시",
      },
      {
        code: "maintainPriority",
        description: "클릭해도 우선순위 유지",
      },
      {
        code: "zIndex",
        description: "기본 z-index 설정",
      },
    ],
  },
  {
    type: "features",
    title: "✨ 기능",
    color: "green",
    items: [
      "클릭 시 자동으로 맨 앞으로 이동",
      "Props 기반 우선순위 고정",
      "실시간 z-index 관리",
      "Box와 ImageBox 모두 지원",
    ],
  },
];

export const usageExamples = [
  {
    title: "Box 컴포넌트",
    color: "blue",
    code: `<Box 
  x={100} 
  y={100}
  priority={10}
  maintainPriority={true}
>
  고정 우선순위 박스
</Box>`,
  },
  {
    title: "ImageBox 컴포넌트",
    color: "purple",
    code: `<ImageBox 
  x={200} 
  y={150}
  src="/image.png"
  priority={5}
  maintainPriority={false}
/>`,
  },
];
