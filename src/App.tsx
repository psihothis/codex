import { useEffect, useMemo, useState } from 'react'
import { ActionModal } from './components/ActionModal'
import { BottomNav } from './components/BottomNav'
import { SplashScreen } from './components/SplashScreen'
import { ActivityPage } from './pages/ActivityPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SettingsPage } from './pages/SettingsPage'
import { WalletPage, type ActionType, mapActionToTxType } from './pages/WalletPage'
import { defaultState } from './state/defaults'
import type { AppState, Tab } from './types'
import { loadState, resetState, saveState } from './utils/storage'

const accents: Record<AppState['settings']['accentTheme'], string> = {
  violet: 'from-[#6f7cff] to-[#af67ff]',
  teal: 'from-[#39e8c8] to-[#4aa8ff]',
  sunset: 'from-[#ff9a5c] to-[#ff5c89]',
}

function App() {
  const [tab, setTab] = useState<Tab>('wallet')
  const [booted, setBooted] = useState(false)
  const [state, setState] = useState<AppState>(defaultState)
  const [modalAction, setModalAction] = useState<ActionType | null>(null)

  useEffect(() => {
    setState(loadState())
  }, [])

  useEffect(() => {
    if (booted) saveState(state)
  }, [state, booted])

  const themeClass = useMemo(() => accents[state.settings.accentTheme], [state.settings.accentTheme])

  return (
    <>
      {!booted && <SplashScreen onDone={() => setBooted(true)} />}
      <main className="min-h-screen bg-shell p-3 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[430px] flex-col rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0a1020] to-[#080b17] p-4 shadow-[0_20px_70px_rgba(5,8,20,0.75)]">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-mist/70">NovaVault Demo</p>
              <h1 className="text-lg font-semibold">{state.settings.accountName}</h1>
            </div>
            <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${themeClass} shadow-soft`} />
          </header>

          <div className="flex-1 overflow-y-auto">
            {tab === 'wallet' && (
              <WalletPage
                state={state}
                onBalanceChange={(value) => setState((prev) => ({ ...prev, balanceUsd: value }))}
                onAction={(action) => setModalAction(action)}
              />
            )}
            {tab === 'activity' && <ActivityPage activity={state.activity} currency={state.settings.currency} />}
            {tab === 'portfolio' && <PortfolioPage state={state} />}
            {tab === 'settings' && (
              <SettingsPage
                settings={state.settings}
                onChange={(next) => setState((prev) => ({ ...prev, settings: { ...prev.settings, ...next } }))}
                onReset={() => setState(resetState())}
                onRandomizePortfolio={() =>
                  setState((prev) => ({
                    ...prev,
                    assets: prev.assets.map((asset) => ({
                      ...asset,
                      amount: Number((Math.random() * (asset.ticker === 'USDT' ? 20000 : 12) + 0.4).toFixed(3)),
                      change24h: Number((Math.random() * 10 - 5).toFixed(2)),
                    })),
                  }))
                }
              />
            )}
          </div>

          <BottomNav active={tab} onChange={setTab} />
        </div>
      </main>

      <ActionModal
        type={modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={(tx) =>
          setState((prev) => ({
            ...prev,
            activity: [{ ...tx, type: mapActionToTxType(modalAction ?? 'Buy') }, ...prev.activity],
          }))
        }
      />
    </>
  )
}

export default App
