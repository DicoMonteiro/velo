import { Page, Locator, expect } from "@playwright/test";

export class NavBar {
  readonly page: Page;
  readonly consultarPedidoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.consultarPedidoLink = page.getByRole('link', { name: 'Consultar Pedido' });
  }

  async navigateToSearchOrder() {
    await this.consultarPedidoLink.click();
    await expect(this.page.getByRole('heading')).toContainText('Consultar Pedido');
  }

}