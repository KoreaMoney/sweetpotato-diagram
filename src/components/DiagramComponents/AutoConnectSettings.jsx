import React, { useState } from "react";
import { useDiagram } from "./DiagramContext";

/**
 * AutoConnectSettings 컴포넌트
 *
 * 자동 연결 기능의 다양한 설정을 관리하는 아름다운 설정 패널
 */
const AutoConnectSettings = ({
  // 기본 설정
  isOpen = false,
  onClose = null,
  className = "",

  // 레이아웃 설정
  position = "right", // eslint-disable-line no-unused-vars
  size = "normal", // "compact", "normal", "large", "fullscreen"
  width = null, // 커스텀 폭 (예: "400px", "50vw", "w-80")
  height = null, // 커스텀 높이 (예: "600px", "80vh", "h-96")

  // Tailwind CSS 클래스 지원
  widthClass = null, // Tailwind 폭 클래스 (예: "w-80", "w-96")
  heightClass = null, // Tailwind 높이 클래스 (예: "h-96", "h-screen")
  maxWidthClass = null, // 최대 폭 (예: "max-w-sm", "max-w-md")
  maxHeightClass = null, // 최대 높이 (예: "max-h-96", "max-h-screen")

  // UI 설정
  theme = "modern", // "modern", "dark", "minimal", "glass"
  enableTabs = true,
  enableAdvanced = true,
  showHeader = true,
  showFooter = true,

  // 콘텐츠 설정
  customSections = null,
  hiddenSections = [], // 숨길 섹션들
  compactMode = false, // 모든 설정을 한 화면에

  // 스타일 설정
  style = {},
  borderRadius = "lg", // "none", "sm", "md", "lg", "xl", "full"
  shadow = "xl", // "none", "sm", "md", "lg", "xl", "2xl"
  backdrop = true, // 배경 블러 효과
}) => {
  // DiagramProvider가 없을 때도 작동하도록 옵셔널 사용
  let autoConnectSettings, updateAutoConnectSettings, resetAutoConnectSettings, autoConnections, clearAutoConnections;

  try {
    const context = useDiagram();
    autoConnectSettings = context.autoConnectSettings;
    updateAutoConnectSettings = context.updateAutoConnectSettings;
    resetAutoConnectSettings = context.resetAutoConnectSettings;
    autoConnections = context.autoConnections;
    clearAutoConnections = context.clearAutoConnections;
  } catch (error) {
    console.log("error", error);
    // DiagramProvider가 없는 경우 기본값 사용
    console.warn("AutoConnectSettings: DiagramProvider가 없어서 기본 설정으로 실행됩니다.");
    autoConnectSettings = {
      connectionType: "smart",
      color: "purple",
      strokeWidth: 3,
      arrowShape: "triangle",
      arrowSize: 12,
      animationType: "flow",
      animationSpeed: 2,
      curveStrength: 0.5,
      opacity: 0.8,
      showShadow: true,
      showConnectionPoints: false,
    };
    updateAutoConnectSettings = () => console.log("updateAutoConnectSettings 호출됨");
    resetAutoConnectSettings = () => console.log("resetAutoConnectSettings 호출됨");
    autoConnections = [];
    clearAutoConnections = () => console.log("clearAutoConnections 호출됨");
  }

  const [activeTab, setActiveTab] = useState("appearance");

  const handleSettingChange = (key, value) => {
    updateAutoConnectSettings({ [key]: value });
  };

  // 설정 옵션들
  const connectionTypeOptions = [
    { value: "smart", label: "스마트", desc: "자동 최적 경로", icon: "🤖" },
    { value: "straight", label: "직선", desc: "직선 연결", icon: "📏" },
    { value: "curved", label: "곡선", desc: "부드러운 곡선", icon: "〰️" },
    { value: "orthogonal", label: "직각", desc: "직각 연결", icon: "📐" },
    { value: "stepped", label: "계단식", desc: "계단 모양", icon: "🪜" },
  ];

  const colorOptions = [
    { value: "purple", label: "보라색", color: "#8b5cf6", bg: "bg-purple-500" },
    { value: "blue", label: "파란색", color: "#3b82f6", bg: "bg-blue-500" },
    { value: "green", label: "초록색", color: "#10b981", bg: "bg-green-500" },
    { value: "red", label: "빨간색", color: "#ef4444", bg: "bg-red-500" },
    { value: "orange", label: "주황색", color: "#f97316", bg: "bg-orange-500" },
    { value: "pink", label: "분홍색", color: "#ec4899", bg: "bg-pink-500" },
    { value: "indigo", label: "남색", color: "#6366f1", bg: "bg-indigo-500" },
    { value: "cyan", label: "청록색", color: "#06b6d4", bg: "bg-cyan-500" },
    { value: "yellow", label: "노란색", color: "#eab308", bg: "bg-yellow-500" },
    { value: "emerald", label: "에메랄드", color: "#10b981", bg: "bg-emerald-500" },
    { value: "rose", label: "장미색", color: "#f43f5e", bg: "bg-rose-500" },
    { value: "violet", label: "보라빛", color: "#8b5cf6", bg: "bg-violet-500" },
  ];

  // 기본 색상 체크 함수
  const isBasicColor = (color) => {
    return colorOptions.some((option) => option.value === color);
  };

  const arrowShapeOptions = [
    { value: "triangle", label: "삼각형", icon: "▲" },
    { value: "diamond", label: "다이아몬드", icon: "◆" },
    { value: "circle", label: "원형", icon: "●" },
    { value: "square", label: "사각형", icon: "■" },
    { value: "none", label: "없음", icon: "—" },
  ];

  const animationOptions = [
    { value: "none", label: "없음", desc: "애니메이션 없음", icon: "⏸️" },
    { value: "flow", label: "흐름", desc: "흐르는 효과", icon: "🌊" },
    { value: "pulse", label: "펄스", desc: "맥박 효과", icon: "💗" },
    { value: "glow", label: "글로우", desc: "빛나는 효과", icon: "✨" },
    { value: "electric", label: "전기", desc: "전기 효과", icon: "⚡" },
  ];

  // 크기 설정 계산 (반응형 개선)
  const getSizeConfig = () => {
    // 사용자 정의 크기가 있으면 우선 적용
    if (width || height) {
      return {
        width: width || "auto",
        height: height || "auto",
        maxWidth: "min(90vw, 800px)", // 반응형 최대 폭 제한
        maxHeight: "min(90vh, 700px)", // 반응형 최대 높이 제한
      };
    }

    // 사이즈 프리셋 적용 (반응형 고려)
    switch (size) {
      case "compact":
        return {
          width: "min(280px, 90vw)", // 모바일에서 화면 크기 고려
          height: "auto",
          maxHeight: "min(50vh, 400px)",
        };
      case "large":
        return {
          width: "min(520px, 92vw)",
          height: "auto",
          maxHeight: "min(85vh, 750px)",
        };
      case "fullscreen":
        return {
          width: "min(98vw, 1200px)",
          height: "min(95vh, 800px)",
          maxHeight: "95vh",
        };
      case "normal":
      default:
        return {
          width: "min(380px, 90vw)", // 모바일 화면 고려
          height: "auto",
          maxHeight: "min(75vh, 650px)",
        };
    }
  };

  // Tailwind 클래스 조합
  const getSizeClasses = () => {
    const classes = [];

    if (widthClass) classes.push(widthClass);
    if (heightClass) classes.push(heightClass);
    if (maxWidthClass) classes.push(maxWidthClass);
    if (maxHeightClass) classes.push(maxHeightClass);

    return classes.join(" ");
  };

  // 테마 클래스 계산
  const getThemeClasses = () => {
    const borderRadiusClass =
      {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      }[borderRadius] || "rounded-lg";

    const shadowClass =
      {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      }[shadow] || "shadow-xl";

    const baseClasses = `fixed z-50 ${borderRadiusClass} ${shadowClass} border transition-all duration-300`;

    switch (theme) {
      case "dark":
        return `${baseClasses} bg-gray-900 border-gray-700 text-white`;
      case "minimal":
        return `${baseClasses} bg-white border-gray-200 shadow-sm`;
      case "glass":
        return `${baseClasses} bg-white/80 backdrop-blur-xl border-white/30 shadow-2xl`;
      case "modern":
      default:
        return `${baseClasses} bg-white border-gray-300 border-2`;
    }
  };

  // 위치 클래스 계산 (반응형 개선)
  const getPositionClasses = () => {
    const themeClasses = getThemeClasses();

    // 모든 위치를 안전한 모달 스타일로 통일
    return `${themeClasses} 
      fixed inset-4 sm:inset-8 md:inset-16 lg:inset-x-32 lg:inset-y-12 
      m-auto 
      w-auto h-auto 
      max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] md:max-w-[600px] 
      max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] md:max-h-[80vh]
      overflow-hidden`;
  };

  // 애니메이션 클래스
  const getAnimationClasses = () => {
    if (!isOpen) return "opacity-0 scale-95 pointer-events-none";
    return "opacity-100 scale-100";
  };

  // 탭 렌더링
  const renderTabs = () => {
    if (!enableTabs || compactMode) return null;

    const tabs = [
      { id: "appearance", label: "외관", icon: "🎨" },
      { id: "behavior", label: "동작", icon: "⚙️" },
      ...(enableAdvanced ? [{ id: "advanced", label: "고급", icon: "🔬" }] : []),
    ];

    return (
      <div
        className={`px-4 md:px-6 pt-3 md:pt-4 border-b flex-shrink-0 ${
          theme === "dark" ? "border-gray-700" : theme === "glass" ? "border-white/20" : "border-gray-200"
        }`}
      >
        <div className="flex space-x-1 mb-3 md:mb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? theme === "dark"
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-purple-500 text-white shadow-lg"
                  : theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // 섹션 제목 컴포넌트
  const SectionTitle = ({ title, subtitle, icon }) => (
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <h4 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h4>
        {subtitle && <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>}
      </div>
    </div>
  );

  // 외관 설정 렌더링
  const renderAppearanceSettings = () => {
    return (
      <div className="space-y-6">
        {/* 연결 타입 */}
        <div>
          <SectionTitle title="연결 타입" subtitle="연결선의 모양을 선택하세요" icon="🔗" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {connectionTypeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  autoConnectSettings.connectionType === option.value
                    ? theme === "dark"
                      ? "border-purple-500 bg-purple-900/30"
                      : "border-purple-500 bg-purple-50"
                    : theme === "dark"
                    ? "border-gray-700 hover:border-gray-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="connectionType"
                  value={option.value}
                  checked={autoConnectSettings.connectionType === option.value}
                  onChange={(e) => handleSettingChange("connectionType", e.target.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {option.label}
                  </div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 색상 선택 */}
        <div>
          <SectionTitle title="색상" subtitle="연결선의 색상을 선택하세요" icon="🎨" />

          {/* 기본 색상 팔레트 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange("color", option.value)}
                className={`group relative p-2 rounded-lg border-2 transition-all ${
                  autoConnectSettings.color === option.value
                    ? "border-gray-900 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-full h-8 rounded-md ${option.bg} mb-1`}></div>
                <div className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {option.label}
                </div>
                {autoConnectSettings.color === option.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}

            {/* 커스텀 색상 버튼 */}
            <button
              onClick={() => {
                if (isBasicColor(autoConnectSettings.color)) {
                  handleSettingChange("color", "text-gray-500 hover:text-gray-700");
                }
              }}
              className={`group relative p-2 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center ${
                !isBasicColor(autoConnectSettings.color)
                  ? "border-purple-500 bg-purple-50 scale-105"
                  : "border-gray-400 hover:border-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="w-full h-8 rounded-md bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 mb-1 opacity-60"></div>
              <div className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} text-center`}>
                커스텀
              </div>
              {!isBasicColor(autoConnectSettings.color) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* 커스텀 색상 입력란 */}
          {!isBasicColor(autoConnectSettings.color) && (
            <div
              className={`p-4 rounded-lg border-2 border-dashed ${
                theme === "dark" ? "border-gray-600 bg-gray-800/50" : "border-purple-300 bg-purple-50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✏️</span>
                  <label className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    커스텀 TailwindCSS 클래스
                  </label>
                </div>

                <input
                  type="text"
                  value={autoConnectSettings.color}
                  onChange={(e) => handleSettingChange("color", e.target.value)}
                  placeholder="예: text-cyan-500 hover:text-cyan-700"
                  className={`w-full px-3 py-2 text-sm border rounded-lg font-mono focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />

                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} space-y-1`}>
                  <div>
                    💡 <strong>사용 예시:</strong>
                  </div>
                  <div className="pl-4 space-y-1 font-mono">
                    <div>
                      <code className={`px-2 py-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                        text-cyan-500 hover:text-cyan-700
                      </code>
                    </div>
                    <div>
                      <code className={`px-2 py-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                        text-emerald-600 hover:text-emerald-800
                      </code>
                    </div>
                    <div>
                      <code className={`px-2 py-1 rounded ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                        text-rose-400 hover:text-rose-600
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 선 두께 */}
        <div>
          <SectionTitle title="선 두께" subtitle={`현재: ${autoConnectSettings.strokeWidth}px`} icon="📏" />
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="8"
              value={autoConnectSettings.strokeWidth}
              onChange={(e) => handleSettingChange("strokeWidth", parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1px</span>
              <span>4px</span>
              <span>8px</span>
            </div>
          </div>
        </div>

        {/* 화살표 모양 */}
        <div>
          <SectionTitle title="화살표 모양" subtitle="연결선 끝의 화살표 모양" icon="➤" />
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-2">
            {arrowShapeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange("arrowShape", option.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  autoConnectSettings.arrowShape === option.value
                    ? theme === "dark"
                      ? "border-purple-500 bg-purple-900/30"
                      : "border-purple-500 bg-purple-50"
                    : theme === "dark"
                    ? "border-gray-700 hover:border-gray-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className={`text-xs font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 동작 설정 렌더링
  const renderBehaviorSettings = () => (
    <div className="space-y-6">
      {/* 애니메이션 효과 */}
      <div>
        <SectionTitle title="애니메이션 효과" subtitle="연결선의 애니메이션을 선택하세요" icon="✨" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          {animationOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                autoConnectSettings.animationType === option.value
                  ? theme === "dark"
                    ? "border-purple-500 bg-purple-900/30"
                    : "border-purple-500 bg-purple-50"
                  : theme === "dark"
                  ? "border-gray-700 hover:border-gray-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="animationType"
                value={option.value}
                checked={autoConnectSettings.animationType === option.value}
                onChange={(e) => handleSettingChange("animationType", e.target.value)}
                className="sr-only"
              />
              <span className="text-2xl">{option.icon}</span>
              <div className="flex-1">
                <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{option.label}</div>
                <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 애니메이션 속도 */}
      {autoConnectSettings.animationType !== "none" && (
        <div>
          <SectionTitle title="애니메이션 속도" subtitle={`현재: ${autoConnectSettings.animationSpeed}s`} icon="⚡" />
          <div className="space-y-3">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={autoConnectSettings.animationSpeed}
              onChange={(e) => handleSettingChange("animationSpeed", parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>빠름 (0.5s)</span>
              <span>보통 (1.5s)</span>
              <span>느림 (3s)</span>
            </div>
          </div>
        </div>
      )}

      {/* 자동 정리 */}
      <div>
        <SectionTitle title="자동 정리" subtitle="연결선 자동 관리 옵션" icon="🧹" />
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <input
            type="checkbox"
            checked={autoConnectSettings.autoCleanup}
            onChange={(e) => handleSettingChange("autoCleanup", e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded"
          />
          <div className="flex-1">
            <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              중복 연결선 자동 제거
            </div>
            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              같은 위치의 연결선이 있으면 자동으로 제거합니다
            </div>
          </div>
        </label>
      </div>

      {/* 스마트 스냅 */}
      <div>
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <input
            type="checkbox"
            checked={autoConnectSettings.smartSnap}
            onChange={(e) => handleSettingChange("smartSnap", e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded"
          />
          <div className="flex-1">
            <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>스마트 스냅</div>
            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              박스의 가장자리에 자동으로 연결점을 맞춥니다
            </div>
          </div>
        </label>
      </div>
    </div>
  );

  // 고급 설정 렌더링
  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      {/* 곡선 강도 */}
      {autoConnectSettings.connectionType === "curved" && (
        <div>
          <SectionTitle title="곡선 강도" subtitle={`현재: ${autoConnectSettings.curveStrength}%`} icon="〰️" />
          <div className="space-y-3">
            <input
              type="range"
              min="10"
              max="100"
              value={autoConnectSettings.curveStrength}
              onChange={(e) => handleSettingChange("curveStrength", parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>약함 (10%)</span>
              <span>보통 (50%)</span>
              <span>강함 (100%)</span>
            </div>
          </div>
        </div>
      )}

      {/* 투명도 */}
      <div>
        <SectionTitle title="투명도" subtitle={`현재: ${Math.round(autoConnectSettings.opacity * 100)}%`} icon="👻" />
        <div className="space-y-3">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={autoConnectSettings.opacity}
            onChange={(e) => handleSettingChange("opacity", parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* 그림자 효과 */}
      <div>
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <input
            type="checkbox"
            checked={autoConnectSettings.showShadow}
            onChange={(e) => handleSettingChange("showShadow", e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded"
          />
          <div className="flex-1">
            <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>그림자 효과</div>
            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              연결선에 그림자 효과를 추가합니다
            </div>
          </div>
        </label>
      </div>

      {/* 연결점 표시 */}
      <div>
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <input
            type="checkbox"
            checked={autoConnectSettings.showConnectionPoints}
            onChange={(e) => handleSettingChange("showConnectionPoints", e.target.checked)}
            className="w-5 h-5 text-purple-600 rounded"
          />
          <div className="flex-1">
            <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>연결점 표시</div>
            <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              박스의 연결 가능한 점들을 시각적으로 표시합니다
            </div>
          </div>
        </label>
      </div>
    </div>
  );

  // 사용자 정의 섹션 렌더링
  const renderCustomSections = () => {
    if (!customSections || customSections.length === 0) return null;

    return (
      <div className="space-y-6">
        {customSections.map((section, index) => (
          <div key={index}>
            <SectionTitle title={section.title} subtitle={section.subtitle} icon={section.icon || "⚙️"} />
            {section.content}
          </div>
        ))}
      </div>
    );
  };

  // 컨텐츠 렌더링
  const renderContent = () => {
    if (compactMode) {
      const content = (
        <div className="space-y-8">
          {!hiddenSections.includes("appearance") && renderAppearanceSettings()}
          {!hiddenSections.includes("behavior") && renderBehaviorSettings()}
          {enableAdvanced && !hiddenSections.includes("advanced") && renderAdvancedSettings()}
          {renderCustomSections()}
        </div>
      );
      return content;
    }

    let content;
    switch (activeTab) {
      case "appearance":
        content = renderAppearanceSettings();
        break;
      case "behavior":
        content = renderBehaviorSettings();
        break;
      case "advanced":
        content = renderAdvancedSettings();
        break;
      default:
        content = renderAppearanceSettings();
        break;
    }
    return content;
  };

  const sizeConfig = getSizeConfig();

  // 표시되지 않는 경우를 위한 처리
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* 배경 오버레이 */}
      {backdrop && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* 메인 패널 */}
      <div
        className={`auto-connect-settings ${getPositionClasses()} ${getAnimationClasses()} ${getSizeClasses()} ${className} flex flex-col overflow-hidden`}
        style={{
          ...(widthClass || heightClass || maxWidthClass || maxHeightClass ? {} : sizeConfig),
          ...style,
          zIndex: 50,
        }}
      >
        {/* 헤더 */}
        {showHeader && (
          <div
            className={`px-4 md:px-6 py-3 md:py-4 border-b ${
              theme === "dark" ? "border-gray-700" : theme === "glass" ? "border-white/20" : "border-gray-200"
            } flex justify-between items-center flex-shrink-0`}
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  theme === "dark" ? "bg-purple-400" : "bg-purple-500"
                } animate-pulse flex-shrink-0`}
              ></div>
              <h3
                className={`text-base md:text-lg font-bold truncate ${
                  theme === "dark" ? "text-white" : theme === "glass" ? "text-gray-800" : "text-gray-900"
                }`}
              >
                AutoConnect 설정
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                  theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                }`}
              >
                {autoConnections.length}개 연결
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                title="설정 닫기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* 탭 네비게이션 */}
        {renderTabs()}

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 min-h-0">{renderContent()}</div>

        {/* 푸터 */}
        {showFooter && (
          <div
            className={`px-4 md:px-6 py-3 md:py-4 border-t flex-shrink-0 ${
              theme === "dark"
                ? "border-gray-700 bg-gray-800/50"
                : theme === "glass"
                ? "border-white/20 bg-white/50"
                : "border-gray-200 bg-gray-50"
            } flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0`}
          >
            <div className="flex gap-2">
              <button
                onClick={resetAutoConnectSettings}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                초기화
              </button>
              {autoConnections.length > 0 && (
                <button
                  onClick={clearAutoConnections}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    theme === "dark"
                      ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
                      : "text-red-600 hover:text-red-700 hover:bg-red-50"
                  }`}
                >
                  모든 연결 삭제
                </button>
              )}
            </div>
            <div className={`text-xs text-center sm:text-left ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              <span className="hidden sm:inline">Shift + 클릭으로 연결 시작</span>
              <span className="sm:hidden">Shift+클릭 연결</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AutoConnectSettings;
