# jbeat-ui-suite

jbeat-ui-suite는 React 19 기반의 UI 컴포넌트 라이브러리와 다양한 페이지를 제공하는 **모노레포 프로젝트**입니다.
모노레포 처음이라 정확하지 않을 수 있지만, 최대한 쉽게 설명하려 노력했습니다.

## 📦 모노레포(Monorepo)란?

**하나의 저장소**에서 **여러 독립적인 패키지**를 관리하는 구조입니다.

### 장점
-  **코드 공유**: uikit → pages로 컴포넌트 재사용
-  **일관된 도구**: 동일한 ESLint, TypeScript 설정
-  **효율적 관리**: 한 번에 빌드/테스트 가능
-  **독립 배포**: 각 패키지를 개별적으로 npm 배포 가능

### 이 프로젝트 구조
```
jbeat-ui-suite/              ← 하나의 저장소 (Monorepo)
├── packages/
│   ├── uikit/              ← 패키지 1: UI 컴포넌트 라이브러리
│   │   └── package.json    ← 독립적인 패키지
│   └── pages/              ← 패키지 2: uikit을 사용하는 페이지들
│       └── package.json    ← uikit에 의존
└── package.json            ← 루트 (일괄 명령어)
```

## 📦 패키지

### @jbeat/uikit

재사용 가능한 UI 컴포넌트 라이브러리

- Button, TextInput 등 기본 UI 컴포넌트 제공
- SCSS 기반 스타일링
- TypeScript 완전 지원
- Storybook으로 컴포넌트 개발
- Jest 유닛 테스트 포함

### @jbeat/pages

여러 페이지 컴포넌트를 하나의 패키지로 제공

- @jbeat/uikit 컴포넌트 사용
- 상담 신청 페이지 등 포함
- Playwright E2E 테스트 포함

## 🛠 기술 스택

- **Framework**: React 19 (jsx-runtime)
- **Language**: TypeScript (strict mode)
- **Monorepo**: pnpm workspaces
- **Build**: Vite
- **Styling**: SCSS
- **State**: Zustand
- **Validation**: Zod
- **Component Dev**: Storybook 8.6
- **Testing**: Jest (unit) + Playwright (E2E)
- **Linting**: ESLint + Prettier

## 🚀 시작하기

### 설치

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm

# 의존성 설치
pnpm install
```

## 💻 개발 환경

### 명령어 실행 방법

모노레포에서는 **두 가지 방법**으로 명령어를 실행할 수 있습니다:

#### 방법 1: 패키지 폴더에서 실행
```bash
cd packages/uikit
pnpm storybook
```

#### 방법 2: 루트에서 `-F` 플래그로 지정
```bash
pnpm -F @jbeat/uikit storybook
```

### 🎨 UIKit 개발 (Storybook)

```bash
# 방법 1: 폴더 이동 후 실행
cd packages/uikit
pnpm storybook
# → http://localhost:6006

# 방법 2: 루트에서 실행
pnpm -F @jbeat/uikit storybook
```

### 📄 Pages 개발

```bash
# 방법 1: 폴더 이동 후 실행
cd packages/pages
pnpm dev

# 방법 2: 루트에서 실행
pnpm -F @jbeat/pages dev
```

### 🏗 빌드

```bash
# 루트에서 전체 빌드 (uikit → pages 순서대로)
pnpm build

# 개별 패키지만 빌드
cd packages/uikit
pnpm build
```

### ✅ 테스트

```bash
# 루트에서 전체 테스트
pnpm test           # 모든 unit 테스트
pnpm test:e2e       # 모든 E2E 테스트

# 개별 패키지 테스트
cd packages/uikit
pnpm test           # UIKit unit 테스트만

cd packages/pages
pnpm test           # Pages unit 테스트만
pnpm test:e2e       # Pages E2E 테스트만
```

### 🔍 Lint

```bash
# 루트에서 전체 린트
pnpm lint

