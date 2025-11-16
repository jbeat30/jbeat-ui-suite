import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from '../TextInput';

describe('TextInput', () => {
  it('렌더링 확인', () => {
    render(<TextInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('label이 올바르게 표시됨', () => {
    render(<TextInput label="이름" />);
    const labelElement = screen.getByText('이름');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe('LABEL');
  });

  it('label이 없을 때는 표시되지 않음', () => {
    render(<TextInput />);
    const labelElement = screen.queryByRole('label');
    expect(labelElement).not.toBeInTheDocument();
  });

  it('label과 input이 올바르게 연결됨 (htmlFor, id)', () => {
    render(<TextInput label="이메일" id="email-input" />);
    const labelElement = screen.getByText('이메일');
    const inputElement = screen.getByRole('textbox');
    expect(labelElement).toHaveAttribute('for', 'email-input');
    expect(inputElement).toHaveAttribute('id', 'email-input');
  });

  it('에러 메시지가 올바르게 표시됨', () => {
    render(<TextInput errorMessage="필수 입력 항목입니다" />);
    const errorElement = screen.getByText('필수 입력 항목입니다');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('input__error');
  });

  it('에러 메시지가 없을 때는 표시되지 않음', () => {
    const { container } = render(<TextInput />);
    const errorElement = container.querySelector('.input__error');
    expect(errorElement).not.toBeInTheDocument();
  });

  it('에러 상태일 때 input--error 클래스가 적용됨', () => {
    const { container } = render(<TextInput errorMessage="에러 발생" />);
    const containerElement = container.querySelector('.input');
    expect(containerElement).toHaveClass('input--error');
  });

  it('에러 상태가 아닐 때 input--error 클래스가 없음', () => {
    const { container } = render(<TextInput />);
    const containerElement = container.querySelector('.input');
    expect(containerElement).not.toHaveClass('input--error');
  });

  it('기본 input__control 클래스가 적용됨', () => {
    render(<TextInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('input__control');
  });

  it('placeholder가 올바르게 전달됨', () => {
    render(<TextInput placeholder="입력하세요" />);
    const inputElement = screen.getByPlaceholderText('입력하세요');
    expect(inputElement).toBeInTheDocument();
  });

  it('disabled 속성이 올바르게 전달됨', () => {
    render(<TextInput disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  it('value와 onChange가 올바르게 동작함', () => {
    const handleChange = jest.fn();
    render(<TextInput value="테스트" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('테스트');

    fireEvent.change(inputElement, { target: { value: '변경됨' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('type 속성이 올바르게 전달됨', () => {
    render(<TextInput type="email" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('required 속성이 올바르게 전달됨', () => {
    render(<TextInput required />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeRequired();
  });

  it('커스텀 className이 컨테이너에 병합됨', () => {
    const { container } = render(<TextInput className="custom-input" />);
    const containerElement = container.querySelector('.input');
    expect(containerElement).toHaveClass('input');
    expect(containerElement).toHaveClass('custom-input');
  });

  it('모든 요소가 함께 렌더링됨', () => {
    render(
      <TextInput
        label="이름"
        placeholder="이름을 입력하세요"
        errorMessage="이름은 필수입니다"
      />
    );

    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름을 입력하세요')).toBeInTheDocument();
    expect(screen.getByText('이름은 필수입니다')).toBeInTheDocument();
  });
});
