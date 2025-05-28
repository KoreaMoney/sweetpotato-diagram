# 🔗 Connector 컴포넌트 양방향 화살표 기능 추가

## 📋 업데이트 개요

Connector 컴포넌트에 `showStartArrow` prop을 추가하여 양방향 화살표를 지원하도록 개선했습니다.

## ✨ 새로운 기능

### 🆕 showStartArrow Prop

- **타입**: `boolean`
- **기본값**: `false`
- **설명**: 시작점에 화살표를 표시할지 여부를 제어합니다.

```jsx
<Connector
  fromBox={{ id: "server", position: "right" }}
  toBox={{ id: "client", position: "left" }}
  boxes={boxes}
  showArrow={true} // 끝점 화살표 (→)
  showStartArrow={true} // 시작점 화살표 (←) - 🆕 NEW!
  strokeWidth={3}
  animated={true}
/>
```

## 🎯 사용 사례

### 1. 양방향 통신

```jsx
// 서버-클라이언트 양방향 통신
<Connector
  fromBox={{ id: "server", position: "right" }}
  toBox={{ id: "client", position: "left" }}
  boxes={boxes}
  connectionType="straight"
  className="text-purple-600"
  showArrow={true}
  showStartArrow={true}
  strokeWidth={3}
  animated={true}
/>
```

### 2. 피드백 제어 시스템

```jsx
// 제어기-센서 피드백 루프
<Connector
  fromBox={{ id: "controller", position: "right" }}
  toBox={{ id: "sensor", position: "left" }}
  boxes={boxes}
  connectionType="orthogonal"
  className="text-red-600"
  showArrow={true}
  showStartArrow={true}
  strokeWidth={2}
/>
```

### 3. 데이터 교환

```jsx
// 데이터베이스 읽기/쓰기
<Connector
  fromBox={{ id: "app", position: "bottom" }}
  toBox={{ id: "database", position: "top" }}
  boxes={boxes}
  connectionType="curved"
  className="text-blue-600"
  showArrow={true}
  showStartArrow={true}
  strokeWidth={2}
/>
```

## 🔧 구현 세부사항

### 시작점 화살표 계산 로직

```javascript
const calculateStartArrowMarker = () => {
  const { x: x1, y: y1 } = safeStartPoint;
  const { x: x2, y: y2 } = safeEndPoint;

  // 첫 번째 세그먼트의 방향 계산
  let startX1 = x1,
    startY1 = y1,
    startX2 = x2,
    startY2 = y2;

  // 연결 타입에 따른 방향 조정
  if (finalConnectionType === "custom" && bendPoints.length > 0) {
    const firstBend = bendPoints[0];
    startX2 = firstBend.x;
    startY2 = firstBend.y;
  } else if (finalConnectionType === "orthogonal") {
    // 박스 연결시 시작 방향에 따른 화살표 조정
    if (fromBox && fromBox.position) {
      const { position: fromPos } = fromBox;
      switch (fromPos) {
        case "right":
          startX2 = x1 + 10;
          startY2 = y1;
          break;
        case "left":
          startX2 = x1 - 10;
          startY2 = y1;
          break;
        // ... 기타 방향
      }
    }
  }

  // 화살표 머리 계산
  const dx = startX2 - startX1;
  const dy = startY2 - startY1;
  const angle = Math.atan2(dy, dx);

  return {
    startArrowHead1: {
      x: x1 + arrowSize * Math.cos(angle - Math.PI / 6),
      y: y1 + arrowSize * Math.sin(angle - Math.PI / 6),
    },
    startArrowHead2: {
      x: x1 + arrowSize * Math.cos(angle + Math.PI / 6),
      y: y1 + arrowSize * Math.sin(angle + Math.PI / 6),
    },
  };
};
```

### SVG 렌더링

```jsx
{
  /* 시작점 화살표 */
}
{
  showStartArrow && startArrowHead1 && startArrowHead2 && (
    <polygon
      points={`${safeStartPoint.x - minX},${safeStartPoint.y - minY} ${startArrowHead1.x - minX},${
        startArrowHead1.y - minY
      } ${startArrowHead2.x - minX},${startArrowHead2.y - minY}`}
      className="fill-current"
    />
  );
}
```

## 📊 Props 업데이트

| 속성                | 타입    | 기본값  | 설명                                      |
| ------------------- | ------- | ------- | ----------------------------------------- |
| `showArrow`         | boolean | `true`  | 끝점 화살표 표시 여부                     |
| `showStartArrow` 🆕 | boolean | `false` | 시작점 화살표 표시 여부 (양방향 화살표용) |

## 🎨 시각적 예제

### 단방향 vs 양방향 비교

```
단방향 (showStartArrow=false):
A ────────→ B

양방향 (showStartArrow=true):
A ←────────→ B
```

### 다양한 연결 타입에서의 양방향 화살표

```
Straight:     ←──────────→
Orthogonal:   ←─┐      ┌─→
              │        │
              └────────┘
Curved:       ←~~~~~~~~→
```

## 🧪 테스트

테스트 컴포넌트 `ConnectorBidirectionalTest.jsx`를 생성하여 다음을 확인할 수 있습니다:

1. 양방향 통신 시나리오
2. 피드백 제어 시스템
3. 단방향 vs 양방향 비교
4. 다양한 연결 타입에서의 동작

## 🔄 호환성

- 기존 코드와 100% 호환
- `showStartArrow`의 기본값이 `false`이므로 기존 동작 유지
- 모든 연결 타입(straight, orthogonal, curved, stepped, custom)에서 지원

## 💡 사용 팁

1. **양방향 통신**: API 호출과 응답, 웹소켓 통신
2. **피드백 루프**: 제어 시스템, 센서 피드백
3. **데이터 동기화**: 캐시 동기화, 데이터베이스 복제
4. **상호 의존성**: 모듈 간 상호 참조
5. **협업 프로세스**: 워크플로우의 상호 검토

## 🎯 결론

`showStartArrow` prop 추가로 Connector 컴포넌트가 더욱 표현력이 풍부해졌습니다. 이제 단방향과 양방향 연결을 명확하게 구분하여 표시할 수 있으며, 복잡한 시스템의 데이터 흐름과 상호작용을 더 정확하게 시각화할 수 있습니다.
