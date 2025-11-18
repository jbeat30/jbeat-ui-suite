/**
 * @jbeat/pages - 패키지 진입점
 *
 * 모든 페이지를 여기서 export함
 * UIKit 스타일은 자동으로 로드됨
 */

// UIKit 스타일 자동 import
import '@jbeat/uikit/dist/styles.css';

// Consultation 페이지
export {
  ConsultationPage,
  type ConsultationPageProps,
  type User,
  type ConsultationFormValues,
} from './consultation';