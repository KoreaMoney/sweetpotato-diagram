# Sweet Diagram - NPM 패키지 사용 가이드

## ✨ 새로운 기능들

### 🔗 AutoConnect (자동 연결)

- **Shift + 박스 클릭**으로 자동 연결 모드 시작
- 다른 지점 클릭으로 자동 연결선 생성
- 스마트한 연결점 계산 및 다양한 연결 스타일
- 실시간 설정 변경 UI

### 📊 Enhanced Box Component

- **세로 텍스트** 지원 (LR, RL 방향)
- 개선된 텍스트 방향 제어

### 🎬 Animation Features

- 연결선 애니메이션 효과
- 부드러운 전환 애니메이션

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

### 1. 컴포넌트 사용

```javascript
import React from "react";
import {
  DiagramProvider,
  Box,
  Connector,
  Arrow,
  Line,
  Triangle,
  Valve,
  ImageBox,
  DraggableBox,
  AutoConnectManager, // 🆕 AutoConnect 기능
} from "sweet-diagram";

function MyDiagram() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider width={800} height={600}>
        <AutoConnectManager showSettingsButton={true}>
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

          {/* 🆕 세로 텍스트 박스 */}
          <Box
            id="vertical-box"
            x={500}
            y={100}
            width={60}
            height={120}
            text="세로텍스트"
            textDirection="vertical"
            verticalDirection="lr"
            className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
          />

          <Connector
            fromBox={{ id: "box1", position: "right" }}
            toBox={{ id: "box2", position: "left" }}
            connectionType="straight"
            arrowDirection="forward"
            strokeWidth={2}
            className="text-gray-600"
            animated={true} // 🆕 애니메이션 효과
          />

          <Triangle x={200} y={300} size={30} color="#ff6b6b" onClick={() => console.log("Triangle clicked")} />

          <Valve x={400} y={150} size={25} isOpen={true} onClick={() => console.log("Valve clicked")} />
        </AutoConnectManager>
      </DiagramProvider>
    </div>
  );
}

export default MyDiagram;
```

### 2. 🆕 AutoConnect 사용

```javascript
import { DiagramProvider, AutoConnectManager, Box, useDiagram } from "sweet-diagram";

function AutoConnectExample() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <DiagramProvider>
        <AutoConnectManager
          showSettingsButton={true}
          settingsProps={{
            position: "right",
            size: "normal",
            theme: "modern",
            compactMode: false,
          }}
        >
          <Box
            id="source"
            x={100}
            y={100}
            width={120}
            height={60}
            text="Source Box"
            className="bg-blue-500 text-white border-2 border-blue-600 rounded-lg"
          />

          <Box
            id="target"
            x={400}
            y={200}
            width={120}
            height={60}
            text="Target Box"
            className="bg-green-500 text-white border-2 border-green-600 rounded-lg"
          />

          {/* 
            사용법:
            1. Shift + 박스 클릭으로 자동 연결 모드 시작
            2. 다른 지점을 클릭하여 연결선 생성
            3. ESC 키로 모드 취소
            4. 연결선 더블클릭으로 제거
          */}
        </AutoConnectManager>
      </DiagramProvider>
    </div>
  );
}
```

### 3. 드래그 가능한 박스 사용

```javascript
import { DiagramProvider, DraggableBox } from "sweet-diagram";

function DraggableDiagram() {
  return (
    <div className="w-full h-full absolute">
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
    </div>
  );
}
```

### 4. Hook 사용

```javascript
import { DiagramProvider, useDiagram, Box, AutoConnectManager } from "sweet-diagram";

function DiagramControls() {
  const {
    boxes,
    addBox,
    removeBox,
    updateBox,
    // 🆕 AutoConnect 관련
    isAutoConnectMode,
    autoConnections,
    startAutoConnect,
    cancelAutoConnect,
    clearAutoConnections,
    autoConnectSettings,
    updateAutoConnectSettings,
  } = useDiagram();

  const handleAddBox = () => {
    const newId = `box-${Date.now()}`;
    addBox(newId, {
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 100,
      height: 60,
    });
  };

  const handleToggleAutoConnect = () => {
    if (isAutoConnectMode) {
      cancelAutoConnect();
    } else {
      // 첫 번째 박스부터 자동 연결 시작
      const firstBox = Array.from(boxes.keys())[0];
      if (firstBox) {
        startAutoConnect(firstBox);
      }
    }
  };

  const handleUpdateSettings = () => {
    updateAutoConnectSettings({
      color: "blue",
      strokeWidth: 4,
      animationType: "dash",
    });
  };

  return (
    <div>
      <button onClick={handleAddBox}>박스 추가</button>
      <p>현재 박스 개수: {boxes.size}</p>

      {/* 🆕 AutoConnect 컨트롤 */}
      <button onClick={handleToggleAutoConnect}>{isAutoConnectMode ? "자동 연결 취소" : "자동 연결 시작"}</button>
      <button onClick={clearAutoConnections}>모든 자동 연결 제거 ({autoConnections.length}개)</button>
      <button onClick={handleUpdateSettings}>연결 스타일 변경</button>

      <p>자동 연결 모드: {isAutoConnectMode ? "활성" : "비활성"}</p>
      <p>자동 연결 개수: {autoConnections.length}개</p>
    </div>
  );
}

function App() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>
        <AutoConnectManager>
          <DiagramControls />
          {/* 다른 다이어그램 컴포넌트들 */}
        </AutoConnectManager>
      </DiagramProvider>
    </div>
  );
}
```

