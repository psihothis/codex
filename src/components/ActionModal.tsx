import { useMemo, useState } from 'react'
import type { DemoTransaction } from '../types'
import type { ActionType } from '../pages/WalletPage'

type Props = {
  type: ActionType | null
  onClose: () => void
  onConfirm: (tx: DemoTransaction) => void
}

export const ActionModal = ({ type, onClose, onConfirm }: Props) => {
  const [coin, setCoin] = useState('BTC')
  const [amount, setAmount] = useState('0.00')

  const title = useMemo(() => {
    if (!type) return ''
    return `${type} (demo)`
  }, [type])

  if (!type) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/45 p-4 backdrop-blur-sm">
      <div className="mx-auto mt-20 w-full max-w-sm rounded-3xl border border-white/10 bg-card p-5 shadow-glow">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-mist/80">Interface simulation only. No real payment flow.</p>

        {type === 'Receive' ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-shell p-4 text-center">
            <div className="mx-auto grid h-40 w-40 grid-cols-8 gap-1 rounded-xl border border-white/20 bg-white p-3">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={`${i}-${type}`}
                  className={`rounded-[2px] transition-all duration-500 ${Math.random() > 0.52 ? 'bg-black' : 'bg-white'}`}
                />
              ))}
            </div>
            <p className="mt-3 text-xs text-mist">Animated demo QR</p>
          </div>
        ) : (
          <>
            <label className="mt-4 block text-xs text-mist">Coin</label>
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-shell px-3 py-2 text-white"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              {['BTC', 'ETH', 'USDT', 'TON'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <label className="mt-3 block text-xs text-mist">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-shell px-3 py-2 text-white"
              placeholder="0.00"
            />
          </>
        )}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={onClose} className="rounded-xl border border-white/10 py-2 text-sm text-mist hover:bg-white/5">
            Cancel
          </button>
          <button
            onClick={() => {
              if (type !== 'Receive') {
                const amountNumber = Number(amount) || 0
                onConfirm({
                  id: `nv-tx-${Math.floor(Math.random() * 10_000_000)}`,
                  type: 'Sent',
                  coin,
                  amount: amountNumber,
                  usdValue: amountNumber * (coin === 'BTC' ? 69000 : coin === 'ETH' ? 3650 : coin === 'TON' ? 3.2 : 1),
                  date: new Date().toISOString(),
                  status: Math.random() > 0.22 ? 'Completed' : 'Pending',
                })
              }
              onClose()
            }}
            className="rounded-xl bg-gradient-to-r from-accent to-mint py-2 text-sm font-medium text-white"
          >
            {type === 'Receive' ? 'Close' : 'Add demo activity'}
          </button>
        </div>
      </div>
    </div>
  )
}
