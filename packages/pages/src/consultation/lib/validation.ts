import { z } from 'zod';
import type { ConsultationFormValues } from '../types';

/**
 * 상담 신청서 폼 Zod 스키마
 */
export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .min(2, '이름은 최소 2자 이상이어야 합니다')
    .max(50, '이름은 50자를 초과할 수 없습니다'),

  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        // 한국 전화번호 패턴: 010-1234-5678, 010 1234 5678, 01012345678 등
        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
        return phoneRegex.test(val.replace(/\s/g, ''));
      },
      { message: '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)' }
    ),

  message: z.string().optional(),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: '약관에 동의해주세요',
  }),
});

/**
 * 검증 결과 타입
 */
export type ValidationResult =
  | { success: true; data: ConsultationFormValues }
  | { success: false; errors: Record<string, string> };

/**
 * 상담 신청서 폼 데이터를 검증함
 * @param data - 검증할 폼 데이터
 * @returns 검증 결과 (성공 시 데이터, 실패 시 필드별 에러 메시지)
 */
export const validateConsultationForm = (data: unknown): ValidationResult => {
  const result = consultationFormSchema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  // Zod 에러를 필드별 에러 메시지 맵으로 변환함
  const errors: Record<string, string> = {};
  result.error.errors.forEach((error) => {
    const fieldName = error.path[0];
    if (fieldName && typeof fieldName === 'string') {
      errors[fieldName] = error.message;
    }
  });

  return {
    success: false,
    errors,
  };
};
