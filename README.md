# SweetPD - 다이어그램 에디터 컴포넌트

현대적이고 직관적인 React용 다이어그램 에디터 컴포넌트입니다. 드래그 앤 드롭과 인터랙티브한 다이어그램 편집 기능을 제공합니다.

## 🚀 빠른 시작

### 설치

```bash
npm install sweet-diagram
```

### 기본 사용법

```jsx
import React from "react";
import { SweetDiagram, DiagramProvider } from "sweet-diagram";

function App() {
  return (
    <DiagramProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <SweetDiagram />
      </div>
    </DiagramProvider>
  );
}

export default App;
```

## 📦 컴포넌트

### 개별 컴포넌트 사용

```jsx
import { Box, Arrow, Connector, Triangle, Valve, ImageBox, DiagramProvider, useDiagram } from "sweet-diagram";

function CustomDiagram() {
  return (
    <DiagramProvider>
      <div className="w-full h-screen relative">
        {/* 기본 박스 */}
        <Box id="box1" x={100} y={100} width={120} height={60} text="시작" className="bg-blue-500 text-white" />

        {/* 드래그 가능한 박스 */}
        <DraggableBox
          id="dragbox1"
          initialX={300}
          initialY={100}
          width={150}
          height={80}
          title="드래그 가능"
          color="green"
        />

        {/* 연결선 */}
        <Connector
          startPoint={{ x: 220, y: 130 }}
          endPoint={{ x: 300, y: 140 }}
          connectionType="curved"
          showArrow={true}
        />

        {/* 화살표 */}
        <Arrow startPoint={{ x: 100, y: 200 }} endPoint={{ x: 200, y: 200 }} arrowSize={10} />

        {/* 삼각형 */}
        <Triangle x={500} y={100} size={40} direction="up" />

        {/* 밸브 */}
        <Valve x={100} y={300} size={50} type="ball" isOpen={true} />

        {/* 이미지 박스 */}
        <ImageBox id="imgbox1" x={300} y={300} width={100} height={80} text="이미지" icon="🔧" iconType="emoji" />
      </div>
    </DiagramProvider>
  );
}
```

## �� 주요 기능

- **드래그 앤 드롭**: DraggableBox로 직관적인 컴포넌트 조작
- **다양한 도형**: Box, Arrow, Triangle, Valve, Connector 등
- **스마트 연결**: 자동 연결점 감지 및 곡선/직각 연결선
- **상호작용**: 클릭, 드래그, 호버 효과 지원
- **스타일링**: TailwindCSS 기반 완전 커스터마이징
- **상태 관리**: Zustand 기반 효율적인 상태 관리
- **완전한 JavaScript**: TypeScript 없이도 모든 기능 사용 가능

## 🔧 고급 사용법

### 커스텀 훅 사용

```jsx
import { useDiagram } from "sweet-diagram";

function DiagramController() {
  const { registerBox, unregisterBox, updateBoxPosition, getBoxInfo } = useDiagram();

  const handleAddBox = () => {
    const newBox = {
      id: `box-${Date.now()}`,
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 120,
      height: 60,
    };

    registerBox(newBox.id, newBox);
  };

  return (
    <div className="p-4">
      <button onClick={handleAddBox} className="px-4 py-2 bg-blue-500 text-white rounded">
        박스 추가
      </button>
    </div>
  );
}
```

### 이벤트 핸들링

```jsx
function InteractiveDiagram() {
  const handleBoxClick = (event, boxInfo) => {
    console.log("클릭된 박스:", boxInfo);
  };

  const handleDrag = (newPosition) => {
    console.log("드래그 위치:", newPosition);
  };

  return (
    <DiagramProvider>
      <Box id="interactive-box" x={100} y={100} width={150} height={70} text="클릭해보세요" onClick={handleBoxClick} />

      <DraggableBox id="draggable-box" initialX={300} initialY={100} title="드래그해보세요" onDrag={handleDrag} />
    </DiagramProvider>
  );
}
```

## 📋 API 참조

### DiagramProvider

모든 다이어그램 컴포넌트를 감싸는 최상위 Provider입니다.

