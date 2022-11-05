import { test, expect, } from '@playwright/test';

test.describe("Timer", () => {
    const sel = 'input[type="number"]';

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test("Has default value", async ({ page }) => {
        const input = page.locator(sel)
        const current = parseInt(await input.inputValue())
        expect(current).not.toBeNaN()
    })

    test("decrements", async ({ page }) => {
        const input = page.locator(sel)
        const current = parseInt(await input.inputValue())
        await page.keyboard.press(" ")
        await page.waitForTimeout(1000);
        expect(parseInt(await input.inputValue())).toBe(current - 1)
        await page.keyboard.press(" ")
    })

    test("is overridable", async({page}) => {
        const input = page.locator(sel)
        await input.fill("10")
        await page.keyboard.press("Enter")
        expect(await input.inputValue()).toBe("10")
    })

    test('resets on escape', async ({ page }) => {
        const last = "10"
        const input = page.locator(sel)
        await input.click();
        await input.fill(last);
        await input.press('Enter');
        await input.click();
        await input.fill('42');
        await input.press('Escape');
        expect(await input.inputValue()).toBe(last)
      });
});