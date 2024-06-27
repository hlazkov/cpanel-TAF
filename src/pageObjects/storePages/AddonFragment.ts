import { Locator } from '@playwright/test'

export class AddonFragment {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  name() {
    return this.locator.locator('.card-body label')
  }

  price() {
    return this.locator.locator('.panel-price')
  }

  addToCartButton() {
    return this.locator.locator('.panel-add')
  }

  checkbox() {
    return this.locator.locator('.icheckbox_square-blue')
  }
}
