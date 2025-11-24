import type { FormEvent } from 'react';
import { Button, TextInput } from '@jbeat/uikit';
import { useConsultationFormStore } from '../model/useConsultationStore';
import { validateConsultationForm } from '../lib/validation';
import type { ConsultationFormValues } from '../types';

/**
 * ConsultationForm 컴포넌트 Props
 */
export interface ConsultationFormProps {
  /** 폼 제출 핸들러 (비동기) */
  onSubmit: (data: ConsultationFormValues) => Promise<void>;
}

/**
 * 상담 신청서 폼 컴포넌트
 * UIKit 컴포넌트를 사용하여 폼을 구성하고 Zod 검증을 수행
 */
export const ConsultationForm = ({ onSubmit }: ConsultationFormProps) => {
  const { values, errors, isSubmitting, setField, setErrors, setSubmitting, reset } =
    useConsultationFormStore();

  // 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 검증 수행
    const result = validateConsultationForm(values);

    if (!result.success) {
      // 검증 실패 시 에러 표시함
      setErrors(result.errors);
      return;
    }

    // 제출 시작함
    setSubmitting(true);
    setErrors({});

    try {
      // onSubmit 콜백 호출함
      await onSubmit(result.data);

      // 성공 시 폼 리셋함
      reset();
    } catch (error) {
      // 에러 발생 시 에러 메시지 표시함
      setErrors({
        general: error instanceof Error ? error.message : '제출 중 오류가 발생했습니다',
      });
    } finally {
      // 제출 완료함
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="consultation-form">
      {/* 전역 에러 메시지 */}
      {errors['general'] && (
        <div className="consultation-form__error-banner" role="alert">
          {errors['general']}
        </div>
      )}

      {/* 이름 입력 */}
      <TextInput
        label="이름 *"
        name="name"
        value={values.name}
        onChange={(e) => setField('name', e.target.value)}
        errorMessage={errors['name']}
        placeholder="이름을 입력하세요"
        disabled={isSubmitting}
        required
      />

      {/* 이메일 입력 */}
      <TextInput
        label="이메일 *"
        type="email"
        name="email"
        value={values.email}
        onChange={(e) => setField('email', e.target.value)}
        errorMessage={errors['email']}
        placeholder="example@email.com"
        disabled={isSubmitting}
        required
      />

      {/* 전화번호 입력 */}
      <TextInput
        label="전화번호"
        type="tel"
        name="phone"
        value={values.phone}
        onChange={(e) => setField('phone', e.target.value)}
        errorMessage={errors['phone']}
        placeholder="010-1234-5678"
        disabled={isSubmitting}
      />

      {/* 메시지 입력 */}
      <div className="consultation-form__message">
        <label htmlFor="message" className="consultation-form__message-label">
          문의 내용
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          placeholder="문의하실 내용을 입력해주세요"
          disabled={isSubmitting}
          rows={4}
          className="consultation-form__message-textarea"
        />
      </div>

      {/* 약관 동의 */}
      <div className="consultation-form__terms">
        <label className="consultation-form__terms-label">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={values.agreeToTerms}
            onChange={(e) => setField('agreeToTerms', e.target.checked)}
            disabled={isSubmitting}
            className="consultation-form__terms-checkbox"
          />
          <span>개인정보 수집 및 이용에 동의합니다 *</span>
        </label>
        {errors['agreeToTerms'] && (
          <span className="consultation-form__terms-error">{errors['agreeToTerms']}</span>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button type="submit" disabled={isSubmitting} variant="primary" size="lg">
        {isSubmitting ? '제출 중...' : '상담 신청하기'}
      </Button>
    </form>
  );
};
