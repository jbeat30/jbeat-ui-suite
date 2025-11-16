import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ConsultationForm } from '../ui/ConsultationForm';

// Zustand store 리셋을 위한 헬퍼
import { useConsultationFormStore } from '../model/useConsultationStore';

describe('ConsultationForm', () => {
  let onSubmitMock: jest.Mock;

  beforeEach(() => {
    onSubmitMock = jest.fn().mockResolvedValue(undefined);

    // 각 테스트 전에 스토어 초기화함
    const { reset } = useConsultationFormStore.getState();
    reset();
  });

  it('렌더링 확인', () => {
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    expect(screen.getByLabelText(/이름/)).toBeInTheDocument();
    expect(screen.getByLabelText(/이메일/)).toBeInTheDocument();
    expect(screen.getByLabelText(/전화번호/)).toBeInTheDocument();
    expect(screen.getByLabelText(/문의 내용/)).toBeInTheDocument();
    expect(screen.getByLabelText(/개인정보/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /상담 신청하기/ })).toBeInTheDocument();
  });

  it('빈 폼 제출 시 검증 에러 표시됨', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });
    await user.click(submitButton);

    // 검증 에러가 표시되는지 확인함
    await waitFor(() => {
      expect(screen.getByText(/이름은 최소 2자 이상이어야 합니다/)).toBeInTheDocument();
      expect(screen.getByText(/올바른 이메일 형식이 아닙니다/)).toBeInTheDocument();
      expect(screen.getByText(/약관/)).toBeInTheDocument();
    });

    // onSubmit이 호출되지 않았는지 확인함
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('잘못된 이메일 형식 입력 시 에러 표시됨', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/);
    const emailInput = screen.getByLabelText(/이메일/);
    const agreeCheckbox = screen.getByLabelText(/개인정보/);
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'invalid-email');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/이메일 형식/)).toBeInTheDocument();
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('올바른 데이터 입력 후 제출 시 onSubmit 호출됨', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/);
    const emailInput = screen.getByLabelText(/이메일/);
    const phoneInput = screen.getByLabelText(/전화번호/);
    const messageInput = screen.getByLabelText(/문의 내용/);
    const agreeCheckbox = screen.getByLabelText(/개인정보/);
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'hong@example.com');
    await user.type(phoneInput, '010-1234-5678');
    await user.type(messageInput, '상담 요청합니다');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({
        name: '홍길동',
        email: 'hong@example.com',
        phone: '010-1234-5678',
        message: '상담 요청합니다',
        agreeToTerms: true,
      });
    });
  });

  it('필수 필드만 입력해도 제출 가능함', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/);
    const emailInput = screen.getByLabelText(/이메일/);
    const agreeCheckbox = screen.getByLabelText(/개인정보/);
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'hong@example.com');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: '홍길동',
          email: 'hong@example.com',
          agreeToTerms: true,
        })
      );
    });
  });

  it('제출 중 버튼이 비활성화되고 텍스트가 변경됨', async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });
    onSubmitMock.mockReturnValue(submitPromise);

    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/);
    const emailInput = screen.getByLabelText(/이메일/);
    const agreeCheckbox = screen.getByLabelText(/개인정보/);
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'hong@example.com');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    // 제출 중 상태 확인함
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /제출 중/ })).toBeDisabled();
    });

    // 제출 완료함
    resolveSubmit!();

    // 버튼이 다시 활성화됨
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /상담 신청하기/ })).not.toBeDisabled();
    });
  });

  it('onSubmit 실패 시 에러 메시지 표시됨', async () => {
    const user = userEvent.setup();
    onSubmitMock.mockRejectedValue(new Error('서버 오류가 발생했습니다'));

    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/);
    const emailInput = screen.getByLabelText(/이메일/);
    const agreeCheckbox = screen.getByLabelText(/개인정보/);
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'hong@example.com');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/서버 오류가 발생했습니다/)).toBeInTheDocument();
    });
  });

  it('제출 성공 후 폼이 초기화됨', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const nameInput = screen.getByLabelText(/이름/) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/이메일/) as HTMLInputElement;
    const agreeCheckbox = screen.getByLabelText(/개인정보/) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    await user.type(nameInput, '홍길동');
    await user.type(emailInput, 'hong@example.com');
    await user.click(agreeCheckbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(agreeCheckbox.checked).toBe(false);
    });
  });

  it('필드 입력 시 해당 필드의 에러가 초기화됨', async () => {
    const user = userEvent.setup();
    render(<ConsultationForm onSubmit={onSubmitMock} />);

    const submitButton = screen.getByRole('button', { name: /상담 신청하기/ });

    // 먼저 제출하여 에러 표시함
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/이름은 최소 2자 이상이어야 합니다/)).toBeInTheDocument();
    });

    // 이름 입력함
    const nameInput = screen.getByLabelText(/이름/);
    await user.type(nameInput, '홍');

    // 이름 필드의 에러가 초기화되었는지 확인함
    await waitFor(() => {
      expect(screen.queryByText(/이름을 입력해주세요/)).not.toBeInTheDocument();
    });
  });
});
