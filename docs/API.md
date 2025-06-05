# 📚 Diagram API 문서

다이어그램 컴포넌트 라이브러리의 상세 API 문서입니다.

## 🎨 스타일링 권장사항

이 컴포넌트 라이브러리는 **TailwindCSS**를 사용한 스타일링을 강력히 권장합니다.

### TailwindCSS 설치

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### TailwindCSS 설정

`tailwind.config.js` 파일을 다음과 같이 설정하세요:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### CSS 파일에 TailwindCSS 추가

메인 CSS 파일 (예: `src/index.css`)에 다음을 추가하세요:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Sweet Diagram 스타일 import */
@import "sweet-diagram/style.css";
```

### 스타일링 예시

```jsx
// TailwindCSS 클래스를 사용한 현대적 스타일링
<Box
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
             border-2 border-blue-700 rounded-lg shadow-lg
             transition-all duration-300 hover:scale-105"
/>

<DraggableBox
  className="bg-gradient-to-r from-purple-500 to-pink-500
             text-white rounded-xl shadow-xl border-2 border-purple-700
             hover:shadow-2xl transform transition-all duration-200"
/>
```

## 📋 목차

- [🎨 스타일링 권장사항](#🎨-스타일링-권장사항)
- [기본 컴포넌트](#기본-컴포넌트)
  - [Box 컴포넌트](#box-컴포넌트)
  - [DraggableBox 컴포넌트](#draggablebox-컴포넌트)
  - [ImageBox 컴포넌트](#imagebox-컴포넌트)
- [연결 컴포넌트](#연결-컴포넌트)
  - [Connector 컴포넌트](#connector-컴포넌트)
  - [Arrow 컴포넌트](#arrow-컴포넌트)
  - [Line 컴포넌트](#line-컴포넌트)
- [특수 컴포넌트](#특수-컴포넌트)
  - [Valve 컴포넌트](#valve-컴포넌트)
  - [Triangle 컴포넌트](#triangle-컴포넌트)
- [유틸리티 컴포넌트](#유틸리티-컴포넌트)
  - [CodeEditor 컴포넌트](#codeeditor-컴포넌트)
  - [DiagramContext](#diagramcontext)
- [🧪 실용적인 테스트 예제](#🧪-실용적인-테스트-예제)
- [고급 사용법](#고급-사용법)

---

## 기본 컴포넌트

### Box 컴포넌트

시스템의 각 구성요소를 나타내는 기본 박스 컴포넌트입니다.

#### Props

| 속성              | 타입       | 기본값      | 필수 | 설명                             |
| ----------------- | ---------- | ----------- | ---- | -------------------------------- |
| `id`              | `string`   | `""`        | ❌   | 박스 식별자 (Connector에서 사용) |
| `x`               | `number`   | `0`         | ❌   | X 좌표 위치                      |
| `y`               | `number`   | `0`         | ❌   | Y 좌표 위치                      |
| `width`           | `number`   | `120`       | ❌   | 박스의 너비                      |
| `height`          | `number`   | `60`        | ❌   | 박스의 높이                      |
| `text`            | `string`   | `""`        | ❌   | 박스 내부에 표시할 텍스트        |
| `backgroundColor` | `string`   | `"#3B82F6"` | ❌   | 박스 배경색 (HEX 코드)           |
| `textColor`       | `string`   | `"#FFFFFF"` | ❌   | 텍스트 색상 (HEX 코드)           |
| `borderColor`     | `string`   | `"#1E40AF"` | ❌   | 테두리 색상 (HEX 코드)           |
| `borderWidth`     | `number`   | `2`         | ❌   | 테두리 두께 (픽셀)               |
| `borderRadius`    | `number`   | `8`         | ❌   | 모서리 둥글기 (픽셀)             |
| `fontSize`        | `number`   | `14`        | ❌   | 폰트 크기 (픽셀)                 |
| `className`       | `string`   | `""`        | ❌   | 추가 CSS 클래스                  |
| `onClick`         | `function` | `null`      | ❌   | 클릭 이벤트 핸들러               |
| `onDoubleClick`   | `function` | `null`      | ❌   | 더블클릭 이벤트 핸들러           |
| `onMouseEnter`    | `function` | `null`      | ❌   | 마우스 진입 이벤트 핸들러        |
| `onMouseLeave`    | `function` | `null`      | ❌   | 마우스 떠남 이벤트 핸들러        |

#### 이벤트

##### onClick

```jsx
// 함수 타입: (event, boxInfo) => void
// boxInfo 객체 구조:
// {
//   id: string,
//   x: number,
//   y: number,
//   width: number,
//   height: number,
//   text: string
// }
```

#### 사용 예시

**TailwindCSS를 사용한 현대적 스타일링 (권장):**

```jsx
import { Box } from "sweet-diagram";

<Box
  id="hydrogen-tank"
  x={100}
  y={50}
  width={120}
  height={60}
  text="수소탱크"
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold
             border-2 border-blue-700 rounded-lg shadow-lg
             transition-all duration-300 hover:scale-105 cursor-pointer"
  onClick={(event, boxInfo) => {
    console.log("박스 클릭됨:", boxInfo);
  }}
  onMouseEnter={() => console.log("마우스 진입")}
/>

// 다양한 TailwindCSS 스타일 예시
<Box
  id="motor"
  x={250}
  y={50}
  text="모터"
  className="bg-gradient-to-r from-green-400 to-green-600 text-white
             border-2 border-green-700 rounded-xl shadow-xl
             hover:shadow-2xl transform transition-all duration-200"
