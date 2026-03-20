import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByTestId('hero-section').getByRole('heading');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heroHeading).toContainText('Velô Sprint');
  }

  async navigateToConfigureVehicle() {
    await this.page.getByRole('link', { name: 'Configure Agora' }).click();
    await expect(this.page).toHaveURL(/.*configure/);
  }
}
