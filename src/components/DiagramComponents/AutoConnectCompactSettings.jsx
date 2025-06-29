import React from "react";
import { useDiagram } from "./DiagramContext";

/**
 * AutoConnectCompactSettings - 컴팩트한 자동연결 설정 패널
 *
 * 화면이 작거나 간단한 설정만 필요할 때 사용하는 축소 버전
 */
const AutoConnectCompactSettings = ({
  isOpen = false,
  onClose = null,
  className = "",
  position = "bottom-right", // "top-left", "top-right", "bottom-left", "bottom-right"
  theme = "modern",
}) => {
  // DiagramProvider 컨텍스트 사용
  let autoConnectSettings, updateAutoConnectSettings;

  try {
    const context = useDiagram();
    autoConnectSettings = context.autoConnectSettings;
    updateAutoConnectSettings = context.updateAutoConnectSettings;
  } catch {
    // DiagramProvider가 없는 경우 기본값
    autoConnectSettings = {
      connectionType: "smart",
      color: "purple",
      strokeWidth: 3,
      arrowShape: "triangle",
      animationType: "flow",
    };
    updateAutoConnectSettings = () => {};
  }

  const handleSettingChange = (key, value) => {
    updateAutoConnectSettings({ [key]: value });
  };

  // 위치 클래스 계산
  const getPositionClass = () => {
    const base = "fixed z-50 transition-all duration-300";
    switch (position) {
      case "top-left":
        return `${base} top-4 left-4`;
      case "top-right":
        return `${base} top-4 right-4`;
      case "bottom-left":
        return `${base} bottom-4 left-4`;
      case "bottom-right":
      default:
        return `${base} bottom-4 right-4`;
    }
  };

  // 테마 클래스
  const getThemeClass = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 border-gray-700 text-white";
      case "glass":
        return "bg-white/90 backdrop-blur border-gray-200 text-gray-900";
      default:
        return "bg-white border-gray-200 text-gray-900 shadow-xl";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${getPositionClass()} ${getThemeClass()} ${className} 
        w-80 max-w-[calc(100vw-2rem)]
        rounded-lg border-2 p-4
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-sm">자동연결 설정</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 transition-colors" title="닫기">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 컴팩트 설정들 */}
      <div className="space-y-3">
        {/* 연결 타입 */}
        <div>
          <label className="block text-xs font-medium mb-1">연결 타입</label>
          <select
            value={autoConnectSettings.connectionType}
            onChange={(e) => handleSettingChange("connectionType", e.target.value)}
            className="w-full px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="smart">🤖 스마트</option>
            <option value="straight">📏 직선</option>
            <option value="curved">〰️ 곡선</option>
            <option value="orthogonal">📐 직각</option>
            <option value="stepped">🪜 계단식</option>
          </select>
        </div>

        {/* 색상 */}
        <div>
          <label className="block text-xs font-medium mb-1">색상</label>

          {/* 기본 색상 버튼들 */}
          <div className="flex gap-1 mb-2 flex-wrap">
            {[
              { value: "purple", bg: "bg-purple-500", name: "보라" },
              { value: "blue", bg: "bg-blue-500", name: "파랑" },
              { value: "green", bg: "bg-green-500", name: "초록" },
              { value: "red", bg: "bg-red-500", name: "빨강" },
              { value: "orange", bg: "bg-orange-500", name: "주황" },
              { value: "pink", bg: "bg-pink-500", name: "분홍" },
              { value: "yellow", bg: "bg-yellow-500", name: "노랑" },
              { value: "emerald", bg: "bg-emerald-500", name: "에메랄드" },
            ].map((color) => {
              const isSelected = autoConnectSettings.color === color.value;
              return (
                <button
                  key={color.value}
                  onClick={() => handleSettingChange("color", color.value)}
                  className={`w-6 h-6 rounded ${color.bg} ${
                    isSelected ? "ring-2 ring-offset-1 ring-gray-900" : "hover:scale-110"
                  } transition-all`}
                  title={color.name}
                />
              );
            })}

            {/* 커스텀 색상 버튼 */}
            <button
              onClick={() => {
                // 현재 색상이 기본 색상이 아니면 이미 커스텀 모드
                const isBasicColor = ["purple", "blue", "green", "red", "orange", "pink", "yellow", "emerald"].includes(
                  autoConnectSettings.color
                );
                if (isBasicColor) {
                  handleSettingChange("color", "text-gray-500 hover:text-gray-700"); // 기본 커스텀 색상
                }
              }}
              className={`w-6 h-6 rounded border-2 border-dashed border-gray-400 flex items-center justify-center text-xs ${
                !["purple", "blue", "green", "red", "orange", "pink", "yellow", "emerald"].includes(
                  autoConnectSettings.color
                )
                  ? "bg-gray-200 border-gray-900"
                  : "hover:bg-gray-100"
              } transition-all`}
              title="커스텀 색상"
            >
              ✏️
            </button>
          </div>

          {/* 커스텀 색상 입력란 */}
          {!["purple", "blue", "green", "red", "orange", "pink", "yellow", "emerald"].includes(
            autoConnectSettings.color
          ) && (
            <div className="mt-2">
              <label className="block text-xs font-medium mb-1 text-gray-600">커스텀 TailwindCSS 클래스</label>
              <input
                type="text"
                value={autoConnectSettings.color}
                onChange={(e) => handleSettingChange("color", e.target.value)}
                placeholder="예: text-cyan-500 hover:text-cyan-700"
                className="w-full px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
              />
              <div className="mt-1 text-xs text-gray-500">
                💡 예시: <code className="bg-gray-100 px-1 rounded">text-cyan-500 hover:text-cyan-700</code>
              </div>
            </div>
          )}
        </div>

        {/* 선 두께 */}
        <div>
          <label className="block text-xs font-medium mb-1">선 두께: {autoConnectSettings.strokeWidth}px</label>
          <input
            type="range"
            min="1"
            max="8"
            value={autoConnectSettings.strokeWidth}
            onChange={(e) => handleSettingChange("strokeWidth", parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* 화살표 */}
        <div>
          <label className="block text-xs font-medium mb-1">화살표</label>
          <div className="flex gap-1">
            {[
              { value: "triangle", icon: "▲" },
              { value: "diamond", icon: "◆" },
              { value: "circle", icon: "●" },
              { value: "square", icon: "■" },
              { value: "none", icon: "—" },
            ].map((arrow) => (
              <button
                key={arrow.value}
                onClick={() => handleSettingChange("arrowShape", arrow.value)}
                className={`px-2 py-1 text-xs rounded ${
                  autoConnectSettings.arrowShape === arrow.value
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
                title={arrow.value}
              >
                {arrow.icon}
              </button>
            ))}
          </div>
        </div>

        {/* 애니메이션 */}
        <div>
          <label className="block text-xs font-medium mb-1">애니메이션</label>
          <select
            value={autoConnectSettings.animationType}
            onChange={(e) => handleSettingChange("animationType", e.target.value)}
            className="w-full px-2 py-1 text-xs border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="none">⏸️ 없음</option>
            <option value="flow">🌊 흐름</option>
            <option value="pulse">💗 펄스</option>
            <option value="glow">✨ 글로우</option>
            <option value="electric">⚡ 전기</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AutoConnectCompactSettings;
