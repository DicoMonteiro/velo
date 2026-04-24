import { Page, expect } from '@playwright/test'

export function createHeroActions(page: Page) {

    return {

        async open() {
            await page.goto('/')
            const title = page.getByTestId('hero-section').getByRole('heading')
            await expect(title).toContainText('Velô Sprint')
        }
    }
}