import { useEffect } from "react";
import { useDiagram } from "../DiagramContext";

/**
 * 다이어그램 키보드 단축키를 처리하는 커스텀 훅
 * @param {Object} options - 키보드 단축키 옵션
 * @param {boolean} options.enabled - 키보드 단축키 활성화 여부 (기본값: true)
 * @param {boolean} options.preventDefault - 기본 브라우저 동작 방지 여부 (기본값: true)
 * @param {Function} options.onUndo - 사용자 정의 undo 콜백
 * @param {Function} options.onRedo - 사용자 정의 redo 콜백
 * @param {Array} options.excludeElements - 단축키를 무시할 요소들 (기본값: ['INPUT', 'TEXTAREA'])
 */
const useKeyboardShortcuts = ({
  enabled = true,
  preventDefault = true,
  onUndo = null,
  onRedo = null,
  excludeElements = ["INPUT", "TEXTAREA", "SELECT"],
} = {}) => {
  const { undo, redo, getDiagramStats } = useDiagram();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      // 포커스된 요소가 입력 요소인지 확인
      const activeElement = document.activeElement;
      const isInputElement =
        excludeElements.includes(activeElement?.tagName) || activeElement?.contentEditable === "true";

      // 입력 요소에서는 단축키 무시
      if (isInputElement) return;

      const { ctrlKey, metaKey, shiftKey, key } = event;
      const isCtrlOrCmd = ctrlKey || metaKey; // Windows/Linux: Ctrl, Mac: Cmd

      // Ctrl+Z 또는 Cmd+Z (Undo)
      if (isCtrlOrCmd && !shiftKey && key.toLowerCase() === "z") {
        const stats = getDiagramStats();
        if (stats.canUndo) {
          if (preventDefault) {
            event.preventDefault();
            event.stopPropagation();
          }

          if (onUndo) {
            onUndo();
          } else {
            undo();
          }
        }
        return;
      }

      // Ctrl+Y 또는 Cmd+Y 또는 Ctrl+Shift+Z (Redo)
      if (
        (isCtrlOrCmd && !shiftKey && key.toLowerCase() === "y") ||
        (isCtrlOrCmd && shiftKey && key.toLowerCase() === "z")
      ) {
        const stats = getDiagramStats();
        if (stats.canRedo) {
          if (preventDefault) {
            event.preventDefault();
            event.stopPropagation();
          }

          if (onRedo) {
            onRedo();
          } else {
            redo();
          }
        }
        return;
      }
    };

    // 전역 키보드 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown, true); // capture phase에서 처리

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [enabled, preventDefault, onUndo, onRedo, excludeElements, undo, redo, getDiagramStats]);

  // 수동으로 호출할 수 있는 함수들 반환
  return {
    triggerUndo: () => {
      const stats = getDiagramStats();
      if (stats.canUndo) {
        if (onUndo) {
          onUndo();
        } else {
          undo();
        }
      }
    },
    triggerRedo: () => {
      const stats = getDiagramStats();
      if (stats.canRedo) {
        if (onRedo) {
          onRedo();
        } else {
          redo();
        }
      }
    },
    getShortcutInfo: () => ({
      undo: "Ctrl+Z (Cmd+Z on Mac)",
      redo: "Ctrl+Y (Cmd+Y on Mac) or Ctrl+Shift+Z (Cmd+Shift+Z on Mac)",
    }),
  };
};

export default useKeyboardShortcuts;
