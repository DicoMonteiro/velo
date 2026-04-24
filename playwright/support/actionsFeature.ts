import { test as base } from '@playwright/test'

import { createOrderLookupActions } from './actions/orderLookupActions'
import { createConfigureVehicleActions } from './actions/configureVehicleActions'
import { createCheckoutActions } from './actions/checkoutActions'
import { createHeroActions } from './actions/heroActions'

import { mockCreditAnalysis } from './mock.api'

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
  configureVehicle: ReturnType<typeof createConfigureVehicleActions>
  checkout: ReturnType<typeof createCheckoutActions>
  hero: ReturnType<typeof createHeroActions>
  mock: {
    creditAnalysis: (score: number) => Promise<void>
  }
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page),
      configureVehicle: createConfigureVehicleActions(page),
      checkout: createCheckoutActions(page),
      hero: createHeroActions(page),
      mock: {
        creditAnalysis: async (score: number) => await mockCreditAnalysis(page, score)
      }
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'