import { Link } from 'react-router-dom';
import './home.scss';

/**
 * 메인 안내 페이지
 * 사용 가능한 페이지들을 소개하고 네비게이션을 제공함
 */
export function Home() {
  const pages = [
    {
      id: 'consultation',
      title: '상담 신청',
      description: '고객 상담 신청을 받을 수 있는 폼 페이지입니다.',
      path: '/consultation',
      icon: '💬',
    },
  ];

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">JBeat UI Pages</h1>
        <p className="home-subtitle">
          재사용 가능한 페이지 컴포넌트 모음입니다. 각 페이지는 독립적으로 사용할 수 있습니다.
        </p>
      </div>

      <div className="pages-grid">
        {pages.map((page) => (
          <Link key={page.id} to={page.path} className="page-card">
            <div className="page-icon">{page.icon}</div>
            <h2 className="page-title">{page.title}</h2>
            <p className="page-description">{page.description}</p>
            <span className="page-link-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
