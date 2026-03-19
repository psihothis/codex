import { useMemo, useState } from 'react'
import { DemoBadge } from '../components/DemoBadge'
import { formatMoney, formatPct } from '../utils/format'
import type { AppState, Currency, TxType } from '../types'

type ActionType = 'Send' | 'Receive' | 'Swap' | 'Buy'

type Props = {
  state: AppState
  onBalanceChange: (value: number) => void
  onAction: (type: ActionType) => void
}

export const mapActionToTxType = (action: ActionType): TxType => {
  if (action === 'Send') return 'Sent'
  if (action === 'Receive') return 'Received'
  if (action === 'Swap') return 'Swapped'
  return 'Bought'
}

export const WalletPage = ({ state, onBalanceChange, onAction }: Props) => {
  const [balanceDraft, setBalanceDraft] = useState(String(state.balanceUsd.toFixed(2)))
  const currency: Currency = state.settings.currency

  const totalValue = useMemo(
    () => state.assets.reduce((sum, asset) => sum + asset.amount * asset.priceUsd, 0),
    [state.assets],
  )

  return (
    <section className="space-y-4 pb-4">
      {state.settings.showDemoBadge && <DemoBadge />}

      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-card via-[#182445] to-[#11182e] p-5 shadow-glow">
        <p className="text-xs uppercase tracking-[0.2em] text-mist/75">Total demo balance</p>
        <p className="mt-2 text-3xl font-semibold text-white">{formatMoney(state.balanceUsd, currency)}</p>
        <p className="mt-1 text-xs text-mist/80">Assets valuation: {formatMoney(totalValue, currency)}</p>

        <div className="mt-4 flex gap-2">
          <input
            value={balanceDraft}
            onChange={(e) => setBalanceDraft(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-shell px-3 py-2 text-sm text-white"
            placeholder="Set demo balance"
          />
          <button
            onClick={() => onBalanceChange(Number(balanceDraft) || 0)}
            className="rounded-xl bg-white/10 px-4 text-sm text-white hover:bg-white/15"
          >
            Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {(['Send', 'Receive', 'Swap', 'Buy'] as ActionType[]).map((action) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            className="rounded-2xl border border-white/10 bg-card/90 py-3 text-sm text-white shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-card p-4">
        <h2 className="text-sm font-medium text-white">Demo Assets</h2>
        <div className="mt-3 space-y-2">
          {state.assets.map((asset) => {
            const usd = asset.amount * asset.priceUsd
            return (
              <div key={asset.id} className="rounded-2xl border border-white/10 bg-shell/90 px-3 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{asset.name}</p>
                    <p className="text-xs text-mist">{asset.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{formatMoney(usd, currency)}</p>
                    <p className="text-xs text-mist">{asset.amount.toLocaleString()} {asset.ticker}</p>
                  </div>
                </div>
                <p className={`mt-2 text-xs ${asset.change24h >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                  24h: {formatPct(asset.change24h)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export type { ActionType }