/>

<Box
  id="controller"
  x={400}
  y={50}
  text="제어기"
  className="bg-purple-500 hover:bg-purple-600 text-white
             border border-purple-700 rounded-md shadow-md
             hover:shadow-lg transition-colors duration-300"
/>
```

**기존 방식 (색상 props 사용):**

```jsx
<Box
  id="legacy-box"
  x={100}
  y={150}
  width={120}
  height={60}
  text="기존 방식"
  backgroundColor="#3B82F6"
  textColor="#FFFFFF"
  borderColor="#1E40AF"
  borderWidth={2}
  borderRadius={8}
  fontSize={14}
/>
```

---

### DraggableBox 컴포넌트

드래그 앤 드롭 기능이 내장된 박스 컴포넌트입니다.

#### Props

| 속성                | 타입       | 기본값      | 필수 | 설명              |
| ------------------- | ---------- | ----------- | ---- | ----------------- |
| `id`                | `string`   | `""`        | ✅   | 고유 식별자       |
| `initialX`          | `number`   | `0`         | ❌   | 초기 X 좌표       |
| `initialY`          | `number`   | `0`         | ❌   | 초기 Y 좌표       |
| `width`             | `number`   | `120`       | ❌   | 박스의 너비       |
| `height`            | `number`   | `60`        | ❌   | 박스의 높이       |
| `text`              | `string`   | `""`        | ❌   | 표시할 텍스트     |
| `backgroundColor`   | `string`   | `"#3B82F6"` | ❌   | 배경색            |
| `textColor`         | `string`   | `"#FFFFFF"` | ❌   | 텍스트 색상       |
| `borderColor`       | `string`   | `"#1E40AF"` | ❌   | 테두리 색상       |
| `isDraggable`       | `boolean`  | `true`      | ❌   | 드래그 가능 여부  |
| `constrainToBounds` | `boolean`  | `false`     | ❌   | 영역 내 제한 여부 |
| `bounds`            | `object`   | `null`      | ❌   | 드래그 제한 영역  |
| `snapToGrid`        | `boolean`  | `false`     | ❌   | 격자에 스냅 여부  |
| `gridSize`          | `number`   | `10`        | ❌   | 격자 크기         |
| `onPositionChange`  | `function` | `null`      | ❌   | 위치 변경 콜백    |
| `onDragStart`       | `function` | `null`      | ❌   | 드래그 시작 콜백  |
| `onDragEnd`         | `function` | `null`      | ❌   | 드래그 종료 콜백  |

#### 이벤트

##### onPositionChange

```jsx
// 함수 타입: (newX, newY, elementId) => void
```

##### onDragStart / onDragEnd

```jsx
// onDragStart 함수 타입: (event, elementId) => void
// onDragEnd 함수 타입: (event, elementId, position) => void
// position 객체: { x: number, y: number }
```

#### 사용 예시

**TailwindCSS를 사용한 현대적 스타일링 (권장):**

```jsx
import { DraggableBox } from "sweet-diagram";

<DraggableBox
  id="draggable-component"
  initialX={100}
  initialY={100}
  text="드래그 가능한 박스"
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold
             border-2 border-blue-700 rounded-lg shadow-lg
             hover:shadow-xl cursor-move transition-all duration-200
             active:scale-95 select-none"
  isDraggable={true}
  snapToGrid={true}
  gridSize={20}
  constrainToBounds={true}
  bounds={{ x: 0, y: 0, width: 800, height: 600 }}
  onPositionChange={(newX, newY, id) => {
    console.log(`${id} 새 위치: (${newX}, ${newY})`);
  }}
  onDragStart={(e, id) => console.log("드래그 시작:", id)}
  onDragEnd={(e, id, pos) => console.log("드래그 종료:", id, pos)}
/>

// 다양한 테마의 드래그 박스들
<DraggableBox
  id="red-box"
  initialX={200}
  initialY={200}
  text="빨간 박스"
  className="bg-red-500 hover:bg-red-600 text-white
             border-2 border-red-700 rounded-xl shadow-md
             hover:shadow-lg transform transition-all duration-300"
/>

<DraggableBox
  id="green-box"
  initialX={300}
  initialY={200}
  text="초록 박스"
  className="bg-emerald-500 hover:bg-emerald-600 text-white
             border border-emerald-600 rounded-md shadow-sm
             hover:shadow-md transition-colors duration-200"
/>
```

---

### ImageBox 컴포넌트

이미지를 포함할 수 있는 박스 컴포넌트입니다.

#### Props

| 속성              | 타입       | 기본값      | 필수 | 설명                             |
| ----------------- | ---------- | ----------- | ---- | -------------------------------- |
| `id`              | `string`   | `""`        | ❌   | 고유 식별자                      |
| `x`               | `number`   | `0`         | ❌   | X 좌표                           |
| `y`               | `number`   | `0`         | ❌   | Y 좌표                           |
| `width`           | `number`   | `120`       | ❌   | 너비                             |
| `height`          | `number`   | `80`        | ❌   | 높이                             |
| `imageUrl`        | `string`   | `""`        | ❌   | 이미지 URL                       |
| `altText`         | `string`   | `""`        | ❌   | 이미지 대체 텍스트               |
| `text`            | `string`   | `""`        | ❌   | 추가 텍스트                      |
| `textPosition`    | `string`   | `"bottom"`  | ❌   | 텍스트 위치 (top/bottom/overlay) |
| `backgroundColor` | `string`   | `"#F3F4F6"` | ❌   | 배경색                           |
| `borderColor`     | `string`   | `"#D1D5DB"` | ❌   | 테두리 색상                      |
| `borderWidth`     | `number`   | `1`         | ❌   | 테두리 두께                      |
| `borderRadius`    | `number`   | `8`         | ❌   | 모서리 둥글기                    |
| `objectFit`       | `string`   | `"cover"`   | ❌   | 이미지 맞춤 방식                 |
| `onClick`         | `function` | `null`      | ❌   | 클릭 이벤트 핸들러               |

#### 사용 예시

**TailwindCSS를 사용한 현대적 스타일링 (권장):**

```jsx
import { ImageBox } from "sweet-diagram";

