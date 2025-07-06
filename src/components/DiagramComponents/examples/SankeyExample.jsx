import React, { useState } from "react";
import Sankey from "../Sankey";
import { useToast } from "../../ToastSystem";

const SankeyExample = () => {
  const { addToast } = useToast();
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [activeExample, setActiveExample] = useState(0);

  // 예시 데이터들
  const examples = [
    {
      title: "에너지 흐름",
      description: "재생 에너지에서 최종 사용까지의 에너지 흐름을 시각화",
      data: {
        nodes: [
          { id: "solar", name: "태양광", layer: 0 },
          { id: "wind", name: "풍력", layer: 0 },
          { id: "hydro", name: "수력", layer: 0 },
          { id: "grid", name: "전력망", layer: 1 },
          { id: "storage", name: "저장", layer: 1 },
          { id: "residential", name: "주거", layer: 2 },
          { id: "commercial", name: "상업", layer: 2 },
          { id: "industrial", name: "산업", layer: 2 },
        ],
        links: [
          { id: "link-solar-grid", source: "solar", target: "grid", value: 120 },
          { id: "link-wind-grid", source: "wind", target: "grid", value: 80 },
          { id: "link-hydro-grid", source: "hydro", target: "grid", value: 60 },
          { id: "link-solar-storage", source: "solar", target: "storage", value: 30 },
          { id: "link-wind-storage", source: "wind", target: "storage", value: 20 },
          { id: "link-grid-residential", source: "grid", target: "residential", value: 100 },
          { id: "link-grid-commercial", source: "grid", target: "commercial", value: 80 },
          { id: "link-grid-industrial", source: "grid", target: "industrial", value: 80 },
          { id: "link-storage-residential", source: "storage", target: "residential", value: 25 },
          { id: "link-storage-commercial", source: "storage", target: "commercial", value: 15 },
          { id: "link-storage-industrial", source: "storage", target: "industrial", value: 10 },
        ],
      },
    },
    {
      title: "웹사이트 트래픽",
      description: "사용자 트래픽 소스부터 최종 전환까지의 흐름",
      data: {
        nodes: [
          { id: "google", name: "구글", layer: 0 },
          { id: "facebook", name: "페이스북", layer: 0 },
          { id: "direct", name: "직접 방문", layer: 0 },
          { id: "homepage", name: "홈페이지", layer: 1 },
          { id: "products", name: "제품", layer: 1 },
          { id: "about", name: "소개", layer: 1 },
          { id: "signup", name: "가입", layer: 2 },
          { id: "purchase", name: "구매", layer: 2 },
          { id: "bounce", name: "이탈", layer: 2 },
        ],
        links: [
          { id: "link-google-homepage", source: "google", target: "homepage", value: 500 },
          { id: "link-facebook-homepage", source: "facebook", target: "homepage", value: 300 },
          { id: "link-direct-homepage", source: "direct", target: "homepage", value: 200 },
          { id: "link-google-products", source: "google", target: "products", value: 200 },
          { id: "link-facebook-products", source: "facebook", target: "products", value: 100 },
          { id: "link-homepage-products", source: "homepage", target: "products", value: 400 },
          { id: "link-homepage-about", source: "homepage", target: "about", value: 200 },
          { id: "link-homepage-bounce", source: "homepage", target: "bounce", value: 400 },
          { id: "link-products-purchase", source: "products", target: "purchase", value: 300 },
          { id: "link-products-signup", source: "products", target: "signup", value: 200 },
          { id: "link-products-bounce", source: "products", target: "bounce", value: 200 },
          { id: "link-about-signup", source: "about", target: "signup", value: 100 },
          { id: "link-about-bounce", source: "about", target: "bounce", value: 100 },
        ],
      },
    },
    {
      title: "제품 생산",
      description: "원자재부터 최종 제품까지의 제조 공정",
      data: {
        nodes: [
          { id: "iron", name: "철광석", layer: 0 },
          { id: "coal", name: "석탄", layer: 0 },
          { id: "steel", name: "강철", layer: 1 },
          { id: "plastic", name: "플라스틱", layer: 1 },
          { id: "parts", name: "부품", layer: 2 },
          { id: "assembly", name: "조립", layer: 3 },
          { id: "cars", name: "자동차", layer: 4 },
          { id: "electronics", name: "전자제품", layer: 4 },
        ],
        links: [
          { id: "link-iron-steel", source: "iron", target: "steel", value: 150 },
          { id: "link-coal-steel", source: "coal", target: "steel", value: 50 },
          { id: "link-steel-parts", source: "steel", target: "parts", value: 120 },
          { id: "link-plastic-parts", source: "plastic", target: "parts", value: 80 },
          { id: "link-parts-assembly", source: "parts", target: "assembly", value: 180 },
          { id: "link-assembly-cars", source: "assembly", target: "cars", value: 100 },
          { id: "link-assembly-electronics", source: "assembly", target: "electronics", value: 80 },
        ],
      },
    },
    {
      title: "예산 배분",
      description: "회사 예산이 각 부서와 프로젝트에 배분되는 과정",
      data: {
        nodes: [
          { id: "total-budget", name: "총 예산", layer: 0 },
          { id: "rd", name: "R&D", layer: 1 },
          { id: "marketing", name: "마케팅", layer: 1 },
          { id: "operations", name: "운영", layer: 1 },
          { id: "product-dev", name: "제품 개발", layer: 2 },
          { id: "research", name: "연구", layer: 2 },
          { id: "digital-ad", name: "디지털 광고", layer: 2 },
          { id: "pr", name: "홍보", layer: 2 },
          { id: "facilities", name: "시설", layer: 2 },
          { id: "hr", name: "인사", layer: 2 },
        ],
        links: [
          { id: "link-budget-rd", source: "total-budget", target: "rd", value: 400 },
          { id: "link-budget-marketing", source: "total-budget", target: "marketing", value: 300 },
          { id: "link-budget-operations", source: "total-budget", target: "operations", value: 300 },
          { id: "link-rd-product", source: "rd", target: "product-dev", value: 250 },
          { id: "link-rd-research", source: "rd", target: "research", value: 150 },
          { id: "link-marketing-digital", source: "marketing", target: "digital-ad", value: 200 },
          { id: "link-marketing-pr", source: "marketing", target: "pr", value: 100 },
          { id: "link-operations-facilities", source: "operations", target: "facilities", value: 180 },
          { id: "link-operations-hr", source: "operations", target: "hr", value: 120 },
        ],
      },
    },
    {
      title: "인구 이동",
      description: "지역 간 인구 이동 패턴",
      data: {
        nodes: [
          { id: "seoul", name: "서울", layer: 0 },
          { id: "busan", name: "부산", layer: 0 },
          { id: "daegu", name: "대구", layer: 0 },
          { id: "incheon", name: "인천", layer: 0 },
          { id: "gwangju", name: "광주", layer: 0 },
          { id: "metro", name: "수도권", layer: 1 },
          { id: "southeast", name: "동남권", layer: 1 },
          { id: "southwest", name: "서남권", layer: 1 },
          { id: "urban", name: "도심", layer: 2 },
          { id: "suburban", name: "교외", layer: 2 },
        ],
        links: [
          { id: "link-seoul-metro", source: "seoul", target: "metro", value: 200 },
          { id: "link-incheon-metro", source: "incheon", target: "metro", value: 80 },
          { id: "link-busan-southeast", source: "busan", target: "southeast", value: 120 },
          { id: "link-daegu-southeast", source: "daegu", target: "southeast", value: 60 },
          { id: "link-gwangju-southwest", source: "gwangju", target: "southwest", value: 50 },
          { id: "link-metro-urban", source: "metro", target: "urban", value: 150 },
          { id: "link-metro-suburban", source: "metro", target: "suburban", value: 130 },
          { id: "link-southeast-urban", source: "southeast", target: "urban", value: 80 },
          { id: "link-southeast-suburban", source: "southeast", target: "suburban", value: 100 },
          { id: "link-southwest-urban", source: "southwest", target: "urban", value: 20 },
          { id: "link-southwest-suburban", source: "southwest", target: "suburban", value: 30 },
        ],
      },
    },
    {
      title: "소셜 미디어 참여도",
      description: "콘텐츠 게시부터 사용자 참여까지의 흐름",
      data: {
        nodes: [
          { id: "video", name: "영상", layer: 0 },
          { id: "image", name: "이미지", layer: 0 },
          { id: "text", name: "텍스트", layer: 0 },
          { id: "views", name: "조회", layer: 1 },
          { id: "engagement", name: "참여", layer: 1 },
          { id: "likes", name: "좋아요", layer: 2 },
          { id: "shares", name: "공유", layer: 2 },
          { id: "comments", name: "댓글", layer: 2 },
          { id: "followers", name: "팔로워", layer: 2 },
        ],
        links: [
          { id: "link-video-views", source: "video", target: "views", value: 1000 },
          { id: "link-image-views", source: "image", target: "views", value: 600 },
          { id: "link-text-views", source: "text", target: "views", value: 400 },
          { id: "link-video-engagement", source: "video", target: "engagement", value: 300 },
          { id: "link-image-engagement", source: "image", target: "engagement", value: 200 },
          { id: "link-text-engagement", source: "text", target: "engagement", value: 100 },
          { id: "link-views-likes", source: "views", target: "likes", value: 800 },
          { id: "link-views-shares", source: "views", target: "shares", value: 400 },
          { id: "link-engagement-comments", source: "engagement", target: "comments", value: 300 },
          { id: "link-engagement-followers", source: "engagement", target: "followers", value: 200 },
          { id: "link-shares-followers", source: "shares", target: "followers", value: 100 },
        ],
      },
    },
    {
      title: "음식 공급망",
      description: "농장부터 소비자까지의 식품 공급 과정",
      data: {
        nodes: [
          { id: "farms", name: "농장", layer: 0 },
          { id: "fishery", name: "어업", layer: 0 },
          { id: "livestock", name: "축산", layer: 0 },
          { id: "processing", name: "가공", layer: 1 },
          { id: "wholesale", name: "도매", layer: 1 },
          { id: "retail", name: "소매", layer: 2 },
          { id: "restaurants", name: "음식점", layer: 2 },
          { id: "consumers", name: "소비자", layer: 3 },
        ],
        links: [
          { id: "link-farms-processing", source: "farms", target: "processing", value: 300 },
          { id: "link-farms-wholesale", source: "farms", target: "wholesale", value: 200 },
          { id: "link-fishery-processing", source: "fishery", target: "processing", value: 150 },
          { id: "link-fishery-wholesale", source: "fishery", target: "wholesale", value: 100 },
          { id: "link-livestock-processing", source: "livestock", target: "processing", value: 250 },
          { id: "link-livestock-wholesale", source: "livestock", target: "wholesale", value: 150 },
          { id: "link-processing-retail", source: "processing", target: "retail", value: 400 },
          { id: "link-processing-restaurants", source: "processing", target: "restaurants", value: 300 },
          { id: "link-wholesale-retail", source: "wholesale", target: "retail", value: 300 },
          { id: "link-wholesale-restaurants", source: "wholesale", target: "restaurants", value: 150 },
          { id: "link-retail-consumers", source: "retail", target: "consumers", value: 700 },
          { id: "link-restaurants-consumers", source: "restaurants", target: "consumers", value: 450 },
        ],
      },
    },
    {
      title: "대학 진학 경로",
      description: "고등학교 계열별 대학 진학 현황",
      data: {
        nodes: [
          { id: "science", name: "이과", layer: 0 },
          { id: "liberal", name: "문과", layer: 0 },
          { id: "arts", name: "예술", layer: 0 },
          { id: "vocational", name: "실업", layer: 0 },
          { id: "stem", name: "이공계", layer: 1 },
          { id: "business", name: "경영", layer: 1 },
          { id: "humanities", name: "인문", layer: 1 },
          { id: "art-major", name: "예술계", layer: 1 },
          { id: "professional", name: "전문직", layer: 2 },
          { id: "corporate", name: "기업", layer: 2 },
          { id: "creative", name: "창작", layer: 2 },
        ],
        links: [
          { id: "link-science-stem", source: "science", target: "stem", value: 400 },
          { id: "link-science-business", source: "science", target: "business", value: 100 },
          { id: "link-liberal-business", source: "liberal", target: "business", value: 200 },
          { id: "link-liberal-humanities", source: "liberal", target: "humanities", value: 250 },
          { id: "link-arts-art-major", source: "arts", target: "art-major", value: 150 },
          { id: "link-vocational-professional", source: "vocational", target: "professional", value: 100 },
          { id: "link-stem-professional", source: "stem", target: "professional", value: 200 },
          { id: "link-stem-corporate", source: "stem", target: "corporate", value: 300 },
          { id: "link-business-corporate", source: "business", target: "corporate", value: 250 },
          { id: "link-business-professional", source: "business", target: "professional", value: 50 },
          { id: "link-humanities-corporate", source: "humanities", target: "corporate", value: 150 },
          { id: "link-humanities-creative", source: "humanities", target: "creative", value: 100 },
          { id: "link-art-major-creative", source: "art-major", target: "creative", value: 120 },
          { id: "link-art-major-corporate", source: "art-major", target: "corporate", value: 30 },
        ],
      },
    },
  ];

  const handleFlowSelect = (flowId) => {
    setSelectedFlow(flowId);
  };

  const handleExampleChange = (index) => {
    setActiveExample(index);
    setSelectedFlow(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sankey 다이어그램 예시</h2>

        {/* 예시 선택 탭 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleChange(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeExample === index
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* 현재 예시 정보 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{examples[activeExample].title}</h3>
          <p className="text-gray-600 mb-4">{examples[activeExample].description}</p>

          {/* 사용 가이드 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-900 mb-2">📌 사용 방법</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 흐름을 클릭하면 연결된 전체 경로가 하이라이트됩니다</li>
              <li>• 노드나 흐름에 마우스를 올리면 상세 정보를 볼 수 있습니다</li>
              <li>• 선택된 흐름은 밝게 표시되고 나머지는 흐려집니다</li>
              <li>• 다시 클릭하면 선택을 해제할 수 있습니다</li>
            </ul>
          </div>
        </div>

        {/* Sankey 다이어그램 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <Sankey
            data={examples[activeExample].data}
            width={900}
            height={500}
            selectedFlow={selectedFlow}
            onFlowSelect={handleFlowSelect}
            highlightConnected={true}
            highlightPath={true}
            showTooltip={true}
            showValues={true}
            className="mx-auto"
          />
        </div>

        {/* 현재 선택된 흐름 정보 */}
        {selectedFlow && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">✅ 선택된 경로</h4>
            <p className="text-sm text-green-800">
              ID: <code className="bg-green-100 px-2 py-1 rounded">{selectedFlow}</code>
            </p>
            <p className="text-xs text-green-700 mt-1">연결된 전체 경로가 하이라이트되어 있습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SankeyExample;
