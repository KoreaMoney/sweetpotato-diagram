# 🔗 Diagram - 다이어그램 컴포넌트 라이브러리

회로도 설계를 위한 재사용 가능한 다이어그램 컴포넌트 라이브러리입니다.

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

브라우저에서 `http://localhost:5174/`로 접속하여 데모를 확인하세요.

## 📦 컴포넌트 목록

### 1. Box - 네모박스 컴포넌트

시스템의 각 구성요소를 나타내는 박스 컴포넌트입니다.

```jsx
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
/>
```

#### Props

| 속성              | 타입     | 기본값    | 설명                             |
| ----------------- | -------- | --------- | -------------------------------- |
| `id` ⭐           | string   | ""        | 박스 식별자 (Connector에서 사용) |
| `x`               | number   | 0         | X 좌표                           |
| `y`               | number   | 0         | Y 좌표                           |
| `width`           | number   | 120       | 너비                             |
| `height`          | number   | 60        | 높이                             |
| `text`            | string   | ""        | 표시할 텍스트                    |
| `backgroundColor` | string   | "#3B82F6" | 배경색                           |
| `textColor`       | string   | "#FFFFFF" | 텍스트 색상                      |
| `borderColor`     | string   | "#1E40AF" | 테두리 색상                      |
| `borderWidth`     | number   | 2         | 테두리 두께                      |
| `borderRadius`    | number   | 8         | 모서리 둥글기                    |
| `fontSize`        | number   | 14        | 폰트 크기                        |
| `onClick`         | function | null      | 클릭 이벤트 핸들러               |

### 2. Connector - 연결선 컴포넌트

컴포넌트들을 연결하는 다양한 형태의 선을 그립니다. **새로운 박스 연결 방식을 지원합니다!**

#### 🎯 새로운 박스 연결 방식 (권장)

박스 ID와 연결 위치를 지정하여 더 직관적으로 연결할 수 있습니다:

```jsx
<Connector
  fromBox={{ id: "box1", position: "right" }}
  toBox={{ id: "box2", position: "left" }}
  boxes={[
    { id: "box1", x: 50, y: 50, width: 80, height: 30 },
    { id: "box2", x: 200, y: 100, width: 80, height: 30 },
  ]}
  connectionType="auto"
  color="#3B82F6"
  showArrow={true}
  strokeWidth={2}
/>
```

#### 기존 좌표 방식

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 150 }}
  connectionType="orthogonal"
  color="#3B82F6"
  showArrow={true}
  strokeWidth={2}
  animated={false}
/>
```

#### Props

| 속성                      | 타입    | 기본값     | 설명                                                            |
| ------------------------- | ------- | ---------- | --------------------------------------------------------------- |
| **새로운 박스 연결 방식** |         |            |                                                                 |
| `fromBox` ⭐              | object  | null       | 시작 박스 { id, position, offset? }                             |
| `toBox` ⭐                | object  | null       | 도착 박스 { id, position, offset? }                             |
| `boxes` ⭐                | array   | []         | 모든 박스 정보 배열 [{ id, x, y, w, h }]                        |
| **기존 좌표 방식**        |         |            |                                                                 |
| `startPoint`              | object  | null       | 시작점 {x, y}                                                   |
| `endPoint`                | object  | null       | 끝점 {x, y}                                                     |
| **연결 설정**             |         |            |                                                                 |
| `connectionType`          | string  | "straight" | 연결 타입 (straight, orthogonal, curved, stepped, custom, auto) |
| `color`                   | string  | "#6B7280"  | 선 색상                                                         |
| `showArrow`               | boolean | true       | 화살표 표시 여부                                                |
| `strokeWidth`             | number  | 2          | 선 두께                                                         |
| `animated`                | boolean | false      | 애니메이션 효과                                                 |
| `dashArray`               | string  | ""         | 점선 패턴                                                       |

#### 박스 연결 위치 (position)

- `"top"` - 상단 중앙
- `"right"` - 우측 중앙
- `"bottom"` - 하단 중앙
- `"left"` - 좌측 중앙
- `"center"` - 박스 중앙

#### 오프셋 (offset)

연결점에서 추가로 이동할 거리를 지정할 수 있습니다:

```jsx
fromBox={{ id: "box1", position: "right", offset: { x: 10, y: -5 } }}
```

#### 연결 타입 (connectionType)

##### 1. straight - 직선 연결

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 50 }} connectionType="straight" />
```

