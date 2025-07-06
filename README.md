# 🍠 Sweet Diagram v0.4.6

**Ultra-Lightweight & Optimized React Diagram Editor Components**

[![npm version](https://badge.fury.io/js/sweet-diagram.svg)](https://badge.fury.io/js/sweet-diagram)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)
[![Bundle Size](https://img.shields.io/badge/Bundle%20Size-328KB-brightgreen.svg)](https://bundlephobia.com/package/sweet-diagram)

🌐 **Demo**: [https://sweetpotato-diagram.vercel.app](https://sweetpotato-diagram.vercel.app)
📦 **NPM**: [https://www.npmjs.com/package/sweet-diagram](https://www.npmjs.com/package/sweet-diagram)

## 🚀 Why Choose Sweet Diagram?

### ⚡ Ultra-Lightweight & Optimized

- **82% smaller bundle size** - From 1.8MB to just **328KB**
- **Optimized CSS** - Only 2.6KB of essential styles
- **Tree-shakable** - Import only what you need
- **Zero bloat** - No unnecessary dependencies bundled

### 🎯 Production-Ready Features

- **Drag & Drop** - Intuitive visual editing
- **Auto-Connect** - Smart connection algorithms
- **Sankey Diagrams** - Flow visualization with proportional nodes
- **Stack Layout** - Automatic box stacking with priority system
- **Vertical Text** - Complete support for LR/RL directions
- **Animation Effects** - Smooth transitions and flows
- **TypeScript** - Full type safety and IntelliSense

### 🔧 Developer-Friendly

- **Flexible Dependencies** - Use your preferred versions
- **Modern Architecture** - Built with React 18+ and latest standards
- **Customizable** - Easy theming and styling
- **Performance Optimized** - Minimal runtime overhead

## 📦 Installation

```bash
# Install the core library
npm install sweet-diagram

# Install peer dependencies
npm install react react-dom @react-three/drei @react-three/fiber three lucide-react zustand
```

### Why Peer Dependencies?

We moved heavy dependencies to peer dependencies to give you:

- **Flexibility** - Use your preferred versions
- **Smaller bundle** - Avoid duplicate dependencies
- **Better performance** - Shared dependencies across your app

## 🎯 Quick Start

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
  Sankey,
  useDiagram,
} from "sweet-diagram";

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

        {/* Vertical Text Box */}
        <Box
          id="vertical-box"
          x={500}
          y={100}
          width={60}
          height={120}
          text="Vertical Text"
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
      </DiagramProvider>
    </div>
  );
}

export default MyDiagram;
```

## 🔧 Available Components

### Core Components

- **`DiagramProvider`** - Main context provider
- **`Box`** - Basic diagram box with text support
- **`Connector`** - Connection lines between components
- **`DraggableBox`** - Draggable box component
- **`Arrow`** - Arrow shapes and indicators
- **`Line`** - Simple line connections
- **`Triangle`** - Triangle shapes
- **`Valve`** - Valve indicators
- **`ImageBox`** - Image containers

### 🆕 New in v0.4.6

- **`Sankey`** - Flow diagrams with proportional node heights
- **Stack Layout** - Automatic box stacking with priority system

### Hooks

- **`useDiagram`** - Access diagram context and state

## 🌊 Sankey Diagrams

Visualize flow data with interactive Sankey diagrams:

```jsx
import { Sankey } from "sweet-diagram";

function SankeyExample() {
  const data = {
    nodes: [
      { id: "A", name: "Source A", layer: 0 },
      { id: "B", name: "Source B", layer: 0 },
      { id: "C", name: "Process C", layer: 1 },
      { id: "D", name: "Result D", layer: 2 },
    ],
    links: [
      { source: "A", target: "C", value: 20 },
      { source: "B", target: "C", value: 15 },
      { source: "C", target: "D", value: 35 },
    ],
  };

  return (
    <Sankey
      data={data}
      width={600}
      height={300}
      animated={true}
      showTooltip={true}
      highlightPath={true}
      className="border border-gray-300 rounded-lg"
    />
  );
}
```

## 📚 Stack Layout

Automatically stack boxes with priority system:

```jsx
import { DiagramProvider, Box } from "sweet-diagram";

function StackExample() {
  return (
    <DiagramProvider width={400} height={300}>
      {/* Boxes with same position will automatically stack */}
      <Box
        id="stack1"
        x={100}
        y={100}
        width={100}
        height={50}
        text="Priority 3"
        className="bg-blue-500 text-white"
        priority={3}
      />
      <Box
        id="stack2"
        x={100}
        y={100}
        width={100}
        height={50}
        text="Priority 2"
        className="bg-green-500 text-white"
        priority={2}
      />
      <Box
        id="stack3"
        x={100}
        y={100}
        width={100}
        height={50}
        text="Priority 1"
        className="bg-red-500 text-white"
        priority={1}
      />
    </DiagramProvider>
  );
}
```

## 🎨 Styling

Sweet Diagram uses minimal CSS for maximum flexibility:

```css
/* Only 2.6KB of essential styles */
@import "sweet-diagram/dist/sweet-diagram.css";
```

You can customize components using:

- **Tailwind classes** - `className="bg-blue-500 text-white"`
- **Custom CSS** - Style with your preferred method
- **Inline styles** - Direct style props

## 🚀 Performance Benefits

### Bundle Size Comparison

| Version | Size  | Improvement     |
| ------- | ----- | --------------- |
| v0.4.3  | 1.8MB | -               |
| v0.4.6  | 328KB | **82% smaller** |

### Optimization Details

- **CSS Optimization**: 124KB → 2.6KB (98% reduction)
- **JavaScript Optimization**: Tree-shaking and dead code elimination
- **Dependency Management**: Peer dependencies for flexibility
- **Build Optimization**: Advanced Terser configuration

## 🆕 What's New in v0.4.6

### 🌊 Sankey Diagrams

- **Interactive flow visualization** with proportional node heights
- **Path highlighting** and connection tracing
- **Animated flows** with smooth transitions
- **Custom styling** with TailwindCSS classes
- **Tooltip support** for detailed information

### 📚 Stack Layout System

- **Automatic box stacking** when boxes overlap
- **Priority-based ordering** for z-index management
- **Flexible positioning** with manual offset control
- **Group management** for organized layouts

### 🔧 Enhanced Features

- **Improved performance** with optimized rendering
- **Better TypeScript support** with comprehensive type definitions
- **Enhanced documentation** with interactive examples
- **Bug fixes** and stability improvements

## 🎯 Advanced Features

### Auto-Connect

Smart connection system with visual feedback:

```jsx
// Enable auto-connect mode with Shift + Click
<DiagramProvider autoConnect={true}>
  <Box id="source" x={100} y={100} text="Click + Shift to connect" />
  <Box id="target" x={300} y={200} text="Target box" />
</DiagramProvider>
```

### Vertical Text

Complete support for vertical text orientation:

```jsx
<Box
  text="Vertical Text"
  textDirection="vertical"
  verticalDirection="lr" // or "rl"
  className="bg-purple-500 text-white"
/>
```

### Animation Effects

Smooth animations and transitions:

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  animated={true}
  animationDuration={2000}
  className="text-blue-500"
/>
```

## 📖 Documentation

Visit our comprehensive documentation at [https://sweetpotato-diagram.vercel.app](https://sweetpotato-diagram.vercel.app) for:

- **Interactive examples** and live demos
- **API reference** with detailed props
- **Best practices** and usage patterns
- **Advanced tutorials** for complex scenarios

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=KoreaMoney/sweetpotato-diagram&type=Date)](https://star-history.com/#KoreaMoney/sweetpotato-diagram&Date)

---

**Made with ❤️ by KimDowon**
