import { Locator } from '@playwright/test'

export class LicenseCardFragment {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  name() {
    return this.locator.locator('[id*= name]')
  }

  price() {
    return this.locator.locator('.price')
  }

  orderButton() {
    return this.locator.locator('[id*=order-button]')
  }
}
