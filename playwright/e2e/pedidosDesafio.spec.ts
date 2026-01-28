import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
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
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert - Checkpoint
  await expect(page.getByText('APROVADO')).toBeVisible({ timeout: 15000 });
  await expect(page.getByText('VLO-OPHS0J')).toBeVisible({ timeout: 15000 });
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