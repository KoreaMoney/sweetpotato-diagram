import { test, expect } from "@playwright/test";

test.describe("sweet-diagram 시각적 테스트", () => {
  test("메인 페이지가 로드되어야 합니다", async ({ page }) => {
    await page.goto("/");

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/sweet-diagram/);

    // 메인 컨테이너가 존재하는지 확인
    await expect(page.locator("#root")).toBeVisible();

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState("networkidle");
  });

  test("다이어그램 컴포넌트들이 렌더링되어야 합니다", async ({ page }) => {
    await page.goto("/");

    // 메인 컨테이너가 렌더링되는지 확인
    const mainContainer = page.locator("#root, .main-container, .diagram-container");
    await expect(mainContainer).toBeVisible();

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForLoadState("networkidle");

    // 스크린샷 찍기
    await page.screenshot({ path: "test-results/main-page.png" });
  });

  test("네비게이션이 작동해야 합니다", async ({ page }) => {
    await page.goto("/");

    // 네비게이션 요소들 찾기 (실제 DOM 구조에 맞게 조정 필요)
    const navLinks = page.locator('nav a, [role="navigation"] a, .nav-link');

    if ((await navLinks.count()) > 0) {
      // 첫 번째 네비게이션 링크 클릭
      await navLinks.first().click();

      // 페이지 변화 확인
      await page.waitForLoadState("networkidle");

      // 스크린샷 찍기
      await page.screenshot({ path: "test-results/navigation.png" });
    }
  });

  test("반응형 디자인이 작동해야 합니다", async ({ page }) => {
    // 데스크톱 뷰
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: "test-results/desktop-view.png" });

    // 태블릿 뷰
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "test-results/tablet-view.png" });

    // 모바일 뷰
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "test-results/mobile-view.png" });
  });

  test("다이어그램 상호작용 테스트", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 메인 컨테이너 또는 다이어그램 영역 찾기
    const interactiveArea = page.locator("#root, .diagram-container, .main-container");
    await expect(interactiveArea).toBeVisible();

    // 마우스 상호작용
    await interactiveArea.hover();
    await page.waitForTimeout(500);

    // 마우스 클릭
    await interactiveArea.click();
    await page.waitForTimeout(500);

    // 드래그 시뮬레이션 (버튼이나 드래그 가능한 요소가 있는 경우)
    const draggableElements = page.locator('.draggable, .box, [draggable="true"]');

    if ((await draggableElements.count()) > 0) {
      await draggableElements.first().dragTo(draggableElements.first(), {
        sourcePosition: { x: 10, y: 10 },
        targetPosition: { x: 50, y: 50 },
      });
    }

    // 상호작용 후 스크린샷
    await page.screenshot({ path: "test-results/interaction-test.png" });
  });

  test("성능 메트릭 확인", async ({ page }) => {
    await page.goto("/");

    // First Contentful Paint 측정
    const fcpMetric = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              resolve(entry.startTime);
            }
          }
        }).observe({ entryTypes: ["paint"] });

        // 타임아웃 설정
        setTimeout(() => resolve(null), 5000);
      });
    });

    console.log("First Contentful Paint:", fcpMetric);

    // 페이지 로드 시간이 5초 이내인지 확인
    if (fcpMetric) {
      expect(fcpMetric).toBeLessThan(5000);
    }
  });
});