# 개별 패키지 린트
cd packages/uikit
pnpm lint
```

## 📁 프로젝트 구조

```
jbeat-ui-suite/                      ← 루트 (모노레포)
├── packages/
│   ├── uikit/                       ← @jbeat/uikit 패키지
│   │   ├── .storybook/             # Storybook 설정
│   │   │   ├── main.ts             # Storybook 메인 설정
│   │   │   └── preview.ts          # SCSS import, 배경 설정
│   │   ├── src/
│   │   │   ├── shared/ui/
│   │   │   │   ├── button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.stories.tsx  ← Storybook Story
│   │   │   │   │   ├── __tests__/Button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── input/
│   │   │   │       ├── TextInput.tsx
│   │   │   │       ├── TextInput.stories.tsx
│   │   │   │       ├── __tests__/TextInput.test.tsx
│   │   │   │       └── index.ts
│   │   │   ├── styles/             # SCSS 스타일
│   │   │   │   ├── index.scss      # 전체 스타일 진입점
│   │   │   │   ├── core/           # 토큰, reset 등
│   │   │   │   └── components/     # 컴포넌트별 스타일
│   │   │   └── index.ts            # npm 진입점
│   │   ├── package.json            # UIKit 독립 패키지
│   │   └── vite.config.ts
│   │
│   └── pages/                       ← @jbeat/pages 패키지
│       ├── src/
│       │   ├── consultation/        # 상담 페이지 모듈
│       │   │   ├── entities/       # 타입 정의
│       │   │   ├── features/       # 폼 로직 + UI
│       │   │   └── pages/          # 페이지 컴포넌트
│       │   ├── main.tsx            # 개발용 네비게이션
│       │   ├── index.ts            # npm 진입점
│       │   └── runtime.ts          # CDN 진입점
│       ├── tests/e2e/              # E2E 테스트
│       ├── package.json            # Pages 독립 패키지
│       └── playwright.config.ts
│
├── pnpm-workspace.yaml             # 모노레포 워크스페이스 설정
├── package.json                     # 루트 package.json (일괄 명령어)
├── tsconfig.base.json              # 공통 TypeScript 설정
└── eslint.config.mjs               # 공통 ESLint 설정
```

## 사용 방법

### 1. 패키지매니저 사용 (React/Next.js 프로젝트)

```tsx
// UIKit만 사용
import { Button, TextInput } from '@jbeat/uikit';
import '@jbeat/uikit/dist/styles.css';

function App() {
  return (
    <div>
      <TextInput label="이름" placeholder="이름을 입력하세요" />
      <Button variant="primary" size="md">
        제출
      </Button>
    </div>
  );
}
```

```tsx
// 특정 페이지만 사용
import { ConsultationPage } from '@jbeat/pages';
// UIKit 스타일은 자동으로 로드됨!

function App() {
  const handleSubmit = async (data) => {
    console.log('제출된 데이터:', data);
    // API 호출 등 처리
  };

  return <ConsultationPage onSubmit={handleSubmit} />;
}
```

```tsx
// UIKit + Pages 함께 사용
import { Button } from '@jbeat/uikit';
import { ConsultationPage } from '@jbeat/pages';
// UIKit 스타일은 자동으로 로드됨!

function App() {
  return (
    <div>
      <Button>커스텀 버튼</Button>
      <ConsultationPage onSubmit={handleSubmit} />
    </div>
  );
}
```

### 2. CDN 사용 (정적 HTML)

```html
<!-- UIKit + Pages 사용 -->
<!DOCTYPE html>
<html>
  <head>
    <!-- UIKit 스타일 -->
    <link rel="stylesheet" href="https://cdn.../uikit.css" />
    <!-- Pages 전용 스타일 -->
    <link rel="stylesheet" href="https://cdn.../pages.css" />
  </head>
  <body>
    <div id="app"></div>
    
    <!-- Pages JavaScript -->
    <script src="https://cdn.../pages.js"></script>
    <script>
      JBeatPages.consultation.render({
        target: '#app',
        props: {
          onSubmit: async (data) => {
            console.log('제출:', data);
            await fetch('/api/consultation', {
              method: 'POST',
              body: JSON.stringify(data),
            });
          },
        },
      });
    </script>
  </body>
