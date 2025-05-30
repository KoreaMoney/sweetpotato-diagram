# 🔗 HY-Diagram - 현대자동차 다이어그램 컴포넌트 라이브러리

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-brightgreen.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.15-blue.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

회로도 및 시스템 다이어그램 설계를 위한 재사용 가능한 React 컴포넌트 라이브러리입니다.

## ✨ 주요 기능

- 🎯 **드래그 앤 드롭**: 직관적인 컴포넌트 배치
- 🔗 **양방향 연결**: 스마트한 Connector 시스템
- 🎨 **커스터마이징**: 완전히 사용자 정의 가능한 스타일링
- ⚡ **고성능**: React 19 + Vite 6 + SWC로 최적화
- 📱 **반응형**: 모든 화면 크기에서 완벽 동작
- 🔧 **TypeScript**: 완전한 타입 안전성

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18+
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 저장소 클론
git clone [repository-url]
cd hy-diagram

# 의존성 설치 (pnpm 권장)
pnpm install
# 또는
npm install

# 개발 서버 실행
pnpm dev
# 또는
npm run dev

# 빌드
pnpm build
# 또는
npm run build
```

브라우저에서 `http://localhost:5174/`로 접속하여 라이브 데모를 확인하세요.

## 🛠️ 기술 스택

- **Frontend**: React 19.0.0 with JSX
- **Build Tool**: Vite 6.2.0 with SWC
- **Styling**: TailwindCSS 4.0.15
- **Icons**: Lucide React 0.511.0
- **Linting**: ESLint 9.21.0
- **Package Manager**: pnpm

## 📦 컴포넌트 라이브러리

### 🏗️ 기본 컴포넌트

#### 1. Box - 기본 박스 컴포넌트

시스템의 각 구성요소를 나타내는 박스 컴포넌트입니다.

```jsx
import { Box } from "@/components/DiagramComponents";

<Box
  id="hydrogen-tank"
  x={100}
  y={50}
  width={120}
  height={60}
  text="수소탱크"
  backgroundColor="#3B82F6"
  textColor="#FFFFFF"
  borderColor="#1E40AF"
  borderWidth={2}
  borderRadius={8}
  fontSize={14}
  onClick={(event, boxInfo) => console.log("클릭됨", boxInfo)}
/>;
```

#### 2. DraggableBox - 드래그 가능한 박스

드래그 앤 드롭 기능이 내장된 박스 컴포넌트입니다.

```jsx
import { DraggableBox } from "@/components/DiagramComponents";

<DraggableBox
  id="draggable-component"
  initialX={100}
  initialY={100}
  text="드래그 가능한 박스"
  onPositionChange={(newX, newY) => console.log(`새 위치: ${newX}, ${newY}`)}
/>;
```

#### 3. ImageBox - 이미지 박스

이미지를 포함할 수 있는 박스 컴포넌트입니다.

```jsx
import { ImageBox } from "@/components/DiagramComponents";

<ImageBox
  id="image-component"
  x={200}
  y={100}
  imageUrl="/path/to/image.png"
  text="이미지 박스"
  width={150}
  height={100}
/>;
```

### 🔗 연결 컴포넌트

#### 4. Connector - 양방향 스마트 연결선

컴포넌트들을 연결하는 지능형 연결선입니다.

```jsx
import { Connector } from "@/components/DiagramComponents";

<Connector
  fromElementId="source-box"
  toElementId="target-box"
  strokeColor="#10B981"
  strokeWidth={3}
  bidirectional={true}
  animated={true}
/>;
```

#### 5. Arrow - 화살표 컴포넌트

방향성을 나타내는 화살표 컴포넌트입니다.

```jsx
import { Arrow } from "@/components/DiagramComponents";

<Arrow startX={100} startY={100} endX={200} endY={150} color="#EF4444" strokeWidth={2} arrowSize={10} />;
```

#### 6. Line - 기본 선

단순한 연결선 컴포넌트입니다.

```jsx
import { Line } from "@/components/DiagramComponents";

<Line startX={0} startY={0} endX={100} endY={100} strokeColor="#6B7280" strokeWidth={2} />;
```

### 🔧 특수 컴포넌트

#### 7. Valve - 밸브 컴포넌트

시스템의 밸브를 나타내는 전문 컴포넌트입니다.

```jsx
import { Valve } from "@/components/DiagramComponents";

<Valve
  id="main-valve"
  x={300}
  y={200}
  size={40}
  isOpen={true}
  onToggle={(isOpen) => console.log(`밸브 상태: ${isOpen ? "열림" : "닫힘"}`)}
/>;
```

