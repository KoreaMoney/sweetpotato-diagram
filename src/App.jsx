import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Home from "./components/Home";
import ConnectorExamples from "./components/DiagramComponents/ConnectorExamples";
import ArrowDemo from "./components/DiagramComponents/ArrowDemo";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/ToastSystem";
import { DiagramProvider } from "./components/DiagramComponents/DiagramContext";
import ComponentShowcase from "./test/ComponentShowcase";
import Box from "./components/DiagramComponents/Box";
import DraggableBox from "./components/DiagramComponents/DraggableBox";
import Triangle from "./components/DiagramComponents/Triangle";
import Valve from "./components/DiagramComponents/Valve";
import ImageBox from "./components/DiagramComponents/ImageBox";

const App = () => {
  const [showTest, setShowTest] = useState(false);

  const handleGitHubClick = () => {
    window.open("https://github.com/KoreaMoney/sweetpotato-diagram", "_blank", "noopener,noreferrer");
  };

  // 테스트 컴포넌트
  const TestComponents = () => (
    <div className="fixed inset-0 bg-white z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">컴포넌트 테스트</h2>
        <button onClick={() => setShowTest(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          닫기
        </button>
      </div>

      <div className="relative w-full h-96 bg-gray-100 border-2 border-gray-300 rounded">
        {/* 테스트용 Box들 */}
        <Box
          id="test-box-1"
          x={50}
          y={50}
          width={100}
          height={40}
          text="Box 1"
          className="bg-blue-500 text-white border-blue-600 border-2 rounded"
        />

        <Box
          id="test-box-2"
          x={200}
          y={100}
          width={120}
          height={60}
          text="Box 2"
          className="bg-green-500 text-white border-green-600 border-2 rounded"
        />

        <Box
          id="test-box-3"
          x={350}
          y={50}
          width={80}
          height={30}
          text="Box 3"
          className="bg-red-500 text-white border-red-600 border-2 rounded"
        />

        {/* 드래그 가능한 박스 */}
        <DraggableBox
          id="drag-test"
          initialX={100}
          initialY={200}
          width={140}
          height={70}
          title="드래그 테스트"
          color="purple"
        />

        {/* 다른 컴포넌트들 */}
        <Triangle x={300} y={200} size={40} direction="up" />
        <Valve x={400} y={180} size={50} type="ball" isOpen={true} />
        <ImageBox id="img-test" x={500} y={150} width={80} height={60} text="이미지" icon="⚙️" iconType="emoji" />
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">브라우저 콘솔을 확인하세요:</h3>
        <p className="text-sm text-gray-600">
          각 Box 컴포넌트의 props가 콘솔에 출력됩니다. F12를 눌러 개발자 도구를 열고 Console 탭을 확인하세요.
        </p>
      </div>
    </div>
  );

  return (
    <DiagramProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* 테스트 버튼 */}
            <div className="fixed top-4 right-4 z-40">
              <button
                onClick={() => setShowTest(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-lg"
              >
                컴포넌트 테스트
              </button>
            </div>

            {/* 네비게이션 */}
            <nav className="bg-white shadow-lg sticky top-0 z-30">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  <Link to="/" className="text-2xl font-bold text-blue-600">
                    SweetPD
                  </Link>
                  <div className="flex space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                      홈
                    </Link>
                    <Link to="/connectors" className="text-gray-700 hover:text-blue-600 transition-colors">
                      연결선 예제
                    </Link>
                    <Link to="/arrows" className="text-gray-700 hover:text-blue-600 transition-colors">
                      화살표 데모
                    </Link>
                    <Link to="/docs" className="text-gray-700 hover:text-blue-600 transition-colors">
                      문서
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* 라우트 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/connectors" element={<ConnectorExamples />} />
              <Route path="/arrows" element={<ArrowDemo />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>

            {/* 테스트 오버레이 */}
            {showTest && <TestComponents />}
          </div>
        </Router>
      </ToastProvider>
    </DiagramProvider>
  );
};

export default App;
