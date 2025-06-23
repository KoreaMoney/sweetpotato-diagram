# 📚 Sweet Diagram API Documentation

## 🚀 Getting Started

### Installation

```bash
npm install sweet-diagram
```

### TailwindCSS v4 Setup (Required)

이 패키지는 TailwindCSS v4를 사용합니다. 설치 방법:

```bash
npm install tailwindcss@latest @tailwindcss/postcss
```

PostCSS 설정 (`postcss.config.js`):

```javascript
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

**또는** Vite를 사용하는 경우 (`vite.config.js`):

```javascript
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

CSS 파일에 Tailwind를 임포트하세요:

```css
@import "tailwindcss";

/* 커스텀 테마 설정 (선택사항) */
@theme {
  --color-brand: #b4d455;
  --font-display: "Inter", sans-serif;
}
```

**주의**: v4는 설정 파일(`tailwind.config.js`)이나 `content` 배열이 필요하지 않습니다. 자동으로 파일을 감지합니다.

### Basic Setup

```jsx
import React from "react";
import { DiagramProvider, Box, Connector } from "sweet-diagram";

function App() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>{/* Your diagram components */}</DiagramProvider>
    </div>
  );
}
```

## 📋 Components API

### DiagramProvider

Context provider that manages diagram state and provides positioning system.

#### Props

| Prop       | Type        | Default | Description      |
| ---------- | ----------- | ------- | ---------------- |
| `children` | `ReactNode` | -       | Child components |
| `width`    | `number`    | `800`   | Container width  |
| `height`   | `number`    | `600`   | Container height |

#### Example

```jsx
<div className="w-full h-full absolute">
  <DiagramProvider width={1200} height={800}>
    {/* Diagram components */}
  </DiagramProvider>
</div>
```

---

### Box

Basic rectangular component for creating diagram elements.

#### Props

| Prop        | Type                                         | Default      | Description       |
| ----------- | -------------------------------------------- | ------------ | ----------------- |
| `id`        | `string`                                     | **required** | Unique identifier |
| `x`         | `number`                                     | **required** | X position        |
| `y`         | `number`                                     | **required** | Y position        |
| `width`     | `number`                                     | `100`        | Box width         |
| `height`    | `number`                                     | `60`         | Box height        |
| `text`      | `string`                                     | -            | Text content      |
| `className` | `string`                                     | -            | CSS classes       |
| `style`     | `CSSProperties`                              | -            | Inline styles     |
| `onClick`   | `(event: MouseEvent, data: BoxData) => void` | -            | Click handler     |

#### Example

```jsx
<Box
  id="my-box"
  x={100}
  y={50}
  width={120}
  height={80}
  text="My Content"
  className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
  onClick={(event, data) => console.log("Box clicked:", data)}
/>
```

---

### DraggableBox

Draggable version of the Box component.

#### Props

| Prop          | Type                                         | Default      | Description             |
| ------------- | -------------------------------------------- | ------------ | ----------------------- |
| `id`          | `string`                                     | **required** | Unique identifier       |
| `initialX`    | `number`                                     | **required** | Initial X position      |
| `initialY`    | `number`                                     | **required** | Initial Y position      |
| `title`       | `string`                                     | -            | Display title           |
| `color`       | `string`                                     | `'blue'`     | Box color theme         |
| `draggable`   | `boolean`                                    | `true`       | Enable/disable dragging |
| `onDrag`      | `(position: {x: number, y: number}) => void` | -            | Drag event handler      |
| `onDragStart` | `() => void`                                 | -            | Drag start handler      |
| `onDragEnd`   | `() => void`                                 | -            | Drag end handler        |

#### Example

```jsx
<DraggableBox
  id="drag-box"
  initialX={200}
  initialY={100}
  title="Drag me!"
  color="purple"
  onDrag={(pos) => console.log("New position:", pos)}
/>
```

---

### Connector

Creates connections between boxes with various connection types and arrow styles.

#### Props

