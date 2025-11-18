# @jbeat/pages

재사용 가능한 페이지 컴포넌트 모음 패키지

## 구조

```
packages/pages/
├── src/
│   ├── app/                    # 개발용 앱 (외부 export 안됨)
│   │   ├── components/         # 네비게이션 등
│   │   ├── pages/              # 홈(안내) 페이지
│   │   ├── App.tsx             # 라우팅 설정
│   │   └── app.scss            # 개발용 앱 스타일
│   ├── consultation/           # 상담 신청 페이지 (외부 export됨)
│   ├── main.tsx                # 개발용 진입점
│   ├── index.ts                # 외부 export 진입점 (React/Next.js용)
│   └── runtime.ts              # CDN 진입점 (정적 HTML용)
└── ...
```

## 개발 방법

### 1. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` (또는 표시된 포트)를 열면 안내 페이지가 나타남

### 2. 새로운 페이지 추가하기

#### 단계 1: 페이지 폴더 생성

`src/[페이지명]` 폴더를 만들고 다음과 같은 구조로 개발:

```
src/my-page/
├── ui/
│   └── MyPage.tsx        # 페이지 컴포넌트
├── styles/
│   └── my-page.scss      # 스타일
└── index.ts              # export
```

**중요**: 페이지 컴포넌트는 완전히 독립적이어야 함. 외부 레이아웃의 영향을 받지 않아야 함

#### 단계 2: 라우트 추가

`src/app/App.tsx` 파일을 열고 라우트를 추가:

```tsx
import { MyPage } from '../my-page';

// Routes 안에 추가
<Route path="/my-page" element={<MyPage />} />
```

#### 단계 3: 네비게이션 추가

`src/app/components/Navigation.tsx` 파일을 열고 네비게이션 링크를 추가:

```tsx
const navItems: NavItem[] = [
  // ...
  { label: '내 페이지', path: '/my-page' },
];
```

#### 단계 4: 홈 페이지에 페이지 정보 추가

`src/app/pages/Home.tsx` 파일을 열고 페이지 정보를 추가:

```tsx
const pages = [
  // ...
  {
    id: 'my-page',
    title: '내 페이지',
    description: '페이지 설명',
    path: '/my-page',
    icon: '🎯',
  },
];
```

#### 단계 5: 외부 export 추가

**5-1. React/Next.js용 export (`src/index.ts`)**

```tsx
export { MyPage, type MyPageProps } from './my-page';
```

**5-2. CDN용 export (`src/runtime.ts`)**

```tsx
// 1. 상단에 import 추가 (as로 이름 변경하여 export와 충돌 방지)
import { MyPage as MyPageComponent } from './my-page';
import type { MyPageProps } from './my-page';

// 2. pages 객체에 추가 (자동으로 window.JBeatPages에 등록됨)
const pages = {
  consultation: ConsultationPageComponent,
  myPage: MyPageComponent,  // ← 추가
} as const;

// 3. 타입 추가
type PageTypeMap = {
  consultation: { render: (options: RenderOptions<ConsultationPageProps>) => void };
  myPage: { render: (options: RenderOptions<MyPageProps>) => void };  // ← 추가
};

// 4. ESM/CJS export 추가
// PascalCase를 사용하여 페이지임을 표현
export const MyPage = createPageExport(MyPageComponent);
```

**사용 예시:**

```typescript
// CDN에서
window.JBeatPages.myPage.render({ ... });

// ESM/CJS에서
import { MyPage } from '@jbeat/pages/runtime';
MyPage.render({ target: '#app', props: {...} });
```

**왜 이렇게 나눠서 관리하나?**

- `index.ts` (React/Next.js용): 컴포넌트 자체를 export함
- `runtime.ts` (CDN용): 컴포넌트의 render 메서드만 export함
- 이렇게 하면 각 사용 환경에 맞는 최적의 방식으로 제공할 수 있음

## 외부에서 사용하기

### React/Next.js 프로젝트에서 사용

다른 프로젝트에서 페이지 컴포넌트를 독립적으로 사용할 수 있음:

```tsx
import { ConsultationPage } from '@jbeat/pages';

function App() {
  const handleSubmit = async (data: unknown) => {
    // 제출 처리
  };

  return (
    <div>
      {/* 페이지 컴포넌트는 완전히 독립적으로 작동 */}
      <ConsultationPage onSubmit={handleSubmit} />
    </div>
  );
}
```

