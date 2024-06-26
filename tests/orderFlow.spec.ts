import { test } from '../src/fixtures'
import { expect } from '@playwright/test'
import { getPriceForCurrentMonth, priceToFloat, priceToText, roundToCents } from '../src/priceHelper.utils'
import { OrderSummaryRowData } from '../src/pageObjects/storePages/OrderSummaryTableFragment'

test.describe('Checking filling form data for cpanel order', () => {
  test('e2e: filling order flow with first license and first addon', async ({
    homePage,
    licensesPage,
    cartConfigurePage,
    cartReviewPage,
    cartCheckoutPage,
  }) => {
    const licenseIndexToPick = 0
    const addonIndexToPick = 0
    const ipAddress = '2.2.2.2'
    const licenseCardInfo = {
      name: '',
      price: '',
    }
    const addonCardInfo = {
      name: '',
      price: '',
    }
    let summaryPricePerCycle = 0

    await test.step('Navigate to the cPanel store:', async () => {
      await homePage.navigate()
      await homePage.browseCpanelLicensesBtn().click()
    })

    await test.step('Order a Product:', async () => {
      await licensesPage.page.waitForEvent('domcontentloaded')

      const card1 = licensesPage.getCardByIndex(licenseIndexToPick)
      licenseCardInfo.name = await card1.name().innerText()
      licenseCardInfo.price = await card1.price().innerText()

      await card1.orderButton().click()
    })

    await test.step('Enter IP Address:', async () => {
      await cartConfigurePage.ipAddressInput().waitFor({ state: 'visible' })

      await cartConfigurePage.ipAddressInput().fill(ipAddress)
      // triggering IP validation:
      await cartConfigurePage.page.keyboard.press('Enter')
      await expect(cartConfigurePage.ipAddressInputErrorMessage()).toBeHidden()
    })

    await test.step('Select Addons:', async () => {
      const addonCard = cartConfigurePage.getAddonByIndex(addonIndexToPick)
      addonCardInfo.name = await addonCard.name().innerText()
      addonCardInfo.price = await addonCard.price().innerText()

      summaryPricePerCycle = roundToCents(
        [licenseCardInfo.price, addonCardInfo.price].map(priceToFloat).reduce((acc, curr) => acc + curr),
      )

      await addonCard.checkbox().click()
    })

    await test.step('Continue to Checkout:', async () => {
      await expect(cartConfigurePage.getOrderOptionLineByText(licenseCardInfo.name)).toContainText(
        licenseCardInfo.price,
      )

      const addonPriceWithoutPeriod = addonCardInfo.price.split('Monthly').shift()
      await expect(cartConfigurePage.getOrderOptionLineByText(addonCardInfo.name)).toContainText(
        addonPriceWithoutPeriod,
      )

      await expect(cartConfigurePage.getOrderOptionLineByText('Monthly:')).toContainText(
        priceToText(summaryPricePerCycle),
      )

      await expect(cartConfigurePage.continueButton()).not.toHaveClass('disabled')
      await cartConfigurePage.continueButton().click()
    })

    await test.step('Verify Product and Price:', async () => {
      const licenseCardOrderItem = cartReviewPage.getOrderItemByName(licenseCardInfo.name)
      await licenseCardOrderItem.locator.waitFor({ state: 'visible' })

      await expect(licenseCardOrderItem.locator).toBeVisible()
      await expect(licenseCardOrderItem.price()).toContainText(
        `${getPriceForCurrentMonth(priceToFloat(licenseCardInfo.price))}`,
      )
      await expect(licenseCardOrderItem.pricePerCycle()).toContainText(priceToText(summaryPricePerCycle))

      const addonCardOrderItem = cartReviewPage.getOrderItemByName(addonCardInfo.name)
      await expect(addonCardOrderItem.locator).toBeVisible()
      await expect(addonCardOrderItem.price()).toContainText(
        `${getPriceForCurrentMonth(priceToFloat(addonCardInfo.price))}`,
      )
      await expect(addonCardOrderItem.pricePerCycle()).toContainText(addonCardInfo.price)

      await expect(cartReviewPage.totalDueTodayPrice()).toContainText(
        priceToText(getPriceForCurrentMonth(summaryPricePerCycle)),
      )
    })

    await test.step('Proceed to Checkout:', async () => {
      await cartReviewPage.checkoutButton().click()
    })

    await test.step('Verify Checkout Information:', async () => {
      await cartCheckoutPage.orderSummaryTable().locator.waitFor({ state: 'visible' })

      const tableData: OrderSummaryRowData[] = []
      for (let i = 0; i < (await cartCheckoutPage.orderSummaryTable().getRowsCount()); i++)
        tableData.push(await cartCheckoutPage.orderSummaryTable().getRowData(i))

      expect.soft(tableData[0].productType).toEqual(licenseCardInfo.name)
      expect.soft(tableData[0].ipAddress).toEqual(ipAddress)
      expect.soft(tableData[0].recurringPrice).toEqual(priceToText(summaryPricePerCycle))
      expect
        .soft(tableData[0].dueTodayPrice)
        .toContain(priceToText(getPriceForCurrentMonth(priceToFloat(licenseCardInfo.price))))

      expect.soft(tableData[1].productType).toEqual(addonCardInfo.name)
      expect.soft(tableData[1].ipAddress).toEqual(ipAddress)
      expect.soft(tableData[1].recurringPrice).toEqual(addonCardInfo.price.split(' Monthly').shift())
      expect
        .soft(tableData[1].dueTodayPrice)
        .toContain(priceToText(getPriceForCurrentMonth(priceToFloat(addonCardInfo.price))))

      expect
        .soft(await cartCheckoutPage.orderSummaryTable().totalPrice().innerText())
        .toContain(priceToText(getPriceForCurrentMonth(summaryPricePerCycle)))

      for (const el of Object.keys(cartCheckoutPage.personalInformation))
        await expect(cartCheckoutPage.personalInformation[el]()).toBeVisible()
      for (const el of Object.keys(cartCheckoutPage.billingAddress))
        await expect(cartCheckoutPage.billingAddress[el]()).toBeVisible()
      for (const el of Object.keys(cartCheckoutPage.accountSecurity))
        await expect(cartCheckoutPage.accountSecurity[el]()).toBeVisible()
      await expect(cartCheckoutPage.termsAndConditions.ivereadCheckbox()).toBeVisible()
      for (const el of Object.keys(cartCheckoutPage.paymentDetails))
        await expect(cartCheckoutPage.paymentDetails[el]()).toBeVisible()
      await expect(cartCheckoutPage.completeOrderButton()).toBeVisible()
      await expect(cartCheckoutPage.completeOrderButton()).toBeDisabled()
    })
  })
})
