module.exports = {
  // TypeScript를 Jest에서 사용하기 위한 프리셋
  preset: 'ts-jest',
  // 테스트 환경: jsdom으로 브라우저 환경 시뮬레이션
  testEnvironment: 'jsdom',
  // 테스트 파일을 찾을 루트 디렉토리
  roots: ['<rootDir>/src'],
  // 테스트 파일 매칭 패턴 (__tests__ 폴더 안의 .test.ts, .test.tsx 파일)
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  // 모듈 경로 별칭 설정
  moduleNameMapper: {
    // @/로 시작하는 경로를 src/로 매핑
    '^@/(.*)$': '<rootDir>/src/$1',
    // CSS/SCSS 파일을 identity-obj-proxy로 모킹 (테스트에서 스타일 파일 무시)
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  // 각 테스트 파일 실행 전에 실행할 설정 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  // 커버리지 수집 대상 파일 지정 (테스트가 코드의 어느 부분을 실행했는지 측정)
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // src 폴더의 모든 ts, tsx 파일
    '!src/**/*.d.ts', // 타입 정의 파일 제외
    '!src/**/__tests__/**', // 테스트 파일 제외
    '!src/index.ts', // 진입점 파일 제외
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    ],
  },
};
