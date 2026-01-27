import { test, expect } from '@playwright/test';

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //Checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  
  //Checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByTestId('search-order-id').dblclick();
  await page.getByTestId('search-order-id').fill('VLO-OPHS0J');
  //await page.getByTestId('search-order-id').press('Enter');
  await page.getByTestId('search-order-button').click();

  //Checkpoint
  await expect(page.getByText('VLO-OPHS0J')).toBeVisible();
  await expect(page.getByText('APROVADO')).toBeVisible();
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