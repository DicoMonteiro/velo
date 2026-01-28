import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test.skip('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
    await page.goto('http://localhost:5173/');
  //Checkpoint 
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  //Act
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByTestId('search-order-id').dblclick();
  await page.getByTestId('search-order-id').fill('VLO-OPHS0J');
  //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-OPHS0J');
  //await page.getByTestId('search[-order-id').press('Enter');
  //await page.getByRole('textbox', { name: "Consultar Pedido"}).fill('VLO-OPHS0J');
  //await page.getByLabel('Número do Pedido').fill('VLO-OPHS0J');
  //await page.getByPlaceholder('Ex: VLO-ABC123').fill('VLO-OPHS0J');
  //await page.getByTestId('search-order-button').click();
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert - Checkpoint
  //await page.waitForTimeout(10000);
  await expect(page.getByText('order-result-id')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('order-result-status')).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-OPHS0J');
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Velô Sprint');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Midnight Black');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('sport Wheels');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('cream');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('Pedro Amado');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('pedro.amado@qax.com.br');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('23/01/2026');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('À Vista');
  await expect(page.getByTestId('order-result-VLO-OPHS0J')).toContainText('R$ 52.500,00');
});