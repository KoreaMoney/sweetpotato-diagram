// 기본 샘플 데이터
export const sampleData = {
  nodes: [
    { id: "A", name: "소스 A", layer: 0 },
    { id: "B", name: "소스 B", layer: 0 },
    { id: "C", name: "중간", layer: 1 },
    { id: "D", name: "목적지", layer: 2 },
  ],
  links: [
    { id: "link-A-C", source: "A", target: "C", value: 10 },
    { id: "link-B-C", source: "B", target: "C", value: 5 },
    { id: "link-C-D", source: "C", target: "D", value: 15 },
  ],
};

// 기업 매출 흐름 데이터
export const revenueFlowData = {
  nodes: [
    // 제품군 (Layer 0)
    { id: "mobile", name: "모바일", layer: 0 },
    { id: "web", name: "웹서비스", layer: 0 },
    { id: "ai", name: "AI솔루션", layer: 0 },
    // 지역 (Layer 1)
    { id: "korea", name: "한국", layer: 1 },
    { id: "usa", name: "미국", layer: 1 },
    { id: "europe", name: "유럽", layer: 1 },
    // 채널 (Layer 2)
    { id: "direct", name: "직접판매", layer: 2 },
    { id: "partner", name: "파트너", layer: 2 },
    { id: "online", name: "온라인", layer: 2 },
  ],
  links: [
    // 제품 → 지역
    { id: "mobile-korea", source: "mobile", target: "korea", value: 150 },
    { id: "mobile-usa", source: "mobile", target: "usa", value: 200 },
    { id: "web-korea", source: "web", target: "korea", value: 100 },
    { id: "web-europe", source: "web", target: "europe", value: 80 },
    { id: "ai-usa", source: "ai", target: "usa", value: 120 },
    // 지역 → 채널
    { id: "korea-direct", source: "korea", target: "direct", value: 100 },
    { id: "korea-online", source: "korea", target: "online", value: 150 },
    { id: "usa-partner", source: "usa", target: "partner", value: 200 },
    { id: "usa-direct", source: "usa", target: "direct", value: 120 },
    { id: "europe-online", source: "europe", target: "online", value: 80 },
  ],
};

// 대학 입학 과정 데이터
export const admissionData = {
  nodes: [
    { id: "applicants", name: "지원자", layer: 0 },
    { id: "document_pass", name: "서류통과", layer: 1 },
    { id: "document_fail", name: "서류탈락", layer: 1 },
    { id: "interview_pass", name: "면접통과", layer: 2 },
    { id: "interview_fail", name: "면접탈락", layer: 2 },
    { id: "final_accept", name: "최종합격", layer: 3 },
    { id: "waitlist", name: "대기자", layer: 3 },
  ],
  links: [
    { id: "app-doc-pass", source: "applicants", target: "document_pass", value: 300 },
    { id: "app-doc-fail", source: "applicants", target: "document_fail", value: 700 },
    { id: "doc-int-pass", source: "document_pass", target: "interview_pass", value: 150 },
    { id: "doc-int-fail", source: "document_pass", target: "interview_fail", value: 150 },
    { id: "int-final", source: "interview_pass", target: "final_accept", value: 100 },
    { id: "int-wait", source: "interview_pass", target: "waitlist", value: 50 },
  ],
};

// 소프트웨어 개발 파이프라인 데이터
export const pipelineData = {
  nodes: [
    { id: "commits", name: "코드 커밋", layer: 0 },
    { id: "build_success", name: "빌드 성공", layer: 1 },
    { id: "build_fail", name: "빌드 실패", layer: 1 },
    { id: "test_pass", name: "테스트 통과", layer: 2 },
    { id: "test_fail", name: "테스트 실패", layer: 2 },
    { id: "staging", name: "스테이징", layer: 3 },
    { id: "production", name: "프로덕션", layer: 4 },
    { id: "rollback", name: "롤백", layer: 4 },
  ],
  links: [
    { id: "commit-build-ok", source: "commits", target: "build_success", value: 85 },
    { id: "commit-build-fail", source: "commits", target: "build_fail", value: 15 },
    { id: "build-test-ok", source: "build_success", target: "test_pass", value: 75 },
    { id: "build-test-fail", source: "build_success", target: "test_fail", value: 10 },
    { id: "test-staging", source: "test_pass", target: "staging", value: 75 },
    { id: "staging-prod", source: "staging", target: "production", value: 70 },
    { id: "staging-rollback", source: "staging", target: "rollback", value: 5 },
  ],
};

// 고객 여정 분석 데이터
export const customerJourneyData = {
  nodes: [
    { id: "visitors", name: "방문자", layer: 0 },
    { id: "browse", name: "둘러보기", layer: 1 },
    { id: "bounce", name: "이탈", layer: 1 },
    { id: "cart", name: "장바구니", layer: 2 },
    { id: "abandon", name: "포기", layer: 2 },
    { id: "purchase", name: "구매", layer: 3 },
    { id: "repeat", name: "재구매", layer: 4 },
    { id: "churn", name: "이탈", layer: 4 },
  ],
  links: [
    { id: "visitors-browse", source: "visitors", target: "browse", value: 400 },
    { id: "visitors-bounce", source: "visitors", target: "bounce", value: 600 },
    { id: "browse-cart", source: "browse", target: "cart", value: 120 },
    { id: "browse-abandon", source: "browse", target: "abandon", value: 280 },
    { id: "cart-purchase", source: "cart", target: "purchase", value: 80 },
    { id: "purchase-repeat", source: "purchase", target: "repeat", value: 30 },
    { id: "purchase-churn", source: "purchase", target: "churn", value: 50 },
  ],
};

// 에너지 시스템 데이터
export const energySystemData = {
  nodes: [
    { id: "solar", name: "태양광", layer: 0 },
    { id: "wind", name: "풍력", layer: 0 },
    { id: "coal", name: "석탄", layer: 0 },
    { id: "nuclear", name: "원자력", layer: 0 },
    { id: "grid_main", name: "주 전력망", layer: 1 },
    { id: "grid_sub", name: "보조 전력망", layer: 1 },
    { id: "distribution", name: "배전망", layer: 2 },
    { id: "residential", name: "가정용", layer: 3 },
    { id: "industrial", name: "산업용", layer: 3 },
    { id: "commercial", name: "상업용", layer: 3 },
  ],
  links: [
    { id: "solar-grid", source: "solar", target: "grid_main", value: 180 },
    { id: "wind-grid", source: "wind", target: "grid_main", value: 120 },
    { id: "coal-grid", source: "coal", target: "grid_sub", value: 200 },
    { id: "nuclear-grid", source: "nuclear", target: "grid_main", value: 250 },
    { id: "grid-main-dist", source: "grid_main", target: "distribution", value: 550 },
    { id: "grid-sub-dist", source: "grid_sub", target: "distribution", value: 200 },
    { id: "dist-residential", source: "distribution", target: "residential", value: 200 },
    { id: "dist-industrial", source: "distribution", target: "industrial", value: 350 },
    { id: "dist-commercial", source: "distribution", target: "commercial", value: 200 },
  ],
};
