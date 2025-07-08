import React from "react";
import { useDiagram } from "./DiagramContext";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";

/**
 * Undo/Redo 버튼 컴포넌트
 * DiagramContext의 undo/redo 기능을 UI로 제공합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.position - 버튼 위치 ("top-right" | "top-left" | "bottom-right" | "bottom-left" | "center")
 * @param {string} props.className - 추가 CSS 클래스
 * @param {string} props.buttonClassName - 개별 버튼에 적용할 CSS 클래스
 * @param {boolean} props.showLabels - 버튼에 텍스트 라벨 표시 여부
 * @param {string} props.size - 버튼 크기 ("sm" | "md" | "lg")
 * @param {string} props.variant - 버튼 스타일 변형 ("primary" | "secondary" | "ghost" | "success" | "warning" | "danger" | "info" | "dark" | "light" | "outline" | "gradient" | "neon" | "glass" | "rainbow" | "sunset" | "ocean" | "forest" | "cosmic" | "retro" | "minimal" | "cyberpunk" | "glow" | "holographic" | "aurora" | "metallic" | "fire" | "ice" | "luxury")
 * @param {boolean} props.enableKeyboardShortcuts - 키보드 단축키 활성화 여부
 * @param {Object} props.customLabels - 커스텀 라벨 ({ undo: "취소", redo: "복원" })
 * @param {boolean} props.iconOnly - 아이콘만 표시 (showLabels보다 우선순위 높음)
 * @param {boolean} props.vertical - 세로 배치 여부
 * @param {string} props.spacing - 버튼 간격 (예: "gap-2", "gap-4")
 * @param {string} props.rounded - 모서리 둥글기 (예: "rounded-lg", "rounded-full")
 * @param {Object} props.customStyle - 완전 커스텀 스타일 ({ undo: "bg-red-500 text-white", redo: "bg-green-500 text-white" })
 * @param {string} props.containerClass - 컨테이너에 추가할 TailwindCSS 클래스
 * @param {string} props.undoClass - Undo 버튼에 추가할 TailwindCSS 클래스
 * @param {string} props.redoClass - Redo 버튼에 추가할 TailwindCSS 클래스
 * @param {boolean} props.hoverEffects - 기본 호버 효과 활성화 여부
 */
