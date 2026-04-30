import { Page, expect } from "@playwright/test";

export class ConfigureVehiclePage {
  constructor(private page: Page) { }

  async selectColor(colorName: string) {
    await this.page.getByRole('button', { name: colorName }).click();
  }

  async selectWheels(wheelsName: string) {
    await this.page.getByRole('button', { name: wheelsName }).click();
  }

  async validatePrice(expectedPrice: string) {
    await expect(this.page.getByText(expectedPrice)).toBeVisible();
  }

  async validateCarImage(imageSrc: string | RegExp) {
    const imageCar = this.page.locator('img[alt^="Velô Sprint"]');
    await expect(imageCar).toHaveAttribute('src', imageSrc);
  }
}
