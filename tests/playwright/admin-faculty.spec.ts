import { test, expect } from "@playwright/test"

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000"

test.describe("Admin Faculty CRUD", () => {
  test("list and create faculty", async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/faculty`)
    await expect(page.getByRole('heading', { name: 'Faculty Management' })).toBeVisible()

    await page.getByRole('link', { name: 'Add Faculty' }).click()
    await expect(page.getByRole('heading', { name: 'Add Faculty' })).toBeVisible()

    await page.getByLabel('Department ID').fill('dep-1')
    await page.getByLabel('Name').fill('Dr. Ada Lovelace')
    await page.getByLabel('Designation').fill('Professor')
    await page.getByLabel('Qualification').fill('PhD')
    await page.getByLabel('Experience (years)').fill('10')
    await page.getByLabel('Email').fill('ada@example.com')

    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page).toHaveURL(/\/admin\/faculty$/)
    await expect(page.getByRole('cell', { name: 'Dr. Ada Lovelace' })).toBeVisible()
  })
})

