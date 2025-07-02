import { Box, Connector, Valve, ImageBox, Line, DiagramProvider } from "../DiagramComponents";
import { useToast } from "../ToastSystem";

const ExamplesSection = () => {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">💡 사용 예제</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">1. 기본 수소연료전지 시스템</h3>
          <div className="relative w-full h-48 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <DiagramProvider width={800} height={200}>
              <Box
                id="hydrogen-tank"
                x={20}
                y={60}
                width={70}
                height={30}
                text="수소탱크"
                className="bg-[#0066ff] text-white border-blue-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("수소탱크: 압력 350bar, 온도 25°C", "info")}
              />
              <Box
                id="compressor"
                x={150}
                y={60}
                width={70}
                height={30}
                text="압축기"
                className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("압축기: 정상 작동 중 ✅", "success")}
              />
              <Box
                id="fuel-cell"
                x={280}
                y={60}
                width={70}
                height={30}
                text="연료전지"
                className="bg-amber-500 text-white border-amber-700 border-2 rounded-lg text-xs"
                onClick={() => addToast("연료전지: 출력 100kW, 효율 60%", "info")}
              />

              <Connector
                fromBox={{ id: "hydrogen-tank", position: "right" }}
                toBox={{ id: "compressor", position: "left" }}
                connectionType="straight"
                className="text-blue-600"
                showArrow={true}
                strokeWidth={2}
              />
              <Connector
                fromBox={{ id: "compressor", position: "right" }}
                toBox={{ id: "fuel-cell", position: "left" }}
                connectionType="straight"
                className="text-emerald-600"
                showArrow={true}
                strokeWidth={2}
              />

              <Valve x={120} y={68} size={15} type="gate" isOpen={true} className="text-gray-500" />
              <Valve x={250} y={68} size={15} type="ball" isOpen={true} className="text-gray-500" />
            </DiagramProvider>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. 복잡한 반도체 회로도 시스템</h3>
          <p className="text-gray-600 mb-4">
            고성능 반도체 칩을 중심으로 한 복합 전자 시스템입니다. 전원 관리, 신호 처리, 데이터 통신이 통합된 회로도를
            보여줍니다.
          </p>

          <div className="relative w-full h-[400px] bg-gray-50 border border-gray-200 rounded-lg p-6 overflow-hidden">
            <DiagramProvider width={800} height={400}>
              <div className="absolute top-2 left-2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow z-10">
                💡 복잡한 반도체 시스템 - 각 컴포넌트를 클릭해보세요!
              </div>

              {/* 메인 프로세서 칩 (중앙) */}
              <ImageBox
                id="main-processor"
                x={200}
                y={150}
                width={100}
                height={60}
                src="https://via.placeholder.com/100x60/3B82F6/FFFFFF?text=CPU"
                alt="메인 프로세서"
                text="ARM Cortex-A78"
                className="border-4 border-blue-600 rounded-lg shadow-lg bg-white"
                onClick={() => addToast("메인 프로세서: ARM Cortex-A78, 2.8GHz, 8코어 🚀", "info")}
              />

              {/* 전원 관리 유닛 (좌상단) */}
              <Box
                id="pmu"
                x={50}
                y={50}
                width={80}
                height={30}
                text="PMU"
                className="bg-red-600 text-white border-red-800 border-2 rounded-lg text-xs font-bold"
                onClick={() => addToast("전원 관리 유닛: 3.3V/1.8V/1.2V 출력 ⚡", "error")}
              />

              {/* GPU (우상단) */}
              <ImageBox
                id="gpu"
                x={380}
                y={40}
                width={80}
                height={50}
                src="https://via.placeholder.com/80x50/8B5CF6/FFFFFF?text=GPU"
                alt="GPU"
                text="Mali-G78 GPU"
                className="border-3 border-purple-600 rounded-lg shadow-md bg-white"
                onClick={() => addToast("GPU: Mali-G78, 24코어, 1.3GHz 🎮", "info")}
              />

              {/* 메모리 컨트롤러 (좌측) */}
              <Box
                id="memory-controller"
                x={50}
                y={150}
                width={70}
                height={40}
                text="Memory Controller"
                className="bg-emerald-600 text-white border-emerald-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("메모리 컨트롤러: DDR5-5600, 듀얼채널 💾", "success")}
              />

              {/* DDR5 메모리 (좌측 하단) */}
              <Box
                id="ddr5-1"
                x={30}
                y={250}
                width={50}
                height={25}
                text="DDR5-A"
                className="bg-cyan-500 text-white border-cyan-700 border-2 rounded text-xs"
                onClick={() => addToast("DDR5 메모리 A: 16GB, 5600MHz 🧠", "info")}
              />
              <Box
                id="ddr5-2"
                x={90}
                y={250}
                width={50}
                height={25}
                text="DDR5-B"
                className="bg-cyan-500 text-white border-cyan-700 border-2 rounded text-xs"
                onClick={() => addToast("DDR5 메모리 B: 16GB, 5600MHz 🧠", "info")}
              />

              {/* PCIe 컨트롤러 (우측) */}
              <Box
                id="pcie-controller"
                x={400}
                y={150}
                width={70}
                height={40}
                text="PCIe 5.0"
                className="bg-orange-600 text-white border-orange-800 border-2 rounded-lg text-xs"
                onClick={() => addToast("PCIe 컨트롤러: 5.0 x16, 32GT/s 🔌", "warning")}
              />

              {/* NVMe SSD (우측 하단) */}
              <Box
                id="nvme-1"
                x={380}
                y={250}
                width={60}
                height={25}
                text="NVMe-1"
                className="bg-indigo-600 text-white border-indigo-800 border-2 rounded text-xs"
                onClick={() => addToast("NVMe SSD 1: 2TB, 7000MB/s 💽", "info")}
              />
              <Box
                id="nvme-2"
                x={450}
                y={250}
                width={60}
                height={25}
                text="NVMe-2"
                className="bg-indigo-600 text-white border-indigo-800 border-2 rounded text-xs"
                onClick={() => addToast("NVMe SSD 2: 1TB, 7000MB/s 💽", "info")}
              />

              {/* 네트워크 프로세서 (하단 중앙) */}
              <ImageBox
                id="network-processor"
                x={200}
                y={300}
                width={100}
                height={50}
                src="https://via.placeholder.com/100x50/10B981/FFFFFF?text=NET"
                alt="네트워크 프로세서"
                text="10GbE Controller"
                className="border-3 border-green-600 rounded-lg shadow-md bg-white"
                onClick={() => addToast("네트워크 프로세서: 10GbE, TCP 오프로드 🌐", "success")}
              />

              {/* 전력선 연결 (PMU에서 각 컴포넌트로) - 애니메이션 적용 */}
              <Connector
                fromBox={{ id: "pmu", position: "bottom" }}
                toBox={{ id: "main-processor", position: "top" }}
                connectionType="orthogonal"
                className="text-red-600"
                strokeWidth={3}
                animated={true}
              />

              <Connector
                fromBox={{ id: "pmu", position: "right" }}
                toBox={{ id: "gpu", position: "left" }}
                connectionType="straight"
                className="text-blue-600"
                showArrow={true}
                strokeWidth={3}
                animated={true}
              />

              {/* 메모리 버스 연결 - 메인 연결만 애니메이션 */}
              <Connector
                fromBox={{ id: "memory-controller", position: "right" }}
                toBox={{ id: "main-processor", position: "left" }}
                connectionType="straight"
                className="text-emerald-600"
                showArrow={true}
                showStartArrow={true}
                strokeWidth={3}
                animated={true}
              />

              <Connector
                fromBox={{ id: "memory-controller", position: "bottom" }}
                toBox={{ id: "ddr5-1", position: "top" }}
                connectionType="orthogonal"
                className="text-cyan-600"
                showArrow={true}
                strokeWidth={2}
              />

              <Connector
                fromBox={{ id: "memory-controller", position: "bottom" }}
                toBox={{ id: "ddr5-2", position: "top" }}
                connectionType="orthogonal"
                className="text-cyan-600"
                showArrow={true}
                strokeWidth={2}
              />

              {/* PCIe 연결 - 메인 연결만 애니메이션 */}
              <Connector
                fromBox={{ id: "main-processor", position: "right" }}
                toBox={{ id: "pcie-controller", position: "left" }}
                connectionType="straight"
                className="text-orange-600"
                showArrow={true}
                showStartArrow={true}
                strokeWidth={3}
                animated={true}
              />

              <Connector
                fromBox={{ id: "pcie-controller", position: "bottom" }}
                toBox={{ id: "nvme-1", position: "top" }}
                connectionType="orthogonal"
                className="text-indigo-600"
                showArrow={true}
                strokeWidth={2}
              />

              <Connector
                fromBox={{ id: "pcie-controller", position: "bottom" }}
                toBox={{ id: "nvme-2", position: "top" }}
                connectionType="orthogonal"
                className="text-indigo-600"
                showArrow={true}
                strokeWidth={2}
              />

              {/* 네트워크 연결 - 애니메이션 적용 */}
              <Connector
                fromBox={{ id: "main-processor", position: "bottom" }}
                toBox={{ id: "network-processor", position: "top" }}
                connectionType="straight"
                className="text-green-600"
                showArrow={true}
                showStartArrow={true}
                strokeWidth={3}
                animated={true}
              />

              {/* 접지 및 기준선들 */}
              <Line
                startPoint={{ x: 20, y: 370 }}
                endPoint={{ x: 520, y: 370 }}
                strokeWidth={3}
                className="text-gray-800"
                onClick={() => addToast("시스템 접지선 ⏚", "info")}
              />

              <Line
                startPoint={{ x: 90, y: 350 }}
                endPoint={{ x: 90, y: 370 }}
                strokeWidth={2}
                className="text-gray-600"
                onClick={() => addToast("접지 연결 ⏚", "info")}
              />

              <Line
                startPoint={{ x: 250, y: 350 }}
                endPoint={{ x: 250, y: 370 }}
                strokeWidth={2}
                className="text-gray-600"
                onClick={() => addToast("접지 연결 ⏚", "info")}
              />

              <Line
                startPoint={{ x: 430, y: 350 }}
                endPoint={{ x: 430, y: 370 }}
                strokeWidth={2}
                className="text-gray-600"
                onClick={() => addToast("접지 연결 ⏚", "info")}
              />
            </DiagramProvider>
          </div>

          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🔧 반도체 회로도 특징</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-blue-700 mb-2">주요 컴포넌트:</h5>
                <ul className="text-blue-600 space-y-1">
                  <li>• ARM Cortex-A78 메인 프로세서 (8코어)</li>
                  <li>• Mali-G78 GPU (24코어)</li>
                  <li>• DDR5-5600 듀얼채널 메모리</li>
                  <li>• PCIe 5.0 x16 컨트롤러</li>
                  <li>• 10GbE 네트워크 프로세서</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">시스템 특징:</h5>
                <ul className="text-purple-600 space-y-1">
                  <li>• 다중 전압 전원 관리 (PMU)</li>
                  <li>• 고속 메모리 인터페이스</li>
                  <li>• 복합 클럭 도메인</li>
                  <li>• 하드웨어 보안 모듈</li>
                  <li>• 고성능 스토리지 (NVMe)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;
