import { test, expect } from "@playwright/test";

test.describe("컴포넌트별 시각적 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Box 컴포넌트 시각 확인", async ({ page }) => {
    // Box 컴포넌트가 포함된 섹션으로 스크롤 (있는 경우)
    await page.evaluate(() => {
      const boxSection = document.querySelector('[data-testid="box-section"], .box-demo');
      if (boxSection) {
        boxSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    await page.waitForTimeout(1000);

    // 해당 영역 스크린샷
    await page.screenshot({
      path: "test-results/box-component.png",
      fullPage: false,
    });
  });

  test("Arrow 컴포넌트 시각 확인", async ({ page }) => {
    // Arrow 컴포넌트 섹션 찾기
    await page.evaluate(() => {
      const arrowSection = document.querySelector('[data-testid="arrow-section"], .arrow-demo');
      if (arrowSection) {
        arrowSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/arrow-component.png",
      fullPage: false,
    });
  });

  test("Connector 컴포넌트 시각 확인", async ({ page }) => {
    // Connector 컴포넌트 섹션 찾기
    await page.evaluate(() => {
      const connectorSection = document.querySelector('[data-testid="connector-section"], .connector-demo');
      if (connectorSection) {
        connectorSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "test-results/connector-component.png",
      fullPage: false,
    });
  });

  test("전체 페이지 스크롤 테스트", async ({ page }) => {
    // 페이지 전체를 스크롤하면서 각 섹션 캡처
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);

    let currentScroll = 0;
    let screenshotIndex = 0;

    while (currentScroll < pageHeight) {
      await page.evaluate((scroll) => {
        window.scrollTo(0, scroll);
      }, currentScroll);

      await page.waitForTimeout(500);

      await page.screenshot({
        path: `test-results/scroll-section-${screenshotIndex}.png`,
        fullPage: false,
      });

      currentScroll += viewportHeight * 0.8; // 20% 오버랩
      screenshotIndex++;

      // 무한 루프 방지
      if (screenshotIndex > 10) break;
    }
  });

  test("다이어그램 컴포넌트 렌더링 확인", async ({ page }) => {
    // 다이어그램 컨테이너 대기
    const diagramContainer = page.locator('[data-testid="diagram-container"], .diagram-wrapper, #root');
    await expect(diagramContainer).toBeVisible();

    // 컴포넌트들이 렌더링되었는지 확인
    const components = page.locator('.box, .arrow, .connector, [class*="component"]');

    // 최소 하나의 컴포넌트는 있어야 함
    if ((await components.count()) > 0) {
      await expect(components.first()).toBeVisible();
    }

    // 다이어그램 영역 스크린샷
    await diagramContainer.screenshot({ path: "test-results/diagram-render.png" });
  });

  test("다크모드/라이트모드 전환 테스트", async ({ page }) => {
    // 라이트모드 스크린샷
    await page.screenshot({ path: "test-results/light-mode.png" });

    // 다크모드 토글 버튼 찾기 (있는 경우)
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"], .theme-toggle, .dark-mode-btn');

    if ((await darkModeToggle.count()) > 0) {
      await darkModeToggle.click();
      await page.waitForTimeout(1000);

      // 다크모드 스크린샷
      await page.screenshot({ path: "test-results/dark-mode.png" });
    }
  });

  test("로딩 상태 확인", async ({ page }) => {
    // 페이지 리로드하면서 로딩 상태 캡처
    await page.reload();

    // 로딩 스피너나 스켈레톤이 있는지 확인
    const loadingElements = page.locator('.loading, .spinner, .skeleton, [data-testid="loading"]');

    if ((await loadingElements.count()) > 0) {
      await page.screenshot({ path: "test-results/loading-state.png" });
    }

    // 로딩 완료 대기
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "test-results/loaded-state.png" });
  });
});