| Prop                  | Type                                                                        | Default           | Description                           |
| --------------------- | --------------------------------------------------------------------------- | ----------------- | ------------------------------------- |
| `fromBox`             | `{id: string, position: string, offset?: {x: number, y: number}}`           | **required**      | Source box info with connection point |
| `toBox`               | `{id: string, position: string, offset?: {x: number, y: number}}`           | **required**      | Target box info with connection point |
| `startPoint`          | `{x: number, y: number}`                                                    | -                 | Alternative: Direct coordinate start  |
| `endPoint`            | `{x: number, y: number}`                                                    | -                 | Alternative: Direct coordinate end    |
| `connectionType`      | `'straight' \| 'curved' \| 'orthogonal' \| 'stepped' \| 'custom' \| 'auto'` | `'straight'`      | Connection line type                  |
| `strokeWidth`         | `number`                                                                    | `2`               | Line thickness                        |
| `className`           | `string`                                                                    | `'text-gray-500'` | CSS classes for styling               |
| `animated`            | `boolean`                                                                   | `false`           | Enable line animation                 |
| `showArrow`           | `boolean`                                                                   | `true`            | Show arrow at end point               |
| `showStartArrow`      | `boolean`                                                                   | `false`           | Show arrow at start point             |
| `arrowDirection`      | `'forward' \| 'backward' \| 'both' \| 'none'`                               | `'forward'`       | Arrow direction control               |
| `arrowSize`           | `number`                                                                    | `8`               | Arrow head size                       |
| `arrowColor`          | `string`                                                                    | `'current'`       | Arrow color                           |
| `arrowShape`          | `'triangle' \| 'diamond' \| 'circle' \| 'square'`                           | `'triangle'`      | Arrow head shape                      |
| `bendPoints`          | `Array<{x: number, y: number}>`                                             | `[]`              | Custom path points (for custom type)  |
| `orthogonalDirection` | `'horizontal-first' \| 'vertical-first' \| 'auto'`                          | `'auto'`          | Orthogonal connection direction       |
| `stepOffset`          | `number`                                                                    | `50`              | Offset for orthogonal connections     |
| `cornerRadius`        | `number`                                                                    | `0`               | Corner rounding radius                |

#### Examples

```jsx
// Basic box connection
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
  arrowDirection="forward"
  strokeWidth={3}
  className="text-blue-600"
/>

// Curved connection with animation
<Connector
  fromBox={{ id: "start", position: "bottom" }}
  toBox={{ id: "end", position: "top" }}
  connectionType="curved"
  animated={true}
  arrowDirection="both"
  arrowShape="diamond"
  arrowColor="red"
/>

// Orthogonal connection
<Connector
  fromBox={{ id: "box1", position: "bottom" }}
  toBox={{ id: "box2", position: "top" }}
  connectionType="orthogonal"
  orthogonalDirection="vertical-first"
  stepOffset={80}
/>

// Custom path with bend points
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 400, y: 300 }}
  connectionType="custom"
  bendPoints={[
    { x: 200, y: 100 },
    { x: 200, y: 250 },
    { x: 350, y: 250 }
  ]}
  arrowDirection="forward"
/>

// With offset positioning
<Connector
  fromBox={{
    id: "source",
    position: "right",
    offset: { x: 10, y: -5 }
  }}
  toBox={{
    id: "target",
    position: "left",
    offset: { x: -10, y: 5 }
  }}
/>
```

---

### Arrow

Standalone arrow component for custom connections.

#### Props

| Prop          | Type                     | Default      | Description     |
| ------------- | ------------------------ | ------------ | --------------- |
| `from`        | `{x: number, y: number}` | **required** | Start point     |
| `to`          | `{x: number, y: number}` | **required** | End point       |
| `color`       | `string`                 | `'#333'`     | Arrow color     |
| `strokeWidth` | `number`                 | `2`          | Line thickness  |
| `arrowSize`   | `number`                 | `8`          | Arrow head size |

#### Example

```jsx
<Arrow from={{ x: 100, y: 100 }} to={{ x: 200, y: 150 }} color="#ff6b6b" strokeWidth={3} arrowSize={10} />
```

---

### Line

Basic line component without arrow heads.

#### Props

| Prop          | Type                     | Default      | Description    |
| ------------- | ------------------------ | ------------ | -------------- |
| `from`        | `{x: number, y: number}` | **required** | Start point    |
| `to`          | `{x: number, y: number}` | **required** | End point      |
| `color`       | `string`                 | `'#333'`     | Line color     |
| `strokeWidth` | `number`                 | `2`          | Line thickness |

#### Example

```jsx
<Line from={{ x: 50, y: 50 }} to={{ x: 150, y: 100 }} color="#999" strokeWidth={1} />
```