#### 8. Triangle - 삼각형 컴포넌트

방향성이나 특수 표시를 위한 삼각형 컴포넌트입니다.

```jsx
import { Triangle } from "@/components/DiagramComponents";

<Triangle x={150} y={75} size={30} direction="up" fillColor="#F59E0B" borderColor="#D97706" />;
```

### 🎛️ 유틸리티 컴포넌트

#### 9. CodeEditor - 실시간 코드 편집기

컴포넌트 설정을 실시간으로 편집할 수 있는 코드 에디터입니다.

```jsx
import { CodeEditor } from "@/components/DiagramComponents";

<CodeEditor
  initialCode={`<Box x={100} y={100} text="샘플 박스" />`}
  onCodeChange={(newCode) => console.log("코드 변경:", newCode)}
/>;
```

#### 10. DiagramContext - 상태 관리

다이어그램 전체의 상태를 관리하는 Context Provider입니다.

```jsx
import { DiagramProvider, useDiagram } from "@/components/DiagramComponents";

function App() {
  return (
    <DiagramProvider>
      <YourDiagramComponents />
    </DiagramProvider>
  );
}

function YourComponent() {
  const { state, dispatch } = useDiagram();
  // 상태 사용
}
```

## 🎨 스타일링 가이드

모든 컴포넌트는 TailwindCSS 4.0을 사용하여 스타일링되며, 완전히 커스터마이징 가능합니다:

```jsx
// 커스텀 스타일 적용 예시
<Box
  className="hover:shadow-lg transition-all duration-300"
  backgroundColor="#8B5CF6"
  borderColor="#7C3AED"
  // ... 기타 props
/>
```

## 📊 사용 예시

### 기본 수소 연료전지 시스템 다이어그램

```jsx
import React from "react";
import { Box, Connector, Valve, DiagramProvider } from "@/components/DiagramComponents";

function HydrogenSystem() {
  return (
    <DiagramProvider>
      <div className="w-full h-screen bg-gray-50 relative">
        {/* 수소탱크 */}
        <Box id="hydrogen-tank" x={50} y={100} text="수소탱크" backgroundColor="#3B82F6" />

        {/* 연료전지 스택 */}
        <Box id="fuel-cell" x={300} y={100} text="연료전지 스택" backgroundColor="#10B981" />

        {/* 제어 밸브 */}
        <Valve id="control-valve" x={175} y={125} isOpen={true} />

        {/* 연결선들 */}
        <Connector fromElementId="hydrogen-tank" toElementId="control-valve" strokeColor="#3B82F6" />

        <Connector fromElementId="control-valve" toElementId="fuel-cell" strokeColor="#10B981" />
      </div>
    </DiagramProvider>
  );
}
```

## 🔗 데모 및 예시

개발 서버를 실행하면 다음과 같은 데모들을 확인할 수 있습니다:

- **기본 컴포넌트 갤러리**: 모든 컴포넌트의 기본 사용법
- **인터랙티브 편집기**: 실시간으로 컴포넌트 설정 변경
- **양방향 연결 테스트**: Connector의 고급 기능들
- **드래그 앤 드롭 데모**: DraggableBox 활용 예시
- **복합 시스템 예시**: 실제 사용 케이스 시나리오

## 📁 프로젝트 구조

```
hy-diagram/
├── src/
│   ├── components/
│   │   ├── DiagramComponents/     # 모든 다이어그램 컴포넌트
│   │   │   ├── Box.jsx
│   │   │   ├── DraggableBox.jsx
│   │   │   ├── Connector.jsx
│   │   │   ├── Arrow.jsx
│   │   │   ├── Line.jsx
│   │   │   ├── Valve.jsx
│   │   │   ├── Triangle.jsx
│   │   │   ├── ImageBox.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── DiagramContext.jsx
│   │   │   └── index.js
│   │   └── documentation/         # 문서화 컴포넌트
│   ├── hooks/                     # 커스텀 훅들
│   ├── utils/                     # 유틸리티 함수들
│   ├── constants/                 # 상수 정의
│   └── data/                      # 테스트 데이터
├── docs/                          # 상세 API 문서
├── public/                        # 정적 자산들
└── package.json
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔗 관련 문서

- [📚 상세 API 문서](./docs/API.md)
- [🔗 Connector 양방향 업데이트 가이드](./CONNECTOR_BIDIRECTIONAL_UPDATE.md)
- [➡️ Arrow 개선사항](./ARROW_IMPROVEMENTS.md)

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.

---

**Made with ❤️ by SweetPotato Team**
