/**
 * @jbeat/pages - CDN 런타임 진입점
 *
 * 정적 HTML에서 window.JBeatPages를 통해 페이지를 렌더링할 수 있음
 *
 * 사용 예시:
 * <script src="https://cdn.../pages.js"></script>
 * <script>
 *   JBeatPages.consultation.render({
 *     target: '#app',
 *     props: { onSubmit: async (data) => {...} }
 *   });
 * </script>
 */

import { createElement, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { ConsultationPage } from './consultation';
import type { ConsultationPageProps } from './consultation';

/**
 * 렌더링 옵션 타입
 */
interface RenderOptions<TProps> {
  /** 마운트할 대상 요소 (CSS selector 또는 HTMLElement) */
  target: string | HTMLElement;
  /** 페이지 컴포넌트에 전달할 props */
  props: TProps;
}

/**
 * 페이지를 렌더링하는 헬퍼 함수
 */
const renderPage = <TProps extends object>(
  PageComponent: ComponentType<TProps>,
  options: RenderOptions<TProps>
): void => {
  const { target, props } = options;

  // target 요소 찾기
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;

  if (!element) {
    throw new Error(
      `[JBeat Pages] 타겟 요소를 찾을 수 없습니다: ${typeof target === 'string' ? target : 'HTMLElement'}`
    );
  }

  // React 루트 생성 및 렌더링함
  const root = createRoot(element);
  root.render(createElement<TProps>(PageComponent, props));
};

/**
 * 전역 객체에 등록할 타입 정의
 */
declare global {
  interface Window {
    JBeatPages?: {
      consultation?: {
        render: (options: RenderOptions<ConsultationPageProps>) => void;
      };
    };
  }
}

// 전역 객체 초기화함
if (typeof window !== 'undefined') {
  window.JBeatPages = window.JBeatPages ?? {};

  // Consultation 페이지 등록함
  window.JBeatPages.consultation = {
    render: (options) => renderPage(ConsultationPage, options),
  };
}

// ESM/CJS용 export (필요 시)
export const consultation = {
  render: (options: RenderOptions<ConsultationPageProps>) => renderPage(ConsultationPage, options),
};