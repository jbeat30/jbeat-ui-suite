import { validateConsultationForm } from '../lib/validation';

describe('validateConsultationForm', () => {
  it('유효한 데이터는 검증을 통과함', () => {
    const validData = {
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      message: '상담 요청합니다',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it('선택 필드 없이도 검증을 통과함', () => {
    const minimalData = {
      name: '홍길동',
      email: 'hong@example.com',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(minimalData);
    expect(result.success).toBe(true);
  });

  it('이름이 비어있으면 에러 반환함', () => {
    const data = {
      name: '',
      email: 'hong@example.com',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['name']).toBeDefined();
    }
  });

  it('이름이 2자 미만이면 에러 반환함', () => {
    const data = {
      name: '홍',
      email: 'hong@example.com',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['name']).toContain('최소 2자');
    }
  });

  it('이메일이 비어있으면 에러 반환함', () => {
    const data = {
      name: '홍길동',
      email: '',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['email']).toBeDefined();
    }
  });

  it('잘못된 이메일 형식이면 에러 반환함', () => {
    const data = {
      name: '홍길동',
      email: 'invalid-email',
      agreeToTerms: true,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['email']).toContain('이메일 형식');
    }
  });

  it('올바른 전화번호 형식을 허용함', () => {
    const validPhones = ['010-1234-5678', '01012345678', '010 1234 5678', '011-123-4567'];

    validPhones.forEach((phone) => {
      const data = {
        name: '홍길동',
        email: 'hong@example.com',
        phone,
        agreeToTerms: true,
      };

      const result = validateConsultationForm(data);
      expect(result.success).toBe(true);
    });
  });

  it('잘못된 전화번호 형식이면 에러 반환함', () => {
    const invalidPhones = ['123-456-7890', '010-123-456', '02-1234-5678'];

    invalidPhones.forEach((phone) => {
      const data = {
        name: '홍길동',
        email: 'hong@example.com',
        phone,
        agreeToTerms: true,
      };

      const result = validateConsultationForm(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors['phone']).toBeDefined();
      }
    });
  });

  it('약관 동의하지 않으면 에러 반환함', () => {
    const data = {
      name: '홍길동',
      email: 'hong@example.com',
      agreeToTerms: false,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['agreeToTerms']).toContain('약관');
    }
  });

  it('여러 필드에 에러가 있을 때 모두 반환함', () => {
    const data = {
      name: '',
      email: 'invalid',
      phone: '123',
      agreeToTerms: false,
    };

    const result = validateConsultationForm(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors['name']).toBeDefined();
      expect(result.errors['email']).toBeDefined();
      expect(result.errors['phone']).toBeDefined();
      expect(result.errors['agreeToTerms']).toBeDefined();
    }
  });
});
