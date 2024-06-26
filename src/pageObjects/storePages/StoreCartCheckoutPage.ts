import { BasePage } from '../BasePage'
import { OrderSummaryTableFragment } from './OrderSummaryTableFragment'

export class StoreCartCheckoutPage extends BasePage {
  url: 'cart.php'

  header() {
    return this.page.locator('.header-lined h1')
  }

  orderSummaryTable() {
    return new OrderSummaryTableFragment(this.page.locator('#order-standard_cart .table-responsive'))
  }

  personalInformation = {
    firstNameInput: () => this.page.locator('#inputFirstName'),
    lastNameInput: () => this.page.locator('#inputLastName'),
    emailInput: () => this.page.locator('#inputEmail'),
    phoneNumberInput: () => this.page.locator('#inputPhone'),
  }
  billingAddress = {
    companyNameInput: () => this.page.locator('#inputCompanyName'),
    address1Input: () => this.page.locator('#inputAddress1'),
    address2Input: () => this.page.locator('#inputAddress2'),
    cityInput: () => this.page.locator('#inputCity'),
    stateInput: () => this.page.locator('#stateselect'),
    postcodeInput: () => this.page.locator('#inputPostcode'),
    countryInput: () => this.page.locator('#inputCountry'),
    taxIdInput: () => this.page.locator('#inputTaxId'),
  }
  accountSecurity = {
    password1Input: () => this.page.locator('#inputNewPassword1'),
    password2Input: () => this.page.locator('#inputNewPassword2'),
  }
  termsAndConditions = {
    ivereadCheckbox: () => this.page.locator('#accepttos_custom'),
  }
  paymentDetails = {
    cardNumberInput: () => this.page.locator('#inputCardNumber'),
    cardExpiryInput: () => this.page.locator('#inputCardExpiry'),
    cardCVVInput: () => this.page.locator('#inputCardCVV'),
    descriptionInput: () => this.page.locator('#inputDescription'),
  }

  completeOrderButton() {
    return this.page.locator('#btnCompleteOrder')
  }
}
