# 📊 ConnectorExamples 컴포넌트

화살표 연결선이 제대로 표시되는 새로운 ConnectorExamples 컴포넌트 모음입니다.

## 🎯 주요 개선사항

### ✅ 화살표 표시 수정

- 모든 Connector 컴포넌트에 `showArrow={true}` 명시적 설정
- 화살표가 제대로 표시되지 않던 문제 해결
- 실시간 미리보기에서 화살표 정상 동작 확인

### 🚀 새로운 방식 적용

- DiagramProvider를 통한 자동 박스 감지
- fromBox, toBox 방식으로 단순화된 연결
- boxes prop 제거로 더 직관적인 사용법

## 📁 파일 구조

```
src/components/ConnectorExamples/
├── index.js                  # 메인 export 파일
├── IntroductionSection.jsx   # 소개 및 가이드 섹션
├── UsageGuide.jsx           # 실시간 코드 편집기
├── CodeEditor.jsx           # 코드 에디터 컴포넌트
├── LivePreview.jsx          # 실시간 미리보기
├── PositionExample.jsx      # 위치별 연결 예제
├── SystemExample.jsx        # 복잡한 시스템 예제
├── GridExampleCard.jsx      # 그리드 예제 카드
└── README.md               # 이 파일
```

## 🔧 주요 컴포넌트

### 1. IntroductionSection

- 컴포넌트 소개 및 주요 기능 설명
- 새로운 방식에 대한 안내
- 기본 사용법 코드 예제

### 2. UsageGuide

- 실시간 코드 편집 및 미리보기
- JSX 코드 파싱 기능
- 다양한 템플릿 제공

### 3. PositionExample

- 박스의 4방향(top, right, bottom, left) 연결 예제
- 각 방향별 색상 구분
- 화살표 표시 확인

### 4. SystemExample

- 복잡한 데이터 플로우 다이어그램
- 피드백 루프 포함
- 다양한 연결 타입 사용

## 💡 화살표 표시 가이드

### 기본 사용법

```jsx
<Connector
  fromBox={{ id: "start", position: "right" }}
  toBox={{ id: "end", position: "left" }}
  connectionType="straight"
  showArrow={true} // 화살표 표시
  strokeWidth={2} // 선 두께
  className="text-blue-600"
/>
```

### 중요 포인트

- `showArrow={true}` 반드시 명시
- `connectionType`: "straight", "orthogonal", "curved", "auto"
- `className`으로 색상 및 스타일 제어
- `strokeWidth`로 선 두께 조절

## 🎨 스타일링

### 색상 클래스

- `text-blue-600`: 파란색 연결선
- `text-red-500`: 빨간색 연결선
- `text-green-600`: 초록색 연결선
- `text-purple-600`: 보라색 연결선

### 애니메이션

```jsx
<Connector
  // ... 기본 props
  animated={true}
  className="text-teal-500"
/>
```

### 점선 스타일

```jsx
<Connector
  // ... 기본 props
  dashArray="4,4"
  className="text-pink-600"
/>
```

## 🔍 디버깅 팁

1. **화살표가 보이지 않는 경우**

   - `showArrow={true}` 확인
   - fromBox, toBox id가 실제 Box와 일치하는지 확인
   - DiagramProvider로 감싸져 있는지 확인

2. **연결선이 나타나지 않는 경우**

   - Box 컴포넌트의 id가 unique한지 확인
   - position 값이 올바른지 확인 (top, right, bottom, left)

3. **스타일이 적용되지 않는 경우**
   - className이 올바른 Tailwind 클래스인지 확인
   - strokeWidth가 숫자 형태인지 확인

## 🚀 사용 예제

```jsx
import { IntroductionSection, UsageGuide, PositionExample, SystemExample } from "./components/ConnectorExamples";

function App() {
  return (
    <div>
      <IntroductionSection />
      <UsageGuide />
      <PositionExample />
      <SystemExample />
    </div>
  );
}
```
