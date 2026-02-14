import { generateOrderCode } from "../support/helpers"
import { test, expect } from '../fixture/fixture';
import { orders, statusConfig } from '../fixture/datas/dataOrders';

// AAA - Arrange, Act, Assert

test.describe("Consulta de Pedido", ()=> {
  test.beforeEach(async ({ homePage }) => {
    //Arrange
    await homePage.gotoAndNavigateToSearchOrder()
  })

  test('deve consultar um pedido aprovado', async ({ searchOrderPage }) => {
    // Test Data
    const order = orders.aprovado
    const statusOrder = statusConfig.APROVADO

    //Act
    await searchOrderPage.searchOrder(order.code)
  
    //Assert - Checkpoint
    await searchOrderPage.validateAllDataOrder(order)
    await searchOrderPage.validateStatusBadge(order, statusOrder)
  });

  test('deve consultar um pedido reprovado', async ({ searchOrderPage }) => {
    // Test Data
    const order = orders.reprovado
    const statusOrder = statusConfig.REPROVADO

    //Act
    await searchOrderPage.searchOrder(order.code)
  
    //Assert - Checkpoint
    await searchOrderPage.validateAllDataOrder(order)
    await searchOrderPage.validateStatusBadge(order, statusOrder)
  });

  test('deve consultar um pedido em analise', async ({ searchOrderPage }) => {
    // Test Data
    const order = orders.emAnalise
    const statusOrder = statusConfig.EM_ANALISE

    //Act
    await searchOrderPage.searchOrder(order.code)
  
    //Assert - Checkpoint
    await searchOrderPage.validateAllDataOrder(order)
    await searchOrderPage.validateStatusBadge(order, statusOrder)
  });
  
  test("deve exibir mensagem quando o pedido não é encontrado", async ({ searchOrderPage }) => {
    // Test Data
    const order = generateOrderCode();
  
    //Act
    await searchOrderPage.searchOrder(order)
  
    //Assert - Checkpoint
    await searchOrderPage.validateNotFoundOrder()
  });
})

