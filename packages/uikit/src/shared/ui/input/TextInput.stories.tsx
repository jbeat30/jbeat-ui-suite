import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ChangeEvent } from 'react';
import TextInput from './TextInput';

/**
 * TextInput 컴포넌트는 사용자로부터 텍스트 입력을 받는 기본 UI 요소
 * label, error message, 다양한 input 속성들을 지원함
 */
const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드의 레이블',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지 (표시 시 에러 스타일 적용)',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드의 placeholder',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 텍스트 입력 필드
 */
export const Default: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

/**
 * label이 없는 입력 필드
 */
export const WithoutLabel: Story = {
  args: {
    placeholder: '레이블 없는 입력',
  },
};

/**
 * 필수 입력 표시가 있는 입력 필드
 */
export const Required: Story = {
  args: {
    label: '이메일 *',
    placeholder: 'example@email.com',
    type: 'email',
    required: true,
  },
};

/**
 * 에러 메시지가 표시된 입력 필드
 */
export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    type: 'email',
    value: 'invalid-email',
    errorMessage: '올바른 이메일 형식이 아닙니다',
  },
};

/**
 * 비활성화된 입력 필드
 */
export const Disabled: Story = {
  args: {
    label: '비활성화된 필드',
    value: '수정할 수 없습니다',
    disabled: true,
  },
};

/**
 * 비밀번호 입력 필드
 */
export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

/**
 * 전화번호 입력 필드
 */
export const Telephone: Story = {
  args: {
    label: '전화번호',
    type: 'tel',
    placeholder: '010-1234-5678',
  },
};

/**
 * 상태 관리가 포함된 인터랙티브 예제
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // 간단한 유효성 검사
      if (newValue.length > 0 && newValue.length < 3) {
        setError('최소 3자 이상 입력해주세요');
      } else {
        setError('');
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextInput
          label="사용자 이름"
          placeholder="최소 3자 이상"
          value={value}
          onChange={handleChange}
          errorMessage={error}
        />
        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
          입력된 값: <strong>{value || '(비어있음)'}</strong>
        </div>
      </div>
    );
  },
};

/**
 * 다양한 타입의 입력 필드들을 보여줌
 */
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <TextInput label="텍스트" type="text" placeholder="텍스트를 입력하세요" />
      <TextInput label="이메일" type="email" placeholder="example@email.com" />
      <TextInput label="비밀번호" type="password" placeholder="비밀번호" />
      <TextInput label="전화번호" type="tel" placeholder="010-1234-5678" />
      <TextInput label="숫자" type="number" placeholder="숫자만 입력" />
      <TextInput label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

/**
 * 다양한 상태의 입력 필드들을 보여줌
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          일반 상태
        </h4>
        <TextInput label="이름" placeholder="이름을 입력하세요" />
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          값이 입력된 상태
        </h4>
        <TextInput label="이름" value="홍길동" />
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          에러 상태
        </h4>
        <TextInput
          label="이메일"
          value="invalid-email"
          errorMessage="올바른 이메일 형식이 아닙니다"
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          비활성화 상태
        </h4>
        <TextInput label="비활성화" value="수정 불가" disabled />
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          필수 입력
        </h4>
        <TextInput label="이메일 *" placeholder="example@email.com" required />
      </div>
    </div>
  ),
};
