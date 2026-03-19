import type { Tab } from '../types'

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'wallet', label: 'Wallet', icon: '◉' },
  { key: 'activity', label: 'Activity', icon: '◎' },
  { key: 'portfolio', label: 'Portfolio', icon: '◍' },
  { key: 'settings', label: 'Settings', icon: '◌' },
]

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export const BottomNav = ({ active, onChange }: Props) => (
  <nav className="sticky bottom-0 z-40 mt-4 rounded-t-3xl border border-white/10 bg-[#0c1325]/90 p-2 backdrop-blur-xl">
    <ul className="grid grid-cols-4 gap-1">
      {tabs.map((tab) => (
        <li key={tab.key}>
          <button
            onClick={() => onChange(tab.key)}
            className={`w-full rounded-2xl py-2 transition-all duration-300 ${
              active === tab.key
                ? 'bg-accent/20 text-white shadow-soft'
                : 'text-mist/70 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="text-lg leading-none">{tab.icon}</div>
            <div className="mt-1 text-[11px]">{tab.label}</div>
          </button>
        </li>
      ))}
    </ul>
  </nav>
)
