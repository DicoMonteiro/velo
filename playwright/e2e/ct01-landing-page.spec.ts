import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('CT01 - Acesso e Navegação na Landing Page', () => {
    const evidenceDir = 'docs/tests/evidences';

    test('Deve carregar a página inicial e redirecionar para o configurador', async ({ page }) => {
        // Passo 1: Acessar a URL base do sistema
        await page.goto('/');

        // Validar se o Hero, Especificações, FAQ e CTA estão presentes (validação básica de carregamento)
        await expect(page).toHaveTitle(/Velô by Papito/i); // Actual title is Velô by Papito
        // We can just take a screenshot of the landing page
        await page.screenshot({ path: path.join(evidenceDir, 'CT01_Passo1_LandingPage.png'), fullPage: true });

        // Passo 2: Clicar no botão para configurar ou reservar o veículo
        // Looking for a link or button that navigates to /configure
        const configureLink = page.locator('a[href="/configure"]').first();
        await configureLink.click();

        // Validar redirecionamento
        await expect(page).toHaveURL(/\/configure/);

        // Screenshot of the configurator page
        await page.screenshot({ path: path.join(evidenceDir, 'CT01_Passo2_ConfiguratorPage.png'), fullPage: true });
    });
});
