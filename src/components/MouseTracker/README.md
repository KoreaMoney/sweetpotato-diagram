# MouseTracker 컴포넌트

실시간으로 마우스 위치를 추적하고 화면에 표시하는 React 컴포넌트입니다.

## 설치

```bash
npm install sweet-diagram
```

## 기본 사용법

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker />
    </div>
  );
}
```

## Props

| Prop               | 타입                                                                                              | 기본값        | 설명                                       |
| ------------------ | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------ |
| `position`         | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top-center' \| 'bottom-center'` | `'top-right'` | 컴포넌트 표시 위치                         |
| `theme`            | `'dark' \| 'light' \| 'minimal'`                                                                  | `'dark'`      | 테마 스타일                                |
| `showDetails`      | `boolean`                                                                                         | `true`        | 상세 정보 (화면 크기, 상대 위치) 표시 여부 |
| `showToggle`       | `boolean`                                                                                         | `true`        | 토글 버튼 표시 여부                        |
| `initialVisible`   | `boolean`                                                                                         | `true`        | 초기 표시 상태                             |
| `customStyles`     | `object`                                                                                          | `{}`          | 커스텀 스타일 객체                         |
| `onPositionChange` | `function`                                                                                        | `null`        | 마우스 위치 변경 시 호출되는 콜백          |
| `className`        | `string`                                                                                          | `''`          | 추가 CSS 클래스                            |
| `children`         | `ReactNode`                                                                                       | `null`        | 추가 커스텀 내용                           |

## 사용 예제

### 1. 기본 사용

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <MouseTracker />
    </div>
  );
}
```

### 2. 위치와 테마 커스터마이징

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker position="bottom-left" theme="light" showDetails={false} />
    </div>
  );
}
```

### 3. 콜백 함수와 커스텀 스타일

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  const handlePositionChange = (position) => {
    console.log("Mouse position:", position);
  };

  return (
    <div>
      <MouseTracker
        onPositionChange={handlePositionChange}
        customStyles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          button: { borderRadius: "20px" },
        }}
      />
    </div>
  );
}
```

### 4. 커스텀 내용 추가

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker>
        <div className="text-xs">
          <div>커스텀 정보</div>
          <div>추가 데이터 표시</div>
        </div>
      </MouseTracker>
    </div>
  );
}
```

### 5. 미니멀 테마 (토글 없이)

```jsx
import { MouseTracker } from "sweet-diagram";

function App() {
  return (
    <div>
      <MouseTracker theme="minimal" showToggle={false} position="top-center" />
    </div>
  );
}
```

## 테마

### Dark (기본)

- 어두운 배경에 흰색 텍스트
- 파란색, 초록색 강조 색상

### Light

- 밝은 배경에 어두운 텍스트
- 파란색, 초록색 강조 색상

### Minimal

- 반투명 검은 배경
- 사이버네틱한 청록색, 라임색 강조

## 커스텀 스타일

`customStyles` prop을 통해 스타일을 커스터마이징할 수 있습니다:

```jsx
<MouseTracker
  customStyles={{
    container: {
      backgroundColor: "rgba(255, 0, 0, 0.9)",
      borderRadius: "15px",
      border: "2px solid white",
    },
    button: {
      backgroundColor: "blue",
      color: "white",
    },
    closeButton: {
      color: "yellow",
    },
  }}
/>
```

## 접근성

- 키보드 네비게이션 지원 (Tab, Enter, Space)
- ARIA 라벨 제공
- 스크린 리더 호환

## 성능

- 자동 이벤트 리스너 정리
- 메모리 누수 방지
- 효율적인 리렌더링

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 라이선스

MIT
