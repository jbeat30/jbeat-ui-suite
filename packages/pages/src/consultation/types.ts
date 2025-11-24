/**
 * 사용자 정보 타입
 */
export interface User {
  /** 사용자 ID */
  id: string;
  /** 사용자 이름 */
  name: string;
  /** 사용자 이메일 */
  email: string;
}

/**
 * 상담 신청서 폼 데이터 타입
 */
export interface ConsultationFormValues {
  /** 신청자 이름 */
  name: string;
  /** 신청자 이메일 */
  email: string;
  /** 신청자 전화번호 (선택) */
  phone?: string;
  /** 상담 내용/메시지 (선택) */
  message?: string;
  /** 약관 동의 여부 */
  agreeToTerms: boolean;
}

/**
 * ConsultationPage 컴포넌트 Props
 */
export interface ConsultationPageProps {
  /** 사용자 정보 (선택, 있을 경우 폼에 미리 채워짐) */
  user?: User;
  /** 폼 제출 핸들러 */
  onSubmit: (data: ConsultationFormValues) => Promise<void>;
  /** 페이지 제목 (선택, 기본값: "상담 신청") */
  title?: string;
  /** 페이지 설명 (선택, 기본값: "아래 양식을 작성하여 상담을 신청해주세요") */
  description?: string;
}
