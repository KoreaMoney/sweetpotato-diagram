# SweetPD 테스트 가이드

## 개요

이 문서는 SweetPD 라이브러리의 테스트 환경과 배포 전 테스트 절차에 대해 설명합니다.

## 테스트 환경 설정

### 사용된 도구

- **Vitest**: 빠르고 현대적인 테스트 프레임워크
- **@testing-library/react**: React 컴포넌트 테스트
- **@testing-library/jest-dom**: DOM 매처 확장
- **jsdom**: 브라우저 환경 시뮬레이션
- **Playwright**: E2E 테스트 및 시각적 테스트

### 설정 파일

- `vite.config.js`: Vitest 설정 포함
- `src/test/setup.js`: 테스트 환경 초기화
- `playwright.config.js`: E2E 테스트 설정

## 실제 화면에서 확인하기

### 1. 브라우저에서 직접 확인

개발 서버 실행 후 브라우저에서 직접 확인:

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:5173
```

### 2. 컴포넌트 쇼케이스 페이지

모든 컴포넌트를 한 번에 확인할 수 있는 전용 페이지:

```
http://localhost:5173/showcase
```

이 페이지에서 확인할 수 있는 내용:

- 모든 3D 컴포넌트들의 시각적 렌더링
- 마우스 상호작용 (회전, 확대/축소, 이동)
- WebGL 렌더링 품질
- 반응형 레이아웃
- 컴포넌트별 개별 테스트

### 3. E2E 시각적 테스트

```bash
# Playwright 브라우저 설치 (최초 1회)
npx playwright install

# 전체 E2E 테스트 실행
npm run test:e2e

# 브라우저 창을 보면서 테스트 (headed 모드)
npm run test:e2e:headed

# 특정 테스트만 실행
npm run test:visual        # 시각적 테스트
npm run test:components    # 컴포넌트 테스트

# 테스트 UI 모드 (인터랙티브)
npm run test:e2e:ui
```

### 4. 자동 스크린샷 생성

E2E 테스트 실행 시 자동으로 생성되는 스크린샷들:

- `test-results/main-page.png`: 메인 페이지
- `test-results/desktop-view.png`: 데스크톱 뷰
- `test-results/tablet-view.png`: 태블릿 뷰
- `test-results/mobile-view.png`: 모바일 뷰
- `test-results/canvas-render.png`: Canvas 렌더링
- `test-results/box-component.png`: Box 컴포넌트
- `test-results/arrow-component.png`: Arrow 컴포넌트
- 기타 컴포넌트별 스크린샷

## 테스트 스크립트

### 기본 테스트 명령어

```bash
# 모든 테스트 실행
npm test

# 테스트 한 번 실행 (CI용)
npm run test:run

# 테스트 감시 모드
npm run test:watch

# 테스트 UI 모드
npm run test:ui

# 코드 커버리지 포함 테스트
npm run test:coverage
```

### E2E 테스트 명령어

```bash
# 전체 E2E 테스트
npm run test:e2e

# 브라우저 창 표시 모드
npm run test:e2e:headed

# E2E 테스트 UI 모드
npm run test:e2e:ui

# 특정 시각적 테스트만
npm run test:visual

# 컴포넌트 테스트만
npm run test:components

