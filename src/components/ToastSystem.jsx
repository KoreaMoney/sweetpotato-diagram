import { useState, createContext, useContext } from "react";

// 토스트 컨텍스트 생성
const ToastContext = createContext();

// 토스트 훅
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// 토스트 프로바이더
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // 토스트 알림 추가 함수
  const addToast = (message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // 3초 후 자동 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // 토스트 제거 함수
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// 토스트 컨테이너 컴포넌트
const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`
          flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out
          ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "warning"
              ? "bg-yellow-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-[#0066ff] text-white"
          }
          animate-slide-in-right
        `}
        style={{
          animation: "slideInRight 0.3s ease-out",
        }}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">
            {toast.type === "success" ? "✅" : toast.type === "warning" ? "⚠️" : toast.type === "error" ? "❌" : "ℹ️"}
          </span>
          <span className="font-medium">{toast.message}</span>
        </div>
        <button onClick={() => removeToast(toast.id)} className="ml-4 text-white hover:text-gray-200 transition-colors">
          ✕
        </button>
      </div>
    ))}
  </div>
);