---

### Triangle

Triangle shape component for indicators or symbols.

#### Props

| Prop       | Type         | Default      | Description         |
| ---------- | ------------ | ------------ | ------------------- |
| `x`        | `number`     | **required** | X position          |
| `y`        | `number`     | **required** | Y position          |
| `size`     | `number`     | `20`         | Triangle size       |
| `color`    | `string`     | `'#333'`     | Fill color          |
| `rotation` | `number`     | `0`          | Rotation in degrees |
| `onClick`  | `() => void` | -            | Click handler       |

#### Example

```jsx
<Triangle x={100} y={100} size={30} color="#ff6b6b" rotation={45} onClick={() => console.log("Triangle clicked")} />
```

---

### Valve

Valve component for flow diagrams.

#### Props

| Prop      | Type         | Default      | Description       |
| --------- | ------------ | ------------ | ----------------- |
| `x`       | `number`     | **required** | X position        |
| `y`       | `number`     | **required** | Y position        |
| `size`    | `number`     | `24`         | Valve size        |
| `isOpen`  | `boolean`    | `false`      | Open/closed state |
| `onClick` | `() => void` | -            | Click handler     |

#### Example

```jsx
<Valve x={200} y={150} size={30} isOpen={true} onClick={() => console.log("Valve toggled")} />
```

---

### ImageBox

Box component with image support.

#### Props

Inherits all props from `Box` component plus:

| Prop  | Type     | Default      | Description      |
| ----- | -------- | ------------ | ---------------- |
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | -            | Alternative text |

#### Example

```jsx
<ImageBox
  id="img-box"
  x={100}
  y={100}
  width={120}
  height={80}
  src="/path/to/image.jpg"
  alt="Description"
  text="Image Box"
  onClick={(event, data) => console.log("Image box clicked:", data)}
/>
```

## 🎣 Hooks API

### useDiagram

React Hook for comprehensive diagram state management with advanced features like history, zoom, search, and layout optimization.

#### Returns

| Property                     | Type                                                                       | Description                                |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------ |
| **박스 관리**                |
| `boxes`                      | `Map<string, BoxData>`                                                     | All boxes in the diagram                   |
| `registerBox`                | `(id: string, boxInfo: any) => void`                                       | Register a box                             |
| `unregisterBox`              | `(id: string) => void`                                                     | Remove a box                               |
| `updateBoxPosition`          | `(id: string, position: {x: number, y: number}) => void`                   | Update box position                        |
| `getBox`                     | `(id: string) => BoxData \| undefined`                                     | Get specific box data                      |
| `getAllBoxes`                | `() => BoxData[]`                                                          | Get all boxes as array                     |
| `selectBox`                  | `(id: string, multiSelect?: boolean) => void`                              | Select/deselect boxes                      |
| `clearSelection`             | `() => void`                                                               | Clear all selections                       |
| `selectedBoxes`              | `Set<string>`                                                              | Currently selected box IDs                 |
| `findBoxes`                  | `(predicate: (box: BoxData) => boolean) => BoxData[]`                      | Find boxes by condition                    |
| **동적 박스 관리 (NEW)**     |
| `addDynamicBox`              | `(boxConfig: DynamicBoxConfig) => string`                                  | Add dynamic box that renders automatically |
| `removeDynamicBox`           | `(id: string) => void`                                                     | Remove dynamic box                         |
| `dynamicBoxes`               | `Map<string, DynamicBoxData>`                                              | All dynamic boxes                          |
| **연결 관리**                |
| `connections`                | `ConnectionData[]`                                                         | All connections in diagram                 |
| `addConnection`              | `(connectionInfo: any) => string`                                          | Add new connection                         |
| `removeConnection`           | `(connectionId: string) => void`                                           | Remove connection                          |
| `updateConnection`           | `(connectionId: string, updates: any) => void`                             | Update connection                          |
| `selectedConnection`         | `string \| null`                                                           | Currently selected connection              |
| `setSelectedConnection`      | `(connectionId: string \| null) => void`                                   | Set selected connection                    |
| `getOptimalConnectionPoints` | `(fromBoxId: string, toBoxId: string) => ConnectionPoints \| null`         | Calculate optimal connection points        |
| `findConnections`            | `(predicate: (connection: ConnectionData) => boolean) => ConnectionData[]` | Find connections by condition              |
| **상태 관리**                |
| `isDragging`                 | `boolean`                                                                  | Whether dragging is active                 |
| `setIsDragging`              | `(isDragging: boolean) => void`                                            | Set dragging state                         |
| `isConnecting`               | `boolean`                                                                  | Whether connecting mode is active          |
| `setIsConnecting`            | `(isConnecting: boolean) => void`                                          | Set connecting state                       |
| `connectionStartBox`         | `string \| null`                                                           | Box ID where connection started            |
| `setConnectionStartBox`      | `(boxId: string \| null) => void`                                          | Set connection start box                   |
| **히스토리 관리**            |
| `undo`                       | `() => void`                                                               | Undo last action                           |
| `redo`                       | `() => void`                                                               | Redo previously undone action              |
| `saveState`                  | `() => void`                                                               | Save current state to history              |
| `clearDiagram`               | `() => void`                                                               | Clear entire diagram                       |
| **뷰 관리**                  |
| `scale`                      | `number`                                                                   | Current zoom scale                         |
| `setScale`                   | `(scale: number) => void`                                                  | Set zoom scale                             |
| `panOffset`                  | `{x: number, y: number}`                                                   | Current pan offset                         |
| `setPanOffset`               | `(offset: {x: number, y: number}) => void`                                 | Set pan offset                             |
| `zoomIn`                     | `() => void`                                                               | Zoom in (scale \* 1.2)                     |
| `zoomOut`                    | `() => void`                                                               | Zoom out (scale / 1.2)                     |
| `resetZoom`                  | `() => void`                                                               | Reset zoom to 1 and center                 |
| **유틸리티**                 |
| `getDiagramStats`            | `() => DiagramStats`                                                       | Get diagram statistics                     |
| `optimizeLayout`             | `() => void`                                                               | Auto-optimize box layout (improved)        |
| `containerRef`               | `React.RefObject<HTMLDivElement>`                                          | Container reference                        |

