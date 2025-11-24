import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button', () => {
  it('렌더링 확인', () => {
    render(<Button>클릭</Button>);
    const buttonElement = screen.getByRole('button', { name: '클릭' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('children prop이 올바르게 표시됨', () => {
    render(<Button>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('기본 variant는 primary임', () => {
    render(<Button>버튼</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--primary');
  });

  it('variant prop에 따라 올바른 클래스 적용됨', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--secondary');
  });

  it('기본 size는 md임', () => {
    render(<Button>버튼</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--md');
  });

  it('size prop에 따라 올바른 클래스 적용됨', () => {
    const { rerender } = render(<Button size="sm">작은 버튼</Button>);
    let buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--sm');

    rerender(<Button size="md">중간 버튼</Button>);
    buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--md');

    rerender(<Button size="lg">큰 버튼</Button>);
    buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn--lg');
  });

  it('기본 btn 클래스가 항상 적용됨', () => {
    render(<Button>버튼</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn');
  });

  it('커스텀 className이 병합됨', () => {
    render(<Button className="custom-class">버튼</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('btn');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('disabled 속성이 올바르게 전달됨', () => {
    render(<Button disabled>비활성화 버튼</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('onClick 핸들러가 호출됨', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태에서 onClick이 호출되지 않음', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        비활성화
      </Button>
    );
    const buttonElement = screen.getByRole('button');
    buttonElement.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('HTML button 속성이 올바르게 전달됨', () => {
    render(
      <Button type="submit" data-testid="submit-btn">
        제출
      </Button>
    );
    const buttonElement = screen.getByTestId('submit-btn');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
