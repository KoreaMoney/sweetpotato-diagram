# 🍠 Sweet Diagram

Modern and intuitive React diagram editor components with drag & drop and interactive diagram editing features.

## 📦 Installation

```bash
npm install sweet-diagram
# or
yarn add sweet-diagram
# or
pnpm add sweet-diagram
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

The package includes pre-built CSS styles. Import them in your main CSS file or application entry point:

```jsx
// Import CSS in your JavaScript/React app (REQUIRED)
import "sweet-diagram/dist/sweet-diagram.css";
```

```css
/* Option 2: Import CSS in your main CSS file */
@import "sweet-diagram/dist/sweet-diagram.css";
```

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
  useDiagram,
} from "sweet-diagram";

// IMPORTANT: Don't forget to import CSS!
import "sweet-diagram/dist/sweet-diagram.css";

function MyDiagram() {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider width={800} height={600}>
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
      </DiagramProvider>
    </div>
  );
}

export default MyDiagram;
```

### Using Hooks

```jsx
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
      <button onClick={handleAddBox}>Add Box</button>
      <p>Current box count: {boxes.size}</p>
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
import { Box, Arrow, Connector, Triangle, Valve, ImageBox, DiagramProvider, DraggableBox } from "sweet-diagram";

const App = () => {
  return (
    <div className="w-full h-full absolute">
      <DiagramProvider>
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

## 📚 API Documentation

### Available Components

| Component         | Description                                 | Key Props                                                       |
| ----------------- | ------------------------------------------- | --------------------------------------------------------------- |
| `DiagramProvider` | Context provider for all diagram components | `width`, `height`, `children`                                   |
| `Box`             | Basic rectangular component                 | `id`, `x`, `y`, `width`, `height`, `children`, `onClick`        |
| `DraggableBox`    | Draggable version of Box                    | Same as Box + `draggable`                                       |
| `Connector`       | Connection lines between components         | `from`, `to`, `fromPosition`, `toPosition`, `color`, `animated` |
| `Arrow`           | Arrow component                             | `from`, `to`, `color`, `strokeWidth`, `arrowSize`               |
| `Line`            | Basic line component                        | `from`, `to`, `color`, `strokeWidth`                            |
| `Triangle`        | Triangle shape component                    | `x`, `y`, `size`, `color`, `rotation`, `onClick`                |
| `Valve`           | Valve component for diagrams                | `x`, `y`, `size`, `isOpen`, `onClick`                           |
| `ImageBox`        | Box with image support                      | `id`, `x`, `y`, `width`, `height`, `src`, `alt`                 |

### Hooks

- `useDiagram()`: Returns diagram context with `boxes`, `connectors`, `addBox`, `removeBox`, `updateBox`

### TypeScript Support

Full TypeScript definitions are included:

```typescript
import { BoxProps, ConnectorProps, DiagramContext } from "sweet-diagram";

const MyBox: React.FC<BoxProps> = ({ id, x, y, children }) => {
  // Type-safe component implementation
};
```

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
