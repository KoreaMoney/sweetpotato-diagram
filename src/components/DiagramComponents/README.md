# 다이어그램 컴포넌트 라이브러리

현대자동차 수소연료전지 시스템과 같은 복잡한 다이어그램을 쉽게 구성할 수 있는 React 컴포넌트 라이브러리입니다.

## 컴포넌트 목록

### 1. Box - 네모박스

기본적인 사각형 박스 컴포넌트입니다.

```jsx
import { Box } from "./DiagramComponents";

<Box
  x={100}
  y={100}
  width={120}
  height={60}
  text="연료전지 스택"
  backgroundColor="#DBEAFE"
  borderColor="#3B82F6"
  onClick={(event, data) => console.log("클릭됨:", data)}
/>;
```

**Props:**

- `x, y`: 위치 좌표
- `width, height`: 크기
- `text`: 표시할 텍스트
- `backgroundColor`: 배경색
- `borderColor`: 테두리 색상
- `onClick`: 클릭 이벤트 핸들러

### 2. ImageBox - 이미지박스

아이콘이나 이미지를 포함할 수 있는 박스 컴포넌트입니다.

```jsx
import { ImageBox } from "./DiagramComponents";

const hydrogenIcon = `<svg>...</svg>`;

<ImageBox
  x={50}
  y={150}
  width={100}
  height={80}
  text="수소 탱크"
  icon={hydrogenIcon}
  iconType="svg"
  backgroundColor="#E0F2FE"
  borderColor="#0284C7"
/>;
```

**Props:**

- `icon`: SVG 문자열, 이미지 URL, 또는 이모지
- `iconType`: 'svg', 'image', 'emoji'
- 기타 Box와 동일한 props

### 3. Triangle - 삼각형

방향 표시나 밸브 표시용 삼각형 컴포넌트입니다.

```jsx
import { Triangle } from "./DiagramComponents";

<Triangle x={320} y={140} direction="right" size={30} fillColor="#10B981" strokeColor="#059669" />;
```

**Props:**

- `direction`: 'up', 'down', 'left', 'right'
- `size`: 삼각형 크기
- `fillColor`: 채우기 색상
- `strokeColor`: 테두리 색상

### 4. Valve - 밸브

다양한 타입의 밸브를 표현하는 컴포넌트입니다.

```jsx
import { Valve } from "./DiagramComponents";

<Valve x={170} y={175} type="gate" size={40} isOpen={true} fillColor="#F59E0B" strokeColor="#D97706" />;
```

**Props:**

- `type`: 'gate', 'ball', 'check', 'butterfly', 'needle'
- `isOpen`: 밸브 열림/닫힘 상태
- `size`: 밸브 크기

### 5. Arrow - 화살표

방향성이 있는 화살표 선 컴포넌트입니다.

```jsx
import { Arrow } from "./DiagramComponents";

<Arrow
  startPoint={{ x: 0, y: 0 }}
  endPoint={{ x: 100, y: 0 }}
  direction="right"
  length={100}
  color="#3B82F6"
  strokeWidth={2}
/>;
```

**Props:**

- `direction`: 'right', 'left', 'up', 'down', 'up-right', 등
- `startPoint, endPoint`: 시작점과 끝점 좌표
- `length`: 화살표 길이 (endPoint가 없을 때)

### 6. Line - 일반선

연결용 일반 선 컴포넌트입니다.

```jsx
import { Line } from "./DiagramComponents";

<Line
  startPoint={{ x: 260, y: 350 }}
  endPoint={{ x: 470, y: 300 }}
  lineType="curved"
  color="#64748B"
  dashArray="5,5"
/>;
```

**Props:**

- `lineType`: 'straight', 'curved', 'stepped'
- `dashArray`: 점선 패턴 (예: '5,5')

### 7. Connector - 연결선

고급 연결선 컴포넌트로 다양한 연결 타입과 자동 라우팅을 지원합니다.

