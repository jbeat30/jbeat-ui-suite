import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { ConsultationPage } from './consultation';

function DevApp() {
  const [currentPage, setCurrentPage] = useState<string>('');

  // URL 해시 기반 라우팅
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'consultation';
      setCurrentPage(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 상담 페이지 제출 핸들러
  const handleConsultationSubmit = async (data: unknown) => {
    console.log('폼 제출:', data);
    // 테스트용: 2초 후 성공
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('상담 신청이 완료되었습니다!');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 개발용 네비게이션 헤더 */}
      <nav
        style={{
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '1rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
            JBeat Pages - Development
          </h1>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <a
                href="#consultation"
                style={{
                  color: currentPage === 'consultation' ? '#60a5fa' : 'white',
                  textDecoration: 'none',
                  fontWeight: currentPage === 'consultation' ? 'bold' : 'normal',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  backgroundColor:
                    currentPage === 'consultation' ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                상담 신청
              </a>
            </li>
            {/* 향후 페이지 추가 시 여기에 링크 추가 */}
            {/* <li><a href="#signup">회원가입</a></li> */}
            {/* <li><a href="#login">로그인</a></li> */}
          </ul>
        </div>
      </nav>

      {/* 페이지 컨텐츠 */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {currentPage === 'consultation' && (
            <div>
              <div
                style={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem',
                }}
              >
                개발 모드: 이 페이지는 개발 시 미리보기용입니다. 실제 배포 시에는 필요한 컴포넌트만
                import하여 사용합니다.
              </div>
              <ConsultationPage onSubmit={handleConsultationSubmit} />
            </div>
          )}

          {/* 향후 페이지 추가 시 여기에 조건부 렌더링 추가 */}
          {/* {currentPage === 'signup' && <SignupPage />} */}
          {/* {currentPage === 'login' && <LoginPage />} */}

          {!['consultation'].includes(currentPage) && (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: '#64748b',
              }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>페이지를 찾을 수 없습니다</h2>
              <p>위의 네비게이션에서 페이지를 선택해주세요.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<DevApp />);
