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
    className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="box2"
    x={280} 
    y={120} 
    width={80} 
    height={30} 
    text="끝" 
    className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-sm"
  />
  <Box 
    id="obstacle"
    x={140} 
    y={80} 
    width={60} 
    height={25} 
    text="장애물" 
    className="bg-gray-400 text-white border-gray-600 border-2 rounded-lg text-xs"
  />
  <Connector
    fromBox={{ id: "box1", position: "right" }}
    toBox={{ id: "box2", position: "left" }}
    connectionType="custom"
    bendPoints={[
      { x: 130, y: 65 },
      { x: 130, y: 30 },
      { x: 250, y: 30 },
      { x: 250, y: 135 }
    ]}
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

        // bendPoints 추출 (복잡한 객체 배열) - 개선된 파싱
        const bendPointsMatch = propsString.match(/bendPoints={\[\s*([\s\S]*?)\s*\]}/);
        if (bendPointsMatch) {
          try {
            const bendPointsStr = bendPointsMatch[1];
            // 각 bendPoint를 파싱 - 더 유연한 패턴으로 수정
            const pointMatches = bendPointsStr.matchAll(/{\s*x:\s*(\d+)\s*,\s*y:\s*(\d+)\s*}/g);
            const bendPoints = [];
            for (const pointMatch of pointMatches) {
              bendPoints.push({
                x: parseInt(pointMatch[1]),
                y: parseInt(pointMatch[2]),
              });
            }
            if (bendPoints.length > 0) {
              props.bendPoints = bendPoints;
            } else {
              // 더 복잡한 형태의 bendPoints 파싱 시도 (여러 줄, 공백 등)
              const multilinePointMatches = bendPointsStr.matchAll(/{\s*x:\s*(\d+)\s*,\s*y:\s*(\d+)\s*},?\s*/g);
              const multilineBendPoints = [];
              for (const pointMatch of multilinePointMatches) {
                multilineBendPoints.push({
                  x: parseInt(pointMatch[1]),
                  y: parseInt(pointMatch[2]),
                });
              }
              if (multilineBendPoints.length > 0) {
                props.bendPoints = multilineBendPoints;
              } else {
                console.warn(`⚠️ bendPoints 파싱 실패 - 패턴을 찾을 수 없습니다:`, bendPointsStr);
              }
            }
            // bendPoints가 비어있으면 undefined로 유지 (빈 배열 설정하지 않음)
          } catch (error) {
            console.error("bendPoints 파싱 오류:", error);
          }
        }

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

        // arrowDirection 추출
        const arrowDirMatch = propsString.match(/arrowDirection=["']([^"']+)["']/);
        if (arrowDirMatch) props.arrowDirection = arrowDirMatch[1];

        // arrowSize 추출
        const arrowSizeMatch = propsString.match(/arrowSize={(\d+)}/);
        if (arrowSizeMatch) props.arrowSize = parseInt(arrowSizeMatch[1]);

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
        <CodeEditor editableCode={editableCode} onCodeChange={handleCodeChange}/>
        <LivePreview parsedComponents={parsedComponents} />
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">💡 기본 속성 팁</h4>
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

        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-800 mb-2">🛠️ 고급 기능</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>
              • <code className="bg-green-100 px-1 rounded">connectionType="custom"</code> +{" "}
              <code className="bg-green-100 px-1 rounded">bendPoints</code>로 사용자 정의 경로 생성
            </li>
            <li>
              • <code className="bg-green-100 px-1 rounded">arrowDirection="both"</code>로 양방향 화살표 설정
            </li>
            <li>
              • <code className="bg-green-100 px-1 rounded">connectionType="orthogonal"</code>로 직각 연결
            </li>
            <li>
              • <code className="bg-green-100 px-1 rounded">connectionType="curved"</code>로 곡선 연결
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
