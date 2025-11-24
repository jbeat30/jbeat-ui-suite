import { createRoot } from 'react-dom/client';
import { App } from './app/App';

/**
 * 개발용 진입점
 * 이 파일은 외부로 export되지 않음
 */

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
