import React from "react";
import { DiagramProvider } from "../DiagramContext";
import AutoConnectManager from "../AutoConnectManager";
import Box from "../Box";

const AutoConnectCompactExample = () => {
  return (
    <DiagramProvider>
      <div className="relative w-full h-96 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <AutoConnectManager
          showSettingsButton={true}
          settingsProps={{
            size: "compact",
            widthClass: "w-64",
            maxHeightClass: "max-h-80",
            position: "right",
            enableTabs: false,
            theme: "modern",
            compactMode: true,
            borderRadius: "lg",
            shadow: "lg",
          }}
        >
          <Box id="box1" x={50} y={80} text="박스 A" enableAutoConnect={true} className="bg-blue-500 text-white" />
          <Box id="box2" x={200} y={130} text="박스 B" enableAutoConnect={true} className="bg-green-500 text-white" />
          <Box id="box3" x={120} y={220} text="박스 C" enableAutoConnect={true} className="bg-purple-500 text-white" />
        </AutoConnectManager>

        {/* 안내 텍스트 */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-sm text-gray-700 border border-gray-300">
          <div className="font-medium mb-1">💡 사용법:</div>
          <div>
            • <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Shift</kbd> + 박스 클릭으로 연결 모드 시작
          </div>
          <div>• 연결점을 클릭하여 자동 연결 생성</div>
          <div>• 설정 버튼으로 옵션 조정</div>
        </div>
      </div>
    </DiagramProvider>
  );
};

export default AutoConnectCompactExample;
