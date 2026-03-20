import { test as base, expect } from '@playwright/test';
import { SearchOrderPage } from '../support/pages/SearchOrderPage';
import { HomePage } from '../support/pages/HomePage';
import { NavBar } from "../support/components/NavBar";
import { ConfigureVehiclePage } from '../support/pages/ConfigureVehiclePage';

type PageFixtures = {
  searchOrderPage: SearchOrderPage;
  homePage: HomePage;
  navBar: NavBar;
  configureVehiclePage: ConfigureVehiclePage;
};

export const test = base.extend<PageFixtures>({
  searchOrderPage: async ({ page }, use) => {
    await use(new SearchOrderPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },

  configureVehiclePage: async ({ page }, use) => {
    await use(new ConfigureVehiclePage(page));
  },
});

export { expect } from '@playwright/test';