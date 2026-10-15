import { expect, test } from "@playwright/test";

/** Verifies that the foundation shell is reachable to a real browser. */
test("renders the application shell", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Universal Document Studio" }),
  ).toBeVisible();
});