#### DiagramStats Interface

```typescript
interface DiagramStats {
  boxCount: number; // Number of boxes
  connectionCount: number; // Number of connections
  selectedBoxCount: number; // Number of selected boxes
  canUndo: boolean; // Whether undo is available
  canRedo: boolean; // Whether redo is available
  scale: number; // Current zoom scale
  panOffset: { x: number; y: number }; // Current pan offset
  dynamicBoxCount?: number; // Number of dynamic boxes (NEW)
}
```

#### DynamicBoxConfig Interface (NEW)

```typescript
interface DynamicBoxConfig {
  id?: string; // Optional ID, auto-generated if omitted
  x?: number; // X position (default: random)
  y?: number; // Y position (default: random)
  width?: number; // Box width (default: 120)
  height?: number; // Box height (default: 80)
  text?: string; // Box text content
  className?: string; // CSS classes for styling
  onClick?: (event: React.MouseEvent, data: BoxData) => void; // Click handler
  onMouseEnter?: (event: React.MouseEvent, data: BoxData) => void; // Mouse enter handler
  onMouseLeave?: (event: React.MouseEvent, data: BoxData) => void; // Mouse leave handler
  [key: string]: any; // Additional properties
}
```

#### BoxData Interface

```typescript
interface BoxData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  element?: HTMLElement;
  text?: string;
  [key: string]: any;
}
```

#### ConnectionData Interface

```typescript
interface ConnectionData {
  id: string;
  fromBox?: { id: string; position: string };
  toBox?: { id: string; position: string };
  connectionType?: "straight" | "curved" | "orthogonal";
  arrowDirection?: "none" | "forward" | "backward" | "both";
  [key: string]: any;
}
```

#### Basic Usage Example

```jsx
import { DiagramProvider, useDiagram, Box } from "sweet-diagram";

function DiagramControls() {
  const { boxes, connections, selectedBoxes, addConnection, selectBox, getDiagramStats } = useDiagram();

  const stats = getDiagramStats();

  return (
    <div>
      <p>박스 개수: {stats.boxCount}</p>
      <p>연결선 개수: {stats.connectionCount}</p>
      <p>선택된 박스: {stats.selectedBoxCount}</p>
    </div>
  );
}

function App() {
  return (
    <DiagramProvider>
      <DiagramControls />
      <Box id="box1" x={100} y={100} text="클릭하세요" onClick={(e, data) => selectBox(data.id)} />
    </DiagramProvider>
  );
}
```

