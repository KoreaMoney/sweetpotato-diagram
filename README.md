🍠 Sweet Diagram

[![npm version](https://badge.fury.io/js/sweet-diagram.svg)](https://badge.fury.io/js/sweet-diagram)
[![Downloads](https://img.shields.io/npm/dm/sweet-diagram.svg)](https://www.npmjs.com/package/sweet-diagram)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)

**현대적이고 직관적인 React 다이어그램 에디터 컴포넌트** with advanced auto-connect features, Sankey diagrams, Stack functionality, vertical text support, animation effects, and comprehensive component library.

🌐 **Live Demo**: [https://sweetpotato-diagram.vercel.app](https://sweetpotato-diagram.vercel.app)

![Sweet Diagram Preview](https://raw.githubusercontent.com/KoreaMoney/sweetpotato-diagram/main/public/main.png)

## ✨ Key Features

- 🎯 **Complete Diagram Solution** - Box, Connector, Arrow, Triangle, Valve, Line, ImageBox components
- 🌊 **Sankey Diagrams** - Interactive flow diagrams with proportional connections and JSON import/export
- 📚 **Stack Layout System** - Automatic stacking with priority-based positioning
- 🔄 **Auto-Connect** - Intelligent connection system with multiple algorithms
- 🔗 **Junction Points** - Advanced connection points for complex diagram layouts
- ↩️ **Undo/Redo System** - Complete history management with keyboard shortcuts (Ctrl+Z/Ctrl+Y)
- 📝 **Vertical Text Support** - Both horizontal and vertical text orientations
- 🎨 **Modern Styling** - Built with TailwindCSS for beautiful designs
- 🖱️ **Interactive & Draggable** - Full mouse and touch support
- ⚡ **High Performance** - Optimized for large diagrams
- 🎭 **Animation Support** - Smooth transitions and effects
- 📱 **Responsive Design** - Works on all screen sizes
- 🔧 **TypeScript Ready** - Full type definitions included
- 🎪 **Zero Config** - Works out of the box

## 🚀 Quick Installation & Usage

### Step 1: Install Package

```bash
# NPM으로 설치
npm install sweet-diagram

# 또는 Yarn으로 설치
yarn add sweet-diagram

# 또는 PNPM으로 설치
pnpm add sweet-diagram
```

### Step 2: Install Required Dependencies

Sweet Diagram uses peer dependencies for better flexibility:

```bash
# React (required)
npm install react react-dom

# TailwindCSS (highly recommended for styling)
npm install tailwindcss

# Additional peer dependencies (if using advanced features)
npm install @react-three/drei @react-three/fiber three lucide-react zustand
```

We moved heavy dependencies to peer dependencies to give you:

- **Flexibility** - Use your preferred versions
- **Smaller bundle** - Avoid duplicate dependencies
- **Better performance** - Shared dependencies across your app

### Step 3: Import CSS & Components

```jsx
import React from "react";
import { DiagramProvider, Box, Connector, Sankey, Triangle, Valve } from "sweet-diagram";
import "sweet-diagram/dist/sweet-diagram.css";

function MyApp() {
  return (
    <div className="w-full h-full">
      <DiagramProvider width={800} height={600}>
        <Box
          id="box1"
          x={100}
          y={100}
          width={120}
          height={80}
          text="시작점"
          className="bg-blue-500 text-white rounded-lg"
        />

        <Box
          id="box2"
          x={300}
          y={200}
          width={120}
          height={80}
          text="끝점"
          className="bg-green-500 text-white rounded-lg"
        />

        <Connector
          fromBox={{ id: "box1", position: "right" }}
          toBox={{ id: "box2", position: "left" }}
          connectionType="straight"
          showArrow={true}
        />
      </DiagramProvider>
    </div>
  );
}

export default MyApp;
```

## 🌊 Sankey Diagram Usage

```jsx
import React from "react";
import { Sankey } from "sweet-diagram";
import "sweet-diagram/dist/sweet-diagram.css";

function SankeyExample() {
  const data = {
    nodes: [
      { id: "A", name: "소스 A", layer: 0 },
      { id: "B", name: "소스 B", layer: 0 },
      { id: "C", name: "중간 처리", layer: 1 },
      { id: "D", name: "최종 결과", layer: 2 },
    ],
    links: [
      { id: "link1", source: "A", target: "C", value: 30 },
      { id: "link2", source: "B", target: "C", value: 20 },
      { id: "link3", source: "C", target: "D", value: 50 },
    ],
  };

  return (
    <div className="w-full h-96">
      <Sankey data={data} width={600} height={400} className="mx-auto border rounded-lg" />
    </div>
  );
}
```

### Sankey with JSON Import/Export

```jsx
import React, { useState } from "react";
import { Sankey } from "sweet-diagram";

function SankeyWithImport() {
  const [sankeyData, setSankeyData] = useState(null);

  const handleImportJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setSankeyData(data);
      } catch (error) {
        console.error("Invalid JSON file:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleExportJSON = () => {
    if (sankeyData) {
      const blob = new Blob([JSON.stringify(sankeyData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sankey-data.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={(e) => handleImportJSON(e.target.files[0])} />
      <button onClick={handleExportJSON}>Export JSON</button>
      {sankeyData && <Sankey data={sankeyData} width={600} height={400} />}
    </div>
  );
}
```

## 🔗 Junction Points Usage

```jsx
import React from "react";
import { DiagramProvider, Box, Connector, Junction } from "sweet-diagram";

function JunctionExample() {
  return (
    <DiagramProvider width={800} height={600}>
      <Box id="input1" x={50} y={100} width={100} height={60} text="Input 1" />
      <Box id="input2" x={50} y={200} width={100} height={60} text="Input 2" />
      <Box id="output" x={600} y={150} width={100} height={60} text="Output" />

      {/* Junction Point for merging connections */}
      <Junction id="junction1" x={400} y={150} size={8} className="fill-red-500 stroke-red-700" />

      {/* Connections to junction */}
      <Connector fromBox={{ id: "input1" }} toBox={{ id: "junction1" }} connectionType="orthogonal" />
      <Connector fromBox={{ id: "input2" }} toBox={{ id: "junction1" }} connectionType="orthogonal" />

      {/* Connection from junction to output */}
      <Connector fromBox={{ id: "junction1" }} toBox={{ id: "output" }} connectionType="straight" />
    </DiagramProvider>
  );
}
```

## ↩️ Undo/Redo System Usage

```jsx
import React from "react";
import { DiagramProvider, DraggableBox, UndoRedoButtons, useDiagram } from "sweet-diagram";

function UndoRedoExample() {
  const DebugInfo = () => {
    const { getDiagramStats } = useDiagram();
    const stats = getDiagramStats();

    return (
      <div className="absolute top-4 left-4 bg-white p-3 rounded shadow">
        <div>Undo 가능: {stats.canUndo ? "✅" : "❌"}</div>
        <div>Redo 가능: {stats.canRedo ? "✅" : "❌"}</div>
        <div>히스토리: {stats.historyIndex + 1}개</div>
      </div>
    );
  };

  return (
    <DiagramProvider width={800} height={600}>
      {/* Draggable boxes that support undo/redo */}
      <DraggableBox
        id="box1"
        initialX={100}
        initialY={100}
        width={120}
        height={80}
        title="드래그해보세요"
        color="blue"
      />

      <DraggableBox id="box2" initialX={300} initialY={200} width={120} height={80} title="박스 2" color="green" />

      {/* Undo/Redo Buttons with various styles */}
      <UndoRedoButtons position="top-right" variant="gradient" showLabels={true} enableKeyboardShortcuts={true} />

      {/* Custom styled undo/redo buttons */}
      <UndoRedoButtons
        position="bottom-right"
        customStyle={{
          undo: "bg-red-500 hover:bg-red-600 text-white shadow-lg rounded-full",
          redo: "bg-green-500 hover:bg-green-600 text-white shadow-lg rounded-full",
        }}
        customLabels={{ undo: "되돌리기", redo: "앞으로" }}
      />

      <DebugInfo />
    </DiagramProvider>
  );
}
```

## 🎯 Full Example

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

## 📦 Package.json Configuration

Make sure your `package.json` includes:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "sweet-diagram": "^0.4.6"
  },
  "peerDependencies": {
    "tailwindcss": "^3.0.0"
  }
}
```

## 🎨 TailwindCSS Integration

Sweet Diagram is designed to work perfectly with TailwindCSS. Add this to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/sweet-diagram/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 📚 Documentation

Visit our [comprehensive documentation](https://sweetpotato-diagram.vercel.app) for:

- 📖 Complete API reference
- 🎯 Interactive examples
- 🎨 Styling guides
- ⚡ Performance tips
- 🛠️ Advanced usage patterns

## 🧪 TypeScript Support

Full TypeScript definitions are included:

```typescript
import { BoxProps, ConnectorProps, SankeyData, DiagramContextType } from "sweet-diagram";
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌟 Show Your Support

Give us a ⭐️ if this project helped you!

---

**Made with ❤️ by the Sweet Diagram Team**
