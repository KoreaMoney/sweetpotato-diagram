# 🍠 Sweet Diagram TypeScript 도입 로드맵

## 📋 현재 상태

현재 Sweet Diagram은 **JavaScript**로 개발되어 있으며, 안정적인 기능 개발에 집중하고 있습니다.

## 🎯 TypeScript 도입 계획

### v1.0.0 (예정)

- ✅ 완전한 TypeScript 타입 정의 제공
- ✅ 모든 컴포넌트에 대한 타입 안전성 보장
- ✅ 개발자 경험 향상을 위한 IntelliSense 지원

### 도입 예정 기능

#### 🔧 핵심 타입 정의

```typescript
// 컴포넌트 Props 타입
export interface BoxProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  className?: string;
  onClick?: (event: MouseEvent, data: BoxData) => void;
}

export interface ConnectorProps {
  fromBox: { id: string; position: ConnectionPosition };
  toBox: { id: string; position: ConnectionPosition };
  connectionType?: "straight" | "curved" | "orthogonal";
  arrowDirection?: "forward" | "backward" | "both";
  strokeWidth?: number;
  className?: string;
  animated?: boolean;
}
```

#### 🎣 Hook 타입 정의

```typescript
export interface DiagramContextType {
  boxes: Map<string, BoxData>;
  connectors: ConnectorData[];
  addBox: (id: string, data: BoxData) => void;
  removeBox: (id: string) => void;
  updateBox: (id: string, updates: Partial<BoxData>) => void;
}

export function useDiagram(): DiagramContextType;
```

#### 📦 유틸리티 타입

```typescript
export type ConnectionPosition = "top" | "right" | "bottom" | "left";
export type ConnectionType = "straight" | "curved" | "orthogonal";
export type ArrowDirection = "forward" | "backward" | "both";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BoxData extends Position, Size {
  id: string;
  text?: string;
  className?: string;
}
```

## 🚀 마이그레이션 가이드 (v1.0.0 출시 시)

### JavaScript에서 TypeScript로 전환

#### Before (JavaScript)

```javascript
import { Box, Connector, DiagramProvider } from "sweet-diagram";

function MyDiagram() {
  return (
    <DiagramProvider>
      <Box id="box1" x={100} y={100} width={120} height={80} />
    </DiagramProvider>
  );
}
```

#### After (TypeScript)

```typescript
import React from "react";
import { Box, Connector, DiagramProvider, BoxProps } from "sweet-diagram";

const MyDiagram: React.FC = () => {
  return (
    <DiagramProvider>
      <Box id="box1" x={100} y={100} width={120} height={80} />
    </DiagramProvider>
  );
};
```

### 타입 안전한 이벤트 핸들링

```typescript
import { BoxProps, BoxData } from "sweet-diagram";

const handleBoxClick = (event: MouseEvent, data: BoxData): void => {
  console.log(`Box ${data.id} clicked at position: ${data.x}, ${data.y}`);
};

const MyBox: React.FC<BoxProps> = (props) => {
  return <Box {...props} onClick={handleBoxClick} />;
};
```

## 📅 타임라인

| 버전   | 예정일     | 주요 기능                         |
| ------ | ---------- | --------------------------------- |
| v0.4.0 | 2024년 3월 | TypeScript 설정 및 기본 타입 추가 |
| v0.5.0 | 2024년 4월 | 핵심 컴포넌트 타입 정의 완료      |
| v1.0.0 | 2024년 5월 | **완전한 TypeScript 지원**        |

## 🤝 기여하기

TypeScript 도입에 관심이 있으시다면:

1. 📋 [GitHub Issues](https://github.com/KoreaMoney/sweetpotato-diagram/issues)에서 관련 이슈 확인
2. 🔧 타입 정의 제안 및 피드백 제공
3. 🧪 베타 버전 테스트 참여

## 📖 참고 자료

- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [프로젝트 GitHub 저장소](https://github.com/KoreaMoney/sweetpotato-diagram)

---

💡 **업데이트 알림**: TypeScript 지원 진행 상황은 [GitHub Release](https://github.com/KoreaMoney/sweetpotato-diagram/releases)에서 확인하실 수 있습니다.
