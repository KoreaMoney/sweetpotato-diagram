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

## 🚀 Quick Start

### 1. Basic Usage

```jsx
import React from "react";
import { DiagramProvider, Box, Connector } from "sweet-diagram";

function App() {
  return (
    {/* Important: Container must have position: relative */}
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
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
          className="text-blue-600"
        />
      </DiagramProvider>
    </div>
  );
}

export default App;
```

### 2. With TailwindCSS

If you're using TailwindCSS, make sure your container has proper positioning:

```jsx
<div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded">
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
    <div className="w-full h-screen">
      {/* Important: Set position: relative on the container */}
      <div className="relative w-full h-full">
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

1. **Container positioning**: Ensure your container has `position: relative`
2. **Height**: Give your container a fixed height

```jsx
// ✅ Correct
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <DiagramProvider>
    <Box x={50} y={50} ... />
  </DiagramProvider>
</div>

// ❌ Incorrect (missing height or position)
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
  position: relative;
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
<Box
  id="unique-id"
  x={100}
  y={50}
  width={120}
  height={60}
  text="Component"
  className="bg-blue-500 text-white"
  onClick={(event, data) => console.log("Clicked:", data)}
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

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Issues
