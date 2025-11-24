// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [js.configs.recommended, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      // Node.js globals
      process: 'readonly',
      __dirname: 'readonly',
      module: 'readonly',
      require: 'readonly',
      // Browser globals (window 에러 해결)
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
      navigator: 'readonly',
      HTMLElement: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLInputElement: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      alert: 'readonly',
      // Jest globals (테스트 에러 해결)
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      jest: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      afterAll: 'readonly',
      test: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}, {
  // Storybook 설정 파일들은 내부적으로 사용되므로 unused export 경고 무시
  files: ['**/.storybook/*.ts', '**/.storybook/*.tsx'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
}, prettierConfig, ...storybook.configs["flat/recommended"]];