#### Advanced Features Example

```jsx
import { DiagramProvider, useDiagram } from "sweet-diagram";

function AdvancedControls() {
  const {
    undo,
    redo,
    zoomIn,
    zoomOut,
    resetZoom,
    optimizeLayout,
    clearDiagram,
    saveState,
    getDiagramStats,
    findBoxes,
    findConnections,
  } = useDiagram();

  const stats = getDiagramStats();

  // Find large boxes
  const findLargeBoxes = () => {
    const largeBoxes = findBoxes((box) => box.width > 120 || box.height > 80);
    console.log(`Found ${largeBoxes.length} large boxes`);
  };

  // Find connections for specific box
  const findConnectionsForBox = (boxId) => {
    return findConnections((conn) => conn.fromBox?.id === boxId || conn.toBox?.id === boxId);
  };

  const handleOptimizeLayout = () => {
    optimizeLayout(); // Auto-optimize layout
    saveState(); // Save state to history
  };

  return (
    <div className="controls">
      {/* History Management */}
      <button onClick={undo} disabled={!stats.canUndo}>
        Undo
      </button>
      <button onClick={redo} disabled={!stats.canRedo}>
        Redo
      </button>

      {/* Zoom Controls */}
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      <button onClick={resetZoom}>Reset Zoom</button>

      {/* Layout */}
      <button onClick={handleOptimizeLayout}>Optimize Layout</button>
      <button onClick={clearDiagram}>Clear All</button>

      {/* Search */}
      <button onClick={findLargeBoxes}>Find Large Boxes</button>

      <p>Current Zoom: {Math.round(stats.scale * 100)}%</p>
    </div>
  );
}
```

#### Real-time Monitoring Example

```jsx
import { DiagramProvider, useDiagram } from "sweet-diagram";
import { useEffect, useState } from "react";

function RealtimeMonitor() {
  const { boxes, connections, selectedBoxes, getDiagramStats } = useDiagram();

  const [changeLog, setChangeLog] = useState([]);

  // Monitor box changes
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setChangeLog((prev) =>
      [
        ...prev,
        {
          time: timestamp,
          type: "boxes",
          message: `박스 개수: ${boxes.size}`,
        },
      ].slice(-10)
    ); // Keep last 10 entries
  }, [boxes.size]);

  // Monitor connection changes
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setChangeLog((prev) =>
      [
        ...prev,
        {
          time: timestamp,
          type: "connections",
          message: `연결선 개수: ${connections.length}`,
        },
      ].slice(-10)
    );
  }, [connections.length]);

  // Monitor selection changes
  useEffect(() => {
    if (selectedBoxes.size > 0) {
      const timestamp = new Date().toLocaleTimeString();
      const selectedIds = Array.from(selectedBoxes).join(", ");
      setChangeLog((prev) =>
        [
          ...prev,
          {
            time: timestamp,
            type: "selection",
            message: `선택된 박스: ${selectedIds}`,
          },
        ].slice(-10)
      );
    }
  }, [selectedBoxes]);

  return (
    <div className="realtime-monitor">
      <h3>실시간 변경 로그</h3>
      <div className="log-container">
        {changeLog.map((log, index) => (
          <div key={index} className={`log-entry ${log.type}`}>
            <span className="time">{log.time}</span>
            <span className="message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Search and Filter Example

```jsx
function SearchExample() {
  const { findBoxes, findConnections, selectBox, boxes, connections } = useDiagram();

  // Find boxes by condition
  const findLargeBoxes = () => {
    const largeBoxes = findBoxes((box) => box.width > 120 || box.height > 80);

    // Select found boxes
    largeBoxes.forEach((box) => selectBox(box.id, true));

    console.log(`Found ${largeBoxes.length} large boxes`);
  };

  // Find connections for specific box
  const findConnectionsForBox = (boxId) => {
    const relatedConnections = findConnections((conn) => conn.fromBox?.id === boxId || conn.toBox?.id === boxId);

    return relatedConnections;
  };

  // Search boxes by text
  const searchBoxesByText = (searchText) => {
    const matchingBoxes = findBoxes((box) => box.text && box.text.toLowerCase().includes(searchText.toLowerCase()));

    return matchingBoxes;
  };

  return (
    <div>
      <button onClick={findLargeBoxes}>Find Large Boxes</button>

      <input
        type="text"
        placeholder="Search boxes by text..."
        onChange={(e) => {
          const results = searchBoxesByText(e.target.value);
          console.log(`Search results: ${results.length} boxes`);
        }}
      />
    </div>
  );
}
```

#### 실제 적용 사례

**🏭 Manufacturing Process Management**

- 생산 공정 단계를 박스로 표현
- 공정 흐름을 연결선으로 시각화
- 실시간 상태 모니터링 및 병목 구간 감지
- 공정 최적화를 위한 레이아웃 자동 조정

**🌐 Network Topology Management**

- 네트워크 장비를 박스로 표현
- 연결 상태를 실시간으로 모니터링
- 장애 구간 자동 감지 및 시각적 표시
- 네트워크 토폴로지 자동 생성

**📊 Business Process Management**

- 업무 플로우 시각화
- 승인 과정 추적 및 관리
- 프로세스 병목 분석
- 업무 효율성 개선

**🧠 AI/ML Pipeline Management**

- 머신러닝 파이프라인 시각화
- 데이터 플로우 추적
- 모델 성능 실시간 모니터링
- 파이프라인 최적화

#### Performance Tips

1. **상태 저장 최적화**: 큰 변경 후에만 `saveState()` 호출
2. **검색 최적화**: 자주 사용하는 검색 조건은 메모이제이션 활용
3. **렌더링 최적화**: 선택 상태 변경 시 불필요한 리렌더링 방지
4. **메모리 관리**: 히스토리는 자동으로 50개로 제한됨

## 🎨 Styling Guide

### CSS Classes

The package includes pre-built CSS classes:

```css
.sweet-diagram-provider {
  /* Container styles */
}
.diagram-container {
  /* Diagram area */
}
.diagram-box {
  /* Box components */
}
.connection-point {
  /* Connection points */
}
.connector-animated {
  /* Animated connectors */
}
.draggable-box {
  /* Draggable elements */
}
```

### TailwindCSS Integration

Works seamlessly with TailwindCSS:

```jsx
<div className="w-full h-full absolute">
  <DiagramProvider>
    <Box
      id="styled-box"
      x={100}
      y={100}
      text="Styled Box"
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg font-bold"
    />
  </DiagramProvider>