### CDN으로 사용 (정적 HTML)

React가 없는 일반 HTML 페이지에서도 CDN을 통해 사용할 수 있음:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>상담 신청</title>
</head>
<body>
  <!-- 페이지가 렌더링될 위치 -->
  <div id="app"></div>

  <!-- JBeat Pages CDN 스크립트 -->
  <script src="https://cdn.jsdelivr.net/npm/@jbeat/pages@latest/dist/runtime.js"></script>

  <script>
    // 페이지 렌더링
    window.JBeatPages.consultation.render({
      target: '#app',
      props: {
        title: '상담 신청',
        description: '아래 양식을 작성하여 상담을 신청해주세요',
        onSubmit: async (data) => {
          console.log('제출된 데이터:', data);

          // API로 데이터 전송
          const response = await fetch('/api/consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error('제출 실패');
          }

          alert('상담 신청이 완료되었습니다!');
        }
      }
    });
  </script>
</body>
</html>
```

**CDN 사용 시 주의사항:**
- `window.JBeatPages` 전역 객체를 통해 페이지에 접근함
- 각 페이지는 `render()` 메서드로 렌더링함
- `target`: CSS 셀렉터 또는 HTMLElement
- `props`: 페이지 컴포넌트에 전달할 props

#### CDN 동작 원리

CDN을 통해 페이지를 렌더링하는 과정을 단계별로 설명:

```html
<!-- 1단계: HTML에 빈 div 요소를 준비 -->
<div id="app"></div>

<!-- 2단계: CDN에서 runtime.js를 로드 -->
<!-- 이 스크립트가 로드되면 window.JBeatPages 객체가 생성됨 -->
<script src="https://cdn.../runtime.js"></script>

<script>
  // 3단계: render() 함수 호출
  window.JBeatPages.consultation.render({
    target: '#app',  // ← 여기서 타겟 ID를 넘김!
    props: { ... }
  });
</script>
```

**내부 동작 과정:**

1. **target 파라미터 처리**
   - `target: '#app'`을 받으면 `document.querySelector('#app')`으로 DOM에서 요소를 찾음
   - HTML에 이미 존재하는 `<div id="app">`를 찾아서 가져옴
   - 즉, 비어있는 div를 찾아서 그 안에 React 컴포넌트를 채워넣음

2. **React 컴포넌트 렌더링**
   - `createRoot(element)`: 찾은 DOM 요소를 React가 관리하는 "루트"로 변환함
   - `createElement(PageComponent, props)`: React 컴포넌트를 React 엘리먼트로 변환함
   - `root.render(...)`: React 엘리먼트를 실제 DOM에 렌더링함

3. **결과**
   ```html
   <!-- 렌더링 전 -->
   <div id="app"></div>

   <!-- 렌더링 후 -->
   <div id="app">
     <!-- ConsultationPage 컴포넌트의 HTML이 여기에 삽입됨 -->
     <div class="consultation-page">
       <form>...</form>
     </div>
   </div>
   ```

**핵심 개념:**
- **target은 이미 HTML에 존재하는 요소임**: 비어있는 div를 미리 만들어놓고, 그 안에 React 컴포넌트를 채워넣는 방식
- **document.querySelector**: JavaScript의 기본 API로, CSS 셀렉터로 DOM 요소를 찾음
- **createRoot**: React 18의 API로, DOM 요소를 React 앱의 진입점으로 만듦
- **render**: React 컴포넌트를 실제 HTML로 변환하여 DOM에 삽입함

## 주요 개념

- **개발용 앱 (`src/app/`)**: 개발 시에만 사용되며 외부로 export되지 않음. 페이지들을 테스트하고 미리보기 위한 용도임. 네비게이션이 포함되어 있음
- **페이지 컴포넌트 (`src/[페이지명]/`)**: 실제 재사용 가능한 페이지 컴포넌트임. **완전히 독립적**이며 외부 레이아웃의 영향을 받지 않음. 외부로 export됨
- **메인 페이지**: 안내 페이지로, 사용 가능한 페이지 목록을 보여줌
- **네비게이션**: 개발용 앱에만 존재하며, 페이지 간 이동을 위한 메뉴를 제공함

## 빌드

```bash
pnpm build
```

빌드된 결과물은 `dist/` 폴더에 생성됨
