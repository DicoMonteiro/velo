import { test, expect } from '../support/actionsFeature';
import { vehicleData } from '../fixture/datas/dataVehicle';

test.describe('Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço', () => {

  test.beforeEach(async ({ page, app }) => {
    // Arrange
    await app.hero.open()
    await page.getByRole('link', { name: /Configure Agora/i }).click()
  });

  test('Deve atualizar o preço ao selecionar somente a opção "Precision Park"', async ({ app, page }) => {
    const { prices, optionals } = vehicleData;

    // Arrange
    await app.configureVehicle.expectPrice(prices.base);

    // Act
    await app.configureVehicle.toggleOptional(optionals.precisionPark.name);

    // Assert: Base R$ 40.000,00 + Precision Park R$ 5.500,00 = R$ 45.500,00
    await app.configureVehicle.expectPrice(optionals.precisionPark.price);

    // Checkout
    await app.configureVehicle.goToCheckout();
  });

  test('Deve atualizar o preço ao selecionar somente a opção "Flux Capacitor"', async ({ app, page }) => {
    const { prices, optionals } = vehicleData;

    // Arrange
    await app.configureVehicle.expectPrice(prices.base);

    // Act
    await app.configureVehicle.toggleOptional(optionals.fluxCapacitor.name);

    // Assert: Base R$ 40.000,00 + Flux Capacitor R$ 5.000,00 = R$ 45.000,00
    await app.configureVehicle.expectPrice('R$ 45.000,00');

    // Checkout
    await app.configureVehicle.goToCheckout();
  });

  test('Deve atualizar o preço e redirecionar para checkout ao selecionar "Precision Park" e "Flux Capacitor"', async ({ app, page }) => {
    const { prices, optionals } = vehicleData;

    // Arrange
    await app.configureVehicle.expectPrice(prices.base);

    // Act
    await app.configureVehicle.toggleOptional(optionals.precisionPark.name);
    await app.configureVehicle.toggleOptional(optionals.fluxCapacitor.name);

    // Assert: Base R$ 40.000,00 + PP R$ 5.500,00 + FC R$ 5.000,00 = R$ 50.500,00
    await app.configureVehicle.expectPrice(optionals.fluxCapacitor.price);

    // Checkout
    await app.configureVehicle.goToCheckout();
  });
});