</div>
```

### Custom Styling

Override default styles:

```css
.my-custom-box {
  border: 2px solid #0066ff;
  border-radius: 8px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

## 🔧 Advanced Usage

### Dynamic Connections

```jsx
function DynamicDiagram() {
  const [connections, setConnections] = useState([]);

  const addConnection = (fromBox, toBox) => {
    setConnections((prev) => [...prev, { fromBox, toBox, id: Date.now() }]);
  };

  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>
        {connections.map((conn) => (
          <Connector
            key={conn.id}
            fromBox={conn.fromBox}
            toBox={conn.toBox}
            connectionType="straight"
            arrowDirection="forward"
          />
        ))}
      </DiagramProvider>
    </div>
  );
}
```

### Event Handling

```jsx
<Box
  id="interactive-box"
  x={100}
  y={100}
  text="Interactive Content"
  onClick={(event, data) => console.log("Box clicked:", data)}
  className="hover:bg-blue-100 cursor-pointer"
/>
```

### Performance Optimization

For large diagrams, use React.memo:

```jsx
const OptimizedBox = React.memo(({ id, x, y, text, ...props }) => <Box id={id} x={x} y={y} text={text} {...props} />);
```

## 🐛 Troubleshooting

### Common Issues

1. **Components not visible**: Make sure to import CSS file
2. **Positioning issues**: Ensure DiagramProvider wraps all components
3. **Connectors not updating**: Check that box IDs match connector from/to props
4. **TypeScript 지원**: 현재 JavaScript로 개발됨, v1.0.0에서 타입 정의 제공 예정

### Performance Tips

1. Use `React.memo` for static components
2. Minimize re-renders with `useCallback` for event handlers
3. Consider virtualization for large diagrams
4. Use CSS transforms for animations instead of position changes

## 📝 Examples

See `PACKAGE_USAGE.md` for more comprehensive examples and use cases.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/sweet-diagram)
- [GitHub Repository](https://github.com/KoreaMoney/sweetpotato-diagram)
- [Live Demo](https://sweetpotato-diagram.vercel.app)
