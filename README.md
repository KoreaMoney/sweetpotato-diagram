# 🍠 Sweet Diagram v0.4.2

Modern and intuitive React diagram editor components with drag & drop, interactive diagram editing, and advanced automatic connection features.

[![npm version](https://badge.fury.io/js/sweet-diagram.svg)](https://badge.fury.io/js/sweet-diagram)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)

🌐 **Demo**: [https://sweetpotato-diagram.vercel.app](https://sweetpotato-diagram.vercel.app)
📦 **NPM**: [https://www.npmjs.com/package/sweet-diagram](https://www.npmjs.com/package/sweet-diagram)

## ✨ New Features in v0.4.2

### 🔗 Advanced AutoConnect (고급 자동 연결)

- **Shift + 박스 클릭**으로 자동 연결 모드 시작
- 다른 지점 클릭으로 자동 연결선 생성
- 스마트한 연결점 계산 및 다양한 연결 스타일
- 실시간 설정 변경 및 컴팩트한 설정 UI
- 향상된 연결 알고리즘과 충돌 방지 기능

### 📊 Enhanced Box Component

- **세로 텍스트** 완전 지원 (LR, RL 방향)
- 개선된 텍스트 방향 제어 및 렌더링
- 더 유연한 박스 스타일링 및 테마 지원
- 성능 최적화된 렌더링

### 🎬 Advanced Animation Features

- 연결선 애니메이션 효과 (부드럽고 자연스러운 흐름)
- 부드러운 전환 애니메이션 및 상태 변화
- 커스터마이징 가능한 애니메이션 설정
- 성능 최적화된 애니메이션 엔진

### 🛠 Component Library Expansion

- 포괄적인 다이어그램 컴포넌트 라이브러리
- TypeScript 완전 지원
- 모던한 UI/UX 디자인
- 확장 가능한 아키텍처

## 📦 Installation

```bash
npm install sweet-diagram@latest
# or
yarn add sweet-diagram@latest
# or
pnpm add sweet-diagram@latest
```

### TailwindCSS v4 Installation (Required)

This package uses TailwindCSS v4:

```bash
npm install tailwindcss@latest @tailwindcss/postcss
```

PostCSS configuration (`postcss.config.js`):

```javascript
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

**Or** when using Vite (`vite.config.js`):

```javascript
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

Import Tailwind in your CSS file:

```css
@import "tailwindcss";
```

**Note**: v4 doesn't require a `tailwind.config.js` file! It automatically detects files.

### CSS Styles

The package uses TailwindCSS for styling. Make sure you have TailwindCSS v4 installed and configured properly.

## 🎯 NPM Package Usage

### Quick Start with NPM Package

```jsx
import React from "react";
import {
  DiagramProvider,
  Box,
  Connector,
  DraggableBox,
  Triangle,
  Valve,
  Arrow,
  Line,
  ImageBox,
  AutoConnectManager,
  AutoConnector,
  useDiagram,
} from "sweet-diagram";

// Sweet Diagram 컴포넌트들

function MyDiagram() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider width={800} height={600}>
        <AutoConnectManager>
          <Box
            id="box1"
            x={100}
            y={100}
            width={120}
            height={80}
            text="Start Point"
            className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
            onClick={(event, data) => console.log("Box clicked:", data)}
          />

          <Box
            id="box2"
            x={300}
            y={200}
            width={120}
            height={80}
            text="End Point"
            className="bg-green-500 text-white border-green-600 border-2 rounded-lg"
          />

          {/* 세로 텍스트 박스 */}
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
            strokeWidth={3}
            className="text-black"
            animated={true}
          />

          <DraggableBox
            id="draggable1"
            initialX={500}
            initialY={100}
            width={100}
            height={60}
            title="Draggable"
            color="purple"
            onDrag={(position) => console.log("New position:", position)}
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

### 🔗 AutoConnect Usage

```jsx
import { DiagramProvider, AutoConnectManager, Box, useDiagram } from "sweet-diagram";

function AutoConnectExample() {
  return (
    <div className="w-full h-screen bg-gray-50">
      <DiagramProvider>
        <AutoConnectManager showSettingsButton={true}>
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

          {/* Shift + 박스 클릭으로 자동 연결 모드 시작 */}
          {/* 다른 지점 클릭으로 연결선 생성 */}
        </AutoConnectManager>
      </DiagramProvider>
    </div>
  );
}
```

### Using Hooks

```jsx
import { DiagramProvider, useDiagram, Box } from "sweet-diagram";

function DiagramControls() {
  const {
    boxes,
    addBox,
    removeBox,
    updateBox,
    isAutoConnectMode,
    startAutoConnect,
    cancelAutoConnect,
    autoConnections,
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

  return (
    <div>
      <button onClick={handleAddBox}>Add Box</button>
      <button
        onClick={() => (isAutoConnectMode ? cancelAutoConnect() : startAutoConnect())}
        className={isAutoConnectMode ? "bg-red-500" : "bg-blue-500"}
      >
        {isAutoConnectMode ? "Cancel Auto Connect" : "Start Auto Connect"}
      </button>
      <p>Current box count: {boxes.size}</p>
      <p>Auto connections: {autoConnections.length}</p>
    </div>
  );
}

function App() {
  return (
    <DiagramProvider>
      <DiagramControls />
    </DiagramProvider>
  );
}
```

## 🚀 Quick Start

### 1. Basic Usage

```jsx
import React from "react";
import { DiagramProvider, Box, Connector } from "sweet-diagram";

function App() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>
        <Box
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
          x={250}
          y={150}
          width={100}
          height={40}
          text="End"
          className="bg-green-500 text-white border-2 border-green-700 rounded"
        />

        <Connector
          fromBox={{ id: "box1", position: "right" }}
          toBox={{ id: "box2", position: "left" }}
          connectionType="curved"
          showArrow={true}
          strokeWidth={2}
          className="text-blue-600 stroke-orange-500"
        />
      </DiagramProvider>
    </div>
  );
}

export default App;
```

### 2. With TailwindCSS

```jsx
<div className="w-full h-full absolute bg-gray-50 border border-gray-200 rounded">
  <DiagramProvider>{/* Your components here */}</DiagramProvider>
</div>
```

## 🎯 Complete Example

Here's a comprehensive example showcasing multiple components working together:

```jsx
import React from "react";
import {
  Box,
  Arrow,
  Connector,
  Triangle,
  Valve,
  ImageBox,
  DiagramProvider,
  DraggableBox,
  AutoConnectManager,
} from "sweet-diagram";

const App = () => {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>
        <AutoConnectManager showSettingsButton={true}>
          {/* Fixed Start Box */}
          <Box
            id="custom-demo-start"
            x={200}
            y={100}
            width={120}
            height={50}
            text="시작점"
            className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-xs cursor-pointer"
            onClick={() => {
              console.log("Start box clicked");
            }}
          />

          {/* Draggable End Box */}
          <DraggableBox
            id="custom-demo-end"
            x={700}
            y={200}
            width={120}
            height={50}
            text="끝점 (드래그 가능)"
            className="bg-blue-600 text-white border-cyan-800 border-2 rounded-lg text-xs cursor-pointer"
            onClick={() => {
              console.log("End box clicked");
            }}
          />

          {/* Curved Connector */}
          <Connector
            fromBox={{ id: "custom-demo-start", position: "right" }}
            toBox={{ id: "custom-demo-end", position: "left" }}
            connectionType="curved"
            className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
            showArrow={true}
            strokeWidth={5}
            arrowSize={10}
            arrowColor="black"
            arrowStrokeWidth={10}
            arrowStrokeColor="black"
            animated={true}
          />

          {/* ImageBox with Emoji */}
          <ImageBox
            id="img-test"
            x={250}
            y={300}
            width={100}
            height={60}
            text="Image"
            icon="⚙️"
            iconType="emoji"
            imageScale={1.2}
            imagePadding={10}
          />

          {/* 세로 텍스트 박스들 */}
          <Box
            id="vertical-lr"
            x={500}
            y={300}
            width={60}
            height={100}
            text="세로텍스트"
            textDirection="vertical"
            verticalDirection="lr"
            className="bg-emerald-500 text-white border-emerald-600 border-2 rounded-lg"
          />

          <Box
            id="vertical-rl"
            x={580}
            y={300}
            width={60}
            height={100}
            text="시스템관리"
            textDirection="vertical"
            verticalDirection="rl"
            className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg"
          />
        </AutoConnectManager>
      </DiagramProvider>
    </div>
  );
};

export default App;
```

This example demonstrates:

- **Fixed positioning** with `Box` component
- **Interactive dragging** with `DraggableBox`
- **Dynamic connections** that follow dragged components
- **Image/emoji support** with size control
- **Styling integration** with TailwindCSS
- **Event handling** for user interactions
- **🆕 Auto-connect functionality** with `AutoConnectManager`
- **🆕 Vertical text support** in Box components
- **🆕 Animation effects** on connectors

## 🔧 Troubleshooting

### Components not positioning correctly?

Components should work with standard div containers without special positioning requirements.

```jsx
// ✅ Correct
<div>
  <DiagramProvider>
    <Box x={50} y={50} ... />
  </DiagramProvider>
</div>
```

### Need custom styling?

The components work without external CSS files. However, if you want to add global diagram styles:

```css
/* Add to your global CSS file */
.sweet-diagram-container {
  position: absolute;
  overflow: hidden;
}

.sweet-diagram-box {
  position: absolute;
  user-select: none;
  cursor: pointer;
}

.sweet-diagram-connector {
  pointer-events: none;
}

.sweet-diagram-draggable {
  cursor: move;
}

.sweet-diagram-draggable:hover {
  opacity: 0.8;
}

/* 🆕 AutoConnect 스타일 */
.auto-connect-active {
  cursor: crosshair;
}

.auto-connect-manager {
  position: relative;
}
```

Then apply the container class:

```jsx
<div className="sweet-diagram-container w-full h-96">
  <DiagramProvider>{/* Your components */}</DiagramProvider>
</div>
```

## 📋 Components

### DiagramProvider

Wrapper component that provides context for all diagram components.

### Box

Basic rectangular component for system elements.

```jsx
// 기본 가로 텍스트 Box
<Box
  id="unique-id"
  x={100}
  y={50}
  width={120}
  height={60}
  text="Component"
  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
  onClick={(event, data) => console.log("Clicked:", data)}
/>

// 🆕 세로 텍스트 Box (LR 방향)
<Box
  id="vertical-lr"
  x={250}
  y={50}
  width={60}
  height={100}
  text="세로텍스트"
  textDirection="vertical"
  verticalDirection="lr"
  className="bg-emerald-500 text-white border-emerald-600 border-2 rounded-lg"
  onClick={(event, data) => console.log("세로 텍스트 (LR) 클릭:", data)}
/>

// 🆕 세로 텍스트 Box (RL 방향)
<Box
  id="vertical-rl"
  x={330}
  y={50}
  width={60}
  height={100}
  text="시스템관리"
  textDirection="vertical"
  verticalDirection="rl"
  className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg"
  onClick={(event, data) => console.log("세로 텍스트 (RL) 클릭:", data)}
/>
```

### Connector

Connection lines between components.

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight" // "straight", "curved", "orthogonal"
  showArrow={true}
  strokeWidth={2}
  className="text-blue-600"
  animated={true} // 🆕 애니메이션 효과
/>
```

### DraggableBox

Draggable version of Box component.

```jsx
<DraggableBox
  id="drag-box"
  initialX={100}
  initialY={100}
  width={120}
  height={60}
  title="Draggable"
  color="blue"
  onDrag={(position) => console.log("New position:", position)}
/>
```

### 🆕 AutoConnectManager

Manages automatic connection mode and handles click events for auto-connecting.

```jsx
<AutoConnectManager
  showSettingsButton={true}
  settingsProps={{
    position: "right",
    size: "normal",
    theme: "modern",
    compactMode: false,
  }}
>
  {/* Your diagram components */}
</AutoConnectManager>
```

### 🆕 AutoConnector

Creates automatic connections from boxes to clicked points.

```jsx
<AutoConnector
  id="auto-conn-1"
  fromBoxId="box1"
  toPoint={{ x: 300, y: 200 }}
  settings={{
    connectionType: "smart",
    color: "purple",
    strokeWidth: 3,
    animated: true,
  }}
/>
```

## 📚 API Documentation

### Available Components

| Component               | Description                                 | Key Props                                                                                  |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `DiagramProvider`       | Context provider for all diagram components | `width`, `height`, `children`                                                              |
| `Box`                   | Basic rectangular component                 | `id`, `x`, `y`, `width`, `height`, `text`, `textDirection`, `verticalDirection`, `onClick` |
| `DraggableBox`          | Draggable version of Box                    | Same as Box + `draggable`                                                                  |
| `Connector`             | Connection lines between components         | `from`, `to`, `fromPosition`, `toPosition`, `color`, `animated`                            |
| `Arrow`                 | Arrow component                             | `from`, `to`, `color`, `strokeWidth`, `arrowSize`                                          |
| `Line`                  | Basic line component                        | `from`, `to`, `color`, `strokeWidth`                                                       |
| `Triangle`              | Triangle shape component                    | `x`, `y`, `size`, `color`, `rotation`, `onClick`                                           |
| `Valve`                 | Valve component for diagrams                | `x`, `y`, `size`, `isOpen`, `onClick`                                                      |
| `ImageBox`              | Box with image support                      | `id`, `x`, `y`, `width`, `height`, `src`, `alt`                                            |
| `🆕 AutoConnectManager` | Manages automatic connection mode           | `showSettingsButton`, `settingsProps`                                                      |
| `🆕 AutoConnector`      | Automatic connection component              | `fromBoxId`, `toPoint`, `settings`                                                         |

### Hooks

- `useDiagram()`: Returns diagram context with:
  - `boxes`, `connectors`, `addBox`, `removeBox`, `updateBox`
  - `🆕 isAutoConnectMode`, `🆕 startAutoConnect`, `🆕 cancelAutoConnect`
  - `🆕 autoConnections`, `🆕 addAutoConnection`, `🆕 removeAutoConnection`
  - `🆕 autoConnectSettings`

### TypeScript Support (도입 예정)

현재 JavaScript로 개발되었으며, TypeScript 지원은 향후 버전에서 제공될 예정입니다.

```javascript
// 현재: JavaScript 사용
import { Box, Connector, DiagramProvider, AutoConnectManager } from "sweet-diagram";

// 향후 예정: TypeScript 지원
// import { BoxProps, ConnectorProps, DiagramContext, AutoConnectSettings } from "sweet-diagram";
```

**로드맵**: v1.0.0에서 완전한 TypeScript 타입 정의 제공 예정

## 🔗 Links

- **NPM Package**: <https://www.npmjs.com/package/sweet-diagram>
- **Live Demo**: <https://sweetpotato-diagram.vercel.app>
- **GitHub Repository**: <https://github.com/KoreaMoney/sweetpotato-diagram>
- **Documentation**: See `PACKAGE_USAGE.md` for detailed usage examples

## 📋 Requirements

- React 16.8+ (Hooks required)
- Optional: TailwindCSS for better styling

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [documentation](https://sweetpotato-diagram.vercel.app)
2. Look at example usage in `PACKAGE_USAGE.md`
3. Open an issue on [GitHub](https://github.com/KoreaMoney/sweetpotato-diagram/issues)

## 🎉 Recent Updates

### v0.9.0 (Latest)

- ✨ **새로운 AutoConnect 기능**: Shift + 클릭으로 자동 연결 생성
- 📊 **세로 텍스트 Box**: LR/RL 방향 텍스트 지원
- 🎬 **애니메이션 효과**: 연결선 애니메이션 및 전환 효과
- ⚙️ **설정 UI**: 실시간 AutoConnect 설정 변경
- 🎨 **향상된 스타일링**: 더 나은 시각적 피드백
