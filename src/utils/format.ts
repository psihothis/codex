import type { Currency } from '../types'

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  UAH: 39.8,
}

const symbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
}

export const formatMoney = (amountUsd: number, currency: Currency): string => {
  const converted = amountUsd * rates[currency]
  return `${symbols[currency]}${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: currency === 'UAH' ? 0 : 2,
    minimumFractionDigits: currency === 'UAH' ? 0 : 2,
  }).format(converted)}`
}

export const formatPct = (value: number): string => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`

export const shortDateTime = (iso: string): string =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
