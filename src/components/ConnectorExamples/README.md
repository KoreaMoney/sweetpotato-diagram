# 📊 ConnectorExamples 컴포넌트

화살표 연결선이 제대로 표시되는 새로운 ConnectorExamples 컴포넌트 모음입니다.

## 🎯 주요 개선사항

### ✅ 화살표 표시 수정

- 모든 Connector 컴포넌트에 `showArrow={true}` 명시적 설정
- 화살표가 제대로 표시되지 않던 문제 해결
- 실시간 미리보기에서 화살표 정상 동작 확인

### 🔧 bendPoints 유지 개선 (NEW!)

- **문제 해결**: Connector 속성 하나만 수정해도 bendPoints가 사라지던 문제 수정
- **Run 버튼 문제 해결**: 실행 시 bendPoints가 기본값으로 초기화되던 문제 수정
- **안전한 처리**: bendPoints가 undefined인 경우 그대로 유지 (빈 배열로 강제 변환 안 함)
- **자동 Fallback**: `connectionType="custom"`인데 bendPoints가 없으면 `straight`로 자동 전환
- **개발자 경고**: 콘솔에 경고 메시지 표시로 디버깅 지원
- **기존 값 유지**: 기존 bendPoints 값이 있으면 속성 변경 시에도 유지
- **파싱 개선**: JSX 파싱 시 bendPoints가 없으면 undefined로 유지

### 🚀 새로운 방식 적용

- DiagramProvider를 통한 자동 박스 감지
- fromBox, toBox 방식으로 단순화된 연결
- boxes prop 제거로 더 직관적인 사용법

### ✨ 새로운 기능 추가

- **`connectionType="custom"`**: 사용자 정의 경로 지원
- **`bendPoints`**: 중간 꺾임점을 통한 복잡한 경로 생성
- **`arrowDirection="both"`**: 양방향 화살표 지원
- **계단식(stepped)** 연결 타입 추가
- **다양한 화살표 모양**: triangle, diamond, circle, square

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
- JSX 코드 파싱 기능 (bendPoints 포함)
- 다양한 템플릿 제공
- custom 연결 타입 기본 예제 포함

### 3. PositionExample

- 박스의 4방향(top, right, bottom, left) 연결 예제
- 각 방향별 색상 구분
- 화살표 표시 확인

### 4. SystemExample

- 복잡한 데이터 플로우 다이어그램
- 피드백 루프 포함
- 다양한 연결 타입 사용

### 5. GridExampleCard

- 9가지 연결 타입 예제 (새로 추가됨)
- custom 연결과 bendPoints 시연
- 계단식 연결 및 양방향 화살표 예제

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

### 🆕 사용자 정의 경로 (Custom Path)

```jsx
<Connector
  fromBox={{ id: "start", position: "right" }}
  toBox={{ id: "end", position: "left" }}
  connectionType="custom"
  bendPoints={[
    { x: 130, y: 65 }, // 첫 번째 꺾임점
    { x: 130, y: 30 }, // 위로 올라가기
    { x: 250, y: 30 }, // 장애물 위로 지나가기
    { x: 250, y: 165 }, // 아래로 내려가기
  ]}
  showArrow={true}
  strokeWidth={2}
  className="text-indigo-500"
/>
```

### 🆕 양방향 화살표

```jsx
<Connector
  fromBox={{ id: "boxA", position: "right" }}
  toBox={{ id: "boxB", position: "left" }}
  connectionType="curved"
  arrowDirection="both" // 양방향 화살표
  arrowSize={12}
  className="text-amber-500"
  strokeWidth={2}
/>
```

### 연결 타입 종류

- **`straight`**: 직선 연결 (기본값)
- **`curved`**: 곡선 연결 (베지어 곡선)
- **`orthogonal`**: 직각 연결 (ㄱ자 모양)
- **`stepped`**: 계단식 연결
- **`custom`**: 사용자 정의 경로 (bendPoints 사용)
- **`auto`**: 박스 위치에 따라 자동 선택

### 화살표 방향 옵션

- **`forward`**: 끝점에만 화살표 (기본값)
- **`backward`**: 시작점에만 화살표
- **`both`**: 양방향 화살표
- **`none`**: 화살표 없음

### 중요 포인트

- `showArrow={true}` 반드시 명시
- `bendPoints`는 `connectionType="custom"`일 때만 사용
- **NEW!** `connectionType="custom"`인데 `bendPoints`가 없으면 자동으로 `straight` 타입으로 fallback
- **NEW!** 콘솔에서 경고 메시지 확인 가능: "⚠️ connectionType='custom'이지만 bendPoints가 정의되지 않았습니다"
- `arrowDirection`으로 화살표 방향 제어 가능
- `className`으로 색상 및 스타일 제어
- `strokeWidth`로 선 두께 조절

## 🎨 스타일링

### 색상 클래스

- `text-blue-600`: 파란색 연결선
- `text-red-500`: 빨간색 연결선
- `text-green-600`: 초록색 연결선
- `text-purple-600`: 보라색 연결선
- `text-indigo-500`: 인디고색 연결선 (custom 예제)
- `text-amber-500`: 앰버색 연결선 (양방향 화살표)

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

3. **custom 경로가 작동하지 않는 경우**

   - `connectionType="custom"` 확인
   - `bendPoints` 배열 형식이 올바른지 확인: `[{ x: number, y: number }]`
   - bendPoints의 좌표값이 숫자인지 확인
   - **NEW!** 콘솔에서 bendPoints 파싱 로그 확인: "✅ bendPoints 파싱 성공"

4. **Multiple Connections 예제에서 경고가 나는 경우**

   - 메타데이터의 JSX 코드에서 bendPoints 파싱 문제일 수 있음
   - 브라우저 콘솔에서 "⚠️ connectionType='custom'이지만 bendPoints가 정의되지 않았습니다" 메시지 확인
   - 실제 컴포넌트에서는 bendPoints가 정의되어 있으나 JSX 파싱 과정에서 문제가 생길 수 있음

5. **스타일이 적용되지 않는 경우**
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
