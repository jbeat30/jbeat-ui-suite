# Changesets

Changesets는 모노레포 패키지의 버전 관리 및 배포를 자동화하는 도구

## 사용 방법

### 1. 변경사항 추가 (개발 중)

코드 변경 후 변경사항을 기록:

```bash
pnpm changeset
```

대화형으로 다음을 선택:
- 변경된 패키지 선택 (uikit, pages)
- 변경 타입 선택:
  - `major`: Breaking changes (1.0.0 → 2.0.0)
  - `minor`: 새로운 기능 추가 (0.1.0 → 0.2.0)
  - `patch`: 버그 수정 (0.1.0 → 0.1.1)
- 변경사항 설명 입력

### 2. 버전 업데이트

모든 changeset을 모아서 버전 업데이트:

```bash
pnpm version
```

자동으로:
- package.json 버전 업데이트
- CHANGELOG.md 생성/업데이트
- 의존성 패키지 버전 동기화

### 3. 배포

#### 개발 버전 배포 (next 태그)
```bash
pnpm release:dev
```

개발 중인 버전을 `next` 태그로 배포:
- 설치: `npm install @jbeat/uikit@next`
- 운영 환경에 영향 없음

#### 안정 버전 배포 (latest 태그)
```bash
pnpm release
```

운영 환경용 안정 버전을 `latest` 태그로 배포:
- 설치: `npm install @jbeat/uikit` (기본)

## 버전 전략

### 개발 단계 (0.x.x)
- `0.1.0-next.0`: 개발 버전 (next 태그)
- `0.1.0`: 첫 안정 릴리즈

### 운영 단계 (1.x.x)
- `1.0.0-rc.0`: 릴리즈 후보 (rc 태그)
- `1.0.0`: 안정 버전 (latest 태그)
- `1.1.0-next.0`: 다음 마이너 버전 개발 (next 태그)

## 예시 워크플로우

### 시나리오 1: 새로운 기능 개발
```bash
# 1. 기능 개발
# 2. changeset 추가
pnpm changeset
# → minor 선택, "Add new feature" 입력

# 3. PR 생성 및 머지
# 4. 버전 업데이트
pnpm version
# → 0.1.0 → 0.2.0

# 5. 개발 버전 배포
pnpm release:dev
# → 0.2.0-next.0로 배포

# 6. 테스트 후 안정 버전 배포
pnpm release
# → 0.2.0로 배포
```

### 시나리오 2: 버그 수정
```bash
# 1. 버그 수정
# 2. changeset 추가
pnpm changeset
# → patch 선택, "Fix bug" 입력

# 3. 버전 업데이트
pnpm version
# → 0.2.0 → 0.2.1

# 4. 배포
pnpm release
# → 0.2.1로 배포
```

## npm 태그 설명

- `latest`: 기본 태그, 안정 버전 (운영 환경용)
- `next`: 개발 버전 (테스트/개발 환경용)
- `rc`: 릴리즈 후보 (베타 테스트용)

## 주의사항

1. **changeset은 커밋 전에 추가**: 코드 변경과 함께 커밋
2. **버전 업데이트는 main 브랜치에서**: 배포 준비가 되었을 때
3. **배포 전 빌드 확인**: `pnpm build`가 성공하는지 확인
4. **npm 로그인 필요**: `npm login` 후 배포 가능
