import { BasePage } from '../BasePage'
import { LicenseCardFragment } from './LicenseCardFragment'

export class StoreLicensesPage extends BasePage {
  url: 'store/cpanel-licenses'

  header() {
    return this.page.locator('.header-lined h1')
  }

  getCardByIndex(index: number) {
    return new LicenseCardFragment(this.page.locator('.product').nth(index))
  }

  getCardByName(name: string) {
    return new LicenseCardFragment(this.page.locator('.product', { hasText: name }))
  }
}
