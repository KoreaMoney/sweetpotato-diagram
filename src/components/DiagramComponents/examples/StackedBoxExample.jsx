import React, { useState } from "react";
import { DiagramProvider } from "../DiagramContext";
import Box from "../Box";
import ImageBox from "../ImageBox";

const StackedBoxExample = () => {
  const [clickedBox, setClickedBox] = useState(null);
  const [clickCount, setClickCount] = useState({});

  const handleBoxClick = (event, boxInfo) => {
    setClickedBox(boxInfo.id);
    setClickCount((prev) => ({
      ...prev,
      [boxInfo.id]: (prev[boxInfo.id] || 0) + 1,
    }));

    // 클릭된 박스 정보를 콘솔에 출력
    console.log(`클릭된 박스: ${boxInfo.id}`, boxInfo);
  };

  const handleReset = () => {
    setClickedBox(null);
    setClickCount({});
  };

  return (
    <div>
      {/* 간단한 설명 */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
        <h3 className="text-base font-semibold mb-2 text-gray-800">📝 테스트 방법</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded"></span>
            <span>
              <strong>일반 박스:</strong> 클릭하면 가장 위로 올라옵니다
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded"></span>
            <span>
              <strong>고정 박스:</strong> 클릭해도 우선순위가 변경되지 않습니다
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded"></span>
            <span>
              <strong>높은 우선순위:</strong> props로 설정된 우선순위를 유지합니다
            </span>
          </div>
        </div>

        <div className="mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-400">
          <span className="text-xs text-blue-800">
            마지막 클릭: <code className="bg-white px-1 rounded text-xs">{clickedBox || "없음"}</code>
          </span>
        </div>
      </div>

      {/* 설정 방법 */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-base font-semibold mb-2 text-gray-800">🔧 Box & ImageBox 설정 방법</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <h4 className="font-medium text-blue-600 mb-1">우선순위 설정:</h4>
            <code className="bg-white p-1 rounded block text-xs">
              &lt;Box priority={"{숫자}"} /&gt; // 높을수록 위에
            </code>
          </div>
          <div>
            <h4 className="font-medium text-purple-600 mb-1">우선순위 고정:</h4>
            <code className="bg-white p-1 rounded block text-xs">&lt;Box maintainPriority={"{true}"} /&gt;</code>
          </div>
        </div>
      </div>

      {/* 클릭 통계 */}
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800">📊 클릭 통계</h3>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
          >
            🔄 리셋
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
          {Object.entries(clickCount).length > 0 ? (
            Object.entries(clickCount).map(([boxId, count]) => (
              <div key={boxId} className="bg-gray-50 p-1 rounded text-center text-xs">
                <div className="font-mono text-gray-600 truncate text-xs" title={boxId}>
                  {boxId.split("-")[0]}
                </div>
                <div className="font-bold text-gray-800 text-xs">{count}</div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-2 text-xs">
              박스를 클릭하면 통계가 표시됩니다
            </div>
          )}
        </div>
      </div>

      {/* 다이어그램 영역 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">🔄 우선순위 테스트</h3>
          <p className="text-xs text-gray-600">박스들을 클릭해보세요</p>
        </div>

        <div className="p-3">
          <div className="w-full overflow-x-auto">
            <DiagramProvider width={780} height={600} className="border border-gray-200 rounded bg-gray-50 mx-auto">
              {/* 첫 번째 그룹: 왼쪽 상단 - 일반 클릭 우선순위 */}
              <Box
                id="normal-1"
                text="일반 박스 1"
                x={50}
                y={50}
                width={150}
                height={100}
                className="bg-red-500 text-white border-red-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                zIndex={10}
              />

              <Box
                id="normal-2"
                text="일반 박스 2"
                x={100}
                y={80}
                width={150}
                height={100}
                className="bg-blue-500 text-white border-blue-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                zIndex={20}
              />

              <ImageBox
                id="normal-img"
                text="일반 이미지"
                x={150}
                y={110}
                width={120}
                height={80}
                className="bg-green-100 border-green-500 border-2 rounded-lg"
                onClick={handleBoxClick}
                zIndex={30}
              />

              {/* 두 번째 그룹: 중앙 - 우선순위 고정 박스들 */}
              <Box
                id="fixed-1"
                text="고정 우선순위 1"
                x={300}
                y={150}
                width={140}
                height={90}
                className="bg-purple-500 text-white border-purple-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={100}
                maintainPriority={true}
              />

              <Box
                id="fixed-2"
                text="고정 우선순위 2"
                x={350}
                y={180}
                width={140}
                height={90}
                className="bg-purple-700 text-white border-purple-800 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={200}
                maintainPriority={true}
              />

              <ImageBox
                id="fixed-img"
                text="고정 이미지"
                x={400}
                y={210}
                width={100}
                height={70}
                className="bg-purple-100 border-purple-500 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={300}
                maintainPriority={true}
              />

              {/* 세 번째 그룹: 오른쪽 하단 - 높은 우선순위 */}
              <Box
                id="high-1"
                text="높은 우선순위 1"
                x={550}
                y={300}
                width={130}
                height={80}
                className="bg-green-600 text-white border-green-700 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={500}
              />

              <ImageBox
                id="high-img"
                text="높은 우선순위 이미지"
                x={600}
                y={330}
                width={110}
                height={75}
                className="bg-green-100 border-green-500 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={600}
              />

              <Box
                id="high-2"
                text="최고 우선순위"
                x={650}
                y={360}
                width={120}
                height={85}
                className="bg-green-800 text-white border-green-900 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={1000}
              />

              {/* 네 번째 그룹: 중앙 하단 - 혼합 우선순위 */}
              <Box
                id="mixed-1"
                text="혼합 1 (일반)"
                x={200}
                y={400}
                width={160}
                height={100}
                className="bg-gray-600 text-white border-gray-700 border-2 rounded-lg"
                onClick={handleBoxClick}
                zIndex={50}
              />

              <Box
                id="mixed-2"
                text="혼합 2 (고정)"
                x={240}
                y={430}
                width={160}
                height={100}
                className="bg-orange-500 text-white border-orange-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={150}
                maintainPriority={true}
              />

              <ImageBox
                id="mixed-img"
                text="혼합 이미지 (높은)"
                x={280}
                y={460}
                width={130}
                height={90}
                className="bg-yellow-100 border-yellow-500 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={800}
              />

              {/* 최상위 고정 박스 */}
              <Box
                id="top-fixed"
                text="🔝 최상위 고정"
                x={50}
                y={520}
                width={200}
                height={60}
                className="bg-red-800 text-white border-red-900 border-4 rounded-lg font-bold"
                onClick={handleBoxClick}
                priority={9999}
                maintainPriority={true}
              />

              {/* 테스트용 겹치는 박스 */}
              <Box
                id="test-overlap-1"
                text="테스트 박스 A"
                x={450}
                y={450}
                width={120}
                height={80}
                className="bg-cyan-500 text-white border-cyan-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                zIndex={10}
              />

              <Box
                id="test-overlap-2"
                text="테스트 박스 B"
                x={480}
                y={480}
                width={120}
                height={80}
                className="bg-pink-500 text-white border-pink-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={75}
              />

              <Box
                id="test-overlap-3"
                text="테스트 박스 C"
                x={510}
                y={510}
                width={120}
                height={80}
                className="bg-indigo-500 text-white border-indigo-600 border-2 rounded-lg"
                onClick={handleBoxClick}
                priority={50}
                maintainPriority={true}
              />
            </DiagramProvider>
          </div>
        </div>
      </div>

      {/* 간단한 사용법 가이드 */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <h3 className="text-base font-semibold mb-2 text-gray-800">💡 Box & ImageBox 사용법 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-white rounded border">
            <strong>기본 사용:</strong>{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">&lt;Box zIndex={"{숫자}"} /&gt;</code>
          </div>
          <div className="p-2 bg-white rounded border">
            <strong>고급 우선순위:</strong>{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">&lt;Box priority={"{숫자}"} /&gt;</code>
          </div>
          <div className="p-2 bg-white rounded border">
            <strong>우선순위 고정:</strong>{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">&lt;Box maintainPriority /&gt;</code>
          </div>
          <div className="p-2 bg-white rounded border">
            <strong>조합 사용:</strong> priority + maintainPriority로 완전 제어
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedBoxExample;
