import { test as base, expect } from '@playwright/test';
import { SearchOrderPage } from '../support/pages/SearchOrderPage';
import { HomePage } from '../support/pages/HomePage';

type PageFixtures = {
  searchOrderPage: SearchOrderPage;
  homePage: HomePage;
};

export const test = base.extend<PageFixtures>({
  searchOrderPage: async ({ page }, use) => {
    await use(new SearchOrderPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';