const UndoRedoButtons = ({
  position = "top-right", // "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center"
  className = "",
  buttonClassName = "",
  showLabels = false, // 버튼에 텍스트 라벨 표시 여부
  size = "md", // "sm" | "md" | "lg"
  variant = "primary", // "primary" | "secondary" | "ghost" | "success" | "warning" | "danger" | "info" | "dark" | "light" | "outline" | "gradient" | "neon" | "glass" | "rainbow" | "sunset" | "ocean" | "forest" | "cosmic" | "retro" | "minimal" | "cyberpunk" | "glow" | "holographic" | "aurora" | "metallic" | "fire" | "ice" | "luxury"
  enableKeyboardShortcuts = true, // 키보드 단축키 활성화 여부
  customLabels = null, // { undo: "취소", redo: "복원" } 형태로 커스텀 라벨 설정
  iconOnly = false, // true일 때 아이콘만 표시 (showLabels보다 우선순위 높음)
  vertical = false, // 세로 배치 여부
  spacing = "gap-2", // 버튼 간격 커스터마이징
  rounded = "rounded-lg", // 모서리 둥글기 커스터마이징
  // 🎨 TailwindCSS 자유 커스터마이징 옵션
  customStyle = null, // { undo: "bg-red-500 text-white", redo: "bg-green-500 text-white" } 형태로 완전 커스텀
  containerClass = "", // 컨테이너에 추가할 TailwindCSS 클래스
  undoClass = "", // Undo 버튼에 추가할 TailwindCSS 클래스
  redoClass = "", // Redo 버튼에 추가할 TailwindCSS 클래스
  hoverEffects = true, // 기본 호버 효과 활성화 여부
}) => {
  const { undo, redo, getDiagramStats } = useDiagram();
  const stats = getDiagramStats();

  // 키보드 단축키 활성화
  const { getShortcutInfo } = useKeyboardShortcuts({
    enabled: enableKeyboardShortcuts,
  });
  const shortcutInfo = getShortcutInfo();

  // 위치별 스타일
  const positionStyles = {
    "top-right": "fixed top-4 right-4 z-50",
    "top-left": "fixed top-4 left-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 z-50",
    center: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
  };

  // 크기별 스타일 - 라벨 여부에 따라 다르게 적용
  const sizeStyles = {
    sm: showLabels ? "px-3 py-2 text-sm min-w-[90px] h-8" : "w-8 h-8 text-sm",
    md: showLabels ? "px-4 py-2 text-base min-w-[110px] h-10" : "w-10 h-10 text-base",
    lg: showLabels ? "px-5 py-3 text-lg min-w-[130px] h-12" : "w-12 h-12 text-lg",
  };

  // 변형별 스타일 - 더 많은 옵션 추가
  const variantStyles = {
    primary: {
      base: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    secondary: {
      base: "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
    },
    ghost: {
      base: "bg-white/90 hover:bg-gray-100 text-gray-700 shadow-md border border-gray-200 hover:shadow-lg",
      disabled: "bg-white/50 text-gray-400 cursor-not-allowed border-gray-100",
    },
    success: {
      base: "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    warning: {
      base: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    danger: {
      base: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    info: {
      base: "bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    dark: {
      base: "bg-gray-800 hover:bg-gray-900 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    light: {
      base: "bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-md border border-gray-300 hover:shadow-lg",
      disabled: "bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200",
    },
    outline: {
      base: "bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700",
      disabled: "bg-transparent text-gray-400 border-2 border-gray-300 cursor-not-allowed",
    },
    gradient: {
      base: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    neon: {
      base: "bg-black text-cyan-400 border border-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 hover:text-cyan-300 hover:border-cyan-300",
      disabled: "bg-gray-800 text-gray-600 border-gray-600 cursor-not-allowed",
    },
    glass: {
      base: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/30 shadow-lg hover:shadow-xl",
      disabled: "bg-white/10 backdrop-blur-md border border-white/20 text-gray-400 cursor-not-allowed",
    },
    rainbow: {
      base: "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hover:from-red-600 hover:via-yellow-600 hover:via-green-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl animate-pulse",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    sunset: {
      base: "bg-gradient-to-br from-orange-400 via-pink-500 to-red-500 hover:from-orange-500 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    ocean: {
      base: "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 hover:from-blue-500 hover:via-cyan-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    forest: {
      base: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 hover:from-green-500 hover:via-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    cosmic: {
      base: "bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 hover:from-purple-700 hover:via-violet-800 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 border border-purple-500/20",
      disabled: "bg-gray-800 text-gray-500 cursor-not-allowed",
    },
    retro: {
      base: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:rotate-1 transition-transform",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    minimal: {
      base: "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md",
      disabled: "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed",
    },
    cyberpunk: {
      base: "bg-black text-green-400 border border-green-400 shadow-lg shadow-green-400/30 hover:shadow-green-400/50 hover:text-green-300 hover:border-green-300 font-mono",
      disabled: "bg-gray-900 text-gray-600 border-gray-600 cursor-not-allowed",
    },
    glow: {
      base: "bg-white text-blue-600 border-2 border-blue-400 shadow-lg shadow-blue-400/50 hover:shadow-blue-400/80 hover:shadow-2xl hover:border-blue-300 hover:text-blue-500",
      disabled: "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed",
    },
    holographic: {
      base: "bg-gradient-to-br from-pink-400 via-purple-400 via-indigo-400 to-cyan-400 hover:from-pink-300 hover:via-purple-300 hover:via-indigo-300 hover:to-cyan-300 text-white shadow-xl hover:shadow-2xl border border-white/20 backdrop-blur-sm",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    aurora: {
      base: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 hover:from-green-400 hover:via-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl animate-pulse",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    metallic: {
      base: "bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 hover:from-gray-200 hover:via-gray-50 hover:to-gray-300 text-gray-800 shadow-lg hover:shadow-xl border border-gray-400",
      disabled: "bg-gray-200 text-gray-500 cursor-not-allowed",
    },
    fire: {
      base: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 text-white shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
    ice: {
      base: "bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 hover:from-blue-50 hover:via-cyan-50 hover:to-blue-100 text-blue-800 shadow-lg shadow-blue-200/50 hover:shadow-blue-200/70 border border-blue-200",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
    luxury: {
      base: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500 text-yellow-900 shadow-lg shadow-yellow-400/50 hover:shadow-yellow-400/70 border border-yellow-300",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    },
  };

  // 키보드 이벤트 핸들러
  const handleUndoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (stats.canUndo) {
        undo();
      }
    }
  };

  const handleRedoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (stats.canRedo) {
        redo();
      }
    }
  };

  // 클릭 이벤트 핸들러
  const handleUndoClick = () => {
    if (stats.canUndo) {
      undo();
    }
  };

  const handleRedoClick = () => {
    if (stats.canRedo) {
      redo();
    }
  };

  // 라벨 텍스트 결정
  const labels = customLabels || { undo: "실행취소", redo: "다시실행" };
  const shouldShowLabels = showLabels && !iconOnly;

  // 특별한 애니메이션 효과를 위한 추가 클래스
  const getAnimationClasses = () => {
    switch (variant) {
      case "neon":
      case "cyberpunk":
        return "hover:animate-pulse";
      case "rainbow":
        return "animate-pulse hover:animate-bounce";
      case "cosmic":
        return "hover:animate-pulse";
      case "retro":
        return "hover:rotate-1 hover:scale-110";
      case "glass":
        return "hover:backdrop-blur-lg";
      case "glow":
        return "hover:animate-pulse";
      case "holographic":
        return "hover:animate-bounce";
      case "aurora":
        return "animate-pulse hover:animate-spin";
      case "fire":
        return "hover:animate-pulse";
      case "luxury":
        return "hover:animate-bounce hover:rotate-2";
      default:
        return "";
    }
  };

  const baseButtonStyle = `
    ${sizeStyles[size]}
    ${rounded}
    transition-all
    duration-300
    flex
    items-center
    justify-center
    font-medium
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
    hover:scale-105
    active:scale-95
    transform
    ${getAnimationClasses()}
    ${buttonClassName}
  `;

  const getButtonStyle = (isEnabled, buttonType = null, customButtonClass = "") => {
    // 커스텀 스타일이 제공된 경우 우선 적용
    if (customStyle && customStyle[buttonType]) {
      return `${baseButtonStyle} ${customStyle[buttonType]} ${customButtonClass}`;
    }

    const variant_ = variantStyles[variant];
    const baseStyle = isEnabled ? variant_.base : variant_.disabled;

    // 호버 효과 비활성화 옵션
    const finalStyle = hoverEffects ? baseStyle : baseStyle.replace(/hover:[^\s]+/g, "");

    return `${baseButtonStyle} ${finalStyle} ${customButtonClass}`;
  };

  return (
    <div
      className={`${positionStyles[position]} flex ${
        vertical ? "flex-col" : "flex-row"
      } ${spacing} ${containerClass} ${className}`}
    >
      {/* Undo 버튼 */}
      <button
        type="button"
        className={getButtonStyle(stats.canUndo, "undo", undoClass)}
        onClick={handleUndoClick}
        onKeyDown={handleUndoKeyDown}
        disabled={!stats.canUndo}
        tabIndex={0}
        aria-label={`실행취소 ${stats.canUndo ? "(사용가능)" : "(사용불가)"}`}
        title={`${labels.undo} (${shortcutInfo.undo}) ${stats.canUndo ? "" : "- 실행취소할 작업이 없습니다"}`}
      >
        {shouldShowLabels ? (
          <span className="flex items-center gap-1 whitespace-nowrap">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
            <span className="text-sm font-medium">{labels.undo}</span>
          </span>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        )}
      </button>

      {/* Redo 버튼 */}
      <button
        type="button"
        className={getButtonStyle(stats.canRedo, "redo", redoClass)}
        onClick={handleRedoClick}
        onKeyDown={handleRedoKeyDown}
        disabled={!stats.canRedo}
        tabIndex={0}
        aria-label={`다시실행 ${stats.canRedo ? "(사용가능)" : "(사용불가)"}`}
        title={`${labels.redo} (${shortcutInfo.redo}) ${stats.canRedo ? "" : "- 다시실행할 작업이 없습니다"}`}
      >
        {shouldShowLabels ? (
          <span className="flex items-center gap-1 whitespace-nowrap">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
              />
            </svg>
            <span className="text-sm font-medium">{labels.redo}</span>
          </span>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default UndoRedoButtons;
