import { useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import LivePreview from "./LivePreview.jsx";

const UsageGuide = () => {
  const [editableCode, setEditableCode] = useState(`<DiagramProvider>
  <Box 
    id="box1"
    x={50} 
    y={50} 
    width={80} 
    height={30} 
    text="시작" 
    className="bg-blue-600 text-white border-blue-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="box2"
    x={200} 
    y={100} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-green-600 text-white border-green-800 border-2 rounded-lg text-sm"
  />
  <Connector
    fromBox={{ id: "box1", position: "right" }}
    toBox={{ id: "box2", position: "left" }}
    connectionType="straight"
    showArrow={true}
    strokeWidth={2}
    className="text-blue-600"
  />
</DiagramProvider>`);

  const handleCodeChange = (e) => {
    setEditableCode(e.target.value);
  };

  // JSX 코드를 파싱하여 Box와 Connector 컴포넌트 추출
  const parseComponents = (code) => {
    const boxes = [];
    const connectors = [];

    try {
      // Box 컴포넌트 파싱
      const boxMatches = code.matchAll(/<Box\s+([^>]*?)\/?>(?:<\/Box>)?/g);
      for (const match of boxMatches) {
        const props = {};
        const propsString = match[1];

        // id 추출
        const idMatch = propsString.match(/id=["']([^"']+)["']/);
        if (idMatch) props.id = idMatch[1];

        // 숫자 props 추출
        const numProps = ["x", "y", "width", "height"];
        numProps.forEach((prop) => {
          const regex = new RegExp(`${prop}={(\\d+)}`);
          const propMatch = propsString.match(regex);
          if (propMatch) props[prop] = parseInt(propMatch[1]);
        });

        // text 추출
        const textMatch = propsString.match(/text=["']([^"']+)["']/);
        if (textMatch) props.text = textMatch[1];

        // className 추출
        const classMatch = propsString.match(/className=["']([^"']+)["']/);
        if (classMatch) props.className = classMatch[1];

        if (props.id) boxes.push(props);
      }

      // Connector 컴포넌트 파싱
      const connectorMatches = code.matchAll(/<Connector\s+([^>]*?)\/?>(?:<\/Connector>)?/g);
      for (const match of connectorMatches) {
        const props = {};
        const propsString = match[1];

        // fromBox 추출
        const fromBoxMatch = propsString.match(
          /fromBox={{\s*id:\s*["']([^"']+)["']\s*,\s*position:\s*["']([^"']+)["']\s*}}/
        );
        if (fromBoxMatch) {
          props.fromBox = { id: fromBoxMatch[1], position: fromBoxMatch[2] };
        }

        // toBox 추출
        const toBoxMatch = propsString.match(
          /toBox={{\s*id:\s*["']([^"']+)["']\s*,\s*position:\s*["']([^"']+)["']\s*}}/
        );
        if (toBoxMatch) {
          props.toBox = { id: toBoxMatch[1], position: toBoxMatch[2] };
        }

        // connectionType 추출
        const typeMatch = propsString.match(/connectionType=["']([^"']+)["']/);
        if (typeMatch) props.connectionType = typeMatch[1];

        // showArrow 추출
        const arrowMatch = propsString.match(/showArrow={true}/);
        if (arrowMatch) props.showArrow = true;

        // strokeWidth 추출
        const widthMatch = propsString.match(/strokeWidth={(\d+)}/);
        if (widthMatch) props.strokeWidth = parseInt(widthMatch[1]);

        // className 추출
        const classMatch = propsString.match(/className=["']([^"']+)["']/);
        if (classMatch) props.className = classMatch[1];

        // animated 추출
        const animatedMatch = propsString.match(/animated={true}/);
        if (animatedMatch) props.animated = true;

        // dashArray 추출
        const dashMatch = propsString.match(/dashArray=["']([^"']+)["']/);
        if (dashMatch) props.dashArray = dashMatch[1];

        props.id = `connector-${Math.random()}`;
        connectors.push(props);
      }
    } catch (error) {
      console.error("코드 파싱 오류:", error);
    }

    return { boxes, connectors };
  };

  const parsedComponents = parseComponents(editableCode);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 실시간 코드 편집기</h2>
      <p className="text-gray-600 mb-6">왼쪽에서 코드를 편집하면 오른쪽에서 실시간으로 결과를 확인할 수 있습니다.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        <CodeEditor editableCode={editableCode} onCodeChange={handleCodeChange} />
        <LivePreview parsedComponents={parsedComponents} />
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">💡 화살표 표시 팁</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <code className="bg-blue-100 px-1 rounded">showArrow={`{true}`}</code>를 추가하면 화살표가 표시됩니다
          </li>
          <li>
            • <code className="bg-blue-100 px-1 rounded">strokeWidth</code>로 선 두께를 조절할 수 있습니다
          </li>
          <li>
            • <code className="bg-blue-100 px-1 rounded">className</code>으로 색상과 스타일을 변경할 수 있습니다
          </li>
          <li>
            • <code className="bg-blue-100 px-1 rounded">animated={`{true}`}</code>로 애니메이션을 추가할 수 있습니다
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsageGuide;
