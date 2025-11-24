import { create } from 'zustand';

/**
 * 상담 신청서 폼 필드값 타입
 */
interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
}

/**
 * 상담 신청서 폼 상태 타입
 */
interface ConsultationFormState {
  /** 폼 필드값 */
  values: FormValues;
  /** 필드별 에러 메시지 */
  errors: Record<string, string | undefined>;
  /** 제출 진행 중 여부 */
  isSubmitting: boolean;
}

/**
 * 상담 신청서 폼 액션 타입
 */
interface ConsultationFormActions {
  /** 특정 필드값 설정함 */
  setField: (name: keyof FormValues, value: string | boolean) => void;
  /** 에러 메시지 설정함 */
  setErrors: (errors: Record<string, string | undefined>) => void;
  /** 제출 상태 설정함 */
  setSubmitting: (isSubmitting: boolean) => void;
  /** 폼을 초기 상태로 리셋함 */
  reset: () => void;
}

/**
 * 전체 스토어 타입
 */
type ConsultationFormStore = ConsultationFormState & ConsultationFormActions;

/**
 * 초기 폼 필드값
 */
const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  agreeToTerms: false,
};

/**
 * 초기 상태
 */
const initialState: ConsultationFormState = {
  values: initialValues,
  errors: {},
  isSubmitting: false,
};

/**
 * 상담 신청서 폼 상태 관리 스토어 (내부용, export하지 않음)
 */
export const useConsultationFormStore = create<ConsultationFormStore>((set) => ({
  ...initialState,

  setField: (name, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [name]: value,
      },
      // 필드값 변경 시 해당 필드의 에러 초기화함
      errors: {
        ...state.errors,
        [name]: undefined,
      },
    })),

  setErrors: (errors) =>
    set({
      errors,
    }),

  setSubmitting: (isSubmitting) =>
    set({
      isSubmitting,
    }),

  reset: () =>
    set({
      ...initialState,
    }),
}));
