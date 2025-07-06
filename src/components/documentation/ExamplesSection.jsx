import { Box, Connector, Valve, ImageBox, Line, DiagramProvider } from "../DiagramComponents";
import { useToast } from "../ToastSystem";
import SystemExampleRenderer from "../DiagramComponents/SystemExampleRenderer";
import SystemFeatureCard from "../DiagramComponents/SystemFeatureCard";
import { exampleSystems, systemFeatures } from "../../data/exampleSystemsData";

const ExamplesSection = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">💡 사용 예제</h2>

        {/* 수소연료전지 시스템 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">1. {exampleSystems.hydrogenFuelCell.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.hydrogenFuelCell.description}</p>
          <SystemExampleRenderer system={exampleSystems.hydrogenFuelCell} systemKey="hydrogenFuelCell" />
        </div>

        {/* 네트워크 인프라 시스템 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. {exampleSystems.networkInfrastructure.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.networkInfrastructure.description}</p>
          <SystemExampleRenderer system={exampleSystems.networkInfrastructure} systemKey="networkInfrastructure" />
          <SystemFeatureCard
            featureData={systemFeatures.networkInfrastructure}
            gradientColors="from-green-50 to-blue-50"
          />
        </div>

        {/* 자동차 전자 시스템 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">3. {exampleSystems.automotiveElectronics.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.automotiveElectronics.description}</p>
          <SystemExampleRenderer system={exampleSystems.automotiveElectronics} systemKey="automotiveElectronics" />
          <SystemFeatureCard
            featureData={systemFeatures.automotiveElectronics}
            gradientColors="from-red-50 to-yellow-50"
          />
        </div>

        {/* 스마트 홈 IoT 시스템 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">4. {exampleSystems.smartHome.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.smartHome.description}</p>
          <SystemExampleRenderer system={exampleSystems.smartHome} systemKey="smartHome" />
          <SystemFeatureCard featureData={systemFeatures.smartHome} gradientColors="from-purple-50 to-pink-50" />
        </div>

        {/* 데이터 센터 트래픽 플로우 (Sankey) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">5. {exampleSystems.dataCenterFlow.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.dataCenterFlow.description}</p>
          <SystemExampleRenderer system={exampleSystems.dataCenterFlow} systemKey="dataCenterFlow" />
          <SystemFeatureCard featureData={systemFeatures.dataCenterFlow} gradientColors="from-blue-50 to-cyan-50" />
        </div>

        {/* 블록체인 레이어 구조 (Stack Priority) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">6. {exampleSystems.blockchainStack.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.blockchainStack.description}</p>
          <SystemExampleRenderer system={exampleSystems.blockchainStack} systemKey="blockchainStack" />
          <SystemFeatureCard
            featureData={systemFeatures.blockchainStack}
            gradientColors="from-purple-50 to-indigo-50"
          />
        </div>

        {/* 금융 거래 플로우 (Sankey) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">7. {exampleSystems.financialFlow.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.financialFlow.description}</p>
          <SystemExampleRenderer system={exampleSystems.financialFlow} systemKey="financialFlow" />
          <SystemFeatureCard featureData={systemFeatures.financialFlow} gradientColors="from-green-50 to-emerald-50" />
        </div>

        {/* 클라우드 마이크로서비스 아키텍처 (Stack) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">8. {exampleSystems.microservicesArchitecture.title}</h3>
          <p className="text-gray-600 mb-4">{exampleSystems.microservicesArchitecture.description}</p>
          <SystemExampleRenderer
            system={exampleSystems.microservicesArchitecture}
            systemKey="microservicesArchitecture"
          />
          <SystemFeatureCard
            featureData={systemFeatures.microservicesArchitecture}
            gradientColors="from-indigo-50 to-blue-50"
          />
        </div>

        {/* 복잡한 반도체 회로도 시스템 (기존 코드 유지) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">9. 복잡한 반도체 회로도 시스템</h3>
          <p className="text-gray-600 mb-4">
            고성능 반도체 칩을 중심으로 한 복합 전자 시스템입니다. 전원 관리, 신호 처리, 데이터 통신이 통합된 회로도를
            보여줍니다.
          </p>
          <LegacySemiconductorSystem />
        </div>

        {/* 추가 예제 안내 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-lg border border-indigo-200">
          <h4 className="text-lg font-bold text-indigo-800 mb-3">🎯 Sweet Diagram 활용 가이드</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-indigo-700 mb-2">🔧 컴포넌트 종류:</h5>
              <ul className="text-indigo-600 space-y-1">
                <li>• Box & ImageBox</li>
                <li>• Sankey 플로우 다이어그램</li>
                <li>• Stack Priority 레이어</li>
                <li>• Connector & Arrow</li>
                <li>• Valve & Line</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 mb-2">🎨 인터랙션 기능:</h5>
              <ul className="text-purple-600 space-y-1">
                <li>• 클릭 토스트 메시지</li>
                <li>• 드래그 앤 드롭</li>
                <li>• 우선순위 관리</li>
                <li>• 연결선 애니메이션</li>
                <li>• 플로우 하이라이트</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-cyan-700 mb-2">🚀 응용 분야:</h5>
              <ul className="text-cyan-600 space-y-1">
                <li>• 시스템 아키텍처</li>
                <li>• 데이터 플로우</li>
                <li>• 네트워크 토폴로지</li>
                <li>• 프로세스 플로우</li>
                <li>• 조직도 & 계층구조</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-300">
            <p className="text-sm text-indigo-800">
              <strong>💡 팁:</strong> 각 예제의 컴포넌트들을 클릭해보세요! 실시간 정보가 토스트 메시지로 표시됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 기존 반도체 시스템 컴포넌트를 별도로 분리 (너무 복잡해서 데이터 형태로 변환하기 어려움)
const LegacySemiconductorSystem = () => {
  const { addToast } = useToast();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">복잡한 반도체 회로도 시스템</h3>
        <p className="text-gray-600">고성능 반도체 칩을 중심으로 한 복합 전자 시스템</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 overflow-scroll max-h-[450px]">
        <DiagramProvider width={800} height={400} className="border border-gray-200 rounded bg-white mx-auto">
          {/* 툴팁 */}
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
          <ImageBox
            id="nvme-ssd"
            x={380}
            y={250}
            width={70}
            height={30}
            src="https://via.placeholder.com/70x30/F59E0B/FFFFFF?text=SSD"
            alt="NVMe SSD"
            text="NVMe 2TB"
            className="border-2 border-yellow-600 rounded-lg shadow-sm bg-white"
            onClick={() => addToast("NVMe SSD: 2TB, 7000MB/s 읽기속도 💽", "warning")}
          />

          {/* USB 컨트롤러 (하단 중앙) */}
          <Box
            id="usb-controller"
            x={200}
            y={300}
            width={80}
            height={25}
            text="USB 3.2"
            className="bg-teal-600 text-white border-teal-800 border-2 rounded text-xs"
            onClick={() => addToast("USB 컨트롤러: 3.2 Gen2, 10Gbps 🔌", "info")}
          />

          {/* 네트워크 칩 (상단 우측) */}
          <Box
            id="ethernet"
            x={500}
            y={50}
            width={60}
            height={30}
            text="GbE"
            className="bg-green-600 text-white border-green-800 border-2 rounded text-xs"
            onClick={() => addToast("이더넷: Gigabit Ethernet, RJ45 🌐", "success")}
          />

          {/* 오디오 코덱 */}
          <Box
            id="audio-codec"
            x={500}
            y={120}
            width={60}
            height={25}
            text="Audio"
            className="bg-pink-600 text-white border-pink-800 border-2 rounded text-xs"
            onClick={() => addToast("오디오 코덱: 24bit/192kHz, DTS 지원 🎵", "info")}
          />

          {/* 연결선들 */}
          <Connector
            fromBox={{ id: "pmu", position: "bottom" }}
            toBox={{ id: "main-processor", position: "top" }}
            connectionType="straight"
            className="text-red-600"
            showArrow={true}
            strokeWidth={3}
            animated={true}
          />

          <Connector
            fromBox={{ id: "memory-controller", position: "right" }}
            toBox={{ id: "main-processor", position: "left" }}
            connectionType="straight"
            className="text-emerald-600"
            showArrow={true}
            strokeWidth={3}
          />

          <Connector
            fromBox={{ id: "main-processor", position: "right" }}
            toBox={{ id: "pcie-controller", position: "left" }}
            connectionType="straight"
            className="text-orange-600"
            showArrow={true}
            strokeWidth={3}
          />

          <Connector
            fromBox={{ id: "main-processor", position: "top" }}
            toBox={{ id: "gpu", position: "bottom" }}
            connectionType="orthogonal"
            className="text-purple-600"
            showArrow={true}
            strokeWidth={3}
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

          <Connector
            fromBox={{ id: "pcie-controller", position: "bottom" }}
            toBox={{ id: "nvme-ssd", position: "top" }}
            connectionType="straight"
            className="text-yellow-600"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "main-processor", position: "bottom" }}
            toBox={{ id: "usb-controller", position: "top" }}
            connectionType="straight"
            className="text-teal-600"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "main-processor", position: "right" }}
            toBox={{ id: "ethernet", position: "left" }}
            connectionType="orthogonal"
            className="text-green-600"
            showArrow={true}
            strokeWidth={2}
          />

          <Connector
            fromBox={{ id: "main-processor", position: "right" }}
            toBox={{ id: "audio-codec", position: "left" }}
            connectionType="orthogonal"
            className="text-pink-600"
            showArrow={true}
            strokeWidth={2}
          />

          {/* 전원 라인 */}
          <Line
            startPoint={{ x: 50, y: 80 }}
            endPoint={{ x: 550, y: 80 }}
            strokeWidth={2}
            className="text-red-800"
            onClick={() => addToast("전원 라인: 3.3V 메인 파워 ⚡", "error")}
          />

          {/* 그라운드 라인 */}
          <Line
            startPoint={{ x: 50, y: 350 }}
            endPoint={{ x: 550, y: 350 }}
            strokeWidth={2}
            className="text-gray-700"
            onClick={() => addToast("그라운드 라인: 공통 접지 🔌", "info")}
          />
        </DiagramProvider>
      </div>
    </div>
  );
};

export default ExamplesSection;
