import React, { useState, useEffect } from "react";
import { DiagramProvider, useDiagram, Box, Connector, DraggableBox } from "../../components/DiagramComponents";

// Hook 기능을 보여주는 컴포넌트
const DiagramControls = () => {
  const {
    boxes,
    connections,
    selectedBoxes,
    addConnection,
    removeConnection,
    selectBox,
    clearSelection,
    undo,
    redo,
    clearDiagram,
    zoomIn,
    zoomOut,
    resetZoom,
    getDiagramStats,
    optimizeLayout,
    findBoxes,
    findConnections,
    saveState,
    addDynamicBox,
    removeDynamicBox,
  } = useDiagram();

  const [boxCounter, setBoxCounter] = useState(1);
  const [optimizationResults, setOptimizationResults] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const stats = getDiagramStats();

  // 간단한 toast 함수 (ToastProvider 없이 사용)
  const showToast = (message, type = "info") => {
    setToastMessage(message);
    console.log(`[${type.toUpperCase()}] ${message}`);
    // 3초 후 메시지 클리어
    setTimeout(() => setToastMessage(""), 3000);
  };

  // 새 박스 추가 (다이어그램 영역 내 좌표로 수정)
  const handleAddBox = () => {
    const newId = `dynamic-box-${boxCounter}`;
    // 다이어그램 영역 내 좌표 (50~350, 50~250)
    const randomX = Math.random() * 300 + 50;
    const randomY = Math.random() * 200 + 50;

    const boxColors = [
      "bg-blue-500 text-white border-blue-600",
      "bg-green-500 text-white border-green-600",
      "bg-purple-500 text-white border-purple-600",
      "bg-red-500 text-white border-red-600",
      "bg-yellow-500 text-black border-yellow-600",
      "bg-indigo-500 text-white border-indigo-600",
    ];

    const randomColor = boxColors[Math.floor(Math.random() * boxColors.length)];

    addDynamicBox({
      id: newId,
      x: randomX,
      y: randomY,
      width: 120 + Math.random() * 80, // 120-200 너비
      height: 80 + Math.random() * 40, // 80-120 높이
      text: `박스 ${boxCounter}`,
      className: `${randomColor} border-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200`,
    });

    setBoxCounter((prev) => prev + 1);
    saveState();
    showToast(`새 박스 추가됨: ${newId}`, "success");
  };

  // 선택된 박스들 연결
  const handleConnectSelected = () => {
    const selected = Array.from(selectedBoxes);
    if (selected.length === 2) {
      const [from, to] = selected;
      addConnection({
        fromBox: { id: from, position: "right" },
        toBox: { id: to, position: "left" },
        connectionType: "curved",
        arrowDirection: "forward",
      });
      showToast(`박스 연결됨: ${from} → ${to}`, "success");
      clearSelection();
      saveState();
    } else if (selected.length > 2) {
      // 여러 박스 선택시 순차적으로 연결
      for (let i = 0; i < selected.length - 1; i++) {
        addConnection({
          fromBox: { id: selected[i], position: "right" },
          toBox: { id: selected[i + 1], position: "left" },
          connectionType: "curved",
          arrowDirection: "forward",
        });
      }
      showToast(`${selected.length}개 박스가 순차적으로 연결됨`, "success");
      clearSelection();
      saveState();
    } else {
      showToast("연결하려면 최소 2개의 박스를 선택해주세요", "error");
    }
  };

  // 큰 박스들 찾기 (개선된 버전)
  const handleFindLargeBoxes = () => {
    // 크기를 기준으로 큰 박스 찾기
    const largeBoxes = findBoxes((box) => {
      const area = (box.width || 120) * (box.height || 80);
      return area > 12000; // 기본 박스(120x80=9600)보다 큰 것들
    });

    if (largeBoxes.length > 0) {
      // 찾은 박스들 모두 선택
      clearSelection();
      largeBoxes.forEach((box) => selectBox(box.id, true));

      setSearchResults(
        largeBoxes.map((box) => ({
          id: box.id,
          text: box.text || box.id,
          size: `${Math.round(box.width || 120)}×${Math.round(box.height || 80)}`,
          area: Math.round((box.width || 120) * (box.height || 80)),
        }))
      );

      showToast(`큰 박스 ${largeBoxes.length}개 발견 및 선택됨`, "success");
    } else {
      showToast("큰 박스를 찾지 못했습니다", "info");
      setSearchResults([]);
    }
  };

  // 레이아웃 최적화 (결과 표시 포함)
  const handleOptimizeLayout = () => {
    const beforeStats = {
      boxCount: boxes.size,
      avgDistance: calculateAverageDistance(),
    };

    optimizeLayout();

    // 최적화 후 잠시 후 결과 계산
    setTimeout(() => {
      const afterStats = {
        boxCount: boxes.size,
        avgDistance: calculateAverageDistance(),
      };

      setOptimizationResults({
        before: beforeStats,
        after: afterStats,
        improvement:
          beforeStats.avgDistance > 0
            ? (((beforeStats.avgDistance - afterStats.avgDistance) / beforeStats.avgDistance) * 100).toFixed(1)
            : 0,
        timestamp: new Date().toLocaleTimeString(),
      });

      showToast("레이아웃 최적화 완료!", "success");
    }, 100);
  };

  // 평균 거리 계산 (박스들 간의)
  const calculateAverageDistance = () => {
    const boxArray = Array.from(boxes.values());
    if (boxArray.length < 2) return 0;

    let totalDistance = 0;
    let pairCount = 0;

    for (let i = 0; i < boxArray.length; i++) {
      for (let j = i + 1; j < boxArray.length; j++) {
        const dx = boxArray[i].x - boxArray[j].x;
        const dy = boxArray[i].y - boxArray[j].y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
        pairCount++;
      }
    }

    return pairCount > 0 ? totalDistance / pairCount : 0;
  };

  // 모든 연결선 제거
  const handleRemoveAllConnections = () => {
    const allConnections = findConnections(() => true);
    allConnections.forEach((conn) => removeConnection(conn.id));
    showToast(`${allConnections.length}개 연결선 제거됨`, "info");
    saveState();
  };

  // 선택된 박스들 제거
  const handleRemoveSelected = () => {
    const selected = Array.from(selectedBoxes);
    if (selected.length > 0) {
      selected.forEach((id) => removeDynamicBox(id));
      showToast(`${selected.length}개 박스 제거됨`, "info");
      saveState();
    } else {
      showToast("제거할 박스를 선택해주세요", "error");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎣 useDiagram Hook 컨트롤</h2>

      {/* Toast 메시지 표시 */}
      {toastMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded animate-fadeInUp">
          {toastMessage}
        </div>
      )}

      {/* 통계 정보 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors">
          <div className="text-sm text-blue-600">박스 개수</div>
          <div className="text-2xl font-bold text-blue-800">{stats.boxCount}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors">
          <div className="text-sm text-green-600">연결선 개수</div>
          <div className="text-2xl font-bold text-green-800">{stats.connectionCount}</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors">
          <div className="text-sm text-purple-600">선택된 박스</div>
          <div className="text-2xl font-bold text-purple-800">{stats.selectedBoxCount}</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg hover:bg-orange-100 transition-colors">
          <div className="text-sm text-orange-600">줌 레벨</div>
          <div className="text-2xl font-bold text-orange-800">{Math.round(stats.scale * 100)}%</div>
        </div>
      </div>

      {/* 최적화 결과 표시 */}
      {optimizationResults && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 animate-fadeInUp">
          <h4 className="font-semibold text-green-800 mb-2">📊 최적화 결과 ({optimizationResults.timestamp})</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">최적화 전 평균 거리:</span>
              <div className="font-semibold">{optimizationResults.before.avgDistance.toFixed(1)}px</div>
            </div>
            <div>
              <span className="text-gray-600">최적화 후 평균 거리:</span>
              <div className="font-semibold">{optimizationResults.after.avgDistance.toFixed(1)}px</div>
            </div>
            <div>
              <span className="text-gray-600">개선율:</span>
              <div className="font-semibold text-green-600">{optimizationResults.improvement}%</div>
            </div>
          </div>
        </div>
      )}

      {/* 검색 결과 표시 */}
      {searchResults.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 animate-slideInRight">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 검색 결과 - 큰 박스들</h4>
          <div className="space-y-2">
            {searchResults.map((result) => (
              <div key={result.id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                <span className="font-medium">{result.text}</span>
                <div className="flex gap-2 text-gray-600">
                  <span>크기: {result.size}</span>
                  <span>면적: {result.area}px²</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 컨트롤 버튼들 */}
      <div className="space-y-4">
        {/* 박스 관리 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAddBox}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            ➕ 박스 추가
          </button>
          <button
            onClick={handleFindLargeBoxes}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            🔍 큰 박스 찾기
          </button>
          <button
            onClick={clearSelection}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
          >
            ❌ 선택 해제
          </button>
          <button
            onClick={handleRemoveSelected}
            disabled={selectedBoxes.size === 0}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            🗑️ 선택된 박스 제거
          </button>
        </div>

        {/* 연결 관리 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleConnectSelected}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={selectedBoxes.size < 2}
          >
            🔗 선택된 박스 연결 ({selectedBoxes.size}/2+)
          </button>
          <button
            onClick={handleRemoveAllConnections}
            disabled={connections.length === 0}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🗑️ 모든 연결선 제거
          </button>
        </div>

        {/* 히스토리 관리 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={undo}
            disabled={!stats.canUndo}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↶ 되돌리기
          </button>
          <button
            onClick={redo}
            disabled={!stats.canRedo}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ↷ 다시 실행
          </button>
          <button
            onClick={clearDiagram}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            🗑️ 전체 삭제
          </button>
        </div>

        {/* 뷰 관리 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={zoomIn}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 hover:scale-105"
          >
            🔍 확대
          </button>
          <button
            onClick={zoomOut}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 hover:scale-105"
          >
            🔍 축소
          </button>
          <button
            onClick={resetZoom}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 hover:scale-105"
          >
            🎯 줌 리셋
          </button>
          <button
            onClick={handleOptimizeLayout}
            disabled={boxes.size < 2}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse hover:animate-none"
          >
            ✨ 레이아웃 최적화
          </button>
        </div>
      </div>

      {/* 사용법 안내 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
        <h4 className="font-semibold mb-2">💡 사용법 안내</h4>
        <ul className="space-y-1">
          <li>
            • <strong>다중 선택:</strong> Ctrl/Cmd + 클릭 또는 Shift + 클릭
          </li>
          <li>
            • <strong>박스 연결:</strong> 2개 이상 박스 선택 후 연결 버튼 클릭
          </li>
          <li>
            • <strong>레이아웃 최적화:</strong> 박스들의 위치를 자동으로 정리
          </li>
          <li>
            • <strong>큰 박스 찾기:</strong> 기본 크기보다 큰 박스들을 자동 선택
          </li>
        </ul>
      </div>
    </div>
  );
};

// 인터랙티브 다이어그램 컴포넌트
const InteractiveDiagram = () => {
  const { selectedBoxes, addDynamicBox, getDiagramStats, dynamicBoxes, selectBox, connections, scale, panOffset } =
    useDiagram();
  const [showInstructions, setShowInstructions] = useState(true);

  // 초기 데모 박스들 추가
  const addInitialBoxes = () => {
    const demoBoxes = [
      { x: 50, y: 50, text: "클릭해보세요", className: "bg-blue-500 text-white border-blue-600 border-2 rounded-lg" },
      {
        x: 200,
        y: 80,
        text: "Ctrl+클릭으로 다중선택",
        className: "bg-green-500 text-white border-green-600 border-2 rounded-lg",
      },
      {
        x: 80,
        y: 180,
        text: "큰 박스 예시",
        width: 150,
        height: 100,
        className: "bg-purple-500 text-white border-purple-600 border-2 rounded-lg",
      },
    ];

    demoBoxes.forEach((box, index) => {
      setTimeout(() => {
        addDynamicBox({
          ...box,
          id: `demo-${index + 1}`,
        });
      }, index * 300);
    });

    // 드래그 가능한 박스는 DraggableBox로 별도 추가
    setTimeout(() => {
      setShowInstructions(false);
    }, 1000);
  };

  const stats = getDiagramStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🎨 인터랙티브 다이어그램</h3>

      {/* 상태 표시 */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="bg-blue-50 px-3 py-1 rounded-full">
          📦 박스: <span className="font-semibold">{stats.boxCount}</span>
        </div>
        <div className="bg-green-50 px-3 py-1 rounded-full">
          🔗 연결: <span className="font-semibold">{stats.connectionCount}</span>
        </div>
        <div className="bg-purple-50 px-3 py-1 rounded-full">
          ✅ 선택됨: <span className="font-semibold">{stats.selectedBoxCount}</span>
        </div>
        <div className="bg-orange-50 px-3 py-1 rounded-full">
          🔍 줌: <span className="font-semibold">{Math.round(stats.scale * 100)}%</span>
        </div>
        {stats.selectedBoxCount > 0 && (
          <div className="bg-yellow-50 px-3 py-1 rounded-full text-yellow-700">
            선택된 박스: {Array.from(selectedBoxes).join(", ")}
          </div>
        )}
      </div>

      {/* 다이어그램 영역 */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg h-96 relative bg-gray-50 overflow-hidden"
        style={{ position: "relative" }}
      >
        {/* 줌과 팬이 적용되는 실제 다이어그램 컨테이너 */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: "0 0",
          }}
        >
          {showInstructions && dynamicBoxes.size === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">다이어그램 시작하기</h4>
                <p className="text-gray-600 mb-4">
                  위의 "박스 추가" 버튼을 클릭하거나
                  <br />
                  아래 버튼으로 데모 박스들을 추가해보세요
                </p>
                <button
                  onClick={addInitialBoxes}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
                >
                  ✨ 데모 박스 추가하기
                </button>
              </div>
            </div>
          )}

          {/* 연결선들을 먼저 렌더링 (박스들보다 아래에 위치) */}
          {connections.map((connection) => (
            <Connector
              key={connection.id}
              fromBox={connection.fromBox}
              toBox={connection.toBox}
              connectionType={connection.connectionType || "curved"}
              arrowDirection={connection.arrowDirection || "forward"}
              strokeColor="#0066ff"
              strokeWidth={2}
              className="connector-animated"
            />
          ))}

          {/* 드래그 가능한 박스 추가 */}
          {dynamicBoxes.size > 0 && (
            <DraggableBox
              id="draggable-demo"
              initialX={300}
              initialY={150}
              width={120}
              height={60}
              title="드래그 가능"
              color="red"
            />
          )}

          {/* 동적 박스들을 다이어그램 영역 내에 직접 렌더링 */}
          {Array.from(dynamicBoxes.values()).map((box) => (
            <Box
              key={box.id}
              id={box.id}
              x={box.x}
              y={box.y}
              width={box.width}
              height={box.height}
              text={box.text}
              className={`${box.className} ${
                selectedBoxes.has(box.id) ? "ring-4 ring-blue-400 ring-opacity-75 animate-pulse" : ""
              }`}
              onClick={(event, data) => {
                const isMultiSelect = event.ctrlKey || event.metaKey || event.shiftKey;
                selectBox(data.id, isMultiSelect);
              }}
            />
          ))}
        </div>

        {/* 선택 가이드 - 줌에 영향받지 않도록 외부에 위치 */}
        {dynamicBoxes.size > 0 && (
          <div className="absolute top-2 left-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 shadow-sm z-30">
            <div className="font-semibold mb-1">🖱️ 조작법</div>
            <div>• 클릭: 단일 선택</div>
            <div>• Ctrl/Cmd+클릭: 다중 선택</div>
            <div>• Shift+클릭: 다중 선택</div>
            <div>• 위 컨트롤로 확대/축소</div>
          </div>
        )}

        {/* 줌 표시 - 줌에 영향받지 않도록 외부에 위치 */}
        {stats.scale !== 1 && (
          <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600 shadow-sm z-30">
            🔍 줌: {Math.round(stats.scale * 100)}%
          </div>
        )}
      </div>

      {/* 인터랙션 안내 */}
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm">
        <div className="font-semibold text-gray-700 mb-2">💡 실시간 피드백</div>
        <div className="flex flex-wrap gap-2">
          {stats.selectedBoxCount === 0 && <span className="text-gray-600">박스를 클릭해서 선택해보세요</span>}
          {stats.selectedBoxCount === 1 && (
            <span className="text-blue-600">✨ 1개 박스 선택됨! Ctrl+클릭으로 더 선택하세요</span>
          )}
          {stats.selectedBoxCount === 2 && (
            <span className="text-green-600">🔗 2개 박스 선택됨! 연결 버튼으로 연결하세요</span>
          )}
          {stats.selectedBoxCount > 2 && (
            <span className="text-purple-600">🎉 {stats.selectedBoxCount}개 박스 선택됨! 순차 연결 가능</span>
          )}
        </div>
      </div>
    </div>
  );
};

// 실시간 모니터링 컴포넌트
const RealtimeMonitor = () => {
  const { boxes, connections, selectedBoxes } = useDiagram();

  const [changeLog, setChangeLog] = useState([]);

  const addToLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setChangeLog((prev) =>
      [
        ...prev,
        {
          time: timestamp,
          type,
          message,
        },
      ].slice(-5)
    ); // 최근 5개만 유지
  };

  useEffect(() => {
    addToLog(`박스 개수 변경: ${boxes.size}개`, "boxes");
  }, [boxes.size]);

  useEffect(() => {
    addToLog(`연결선 개수 변경: ${connections.length}개`, "connections");
  }, [connections.length]);

  useEffect(() => {
    if (selectedBoxes.size > 0) {
      const selectedIds = Array.from(selectedBoxes).join(", ");
      addToLog(`박스 선택: ${selectedIds}`, "selection");
    }
  }, [selectedBoxes]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📊 실시간 모니터링</h3>

      <div className="space-y-2">
        {changeLog.length === 0 ? (
          <p className="text-gray-500 italic">아직 변경 사항이 없습니다...</p>
        ) : (
          changeLog.map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${
                log.type === "boxes"
                  ? "bg-blue-50 border-blue-400"
                  : log.type === "connections"
                  ? "bg-green-50 border-green-400"
                  : log.type === "selection"
                  ? "bg-purple-50 border-purple-400"
                  : "bg-gray-50 border-gray-400"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{log.time}</span>
                <span
                  className={`text-sm font-medium ${
                    log.type === "boxes"
                      ? "text-blue-600"
                      : log.type === "connections"
                      ? "text-green-600"
                      : log.type === "selection"
                      ? "text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 코드 예시 컴포넌트
const CodeExamples = () => {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      title: "🌟 기본 사용법",
      description: "useDiagram hook의 기본적인 사용 방법",
      code: `import React from 'react';
import { DiagramProvider, useDiagram, Box } from 'sweetpotato-diagram';

function MyDiagram() {
  const { 
    boxes, 
    selectedBoxes, 
    selectBox, 
    addDynamicBox,
    addConnection,
    getDiagramStats 
  } = useDiagram();

  // 새 박스 추가
  const handleAddBox = () => {
    addDynamicBox({
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      text: \`박스 \${boxes.size + 1}\`,
      className: "bg-blue-500 text-white border-2 rounded-lg"
    });
  };

  // 박스 클릭 처리 (다중 선택 지원)
  const handleBoxClick = (event, data) => {
    const isMultiSelect = event.ctrlKey || event.metaKey || event.shiftKey;
    selectBox(data.id, isMultiSelect);
  };

  // 통계 정보 가져오기
  const stats = getDiagramStats();

  return (
    <div>
      <div className="mb-4">
        <button onClick={handleAddBox}>박스 추가</button>
        <p>박스: {stats.boxCount}, 선택됨: {stats.selectedBoxCount}</p>
      </div>
      
      {/* 박스들이 자동으로 렌더링됨 */}
    </div>
  );
}

// 사용법
function App() {
  return (
    <DiagramProvider>
      <MyDiagram />
    </DiagramProvider>
  );
}`,
    },
    {
      title: "🚀 고급 기능",
      description: "히스토리, 줌, 레이아웃 최적화 기능 사용",
      code: `import React, { useState } from 'react';
import { DiagramProvider, useDiagram } from 'sweetpotato-diagram';

function AdvancedDiagram() {
  const {
    boxes,
    connections,
    selectedBoxes,
    addDynamicBox,
    addConnection,
    removeConnection,
    undo,
    redo,
    saveState,
    clearDiagram,
    zoomIn,
    zoomOut,
    resetZoom,
    optimizeLayout,
    getDiagramStats
  } = useDiagram();

  const [optimizationResults, setOptimizationResults] = useState(null);
  const stats = getDiagramStats();

  // 선택된 박스들 연결
  const connectSelected = () => {
    const selected = Array.from(selectedBoxes);
    if (selected.length >= 2) {
      for (let i = 0; i < selected.length - 1; i++) {
        addConnection({
          fromBox: { id: selected[i], position: "right" },
          toBox: { id: selected[i + 1], position: "left" },
          connectionType: "curved",
          arrowDirection: "forward"
        });
      }
      saveState(); // 히스토리에 저장
    }
  };

  // 레이아웃 최적화 (결과 추적)
  const handleOptimization = () => {
    const beforeCount = boxes.size;
    optimizeLayout();
    
    setTimeout(() => {
      setOptimizationResults({
        boxCount: beforeCount,
        timestamp: new Date().toLocaleTimeString(),
        improvement: "박스 위치 최적화 완료"
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* 컨트롤 패널 */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => addDynamicBox({})}>박스 추가</button>
        <button onClick={connectSelected} disabled={selectedBoxes.size < 2}>
          선택된 박스 연결
        </button>
        <button onClick={handleOptimization} disabled={boxes.size < 2}>
          레이아웃 최적화
        </button>
        <button onClick={undo} disabled={!stats.canUndo}>되돌리기</button>
        <button onClick={redo} disabled={!stats.canRedo}>다시 실행</button>
      </div>

      {/* 줌 컨트롤 */}
      <div className="flex gap-2 items-center">
        <button onClick={zoomOut}>축소</button>
        <span>줌: {Math.round(stats.scale * 100)}%</span>
        <button onClick={zoomIn}>확대</button>
        <button onClick={resetZoom}>리셋</button>
      </div>

      {/* 최적화 결과 */}
      {optimizationResults && (
        <div className="bg-green-50 p-3 rounded">
          📊 {optimizationResults.improvement} ({optimizationResults.timestamp})
        </div>
      )}

      {/* 통계 */}
      <div className="grid grid-cols-4 gap-4">
        <div>박스: {stats.boxCount}</div>
        <div>연결: {stats.connectionCount}</div>
        <div>선택: {stats.selectedBoxCount}</div>
        <div>줌: {Math.round(stats.scale * 100)}%</div>
      </div>
    </div>
  );
}`,
    },
    {
      title: "🔍 검색 & 필터링",
      description: "박스와 연결선 검색 및 필터링 기능",
      code: `import React, { useState } from 'react';
import { DiagramProvider, useDiagram } from 'sweetpotato-diagram';

function SearchDiagram() {
  const {
    findBoxes,
    findConnections,
    selectBox,
    clearSelection,
    boxes,
    connections,
    selectedBoxes
  } = useDiagram();

  const [searchResults, setSearchResults] = useState([]);

  // 큰 박스 찾기 (실제 작동하는 버전)
  const findLargeBoxes = () => {
    const largeBoxes = findBoxes((box) => {
      const area = (box.width || 120) * (box.height || 80);
      return area > 12000; // 기본 박스보다 큰 것들
    });

    if (largeBoxes.length > 0) {
      clearSelection();
      largeBoxes.forEach((box) => selectBox(box.id, true));
      
      setSearchResults(largeBoxes.map(box => ({
        id: box.id,
        text: box.text || box.id,
        size: \`\${Math.round(box.width || 120)}×\${Math.round(box.height || 80)}\`,
        area: Math.round((box.width || 120) * (box.height || 80))
      })));
    }
  };

  // 텍스트로 박스 검색
  const searchByText = (searchText) => {
    if (!searchText) return;
    
    const matchingBoxes = findBoxes((box) => 
      box.text && box.text.toLowerCase().includes(searchText.toLowerCase())
    );

    clearSelection();
    matchingBoxes.forEach((box) => selectBox(box.id, true));
    
    setSearchResults(matchingBoxes.map(box => ({
      id: box.id,
      text: box.text,
      match: \`텍스트 매칭: "\${searchText}"\`
    })));
  };

  // 특정 박스의 연결선 찾기
  const findConnectionsForBox = (boxId) => {
    const relatedConnections = findConnections((conn) => 
      conn.fromBox?.id === boxId || conn.toBox?.id === boxId
    );

    return relatedConnections.map(conn => ({
      id: conn.id,
      from: conn.fromBox?.id,
      to: conn.toBox?.id,
      type: conn.connectionType
    }));
  };

  // 연결되지 않은 박스 찾기
  const findIsolatedBoxes = () => {
    const isolatedBoxes = findBoxes((box) => {
      const hasConnections = findConnections((conn) => 
        conn.fromBox?.id === box.id || conn.toBox?.id === box.id
      ).length > 0;
      return !hasConnections;
    });

    clearSelection();
    isolatedBoxes.forEach((box) => selectBox(box.id, true));
    
    setSearchResults(isolatedBoxes.map(box => ({
      id: box.id,
      text: box.text || box.id,
      status: "연결되지 않은 박스"
    })));
  };

  return (
    <div className="space-y-4">
      {/* 검색 컨트롤 */}
      <div className="flex flex-wrap gap-2">
        <button onClick={findLargeBoxes}>큰 박스 찾기</button>
        <button onClick={findIsolatedBoxes}>연결 안된 박스 찾기</button>
        <input
          type="text"
          placeholder="텍스트 검색..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searchByText(e.target.value);
            }
          }}
          className="px-3 py-1 border rounded"
        />
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-semibold mb-2">🔍 검색 결과</h4>
          {searchResults.map((result) => (
            <div key={result.id} className="flex justify-between py-1">
              <span>{result.text}</span>
              <span className="text-gray-600">
                {result.size || result.match || result.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 통계 */}
      <div className="text-sm text-gray-600">
        선택된 박스: {selectedBoxes.size} / 전체 박스: {boxes.size}
      </div>
    </div>
  );
}`,
    },
    {
      title: "⚡ 실시간 업데이트",
      description: "실시간 변경사항 추적 및 모니터링",
      code: `import React, { useState, useEffect } from 'react';
import { DiagramProvider, useDiagram } from 'sweetpotato-diagram';

function RealtimeDiagram() {
  const {
    boxes,
    connections,
    selectedBoxes,
    addDynamicBox,
    getDiagramStats
  } = useDiagram();

  const [changeLog, setChangeLog] = useState([]);

  // 박스 변경 감지
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setChangeLog(prev => [
      ...prev,
      {
        time: timestamp,
        type: 'boxes',
        message: \`박스 개수: \${boxes.size}\`,
        count: boxes.size
      }
    ].slice(-10)); // 최근 10개만 유지
  }, [boxes.size]);

  // 연결선 변경 감지
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setChangeLog(prev => [
      ...prev,
      {
        time: timestamp,
        type: 'connections',
        message: \`연결선 개수: \${connections.length}\`,
        count: connections.length
      }
    ].slice(-10));
  }, [connections.length]);

  // 선택 변경 감지
  useEffect(() => {
    if (selectedBoxes.size > 0) {
      const timestamp = new Date().toLocaleTimeString();
      const selectedIds = Array.from(selectedBoxes).join(', ');
      setChangeLog(prev => [
        ...prev,
        {
          time: timestamp,
          type: 'selection',
          message: \`선택됨: \${selectedIds}\`,
          count: selectedBoxes.size
        }
      ].slice(-10));
    }
  }, [selectedBoxes]);

  const stats = getDiagramStats();

  return (
    <div className="space-y-4">
      {/* 실시간 통계 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.boxCount}</div>
          <div className="text-sm text-blue-800">박스</div>
        </div>
        <div className="bg-green-50 p-3 rounded text-center">
          <div className="text-2xl font-bold text-green-600">{stats.connectionCount}</div>
          <div className="text-sm text-green-800">연결선</div>
        </div>
        <div className="bg-purple-50 p-3 rounded text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.selectedBoxCount}</div>
          <div className="text-sm text-purple-800">선택됨</div>
        </div>
        <div className="bg-orange-50 p-3 rounded text-center">
          <div className="text-2xl font-bold text-orange-600">{Math.round(stats.scale * 100)}%</div>
          <div className="text-sm text-orange-800">줌</div>
        </div>
      </div>

      {/* 실시간 로그 */}
      <div className="bg-gray-50 p-4 rounded max-h-64 overflow-y-auto">
        <h4 className="font-semibold mb-2">📊 실시간 변경 로그</h4>
        {changeLog.length === 0 ? (
          <p className="text-gray-500">변경사항이 여기에 표시됩니다...</p>
        ) : (
          changeLog.map((log, index) => (
            <div key={index} className="flex justify-between items-center py-1 text-sm">
              <span className="font-mono text-gray-600">{log.time}</span>
              <span className={\`px-2 py-1 rounded text-xs \${
                log.type === 'boxes' ? 'bg-blue-100 text-blue-800' :
                log.type === 'connections' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }\`}>
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}`,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">📝 코드 예시</h3>

      {/* 탭 버튼들 */}
      <div className="flex flex-wrap gap-2 mb-6 border-b">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium transition-all duration-200 border-b-2 ${
              activeTab === index
                ? "text-blue-600 border-blue-600 bg-blue-50"
                : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300"
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* 현재 탭 내용 */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{examples[activeTab].title}</h4>
          <p className="text-gray-600">{examples[activeTab].description}</p>
        </div>

        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{examples[activeTab].code}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(examples[activeTab].code)}
            className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
          >
            📋 복사
          </button>
        </div>
      </div>
    </div>
  );
};

// 메인 Hook 페이지 컴포넌트
const HooksPage = () => {
  return (
    <DiagramProvider className="hooks-page-provider bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInUp">🎣 useDiagram Hook 완전 가이드</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
            실시간 상호작용, 히스토리 관리, 줌/팬 기능이 포함된 강력한 다이어그램 Hook을 체험해보세요.
            <br />
            모든 기능이 실제 프로덕션 환경에서 바로 사용 가능합니다.
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="space-y-6">
          <DiagramControls />
          <div className="grid lg:grid-cols-2 gap-6">
            <InteractiveDiagram />
            <RealtimeMonitor />
          </div>
          <CodeExamples />
        </div>

        {/* 실제 적용사례 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏢 실제 적용사례</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="font-bold text-lg mb-2">공정 관리 시스템</h3>
              <p className="text-sm text-gray-600">제조업 생산 공정을 시각화하고 실시간으로 모니터링</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-bold text-lg mb-2">네트워크 관리 도구</h3>
              <p className="text-sm text-gray-600">IT 인프라 토폴로지 구성 및 장애 지점 추적</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-lg mb-2">비즈니스 프로세스 관리</h3>
              <p className="text-sm text-gray-600">BPM 시스템에서 워크플로우 설계 및 자동화</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold text-lg mb-2">AI 모델 파이프라인</h3>
              <p className="text-sm text-gray-600">머신러닝 파이프라인 구성 및 데이터 플로우 관리</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default HooksPage;
