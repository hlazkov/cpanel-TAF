export const priceToFloat = (str: string) => Number.parseFloat(str.split(' ').shift().split('$').pop())

export const priceToText = (price: number, currencyShort = '$', currency = 'USD') =>
  `${currencyShort}${roundToCents(price).toFixed(2)} ${currency}`

export const roundToCents = (price: number): number => Math.round(price * 100) / 100

export const calculateSummary = (prices: number[]): number => {
  return roundToCents(prices.reduce((acc, curr) => acc + curr))
}

export const getPriceForCurrentMonth = (price: number): number => {
  const now = new Date()
  const daysThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const today = now.getDate()
  const coefficient = ((daysThisMonth - today + 1) * 100) / daysThisMonth
  return Math.round(price * coefficient) / 100
}