<ImageBox
  id="compressor-image"
  x={200}
  y={100}
  width={150}
  height={100}
  imageUrl="/images/compressor.png"
  altText="수소 압축기"
  text="압축기"
  textPosition="bottom"
  className="bg-white border-2 border-green-500 rounded-lg shadow-lg
             hover:shadow-xl hover:border-green-600 transition-all duration-300
             cursor-pointer transform hover:scale-105"
  objectFit="contain"
  onClick={(event, info) => console.log("이미지 박스 클릭", info)}
/>

// 다양한 스타일 예시
<ImageBox
  id="sensor"
  x={100}
  y={250}
  width={100}
  height={80}
  imageUrl="/images/sensor.svg"
  text="센서"
  textPosition="overlay"
  className="bg-gradient-to-br from-blue-50 to-blue-100
             border border-blue-300 rounded-xl shadow-md
             hover:shadow-lg transition-shadow duration-200"
/>

<ImageBox
  id="valve"
  x={350}
  y={250}
  imageUrl="/images/valve.png"
  text="밸브"
  className="bg-gray-50 border-2 border-gray-300 rounded-lg
             hover:bg-gray-100 hover:border-gray-400
             transition-colors duration-300"
/>
```

**기존 방식 (색상 props 사용):**

```jsx
<ImageBox
  id="legacy-image"
  x={200}
  y={300}
  imageUrl="/images/device.png"
  text="기존 방식"
  backgroundColor="#F3F4F6"
  borderColor="#10B981"
  borderWidth={2}
  borderRadius={8}
/>
```

---

## 연결 컴포넌트

### Connector 컴포넌트

컴포넌트들을 연결하는 지능형 연결선입니다. 양방향 연결과 다양한 연결 타입을 지원합니다.

#### Props

| 속성             | 타입      | 기본값       | 필수 | 설명                      |
| ---------------- | --------- | ------------ | ---- | ------------------------- |
| `fromElementId`  | `string`  | `""`         | ❌   | 시작 요소 ID              |
| `toElementId`    | `string`  | `""`         | ❌   | 끝 요소 ID                |
| `fromBox`        | `object`  | `null`       | ❌   | 시작 박스 정보 (NEW!)     |
| `toBox`          | `object`  | `null`       | ❌   | 끝 박스 정보 (NEW!)       |
| `fromPosition`   | `string`  | `"center"`   | ❌   | 시작점 위치               |
| `toPosition`     | `string`  | `"center"`   | ❌   | 끝점 위치                 |
| `strokeColor`    | `string`  | `"#6B7280"`  | ❌   | 선 색상                   |
| `strokeWidth`    | `number`  | `2`          | ❌   | 선 두께                   |
| `connectionType` | `string`  | `"straight"` | ❌   | 연결 타입                 |
| `bendPoints`     | `array`   | `undefined`  | ❌   | 사용자 정의 꺾임점 (NEW!) |
| `bidirectional`  | `boolean` | `false`      | ❌   | 양방향 연결 여부          |
| `animated`       | `boolean` | `false`      | ❌   | 애니메이션 효과           |
| `dashArray`      | `string`  | `""`         | ❌   | 점선 패턴                 |
| `showArrow`      | `boolean` | `true`       | ❌   | 화살표 표시 여부          |
| `arrowDirection` | `string`  | `"forward"`  | ❌   | 화살표 방향 (NEW!)        |
| `arrowSize`      | `number`  | `8`          | ❌   | 화살표 크기               |
| `arrowShape`     | `string`  | `"triangle"` | ❌   | 화살표 모양 (NEW!)        |
| `arrowColor`     | `string`  | `"current"`  | ❌   | 화살표 색상 (NEW!)        |
| `label`          | `string`  | `""`         | ❌   | 연결선 라벨               |
| `labelPosition`  | `string`  | `"middle"`   | ❌   | 라벨 위치                 |
| `offset`         | `object`  | `{x:0,y:0}`  | ❌   | 위치 오프셋               |

#### 연결 위치 (Position)

- `"top"` - 상단 중앙
- `"right"` - 우측 중앙
- `"bottom"` - 하단 중앙
- `"left"` - 좌측 중앙
- `"center"` - 중앙
- `"top-left"` - 좌상단
- `"top-right"` - 우상단
- `"bottom-left"` - 좌하단
- `"bottom-right"` - 우하단

#### 연결 타입 (Connection Type)

- `"straight"` - 직선
- `"orthogonal"` - 직교 (L자형)
- `"curved"` - 곡선
- `"stepped"` - 계단식
- `"custom"` - 사용자 정의 경로 (bendPoints 사용)
- `"auto"` - 박스 위치에 따라 자동 선택

#### bendPoints (사용자 정의 꺾임점)

`connectionType="custom"`일 때 사용하는 중간 꺾임점들의 배열입니다.

**형식**: `[{ x: number, y: number }, ...]`

```jsx
// 장애물을 우회하는 복잡한 경로
<Connector
  fromBox={{ id: "start", position: "right" }}
  toBox={{ id: "end", position: "left" }}
  connectionType="custom"
  bendPoints={[
    { x: 130, y: 65 },
    { x: 130, y: 30 },
    { x: 250, y: 30 },
    { x: 250, y: 165 },
  ]}
  strokeColor="#3B82F6"
  strokeWidth={2}
  showArrow={true}
