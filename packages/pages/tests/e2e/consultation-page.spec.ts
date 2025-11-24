import { test, expect } from '@playwright/test';

test.describe('ConsultationPage E2E', () => {
  test.beforeEach(async ({ page }) => {
    // 상담 페이지로 직접 접속
    await page.goto('/consultation');
  });

  test('페이지가 올바르게 렌더링됨', async ({ page }) => {
    // 페이지 제목 확인함
    await expect(page.getByRole('heading', { name: '상담 신청' })).toBeVisible();

    // 모든 폼 필드 존재 확인함
    await expect(page.getByLabel(/이름/)).toBeVisible();
    await expect(page.getByLabel(/이메일/)).toBeVisible();
    await expect(page.getByLabel(/전화번호/)).toBeVisible();
    await expect(page.getByLabel(/문의 내용/)).toBeVisible();
    await expect(page.getByLabel(/개인정보/)).toBeVisible();
    await expect(page.getByRole('button', { name: /상담 신청하기/ })).toBeVisible();
  });

  test('빈 폼 제출 시 에러 표시됨', async ({ page }) => {
    // 제출 버튼 클릭함
    await page.getByRole('button', { name: /상담 신청하기/ }).click();

    // 에러 메시지 확인함 (실제 validation 에러 메시지)
    await expect(page.getByText(/이름은 최소 2자 이상이어야 합니다/)).toBeVisible();
    await expect(page.getByText(/올바른 이메일 형식이 아닙니다/)).toBeVisible();
    await expect(page.getByText(/약관/)).toBeVisible();
  });

  test('올바른 데이터 입력 후 제출 성공함', async ({ page }) => {
    // 폼 입력함
    await page.getByLabel(/이름/).fill('홍길동');
    await page.getByLabel(/이메일/).fill('hong@example.com');
    await page.getByLabel(/전화번호/).fill('010-1234-5678');
    await page.getByLabel(/문의 내용/).fill('상담 요청합니다');
    await page.getByLabel(/개인정보/).check();

    // dialog 이벤트 감지함
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('상담 신청이 완료되었습니다');
      await dialog.accept();
    });

    // 제출 버튼 클릭함
    await page.getByRole('button', { name: /상담 신청하기/ }).click();

    // 제출 중 텍스트 확인함
    await expect(page.getByRole('button', { name: /제출 중/ })).toBeVisible();

    // 제출 완료 후 폼이 초기화되었는지 확인함
    await expect(page.getByLabel(/이름/)).toHaveValue('');
    await expect(page.getByLabel(/이메일/)).toHaveValue('');
  });

  test('잘못된 이메일 형식 입력 시 에러 표시됨', async ({ page }) => {
    await page.getByLabel(/이름/).fill('홍길동');
    await page.getByLabel(/이메일/).fill('invalid-email');
    await page.getByLabel(/개인정보/).check();
    await page.getByRole('button', { name: /상담 신청하기/ }).click();

    await expect(page.getByText(/이메일 형식/)).toBeVisible();
  });

  test('잘못된 전화번호 형식 입력 시 에러 표시됨', async ({ page }) => {
    await page.getByLabel(/이름/).fill('홍길동');
    await page.getByLabel(/이메일/).fill('hong@example.com');
    await page.getByLabel(/전화번호/).fill('123-456');
    await page.getByLabel(/개인정보/).check();
    await page.getByRole('button', { name: /상담 신청하기/ }).click();

    await expect(page.getByText(/전화번호 형식/)).toBeVisible();
  });

  test('약관 미동의 시 제출 불가함', async ({ page }) => {
    await page.getByLabel(/이름/).fill('홍길동');
    await page.getByLabel(/이메일/).fill('hong@example.com');
    // 약관 체크하지 않음
    await page.getByRole('button', { name: /상담 신청하기/ }).click();

    await expect(page.getByText(/약관/)).toBeVisible();
  });

  test('필드 입력 시 해당 에러가 사라짐', async ({ page }) => {
    // 먼저 에러 표시함
    await page.getByRole('button', { name: /상담 신청하기/ }).click();
    await expect(page.getByText(/이름은 최소 2자 이상이어야 합니다/)).toBeVisible();

    // 이름 입력함 (2자 이상)
    await page.getByLabel(/이름/).fill('홍길');

    // 이름 에러가 사라졌는지 확인함
    await expect(page.getByText(/이름은 최소 2자 이상이어야 합니다/)).not.toBeVisible();
  });

  test.describe('모바일 뷰포트', () => {
    test.use({
      viewport: { width: 375, height: 667 },
      hasTouch: true
    });

    test('모바일에서 레이아웃이 깨지지 않음', async ({ page }) => {
      await page.goto('/consultation');

      // 모든 요소가 표시되는지 확인함
      await expect(page.getByRole('heading', { name: '상담 신청' })).toBeVisible();
      await expect(page.getByLabel(/이름/)).toBeVisible();
      await expect(page.getByLabel(/이메일/)).toBeVisible();
      await expect(page.getByRole('button', { name: /상담 신청하기/ })).toBeVisible();

      // 기본 동작 확인함
      await page.getByLabel(/이름/).fill('홍길동');
      await page.getByLabel(/이메일/).fill('hong@example.com');
      await page.getByLabel(/개인정보/).check();

      await expect(page.getByLabel(/이름/)).toHaveValue('홍길동');
    });

    test('모바일에서 터치 입력이 정상 작동함', async ({ page }) => {
      await page.goto('/consultation');

      // 터치로 체크박스 선택함
      await page.getByLabel(/개인정보/).tap();
      await expect(page.getByLabel(/개인정보/)).toBeChecked();

      // 터치로 버튼 클릭함
      await page.getByRole('button', { name: /상담 신청하기/ }).tap();
      await expect(page.getByText(/이름은 최소 2자 이상이어야 합니다/)).toBeVisible();
    });
  });
});
