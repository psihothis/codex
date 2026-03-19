import type { AccentTheme, AppSettings, Currency } from '../types'
import { DemoBadge } from '../components/DemoBadge'

type Props = {
  settings: AppSettings
  onChange: (next: Partial<AppSettings>) => void
  onReset: () => void
  onRandomizePortfolio: () => void
}

export const SettingsPage = ({ settings, onChange, onReset, onRandomizePortfolio }: Props) => (
  <section className="space-y-4 pb-4">
    <DemoBadge />

    <div className="rounded-3xl border border-white/10 bg-card p-4">
      <p className="text-xs text-mist">Demo account</p>
      <div className="mt-2 rounded-2xl border border-white/10 bg-shell p-3">
        <p className="text-sm text-white">{settings.accountName}</p>
        <p className="text-xs text-mist">Premium mock profile card</p>
      </div>
      <input
        value={settings.accountName}
        onChange={(e) => onChange({ accountName: e.target.value })}
        className="mt-3 w-full rounded-xl border border-white/10 bg-shell px-3 py-2 text-sm text-white"
      />
    </div>

    <div className="rounded-3xl border border-white/10 bg-card p-4 space-y-3">
      <label className="block text-xs text-mist">Display currency</label>
      <select
        className="w-full rounded-xl border border-white/10 bg-shell px-3 py-2 text-sm text-white"
        value={settings.currency}
        onChange={(e) => onChange({ currency: e.target.value as Currency })}
      >
        {(['USD', 'EUR', 'UAH'] as Currency[]).map((curr) => (
          <option key={curr}>{curr}</option>
        ))}
      </select>

      <label className="block text-xs text-mist">Accent theme</label>
      <select
        className="w-full rounded-xl border border-white/10 bg-shell px-3 py-2 text-sm text-white"
        value={settings.accentTheme}
        onChange={(e) => onChange({ accentTheme: e.target.value as AccentTheme })}
      >
        {(['violet', 'teal', 'sunset'] as AccentTheme[]).map((theme) => (
          <option key={theme}>{theme}</option>
        ))}
      </select>

      <label className="flex items-center justify-between rounded-xl border border-white/10 bg-shell px-3 py-2 text-sm text-white">
        Show demo badge
        <input
          type="checkbox"
          checked={settings.showDemoBadge}
          onChange={(e) => onChange({ showDemoBadge: e.target.checked })}
        />
      </label>

      <button onClick={onRandomizePortfolio} className="w-full rounded-xl bg-white/10 py-2 text-sm text-white hover:bg-white/20">
        Generate random demo portfolio
      </button>
      <button onClick={onReset} className="w-full rounded-xl border border-rose-300/30 py-2 text-sm text-rose-200 hover:bg-rose-300/10">
        Reset demo data
      </button>
    </div>
  </section>
)
