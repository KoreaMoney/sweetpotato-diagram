import { Box, Connector, Valve } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const OverviewSection = ({ setActiveSection }) => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">🔗 Diagram</h1>
        <p className="text-xl">Reusable diagram component library for circuit design systems</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📋 Library Introduction</h2>
        <p className="text-gray-700 mb-4">
          The Diagram library is a collection of interactive diagram components based on React. It is designed to make
          it easy and fast to create various technical diagrams such as hydrogen fuel cell systems, electrical circuits,
          and process flow diagrams.
        </p>
        <p className="text-gray-700">
          All components support flexible styling using TailwindCSS and click events, allowing you to implement not only
          static diagrams but also interactive system monitoring dashboards.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">✨ Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">🎨 Flexible Styling</h3>
            <p className="text-sm text-blue-700">Free color, size, and border settings through TailwindCSS classes</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h3 className="font-semibold text-emerald-800 mb-2">🖱️ Interactive</h3>
            <p className="text-sm text-emerald-700">All components support click events for dynamic interaction</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">🔗 Smart Connection</h3>
            <p className="text-sm text-purple-700">
              Automatic connection point calculation and various connection types
            </p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">📱 Responsive</h3>
            <p className="text-sm text-amber-700">Flexible layout support for various screen sizes</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🧩 Component List</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold mb-1">Box</h3>
            <p className="text-sm text-gray-600">Basic box representing system components</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-semibold mb-1">Connector</h3>
            <p className="text-sm text-gray-600">Connection lines between components (straight, curved, custom)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🔺</div>
            <h3 className="font-semibold mb-1">Triangle</h3>
            <p className="text-sm text-gray-600">Triangle for direction indication</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🚰</div>
            <h3 className="font-semibold mb-1">Valve</h3>
            <p className="text-sm text-gray-600">Gate/Ball valve (open/closed state)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🖼️</div>
            <h3 className="font-semibold mb-1">ImageBox</h3>
            <p className="text-sm text-gray-600">Box containing images</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">➡️</div>
            <h3 className="font-semibold mb-1">Arrow</h3>
            <p className="text-sm text-gray-600">Directional arrow (unidirectional/bidirectional)</p>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📏</div>
            <h3 className="font-semibold mb-1">Line</h3>
            <p className="text-sm text-gray-600">Basic straight line (connection, separator, auxiliary line)</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">📦 Installation</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">NPM Installation</h3>
          <pre className="text-sm">
            {`# Install with NPM
npm install sweet-diagram

# Or with Yarn
yarn add sweet-diagram

# Or with Pnpm
pnpm add sweet-diagram`}
          </pre>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-medium text-blue-800 mb-2">📋 Required Dependencies</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • <strong>React:</strong> ^18.0.0
            </li>
            <li>
              • <strong>TailwindCSS:</strong> ^3.0.0
            </li>
            <li>
              • <strong>React DOM:</strong> ^18.0.0
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 Quick Start</h2>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">1. Import Components</h3>
          <pre className="text-sm overflow-x-auto">
            {`import { 
  Box, 
  Connector, 
  Triangle, 
  Valve, 
  ImageBox, 
  Arrow, 
  Line 
} from 'sweet-diagram';`}
          </pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-4">
          <h3 className="text-white text-lg font-semibold mb-3">2. Basic Usage Example</h3>
          <pre className="text-sm overflow-x-auto">
            {`function MyDiagram() {
  const boxes = [
    { id: "tank", x: 50, y: 50, width: 80, height: 40 },
    { id: "pump", x: 200, y: 50, width: 80, height: 40 }
  ];

  return (
    <div className="relative w-full h-64 bg-gray-50">
      <Box
        id="tank"
        x={50}
        y={50}
        width={80}
        height={40}
        text="H2 Tank"
        className="bg-blue-500 text-white border-2 border-blue-700 rounded"
        onClick={() => console.log('Tank clicked')}
      />
      
      <Box
        id="pump"
        x={200}
        y={50}
        width={80}
        height={40}
        text="Pump"
        className="bg-emerald-500 text-white border-2 border-emerald-700 rounded"
        onClick={() => console.log('Pump clicked')}
      />
      
      <Connector
        fromBox={{ id: "tank", position: "right" }}
        toBox={{ id: "pump", position: "left" }}
        boxes={boxes}
        connectionType="straight"
        className="text-blue-600"
        showArrow={true}
      />
      
      <Valve
        x={165}
        y={62}
        size={15}
        type="gate"
        isOpen={true}
        className="text-gray-600"
      />
    </div>
  );
}`}
          </pre>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Preview Result</h3>
          <div className="relative w-full h-32 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Box
              id="quick-tank"
              x={50}
              y={50}
              width={80}
              height={40}
              text="H2 Tank"
              className="bg-blue-500 text-white border-2 border-blue-700 rounded text-xs"
            />

            <Box
              id="quick-pump"
              x={200}
              y={50}
              width={80}
              height={40}
              text="Pump"
              className="bg-emerald-500 text-white border-2 border-emerald-700 rounded text-xs"
            />

            <Connector
              fromBox={{ id: "quick-tank", position: "right" }}
              toBox={{ id: "quick-pump", position: "left" }}
              boxes={[
                { id: "quick-tank", x: 50, y: 50, width: 80, height: 40 },
                { id: "quick-pump", x: 200, y: 50, width: 80, height: 40 },
              ]}
              connectionType="straight"
              className="text-blue-600"
              showArrow={true}
            />

            <Valve x={165} y={62} size={15} type="gate" isOpen={true} className="text-gray-600" />
          </div>
        </div>

        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4">
          <h4 className="font-medium text-emerald-800 mb-2">💡 Development Tips</h4>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Use TailwindCSS classes for styling components</li>
            <li>• Component coordinates are based on absolute positioning</li>
            <li>• Connector automatically calculates connection points</li>
            <li>• All components support responsive design</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🎨 Styling Guide</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Basic Styling</h3>
            <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              {`<Box 
  className="bg-blue-500 text-white border-2 border-blue-700 rounded-lg"
  x={100} y={100} width={120} height={60}
  text="Styled Box"
/>`}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Interactive Styles</h3>
            <pre className="text-sm bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              {`<Box 
  className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors"
  onClick={() => alert('Clicked!')}
  x={100} y={100} width={120} height={60}
  text="Click Me"
/>`}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveSection && setActiveSection("box")}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-left transition-colors"
          >
            <h3 className="font-semibold mb-2">📦 Box Component</h3>
            <p className="text-sm opacity-90">Learn about basic box component usage</p>
          </button>
          <button
            onClick={() => setActiveSection && setActiveSection("connector")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-lg text-left transition-colors"
          >
            <h3 className="font-semibold mb-2">🔗 Connector Component</h3>
            <p className="text-sm opacity-90">Learn about connection line components</p>
          </button>
          <button
            onClick={() => {
              addToast("Feature coming soon! 🚀", "info");
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-left transition-colors"
          >
            <h3 className="font-semibold mb-2">💡 Advanced Examples</h3>
            <p className="text-sm opacity-90">View complex diagram examples</p>
          </button>
          <button
            onClick={() => {
              addToast("Community support available! 💬", "success");
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-lg text-left transition-colors"
          >
            <h3 className="font-semibold mb-2">❓ Support</h3>
            <p className="text-sm opacity-90">Get help and community support</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
