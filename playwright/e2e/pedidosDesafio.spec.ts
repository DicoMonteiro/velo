import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

// Desafio para retirar os data-testid da página de pedido (OrderLookup.tsx)

test.skip('deve consultar um pedido aprovado', async ({ page }) => {

  // Test Data
  const order = {
      code: 'VLO-OPHS0J',
      status: 'APROVADO'
  }

  //Arrange
    await page.goto('http://localhost:5173/');
  //Checkpoint 
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  //Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.code);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert - Checkpoint
  await expect(page.getByText(order.status)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(order.code)).toBeVisible({ timeout: 15000 });

  // Outras formas de validar os dados sem o data-testid
  //const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-OPHS0J"]')
  //await expect(orderCode).toBeVisible({timeout: 10_000})
  //const orderStatus = page.locator('//div[text()="APROVADO"]')
  //await expect(orderStatus).toBeVisible({timeout: 10_000})

  const containerPedido = page.getByRole("paragraph")
    .filter({hasText: /^Pedido$/})
    .locator("..") // Sobe para o elemento pai (div que agrupa ambos)

  await expect(containerPedido).toContainText(order.code, { timeout: 15000 })

  
  await expect(page.getByText('Velô Sprint')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Midnight Black')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('sport Wheels')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('cream')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('Pedro Amado')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('pedro.amado@qax.com.br')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('23/01/2026')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('À Vista')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('R$ 52.500,00')).toBeVisible({ timeout: 15000 });
});