# 모든 테스트 (단위 + E2E)
npm run test:all
```

### 배포 전 테스트

```bash
# 전체 배포 전 검증 (lint + test + build)
npm run prepublishOnly
```

## 테스트 구조

### 1. 단위 테스트 (`src/test/`)

- `exports.test.js`: 컴포넌트 Export 테스트
- `SweetDiagram.test.jsx`: 메인 컴포넌트 테스트
- `DiagramComponents.test.jsx`: 다이어그램 컴포넌트 테스트
- `build.test.js`: 빌드 파일 검증

### 2. E2E 테스트 (`src/test/e2e/`)

- `visual.spec.js`: 시각적 테스트
- `components.spec.js`: 컴포넌트별 상세 테스트

### 3. 시각적 확인 (`src/test/`)

- `ComponentShowcase.jsx`: 컴포넌트 쇼케이스 페이지

## 시각적 테스트 체크리스트

### 웹 브라우저에서 확인해야 할 항목:

1. **페이지 로딩**

   - ✅ 페이지가 빠르게 로드되는가?
   - ✅ 로딩 중 에러가 발생하지 않는가?

2. **3D 렌더링**

   - ✅ Canvas 요소가 정상적으로 표시되는가?
   - ✅ WebGL 컨텍스트가 초기화되는가?
   - ✅ 3D 컴포넌트들이 올바르게 렌더링되는가?

3. **마우스 상호작용**

   - ✅ 마우스 드래그로 회전이 가능한가?
   - ✅ 마우스 휠로 확대/축소가 가능한가?
   - ✅ 우클릭 드래그로 이동이 가능한가?

4. **반응형 디자인**

   - ✅ 다양한 화면 크기에서 정상 작동하는가?
   - ✅ 모바일에서도 터치 제스처가 작동하는가?

5. **네비게이션**

   - ✅ 페이지 간 이동이 정상적으로 작동하는가?
   - ✅ 뒤로 가기/앞으로 가기가 작동하는가?

6. **성능**
   - ✅ 프레임률이 부드러운가? (60fps)
   - ✅ 메모리 누수가 없는가?

## 테스트 커버리지

현재 테스트 커버리지:

- **전체**: 18%
- **주요 export 파일**: 100%
- **컴포넌트 정의**: 100%

### 커버리지 제외 항목

- `node_modules/`
- `dist/`
- `src/test/`
- 설정 파일들

## 배포 전 체크리스트

1. **Lint 검사**: `npm run lint`

   - 코드 스타일 검증
   - React 훅 규칙 검증
   - 사용하지 않는 변수 검사

2. **단위 테스트**: `npm run test:run`

   - 모든 컴포넌트 export 검증
   - 기본 렌더링 테스트
   - 빌드 파일 검증

3. **시각적 확인**: 브라우저에서 `http://localhost:5173/showcase`

   - 모든 컴포넌트 시각적 확인
   - 마우스 상호작용 테스트
   - 다양한 화면 크기에서 테스트

4. **E2E 테스트** (선택사항): `npm run test:e2e`

   - 자동화된 브라우저 테스트
   - 스크린샷 비교
   - 성능 메트릭 확인

5. **라이브러리 빌드**: `npm run build:lib`
   - ES 모듈 빌드
   - CommonJS 빌드
   - 번들 크기 확인

## 문제 해결

### 일반적인 문제들

1. **Canvas 관련 에러**

   - Three.js 컴포넌트는 Canvas 래퍼 내에서 테스트
   - WebGL 컨텍스트 모킹 필요시 setup.js에서 처리

2. **Router 경고**

   - SweetDiagram 테스트시 "No routes matched" 경고는 정상
   - 실제 기능에는 영향 없음

3. **ESLint 경고**

   - Fast refresh 관련 경고는 개발 환경에서만 발생
   - 라이브러리 빌드에는 영향 없음

4. **E2E 테스트 실패**
   - `npx playwright install`로 브라우저 설치 필요
   - 개발 서버가 실행 중인지 확인

## 추가 테스트 작성 가이드

새로운 컴포넌트 추가시:

1. `src/test/` 디렉토리에 테스트 파일 생성
2. 기본 렌더링 테스트 작성
3. Props 검증 테스트 추가
4. `exports.test.js`에 새 컴포넌트 추가
5. `ComponentShowcase.jsx`에 시각적 예제 추가

### 테스트 파일 명명 규칙

- `*.test.js` 또는 `*.test.jsx`
- 컴포넌트명과 동일한 파일명 사용
- 기능별 그룹핑 권장

## 성능 최적화

- 테스트는 병렬로 실행됨
- 각 테스트 후 DOM 자동 정리
- 모킹된 브라우저 API 사용으로 빠른 실행
