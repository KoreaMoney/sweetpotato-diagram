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
import "sweet-diagram/dist/sweet-diagram.css"; // Required!

function App() {
  return <DiagramProvider>{/* Your diagram components */}</DiagramProvider>;
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
<DiagramProvider width={1200} height={800}>
  {/* Diagram components */}
</DiagramProvider>
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

Hook to access diagram context and state management.

#### Returns

| Property     | Type                                              | Description              |
| ------------ | ------------------------------------------------- | ------------------------ |
| `boxes`      | `Map<string, BoxData>`                            | Current boxes in diagram |
| `connectors` | `ConnectorData[]`                                 | Current connectors       |
| `addBox`     | `(id: string, data: BoxData) => void`             | Add new box              |
| `removeBox`  | `(id: string) => void`                            | Remove box               |
| `updateBox`  | `(id: string, updates: Partial<BoxData>) => void` | Update box               |

#### Example

```jsx
function DiagramController() {
  const { boxes, addBox, removeBox, updateBox } = useDiagram();

  const handleAddBox = () => {
    addBox(`box-${Date.now()}`, {
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 100,
      height: 60,
    });
  };

  return (
    <div>
      <button onClick={handleAddBox}>Add Box</button>
      <p>Total boxes: {boxes.size}</p>
    </div>
  );
}
```

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
<Box
  id="styled-box"
  x={100}
  y={100}
  text="Styled Box"
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-lg font-bold"
/>
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
4. **TypeScript errors**: Import types from the package

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
