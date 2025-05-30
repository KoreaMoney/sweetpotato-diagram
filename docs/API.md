# 📚 HY-Diagram API 문서

현대자동차 다이어그램 컴포넌트 라이브러리의 상세 API 문서입니다.

## 📋 목차

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
- [TypeScript 타입 정의](#typescript-타입-정의)
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

```typescript
onClick?: (event: MouseEvent, boxInfo: BoxInfo) => void

interface BoxInfo {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}
```

#### 사용 예시

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
  onClick={(event, boxInfo) => {
    console.log("박스 클릭됨:", boxInfo);
  }}
  onMouseEnter={() => console.log("마우스 진입")}
  className="hover:shadow-lg transition-all duration-300"
/>;
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

```typescript
onPositionChange?: (newX: number, newY: number, elementId: string) => void
```

##### onDragStart / onDragEnd

```typescript
onDragStart?: (event: DragEvent, elementId: string) => void
onDragEnd?: (event: DragEvent, elementId: string, position: Position) => void

interface Position {
  x: number;
  y: number;
}
```

#### 사용 예시

```jsx
import { DraggableBox } from "@/components/DiagramComponents";

<DraggableBox
  id="draggable-component"
  initialX={100}
  initialY={100}
  text="드래그 가능한 박스"
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
/>;
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

```jsx
import { ImageBox } from "@/components/DiagramComponents";

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
  borderColor="#10B981"
  borderWidth={2}
  objectFit="contain"
  onClick={(event, info) => console.log("이미지 박스 클릭", info)}
/>;
```

---

## 연결 컴포넌트

### Connector 컴포넌트

컴포넌트들을 연결하는 지능형 연결선입니다. 양방향 연결과 다양한 연결 타입을 지원합니다.

#### Props

| 속성             | 타입      | 기본값       | 필수 | 설명             |
| ---------------- | --------- | ------------ | ---- | ---------------- |
| `fromElementId`  | `string`  | `""`         | ❌   | 시작 요소 ID     |
| `toElementId`    | `string`  | `""`         | ❌   | 끝 요소 ID       |
| `fromPosition`   | `string`  | `"center"`   | ❌   | 시작점 위치      |
| `toPosition`     | `string`  | `"center"`   | ❌   | 끝점 위치        |
| `strokeColor`    | `string`  | `"#6B7280"`  | ❌   | 선 색상          |
| `strokeWidth`    | `number`  | `2`          | ❌   | 선 두께          |
| `connectionType` | `string`  | `"straight"` | ❌   | 연결 타입        |
| `bidirectional`  | `boolean` | `false`      | ❌   | 양방향 연결 여부 |
| `animated`       | `boolean` | `false`      | ❌   | 애니메이션 효과  |
| `dashArray`      | `string`  | `""`         | ❌   | 점선 패턴        |
| `showArrow`      | `boolean` | `true`       | ❌   | 화살표 표시 여부 |
| `arrowSize`      | `number`  | `8`          | ❌   | 화살표 크기      |
| `label`          | `string`  | `""`         | ❌   | 연결선 라벨      |
| `labelPosition`  | `string`  | `"middle"`   | ❌   | 라벨 위치        |
| `offset`         | `object`  | `{x:0,y:0}`  | ❌   | 위치 오프셋      |

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
- `"bezier"` - 베지어 곡선

#### 사용 예시

```jsx
import { Connector } from '@/components/DiagramComponents';

// 기본 연결
<Connector
  fromElementId="source-box"
  toElementId="target-box"
  strokeColor="#10B981"
  strokeWidth={3}
  showArrow={true}
/>

// 양방향 애니메이션 연결
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

// 곡선 점선 연결
<Connector
  fromElementId="sensor"
  toElementId="controller"
  connectionType="curved"
  dashArray="5,5"
  strokeColor="#EF4444"
  strokeWidth={2}
  showArrow={true}
  arrowSize={12}
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

## TypeScript 타입 정의

### 기본 타입들

```typescript
// 위치 정보
interface Position {
  x: number;
  y: number;
}

// 크기 정보
interface Size {
  width: number;
  height: number;
}

// 색상 정보
interface Color {
  primary: string;
  secondary?: string;
  accent?: string;
}

// 다이어그램 요소
interface DiagramElement {
  id: string;
  type: "box" | "valve" | "triangle" | "image";
  position: Position;
  size: Size;
  props: Record<string, any>;
  metadata?: Record<string, any>;
}

// 연결 정보
interface Connection {
  id: string;
  fromElementId: string;
  toElementId: string;
  fromPosition: ConnectionPosition;
  toPosition: ConnectionPosition;
  style: ConnectionStyle;
  metadata?: Record<string, any>;
}

// 연결 위치
type ConnectionPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

// 연결 스타일
interface ConnectionStyle {
  strokeColor: string;
  strokeWidth: number;
  connectionType: "straight" | "orthogonal" | "curved" | "stepped" | "bezier";
  dashArray?: string;
  animated?: boolean;
  bidirectional?: boolean;
}

// 밸브 상태
type ValveStatus = "normal" | "warning" | "error" | "maintenance";
type ValveType = "gate" | "ball" | "check" | "butterfly" | "needle" | "safety";

// 이벤트 핸들러 타입들
type ElementClickHandler = (event: MouseEvent, elementInfo: any) => void;
type PositionChangeHandler = (newX: number, newY: number, elementId: string) => void;
type CodeChangeHandler = (newCode: string) => void;
```

### 컴포넌트 Props 타입들

```typescript
// Box 컴포넌트
interface BoxProps {
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  fontSize?: number;
  className?: string;
  onClick?: ElementClickHandler;
  onDoubleClick?: ElementClickHandler;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Connector 컴포넌트
interface ConnectorProps {
  fromElementId?: string;
  toElementId?: string;
  fromPosition?: ConnectionPosition;
  toPosition?: ConnectionPosition;
  strokeColor?: string;
  strokeWidth?: number;
  connectionType?: ConnectionStyle["connectionType"];
  bidirectional?: boolean;
  animated?: boolean;
  dashArray?: string;
  showArrow?: boolean;
  arrowSize?: number;
  label?: string;
  labelPosition?: "start" | "middle" | "end";
  offset?: Position;
}

// Valve 컴포넌트
interface ValveProps {
  id?: string;
  x?: number;
  y?: number;
  size?: number;
  type?: ValveType;
  isOpen?: boolean;
  color?: string;
  showStatus?: boolean;
  status?: ValveStatus;
  showIcon?: boolean;
  iconPosition?: string;
  customIcon?: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
  onClick?: ElementClickHandler;
}
```

---

## 고급 사용법

### 커스텀 테마

```jsx
// 커스텀 색상 테마 정의
const hydrogenTheme = {
  primary: "#3B82F6", // 수소 블루
  secondary: "#10B981", // 에너지 그린
  accent: "#F59E0B", // 경고 앰버
  danger: "#EF4444", // 위험 레드
  neutral: "#6B7280", // 중성 그레이
};

// 테마 적용
<Box backgroundColor={hydrogenTheme.primary} borderColor={hydrogenTheme.primary} textColor="#FFFFFF" />;
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

**이 문서는 HY-Diagram v0.0.1 기준으로 작성되었습니다.**

마지막 업데이트: 2024년 12월

**Made with ❤️ by SweetPotato Team**
