# 🍠 Sweet Diagram v0.4.4

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

### Hooks

- **`useDiagram`** - Access diagram context and state

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
| v0.4.4  | 328KB | **82% smaller** |

### Optimization Details

- **CSS Optimization**: 124KB → 2.6KB (98% reduction)
- **JavaScript Optimization**: Tree-shaking and dead code elimination
- **Dependency Management**: Peer dependencies for flexibility
- **Build Optimization**: Advanced Terser configuration

## 🆕 What's New in v0.4.4

### 🔥 Major Optimization

- **Ultra-lightweight bundle** - 82% size reduction
- **Optimized CSS** - Only essential styles included
- **Peer dependencies** - Better dependency management
- **Improved performance** - Faster load times

### 🎯 Enhanced Features

- **Vertical text support** - Complete LR/RL direction support
- **Animation effects** - Smooth transitions and flows
- **Advanced auto-connect** - Smart connection algorithms
- **TypeScript support** - Full type safety

## 📚 Documentation

### Component Props

#### Box Component

```jsx
<Box
  id="unique-id" // Required: Unique identifier
  x={100} // Required: X position
  y={100} // Required: Y position
  width={120} // Required: Box width
  height={80} // Required: Box height
  text="Box Text" // Optional: Display text
  textDirection="horizontal" // Optional: "horizontal" | "vertical"
  verticalDirection="lr" // Optional: "lr" | "rl" (for vertical text)
  className="custom-class" // Optional: Custom CSS classes
  onClick={(event, data) => {}} // Optional: Click handler
/>
```

#### Connector Component

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight" // "straight" | "curved" | "step"
  arrowDirection="forward" // "forward" | "backward" | "both"
  strokeWidth={2} // Line thickness
  animated={true} // Enable animation
  className="text-blue-500" // Custom styling
/>
```

#### DraggableBox Component

```jsx
<DraggableBox
  id="draggable-1"
  initialX={100}
  initialY={100}
  width={100}
  height={60}
  title="Draggable Box"
  color="blue" // Color theme
  onDrag={(position) => {}} // Drag handler
  onDragEnd={(position) => {}} // Drag end handler
/>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React 18+ and modern web standards
- Optimized for performance and bundle size
- Inspired by modern diagram editing tools

---

**Sweet Diagram** - Making diagram editing sweet and simple! 🍠✨
