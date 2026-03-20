import { Page, expect } from '@playwright/test'

export function createConfigureVehicleActions(page: Page) {
  return {
    async open() {
      await page.goto('/')
      const heroHeading = page.getByTestId('hero-section').getByRole('heading')
      await expect(heroHeading).toContainText('Velô Sprint')
      await page.getByRole('link', { name: 'Configure Agora' }).click()
      await expect(page).toHaveURL(/.*configure/)
    },

    async selectColor(colorName: string) {
      await page.getByRole('button', { name: colorName }).click();
    },

    async selectWheels(wheelsName: string) {
      await page.getByRole('button', { name: wheelsName }).click();
    },

    async validatePrice(expectedPrice: string) {
      await expect(page.getByText(expectedPrice)).toBeVisible();
    },

    async validateCarImage(imageSrc: string) {
      const imageCar = page.locator('img[alt^="Velô Sprint"]');
      await expect(imageCar).toHaveAttribute('src', imageSrc);
    }
  }
}
