import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ThemeModeProvider, { THEME_MODE_STORAGE_KEY } from '../../src/theme/ThemeModeContext'
import { useThemeMode } from '../../src/theme/useThemeMode'

function mockMatchMedia(prefersDark: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    media: query,
    matches: prefersDark && query === '(prefers-color-scheme: dark)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

function ModeProbe() {
  const { mode, toggleMode } = useThemeMode()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button type="button" onClick={toggleMode}>
        toggle
      </button>
    </div>
  )
}

describe('ThemeModeProvider / useThemeMode', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('defaults to dark mode when the OS/browser prefers dark and no preference is persisted', () => {
    mockMatchMedia(true)
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('defaults to light mode when the OS/browser prefers light and no preference is persisted', () => {
    mockMatchMedia(false)
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('defaults to light mode when matchMedia is unsupported', () => {
    // @ts-expect-error simulating an environment without matchMedia support
    window.matchMedia = undefined
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('reads a valid persisted preference instead of the system preference', () => {
    mockMatchMedia(true)
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, 'light')
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('persists the mode to localStorage after toggling', async () => {
    const user = userEvent.setup()
    mockMatchMedia(false)
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'toggle' }))

    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(window.localStorage.getItem(THEME_MODE_STORAGE_KEY)).toBe('dark')
  })

  it('falls back to system/default detection when the persisted value is invalid', () => {
    mockMatchMedia(false)
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, 'not-a-real-mode')
    render(
      <ThemeModeProvider>
        <ModeProbe />
      </ThemeModeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('throws a clear error when useThemeMode is used outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    expect(() => render(<ModeProbe />)).toThrow('useThemeMode must be used within a ThemeModeProvider')
    consoleError.mockRestore()
  })
})