/>
```

#### fromBox / toBox (박스 연결)

DiagramProvider를 통해 자동으로 Box 정보를 감지하여 연결하는 새로운 방식입니다.

**형식**: `{ id: string, position: string, offset?: { x: number, y: number } }`

```jsx
<Connector
  fromBox={{
    id: "source-box",
    position: "right",
    offset: { x: 10, y: -5 }, // 선택적 오프셋
  }}
  toBox={{
    id: "target-box",
    position: "left",
  }}
  connectionType="auto"
/>
```

#### 화살표 방향 (Arrow Direction)

- `"forward"` - 끝점에만 화살표 (기본값)
- `"backward"` - 시작점에만 화살표
- `"both"` - 양방향 화살표
- `"none"` - 화살표 없음

#### 화살표 모양 (Arrow Shape)

- `"triangle"` - 삼각형 (기본값)
- `"diamond"` - 다이아몬드
- `"circle"` - 원형
- `"square"` - 사각형

#### 화살표 색상 (Arrow Color)

- `"current"` - 부모 요소 색상 상속 (기본값)
- `"red"`, `"blue"`, `"green"`, `"yellow"`, `"purple"`, `"pink"`, `"indigo"`, `"gray"`, `"black"`, `"white"`
- 또는 커스텀 색상 문자열

#### ⚠️ 중요한 변경사항 및 주의점

1. **bendPoints 유지**: 다른 속성을 수정해도 bendPoints가 초기화되지 않습니다.
2. **자동 Fallback**: `connectionType="custom"`인데 `bendPoints`가 없으면 자동으로 `"straight"`로 변경됩니다.
3. **개발자 경고**: 설정 오류 시 콘솔에 명확한 경고 메시지가 표시됩니다.
4. **boxes prop 제거**: 이제 DiagramProvider를 통해 자동으로 Box 정보를 가져옵니다.

#### 사용 예시

```jsx
import { Connector } from '@/components/DiagramComponents';

// 🆕 새로운 방식: fromBox/toBox 자동 연결
<Connector
  fromBox={{ id: "source-box", position: "right" }}
  toBox={{ id: "target-box", position: "left" }}
  connectionType="auto"
  strokeColor="#10B981"
  strokeWidth={3}
  showArrow={true}
/>

// 🆕 사용자 정의 경로 (bendPoints)
<Connector
  fromBox={{ id: "start", position: "right" }}
  toBox={{ id: "end", position: "left" }}
  connectionType="custom"
  bendPoints={[
    { x: 130, y: 65 },
    { x: 130, y: 30 },
    { x: 250, y: 30 },
    { x: 250, y: 165 }
  ]}
  strokeColor="#3B82F6"
  strokeWidth={2}
  showArrow={true}
/>

// 🆕 양방향 화살표 with 다이아몬드 모양
<Connector
  fromBox={{ id: "boxA", position: "right" }}
  toBox={{ id: "boxB", position: "left" }}
  connectionType="curved"
  arrowDirection="both"
  arrowShape="diamond"
  arrowColor="red"
  arrowSize={12}
  strokeColor="#EF4444"
  strokeWidth={3}
/>

// 🆕 원형 화살표 with 애니메이션
<Connector
  fromBox={{ id: "sensor", position: "bottom" }}
  toBox={{ id: "controller", position: "top" }}
  connectionType="orthogonal"
  arrowShape="circle"
  arrowColor="green"
  animated={true}
  strokeColor="#10B981"
  strokeWidth={2}
/>

// 🆕 오프셋을 사용한 정밀한 연결
<Connector
  fromBox={{
    id: "tank",
    position: "right",
    offset: { x: 5, y: -10 }
  }}
  toBox={{
    id: "engine",
    position: "left",
    offset: { x: -5, y: 10 }
  }}
  connectionType="straight"
  strokeColor="#F59E0B"
  strokeWidth={4}
  showArrow={true}
/>

// 🔧 기존 방식도 여전히 지원
<Connector
  fromElementId="tank"
  toElementId="engine"
  fromPosition="right"
  toPosition="left"
  bidirectional={true}
  animated={true}
  connectionType="orthogonal"
  strokeColor="#3B82F6"
  label="수소 공급"
  labelPosition="middle"
/>
```

---

### Arrow 컴포넌트

방향성을 나타내는 화살표 컴포넌트입니다.

#### Props

| 속성          | 타입      | 기본값      | 필수 | 설명             |
| ------------- | --------- | ----------- | ---- | ---------------- |
| `startX`      | `number`  | `0`         | ✅   | 시작점 X 좌표    |
| `startY`      | `number`  | `0`         | ✅   | 시작점 Y 좌표    |
| `endX`        | `number`  | `100`       | ✅   | 끝점 X 좌표      |
| `endY`        | `number`  | `100`       | ✅   | 끝점 Y 좌표      |
| `color`       | `string`  | `"#6B7280"` | ❌   | 화살표 색상      |
| `strokeWidth` | `number`  | `2`         | ❌   | 선 두께          |
| `arrowSize`   | `number`  | `8`         | ❌   | 화살표 머리 크기 |
| `style`       | `string`  | `"solid"`   | ❌   | 선 스타일        |
| `curved`      | `boolean` | `false`     | ❌   | 곡선 여부        |
| `animate`     | `boolean` | `false`     | ❌   | 애니메이션 여부  |

#### 사용 예시

```jsx
import { Arrow } from "@/components/DiagramComponents";

