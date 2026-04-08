import { test, expect } from '../support/actionsFeature';
import { vehicleData } from '../fixture/datas/dataVehicle';

test.describe('Configuração do Veículo e Cálculo do Preço Base', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    await app.configureVehicle.open();
  });

  test('deve manter o preço ao alterar a cor do veículo e verifica alteração da imagem do veículo', async ({ app }) => {
    // Test Data
    const { prices, colors } = vehicleData;
    const color = colors.midnightBlack;

    // Act
    await app.configureVehicle.selectColor(color.name);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.base);
    await app.configureVehicle.validateCarImage(color.aeroWheelsImageSrc);
  });

  test('deve atualizar o preço ao alterar a roda do veículo e verifica alteração da imagem do veículo', async ({ app }) => {
    // Test Data
    const { prices, colors, wheels } = vehicleData;
    const color = colors.glacierBlue; // O default parece ser glacierBlue já que o step de voltar para default tem a imagem `glacier-blue-aero-wheels`

    // Act - Change to sport
    await app.configureVehicle.selectWheels(wheels.sport);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.withSportWheels);
    await app.configureVehicle.validateCarImage(color.sportWheelsImageSrc);

    // Act - Revert to aero
    await app.configureVehicle.selectWheels(wheels.aero);

    // Assert - Checkpoint
    await app.configureVehicle.expectPrice(prices.base);
    await app.configureVehicle.validateCarImage(color.aeroWheelsImageSrc);
  });
});
