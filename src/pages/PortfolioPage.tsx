import { formatMoney } from '../utils/format'
import type { AppState } from '../types'

type Props = {
  state: AppState
}

export const PortfolioPage = ({ state }: Props) => {
  const totals = state.assets.map((asset) => ({ ...asset, usd: asset.amount * asset.priceUsd }))
  const total = totals.reduce((sum, asset) => sum + asset.usd, 0)
  const largest = totals.reduce((max, item) => (item.usd > max.usd ? item : max), totals[0])

  const segments = totals
    .map((asset) => ({ ...asset, pct: total > 0 ? (asset.usd / total) * 100 : 0 }))
    .map((asset, index) => ({ ...asset, offset: totals.slice(0, index).reduce((acc, item) => acc + (item.usd / total) * 100, 0) }))

  return (
    <section className="space-y-4 pb-4">
      <div className="rounded-3xl border border-white/10 bg-card p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-mist/70">Portfolio value</p>
        <p className="mt-1 text-2xl font-semibold text-white">{formatMoney(total, state.settings.currency)}</p>
        <p className="mt-1 text-xs text-mint">Largest asset: {largest.name}</p>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/5">
          {segments.map((seg) => (
            <div
              key={seg.id}
              className="h-3"
              style={{
                width: `${seg.pct}%`,
                marginLeft: `${seg.offset}%`,
                background: ['#6f7cff', '#58f2d0', '#e6b95c', '#af67ff'][segments.indexOf(seg)],
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {segments.map((asset, index) => (
          <div key={asset.id} className="rounded-2xl border border-white/10 bg-card p-3">
            <div className="mb-2 h-2 w-8 rounded-full" style={{ background: ['#6f7cff', '#58f2d0', '#e6b95c', '#af67ff'][index] }} />
            <p className="text-sm text-white">{asset.ticker}</p>
            <p className="text-xs text-mist">{asset.pct.toFixed(1)}% allocation</p>
            <p className="mt-1 text-xs text-white">{formatMoney(asset.usd, state.settings.currency)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
