import { test, expect } from '@playwright/test';
import { generateOrderCode } from "../support/helpers"
import { SearchOrderPage } from "../support/pages/SearchOrderPage"

// AAA - Arrange, Act, Assert

test.describe("Consulta de Pedido", ()=> {

  let search: SearchOrderPage;
  //test.beforeAll(async () => {
  //  console.log("beforeAll: roda uma vez antes de todos os testes")
  //})

  test.beforeEach(async ({ page }) => {
    //console.log("beforeEach: roda uma vez antes de cada teste")
     //Arrange
     await page.goto('http://localhost:5173/');
     await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
     await page.getByRole('link', { name: 'Consultar Pedido' }).click();
     await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

     search = new SearchOrderPage(page);
  })

  //test.afterEach(async () => {
  //  console.log("afterEach: roda uma vez depois de cada teste")
  //})

  //test.afterAll(async () => {
  //  console.log("afterAll: roda uma vez depois de todos os testes")
  //})


  test('deve consultar um pedido aprovado', async ({ page }) => {
    // Test Data
    const order = {
      code: 'VLO-OPHS0J',
      status: 'APROVADO',
      model: 'Velô Sprint',
      color: 'Midnight Black',
      interior: 'cream',
      wheels: 'sport Wheels',
      customer: {
        name: 'Pedro Amado',
        email: 'pedro.amado@qax.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 52.500,00'
      }
    }
  
    //Act
    //await page.getByTestId('search-order-id').dblclick();
    //await page.getByTestId('search-order-id').fill(order.code);
    //await page.getByRole('button', { name: 'Buscar Pedido' }).click();


    //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-OPHS0J');
    //await page.getByTestId('search[-order-id').press('Enter');
    //await page.getByRole('textbox', { name: "Consultar Pedido"}).fill('VLO-OPHS0J');
    //await page.getByLabel('Número do Pedido').fill('VLO-OPHS0J');
    //await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-OPHS0J');
    //await page.getByTestId('search-order-button').click();
    

    //const search = new SearchOrderPage(page)
    await search.searchOrder(order.code)
  
    //Assert - Checkpoint
    //await page.waitForTimeout(10000);
    //await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 60000 });
    //await expect(page.getByTestId('order-result-status')).toBeVisible({ timeout: 60000 });
    //await expect(page.getByTestId('order-result-id')).toContainText(order);
    //await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Velô Sprint');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Midnight Black');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('sport Wheels');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('cream');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Pedro Amado');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('pedro.amado@qax.com.br');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('23/01/2026');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('À Vista');
    //await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('R$ 52.500,00');

    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
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

    const statusBadge = page.getByRole('status').filter({ hasText: order.status });
    await expect(statusBadge).toBeVisible({ timeout: 60000 });
    await expect(statusBadge).toContainText(order.status);
    await expect(statusBadge).toHaveClass(/bg-green-100/);
    await expect(statusBadge).toContainClass('bg-green-100');
    await expect(statusBadge).toContainClass('text-green-700');

    const svgIcon = statusBadge.locator('svg');
    await expect(svgIcon).toBeVisible({ timeout: 60000 });
    await expect(svgIcon).toHaveClass(/lucide-circle-check-big/);
    await expect(svgIcon).toContainClass('lucide-circle-check-big');
   
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {
    // Test Data
    const order = {
      code: 'VLO-165ZEY',
      status: 'REPROVADO',
      model: 'Velô Sprint',
      color: 'Lunar White',
      interior: 'cream',
      wheels: 'aero Wheels',
      customer: {
        name: 'Apolo Vale',
        email: 'apolo.vale@teste.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 45.000,00'
      }
    }
    //Act
    //await page.getByTestId('search-order-id').dblclick();
    //await page.getByTestId('search-order-id').fill(order.code);
    //await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //const search = new SearchOrderPage(page)
    await search.searchOrder(order.code)
  
    //Assert - Checkpoint
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
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

      const statusBadge = page.getByRole('status').filter({ hasText: order.status });
      await expect(statusBadge).toBeVisible({ timeout: 60000 });
      await expect(statusBadge).toContainText(order.status);
      await expect(statusBadge).toHaveClass(/bg-red-100/);
      await expect(statusBadge).toContainClass('bg-red-100');
      await expect(statusBadge).toContainClass('text-red-700');
  
      const svgIcon = statusBadge.locator('svg');
      await expect(svgIcon).toBeVisible({ timeout: 60000 });
      await expect(svgIcon).toHaveClass(/lucide-circle-x/);
      await expect(svgIcon).toContainClass('lucide-circle-x');
  });

  test('deve consultar um pedido em analise', async ({ page }) => {
    // Test Data
    const order = {
      code: 'VLO-BXFHDZ',
      status: 'EM_ANALISE',
      model: 'Velô Sprint',
      color: 'Lunar White',
      interior: 'cream',
      wheels: 'aero Wheels',
      customer: {
        name: 'Marcus Antunes',
        email: 'marcus.antunes@teste.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 40.000,00'
      }
    }
    //Act
    //await page.getByTestId('search-order-id').dblclick();
    //await page.getByTestId('search-order-id').fill(order.code);
    //await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //const search = new SearchOrderPage(page)
    await search.searchOrder(order.code)
  
    //Assert - Checkpoint
    await expect(page.getByTestId(`order-result-${order.code}`)).toMatchAriaSnapshot(`
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

      const statusBadge = page.getByRole('status').filter({ hasText: order.status });
      await expect(statusBadge).toBeVisible({ timeout: 60000 });
      await expect(statusBadge).toContainText(order.status);
      await expect(statusBadge).toHaveClass(/bg-amber-100/);
      await expect(statusBadge).toContainClass('bg-amber-100');
      await expect(statusBadge).toContainClass('text-amber-700');
  
      const svgIcon = statusBadge.locator('svg');
      await expect(svgIcon).toBeVisible({ timeout: 60000 });
      await expect(svgIcon).toHaveClass(/lucide-circle-clock/);
      await expect(svgIcon).toContainClass('lucide-circle-clock');
  });
  
  test("deve exibir mensagem quando o pedido não é encontrado", async ({ page }) => {
    // Test Data
    const order = generateOrderCode();
  
    //Act
    //await page.getByTestId('search-order-id').dblclick();
    //await page.getByTestId('search-order-id').fill(order);
    //await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //const search = new SearchOrderPage(page)
    await search.searchOrder(order)
  
    //Assert - Checkpoint
    await expect(page.getByRole('heading', { name: 'Pedido não encontrado' })).toBeVisible({ timeout: 15000 })
    
    const containerPedidoNaoEncontrado = page.getByRole("heading")
    .filter({hasText: /^Pedido não encontrado$/})
    .locator("..")
  
    await expect(containerPedidoNaoEncontrado).toContainText("Verifique o número do pedido e tente novamente", { timeout: 15000 })
    await expect(page.locator("p", { hasText: "Verifique o número do pedido e tente novamente" })).toBeVisible({ timeout: 15000 })
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
    `);
  });
})

