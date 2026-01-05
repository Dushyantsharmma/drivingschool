import { expect, test } from "@playwright/test";

async function expectSectionActive(page, id) {
  await expect
    .poll(
      async () =>
        page.evaluate((sectionId) => {
          const el = document.getElementById(sectionId);
          if (!el) return 1e9;
          const rect = el.getBoundingClientRect();
          // Navigation scroll uses a fixed-header offset (~80px).
          return Math.abs(rect.top - 80);
        }, id),
      { timeout: 15_000 }
    )
    .toBeLessThanOrEqual(220);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    // Prevent real popups during tests and allow assertions.
    window.__openedUrls = [];
    const originalOpen = window.open;
    window.open = (url) => {
      window.__openedUrls.push(String(url));
      return null;
    };

    // Avoid blocking dialogs.
    window.__alerts = [];
    window.alert = (message) => {
      window.__alerts.push(String(message));
    };

    // Keep reference for debugging if needed.
    window.__originalOpen = originalOpen;
  });
});

test("Navigation: menu + logo scroll to sections", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");

  const topNav = page.getByRole("navigation").first();

  // Logo -> Home
  await topNav.getByRole("button", { name: "Go to home section" }).click();
  await expectSectionActive(page, "home");

  const items = [
    { name: "About", id: "about" },
    { name: "Courses", id: "courses" },
    { name: "Mock Test", id: "mock-test" },
    { name: "Symbols", id: "driving-symbols" },
    { name: "Gallery", id: "gallery" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" },
  ];

  for (const item of items) {
    // eslint-disable-next-line no-await-in-loop
    await test.step(`Navigate to ${item.name}`, async () => {
      await topNav
        .getByRole("button", { name: item.name, exact: true })
        .click();
      await expectSectionActive(page, item.id);
    });
  }
});

test("Enquiry form: phone validation + submission flow + duplicate prevention", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });

  // Mock the webhook response, but delay it slightly so we can verify disabled state.
  await page.route("**/webhook", async (route) => {
    await new Promise((r) => setTimeout(r, 800));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ status: "success" }),
    });
  });

  await page.goto("/");

  // Enquiry is lazy-mounted; scroll to its anchor to trigger mount.
  await page.locator("#enquiry").scrollIntoViewIfNeeded();

  const registerNow = page.getByRole("button", { name: "Register Now" });
  await expect(registerNow).toBeVisible();
  await registerNow.click();

  const modal = page
    .locator(".fixed.inset-0.z-50")
    .filter({ hasText: "Register now" });
  await expect(modal).toBeVisible();

  // Invalid phone shows an inline error.
  await modal.locator("#modal-fullName").fill("Test User");
  await modal.locator("#modal-mobileNumber").fill("123");
  await expect(modal.getByText(/valid 10-digit number/i)).toBeVisible();

  // Fill required fields.
  await modal.locator("#modal-mobileNumber").fill("9882034930");
  await modal.locator("#modal-dateOfBirth").fill("2000-01-01");
  await modal.locator("#modal-skillLevel").selectOption("beginner");
  await modal.locator("#modal-timeSlot").selectOption("morning");
  await modal.locator("#modal-pickupLocation").fill("Bhanthal");

  const submit = modal.getByRole("button", { name: /Submit/i });
  await submit.click();

  // Duplicate submission prevention while submitting.
  await expect(submit).toBeDisabled();
  await expect(submit).toContainText(/Processing/i);

  // Success message appears and WhatsApp opens (stubbed).
  await expect(page.getByText(/Registered! Opening WhatsApp/)).toBeVisible();
  await page.waitForFunction(() => (window.__openedUrls || []).length > 0);

  const openedUrls = await page.evaluate(() => window.__openedUrls);
  expect(openedUrls.some((u) => u.includes("wa.me/919882034930"))).toBeTruthy();

  // Form resets after submission.
  await expect(modal.locator("#modal-fullName")).toHaveValue("");
  await expect(modal.locator("#modal-mobileNumber")).toHaveValue("");
});

test("FAQ: accordion expands and collapses", async ({ page }) => {
  await page.goto("/");
  await page.locator("#faq").scrollIntoViewIfNeeded();

  const first = page.getByRole("button", {
    name: "WHAT IS THE MINIMUM AGE TO LEARN DRIVING?",
  });

  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/minimum age to learn driving is 18/i))
    .toBeVisible();

  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("Gallery: open lightbox and navigate next/prev", async ({ page }) => {
  await page.goto("/");
  await page.locator("#gallery").scrollIntoViewIfNeeded();

  // Click the first gallery card via the ancestor clickable container.
  const firstImg = page
    .locator('#gallery img[alt^="Raj Ann Raj Driving School"]')
    .first();

  await firstImg
    .locator('xpath=ancestor::div[contains(@class,"rounded-3xl")][1]')
    .click();

  // Lightbox appears.
  const lightbox = page
    .locator("div.fixed.inset-0")
    .filter({ has: page.locator('img[alt^="Raj Ann Raj Driving School"]') });
  await expect(lightbox).toBeVisible();

  // Next and Prev should work.
  await lightbox.locator("button.absolute.right-4").click();
  await lightbox.locator("button.absolute.left-4").click();

  // Close by clicking backdrop.
  await lightbox.click({ position: { x: 10, y: 10 } });
  await expect(lightbox).toBeHidden();
});
