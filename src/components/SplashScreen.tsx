import { useEffect, useState } from 'react'

type Props = {
  onDone: () => void
}

export const SplashScreen = ({ onDone }: Props) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1900)
    const t2 = setTimeout(onDone, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-shell transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex h-56 w-56 items-center justify-center rounded-[2.5rem] border border-white/10 bg-card shadow-glow">
        <div className="absolute h-44 w-44 rounded-full bg-accent/20 blur-2xl animate-pulseGlow" />
        <div className="z-10 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-accent to-mint shadow-soft animate-floaty" />
          <p className="text-xl font-semibold tracking-wide text-white">NovaVault</p>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-mist/70">Demo Wallet</p>
        </div>
      </div>
    </div>
  )
}
