# @jbeat/uikit

React 19 UI 컴포넌트 라이브러리 (TypeScript + SCSS)

## 설치

```bash
npm install @jbeat/uikit
# 또는
pnpm add @jbeat/uikit
# 또는
yarn add @jbeat/uikit
```

## 사용법

### 1. 스타일 import

React 앱의 진입점에서 스타일을 import:

```tsx
import '@jbeat/uikit/styles.css';
```

### 2. 컴포넌트 사용

```tsx
import { Button, TextInput } from '@jbeat/uikit';

function App() {
  return (
    <div>
      <TextInput
        label="이름"
        placeholder="이름을 입력하세요"
        onChange={(e) => console.log(e.target.value)}
      />
      <Button variant="primary" size="md" onClick={() => alert('클릭!')}>
        제출
      </Button>
    </div>
  );
}
```

## 컴포넌트

### Button

다양한 스타일의 버튼 컴포넌트

**Props:**

| Prop      | Type                              | Default     | 설명           |
| --------- | --------------------------------- | ----------- | -------------- |
| variant   | 'primary' \| 'secondary'           | 'primary'   | 버튼 스타일    |
| size      | 'sm' \| 'md' \| 'lg'               | 'md'        | 버튼 크기      |
| disabled  | boolean                           | false       | 비활성화 여부  |
| onClick   | () => void                        | -           | 클릭 이벤트    |
| children  | ReactNode                         | -           | 버튼 내용      |

**예제:**

```tsx
<Button variant="primary" size="lg">
  Primary 버튼
</Button>

<Button variant="secondary" size="md">
  Secondary 버튼
</Button>

<Button variant="primary" size="sm" disabled>
  비활성화 버튼
</Button>
```

### TextInput

텍스트 입력 필드

**Props:**

| Prop         | Type                              | Default | 설명               |
| ------------ | --------------------------------- | ------- | ------------------ |
| label        | string                            | -       | 입력 필드 레이블   |
| placeholder  | string                            | ''      | Placeholder 텍스트 |
| value        | string                            | -       | 입력 값            |
| onChange     | (e: ChangeEvent) => void          | -       | 변경 이벤트        |
| errorMessage | string                            | -       | 에러 메시지        |
| required     | boolean                           | false   | 필수 입력 여부     |
| disabled     | boolean                           | false   | 비활성화 여부      |

**예제:**

```tsx
const [name, setName] = useState('');
const [errorMessage, setErrorMessage] = useState('');

<TextInput
  label="사용자 이름"
  placeholder="이름을 입력하세요"
  value={name}
  onChange={(e) => setName(e.target.value)}
  errorMessage={errorMessage}
  required
/>
```

## 스타일 커스터마이징

CSS 변수를 사용하여 테마 커스터마이징 가능:

```css
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;

  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --border-radius: 4px;
}
```

## TypeScript 지원
모든 컴포넌트는 완전한 TypeScript 타입 정의를 제공

```tsx
import type { ButtonProps, TextInputProps } from '@jbeat/uikit';
```

## 개발 환경 요구사항

- React >= 19.0.0
- react-dom >= 19.0.0

## 라이선스

MIT
