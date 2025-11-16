import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * 버튼 컴포넌트의 variant 타입
 */
type ButtonVariant = 'primary' | 'secondary';

/**
 * 버튼 컴포넌트의 size 타입
 */
type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * 버튼 컴포넌트 Props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 내부 콘텐츠 */
  children: ReactNode;
  /** 버튼 스타일 variant (기본값: primary) */
  variant?: ButtonVariant;
  /** 버튼 크기 (기본값: md) */
  size?: ButtonSize;
}

/**
 * 재사용 가능한 버튼 컴포넌트
 * variant와 size를 지원하며 기본 button HTML 속성을 모두 전달받음
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...restProps
}: ButtonProps) => {
  // 기본 클래스명 조합함
  const classNames = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
