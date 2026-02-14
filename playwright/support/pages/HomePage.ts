import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heroHeading: Locator;
  readonly consultarPedidoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByTestId('hero-section').getByRole('heading');
    this.consultarPedidoLink = page.getByRole('link', { name: 'Consultar Pedido' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async validateHeroSection() {
    await expect(this.heroHeading).toContainText('Velô Sprint');
  }

  async navigateToSearchOrder() {
    await this.consultarPedidoLink.click();
    await expect(this.page.getByRole('heading')).toContainText('Consultar Pedido');
  }

  async gotoAndNavigateToSearchOrder() {
    await this.goto();
    await this.validateHeroSection();
    await this.navigateToSearchOrder();
  }
}