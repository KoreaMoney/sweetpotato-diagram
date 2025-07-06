import React, { useState } from "react";
import { Box, Connector, Valve, ImageBox, Line, DiagramProvider } from "./index";
import { useToast } from "../ToastSystem";
import Sankey from "./Sankey";

const SystemExampleRenderer = ({ system, systemKey, ...props }) => {
  const { addToast } = useToast();
  const [selectedFlow, setSelectedFlow] = useState(null);

  const handleToastClick = (event, info) => {
    if (info.toastMessage) {
      addToast(info.toastMessage, info.toastType || "info");
    }
  };

  // Sankey 다이어그램 렌더링
  const renderSankeyDiagram = () => {
    if (system.type !== "sankey" || !system.data) return null;

    const handleFlowSelect = (flowId) => {
      setSelectedFlow(flowId);
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.title}</h3>
          <p className="text-gray-600 mb-4">{system.description}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-900 mb-2">📌 사용 방법</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 흐름을 클릭하면 연결된 전체 경로가 하이라이트됩니다</li>
              <li>• 노드나 흐름에 마우스를 올리면 상세 정보를 볼 수 있습니다</li>
              <li>• 선택된 흐름은 밝게 표시되고 나머지는 흐려집니다</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 overflow-scroll max-h-[600px]">
          <Sankey
            data={system.data}
            width={system.dimensions?.width || 900}
            height={system.dimensions?.height || 600}
            selectedFlow={selectedFlow}
            onFlowSelect={handleFlowSelect}
            highlightConnected={true}
            highlightPath={true}
            showTooltip={true}
            showValues={true}
            className="mx-auto"
          />
        </div>

        {selectedFlow && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">✅ 선택된 경로</h4>
            <p className="text-sm text-green-800">
              ID: <code className="bg-green-100 px-2 py-1 rounded">{selectedFlow}</code>
            </p>
            <p className="text-xs text-green-700 mt-1">연결된 전체 경로가 하이라이트되어 있습니다.</p>
          </div>
        )}
      </div>
    );
  };

  // Stack 다이어그램 렌더링
  const renderStackDiagram = () => {
    if (system.type !== "stack" || !system.components) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.title}</h3>
          <p className="text-gray-600 mb-4">{system.description}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-amber-900 mb-2">📌 Stack Priority 사용법</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• 각 레이어는 우선순위(priority)가 설정되어 있습니다</li>
              <li>• maintainPriority가 true인 레이어는 클릭해도 순서가 변경되지 않습니다</li>
              <li>• 클릭 가능한 컴포넌트들은 클릭 시 상세 정보가 표시됩니다</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 overflow-scroll max-h-[700px]">
          <DiagramProvider
            width={system.dimensions?.width || 1000}
            height={system.dimensions?.height || 700}
            className="border border-gray-200 rounded bg-white mx-auto"
          >
            {/* 컴포넌트 렌더링 */}
            {system.components.map((component, index) => {
              const componentKey = `${systemKey}-${component.id}-${index}`;
              const onClick = (event, info) => {
                if (component.toastMessage) {
                  addToast(component.toastMessage, component.toastType || "info");
                }
                if (handleToastClick) {
                  handleToastClick(event, info);
                }
              };

              if (component.type === "Box") {
                return (
                  <Box
                    key={componentKey}
                    id={component.id}
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    text={component.text}
                    className={component.className}
                    priority={component.priority}
                    maintainPriority={component.maintainPriority}
                    onClick={onClick}
                    {...props}
                  />
                );
              } else if (component.type === "ImageBox") {
                return (
                  <ImageBox
                    key={componentKey}
                    id={component.id}
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    src={component.src}
                    alt={component.alt}
                    text={component.text}
                    className={component.className}
                    priority={component.priority}
                    maintainPriority={component.maintainPriority}
                    onClick={onClick}
                    {...props}
                  />
                );
              }
              return null;
            })}

            {/* 커넥터 렌더링 */}
            {system.connectors &&
              system.connectors.map((connector, index) => {
                const connectorKey = `${systemKey}-connector-${index}`;
                return (
                  <Connector
                    key={connectorKey}
                    fromBox={connector.fromBox}
                    toBox={connector.toBox}
                    connectionType={connector.connectionType}
                    className={connector.className}
                    showArrow={connector.showArrow}
                    strokeWidth={connector.strokeWidth}
                    animated={connector.animated}
                    {...props}
                  />
                );
              })}
          </DiagramProvider>
        </div>
      </div>
    );
  };

  // 기본 시스템 다이어그램 렌더링 (기존 코드)
  const renderBasicDiagram = () => {
    if (system.type === "sankey" || system.type === "stack") return null;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.title}</h3>
          <p className="text-gray-600">{system.description}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 overflow-scroll max-h-[550px]">
          <DiagramProvider
            width={system.dimensions?.width || 800}
            height={system.dimensions?.height || 550}
            className="border border-gray-200 rounded bg-white mx-auto"
          >
            {/* 툴팁 */}
            <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow z-10">
              💡 {system.title} - 각 컴포넌트를 클릭해보세요!
            </div>

            {/* 기존 컴포넌트 렌더링 로직 */}
            {system.components.map((component, index) => {
              const componentKey = `${systemKey}-${component.id}-${index}`;
              const onClick = (event, info) => {
                if (component.toastMessage) {
                  addToast(component.toastMessage, component.toastType || "info");
                }
                if (handleToastClick) {
                  handleToastClick(event, info);
                }
              };

              if (component.type === "Box") {
                return (
                  <Box
                    key={componentKey}
                    id={component.id}
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    text={component.text}
                    className={component.className}
                    onClick={onClick}
                    {...props}
                  />
                );
              } else if (component.type === "ImageBox") {
                return (
                  <ImageBox
                    key={componentKey}
                    id={component.id}
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    src={component.src}
                    alt={component.alt}
                    text={component.text}
                    className={component.className}
                    onClick={onClick}
                    {...props}
                  />
                );
              }
              return null;
            })}

            {/* 밸브 렌더링 */}
            {system.valves &&
              system.valves.map((valve, index) => {
                const valveKey = `${systemKey}-valve-${index}`;
                return (
                  <Valve
                    key={valveKey}
                    x={valve.x}
                    y={valve.y}
                    size={valve.size}
                    type={valve.type}
                    isOpen={valve.isOpen}
                    className={valve.className}
                    onClick={valve.onClick}
                    {...props}
                  />
                );
              })}

            {/* 커넥터 렌더링 */}
            {system.connectors &&
              system.connectors.map((connector, index) => {
                const connectorKey = `${systemKey}-connector-${index}`;
                return (
                  <Connector
                    key={connectorKey}
                    fromBox={connector.fromBox}
                    toBox={connector.toBox}
                    connectionType={connector.connectionType}
                    className={connector.className}
                    showArrow={connector.showArrow}
                    strokeWidth={connector.strokeWidth}
                    animated={connector.animated}
                    {...props}
                  />
                );
              })}

            {/* 라인 렌더링 */}
            {system.lines &&
              system.lines.map((line, index) => {
                const lineKey = `${systemKey}-line-${index}`;
                const onClick = (event, info) => {
                  if (line.toastMessage) {
                    addToast(line.toastMessage, line.toastType || "info");
                  }
                };

                return (
                  <Line
                    key={lineKey}
                    startPoint={line.startPoint}
                    endPoint={line.endPoint}
                    strokeWidth={line.strokeWidth}
                    className={line.className}
                    onClick={onClick}
                    {...props}
                  />
                );
              })}
          </DiagramProvider>
        </div>
      </div>
    );
  };

  // 메인 렌더링 로직
  if (system.type === "sankey") {
    return renderSankeyDiagram();
  } else if (system.type === "stack") {
    return renderStackDiagram();
  } else {
    return renderBasicDiagram();
  }
};

export default SystemExampleRenderer;
