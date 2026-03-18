import { test, expect } from '@playwright/test';

test.describe('Configuração do Veículo e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ page }) => {
    // Acessar a página inicial e navegar para o configurador
    await page.goto('/');

    // Checkpoint: Validar estado inicial da página antes de interagir
    await expect(page.getByRole('link', { name: 'Configure Agora' })).toBeVisible();
    await page.getByRole('link', { name: 'Configure Agora' }).click();

    // Checkpoint: Validar redirecionamento para o configurador e carregamento
    await expect(page).toHaveURL(/.*configure/);

    // Passo 1: Verificar o preço inicial de venda
    await expect(page.getByText('R$ 40.000,00')).toBeVisible();

  });

  test('deve manter o preço ao alterar a cor do veículo e verifica alteração da imagem do veículo', async ({ page }) => {
    let imageCar = page.locator('img[alt^="Velô Sprint"]');

    // Passo: Selecionar a cor "Midnight Black"
    await page.getByRole('button', { name: 'Midnight Black' }).click();

    // Checkpoint: O preço permanece R$ 40.000,00
    await expect(page.getByText('R$ 40.000,00')).toBeVisible();

    await expect(imageCar).toHaveAttribute('src', '/src/assets/midnight-black-aero-wheels.png');

  });

  test('deve atualizar o preço ao alterar a roda do veículo e verifica alteração da imagem do veículo', async ({ page }) => {
    let imageCar = page.locator('img[alt^="Velô Sprint"]');

    // Passo: Selecionar a opção de roda "Sport Wheels"
    await page.getByRole('button', { name: 'Sport Wheels' }).click();

    // Checkpoint: O preço total é atualizado com acréscimo de R$ 2.000,00
    await expect(page.getByText('R$ 42.000,00')).toBeVisible();


    await expect(imageCar).toHaveAttribute('src', '/src/assets/glacier-blue-sport-wheels.png');

    // Passo: Selecionar novamente a roda "Aero Wheels"
    await page.getByRole('button', { name: 'Aero Wheels' }).click();

    // Checkpoint: O preço total é decrementado em R$ 2.000,00, voltando para R$ 40.000,00
    await expect(page.getByText('R$ 40.000,00')).toBeVisible();

    await expect(imageCar).toHaveAttribute('src', '/src/assets/glacier-blue-aero-wheels.png');
  });
});