<Arrow
  startX={100}
  startY={100}
  endX={200}
  endY={150}
  color="#EF4444"
  strokeWidth={3}
  arrowSize={12}
  curved={true}
  animate={true}
/>;
```

---

### Line 컴포넌트

단순한 연결선 컴포넌트입니다.

#### Props

| 속성          | 타입     | 기본값      | 필수 | 설명          |
| ------------- | -------- | ----------- | ---- | ------------- |
| `startX`      | `number` | `0`         | ✅   | 시작점 X 좌표 |
| `startY`      | `number` | `0`         | ✅   | 시작점 Y 좌표 |
| `endX`        | `number` | `100`       | ✅   | 끝점 X 좌표   |
| `endY`        | `number` | `100`       | ✅   | 끝점 Y 좌표   |
| `strokeColor` | `string` | `"#6B7280"` | ❌   | 선 색상       |
| `strokeWidth` | `number` | `2`         | ❌   | 선 두께       |
| `dashArray`   | `string` | `""`        | ❌   | 점선 패턴     |
| `opacity`     | `number` | `1`         | ❌   | 투명도        |

#### 사용 예시

```jsx
import { Line } from "@/components/DiagramComponents";

<Line
  startX={0}
  startY={0}
  endX={100}
  endY={100}
  strokeColor="#6B7280"
  strokeWidth={2}
  dashArray="5,5"
  opacity={0.7}
/>;
```

---

## 특수 컴포넌트

### Valve 컴포넌트

시스템의 밸브를 나타내는 전문 컴포넌트입니다.

#### Props

| 속성           | 타입        | 기본값      | 필수 | 설명               |
| -------------- | ----------- | ----------- | ---- | ------------------ |
| `id`           | `string`    | `""`        | ❌   | 고유 식별자        |
| `x`            | `number`    | `0`         | ❌   | X 좌표             |
| `y`            | `number`    | `0`         | ❌   | Y 좌표             |
| `size`         | `number`    | `30`        | ❌   | 밸브 크기          |
| `type`         | `string`    | `"gate"`    | ❌   | 밸브 타입          |
| `isOpen`       | `boolean`   | `true`      | ❌   | 열림/닫힘 상태     |
| `color`        | `string`    | `"#3B82F6"` | ❌   | 밸브 색상          |
| `showStatus`   | `boolean`   | `false`     | ❌   | 상태 표시 여부     |
| `status`       | `string`    | `"normal"`  | ❌   | 운영 상태          |
| `showIcon`     | `boolean`   | `false`     | ❌   | 아이콘 표시 여부   |
| `iconPosition` | `string`    | `"top"`     | ❌   | 아이콘 위치        |
| `customIcon`   | `ReactNode` | `null`      | ❌   | 커스텀 아이콘      |
| `onToggle`     | `function`  | `null`      | ❌   | 상태 변경 콜백     |
| `onClick`      | `function`  | `null`      | ❌   | 클릭 이벤트 핸들러 |

#### 밸브 타입 (Type)

- `"gate"` - 게이트 밸브
- `"ball"` - 볼 밸브
- `"check"` - 체크 밸브
- `"butterfly"` - 버터플라이 밸브
- `"needle"` - 니들 밸브
- `"safety"` - 안전 밸브

#### 상태 (Status)

- `"normal"` - 정상 (녹색)
- `"warning"` - 경고 (주황)
- `"error"` - 오류 (빨강)
- `"maintenance"` - 점검 (회색)

#### 사용 예시

```jsx
import { Valve } from "@/components/DiagramComponents";
import { Thermometer } from "lucide-react";

<Valve
  id="main-valve"
  x={300}
  y={200}
  size={40}
  type="ball"
  isOpen={true}
  color="#10B981"
  showStatus={true}
  status="normal"
  showIcon={true}
  iconPosition="top"
  customIcon={<Thermometer className="w-4 h-4" />}
  onToggle={(isOpen) => {
    console.log(`밸브 상태: ${isOpen ? "열림" : "닫힘"}`);
  }}
  onClick={(event, valveInfo) => {
    console.log("밸브 클릭됨:", valveInfo);
  }}
/>;
```

---

### Triangle 컴포넌트

방향성이나 특수 표시를 위한 삼각형 컴포넌트입니다.

#### Props

| 속성          | 타입       | 기본값      | 필수 | 설명               |
| ------------- | ---------- | ----------- | ---- | ------------------ |
| `x`           | `number`   | `0`         | ❌   | X 좌표             |
| `y`           | `number`   | `0`         | ❌   | Y 좌표             |
| `size`        | `number`   | `20`        | ❌   | 크기               |
| `direction`   | `string`   | `"up"`      | ❌   | 방향               |
| `fillColor`   | `string`   | `"#3B82F6"` | ❌   | 채움 색상          |
| `borderColor` | `string`   | `"#1E40AF"` | ❌   | 테두리 색상        |
| `borderWidth` | `number`   | `1`         | ❌   | 테두리 두께        |
| `filled`      | `boolean`  | `true`      | ❌   | 채움 여부          |
| `onClick`     | `function` | `null`      | ❌   | 클릭 이벤트 핸들러 |

#### 방향 (Direction)

- `"up"` - 위쪽
- `"down"` - 아래쪽
- `"left"` - 왼쪽
- `"right"` - 오른쪽

#### 사용 예시

```jsx
import { Triangle } from "@/components/DiagramComponents";

