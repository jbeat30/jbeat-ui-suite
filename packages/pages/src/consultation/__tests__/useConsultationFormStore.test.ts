import { renderHook, act } from '@testing-library/react';
import { useConsultationFormStore } from '../model/useConsultationStore';

describe('useConsultationFormStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화함
    const { result } = renderHook(() => useConsultationFormStore());
    act(() => {
      result.current.reset();
    });
  });

  it('초기 상태가 올바르게 설정됨', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    expect(result.current.values).toEqual({
      name: '',
      email: '',
      phone: '',
      message: '',
      agreeToTerms: false,
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('setField로 필드값을 설정할 수 있음', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    act(() => {
      result.current.setField('name', '홍길동');
    });

    expect(result.current.values.name).toBe('홍길동');
  });

  it('setField 호출 시 해당 필드의 에러가 초기화됨', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    // 먼저 에러 설정함
    act(() => {
      result.current.setErrors({
        name: '이름을 입력해주세요',
      });
    });

    expect(result.current.errors.name).toBe('이름을 입력해주세요');

    // 필드값 변경함
    act(() => {
      result.current.setField('name', '홍길동');
    });

    // 해당 필드 에러가 초기화되었는지 확인함
    expect(result.current.errors.name).toBeUndefined();
  });

  it('여러 필드를 독립적으로 설정할 수 있음', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    act(() => {
      result.current.setField('name', '홍길동');
      result.current.setField('email', 'hong@example.com');
      result.current.setField('agreeToTerms', true);
    });

    expect(result.current.values.name).toBe('홍길동');
    expect(result.current.values.email).toBe('hong@example.com');
    expect(result.current.values.agreeToTerms).toBe(true);
  });

  it('setErrors로 에러 메시지를 설정할 수 있음', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    const errors = {
      name: '이름을 입력해주세요',
      email: '이메일 형식이 올바르지 않습니다',
    };

    act(() => {
      result.current.setErrors(errors);
    });

    expect(result.current.errors).toEqual(errors);
  });

  it('setSubmitting으로 제출 상태를 설정할 수 있음', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    expect(result.current.isSubmitting).toBe(false);

    act(() => {
      result.current.setSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);

    act(() => {
      result.current.setSubmitting(false);
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('reset으로 폼을 초기 상태로 되돌릴 수 있음', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    // 상태 변경함
    act(() => {
      result.current.setField('name', '홍길동');
      result.current.setField('email', 'hong@example.com');
      result.current.setErrors({ name: '에러' });
      result.current.setSubmitting(true);
    });

    // 상태가 변경되었는지 확인함
    expect(result.current.values.name).toBe('홍길동');
    expect(result.current.errors.name).toBe('에러');
    expect(result.current.isSubmitting).toBe(true);

    // 리셋함
    act(() => {
      result.current.reset();
    });

    // 초기 상태로 되돌아갔는지 확인함
    expect(result.current.values).toEqual({
      name: '',
      email: '',
      phone: '',
      message: '',
      agreeToTerms: false,
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('비동기 작업 시나리오 - 제출 중 에러 발생', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    // 폼 입력함
    act(() => {
      result.current.setField('name', '홍길동');
      result.current.setField('email', 'hong@example.com');
      result.current.setField('agreeToTerms', true);
    });

    // 제출 시작함
    act(() => {
      result.current.setSubmitting(true);
    });

    expect(result.current.isSubmitting).toBe(true);

    // 제출 실패함
    act(() => {
      result.current.setErrors({ general: '서버 오류가 발생했습니다' });
      result.current.setSubmitting(false);
    });

    // 상태 확인함 - 입력값은 유지되고 에러만 추가됨
    expect(result.current.values.name).toBe('홍길동');
    expect(result.current.values.email).toBe('hong@example.com');
    expect(result.current.errors.general).toBe('서버 오류가 발생했습니다');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('반복 제출 시도 시 상태 일관성 유지됨', () => {
    const { result } = renderHook(() => useConsultationFormStore());

    // 첫 번째 제출 시도함
    act(() => {
      result.current.setField('name', '홍길동');
      result.current.setSubmitting(true);
      result.current.setErrors({ name: '에러' });
      result.current.setSubmitting(false);
    });

    // 두 번째 제출 시도함
    act(() => {
      result.current.setField('name', '김철수');
      result.current.setSubmitting(true);
      result.current.setSubmitting(false);
    });

    // 이름 변경 시 에러가 초기화되었는지 확인함
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.values.name).toBe('김철수');
  });
});