```jsx
<DiagramProvider>{/* 다이어그램 컴포넌트들 */}</DiagramProvider>
```

### 컴포넌트 Props

#### Box

- `id`: `string` - 고유 식별자
- `x`: `number` - X 좌표 (기본값: 0)
- `y`: `number` - Y 좌표 (기본값: 0)
- `width`: `number` - 박스 너비 (기본값: 120)
- `height`: `number` - 박스 높이 (기본값: 60)
- `text`: `string` - 표시할 텍스트
- `className`: `string` - CSS 클래스
- `onClick`: `function` - 클릭 이벤트 핸들러

#### DraggableBox

- `id`: `string` - 고유 식별자 (필수)
- `initialX`: `number` - 초기 X 좌표 (기본값: 0)
- `initialY`: `number` - 초기 Y 좌표 (기본값: 0)
- `width`: `number` - 박스 너비 (기본값: 120)
- `height`: `number` - 박스 높이 (기본값: 80)
- `title`: `string` - 박스 제목
- `color`: `string` - 색상 테마 ('blue', 'green', 'red', 등)
- `onDrag`: `function` - 드래그 이벤트 핸들러

#### Connector

- `startPoint`: `{x: number, y: number}` - 시작점 좌표
- `endPoint`: `{x: number, y: number}` - 끝점 좌표
- `connectionType`: `string` - 연결 타입 ('straight', 'curved', 'orthogonal')
- `strokeWidth`: `number` - 선 두께 (기본값: 2)
- `showArrow`: `boolean` - 화살표 표시 (기본값: true)
- `animated`: `boolean` - 애니메이션 효과 (기본값: false)

#### Arrow

- `startPoint`: `{x: number, y: number}` - 시작점 좌표
- `endPoint`: `{x: number, y: number}` - 끝점 좌표
- `arrowSize`: `number` - 화살표 크기 (기본값: 8)
- `strokeWidth`: `number` - 선 두께 (기본값: 2)
- `className`: `string` - CSS 클래스

#### Triangle

- `x`: `number` - X 좌표 (기본값: 0)
- `y`: `number` - Y 좌표 (기본값: 0)
- `size`: `number` - 삼각형 크기 (기본값: 40)
- `direction`: `string` - 방향 ('up', 'down', 'left', 'right')
- `className`: `string` - CSS 클래스

#### Valve

- `x`: `number` - X 좌표 (기본값: 0)
- `y`: `number` - Y 좌표 (기본값: 0)
- `size`: `number` - 밸브 크기 (기본값: 40)
- `type`: `string` - 밸브 타입 ('ball', 'gate', 'butterfly')
- `isOpen`: `boolean` - 열림/닫힘 상태 (기본값: false)
- `status`: `string` - 상태 표시 텍스트

#### ImageBox

- `id`: `string` - 고유 식별자
- `x`: `number` - X 좌표 (기본값: 0)
- `y`: `number` - Y 좌표 (기본값: 0)
- `width`: `number` - 박스 너비 (기본값: 100)
- `height`: `number` - 박스 높이 (기본값: 80)
- `text`: `string` - 표시할 텍스트
- `icon`: `string` - 이미지 URL 또는 이모지
- `iconType`: `string` - 아이콘 타입 ('image', 'emoji', 'svg')

## 🎨 스타일링

TailwindCSS 클래스를 사용하여 완전히 커스터마이징할 수 있습니다:

```jsx
<Box
  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 shadow-lg"
  text="커스텀 스타일"
/>
```

## 📖 예제

더 많은 예제는 [Storybook 문서](https://sweetpotato-diagram.vercel.app)에서 확인하실 수 있습니다.

## 🔧 개발 환경

### 요구사항

- Node.js >= 16.0.0
- React >= 16.8.0
- React DOM >= 16.8.0

### 의존성

- `zustand`: 상태 관리
- `lucide-react`: 아이콘

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙋‍♂️ 지원

- 이슈는 [GitHub Issues](https://github.com/KoreaMoney/sweetpotato-diagram/issues)에 등록해주세요
- 문의사항은 이메일로 연락해주세요

---

Made with ❤️ by KimDowon
