# Arrow 컴포넌트 개선 사항

## 🎯 새로 추가된 기능

### 1. 화살표 크기 조절 (arrowSize)

- **기본값**: 8
- **권장 범위**: 6-20
- **사용법**: `arrowSize={12}`

### 2. 양방향 화살표 지원

- **showStartArrow**: 시작점 화살표 표시 여부 (기본값: false)
- **showEndArrow**: 끝점 화살표 표시 여부 (기본값: true)

### 3. 클릭 이벤트 지원

- **onClick**: 화살표 클릭 시 실행할 함수
- 접근성 지원 (키보드 네비게이션, ARIA 라벨)

## 📝 사용 예제

### 기본 화살표

```jsx
<Arrow
  startPoint={{ x: 50, y: 50 }}
  endPoint={{ x: 200, y: 100 }}
  strokeWidth={2}
  arrowSize={8}
  className="text-blue-600"
/>
```

### 양방향 화살표

```jsx
<Arrow
  startPoint={{ x: 50, y: 200 }}
  endPoint={{ x: 150, y: 200 }}
  strokeWidth={3}
  arrowSize={10}
  showStartArrow={true}
  showEndArrow={true}
  className="text-red-600"
  onClick={() => console.log("양방향 통신")}
/>
```

### 큰 화살표 (강조용)

```jsx
<Arrow
  startPoint={{ x: 30, y: 100 }}
  endPoint={{ x: 120, y: 100 }}
  strokeWidth={4}
  arrowSize={15}
  className="text-purple-600"
/>
```

### 역방향 화살표

```jsx
<Arrow
  startPoint={{ x: 200, y: 80 }}
  endPoint={{ x: 320, y: 80 }}
  strokeWidth={2}
  arrowSize={8}
  showStartArrow={true}
  showEndArrow={false}
  className="text-amber-600"
/>
```

### 단순 연결선 (화살표 없음)

```jsx
<Arrow
  startPoint={{ x: 200, y: 120 }}
  endPoint={{ x: 320, y: 120 }}
  strokeWidth={2}
  showStartArrow={false}
  showEndArrow={false}
  className="text-gray-600"
/>
```

## 📊 Props 테이블

| 속성                  | 타입     | 기본값             | 설명                           |
| --------------------- | -------- | ------------------ | ------------------------------ |
| startPoint            | object   | `{ x: 0, y: 0 }`   | 시작점 좌표                    |
| endPoint              | object   | `{ x: 100, y: 0 }` | 끝점 좌표                      |
| strokeWidth           | number   | 2                  | 선 두께                        |
| **arrowSize** ⭐      | number   | 8                  | 화살표 삼각형 크기 (6-20 권장) |
| **showEndArrow** ⭐   | boolean  | true               | 끝점 화살표 표시 여부          |
| **showStartArrow** ⭐ | boolean  | false              | 시작점 화살표 표시 여부        |
| className             | string   | "text-gray-500"    | TailwindCSS 클래스 (색상)      |
| onClick               | function | null               | 클릭 이벤트 핸들러             |

## 🎯 활용법

### 화살표 크기별 용도

- **작은 화살표 (6-8)**: 보조적인 흐름, 세부 연결
- **중간 화살표 (8-12)**: 일반적인 데이터 흐름
- **큰 화살표 (12-20)**: 주요 흐름, 강조가 필요한 연결

### 방향별 활용

- **단방향 (→)**: 일반적인 데이터 흐름
- **양방향 (↔)**: 통신, 상호작용
- **역방향 (←)**: 피드백, 반환값
- **선만 (—)**: 구조적 연결, 그룹핑

## 💡 실용적인 사용 예시

1. **데이터 흐름**: 시스템 간 데이터 전달 방향 표시
2. **신호 전달**: 제어 신호, 센서 신호 등의 방향성
3. **프로세스 흐름**: 작업 순서나 처리 단계 표현
4. **양방향 통신**: 하나의 화살표로 송수신 모두 표현
5. **분기 처리**: 조건에 따른 다중 경로 표시
6. **피드백 루프**: 결과가 다시 입력으로 돌아가는 구조

## 🔄 기존 코드 마이그레이션

### 기존 (2개 Arrow 사용)

```jsx
// 송신
<Arrow startPoint={{x: 50, y: 200}} endPoint={{x: 150, y: 200}} />
// 수신
<Arrow startPoint={{x: 150, y: 220}} endPoint={{x: 50, y: 220}} />
```

### 개선 (1개 Arrow 사용)

```jsx
// 양방향 통신
<Arrow startPoint={{ x: 50, y: 200 }} endPoint={{ x: 150, y: 200 }} showStartArrow={true} showEndArrow={true} />
```

이제 Arrow 컴포넌트가 더욱 유연하고 강력해졌습니다! 🚀
