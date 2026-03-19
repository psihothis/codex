import { defaultState } from '../state/defaults'
import type { AppState } from '../types'

const STORAGE_KEY = 'novavault-demo-state-v1'

export const loadState = (): AppState => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultState

  try {
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      ...defaultState,
      ...parsed,
      settings: { ...defaultState.settings, ...parsed.settings },
    }
  } catch {
    return defaultState
  }
}

export const saveState = (state: AppState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const resetState = (): AppState => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState))
  return defaultState
}
