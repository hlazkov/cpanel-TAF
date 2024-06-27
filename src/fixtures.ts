import { test as base } from '@playwright/test'
import { PortalHomePage } from './pageObjects/PortalHomePage'
import { StoreLicensesPage } from './pageObjects/storePages/StoreLicensesPage'
import { StoreCartReviewPage } from './pageObjects/storePages/StoreCartReviewPage'
import { StoreCartCheckoutPage } from './pageObjects/storePages/StoreCartCheckoutPage'
import { StoreCartConfigurePage } from './pageObjects/storePages/StoreCartConfigurePage'

type Pages = {
  homePage: PortalHomePage
  licensesPage: StoreLicensesPage
  cartCheckoutPage: StoreCartCheckoutPage
  cartConfigurePage: StoreCartConfigurePage
  cartReviewPage: StoreCartReviewPage
}

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new PortalHomePage(page))
  },
  licensesPage: async ({ page }, use) => {
    await use(new StoreLicensesPage(page))
  },
  cartCheckoutPage: async ({ page }, use) => {
    await use(new StoreCartCheckoutPage(page))
  },
  cartConfigurePage: async ({ page }, use) => {
    await use(new StoreCartConfigurePage(page))
  },
  cartReviewPage: async ({ page }, use) => {
    await use(new StoreCartReviewPage(page))
  },
})
