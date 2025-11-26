# @jbeat/pages

재사용 가능한 페이지 컴포넌트 모음 패키지

## 설치

```bash
npm install @jbeat/pages
# 또는
pnpm add @jbeat/pages
# 또는
yarn add @jbeat/pages
```

## 사용법

### 기본 사용

```tsx
import { ConsultationPage } from '@jbeat/pages';

function App() {
  const handleSubmit = async (data) => {
    console.log('제출된 데이터:', data);
    // API 호출 등 처리
  };

  return <ConsultationPage onSubmit={handleSubmit} />;
}
```

**참고**: UIKit 스타일은 자동으로 로드되므로 별도로 import 불필요

## 페이지 목록

### ConsultationPage

상담 신청 페이지 컴포넌트

**Props:**

| Prop        | Type                                            | 설명                                   |
| ----------- | ----------------------------------------------- | -------------------------------------- |
| onSubmit    | (data: ConsultationFormValues) => Promise<void> | 폼 제출 시 호출되는 함수               |
| user        | User (optional)                                 | 사용자 정보 (폼에 미리 채워짐)         |
| title       | string (optional)                               | 페이지 제목 (기본값: "상담 신청")       |
| description | string (optional)                               | 페이지 설명                             |

**예제:**

```tsx
import { ConsultationPage, type ConsultationFormValues } from '@jbeat/pages';

function App() {
  const handleSubmit = async (data: ConsultationFormValues) => {
    // API로 데이터 전송
    const response = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('제출 실패');
    }

    alert('상담 신청이 완료되었습니다!');
  };

  return (
    <ConsultationPage
      title="무료 상담 신청"
      description="아래 양식을 작성하여 상담을 신청해주세요"
      onSubmit={handleSubmit}
    />
  );
}
```

## TypeScript 지원

모든 컴포넌트는 완전한 TypeScript 타입 정의를 제공

```tsx
import type { ConsultationPageProps, ConsultationFormValues, User } from '@jbeat/pages';
```

## 의존성

- React >= 19.0.0
- react-dom >= 19.0.0
- @jbeat/uikit (자동으로 설치됨)

## 라이선스

MIT
