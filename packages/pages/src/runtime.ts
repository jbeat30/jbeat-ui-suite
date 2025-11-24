import { createElement, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { ConsultationPage as ConsultationPageComponent } from './consultation';

interface RenderOptions<TProps> {
  /** 마운트할 대상 요소 (CSS selector 또는 HTMLElement) */
  target: string | HTMLElement;
  /** 페이지 컴포넌트에 전달할 props */
  props: TProps;
}

/**
 * 페이지를 렌더링하는 헬퍼 함수
 *
 * 동작 원리:
 * 1. target 파라미터로 HTML 요소를 찾음
 *    - target이 문자열('#app')이면: document.querySelector로 DOM에서 해당 요소를 찾음
 *    - target이 HTMLElement면: 그대로 사용
 *
 * 2. React 컴포넌트를 해당 요소에 렌더링
 *    - createRoot: React 18의 새로운 렌더링 API로, DOM 요소에 React 앱을 마운트할 "루트"를 생성
 *    - createElement: React 컴포넌트를 React 엘리먼트로 변환 (JSX 없이 사용)
 *    - render: 생성된 React 엘리먼트를 실제 DOM에 렌더링
 *
 * 예시:
 * HTML: <div id="app"></div>
 * 호출: renderPage(ConsultationPage, { target: '#app', props: {...} })
 * 결과: <div id="app"><ConsultationPage /></div> 처럼 렌더링됨
 */
const renderPage = <TProps extends object>(
  PageComponent: ComponentType<TProps>,
  options: RenderOptions<TProps>
): void => {
  const { target, props } = options;

  // 1단계: target 요소 찾기
  // - target이 string이면: CSS 셀렉터로 DOM에서 요소를 찾음 (예: '#app', '.container')
  // - target이 HTMLElement면: 이미 DOM 요소이므로 그대로 사용함
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

  // 2단계: 요소가 없으면 에러 발생
  // - 사용자가 잘못된 셀렉터를 입력했거나, HTML에 해당 요소가 없을 때
  if (!element) {
    throw new Error(
      `[JBeat Pages] 타겟 요소를 찾을 수 없음: ${typeof target === 'string' ? target : 'HTMLElement'}`
    );
  }

  // 3단계: React 루트 생성 및 렌더링
  // createRoot(element): 해당 DOM 요소를 React가 관리하는 루트로 만듦
  const root = createRoot(element);

  // createElement(PageComponent, props):
  // - PageComponent(React 컴포넌트)를 React 엘리먼트로 변환함
  // - props를 컴포넌트에 전달함
  // - JSX 없이 <PageComponent {...props} />와 동일한 작업을 수행함
  //
  // render(...): React 엘리먼트를 실제 DOM에 렌더링함
  root.render(createElement<TProps>(PageComponent, props));
};

/**
 * 페이지 등록 맵
 *
 * 새로운 페이지를 추가할 때:
 * 1. 상단에서 페이지 컴포넌트를 import
 * 2. 아래 객체에 { 페이지명: 컴포넌트 } 형태로 추가
 */
const pages = {
  consultation: ConsultationPageComponent,
} as const;

type ExtractProps<T> = T extends ComponentType<infer P> ? P : never;

type PageTypeMap = {
  [K in keyof typeof pages]: {
    render: (options: RenderOptions<ExtractProps<(typeof pages)[K]>>) => void;
  };
};

// 전역 객체에 등록할 타입 정의
declare global {
  interface Window {
    JBeatPages?: PageTypeMap;
  }
}

// 전역 객체 초기화
if (typeof window !== 'undefined') {
  window.JBeatPages = window.JBeatPages ?? ({} as PageTypeMap);

  (Object.keys(pages) as Array<keyof typeof pages>).forEach((pageName) => {
    const PageComponent = pages[pageName];
    type Props = ExtractProps<typeof PageComponent>;

    (window.JBeatPages as Record<string, unknown>)[pageName] = {
      render: (options: RenderOptions<Props>) => renderPage(PageComponent, options),
    };
  });
}

/**
 * ESM/CJS용 export 헬퍼 함수
 * 페이지 컴포넌트를 받아서 render 메서드를 가진 객체를 생성
 *
 * 주의: 여기서 export하는 것은 React 컴포넌트가 아니라 { render: ... } 객체임
 * 하지만 페이지를 나타내므로 PascalCase를 사용함
 */
const createPageExport = <TProps extends object>(component: ComponentType<TProps>) => ({
  render: (options: RenderOptions<TProps>) => renderPage(component, options),
});

// ESM/CJS용 export
// 사용: import { ConsultationPage } from '@jbeat/pages/runtime'
// ConsultationPage.render({ target: '#app', props: {...} })
export const ConsultationPage = createPageExport(ConsultationPageComponent);
