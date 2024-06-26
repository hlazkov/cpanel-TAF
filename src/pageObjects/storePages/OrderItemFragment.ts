import { Locator } from '@playwright/test'

export class OrderItemFragment {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  name() {
    return this.locator.locator('.item-title')
  }

  price() {
    // todo update this selector
    return this.locator.locator('.item-price span:first-child')
  }

  pricePerCycle() {
    return this.locator.locator('.item-price span.cycle')
  }
}
