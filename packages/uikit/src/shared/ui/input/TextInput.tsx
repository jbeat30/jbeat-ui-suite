import { useId, type InputHTMLAttributes } from 'react';

/**
 * TextInput 컴포넌트 Props
 */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 레이블 텍스트 (선택) */
  label?: string;
  /** 에러 메시지 (선택, 있을 경우 에러 스타일 적용됨) */
  errorMessage?: string;
}

/**
 * 재사용 가능한 텍스트 인풋 컴포넌트
 * label과 errorMessage를 지원하며 기본 input HTML 속성을 모두 전달받음
 */
const TextInput = ({ label, errorMessage, className, id, ...restProps }: TextInputProps) => {
  // 고유한 ID 생성함 (label의 htmlFor와 input의 id 연결용)
  const inputId = id ?? `input-${useId()}`;

  // 에러 상태 여부 확인함
  const hasError = Boolean(errorMessage);

  // 컨테이너 클래스명 조합함
  const classNames = ['input', hasError && 'input--error', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}
      <input id={inputId} className="input__control" {...restProps} />
      {errorMessage && <span className="input__error">{errorMessage}</span>}
    </div>
  );
};

export default TextInput;