```jsx
import { Connector } from "./DiagramComponents";

// 기본 직선 연결
<Connector
  startPoint={{ x: 150, y: 190 }}
  endPoint={{ x: 170, y: 190 }}
  connectionType="straight"
  color="#0284C7"
  showArrow={true}
  strokeWidth={3}
/>

// 🆕 NEW! 화살표 방향, 모양, 색상 커스터마이징
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 300, y: 150 }}
  arrowDirection="both"        // 양방향 화살표
  arrowShape="diamond"         // 다이아몬드 모양
  arrowColor="red"            // 빨간색 화살표
  arrowSize={15}              // 화살표 크기
  connectionType="curved"
  strokeWidth={3}
/>

// 🆕 원형 화살표
<Connector
  startPoint={{ x: 50, y: 200 }}
  endPoint={{ x: 250, y: 200 }}
  arrowDirection="forward"
  arrowShape="circle"
  arrowColor="green"
  arrowSize={12}
/>

// 🆕 사각형 화살표 (역방향)
<Connector
  startPoint={{ x: 100, y: 250 }}
  endPoint={{ x: 300, y: 250 }}
  arrowDirection="backward"
  arrowShape="square"
  arrowColor="purple"
  arrowSize={18}
/>

// 직교 연결 (L자형)
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 200, y: 150 }}
  connectionType="orthogonal"
  orthogonalDirection="horizontal-first"
  stepOffset={50}
  color="#10B981"
  showArrow={true}
/>

// 커스텀 경로 (복잡한 꺾인 선)
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 300, y: 200 }}
  connectionType="custom"
  bendPoints={[
    { x: 150, y: 100 },
    { x: 150, y: 150 },
    { x: 250, y: 150 },
    { x: 250, y: 200 }
  ]}
  color="#8B5CF6"
  showArrow={true}
/>

// 애니메이션 효과
<Connector
  startPoint={{ x: 100, y: 100 }}
  endPoint={{ x: 200, y: 100 }}
  connectionType="straight"
  animated={true}
  color="#14B8A6"
  showArrow={true}
/>
```

**Props:**

- `connectionType`: 'straight', 'curved', 'orthogonal', 'stepped', 'custom'
- **🆕 `arrowDirection`**: 'forward', 'backward', 'both', 'none' - 화살표 방향 제어
- **🆕 `arrowShape`**: 'triangle', 'diamond', 'circle', 'square' - 화살표 모양 설정
- **🆕 `arrowColor`**: 'current', 'red', 'blue', 'green', 'purple', 등 - 화살표 색상 지정
- `arrowSize`: 화살표 크기 (8-24) - **기존 prop 확장됨**
- `bendPoints`: 커스텀 경로의 중간 꺾임점들 (custom 타입에서 사용)
- `orthogonalDirection`: 'horizontal-first', 'vertical-first', 'auto'
- `stepOffset`: 직교 연결에서 중간 지점 오프셋
- `strokeWidth`: 선 두께 (1-10)

## 연결점 시스템

모든 컴포넌트는 자동으로 연결점을 생성합니다:

- `top`: 상단 중앙
- `right`: 우측 중앙
- `bottom`: 하단 중앙
- `left`: 좌측 중앙

연결점은 마우스 호버 시 표시되며, `data-connection-point` 속성으로 접근할 수 있습니다.

## 사용 예제

```jsx
import React from "react";
import { Box, Valve, Connector } from "./DiagramComponents";

const MyDiagram = () => {
  return (
    <div className="relative w-full h-screen">
      <Box x={100} y={100} text="시작" onClick={(event, data) => console.log("시작 박스 클릭")} />

      <Valve x={250} y={125} type="gate" isOpen={true} />

      <Box x={350} y={100} text="끝" />

      <Connector startPoint={{ x: 220, y: 130 }} endPoint={{ x: 250, y: 130 }} showArrow={true} />

      <Connector startPoint={{ x: 290, y: 130 }} endPoint={{ x: 350, y: 130 }} showArrow={true} />
    </div>
  );
};
```

## 스타일링

모든 컴포넌트는 TailwindCSS를 사용하며, 다음과 같은 방식으로 커스터마이징할 수 있습니다:

1. **색상**: `backgroundColor`, `borderColor`, `fillColor` 등의 props 사용
2. **크기**: `width`, `height`, `size` props 사용
3. **위치**: `x`, `y` props로 절대 위치 지정
4. **클래스**: `className` prop으로 추가 스타일 적용

## 접근성

모든 컴포넌트는 접근성을 고려하여 설계되었습니다:

- `tabIndex="0"`: 키보드 탐색 지원
- `aria-label`: 스크린 리더 지원
- `onKeyDown`: 키보드 이벤트 처리
- `role="button"`: 적절한 역할 정의

## 이벤트 처리

컴포넌트 클릭 시 다음과 같은 데이터가 전달됩니다:

```javascript
{
  x: 100,
  y: 100,
  width: 120,
  height: 60,
  text: "컴포넌트 텍스트",
  // 컴포넌트별 추가 데이터
}
```
