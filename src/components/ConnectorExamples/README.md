# ConnectorExamples 컴포넌트 구조

이 폴더는 `ConnectorExamples` 컴포넌트를 효율적이고 유지보수가 쉽도록 분할한 구조입니다.

## 📁 폴더 구조

```
src/
├── components/
│   └── ConnectorExamples/
│       ├── IntroductionSection.jsx    # 박스 연결 방식 소개
│       ├── PositionExample.jsx        # 박스 연결 위치 예제
│       ├── GridExampleCard.jsx        # 그리드 예제 카드 (재사용 가능)
│       ├── SystemExample.jsx          # 복잡한 시스템 예제
│       ├── CodeEditor.jsx             # 코드 에디터 컴포넌트
│       ├── LivePreview.jsx            # 실시간 미리보기
│       ├── UsageGuide.jsx             # 사용법 안내
│       ├── index.js                   # 컴포넌트 export 관리
│       └── README.md                  # 이 파일
├── data/
│   └── connectorExampleData.js        # 예제 데이터 및 상수
├── utils/
│   └── jsxParser.js                   # JSX 파싱 유틸리티
└── hooks/
    └── useJSXParser.js                # JSX 파싱 커스텀 훅
```

## 🔧 컴포넌트 설명

### 1. IntroductionSection.jsx

- **목적**: 박스 연결 방식에 대한 소개 섹션
- **특징**: 정적 컴포넌트, 재사용 가능
- **의존성**: 없음

### 2. PositionExample.jsx

- **목적**: 박스의 다양한 연결 위치를 보여주는 예제
- **특징**: 중앙 박스와 4방향 박스들의 연결 시연
- **의존성**: `positionExampleBoxes` 데이터

### 3. GridExampleCard.jsx

- **목적**: 그리드 레이아웃에서 사용되는 재사용 가능한 예제 카드
- **Props**:
  - `example`: 예제 데이터 객체 (title, boxes, connector, description)
- **특징**: 완전히 재사용 가능한 컴포넌트

### 4. SystemExample.jsx

- **목적**: 복잡한 시스템의 연결 관계를 보여주는 예제
- **특징**: 메인 플로우, 제어 연결, 피드백 루프 포함
- **의존성**: `systemExampleBoxes` 데이터

### 5. CodeEditor.jsx

- **목적**: 사용자가 JSX 코드를 편집할 수 있는 에디터
- **Props**:
  - `editableCode`: 현재 편집 중인 코드
  - `onCodeChange`: 코드 변경 핸들러
- **특징**: 빠른 예제 템플릿 버튼 포함

### 6. LivePreview.jsx

- **목적**: 편집된 JSX 코드의 실시간 미리보기
- **Props**:
  - `parsedComponents`: 파싱된 컴포넌트 데이터
- **특징**: 안전성 검사 포함, 에러 처리

### 7. UsageGuide.jsx

- **목적**: 박스 연결 방식 사용법 안내
- **특징**: 정적 가이드 컴포넌트
- **의존성**: 없음

## 📊 데이터 구조

### connectorExampleData.js

```javascript
// 박스 연결 위치 예제 데이터
export const positionExampleBoxes = [...]

// 복잡한 시스템 예제 데이터
export const systemExampleBoxes = [...]

// 코드 템플릿들
export const codeTemplates = {
  boxStraight: "...",
  boxOrthogonal: "...",
  // ...
}

// 그리드 예제 데이터
export const gridExamples = [...]
```

## 🛠 유틸리티 및 훅

### jsxParser.js

- **extractProp**: JSX 문자열에서 속성 값 추출
- **parseBoxComponents**: Box 컴포넌트들 파싱
- **parseConnectorComponents**: Connector 컴포넌트들 파싱
- **parseJSXComponents**: 메인 파싱 함수

### useJSXParser.js

- **목적**: JSX 파싱 로직을 캡슐화한 커스텀 훅
- **반환값**:
  - `editableCode`: 편집 가능한 코드 상태
  - `parsedComponents`: 파싱된 컴포넌트들
  - `handleCodeChange`: 코드 변경 핸들러

## 🎯 설계 원칙

### 1. 단일 책임 원칙 (SRP)

- 각 컴포넌트는 하나의 명확한 책임을 가짐
- 데이터, 로직, UI가 적절히 분리됨

### 2. 개방-폐쇄 원칙 (OCP)

- 새로운 예제 추가 시 기존 코드 수정 없이 확장 가능
- `GridExampleCard`는 다양한 예제 데이터를 받을 수 있음

### 3. 의존성 역전 원칙 (DIP)

- 컴포넌트들은 구체적인 구현이 아닌 추상화에 의존
- Props를 통한 의존성 주입

### 4. 재사용성

- `GridExampleCard`는 완전히 재사용 가능
- 데이터와 로직이 분리되어 있어 다른 프로젝트에서도 활용 가능

### 5. 유지보수성

- 각 컴포넌트가 작고 집중적
- 명확한 파일 구조와 네이밍
- 타입 안전성을 위한 props 검증

## 🚀 사용법

```javascript
// 메인 컴포넌트에서 사용
import ConnectorExamples from './components/ConnectorExamples';

// 개별 컴포넌트 사용
import { GridExampleCard, CodeEditor } from './components/ConnectorExamples';

// 새로운 예제 추가
const newExample = {
  id: 'new-example',
  title: '새로운 예제',
  boxes: [...],
  connector: {...},
  description: '설명'
};

<GridExampleCard example={newExample} />
```

## 🔄 확장 방법

1. **새로운 예제 추가**: `gridExamples` 배열에 데이터 추가
2. **새로운 템플릿 추가**: `codeTemplates` 객체에 템플릿 추가
3. **새로운 섹션 추가**: 새 컴포넌트 생성 후 `index.js`에 export 추가

이 구조는 코드의 가독성, 유지보수성, 확장성을 크게 향상시키며, 각 부분을 독립적으로 테스트하고 개발할 수 있게 합니다.
