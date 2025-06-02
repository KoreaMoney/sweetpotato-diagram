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

### 1. Import CSS Styles (Required)

**Important**: You must import the CSS styles for proper positioning:

```jsx
import 'sweet-diagram/styles';
```

### 2. Basic Usage

```jsx
import React from 'react';
import { DiagramProvider, Box, Connector } from 'sweet-diagram';
import 'sweet-diagram/styles'; // Required for proper positioning

function App() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <DiagramProvider>
        <Box
          id="box1"
          x={50}
          y={50}
          width={100}
          height={40}
          text="Start"
          className="bg-blue-500 text-white border-2 border-blue-700 rounded"
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

### 3. With TailwindCSS

If you're using TailwindCSS, make sure your container has proper positioning:

```jsx
<div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded">
  <DiagramProvider>
    {/* Your components here */}
  </DiagramProvider>
</div>
```

## 🔧 Troubleshooting

### Components not positioning correctly?

1. **Import the CSS**: Make sure you import `'sweet-diagram/styles'`
2. **Container positioning**: Ensure your container has `position: relative`
3. **Height**: Give your container a fixed height

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
  onClick={(event, data) => console.log('Clicked:', data)}
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
  onDrag={(position) => console.log('New position:', position)}
/>
```

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Issues