##### 2. orthogonal - 직교 연결 (L자형)

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 150 }}
  connectionType="orthogonal"
  orthogonalDirection="horizontal-first"
  stepOffset={50}
/>
```

##### 3. curved - 곡선 연결

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 150 }} connectionType="curved" />
```

##### 4. stepped - 계단식 연결

```jsx
<Connector startPoint={{ x: 100, y: 50 }} endPoint={{ x: 300, y: 150 }} connectionType="stepped" />
```

##### 5. custom - 커스텀 경로

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

### 3. Triangle - 삼각형 컴포넌트

방향 표시나 밸브 등에 사용되는 삼각형 컴포넌트입니다.

```jsx
<Triangle x={100} y={50} size={30} direction="right" color="#EF4444" filled={true} />
```

### 4. Valve - 밸브 컴포넌트

다양한 타입의 밸브를 표현하는 컴포넌트입니다.

```jsx
<Valve x={100} y={50} size={40} type="gate" isOpen={true} color="#F59E0B" />
```

#### 밸브 타입

- `gate` - 게이트 밸브
- `ball` - 볼 밸브
- `check` - 체크 밸브
- `butterfly` - 버터플라이 밸브

### 5. ImageBox - 이미지/아이콘 박스

이미지나 아이콘을 표시하는 컴포넌트입니다.

```jsx
<ImageBox
  x={100}
  y={50}
  width={80}
  height={80}
  imageUrl="/path/to/image.png"
  altText="수소 압축기"
  borderColor="#10B981"
/>
```

### 6. Arrow - 화살표 선

방향성을 가진 화살표 선 컴포넌트입니다.

```jsx
<Arrow startX={100} startY={50} endX={200} endY={50} direction="right" color="#3B82F6" strokeWidth={3} />
```

### 7. Line - 일반 선

단순한 연결선 컴포넌트입니다.

```jsx
<Line startX={100} startY={50} endX={200} endY={100} color="#6B7280" strokeWidth={2} dashArray="5,5" />
```

## 🎨 사용 예제

### 기본 시스템 다이어그램

```jsx
import { Box, Connector, Valve, Triangle } from "./components/DiagramComponents";

const SystemDiagram = () => {
  return (
    <div className="relative w-full h-96 bg-gray-50">
      {/* 수소 탱크 */}
      <Box x={50} y={100} width={100} height={60} text="수소탱크" backgroundColor="#3B82F6" />

      {/* 압축기 */}
      <Box x={250} y={100} width={100} height={60} text="압축기" backgroundColor="#10B981" />

      {/* 연결선 */}
      <Connector
        startPoint={{ x: 150, y: 130 }}
        endPoint={{ x: 250, y: 130 }}
        connectionType="straight"
        color="#3B82F6"
        showArrow={true}
      />

      {/* 밸브 */}
      <Valve x={200} y={115} size={30} type="gate" isOpen={true} />
    </div>
  );
};
```

### 복잡한 수소연료전지 시스템

```jsx
const HydrogenFuelCellSystem = () => {
  return (
    <div className="relative w-full h-screen bg-gray-50">
      {/* 수소 공급 시스템 */}
      <Box x={50} y={100} width={120} height={60} text="수소탱크" backgroundColor="#3B82F6" />
      <Box x={250} y={100} width={120} height={60} text="압력조절기" backgroundColor="#10B981" />
      <Box x={450} y={100} width={120} height={60} text="연료전지스택" backgroundColor="#F59E0B" />

      {/* 공기 공급 시스템 */}
      <Box x={50} y={250} width={120} height={60} text="에어필터" backgroundColor="#8B5CF6" />
      <Box x={250} y={250} width={120} height={60} text="블로워" backgroundColor="#EC4899" />

      {/* 연결선들 */}
      <Connector
        startPoint={{ x: 170, y: 130 }}
        endPoint={{ x: 250, y: 130 }}
        connectionType="straight"
        color="#3B82F6"
        showArrow={true}
      />

      <Connector
        startPoint={{ x: 370, y: 130 }}
        endPoint={{ x: 450, y: 130 }}
        connectionType="orthogonal"
        color="#10B981"
        showArrow={true}
      />

      <Connector
        startPoint={{ x: 170, y: 280 }}
        endPoint={{ x: 250, y: 280 }}
        connectionType="curved"
        color="#8B5CF6"
        showArrow={true}
      />

      {/* 공기 공급 라인 */}
      <Connector
        startPoint={{ x: 370, y: 280 }}
        endPoint={{ x: 510, y: 160 }}
        connectionType="custom"
        bendPoints={[
          { x: 400, y: 280 },
          { x: 400, y: 200 },
          { x: 510, y: 200 },
        ]}
        color="#EC4899"
        showArrow={true}
      />
    </div>
  );
};
```

