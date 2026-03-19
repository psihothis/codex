import type { AppState } from '../types'

export const defaultState: AppState = {
  balanceUsd: 84750.22,
  assets: [
    { id: 'btc-1', name: 'Bitcoin', ticker: 'BTC', amount: 1.274, priceUsd: 69000, change24h: 2.74 },
    { id: 'eth-1', name: 'Ethereum', ticker: 'ETH', amount: 8.43, priceUsd: 3650, change24h: -1.18 },
    { id: 'usdt-1', name: 'Tether USD', ticker: 'USDT', amount: 15600, priceUsd: 1, change24h: 0.04 },
    { id: 'ton-1', name: 'Toncoin', ticker: 'TON', amount: 1200, priceUsd: 3.2, change24h: 4.12 },
  ],
  activity: [
    {
      id: 'nv-tx-9031451',
      type: 'Bought',
      coin: 'BTC',
      amount: 0.24,
      usdValue: 16560,
      date: new Date(Date.now() - 1000 * 60 * 53).toISOString(),
      status: 'Completed',
    },
    {
      id: 'nv-tx-9031452',
      type: 'Received',
      coin: 'USDT',
      amount: 450,
      usdValue: 450,
      date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      status: 'Completed',
    },
    {
      id: 'nv-tx-9031453',
      type: 'Swapped',
      coin: 'TON',
      amount: 120,
      usdValue: 384,
      date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      status: 'Pending',
    },
  ],
  settings: {
    accountName: 'Nova Explorer',
    currency: 'USD',
    accentTheme: 'violet',
    showDemoBadge: true,
  },
}
