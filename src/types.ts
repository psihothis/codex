export type Tab = 'wallet' | 'activity' | 'portfolio' | 'settings'

export type Currency = 'USD' | 'EUR' | 'UAH'

export type AccentTheme = 'violet' | 'teal' | 'sunset'

export type DemoAsset = {
  id: string
  name: string
  ticker: 'BTC' | 'ETH' | 'USDT' | 'TON'
  amount: number
  priceUsd: number
  change24h: number
}

export type TxType = 'Sent' | 'Received' | 'Swapped' | 'Bought'
export type TxStatus = 'Completed' | 'Pending'

export type DemoTransaction = {
  id: string
  type: TxType
  coin: string
  amount: number
  usdValue: number
  date: string
  status: TxStatus
}

export type AppSettings = {
  accountName: string
  currency: Currency
  accentTheme: AccentTheme
  showDemoBadge: boolean
}

export type AppState = {
  balanceUsd: number
  assets: DemoAsset[]
  activity: DemoTransaction[]
  settings: AppSettings
}
