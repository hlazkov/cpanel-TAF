import { BasePage } from '../BasePage'
import { OrderItemFragment } from './OrderItemFragment'

export class StoreCartReviewPage extends BasePage {
  url: 'cart.php'

  header() {
    return this.page.locator('.header-lined h1')
  }

  orderSummary() {
    return this.page.locator('#orderSummary')
  }

  checkoutButton() {
    return this.orderSummary().locator('#checkout')
  }

  totalDueTodayPrice() {
    return this.orderSummary().locator('#totalDueToday')
  }

  getOrderItemByName(name: string) {
    return new OrderItemFragment(this.page.locator('.item', { hasText: name }))
  }
}
