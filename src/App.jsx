import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Home from "./components/Home";
import ConnectorExamples from "./components/ConnectorExamples";
import Documentation from "./components/Documentation";
import Footer from "./components/Footer";
import { ToastProvider } from "./components/ToastSystem";
import { DiagramProvider } from "./components/DiagramComponents/DiagramContext";

const App = () => {
  const handleGitHubClick = () => {
    window.open("https://github.com/KoreaMoney/sweetpotato-diagram", "_blank", "noopener,noreferrer");
  };

  return (
    <DiagramProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            {/* 라우트 */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/examples"
                element={
                  <div>
                    {/* 네비게이션 */}
                    <nav className="absolute top-4 right-4 z-30 flex gap-2">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        홈
                      </NavLink>

                      <NavLink
                        to="/examples"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        Connector 예제
                      </NavLink>

                      <NavLink
                        to="/docs"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        📚 Doc
                      </NavLink>

                      <button
                        onClick={handleGitHubClick}
                        className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2"
                        aria-label="GitHub 페이지로 이동"
                        tabIndex="0"
                      >
                        GitHub
                        <ExternalLink size={16} />
                      </button>
                    </nav>
                    <ConnectorExamples />
                  </div>
                }
              />
              <Route
                path="/docs"
                element={
                  <div>
                    {/* 네비게이션 */}
                    <nav className="absolute top-4 right-4 z-30 flex gap-2">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        홈
                      </NavLink>

                      <NavLink
                        to="/examples"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        Connector 예제
                      </NavLink>

                      <NavLink
                        to="/docs"
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg font-medium transition-colors ${
                            isActive ? "bg-[#0066ff] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        📚 Doc
                      </NavLink>

                      <button
                        onClick={handleGitHubClick}
                        className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-800 text-white hover:bg-gray-700 flex items-center gap-2"
                        aria-label="GitHub 페이지로 이동"
                        tabIndex="0"
                      >
                        GitHub
                        <ExternalLink size={16} />
                      </button>
                    </nav>
                    <Documentation />
                  </div>
                }
              />
            </Routes>

            {/* Footer - examples와 docs 페이지에서만 표시 */}
            <Routes>
              <Route path="/examples" element={<Footer />} />
              <Route path="/docs" element={<Footer />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </DiagramProvider>
  );
};

export default App;
