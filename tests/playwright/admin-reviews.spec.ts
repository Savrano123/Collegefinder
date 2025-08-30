import { test, expect } from "@playwright/test"

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"

test.describe("Admin Reviews Moderation", () => {
  test("pending to approved flow", async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/reviews`)
    await expect(page.getByRole('heading', { name: 'Reviews Moderation' })).toBeVisible()
    await page.getByRole('button', { name: 'Pending' }).click()
    const firstApprove = page.getByRole('button', { name: 'Approve' }).first()
    if (await firstApprove.isVisible()) {
      await firstApprove.click()
      await expect(page.getByText('Approved')).not.toBeVisible({ timeout: 1000 })
    }
  })
})

