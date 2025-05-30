# SweetPD

A modern and intuitive diagram component library for React applications. Built with React, Three.js, and TailwindCSS.

![SweetPD Demo](https://via.placeholder.com/800x400?text=SweetPD+Diagram+Components)

## ✨ Features

- 🎨 **Modern UI**: Beautiful and intuitive interface
- 🎯 **Drag & Drop**: Easy component manipulation with DraggableBox
- 🔗 **Smart Connections**: Intelligent Connector system with bidirectional support
- 🎮 **Interactive**: Full mouse and keyboard support
- 📱 **Responsive**: Works on all screen sizes
- 🎭 **Customizable**: Highly configurable components with TailwindCSS
- ⚡ **Performance**: Optimized with React 19 and Vite
- 📚 **Documentation**: Built-in interactive documentation

## 📦 Installation

### npm

```bash
npm install sweetpd
```

### pnpm

```bash
pnpm add sweetpd
```

### Yarn (including Yarn Berry)

```bash
yarn add sweetpd
```

## 🚀 Quick Start

```jsx
import React from "react";
import { SweetDiagram, DiagramProvider } from "sweetpd";

function App() {
  return (
    <DiagramProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <SweetDiagram />
      </div>
    </DiagramProvider>
  );
}

export default App;
```

## 📖 Components

### Core Components

#### Box

Basic box component for diagram elements.

```jsx
import { Box, DiagramProvider } from "sweetpd";

<DiagramProvider>
  <Box
    id="sample-box"
    x={100}
    y={100}
    width={120}
    height={60}
    text="Sample Box"
    backgroundColor="#3B82F6"
    textColor="#FFFFFF"
    onClick={(event, boxInfo) => console.log("Box clicked", boxInfo)}
  />
</DiagramProvider>;
```

#### DraggableBox

Draggable version of the Box component.

```jsx
import { DraggableBox, DiagramProvider } from "sweetpd";

<DiagramProvider>
  <DraggableBox
    id="draggable-box"
    initialX={100}
    initialY={100}
    text="Drag me!"
    onPositionChange={(newX, newY) => console.log(`New position: ${newX}, ${newY}`)}
  />
</DiagramProvider>;
```

#### Connector

Smart bidirectional connector between components.

```jsx
import { Connector, Box, DiagramProvider } from "sweetpd";

<DiagramProvider>
  <Box id="box1" x={50} y={50} text="Box 1" />
  <Box id="box2" x={200} y={150} text="Box 2" />
  <Connector
    fromElementId="box1"
    toElementId="box2"
    strokeColor="#10B981"
    strokeWidth={3}
    bidirectional={true}
    animated={true}
  />
</DiagramProvider>;
```

#### Arrow

Directional arrow component.

```jsx
import { Arrow } from "sweetpd";

<Arrow startX={100} startY={100} endX={200} endY={150} color="#EF4444" strokeWidth={2} arrowSize={10} />;
```

#### Line

Simple line component.

```jsx
import { Line } from "sweetpd";

<Line startX={0} startY={0} endX={100} endY={100} strokeColor="#6B7280" strokeWidth={2} />;
```

### Specialized Components

#### Triangle

Triangle shape component.

```jsx
import { Triangle } from "sweetpd";

<Triangle x={150} y={75} size={30} direction="up" fillColor="#F59E0B" borderColor="#D97706" />;
```

#### Valve

Specialized valve component for system diagrams.

```jsx
import { Valve } from "sweetpd";

<Valve
  id="main-valve"
  x={300}
  y={200}
  size={40}
  isOpen={true}
  onToggle={(isOpen) => console.log(`Valve is ${isOpen ? "open" : "closed"}`)}
/>;
```

#### ImageBox

Box component with image support.

```jsx
import { ImageBox } from "sweetpd";

<ImageBox
  id="image-component"
  x={200}
  y={100}
  imageUrl="/path/to/image.png"
  text="Image Box"
  width={150}
  height={100}
/>;
```

### Utility Components

#### CodeEditor

Real-time code editor for component configuration.

```jsx
import { CodeEditor } from "sweetpd";

<CodeEditor
  initialCode={`<Box x={100} y={100} text="Sample Box" />`}
  onCodeChange={(newCode) => console.log("Code changed:", newCode)}
/>;
```

#### Documentation

Interactive documentation component.

```jsx
import { Documentation } from "sweetpd";

<Documentation />;
```

## 🎣 Context & Hooks

### DiagramProvider

Context provider for diagram state management.

```jsx
import { DiagramProvider, useDiagram } from "sweetpd";

function App() {
  return (
    <DiagramProvider>
      <YourDiagramComponents />
    </DiagramProvider>
  );
}

function YourComponent() {
  const { state, dispatch } = useDiagram();
  // Use diagram state
}
```

## 📚 Demo Components

### ConnectorExamples

Pre-built examples showcasing Connector capabilities.

```jsx
import { ConnectorExamples } from "sweetpd";

<ConnectorExamples />;
```

### ArrowDemo

Interactive demo for Arrow component.

```jsx
import { ArrowDemo } from "sweetpd";

<ArrowDemo />;
```

## 🎨 Styling

The library uses TailwindCSS for styling. All components are fully customizable:

```jsx
<Box
  className="hover:shadow-lg transition-all duration-300"
  backgroundColor="#8B5CF6"
  borderColor="#7C3AED"
  // ... other props
/>
```

## 📊 Complete Example

```jsx
import React from "react";
import { DiagramProvider, Box, DraggableBox, Connector, Valve, Triangle } from "sweetpd";

function SystemDiagram() {
  return (
    <DiagramProvider>
      <div className="w-full h-screen bg-gray-50 relative">
        {/* Static components */}
        <Box id="input" x={50} y={100} text="Input" backgroundColor="#3B82F6" />

        <Box id="output" x={400} y={100} text="Output" backgroundColor="#10B981" />

        {/* Draggable component */}
        <DraggableBox id="processor" initialX={200} initialY={100} text="Processor" backgroundColor="#F59E0B" />

        {/* Control valve */}
        <Valve id="control-valve" x={125} y={125} isOpen={true} />

        {/* Direction indicator */}
        <Triangle x={325} y={115} size={20} direction="right" fillColor="#EF4444" />

        {/* Connections */}
        <Connector fromElementId="input" toElementId="control-valve" strokeColor="#3B82F6" />

        <Connector fromElementId="processor" toElementId="output" strokeColor="#10B981" bidirectional={true} />
      </div>
    </DiagramProvider>
  );
}
```

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/sweetpotato/sweetpd.git

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start development server
npm run dev

# Build library
npm run build:lib

# Run linting
npm run lint
```

## 📦 Publishing to NPM

### Prerequisites

1. Create an NPM account at [npmjs.com](https://www.npmjs.com/)
2. Login to NPM in your terminal:
   ```bash
   npm login
   ```

### Publishing Steps

1. **Build the library:**

   ```bash
   npm run build:lib
   ```

2. **Test the package locally:**

   ```bash
   npm pack --dry-run
   ```

3. **Publish to NPM:**
   ```bash
   npm publish
   ```

### Version Management

Update version before publishing:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

### Package Manager Compatibility

This package supports all major package managers:

- **npm**: `npm install sweetpd`
- **pnpm**: `pnpm add sweetpd`
- **Yarn Classic**: `yarn add sweetpd`
- **Yarn Berry**: `yarn add sweetpd` (with .yarnrc.yml configuration)

## 📝 License

MIT © SweetPotato

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by SweetPotato
