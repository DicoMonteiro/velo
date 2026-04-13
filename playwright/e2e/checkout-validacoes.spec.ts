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

    const order: OrderDetails = testData.e2e as OrderDetails

    test.beforeEach(async ({ app }) => {
      await app.checkout.open()
      await app.configureVehicle.expectPrice(order.total_price)
      await app.configureVehicle.finishConfigurator()
    })

    test('deve criar um pedido com sucesso para pagamento à vista', async ({ app }) => {

      await deleteOrderByEmail(order.customer.email)

      // Arrange
      await app.checkout.expectLoaded()
      await app.checkout.fillCustomerlData(order.customer)
      await app.checkout.selectStore(order.store)

      // Act
      await app.checkout.selectPaymentMethod(order.payment)
      await app.checkout.expectSummaryTotal(order.total_price)
      await app.checkout.acceptTerms()
      await app.checkout.submit()

      // Assert
      await app.checkout.validateOrderSuccess()
    })
  })
})