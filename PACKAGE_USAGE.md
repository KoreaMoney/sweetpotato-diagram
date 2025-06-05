# Sweet Diagram - NPM 패키지 사용 가이드

## 설치

```bash
npm install sweet-diagram
# 또는
yarn add sweet-diagram
```

### TailwindCSS v4 설치 (필수)

이 패키지는 TailwindCSS v4를 사용합니다:

```bash
npm install tailwindcss@latest @tailwindcss/postcss
```

PostCSS 설정 (`postcss.config.js`):

```javascript
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

**또는** Vite 사용시 (`vite.config.js`):

```javascript
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

CSS 파일에 Tailwind 임포트:

```css
@import "tailwindcss";

/* 커스텀 테마 설정 (선택사항) */
@theme {
  --color-brand: #b4d455;
  --font-display: "Inter", sans-serif;
}
```

**주요 변경사항**:

- ✅ 설정 파일(`tailwind.config.js`) 불필요
- ✅ `content` 배열 자동 감지
- ✅ 더 빠른 빌드 성능
- ✅ CSS-first 설정 방식

## 기본 사용법

### 1. CSS 스타일 임포트

```javascript
// CSS 스타일을 임포트합니다
import "sweet-diagram/dist/sweet-diagram.css";
```

### 2. 컴포넌트 사용

```javascript
import React from "react";
import { DiagramProvider, Box, Connector, Arrow, Line, Triangle, Valve, ImageBox, DraggableBox } from "sweet-diagram";

function MyDiagram() {
  return (
    <DiagramProvider width={800} height={600}>
      <Box
        id="box1"
        x={100}
        y={100}
        width={120}
        height={80}
        text="박스 1"
        className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
      />

      <Box
        id="box2"
        x={300}
        y={200}
        width={120}
        height={80}
        text="박스 2"
        className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
      />

      <Connector
        fromBox={{ id: "box1", position: "right" }}
        toBox={{ id: "box2", position: "left" }}
        connectionType="straight"
        arrowDirection="forward"
        strokeWidth={2}
        className="text-gray-600"
        animated={true}
      />

      <Triangle x={200} y={300} size={30} color="#ff6b6b" onClick={() => console.log("Triangle clicked")} />

      <Valve x={400} y={150} size={25} isOpen={true} onClick={() => console.log("Valve clicked")} />
    </DiagramProvider>
  );
}

export default MyDiagram;
```

### 3. 드래그 가능한 박스 사용

```javascript
import { DiagramProvider, DraggableBox } from "sweet-diagram";

function DraggableDiagram() {
  return (
    <DiagramProvider>
      <DraggableBox
        id="draggable1"
        initialX={100}
        initialY={100}
        width={100}
        height={60}
        title="드래그하세요"
        color="purple"
      />
    </DiagramProvider>
  );
}
```

### 4. Hook 사용

```javascript
import { DiagramProvider, useDiagram, Box } from "sweet-diagram";

function DiagramControls() {
  const { boxes, addBox, removeBox, updateBox } = useDiagram();

  const handleAddBox = () => {
    const newId = `box-${Date.now()}`;
    addBox(newId, {
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 100,
      height: 60,
    });
  };

  return (
    <div>
      <button onClick={handleAddBox}>박스 추가</button>
      <p>현재 박스 개수: {boxes.size}</p>
    </div>
  );
}

function App() {
  return (
    <DiagramProvider>
      <DiagramControls />
      {/* 다른 다이어그램 컴포넌트들 */}
    </DiagramProvider>
  );
}
```

## 사용 가능한 컴포넌트들

### Box

- 기본 박스 컴포넌트
- props: `id`, `x`, `y`, `width`, `height`, `text`, `className`, `onClick`

### DraggableBox

- 드래그 가능한 박스
- props: `id`, `initialX`, `initialY`, `width`, `height`, `title`, `color`, `onDrag`

### Connector

- 두 박스를 연결하는 지능형 연결선
- props: `fromBox`, `toBox`, `connectionType`, `arrowDirection`, `strokeWidth`, `className`, `animated`, `showArrow`, `arrowShape`, `arrowColor`, `bendPoints`

### Arrow

- 화살표 컴포넌트
- props: `from`, `to`, `color`, `strokeWidth`, `arrowSize`

### Line

- 기본 선 컴포넌트
- props: `from`, `to`, `color`, `strokeWidth`

### Triangle

- 삼각형 컴포넌트
- props: `x`, `y`, `size`, `color`, `rotation`, `onClick`

### Valve

- 밸브 컴포넌트
- props: `x`, `y`, `size`, `isOpen`, `onClick`

### ImageBox

- 이미지가 포함된 박스
- props: `id`, `x`, `y`, `width`, `height`, `src`, `alt`, `draggable`

### DiagramProvider

- 모든 다이어그램 컴포넌트를 감싸는 컨텍스트 제공자
- props: `children`, `width`, `height`

## 스타일링

라이브러리는 TailwindCSS를 사용하므로, 프로젝트에 TailwindCSS가 설정되어 있으면 더 나은 스타일링이 가능합니다.

```javascript
// TailwindCSS 클래스 사용 예시
<Box id="styled-box" x={100} y={100}>
  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg">멋진 박스</div>
</Box>
```

## TypeScript 지원

TypeScript를 사용하는 경우, 타입 정의가 자동으로 제공됩니다:

```typescript
import { BoxProps, ConnectorProps } from "sweet-diagram";

const MyBox: React.FC<BoxProps> = ({ id, x, y, children }) => {
  // 타입 안전한 컴포넌트 구현
};
```

## 주의사항

1. `DiagramProvider`로 모든 다이어그램 컴포넌트를 감싸야 합니다
2. CSS 파일을 반드시 임포트해야 스타일이 적용됩니다
3. React 16.8+ 버전이 필요합니다 (Hooks 사용)
4. peerDependencies로 react와 react-dom이 필요합니다

## 예제 프로젝트

더 많은 예제는 [공식 문서](https://sweetpotato-diagram.vercel.app)에서 확인할 수 있습니다.