## 사용 가능한 컴포넌트들

### Box

- 기본 박스 컴포넌트
- props: `id`, `x`, `y`, `width`, `height`, `text`, `textDirection` (🆕), `verticalDirection` (🆕), `className`, `onClick`
- 🆕 **세로 텍스트 지원**: `textDirection="vertical"`, `verticalDirection="lr|rl"`

### DraggableBox

- 드래그 가능한 박스
- props: `id`, `initialX`, `initialY`, `width`, `height`, `title`, `color`, `onDrag`

### Connector

- 두 박스를 연결하는 지능형 연결선
- props: `fromBox`, `toBox`, `connectionType`, `arrowDirection`, `strokeWidth`, `className`, `animated` (🆕), `showArrow`, `arrowShape`, `arrowColor`, `bendPoints`
- 🆕 **애니메이션 효과**: `animated={true}`로 연결선 애니메이션 활성화

### 🆕 AutoConnectManager

- 자동 연결 모드를 관리하는 컴포넌트
- props: `showSettingsButton`, `settingsProps`, `children`
- **기능**: Shift + 박스 클릭으로 자동 연결 모드 시작

### 🆕 AutoConnector

- 박스에서 지점으로의 자동 연결선
- props: `id`, `fromBoxId`, `toPoint`, `settings`, `onRemove`
- **기능**: 스마트한 연결점 계산, 다양한 연결 스타일

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

## TypeScript 지원 (도입 예정)

현재 JavaScript로 개발되었으며, TypeScript 지원은 향후 버전에서 제공될 예정입니다.

```javascript
// 현재: JavaScript 사용
import { Box, Connector, DiagramProvider } from "sweet-diagram";

// 향후 예정: TypeScript 지원
// import { BoxProps, ConnectorProps } from "sweet-diagram";
// const MyBox: React.FC<BoxProps> = ({ id, x, y, children }) => {
//   // 타입 안전한 컴포넌트 구현
// };
```

**개발 로드맵**:

- v1.0.0: 완전한 TypeScript 타입 정의 제공 예정
- 현재: JavaScript 기반으로 안정적인 기능 개발 집중

## 주의사항

1. `DiagramProvider`로 모든 다이어그램 컴포넌트를 감싸야 합니다
2. CSS 파일을 반드시 임포트해야 스타일이 적용됩니다
3. React 16.8+ 버전이 필요합니다 (Hooks 사용)
4. peerDependencies로 react와 react-dom이 필요합니다

## 🎉 v0.9.0 주요 업데이트

### ✨ 새로운 기능들

#### 🔗 AutoConnect (자동 연결)

- **Shift + 박스 클릭**으로 자동 연결 모드 시작
- 다른 지점 클릭으로 연결선 자동 생성
- 스마트한 연결점 계산
- 실시간 연결 스타일 설정
- ESC로 모드 취소, 더블클릭으로 연결 제거

#### 📊 Enhanced Box Component

- **세로 텍스트** 지원 (`textDirection="vertical"`)
- **방향 제어** (`verticalDirection="lr|rl"`)
- 더 유연한 텍스트 배치

#### 🎬 Animation Features

- **연결선 애니메이션** (`animated={true}`)
- 부드러운 전환 효과
- 커스터마이징 가능한 애니메이션 설정

### 🛠️ 사용법

```javascript
import { DiagramProvider, AutoConnectManager, Box, Connector } from "sweet-diagram";

function MyDiagram() {
  return (
    <DiagramProvider>
      <AutoConnectManager showSettingsButton={true}>
        {/* 세로 텍스트 박스 */}
        <Box
          id="vertical"
          x={100}
          y={100}
          width={60}
          height={120}
          text="세로텍스트"
          textDirection="vertical"
          verticalDirection="lr"
        />

        {/* 애니메이션 연결선 */}
        <Connector
          fromBox={{ id: "box1", position: "right" }}
          toBox={{ id: "box2", position: "left" }}
          animated={true}
        />
      </AutoConnectManager>
    </DiagramProvider>
  );
}
```

### 🎯 마이그레이션 가이드

기존 v0.4.x에서 v0.9.0으로 업그레이드 시:

1. **AutoConnect 사용**을 위해 `AutoConnectManager`로 감싸기
2. **애니메이션 효과** 원할 시 `animated={true}` 추가
3. **세로 텍스트** 필요시 관련 props 추가

**기존 코드는 호환성을 유지**하므로 점진적 마이그레이션 가능합니다.

## 예제 프로젝트

더 많은 예제는 [공식 문서](https://sweetpotato-diagram.vercel.app)에서 확인할 수 있습니다.
