import React, { useEffect, useRef, useState } from "react";
import { useDiagram } from "./DiagramContext";
import AutoConnector from "./AutoConnector";
import AutoConnectSettings from "./AutoConnectSettings";
import AutoConnectCompactSettings from "./AutoConnectCompactSettings";

/**
 * AutoConnectManager 컴포넌트
 *
 * 자동 연결 모드를 관리하고 마우스 클릭 이벤트를 처리하여
 * 박스에서 포인트로의 자동 연결을 생성합니다.
 */
const AutoConnectManager = ({
  children,
  className = "",
  style = {},
  showSettingsButton = true,
  settingsProps = {
    // 기본 설정값들 - 사용자가 props로 완전히 제어 가능
    position: "right",
    size: "normal",
    theme: "modern",
    enableTabs: true,
    enableAdvanced: true,
    showHeader: true,
    showFooter: true,
    backdrop: true,
    borderRadius: "lg",
    shadow: "xl",
    compactMode: false,
    hiddenSections: [],
  }, // AutoConnectSettings에 전달할 props
}) => {
  const {
    isAutoConnectMode,
    autoConnectStartBox,
    addAutoConnection,
    cancelAutoConnect,
    autoConnections,
    removeAutoConnection,
    containerRef,
    autoConnectSettings,
  } = useDiagram();

  const managerRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

  // 마우스 클릭 이벤트 처리
  useEffect(() => {
    const handleClick = (event) => {
      // 자동 연결 모드가 아니면 무시
      if (!isAutoConnectMode || !autoConnectStartBox) return;

      // 연결점 클릭은 허용, 박스 메인 영역 클릭만 무시
      const clickedElement = event.target;
      const isConnectionPoint = clickedElement.hasAttribute("data-connection-point");
      const isBoxMainArea = clickedElement.closest("[data-box-id]") && !isConnectionPoint;

      if (isBoxMainArea) {
        return;
      }

      // 컨테이너 내부 클릭인지 확인
      const container = containerRef?.current || managerRef.current;
      if (!container || !container.contains(event.target)) return;

      // 클릭된 위치 계산
      const rect = container.getBoundingClientRect();
      const clickPoint = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      // 자동 연결 생성
      addAutoConnection(clickPoint);
      event.stopPropagation();
    };

    // ESC 키로 자동 연결 모드 취소
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isAutoConnectMode) {
        cancelAutoConnect();
        event.stopPropagation();
        event.preventDefault();
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("keydown", handleKeyDown);

    // 정리
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAutoConnectMode, autoConnectStartBox, addAutoConnection, cancelAutoConnect, containerRef]);

  // 자동 연결 모드 시각적 표시
  const getManagerStyles = () => {
    if (isAutoConnectMode) {
      return {
        cursor: "crosshair",
        position: "relative",
      };
    }
    return {};
  };

  return (
    <div
      ref={managerRef}
      className={`auto-connect-manager ${className} ${isAutoConnectMode ? "auto-connect-active" : ""}`}
      style={{
        ...style,
        ...getManagerStyles(),
      }}
    >
      {/* 자동 연결 모드 상태 표시 */}
      {isAutoConnectMode && (
        <>
          {/* 오버레이 배경 */}
          <div className="absolute inset-0 bg-purple-100 bg-opacity-20 pointer-events-none z-20" />

          {/* 상단 안내 메시지 */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
                <span className="font-medium">자동 연결 모드</span>
              </div>
              <div className="text-purple-200 text-sm">연결점을 클릭하거나 ESC로 취소</div>
            </div>
          </div>
        </>
      )}

      {/* 자식 컴포넌트 렌더링 */}
      {children}

      {/* 자동 연결선들 렌더링 */}
      {autoConnections.map((connection) => {
        // DiagramProvider가 없을 때를 대비한 fallback 박스 정보
        const fallbackBoxInfo = {
          x: 100, // 기본 위치
          y: 100,
          width: 120, // 기본 크기
          height: 60,
        };

        return (
          <AutoConnector
            key={connection.id}
            id={connection.id}
            fromBoxId={connection.fromBoxId}
            toPoint={connection.toPoint}
            onRemove={removeAutoConnection}
            fromBoxInfo={fallbackBoxInfo}
            settings={autoConnectSettings}
            userClickPoint={connection.userClickPoint} // 사용자 클릭 위치 전달
            className="transition-colors duration-200"
          />
        );
      })}

      {/* 자동 연결 모드 안내 (하단) */}
      {!isAutoConnectMode && autoConnections.length === 0 && (
        <div className="absolute bottom-4 right-15 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm opacity-75 z-30">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>Shift + 박스 클릭으로 자동 연결 시작</span>
          </div>
        </div>
      )}

      {/* 연결선 제거 안내 */}
      {!isAutoConnectMode && autoConnections.length > 0 && (
        <div className="absolute bottom-4 right-4 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm opacity-90 z-30">
          <div className="flex items-center gap-2">
            <span>🖱️</span>
            <span>더블클릭으로 제거</span>
          </div>
        </div>
      )}

      {/* 자동 연결선 개수 표시 */}
      {autoConnections.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm z-30">
          <div className="flex items-center gap-2">
            <span>🔗</span>
            <span>자동 연결: {autoConnections.length}개</span>
            <span className="text-xs opacity-75">• 더블클릭으로 개별 제거</span>
            <button
              onClick={() => {
                autoConnections.forEach((conn) => removeAutoConnection(conn.id));
              }}
              className="ml-2 text-purple-500 hover:text-purple-700 text-xs underline"
            >
              모두 제거
            </button>
            {showSettingsButton && (
              <button
                onClick={() => setShowSettings(true)}
                className="ml-2 text-purple-500 hover:text-purple-700 text-xs underline"
              >
                설정
              </button>
            )}
          </div>
        </div>
      )}

      {/* 설정 버튼 */}
      {showSettingsButton && !isAutoConnectMode && (
        <div className="fixed top-4 left-4 z-40 flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`group relative p-3 rounded-xl shadow-lg transition-all duration-300 ${
              showSettings
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white scale-105"
                : "bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:scale-105"
            }`}
            title="AutoConnect 설정"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                showSettings ? "rotate-45" : "group-hover:rotate-12"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

            {/* 연결 개수 표시 뱃지 */}
            {autoConnections.length > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {autoConnections.length}
              </div>
            )}
          </button>

          {/* 상태 표시 */}
          {showSettings && (
            <div className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-purple-100 text-purple-800 border border-purple-200">
              설정 패널 열림
            </div>
          )}
        </div>
      )}

      {/* 설정 패널 - 컴팩트 버전으로 교체 */}
      <AutoConnectCompactSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        position="top-left"
        theme="modern"
      />
    </div>
  );
};

export default AutoConnectManager;
