import { BasePage } from './BasePage'

export class PortalHomePage extends BasePage {
  cpanelLicensesCard() {
    return this.page.locator('div.card-body', {hasText: 'cPanel Licenses'})
  }

  browseCpanelLicensesBtn() {
    return this.cpanelLicensesCard().locator('.btn')
  }
}
