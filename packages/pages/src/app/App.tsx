import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ConsultationPage } from '../consultation';
import './app.scss';

/**
 * 개발용 애플리케이션
 *
 * 이 앱은 개발 시에만 사용되며, 실제 페이지 컴포넌트들은 완전히 독립적임
 * 개발용 네비게이션이 포함되어 있어 페이지 간 이동을 쉽게 할 수 있음
 *
 * 새로운 페이지를 추가하는 방법:
 * 1. src/[페이지명] 폴더를 만들고 페이지 컴포넌트를 개발함
 * 2. 아래 Routes에 새로운 Route를 추가함
 * 3. src/app/components/Navigation.tsx에 네비게이션 링크를 추가함
 * 4. src/app/pages/Home.tsx의 pages 배열에 페이지 정보를 추가함
 * 5. src/index.ts에서 페이지를 export함 (외부 사용을 위해)
 */
export function App() {
  // 상담 페이지 제출 핸들러 (개발용)
  const handleConsultationSubmit = async (data: unknown) => {
    console.log('폼 제출:', data);
    // 테스트용: 2초 후 성공함
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('상담 신청이 완료되었습니다!');
  };

  return (
    <BrowserRouter>
      <div className="dev-app">
        <Navigation />
        <main className="dev-app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/consultation"
              element={<ConsultationPage onSubmit={handleConsultationSubmit} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
