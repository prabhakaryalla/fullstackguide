import { createTheme } from '@mui/material/styles'
import type { PaletteMode, Theme } from '@mui/material'

export function getAppTheme(mode: PaletteMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1a1a2e',
      },
      secondary: {
        main: '#e94560',
      },
      ...(mode === 'light' ? { background: { default: '#f5f5f5' } } : {}),
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 700,
        letterSpacing: '0.05em',
      },
    },
    spacing: 8,
  })
}

