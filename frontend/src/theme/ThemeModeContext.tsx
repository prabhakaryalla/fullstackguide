import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark'

interface ThemeModeContextValue {
  mode: ThemeMode
  toggleMode: () => void
}

export const THEME_MODE_STORAGE_KEY = 'fullstack-guide.theme-mode.v1'

export const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

function readPersistedMode(): ThemeMode | null {
  try {
    const raw = window.localStorage.getItem(THEME_MODE_STORAGE_KEY)
    return raw === 'light' || raw === 'dark' ? raw : null
  } catch {
    return null
  }
}

function detectSystemMode(): ThemeMode {
  try {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    // matchMedia unsupported/unavailable — fall back to Light below
  }
  return 'light'
}

function getInitialMode(): ThemeMode {
  return readPersistedMode() ?? detectSystemMode()
}

interface ThemeModeProviderProps {
  children: ReactNode
}

export default function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  const toggleMode = useCallback(() => {
    setMode((previous) => {
      const next: ThemeMode = previous === 'light' ? 'dark' : 'light'
      try {
        window.localStorage.setItem(THEME_MODE_STORAGE_KEY, next)
      } catch {
        // Persisting the preference is best-effort; storage may be disabled/full
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}
