import { test, expect } from '../support/actionsFeature';
import { vehicleData } from '../fixture/datas/dataVehicle';

test.describe('Configuração do Veículo e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ page, app }) => {
    // Arrange
    await app.hero.open()
    await page.getByRole('link', { name: /Configure Agora/i }).click()
  });

  test('deve manter o preço ao alterar a cor do veículo e verifica alteração da imagem do veículo', async ({ app }) => {
    // Test Data
    const { prices, colors } = vehicleData;
    const color = colors.midnightBlack;
    const colorRegex = new RegExp(color.aeroWheelsImageSrc);

    // Act
    await app.configureVehicle.selectColor(color.name);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.base);
    await app.configureVehicle.validateCarImage(colorRegex);
  });

  test('deve atualizar o preço ao alterar a roda do veículo e verifica alteração da imagem do veículo', async ({ app }) => {
    // Test Data
    const { prices, colors, wheels } = vehicleData;
    const color = colors.glacierBlue; // O default parece ser glacierBlue já que o step de voltar para default tem a imagem `glacier-blue-aero-wheels`
    const colorRegexAero = new RegExp(color.aeroWheelsImageSrc);
    const colorRegexSport = new RegExp(color.sportWheelsImageSrc);

    // Act - Change to sport
    await app.configureVehicle.selectWheels(wheels.sport);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.withSportWheels);
    await app.configureVehicle.validateCarImage(colorRegexSport);

    // Act - Revert to aero
    await app.configureVehicle.selectWheels(wheels.aero);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.base);
    await app.configureVehicle.validateCarImage(colorRegexAero);
  });
});
