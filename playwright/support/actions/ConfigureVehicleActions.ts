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

    async expectPrice(price: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(price)
    },

    async validateCarImage(imageSrc: string | RegExp) {
      const imageCar = page.locator('img[alt^="Velô Sprint"]');
      await expect(imageCar).toHaveAttribute('src', imageSrc);
    },

    async toggleOptional(optionalName: string) {
      await page.getByRole('checkbox', { name: optionalName }).click();
    },

    async goToCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click();
      await expect(page).toHaveURL(/.*order/);
    },

    async finishConfigurator() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
    },
  }
}
