import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // E2E 테스트 파일이 위치한 디렉토리
  testDir: './tests/e2e',
  // 모든 테스트를 병렬로 실행
  fullyParallel: true,
  // CI 환경에서 .only로 특정 테스트만 실행하는 것을 금지
  forbidOnly: !!process.env['CI'],
  // 실패한 테스트 재시도 횟수 (CI에서는 2회, 로컬에서는 0회)
  retries: process.env['CI'] ? 2 : 0,
  // 동시 실행할 워커 수 (CI에서는 1개, 로컬에서는 자동)
  workers: process.env['CI'] ? 1 : undefined,
  // 테스트 결과 파일 (HTML 형식으로 출력)
  reporter: 'html',
  // 모든 테스트에서 공통으로 사용할 설정
  use: {
    // 테스트할 애플리케이션의 기본 URL
    baseURL: 'http://localhost:5173',
    // 첫 번째 재시도 시에만 trace 기록 (디버깅용)
    trace: 'on-first-retry',
  },
  // 테스트할 브라우저/디바이스 프로젝트 설정
  projects: [
    {
      // 데스크톱 크롬 브라우저 테스트
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // 모바일 크롬 브라우저 테스트 (Pixel 5 디바이스)
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  // 테스트 전에 실행할 개발 서버 설정
  webServer: {
    // 실행할 명령어
    command: 'pnpm dev',
    // 서버가 준비되었는지 확인할 URL
    url: 'http://localhost:5173',
    // CI 환경이 아니면 이미 실행 중인 서버 재사용
    reuseExistingServer: !process.env['CI'],
  },
});
