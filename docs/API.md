# 📚 HY-Diagram API Doc

## 목차

- [Box 컴포넌트](#box-컴포넌트)
- [Connector 컴포넌트](#connector-컴포넌트)
- [Triangle 컴포넌트](#triangle-컴포넌트)
- [Valve 컴포넌트](#valve-컴포넌트)
- [ImageBox 컴포넌트](#imagebox-컴포넌트)
- [Arrow 컴포넌트](#arrow-컴포넌트)
- [Line 컴포넌트](#line-컴포넌트)

---

## Box 컴포넌트

시스템의 각 구성요소를 나타내는 박스 컴포넌트입니다.

### Props

| 속성              | 타입       | 기본값      | 필수 | 설명                      |
| ----------------- | ---------- | ----------- | ---- | ------------------------- |
| `x`               | `number`   | `0`         | ❌   | X 좌표 위치               |
| `y`               | `number`   | `0`         | ❌   | Y 좌표 위치               |
| `width`           | `number`   | `120`       | ❌   | 박스의 너비               |
| `height`          | `number`   | `60`        | ❌   | 박스의 높이               |
| `text`            | `string`   | `""`        | ❌   | 박스 내부에 표시할 텍스트 |
| `backgroundColor` | `string`   | `"#3B82F6"` | ❌   | 박스 배경색 (HEX 코드)    |
| `textColor`       | `string`   | `"#FFFFFF"` | ❌   | 텍스트 색상 (HEX 코드)    |
| `borderColor`     | `string`   | `"#1E40AF"` | ❌   | 테두리 색상 (HEX 코드)    |
| `borderWidth`     | `number`   | `2`         | ❌   | 테두리 두께 (픽셀)        |
| `borderRadius`    | `number`   | `8`         | ❌   | 모서리 둥글기 (픽셀)      |
| `fontSize`        | `number`   | `14`        | ❌   | 폰트 크기 (픽셀)          |
| `className`       | `string`   | `""`        | ❌   | 추가 CSS 클래스           |
| `onClick`         | `function` | `null`      | ❌   | 클릭 이벤트 핸들러        |
| `onDrag`          | `function` | `null`      | ❌   | 드래그 이벤트 핸들러      |

### 이벤트

#### onClick

```typescript
onClick?: (event: MouseEvent, boxInfo: BoxInfo) => void

interface BoxInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### 연결점

Box 컴포넌트는 자동으로 4개의 연결점을 생성합니다:

- `top`: 상단 중앙
- `right`: 우측 중앙
- `bottom`: 하단 중앙
- `left`: 좌측 중앙

### 사용 예제

```jsx
// 기본 사용법
<Box
  x={100}
  y={50}
  width={120}
  height={60}
  text="수소탱크"
/>

// 커스텀 스타일링
<Box
  x={100}
  y={50}
  width={150}
  height={80}
  text="압력조절기"
  backgroundColor="#10B981"
  textColor="#FFFFFF"
  borderColor="#059669"
  borderWidth={3}
  borderRadius={12}
  fontSize={16}
/>

// 이벤트 처리
<Box
  x={100}
  y={50}
  text="클릭 가능한 박스"
  onClick={(event, boxInfo) => {
    console.log('박스 클릭됨:', boxInfo);
  }}
/>
```

---

## Connector 컴포넌트

컴포넌트들을 연결하는 다양한 형태의 선을 그리는 컴포넌트입니다. 좌표 기반 연결과 박스 ID 기반 연결을 모두 지원합니다.

### Props

#### 🎯 박스 연결 방식 (권장)

| 속성      | 타입     | 기본값 | 필수 | 설명                          |
| --------- | -------- | ------ | ---- | ----------------------------- |
| `fromBox` | `BoxRef` | -      | ✅\* | 시작 박스 정보 (박스 연결 시) |
| `toBox`   | `BoxRef` | -      | ✅\* | 도착 박스 정보 (박스 연결 시) |

```typescript
interface BoxRef {
  id: string; // 박스 ID
  position: ConnectionPosition; // 연결 위치
  offset?: Point; // 추가 오프셋 (선택사항)
}

type ConnectionPosition = "top" | "right" | "bottom" | "left" | "center";

interface Point {
  x: number;
  y: number;
}
```

#### 📍 좌표 연결 방식 (기존)

| 속성         | 타입    | 기본값 | 필수 | 설명        |
| ------------ | ------- | ------ | ---- | ----------- |
| `startPoint` | `Point` | -      | ✅\* | 시작점 좌표 |
| `endPoint`   | `Point` | -      | ✅\* | 끝점 좌표   |

#### ⚙️ 연결 설정

| 속성                  | 타입                  | 기본값       | 필수 | 설명                    |
| --------------------- | --------------------- | ------------ | ---- | ----------------------- |
| `connectionType`      | `ConnectionType`      | `"straight"` | ❌   | 연결 타입               |
| `orthogonalDirection` | `OrthogonalDirection` | `"auto"`     | ❌   | 직교 연결 방향          |
| `stepOffset`          | `number`              | `50`         | ❌   | 직교 연결 중간점 오프셋 |
| `bendPoints`          | `Point[]`             | `[]`         | ❌   | 커스텀 경로 점들        |
| `cornerRadius`        | `number`              | `0`          | ❌   | 모서리 둥글기           |

#### 🎨 스타일링

| 속성          | 타입      | 기본값                                                               | 필수 | 설명            |
| ------------- | --------- | -------------------------------------------------------------------- | ---- | --------------- |
| `strokeWidth` | `number`  | `2`                                                                  | ❌   | 선 두께         |
| `className`   | `string`  | `"text-gray-500 hover:text-gray-600 transition-colors duration-200"` | ❌   | CSS 클래스      |
| `animated`    | `boolean` | `false`                                                              | ❌   | 애니메이션 효과 |

#### 🏹 화살표 설정

| 속성             | 타입      | 기본값  | 필수 | 설명                    |
| ---------------- | --------- | ------- | ---- | ----------------------- |
| `showArrow`      | `boolean` | `true`  | ❌   | 끝점 화살표 표시 여부   |
| `showStartArrow` | `boolean` | `false` | ❌   | 시작점 화살표 표시 여부 |
| `arrowSize`      | `number`  | `8`     | ❌   | 화살표 크기             |

_\* fromBox/toBox 또는 startPoint/endPoint 중 하나는 필수입니다._

### 타입 정의

```typescript
type ConnectionType = "straight" | "orthogonal" | "curved" | "stepped" | "custom" | "auto";

type OrthogonalDirection = "horizontal-first" | "vertical-first" | "auto";
```

### 연결 타입별 상세 설명

#### 1. straight - 직선 연결

시작점과 끝점을 직선으로 연결합니다.

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 50 }} connectionType="straight" />
```

#### 2. orthogonal - 직교 연결

직각으로 꺾이는 L자형 연결선을 그립니다.

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 150 }}
  connectionType="orthogonal"
  orthogonalDirection="horizontal-first"
  stepOffset={50}
/>
```

**orthogonalDirection 옵션:**

- `horizontal-first`: 수평 → 수직 순서
- `vertical-first`: 수직 → 수평 순서
- `auto`: 자동 선택

#### 3. curved - 곡선 연결

부드러운 베지어 곡선으로 연결합니다.

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 150 }} connectionType="curved" />
```

#### 4. stepped - 계단식 연결

계단 모양의 연결선을 그립니다.

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 150 }} connectionType="stepped" />
```

#### 5. custom - 커스텀 경로

사용자가 정의한 경로점들을 따라 연결선을 그립니다.

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 150 }}
  connectionType="custom"
  bendPoints={[
    { x: 150, y: 50 },
    { x: 150, y: 100 },
    { x: 250, y: 100 },
  ]}
/>
```

#### 6. auto - 자동 선택 (박스 연결 전용)

박스들의 위치를 분석하여 최적의 연결 방식을 자동으로 선택합니다.

```jsx
<Connector fromBox={{ id: "box1", position: "right" }} toBox={{ id: "box2", position: "left" }} connectionType="auto" />
```

### 박스 연결 사용법

#### 기본 박스 연결

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  connectionType="straight"
/>
```

#### 오프셋을 사용한 미세 조정

```jsx
<Connector
  fromBox={{
    id: "box1",
    position: "right",
    offset: { x: 10, y: -5 },
  }}
  toBox={{
    id: "box2",
    position: "left",
    offset: { x: -10, y: 5 },
  }}
/>
```

#### 센터 연결

```jsx
<Connector
  fromBox={{ id: "box1", position: "center" }}
  toBox={{ id: "box2", position: "center" }}
  connectionType="straight"
  showArrow={false}
  className="text-red-500"
/>
```

### 고급 기능

#### 애니메이션

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 50 }}
  connectionType="straight"
  animated={true}
  className="text-emerald-500"
/>
```

#### 양방향 화살표

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  showArrow={true}
  showStartArrow={true}
  arrowSize={10}
  className="text-blue-500"
/>
```

#### 모서리 둥글기

```jsx
<Connector
  fromBox={{ id: "box1", position: "bottom" }}
  toBox={{ id: "box2", position: "top" }}
  connectionType="orthogonal"
  cornerRadius={10}
/>
```

### 💡 사용팁

#### 1. 연결 방식 선택

- **박스 연결**: 컴포넌트 간 연결 시 권장 (자동 업데이트)
- **좌표 연결**: 고정된 위치나 세밀한 제어가 필요할 때 사용

#### 2. connectionType 선택 가이드

- `straight`: 단순한 직선 연결
- `curved`: 부드러운 시각적 효과가 필요할 때
- `orthogonal`: 복잡한 다이어그램에서 가독성 향상
- `auto`: 박스 연결 시 최적의 경로 자동 선택
- `custom`: 장애물 회피나 특별한 경로가 필요할 때

#### 3. 성능 최적화

- 애니메이션은 시각적 효과는 좋지만 많은 연결선에서는 성능에 영향
- 복잡한 다이어그램에서는 `connectionType="orthogonal"`이 가독성에 좋음
- `strokeWidth`는 1-4 범위에서 사용 권장

#### 4. 스타일링 팁

- `className`을 통해 Tailwind CSS 클래스 적용 가능
- 호버 효과와 트랜지션으로 상호작용성 향상
- 색상별로 연결 유형을 구분하여 시각적 구조화

#### 5. 박스 연결 시 주의사항

- 반드시 `DiagramProvider`로 감싸서 사용
- 박스 ID가 실제로 존재하는지 확인
- 박스가 이동하면 연결선도 자동으로 업데이트됨

#### 6. 오프셋 활용

- 여러 연결선이 같은 점에서 시작/끝날 때 오프셋으로 분산
- 박스 크기를 고려한 적절한 오프셋 값 설정
- 음수 오프셋으로 연결점을 안쪽으로 이동 가능

#### 7. 디버깅 팁

- 개발자 도구에서 SVG 요소 검사하여 경로 확인
- `console.log`로 박스 정보와 연결점 좌표 확인
- 연결이 안 되면 박스 ID와 position 값 재확인

---

## Triangle 컴포넌트

방향 표시나 밸브 등에 사용되는 삼각형 컴포넌트입니다.

### Props

| 속성          | 타입        | 기본값      | 필수 | 설명        |
| ------------- | ----------- | ----------- | ---- | ----------- |
| `x`           | `number`    | `0`         | ❌   | X 좌표      |
| `y`           | `number`    | `0`         | ❌   | Y 좌표      |
| `size`        | `number`    | `20`        | ❌   | 삼각형 크기 |
| `direction`   | `Direction` | `"up"`      | ❌   | 방향        |
| `color`       | `string`    | `"#6B7280"` | ❌   | 색상        |
| `filled`      | `boolean`   | `true`      | ❌   | 채움 여부   |
| `strokeWidth` | `number`    | `2`         | ❌   | 테두리 두께 |

### 타입 정의

```typescript
type Direction = "up" | "down" | "left" | "right";
```

### 사용 예제

```jsx
// 기본 삼각형
<Triangle
  x={100}
  y={50}
  size={30}
  direction="right"
/>

// 빈 삼각형
<Triangle
  x={100}
  y={50}
  size={30}
  direction="up"
  filled={false}
  color="#EF4444"
  strokeWidth={3}
/>
```

---

## Valve 컴포넌트

다양한 타입의 밸브를 표현하는 컴포넌트입니다.

### Props

| 속성          | 타입        | 기본값      | 필수 | 설명           |
| ------------- | ----------- | ----------- | ---- | -------------- |
| `x`           | `number`    | `0`         | ❌   | X 좌표         |
| `y`           | `number`    | `0`         | ❌   | Y 좌표         |
| `size`        | `number`    | `30`        | ❌   | 밸브 크기      |
| `type`        | `ValveType` | `"gate"`    | ❌   | 밸브 타입      |
| `isOpen`      | `boolean`   | `true`      | ❌   | 열림/닫힘 상태 |
| `color`       | `string`    | `"#6B7280"` | ❌   | 색상           |
| `strokeWidth` | `number`    | `2`         | ❌   | 선 두께        |

### 타입 정의

```typescript
type ValveType = "gate" | "ball" | "check" | "butterfly";
```

### 밸브 타입별 설명

- **gate**: 게이트 밸브 - 일반적인 개폐 밸브
- **ball**: 볼 밸브 - 구형 밸브
- **check**: 체크 밸브 - 역류 방지 밸브
- **butterfly**: 버터플라이 밸브 - 나비형 밸브

### 사용 예제

```jsx
// 게이트 밸브 (열림)
<Valve
  x={100}
  y={50}
  size={40}
  type="gate"
  isOpen={true}
  color="#10B981"
/>

// 체크 밸브 (닫힘)
<Valve
  x={200}
  y={50}
  size={35}
  type="check"
  isOpen={false}
  color="#EF4444"
/>
```

---

## ImageBox 컴포넌트

이미지나 아이콘을 표시하는 컴포넌트입니다.

### Props

| 속성           | 타입     | 기본값      | 필수 | 설명          |
| -------------- | -------- | ----------- | ---- | ------------- |
| `x`            | `number` | `0`         | ❌   | X 좌표        |
| `y`            | `number` | `0`         | ❌   | Y 좌표        |
| `width`        | `number` | `60`        | ❌   | 너비          |
| `height`       | `number` | `60`        | ❌   | 높이          |
| `imageUrl`     | `string` | `""`        | ❌   | 이미지 URL    |
| `altText`      | `string` | `"Image"`   | ❌   | 대체 텍스트   |
| `borderColor`  | `string` | `"#D1D5DB"` | ❌   | 테두리 색상   |
| `borderWidth`  | `number` | `1`         | ❌   | 테두리 두께   |
| `borderRadius` | `number` | `4`         | ❌   | 모서리 둥글기 |

### 사용 예제

```jsx
// 이미지 표시
<ImageBox
  x={100}
  y={50}
  width={80}
  height={80}
  imageUrl="/images/compressor.png"
  altText="수소 압축기"
  borderColor="#10B981"
  borderWidth={2}
/>

// SVG 아이콘
<ImageBox
  x={100}
  y={50}
  width={60}
  height={60}
  imageUrl="data:image/svg+xml,<svg>...</svg>"
  altText="압력 센서"
/>
```

---

## Arrow 컴포넌트

방향성을 가진 화살표 선 컴포넌트입니다.

### Props

| 속성          | 타입             | 기본값      | 필수 | 설명          |
| ------------- | ---------------- | ----------- | ---- | ------------- |
| `startX`      | `number`         | `0`         | ❌   | 시작점 X 좌표 |
| `startY`      | `number`         | `0`         | ❌   | 시작점 Y 좌표 |
| `endX`        | `number`         | `100`       | ❌   | 끝점 X 좌표   |
| `endY`        | `number`         | `0`         | ❌   | 끝점 Y 좌표   |
| `direction`   | `ArrowDirection` | `"right"`   | ❌   | 화살표 방향   |
| `color`       | `string`         | `"#6B7280"` | ❌   | 색상          |
| `strokeWidth` | `number`         | `2`         | ❌   | 선 두께       |
| `arrowSize`   | `number`         | `8`         | ❌   | 화살표 크기   |

### 타입 정의

```typescript
type ArrowDirection = "up" | "down" | "left" | "right" | "up-right" | "up-left" | "down-right" | "down-left";
```

### 사용 예제

```jsx
// 수평 화살표
<Arrow
  startX={100}
  startY={50}
  endX={200}
  endY={50}
  direction="right"
  color="#3B82F6"
/>

// 대각선 화살표
<Arrow
  startX={100}
  startY={50}
  endX={200}
  endY={100}
  direction="down-right"
  strokeWidth={3}
  arrowSize={12}
/>
```

---

## Line 컴포넌트

단순한 연결선 컴포넌트입니다.

### Props

| 속성          | 타입       | 기본값       | 필수 | 설명          |
| ------------- | ---------- | ------------ | ---- | ------------- |
| `startX`      | `number`   | `0`          | ❌   | 시작점 X 좌표 |
| `startY`      | `number`   | `0`          | ❌   | 시작점 Y 좌표 |
| `endX`        | `number`   | `100`        | ❌   | 끝점 X 좌표   |
| `endY`        | `number`   | `0`          | ❌   | 끝점 Y 좌표   |
| `color`       | `string`   | `"#6B7280"`  | ❌   | 선 색상       |
| `strokeWidth` | `number`   | `2`          | ❌   | 선 두께       |
| `dashArray`   | `string`   | `""`         | ❌   | 점선 패턴     |
| `lineType`    | `LineType` | `"straight"` | ❌   | 선 타입       |

### 타입 정의

```typescript
type LineType = "straight" | "curved" | "stepped";
```

### 사용 예제

```jsx
// 직선
<Line
  startX={100}
  startY={50}
  endX={200}
  endY={100}
  color="#6B7280"
  strokeWidth={2}
/>

// 점선
<Line
  startX={100}
  startY={50}
  endX={200}
  endY={50}
  dashArray="5,5"
  color="#9CA3AF"
/>

// 곡선
<Line
  startX={100}
  startY={50}
  endX={200}
  endY={100}
  lineType="curved"
  strokeWidth={3}
/>
```

---

## 공통 유틸리티

### 색상 팔레트

라이브러리에서 권장하는 색상 팔레트입니다:

```javascript
const colors = {
  primary: "#3B82F6", // 파란색
  success: "#10B981", // 초록색
  warning: "#F59E0B", // 주황색
  danger: "#EF4444", // 빨간색
  purple: "#8B5CF6", // 보라색
  pink: "#EC4899", // 분홍색
  teal: "#14B8A6", // 청록색
  gray: "#6B7280", // 회색
};
```

### 접근성 가이드라인

- 모든 컴포넌트는 키보드 탐색을 지원합니다
- ARIA 라벨이 자동으로 적용됩니다
- 색상 대비는 WCAG 2.1 AA 기준을 준수합니다
- 스크린 리더와 호환됩니다

### 성능 최적화 팁

1. **메모이제이션**: 복잡한 다이어그램에서는 `React.memo` 사용
2. **가상화**: 많은 컴포넌트가 있을 때 가상 스크롤링 고려
3. **SVG 최적화**: 복잡한 경로는 단순화하여 성능 향상
4. **이벤트 위임**: 많은 클릭 이벤트가 있을 때 이벤트 위임 사용

---

이 API Doc는 Diagram 라이브러리의 모든 컴포넌트와 기능을 상세히 설명합니다. 추가 질문이나 예제가 필요하시면 언제든 문의해주세요.
