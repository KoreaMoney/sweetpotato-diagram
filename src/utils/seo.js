/**
 * SEO 최적화를 위한 헬퍼 함수들
 */

// 페이지별 SEO 메타데이터 설정
const seoConfig = {
  home: {
    title: "Sweet Diagram - Modern React Diagram Editor",
    description:
      "A modern and intuitive diagram editor component for React applications with auto-connect features, vertical text support, and animation effects",
    keywords:
      "react,diagram,editor,visualization,sweet-diagram,javascript,auto-connect,animation,vertical-text,drag-drop",
    path: "/",
  },
  components: {
    title: "Components - Sweet Diagram",
    description:
      "Explore comprehensive React diagram components including boxes, arrows, connectors, and more with interactive examples",
    keywords: "react components,diagram components,box,arrow,connector,draggable,interactive",
    path: "/components",
  },
  documentation: {
    title: "Documentation - Sweet Diagram",
    description: "Complete API documentation and usage guide for Sweet Diagram React components with code examples",
    keywords: "documentation,api,usage guide,react documentation,diagram api",
    path: "/documentation",
  },
  examples: {
    title: "Examples - Sweet Diagram",
    description: "Interactive examples and demos showcasing Sweet Diagram capabilities with live code preview",
    keywords: "examples,demos,interactive examples,live preview,code examples",
    path: "/examples",
  },
  hooks: {
    title: "Hooks - Sweet Diagram",
    description: "Custom React hooks for diagram interactions, auto-connect features, and advanced functionality",
    keywords: "react hooks,custom hooks,diagram hooks,auto-connect,interactions",
    path: "/hooks",
  },
};

/**
 * 동적으로 페이지 메타 데이터를 설정합니다
 * @param {string} pageKey - 페이지 키 (home, components, documentation, examples, hooks)
 * @param {Object} customMeta - 커스텀 메타데이터 (선택사항)
 */
export const setPageMeta = (pageKey, customMeta = {}) => {
  const config = seoConfig[pageKey] || seoConfig.home;
  const meta = { ...config, ...customMeta };

  // 페이지 제목 설정
  document.title = meta.title;

  // 메타 태그 업데이트
  updateMetaTag("description", meta.description);
  updateMetaTag("keywords", meta.keywords);

  // Open Graph 태그 업데이트
  updateMetaTag("og:title", meta.title, "property");
  updateMetaTag("og:description", meta.description, "property");
  updateMetaTag("og:url", `https://sweetpotato-diagram.vercel.app${meta.path}`, "property");

  // Twitter Card 태그 업데이트
  updateMetaTag("twitter:title", meta.title);
  updateMetaTag("twitter:description", meta.description);

  // Canonical URL 업데이트
  updateCanonicalUrl(`https://sweetpotato-diagram.vercel.app${meta.path}`);
};

/**
 * 메타 태그를 업데이트합니다
 * @param {string} name - 메타 태그 이름
 * @param {string} content - 메타 태그 내용
 * @param {string} attribute - 속성 타입 (name 또는 property)
 */
const updateMetaTag = (name, content, attribute = "name") => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
};

/**
 * Canonical URL을 업데이트합니다
 * @param {string} url - Canonical URL
 */
const updateCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
};

/**
 * 구조화된 데이터를 동적으로 추가합니다
 * @param {Object} data - JSON-LD 데이터
 */
export const addStructuredData = (data) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * 페이지 성능 메트릭을 위한 Web Vitals 추적
 * 현재는 비활성화됨 - web-vitals 패키지가 필요할 때 활성화
 */
export const trackWebVitals = () => {
  // Web Vitals 추적은 현재 비활성화됨
  // 필요시 web-vitals 패키지를 설치한 후 활성화
  if (import.meta.env.DEV) {
    console.info("Web Vitals tracking is disabled");
  }
};

/**
 * 소셜 미디어 공유를 위한 메타 태그 생성
 * @param {Object} shareData - 공유 데이터
 */
export const generateShareMeta = (shareData) => {
  const { title, description, image, url } = shareData;

  return {
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:url": url,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:url": url,
  };
};

export default {
  setPageMeta,
  addStructuredData,
  trackWebVitals,
  generateShareMeta,
  seoConfig,
};
