# SweetPD npm 배포 가이드

이 가이드는 SweetPD 패키지를 npm에 배포하는 방법을 설명합니다.

## 🚀 배포 준비사항

### 1. npm 계정 생성

- [npmjs.com](https://www.npmjs.com/)에서 계정을 생성하세요
- 이메일 인증을 완료하세요

### 2. npm 로그인

터미널에서 npm에 로그인하세요:

```bash
npm login
```

### 3. 패키지명 확인

npm에서 패키지명이 사용 가능한지 확인하세요:

```bash
npm search sweetpd
```

## 📦 배포 과정

### 1단계: 빌드 테스트

```bash
# 라이브러리 빌드
npm run build:lib

# 패키지 구성 확인
npm pack --dry-run
```

### 2단계: 테스트 실행

```bash
# 린트 검사
npm run lint

# 단위 테스트
npm run test:run

# E2E 테스트 (선택사항)
npm run test:e2e
```

### 3단계: 버전 업데이트

```bash
# 패치 버전 (0.1.0 -> 0.1.1)
npm run version:patch

# 마이너 버전 (0.1.0 -> 0.2.0)
npm run version:minor

# 메이저 버전 (0.1.0 -> 1.0.0)
npm run version:major
```

### 4단계: npm 배포

```bash
# 배포 실행
npm run publish:npm

# 또는 직접 명령어
npm publish
```

## 🔧 자동화된 배포 스크립트

### 원클릭 배포 (패치 버전)

```bash
# 테스트 → 빌드 → 버전업 → 배포
npm run version:patch && npm run publish:npm
```

### 수동 단계별 배포

```bash
# 1. 모든 테스트 실행
npm run test:all

# 2. 라이브러리 빌드
npm run build:lib

# 3. 버전 업데이트
npm version patch

# 4. 배포
npm publish
```

## 📋 배포 전 체크리스트

- [ ] 모든 테스트가 통과하는지 확인
- [ ] README.md가 최신 정보로 업데이트되었는지 확인
- [ ] package.json의 버전이 올바른지 확인
- [ ] LICENSE 파일이 존재하는지 확인
- [ ] .npmignore에 불필요한 파일들이 제외되어 있는지 확인
- [ ] 빌드된 dist 폴더가 존재하는지 확인

## 🚨 주의사항

### 1. 패키지명 충돌

- npm에서 패키지명이 이미 사용 중인 경우 다른 이름을 사용해야 합니다
- 현재 패키지명: `sweetpd`

### 2. 버전 관리

- npm은 동일한 버전을 두 번 배포할 수 없습니다
- 배포 전 반드시 버전을 업데이트하세요

### 3. 파일 크기

- 현재 패키지 크기: 1.3 MB (압축)
- 큰 파일이 포함되어 있지 않은지 확인하세요

## 🔄 업데이트 배포

기존 패키지를 업데이트할 때:

```bash
# 1. 변경사항 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 2. 버전 업데이트
npm version patch  # 또는 minor, major

# 3. 배포
npm publish

# 4. Git에 태그 푸시
git push origin main --tags
```

## 📊 배포 후 확인

### 1. npm 웹사이트에서 확인

[https://www.npmjs.com/package/sweetpd](https://www.npmjs.com/package/sweetpd)에서 패키지가 정상적으로 배포되었는지 확인하세요.

### 2. 설치 테스트

새로운 프로젝트에서 설치 테스트:

```bash
mkdir test-sweetpd
cd test-sweetpd
npm init -y
npm install sweetpd
```

### 3. 사용 테스트

```jsx
// test.js
import { SweetDiagram } from "sweetpd";
console.log("SweetPD 설치 성공!");
```

## 📈 배포 통계

배포 후 npm 통계를 확인할 수 있습니다:

- 다운로드 수
- 의존성 정보
- 버전 히스토리

## 🛠 문제 해결

### 권한 오류

```bash
npm ERR! code E403
npm ERR! 403 Forbidden
```

→ npm 로그인 상태를 확인하고 재로그인하세요

### 패키지명 충돌

```bash
npm ERR! code E409
npm ERR! 409 Conflict
```

→ package.json의 name을 다른 이름으로 변경하세요

### 네트워크 오류

```bash
npm ERR! network
```

→ 인터넷 연결을 확인하고 npm registry 상태를 확인하세요

## 📞 지원

배포 과정에서 문제가 발생하면:

1. [npm 공식 문서](https://docs.npmjs.com/) 확인
2. GitHub Issues에 문의
3. npm 지원팀에 문의

---

Happy Publishing! 🚀
