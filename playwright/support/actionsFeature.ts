import { test as base } from '@playwright/test'

import { createOrderLookupActions } from './actions/OrderLookupActions'
import { createConfigureVehicleActions } from './actions/ConfigureVehicleActions'
import { createCheckoutActions } from './actions/CheckoutActions'

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
  configureVehicle: ReturnType<typeof createConfigureVehicleActions>
  checkout: ReturnType<typeof createCheckoutActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page),
      configureVehicle: createConfigureVehicleActions(page),
      checkout: createCheckoutActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'