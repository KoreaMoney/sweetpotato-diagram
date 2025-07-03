/**
 * 그룹 관련 상수 정의
 */

// 기본 그룹 스타일
export const DEFAULT_GROUP_STYLE = {
  backgroundColor: "transparent",
  borderColor: "#3b82f6",
  borderWidth: 2,
  borderRadius: 12,
  padding: 15,
};

// 드래그 임계값 (픽셀)
export const DRAG_THRESHOLD = 5;

// 애니메이션 지속 시간 (밀리초)
export const ANIMATION_DURATION = {
  TRANSFORM_RESET: 200,
  FINAL_MOVE: 150,
  STATE_TRANSITION: 300,
};

// Z-Index 값
export const Z_INDEX = {
  DEFAULT: 1,
  HOVER: 10,
  DRAGGING: 999,
  DRAGGING_BOX: 1000,
};

// 라벨 관련 상수
export const LABEL_CONFIG = {
  HEIGHT: 24,
  MIN_TOP_OFFSET: 8,
  HORIZONTAL_OFFSET: 8,
};

// CSS 전환 효과
export const TRANSITIONS = {
  TRANSFORM_RESET: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  FINAL_MOVE: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
  STATE_CHANGE: "all 0.3s ease-out",
};

// 로그 메시지 템플릿
export const LOG_MESSAGES = {
  BOX_REGISTER: (boxId, groupId) => `📦 박스 등록: ${boxId} to group: ${groupId}`,
  BOX_UNREGISTER: (boxId, groupId) => `📦 박스 해제: ${boxId} from group: ${groupId}`,
  GROUP_MOUSE_DOWN: (groupLabel) => `🖱️ 그룹 마우스 다운: ${groupLabel}`,
  DRAG_START: (groupLabel) => `🚀 드래그 시작: ${groupLabel}`,
  MOUSE_UP: (groupLabel, hasMoved) => `🏁 마우스 업: ${groupLabel}, 이동됨: ${hasMoved}`,
  DRAG_COMPLETE: (groupLabel) => `✅ 드래그 완료: ${groupLabel}`,
  GROUP_CLICK: (groupLabel) => `👆 그룹 클릭: ${groupLabel}`,
  GROUP_RENDER: (groupId, boxCount, hasBackground) =>
    `🎯 그룹 렌더링: ${groupId}, 박스 수: ${boxCount}, 배경 표시: ${hasBackground}`,
};