<Triangle
  x={150}
  y={75}
  size={30}
  direction="right"
  fillColor="#F59E0B"
  borderColor="#D97706"
  borderWidth={2}
  filled={true}
  onClick={(event, info) => console.log("삼각형 클릭", info)}
/>;
```

---

## 유틸리티 컴포넌트

### CodeEditor 컴포넌트

컴포넌트 설정을 실시간으로 편집할 수 있는 코드 에디터입니다.

#### Props

| 속성              | 타입       | 기본값    | 필수 | 설명           |
| ----------------- | ---------- | --------- | ---- | -------------- |
| `initialCode`     | `string`   | `""`      | ❌   | 초기 코드      |
| `language`        | `string`   | `"jsx"`   | ❌   | 언어 모드      |
| `theme`           | `string`   | `"light"` | ❌   | 테마           |
| `height`          | `string`   | `"300px"` | ❌   | 에디터 높이    |
| `readOnly`        | `boolean`  | `false`   | ❌   | 읽기 전용 여부 |
| `showLineNumbers` | `boolean`  | `true`    | ❌   | 줄 번호 표시   |
| `onCodeChange`    | `function` | `null`    | ❌   | 코드 변경 콜백 |
| `onError`         | `function` | `null`    | ❌   | 오류 발생 콜백 |

#### 사용 예시

```jsx
import { CodeEditor } from "@/components/DiagramComponents";

<CodeEditor
  initialCode={`<Box 
  x={100} 
  y={100} 
  text="샘플 박스"
  backgroundColor="#3B82F6"
/>`}
  language="jsx"
  theme="dark"
  height="400px"
  showLineNumbers={true}
  onCodeChange={(newCode) => {
    console.log("코드 변경:", newCode);
    // 실시간 미리보기 업데이트
  }}
  onError={(error) => {
    console.error("문법 오류:", error);
  }}
/>;
```

---

### DiagramContext

다이어그램 전체의 상태를 관리하는 Context Provider입니다.

#### DiagramProvider Props

| 속성           | 타입        | 기본값 | 필수 | 설명          |
| -------------- | ----------- | ------ | ---- | ------------- |
| `children`     | `ReactNode` | -      | ✅   | 자식 컴포넌트 |
| `initialState` | `object`    | `{}`   | ❌   | 초기 상태     |

#### State 구조

```typescript
interface DiagramState {
  elements: DiagramElement[];
  connections: Connection[];
  selectedElement: string | null;
  zoom: number;
  panOffset: { x: number; y: number };
  mode: "select" | "connect" | "edit";
  clipboard: DiagramElement[];
  history: DiagramState[];
  historyIndex: number;
}
```

#### Actions

```typescript
interface DiagramActions {
  addElement: (element: DiagramElement) => void;
  removeElement: (elementId: string) => void;
  updateElement: (elementId: string, updates: Partial<DiagramElement>) => void;
  selectElement: (elementId: string | null) => void;
  addConnection: (connection: Connection) => void;
  removeConnection: (connectionId: string) => void;
  setZoom: (zoom: number) => void;
  setPanOffset: (offset: { x: number; y: number }) => void;
  setMode: (mode: string) => void;
  copyToClipboard: (elementIds: string[]) => void;
  pasteFromClipboard: () => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}
```

#### 사용 예시

```jsx
import { DiagramProvider, useDiagram } from "@/components/DiagramComponents";

// Provider로 감싸기
function App() {
  return (
    <DiagramProvider initialState={{ zoom: 1, mode: "select" }}>
      <DiagramCanvas />
      <Toolbar />
    </DiagramProvider>
  );
}

