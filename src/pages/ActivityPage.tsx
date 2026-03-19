import { useMemo, useState } from 'react'
import type { DemoTransaction } from '../types'
import { formatMoney, shortDateTime } from '../utils/format'

type Props = {
  activity: DemoTransaction[]
  currency: 'USD' | 'EUR' | 'UAH'
}

export const ActivityPage = ({ activity, currency }: Props) => {
  const [filter, setFilter] = useState<'All' | 'Completed' | 'Pending'>('All')
  const [sort, setSort] = useState<'Newest' | 'Oldest'>('Newest')

  const data = useMemo(() => {
    const filtered = filter === 'All' ? activity : activity.filter((item) => item.status === filter)
    return [...filtered].sort((a, b) =>
      sort === 'Newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    )
  }, [activity, filter, sort])

  return (
    <section className="space-y-4 pb-4">
      <div className="flex gap-2">
        <select
          className="flex-1 rounded-xl border border-white/10 bg-card px-3 py-2 text-sm text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'All' | 'Completed' | 'Pending')}
        >
          {['All', 'Completed', 'Pending'].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <select
          className="flex-1 rounded-xl border border-white/10 bg-card px-3 py-2 text-sm text-white"
          value={sort}
          onChange={(e) => setSort(e.target.value as 'Newest' | 'Oldest')}
        >
          {['Newest', 'Oldest'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {data.map((tx) => (
          <article key={tx.id} className="rounded-2xl border border-white/10 bg-card p-3 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white">{tx.type} · {tx.coin}</p>
                <p className="text-xs text-mist">{shortDateTime(tx.date)} · {tx.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white">{tx.amount} {tx.coin}</p>
                <p className="text-xs text-mist">{formatMoney(tx.usdValue, currency)}</p>
              </div>
            </div>
            <p className={`mt-2 text-xs ${tx.status === 'Completed' ? 'text-emerald-300' : 'text-amber-300'}`}>{tx.status}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
