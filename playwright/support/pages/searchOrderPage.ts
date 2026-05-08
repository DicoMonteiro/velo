import { Page, expect } from "@playwright/test"

export class SearchOrderPage {
  constructor(private page: Page) {}
  
  async searchOrder(numero: string) {
    await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(numero)
    await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
  }

  async validateAllDataOrder(order) {

    await expect(this.page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.code}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: ${order.model}
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: ${order.interior}
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment.method}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `, { timeout: 60000 });
  }

  async validateStatusBadge(order, statusOrder) {

    const statusBadge = this.page.getByRole('status').filter({ hasText: order.status });
    await expect(statusBadge).toBeVisible({ timeout: 60000 });
    await expect(statusBadge).toContainText(order.status);
    await expect(statusBadge).toContainClass(`${statusOrder.bgClass}`);
    await expect(statusBadge).toContainClass(`${statusOrder.textClass}`);

    const svgIcon = statusBadge.locator('svg');
    await expect(svgIcon).toBeVisible({ timeout: 60000 });
    await expect(svgIcon).toContainClass(`${statusOrder.iconClass}`);
  }

  async validateNotFoundOrder() {

    await expect(this.page.getByRole('heading', { name: 'Pedido não encontrado' })).toBeVisible({ timeout: 15000 })
    
    const containerPedidoNaoEncontrado = this.page.getByRole("heading")
      .filter({hasText: /^Pedido não encontrado$/})
      .locator("..")
  
    await expect(containerPedidoNaoEncontrado).toContainText("Verifique o número do pedido e tente novamente", { timeout: 15000 })
    await expect(this.page.locator("p", { hasText: "Verifique o número do pedido e tente novamente" })).toBeVisible({ timeout: 15000 })
    await expect(this.page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `);
  }
    
}