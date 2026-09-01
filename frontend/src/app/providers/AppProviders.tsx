import { ThemeProvider, CssBaseline } from '@mui/material'
import { HashRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import ThemeModeProvider from '../../theme/ThemeModeContext'
import { useThemeMode } from '../../theme/useThemeMode'
import { getAppTheme } from '../../theme/theme'

interface AppProvidersProps {
  children: ReactNode
}

function ThemedApp({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode()
  return (
    <ThemeProvider theme={getAppTheme(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <HashRouter>
      <ThemeModeProvider>
        <ThemedApp>{children}</ThemedApp>
      </ThemeModeProvider>
    </HashRouter>
  )
}

