import React from "react";
import { DiagramProvider } from "../DiagramContext";
import AutoConnectManager from "../AutoConnectManager";
import Box from "../Box";

const AutoConnectCustomExample = () => {
  // 사용자 정의 설정 섹션
  const customSections = [
    {
      title: "프로젝트",
      content: (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="프로젝트 이름"
            className="w-full text-xs p-2 border border-gray-300 rounded"
          />
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-2" />
            자동 저장 활성화
          </label>
          <label className="flex items-center text-xs">
            <input type="checkbox" className="mr-2" />
            실시간 동기화
          </label>
        </div>
      ),
    },
    {
      title: "내보내기",
      content: (
        <div className="space-y-2">
          <button className="w-full text-xs p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            PNG로 내보내기
          </button>
          <button className="w-full text-xs p-2 bg-green-500 text-white rounded hover:bg-green-600">
            SVG로 내보내기
          </button>
          <button className="w-full text-xs p-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            JSON으로 내보내기
          </button>
        </div>
      ),
    },
  ];

  return (
    <DiagramProvider>
      <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <AutoConnectManager
          showSettingsButton={true}
          settingsProps={{
            size: "compact",
            widthClass: "w-56", // 224px (매우 작음)
            maxHeightClass: "max-h-64", // 256px
            position: "top-right",
            theme: "minimal",
            compactMode: true,
            hiddenSections: ["advanced"],
            customSections: customSections,
            borderRadius: "md",
            shadow: "md",
          }}
        >
          <Box
            id="box1"
            x={60}
            y={100}
            text="A"
            enableAutoConnect={true}
            className="bg-red-500 text-white"
            width={50}
            height={50}
          />
          <Box
            id="box2"
            x={180}
            y={80}
            text="B"
            enableAutoConnect={true}
            className="bg-blue-500 text-white"
            width={50}
            height={50}
          />
          <Box
            id="box3"
            x={120}
            y={200}
            text="C"
            enableAutoConnect={true}
            className="bg-green-500 text-white"
            width={50}
            height={50}
          />
          <Box
            id="box4"
            x={240}
            y={180}
            text="D"
            enableAutoConnect={true}
            className="bg-orange-500 text-white"
            width={50}
            height={50}
          />
        </AutoConnectManager>

        {/* 안내 텍스트 */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm text-gray-700 border border-gray-300 max-w-xs">
          <div className="font-medium mb-1">🎛️ 초소형 사용자 정의:</div>
          <div>• 매우 작은 크기 (w-56 × max-h-64)</div>
          <div>• 프로젝트 설정과 내보내기 섹션</div>
          <div>• 고급 설정 숨김 처리</div>
          <div>• 미니멀 테마 적용</div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default AutoConnectCustomExample;