## 🛠️ 고급 기능

### 애니메이션 효과

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 50 }}
  connectionType="straight"
  animated={true}
  color="#14B8A6"
/>
```

### 점선 패턴

```jsx
<Connector
  startPoint={{ x: 100, y: 50 }}
  endPoint={{ x: 300, y: 50 }}
  connectionType="straight"
  dashArray="5,5"
  color="#6B7280"
/>
```

### 이벤트 처리

```jsx
<Box
  x={100}
  y={50}
  width={120}
  height={60}
  text="클릭 가능한 박스"
  onClick={(event, boxInfo) => {
    console.log("박스 클릭됨:", boxInfo);
    // 추가 로직 처리
  }}
/>
```

## 🎯 실시간 코드 에디터

프로젝트에는 실시간으로 코드를 수정하고 결과를 확인할 수 있는 인터랙티브 에디터가 포함되어 있습니다.

1. 브라우저에서 "Connector 예제" 탭 클릭
2. 하단의 코드 에디터에서 JSX 코드 수정
3. 실시간으로 오른쪽 미리보기에서 결과 확인
4. 빠른 예제 버튼으로 다양한 타입 시도

## 📁 프로젝트 구조

```
hy-diagram/
├── src/
│   ├── components/
│   │   ├── DiagramComponents/
│   │   │   ├── index.js          # 모든 컴포넌트 export
│   │   │   ├── Box.jsx           # 박스 컴포넌트
│   │   │   ├── Connector.jsx     # 연결선 컴포넌트
│   │   │   ├── Triangle.jsx      # 삼각형 컴포넌트
│   │   │   ├── Valve.jsx         # 밸브 컴포넌트
│   │   │   ├── ImageBox.jsx      # 이미지박스 컴포넌트
│   │   │   ├── Arrow.jsx         # 화살표 컴포넌트
│   │   │   └── Line.jsx          # 선 컴포넌트
│   │   ├── DiagramDemo.jsx       # 수소연료전지 데모
│   │   └── ConnectorExamples.jsx # 인터랙티브 예제
│   ├── Diagram.jsx               # 메인 컴포넌트
│   └── main.jsx                  # 앱 진입점
├── package.json
└── README.md
```

## 🔧 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **TailwindCSS** - 스타일링
- **SVG** - 벡터 그래픽

## 🎨 디자인 원칙

### SOLID 원칙 적용

- **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 역할
- **개방-폐쇄 원칙**: 확장에는 열려있고 수정에는 닫혀있음
- **리스코프 치환 원칙**: 파생 클래스는 기본 클래스를 대체 가능
- **인터페이스 분리 원칙**: 클라이언트는 사용하지 않는 인터페이스에 의존하지 않음
- **의존성 역전 원칙**: 고수준 모듈은 저수준 모듈에 의존하지 않음

### 접근성 (Accessibility)

- 모든 인터랙티브 요소에 ARIA 라벨 제공
- 키보드 탐색 지원 (Tab, Enter, Space)
- 적절한 색상 대비
- 스크린 리더 호환성

### 성능 최적화

- React.memo를 통한 불필요한 리렌더링 방지
- useMemo, useCallback을 통한 계산 최적화
- 가벼운 SVG 기반 렌더링

## 🚀 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 있거나 질문이 있으시면 이슈를 생성해주세요.

---

**현대자동차 수소연료전지 시스템을 위한 전문 다이어그램 라이브러리** 🚗⚡
