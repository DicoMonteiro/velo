import { test as base } from '@playwright/test'

import { createOrderLookupActions } from './actions/OrderLookupActions'
import { createConfigureVehicleActions } from './actions/ConfigureVehicleActions'

type App = {
  orderLookup: ReturnType<typeof createOrderLookupActions>
  configureVehicle: ReturnType<typeof createConfigureVehicleActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      orderLookup: createOrderLookupActions(page),
      configureVehicle: createConfigureVehicleActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'