</html>
```

## 📚 확장 가이드

### 새로운 UIKit 컴포넌트 추가

1. **컴포넌트 파일 생성**
```bash
packages/uikit/src/shared/ui/checkbox/
├── Checkbox.tsx
├── Checkbox.stories.tsx  # Storybook Story
├── __tests__/Checkbox.test.tsx
└── index.ts
```

2. **Storybook Story 작성**
```tsx
// Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '동의합니다' },
};
```

3. **Export 추가**
```ts
// packages/uikit/src/index.ts
export { Checkbox } from './shared/ui/checkbox';
export type { CheckboxProps } from './shared/ui/checkbox';
```

4. **Storybook에서 확인**
```bash
cd packages/uikit
pnpm storybook
# → http://localhost:6006에서 새 컴포넌트 확인!
```

### 새로운 Page 추가

1. **페이지 폴더 생성**
```bash
packages/pages/src/signup/
├── entities/application/types.ts
├── features/signup-form/
│   ├── lib/validation.ts
│   ├── model/useSignupFormStore.ts
│   └── ui/SignupForm.tsx
└── pages/SignupPage.tsx
```

2. **Export 추가**
```ts
// packages/pages/src/index.ts
export { SignupPage, type SignupPageProps } from './signup';
```

3. **개발용 네비게이션 추가**
```tsx
// packages/pages/src/main.tsx에 링크 추가
<li><a href="#signup">회원가입</a></li>

// 조건부 렌더링 추가
{currentPage === 'signup' && <SignupPage onSubmit={handleSubmit} />}
```

4. **CDN 등록 (선택사항)**
```ts
// packages/pages/src/runtime.ts
window.JBeatPages.signup = {
  render: (options) => renderPage(SignupPage, options),
};
```

## 📝 코드 규칙

### React 19 규칙
- ❌ `import React from 'react'` 불필요 (jsx-runtime 사용)
- 필요한 것만 import: `import { useState, useEffect } from 'react'`

### 코딩 스타일
- **주석**: 한국어 개조체 (마침표 없음)
- **UIKit 컴포넌트**: 화살표 함수 + default export
  ```tsx
  const Button = ({ children }: ButtonProps) => { ... };
  export default Button;
  ```
- **페이지 컴포넌트**: 함수 선언 + named export
  ```tsx
  export function ConsultationPage({ onSubmit }: Props) { ... }
  ```

### 테스트
- **Unit 테스트**: 모든 컴포넌트에 필수
- **E2E 테스트**: 주요 사용자 플로우에 필수
- **실행 전**: `pnpm test`, `pnpm test:e2e` 모두 통과 필수

## 🎯 핵심 요약

### 명령어 체크리스트

```bash
# 개발 시작
pnpm install                          # 의존성 설치

# 컴포넌트 개발
cd packages/uikit && pnpm storybook   # Storybook 실행 → localhost:6006

# 페이지 개발
cd packages/pages && pnpm dev         # Dev 서버 실행 → localhost:5173

# 배포 전
pnpm lint                             # Lint 검사
pnpm test                             # Unit 테스트
pnpm test:e2e                         # E2E 테스트
pnpm build                            # 전체 빌드
```

### 파일 위치 참고

| 작업 | 위치 | 명령어 |
|------|------|--------|
| 새 컴포넌트 개발 | `packages/uikit/src/shared/ui/` | `pnpm storybook` |
| 컴포넌트 Story | `*.stories.tsx` | Storybook에서 확인 |
| 컴포넌트 스타일 | `packages/uikit/src/styles/components/` | SCSS 수정 |
| 새 페이지 개발 | `packages/pages/src/` | `pnpm dev` |
| Unit 테스트 | `__tests__/` | `pnpm test` |
| E2E 테스트 | `packages/pages/tests/e2e/` | `pnpm test:e2e` |

---