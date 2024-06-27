import { BasePage } from '../BasePage'
import { AddonFragment } from './AddonFragment'

export class StoreCartConfigurePage extends BasePage {
  url: 'cart.php'

  header() {
    return this.page.locator('.header-lined h1')
  }

  productTitle() {
    return this.page.locator('.product-title')
  }

  ipAddressInput() {
    return this.page.locator('#customfield11')
  }

  ipAddressInputErrorMessage() {
    return this.page.locator('#customfield11Error')
  }

  getAddonByIndex(index: number) {
    return new AddonFragment(this.page.locator('.panel-addon').nth(index))
  }

  getAddonByName(name: string) {
    return new AddonFragment(this.page.locator('.panel-addon', { hasText: name }))
  }

  orderSummary() {
    return this.page.locator('#orderSummary')
  }

  getOrderOptionLineByText(text: string) {
    return this.orderSummary().locator('.clearfix', { hasText: text })
  }

  orderTotalPrice() {
    return this.orderSummary().locator('.total-due-today .amt')
  }

  continueButton() {
    return this.orderSummary().locator('#btnCompleteProductConfig')
  }
}
