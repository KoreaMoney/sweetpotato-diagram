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

아이콘이나 이미지를 포함할 수 있는 박스 컴포넌트입니다. **🆕 NEW! 이미지 크기 조절 기능 추가!**

```jsx
import { ImageBox } from "./DiagramComponents";

const hydrogenIcon = `<svg>...</svg>`;

// 기본 사용법
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
/>

// 🆕 NEW! 이미지 크기 조절 기능
<ImageBox
  x={200}
  y={150}
  width={120}
  height={100}
  text="연료전지 스택"
  icon="/path/to/fuel-cell.png"
  iconType="image"
  imageScale={0.8}          // 이미지를 80% 크기로
  imagePadding={12}         // 12px 여백
  imageObjectFit="cover"    // 이미지 피팅 방식
/>

// 🆕 절대 크기 지정
<ImageBox
  x={350}
  y={150}
  width={150}
  height={120}
  text="컨트롤러"
  icon="/path/to/controller.png"
  iconType="image"
  imageWidth={60}           // 이미지 너비 60px
  imageHeight={40}          // 이미지 높이 40px
  imagePadding={16}         // 16px 여백
/>

// 🆕 이모지 크기 조절
<ImageBox
  x={50}
  y={300}
  width={80}
  height={80}
  text="배터리"
  icon="🔋"
  iconType="emoji"
  imageScale={1.5}          // 이모지를 1.5배 크기로
  imagePadding={10}
/>
```

**Props:**

- `x, y`: 위치 좌표
- `width, height`: 박스 크기
- `text`: 표시할 텍스트
- `icon`: SVG 문자열, 이미지 URL, 또는 이모지
- `iconType`: 'svg', 'image', 'emoji'
- `backgroundColor`: 배경색
- `borderColor`: 테두리 색상
- `className`: 추가 CSS 클래스
- `onClick`: 클릭 이벤트 핸들러
- **🆕 `imageWidth`**: 이미지 절대 너비 (픽셀) - null이면 자동 크기
- **🆕 `imageHeight`**: 이미지 절대 높이 (픽셀) - null이면 자동 크기
- **🆕 `imageScale`**: 이미지 크기 비율 (0.1 ~ 2.0, 기본값: 1.0)
- **🆕 `imagePadding`**: 이미지 주변 여백 (픽셀, 기본값: 8)
- **🆕 `imageObjectFit`**: 이미지 피팅 방식
  - `"contain"`: 이미지 전체가 보이도록 비율 유지 (기본값)
  - `"cover"`: 박스를 완전히 채우도록 이미지 크롭
  - `"fill"`: 박스에 맞게 이미지 늘림
  - `"scale-down"`: contain과 none 중 작은 크기
  - `"none"`: 원본 크기 유지

**🎯 사용 가이드:**

1. **절대 크기 제어**: `imageWidth`, `imageHeight`로 정확한 픽셀 크기 지정
2. **비율 조절**: `imageScale`로 박스 대비 이미지 크기 비율 조정
3. **여백 조정**: `imagePadding`으로 이미지와 테두리 사이 여백 조절
4. **피팅 방식**: `imageObjectFit`으로 이미지가 박스에 맞춰지는 방식 선택
5. **반응형 호버**: 마우스 호버 시 이미지가 10% 확대되는 애니메이션 효과

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

다양한 타입의 밸브를 표현하는 컴포넌트입니다. **🆕 NEW! 아이콘 및 상태 표시 기능 추가!**

```jsx
import { Valve } from "./DiagramComponents";

// 기본 사용법
<Valve x={170} y={175} type="gate" size={40} isOpen={true} fillColor="#F59E0B" strokeColor="#D97706" />;

// 🆕 NEW! 아이콘 기능 사용
<Valve
  x={100}
  y={100}
  type="ball"
  size={40}
  isOpen={true}
  showIcon={true} // 아이콘 표시
  iconPosition="top" // 위치
  iconSize={16} // 크기
  showStatus={true} // 상태 표시 모드
  status="normal" // 정상 상태
/>;

// 🆕 커스텀 아이콘 사용
import { ThermometerSun, Gauge, Settings } from "lucide-react";

<Valve
  x={200}
  y={100}
  type="needle"
  size={40}
  isOpen={true}
  showIcon={true}
  customIcon={<ThermometerSun className="w-4 h-4" />} // 온도 센서 아이콘
  iconPosition="top"
  iconColor="text-orange-500"
  iconSize={18}
/>;
```

**Props:**

- `type`: 'gate', 'ball', 'check', 'butterfly', 'needle'
- `isOpen`: 밸브 열림/닫힘 상태
- `size`: 밸브 크기

**🆕 NEW! 아이콘 관련 Props:**

- `showIcon`: 아이콘 표시 여부 (boolean)
- `customIcon`: 커스텀 아이콘 (Lucide 컴포넌트 또는 JSX)
- `iconPosition`: 아이콘 위치 ('top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center')
- `iconSize`: 아이콘 크기 (픽셀)
- `iconColor`: 아이콘 색상 (TailwindCSS 클래스)
- `iconOffset`: 아이콘과 밸브 사이의 거리
- `showStatus`: 상태 표시 아이콘 모드 (boolean)
- `status`: 밸브 상태 ('normal', 'warning', 'error', 'maintenance')

**🎯 사용 예시:**

1. **기본 아이콘**: 밸브 타입에 따른 자동 아이콘 표시
2. **상태 표시**: 시스템 모니터링용 상태 아이콘 (정상/경고/오류/정비)
3. **커스텀 아이콘**: 온도계, 압력계, 설정 등 특별한 기능 표시
4. **위치 조정**: 9가지 위치 옵션으로 레이아웃에 맞게 배치
5. **독립 제어**: 밸브와 아이콘의 색상, 크기 독립적 조절

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
