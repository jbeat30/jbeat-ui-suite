import { ConsultationForm } from './ConsultationForm';
import type { ConsultationPageProps } from '../types';
import '../styles/consultation.scss';

/**
 * 상담 신청 페이지 컴포넌트
 * 전체 페이지 레이아웃을 구성하고 ConsultationForm을 포함함
 * 모바일 퍼스트 레이아웃으로 설계됨
 */
function ConsultationPage({
  title = '상담 신청',
  description = '아래 양식을 작성하여 상담을 신청해주세요',
  onSubmit,
}: ConsultationPageProps) {
  return (
    <div className="consultation-page">
      <main className="consultation-page__main">
        {/* 헤더 섹션 */}
        <header className="consultation-page__header">
          <h1 className="consultation-page__title">{title}</h1>
          <p className="consultation-page__description">{description}</p>
        </header>

        {/* 폼 섹션 */}
        <section className="consultation-page__form-section">
          <ConsultationForm onSubmit={onSubmit} />
        </section>

        {/* 푸터 섹션 */}
        <footer className="consultation-page__footer">
          <p className="consultation-page__footer-text">문의사항이 있으시면 언제든지 연락주세요</p>
        </footer>
      </main>
    </div>
  );
}

export default ConsultationPage;
