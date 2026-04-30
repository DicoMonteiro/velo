import { test, expect } from '../fixture/fixture';
import { vehicleData } from '../fixture/datas/dataVehicle';

test.describe('Configuração do Veículo e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ homePage }) => {
    // Arrange
    await homePage.goto();
    await homePage.navigateToConfigureVehicle();
  });

  test('deve manter o preço ao alterar a cor do veículo e verifica alteração da imagem do veículo', async ({ configureVehiclePage }) => {
    // Test Data
    const { prices, colors } = vehicleData;
    const color = colors.midnightBlack;
    const colorRegex = new RegExp(color.aeroWheelsImageSrc);

    // Act
    await configureVehiclePage.selectColor(color.name);

    // Assert - Checkpoint
    await configureVehiclePage.validatePrice(prices.base);
    await configureVehiclePage.validateCarImage(colorRegex);
  });

  test('deve atualizar o preço ao alterar a roda do veículo e verifica alteração da imagem do veículo', async ({ configureVehiclePage }) => {
    // Test Data
    const { prices, colors, wheels } = vehicleData;
    const color = colors.glacierBlue; // O default parece ser glacierBlue já que o step de voltar para default tem a imagem `glacier-blue-aero-wheels`
    const colorRegexAero = new RegExp(color.aeroWheelsImageSrc);
    const colorRegexSport = new RegExp(color.sportWheelsImageSrc);

    // Act - Change to sport
    await configureVehiclePage.selectWheels(wheels.sport);

    // Assert - Checkpoint
    await configureVehiclePage.validatePrice(prices.withSportWheels);
    await configureVehiclePage.validateCarImage(colorRegexSport);

    // Act - Revert to aero
    await configureVehiclePage.selectWheels(wheels.aero);

    // Assert - Checkpoint
    await configureVehiclePage.validatePrice(prices.base);
    await configureVehiclePage.validateCarImage(colorRegexAero);
  });
});
