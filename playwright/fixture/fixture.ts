import { test as base, expect } from '@playwright/test';
import { SearchOrderPage } from '../support/pages/SearchOrderPage';
import { HomePage } from '../support/pages/HomePage';
import { NavBar } from "../support/components/NavBar";

type PageFixtures = {
  searchOrderPage: SearchOrderPage;
  homePage: HomePage;
  navBar: NavBar;
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
});

export { expect } from '@playwright/test';