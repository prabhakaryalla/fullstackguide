import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import ThemeModeProvider from '../../src/theme/ThemeModeContext'

export function renderWithThemeMode(ui: ReactNode) {
  return render(<ThemeModeProvider>{ui}</ThemeModeProvider>)
}
