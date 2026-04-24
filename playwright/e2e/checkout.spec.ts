import { test, expect } from '../support/actionsFeature'
import type { OrderDetails } from '../support/actions/orderLookupActions'
import { deleteOrderByEmail } from '../support/database/orderRepository'

import testData from '../fixture/datas/orders.json' with { type: 'json' }

test.describe('Checkout', () => {

  test.describe('Validações de campos obrigatórios', () => {

    let alerts: any

    test.beforeEach(async ({ page, app }) => {
      await page.goto('/order')
      await expect(page.getByRole('heading', { name: 'Finalizar Pedido' })).toBeVisible()

      alerts = app.checkout.elements.alerts
    })


    test('deve validar obrigatoriedade de todos os campos em branco', async ({ app }) => {
      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
      await expect(alerts.email).toHaveText('Email inválido')
      await expect(alerts.phone).toHaveText('Telefone inválido')
      await expect(alerts.document).toHaveText('CPF inválido')
      await expect(alerts.store).toHaveText('Selecione uma loja')
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })

    test('deve validar limite mínimo de caracteres para Nome e Sobrenome', async ({ app }) => {

      const order: OrderDetails = testData.limitCaracteres as OrderDetails

      // Arrange
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.name).toHaveText('Nome deve ter pelo menos 2 caracteres')
      await expect(alerts.lastname).toHaveText('Sobrenome deve ter pelo menos 2 caracteres')
    })

    test('deve exibir erro para e-mail com formato inválido', async ({ app }) => {

      const order: OrderDetails = testData.emailInvalido as OrderDetails

      // Arrange
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.email).toHaveText('Email inválido')
    })

    test('deve exibir erro para CPF inválido', async ({ app }) => {

      const order: OrderDetails = testData.documentInvalido as OrderDetails

      // Arrange
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)
      await app.checkout.acceptTerms()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.document).toHaveText('CPF inválido')
    })

    test('deve exigir o aceite dos termos ao finalizar com dados válidos', async ({ app }) => {

      const order: OrderDetails = testData.semTermoAceito as OrderDetails

      // Arrange
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)

      await expect(app.checkout.elements.terms).not.toBeChecked()

      // Act
      await app.checkout.submit()

      // Assert
      await expect(alerts.terms).toHaveText('Aceite os termos')
    })
  })

  test.describe('Pagamento e Confirmação', () => {


    test.beforeEach(async ({ page, app }) => {
      await app.hero.open()
      await page.getByRole('link', { name: /Configure Agora/i }).click()
    })

    test('deve criar um pedido com sucesso para pagamento à vista', async ({ app }) => {

      const order: OrderDetails = testData.e2e as OrderDetails
      await deleteOrderByEmail(order.customer.email)

      // Arrange
      await app.configureVehicle.expectPrice(order.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)

      // Act
      await app.checkout.selectPaymentMethod(order.payment)
      await app.checkout.expectSummaryTotal(order.total_price)
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Pedido Aprovado!')
    })

    test('deve aprovar automaticamente o crédito quando o score do CPF for maior que 700 no financiamento.', async ({ app, page }) => {

      const orderFinanciamento: OrderDetails = testData.financiamento as OrderDetails

      await deleteOrderByEmail(orderFinanciamento.customer.email)

      await app.mock.creditAnalysis(701)

      // Arrange
      await app.configureVehicle.expectPrice(orderFinanciamento.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderFinanciamento.customer)
      await app.checkout.selectStore(orderFinanciamento.store)

      // Act
      await app.checkout.selectPaymentMethod(orderFinanciamento.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Pedido Aprovado!')
    })

    test('deve registrar o pedido com status "em análise" quando o score do CPF for entre 501 e 700 no financiamento.', async ({ app, page }) => {

      const orderScoreMedio: OrderDetails = testData.scoreMedio as OrderDetails

      await deleteOrderByEmail(orderScoreMedio.customer.email)

      await app.mock.creditAnalysis(600)

      // Arrange
      await app.configureVehicle.expectPrice(orderScoreMedio.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderScoreMedio.customer)
      await app.checkout.selectStore(orderScoreMedio.store)

      // Act
      await app.checkout.selectPaymentMethod(orderScoreMedio.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Capturar o ID do pedido (mesmo que a tela mostre "Reprovado" por enquanto, o ID deve aparecer)
      //const orderId = await app.checkout.getOrderId()
      //orderScoreMedio.number = orderId

      // Assert - Consultar o pedido para validar o status real no banco/API
      //await app.orderLookup.open()
      //await app.orderLookup.searchOrder(orderId)
      //await app.orderLookup.expectResultLoaded(orderId)
      //await app.orderLookup.validateStatusBadge('EM_ANALISE')

      // Assert
      await app.checkout.expectResult('Pedido em Análise!')

    })

    test('deve reprovar o crédito quando o score do CPF for menor ou igual a 500 no financiamento sem entrada.', async ({ app, page }) => {

      const orderSemEntrada: OrderDetails = testData.scoreBaixoSemEntrada as OrderDetails

      await deleteOrderByEmail(orderSemEntrada.customer.email)

      await app.mock.creditAnalysis(500)

      // Arrange
      await app.configureVehicle.expectPrice(orderSemEntrada.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderSemEntrada.customer)
      await app.checkout.selectStore(orderSemEntrada.store)

      // Act
      await app.checkout.selectPaymentMethod(orderSemEntrada.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Crédito Reprovado')
    })

    test('deve reprovar o crédito quando o score do CPF for menor ou igual a 500 no financiamento com entrada menor que 50%.', async ({ app, page }) => {

      const orderEntradaBaixa: OrderDetails = testData.scoreBaixoEntradaMenor50 as OrderDetails

      await deleteOrderByEmail(orderEntradaBaixa.customer.email)

      await app.mock.creditAnalysis(500)

      // Arrange
      await app.configureVehicle.expectPrice(orderEntradaBaixa.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderEntradaBaixa.customer)
      await app.checkout.selectStore(orderEntradaBaixa.store)

      // Act
      await app.checkout.selectPaymentMethod(orderEntradaBaixa.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.fillDownPayment("10000")
      await app.checkout.expectSummaryTotal("R$ 30.600,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Crédito Reprovado')
    })

    test('deve aprovar o crédito quando o score do CPF for menor ou igual a 500 no financiamento com entrada igual a 50%.', async ({ app, page }) => {

      const orderEntradaIgual50: OrderDetails = testData.scoreBaixoEntradaIgual50 as OrderDetails

      await deleteOrderByEmail(orderEntradaIgual50.customer.email)

      await app.mock.creditAnalysis(450)

      // Arrange
      await app.configureVehicle.expectPrice(orderEntradaIgual50.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderEntradaIgual50.customer)
      await app.checkout.selectStore(orderEntradaIgual50.store)

      // Act
      await app.checkout.selectPaymentMethod(orderEntradaIgual50.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.fillDownPayment("20000")
      await app.checkout.expectSummaryTotal("R$ 20.400,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Pedido Aprovado!')
    })

    test('deve aprovar o crédito quando o score do CPF for menor ou igual a 500 no financiamento com entrada maior que 50%.', async ({ app, page }) => {

      const orderEntradaMaior50: OrderDetails = testData.scoreBaixoEntradaMaior50 as OrderDetails

      await deleteOrderByEmail(orderEntradaMaior50.customer.email)

      await app.mock.creditAnalysis(420)

      // Arrange
      await app.configureVehicle.expectPrice(orderEntradaMaior50.total_price)
      await app.configureVehicle.finishConfigurator()
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(orderEntradaMaior50.customer)
      await app.checkout.selectStore(orderEntradaMaior50.store)

      // Act
      await app.checkout.selectPaymentMethod(orderEntradaMaior50.payment)
      await app.checkout.expectSummaryTotal("R$ 40.800,00")
      await app.checkout.fillDownPayment("25000")
      await app.checkout.expectSummaryTotal("R$ 15.300,00")
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.expectResult('Pedido Aprovado!')
    })
  })

})