// Hook 사용
function DiagramCanvas() {
  const { state, addElement, updateElement, selectElement, setZoom } = useDiagram();

  const handleAddBox = () => {
    addElement({
      id: "new-box",
      type: "box",
      x: 100,
      y: 100,
      props: { text: "새 박스" },
    });
  };

  const handleElementSelect = (elementId) => {
    selectElement(elementId);
  };

  const handleZoom = (delta) => {
    setZoom(state.zoom + delta);
  };

  return (
    <div>
      <button onClick={handleAddBox}>박스 추가</button>
      <div style={{ transform: `scale(${state.zoom})` }}>
        {state.elements.map((element) => (
          <Box
            key={element.id}
            {...element.props}
            onClick={() => handleElementSelect(element.id)}
            className={element.id === state.selectedElement ? "selected" : ""}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 🧪 실용적인 테스트 예제

다음은 여러 컴포넌트를 조합한 실제 사용 시나리오입니다:

```jsx
import React from "react";
import { Box, Arrow, Connector, Triangle, Valve, ImageBox, DiagramProvider, DraggableBox } from "sweet-diagram";

const ComprehensiveTest = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <DiagramProvider>
          {/* 고정된 시작 박스 */}
          <Box
            id="custom-demo-start"
            x={200}
            y={100}
            width={120}
            height={50}
            text="시작점"
            className="bg-cyan-600 text-white border-cyan-800 border-2 rounded-lg text-xs cursor-pointer"
            onClick={() => {
              console.log("시작점 클릭됨");
            }}
          />

          {/* 드래그 가능한 종료 박스 */}
          <DraggableBox
            id="custom-demo-end"
            x={700}
            y={200}
            width={120}
            height={50}
            text="끝점 (드래그 가능)"
            className="bg-blue-600 text-white border-cyan-800 border-2 rounded-lg text-xs cursor-pointer"
            onClick={() => {
              console.log("끝점 클릭됨");
            }}
          />

          {/* 동적 곡선 연결선 */}
          <Connector
            fromBox={{ id: "custom-demo-start", position: "right" }}
            toBox={{ id: "custom-demo-end", position: "left" }}
            connectionType="curved"
            className="stroke-black hover:stroke-[#0066ff] transition-all duration-300"
            showArrow={true}
            strokeWidth={5}
            arrowSize={10}
            arrowColor="black"
            arrowStrokeWidth={10}
            arrowStrokeColor="black"
          />

          {/* 이모지 아이콘이 포함된 이미지 박스 */}
          <ImageBox
            id="img-test"
            x={250}
            y={300}
            width={100}
            height={60}
            text="제어장치"
            icon="⚙️"
            iconType="emoji"
            imageScale={1.2}
            imagePadding={10}
            onClick={() => {
              console.log("제어장치 클릭됨");
            }}
          />
        </DiagramProvider>
      </div>
    </div>
  );
};

export default ComprehensiveTest;
```

### 🎯 이 예제에서 확인할 수 있는 기능들

1. **컴포넌트 조합**

   - `Box`: 고정된 요소 표현
   - `DraggableBox`: 사용자 상호작용을 통한 동적 위치 변경
   - `Connector`: 박스 간의 관계 시각화
   - `ImageBox`: 이모지/아이콘을 포함한 시각적 요소

2. **동적 연결**

   - 드래그 시 연결선이 자동으로 따라 움직임
   - 실시간 위치 업데이트 및 재계산

3. **스타일링 통합**

   - TailwindCSS 클래스를 통한 스타일링
   - hover 효과 및 transition 애니메이션
   - 일관된 디자인 시스템 적용

4. **이벤트 처리**

   - 각 컴포넌트별 개별 클릭 이벤트
   - 콘솔을 통한 상호작용 확인

5. **크기 조절 기능**
   - ImageBox의 `imageScale`과 `imagePadding`을 통한 세밀한 이미지 제어
   - 다양한 크기의 박스들을 조합한 레이아웃

### 💡 활용 가이드

이 예제를 기반으로 다음과 같은 실제 애플리케이션을 구축할 수 있습니다:

- **시스템 아키텍처 다이어그램**: 각 컴포넌트가 마이크로서비스를 나타내는 경우
- **워크플로우 설계**: 프로세스의 각 단계를 박스로, 흐름을 연결선으로 표현
- **네트워크 토폴로지**: 네트워크 노드와 연결 관계 시각화
- **조직도**: 부서와 직책 간의 관계 표현
- **자동차 시스템 다이어그램**: 수소연료전지 시스템 구성 요소 간의 관계

## 고급 사용법

### 🆕 bendPoints를 활용한 복잡한 경로 설계

```jsx
// 복잡한 시스템 다이어그램에서 장애물 회피
const ComplexFlowDiagram = () => {
  return (
    <DiagramProvider>
      {/* 시작점 */}
      <Box id="source" x={50} y={100} text="데이터 소스" />

      {/* 장애물 */}
      <Box id="firewall" x={200} y={80} text="방화벽" className="bg-red-500" />
      <Box id="proxy" x={200} y={140} text="프록시" className="bg-yellow-500" />

      {/* 목적지 */}
      <Box id="target" x={400} y={100} text="타겟 서버" />

      {/* 장애물을 우회하는 복잡한 경로 */}
      <Connector
        fromBox={{ id: "source", position: "right" }}
        toBox={{ id: "target", position: "left" }}
        connectionType="custom"
        bendPoints={[
          { x: 150, y: 115 }, // 시작점에서 조금 나오기
          { x: 150, y: 50 }, // 위로 올라가서
          { x: 350, y: 50 }, // 장애물들 위로 지나가기
          { x: 350, y: 115 }, // 아래로 내려오기
        ]}
        strokeColor="#10B981"
        strokeWidth={3}
        arrowShape="diamond"
        animated={true}
      />
    </DiagramProvider>
  );
};
```

### 🆕 동적 bendPoints 계산

```jsx
// 실시간으로 bendPoints 계산하기
const DynamicBendPoints = () => {
  const [obstacles, setObstacles] = useState([{ x: 200, y: 80, width: 100, height: 40 }]);

  // 장애물을 피하는 경로 자동 계산
  const calculateBendPoints = useCallback((start, end, obstacles) => {
    const bendPoints = [];

    // 간단한 A* 알고리즘 또는 경로 찾기 로직
    const midX = (start.x + end.x) / 2;
    const obstacleTop = Math.min(...obstacles.map((o) => o.y)) - 20;

    bendPoints.push({ x: midX, y: start.y }, { x: midX, y: obstacleTop }, { x: midX, y: end.y });

    return bendPoints;
  }, []);

  const dynamicBendPoints = useMemo(
    () => calculateBendPoints({ x: 50, y: 100 }, { x: 400, y: 150 }, obstacles),
    [obstacles, calculateBendPoints]
  );

  return (
    <Connector
      fromBox={{ id: "start", position: "right" }}
      toBox={{ id: "end", position: "left" }}
      connectionType="custom"
      bendPoints={dynamicBendPoints}
      strokeColor="#3B82F6"
      strokeWidth={2}
    />
  );
};
```

### 🆕 bendPoints 문제 해결 가이드

#### 문제 1: bendPoints가 저장되지 않거나 사라짐

```jsx
// ❌ 잘못된 방법 - 빈 배열로 초기화
const [connectorProps, setConnectorProps] = useState({
  bendPoints: [], // 이렇게 하면 안됨!
  strokeWidth: 2
});

// ✅ 올바른 방법 - undefined로 유지
const [connectorProps, setConnectorProps] = useState({
  // bendPoints를 명시적으로 설정하지 않음
  strokeWidth: 2
});

// ✅ 또는 조건부로만 전달
<Connector
  {...connectorProps}
  {/* bendPoints가 있을 때만 전달 */}
  {...(bendPoints && bendPoints.length > 0 && { bendPoints })}
/>
```

#### 문제 2: custom 타입인데 bendPoints가 없어서 경고 발생

```jsx
// 브라우저 콘솔에서 확인할 수 있는 메시지들:
// ✅ "✅ bendPoints 파싱 성공: 4개 포인트"
// ⚠️ "⚠️ connectionType='custom'이지만 bendPoints가 정의되지 않았습니다. 'straight' 타입으로 fallback합니다."

// 해결 방법:
const SafeCustomConnector = ({ bendPoints, ...props }) => {
  // bendPoints가 없으면 다른 연결 타입 사용
  const safeConnectionType = (bendPoints && bendPoints.length > 0)
    ? "custom"
    : "straight";

  return (
    <Connector
      {...props}
      connectionType={safeConnectionType}
      {/* bendPoints가 유효할 때만 전달 */}
      {...(bendPoints && bendPoints.length > 0 && { bendPoints })}
    />
  );
};
```

#### 문제 3: bendPoints 좌표가 올바르지 않음

```jsx
// 좌표 검증 함수
const validateBendPoints = (points) => {
  if (!Array.isArray(points)) return false;

  return points.every(
    (point) => point && typeof point.x === "number" && typeof point.y === "number" && !isNaN(point.x) && !isNaN(point.y)
  );
};

// 사용 예시
const bendPoints = [
  { x: 100, y: 50 },
  { x: 200, y: 100 },
];

if (!validateBendPoints(bendPoints)) {
  console.error("유효하지 않은 bendPoints:", bendPoints);
}
```

### 커스텀 테마

```jsx
// 커스텀 색상 테마 정의
const drogenTheme = {
  primary: "#3B82F6", // 수소 블루
  secondary: "#10B981", // 에너지 그린
  accent: "#F59E0B", // 경고 앰버
  danger: "#EF4444", // 위험 레드
  neutral: "#6B7280", // 중성 그레이
};

// 테마 적용
<Box backgroundColor={drogenTheme.primary} borderColor={drogenTheme.primary} textColor="#FFFFFF" />;
```

### 애니메이션 체인

```jsx
// 여러 연결선의 순차적 애니메이션
const AnimatedFlow = () => {
  const [activeConnections, setActiveConnections] = useState([]);

  useEffect(() => {
    const sequence = ["conn1", "conn2", "conn3"];
    sequence.forEach((connId, index) => {
      setTimeout(() => {
        setActiveConnections((prev) => [...prev, connId]);
      }, index * 500);
    });
  }, []);

  return (
    <>
      <Connector id="conn1" animated={activeConnections.includes("conn1")} fromElementId="tank" toElementId="valve1" />
      <Connector
        id="conn2"
        animated={activeConnections.includes("conn2")}
        fromElementId="valve1"
        toElementId="engine"
      />
      {/* ... */}
    </>
  );
};
```

### 실시간 상태 동기화

```jsx
// WebSocket을 통한 실시간 상태 업데이트
const RealTimeDiagram = () => {
  const { updateElement } = useDiagram();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateElement(data.elementId, {
        props: { ...data.updates },
      });
    };

    return () => ws.close();
  }, [updateElement]);

  return <DiagramCanvas />;
};
```

### 드래그 앤 드롭 제약

```jsx
// 격자에 맞춤 + 영역 제한
<DraggableBox
  id="constrained-box"
  snapToGrid={true}
  gridSize={25}
  constrainToBounds={true}
  bounds={{
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  }}
  onPositionChange={(x, y, id) => {
    // 위치가 변경될 때마다 연결선 업데이트
    updateConnections(id, { x, y });
  }}
/>
```

---

**이 문서는 Diagram v0.2.0 기준으로 작성되었습니다.**

### 🆕 v0.2.0 새로운 기능

- **bendPoints 지원**: `connectionType="custom"`으로 복잡한 경로 생성 가능
- **자동 Box 연결**: `fromBox`/`toBox`로 DiagramProvider를 통한 자동 연결
- **고급 화살표**: 양방향, 다양한 모양(diamond, circle, square), 커스텀 색상
- **자동 Fallback**: 설정 오류 시 안전한 기본값으로 자동 전환
- **개발자 도구**: 콘솔 경고 및 디버깅 지원
- **bendPoints 유지**: 속성 변경 시에도 bendPoints 유지
- **JSX 파싱 개선**: 메타데이터에서 bendPoints 정확한 파싱

### 🔧 v0.2.0 수정사항

- **bendPoints 안정성**: Run 버튼 클릭 시에도 bendPoints 유지
- **Multiple Connections 오류 해결**: JSX 파싱에서 bendPoints 누락 문제 수정
- **성능 최적화**: 불필요한 재렌더링 방지

**Made by KIM DOWON**
