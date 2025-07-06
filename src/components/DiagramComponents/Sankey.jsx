import React, { useState, useRef } from "react";

const Sankey = ({
  data = { nodes: [], links: [] },
  width = 800,
  height = 400,
  nodeWidth = 20,
  nodePadding = 30,
  linkOpacity = 0.6,
  animated = false,
  colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"],
  className = "",
  onNodeClick = null,
  onLinkClick = null,
  showTooltip = true,
  showValues = true,
  selectedFlow = null,
  onFlowSelect = null,
  highlightConnected = true,
  highlightPath = true,
  // TailwindCSS 관련 props
  nodeClassName = "",
  linkClassName = "",
  svgClassName = "border border-gray-200 rounded-lg bg-white shadow-sm",
  tooltipClassName = "absolute z-10 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none max-w-xs break-words",
  labelClassName = "font-medium select-none transition-all duration-300",
  customNodeStyles = {},
  customLinkStyles = {},
}) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

  // 노드별 총 입력/출력 흐름량 계산
  const calculateNodeFlows = () => {
    const nodeFlows = {};

    data.nodes.forEach((node) => {
      nodeFlows[node.id] = { inFlow: 0, outFlow: 0, totalFlow: 0 };
    });

    data.links.forEach((link) => {
      const value = link.value || 0;
      if (nodeFlows[link.source]) {
        nodeFlows[link.source].outFlow += value;
      }
      if (nodeFlows[link.target]) {
        nodeFlows[link.target].inFlow += value;
      }
    });

    // 총 흐름량 = max(입력, 출력)
    Object.keys(nodeFlows).forEach((nodeId) => {
      const flow = nodeFlows[nodeId];
      flow.totalFlow = Math.max(flow.inFlow, flow.outFlow);
    });

    return nodeFlows;
  };

  // 전체 경로 추적 함수
  const findConnectedPath = (selectedLinkId) => {
    if (!selectedLinkId || !highlightPath) return { nodes: [], links: [] };

    const selectedLink = data.links.find((link) => {
      const linkId = link.id || `link-${link.source}-${link.target}`;
      return linkId === selectedLinkId;
    });

    if (!selectedLink) return { nodes: [], links: [] };

    const connectedNodes = new Set();
    const connectedLinks = new Set();
    const linkMap = {};

    // 링크 맵 생성
    data.links.forEach((link) => {
      const linkId = link.id || `link-${link.source}-${link.target}`;
      linkMap[linkId] = link;

      if (!connectedNodes.has(link.source)) {
        connectedNodes.add(link.source);
      }
      if (!connectedNodes.has(link.target)) {
        connectedNodes.add(link.target);
      }
    });

    // 선택된 링크부터 시작해서 연결된 모든 경로 찾기
    const visited = new Set();
    const queue = [selectedLinkId];

    while (queue.length > 0) {
      const currentLinkId = queue.shift();
      if (visited.has(currentLinkId)) continue;

      visited.add(currentLinkId);
      connectedLinks.add(currentLinkId);

      const currentLink = linkMap[currentLinkId];
      if (!currentLink) continue;

      // 현재 링크와 연결된 다른 링크들 찾기
      data.links.forEach((link) => {
        const linkId = link.id || `link-${link.source}-${link.target}`;
        if (visited.has(linkId)) return;

        // 같은 소스나 타겟을 가진 링크들을 경로에 포함
        if (link.source === currentLink.target || link.target === currentLink.source) {
          queue.push(linkId);
        }
      });
    }

    // 연결된 노드들 수집
    const pathNodes = new Set();
    connectedLinks.forEach((linkId) => {
      const link = linkMap[linkId];
      if (link) {
        pathNodes.add(link.source);
        pathNodes.add(link.target);
      }
    });

    return {
      nodes: Array.from(pathNodes),
      links: Array.from(connectedLinks),
    };
  };

  // 노드 위치 및 크기 계산
  const calculateNodePositions = () => {
    const nodeFlows = calculateNodeFlows();
    const maxTotalFlow = Math.max(...Object.values(nodeFlows).map((f) => f.totalFlow));
    const layers = {};

    // 레이어별로 노드 그룹화
    data.nodes.forEach((node) => {
      const layer = node.layer || 0;
      if (!layers[layer]) layers[layer] = [];
      layers[layer].push(node);
    });

    const layerCount = Object.keys(layers).length;
    const layerWidth = layerCount > 1 ? (width - nodeWidth * layerCount) / (layerCount - 1) : 0;

    const nodes = data.nodes.map((node, index) => {
      const layer = node.layer || 0;
      const layerNodes = layers[layer];
      const nodeIndex = layerNodes.indexOf(node);

      // 노드 높이를 흐름량에 비례하여 계산
      const flow = nodeFlows[node.id];
      const nodeHeight = maxTotalFlow > 0 ? Math.max(20, (flow.totalFlow / maxTotalFlow) * (height * 0.6)) : 40;

      // 레이어 내에서 노드들의 수직 위치 계산
      const layerTotalHeight = layerNodes.reduce((sum, n) => {
        const nFlow = nodeFlows[n.id];
        return sum + (maxTotalFlow > 0 ? Math.max(20, (nFlow.totalFlow / maxTotalFlow) * (height * 0.6)) : 40);
      }, 0);

      const padding = Math.max(10, (height - layerTotalHeight) / (layerNodes.length + 1));
      let yOffset = padding;

      for (let i = 0; i < nodeIndex; i++) {
        const prevNode = layerNodes[i];
        const prevFlow = nodeFlows[prevNode.id];
        const prevHeight = maxTotalFlow > 0 ? Math.max(20, (prevFlow.totalFlow / maxTotalFlow) * (height * 0.6)) : 40;
        yOffset += prevHeight + padding;
      }

      return {
        ...node,
        x: node.x || layer * (layerWidth + nodeWidth),
        y: yOffset,
        height: nodeHeight,
        color: node.color || colors[index % colors.length],
        id: node.id || `node-${index}`,
        flow: flow,
        className: node.className || "",
        style: node.style || {},
      };
    });

    return nodes;
  };

  // 링크 경로 계산 (노드 높이 전체를 활용)
  const calculateLinkPaths = (nodes) => {
    const nodeMap = {};
    nodes.forEach((node) => {
      nodeMap[node.id] = {
        ...node,
        inLinks: [],
        outLinks: [],
        inLinkOffset: 0,
        outLinkOffset: 0,
      };
    });

    // 각 노드의 입력/출력 링크 정보 수집
    data.links.forEach((link) => {
      if (nodeMap[link.source]) {
        nodeMap[link.source].outLinks.push(link);
      }
      if (nodeMap[link.target]) {
        nodeMap[link.target].inLinks.push(link);
      }
    });

    return data.links
      .map((link) => {
        const sourceNode = nodeMap[link.source];
        const targetNode = nodeMap[link.target];

        if (!sourceNode || !targetNode) return null;

        const linkValue = link.value || 1;
        const linkHeight = Math.max(2, linkValue * 3);

        // 소스 노드에서의 시작 위치 계산
        const sourceStartY = sourceNode.y + sourceNode.outLinkOffset;
        const sourceEndY = sourceStartY + (linkValue / sourceNode.flow.totalFlow) * sourceNode.height;
        sourceNode.outLinkOffset += (linkValue / sourceNode.flow.totalFlow) * sourceNode.height;

        // 타겟 노드에서의 끝 위치 계산
        const targetStartY = targetNode.y + targetNode.inLinkOffset;
        const targetEndY = targetStartY + (linkValue / targetNode.flow.totalFlow) * targetNode.height;
        targetNode.inLinkOffset += (linkValue / targetNode.flow.totalFlow) * targetNode.height;

        // 베지어 곡선 계산
        const sourceX = sourceNode.x + nodeWidth;
        const targetX = targetNode.x;
        const curvature = 0.5;
        const controlX1 = sourceX + (targetX - sourceX) * curvature;
        const controlX2 = targetX - (targetX - sourceX) * curvature;

        // 링크 경로 생성 (사각형 모양의 흐름)
        const sourceMidY = (sourceStartY + sourceEndY) / 2;
        const targetMidY = (targetStartY + targetEndY) / 2;
        const linkThickness = Math.max(1, (linkValue / Math.max(...data.links.map((l) => l.value || 1))) * 20);

        const path = `
        M ${sourceX} ${sourceStartY}
        C ${controlX1} ${sourceStartY}, ${controlX2} ${targetStartY}, ${targetX} ${targetStartY}
        L ${targetX} ${targetEndY}
        C ${controlX2} ${targetEndY}, ${controlX1} ${sourceEndY}, ${sourceX} ${sourceEndY}
        Z
      `;

        const linkId = link.id || `link-${link.source}-${link.target}`;

        return {
          path: path,
          color: link.color || sourceNode.color,
          value: linkValue,
          id: linkId,
          thickness: linkThickness,
          sourceNode: sourceNode,
          targetNode: targetNode,
          source: link.source,
          target: link.target,
          className: link.className || "",
          style: link.style || {},
        };
      })
      .filter(Boolean);
  };

  const nodes = calculateNodePositions();
  const links = calculateLinkPaths(nodes);

  // 하이라이트된 요소들 계산
  const getHighlightedElements = () => {
    if (!selectedFlow) return { nodes: [], links: [] };

    if (highlightPath) {
      return findConnectedPath(selectedFlow);
    } else {
      // 기존 방식: 단일 링크만 하이라이트
      const selectedLink = links.find((link) => link.id === selectedFlow);
      if (!selectedLink) return { nodes: [], links: [] };

      const highlightedNodes = highlightConnected ? [selectedLink.source, selectedLink.target] : [];

      const highlightedLinks = [selectedFlow];

      return { nodes: highlightedNodes, links: highlightedLinks };
    }
  };

  const highlighted = getHighlightedElements();

  // 노드 클릭 핸들러
  const handleNodeClick = (event, node) => {
    if (onNodeClick) {
      onNodeClick(event, node);
    }
  };

  // 링크 클릭 핸들러
  const handleLinkClick = (event, link) => {
    // 흐름 선택 기능
    if (onFlowSelect) {
      const newSelectedFlow = selectedFlow === link.id ? null : link.id;
      onFlowSelect(newSelectedFlow);
    }

    if (onLinkClick) {
      onLinkClick(event, link);
    }
  };

  // 툴팁 표시
  const showTooltipHandler = (event, content) => {
    if (showTooltip) {
      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // 툴팁 위치 조정 (화면 경계 고려)
      let tooltipX = mouseX + 10;
      let tooltipY = mouseY - 30;
      
      // 우측 경계 체크
      if (tooltipX > width - 200) {
        tooltipX = mouseX - 210;
      }
      
      // 상단 경계 체크
      if (tooltipY < 10) {
        tooltipY = mouseY + 20;
      }
      
      setTooltip({
        visible: true,
        x: tooltipX,
        y: tooltipY,
        content,
      });
    }
  };

  // 툴팁 숨기기
  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };

  return (
    <div className={`relative ${className}`}>
      <svg ref={svgRef} width={width} height={height} className={svgClassName} onMouseLeave={hideTooltip}>
        {/* 그래디언트 정의 */}
        <defs>
          {colors.map((color, index) => (
            <linearGradient key={index} id={`nodeGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={color} stopOpacity="0.6" />
            </linearGradient>
          ))}
          {colors.map((color, index) => (
            <linearGradient key={`flow-${index}`} id={`flowGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.4" />
            </linearGradient>
          ))}
          {/* 하이라이트용 밝은 그래디언트 */}
          {colors.map((color, index) => (
            <linearGradient
              key={`highlight-${index}`}
              id={`highlightGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
          ))}
        </defs>

        {/* 링크 렌더링 */}
        {links.map((link, index) => {
          const isHighlighted = highlighted.links.includes(link.id);
          const isDimmed = selectedFlow && !isHighlighted;

          return (
            <path
              key={link.id || index}
              d={link.path}
              fill={
                isHighlighted
                  ? `url(#highlightGradient-${index % colors.length})`
                  : `url(#flowGradient-${index % colors.length})`
              }
              opacity={isDimmed ? linkOpacity * 0.3 : linkOpacity}
              className={`transition-all duration-300 cursor-pointer ${linkClassName} ${link.className}`}
              onClick={(e) => handleLinkClick(e, link)}
              onMouseEnter={(e) =>
                showTooltipHandler(
                  e,
                  `${link.sourceNode.name || link.sourceNode.id} → ${link.targetNode.name || link.targetNode.id}: ${
                    link.value
                  }`
                )
              }
              onMouseLeave={hideTooltip}
              style={{
                filter: isHighlighted ? "brightness(1.3) drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))" : "none",
                ...customLinkStyles,
                ...link.style,
              }}
            />
          );
        })}

        {/* 노드 렌더링 */}
        {nodes.map((node, index) => {
          const isHighlighted = highlighted.nodes.includes(node.id);
          const isDimmed = selectedFlow && !isHighlighted;

          return (
            <g key={node.id || index}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={node.height}
                fill={`url(#nodeGradient-${index % colors.length})`}
                opacity={isDimmed ? 0.4 : 1}
                className={`transition-all duration-300 cursor-pointer ${nodeClassName} ${node.className}`}
                onClick={(e) => handleNodeClick(e, node)}
                onMouseEnter={(e) =>
                  showTooltipHandler(e, `${node.name || node.id} (총 흐름량: ${node.flow.totalFlow})`)
                }
                onMouseLeave={hideTooltip}
                style={{
                  filter: isHighlighted ? "brightness(1.2) drop-shadow(0 0 4px rgba(59, 130, 246, 0.4))" : "none",
                  ...customNodeStyles,
                  ...node.style,
                }}
              />
              {/* 노드 라벨 */}
              {showValues && (
                <text
                  x={node.x + nodeWidth + 5}
                  y={node.y + node.height / 2}
                  fill={isDimmed ? "#9CA3AF" : "#374151"}
                  fontSize="12"
                  alignmentBaseline="middle"
                  className={`${labelClassName} ${node.labelClassName || ""}`}
                  style={{
                    fontWeight: isHighlighted ? "bold" : "normal",
                    ...node.labelStyle,
                  }}
                >
                  {node.name || node.id}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* 툴팁 */}
      {tooltip.visible && (
        <div
          className={tooltipClassName}
          style={{
            left: tooltip.x,
            top: tooltip.y,
            maxWidth: '250px',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Sankey;
