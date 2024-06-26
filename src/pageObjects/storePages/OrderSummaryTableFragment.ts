import { Locator } from '@playwright/test'

export class OrderSummaryTableFragment {
  locator: Locator

  constructor(locator: Locator) {
    this.locator = locator
  }

  headerRow() {
    return this.locator.locator('thead')
  }

  body() {
    return this.locator.locator('tbody')
  }

  footerRow() {
    return this.locator.locator('tfoot')
  }

  subTotalPrice() {
    return this.locator.locator('#cartSubtotal')
  }

  totalPrice() {
    return this.locator.locator('#totalCartPrice')
  }

  getRowsCount() {
    return this.body().locator('tr').count()
  }

  async getRowData(index: number): Promise<OrderSummaryRowData> {
    const thisRow = this.body().locator('tr').nth(index)
    const productType = await thisRow.locator('td').nth(0).innerText()
    const billingCycle = await thisRow.locator('td').nth(1).innerText()
    const ipAddress = await thisRow.locator('td').nth(2).innerText()
    const recurringPrice = await thisRow.locator('td').nth(3).innerText()
    const dueTodayPrice = await thisRow.locator('td').nth(4).innerText()
    return { productType, billingCycle, ipAddress, recurringPrice, dueTodayPrice }
  }
}

export interface OrderSummaryRowData {
  productType: string
  billingCycle: string
  ipAddress: string
  recurringPrice: string
  dueTodayPrice: string
}
